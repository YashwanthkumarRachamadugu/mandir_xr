import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Lock, Info, Volume2, Square, QrCode, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { QRCodeCanvas } from "qrcode.react";

import MandirViewer from "@/components/viewer/MandirViewer";

const temples = [
  {
    id: "ram-mandir",
    name: "Ram Mandir",
    model: "/models/RamMandir.glb",
    description: `The Ram Janmabhoomi Mandir in Ayodhya stands as one of the most culturally significant and architecturally grand spiritual monuments in modern India, representing a culmination of centuries of devotion, historical complexity, and a deep-seated desire for the restoration of a sacred heritage. Situated on the banks of the holy Sarayu River, the temple is dedicated to Bhagwan Shri Ram, the seventh avatar of Lord Vishnu, at the site traditionally believed to be his birthplace (Janmabhoomi). The temple’s architectural style is a magnificent rendition of the traditional Nagara school of North Indian temple architecture, characterized by its towering spires (Shikharas), intricate carvings, and the absence of iron or steel in its primary structure to ensure a lifespan exceeding a thousand years. Designed by the renowned Sompura family of architects, the temple complex spans 70 acres, with the main structure measuring 380 feet in length, 250 feet in width, and 161 feet in height. The mandir is supported by 392 pillars and features 44 doors, many of which are adorned with gold plating, symbolizing the regal and divine nature of the "Ram Rajya" or the ideal kingdom that Rama exemplified.

The construction of the Ram Mandir is a feat of both ancient wisdom and modern engineering, utilizing high-quality Bansi Paharpur pink sandstone from Rajasthan, which is renowned for its durability and aesthetic beauty. The foundation was engineered with a 14-meter thick layer of roller-compacted concrete, designed to look like artificial rock, providing a stable base capable of withstanding seismic activity. Inside the Garbhagriha (sanctum sanctorum), the idol of Ram Lalla Virajman—the infant form of Lord Rama—is carved from a 2.5-billion-year-old black granite stone known as Shaligram or Krishna Shila, chosen for its sacred properties and longevity. The idol, sculpted by Mysore-based artist Arun Yogiraj, depicts the five-year-old deity with a serene and divine expression, holding a golden bow and arrow, surrounded by carvings of the ten avatars of Vishnu and other celestial beings. A unique astronomical feature of the temple is the "Surya Tilak" mechanism, designed by scientists to use mirrors and lenses to direct a beam of sunlight onto the forehead of the Ram Lalla idol every year on the day of Ram Navami at exactly noon.

The spiritual journey to the temple begins through the Singh Dwar, the main entrance, which leads devotees through a series of five distinct mandapas or halls: the Nritya Mandap, Rang Mandap, Sabha Mandap, Prathana Mandap, and Kirtan Mandap. Each of these halls is decorated with sculptures depicting scenes from the Ramayana, various deities, and motifs of Indian flora and fauna, creating an immersive atmosphere of "bhakti" (devotion). The temple complex is not just a single shrine but a "Panchayatana" style layout, with four smaller temples at the corners dedicated to Surya, Devi Bhagwati, Lord Ganesha, and Lord Shiva, along with shrines for Annapurna and Hanuman nearby. This holistic design reflects the inclusive nature of Sanatana Dharma, where the central deity is honored alongside the cosmic forces of the universe. The inclusion of a "Kuber Tila" with an ancient Shiva temple and a bronze statue of the mythical bird Jatayu further enriches the narrative landscape of the site, honoring those who played pivotal roles in Rama’s life.

Beyond its physical majesty, the Ram Mandir carries profound sociological and emotional weight for the global Hindu community. Its inauguration on January 22, 2024, through the Pran Pratishtha ceremony, was viewed by millions as a moment of "cultural re-awakening" and a symbol of national unity. For many, the temple represents the healing of historical wounds and the successful legal and peaceful resolution of a long-standing dispute, showcasing the strength of India’s democratic and judicial institutions. The temple has also sparked a massive economic and infrastructural transformation in Ayodhya, turning the ancient city into a world-class spiritual tourism hub with a new international airport, upgraded railway stations, and "Smart City" amenities. This "Ayodhya Renaissance" is expected to provide a sustainable livelihood for thousands of local artisans, vendors, and hospitality workers, blending spiritual heritage with modern economic progress.

Environmentally, the temple complex is designed with a "Green Temple" philosophy, ensuring that 70% of the area remains covered in greenery. The site includes its own sewage treatment plant, water treatment plant, and dedicated electricity line, making it largely self-sufficient and minimally impactful on the city’s existing resources. The conservation of ancient trees and the creation of lush gardens like the "Nakshtra Vatika" demonstrate a commitment to the Vedic principle of living in harmony with nature. Furthermore, the temple serves as a center for social and educational activities, with plans for a library, a research center for the study of the Ramayana, and facilities for pilgrims (Yatri Niwas) that cater to people from all economic backgrounds. This ensures that the temple remains a living institution that contributes to the intellectual and social welfare of society, rather than just a silent monument.

Ultimately, the Ram Mandir in Ayodhya is a celebration of the "Maryada Purushottam"—the supreme man who lived by the highest codes of conduct. The temple serves as a constant reminder of the values Rama stood for: truth, sacrifice, duty toward family and state, and compassion for all living beings. As the sunset reflects off the pink sandstone spires and the sounds of the evening Aarti echo across the Sarayu, the mandir stands as a beacon of hope and a testament to the enduring power of faith. It is a bridge between the ancient Treta Yuga and the modern age, proving that the ideals of Rama are timeless and universal. For the pilgrim who walks through its golden doors, the Ram Mandir offers a sense of profound peace and a reminder that the "Kingdom of Rama" is not just a place in history, but a state of mind achieved through righteousness and devotion. It remains a crowning jewel of Indian architecture and a soulful anchor for generations to come.`,
  },
  {
    id: "birla-mandir",
    name: "Birla Mandir",
    model: "/models/BirlaMandir.glb",
    description: `The Birla Mandir refers to a series of magnificent Hindu temples built by the industrialist Birla family across various cities in India, including Delhi, Jaipur, Hyderabad, Kolkata, and Bhopal. These temples are renowned for their stunning architectural fusion, predominantly utilizing white marble or sandstone to create structures that blend traditional Nagara and Dravidian styles with modern engineering. Each Birla Mandir is typically dedicated to Lord Vishnu and Goddess Lakshmi (Lakshmi Narayan), symbolizing prosperity and preservation. One of the most iconic is the Laxmi Narayan Temple in Delhi, inaugurated by Mahatma Gandhi in 1939 on the condition that people of all castes be allowed entry, marking a significant moment in India’s social reform. Similarly, the Birla Mandir in Hyderabad, perched atop the Naubath Pahad hill, is a breathtaking sight carved entirely from 2,000 tons of pure white Rajasthani marble, offering a panoramic view of the city and Hussain Sagar Lake.

The architecture of these temples is designed to be inclusive and meditative, often featuring beautifully landscaped gardens, intricate carvings of mythological scenes, and inscriptions of philosophical quotes from the Bhagavad Gita and the Upanishads. Unlike many ancient temples that are tucked away in narrow alleys, Birla Mandirs are usually situated in prominent, open locations with vast courtyards, making them accessible hubs for both spiritual seekers and tourists. The Kolkata Birla Mandir, inspired by the Lingaraj Temple of Bhubaneswar, took nearly 26 years to complete and is famous for its exquisite stone carvings and silver-dipped deities. The Jaipur Birla Mandir, located at the foot of the Moti Dungari hill, is particularly striking at night when the translucent marble glows under the moonlight. These temples serve not just as places of worship, but as cultural landmarks that celebrate the "Sanatana Dharma" through a lens of modern aesthetics and social equality.

Beyond their religious significance, the Birla Mandirs play a vital role in the social and educational fabric of their respective cities. They often house libraries, guest houses, and centers for discourse, fostering a community atmosphere where spirituality meets intellectual growth. The cleanliness and disciplined maintenance of these temples set a high standard for public spaces in India. During festivals like Janmashtami and Diwali, these temples are illuminated with thousands of lights, attracting massive crowds who come to witness the "Aarti" and soak in the serene atmosphere. By focusing on the "Lakshmi Narayan" aspect of the Divine, the temples emphasize a balanced life where material prosperity is harmonized with spiritual values. For a visitor, a trip to a Birla Mandir offers a peaceful retreat from the urban chaos, providing a space for quiet contemplation amidst the timeless beauty of hand-carved marble and the soft scent of incense.`,
  },
  {
    id: "kedarnath-temple",
    name: "Kedarnath Temple",
    model: "/models/kedarnathtemple.glb",
    description:
      "Kedarnath Temple is a sacred Hindu temple dedicated to Lord Shiva, located in the Garhwal region of Uttarakhand.",
  },
  {
    id: "golden-temple",
    name: "golden temple",
    model: "/models/golden-temple.glb",
    description:
      "The **Golden Temple**, also known as Harmandir Sahib, is the holiest shrine in Sikhism and a symbol of peace, equality, and devotion. Founded by **Guru Arjan Dev** in the 16th century, it is located in the city of Amritsar, Punjab. The temple is renowned for its stunning gold-plated architecture and its location in the middle of the sacred Amrit Sarovar (holy tank). It welcomes people of all religions and backgrounds. One of its most significant features is the Langar, a free community kitchen that serves thousands of meals daily, promoting selfless service and unity among visitors.",
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Temple",
    model: "/models/meenakshi.glb",
    description:
      "Meenakshi Temple is a historic Hindu temple in Madurai, Tamil Nadu, known for its stunning architecture and cultural significance.",
  },
];

const ARPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<any>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    if (id) {
      const match = temples.find((t) => t.id === id);
      if (match) setSelectedTemple(match);
    }
  }, [id]);

  useEffect(() => {
    return () => speechSynthesis.cancel();
  }, []);

  const handleListen = () => {
    if (!selectedTemple) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedTemple.description);
    utterance.lang = "en-IN";
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const isLoggedIn = !!user;
  const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|Android/i.test(navigator.userAgent);

  const openAR = (model: string) => {
    const url = `intent://arvr.google.com/scene-viewer/1.0?file=${window.location.origin}${model}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;end;`;
    window.location.href = url;
  };

  return (
    <div className="section-padding min-h-screen flex items-center justify-center bg-black selection:bg-orange-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-orange-900/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-4xl py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl"
        >
          {/* HEADER SECTION */}
          <div className="text-center mb-10">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-900/40"
            >
              <Smartphone size={40} className="text-white" />
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
              Mandir<span className="text-orange-500">XR</span>
            </h1>
            <p className="text-zinc-400 font-medium flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              Sacred AR Experience
            </p>
          </div>

          {!isLoggedIn ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
              <div className="bg-zinc-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                <Lock size={20} className="text-orange-500" />
              </div>
              <p className="text-zinc-300 mb-6 font-medium">Please sign in to access the AR models</p>
              <Link
                to="/signin?redirect=/ar"
                className="inline-block bg-orange-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-orange-900/20 hover:bg-orange-500 transition-all active:scale-95"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {/* TEMPLE SELECTION */}
              {!id && (
                <div className="flex gap-3 mb-8 flex-wrap justify-center">
                  {temples.map((temple) => (
                    <button
                      key={temple.id}
                      onClick={() => {
                        setSelectedTemple(temple);
                        setShowInfo(false);
                        handleStop();
                      }}
                      className={`px-6 py-2.5 rounded-full font-bold transition-all duration-300 border ${
                        selectedTemple?.id === temple.id
                          ? "bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-900/20"
                          : "bg-orange-600 text-white-400 border-white/5 hover:bg-orange-600/50"
                      }`}
                    >
                      {temple.name}
                    </button>
                  ))}
                </div>
              )}

              {/* VIEW SECTION */}
              <AnimatePresence mode="wait">
                {selectedTemple && (
                  <motion.div
                    key={selectedTemple.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-8"
                  >
                    <div className="aspect-video bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center relative">
                      {isMobile ? (
                        <div className="flex flex-col items-center gap-6 p-8 text-center">
                          <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white">Augmented Reality</h3>
                            <p className="text-sm text-zinc-500 max-w-[240px]">
                              Experience the {selectedTemple.name} in your own environment.
                            </p>
                          </div>
                          <button
                            onClick={() => openAR(selectedTemple.model)}
                            className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-10 py-4 rounded-2xl text-lg font-extrabold shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-3"
                          >
                            <Smartphone size={24} />
                            View in Space
                          </button>
                        </div>
                      ) : (
                        <MandirViewer modelPath={selectedTemple.model} />
                      )}
                    </div>

                    {/* DESKTOP CONTROLS */}
                    {!isMobile && (
                      <div className="flex justify-center items-center gap-4">
                        <button
                          onClick={() => setShowInfo(!showInfo)}
                          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                            showInfo ? "bg-white text-black" : "bg-orange-600 text-zinc-300 hover:bg-orange-700"
                          }`}
                        >
                          <Info size={20} />
                          {showInfo ? "Hide Info" : "Learn More"}
                        </button>

                        {showInfo && (
                          <div className="flex gap-2">
                            <button
                              onClick={handleListen}
                              disabled={isSpeaking}
                              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-500 disabled:opacity-50 transition-all shadow-lg shadow-emerald-900/20"
                            >
                              <Volume2 size={20} className={isSpeaking ? "animate-pulse" : ""} />
                              Listen
                            </button>
                            {isSpeaking && (
                              <button
                                onClick={handleStop}
                                className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-500 transition-all"
                              >
                                <Square size={20} />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* INFO PANEL */}
                    <AnimatePresence>
                      {showInfo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden"
                        >
                          <div className="p-8 sm:p-10">
                            <h2 className="text-2xl font-bold mb-6 text-orange-500">
                              {selectedTemple.name}
                            </h2>
                            <div className="space-y-4 text-zinc-300 leading-relaxed max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                              <p className="whitespace-pre-line text-base italic opacity-90">
                                {selectedTemple.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* QR SCAN SECTION */}
                    <div className="flex flex-col items-center pt-8 border-t border-white/5">
                      <div className="p-4 bg-white rounded-3xl shadow-lg shadow-orange-950/20 mb-4">
                        <QRCodeCanvas
                          value={`https://idealistic-commutatively-adan.ngrok-free.dev/ar/${selectedTemple.id}`}
                          size={130}
                          level="H"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-white-600">
                        <QrCode size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scan to open AR on your Mobile</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 165, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ARPage;