import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CurtainLoader from "./components/CurtainLoader";
import SectionIndicator from "./components/SectionIndicator";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Initial theme check
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme === "dark";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  const [startScramble, setStartScramble] = useState(false);
  const [radialTransition, setRadialTransition] = useState(null);

  useEffect(() => {
    // Synchronize body classes with theme state
    const root = document.documentElement;
    const body = document.body;
    if (isDark) {
      body.classList.add("dark");
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleThemeToggle = (e) => {
    if (e && e.clientX !== undefined && e.clientY !== undefined) {
      const x = e.clientX;
      const y = e.clientY;
      setRadialTransition({ x, y, toDark: !isDark });
    } else {
      setIsDark((prev) => !prev);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 relative">
      {/* Subtle tactile grain overlay */}
      <div className="grain-overlay fixed inset-0 z-[9998] pointer-events-none" />

      {/* Cinematic page load curtain */}
      <CurtainLoader onStartScramble={() => setStartScramble(true)} />

      {/* Custom Mouse Cursor for Desktop */}
      <CustomCursor />

      {/* Right side section pagination indicators */}
      <SectionIndicator />

      {/* Navigation Header */}
      <Navbar isDark={isDark} toggleTheme={handleThemeToggle} />

      {/* Radial wipe theme transition overlay */}
      <AnimatePresence>
        {radialTransition && (
          <motion.div
            initial={{ clipPath: `circle(0px at ${radialTransition.x}px ${radialTransition.y}px)` }}
            animate={{ clipPath: `circle(150% at ${radialTransition.x}px ${radialTransition.y}px)` }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={() => {
              setIsDark(radialTransition.toDark);
              setRadialTransition(null);
            }}
            className="fixed inset-0 z-[45] pointer-events-none bg-zinc-950 dark:bg-zinc-50"
          />
        )}
      </AnimatePresence>

      {/* Main Single Page Sections */}
      <main>
        <Hero startScramble={startScramble} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
