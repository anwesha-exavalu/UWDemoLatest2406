from openai import OpenAI
import os, json, re

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def extract_with_schema(ocr_lines, schema: dict, doc_type: str = "Insurance Policy"):
    """
     Pass OCR text and schema to LLM for structured extraction.
    """
    # Flatten OCR into plain text
    all_text = "\n".join(
        [line["text"] for page in ocr_lines for line in page["lines"]]
    )

    # Create prompt
    prompt = f"""
    You are an AI that extracts structured data from documents.

    Document type: {doc_type}

    OCR text:
    {all_text}

    Extract the information and return a JSON object
    that strictly follows this schema:
    {json.dumps(schema, indent=2)}

    Only return valid JSON, no explanations.
    """

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )

    raw_output = response.choices[0].message.content.strip()

    # 🔹 Remove markdown ```json ... ``` wrappers if present
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw_output.strip(), flags=re.DOTALL)

    try:
       return json.loads(cleaned)
    except Exception as e:
        return {
            "error": str(e),
            "raw_output": raw_output
        }
