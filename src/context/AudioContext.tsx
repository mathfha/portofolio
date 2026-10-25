"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Disc3 } from "lucide-react";

interface AudioContextState {
  isPlaying: boolean;
  toggleMusic: () => void;
  beatScale: number;
  visualizerData: number[];
}

const AudioContext = createContext<AudioContextState>({
  isPlaying: false,
  toggleMusic: () => {},
  beatScale: 1,
  visualizerData: new Array(16).fill(16),
});

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({
  children,
  locale = "id",
}: {
  children: React.ReactNode;
  locale?: "id" | "en";
}) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === `/${locale}` || pathname === `/${locale}/`;

  // Only run intro if initially landing on home page
  const [isIntroVisible, setIsIntroVisible] = useState(isHome);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [beatScale, setBeatScale] = useState(1);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(16).fill(16));
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Direct native audio player helper (no suspended WebAudio graph lock)
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 1.0;
    audio.muted = false;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(() => {
        // Mobile browser policy blocked sound until first user gesture
        setAutoplayBlocked(true);
      });
  };

  // Mount effect: attempt auto-play immediately and register gesture unlock
  useEffect(() => {
    startTimeRef.current = Date.now();
    playAudio();

    const audio = audioRef.current;
    if (audio) {
      audio.onplay = () => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      };
      audio.onpause = () => setIsPlaying(false);
    }

    const unlockAudio = () => {
      const el = audioRef.current;
      if (el && el.paused) {
        el.volume = 1.0;
        el.muted = false;
        el
          .play()
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
    };

    window.addEventListener("click", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });
    window.addEventListener("scroll", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("scroll", unlockAudio);
    };
  }, []);

  // 6.0s rhythm loop tailored precisely to Metro Boomin - Too Many Nights (142 BPM)
  useEffect(() => {
    if (!isIntroVisible) return;

    const bpm = 142;
    const beatInterval = 60000 / bpm; // ~422.5ms per beat
    const INTRO_DURATION_MS = 6000;

    const updateFrame = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const currentProgress = Math.min((elapsed / INTRO_DURATION_MS) * 100, 100);
      setProgress(currentProgress);

      const beatPhase = (elapsed % beatInterval) / beatInterval;
      // Exponential punchy kick attack & smooth decay
      const kick = Math.pow(Math.max(0, 1 - beatPhase * 1.55), 2);
      setBeatScale(1 + kick * 0.22);

      const bars: number[] = [];
      for (let i = 0; i < 16; i++) {
        const offset = (i * 38) % beatInterval;
        const phase = ((elapsed + offset) % beatInterval) / beatInterval;
        const wave = Math.sin(phase * Math.PI);
        const height =
          i < 4
            ? 25 + kick * 65 + wave * 10
            : 18 + wave * 55 + kick * 25;
        bars.push(Math.min(100, Math.max(14, height)));
      }
      setVisualizerData(bars);

      if (currentProgress >= 100) {
        setIsIntroVisible(false);
      } else {
        animFrameRef.current = requestAnimationFrame(updateFrame);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isIntroVisible]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        toggleMusic,
        beatScale,
        visualizerData,
      }}
    >
      {/* Global Persistent Audio Element with native autoPlay */}
      <audio
        ref={audioRef}
        src="/audio/too-many-nights.mp3"
        autoPlay
        preload="auto"
        loop
        playsInline
      />

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN INTRO OVERLAY (Beat-responsive Name + Progress Bar)
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isIntroVisible ? (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onClick={playAudio}
            onTouchStart={playAudio}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-between p-6 sm:p-12 text-white select-none overflow-hidden font-mono cursor-pointer"
            style={{ backgroundColor: "#000000" }}
          >
            {/* Ambient Background Radial Beat Glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-150"
              style={{
                background: `radial-gradient(circle at center, rgba(255, 255, 255, ${
                  (beatScale - 1) * 0.35 + 0.05
                }) 0%, transparent 65%)`,
              }}
            />

            {/* Spacer Top */}
            <div className="w-full h-8" />

            {/* Center Stage: Interactive Name Dancing with the Music Rhythm */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 z-10 my-auto">
              <div className="flex flex-col items-center space-y-7">
                {/* The Beat-Synched Interactive Name */}
                <motion.div
                  animate={{
                    scale: beatScale,
                    letterSpacing: `${(beatScale - 1) * 0.25 + 0.08}em`,
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  className="relative text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-widest drop-shadow-2xl cursor-default"
                  style={{
                    textShadow: `0 0 ${Math.round((beatScale - 1) * 32)}px rgba(255, 255, 255, 0.9)`,
                  }}
                >
                  ADITYA RAHMAN
                </motion.div>

                {/* Equalizer Frequency Bars Visualizer */}
                <div className="flex items-end justify-center gap-1.5 h-14 sm:h-18 w-64 sm:w-80 px-4">
                  {visualizerData.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex-1 bg-white rounded-t-sm transition-all duration-75"
                      style={{
                        height: `${val}%`,
                        opacity: 0.35 + (val / 100) * 0.65,
                      }}
                    />
                  ))}
                </div>

                {/* Subtle Mobile Gesture Hint (only shown if mobile browser blocked audio) */}
                {!isPlaying && autoplayBlocked && (
                  <div className="text-[11px] text-text-dim tracking-widest uppercase animate-pulse pt-1">
                    {locale === "en" ? "[ tap for sound ]" : "[ sentuh layar untuk suara ]"}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Progress Bar: Minimalist & Clean (No text) */}
            <div className="w-full max-w-xs sm:max-w-sm z-10 pb-8 px-4">
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex-1 flex flex-col w-full h-full min-h-screen"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </AudioContext.Provider>
  );
}

/**
 * Clean music mute/unmute toggle button to place beside the theme switcher
 */
export function MusicToggleButton({
  className = "p-1.5 text-text-muted hover:text-text transition-colors",
  iconClassName = "w-4 h-4",
}: {
  className?: string;
  iconClassName?: string;
}) {
  const { isPlaying, toggleMusic } = useAudio();

  return (
    <button
      type="button"
      onClick={toggleMusic}
      className={className}
      title={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
      aria-label={isPlaying ? "Matikan Musik" : "Nyalakan Musik"}
    >
      {isPlaying ? (
        <Volume2 className={`${iconClassName} text-text`} />
      ) : (
        <VolumeX className={`${iconClassName} text-text-dim`} />
      )}
    </button>
  );
}
