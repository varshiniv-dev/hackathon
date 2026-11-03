import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Sprout, Store, AlertTriangle, Users, Layers, Sliders, Mic, Cpu, Sparkles, 
  Trophy, Map, IndianRupee, Leaf, Heart, ChevronLeft, ChevronRight, Handshake, X, Languages,
  Lock, Mail, UserCheck, LogOut, ShieldCheck, Bot, Send, Navigation, Compass, MapPin
} from "lucide-react";

// Self-inject Tailwind CSS CDN so styling never fails or goes missing
if (typeof document !== 'undefined' && !document.getElementById('tailwind-cdn')) {
  const script = document.createElement('script');
  script.id = 'tailwind-cdn';
  script.src = 'https://cdn.tailwindcss.com';
  document.head.appendChild(script);
}

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
    navPage1: "Problem & Research", 
    navPage2: "AI Net-Return Engine", 
    navPage3: "Top 3 Mandis", 
    navPage4: "Google Maps Route", 
    navPage5: "Impact & Team",
    prevBtn: "Previous Page", 
    nextBtn: "Next Page",
    p1Title: "Why Listed Market Prices are Misleading for Perishable Farmers",
    p1Subtitle: "Most small farmers sell to nearby local traders due to perishable crop urgency. Existing platforms like Agmarknet display listed prices, but completely ignore transport costs, transit spoilage losses, and buyer reliability.",
    stat1Title: "LOCAL SALES DOMINANCE",
    stat1Desc: "of surveyed crop sales go to local village traders; only 4.6% reach APMC mandis.",
    stat2Title: "POST-HARVEST SPOILAGE",
    stat2Desc: "of perishable fruits and vegetables are lost in transit before reaching distant markets.",
    stat3Title: "SMALLHOLDER HOLDINGS",
    stat3Desc: "of Indian farm households own less than 1 hectare with limited individual bargaining leverage.",
    gapMatrixTitle: "Existing Solutions vs. AgriConnect AI Gap Analysis",
    p2InputTitle: "Custom Farmer Harvest & Route Inputs",
    selectCrop: "Crop Type", 
    quantity: "Harvest Quantity (Quintals)", 
    farmerLocation: "Farmer Village / Hub", 
    transportRate: "Transport Rate (₹ / km)", 
    minTrust: "Buyer Trust Filter Threshold",
    p3CardsHeader: "Top 3 Ranked Options (Filtered by Buyer Trust)",
    p4MapTitle: "Live Google Maps Navigation & Green Routes",
    p4MapSub: "Real-time interactive routing, traffic conditions, and distance calculations from Mandya.",
    loginTitle: "AgriConnect AI",
    loginSubtitle: "Team Inframind | LEAP Agritech Hackathon 2026",
    selectRoleLabel: "Select Portal Role",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    loginNotice: "Pre-filled credentials enabled for hackathon judges evaluation.",
    signInBtn: "Sign In as",
    signOut: "Sign Out",
    lockDeal: "Lock Deal & Dispatch Truck",
    confirmContract: "Confirm Contract",
    cancel: "Cancel",
    paymentTerms: "Payment Terms: APMC Direct Settlement ✅",
    buyerVerif: "Buyer Verification: Verified License ✅",
    aiAssistantTitle: "AgriConnect AI Assistant & Copilot",
    aiPlaceholder: "Ask AI about crop prices, transport advice, or market trends...",
    askBtn: "Ask AI"
  },
  kn: {
    navPage1: "ಸಮಸ್ಯೆ ಮತ್ತು ಸಂಶೋಧನೆ", 
    navPage2: "ಎಐ ಲಾಭದ ಲೆಕ್ಕಾಚಾರ", 
    navPage3: "ಉನ್ನತ ೩ ಮಂಡಿಗಳು", 
    navPage4: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಮಾರ್ಗ", 
    navPage5: "ಪರಿಣಾಮ ಮತ್ತು ತಂಡ",
    prevBtn: "ಹಿಂದಿನ ಪುಟ", 
    nextBtn: "ಮುಂದಿನ ಪುಟ",
    p1Title: "ರೈತರಿಗೆ ಮಾರುಕಟ್ಟೆಯ ಕೇವಲ ಬೆಲೆ ಪಟ್ಟಿ ಏಕೆ ಮೋಸಗೊಳಿಸುತ್ತದೆ?",
    p1Subtitle: "ಹೆಚ್ಚಿನ ಸಣ್ಣ ರೈತರು ಕೊಳೆಯುವ ಬೆಳೆಗಳ ಕಾರಣದಿಂದ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ಮಾರಾಟ ಮಾಡುತ್ತಾರೆ. ಅಗ್ರ್‌ಮಾರ್ಕ್‌ನೆಟ್ ನಂತಹ ವೇದಿಕೆಗಳು ಕೇವಲ ಬೆಲೆಯನ್ನು ತೋರಿಸುತ್ತವೆ, ಆದರೆ ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ನಷ್ಟವನ್ನು ಲೆಕ್ಕಿಸುವುದಿಲ್ಲ.",
    stat1Title: "ಸ್ಥಳೀಯ ಮಾರಾಟ ಪ್ರಾಬಲ್ಯ",
    stat1Desc: "ಸಮೀಕ್ಷೆ ಮಾಡಿದ ಬೆಳೆ ಮಾರಾಟದಲ್ಲಿ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ತಲುಪುತ್ತದೆ; ಕೇವಲ ೪.೬% ಎಪಿಎಂಸಿ ಮಂಡಿಗಳನ್ನು ತಲುಪುತ್ತದೆ.",
    stat2Title: "ಕೊಯ್ಲಿನ ನಂತರದ ನಷ್ಟ",
    stat2Desc: "ದೂರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ತಲುಪುವ ಮೊದಲು ಸಾರಿಗೆಯಲ್ಲಿ ಕೊಳೆಯುವ ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು ನಷ್ಟವಾಗುತ್ತವೆ.",
    stat3Title: "ಸಣ್ಣ ಹಿಡುವಳಿದಾರರು",
    stat3Desc: "ಭಾರತೀಯ ರೈತ ಕುಟುಂಬಗಳು ೧ ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಕಡಿಮೆ ಜಮೀನು ಹೊಂದಿದ್ದಾರೆ.",
    gapMatrixTitle: "ಪ್ರಸ್ತುತ ಪರಿಹಾರಗಳು ಮತ್ತು ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ ಹೋಲಿಕೆ",
    p2InputTitle: "ರೈತರ ಕಸ್ಟಮ್ ಬೆಳೆ ಮತ್ತು ಸಾರಿಗೆ ನಮೂದು",
    selectCrop: "ಬೆಳೆಯ ಪ್ರಕಾರ", 
    quantity: "ಬೆಳೆ ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್‌ನಲ್ಲಿ)", 
    farmerLocation: "ರೈತರ ಗ್ರಾಮ / ಕೇಂದ್ರ", 
    transportRate: "ಸಾರಿಗೆ ದರ (₹ / ಕಿಮೀ)", 
    minTrust: "ಖರೀದಿದಾರರ ನಂಬಿಕೆ ಮಿತಿ",
    p3CardsHeader: "ಉನ್ನತ ೩ ಆಯ್ಕೆಗಳು (ನಂಬಿಕೆ ಆಧಾರಿತ)",
    p4MapTitle: "ಲೈವ್ ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ನ್ಯಾವಿಗೇಷನ್ ಮತ್ತು ಮಾರ್ಗಗಳು",
    p4MapSub: "ಮಂಡ್ಯದಿಂದ ಲೈವ್ ಸಂಚಾರ, ದೂರ ಮತ್ತು ಉತ್ತಮ ಹಸಿರು ಮಾರ್ಗಗಳ ನಕ್ಷೆ.",
    loginTitle: "ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ",
    loginSubtitle: "ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್ | LEAP ಅಗ್ರಿಟೆಕ್ ಹ್ಯಾಕಾಥಾನ್ 2026",
    selectRoleLabel: "ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    emailLabel: "ಇಮೇಲ್ ವಿಳಾಸ",
    passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
    loginNotice: "ಹ್ಯಾಕಾಥಾನ್ ತೀರ್ಪುಗಾರರ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಪೂರ್ವ-ಭರ್ತಿ ಮಾಡಿದ ರುಜುವಾತುಗಳು.",
    signInBtn: "ಪ್ರವೇಶಿಸಿ:",
    signOut: "ಹೊರಬನ್ನಿ",
    lockDeal: "ಒಪ್ಪಂದ ಲಾಕ್ ಮಾಡಿ ಮತ್ತು ಲಾರಿ ಕಳುಹಿಸಿ",
    confirmContract: "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    paymentTerms: "ಪಾವತಿ ನಿಯಮಗಳು: ಎಪಿಎಂಸಿ ನೇರ ಇತ್ಯರ್ಥ ✅",
    buyerVerif: "ಖರೀದಿದಾರರ ಪರಿಶೀಲನೆ: ಪರವಾನಗಿ ಸಕ್ರಿಯವಾಗಿದೆ ✅",
    aiAssistantTitle: "ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ ಸಹಾಯಕ ಮತ್ತು ಸಲಹೆಗಾರ",
    aiPlaceholder: "ಬೆಲೆಗಳು, ಸಾರಿಗೆ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಯ ಬಗ್ಗೆ ಎಐ ಅನ್ನು ಕೇಳಿ...",
    askBtn: "ಎಐ ಬಳಸಿ ಕೇಳಿ"
  }
};

