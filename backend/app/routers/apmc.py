from fastapi import APIRouter,HTTPException
from ..database import get_db
from ..schemas import PriceUpdate
router=APIRouter(prefix='/apmc',tags=['APMC'])
@router.post('/prices')
def publish_price(p:PriceUpdate):
 con=get_db(); import datetime
 con.execute('INSERT INTO market_prices(market,crop,variety,low,modal,high,date,source,updated_by) VALUES(?,?,?,?,?,?,?,?,?)',(p.market,p.crop,p.variety,p.low,p.modal,p.high,datetime.date.today().isoformat(),'APMC','APMC_OFFICER')); con.commit(); con.close(); return {'ok':True}
@router.get('/prices')
def apmc_prices():
 con=get_db(); rows=con.execute("SELECT * FROM market_prices WHERE source='APMC' ORDER BY id DESC").fetchall(); con.close(); return [dict(r) for r in rows]
