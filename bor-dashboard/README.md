# Board of Reviews (BOR) Analytics Dashboard Engine

This project is a reusable, data-driven analytics system designed for CEPT University's Board of Reviews. It transforms raw Excel survey data into a comprehensive dashboard with 16 dynamic tabs, sentiment analysis, and narrative insights.

---

## 🚀 Quick Start (Using Docker)

The easiest way to run the application is using Docker. This ensures all dependencies (Python, Node.js, etc.) are correctly configured.

### Prerequisites
- Install **Docker Desktop** (for Mac or Windows): [Download here](https://www.docker.com/products/docker-desktop/)

### Setup Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shaileshtrivedicept/BoRAnalytics.git
   cd BoRAnalytics
   ```
   *(Note: If prompted for a password, use a Personal Access Token as discussed.)*

2. **Run with Docker Compose**:
   From the project root (`BoRAnalytics/`), run:
   ```bash
   docker-compose up --build
   ```

3. **Access the Application**:
   - Dashboard (Frontend): [http://localhost:3000](http://localhost:3000)
   - API Documentation (Backend): [http://localhost:8000/docs](http://localhost:8000/docs)

4. **Upload Data**:
   - When you open the dashboard, you will be prompted to upload an Excel file.
   - Use the `BOR_clean_structured_analysis_FA PG_pk1.0.xlsx` file provided in the repository.
   - The dashboard will dynamically generate all 16 tabs based on this data.

---

## 🛠️ Manual Setup (For Development)

If you prefer not to use Docker, you can set up the services manually.

### 1. Backend (FastAPI)
- **Prerequisites**: Python 3.12+
- **Setup**:
  ```bash
  cd bor-dashboard/backend
  python3 -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  pip install -r ../requirements.txt
  python3 -m textblob.download_corpora
  uvicorn main:app --reload --port 8000
  ```

### 2. Frontend (Next.js)
- **Prerequisites**: Node.js 22+
- **Setup**:
  ```bash
  cd bor-dashboard/frontend
  npm install
  npm run dev
  ```
- **Access**: [http://localhost:3000](http://localhost:3000)

---

## 📊 Dashboard Features
1. **Semester Overview**: Global KPIs and trends.
2. **Studio Bar Chart**: Compare studios by normalized scores.
3. **Studio Score Chart**: Raw panel score comparisons.
4. **Programme Comparison**: Performance by department (MLA, MID, etc.).
5. **Criteria Overview**: Radar chart showing performance across all evaluation criteria.
6. **Studio Criteria Drill-down**: Detailed heatmap-style table of studio performance per criteria.
7. **Key Insights**: Rule-driven narrative observations about the dataset.
8. **Highlights (Top/Watch List)**: Automated ranking of studios.
9. **Panel Divergence**: Identification of studios where panelists had high scoring differences.
10. **Sentiment Analytics**: Keyword clouds and representative quotes extracted from panelist remarks.

---

## 📂 Project Structure
- `/backend`: FastAPI application, data processing logic, and NLP engines.
- `/frontend`: Next.js React application with Recharts visualizations.
- `/shared`: Shared constants and thresholds.
- `docker-compose.yml`: Orchestration for the full stack.
- `requirements.txt`: Python dependencies.
