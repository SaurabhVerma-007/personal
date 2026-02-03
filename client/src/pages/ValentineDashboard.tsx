import { useState, useEffect, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, Camera, Trophy } from "lucide-react";
import { KawaiiButton } from "@/components/KawaiiButton";
import { cn } from "@/lib/utils";
import memory1 from "@/assets/memories/photo1.jpeg";
import memory2 from "@/assets/memories/photo2.jpeg";


const QUIZ_STATE_KEY = "valentine_quiz_state";

export default function ValentineDashboard() {
  const [activeGift, setActiveGift] = useState<number | null>(null);
  const [showGifts, setShowGifts] = useState(false);

  // Pre-calculate random positions for emojis
  const backgroundEmojis = useMemo(() => {
    const symbols = ["🌸", "✨", "🎀", "💖", "🍓", "🦋", "🧸", "💌", "🌹", "🍮", "🍭", "🐰", "🥰", "🧁", "💍"];
    return [...Array(20)].map((_, i) => ({
      char: symbols[i % symbols.length],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 5
    }));
  }, []);

  if (!showGifts) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 p-4 md:p-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full kawaii-card p-8 md:p-12 text-center space-y-8 bg-white/80 backdrop-blur-sm shadow-xl border-2 border-primary/10"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block relative"
          >
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-inner bg-pink-50">
              <img
                src="https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=500&auto=format&fit=crop&q=60"
                alt="Cute Bear"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
              <span className="text-2xl">💍</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl text-primary font-bold">
              Happy Valentine Day Baby! 💍
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-handwriting leading-relaxed max-w-lg mx-auto">
              Every second with you is a celebration. You are the spark that
              makes my world so much brighter!
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <KawaiiButton
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white border-red-800 shadow-red-200/50 px-12 py-6 text-xl rounded-full"
              onClick={() => setShowGifts(true)}
            >
              CONTINUE...
            </KawaiiButton>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Floating Elements Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {backgroundEmojis.map((emoji, i) => (
            <motion.div
              key={i}
              className="absolute text-3xl will-change-transform filter drop-shadow-sm"
              style={{
                left: emoji.left,
                top: emoji.top,
              }}
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 15, -15, 0],
                opacity: [0, 0.8, 0], // Increased max visibility from 0.7 to 0.8
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

        {/* Header */}
        <header className="text-center space-y-4 pt-8 relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block bg-white p-4 rounded-full shadow-lg mb-4"
          >
            <Heart className="w-12 h-12 text-primary fill-current animate-pulse" />
          </motion.div>
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl text-primary font-bold mb-8"
          >
            Something for You
          </motion.h2>
        </header>

        {/* Gift Selection or Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeGift === null ? (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[1, 2, 3].map((num) => (
                  <motion.div
                    key={num}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveGift(num)}
                    className="kawaii-card p-12 flex flex-col items-center justify-center cursor-pointer bg-white/80 hover:bg-white transition-colors border-2 border-transparent hover:border-primary/20"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-pink-100 rounded-2xl flex items-center justify-center text-5xl">
                        {num === 1 ? "💝" : num === 2 ? "🤍" : "💖"}
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      Gift {num}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-md mx-auto relative pt-12"
              >
                <motion.button
                  onClick={() => setActiveGift(null)}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-primary font-bold hover:underline bg-white/80 px-4 py-1 rounded-full shadow-sm z-10"
                >
                  ← Go Back
                </motion.button>
                {activeGift === 1 && <QuizCard />}
                {activeGift === 2 && <LetterCard />}
                {activeGift === 3 && <PhotoGalleryCard />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="text-center pb-12 opacity-50 text-sm">
          Made with ❤️ just for you
        </footer>
      </div>
    </div>
  );
}

// --- Card Components ---

function QuizCard() {
  const quizQuestions = useMemo(() => [
    {
      question: "Who is the absolute 'Boss' in this relationship? 👑",
      options: ["RK", "Dikku", "The Cat"],
      correct: "Dikku",
    },
    {
      question: "What's my favorite thing about you? ✨",
      options: ["Your Smile", "Your Heart", "Everything"],
      correct: "Everything",
    },
    {
      question: "Where was our most memorable date? 🌹",
      options: ["The first one", "The last one", "Every moment is memorable"],
      correct: "Every moment is memorable",
    },
    {
      question: "If we were emojis, which pair would we be? 🐱🐶",
      options: ["👩‍❤️‍👨", "👩‍❤️‍👩", "The cutest one ever"],
      correct: "The cutest one ever",
    },
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
  const saved = localStorage.getItem(QUIZ_STATE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.currentQuestion ?? 0;
    } catch {
      return 0;
    }
  }
  return 0;
});
  
 const [score, setScore] = useState<number>(() => {
  const saved = localStorage.getItem(QUIZ_STATE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.score ?? 0;
    } catch {
      return 0;
    }
  }
  return 0;
});


  const [showResult, setShowResult] = useState<boolean>(() => {
  const saved = localStorage.getItem(QUIZ_STATE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return parsed.showResult ?? false;
    } catch {
      return false;
    }
  }
  return false;
});

  const [answered, setAnswered] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify({
      currentQuestion,
      score,
      showResult
    }));
  }, [currentQuestion, score, showResult]);

  const handleAnswer = (option: string) => {
    if (option === quizQuestions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
      setAnswered("correct");
    } else {
      setAnswered("wrong");
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        setAnswered(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="kawaii-card p-6 flex flex-col h-full bg-gradient-to-br from-white to-pink-50 text-center justify-center space-y-4"
      >
        <div className="text-6xl mb-4">🏆</div>
        <h3 className="text-2xl font-bold text-gray-800">Quiz Completed!</h3>
        <p className="text-pink-600 font-bold text-xl">
          You got {score}/{quizQuestions.length} right!
        </p>
        <p className="text-gray-500 font-handwriting">
          But honestly, you're always 100% in my heart! ❤️
        </p>
        <KawaiiButton
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setAnswered(null);
            localStorage.removeItem(QUIZ_STATE_KEY);
          }}
        >
          Play Again 🔄
        </KawaiiButton>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="kawaii-card p-6 flex flex-col h-full bg-gradient-to-br from-white to-pink-50"
    >
      <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-orange-500 shadow-sm">
        <Trophy size={24} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Relationship Quiz
      </h3>
      <p className="text-gray-500 mb-6 font-handwriting">
        {quizQuestions[currentQuestion].question}
      </p>

      <div className="space-y-3 mt-auto">
        {quizQuestions[currentQuestion].options.map((opt) => (
          <KawaiiButton
            key={opt}
            variant={
              answered === null
                ? "secondary"
                : opt === quizQuestions[currentQuestion].correct
                  ? "primary"
                  : "secondary"
            }
            className={cn(
              "w-full justify-between group transition-all",
              answered !== null &&
                opt === quizQuestions[currentQuestion].correct &&
                "bg-green-400 border-green-600",
              answered === "wrong" &&
                opt !== quizQuestions[currentQuestion].correct &&
                "opacity-50",
            )}
            onClick={() => answered === null && handleAnswer(opt)}
            disabled={answered !== null}
          >
            <span>{opt}</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              {answered === null
                ? "❓"
                : opt === quizQuestions[currentQuestion].correct
                  ? "✅"
                  : "❌"}
            </span>
          </KawaiiButton>
        ))}
        {answered === "wrong" && (
          <motion.p
            initial={{ x: -10 }}
            animate={{ x: 0 }}
            className="text-red-500 text-center font-bold text-sm mt-2"
          >
            Almost! But you're still perfect! ✨
          </motion.p>
        )}
        {answered === "correct" && (
          <motion.p
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-green-500 text-center font-bold text-sm mt-2"
          >
            You know me so well! 🥰
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function LetterCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText =
    "To my dearest love,\n\nFrom the moment I met you, my life became brighter. You are my best friend, my partner, and my greatest adventure.\n\nThank you for every laugh, every hug, and every moment we share. You mean the world to me.\n\nForever yours, ❤️";

  useEffect(() => {
    if (isOpen && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, typedText]);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="kawaii-card p-6 flex flex-col h-full bg-gradient-to-br from-white to-purple-50"
    >
      <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-purple-500 shadow-sm">
        <Mail size={24} />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Love Letter</h3>
      <p className="text-gray-500 mb-6 font-handwriting">
        A little note from my heart... 💌
      </p>

      {!isOpen ? (
        <div className="flex-1 flex items-center justify-center py-8">
          <KawaiiButton
            variant="primary"
            onClick={() => setIsOpen(true)}
            className="bg-purple-400 hover:bg-purple-500 border-purple-600"
          >
            Read Me! 📬
          </KawaiiButton>
        </div>
      ) : (
        <div className="bg-white/50 rounded-xl p-4 border border-purple-100 h-64 overflow-y-auto font-handwriting text-lg leading-relaxed shadow-inner">
          <p className="whitespace-pre-wrap">{typedText}</p>
          {typedText.length < fullText.length && (
            <span className="inline-block w-2 h-4 bg-purple-400 animate-pulse ml-1" />
          )}
        </div>
      )}
    </motion.div>
  );
}

function PhotoGalleryCard() {
  const photos = [
    {
      url: memory1,
      caption: "My heart is yours 💖",
    },
    {
      url: memory2,
      caption: "I Love You ❤️ RK",
    },
  ];

  const [index, setIndex] = useState<number>(0);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="kawaii-card p-6 flex flex-col h-full bg-gradient-to-br from-white to-blue-50"
    >
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-500 shadow-sm">
        <Camera size={24} />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-2">
        Our Memories
      </h3>
      <p className="text-gray-500 mb-6 font-handwriting">
        Snapshots of us 📸
      </p>

      {/* Image Container */}
      <div className="relative flex-1 rounded-2xl overflow-hidden shadow-inner min-h-[260px] bg-black">
        {/* Blurred Background */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`bg-${index}`}
            src={photos[index].url}
            alt="Background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110"
          />
        </AnimatePresence>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Foreground Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={`fg-${index}`}
            src={photos[index].url}
            alt="Memory"
            initial={{ opacity: 0, scale: 1.25 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 mx-auto max-h-full max-w-full object-contain"
          />
        </AnimatePresence>

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <p className="text-white font-handwriting text-lg text-center">
            {photos[index].caption}
          </p>
        </div>

        {/* Dots */}
        <div className="absolute top-4 right-4 z-20 flex gap-1">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white"
              )}
            />
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-2 mt-4">
        <KawaiiButton
          variant="secondary"
          size="sm"
          onClick={() =>
            setIndex((prev) => (prev - 1 + photos.length) % photos.length)
          }
        >
          Previous
        </KawaiiButton>

        <KawaiiButton
          variant="secondary"
          size="sm"
          onClick={() =>
            setIndex((prev) => (prev + 1) % photos.length)
          }
        >
          Next
        </KawaiiButton>
      </div>
    </motion.div>
  );
}


