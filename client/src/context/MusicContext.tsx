import { createContext, useContext, useRef, useState } from "react";
import romanticSong from "@/assets/music/romantic.mp3";

type MusicContextType = {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
};

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch {
      // autoplay blocked (won't happen after YES click)
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <MusicContext.Provider value={{ play, pause, isPlaying }}>
      <audio ref={audioRef} src={romanticSong} loop />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) {
    throw new Error("useMusic must be used inside MusicProvider");
  }
  return ctx;
}
