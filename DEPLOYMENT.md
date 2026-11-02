# Deployment checklist
1. Push backend and frontend to GitHub.
2. Deploy Python backend to a Python-capable HTTPS host.
3. Set DATABASE_URL and secret API keys as platform environment variables; never commit .env.
4. Build frontend with VITE_API_URL=https://YOUR-BACKEND.example.com npm run build.
5. Deploy frontend or copy dist into the backend root and serve it.
6. Test /health and /docs.
7. Build Android with Capacitor using the HTTPS backend URL.

For the hackathon, keep a demo-data fallback so market recommendations still work if an external price/routing API is unavailable.
