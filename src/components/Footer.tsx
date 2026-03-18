"use client";

import { motion } from "framer-motion";
import { personalInfo, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <motion.span
              className="text-2xl font-bold tracking-[0.15em] mb-4 block"
              style={{ color: "var(--accent)" }}
              whileHover={{ scale: 1.02 }}
            >
              AS.
            </motion.span>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--muted)" }}
            >
              {personalInfo.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: "var(--muted)" }}
                    data-cursor-expand
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              Connect
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                  data-cursor-expand
                >
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                  data-cursor-expand
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                  data-cursor-expand
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p
            className="text-xs tracking-[0.1em]"
            style={{ color: "var(--muted)" }}
          >
            &copy; {year} Akash Singh. Engineered with precision.
          </p>
          <p
            className="text-xs tracking-[0.1em]"
            style={{ color: "var(--muted)" }}
          >
            Built with Next.js, Three.js & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
