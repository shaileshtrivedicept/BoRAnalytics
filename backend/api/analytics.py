from fastapi import APIRouter, HTTPException
from .upload import datasets
from analytics.kpis import calculate_kpis, calculate_studio_performance
from analytics.trends import calculate_trends
from analytics.divergence import calculate_panel_divergence
from analytics.tutor import calculate_tutor_performance
from analytics.programme import calculate_programme_performance
from analytics.criteria import calculate_criteria_performance, calculate_studio_criteria_drilldown
from analytics.panelist import calculate_panelist_behaviour
import numpy as np

router = APIRouter()

def clean_for_json(obj):
    if isinstance(obj, dict): return {k: clean_for_json(v) for k, v in obj.items()}
    elif isinstance(obj, list): return [clean_for_json(v) for v in obj]
    elif isinstance(obj, float) and (np.isnan(obj) or np.isinf(obj)): return 0.0
    return obj

@router.get("/analytics/{dataset_id}")
async def get_analytics(dataset_id: str, semester: str = None, program: str = None):
    if dataset_id not in datasets: raise HTTPException(status_code=404, detail="Dataset not found")
    df = datasets[dataset_id]
    filtered_df = df.copy()
    if semester: filtered_df = filtered_df[filtered_df['Semester'] == semester]
    if program: filtered_df = filtered_df[filtered_df['Program'] == program]
    return clean_for_json({
        "kpis": calculate_kpis(filtered_df),
        "trends": calculate_trends(filtered_df),
        "divergence": calculate_panel_divergence(filtered_df),
        "tutor_performance": calculate_tutor_performance(filtered_df),
        "programme_performance": calculate_programme_performance(filtered_df),
        "studio_performance": calculate_studio_performance(filtered_df).to_dict(orient='records'),
        "criteria_performance": calculate_criteria_performance(filtered_df),
        "studio_criteria": calculate_studio_criteria_drilldown(filtered_df),
        "panelist_behaviour": calculate_panelist_behaviour(filtered_df),
        "scatter_data": filtered_df[['Semester', 'Normalized_Score', 'Studio_Code']].rename(columns={'Normalized_Score': 'Score'}).to_dict(orient='records'),
        "filters": {"semesters": sorted(df['Semester'].unique().tolist()), "programs": sorted(df['Program'].unique().tolist())}
    })
