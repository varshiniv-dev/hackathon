from fastapi import APIRouter
from ..database import get_db
from ..schemas import LotCreate,OfferCreate
router=APIRouter(prefix='/marketplace',tags=['Marketplace'])
@router.post('/lots')
def create_lot(x:LotCreate):
 con=get_db(); cur=con.execute('INSERT INTO harvest_lots(farmer_id,crop,quantity,location,condition,harvest_date) VALUES(?,?,?,?,?,?)',(x.farmer_id,x.crop,x.quantity,x.location,x.condition,x.harvest_date)); con.commit(); i=cur.lastrowid; con.close(); return {'id':i,**x.model_dump(),'status':'OPEN'}
@router.get('/lots')
def lots():
 con=get_db(); rows=con.execute('SELECT * FROM harvest_lots WHERE status="OPEN" ORDER BY id DESC').fetchall(); con.close(); return [dict(r) for r in rows]
@router.post('/offers')
def offer(x:OfferCreate):
 con=get_db(); cur=con.execute('INSERT INTO offers(lot_id,buyer_id,quantity,offer) VALUES(?,?,?,?)',(x.lot_id,x.buyer_id,x.quantity,x.offer)); con.commit(); i=cur.lastrowid; con.close(); return {'id':i,**x.model_dump(),'status':'PENDING'}
@router.get('/offers')
def offers():
 con=get_db(); rows=con.execute('SELECT * FROM offers ORDER BY id DESC').fetchall(); con.close(); return [dict(r) for r in rows]
