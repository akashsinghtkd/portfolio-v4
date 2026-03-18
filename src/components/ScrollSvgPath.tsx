"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollSvgPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <svg
        viewBox="0 0 1200 4000"
        fill="none"
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Main flowing path */}
        <motion.path
          d="M 600 0
             C 200 200, 1000 400, 600 600
             C 200 800, 1000 1000, 600 1200
             C 200 1400, 1000 1600, 600 1800
             C 200 2000, 1000 2200, 600 2400
             C 200 2600, 1000 2800, 600 3000
             C 200 3200, 1000 3400, 600 3600
             C 200 3800, 800 4000, 600 4000"
          stroke="url(#pathGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          style={{
            pathLength,
            opacity,
          }}
        />

        {/* Secondary decorative path */}
        <motion.path
          d="M 100 0
             C 400 300, 50 600, 300 900
             C 550 1200, 100 1500, 350 1800
             C 600 2100, 150 2400, 400 2700
             C 650 3000, 200 3300, 450 3600
             C 700 3900, 250 4000, 300 4000"
          stroke="url(#pathGradient2)"
          strokeWidth="0.5"
          strokeLinecap="round"
          style={{
            pathLength,
            opacity,
          }}
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(196, 163, 90, 0.3)" />
            <stop offset="50%" stopColor="rgba(196, 163, 90, 0.1)" />
            <stop offset="100%" stopColor="rgba(196, 163, 90, 0.3)" />
          </linearGradient>
          <linearGradient id="pathGradient2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(196, 163, 90, 0.15)" />
            <stop offset="50%" stopColor="rgba(196, 163, 90, 0.05)" />
            <stop offset="100%" stopColor="rgba(196, 163, 90, 0.15)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
