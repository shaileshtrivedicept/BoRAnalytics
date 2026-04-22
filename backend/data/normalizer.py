import pandas as pd
from typing import Dict

def normalize_data(raw_dfs: Dict[str, pd.DataFrame]) -> pd.DataFrame:
    responses_df = raw_dfs['responses'].copy()
    criteria_df = raw_dfs['criteria'].copy()
    fixed_cols = ['AY', 'Semester', 'Email', 'Panel', 'Panelist_Names', 'Tutor_Names', 'Studio_Code', 'Level', 'Program', 'Studio_Title', 'Ability', 'General_Comment', 'RawPanelScore']
    available_fixed = [c for c in fixed_cols if c in responses_df.columns]
    responses_df['Response_ID'] = responses_df.index
    score_cols = [c for c in responses_df.columns if c.endswith('_Norm')]
    remark_cols = [c for c in responses_df.columns if c.endswith('_Remarks')]

    melted_scores = responses_df.melt(id_vars=available_fixed + ['Response_ID'], value_vars=score_cols, var_name='Question_Number_Raw', value_name='Normalized_Score')
    melted_scores['Question_Number'] = melted_scores['Question_Number_Raw'].str.replace('_Norm', '')

    melted_remarks = responses_df.melt(id_vars=['Response_ID'], value_vars=remark_cols, var_name='Question_Number_Raw_Rem', value_name='Remarks')
    melted_remarks['Question_Number'] = melted_remarks['Question_Number_Raw_Rem'].str.replace('_Remarks', '')

    normalized_df = pd.merge(melted_scores, melted_remarks[['Response_ID', 'Question_Number', 'Remarks']], on=['Response_ID', 'Question_Number'])
    normalized_df = pd.merge(normalized_df, criteria_df, on='Question_Number', how='left')
    return normalized_df
