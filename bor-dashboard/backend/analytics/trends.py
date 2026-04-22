import pandas as pd
from typing import List, Dict

def calculate_trends(df: pd.DataFrame) -> List[Dict]:
    trend = df.groupby('Semester').agg({'Normalized_Score': 'mean', 'Response_ID': 'nunique'}).reset_index()
    trend.rename(columns={'Normalized_Score': 'avg_score', 'Response_ID': 'review_count'}, inplace=True)
    trend = trend.sort_values('Semester')
    return trend.to_dict(orient='records')
