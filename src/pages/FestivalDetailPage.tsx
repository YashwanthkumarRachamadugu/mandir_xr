import { useParams, useNavigate } from "react-router-dom";
import { festivalsData } from "@/data/festivalsData";
import { useEffect, useState } from "react";
import { Volume2, Square, ArrowLeft, CheckCircle2, Sparkles, BookOpen, Trophy, ExternalLink } from "lucide-react"; // Added ExternalLink
import { addPoints } from "@/integrations/firebase/userProfile";
import { auth } from "@/integrations/firebase/client";

const FestivalDetailPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const festival = festivalsData.find((f) => f.name === name);

  const [storyContent, setStoryContent] = useState<string>("Loading story...");
  const [progress, setProgress] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [passed, setPassed] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // 📄 FETCH TEXT FROM FILE
  useEffect(() => {
    const loadStory = async () => {
      if (festival?.longDescPath) {
        try {
          const response = await fetch(festival.longDescPath);
          const text = await response.text();
          setStoryContent(text);
        } catch (error) {
          console.error("Failed to load story text:", error);
          setStoryContent("Sorry, we couldn't load the story for this festival.");
        }
      }
    };
    loadStory();
  }, [festival]);

  // 🔊 AUDIO CONTROLS
  const speak = () => {
    if (!storyContent) return;
    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(storyContent);
    speech.lang = "en-IN";
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
    setIsSpeaking(true);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  // 📊 SCROLL PROGRESS
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / total) * 100;
      setProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🛑 REWARD CHECK
  useEffect(() => {
    const user = auth.currentUser;
    if (!user || !festival) return;
    const key = `${user.uid}_${festival.name}`;
    if (localStorage.getItem(key)) {
      setClaimed(true);
    }
  }, [festival]);

  if (!festival) return <div className="p-10 text-center text-white bg-[#0a0a0a] min-h-screen">Festival Not Found</div>;

  const submitQuiz = () => {
    let score = 0;
    festival.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });

    if (score >= Math.ceil(festival.quiz.length / 2)) {
      setPassed(true);
    } else {
      alert("❌ Almost there! Review the story and try again.");
    }
  };

  const claimReward = async () => {
    const user = auth.currentUser;
    if (!user || claimed) return;
    try {
      await addPoints(user.uid, festival.points);
      localStorage.setItem(`${user.uid}_${festival.name}`, "true");
      setClaimed(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 selection:bg-orange-500/30">
      {/* 🇮🇳 PREMIUM PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-2 bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-yellow-400 to-green-500 transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => navigate("/festivals")}
            className="flex items-center gap-2 text-slate-400 hover:text-orange-400 transition-colors group"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500/10 transition">
                <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to Festivals</span>
          </button>
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <Trophy size={16} className="text-yellow-500" />
            <span className="text-sm font-bold">{festival.points} pts potential</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-4 tracking-tighter">
                {festival.name}
            </h1>
            <p className="text-orange-500 font-medium text-xl flex items-center gap-2">
                <Sparkles size={20} /> {festival.shortDesc}
            </p>
        </div>

        {/* IMAGE CAROUSEL */}
        <div className="flex gap-6 overflow-x-auto mb-16 pb-6 scrollbar-hide snap-x">
          {festival.images.map((img, i) => (
            <div key={i} className="snap-center shrink-0">
                <img 
                src={img} 
                className="w-[300px] md:w-[500px] h-[250px] md:h-[350px] object-cover rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-[1.02] duration-500" 
                alt={festival.name}
                />
            </div>
          ))}
        </div>

        {/* AUDIO ENGINE */}
        <div className="flex items-center gap-4 mb-12">
          {!isSpeaking ? (
            <button 
              onClick={speak} 
              className="flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/40 active:scale-95"
            >
              <Volume2 size={24} /> Listen to Story
            </button>
          ) : (
            <button 
              onClick={stopSpeech} 
              className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              <Square size={20} /> Stop Listening
            </button>
          )}
        </div>

        {/* CONTENT AREA */}
        <article className="relative mb-12">
          <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/50 to-transparent rounded-full hidden md:block" />
          <div className="prose prose-invert max-w-none">
            <p className="text-slate-300 text-xl md:text-2xl leading-[1.8] font-light whitespace-pre-line">
              {storyContent}
            </p>
          </div>
        </article>

        {/* 🔗 EXTERNAL LINK SECTION (ADDED) */}
        <div className="mb-20 p-6 rounded-3xl bg-white/[0.03] border border-white/10 inline-block">
          <p className="text-slate-400 mb-2 text-xs uppercase tracking-[0.2em] font-bold">Dive deeper</p>
          <a 
            href={festival.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-orange-400 hover:text-orange-300 text-xl font-bold transition-all group underline underline-offset-8 decoration-orange-500/20 hover:decoration-orange-500"
          >
            Explore more info <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* QUIZ SECTION */}
        <div id="quiz" className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-green-500 rounded-[3rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative bg-[#111] border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden">
            {claimed && (
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/30 font-bold animate-pulse">
                    <CheckCircle2 size={18} /> Finished
                </div>
            )}

            <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <BookOpen className="text-orange-500" /> Quiz Challenge
            </h2>

            {!quizStarted ? (
              <div className="text-center py-10">
                <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  {progress < 80 
                    ? "Complete reading the story to unlock the quiz and earn your rewards!" 
                    : "You've mastered the story! Ready to prove your knowledge?"}
                </p>
                <button
                  disabled={progress < 80}
                  onClick={() => setQuizStarted(true)}
                  className={`px-12 py-5 rounded-2xl font-black text-xl transition-all duration-500 ${
                    progress < 80 
                    ? "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5" 
                    : "bg-white text-black hover:bg-orange-500 hover:text-white shadow-[0_20px_50px_rgba(255,255,255,0.1)] active:scale-95"
                  }`}
                >
                  {progress < 80 ? "Read more to unlock" : "Unlock Quiz"}
                </button>
              </div>
            ) : !passed ? (
              <div className="space-y-12">
                {festival.quiz.map((q, i) => (
                  <div key={i} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-2xl font-bold text-white mb-6 leading-snug">
                      <span className="text-orange-500 mr-3">0{i + 1}.</span> {q.question}
                    </p>
                    <div className="grid gap-4">
                      {q.options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => setAnswers({ ...answers, [i]: opt })}
                          className={`w-full text-left px-8 py-5 rounded-2xl border-2 transition-all duration-300 font-medium text-lg ${
                            answers[i] === opt
                              ? "border-orange-500 bg-orange-500/10 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                              : "border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={submitQuiz}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-6 rounded-2xl text-xl transition-all shadow-xl shadow-orange-900/20"
                >
                  SUBMIT CHALLENGE
                </button>
              </div>
            ) : (
              <div className="text-center py-10 animate-in zoom-in duration-500">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-500/10 text-green-500 rounded-full mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={54} />
                </div>
                <h3 className="text-4xl font-black text-white mb-4 italic">Excellent Work!</h3>
                <p className="text-slate-400 text-lg mb-10">You've successfully completed the module for {festival.name}.</p>
                
                <button
                  onClick={claimReward}
                  disabled={claimed}
                  className={`w-full max-w-sm py-6 rounded-2xl font-black text-2xl transition-all ${
                    claimed 
                    ? "bg-white/5 text-slate-600 cursor-not-allowed grayscale" 
                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-2xl hover:scale-105 active:scale-95"
                  }`}
                >
                  {claimed ? "REWARD CLAIMED" : `CLAIM ${festival.points} POINTS`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalDetailPage;