import pandas as pd
import numpy as np

def normalize_data(df: pd.DataFrame) -> pd.DataFrame:
    # Mapping based on the real sample data
    mapping = {
        'Semester': 'semester',
        'Program': 'programme',
        'Studio_Code': 'studio_id',
        'Studio_Title': 'studio_title',
        'Tutor_Names': 'tutor',
        'Panelist_Names': 'panelist',
        'Panel': 'panel_number_raw',
        'RawPanelScore': 'raw_score',
        'General_Comment': 'general_comment',
        'Email': 'student_id'
    }

    actual_mapping = {k: v for k, v in mapping.items() if k in df.columns}
    df = df.rename(columns=actual_mapping)

    if 'panel_number_raw' in df.columns:
        df['panel_number'] = df['panel_number_raw'].astype(str).str.extract('(\d+)').fillna(0).astype(int)

    # Identify score columns (Q1_Norm to Q11_Norm)
    norm_cols = [c for c in df.columns if c.endswith('_Norm')]

    # Identify remarks columns
    remarks_cols = [c for c in df.columns if c.endswith('_Remarks')]

    id_vars = [c for c in df.columns if c not in norm_cols and c not in remarks_cols]

    # Melt scores
    df_long = pd.melt(df, id_vars=id_vars, value_vars=norm_cols, var_name='criterion_raw', value_name='score')
    df_long['criterion'] = df_long['criterion_raw'].str.replace('_Norm', '')
    df_long['score'] = pd.to_numeric(df_long['score'], errors='coerce').fillna(0)

    # Join remarks
    df_remarks = pd.melt(df, id_vars=['student_id', 'panel_number'] if 'student_id' in df.columns else ['panel_number'],
                         value_vars=remarks_cols, var_name='rem_criterion_raw', value_name='remarks')
    df_remarks['criterion'] = df_remarks['rem_criterion_raw'].str.replace('_Remarks', '')

    if 'student_id' in df.columns:
        df_long = df_long.merge(df_remarks[['student_id', 'panel_number', 'criterion', 'remarks']],
                                on=['student_id', 'panel_number', 'criterion'], how='left')
    else:
        df_long = df_long.merge(df_remarks[['panel_number', 'criterion', 'remarks']],
                                on=['panel_number', 'criterion'], how='left')

    return df_long
