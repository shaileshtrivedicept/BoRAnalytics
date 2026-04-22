import pandas as pd
from typing import Dict

def load_bor_data(filepath_or_buffer) -> Dict[str, pd.DataFrame]:
    excel_data = pd.read_excel(filepath_or_buffer, sheet_name=None)
    return {
        "responses": excel_data['Raw_Responses_Clean'],
        "criteria": excel_data['Evaluation_Criteria_Master']
    }
