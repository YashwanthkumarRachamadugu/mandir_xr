import { useEffect, useState } from "react";
import { PartyPopper, Sparkles, Calendar } from "lucide-react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { useNavigate } from "react-router-dom";
import { festivalsData } from "@/data/festivalsData";

const months = [
  "All", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const FestivalsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const filtered =
    selectedMonth === "All"
      ? festivalsData
      : festivalsData.filter((f) => f.month === selectedMonth);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 p-6 md:p-12 selection:bg-orange-500/30">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-4 animate-fade-in">
          <Sparkles size={14} />
          <span>CELEBRATE CULTURE</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
      
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
            Indian Festivals
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Explore the vibrant colors, traditions, and stories behind India's most cherished celebrations.
        </p>
      </div>

      {/* MONTH FILTER - SCROLLABLE ON MOBILE */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
            {months.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  selectedMonth === m
                    ? "bg-orange-600 text-white shadow-lg shadow-orange-900/40 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FESTIVALS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((festival, i) => (
          <div
            key={i}
            className="group relative bg-[#111] border border-white/5 rounded-[2rem] p-1 transition-all duration-500 hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.1)] hover:-translate-y-2 overflow-hidden"
          >
            {/* GRADIENT GLOW EFFECT ON HOVER */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <PartyPopper size={24} />
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                  <Calendar size={14} className="text-slate-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-tighter">
                    {festival.month}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-orange-400 transition-colors">
                {festival.name}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-6">
                {festival.shortDesc}
              </p>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded">
                  {festival.religion}
                </span>
                
                <button
                  onClick={() => navigate(`/festival/${festival.name}`)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-500 hover:to-orange-300 text-white font-black px-5 py-2.5 rounded-xl shadow-lg shadow-orange-900/20 transition-all active:scale-95"
                >
                  Explore <span className="text-yellow-200">⭐ {festival.points}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-xl font-medium italic">No festivals found for {selectedMonth} yet...</p>
        </div>
      )}
    </div>
  );
};

export default FestivalsPage;