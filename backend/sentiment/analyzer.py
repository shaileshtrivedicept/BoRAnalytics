import pandas as pd
from textblob import TextBlob
from typing import List, Dict, Any
from collections import Counter
import re

def analyze_sentiment(df: pd.DataFrame) -> Dict[str, Any]:
    remarks = df['Remarks'].dropna().astype(str).tolist()
    gen_comments = df['General_Comment'].dropna().astype(str).unique().tolist()
    all_text = " ".join(remarks + gen_comments)
    if not all_text.strip():
        return {"overall_sentiment": "Neutral", "score": 0.0, "keywords": [], "themes": [], "quotes": []}
    blob = TextBlob(all_text)
    sentiment_score = blob.sentiment.polarity
    label = "Positive" if sentiment_score > 0.1 else "Negative" if sentiment_score < -0.1 else "Neutral"
    words = re.findall(r'\w+', all_text.lower())
    stop_words = {'the', 'a', 'and', 'is', 'in', 'it', 'of', 'for', 'to', 'with', 'on', 'at', 'by', 'an', 'be', 'this', 'that', 'are', 'was', 'were'}
    keywords = [w for w in words if len(w) > 3 and w not in stop_words]
    keyword_freq = Counter(keywords).most_common(10)
    quotes = sorted(list(set(remarks)), key=len, reverse=True)[:5]
    return {"overall_sentiment": label, "score": round(float(sentiment_score), 2), "keywords": [{"text": k, "value": v} for k, v in keyword_freq], "themes": [], "quotes": quotes}
