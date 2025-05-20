import json
import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.ai.generativelanguage import Content, Part
import logging

from uwquestions.base64_processing import pdf_to_base64_images


# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


def extract_uw_questions_from_gemini_vision(pdf_path, submission_id, prompt):

    try:
        # Configure the API
        genai.configure(api_key=GEMINI_API_KEY)
        if not GEMINI_API_KEY:
            print("Missing GEMINI_API_KEY environment variable")
            return None

        # Convert PDF to Base64 images
        images = pdf_to_base64_images(pdf_path)
        if not images:
            print(f"No images generated from PDF: {pdf_path}")
            return {"answer": "not applicable"}
        
        print(f"Generated {len(images)} images from PDF: {pdf_path}")

        # Construct API request payload using Content and Part
        parts = [Part({"text": prompt})]
        for img_base64 in images:
            # Extract the base64 part
            base64_data = img_base64.split(",")[1] if "," in img_base64 else img_base64
            parts.append(Part(inline_data={"mime_type": "image/png", "data": base64_data}))

        content = Content({"role": "user"}, parts=parts)

        # Initialize the Gemini Pro Vision model
        model = genai.GenerativeModel('gemini-2.0-flash')
        print(f"Sending request to Gemini Pro Vision for question in {pdf_path}")
        
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
                print("No candidates or content parts found in response.")
                return {"answer": "not applicable"}
            
            # Extract text from parts
            response_text = "".join(part.text for part in candidates[0].content.parts)
            print(f"Raw response text: {response_text}")
            
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
                    answer = "not applicable"
                    lower_text = response_text.lower()
                    
                    if "yes" in lower_text and ("no" not in lower_text or lower_text.find("yes") < lower_text.find("no")):
                        answer = "yes"
                    elif "no" in lower_text:
                        answer = "no"
                    elif any(term in lower_text for term in ["not applicable", "n/a", "na"]):
                        answer = "not applicable"
                    
                    result = {"answer": answer}
                    
                    # Save for debugging
                    response_output_path = f"./output/{submission_id}/extracted_data_google_vision.json"
                    os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                    with open(response_output_path, "w") as output_file:
                        json.dump(result, output_file, indent=4)
                    
                    return result
                    
            except json.JSONDecodeError as e:
                print(f"JSON Decode Error: {e}, raw text: {response_text}")
                
                # Try to extract answer from plain text
                answer = "not applicable"
                lower_text = response_text.lower()
                
                if "yes" in lower_text and ("no" not in lower_text or lower_text.find("yes") < lower_text.find("no")):
                    answer = "yes"
                elif "no" in lower_text:
                    answer = "no"
                elif any(term in lower_text for term in ["not applicable", "n/a", "na"]):
                    answer = "not applicable"
                
                result = {"answer": answer}
                
                # Save for debugging
                response_output_path = f"./output/{submission_id}/extracted_data_text.json"
                os.makedirs(os.path.dirname(response_output_path), exist_ok=True)
                with open(response_output_path, "w") as output_file:
                    json.dump(result, output_file, indent=4)
                
                return result
        else:
            print(f"API Error: No text in response")
            return {"answer": "not applicable"}

    except Exception as e:
        print(f"Error in Gemini Vision processing: {str(e)}")
        return {"answer": "not applicable"}