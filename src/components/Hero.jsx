import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Magnetic from "./Magnetic";
import BackgroundOrbs from "./BackgroundOrbs";
import ScrambleText from "./ScrambleText";

gsap.registerPlugin(ScrollTrigger);

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

export default function Hero({ startScramble }) {
  const heroRef = useRef(null);
  const bgOrbsRef = useRef(null);
  const photoRef = useRef(null);
  const textRef = useRef(null);
  const displacementMapRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Noise displacement map shimmer effect (every 8 seconds)
  useEffect(() => {
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      const map = displacementMapRef.current;
      if (!map) return;

      gsap.timeline()
        .to(map, { attr: { scale: 18 }, duration: 0.15, ease: "power2.out" })
        .to(map, { attr: { scale: 0 }, duration: 0.25, ease: "power2.inOut" });
    }, 8000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Scroll Trigger Parallax
  useGSAP(() => {
    if (shouldReduceMotion || !heroRef.current) return;

    // 0.2x Parallax on background orbs
    gsap.to(bgOrbsRef.current, {
      y: 120,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 0.6x Parallax on profile photo container
    gsap.to(photoRef.current, {
      y: 180,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 0.1x Parallax offset on text to anchor it
    gsap.to(textRef.current, {
      y: 40,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: heroRef, dependencies: [shouldReduceMotion] });

  const handleScrollTo = (e, id) => {
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
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* SVG Shimmer displacement map definition */}
      {!shouldReduceMotion && (
        <svg className="hidden">
          <defs>
            <filter id="noise-shimmer">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              <feDisplacementMap
                ref={displacementMapRef}
                in="SourceGraphic"
                in2="noise"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Background Animated Gradient Blobs (0.2x speed) */}
      <div ref={bgOrbsRef} className="hero-bg-orbs absolute inset-0 pointer-events-none z-0">
        <BackgroundOrbs />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Photo Container (0.6x speed) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div ref={photoRef} className="relative group hero-profile-photo">
            {/* Rotating gradient ring */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-rotate-slow opacity-90 blur-[2px] group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Inner background masking to give a clear ring */}
            <div className="relative w-[240px] h-[240px] md:w-[400px] md:h-[400px] rounded-full p-[4px] bg-zinc-50 dark:bg-zinc-950">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src="/assets/profile.jpg"
                  alt="Shri Ashwanth A — portfolio photo"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110 profile-photo"
                  style={{ willChange: "transform" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text Content (1.0x speed) */}
        <div
          ref={textRef}
          className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Availability Badge */}
          <div className="hero-text-item inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Available for Internships & Projects
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-text-item text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-4"
            style={shouldReduceMotion ? {} : { filter: "url(#noise-shimmer)" }}
          >
            <ScrambleText text="Shri Ashwanth A" startTrigger={startScramble} />
          </h1>

          {/* Subtitle / Role */}
          <h2 className="hero-text-item text-xl sm:text-2xl md:text-3xl font-medium text-indigo-600 dark:text-indigo-400 mb-6">
            AI/ML & Software Developer
          </h2>

          {/* Tagline */}
          <p className="hero-text-item text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
            Passionate B.E. CSE (Artificial Intelligence & Machine Learning) student engineering intelligent ML models, full-stack IoT systems, and high-performance applications with elegant, custom designs.
          </p>

          {/* CTAs */}
          <div className="hero-ctas-container flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                transition={SPRING_TRANSITION}
                href="#projects"
                onClick={(e) => handleScrollTo(e, "projects")}
                className="px-8 py-4 rounded-full font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/10 hover-target duration-300 inline-block"
              >
                View Work
              </motion.a>
            </Magnetic>

            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                transition={SPRING_TRANSITION}
                href="#contact"
                onClick={(e) => handleScrollTo(e, "contact")}
                className="px-8 py-4 rounded-full font-medium border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors hover-target duration-300 inline-block"
              >
                Contact Me
              </motion.a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
