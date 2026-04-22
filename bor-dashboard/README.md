# BOR Analytics Dashboard Engine

A production-ready, modular, data-driven dashboard application for Board of Reviews (BOR) analytics.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS, Recharts
- **Backend**: FastAPI, Pandas, TextBlob (NLP)
- **Deployment**: Docker, Docker Compose

## Features
- Dynamic Excel parsing and normalization.
- 16 Automated analytics tabs.
- Rule-driven narrative insights.
- Sentiment analysis and keyword extraction from panelist remarks.
- Print-ready layouts.

## Setup & Run

### Using Docker (Recommended)
```bash
docker-compose up --build
```
Access dashboard at `http://localhost:3000`

### Manual Setup
**Backend:**
```bash
cd bor-dashboard/backend
pip install -r ../requirements.txt
uvicorn main:app --reload
```

**Frontend:**
```bash
cd bor-dashboard/frontend
npm install
npm run dev
```
