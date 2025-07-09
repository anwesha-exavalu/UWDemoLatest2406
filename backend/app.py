from fastapi import FastAPI, File, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import uvicorn
import os
import json
import uuid
import logging
from dotenv import load_dotenv
from typing import List
from google_vision import extract_data_from_gemini_vision
from utils.lossRun import extract_loss_run_data
from utils.prefill import match_extracted_with_template
from utils.readEmail import read_email_data

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
QUESTIONS_PATH = "./uwquestions/uw_questions_template.xlsx"
PDF_QUESTIONS_PATH = "./uwquestions/questions.pdf"
DOCS_DIR = "./uwquestions/docs"


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.get("/")
async def index():
    return {"message": "Hello! You're connected Successfully"}


@app.post("/api/prefill_upload")
async def document_processing(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        return JSONResponse(status_code=400, content={"error": "Invalid file type"})
    submission_id = str(uuid.uuid4())
    upload_folder = os.path.join(UPLOAD_FOLDER, submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    response = match_extracted_with_template(file_path=file_path, submission_id=submission_id)
    if not response:
        return JSONResponse(status_code=404, content={
            "message": "Error extracting data from the document.",
            "filename": file.filename,
            "submission_id": submission_id
        })
    return {
        "message": "Data Extracted Successfully.",
        "filename": file.filename,
        "submission_id": submission_id,
        "application_details": response
    }


@app.get("/api/prefill_email")
async def document_processing_email():
    submission_id = str(uuid.uuid4())
    upload_folder = os.path.join(UPLOAD_FOLDER, submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    file_path = read_email_data(upload_dir=upload_folder)
    response = match_extracted_with_template(file_path=file_path, submission_id=submission_id)
    if not response:
        return JSONResponse(status_code=404, content={
            "message": "Error extracting data from the document.",
            "filename": file_path,
            "submission_id": submission_id
        })
    return {
        "message": "Data Extracted Successfully.",
        "filename": file_path,
        "submission_id": submission_id,
        "application_details": response
    }


@app.post("/api/lossrun_extraction")
async def loss_run_data_extraction(file: UploadFile = File(...)):
    if not allowed_file(file.filename):
        return JSONResponse(status_code=400, content={"error": "Invalid file type"})
    submission_id = str(uuid.uuid4())
    upload_folder = os.path.join(UPLOAD_FOLDER, submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    response = extract_loss_run_data(pdf_path=file_path, submission_id=submission_id)
    if not response:
        return JSONResponse(status_code=404, content={
            "message": "Error extracting data from the document.",
            "filename": file.filename,
            "submission_id": submission_id
        })
    return {
        "message": "Data Extracted Successfully.",
        "filename": file.filename,
        "submission_id": submission_id,
        "lossrun_details": response
    }


@app.get("/api/uw_questions")
async def get_questions_only():
    try:
        questions = []
        if os.path.exists(QUESTIONS_PATH):
            df = pd.read_excel(QUESTIONS_PATH)
            excel_questions = df["Question"].dropna().tolist()
            questions.extend(excel_questions)

        if os.path.exists(PDF_QUESTIONS_PATH):
            pdf_prompt = (
                "Extract all underwriting questions from this document. "
                "Return them as a JSON list like this: [\"question 1\", \"question 2\"]"
            )
            pdf_submission_id = uuid.uuid4().hex
            pdf_response = extract_data_from_gemini_vision(
                PDF_QUESTIONS_PATH, pdf_submission_id, pdf_prompt
            )

            if isinstance(pdf_response, list):
                questions.extend(pdf_response)
            elif isinstance(pdf_response, dict) and "questions" in pdf_response:
                questions.extend(pdf_response["questions"])
            elif isinstance(pdf_response, str):
                try:
                    parsed = json.loads(pdf_response)
                    if isinstance(parsed, list):
                        questions.extend(parsed)
                except json.JSONDecodeError:
                    pass

        questions = list(set(q.strip() for q in questions if q.strip()))
        return JSONResponse(content=questions)

    except Exception as e:
        logger.error(f"Error loading questions: {str(e)}", exc_info=True)
        return JSONResponse(status_code=500, content={"error": str(e)})
from fastapi import Body

@app.post("/api/uw_answers")
async def get_llm_answers(questions: List[str] = Body(...)):
    try:
        pdf_files = [
            os.path.join(DOCS_DIR, f)
            for f in os.listdir(DOCS_DIR)
            if f.lower().endswith(".pdf")
        ]

        if not pdf_files:
            return JSONResponse(status_code=404, content={"error": "No PDF documents found"})

        enriched_data = []

        for q in questions:
            prompt = (
                "Examine the document and extract the answer to the following underwriting question:\n"
                f"\"{q}\"\n\n"
                "If the answer is found, respond with one of: 'yes', 'no', or 'can't be determined'.\n"
                "Format your response as: {\"answer\": \"yes\"}"
            )

            answers = []
            for pdf_path in pdf_files:
                submission_id = uuid.uuid4().hex
                response = extract_data_from_gemini_vision(pdf_path, submission_id, prompt)

                answer = None
                if isinstance(response, dict):
                    answer = response.get("answer", "").lower()
                elif isinstance(response, str):
                    if "yes" in response.lower():
                        answer = "yes"
                    elif "no" in response.lower():
                        answer = "no"
                    elif "can't be determined" in response.lower():
                        answer = "can't be determined"

                if answer:
                    answers.append(answer)
                    if answer in ["yes", "no"]:
                        break

            final_answer = "can't be determined"
            if answers:
                for a in ["yes", "no"]:
                    if a in answers:
                        final_answer = a.capitalize()
                        break

            enriched_data.append({
                "Question": q,
                "Response": final_answer,
                "Comment": ""
            })

        return JSONResponse(content=enriched_data)

    except Exception as e:
        logger.error(f"Error generating answers: {str(e)}", exc_info=True)
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == '__main__':
    uvicorn.run("app:app", host="0.0.0.0", port=5000, reload=True)