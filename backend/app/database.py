import sqlite3
from pathlib import Path
DB=Path(__file__).resolve().parent.parent/'agriconnect.db'
def get_db():
    con=sqlite3.connect(DB); con.row_factory=sqlite3.Row; return con
def init_db():
    con=get_db(); cur=con.cursor()
    cur.executescript('''
    CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,email TEXT UNIQUE,password TEXT,role TEXT,location TEXT);
    CREATE TABLE IF NOT EXISTS market_prices(id INTEGER PRIMARY KEY AUTOINCREMENT,market TEXT,crop TEXT,variety TEXT,low REAL,modal REAL,high REAL,date TEXT,source TEXT,updated_by TEXT);
    CREATE TABLE IF NOT EXISTS harvest_lots(id INTEGER PRIMARY KEY AUTOINCREMENT,farmer_id INTEGER,crop TEXT,quantity REAL,location TEXT,condition TEXT,harvest_date TEXT,status TEXT DEFAULT 'OPEN');
    CREATE TABLE IF NOT EXISTS offers(id INTEGER PRIMARY KEY AUTOINCREMENT,lot_id INTEGER,buyer_id INTEGER,quantity REAL,offer REAL,status TEXT DEFAULT 'PENDING');
    CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY AUTOINCREMENT,lot_id INTEGER,buyer_id INTEGER,farmer_id INTEGER,amount REAL,status TEXT,created_at TEXT);
    CREATE TABLE IF NOT EXISTS audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,actor TEXT,action TEXT,entity TEXT,created_at TEXT);
    ''')
    if cur.execute('SELECT COUNT(*) FROM users').fetchone()[0]==0:
        users=[('Demo Farmer','farmer@demo.in','demo123','FARMER','Mandya'),('Demo Buyer','buyer@demo.in','demo123','BUYER','Mandya'),('Demo FPO','fpo@demo.in','demo123','FPO','Mandya'),('Demo Logistics','logistics@demo.in','demo123','LOGISTICS','Mandya'),('Demo Market Agent','agent@demo.in','demo123','MARKET_AGENT','Mandya'),('APMC Officer','apmc@demo.in','apmc123','APMC','Mandya')]
        cur.executemany('INSERT INTO users(name,email,password,role,location) VALUES(?,?,?,?,?)',users)
    if cur.execute('SELECT COUNT(*) FROM market_prices').fetchone()[0]==0:
        rows=[('Mandya APMC','Tomato','Local',45,62,72),('Maddur Market','Tomato','Local',48,68,78),('Malavalli Market','Tomato','Local',42,60,70),('Mandya APMC','Onion','Red',28,34,41),('Maddur Market','Onion','Red',27,36,43),('Srirangapatna Market','Tomato','Local',44,65,75)]
        import datetime
        cur.executemany('INSERT INTO market_prices(market,crop,variety,low,modal,high,date,source,updated_by) VALUES(?,?,?,?,?,?,?,?,?)',[(a,b,c,d,e,f,datetime.date.today().isoformat(),'DEMO','SYSTEM') for a,b,c,d,e,f in rows])
    con.commit(); con.close()
