import pandas as pd

def identify_themes(df: pd.DataFrame):
    col = 'general_comment' if 'general_comment' in df.columns else 'remarks'
    if col not in df.columns: return []
    themes = {"Design Process": ["design", "process"], "Technical": ["technical", "construction"], "Innovation": ["innovation", "creative"]}
    results = []
    for theme, keywords in themes.items():
        pattern = "|".join(keywords)
        theme_df = df[df[col].str.contains(pattern, case=False, na=False)]
        if not theme_df.empty: results.append({"theme": theme, "count": len(theme_df), "avg_score": theme_df['score'].mean() if 'score' in theme_df.columns else 0})
    return results
