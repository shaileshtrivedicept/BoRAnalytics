import pandas as pd
import numpy as np

def compute_panel_divergence(df: pd.DataFrame):
    student_col = 'Email' if 'Email' in df.columns else 'student_id'

    if student_col not in df.columns or 'panel_number' not in df.columns or 'criterion' not in df.columns: return []

    # Optional columns for grouping if they exist
    group_cols = [student_col, 'criterion']
    for extra in ['studio_title', 'programme']:
        if extra in df.columns:
            group_cols.append(extra)

    pivot = df.pivot_table(index=group_cols, columns='panel_number', values='score').reset_index()
    panel_cols = [c for c in pivot.columns if isinstance(c, (int, float, np.integer))]
    if len(panel_cols) >= 2:
        p1, p2 = panel_cols[0], panel_cols[1]
        pivot['divergence'] = (pivot[p1] - pivot[p2]).abs()
    else:
        pivot['divergence'] = 0
    return pivot.fillna(0).to_dict(orient='records')

def get_high_divergence_cases(df: pd.DataFrame, threshold: float = 0.3):
    return [case for case in compute_panel_divergence(df) if case.get('divergence', 0) > threshold]
