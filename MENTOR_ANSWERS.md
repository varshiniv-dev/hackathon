# Mentor answers
- Blind farmer: only nearby markets inside a configurable radius are considered; transport changes net earnings.
- Middlemen: market agents are a supported role for inspection, auction, aggregation and coordination; the system digitizes rather than simply removes them.
- Labour: sorting, packing and handling are explicit costs. Whole harvest lots let farmers sell mixed/unsorted produce; FPO/collection centers can provide grading.
- Price integrity: APMC publishes reference prices. Farmers and buyers cannot edit official reference prices.
- APIs: internal FastAPI is required; government prices, routing and AI are optional external integrations. Use live → cached → demo fallback.
- Security: API keys stay on the backend in environment variables; never ship secrets inside React/APK.
- Existing gap: AgriConnect focuses on farmer-side expected net earnings and coordinates local market services instead of showing price alone.
