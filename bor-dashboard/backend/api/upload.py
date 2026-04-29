from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd
import uuid, os
from data.validator import validate_dataframe
from data.normalizer import normalize_data

router = APIRouter()
datasets = {}

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename.endswith(('.xlsx', '.xls')): raise HTTPException(status_code=400, detail="Invalid file type.")
    dataset_id = str(uuid.uuid4())
    temp_path = f"data_storage/{dataset_id}_{file.filename}"
    os.makedirs(os.path.dirname(temp_path), exist_ok=True)
    with open(temp_path, "wb") as buffer: buffer.write(await file.read())
    try:
        df = pd.read_excel(temp_path)
        is_valid, errors = validate_dataframe(df)
        if not is_valid: raise HTTPException(status_code=400, detail=errors[0])
        datasets[dataset_id] = normalize_data(df)
        return {"dataset_id": dataset_id}
    except Exception as e: raise HTTPException(status_code=500, detail=str(e))

@router.post("/sample")
async def load_sample():
    dataset_id = "sample-dataset"
    sample_path = "data_storage/sample_data.xlsx"
    if not os.path.exists(sample_path): raise HTTPException(status_code=404, detail="Sample file not found.")
    datasets[dataset_id] = normalize_data(pd.read_excel(sample_path))
    return {"dataset_id": dataset_id}
