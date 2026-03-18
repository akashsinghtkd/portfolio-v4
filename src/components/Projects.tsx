"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "@/lib/data";
import ColorCycleTag from "@/components/ColorCycleTag";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0) rotateY(0)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlarePos({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)");
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="tilt-card group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor-expand
    >
      <div
        className="tilt-card-inner glass-card overflow-hidden"
        style={{
          transform,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* Glare effect */}
        <div
          className="tilt-card-shine"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(196,163,90,0.1) 0%, transparent 60%)`,
            opacity: transform.includes("scale3d(1.02") ? 1 : 0,
          }}
        />

        {/* Color accent bar */}
        <div
          className="h-1 w-full"
          style={{ background: project.color }}
        />

        <div className="p-6 md:p-8 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              {project.featured && (
                <span
                  className="text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-full mb-3 inline-block"
                  style={{
                    background: "rgba(196,163,90,0.1)",
                    color: "var(--accent)",
                    border: "1px solid rgba(196,163,90,0.2)",
                  }}
                >
                  Featured
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--accent)" }}
              >
                {project.subtitle}
              </p>
            </div>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors flex-shrink-0"
                data-magnetic
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:text-[var(--accent)] transition-colors"
                >
                  <path d="M1 13L13 1M13 1H5M13 1v8" />
                </svg>
              </a>
            )}
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>

          {/* Tech tags with color cycling */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, techIndex) => (
              <ColorCycleTag
                key={tech}
                text={tech}
                index={index * 4 + techIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={sectionRef} id="projects" className="section-padding relative">
      {/* Parallax background decoration */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          y: bgY,
          background:
            "radial-gradient(circle, rgba(196,163,90,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
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
          Selected Work
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Projects That{" "}
            <span className="text-gradient-gold">Deliver</span>
          </motion.h2>

          <motion.p
            className="text-sm max-w-sm"
            style={{ color: "var(--muted)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            A curated selection of work across industries — from luxury e-commerce to AI automation systems.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
