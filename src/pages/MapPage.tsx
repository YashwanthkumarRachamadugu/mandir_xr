import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  PartyPopper,
  UtensilsCrossed,
  X,
  Building2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import statesData, { StateInfo, Temple } from "../data/statesData";
import { arTemples } from "@/data/arTemples";
import { QRCodeCanvas } from "qrcode.react";
const MapPage = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const state: StateInfo | undefined = selectedState
    ? statesData[selectedState]
    : undefined;

  const handleSelectState = (name: string) => {
    setSelectedState(name);
    setSelectedTemple(null);
  };

  // 🔥 FILTER LOGIC
  const filteredStates = Object.keys(statesData).filter((stateName) => {
    const state = statesData[stateName];

    return (
      stateName.toLowerCase().includes(search.toLowerCase()) ||
      state.temples?.some((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  // 🔥 AR MATCH
  const getARRoute = (templeName: string) => {
    const match = arTemples.find(
      (t) => t.name.toLowerCase() === templeName.toLowerCase()
    );
    return match?.route;
  };
   // 🔥 VR MATCH
  const getVRRoute = (templeName: string) => {
    const match = arTemples.find(
      (t) => t.name.toLowerCase() === templeName.toLowerCase()
    );
    return match?.route;
  };

  return (
    <div className="section-padding min-h-screen">
      <div className="container mx-auto">

        {/* 🔶 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            Interactive{" "}
            <span className="text-gradient-saffron">India Map</span>
          </h1>
          <p className="text-muted-foreground">
            Click on a state to explore its heritage
          </p>
        </motion.div>

        {/* 🔍 SEARCH */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="🔍 Search state or temple..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl bg-background/60 backdrop-blur border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* 🔷 STATES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredStates.map((name, i) => (
            <motion.button
              key={name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => handleSelectState(name)}
              className="glass rounded-xl p-5 text-left hover-lift group"
            >
              <Landmark className="text-primary mb-2" size={28} />
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Tap to explore
              </p>
            </motion.button>
          ))}
        </div>

        {/* ❌ NO RESULT */}
        {filteredStates.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">
            No results found 😔
          </p>
        )}

        {/* ================= STATE MODAL ================= */}
        <AnimatePresence>
          {state && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedState(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass-strong rounded-2xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gradient-saffron">
                    {state.name}
                  </h2>
                  <button onClick={() => setSelectedState(null)}>
                    <X size={22} />
                  </button>
                </div>

                {/* CULTURE */}
                <p className="text-sm text-muted-foreground mb-4">
                  {state.culture}
                </p>

                {/* TEMPLES */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 className="text-primary" size={18} />
                    <h3 className="font-semibold text-foreground">
                      Famous Temples
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {state.temples?.map((temple) => (
                      <button
                        key={temple.name}
                        onClick={() => setSelectedTemple(temple)}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition"
                      >
                        {temple.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* FESTIVALS */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <PartyPopper className="text-india-green" size={18} />
                    <h3 className="font-semibold text-foreground">
                      Festivals
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {state.festivals.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full bg-secondary/20 text-india-green"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FOOD */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <UtensilsCrossed className="text-gold" size={18} />
                    <h3 className="font-semibold text-foreground">
                      Cuisine
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {state.food.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-3 py-1 rounded-full bg-accent/10 text-gold"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= TEMPLE MODAL ================= */}
        <AnimatePresence>
          {selectedTemple && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedTemple(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="glass-strong rounded-2xl p-6 max-w-xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gradient-saffron">
                    {selectedTemple.name}
                  </h2>
                  <button onClick={() => setSelectedTemple(null)}>
                    <X size={22} />
                  </button>
                </div>

                {/* DETAILS */}
                <div className="space-y-2 text-sm">
                  <p><span className="text-primary font-semibold">Location:</span> {selectedTemple.location}</p>
                  <p><span className="text-primary font-semibold">Deity:</span> {selectedTemple.deity}</p>
                  <p><span className="text-primary font-semibold">Built:</span> {selectedTemple.built}</p>
                  <p><span className="text-primary font-semibold">Architecture:</span> {selectedTemple.architecturalStyle}</p>
                  <p><span className="text-primary font-semibold">Significance:</span> {selectedTemple.significance}</p>

                  <p className="pt-2 text-muted-foreground">
                    {selectedTemple.description}
                  </p>
                </div>

                {/* 🔥 AR BUTTON */}
                {getARRoute(selectedTemple.name) && (
                  <button
                    onClick={() =>
                      navigate(`/ar/${getARRoute(selectedTemple.name)}`)
                    }
                    className="mt-5 w-full gradient-saffron text-white py-2 rounded-lg"
                  >
                    🕶 Explore in AR
                  </button>
                )}
          

                
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default MapPage;