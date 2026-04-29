import pandas as pd
from analytics.kpis import compute_kpis

def generate_insights(df: pd.DataFrame):
    kpis = compute_kpis(df)
    insights = []
    avg = kpis.get('average_score', 0)
    if avg > 0.8: insights.append({"type": "positive", "text": f"Overall performance is excellent ({avg:.2f})."})
    elif avg < 0.6: insights.append({"type": "warning", "text": f"Overall performance is low ({avg:.2f})."})
    else: insights.append({"type": "neutral", "text": f"Overall performance is steady at {avg:.2f}."})
    return insights
