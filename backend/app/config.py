import os
from dotenv import load_dotenv
load_dotenv()
APP_NAME='AgriConnect AI'
DATABASE_URL=os.getenv('DATABASE_URL','sqlite:///./agriconnect.db')
API_KEY=os.getenv('MARKET_PRICE_API_KEY','')
