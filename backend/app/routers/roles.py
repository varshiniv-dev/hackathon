from fastapi import APIRouter
router=APIRouter(prefix='/roles',tags=['Roles'])
@router.get('')
def roles(): return [{'role':r,'purpose':p} for r,p in [('FARMER','Find best net-return market and manage harvest lots'),('BUYER','Discover lots and make offers'),('FPO','Aggregate, grade and coordinate collection'),('LOGISTICS','Coordinate pickup and transport'),('MARKET_AGENT','Inspection, auction and market coordination'),('APMC','Publish official reference prices and audit market activity')]]
