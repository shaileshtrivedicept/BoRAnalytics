from fastapi import APIRouter, HTTPException
from .upload import datasets
from analytics.insights import generate_insights

router = APIRouter()

@router.get("/insights/{dataset_id}")
async def get_insights(dataset_id: str, semester: str = None, program: str = None):
    if dataset_id not in datasets: raise HTTPException(status_code=404, detail="Dataset not found")
    df = datasets[dataset_id]
    filtered_df = df.copy()
    if semester: filtered_df = filtered_df[filtered_df['Semester'] == semester]
    if program: filtered_df = filtered_df[filtered_df['Program'] == program]
    return {"insights": generate_insights(filtered_df)}
