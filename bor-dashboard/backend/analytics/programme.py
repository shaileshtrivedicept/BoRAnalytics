import pandas as pd

def compute_programme_stats(df: pd.DataFrame):
    if df.empty: return []
    stats = df.groupby('programme').agg({
        'score': ['mean', 'median', 'std'],
        'student_id': 'nunique',
        'studio_id': 'nunique'
    }).reset_index()
    stats.columns = ['programme', 'avg_score', 'median_score', 'score_std', 'student_count', 'studio_count']

    # Compute avg divergence per programme
    div_df = df.pivot_table(index=['student_id', 'criterion', 'programme'], columns='panel_number', values='score').reset_index()
    panel_cols = [c for c in div_df.columns if isinstance(c, (int, float, np.integer))]
    if len(panel_cols) >= 2:
        p1, p2 = panel_cols[0], panel_cols[1]
        div_df['div'] = (div_df[p1] - div_df[p2]).abs()
        prog_div = div_df.groupby('programme')['div'].mean().reset_index()
        stats = stats.merge(prog_div, on='programme', how='left').fillna(0)
        stats = stats.rename(columns={'div': 'avg_divergence'})
    else:
        stats['avg_divergence'] = 0

    return stats.to_dict(orient='records')

def compute_studio_stats(df: pd.DataFrame):
    if df.empty: return []
    stats = df.groupby(['studio_id', 'studio_title', 'programme']).agg({
        'score': ['mean', 'median'],
        'student_id': 'nunique'
    }).reset_index()
    stats.columns = ['studio_id', 'studio_title', 'programme', 'avg_score', 'median_score', 'student_count']
    return stats.fillna(0).to_dict(orient='records')

def compute_criteria_stats(df: pd.DataFrame):
    if df.empty: return []
    stats = df.groupby('criterion').agg({
        'score': 'mean'
    }).reset_index()
    stats['strength'] = stats['score'] * 100
    return stats.to_dict(orient='records')

def compute_studio_criteria_matrix(df: pd.DataFrame):
    if df.empty: return []
    matrix = df.groupby(['studio_id', 'criterion'])['score'].mean().unstack().fillna(0).reset_index()
    return matrix.to_dict(orient='records')
