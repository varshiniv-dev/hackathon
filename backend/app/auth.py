from fastapi import APIRouter, HTTPException
from .database import get_db
from .schemas import Login
router = APIRouter(prefix='/auth', tags=['Auth'])


@router.post('/login')
def login(data: Login):
    con = get_db()
    row = con.execute('SELECT id,name,email,role,location FROM users WHERE email=? AND password=?',
                      (data.email, data.password)).fetchone()
    con.close()
    if not row:
        raise HTTPException(401, 'Invalid credentials')
    return dict(row)
