import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.ai.generativelanguage import Content, Part
import logging

from base64_processing import pdf_to_base64_images

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
GEMINI_API_KEY_UW = os.getenv("GEMINI_API_KEY_UW")


def extract_data_from_gemini_vision(pdf_path, submission_id, prompt):
    """Extract structured data from a PDF using the Gemini API (Gemini SDK directly)."""

    try:
        # Configure the API
        genai.configure(api_key=GEMINI_API_KEY_UW)
        if not GEMINI_API_KEY_UW:
            logger.error("Missing GEMINI_API_KEY_UW environment variable")
            return None

        # Convert PDF to Base64 images
        images = pdf_to_base64_images(pdf_path)
        if not images:
            logger.warning(f"No images generated from PDF: {pdf_path}")
            return {"answer": "can't be determined"}
        
        logger.info(f"Generated {len(images)} images from PDF: {pdf_path}")

        # Construct API request payload using Content and Part
        parts = [Part({"text": prompt})]
        for img_base64 in images:
            # Extract the base64 part
            base64_data = img_base64.split(",")[1] if "," in img_base64 else img_base64
            parts.append(Part(inline_data={"mime_type": "image/png", "data": base64_data}))

        content = Content({"role": "user"}, parts=parts)

        # Initialize the Gemini Pro Vision model
        model = genai.GenerativeModel('gemini-2.0-flash')
        logger.info(f"Sending request to Gemini Pro Vision for question in {pdf_path}")
        
        # Set temperature to 0 for more deterministic responses
        response = model.generate_content(
            [content],
            generation_config={
                "temperature": 0,
                "max_output_tokens": 200
            }
        )

        if response:
            candidates = response.candidates
            if not candidates or not candidates[0].content.parts:
                logger.warning("No candidates or content parts found in response.")
                return {"answer": "can't be determined"}
            
            # Extract text from parts
            response_text = "".join(part.text for part in candidates[0].content.parts)
            logger.info(f"Raw response text: {response_text}")
            
            # Try to parse as JSON
            try:
                # Look for JSON within the text
                json_start = response_text.find('{')
                json_end = response_text.rfind('}') + 1
                
                if 0 <= json_start < json_end:
                    json_str = response_text[json_start:json_end]
                    parsed_response = json.loads(json_str)
                    
                    # Save for debugging
                    response_output_path = f"./output/{submission_id}/extracted_data_google_vision.json"
                    os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                    with open(response_output_path, "w") as output_file:
                        json.dump(parsed_response, output_file, indent=4)
                    
                    return parsed_response
                else:
                    # If no JSON found, create one based on text analysis
                    answer = "can't be determined"
                    lower_text = response_text.lower()
                    
                    if "yes" in lower_text and ("no" not in lower_text or lower_text.find("yes") < lower_text.find("no")):
                        answer = "yes"
                    elif "no" in lower_text:
                        answer = "no"
                    elif any(term in lower_text for term in ["can't be determined", "n/a", "na"]):
                        answer = "can't be determined"
                    
                    result = {"answer": answer}
                    
                    # Save for debugging
                    response_output_path = f"./output/{submission_id}/extracted_data_google_vision.json"
                    os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                    with open(response_output_path, "w") as output_file:
                        json.dump(result, output_file, indent=4)
                    
                    return result
                    
            except json.JSONDecodeError as e:
                logger.warning(f"JSON Decode Error: {e}, raw text: {response_text}")
                
                # Try to extract answer from plain text
                answer = "can't be determined"
                lower_text = response_text.lower()
                
                if "yes" in lower_text and ("no" not in lower_text or lower_text.find("yes") < lower_text.find("no")):
                    answer = "yes"
                elif "no" in lower_text:
                    answer = "no"
                elif any(term in lower_text for term in ["can't be determined", "n/a", "na"]):
                    answer = "can't be determined"
                
                result = {"answer": answer}
                
                # Save for debugging
                response_output_path = f"./output/{submission_id}/extracted_data_text.json"
                os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                with open(response_output_path, "w") as output_file:
                    json.dump(result, output_file, indent=4)
                
                return result
        else:
            logger.error(f"API Error: No text in response")
            return {"answer": "can't be determined"}

    except Exception as e:
        logger.error(f"Error in Gemini Vision processing: {str(e)}", exc_info=True)
        return {"answer": "can't be determined"}