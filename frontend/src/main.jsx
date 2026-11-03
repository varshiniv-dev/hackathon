import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Sprout, Store, AlertTriangle, Users, Layers, Sliders, Mic, Cpu, Sparkles, 
  Trophy, Map, IndianRupee, Leaf, Heart, ChevronLeft, ChevronRight, Handshake, X, Languages,
  Lock, Mail, UserCheck, LogOut, ShieldCheck
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
    navPage4: "Route Map", 
    navPage5: "Impact & Team",
    prevBtn: "Previous Page", 
    nextBtn: "Next Page",
    p1Title: "Why Listed Market Prices are Misleading for Perishable Farmers",
    p1Subtitle: "Most small farmers sell to nearby local traders due to perishable crop urgency. Existing platforms like Agmarknet display listed prices, but completely ignore transport costs, transit spoilage losses, and buyer reliability.",
    stat1Title: "LOCAL SALES DOMINANCE",
    stat1Desc: "of surveyed crop sales go to local village traders; only 4.6% reach APMC mandis (NSS 77th Round MoSPI)[cite: 1].",
    stat2Title: "POST-HARVEST SPOILAGE",
    stat2Desc: "of perishable fruits and vegetables are lost in transit before reaching distant markets (ICAR-CIPHET)[cite: 1].",
    stat3Title: "SMALLHOLDER HOLDINGS",
    stat3Desc: "of Indian farm households own less than 1 hectare with limited individual bargaining leverage[cite: 1].",
    gapMatrixTitle: "Existing Solutions vs. AgriConnect AI Gap Analysis[cite: 1]",
    p2InputTitle: "Farmer Harvest & Route Parameters[cite: 1]",
    selectCrop: "Crop Type", 
    quantity: "Harvest Quantity (Quintals)", 
    farmerLocation: "Farmer Village / Hub", 
    transportRate: "Transport Rate (₹ / km)", 
    minTrust: "Buyer Trust Filter Threshold",
    p3CardsHeader: "Top 3 Ranked Options (Filtered by Buyer Trust)[cite: 1]",
    p4MapTitle: "Regional Mandi & Route Distance Canvas[cite: 1]",
    p4MapSub: "Visualizes OpenRouteService driving distances and optimal green route vectors from Mandya[cite: 1].",
    loginTitle: "AgriConnect AI",
    loginSubtitle: "Team Inframind | LEAP Agritech Hackathon 2026[cite: 1]",
    selectRoleLabel: "Select Portal Role",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    loginNotice: "Pre-filled credentials enabled for hackathon judges evaluation.",
    signInBtn: "Sign In as",
    signOut: "Sign Out",
    lockDeal: "Lock Deal & Dispatch Truck[cite: 1]",
    confirmContract: "Confirm Contract[cite: 1]",
    cancel: "Cancel",
    paymentTerms: "Payment Terms: APMC Direct Settlement ✅[cite: 1]",
    buyerVerif: "Buyer Verification: Verified License ✅[cite: 1]"
  },
  kn: {
    navPage1: "ಸಮಸ್ಯೆ ಮತ್ತು ಸಂಶೋಧನೆ", 
    navPage2: "ಎಐ ಲಾಭದ ಲೆಕ್ಕಾಚಾರ", 
    navPage3: "ಉನ್ನತ ೩ ಮಂಡಿಗಳು", 
    navPage4: "ಮಾರ್ಗ ನಕ್ಷೆ", 
    navPage5: "ಪರಿಣಾಮ ಮತ್ತು ತಂಡ",
    prevBtn: "ಹಿಂದಿನ ಪುಟ", 
    nextBtn: "ಮುಂದಿನ ಪುಟ",
    p1Title: "ರೈತರಿಗೆ ಮಾರುಕಟ್ಟೆಯ ಕೇವಲ ಬೆಲೆ ಪಟ್ಟಿ ಏಕೆ ಮೋಸಗೊಳಿಸುತ್ತದೆ?",
    p1Subtitle: "ಹೆಚ್ಚಿನ ಸಣ್ಣ ರೈತರು ಕೊಳೆಯುವ ಬೆಳೆಗಳ ಕಾರಣದಿಂದ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ಮಾರಾಟ ಮಾಡುತ್ತಾರೆ. ಅಗ್ರ್‌ಮಾರ್ಕ್‌ನೆಟ್ ನಂತಹ ವೇದಿಕೆಗಳು ಕೇವಲ ಬೆಲೆಯನ್ನು ತೋರಿಸುತ್ತವೆ, ಆದರೆ ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ನಷ್ಟವನ್ನು ಲೆಕ್ಕಿಸುವುದಿಲ್ಲ.",
    stat1Title: "ಸ್ಥಳೀಯ ಮಾರಾಟ ಪ್ರಾಬಲ್ಯ",
    stat1Desc: "ಸಮೀಕ್ಷೆ ಮಾಡಿದ ಬೆಳೆ ಮಾರಾಟದಲ್ಲಿ ಸ್ಥಳೀಯ ವರ್ತಕರಿಗೆ ತಲುಪುತ್ತದೆ; ಕೇವಲ ೪.೬% ಎಪಿಎಂಸಿ ಮಂಡಿಗಳನ್ನು ತಲುಪುತ್ತದೆ[cite: 1].",
    stat2Title: "ಕೊಯ್ಲಿನ ನಂತರದ ನಷ್ಟ",
    stat2Desc: "ದೂರದ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ತಲುಪುವ ಮೊದಲು ಸಾರಿಗೆಯಲ್ಲಿ ಕೊಳೆಯುವ ಹಣ್ಣುಗಳು ಮತ್ತು ತರಕಾರಿಗಳು ನಷ್ಟವಾಗುತ್ತವೆ[cite: 1].",
    stat3Title: "ಸಣ್ಣ ಹಿಡುವಳಿದಾರರು",
    stat3Desc: "ಭಾರತೀಯ ರೈತ ಕುಟುಂಬಗಳು ೧ ಹೆಕ್ಟೇರ್‌ಗಿಂತ ಕಡಿಮೆ ಜಮೀನು ಹೊಂದಿದ್ದಾರೆ[cite: 1].",
    gapMatrixTitle: "ಪ್ರಸ್ತುತ ಪರಿಹಾರಗಳು ಮತ್ತು ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ ಹೋಲಿಕೆ[cite: 1]",
    p2InputTitle: "ರೈತರ ವಿವರಗಳ ನಮೂದು[cite: 1]",
    selectCrop: "ಬೆಳೆಯ ಪ್ರಕಾರ", 
    quantity: "ಪ್ರಮಾಣ (ಕ್ವಿಂಟಾಲ್‌ನಲ್ಲಿ)", 
    farmerLocation: "ರೈತರ ಗ್ರಾಮ / ಕೇಂದ್ರ", 
    transportRate: "ಸಾರಿಗೆ ದರ (₹ / ಕಿಮೀ)", 
    minTrust: "ಖರೀದಿದಾರರ ನಂಬಿಕೆ ಮಿತಿ",
    p3CardsHeader: "ಉನ್ನತ ೩ ಆಯ್ಕೆಗಳು (ನಂಬಿಕೆ ಆಧಾರಿತ)[cite: 1]",
    p4MapTitle: "ಸಾರಿಗೆ ಮಾರ್ಗ ನಕ್ಷೆ[cite: 1]",
    p4MapSub: "ಮಂಡ್ಯದಿಂದ ಸಾರಿಗೆ ದೂರ ಮತ್ತು ಉತ್ತಮ ಮಾರ್ಗಗಳನ್ನು ತೋರಿಸುತ್ತದೆ[cite: 1].",
    loginTitle: "ಅಗ್ರಿಕನೆಕ್ಟ್ ಎಐ",
    loginSubtitle: "ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್ | LEAP ಅಗ್ರಿಟೆಕ್ ಹ್ಯಾಕಾಥಾನ್ 2026[cite: 1]",
    selectRoleLabel: "ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    emailLabel: "ಇಮೇಲ್ ವಿಳಾಸ",
    passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
    loginNotice: "ಹ್ಯಾಕಾಥಾನ್ ತೀರ್ಪುಗಾರರ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಪೂರ್ವ-ಭರ್ತಿ ಮಾಡಿದ ರುಜುವಾತುಗಳು.",
    signInBtn: "ಪ್ರವೇಶಿಸಿ:",
    signOut: "ಹೊರಬನ್ನಿ",
    lockDeal: "ಒಪ್ಪಂದ ಲಾಕ್ ಮಾಡಿ ಮತ್ತು ಲಾರಿ ಕಳುಹಿಸಿ[cite: 1]",
    confirmContract: "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಿ[cite: 1]",
    cancel: "ರದ್ದುಮಾಡಿ",
    paymentTerms: "ಪಾವತಿ ನಿಯಮಗಳು: ಎಪಿಎಂಸಿ ನೇರ ಇತ್ಯರ್ಥ ✅[cite: 1]",
    buyerVerif: "ಖರೀದಿದಾರರ ಪರಿಶೀಲನೆ: ಪರವಾನಗಿ ಸಕ್ರಿಯವಾಗಿದೆ ✅[cite: 1]"
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
      if (currentLang === 'en') {
        setReasoning(`${top1.mandi} ranks #1 with an estimated net total of ₹${top1.net_total.toLocaleString('en-IN')} with verified buyer trust.`);
      } else {
        setReasoning(`${top1.mandi} ಮೊದಲ ಸ್ಥಾನದಲ್ಲಿದೆ, ಅಂದಾಜು ನಿವ್ವಳ ಲಾಭ ₹${top1.net_total.toLocaleString('en-IN')} ಆಗಿದೆ.`);
      }
    } else {
      setReasoning(currentLang === 'en' ? "No verified buyers match your trust score filter threshold." : "ನಿಮ್ಮ ನಂಬಿಕೆ ಮಿತಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಖರೀದಿದಾರರಿಲ್ಲ.");
    }
  }, [crop, quantity, villageLocation, transportRate, minTrust, user, currentLang]);

  useEffect(() => {
    if (currentPage === 4 && canvasRef.current && user) {
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
        ctx.strokeStyle = idx === 0 ? '#059669' : '#94a3b8';
        ctx.lineWidth = idx === 0 ? 3 : 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, idx === 0 ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = idx === 0 ? '#059669' : '#64748b';
        ctx.fill();

        ctx.fillStyle = '#0f172a';
        ctx.font = '11px Inter, sans-serif';
        ctx.fillText(item.mandi, pos.x + 8, pos.y + 3);
      });

      ctx.beginPath();
      ctx.arc(userPos.x, userPos.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#d97706';
      ctx.fill();
      ctx.fillStyle = '#b45309';
      ctx.fillText(currentLang === 'en' ? "Farmer Hub" : "ರೈತ ಕೇಂದ್ರ", userPos.x + 10, userPos.y + 4);
    }
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
                <p className="text-[11px] text-emerald-100">Team Inframind | LEAP Agritech Hackathon 2026[cite: 1]</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {currentPage === 1 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white border border-emerald-500/30 rounded-3xl p-6 shadow-xl relative overflow-hidden">
              <div className="max-w-3xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">LEAP Agritech Hackathon 2026 | Slide 2 & 3[cite: 1]</span>
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
                <button onClick={() => { setCrop('Tomato'); setQuantity(50); }} className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold px-2.5 py-1 rounded-xl flex items-center gap-1 transition">
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
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">{quantity} qtl</span>
                  </div>
                  <input type="range" min="5" max="200" value={quantity} step="5" onChange={(e) => setQuantity(Number(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
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
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-300">₹{transportRate}/km</span>
                  </div>
                  <input type="range" min="5" max="30" value={transportRate} step="1" onChange={(e) => setTransportRate(Number(e.target.value))} className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
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
                  <Cpu className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Net-Return Formula & Rules Engine[cite: 1]' : 'ನಿವ್ವಳ ಲಾಭ ಸೂತ್ರ ಮತ್ತು ಎಐ ಎಂಜಿನ್[cite: 1]'}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900">{currentLang === 'en' ? 'Spoilage Loss Formula[cite: 1]' : 'ಸಾಗಣೆ ನಷ್ಟ ಸೂತ್ರ[cite: 1]'}</span>
                    <p className="text-emerald-800 font-mono">spoilage = min(0.5, hourly_rate × travel_hours)</p>
                  </div>
                  <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-900">{currentLang === 'en' ? 'Net Return / Quintal[cite: 1]' : 'ಪ್ರತಿ ಕ್ವಿಂಟಾಲ್ ನಿವ್ವಳ ಲಾಭ[cite: 1]'}</span>
                    <p className="text-emerald-800 font-mono">modal_price × (1 - spoilage) - transport_per_q</p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-100/70 border border-emerald-300 rounded-3xl p-5 text-emerald-900 space-y-2 shadow-sm">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'AI Reasoning Output[cite: 1]' : 'ಎಐ ಸಲಹಾ ವರದಿ[cite: 1]'}</span>
                </div>
                <p className="text-xs leading-relaxed text-emerald-950 font-medium">{reasoning}</p>
              </div>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 border border-emerald-300 rounded-3xl p-6 shadow-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-extrabold uppercase tracking-widest">
                <Users className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'AI Recommendation Rationale[cite: 1]' : 'ಎಐ ಶಿಫಾರಸು ವಿವರಣೆ[cite: 1]'}</span>
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
            <div className="bg-white border border-emerald-200 rounded-3xl p-6 space-y-4 shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                    <span>{t.p4MapTitle}</span>
                  </h2>
                  <p className="text-xs text-slate-500">{t.p4MapSub}</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg border border-emerald-300">Karnataka Mandis[cite: 1]</span>
              </div>

              <div className="relative w-full h-80 bg-emerald-50/40 rounded-2xl overflow-hidden border border-emerald-200">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3 shadow-sm font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {currentLang === 'en' ? 'Farmer Hub' : 'ರೈತ ಕೇಂದ್ರ'}</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> #1 {currentLang === 'en' ? 'Optimal Mandi' : 'ಉತ್ತಮ ಮಂಡಿ'}</span>
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
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">LEAP Agritech Hackathon 2026[cite: 1]</span>
                  <h2 className="text-2xl font-extrabold text-emerald-950">AgriConnect AI — {currentLang === 'en' ? 'Impact & Team Inframind' : 'ಪರಿಣಾಮ ಮತ್ತು ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್'}[cite: 1]</h2>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full font-bold">GMIT Mandya[cite: 1]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><IndianRupee className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Economic Impact' : 'ಆರ್ಥಿಕ ಪರಿಣಾಮ'}[cite: 1]</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Increases farmer net income by ₹15,000–₹30,000 per season by unlocking high-paying distant mandis[cite: 1].' : 'ದೂರದ ಉತ್ತಮ ಮಂಡಿಗಳನ್ನು ತಲುಪಿಸುವ ಮೂಲಕ ರೈತರ ಆದಾಯವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ[cite: 1].'}</p>
                </div>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><Leaf className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Environmental Impact' : 'ಪರಿಸರ ಪರಿಣಾಮ'}[cite: 1]</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Reduces perishable harvest losses by 6–16% through transit-time calculations[cite: 1].' : 'ಸಾಗಣೆ ಸಮಯದಲ್ಲಿ ಬೆಳೆಗಳು ಹಾಳಾಗುವುದನ್ನು ಶೇ. ೬-೧೬ ರಷ್ಟು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ[cite: 1].'}</p>
                </div>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm"><Heart className="w-4 h-4 text-emerald-600" /><span>{currentLang === 'en' ? 'Social Impact' : 'ಸಾಮಾಜಿಕ ಪರಿಣಾಮ'}[cite: 1]</span></div>
                  <p className="text-xs text-slate-700 leading-relaxed">{currentLang === 'en' ? 'Empowers smallholders with Kannada voice guidance and verified buyer trust[cite: 1].' : 'ಕನ್ನಡ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ನಂಬಿಕಾರ್ಹ ಖರೀದಿದಾರರೊಂದಿಗೆ ರೈತರನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುತ್ತದೆ[cite: 1].'}</p>
                </div>
              </div>

              <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-200 space-y-3">
                <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">{currentLang === 'en' ? 'Team Inframind Members' : 'ತಂಡ ಇನ್ಫ್ರಾಮೈಂಡ್ ಸದಸ್ಯರು'}[cite: 1]</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-700">
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-900 text-sm">Aishwarya NS[cite: 1]</p>
                    <p className="text-emerald-700 font-semibold">{currentLang === 'en' ? 'Team Leader' : 'ತಂಡದ ನಾಯಕಿ'}[cite: 1]</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-950 text-sm">Varshini V[cite: 1]</p>
                    <p className="text-slate-600">{currentLang === 'en' ? 'Team Member' : 'ಸದಸ್ಯೆ'}[cite: 1]</p>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-emerald-200 shadow-sm">
                    <p className="font-bold text-emerald-950 text-sm">Saniya Banu[cite: 1]</p>
                    <p className="text-slate-600">{currentLang === 'en' ? 'Team Member' : 'ಸದಸ್ಯೆ'}[cite: 1]</p>
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
              {currentLang === 'en' ? `Locking deal with ${modalData.buyer_name} at ${modalData.mandi} for ₹${modalData.net_total.toLocaleString('en-IN')}[cite: 1].` : `${modalData.buyer_name} (${modalData.mandi}) ಅವರೊಂದಿಗೆ ₹${modalData.net_total.toLocaleString('en-IN')} ಮೊತ್ತಕ್ಕೆ ಒಪ್ಪಂದ ಲಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ[cite: 1].`}
            </p>
            <div className="bg-emerald-50 p-3 rounded-xl text-xs space-y-1.5 border border-emerald-200 text-emerald-900 font-bold">
              <div className="flex justify-between"><span>{t.paymentTerms}</span></div>
              <div className="flex justify-between"><span>{t.buyerVerif}</span></div>
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => { alert(currentLang === 'en' ? "✅ Contract confirmed! Digital APMC code sent[cite: 1]." : "✅ ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ! ಡಿಜಿಟಲ್ ಎಪಿಎಂಸಿ ಕೋಡ್ ಕಳುಹಿಸಲಾಗಿದೆ[cite: 1]."); setModalData(null); }} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md">{t.confirmContract}</button>
              <button onClick={() => setModalData(null)} className="bg-slate-100 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition border border-slate-200">{t.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);