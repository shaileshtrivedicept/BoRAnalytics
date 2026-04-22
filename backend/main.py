from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api import upload, analytics, sentiment, insights

app = FastAPI(title="BOR Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, tags=["Upload"])
app.include_router(analytics.router, tags=["Analytics"])
app.include_router(sentiment.router, tags=["Sentiment"])
app.include_router(insights.router, tags=["Insights"])

@app.get("/")
async def root():
    return {"message": "BOR Dashboard API is running"}
