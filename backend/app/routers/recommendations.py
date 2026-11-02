from fastapi import APIRouter
from ..schemas import RecommendRequest
from ..services.recommendation import recommend
router=APIRouter(prefix='/recommendations',tags=['Recommendations'])
@router.post('')
def get_recommendations(req:RecommendRequest): return {'crop':req.crop,'quantity':req.quantity,'location':req.location,'radius_km':req.radius_km,'recommendations':recommend(req.crop,req.quantity,req.radius_km,req.transport_per_km,req.labour,req.sorting,req.packaging)}
