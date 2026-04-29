import pandas as pd

def analyze_sentiment(text: str) -> str:
    if not isinstance(text, str) or not text: return "neutral"
    pos = ["good", "excellent", "great", "strong", "solid"]
    neg = ["weak", "poor", "lacks", "needs", "improvement"]
    text_lower = text.lower()
    p_c = sum(1 for w in pos if w in text_lower)
    n_c = sum(1 for w in neg if w in text_lower)
    return "positive" if p_c > n_c else ("negative" if n_c > p_c else "neutral")

def process_remarks(df: pd.DataFrame):
    col = 'general_comment' if 'general_comment' in df.columns else 'remarks'
    if col not in df.columns: return []
    remarks_df = df[df[col].notna() & (df[col] != "")].copy()
    if remarks_df.empty: return []
    remarks_df['sentiment'] = remarks_df[col].apply(analyze_sentiment)
    return remarks_df[['Email', 'studio_title', 'criterion', col, 'sentiment']].rename(columns={col: 'remarks'}).to_dict(orient='records')
