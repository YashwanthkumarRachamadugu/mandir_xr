import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/integrations/firebase/client";
import { addPoints } from "@/integrations/firebase/userProfile";

const quizQuestions = [
  { question: "Which monument is known as the 'Symbol of Love'?", options: ["Qutub Minar", "Taj Mahal", "Hawa Mahal", "Red Fort"], answer: 1 },
  { question: "Bharatanatyam is a classical dance form from which state?", options: ["Kerala", "Karnataka", "Tamil Nadu", "Andhra Pradesh"], answer: 2 },
  { question: "The Kumbh Mela is held at how many locations?", options: ["2", "3", "4", "5"], answer: 2 },
  { question: "Which Indian art form uses 'lost-wax' metal casting?", options: ["Warli", "Madhubani", "Dokra", "Pattachitra"], answer: 2 },
  { question: "Pashmina shawls originate from which region?", options: ["Rajasthan", "Kashmir", "Himachal", "Uttarakhand"], answer: 1 },
  { question: "Which festival is known as the 'Festival of Lights'?", options: ["Holi", "Navratri", "Diwali", "Baisakhi"], answer: 2 },
  { question: "The Ajanta Caves are famous for their?", options: ["Sculptures", "Paintings", "Architecture", "All of the above"], answer: 3 },
  { question: "Which state celebrates Bihu?", options: ["Assam", "Bihar", "Odisha", "Manipur"], answer: 0 },
];

const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === quizQuestions[currentQ].answer) {
      setScore((s) => s + 10);
      setShowResult(true);
    } else {
      setShowResult(true);
    }
  };

  const nextQuestion = async () => {
    if (currentQ + 1 >= quizQuestions.length) {
      setFinished(true);
      if (user && score > 0) {
        try {
          await addPoints(user.uid, score);
        } catch {
          // ignore errors
        }
      }
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
  };

  const q = quizQuestions[currentQ];

  return (
    <div className="section-padding min-h-screen flex items-center justify-center">
      <div className="container mx-auto max-w-2xl">
        {finished ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-8 text-center">
            <Trophy className="mx-auto text-gold mb-4" size={64} />
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Quiz Complete!</h2>
            <p className="text-5xl font-bold text-gradient-saffron mb-2">{score}/{quizQuestions.length * 10}</p>
            <p className="text-muted-foreground mb-6">points earned</p>
            {!user && (
              <p className="text-xs text-muted-foreground mb-4">
                Login next time to save your score and earn rewards.
              </p>
            )}
            <button onClick={restart} className="gradient-saffron text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Play Again
            </button>
          </motion.div>
        ) : (
          <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-muted-foreground">Question {currentQ + 1}/{quizQuestions.length}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-gold">
                <Trophy size={16} /> {score} pts
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5 mb-6">
              <div className="h-full gradient-saffron rounded-full transition-all duration-300" style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }} />
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                let optClass = "glass hover:border-primary/50 cursor-pointer";
                if (showResult) {
                  if (idx === q.answer) optClass = "bg-secondary/20 border-india-green";
                  else if (idx === selected) optClass = "bg-destructive/10 border-destructive/50";
                  else optClass = "glass opacity-50";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${optClass}`}
                  >
                    <span className="w-8 h-8 rounded-full glass flex items-center justify-center text-xs font-bold text-muted-foreground shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-foreground text-sm">{opt}</span>
                    {showResult && idx === q.answer && <CheckCircle size={18} className="ml-auto text-india-green" />}
                    {showResult && idx === selected && idx !== q.answer && <XCircle size={18} className="ml-auto text-destructive" />}
                  </button>
                );
              })}
            </div>
            {showResult && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex justify-end">
                <button onClick={nextQuestion} className="flex items-center gap-2 gradient-saffron text-primary-foreground font-semibold px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
                  {currentQ + 1 >= quizQuestions.length ? "See Results" : "Next"} <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
