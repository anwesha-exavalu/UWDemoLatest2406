from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from flask_cors import CORS
from uuid import uuid4

from utils.lossRun import extract_loss_run_data
from utils.prefill import match_extracted_with_template
from utils.readEmail import read_email_data

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

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
