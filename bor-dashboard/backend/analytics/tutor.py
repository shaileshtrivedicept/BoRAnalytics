import pandas as pd
from typing import List, Dict

def calculate_tutor_performance(df: pd.DataFrame) -> List[Dict]:
    tutor_perf = df.groupby('Tutor_Names').agg({'Normalized_Score': 'mean', 'Response_ID': 'nunique', 'Studio_Code': 'nunique'}).reset_index()
    tutor_perf.columns = ['Tutor_Name', 'Avg_Score', 'Review_Count', 'Studio_Count']
    tutor_perf = tutor_perf.sort_values('Avg_Score', ascending=False)
    return tutor_perf.to_dict(orient='records')
