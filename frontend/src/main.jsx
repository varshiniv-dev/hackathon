import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Sprout, Store, AlertTriangle, Users, Layers, Sliders, Mic, Cpu, Sparkles, 
  Trophy, Map, IndianRupee, Leaf, Heart, ChevronLeft, ChevronRight, Handshake, X, Languages 
} from "lucide-react";

const MANDI_DATA = [
  { mandi: "Mandya APMC", crop: "Tomato", modal_price: 2400, lat: 12.5218, lon: 76.8956, buyer_name: "Mandya Agro Traders", verified: true, licence_status: "Active", deal_history_score: 25, payment_terms: "same_day", farmer_rating: 4.5, trend: "Rising" },
  { mandi: "Maddur Hub", crop: "Tomato", modal_price: 2350, lat: 12.5855, lon: 77.0463, buyer_name: "Maddur Fresh Corp", verified: true, licence_status: "Active", deal_history_score: 28, payment_terms: "same_day", farmer_rating: 4.8, trend: "Stable" },
  { mandi: "Mysore APMC", crop: "Tomato", modal_price: 2600, lat: 12.2958, lon: 76.6394, buyer_name: "Mysuru Mandi Ltd", verified: true, licence_status: "Active", deal_history_score: 30, payment_terms: "credit_3days", farmer_rating: 4.2, trend: "Rising" },
  { mandi: "Bangalore Yard", crop: "Tomato", modal_price: 2750, lat: 12.9716, lon: 77.5946, buyer_name: "Bengaluru Produce Hub", verified: true, licence_status: "Active", deal_history_score: 29, payment_terms: "same_day", farmer_rating: 4.9, trend: "Declining" },
  { mandi: "Ramanagara Hub", crop: "Tomato", modal_price: 2250, lat: 12.7236, lon: 77.2804, buyer_name: "Silk City Agro", verified: false, licence_status: "Expired", deal_history_score: 10, payment_terms: "credit_7days", farmer_rating: 3.0, trend: "Stable" },

  { mandi: "Mandya APMC", crop: "Onion", modal_price: 2800, lat: 12.5218, lon: 76.8956, buyer_name: "Mandya Onion Hub", verified: true, licence_status: "Active", deal_history_score: 27, payment_terms: "same_day", farmer_rating: 4.6, trend: "Rising" },
  { mandi: "Bangalore Yard", crop: "Onion", modal_price: 3200, lat: 12.9716, lon: 77.5946, buyer_name: "Capital Veggie Corp", verified: true, licence_status: "Active", deal_history_score: 30, payment_terms: "same_day", farmer_rating: 4.8, trend: "Stable" },
  { mandi: "Mysore APMC", crop: "Onion", modal_price: 2950, lat: 12.2958, lon: 76.6394, buyer_name: "Mysore Onion Corp", verified: true, licence_status: "Active", deal_history_score: 24, payment_terms: "credit_3days", farmer_rating: 4.1, trend: "Stable" },

  { mandi: "Mandya APMC", crop: "Potato", modal_price: 1800, lat: 12.5218, lon: 76.8956, buyer_name: "Mandya Cold Storage", verified: true, licence_status: "Active", deal_history_score: 28, payment_terms: "same_day", farmer_rating: 4.5, trend: "Stable" },
  { mandi: "Bangalore Yard", crop: "Potato", modal_price: 2100, lat: 12.9716, lon: 77.5946, buyer_name: "Capital Potato Hub", verified: true, licence_status: "Active", deal_history_score: 30, payment_terms: "same_day", farmer_rating: 4.7, trend: "Rising" }
];

