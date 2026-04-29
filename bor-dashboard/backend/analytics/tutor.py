import pandas as pd

def compute_tutor_performance(df: pd.DataFrame):
    if 'tutor' not in df.columns or 'score' not in df.columns: return []
    tutor_stats = df.groupby('tutor').agg({'score': ['mean', 'count', 'std'], 'studio_id': 'nunique'}).reset_index()
    tutor_stats.columns = ['tutor', 'avg_score', 'review_count', 'score_std', 'studios_count']
    return tutor_stats.fillna(0).to_dict(orient='records')
