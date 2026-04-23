import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Nice icon for the button
import MandirAR from "../xr/MandirAR";
import MandirViewer from "@/components/viewer/MandirViewer";

const temples = {
  ram: {
    name: "Ram Mandir",
    model: "/models/RamMandir.glb",
    description: "Ram Mandir in Ayodhya represents devotion and architectural brilliance.",
    hasRestoration: true
  },
  birla: {
    name: "Birla Mandir",
    model: "/models/BirlaMandir.glb",
    description: "Birla Mandir is a white marble temple symbolizing peace and harmony.",
    hasRestoration: true
  },
};

const TempleAR = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const temple = temples[id as keyof typeof temples];

  const isMobile =
    typeof navigator !== "undefined" &&
    /iPhone|iPad|Android/i.test(navigator.userAgent);

  if (!temple) {
    return <div className="text-center p-10">Temple not found</div>;
  }

  return (
    <div className="min-h-screen p-6 text-center bg-[#FDF8F1]">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6 text-orange-900 pt-16"
      >
        {temple.name}
      </motion.h1>

      <div className="aspect-video rounded-xl overflow-hidden border bg-white shadow-lg max-w-5xl mx-auto">
        {isMobile ? (
          <MandirAR
            modelPath={temple.model}
            templeName={temple.name}
            description={temple.description}
          />
        ) : (
          <MandirViewer modelPath={temple.model} />
        )}
      </div>

      <div className="mt-8 max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed mb-8">{temple.description}</p>
        
        {/* ✨ NEW BUTTON TO GO TO RESTORATION PAGE */}
        {temple.hasRestoration && (
          <button
            onClick={() => navigate(`/restoration/${id}`)}
            className="flex items-center gap-2 mx-auto px-8 py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-lg hover:bg-orange-700 hover:scale-105 transition-all active:scale-95"
          >
            <Sparkles size={20} /> View Restoration Journey
          </button>
        )}
      </div>
    </div>
  );
};

export default TempleAR;