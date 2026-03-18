"use client";

import { motion } from "framer-motion";

const testimonials = [
  "Exceptional developer — delivered beyond expectations",
  "AI integration transformed our platform",
  "Fast, reliable, and truly understands the product",
  "Best investment we made for our e-commerce",
  "Code quality is outstanding",
  "Communication was crystal clear throughout",
  "Turned our complex idea into a working product",
  "A true fullstack partner, not just a coder",
];

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <motion.div
          className="section-label"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What They Say
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Client{" "}
          <span className="text-gradient-gold">Voices</span>
        </motion.h2>
      </div>

      {/* Marquee Row 1 — left to right */}
      <div className="relative py-4 overflow-hidden">
        <div className="marquee-track flex gap-6 whitespace-nowrap">
          {[...testimonials, ...testimonials].map((text, i) => (
            <div
              key={i}
              className="glass-card px-8 py-5 flex-shrink-0 inline-flex items-center"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent)" }}
                />
                <span className="text-sm md:text-base whitespace-nowrap" style={{ color: "var(--muted)" }}>
                  &ldquo;{text}&rdquo;
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Edge fades */}
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
        />
      </div>

      {/* Marquee Row 2 — right to left */}
      <div className="relative py-4 overflow-hidden">
        <div
          className="marquee-track flex gap-6 whitespace-nowrap"
          style={{ animationDirection: "reverse", animationDuration: "40s" }}
        >
          {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map(
            (text, i) => (
              <div
                key={i}
                className="glass-card px-8 py-5 flex-shrink-0 inline-flex items-center"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "var(--accent-dim)" }}
                  />
                  <span className="text-sm md:text-base whitespace-nowrap" style={{ color: "var(--muted)" }}>
                    &ldquo;{text}&rdquo;
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--background), transparent)",
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background), transparent)",
          }}
        />
      </div>
    </section>
  );
}
