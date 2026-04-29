import pandas as pd
from collections import Counter
import re

def extract_keywords(df: pd.DataFrame, top_n: int = 10):
    col = 'general_comment' if 'general_comment' in df.columns else 'remarks'
    if col not in df.columns: return []
    text = " ".join(df[col].fillna("").astype(str)).lower()
    words = re.findall(r'\w+', text)
    stop = {"the", "a", "and", "is", "in", "to", "for", "with", "of", "on", "was", "by", "this", "that", "it"}
    counts = Counter([w for w in words if w not in stop and len(w) > 3])
    return [{"text": word, "value": count} for word, count in counts.most_common(top_n)]
