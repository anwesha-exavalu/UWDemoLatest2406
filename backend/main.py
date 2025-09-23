import os
import uuid
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import boto3

load_dotenv()

AWS_REGION = os.getenv("AWS_REGION")
S3_BUCKET = os.getenv("S3_BUCKET")

if not AWS_REGION or not S3_BUCKET:
    raise RuntimeError("Set AWS_REGION and S3_BUCKET in .env")

# AWS S3 client
s3 = boto3.client("s3", region_name=AWS_REGION)

app = FastAPI()

# allow your frontend origin in development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(pdf: UploadFile = File(...)):
    """
    Accept a file named 'pdf' and upload to S3.
    """
    if not pdf.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    ext = pdf.filename.split(".")[-1]
    key = f"uploads/{uuid.uuid4()}.{ext}"

    try:
        # read file contents (for large files you can stream)
        contents = await pdf.read()

        s3.put_object(
            Bucket=S3_BUCKET,
            Key=key,
            Body=contents,
            ContentType=pdf.content_type or "application/pdf",
        )

        url = f"https://{S3_BUCKET}.s3.{AWS_REGION}.amazonaws.com/{key}"

        return JSONResponse({"success": True, "key": key, "url": url})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
