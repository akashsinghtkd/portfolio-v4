"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const ctx = gsap.context(() => {
      // Split heading text into characters for reveal
      const heading = headingRef.current!;
      const text = heading.textContent || "";
      heading.innerHTML = "";

      const chars: HTMLSpanElement[] = [];
      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(100px) rotateX(-90deg)";
        span.style.filter = "blur(10px)";
        heading.appendChild(span);
        chars.push(span);
      });

      // Staggered character reveal
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
        delay: 0.3,
      });

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            delay: 1.2,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(196,163,90,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Top label */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-3 text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            <span className="w-8 h-px bg-[var(--accent)]" />
            {personalInfo.title}
            <span className="w-8 h-px bg-[var(--accent)]" />
          </span>
        </motion.div>

        {/* Main heading — GSAP animated */}
        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.95] tracking-tight mb-8"
          style={{
            perspective: "1000px",
            fontFamily: "var(--font-geist-sans)",
          }}
        >
          {personalInfo.firstName}
          {" "}
          {personalInfo.lastName}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed opacity-0"
          style={{ color: "var(--muted)" }}
        >
          {personalInfo.tagline}
          <br />
          <span className="text-gradient-gold">
            {personalInfo.subtitle}
          </span>
        </p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <MagneticButton href="#projects" as="a" className="rounded-full">
            View My Work
          </MagneticButton>
          <a
            href="#contact"
            className="text-sm tracking-[0.15em] uppercase transition-colors hover:text-[var(--accent)]"
            style={{ color: "var(--muted)" }}
            data-cursor-expand
          >
            Get In Touch →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {personalInfo.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold mb-1 text-gradient-gold"
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-[0.15em] uppercase"
                style={{ color: "var(--muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: "var(--muted)" }}
          >
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--accent)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
