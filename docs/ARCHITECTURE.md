# Architecture
React/Vite -> FastAPI -> SQLite. Roles: Farmer, Buyer, FPO, Logistics, Market Agent, APMC. Recommendation engine computes gross revenue minus transport, expected spoilage, labour, sorting and packaging, then ranks nearby markets. Marketplace uses harvest lots and offers. APMC reference prices are controlled by the APMC workflow.
