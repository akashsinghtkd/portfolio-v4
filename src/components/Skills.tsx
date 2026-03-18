"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/lib/data";

function RadialProgress({
  value,
  label,
  delay,
  inView,
}: {
  value: number;
  label: string;
  delay: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (inView ? value / 100 : 0) * circumference;

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const startTime = performance.now() + delay * 1000;

    const animate = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [inView, value, delay]);

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-20 h-20">
        <svg width="80" height="80" viewBox="0 0 80 80" className="skill-ring">
          <circle cx="40" cy="40" r={radius} className="skill-ring-bg" strokeWidth="2" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="skill-ring-progress"
            strokeWidth="2.5"
            stroke="var(--accent)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: `stroke-dashoffset ${1.5 + delay * 0.3}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center rotate-90">
          <span className="text-sm font-mono font-bold">{count}</span>
        </div>
      </div>
      <span
        className="text-[10px] tracking-[0.1em] text-center leading-tight max-w-[80px]"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & Expertise
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Tools I{" "}
          <span className="text-gradient-gold">Master</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.category}
              className="glass-card p-6 md:p-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: catIndex * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{cat.icon}</span>
                <h3
                  className="text-sm tracking-[0.15em] uppercase font-medium"
                  style={{ color: "var(--accent)" }}
                >
                  {cat.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {cat.skills.map((skill, skillIndex) => (
                  <RadialProgress
                    key={skill.name}
                    value={skill.level}
                    label={skill.name}
                    delay={catIndex * 0.15 + skillIndex * 0.1}
                    inView={inView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
