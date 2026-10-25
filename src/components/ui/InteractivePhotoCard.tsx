"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

const PHOTOS = [
  {
    id: "formal",
    src: "/image/foto-formal.png",
    label: "Formal",
  },
  {
    id: "bebas",
    src: "/image/foto-bebas.jpeg",
    label: "Casual",
  },
  {
    id: "dua-jari",
    src: "/image/foto-dengan-2-jari.jpeg",
    label: "Santai",
  },
  {
    id: "roko",
    src: "/image/foto-dengan-roko.jpeg",
    label: "Chill",
  },
];

export function InteractivePhotoCard() {
  const [activeIdx, setActiveIdx] = useState(0); // 0..3

  const handleSwap = () => {
    setActiveIdx((prev) => (prev + 1) % PHOTOS.length);
  };

  const frontPhoto = PHOTOS[activeIdx];
  const backPhoto = PHOTOS[(activeIdx + 1) % PHOTOS.length];

  return (
    <div className="relative pt-2 pb-2 select-none flex justify-center w-full">
      <div
        className="relative w-[210px] sm:w-[230px] aspect-[3/4] cursor-grab active:cursor-grabbing group outline-none mx-auto"
        onClick={handleSwap}
        title="Klik atau geser kartu untuk beralih foto"
      >
        {/* Back Card (Tilted behind - borderless & centered) */}
        <motion.div
          key={`back-${backPhoto.id}`}
          initial={{ scale: 0.95, rotate: 4, x: 8, y: 6, opacity: 0.65 }}
          animate={{ scale: 0.95, rotate: 4, x: 8, y: 6, opacity: 0.7 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute inset-0 rounded-2xl overflow-hidden bg-surface shadow-xl z-0"
        >
          <img
            src={backPhoto.src}
            alt={backPhoto.label}
            className="w-full h-full object-cover object-top pointer-events-none filter brightness-75"
            draggable={false}
          />
        </motion.div>

        {/* Front Card (Draggable with spring physics - borderless & centered) */}
        <motion.div
          key={`front-${frontPhoto.id}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.45}
          onDragEnd={(_, info) => {
            if (Math.abs(info.offset.x) > 40 || Math.abs(info.velocity.x) > 250) {
              handleSwap();
            }
          }}
          initial={{ scale: 0.95, rotate: 3, x: 6, y: 4, opacity: 0.8 }}
          animate={{ scale: 1, rotate: 0, x: 0, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="absolute inset-0 rounded-2xl overflow-hidden bg-surface shadow-2xl z-10"
        >
          <img
            src={frontPhoto.src}
            alt={frontPhoto.label}
            className="w-full h-full object-cover object-top pointer-events-none"
            draggable={false}
          />

          {/* Minimalist Click Identifier Icon (Top-Left) */}
          <div
            className="absolute top-3 left-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-text/80 group-hover:text-accent group-hover:scale-110 transition-all shadow-md pointer-events-none"
            aria-hidden="true"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
