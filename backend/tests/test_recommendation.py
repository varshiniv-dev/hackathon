from app.services.recommendation import recommend
def test_recommendation():
 r=recommend('Tomato',500,50,20,500,0,300); assert len(r)>0; assert r[0]['net_earnings']>=r[-1]['net_earnings']
