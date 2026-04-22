from fastapi import APIRouter, HTTPException
from .upload import datasets
from sentiment.analyzer import analyze_sentiment

router = APIRouter()

@router.get("/sentiment/{dataset_id}")
async def get_sentiment(dataset_id: str, semester: str = None, program: str = None):
    if dataset_id not in datasets: raise HTTPException(status_code=404, detail="Dataset not found")
    df = datasets[dataset_id]
    filtered_df = df.copy()
    if semester: filtered_df = filtered_df[filtered_df['Semester'] == semester]
    if program: filtered_df = filtered_df[filtered_df['Program'] == program]
    return {"sentiment": analyze_sentiment(filtered_df)}
