"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { whyReasons } from "@/lib/data";

function ReasonCard({
  reason,
  index,
}: {
  reason: (typeof whyReasons)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="glass-card p-6 md:p-8 relative overflow-hidden group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor-expand
    >
      {/* Background number */}
      <span
        className="absolute top-4 right-6 text-6xl md:text-7xl font-bold opacity-[0.04] font-mono select-none"
      >
        {reason.number}
      </span>

      <div className="relative z-10">
        {/* Number label */}
        <div
          className="text-xs tracking-[0.3em] font-mono mb-4"
          style={{ color: "var(--accent)" }}
        >
          {reason.number}
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-3">
          {reason.title}
        </h3>

        <p
          className="text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {reason.description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border-subtle)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} id="why" className="section-padding relative">
      {/* Parallax glow */}
      <motion.div
        className="absolute right-0 top-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          y: parallaxY,
          background:
            "radial-gradient(circle, rgba(196,163,90,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Me
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Why Work With{" "}
          <span className="text-gradient-gold">Akash</span>?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyReasons.map((reason, i) => (
            <ReasonCard key={reason.number} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
