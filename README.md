# AgriConnect AI — Complete Hackathon MVP

End-to-end demo architecture: Farmer, Buyer, FPO, Logistics, Market Agent, APMC; net-earnings recommendations; harvest lots/offers; APMC reference prices; SQLite; React/Vite frontend; Capacitor Android source.

## 1 Backend
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
Open http://127.0.0.1:8000/docs

## 2 Frontend
cd frontend
npm install
npm run dev

For one-server deployment: npm run build, then start backend; FastAPI serves frontend/dist.

## 3 APK source
cd mobile
npm install
npm run sync
npx cap add android
npx cap sync android
npx cap open android

Important: APK must call a deployed HTTPS backend in real use. Set VITE_API_URL before frontend build, or configure a public backend URL in the frontend.
