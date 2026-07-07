import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CinematicHeading({ text, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h2 className={`flex flex-wrap gap-x-2 md:gap-x-3 overflow-hidden justify-center items-center font-bold tracking-tight text-zinc-900 dark:text-white ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden relative py-1">
          <motion.span
            initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", y: "100%" }}
            whileInView={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)", y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              type: shouldReduceMotion ? "tween" : "spring",
              stiffness: 120,
              damping: 14,
              mass: 1,
              duration: shouldReduceMotion ? 0.25 : undefined,
              delay: shouldReduceMotion ? 0.05 * i : i * 0.08,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
