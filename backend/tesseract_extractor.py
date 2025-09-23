# tesseract_extractor.py
import pytesseract
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
from pdf2image import convert_from_path

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file using Tesseract OCR.
    - pdf_path: local path to PDF file
    Returns: extracted text as a string
    """
    print(f"[TESSERACT] Starting OCR for: {pdf_path}")
    try:
        # Convert each page of the PDF to an image
        images = convert_from_path(pdf_path, poppler_path=r"C:\Poppler\poppler-25.07.0\Library\bin")
        text = ""
        for i, img in enumerate(images, start=1):
            print(f"[TESSERACT] Processing page {i}...")     
            page_text = pytesseract.image_to_string(img)
            print(f"[TESSERACT] Page {i} text length: {len(page_text)} chars")
            text += f"\n\n--- Page {i} ---\n\n{page_text}"
        print("[TESSERACT] Finished OCR")
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"Tesseract extraction failed: {e}")

