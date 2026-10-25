"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface DraggableMarqueeProps {
  children: React.ReactNode;
  speed?: number; // base speed in px per frame (~60fps)
  direction?: "left" | "right";
  className?: string;
}

export function DraggableMarquee({
  children,
  speed = 0.65,
  direction = "left",
  className = "",
}: DraggableMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  // Mutable state refs for 60/120fps hardware-composited animation loop
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const startXRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const justDraggedRef = useRef(false);
  const posRef = useRef(0);
  const currentSpeedRef = useRef(speed);
  const velocityRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const halfWidthRef = useRef(0);

  const dirMultiplier = direction === "left" ? 1 : -1;
  const targetBaseSpeed = Math.abs(speed) * dirMultiplier;

  // Measure track width to find exact halfway loop wrap point
  const measureTrack = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = track.scrollWidth;
    halfWidthRef.current = total / 2;
  }, []);

  useEffect(() => {
    measureTrack();
    const track = trackRef.current;
    if (track && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => measureTrack());
      ro.observe(track);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", measureTrack);
    return () => window.removeEventListener("resize", measureTrack);
  }, [measureTrack]);

  // Main high-performance RAF physics loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      // Normalize dt to 60fps frame (~16.666ms) with upper clamp to avoid jump after tab switch
      const dt = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      const track = trackRef.current;
      const halfWidth = halfWidthRef.current;

      if (track && halfWidth > 0) {
        if (!isDraggingRef.current) {
          // 1. Friction momentum deceleration when user releases after a drag/flick
          if (Math.abs(velocityRef.current) > 0.04) {
            velocityRef.current *= 0.94; // glide friction
            posRef.current += velocityRef.current * dt;
          } else {
            velocityRef.current = 0;
            // 2. Gentle lerp when hovered: slow smoothly to 20% crawl rather than abrupt harsh halt
            const target = isHoveredRef.current ? targetBaseSpeed * 0.2 : targetBaseSpeed;
            currentSpeedRef.current += (target - currentSpeedRef.current) * 0.06;
            posRef.current += currentSpeedRef.current * dt;
          }

          // 3. Seamless modulo wrap
          while (posRef.current >= halfWidth) {
            posRef.current -= halfWidth;
          }
          while (posRef.current < 0) {
            posRef.current += halfWidth;
          }

          // 4. Sub-pixel hardware-accelerated transform (avoids DOM scrollLeft integer truncation)
          track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [targetBaseSpeed]);

  // Pointer drag event handlers (clean separation between tap/click and drag)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    isPointerDownRef.current = true;
    startXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityRef.current = 0;
    dragDistanceRef.current = 0;
    hasDraggedRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const totalDist = Math.abs(e.clientX - startXRef.current);
    if (!hasDraggedRef.current) {
      if (totalDist > 8) {
        hasDraggedRef.current = true;
        isDraggingRef.current = true;
        setIsDragging(true);
      } else {
        return;
      }
    }

    const now = performance.now();
    const deltaX = e.clientX - lastPointerXRef.current;
    const dt = Math.max(now - lastPointerTimeRef.current, 8);

    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;
    dragDistanceRef.current += Math.abs(deltaX);

    // Instant direct displacement
    posRef.current -= deltaX;

    // Smoothed drag velocity for fluid inertia upon release
    const instantVelocity = -deltaX / (dt / 16.666);
    velocityRef.current = velocityRef.current * 0.5 + instantVelocity * 0.5;

    const track = trackRef.current;
    const halfWidth = halfWidthRef.current;
    if (track && halfWidth > 0) {
      while (posRef.current >= halfWidth) posRef.current -= halfWidth;
      while (posRef.current < 0) posRef.current += halfWidth;
      track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
    }
  };

  const onPointerUp = () => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    if (hasDraggedRef.current) {
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 100);
    }
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  // Two-finger trackpad / mouse horizontal wheel support
  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
    if (Math.abs(delta) > 0) {
      posRef.current += delta * 0.7;
      const track = trackRef.current;
      const halfWidth = halfWidthRef.current;
      if (track && halfWidth > 0) {
        while (posRef.current >= halfWidth) posRef.current -= halfWidth;
        while (posRef.current < 0) posRef.current += halfWidth;
        track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
      }
    }
  };

  // Prevent click ONLY if the user actually performed an intentional drag (> 8px)
  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDraggedRef.current || justDraggedRef.current || dragDistanceRef.current > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      onClickCapture={onClickCapture}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className={`overflow-hidden select-none mask-marquee py-2.5 touch-pan-y ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
    >
      <div
        ref={trackRef}
        className="flex gap-8 sm:gap-10 items-center w-max will-change-transform"
      >
        {children}
        {children}
      </div>
    </div>
  );
}
