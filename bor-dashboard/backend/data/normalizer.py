import pandas as pd
import numpy as np

def normalize_data(df: pd.DataFrame) -> pd.DataFrame:
    mapping = {
        'Semester': 'semester',
        'Program': 'programme',
        'Studio_Code': 'studio_id',
        'Studio_Title': 'studio_title',
        'Tutor_Names': 'tutor',
        'Panelist_Names': 'panelist',
        'Panel': 'panel_number_raw',
        'RawPanelScore': 'raw_score',
        'General_Comment': 'general_comment'
    }
    actual_mapping = {k: v for k, v in mapping.items() if k in df.columns}
    df = df.rename(columns=actual_mapping)
    if 'panel_number_raw' in df.columns:
        df['panel_number'] = df['panel_number_raw'].str.extract('(\d+)').fillna(0).astype(int)
    df['normalized_score'] = df['raw_score'].astype(float)
    df['score'] = df['normalized_score']
    id_vars = [c for c in df.columns if not (c.endswith('_Norm') or c.endswith('_Remarks'))]
    norm_cols = [c for c in df.columns if c.endswith('_Norm')]
    df_long = pd.melt(df, id_vars=id_vars, value_vars=norm_cols, var_name='criterion', value_name='criterion_score')
    df_long['remarks'] = ""
    required_internal = ['semester', 'programme', 'studio_id', 'studio_title', 'tutor', 'panelist', 'panel_number', 'score', 'criterion', 'remarks']
    for col in required_internal:
        if col not in df_long.columns:
            df_long[col] = ""
    return df_long