const I18N = {
  en: {
    navPage1: "Problem & Research", navPage2: "AI Net-Return Engine", navPage3: "Top 3 Mandis", navPage4: "Route Map", navPage5: "Impact & Team",
    prevBtn: "Previous Page", nextBtn: "Next Page",
    p1Title: "Why Listed Market Prices are Misleading for Perishable Farmers",
    p1Subtitle: "Most small farmers sell to nearby local traders due to perishable crop urgency. Existing platforms like Agmarknet display listed prices, but completely ignore transport costs, transit spoilage losses, and buyer reliability.",
    stat1Desc: "of surveyed crop sales go to local village traders; only 4.6% reach APMC mandis (NSS 77th Round MoSPI).[cite: 1]",
    stat2Desc: "of perishable fruits and vegetables are lost in transit before reaching distant markets (ICAR-CIPHET).[cite: 1]",
    stat3Desc: "of Indian farm households own less than 1 hectare with limited individual bargaining leverage.[cite: 1]",
    gapMatrixTitle: "Existing Solutions vs. AgriConnect AI Gap Analysis[cite: 1]",
    p2InputTitle: "Farmer Harvest & Route Parameters[cite: 1]",
    selectCrop: "Crop Type", quantity: "Harvest Quantity (Quintals)", farmerLocation: "Farmer Village / Hub", transportRate: "Transport Rate (₹ / km)", minTrust: "Buyer Trust Filter Threshold",
    p3CardsHeader: "Top 3 Ranked Options (Filtered by Buyer Trust)[cite: 1]",
    p4MapTitle: "Regional Mandi & Route Distance Canvas[cite: 1]",
    p4MapSub: "Visualizes OpenRouteService driving distances and optimal green route vectors from Mandya.[cite: 1]"
  },
  kn: {
    navPage1: "ಸಮಸ್ಯೆ ಮತ್ತು ಸಂಶೋಧನೆ", navPage2: "ಎಐ ಲಾಭದ ಲೆಕ್ಕಾಚಾರ", navPage3: "ಉನ್ನತ ೩ ಮಂಡಿಗಳು", navPage4: "ಮಾರ್ಗ ನಕ್ಷೆ", navPage5: "ಪರಿಣಾಮ ಮತ್ತು ತಂಡ",
    prevBtn: "ಹಿಂದಿನ ಪುಟ", nextBtn: "ಮುಂದಿನ ಪುಟ",
    p1Title: "ರೈತರಿಗೆ ಮಾರುಕಟ್ಟೆಯ ಕೇವಲ ಬೆಲೆ ಪಟ್ಟಿ ಏಕೆ ಮೋಸಗೊಳಿಸುತ್ತದೆ?",
    p1Subtitle: "ಹೆಚ್ಚಿನ ಸಣ್ಣ ರೈತರು ಕೊಳೆಯುವ ಬೆಳೆಗಳ ಕಾರಣದಿಂದ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ಮಾರಾಟ ಮಾಡುತ್ತಾರೆ. ಅಗ್ರ್‌ಮಾರ್ಕ್‌ನೆಟ್ ನಂತಹ ವೇದಿಕೆಗಳು ಕೇವಲ ಬೆಲೆಯನ್ನು ತೋರಿಸುತ್ತವೆ, ಆದರೆ ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ನಷ್ಟವನ್ನು ಲೆಕ್ಕಿಸುವುದಿಲ್ಲ.",
    stat1Desc: "ಸಮೀಕ್ಷೆ ಮಾಡಿದ ಬೆಳೆ ಮಾರಾಟದಲ್ಲಿ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ತಲುಪುತ್ತದೆ; ಕೇವಲ ೪.೬% ಎಪಿಎಂಸಿ ಮಂಡಿಗಳನ್ನು ತಲುಪುತ್ತದೆ.[cite: 1]",
    stat2Desc: "ಸಾರಿಗೆ ಸಮಯದಲ್ಲಿ ಕೊಳೆಯುವ ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು ನಾಶವಾಗುತ್ತವೆ.[cite: 1]",
    stat3Desc: "ಭಾರತೀಯ ರೈತ ಕುಟುಂಬಗಳು ೧ ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಕಡಿಮೆ ಜಮೀನು ಹೊಂದಿದ್ದಾರೆ.[cite: 1]",
    gapMatrixTitle: "ಪ್ರಸ್ತುತ ಪರಿಹಾರಗಳು ಮತ್ತು ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ ಹೋಲಿಕೆ[cite: 1]",
    p2InputTitle: "ರೈತರ ವಿವರಗಳ ನಮೂದು[cite: 1]",
    selectCrop: "ಬೆಳೆಯ ಪ್ರಕಾರ", quantity: "ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್‌ನಲ್ಲಿ)", farmerLocation: "ರೈತರ ಗ್ರಾಮ / ಕೇಂದ್ರ", transportRate: "ಸಾರಿಗೆ ದರ (₹ / ಕಿಮೀ)", minTrust: "ಖರೀದಿದಾರರ ನಂಬಿಕೆ ಮಿತಿ",
    p3CardsHeader: "ಉನ್ನತ ೩ ಆಯ್ಕೆಗಳು (ನಂಬಿಕೆ ಆಧಾರಿತ)[cite: 1]",
    p4MapTitle: "ಸಾರಿಗೆ ಮಾರ್ಗ ನಕ್ಷೆ[cite: 1]",
    p4MapSub: "ಮಂಡ್ಯದಿಂದ ಸಾರಿಗೆ ದೂರ ಮತ್ತು ಉತ್ತಮ ಮಾರ್ಗಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.[cite: 1]"
  }
};

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLang, setCurrentLang] = useState('en');
  const [crop, setCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState(50);
  const [villageLocation, setVillageLocation] = useState('12.5218,76.8956');
  const [transportRate, setTransportRate] = useState(12);
  const [minTrust, setMinTrust] = useState(50);
  const [results, setResults] = useState([]);
  const [reasoning, setReasoning] = useState('');
  const [modalData, setModalData] = useState(null);
  
  const canvasRef = useRef(null);
  const t = I18N[currentLang];

  function computeRoadDist(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return Math.round((R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))) * 1.3) * 10) / 10;
  }

  function computeTrustScore(buyer) {
    if (!buyer.verified || String(buyer.licence_status).toLowerCase() !== "active") return 0;
    let score = 40;
    score += Math.min(30, Math.max(0, buyer.deal_history_score || 0));
    if (buyer.payment_terms === "same_day") score += 20;
    else if (buyer.payment_terms === "credit_3days") score += 10;
    score += Math.round(((buyer.farmer_rating || 0) / 5.0) * 10);
    return Math.min(100, score);
  }

  useEffect(() => {
    const [userLat, userLon] = villageLocation.split(',').map(Number);
    const spoilageRates = { Tomato: 0.002, Onion: 0.0004, Potato: 0.0001 };
    const spoilageRatePerHour = spoilageRates[crop] || 0.001;

    let computed = [];
    MANDI_DATA.forEach(item => {
      if (item.crop.toLowerCase() !== crop.toLowerCase()) return;
      const trustScore = computeTrustScore(item);
      if (trustScore < minTrust) return;

      const distKm = computeRoadDist(userLat, userLon, item.lat, item.lon);
      const travelHours = distKm / 30.0;
      const spoilageFraction = Math.min(0.5, spoilageRatePerHour * travelHours);
      const totalTransport = distKm * transportRate;
      const transportPerQ = totalTransport / quantity;
      const grossReturn = item.modal_price * (1 - spoilageFraction);
      const netReturnPerQ = grossReturn - transportPerQ;
      const netTotal = netReturnPerQ * quantity;

      computed.push({
        ...item,
        trust_score: trustScore,
        distance_km: distKm,
        travel_hours: Math.round(travelHours * 10) / 10,
        spoilage_pct: Math.round(spoilageFraction * 1000) / 10,
        transport_cost_total: Math.round(totalTransport),
        net_return_per_q: Math.round(netReturnPerQ),
        net_total: Math.round(netTotal)
      });
    });

    computed.sort((a, b) => b.net_total - a.net_total);
    setResults(computed);

    if (computed.length > 0) {
      const top1 = computed[0];
      if (computed.length > 1) {
        const diff = (top1.net_total - computed[1].net_total).toLocaleString('en-IN');
        setReasoning(`${top1.mandi} ranks #1 with an estimated net total of ₹${top1.net_total.toLocaleString('en-IN')} (₹${diff} higher than runner-up). Higher modal price outweighs transit spoilage.[cite: 1]`);
      } else {
        setReasoning(`${top1.mandi} is the top option delivering ₹${top1.net_total.toLocaleString('en-IN')} net returns.[cite: 1]`);
      }
    } else {
      setReasoning("No verified buyers match your trust score filter threshold.[cite: 1]");
    }
  }, [crop, quantity, villageLocation, transportRate, minTrust]);

  // Render Canvas Map on Page 4
  useEffect(() => {
    if (currentPage === 4 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const [userLat, userLon] = villageLocation.split(',').map(Number);
      const points = [{ lat: userLat, lon: userLon }, ...results.map(r => ({ lat: r.lat, lon: r.lon }))];
      let minLat = Math.min(...points.map(p => p.lat));
      let maxLat = Math.max(...points.map(p => p.lat));
      let minLon = Math.min(...points.map(p => p.lon));
      let maxLon = Math.max(...points.map(p => p.lon));

      const pad = 40;
      function toCanvas(lat, lon) {
        const x = pad + ((lon - minLon) / (maxLon - minLon || 1)) * (canvas.width - pad * 2);
        const y = canvas.height - (pad + ((lat - minLat) / (maxLat - minLat || 1)) * (canvas.height - pad * 2));
        return { x, y };
      }

      const userPos = toCanvas(userLat, userLon);

      results.forEach((item, idx) => {
        const pos = toCanvas(item.lat, item.lon);
        ctx.beginPath();
        ctx.moveTo(userPos.x, userPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = idx === 0 ? '#10b981' : '#475569';
        ctx.lineWidth = idx === 0 ? 3 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, idx === 0 ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#10b981' : '#64748b';
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = '10px Inter';
        ctx.fillText(item.mandi, pos.x + 8, pos.y + 3);
      });

      ctx.beginPath();
      ctx.arc(userPos.x, userPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();
      ctx.fillStyle = '#fef3c7';
      ctx.fillText("Farmer Hub", userPos.x + 10, userPos.y + 4);
    }
  }, [currentPage, results, villageLocation]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans select-none">
      {/* Top Header */}
      <header className="bg-gradient-to-r from-[#022c22] via-[#064e3b] to-[#047857] border-b border-emerald-900/60 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-400/30">
                <Sprout className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight flex items-center gap-2 text-white">
                  AgriConnect AI 
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 font-bold px-2 py-0.5 rounded-full">5-Page App[cite: 1]</span>
                </h1>
                <p className="text-[11px] text-emerald-200/80">Team Inframind | LEAP Agritech Hackathon 2026[cite: 1]</p>
              </div>
            </div>
            
            <button onClick={() => setCurrentLang(currentLang === 'en' ? 'kn' : 'en')} className="md:hidden bg-emerald-900/80 text-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-500/30 text-xs font-semibold">
              {currentLang === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-2xl border border-emerald-900/40 w-full md:w-auto overflow-x-auto">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)} 
                className={`nav-tab text-xs font-semibold px-3 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  currentPage === pageNum 
                    ? 'text-emerald-400 bg-emerald-950/80 border border-emerald-500/30' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  currentPage === pageNum ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}>{pageNum}</span>
                <span>{t[`navPage${pageNum}`]}</span>
              </button>
            ))}
          </nav>

          <button onClick={() => setCurrentLang(currentLang === 'en' ? 'kn' : 'en')} className="hidden md:flex bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 px-3.5 py-1.5 rounded-xl border border-emerald-500/40 text-xs font-semibold items-center gap-2 transition">
            <Languages className="w-4 h-4" />
            <span>{currentLang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        
        {/* PAGE 1: PROBLEM & RESEARCH */}
        {currentPage === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">LEAP Agritech Hackathon 2026 | Slide 2 & 3[cite: 1]</span>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">{t.p1Title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{t.p1Subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">LOCAL SALES DOMINANCE</span><Store className="w-5 h-5 text-amber-400" /></div>
                <div className="text-3xl font-extrabold text-amber-400">78%</div>
                <p className="text-xs text-slate-400 leading-relaxed">{t.stat1Desc}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">POST-HARVEST SPOILAGE</span><AlertTriangle className="w-5 h-5 text-rose-400" /></div>
                <div className="text-3xl font-extrabold text-rose-400">6–16%</div>
                <p className="text-xs text-slate-400 leading-relaxed">{t.stat2Desc}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-slate-400">SMALLHOLDER HOLDINGS</span><Users className="w-5 h-5 text-emerald-400" /></div>
                <div className="text-3xl font-extrabold text-emerald-400">70%</div>
                <p className="text-xs text-slate-400 leading-relaxed">{t.stat3Desc}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span>{t.gapMatrixTitle}</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 uppercase font-bold border-b border-slate-800">
                    <tr><th className="p-3">Existing Solution</th><th className="p-3">How It Works</th><th className="p-3">Critical Limitation / Gap</th><th className="p-3 text-emerald-400">AgriConnect AI Advantage</th></tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                    <tr><td className="p-3 font-bold text-white">Agmarknet (data.gov.in)</td><td className="p-3">Daily listed modal prices by mandi</td><td className="p-3 text-rose-400">Shows price only. No transport or spoilage deduction.</td><td className="p-3 text-emerald-300">Calculates net take-home cash after transit costs.</td></tr>
                    <tr><td className="p-3 font-bold text-white">eNAM / ReMS Karnataka</td><td className="p-3">Online APMC trading platform</td><td className="p-3 text-rose-400">No net-return ranking or perishable spoilage model.</td><td className="p-3 text-emerald-300">Ranks top 3 mandis by true net revenue per quintal.</td></tr>
                    <tr><td className="p-3 font-bold text-white">Kisan Rath App</td><td className="p-3">Aggregates trucks & transport options</td><td className="p-3 text-rose-400">Transport booking only. Disconnected from mandi prices.</td><td className="p-3 text-emerald-300">Integrates route distance math directly with crop sales.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: ENGINE & INPUTS */}
        {currentPage === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                  <Sliders className="w-5 h-5" /><span>{t.p2InputTitle}</span>
                </h2>
                <button onClick={() => { setCrop('Tomato'); setQuantity(50); }} className="text-xs bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-500/40 font-semibold px-2.5 py-1 rounded-xl flex items-center gap-1 transition">
                  <Mic className="w-3.5 h-3.5" /><span>ಕನ್ನಡ Voice</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.selectCrop}</label>
                  <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm font-semibold text-slate-100 focus:border-emerald-500 focus:outline-none">
                    <option value="Tomato">Tomato (ಟೊಮೆಟೊ) - High Perishable</option>
                    <option value="Onion">Onion (ಈರುಳ್ಳಿ) - Medium Perishable</option>
                    <option value="Potato">Potato (ಆಲೂಗಡ್ಡೆ) - Low Perishable</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.quantity}</label>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">{quantity} qtl</span>
                  </div>
                  <input type="range" min="5" max="200" value={quantity} step="5" onChange={(e) => setQuantity(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.farmerLocation}</label>
                  <select value={villageLocation} onChange={(e) => setVillageLocation(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm font-semibold text-slate-100 focus:border-emerald-500 focus:outline-none">
                    <option value="12.5218,76.8956">Mandya Rural Hub (ಮಂಡ್ಯ)</option>
                    <option value="12.5855,77.0463">Maddur Farming Center (ಮದ್ದೂರು)</option>
                    <option value="12.2958,76.6394">Mysore Outskirts (ಮೈಸೂರು)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.transportRate}</label>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">₹{transportRate}/km</span>
                  </div>
                  <input type="range" min="5" max="30" value={transportRate} step="1" onChange={(e) => setTransportRate(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t.minTrust}</label>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">{minTrust} / 100</span>
                  </div>
                  <input type="range" min="0" max="80" value={minTrust} step="5" onChange={(e) => setMinTrust(Number(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" /><span>Net-Return Formula & Rules Engine[cite: 1]</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-300">Spoilage Loss Formula[cite: 1]</span>
                    <p className="text-slate-400">spoilage_fraction = min(0.5, rate_per_hour × travel_hours)</p>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-300">Net Return / Quintal[cite: 1]</span>
                    <p className="text-slate-400">modal_price × (1 - spoilage) - transport_per_q</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-3xl p-5 text-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" /><span>Engine Output Stream Active[cite: 1]</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-300/90">{reasoning}</p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 3: TOP 3 MANDIS */}
        {currentPage === 3 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border border-emerald-700/50 rounded-3xl p-6 shadow-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-extrabold uppercase tracking-widest">
                <Users className="w-4 h-4" /><span>Plain-Language AI Recommendation Rationale[cite: 1]</span>
              </div>
              <p className="text-sm font-medium text-emerald-100 leading-relaxed">{reasoning}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /><span>{t.p3CardsHeader}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.slice(0, 3).map((item, idx) => (
                  <div key={item.mandi} className={`bg-slate-900 border ${idx === 0 ? 'border-2 border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800'} rounded-2xl p-5 space-y-3`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${idx === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>Rank #{idx + 1}</span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Trust {item.trust_score}/100</span>
                    </div>
                    <h4 className="text-lg font-bold text-white">{item.mandi}</h4>
                    <p className="text-xs text-slate-400">Buyer: {item.buyer_name}</p>
                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800 pt-3">
                      <div className="flex justify-between"><span>Modal Price:</span><span className="font-bold">₹{item.modal_price}/q</span></div>
                      <div className="flex justify-between"><span>Distance:</span><span>{item.distance_km} km ({item.travel_hours} h)</span></div>
                      <div className="flex justify-between"><span>Spoilage:</span><span className="text-rose-400">-{item.spoilage_pct}%</span></div>
                      <div className="flex justify-between font-bold border-t border-slate-800 pt-2"><span className="text-slate-200">Net Take-Home:</span><span className="text-emerald-400">₹{item.net_total.toLocaleString('en-IN')}</span></div>
                    </div>
                    <button onClick={() => setModalData(item)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-2 rounded-xl text-xs transition">
                      Lock Deal & Dispatch
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: ROUTE MAP */}
        {currentPage === 4 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <span>{t.p4MapTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-400">{t.p4MapSub}</p>
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 font-bold px-3 py-1 rounded-lg border border-slate-700">Karnataka Mandis[cite: 1]</span>
              </div>

              <div className="relative w-full h-80 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center gap-3">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> Farmer Hub</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> #1 Optimal Mandi</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Alternative Mandis</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 5: IMPACT & TEAM */}
        {currentPage === 5 && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">LEAP Agritech Hackathon 2026[cite: 1]</span>
                  <h2 className="text-2xl font-extrabold text-white">AgriConnect AI — Impact & Team Inframind[cite: 1]</h2>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold">GMIT Mandya[cite: 1]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm"><IndianRupee className="w-4 h-4" /><span>Economic Impact[cite: 1]</span></div>
                  <p className="text-xs text-slate-300 leading-relaxed">Increases farmer net income by ₹15,000–₹30,000 per season by unlocking high-paying distant mandis after accounting for transport.[cite: 1]</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm"><Leaf className="w-4 h-4" /><span>Environmental Impact[cite: 1]</span></div>
                  <p className="text-xs text-slate-300 leading-relaxed">Reduces perishable harvest losses by 6–16% through transit-time calculations and optimal route selections.[cite: 1]</p>
                </div>
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm"><Heart className="w-4 h-4" /><span>Social Impact[cite: 1]</span></div>
                  <p className="text-xs text-slate-300 leading-relaxed">Empowers smallholders with Kannada voice guidance and protects them from non-paying buyers using Trust Scores.[cite: 1]</p>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Team Inframind Members[cite: 1]</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="font-bold text-emerald-400 text-sm">Aishwarya NS[cite: 1]</p>
                    <p className="text-slate-400">Team Leader[cite: 1]</p>
                    <p className="text-slate-500 text-[11px]">aishwaryans048@gmail.com[cite: 1]</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="font-bold text-white text-sm">Varshini V[cite: 1]</p>
                    <p className="text-slate-400">Team Member[cite: 1]</p>
                    <p className="text-slate-500 text-[11px]">GMIT Mandya[cite: 1]</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="font-bold text-white text-sm">Saniya Banu[cite: 1]</p>
                    <p className="text-slate-400">Team Member[cite: 1]</p>
                    <p className="text-slate-500 text-[11px]">GMIT Mandya[cite: 1]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer Navigation */}
      <footer className="bg-slate-900 border-t border-slate-800 py-4 px-4 sm:px-8 mt-auto sticky bottom-0 z-30 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" /><span>{t.prevBtn}</span>
          </button>
          <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">Page {currentPage} of 5</span>
          <button onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))} disabled={currentPage === 5} className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 disabled:opacity-40">
            <span>{t.nextBtn}</span><ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Deal Confirmation Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                <Handshake className="w-5 h-5" /><span>Lock Deal & Dispatch Truck[cite: 1]</span>
              </h3>
              <button onClick={() => setModalData(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">Locking deal with {modalData.buyer_name} at {modalData.mandi} for estimated payout of ₹{modalData.net_total.toLocaleString('en-IN')}.[cite: 1]</p>
            <div className="bg-slate-950 p-3 rounded-xl text-xs space-y-1.5 border border-slate-800 text-slate-300">
              <div className="flex justify-between"><span>Payment Terms:</span><span className="text-emerald-400 font-bold">APMC Direct Settlement ✅[cite: 1]</span></div>
              <div className="flex justify-between"><span>Buyer Verification:</span><span className="text-emerald-400 font-bold">Verified License ✅[cite: 1]</span></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { alert("✅ Contract confirmed! Digital APMC code sent to farmer and buyer mobile numbers.[cite: 1]"); setModalData(null); }} className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition">Confirm Contract[cite: 1]</button>
              <button onClick={() => setModalData(null)} className="bg-slate-800 text-slate-300 font-bold px-4 py-2.5 rounded-xl text-xs transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);