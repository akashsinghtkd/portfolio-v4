"use client";

import { motion } from "framer-motion";

interface ColorCycleTagProps {
  text: string;
  index: number;
}

export default function ColorCycleTag({ text, index }: ColorCycleTagProps) {
  // Each tag gets a unique hue offset based on its index
  const baseHue = (index * 47) % 360; // Golden angle distribution

  return (
    <motion.span
      className="text-[11px] tracking-[0.05em] px-3 py-1 rounded-full inline-block"
      style={{
        border: "1px solid var(--border-subtle)",
        background: "rgba(255,255,255,0.04)",
      }}
      animate={{
        color: [
          `hsl(${baseHue}, 50%, 65%)`,
          `hsl(${baseHue + 60}, 50%, 65%)`,
          `hsl(${baseHue + 120}, 50%, 65%)`,
          `hsl(${baseHue + 180}, 50%, 65%)`,
          `hsl(${baseHue + 240}, 50%, 65%)`,
          `hsl(${baseHue + 300}, 50%, 65%)`,
          `hsl(${baseHue + 360}, 50%, 65%)`,
        ],
        borderColor: [
          `hsla(${baseHue}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 60}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 120}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 180}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 240}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 300}, 40%, 50%, 0.2)`,
          `hsla(${baseHue + 360}, 40%, 50%, 0.2)`,
        ],
      }}
      transition={{
        duration: 8 + index * 0.5,
        repeat: Infinity,
        ease: "linear",
      }}
      whileHover={{
        scale: 1.1,
        background: "rgba(255,255,255,0.08)",
      }}
    >
      {text}
    </motion.span>
  );
}
