from pydantic import BaseModel, Field
class Login(BaseModel): email:str; password:str
class RecommendRequest(BaseModel): crop:str; quantity:float=Field(gt=0); location:str='Mandya'; radius_km:float=50; transport_per_km:float=20; labour:float=500; sorting:float=0; packaging:float=300
class LotCreate(BaseModel): farmer_id:int; crop:str; quantity:float; location:str; condition:str='Mixed / Unsorted'; harvest_date:str
class OfferCreate(BaseModel): lot_id:int; buyer_id:int; quantity:float; offer:float
class PriceUpdate(BaseModel): market:str; crop:str; variety:str='Local'; low:float; modal:float; high:float
