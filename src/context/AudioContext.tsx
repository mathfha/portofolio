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
  const [beatScale, setBeatScale] = useState(1);
  const [visualizerData, setVisualizerData] = useState<number[]>(new Array(16).fill(16));
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  // Helper to start audio
  const startAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioContextClass) {
          const ctx = new AudioContextClass();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          analyser.smoothingTimeConstant = 0.8;

          try {
            const source = ctx.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(ctx.destination);
            analyserRef.current = analyser;
          } catch {}

          audioCtxRef.current = ctx;
        }
      }

      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }

      await audio.play();
      setIsPlaying(true);
    } catch {
      // Browser gesture policy caught: will resume on first user interaction
    }
  };

  // Mount effect: auto-play audio and register gesture listener
  useEffect(() => {
    startTimeRef.current = Date.now();
    startAudio();

    const handleGesture = () => {
      startAudio();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("click", handleGesture);
    };

    window.addEventListener("pointerdown", handleGesture, { passive: true });
    window.addEventListener("keydown", handleGesture, { passive: true });
    window.addEventListener("touchstart", handleGesture, { passive: true });
    window.addEventListener("click", handleGesture, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
      window.removeEventListener("click", handleGesture);
    };
  }, []);

  // 6.0s rhythm loop for intro before sliding to portfolio
  useEffect(() => {
    if (!isIntroVisible) return;

    const dataArray = new Uint8Array(16);
    const INTRO_DURATION_MS = 6000;

    const updateFrame = () => {
      const now = Date.now();
      const elapsed = now - (startTimeRef.current || now);
      const currentProgress = Math.min((elapsed / INTRO_DURATION_MS) * 100, 100);
      setProgress(currentProgress);

      let bassEnergy = 0;
      const bars: number[] = [];

      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(dataArray);
        const bassSum = dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3];
        bassEnergy = bassSum / (4 * 255);

        for (let i = 0; i < 16; i++) {
          bars.push(Math.max((dataArray[i] / 255) * 100, 15));
        }
      } else {
        const bpm = 142;
        const beatInterval = 60000 / bpm;
        const phase = (elapsed % beatInterval) / beatInterval;
        bassEnergy = Math.max(0, 1 - phase * 1.8);

        for (let i = 0; i < 16; i++) {
          const barPhase = ((elapsed + i * 40) % beatInterval) / beatInterval;
          bars.push(16 + Math.sin(barPhase * Math.PI) * 75);
        }
      }

      setBeatScale(1 + bassEnergy * 0.24);
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
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
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
      {/* Global Persistent Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/too-many-nights.mp3"
        preload="auto"
        loop
        playsInline
      />

      {/* ─────────────────────────────────────────────────────────────
          FULLSCREEN INTRO OVERLAY (Beat-responsive Name + Auto-slide)
          ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isIntroVisible && (
          <motion.div
            key="intro-screen"
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
            onClick={startAudio}
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
                    <motion.div
                      key={idx}
                      className="flex-1 bg-white rounded-t-sm"
                      animate={{ height: `${val}%` }}
                      transition={{ duration: 0.05, ease: "linear" }}
                      style={{
                        opacity: 0.35 + (val / 100) * 0.65,
                      }}
                    />
                  ))}
                </div>

                {/* Song Title Pill */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 backdrop-blur-md shadow-lg">
                  <Disc3 className={`w-4 h-4 text-white ${isPlaying ? "animate-spin" : ""}`} />
                  <span className="font-semibold truncate max-w-xs sm:max-w-md">
                    Too Many Nights (feat. Don Toliver) - Metro Boomin
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar: 6.0s countdown before auto-sliding to portfolio */}
            <div className="w-full max-w-md space-y-2 z-10 pb-4 text-center">
              <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>{locale === "en" ? "Entering Portfolio..." : "Menuju Portofolio..."}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Content - Smoothly reveals as intro finishes */}
      <motion.div
        initial={isHome ? { opacity: 0 } : { opacity: 1 }}
        animate={{ opacity: isIntroVisible ? 0 : 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        className="flex-1 flex flex-col w-full h-full min-h-screen"
      >
        {children}
      </motion.div>
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
