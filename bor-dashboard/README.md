# BOR Analytics Dashboard Engine

A production-ready, modular, data-driven dashboard application for Board of Reviews (BOR) analytics.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS, Recharts
- **Backend**: FastAPI, Pandas, TextBlob (NLP)
- **Deployment**: Docker, Docker Compose

## Features
- **Dynamic Data Pipeline**: Automatically parses Excel sheets and normalizes wide-format question data.
- **16 Analytics Tabs**: Comprehensive views from Semester Overview to Panelist Behaviour.
- **Sentiment Engine**: Extracts keywords, themes, and representative quotes from remarks using NLP.
- **Insight Engine**: Generates rule-driven narrative insights based on performance thresholds.
- **Print Support**: Optimized for high-quality printing of dashboard tabs.

## Docker Setup (Laptop)

To run this system on your laptop using Docker, follow these steps:

1. **Install Docker**:
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Windows/Mac.
   - [Docker Engine](https://docs.google.com/search?q=install+docker+engine) for Linux.
2. **Open Terminal**: Navigate to the `bor-dashboard` directory.
3. **Build & Run**:
   ```bash
   docker-compose up --build
   ```
4. **Access Dashboard**: Open [http://localhost:3000](http://localhost:3000) in your browser.
5. **Upload Data**: Use the provided sample Excel file to populate the dashboard.

## Manual Setup (Development)

**Backend:**
```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Access at `http://localhost:3000`. Ensure backend is running first.
