from fastapi import APIRouter
from ..database import get_db
router=APIRouter(prefix='/markets',tags=['Markets'])
@router.get('')
def markets():
 con=get_db(); rows=con.execute('SELECT market,MIN(date) date,COUNT(*) prices FROM market_prices GROUP BY market').fetchall(); con.close(); return [dict(r) for r in rows]
@router.get('/prices')
def prices(crop:str|None=None):
 con=get_db(); q='SELECT * FROM market_prices'; args=[]
 if crop: q+=' WHERE crop=?'; args=[crop]
 rows=con.execute(q,args).fetchall(); con.close(); return [dict(r) for r in rows]
