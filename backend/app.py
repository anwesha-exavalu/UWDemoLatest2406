from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
from uuid import uuid4
import pandas as pd

from utils.lossRun import extract_loss_run_data
from utils.prefill import match_extracted_with_template
from utils.readEmail import read_email_data
from uwquestions.uw_questions_extraction import extract_uw_questions_from_gemini_vision

load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/',methods=['GET'])
def index():
    return "Hello ! You're connected Successfully"


@app.route('/api/prefill_upload', methods=['POST'])
def document_processing():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    submission_id = str(uuid4())
    upload_folder = os.path.join(app.config['UPLOAD_FOLDER'], submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    if file and allowed_file(file.filename):
        filename = os.path.join(upload_folder, file.filename)
        file.save(filename)
        response = match_extracted_with_template(file_path=filename, submission_id=submission_id)
        if not response:
            return ({
                "message": "Error extracting data from the document.",
                "filename": file.filename,
                "submission_id": submission_id
            }), 404
        return jsonify({
            "message": "Data Extracted Successfully.",
            "filename": file.filename,
            "submission_id": submission_id,
            "application_details": response
        }), 200

    return jsonify({"error": "Invalid file type"}), 400


@app.route('/api/prefill_email', methods=['GET'])
def document_processing_email():
    submission_id = str(uuid4())
    upload_folder = os.path.join(app.config['UPLOAD_FOLDER'], submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    file_path = read_email_data(upload_dir=upload_folder)
    response = match_extracted_with_template(file_path=file_path, submission_id=submission_id)
    if not response:
        return ({
            "message": "Error extracting data from the document.",
            "filename": file_path,
            "submission_id": submission_id
        }), 404
    return jsonify({
        "message": "Data Extracted Successfully.",
        "filename": file_path,
        "submission_id": submission_id,
        "application_details": response
    }), 200


@app.route('/api/lossrun_extraction', methods=['POST'])
def loss_run_data_extraction():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    submission_id = str(uuid4())
    upload_folder = os.path.join(app.config['UPLOAD_FOLDER'], submission_id)
    os.makedirs(upload_folder, exist_ok=True)
    if file and allowed_file(file.filename):
        file_path = os.path.join(upload_folder, file.filename)
        file.save(file_path)
        response = extract_loss_run_data(pdf_path=file_path, submission_id=submission_id)
        if not response:
            return ({
                "message": "Error extracting data from the document.",
                "filename": file.filename,
                "submission_id": submission_id
            }), 404
        return jsonify({
            "message": "Data Extracted Successfully.",
            "filename": file.filename,
            "submission_id": submission_id,
            "lossrun_details": response
        }), 200

    return jsonify({"error": "Invalid file type"}), 400


@app.route('/api/uwquestions', methods=['GET'])
def get_questions_with_answers():
    questions_path = 'uwquestions/uw_questions_template.xlsx'
    docs_dir = 'uwquestions/docs'
    try:
        # Load questions from Excel
        df = pd.read_excel(questions_path)
        questions = df["Question"].dropna().tolist()

        # Get all PDF files
        pdf_files = [
            os.path.join(docs_dir, f)
            for f in os.listdir(docs_dir)
            if f.lower().endswith(".pdf")
        ]

        if not pdf_files:
            print("No PDF files found in directory")
            return jsonify({"error": "No PDF documents found"}), 404

        enriched_data = []

        for q in questions:
            prompt = (
                "Examine the document and extract the answer to the following underwriting question:\n"
                f"\"{q}\"\n\n"
                "If the answer is found, respond with one of: 'yes', 'no', or 'not applicable'.\n"
                "If the answer is implied but not directly stated, use your best judgment.\n"
                "Format your response as a JSON object: {\"answer\": \"yes/no/not detected\"}\n"
                "Provide only this JSON object as your response without any additional text."
            )

            answers = []

            for pdf_path in pdf_files:
                submission_id = uuid4().hex
                print(f"Processing {pdf_path} for question: {q}")

                response = extract_uw_questions_from_gemini_vision(pdf_path, submission_id, prompt)
                print(f"Raw response: {response}")

                answer = None

                if isinstance(response, dict):
                    for key, value in response.items():
                        if isinstance(value, str) and value.lower() in ["yes", "no", "not applicable"]:
                            answer = value.lower()
                            break
                    if not answer:
                        for value in response.values():
                            if isinstance(value, str) and value.lower() in ["yes", "no", "not applicable"]:
                                answer = value.lower()
                                break
                elif isinstance(response, str):
                    response_lower = response.lower()
                    if "yes" in response_lower:
                        answer = "yes"
                    elif "no" in response_lower:
                        answer = "no"
                    elif "not applicable" in response_lower or "n/a" in response_lower:
                        answer = "not applicable"

                if answer:
                    print(f"Found answer: {answer}")
                    answers.append(answer)
                    if answer in ["yes", "no"]:
                        break

            final_answer = "Not Applicable"
            if answers:
                for ans in ["yes", "no"]:
                    if ans in answers:
                        final_answer = ans.capitalize()
                        break
                if final_answer == "Not Applicable" and "not applicable" in answers:
                    final_answer = "Not Applicable"

            print(f"Final answer for '{q}': {final_answer}")

            enriched_data.append({
                "Question": q,
                "Response": final_answer,
                "Comment": ""
            })

        return jsonify(enriched_data)

    except Exception as e:
        print(f"Error processing questions: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
