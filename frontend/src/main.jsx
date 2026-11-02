import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API = (import.meta.env.VITE_API_URL || "https://agriconnect-ai-omnl.onrender.com").replace(/\/+$/, "");

const roles = [
  ["FARMER", "🌱"],
  ["BUYER", "🛒"],
  ["FPO", "🌾"],
  ["LOGISTICS", "🚚"],
  ["MARKET_AGENT", "🤝"],
  ["APMC", "🏛️"],
];

const DEMO_LOTS = [
  { id: 1, crop: "Tomato", quantity: 500, location: "Mandya", condition: "Mixed / Unsorted", farmer_id: 1 },
  { id: 2, crop: "Onion", quantity: 300, location: "Maddur", condition: "Harvest lot • Ready for pickup", farmer_id: 1 },
  { id: 3, crop: "Tomato", quantity: 250, location: "Malavalli", condition: "Mixed ripeness", farmer_id: 1 },
];

const PRICES = [
  { market: "Mandya APMC", crop: "Tomato", modal: 62, low: 45, high: 72 },
  { market: "Maddur Market", crop: "Tomato", modal: 68, low: 48, high: 78 },
  { market: "Malavalli Market", crop: "Tomato", modal: 60, low: 42, high: 70 },
  { market: "Srirangapatna Market", crop: "Tomato", modal: 65, low: 44, high: 75 },
];

const DISTANCES = {
  "Mandya APMC": 18,
  "Maddur Market": 28,
  "Malavalli Market": 42,
  "Srirangapatna Market": 45,
};

const CROP_PRICES = {
  Tomato: { "Mandya APMC": 62, "Maddur Market": 68, "Malavalli Market": 60, "Srirangapatna Market": 65 },
  Onion: { "Mandya APMC": 34, "Maddur Market": 36, "Malavalli Market": 33, "Srirangapatna Market": 35 },
  Potato: { "Mandya APMC": 28, "Maddur Market": 31, "Malavalli Market": 29, "Srirangapatna Market": 30 },
};

function calculateDemo(crop, quantity, radius, transport = 20, labour = 500, sorting = 0, packaging = 300) {
  const prices = CROP_PRICES[crop] || CROP_PRICES.Tomato;
  return Object.entries(DISTANCES)
    .filter(([, distance]) => distance <= radius)
    .map(([market, distance]) => {
      const modal = prices[market] || 50;
      const gross = modal * quantity;
      const transportCost = distance * transport;
      const spoilage = gross * 0.02;
      const net = gross - transportCost - spoilage - labour - sorting - packaging;
      return {
        market,
        distance_km: distance,
        modal_price: modal,
        gross_revenue: Math.round(gross),
        transport_cost: Math.round(transportCost),
        expected_spoilage: Math.round(spoilage),
        labour_cost: labour,
        sorting_cost: sorting,
        packaging_cost: packaging,
        net_earnings: Math.round(net),
        reason: `Net return after transport, 2% expected spoilage and handling is ₹${Math.round(net).toLocaleString()}.`,
      };
    })
    .sort((a, b) => b.net_earnings - a.net_earnings)
    .slice(0, 3);
}

