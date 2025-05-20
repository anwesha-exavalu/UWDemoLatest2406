import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.ai.generativelanguage import Content, Part
import base64
from pdf2image import convert_from_path
from io import BytesIO

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def pdf_to_base64_images(pdf_path, dpi=200):
    base64_images = []
    try:
        pages = convert_from_path(pdf_path, dpi=dpi)
        for page in pages:
            buffered = BytesIO()
            page.save(buffered, format="PNG")
            img = base64.b64encode(buffered.getvalue()).decode("utf-8")
            img_base64 = f"data:image/png;base64,{img}"

            base64_images.append(img_base64)
    except Exception as e:
        print(f"Error converting PDF to Base64 images: {e}")
        return None
    return base64_images

def extract_loss_run_data(pdf_path, submission_id):
    try:
        # Convert PDF to Base64 images
        images = pdf_to_base64_images(pdf_path)
        if not images:
            return "No images generated from the PDF."
        print("Images generated from the PDF.")

        # Construct API request payload using Content and Part
        parts = [Part({
            "text": """Extract information from the document and return it in the exact JSON structure shown below. Do not include any additional text or explanation.

            Format Example template given below within square brackets to be followed **Do not print this example**(per page):
            **strictly follow**Extract only the information that has claims summary information"
            **Consolidate all claims information occurrences and provide one consolidated "claims summary" data year-wise as given below and summarization of values as in the Totals section**
            **if there are multiple claims within the given year sum the count**
            [
                {
                  "Claims Summary": [
                    "2005-2006 - 1 closed claim reported, no payouts (sex discrimination)",
                    "2007-2008 - 1 closed claim reported, no payouts (age discrimination)"
                  ],
                  "Totals": {
                    "Total Number of Claims": "2",
                    "Total Loss Paid": "$0.00",
                    "Total Expense Paid": "$0.00",
                    "Salvage/Subrogation Recovered": "$0.00",
                    "Loss Reserves": "$0.00",
                    "Expense Reserves": "$0.00",
                    "Total Incurred": "$0.00"
                  }
                }
            ]
            """
        })]
        for img_base64 in images:
            parts.append(Part(inline_data={"mime_type": "image/png", "data": img_base64.split(",")[
                1]}))  # Adjust mime_type if needed, extract the base64 part

        content = Content({"role":"user"}, parts=parts)  # Role is important

        # Initialize the Gemini Pro Vision model
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-2.0-flash')

        print("Sending request to Gemini Pro Vision...")
        response = model.generate_content([content])  # Adjust max_output_tokens as needed

        if response:
            candidates = response.candidates
            if not candidates:
                print("No candidates found in response.")
                return None
            # Extract text from parts
            parts = candidates[0].content.parts
            response_text = "".join(part.text for part in parts)
            # print(response_text)
            try:
                json_start = response_text.find('[')
                json_end = response_text.rfind(']') + 1
                if 0 <= json_start < json_end:
                    json_str = response_text[json_start:json_end]
                    parsed_response = json.loads(json_str)
                    response_output_path = f"./output/{submission_id}/extracted_data_google_vision.json"
                    os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                    with open(response_output_path, "w") as output_file:
                        json.dump(parsed_response, output_file, indent=4)
                    return parsed_response
            except json.JSONDecodeError as e:
                print("JSON Decode Error:", e)
                parsed_response = response_text
                response_output_path = f"./output/{submission_id}/extracted_data_google_vision.json"
                os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                with open(response_output_path, "w") as output_file:
                    json.dump(parsed_response, output_file, indent=4)
                return parsed_response
        else:
            print(
                f"API Error: No text in response: {response.prompt_feedback}, {response.candidates}")  # Print more details about potential errors
            return None

    except Exception as e:
        print(f"Error fetching Data: {str(e)}")
        return None








