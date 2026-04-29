from fastapi import APIRouter, HTTPException
from .upload import datasets
from sentiment.analyzer import process_remarks
from sentiment.keywords import extract_keywords
from sentiment.themes import identify_themes
from analytics.insights import generate_insights

router = APIRouter()

@router.get("/sentiment/{dataset_id}")
async def get_sentiment(dataset_id: str):
    if dataset_id not in datasets: raise HTTPException(status_code=404, detail="Dataset not found")
    df = datasets[dataset_id]
    return {"remarks": process_remarks(df), "keywords": extract_keywords(df), "themes": identify_themes(df)}

@router.get("/insights/{dataset_id}")
async def get_insights(dataset_id: str):
    if dataset_id not in datasets: raise HTTPException(status_code=404, detail="Dataset not found")
    return {"insights": generate_insights(datasets[dataset_id])}
