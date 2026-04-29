# BOR Analytics Engine

A production-ready, modular, data-driven dashboard application for Board of Reviews (BOR) analytics.

## Features

- **Dynamic Data Pipeline**: Reusable engine that accepts Excel files and computes analytics programmatically.
- **16 Data-Driven Tabs**: Complete suite of analytics from semester overviews to sentiment analysis.
- **NLP Sentiment Engine**: Automated sentiment classification and keyword extraction from panel remarks.
- **Rule-Driven Insights**: Narrative insights generated based on configurable thresholds.
- **Production Ready**: Built with Next.js, FastAPI, Tailwind CSS, and Docker.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS, Recharts.
- **Backend**: FastAPI (Python), Pandas (Data Processing), Scikit-learn (Basic NLP).
- **Deployment**: Docker, Docker Compose.

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Running the System

1. Clone the repository.
2. Run the following command:
   ```bash
   docker-compose up --build
   ```
3. Access the dashboard at `http://localhost:3000`.
4. Access the API documentation at `http://localhost:8000/docs`.

### Development

#### Backend
```bash
cd bor-dashboard/backend
pip install -r requirements.txt
export PYTHONPATH=$PYTHONPATH:$(pwd)
python -m uvicorn main:app --reload
```

#### Frontend
```bash
cd bor-dashboard/frontend
npm install
npm run dev
```

## Data Schema

The system expects an Excel file with the following core fields:
- `Semester`
- `Program`
- `Studio_Code`
- `Studio_Title`
- `Tutor_Names`
- `Panelist_Names`
- `Panel`
- `RawPanelScore`
- `General_Comment`
- `Q1_Norm` ... `Q11_Norm` (Criteria scores)
