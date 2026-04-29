from fastapi import APIRouter, HTTPException
from .upload import datasets
from analytics.kpis import compute_kpis
from analytics.trends import compute_trends, compute_programme_trends
from analytics.programme import compute_programme_stats, compute_studio_stats
from analytics.divergence import compute_panel_divergence, get_high_divergence_cases
from analytics.tutor import compute_tutor_performance

router = APIRouter()

@router.get("/analytics/{dataset_id}")
async def get_analytics(dataset_id: str):
    if dataset_id not in datasets:
        if dataset_id == "sample-dataset":
             import pandas as pd
             from data.normalizer import normalize_data
             datasets[dataset_id] = normalize_data(pd.read_excel("data_storage/sample_data.xlsx"))
        else: raise HTTPException(status_code=404, detail="Dataset not found")
    df = datasets[dataset_id]
    return {
        "kpis": compute_kpis(df), "trends": compute_trends(df), "programme_trends": compute_programme_trends(df),
        "programme_stats": compute_programme_stats(df), "studio_stats": compute_studio_stats(df),
        "divergence": compute_panel_divergence(df), "high_divergence": get_high_divergence_cases(df),
        "tutor_performance": compute_tutor_performance(df),
        "available_filters": {"semesters": df['semester'].unique().tolist(), "programmes": df['programme'].unique().tolist(), "studios": df['studio_title'].unique().tolist()}
    }
