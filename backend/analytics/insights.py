from typing import List, Dict, Any
import pandas as pd

def generate_insights(df: pd.DataFrame) -> List[str]:
    insights = []
    prog_avg = df.groupby('Program')['Normalized_Score'].mean().sort_values(ascending=False)
    if not prog_avg.empty:
        insights.append(f"{prog_avg.index[0]} is the strongest performing programme with an average score of {prog_avg.iloc[0]:.2f}.")
    crit_avg = df.groupby('Criteria')['Normalized_Score'].mean().sort_values()
    if not crit_avg.empty:
        insights.append(f"'{crit_avg.index[0]}' is the most challenging criteria for students.")
    return insights
