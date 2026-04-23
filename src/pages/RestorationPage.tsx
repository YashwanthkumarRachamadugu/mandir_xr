import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Landmark, 
  Info, 
  Search, 
  Calendar,
  ChevronRight
} from "lucide-react";
import RestorationSlider from "@/components/RestorationSlider";
import { templesData, TempleData } from "@/data/templesData";

const RestorationPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");

  const temples = Object.values(templesData);
  const regions = ["All", "North", "South", "East", "West", "Central", "Northeast"];

  // Filter logic for the selection grid
  const filteredTemples = temples.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = activeRegion === "All" || t.region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  const selectedTemple = selectedId ? templesData[selectedId] : null;

  return (
    <div className="min-h-screen bg-[#FDF8F1] pt-28 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!selectedTemple ? (
            /* --- SELECTION VIEW --- */
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-orange-950 mb-4 tracking-tight">
                  Temple Restoration Archive
                </h1>
                <p className="text-orange-800/70 max-w-2xl mx-auto font-medium text-lg">
                  Witness the architectural revival of India's sacred heritage across generations.
                </p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-black/10 p-4 rounded-3xl backdrop-blur-sm border border-orange-100 shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-400" size={20} />
                  <input 
                    type="text"
                    placeholder="Search temple or state..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 bg-black/10 shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
                  {regions.map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setActiveRegion(reg)}
                      className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                        activeRegion === reg 
                        ? "bg-orange-600 text-white shadow-lg" 
                        : "bg-white text-orange-900 hover:bg-orange-100 border border-orange-50"
                      }`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temple Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemples.map((temple) => (
                  <motion.div
                    key={temple.id}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedId(temple.id)}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-all border border-orange-50 cursor-pointer group"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={temple.image} 
                        alt={temple.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                        {temple.state}
                      </div>
                    </div>
                    <div className="p-7">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-orange-950">{temple.name}</h3>
                        <ChevronRight className="text-orange-300 group-hover:text-orange-600 transition-colors" />
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <MapPin size={14} /> {temple.location}
                        </p>
                        <p className="text-orange-700 text-xs font-bold flex items-center gap-1">
                          <Calendar size={14} /> {temple.restoration.afterYear}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* --- DETAIL VIEW (SLIDER) --- */
            <motion.div
              key="detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="flex items-center gap-2 text-orange-800 hover:text-orange-600 font-bold mb-8 transition-colors group"
              >
                <div className="p-2 rounded-full group-hover:bg-orange-100 transition-colors">
                  <ArrowLeft size={20} />
                </div>
                Back to Selection
              </button>

              <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {selectedTemple.region} India
                      </span>
                      <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {selectedTemple.state}
                      </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-orange-950 flex items-center gap-4">
                      <Landmark className="text-orange-600" size={36} /> {selectedTemple.name}
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg max-w-2xl">
                      {selectedTemple.restoration.text}
                    </p>
                  </div>

                  <div className="bg-white p-4 md:p-8 rounded-[3rem] shadow-2xl border border-orange-100 overflow-hidden">
                    <RestorationSlider 
                      beforeImage={selectedTemple.restoration.before}
                      afterImage={selectedTemple.restoration.after}
                      // Combining labels with years
                      beforeLabel={`${selectedTemple.restoration.beforeLabel} (${selectedTemple.restoration.beforeYear})`}
                      afterLabel={`${selectedTemple.restoration.afterLabel} (${selectedTemple.restoration.afterYear})`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-6 lg:pt-32">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-orange-950 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden"
                  >
                    <div className="absolute -top-6 -right-6 p-4 opacity-5">
                      <Landmark size={180} />
                    </div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 border-b border-orange-900 pb-4">
                      <Info size={22} className="text-orange-400" /> Technical Details
                    </h3>
                    <ul className="space-y-4 relative z-10">
                      {selectedTemple.restoration.details.map((detail, i) => (
                        <li key={i} className="flex gap-4 items-start text-orange-100/90 text-sm leading-relaxed">
                          <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                          {detail}
                        </li>
                      ))}
                      <li className="flex gap-4 items-start text-orange-100/90 text-sm leading-relaxed pt-2">
                         <Calendar size={16} className="text-orange-400 shrink-0" />
                         <span>Timeline: {selectedTemple.restoration.beforeYear} — {selectedTemple.restoration.afterYear}</span>
                      </li>
                    </ul>
                  </motion.div>

                  <div className="bg-orange-50/50 p-6 rounded-[2rem] border border-orange-100 italic text-orange-900/70 text-sm text-center">
                    Restoration data is preserved using 3D spatial mapping and historical archives.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RestorationPage;