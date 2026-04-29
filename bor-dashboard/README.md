# 📊 BOR Analytics Engine

A production-ready, modular, data-driven dashboard application for Board of Reviews (BOR) academic analytics. This system transforms raw Excel datasets into a comprehensive 16-tab interactive dashboard.

---

## 🚀 Quick Start (Easiest Way)

If you have **Docker** installed, you can start the entire system with one command:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bor-dashboard-repo
   ```

2. **Run with Docker:**
   ```bash
   docker-compose up --build
   ```

3. **Access the Dashboard:**
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Manual Setup (Step-by-Step)

If you prefer to run the backend and frontend separately for development, follow these steps:

### 1. Prerequisites
Ensure you have the following installed:
- **Python 3.12+**
- **Node.js 18+**
- **npm** (comes with Node.js)

---

### 2. Backend Setup (Python FastAPI)
The backend handles data processing, analytics, and sentiment analysis.

1. **Navigate to the backend folder:**
   ```bash
   cd bor-dashboard/backend
   ```

2. **Create a virtual environment (Recommended):**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   - Create a file named `.env` in the `backend` folder.
   - (Optional) Add your OpenAI key if you want AI-powered sentiment analysis: `OPENAI_API_KEY=your_key_here`

5. **Start the backend server:**
   ```bash
   export PYTHONPATH=$PYTHONPATH:$(pwd)
   python -m uvicorn main:app --reload --port 8000
   ```
   *The API will be available at [http://localhost:8000](http://localhost:8000). You can view the interactive documentation at `/docs`.*

---

### 3. Frontend Setup (Next.js & React)
The frontend provides the interactive dashboard UI.

1. **Open a new terminal window and navigate to the frontend folder:**
   ```bash
   cd bor-dashboard/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View the Dashboard:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 How to Use

1. **Upload Data**: Click the "UPLOAD" button (if implemented in UI) or the system will automatically load the `sample_data.xlsx` located in `backend/data_storage/`.
2. **Switch Tabs**: Use the sticky navigation bar at the top to switch between 16 different analytics views.
3. **Drill Down**: In the "Studio Criteria" tab, use the dropdown to select specific studios for detailed performance metrics.
4. **Print**: Click "PRINT REPORT" in the top right to generate a clean, print-ready PDF of the current tab.

---

## 📁 Repository Structure

- `/backend`: FastAPI application, data processing logic, and analytics engines.
- `/frontend`: Next.js React application and dashboard components.
- `/shared`: Thresholds and configuration mappings.
- `/tests`: Automated tests for backend logic.

---

## 🧪 Running Tests
To ensure the analytics engine is calculating everything correctly:
```bash
cd bor-dashboard/backend
pytest ../tests/backend
```
