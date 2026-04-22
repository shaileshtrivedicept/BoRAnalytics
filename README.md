# Board of Reviews (BOR) Analytics Dashboard Engine

This project is a reusable, data-driven analytics system designed for CEPT University's Board of Reviews. It transforms raw Excel survey data into a comprehensive dashboard with 16 dynamic tabs, sentiment analysis, and narrative insights.

---

## 🚀 Quick Start (Using Docker)

The easiest way to run the application is using Docker.

### Prerequisites
- Install **Docker Desktop** (for Mac or Windows): [Download here](https://www.docker.com/products/docker-desktop/)

### Setup Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shaileshtrivedicept/BoRAnalytics.git
   cd BoRAnalytics
   ```

2. **Run with Docker Compose**:
   From the project root (`BoRAnalytics/`), run:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - Dashboard (Frontend): [http://localhost:3000](http://localhost:3000)
   - API Documentation (Backend): [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Upload Data**:
   - When you open the dashboard, upload the `BOR_clean_structured_analysis_FA PG_pk1.0.xlsx` file.

---

## 🛠️ Manual Setup (For Development)

### 1. Backend (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
python3 -m textblob.download_corpora
uvicorn main:app --reload --port 8000
```

### 2. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Dashboard Features
1. **Semester Overview**: Global KPIs and trends.
2. **Studio Bar Chart**: Compare studios by normalized scores.
3. **Studio Score Chart**: Raw panel score comparisons.
4. **Programme Comparison**: Performance by department.
5. **Criteria Overview**: Radar chart showing performance across all evaluation criteria.
6. **Studio Criteria Drill-down**: Detailed heatmap-style table.
7. **Key Insights**: Rule-driven narrative observations.
8. **Highlights (Top/Watch List)**: Automated ranking of studios.
9. **Panel Divergence**: Identification of high scoring differences.
10. **Sentiment Analytics**: Keyword clouds and representative quotes.