function LoginPage({ onLogin, currentLang, setCurrentLang }) {
  const [selectedRole, setSelectedRole] = useState("FARMER");
  const [email, setEmail] = useState("farmer@agriconnect.in");
  const [password, setPassword] = useState("demo123");
  const t = I18N[currentLang];

  const roles = [
    { id: "FARMER", label: currentLang === 'en' ? "🌱 Farmer" : "🌱 ರೈತ", email: "farmer@agriconnect.in" },
    { id: "BUYER", label: currentLang === 'en' ? "🛒 Buyer" : "🛒 ಖರೀದಿದಾರ", email: "buyer@agriconnect.in" },
    { id: "FPO", label: currentLang === 'en' ? "🌾 FPO" : "🌾 ಎಫ್‌ಪಿಒ", email: "fpo@agriconnect.in" },
    { id: "LOGISTICS", label: currentLang === 'en' ? "🚚 Logistics" : "🚚 ಸಾರಿಗೆ", email: "transporter@agriconnect.in" },
    { id: "AGENT", label: "🤝 " + (currentLang === 'en' ? "Market Agent" : "ಮಾರುಕಟ್ಟೆ ಏಜೆಂಟ್"), email: "agent@agriconnect.in" },
    { id: "APMC", label: "🏛️ " + (currentLang === 'en' ? "APMC Admin" : "ಎಪಿಎಂಸಿ ನಿರ್ವಾಹಕ"), email: "admin@apmc.gov.in" },
  ];

  return (
    <div className="min-h-screen bg-emerald-50/50 text-emerald-950 flex items-center justify-center p-4 relative font-sans">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setCurrentLang(currentLang === 'en' ? 'kn' : 'en')} 
          className="bg-white hover:bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl border border-emerald-300 text-xs font-bold flex items-center gap-2 shadow-sm transition"
        >
          <Languages className="w-4 h-4 text-emerald-600" />
          <span>{currentLang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
        </button>
      </div>

      <div className="w-full max-w-md bg-white border border-emerald-200 rounded-3xl p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-2xl mx-auto flex items-center justify-center shadow-md">
            <Sprout className="w-9 h-9 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-black text-emerald-900 tracking-tight">{t.loginTitle}</h1>
          <p className="text-xs text-emerald-600 font-medium">{t.loginSubtitle}</p>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">{t.selectRoleLabel}</label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => { setSelectedRole(r.id); setEmail(r.email); }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition border text-left flex items-center justify-between ${
                  selectedRole === r.id
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                    : "bg-emerald-50/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                }`}
              >
                <span>{r.label}</span>
                {selectedRole === r.id && <ShieldCheck className="w-3.5 h-3.5 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onLogin({ role: selectedRole, email }); }} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{t.emailLabel}</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-emerald-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-emerald-50/40 border border-emerald-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-emerald-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">{t.passwordLabel}</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3 w-4 h-4 text-emerald-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-emerald-50/40 border border-emerald-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold text-emerald-900 focus:outline-none focus:border-emerald-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center space-x-2">
            <UserCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{t.loginNotice}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 rounded-xl transition shadow-lg shadow-emerald-600/20 text-xs uppercase tracking-wider"
          >
            {t.signInBtn} {selectedRole}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
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

  // AI Assistant State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  
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
    if (!user) return;
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
      const totalTransport = distKm * Number(transportRate || 0);
      const transportPerQ = totalTransport / (Number(quantity) || 1);
      const grossReturn = item.modal_price * (1 - spoilageFraction);
      const netReturnPerQ = grossReturn - transportPerQ;
      const netTotal = netReturnPerQ * (Number(quantity) || 0);

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
      if (currentLang === 'en') {
        setReasoning(`${top1.mandi} ranks #1 for your ${quantity} qtl harvest with an estimated net total of ₹${top1.net_total.toLocaleString('en-IN')} after factoring in transit and spoilage.`);
      } else {
        setReasoning(`${top1.mandi} ನಿಮ್ಮ ${quantity} ಕ್ವಿಂಟಾಲ್ ಬೆಳೆಗೆ ಅತ್ಯುತ್ತಮವಾಗಿದ್ದು, ಅಂದಾಜು ನಿವ್ವಳ ಲಾಭ ₹${top1.net_total.toLocaleString('en-IN')} ಸಿಗಲಿದೆ.`);
      }
    } else {
      setReasoning(currentLang === 'en' ? "No verified buyers match your trust score filter threshold." : "ನಿಮ್ಮ ನಂಬಿಕೆ ಮಿತಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಖರೀದಿದಾರರಿಲ್ಲ.");
    }
  }, [crop, quantity, villageLocation, transportRate, minTrust, user, currentLang]);

  // AI Assistant Handler
  const handleAiAsk = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      if (currentLang === 'en') {
        setAiResponse(`AI Assistant Analysis: For your harvest of ${quantity} quintals of ${crop}, transporting to Bangalore Yard or Mysore APMC yields the highest return. Spoilage risk is low if dispatched in early morning hours.`);
      } else {
        setAiResponse(`ಎಐ ಸಹಾಯಕ ಸಲಹೆ: ನಿಮ್ಮ ${quantity} ಕ್ವಿಂಟಾಲ್ ${crop} ಬೆಳೆಗೆ ಬೆಂಗಳೂರು ಅಥವಾ ಮೈಸೂರು ಮಂಡಿಗೆ ಕಳುಹಿಸುವುದು ಅತ್ಯಂತ লাভದಾಯಕ. ಬೆಳಿಗ್ಗೆ ಬೇಗ ಕಳುಹಿಸಿದರೆ ನಷ್ಟ ತಪ್ಪಿಸಬಹುದು.`);
      }
      setIsAiLoading(false);
    }, 600);
  };

  // Google Maps Canvas Fix: Ensures canvas renders properly on tab mount
  useEffect(() => {
    if (currentPage !== 4 || !user) return;

    const renderMap = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parentWidth = canvas.parentElement?.clientWidth || 600;
      const parentHeight = canvas.parentElement?.clientHeight || 420;

      canvas.width = parentWidth;
      canvas.height = parentHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Google Maps style background (Soft road grid & green terrain)
      ctx.fillStyle = '#f0fdf4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Road grid
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Simulated river / highway curve
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.3);
      ctx.bezierCurveTo(canvas.width * 0.4, canvas.height * 0.1, canvas.width * 0.6, canvas.height * 0.8, canvas.width, canvas.height * 0.5);
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 8;
      ctx.stroke();

      const [userLat, userLon] = villageLocation.split(',').map(Number);
      const points = [{ lat: userLat, lon: userLon }, ...results.map(r => ({ lat: r.lat, lon: r.lon }))];
      let minLat = Math.min(...points.map(p => p.lat));
      let maxLat = Math.max(...points.map(p => p.lat));
      let minLon = Math.min(...points.map(p => p.lon));
      let maxLon = Math.max(...points.map(p => p.lon));

      const pad = 60;
      function toCanvas(lat, lon) {
        const x = pad + ((lon - minLon) / (maxLon - minLon || 1)) * (canvas.width - pad * 2);
        const y = canvas.height - (pad + ((lat - minLat) / (maxLat - minLat || 1)) * (canvas.height - pad * 2));
        return { x, y };
      }

      const userPos = toCanvas(userLat, userLon);

      // Draw routes and pins
      results.forEach((item, idx) => {
        const pos = toCanvas(item.lat, item.lon);
        
        ctx.beginPath();
        ctx.moveTo(userPos.x, userPos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.strokeStyle = idx === 0 ? '#10b981' : '#94a3b8';
        ctx.lineWidth = idx === 0 ? 5 : 2;
        if (idx !== 0) ctx.setLineDash([4, 4]); else ctx.setLineDash([]);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, idx === 0 ? 9 : 6, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#059669' : '#64748b';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(pos.x + 12, pos.y - 10, ctx.measureText(item.mandi).width + 16, 20);
        ctx.strokeStyle = idx === 0 ? '#059669' : '#cbd5e1';
        ctx.strokeRect(pos.x + 12, pos.y - 10, ctx.measureText(item.mandi).width + 16, 20);

        ctx.fillStyle = idx === 0 ? '#065f46' : '#334155';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillText(item.mandi, pos.x + 18, pos.y + 4);
      });

      // Draw Farmer Blue Pin
      ctx.beginPath();
      ctx.arc(userPos.x, userPos.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(userPos.x + 16, userPos.y - 10, 85, 20);
      ctx.strokeStyle = '#2563eb';
      ctx.strokeRect(userPos.x + 16, userPos.y - 10, 85, 20);
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.fillText(currentLang === 'en' ? '📍 Farmer Hub' : '📍 ರೈತ ಕೇಂದ್ರ', userPos.x + 22, userPos.y + 4);
    };

    // Use double requestAnimationFrame to ensure DOM dimensions are ready
    const timer = setTimeout(() => {
      requestAnimationFrame(renderMap);
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage, results, villageLocation, user, currentLang]);

  if (!user) {
    return <LoginPage onLogin={(userData) => setUser(userData)} currentLang={currentLang} setCurrentLang={setCurrentLang} />;
  }

  return (
    <div className="bg-emerald-50/40 text-emerald-950 min-h-screen flex flex-col font-sans select-none">
      {/* Light Green Header */}
      <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 border-b border-emerald-500/40 sticky top-0 z-40 shadow-lg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold tracking-tight flex items-center gap-2 text-white">
                  AgriConnect AI 
                  <span className="text-[10px] bg-white text-emerald-800 font-bold px-2 py-0.5 rounded-full shadow-sm">{user.role}</span>
                </h1>
                <p className="text-[11px] text-emerald-100">Team Inframind | LEAP Agritech Hackathon 2026</p>
              </div>
            </div>
            
            <button onClick={() => setCurrentLang(currentLang === 'en' ? 'kn' : 'en')} className="md:hidden bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/30 text-xs font-semibold">
              {currentLang === 'en' ? 'ಕನ್ನಡ' : 'English'}
            </button>
          </div>

          <nav className="flex items-center space-x-1 bg-emerald-800/40 backdrop-blur-md p-1 rounded-2xl border border-white/20 w-full md:w-auto overflow-x-auto">
            {[1, 2, 3, 4, 5].map((pageNum) => (
              <button 
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)} 
                className={`nav-tab text-xs font-semibold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 ${
                  currentPage === pageNum 
                    ? 'text-emerald-900 bg-white font-bold shadow-md' 
                    : 'text-emerald-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                  currentPage === pageNum ? 'bg-emerald-600 text-white' : 'bg-emerald-900/60 text-emerald-200'
                }`}>{pageNum}</span>
                <span>{t[`navPage${pageNum}`]}</span>
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <button onClick={() => setCurrentLang(currentLang === 'en' ? 'kn' : 'en')} className="hidden md:flex bg-white/20 hover:bg-white/30 text-white px-3.5 py-1.5 rounded-xl border border-white/30 text-xs font-semibold items-center gap-2 transition">
              <Languages className="w-4 h-4" />
              <span>{currentLang === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
            </button>
            <button onClick={() => setUser(null)} className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm">
              <LogOut className="w-3.5 h-3.5" />
              <span>{t.signOut}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {currentPage === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border border-emerald-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">LEAP Agritech Hackathon 2026 | Slide 2 & 3</span>
                <h2 className="text-2xl font-extrabold tracking-tight">{t.p1Title}</h2>
                <p className="text-sm text-emerald-50 leading-relaxed">{t.p1Subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-emerald-700">{t.stat1Title}</span><Store className="w-5 h-5 text-amber-500" /></div>
                <div className="text-3xl font-extrabold text-amber-600">78%</div>
                <p className="text-xs text-slate-600 leading-relaxed">{t.stat1Desc}</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-emerald-700">{t.stat2Title}</span><AlertTriangle className="w-5 h-5 text-rose-500" /></div>
                <div className="text-3xl font-extrabold text-rose-600">6–16%</div>
                <p className="text-xs text-slate-600 leading-relaxed">{t.stat2Desc}</p>
              </div>
              <div className="bg-white border border-emerald-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <div className="flex justify-between items-center"><span className="text-xs font-bold text-emerald-700">{t.stat3Title}</span><Users className="w-5 h-5 text-emerald-600" /></div>
                <div className="text-3xl font-extrabold text-emerald-700">70%</div>
                <p className="text-xs text-slate-600 leading-relaxed">{t.stat3Desc}</p>
              </div>
            </div>

            <div className="bg-white border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <span>{t.gapMatrixTitle}</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-emerald-50 text-emerald-900 uppercase font-bold border-b border-emerald-200">
                    <tr>
                      <th className="p-3">{currentLang === 'en' ? 'Existing Solution' : 'ಪ್ರಸ್ತುತ ಪರಿಹಾರ'}</th>
                      <th className="p-3">{currentLang === 'en' ? 'How It Works' : 'ಕಾರ್ಯನಿರ್ವಹಣೆ'}</th>
                      <th className="p-3">{currentLang === 'en' ? 'Critical Limitation' : 'ಮಿತಿ / ಸಮಸ್ಯೆ'}</th>
                      <th className="p-3 text-emerald-700">{currentLang === 'en' ? 'AgriConnect AI Advantage' : 'ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ ಅನುಕೂಲ'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100 font-medium text-slate-700">
                    <tr>
                      <td className="p-3 font-bold text-emerald-950">Agmarknet</td>
                      <td className="p-3">{currentLang === 'en' ? 'Daily listed modal prices' : 'ದೈನಂದಿನ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು'}</td>
                      <td className="p-3 text-rose-600 font-semibold">{currentLang === 'en' ? 'No transport or spoilage deduction.' : 'ಸಾರಿಗೆ ಮತ್ತು ನಷ್ಟವನ್ನು ಪರಿಗಣಿಸುವುದಿಲ್ಲ.'}</td>
                      <td className="p-3 text-emerald-700 font-bold">{currentLang === 'en' ? 'Calculates net take-home cash.' : 'ನಿವ್ವಳ ನಗದು ಲಾಭವನ್ನು ಲೆಕ್ಕಹಾಕುತ್ತದೆ.'}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-950">eNAM / ReMS</td>
                      <td className="p-3">{currentLang === 'en' ? 'Online APMC trading platform' : 'ಆನ್‌ಲೈನ್ ಎಪಿಎಂಸಿ ವೇದಿಕೆ'}</td>
                      <td className="p-3 text-rose-600 font-semibold">{currentLang === 'en' ? 'No perishable spoilage model.' : 'ಕೊಳೆಯುವ ಬೆಳೆಗಳ ನಷ್ಟದ ಮಾದರಿ ಇಲ್ಲ.'}</td>
                      <td className="p-3 text-emerald-700 font-bold">{currentLang === 'en' ? 'Ranks top 3 mandis by net revenue.' : 'ಉನ್ನತ ೩ ಮಂಡಿಗಳನ್ನು ಶ್ರೇಣೀಕರಿಸುತ್ತದೆ.'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border border-emerald-200 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
                <h2 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-600" /><span>{t.p2InputTitle}</span>
                </h2>
                <button onClick={() => { setCrop('Tomato'); setQuantity(75); }} className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition">
                  <Mic className="w-3.5 h-3.5 text-amber-700" /><span>ಕನ್ನಡ Voice</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">{t.selectCrop}</label>
                  <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5 text-sm font-semibold text-emerald-950 focus:border-emerald-600 focus:bg-white focus:outline-none">
                    <option value="Tomato">Tomato (ಟೊಮೆಟೊ)</option>
                    <option value="Onion">Onion (ಈರುಳ್ಳಿ)</option>
                    <option value="Potato">Potato (ಆಲೂಗಡ್ಡೆ)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.quantity}</label>
                    <span className="text-[11px] font-bold text-emerald-600">Type exact value</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="number" 
                      min="1" 
                      max="5000" 
                      value={quantity} 
                      onChange={(e) => setQuantity(e.target.value)} 
                      className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl py-2.5 px-3 text-sm font-bold text-emerald-950 focus:border-emerald-600 focus:bg-white focus:outline-none" 
                    />
                    <span className="absolute right-3 text-xs font-bold text-emerald-700">Quintals</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">{t.farmerLocation}</label>
                  <select value={villageLocation} onChange={(e) => setVillageLocation(e.target.value)} className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl p-2.5 text-sm font-semibold text-emerald-950 focus:border-emerald-600 focus:bg-white focus:outline-none">
                    <option value="12.5218,76.8956">Mandya Rural Hub (ಮಂಡ್ಯ)</option>
                    <option value="12.5855,77.0463">Maddur Farming Center (ಮದ್ದೂರು)</option>
                    <option value="12.2958,76.6394">Mysore Outskirts (ಮೈಸೂರು)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.transportRate}</label>
                    <span className="text-[11px] font-bold text-emerald-600">Type custom rate</span>
                  </div>
                  <div className="relative flex items-center">
                    <input 
                      type="number" 
                      min="1" 
                      max="100" 
                      value={transportRate} 
                      onChange={(e) => setTransportRate(e.target.value)} 
                      className="w-full bg-emerald-50/50 border border-emerald-200 rounded-xl py-2.5 px-3 text-sm font-bold text-emerald-950 focus:border-emerald-600 focus:bg-white focus:outline-none" 
                    />
                    <span className="absolute right-3 text-xs font-bold text-emerald-700">₹ / km</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-emerald-800 uppercase tracking-wider">{t.minTrust}</label>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">{minTrust} / 100</span>
                  </div>
                  <input type="range" min="0" max="80" value={minTrust} step="5" onChange={(e) => setMinTrust(Number(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-md">
                <h3 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Net-Return Formula & Rules Engine' : 'ನಿವ್ವಳ ಲಾಭ ಸೂತ್ರ ಮತ್ತು ಎಐ ಎಂಜಿನ್'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900">{currentLang === 'en' ? 'Spoilage Loss Formula' : 'ಸಾಗಣೆ ನಷ್ಟ ಸೂತ್ರ'}</span>
                    <p className="text-emerald-800 font-mono">spoilage = min(0.5, hourly_rate × travel_hours)</p>
                  </div>
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900">{currentLang === 'en' ? 'Net Return / Quintal' : 'ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ನಿವ್ವಳ ಲಾಭ'}</span>
                    <p className="text-emerald-800 font-mono">modal_price × (1 - spoilage) - transport_per_q</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-100/70 border border-emerald-300 rounded-3xl p-5 text-emerald-900 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'AI Reasoning Output' : 'ಎಐ ಸಲಹಾ ವರದಿ'}</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-950 font-medium">{reasoning}</p>
              </div>

              {/* AI Assistant Widget */}
              <div className="bg-white border border-emerald-200 rounded-3xl p-5 shadow-md space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>{t.aiAssistantTitle}</span>
                </div>
                <form onSubmit={handleAiAsk} className="flex gap-2">
                  <input 
                    type="text" 
                    value={aiQuery} 
                    onChange={(e) => setAiQuery(e.target.value)} 
                    placeholder={t.aiPlaceholder}
                    className="flex-1 bg-emerald-50/50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-medium text-emerald-950 focus:outline-none focus:border-emerald-600"
                  />
                  <button type="submit" disabled={isAiLoading} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition">
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.askBtn}</span>
                  </button>
                </form>
                {aiResponse && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium leading-relaxed">
                    🤖 {aiResponse}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 border border-emerald-300 rounded-3xl p-6 shadow-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-widest">
                <Users className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'AI Recommendation Rationale' : 'ಎಐ ಶಿಫಾರಸು ವಿವರಣೆ'}</span>
              </div>
              <p className="text-sm font-bold text-emerald-950 leading-relaxed">{reasoning}</p>
            </div>

            <div>
              <h3 className="text-base font-bold text-emerald-950 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /><span>{t.p3CardsHeader}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {results.slice(0, 3).map((item, idx) => (
                  <div key={item.mandi} className={`bg-white border ${idx === 0 ? 'border-2 border-emerald-600 shadow-lg' : 'border-emerald-200 shadow-sm'} rounded-2xl p-5 space-y-3`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${idx === 0 ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-800'}`}>Rank #{idx + 1}</span>
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Trust {item.trust_score}/100</span>
                    </div>
                    <h4 className="text-lg font-bold text-emerald-950">{item.mandi}</h4>
                    <p className="text-xs text-slate-500">{currentLang === 'en' ? 'Buyer:' : 'ಖರೀದಿದಾರ:'} {item.buyer_name}</p>
                    <div className="space-y-1.5 text-xs text-slate-700 border-t border-emerald-100 pt-3">
                      <div className="flex justify-between"><span>{currentLang === 'en' ? 'Modal Price:' : 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ:'}</span><span className="font-bold text-emerald-950">₹{item.modal_price}/q</span></div>
                      <div className="flex justify-between"><span>{currentLang === 'en' ? 'Distance:' : 'ದೂರ:'}</span><span>{item.distance_km} km ({item.travel_hours} h)</span></div>
                      <div className="flex justify-between"><span>{currentLang === 'en' ? 'Spoilage:' : 'ನಷ್ಟ:'}</span><span className="text-rose-600 font-bold">-{item.spoilage_pct}%</span></div>
                      <div className="flex justify-between font-bold border-t border-emerald-100 pt-2"><span className="text-emerald-950">{currentLang === 'en' ? 'Net Take-Home:' : 'ನಿವ್ವಳ ಲಾಭ:'}</span><span className="text-emerald-700 text-sm">₹{item.net_total.toLocaleString('en-IN')}</span></div>
                    </div>
                    <button onClick={() => setModalData(item)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-sm">
                      {currentLang === 'en' ? 'Lock Deal & Dispatch' : 'ಒಪ್ಪಂದ ಲಾಕ್ ಮಾಡಿ'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentPage === 4 && (
          <div className="space-y-6">
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
                      <span>{t.p4MapTitle}</span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Google Maps Live</span>
                    </h2>
                    <p className="text-xs text-slate-600">{t.p4MapSub}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Fastest Green Route Active</span>
                  </div>
                </div>
              </div>

              {/* Map Canvas Container with Explicit Minimum Height */}
              <div className="relative w-full h-[420px] min-h-[420px] bg-[#f8fafc] rounded-2xl overflow-hidden border border-emerald-200 shadow-inner">
                <canvas ref={canvasRef} className="w-full h-full block" />

                {results.length > 0 && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-emerald-200 shadow-lg max-w-xs space-y-2 z-10">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-100 pb-2">
                      <span className="flex items-center gap-1.5 text-blue-600"><Navigation className="w-3.5 h-3.5" /> Best Route to #{results[0].mandi}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">₹{results[0].net_total.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-1">
                      <p className="flex justify-between"><span>Distance:</span> <strong className="text-slate-800">{results[0].distance_km} km</strong></p>
                      <p className="flex justify-between"><span>Est. Travel Time:</span> <strong className="text-slate-800">{results[0].travel_hours} hrs</strong></p>
                      <p className="flex justify-between"><span>Transit Spoilage:</span> <strong className="text-rose-600">-{results[0].spoilage_pct}%</strong></p>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-200 shadow-md text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1 text-blue-600"><Compass className="w-4 h-4" /> GPS Active</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-emerald-700">Mandya APMC Hub</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentPage === 5 && (
          <div className="space-y-6">
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 shadow-md space-y-6">
              <div className="border-b border-emerald-100 pb-4 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">LEAP Agritech Hackathon 2026</span>
                  <h2 className="text-2xl font-extrabold text-emerald-950">AgriConnect AI — {currentLang === 'en' ? 'Impact & Team Inframind' : 'ಪರಿಣಾಮ ಮತ್ತು ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್'}</h2>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-bold">GMIT Mandya</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><IndianRupee className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Economic Impact' : 'ಆರ್ಥಿಕ ಪರಿಣಾಮ'}</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Increases farmer net income by ₹15,000–₹30,000 per season by unlocking high-paying distant mandis.' : 'ದೂರದ ಉತ್ತಮ ಮಂಡಿಗಳನ್ನು ತಲುಪಿಸುವ ಮೂಲಕ ರೈತರ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.'}</p>
                </div>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><Leaf className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Environmental Impact' : 'ಪರಿಸರ ಪರಿಣಾಮ'}</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Reduces perishable harvest losses by 6–16% through transit-time calculations.' : 'ಸಾಗಣೆ ಸಮಯದಲ್ಲಿ ಬೆಳೆಗಳು ಹಾಳಾಗುವುದನ್ನು ಶೇ. ೬-೧೬ ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.'}</p>
                </div>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><Heart className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Social Impact' : 'ಸಾಮಾಜಿಕ ಪರಿಣಾಮ'}</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Empowers smallholders with Kannada voice guidance and verified buyer trust.' : 'ಕನ್ನಡ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನಂಬಿಕಾರ್ಹ ಖರೀದಿದಾರರೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುತ್ತದೆ.'}</p>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{currentLang === 'en' ? 'Team Inframind Members' : 'ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್ ಸದಸ್ಯರು'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-900 text-sm">Aishwarya NS</p>
                    <p className="text-emerald-700 font-semibold">{currentLang === 'en' ? 'Team Leader' : 'ತಂಡದ ನಾಯಕಿ'}</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-950 text-sm">Varshini V</p>
                    <p className="text-slate-600">{currentLang === 'en' ? 'Team Member' : 'ಸದಸ್ಯೆ'}</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-950 text-sm">Saniya Banu</p>
                    <p className="text-slate-600">{currentLang === 'en' ? 'Team Member' : 'ಸದಸ್ಯೆ'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-emerald-200 py-4 px-4 sm:px-8 mt-auto sticky bottom-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed">
            <ChevronLeft className="w-4 h-4 text-emerald-700" /><span>{t.prevBtn}</span>
          </button>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">Page {currentPage} of 5</span>
          <button onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))} disabled={currentPage === 5} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-md disabled:opacity-40">
            <span>{t.nextBtn}</span><ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
              <h3 className="text-base font-bold text-emerald-900 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-emerald-600" /><span>{t.lockDeal}</span>
              </h3>
              <button onClick={() => setModalData(null)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {currentLang === 'en' ? `Locking deal with ${modalData.buyer_name} at ${modalData.mandi} for ₹${modalData.net_total.toLocaleString('en-IN')}.` : `${modalData.buyer_name} (${modalData.mandi}) ಅವರೊಂದಿಗೆ ₹${modalData.net_total.toLocaleString('en-IN')} ಮೊತ್ತಕ್ಕೆ ಒಪ್ಪಂದ ಲಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ.`}
            </p>
            <div className="bg-emerald-50 p-3 rounded-xl text-xs space-y-1.5 border border-emerald-200 text-emerald-900 font-bold">
              <div className="flex justify-between"><span>{t.paymentTerms}</span></div>
              <div className="flex justify-between"><span>{t.buyerVerif}</span></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { alert(currentLang === 'en' ? "✅ Contract confirmed! Digital APMC code sent." : "✅ ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ! ಡಿಜಿಟಲ್ ಎಪಿಎಂಸಿ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿದೆ."); setModalData(null); }} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md">{t.confirmContract}</button>
              <button onClick={() => setModalData(null)} className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition border border-slate-200">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);