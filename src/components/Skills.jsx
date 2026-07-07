import React, { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Code, Layers, Brain, BarChart, Settings } from "lucide-react";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

// Typewriter tag component
function TypewriterTag({ text, delayIndex = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const shouldReduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText(text);
      return;
    }
    if (!isInView) return;

    let isCancelled = false;
    let currentText = "";
    let i = 0;

    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (isCancelled) return;
        if (i < text.length) {
          currentText += text[i];
          setDisplayText(currentText);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    }, delayIndex * 120);

    return () => {
      isCancelled = true;
      clearTimeout(startDelay);
    };
  }, [isInView, text, delayIndex, shouldReduceMotion]);

  return (
    <span
      ref={ref}
      className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-colors duration-200 inline-block min-h-[32px] align-middle hover-target"
    >
      {displayText || "\u00A0"}
    </span>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !sectionRef.current) return;

    // Section entrance reveal (clip-path blind reveal)
    gsap.fromTo(
      sectionRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        }
      }
    );
  }, { scope: sectionRef, dependencies: [shouldReduceMotion] });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: SPRING_TRANSITION,
    },
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/20"
      style={shouldReduceMotion ? {} : { clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Title */}
        <div className="flex flex-col mb-16 items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2"
          >
            Capabilities
          </motion.p>
          <CinematicHeading text="Technical Skillset" className="text-3xl md:text-4xl" />
        </div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SKILL_CATEGORIES.map((cat, idx) => {
            const CatIcon = cat.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.1)" }}
                transition={SPRING_TRANSITION}
                className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover-target"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2.5 rounded-xl ${cat.color} border border-transparent`}>
                    <CatIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {cat.title}
                  </h3>
                </div>

                {/* Tags List */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <TypewriterTag
                      key={sIdx}
                      text={skill}
                      delayIndex={sIdx + idx * 2}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: Code,
    color: "text-blue-500 bg-blue-500/10",
    skills: ["C", "C++", "Python", "Java", "HTML", "CSS"],
  },
  {
    title: "Frameworks & Tech",
    icon: Layers,
    color: "text-indigo-500 bg-indigo-500/10",
    skills: ["Streamlit", "Flask", "Django", "Flutter", "React (Basics)", "MERN Stack (Basics)"],
  },
  {
    title: "Machine Learning & DS",
    icon: Brain,
    color: "text-purple-500 bg-purple-500/10",
    skills: ["AI Fundamentals", "Data Preprocessing", "Basic ML Models", "Data Analytics", "Trend Analysis"],
  },
  {
    title: "Analytics & Visualization",
    icon: BarChart,
    color: "text-emerald-500 bg-emerald-500/10",
    skills: ["Google Analytics", "Power BI", "Excel"],
  },
  {
    title: "Tools & Platforms",
    icon: Settings,
    color: "text-amber-500 bg-amber-500/10",
    skills: ["VS Code", "GitHub", "Figma"],
  },
];
