import pandas as pd
from typing import List, Dict

def calculate_criteria_performance(df: pd.DataFrame) -> List[Dict]:
    crit_perf = df.groupby('Criteria').agg({'Normalized_Score': 'mean', 'Response_ID': 'nunique'}).reset_index()
    crit_perf.columns = ['Criteria', 'Avg_Score', 'Review_Count']
    return crit_perf.to_dict(orient='records')

def calculate_studio_criteria_drilldown(df: pd.DataFrame) -> List[Dict]:
    studio_crit = df.groupby(['Studio_Code', 'Studio_Title', 'Criteria']).agg({'Normalized_Score': 'mean'}).reset_index()
    return studio_crit.to_dict(orient='records')
