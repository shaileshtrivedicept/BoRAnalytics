import pandas as pd

def compute_trends(df: pd.DataFrame):
    if 'semester' not in df.columns or 'score' not in df.columns: return []
    return df.groupby('semester')['score'].mean().reset_index().to_dict(orient='records')

def compute_programme_trends(df: pd.DataFrame):
    if 'semester' not in df.columns or 'programme' not in df.columns or 'score' not in df.columns: return []
    trends = df.groupby(['semester', 'programme'])['score'].mean().reset_index()
    return trends.pivot(index='semester', columns='programme', values='score').reset_index().fillna(0).to_dict(orient='records')
