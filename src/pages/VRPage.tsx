import React, { useState, useEffect } from "react";

interface Temple {
  id: string;
  name: string;
  model: string;
  description: string;
}

const temples: Temple[] = [
  {
    id: "ram",
    name: "Ram Mandir",
    model: "/models/RamMandir.glb",
    description: "The Ram Mandir is a Hindu temple located in Ayodhya, Uttar Pradesh, India. It is designed in the Nagara style of Hindu temple architecture.",
  },
  {
    id: "birla",
    name: "Birla Mandir",
    model: "/models/BirlaMandir.glb",
    description: "Built by the Birla family, this magnificent temple is constructed entirely of high-quality white marble. It is dedicated to Lord Vishnu and Goddess Lakshmi.",
  },
  {
    id: "kedarnath-temple",
    name: "Kedarnath Temple",
    model: "/models/kedarnathtemple.glb",
    description: "Kedarnath Temple is a sacred Hindu temple dedicated to Lord Shiva, located in the Garhwal region of Uttarakhand.",
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Temple",
    model: "/models/meenakshi.glb",
    description: "Meenakshi Temple is a historic Hindu temple in Madurai, Tamil Nadu, known for its stunning architecture and cultural significance.",
  },
  {
  id: "golden-temple",
  name: "Golden Temple",
  model: "/models/golden-temple.glb",
  description: "The Golden Temple, also known as Harmandir Sahib, is the holiest Sikh shrine located in Amritsar, Punjab. It is famous for its gold-plated architecture, sacred water tank, and the Langar, which serves free meals to thousands daily, symbolizing equality and service."
}
];

const VRPage = () => {
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [isVRActive, setIsVRActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
      setIsVRActive(false);
    };
  }, [selectedTemple]);

  const handleListen = () => {
    if (!selectedTemple) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedTemple.description);
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false); // Handle potential errors
    speechSynthesis.speak(utterance);
  };

  // NEW: Stop Narration Function
  const handleStopNarration = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white flex overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className={`z-20 w-1/3 p-10 flex flex-col gap-10 transition-all duration-700 bg-black/40 backdrop-blur-xl border-r border-white/5 ${isVRActive ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0'}`}>
        <h1 className="text-4xl font-black text-orange-500 tracking-tighter uppercase">MandirXR</h1>
        <div className="flex flex-wrap gap-3">
          {temples.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTemple(t)}
              className={`px-6 py-3 rounded-2xl font-bold border transition-all ${selectedTemple?.id === t.id ? "bg-orange-600 border-orange-400" : "bg-white/5 border-white/10"}`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {selectedTemple && (
          <div className="flex-grow animate-in fade-in slide-in-from-left-6">
            <h2 className="text-5xl font-bold text-orange-100 mb-4">{selectedTemple.name}</h2>
            <p className="text-gray-400 italic mb-6 border-l-2 border-orange-500 pl-4">{selectedTemple.description}</p>
            
            {/* UPDATED: Toggle between Play and Stop buttons */}
            <div className="flex flex-col gap-3">
              {!isSpeaking ? (
                <button 
                  onClick={handleListen}
                  className="w-full py-4 rounded-2xl font-bold bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-lg shadow-orange-900/20"
                >
                  🔊 Start Audio Guide
                </button>
              ) : (
                <button 
                  onClick={handleStopNarration}
                  className="w-full py-4 rounded-2xl font-bold bg-red-600 text-white hover:bg-red-500 transition-all animate-pulse"
                >
                  ⏹ Stop Narration
                </button>
              )}
            </div>
          </div>
        )}
      </aside>

      {/* VIEWPORT */}
      <main className={`relative transition-all duration-1000 ${isVRActive ? 'w-full' : 'w-2/3 m-5 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl'}`}>
        {!selectedTemple ? (
          <div className="h-full flex items-center justify-center text-gray-600 tracking-widest uppercase">Select a temple</div>
        ) : (
          <div className="w-full h-full relative">
            <a-scene embedded={!isVRActive} vr-mode-ui="enabled: true">
              <a-assets>
                <img id="floor" src="https://cdn.aframe.io/a-painter/images/floor.jpg" crossOrigin="anonymous" />
              </a-assets>

              <a-entity id="rig" movement-controls="fly: false; speed: 0.2" position="0 0 5">
                <a-entity camera position="0 1.6 0" look-controls="pointerLockEnabled: true" wasd-controls={`enabled: ${isVRActive}`}>
                  {isVRActive && <a-cursor color="#FFA500"></a-cursor>}
                </a-entity>
                <a-entity oculus-touch-controls="hand: left" laser-controls="hand: left"></a-entity>
                <a-entity oculus-touch-controls="hand: right" laser-controls="hand: right"></a-entity>
              </a-entity>

              <a-entity gltf-model={`url(${selectedTemple.model})`} position="0 0 -6" scale="1.3 1.3 1.3" 
                animation={!isVRActive ? "property: rotation; to: 0 360 0; loop: true; dur: 45000; easing: linear" : ""}></a-entity>

              <a-sky color="#020202"></a-sky>
              <a-plane src="#floor" rotation="-90 0 0" width="100" height="100" opacity="0.2"></a-plane>
              <a-light type="ambient" intensity="0.6"></a-light>
              <a-light type="directional" position="2 5 3" intensity="0.8"></a-light>
            </a-scene>

            {!isVRActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer" onClick={() => setIsVRActive(true)}>
                <button className="bg-orange-600 text-white font-black px-12 py-5 rounded-full shadow-2xl hover:scale-110 transition-transform">
                  🥽 START VR IMMERSION
                </button>
              </div>
            )}
            
            {isVRActive && (
              <button onClick={() => setIsVRActive(false)} className="absolute top-8 right-8 z-30 bg-white/10 hover:bg-red-600 text-white px-8 py-2 rounded-full font-bold transition-all border border-white/20">
                EXIT VIEW
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default VRPage;