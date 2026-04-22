import pandas as pd
from typing import List, Dict

def calculate_programme_performance(df: pd.DataFrame) -> List[Dict]:
    prog_perf = df.groupby('Program').agg({'Normalized_Score': 'mean', 'Response_ID': 'nunique', 'Studio_Code': 'nunique'}).reset_index()
    prog_perf.columns = ['Programme', 'Avg_Score', 'Review_Count', 'Studio_Count']
    prog_perf = prog_perf.sort_values('Avg_Score', ascending=False)
    return prog_perf.to_dict(orient='records')
