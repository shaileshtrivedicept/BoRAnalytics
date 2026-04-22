from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import uuid
from data.loader import load_bor_data
from data.normalizer import normalize_data

router = APIRouter()
datasets = {}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="Invalid file format.")
    try:
        content = await file.read()
        import io
        raw = load_bor_data(io.BytesIO(content))
        normalized_df = normalize_data(raw)
        dataset_id = str(uuid.uuid4())
        datasets[dataset_id] = normalized_df
        return {"dataset_id": dataset_id, "filename": file.filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
