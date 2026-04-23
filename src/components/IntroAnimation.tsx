import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import bellSound from "@/assets/bell.mp3";
import heroBg from "@/assets/temple-bg.jpg"; // ✅ NEW IMAGE

const IntroAnimation = ({ onFinish }: { onFinish: () => void }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 🔔 Bell sound
    audioRef.current = new Audio(bellSound);
    audioRef.current.volume = 0.6;

    const soundTimer = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 900);

    // ⏱ End after 4 sec
    const endTimer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(endTimer);
      audioRef.current?.pause();
    };
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-[9999] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* 🌄 Background (zoom + blur) */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: "blur(2px)",
        }}
        initial={{ scale: 1.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 2.5 }}
      />

      {/* 🌈 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      {/* 🔥 Diya Glow Aura */}
      <motion.div
        className="absolute w-[320px] h-[320px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,153,0,0.4) 0%, rgba(255,94,0,0.2) 40%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* 🔥 Fire / Diya Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            background:
              "radial-gradient(circle, rgba(255,200,100,1) 0%, rgba(255,140,0,0.8) 60%, transparent 100%)",
            filter: "blur(1px)",
          }}
          initial={{
            x: Math.random() * 100 + "vw",
            y: "100vh",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: ["100vh", "-10vh"],
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.8],
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 🛕 MandirXR Text */}
      <motion.h1
        className="relative text-5xl md:text-7xl font-bold text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        {/* Mandir */}
        <motion.span
          className="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Mandir
        </motion.span>

        {/* XR */}
        <motion.span
          className="ml-2 bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          XR
        </motion.span>

        {/* ✨ Shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, delay: 1.5 }}
        />
      </motion.h1>

      {/* 🔥 Flame Icon */}
      <motion.div
        className="absolute bottom-16 text-3xl"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
      >
        
      </motion.div>

      {/* 💨 Fade Out */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default IntroAnimation;