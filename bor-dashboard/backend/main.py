from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.upload import router as upload_router
from api.analytics import router as analytics_router
from api.sentiment import router as sentiment_router

app = FastAPI(title="BOR Analytics Engine API")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(upload_router, prefix="/api", tags=["Upload"])
app.include_router(analytics_router, prefix="/api", tags=["Analytics"])
app.include_router(sentiment_router, prefix="/api", tags=["Sentiment"])

@app.get("/")
async def root(): return {"message": "Welcome to BOR Analytics Engine API"}