async function fetchJson(path, options = {}, timeoutMs = 8000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function App() {
  const [role, setRole] = useState("FARMER");
  const [crop, setCrop] = useState("Tomato");
  const [qty, setQty] = useState(500);
  const [radius, setRadius] = useState(50);
  const [results, setResults] = useState([]);
  const [lots, setLots] = useState(DEMO_LOTS);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("READY");
  const [offerLot, setOfferLot] = useState(null);

  async function recommend() {
    setLoading(true);
    setMode("CALCULATING");
    const payload = {
      crop,
      quantity: Number(qty),
      location: "Mandya",
      radius_km: Number(radius),
      transport_per_km: 20,
      labour: 500,
      sorting: 0,
      packaging: 300,
    };

    try {
      const data = await fetchJson("/recommendations", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const apiResults = Array.isArray(data.recommendations) ? data.recommendations : [];
      setResults(apiResults.length ? apiResults : calculateDemo(crop, Number(qty), Number(radius)));
      setMode(apiResults.length ? "LIVE API" : "DEMO FALLBACK");
    } catch (error) {
      setResults(calculateDemo(crop, Number(qty), Number(radius)));
      setMode("DEMO FALLBACK");
    } finally {
      setLoading(false);
    }
  }

  function openRole(nextRole) {
    // Change the screen FIRST. Never make navigation depend on an API call.
    setRole(nextRole);
    if (nextRole === "BUYER") loadLots();
  }

  async function loadLots() {
    try {
      const data = await fetchJson("/marketplace/lots");
      setLots(Array.isArray(data) && data.length ? data : DEMO_LOTS);
      setMode(Array.isArray(data) && data.length ? "LIVE API" : "DEMO DATA");
    } catch {
      setLots(DEMO_LOTS);
      setMode("DEMO DATA");
    }
  }

  return (
    <div className="app">
      <header>
        <div>
          <h1>🌱 AgriConnect AI</h1>
          <p>Smart Net Earnings • Marketplace • APMC</p>
        </div>
        <span className="live">● {mode}</span>
      </header>

      <nav>
        {roles.map(([r, icon]) => (
          <button
            key={r}
            className={role === r ? "active" : ""}
            onClick={() => openRole(r)}
          >
            {icon} {r.replace("_", " ")}
          </button>
        ))}
      </nav>

      <main>
        <section className="hero">
          <h2>
            {role === "FARMER" && "Find the market that maximizes your NET earnings."}
            {role === "BUYER" && "Discover harvest lots and make offers."}
            {role === "APMC" && "Official reference prices and market oversight."}
            {role === "FPO" && "Aggregate, grade and connect farmer lots."}
            {role === "LOGISTICS" && "Coordinate pickup and transport."}
            {role === "MARKET_AGENT" && "Coordinate transparent market services."}
          </h2>
          <p>
            We rank eligible nearby markets by expected net return — not simply by the highest price.
          </p>
        </section>

        {role === "FARMER" && (
          <>
            <div className="card form">
              <h3>Market Finder</h3>

              <label>
                Crop
                <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                  <option>Tomato</option>
                  <option>Onion</option>
                  <option>Potato</option>
                </select>
              </label>

              <label>
                Quantity (kg)
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </label>

              <label>
                Location
                <input value="Mandya" readOnly />
              </label>

              <label>
                Maximum travel radius (km)
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                />
              </label>

              <button className="primary" onClick={recommend} disabled={loading}>
                {loading ? "Calculating…" : "FIND BEST MARKET"}
              </button>

              <small>Transport ₹20/km • Labour ₹500 • Packing ₹300 • 2% expected spoilage</small>
            </div>

            <div className="grid">
              {results.map((x, i) => (
                <div className="card" key={x.market}>
                  <div className="rank">#{i + 1}</div>
                  <h3>{x.market}</h3>
                  <div className="net">₹{Number(x.net_earnings).toLocaleString()} net</div>
                  <p>{x.distance_km} km • Reference/modal ₹{x.modal_price}/kg</p>
                  <hr />
                  <p>Gross ₹{Number(x.gross_revenue).toLocaleString()}</p>
                  <p>Transport −₹{Number(x.transport_cost).toLocaleString()}</p>
                  <p>Spoilage −₹{Number(x.expected_spoilage).toLocaleString()}</p>
                  <p>
                    Labour −₹{Number(x.labour_cost).toLocaleString()} • Packing −₹
                    {Number(x.packaging_cost).toLocaleString()}
                  </p>
                  <strong>Why? {x.reason}</strong>
                </div>
              ))}
            </div>
          </>
        )}

        {role === "BUYER" && (
          <>
            <div className="card">
              <h3>Harvest Marketplace</h3>
              <p>Farmers can list a whole harvest lot without manually sorting every piece.</p>
            </div>
            <div className="grid">
              {lots.map((lot) => (
                <div className="card" key={lot.id}>
                  <div className="rank">OPEN LOT</div>
                  <h3>{lot.crop} • {lot.quantity} kg</h3>
                  <p>📍 {lot.location}</p>
                  <p>Condition: {lot.condition}</p>
                  <p>Reference price is controlled by the market/APMC — buyers do not edit it.</p>
                  <button className="primary" onClick={() => setOfferLot(lot)}>
                    MAKE OFFER
                  </button>
                </div>
              ))}
            </div>

            {offerLot && (
              <div className="card">
                <h3>Offer request</h3>
                <p>
                  Offer request for <strong>{offerLot.crop} • {offerLot.quantity} kg</strong>
                </p>
                <button className="primary" onClick={() => {
                  alert("Offer submitted for farmer review.");
                  setOfferLot(null);
                }}>
                  SUBMIT OFFER
                </button>
                <button onClick={() => setOfferLot(null)}>CANCEL</button>
              </div>
            )}
          </>
        )}

        {role === "APMC" && (
          <div className="card">
            <h3>🏛️ APMC Price Control</h3>
            <p>Official/reference market prices are published and monitored here. Farmers and buyers cannot edit them.</p>
            <div className="grid">
              {PRICES.map((p) => (
                <div className="card" key={p.market + p.crop}>
                  <h3>{p.market}</h3>
                  <p>{p.crop}</p>
                  <strong>Modal ₹{p.modal}/kg</strong>
                  <p>Range ₹{p.low} – ₹{p.high}/kg</p>
                  <small>Source: demo APMC reference dataset</small>
                </div>
              ))}
            </div>
          </div>
        )}

        {role === "FPO" && (
          <div className="card">
            <h3>🌾 FPO / Collection Center</h3>
            <p>Aggregate multiple farmer harvest lots, provide optional sorting/grading/packing, and coordinate bulk sales.</p>
            <div className="stats">
              <span>✓ Aggregate lots</span>
              <span>✓ Optional grading</span>
              <span>✓ Bulk buyer connection</span>
            </div>
          </div>
        )}

        {role === "LOGISTICS" && (
          <div className="card">
            <h3>🚚 Logistics Dashboard</h3>
            <p>Coordinate pickup based on the recommended market, distance and transport requirement.</p>
            <div className="stats">
              <span>✓ Pickup coordination</span>
              <span>✓ Distance-aware</span>
              <span>✓ Transport cost considered</span>
            </div>
          </div>
        )}

        {role === "MARKET_AGENT" && (
          <div className="card">
            <h3>🤝 Licensed Market Agent / Middleman</h3>
            <p>
              The platform does not simply remove intermediaries. Market agents can facilitate
              aggregation, inspection, auction/settlement and logistics coordination.
            </p>
            <div className="stats">
              <span>✓ Farmer support</span>
              <span>✓ Buyer coordination</span>
              <span>✓ Transparent workflow</span>
            </div>
          </div>
        )}
      </main>

      <footer>
        AgriConnect AI • Hackathon MVP • Live API → Cached/Demo fallback
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
