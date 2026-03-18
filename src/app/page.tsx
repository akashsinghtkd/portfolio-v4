"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import AmbientTheme from "@/components/AmbientTheme";
import AudioToggle from "@/components/AudioToggle";
import ScrollSvgPath from "@/components/ScrollSvgPath";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import HorizontalScroll from "@/components/HorizontalScroll";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import WhyWorkWithMe from "@/components/WhyWorkWithMe";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load heavy 3D component
const ParticleCanvas = lazy(() => import("@/components/ParticleCanvas"));

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Ambient Time-of-Day Theming */}
      <AmbientTheme />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Preloader */}
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Scroll Progress Bar */}
      {loaded && <ScrollProgress />}

      {/* Film Grain Overlay */}
      <FilmGrain />

      {/* Audio Toggle */}
      {loaded && <AudioToggle />}

      {/* 3D Particle Background */}
      {loaded && (
        <Suspense fallback={null}>
          <ParticleCanvas />
        </Suspense>
      )}

      {/* Navigation */}
      {loaded && <Navbar />}

      {/* Main Content */}
      {loaded && (
        <SmoothScroll>
          <main className="relative z-10">
            {/* SVG Path Drawing on Scroll */}
            <ScrollSvgPath />

            <Hero />

            {/* Divider */}
            <div className="max-w-6xl mx-auto px-6">
              <div className="h-px w-full bg-[var(--border-subtle)]" />
            </div>

            <About />

            <div className="max-w-6xl mx-auto px-6">
              <div className="h-px w-full bg-[var(--border-subtle)]" />
            </div>

            <Skills />

            <div className="max-w-6xl mx-auto px-6">
              <div className="h-px w-full bg-[var(--border-subtle)]" />
            </div>

            <Experience />

            {/* Horizontal Scroll Services Section */}
            <HorizontalScroll />

            <Projects />

            <Testimonials />

            <div className="max-w-6xl mx-auto px-6">
              <div className="h-px w-full bg-[var(--border-subtle)]" />
            </div>

            <WhyWorkWithMe />

            <div className="max-w-6xl mx-auto px-6">
              <div className="h-px w-full bg-[var(--border-subtle)]" />
            </div>

            <Contact />

            <Footer />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
