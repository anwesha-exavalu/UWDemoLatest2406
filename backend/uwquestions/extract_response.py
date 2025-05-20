def extract_response_for_question(question, documents_path):
    # Simulate logic, replace with your Gemini or LLM inference
    # Example: concatenate all docs, then ask question
    combined_text = ""
    for file in os.listdir(documents_path):
        file_path = os.path.join(documents_path, file)
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            combined_text += f.read() + "\n"

    prompt = f"Q: {question}\nA:"
    response = extract_data_from_gemini_vision(prompt, combined_text)
    return response
