import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Activity, Eye, Trash2, ShieldCheck } from "lucide-react";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Twin Pulse AI",
    subtitle: "Fetal Monitor for Twin Babies",
    year: "2025",
    description: "An ML-assisted fetal monitoring system using signal processing and a mobile application to separate and visualize twin heartbeat patterns. Solves the complex medical challenge of overlapping signals in twin pregnancies.",
    tags: ["Python", "MATLAB", "React Native", "Bluetooth", "Figma"],
    github: "https://github.com/Shriashwanth",
    demo: "#",
    icon: Activity,
    color: "from-blue-500/10 to-indigo-500/10 dark:from-blue-950/20 dark:to-indigo-950/20",
    gridSpan: "lg:col-span-2",
  },
  {
    title: "AI Surveillance Camera",
    subtitle: "Smart Detection System",
    year: "2025",
    description: "An end-to-end ML-driven surveillance application for real-time activity detection with backend alert services and cloud integration.",
    tags: ["Python", "OpenCV", "Raspberry Pi", "Firebase", "Twilio", "Camera Module"],
    github: "https://github.com/Shriashwanth",
    demo: "#",
    icon: Eye,
    color: "from-purple-500/10 to-pink-500/10 dark:from-purple-950/20 dark:to-pink-950/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "Smart IoT Dustbin",
    subtitle: "Waste Management System",
    year: "2024",
    description: "A full-stack IoT solution combining sensor data processing, embedded programming, and a mobile interface for smart waste monitoring.",
    tags: ["Arduino", "C/C++", "GSM Module", "Ultrasonic & IR", "Solar Panel", "Mobile App"],
    github: "https://github.com/Shriashwanth",
    demo: "#",
    icon: Trash2,
    color: "from-amber-500/10 to-orange-500/10 dark:from-amber-950/20 dark:to-orange-950/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "Gesture Wheelchair",
    subtitle: "Dynamic Assistive Mobility",
    year: "2025",
    description: "Implemented a computer vision-based ML system to interpret hand gestures and control a wheelchair with integrated health monitoring features for advanced user accessibility.",
    tags: ["Python", "TensorFlow", "MediaPipe", "OpenCV", "ESP32"],
    github: "https://github.com/Shriashwanth",
    demo: "#",
    icon: ShieldCheck,
    color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-950/20 dark:to-teal-950/20",
    gridSpan: "lg:col-span-2",
  },
];

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, boxShadow: "0 20px 45px -15px rgba(0, 0, 0, 0.15)" }}
      transition={SPRING_TRANSITION}
      className="bento-card rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 md:p-8 flex flex-col justify-between hover-target h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const triggerRef = useRef(null);
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    if (shouldReduceMotion || !triggerRef.current) return;

    // Section entrance reveal (clip-path blind reveal)
    gsap.fromTo(
      triggerRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.9,
        ease: "power4.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 92%",
          once: true,
        }
      }
    );

    if (sectionRef.current) {
      const section = sectionRef.current;
      
      // Animate the horizontal translate of the row container
      const scrollWidth = section.scrollWidth;
      const scrollDistance = scrollWidth - window.innerWidth;

      const pin = gsap.to(section, {
        x: -scrollDistance - 120,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${scrollDistance + 250}`,
          invalidateOnRefresh: true,
        }
      });

      // Animate individual card entry scale/opacity tied to container progress
      const cards = gsap.utils.toArray(".project-card-scroll");
      cards.forEach((card) => {
        gsap.fromTo(card,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: pin,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            }
          }
        );
      });

      return () => {
        pin.kill();
      };
    }
  }, { scope: triggerRef, dependencies: [shouldReduceMotion] });

  return (
    <section
      id="projects"
      ref={triggerRef}
      className={`py-24 bg-zinc-100/50 dark:bg-zinc-900/10 ${shouldReduceMotion ? "" : "min-h-screen md:h-screen flex flex-col justify-center overflow-hidden"}`}
      style={shouldReduceMotion ? {} : { clipPath: "inset(0 0 100% 0)" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex-shrink-0">
        {/* Title */}
        <div className="flex flex-col mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2"
          >
            Portfolio
          </motion.p>
          <CinematicHeading text="Featured Projects" className="text-3xl md:text-4xl !justify-start" />
        </div>
      </div>

      {shouldReduceMotion ? (
        // Standard grid layout for users who prefer reduced motion
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
          {PROJECTS.map((project, idx) => {
            const ProjectIcon = project.icon;
            return (
              <div key={idx} className="w-full">
                <TiltCard project={project}>
                  <div style={{ transform: "translateZ(30px)" }}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} border border-zinc-200/50 dark:border-zinc-800/50`}>
                        <ProjectIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                      {project.title}
                    </h3>
                    <h4 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1 mb-4">
                      {project.subtitle}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors hover-target"
                      >
                        Code
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors hover-target"
                      >
                        Demo
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      ) : (
        // Cinematic horizontal scroll panel
        <div className="w-full flex-grow overflow-hidden flex items-center">
          <div ref={sectionRef} className="flex gap-8 px-6 md:px-12 w-max flex-nowrap pb-12">
            {PROJECTS.map((project, idx) => {
              const ProjectIcon = project.icon;
              return (
                <div key={idx} className="project-card-scroll w-[340px] sm:w-[480px] flex-shrink-0 h-[480px]">
                  <TiltCard project={project}>
                    <div style={{ transform: "translateZ(30px)" }}>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 rounded-2xl bg-gradient-to-br ${project.color} border border-zinc-200/50 dark:border-zinc-800/50`}>
                          <ProjectIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
                        {project.title}
                      </h3>
                      <h4 className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1 mb-4">
                        {project.subtitle}
                      </h4>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-auto" style={{ transform: "translateZ(20px)" }}>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/40 dark:border-zinc-800/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors hover-target"
                        >
                          Code
                        </a>
                        <a
                          href={project.demo}
                          className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors hover-target"
                        >
                          Demo
                        </a>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
