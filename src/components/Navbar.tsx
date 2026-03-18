"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    setHidden(direction === "down" && latest > 200);
    setHasScrolled(latest > 50);
    lastScrollY.current = latest;
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[1000] px-6 md:px-10 py-5"
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="mx-auto max-w-7xl flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500"
          style={{
            background: hasScrolled ? "rgba(10, 10, 15, 0.8)" : "transparent",
            backdropFilter: hasScrolled ? "blur(20px)" : "none",
            border: hasScrolled
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
          }}
        >
          {/* Logo */}
          <a href="#" className="relative z-10" data-magnetic>
            <motion.span
              className="text-lg font-bold tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
              whileHover={{ scale: 1.05 }}
            >
              AS.
            </motion.span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--muted)" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                whileHover={{ y: -2 }}
                data-cursor-expand
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.a
              href="#contact"
              className="magnetic-btn text-xs !py-2.5 !px-5 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-magnetic
            >
              Let&apos;s Talk
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-px bg-current"
              style={{ color: "var(--foreground)" }}
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 4 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-px bg-current"
              style={{ color: "var(--foreground)" }}
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-px bg-current"
              style={{ color: "var(--foreground)" }}
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center"
            style={{ background: "var(--background)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="text-3xl font-light tracking-[0.1em]"
                  style={{ color: "var(--foreground)" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                className="magnetic-btn mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Talk
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
