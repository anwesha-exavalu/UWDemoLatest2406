import pandas as pd

def read_questions_from_excel(path):
    try:
        df = pd.read_excel(path)
        return df.to_dict(orient='records')
    except Exception as e:
        raise RuntimeError(f"Failed to read Excel file: {str(e)}")
