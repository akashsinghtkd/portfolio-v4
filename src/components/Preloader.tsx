"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      // Eased progress
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));

      if (p < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setPhase("revealing");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 800);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const circumference = 2 * Math.PI * 52;
  const dashOffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Logo morph */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Circular progress ring */}
            <svg width="120" height="120" viewBox="0 0 120 120" className="relative z-10">
              <circle
                cx="60"
                cy="60"
                r="52"
                className="skill-ring-bg"
                strokeWidth="1"
              />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                strokeWidth="2"
                stroke="#c4a35a"
                fill="none"
                strokeLinecap="round"
                className="skill-ring"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
              />
            </svg>

            {/* Initials in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-2xl font-bold tracking-widest"
                style={{ color: "#c4a35a" }}
                animate={{
                  opacity: phase === "revealing" ? [1, 0] : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                AS
              </motion.span>
            </div>
          </motion.div>

          {/* Progress number */}
          <motion.div
            className="text-sm tracking-[0.3em] font-mono"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {progress}%
          </motion.div>

          {/* Bottom text */}
          <motion.p
            className="absolute bottom-12 text-xs tracking-[0.25em] uppercase"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
          >
            Engineering the experience
          </motion.p>

          {/* Reveal overlay */}
          {phase === "revealing" && (
            <>
              <motion.div
                className="absolute inset-0 z-50"
                style={{ background: "var(--background)", transformOrigin: "bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.76, 0, 0.24, 1],
                }}
                onAnimationComplete={() => {
                  /* handled by timeout */
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
