import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SectionIndicator() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section occupies screen center
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40 hidden md:flex">
      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => handleDotClick(e, section.id)}
            className="group relative flex items-center justify-center w-6 h-6 hover-target"
            aria-label={`Scroll to ${section.label}`}
          >
            {/* Tooltip label */}
            <span className="absolute right-8 px-2.5 py-1 rounded-md bg-zinc-900/90 dark:bg-zinc-100/90 text-white dark:text-zinc-950 text-xs font-semibold tracking-wide shadow-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap">
              {section.label}
            </span>
            
            {/* Inner dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.4 : 1,
                backgroundColor: isActive ? "#4f46e5" : "rgba(156, 163, 175, 0.4)",
              }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
              className={`w-2.5 h-2.5 rounded-full ${
                isActive ? "shadow-lg shadow-indigo-500/50" : ""
              } group-hover:bg-indigo-500 transition-colors duration-200`}
            />

            {/* Pulsing ring for active dot */}
            {isActive && (
              <span className="absolute w-5 h-5 rounded-full border border-indigo-500/50 animate-ping opacity-60 pointer-events-none" />
            )}
          </a>
        );
      })}
    </div>
  );
}
