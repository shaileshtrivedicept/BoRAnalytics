import pandas as pd

def compute_programme_stats(df: pd.DataFrame):
    if 'programme' not in df.columns or 'score' not in df.columns: return []
    stats = df.groupby('programme').agg({'score': ['mean', 'median', 'std'], 'Email': 'nunique', 'studio_id': 'nunique'}).reset_index()
    stats.columns = ['programme', 'avg_score', 'median_score', 'score_std', 'student_count', 'studio_count']
    return stats.fillna(0).to_dict(orient='records')

def compute_studio_stats(df: pd.DataFrame):
    if 'studio_title' not in df.columns or 'score' not in df.columns: return []
    stats = df.groupby(['studio_id', 'studio_title', 'programme']).agg({'score': ['mean', 'median'], 'Email': 'nunique'}).reset_index()
    stats.columns = ['studio_id', 'studio_title', 'programme', 'avg_score', 'median_score', 'student_count']
    return stats.fillna(0).to_dict(orient='records')
