"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { services } from "@/lib/data";

export default function HorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        {/* Section header */}
        <div className="px-6 md:px-12 mb-8">
          <motion.div
            className="section-label"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            What I Do
          </motion.div>
          <div className="flex items-end justify-between">
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Services I{" "}
              <span className="text-gradient-gold">Offer</span>
            </motion.h2>

            {/* Scroll progress indicator */}
            <div className="hidden md:flex items-center gap-4">
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--muted)" }}
              >
                Scroll to explore
              </span>
              <div className="w-24 h-px bg-[var(--border-subtle)] relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--accent)]"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <motion.div className="flex gap-6 px-6 md:px-12" style={{ x }}>
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[33vw] relative overflow-hidden group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="p-8 md:p-10 flex flex-col h-full min-h-[320px]">
                {/* Big number */}
                <span
                  className="text-7xl md:text-8xl font-bold opacity-[0.06] font-mono absolute top-6 right-8"
                >
                  {service.icon}
                </span>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Category tag */}
                  <span
                    className="text-xs tracking-[0.25em] uppercase font-mono mb-auto"
                    style={{ color: "var(--accent)" }}
                  >
                    {service.icon}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 mt-8">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed max-w-sm"
                    style={{ color: "var(--muted)" }}
                  >
                    {service.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-8 flex items-center gap-3 group-hover:gap-5 transition-all">
                    <span
                      className="text-xs tracking-[0.15em] uppercase"
                      style={{ color: "var(--accent)" }}
                    >
                      Learn More
                    </span>
                    <motion.span
                      style={{ color: "var(--accent)" }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="h-px w-full bg-[var(--border-subtle)]">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
