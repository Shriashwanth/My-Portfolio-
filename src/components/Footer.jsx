import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();
  
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Copyright */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center sm:text-left font-medium">
          &copy; {new Date().getFullYear()} Shri Ashwanth A. Crafted with React, Tailwind, & GSAP.
        </p>

        {/* Back to top button */}
        <Magnetic>
          <motion.button
            onClick={handleScrollToTop}
            aria-label="Back to top"
            whileHover={shouldReduceMotion ? {} : { rotate: 360, scale: 1.1 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
            transition={SPRING_TRANSITION}
            className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors hover-target animate-breathing-slow"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </Magnetic>
      </div>
    </footer>
  );
}
