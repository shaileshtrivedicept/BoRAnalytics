import pandas as pd
import numpy as np
from typing import List, Dict

def calculate_panel_divergence(df: pd.DataFrame) -> List[Dict]:
    studio_panel = df.groupby(['Semester', 'Studio_Code', 'Panelist_Names']).agg({'RawPanelScore': 'mean'}).reset_index()
    divergence = []
    for (sem, studio), group in studio_panel.groupby(['Semester', 'Studio_Code']):
        if len(group) > 1:
            scores = group['RawPanelScore'].values
            diff = np.max(scores) - np.min(scores)
            divergence.append({"Semester": sem, "Studio_Code": studio, "Studio_Title": df[df['Studio_Code'] == studio]['Studio_Title'].iloc[0], "Panelists": group['Panelist_Names'].tolist(), "Scores": scores.tolist(), "Max_Diff": round(float(diff), 2)})
    return sorted(divergence, key=lambda x: x['Max_Diff'], reverse=True)
