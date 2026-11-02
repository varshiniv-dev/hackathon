MARKETS={'Mandya APMC':18,'Maddur Market':28,'Malavalli Market':42,'Srirangapatna Market':45}
SAMPLE={'Tomato':{'Mandya APMC':62,'Maddur Market':68,'Malavalli Market':60,'Srirangapatna Market':65},'Onion':{'Mandya APMC':34,'Maddur Market':36,'Malavalli Market':33,'Srirangapatna Market':35}}
def recommend(crop,qty,radius,transport,labour,sorting,packaging):
    out=[]
    for market,distance in MARKETS.items():
        if distance>radius: continue
        price=SAMPLE.get(crop,{}).get(market,50)
        gross=price*qty; transport_cost=distance*transport; spoilage=gross*0.02
        net=gross-transport_cost-spoilage-labour-sorting-packaging
        out.append({'market':market,'distance_km':distance,'modal_price':price,'gross_revenue':round(gross,2),'transport_cost':round(transport_cost,2),'expected_spoilage':round(spoilage,2),'labour_cost':labour,'sorting_cost':sorting,'packaging_cost':packaging,'net_earnings':round(net,2),'reason':f'Net return after transport and handling is ₹{net:,.0f}.'})
    return sorted(out,key=lambda x:x['net_earnings'],reverse=True)[:3]
