import pandas as pd

def compute_kpis(df: pd.DataFrame):
    # Standardize column names if they are not already (for tests and flexible backend)
    student_col = 'Email' if 'Email' in df.columns else 'student_id'

    return {
        "total_students": int(df[student_col].nunique()) if student_col in df.columns else 0,
        "total_studios": int(df['studio_id'].nunique()) if 'studio_id' in df.columns else 0,
        "total_programmes": int(df['programme'].nunique()) if 'programme' in df.columns else 0,
        "average_score": float(df['score'].mean()) if 'score' in df.columns else 0,
        "median_score": float(df['score'].median()) if 'score' in df.columns else 0,
        "pass_rate": float((df['score'] >= 0.5).mean() * 100) if 'score' in df.columns else 0,
    }
