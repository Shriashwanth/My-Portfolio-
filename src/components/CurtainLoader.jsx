import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function CurtainLoader({ onStartScramble }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if session storage has loaded
    const hasLoaded = sessionStorage.getItem("portfolio-loaded");
    if (hasLoaded) {
      setIsVisible(false);
      if (onStartScramble) onStartScramble();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      if (onStartScramble) onStartScramble();
      return;
    }

    // Set initial styles for animating elements to prevent flash of content
    gsap.set(".curtain-left", { xPercent: 0 });
    gsap.set(".curtain-right", { xPercent: 0 });
    gsap.set(".hero-bg-orbs", { scale: 0, opacity: 0 });
    gsap.set(".hero-profile-photo", { scale: 0.6, opacity: 0 });
    gsap.set(".hero-text-item", { y: 40, opacity: 0 });
    gsap.set(".hero-ctas-container", { scale: 0.7, opacity: 0 });
    gsap.set(".navbar-header", { y: -80, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("portfolio-loaded", "true");
        setIsVisible(false);
      }
    });

    // t=0.0s - overlay covers viewport (curtains are at 0%)
    // t=0.3s - overlay splits horizontally and slides off
    tl.to(".curtain-left", { xPercent: -100, duration: 1.2, ease: "power4.inOut" }, 0.3)
      .to(".curtain-right", { xPercent: 100, duration: 1.2, ease: "power4.inOut" }, 0.3)
      
      // t=0.6s - Hero background gradient blooms in
      .to(".hero-bg-orbs", { scale: 1, opacity: 1, duration: 1.0, ease: "power3.out" }, 0.6)
      
      // t=0.8s - Profile photo fades + scales in with spring
      .to(".hero-profile-photo", { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" }, 0.8)
      
      // t=1.0s - Name text scramble starts
      .call(() => {
        if (onStartScramble) onStartScramble();
      }, null, 1.0)

      // t=1.4s - Role/tagline slides up from y:30px
      .to(".hero-text-item", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.15 }, 1.2)
      
      // t=1.7s - CTA buttons pop in with spring overshoot
      .to(".hero-ctas-container", { scale: 1, opacity: 1, duration: 1.0, ease: "elastic.out(1, 0.6)" }, 1.5)
      
      // t=2.0s - Navbar slides down from y:-60px
      .to(".navbar-header", { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.8);

    return () => {
      tl.kill();
    };
  }, [onStartScramble]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex pointer-events-none">
      <div className="curtain-left w-1/2 h-full bg-zinc-950 dark:bg-zinc-950 pointer-events-auto border-r border-zinc-900" />
      <div className="curtain-right w-1/2 h-full bg-zinc-950 dark:bg-zinc-950 pointer-events-auto border-l border-zinc-900" />
    </div>
  );
}
