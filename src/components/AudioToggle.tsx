"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const synthRef = useRef<any>(null);
  const loopRef = useRef<any>(null);

  const initAudio = useCallback(async () => {
    if (synthRef.current) return;

    const Tone = await import("tone");
    await Tone.start();

    // Create ambient pad
    const reverb = new Tone.Reverb({ decay: 8, wet: 0.85 }).toDestination();
    const filter = new Tone.Filter(800, "lowpass").connect(reverb);
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: {
        attack: 2,
        decay: 3,
        sustain: 0.4,
        release: 4,
      },
      volume: -28,
    }).connect(filter);

    synthRef.current = synth;

    // Ambient chord progression
    const chords = [
      ["C3", "E3", "G3", "B3"],
      ["A2", "C3", "E3", "G3"],
      ["F2", "A2", "C3", "E3"],
      ["G2", "B2", "D3", "F3"],
    ];

    let chordIndex = 0;
    const loop = new Tone.Loop((time: number) => {
      synth.triggerAttackRelease(chords[chordIndex], "4n", time);
      chordIndex = (chordIndex + 1) % chords.length;
    }, "2m");

    loopRef.current = loop;
    setIsLoaded(true);
  }, []);

  const toggle = useCallback(async () => {
    const Tone = await import("tone");

    if (!isLoaded) {
      await initAudio();
    }

    if (isPlaying) {
      Tone.getTransport().stop();
      loopRef.current?.stop();
      setIsPlaying(false);
    } else {
      await Tone.start();
      loopRef.current?.start(0);
      Tone.getTransport().start();
      setIsPlaying(true);
    }
  }, [isPlaying, isLoaded, initAudio]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
      }
    };
  }, []);

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-[1001] w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center backdrop-blur-xl"
      style={{
        background: "rgba(10, 10, 15, 0.7)",
      }}
      onClick={toggle}
      whileHover={{ scale: 1.1, borderColor: "var(--accent)" }}
      whileTap={{ scale: 0.9 }}
      title={isPlaying ? "Mute ambient sound" : "Play ambient sound"}
      data-magnetic
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.6 }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            className="flex items-center gap-[2px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full"
                style={{ background: "var(--accent)" }}
                animate={{
                  height: ["4px", "14px", "6px", "10px", "4px"],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="muted"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
