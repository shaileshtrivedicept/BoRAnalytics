import pandas as pd
from typing import List, Dict

def calculate_panelist_behaviour(df: pd.DataFrame) -> List[Dict]:
    panelist_stats = df.groupby('Panelist_Names').agg({'RawPanelScore': ['mean', 'std', 'count', 'min', 'max']}).reset_index()
    panelist_stats.columns = ['Panelist_Name', 'Avg_Score', 'Std_Dev', 'Review_Count', 'Min_Score', 'Max_Score']
    panelist_stats = panelist_stats.sort_values('Avg_Score', ascending=False)
    return panelist_stats.to_dict(orient='records')
