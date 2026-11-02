from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from .database import init_db
from .auth import router as auth_router
from .routers.recommendations import router as rec_router
from .routers.markets import router as market_router
from .routers.apmc import router as apmc_router
from .routers.marketplace import router as marketplace_router
from .routers.roles import router as roles_router
BASE=Path(__file__).resolve().parents[2]
app=FastAPI(title='AgriConnect AI',version='1.0.0')
app.add_middleware(CORSMiddleware,allow_origins=['*'],allow_credentials=True,allow_methods=['*'],allow_headers=['*'])
@app.on_event('startup')
def startup(): init_db()
@app.get('/health')
def health(): return {'status':'ok','service':'AgriConnect AI'}
@app.get('/meta')
def meta(): return {'app':'AgriConnect AI','mode':'hackathon-demo','live_price_api':'optional','fallback':'cached/sample'}
app.include_router(auth_router); app.include_router(rec_router); app.include_router(market_router); app.include_router(apmc_router); app.include_router(marketplace_router); app.include_router(roles_router)
STATIC=BASE/'frontend'/'dist'
if STATIC.exists(): app.mount('/assets',StaticFiles(directory=STATIC/'assets'),name='assets')
@app.get('/')
def home():
    f=STATIC/'index.html'
    return FileResponse(f) if f.exists() else {'message':'Backend running. Build frontend with npm run build.'}
