import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase } from "lucide-react";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "AI/ML & Software Development Intern",
    company: "National Institute of Technology Karnataka (NITK)",
    location: "Karnataka, India",
    date: "2025",
    description: [
      "Designed and developed a live solar monitoring dashboard, integrating machine learning and scalable software development to process real-time data.",
      "Delivered real-time performance analytics and enabled data-driven insights for NITK infrastructure.",
      "Utilized Python, Machine Learning models, Streamlit, Flask, HTML/CSS, JavaScript, Power BI, and Git."
    ],
    tags: ["Python", "Machine Learning", "Streamlit", "Flask", "JavaScript", "Power BI", "Git"]
  },
  {
    role: "Industry Intern",
    company: "Corizo (Professional Training Program with Wipro)",
    location: "Online",
    date: "2025",
    description: [
      "Gained hands-on experience in industry-oriented analytics and project execution through a practical internship.",
      "Worked on real-time case studies to enhance analytical thinking and professional communication.",
      "Conducted extensive data modeling, trend analyses, and visualization reports."
    ],
    tags: ["Excel", "Google Analytics", "Power BI", "Python"]
  }
];

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

export default function Experience() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !containerRef.current) return;

    // Section entrance reveal (clip-path blind reveal)
    gsap.fromTo(
      containerRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          once: true,
        }
      }
    );

    if (lineRef.current) {
      const lineEl = lineRef.current;
      
      // Set initial dash properties dynamically
      const height = containerRef.current.offsetHeight || 1500;
      gsap.set(lineEl, { strokeDasharray: height, strokeDashoffset: height });

      // Timeline draw-in line on scroll
      gsap.to(lineEl, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 30%",
          end: "bottom 70%",
          scrub: true,
        },
      });
    }
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 relative overflow-hidden"
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
            Journey
          </motion.p>
          <CinematicHeading text="Work Experience" className="text-3xl md:text-4xl" />
        </div>

        {/* Timeline wrapper */}
        <div className="relative mt-12 max-w-4xl mx-auto">
          {/* Background vertical track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-200 dark:bg-zinc-800 transform md:-translate-x-1/2 z-0" />
          
          {/* Animated active vertical line */}
          {!shouldReduceMotion ? (
            <svg className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] transform md:-translate-x-1/2 z-10 h-full overflow-visible pointer-events-none">
              <line
                ref={lineRef}
                x1="2"
                y1="0"
                x2="2"
                y2="100%"
                stroke="url(#timeline-grad)"
                strokeWidth="4"
                style={{ vectorEffect: "non-scaling-stroke" }}
              />
              <defs>
                <linearGradient id="timeline-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a5b4fc" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-indigo-500 dark:bg-indigo-400 transform md:-translate-x-1/2 z-10" />
          )}

          {/* Experience Cards */}
          <div className="space-y-12">
            {EXPERIENCES.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row relative z-20 ${
                    isEven ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline node marker */}
                  <div className="absolute left-6 md:left-1/2 w-8 h-8 rounded-full border-4 border-zinc-50 dark:border-zinc-950 bg-indigo-500 dark:bg-indigo-400 transform -translate-x-1/2 flex items-center justify-center z-30 shadow-md">
                    <Briefcase className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Card Container */}
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: isEven ? -50 : 50,
                      y: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={shouldReduceMotion ? { duration: 0.25 } : SPRING_TRANSITION}
                    className={`w-full md:w-[45%] pl-12 md:pl-0 ${
                      isEven ? "md:pr-8 text-left" : "md:pl-8 text-left"
                    }`}
                  >
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.1)" }}
                      transition={SPRING_TRANSITION}
                      className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover-target"
                    >
                      {/* Dates */}
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 mb-4">
                        {exp.date}
                      </span>

                      {/* Role & Company */}
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-4">
                        {exp.company}
                      </h4>

                      {/* Bullet list */}
                      <ul className="space-y-3 pl-4 list-disc text-zinc-600 dark:text-zinc-400 text-sm mb-6">
                        {exp.description.map((bullet, bIdx) => (
                          <li key={bIdx} className="leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tech stack tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 text-xs rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
