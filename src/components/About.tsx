"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/lib/data";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const words = personalInfo.bio.split(" ");

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative overflow-hidden"
    >
      {/* Parallax decorative element */}
      <motion.div
        className="absolute right-0 top-1/4 w-64 h-64 rounded-full"
        style={{
          y: y1,
          background:
            "radial-gradient(circle, rgba(196,163,90,0.05) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div style={{ opacity }}>
          {/* Section label */}
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            About Me
          </motion.div>

          {/* Large text with word-by-word reveal */}
          <div className="max-w-4xl">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] tracking-tight">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0.15 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    delay: i * 0.03,
                    duration: 0.5,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Info grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24"
            style={{ y: y2 }}
          >
            {[
              {
                label: "Location",
                value: personalInfo.location,
              },
              {
                label: "Experience",
                value: `${personalInfo.experience} Years`,
              },
              {
                label: "Focus",
                value: "Fullstack & AI",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-card p-6 md:p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{ color: "var(--accent)" }}
                >
                  {item.label}
                </div>
                <div className="text-lg font-light">{item.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
