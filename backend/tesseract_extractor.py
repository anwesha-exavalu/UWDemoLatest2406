# tesseract_extractor.py
import pytesseract
from pdf2image import convert_from_path
from collections import defaultdict

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text_with_line_boxes(pdf_path: str):
    """
    Extract text line-by-line from a PDF using Tesseract OCR.
    Groups words (level=5) into line-level bounding boxes.
    """
    print(f"[TESSERACT] Starting line-level OCR for: {pdf_path}")
    try:
        images = convert_from_path(pdf_path, poppler_path=r"C:\Poppler\poppler-25.07.0\Library\bin")
        pages_data = []

        for page_num, img in enumerate(images, start=1):
            print(f"[TESSERACT] Processing page {page_num} (line-level)...")

            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT, config="--psm 6")

            lines = defaultdict(list)
            n_boxes = len(data["text"])
            for i in range(n_boxes):
                text = data["text"][i].strip()
                if text:  # skip empty words
                    line_id = data["block_num"][i], data["par_num"][i], data["line_num"][i]
                    lines[line_id].append(i)

            page_lines = []
            for line_id, indices in lines.items():
                # Combine words into a line
                line_text = " ".join(data["text"][i] for i in indices)

                # Bounding box that covers all words in the line
                left = min(data["left"][i] for i in indices)
                top = min(data["top"][i] for i in indices)
                right = max(data["left"][i] + data["width"][i] for i in indices)
                bottom = max(data["top"][i] + data["height"][i] for i in indices)

                line_info = {
                    "text": line_text,
                    "left": left,
                    "top": top,
                    "width": right - left,
                    "height": bottom - top
                }
                page_lines.append(line_info)

            print(f"[TESSERACT] Page {page_num}: {len(page_lines)} lines detected")
            pages_data.append({"page": page_num, "lines": page_lines})

        print("[TESSERACT] Finished line-level OCR")
        return pages_data
    except Exception as e:
        raise RuntimeError(f"Tesseract line-level extraction failed: {e}")
