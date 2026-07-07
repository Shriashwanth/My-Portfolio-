import React, { useRef, useEffect, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Award, GraduationCap, Code2, ClipboardCheck } from "lucide-react";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

// CountUpTo helper component
function CountUpTo({ value, suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        setDisplayValue(obj.val.toFixed(decimals));
      }
    });

    return () => tween.kill();
  }, [isInView, value, decimals]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const photoContainerRef = useRef(null);
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

    if (photoContainerRef.current) {
      // Pin the photo container while text scrolls alongside it
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 12%",
        end: "bottom 75%",
        pin: photoContainerRef.current,
        pinSpacing: false,
      });

      // Zoom the image subtly during scroll pinning
      gsap.fromTo(
        photoContainerRef.current.querySelector(".about-img"),
        { scale: 1 },
        {
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 12%",
            end: "bottom 75%",
            scrub: true,
          }
        }
      );
    }
  }, { scope: containerRef, dependencies: [shouldReduceMotion] });

  const stats = [
    { icon: GraduationCap, label: "CGPA (Ongoing)", value: 7.7, suffix: " / 10", decimals: 1 },
    { icon: ClipboardCheck, label: "Certifications", value: 6, suffix: " Total", decimals: 0 },
    { icon: Code2, label: "Completed Projects", value: 4, suffix: " ML/IoT", decimals: 0 },
    { icon: Award, label: "Hackathon Honors", value: 5, suffix: " Awards", decimals: 0 },
  ];

  // Sentence-by-sentence animation variants for paragraph reveals
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const sentenceVariants = {
    hidden: { y: 12, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: SPRING_TRANSITION
    }
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 bg-zinc-100/50 dark:bg-zinc-900/30 overflow-hidden relative"
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
            About Me
          </motion.p>
          <CinematicHeading text="Who I Am & What I Do" className="text-3xl md:text-4xl" />
        </div>

        {/* Content Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Biography Text & Stats */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg"
            >
              <motion.span variants={sentenceVariants} className="inline-block">
                I am <span className="font-semibold text-zinc-900 dark:text-white">Shri Ashwanth A</span>, an AI/ML enthusiast and Software Developer studying Computer Science & Engineering (AIML) at Sri Eshwar College of Engineering.
              </motion.span>{" "}
              <motion.span variants={sentenceVariants} className="inline-block">
                I specialize in the intersection of Artificial Intelligence, Embedded IoT Systems, and full-stack software development.
              </motion.span>
            </motion.p>

            <motion.p
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-5%" }}
              className="text-zinc-600 dark:text-zinc-400 leading-relaxed"
            >
              <motion.span variants={sentenceVariants} className="inline-block">
                My hands-on experience includes developing an ML-assisted fetal monitor for twins, building AI-driven surveillance camera networks, and engineering computer-vision systems for assistive wheelchairs.
              </motion.span>{" "}
              <motion.span variants={sentenceVariants} className="inline-block">
                Through my work as an AI/ML intern at NITK, I have demonstrated a strong ability to build performance-optimized, data-driven web dashboards.
              </motion.span>{" "}
              <motion.span variants={sentenceVariants} className="inline-block">
                I thrive on bringing complex hardware-software integrations to life.
              </motion.span>
            </motion.p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.1)" }}
                    transition={SPRING_TRANSITION}
                    className="p-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-2 hover-target"
                  >
                    <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                      <CountUpTo value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sticky Parallax Photo Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-8 w-full">
            <div
              ref={photoContainerRef}
              className="relative w-full max-w-[280px] md:max-w-[340px] flex flex-col items-center justify-center gap-8"
            >
              {/* Photo Frame Container */}
              <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-3xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-200 dark:bg-zinc-900">
                <img
                  src="/assets/profile.jpg"
                  alt="Shri Ashwanth A — about section photo"
                  className="about-img w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 ease-in-out profile-photo"
                  loading="lazy"
                  style={{ willChange: "transform" }}
                />
              </div>

              {/* Highlights Block */}
              <div className="w-full flex flex-col gap-4 text-center lg:text-left px-4">
                <div className="border-l-4 border-indigo-500 pl-4 py-1 text-left">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    College
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Sri Eshwar College of Engineering (AIML)
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4 py-1 text-left">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    Location
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Tamil Nadu, India
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4 py-1 text-left">
                  <h4 className="font-semibold text-zinc-900 dark:text-white">
                    Email
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    shriashwanth.a2024aiml@sece.ac.in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
