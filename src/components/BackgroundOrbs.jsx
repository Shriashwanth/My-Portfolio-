import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function BackgroundOrbs() {
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const orb1 = orb1Ref.current;
    const orb2 = orb2Ref.current;
    if (!orb1 || !orb2) return;

    // Set initial position offsets to prevent jumping
    gsap.set(orb1, { x: 0, y: 0 });
    gsap.set(orb2, { x: 0, y: 0 });

    // Animate orb 1 in horizontal figure-8 path
    const t1 = gsap.timeline({ repeat: -1 });
    t1.to(orb1, {
      duration: 25,
      ease: "none",
      keyframes: [
        { x: 150, y: 80 },
        { x: 300, y: 0 },
        { x: 150, y: -80 },
        { x: 0, y: 0 },
        { x: -150, y: 80 },
        { x: -300, y: 0 },
        { x: -150, y: -80 },
        { x: 0, y: 0 }
      ]
    });

    // Animate orb 2 in inverted figure-8 path
    const t2 = gsap.timeline({ repeat: -1 });
    t2.to(orb2, {
      duration: 30,
      ease: "none",
      keyframes: [
        { x: -150, y: -80 },
        { x: -300, y: 0 },
        { x: -150, y: 80 },
        { x: 0, y: 0 },
        { x: 150, y: -80 },
        { x: 300, y: 0 },
        { x: 150, y: 80 },
        { x: 0, y: 0 }
      ]
    });

    return () => {
      t1.kill();
      t2.kill();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orb 1: Indigo/Blue gradient blob */}
      <div
        ref={orb1Ref}
        className="absolute top-[15%] left-[20%] w-[450px] h-[450px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/20 via-blue-500/20 to-purple-500/10 blur-[100px] md:blur-[130px] mix-blend-multiply dark:mix-blend-screen opacity-70 dark:opacity-40 animate-hue-shift-slow"
      />
      {/* Orb 2: Purple/Pink gradient blob */}
      <div
        ref={orb2Ref}
        className="absolute bottom-[15%] right-[20%] w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-indigo-500/10 blur-[100px] md:blur-[130px] mix-blend-multiply dark:mix-blend-screen opacity-70 dark:opacity-40 animate-hue-shift-slow"
        style={{ animationDelay: "-5s" }}
      />
    </div>
  );
}
