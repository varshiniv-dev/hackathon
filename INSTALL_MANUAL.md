# Windows manual install
Backend: open terminal in backend; py -m venv .venv; .\.venv\Scripts\Activate.ps1; pip install -r requirements.txt; Copy-Item .env.example .env; python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
Frontend: open second terminal; cd frontend; npm install; npm run dev
If timezone error occurs, requirements already includes tzdata; run pip install tzdata.
