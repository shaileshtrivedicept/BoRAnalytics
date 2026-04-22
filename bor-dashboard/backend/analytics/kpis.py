import pandas as pd
from typing import Dict, Any
import numpy as np

def calculate_kpis(df: pd.DataFrame) -> Dict[str, Any]:
    avg_score = df['Normalized_Score'].mean()
    total_reviews = df['Response_ID'].nunique()
    total_studios = df['Studio_Code'].nunique()
    total_programmes = df['Program'].nunique()
    positive_pct = (df[df['Normalized_Score'] >= 5]['Response_ID'].nunique() / total_reviews) * 100 if total_reviews > 0 else 0
    return {
        "avg_score": round(float(avg_score), 2) if not np.isnan(avg_score) else 0.0,
        "total_reviews": int(total_reviews),
        "total_studios": int(total_studios),
        "total_programmes": int(total_programmes),
        "positive_pct": round(float(positive_pct), 1)
    }

def calculate_studio_performance(df: pd.DataFrame) -> pd.DataFrame:
    perf = df.groupby(['Studio_Code', 'Studio_Title', 'Program']).agg({
        'Normalized_Score': 'mean',
        'RawPanelScore': 'mean'
    }).reset_index()
    perf.columns = ['Studio_Code', 'Studio_Title', 'Program', 'Avg_Normalized_Score', 'Avg_Panel_Score']
    return perf
