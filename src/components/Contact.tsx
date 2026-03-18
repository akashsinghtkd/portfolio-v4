"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data";

function FloatingInput({
  label,
  name,
  type = "text",
  textarea = false,
  value,
  onChange,
  delay,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  delay: number;
}) {
  const Tag = textarea ? "textarea" : "input";

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={`floating-input ${textarea ? "min-h-[140px] resize-none pt-6" : ""}`}
        rows={textarea ? 5 : undefined}
      />
      <label className={`floating-label ${textarea ? "top-6 -translate-y-0" : ""}`}>
        {label}
      </label>
    </motion.div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Build mailto link
      const subject = encodeURIComponent(
        `Project Inquiry: ${formData.project || "New Project"}`
      );
      const body = encodeURIComponent(
        `Hi Akash,\n\nI'm ${formData.name}.\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`
      );
      window.open(
        `mailto:${personalInfo.email}?subject=${subject}&body=${body}`,
        "_blank"
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
    [formData]
  );

  return (
    <section id="contact" className="section-padding relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 80%, rgba(196,163,90,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Info */}
          <div>
            <motion.div
              className="section-label"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get In Touch
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Let&apos;s Build{" "}
              <span className="text-gradient-gold">Together</span>
            </motion.h2>

            <motion.p
              className="text-base leading-relaxed mb-12"
              style={{ color: "var(--muted)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Have a project in mind? Looking for a developer who can handle
              everything from frontend to AI? Let&apos;s talk.
            </motion.p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { label: "Phone", value: personalInfo.phone[0], href: `tel:${personalInfo.phone[0].replace(/\s/g, "")}` },
                { label: "Location", value: personalInfo.location },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <div
                    className="text-xs tracking-[0.2em] uppercase mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base hover:text-[var(--accent)] transition-colors"
                      data-cursor-expand
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-base">{item.value}</span>
                  )}
                </motion.div>
              ))}

              {/* Social links */}
              <motion.div
                className="flex gap-4 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  data-magnetic
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                  data-magnetic
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FloatingInput
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                delay={0.2}
              />
              <FloatingInput
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                delay={0.3}
              />
              <FloatingInput
                label="Project Type"
                name="project"
                value={formData.project}
                onChange={handleChange}
                delay={0.4}
              />
              <FloatingInput
                label="Your Message"
                name="message"
                textarea
                value={formData.message}
                onChange={handleChange}
                delay={0.5}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <button
                  type="submit"
                  className="magnetic-btn w-full rounded-sm"
                  data-magnetic
                >
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Opening Mail Client...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="send"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
