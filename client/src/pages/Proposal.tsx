import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { KawaiiButton } from "@/components/KawaiiButton";
import { useMusic } from "@/context/MusicContext";

export default function Proposal() {
  const [, setLocation] = useLocation();
  const { play } = useMusic();

  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Floating background emojis
  const backgroundEmojis = useMemo(() => {
    const emojis = ["💖", "✨", "🎀", "🧸", "💌", "🌸", "🍭", "🥰", "🌹", "🍓", "🦋"];
    return [...Array(15)].map((_, i) => ({
      char: emojis[i % emojis.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 5,
    }));
  }, []);

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.4);

    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    setNoPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    // 🎵 Start background music (user interaction safe)
    play();

    // 🎉 Confetti explosion
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    // ❤️ Navigate after celebration
    setTimeout(() => setLocation("/valentine"), 1500);
  };

  const getNoText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again! 🥺",
      "Last chance!",
      "You're breaking my heart 💔",
      "I'm gonna cry...",
      "PLEASE! 😭",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center overflow-hidden bg-gradient-to-br from-pink-50 to-red-50">
      {/* Floating Emoji Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {backgroundEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl will-change-transform filter drop-shadow-sm"
            style={{ left: emoji.left, top: emoji.top }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              y: [0, 20, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: emoji.duration,
              repeat: Infinity,
              ease: "linear",
              delay: emoji.delay,
            }}
          >
            {emoji.char}
          </motion.div>
        ))}
      </div>

      <div className="z-10 max-w-lg w-full">
        {/* Character */}
        <motion.div
          className="text-9xl mb-8 filter drop-shadow-xl animate-float cursor-default"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {noCount < 3 ? "🐻" : noCount < 6 ? "🥺" : "😭"}
        </motion.div>

        {/* Question */}
        <motion.h1
          className="text-4xl md:text-6xl text-primary font-bold mb-12 drop-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Will you be my Valentine?
        </motion.h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[120px]">
          <motion.div
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <KawaiiButton
              size="xl"
              onClick={handleYesClick}
              className="bg-gradient-to-r from-pink-500 to-rose-500 shadow-pink-300/50"
            >
              YES! 💖
            </KawaiiButton>
          </motion.div>

          <AnimatePresence>
            {noCount < 8 && (
              <motion.div
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <KawaiiButton
                  variant="danger"
                  size="lg"
                  onClick={handleNoClick}
                  className="bg-slate-300 hover:bg-slate-400 border-slate-400 text-slate-700"
                >
                  {getNoText()}
                </KawaiiButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
