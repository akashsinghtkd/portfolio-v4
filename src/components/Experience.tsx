"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={sectionRef} id="experience" className="section-padding relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-24 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          The{" "}
          <span className="text-gradient-gold">Journey</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Animated line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-[var(--border-subtle)]">
            <motion.div
              className="w-full bg-[var(--accent)]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16 md:space-y-20">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                className="relative pl-8 md:pl-20"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  delay: 0.1,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-8 -translate-x-1/2 top-2">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2"
                    style={{
                      borderColor: exp.current ? "var(--accent)" : "var(--muted)",
                      background: exp.current ? "var(--accent)" : "transparent",
                    }}
                    whileInView={{
                      scale: [0, 1.3, 1],
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  />
                  {exp.current && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid var(--accent)" }}
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Period */}
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-2 font-mono"
                  style={{ color: exp.current ? "var(--accent)" : "var(--muted)" }}
                >
                  {exp.period}
                  {exp.current && (
                    <span className="ml-3 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold mb-1">
                  {exp.title}
                </h3>

                {/* Company */}
                <div
                  className="text-sm mb-4"
                  style={{ color: "var(--muted)" }}
                >
                  {exp.company} · {exp.location}
                </div>

                {/* Description */}
                <ul className="space-y-2">
                  {exp.description.map((item, j) => (
                    <motion.li
                      key={j}
                      className="text-sm leading-relaxed flex items-start gap-3"
                      style={{ color: "var(--muted)" }}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + j * 0.08, duration: 0.5 }}
                    >
                      <span
                        className="mt-2 w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: "var(--accent)" }}
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
