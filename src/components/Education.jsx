import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GraduationCap, BookOpen, Award } from "lucide-react";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_DATA = [
  {
    degree: "B.E. Computer Science & Engineering (AIML)",
    institution: "Sri Eshwar College of Engineering",
    date: "2024 - 2028",
    details: "CGPA: 7.7 (3rd Semester)",
    icon: GraduationCap,
    color: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40",
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "SSMLAMHSS",
    date: "2023 - 2024",
    details: "Percentage: 81.83%",
    icon: BookOpen,
    color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
  },
  {
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "SSMLAMHSS",
    date: "2021 - 2022",
    details: "Percentage: 90.2%",
    icon: Award,
    color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
  },
];

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

export default function Education() {
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
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: SPRING_TRANSITION,
    },
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 bg-zinc-100/50 dark:bg-zinc-900/30"
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
            Academic
          </motion.p>
          <CinematicHeading text="Education & Qualifications" className="text-3xl md:text-4xl" />
        </div>

        {/* Education List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-3xl mx-auto flex flex-col gap-6"
        >
          {EDUCATION_DATA.map((edu, idx) => {
            const EduIcon = edu.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.1)" }}
                transition={SPRING_TRANSITION}
                className="p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col sm:flex-row items-start gap-5 hover-target hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon wrapper */}
                <div className={`p-4 rounded-2xl ${edu.color} border border-transparent self-start`}>
                  <EduIcon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 mb-2">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight">
                      {edu.degree}
                    </h3>
                    <span className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      {edu.date}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
                    {edu.institution}
                  </h4>
                  <div className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800">
                    {edu.details}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
