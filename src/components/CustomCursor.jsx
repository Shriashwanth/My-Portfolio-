import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hoverState, setHoverState] = useState("default"); // "default" | "link" | "card" | "photo"

  useEffect(() => {
    // Only enable custom cursor for devices with fine pointer (e.g. desktop mouse)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse coordinates tracking
    let mouse = { x: -100, y: -100 };
    let ringPos = { x: -100, y: -100 };

    // Initial position setups
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(dot, { x: mouse.x, y: mouse.y });
    };

    // Lerp loop for the outer ring (lerp factor 0.12)
    let animId;
    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.12;
      ringPos.y += (mouse.y - ringPos.y) * 0.12;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(tick);

    // Hover listeners
    const onMouseEnterLink = () => setHoverState("link");
    const onMouseLeaveLink = () => setHoverState("default");

    const onMouseEnterCard = () => setHoverState("card");
    const onMouseLeaveCard = () => setHoverState("default");

    const onMouseEnterPhoto = () => setHoverState("photo");
    const onMouseLeavePhoto = () => setHoverState("default");

    const addHoverListeners = () => {
      // Links & buttons
      const links = document.querySelectorAll("a, button, select, input, textarea, [role='button'], .hover-target");
      links.forEach((item) => {
        // Exclude cards from default link behavior
        if (item.closest(".bento-card") || item.closest(".project-card-scroll") || item.classList.contains("bento-card")) {
          return;
        }
        item.removeEventListener("mouseenter", onMouseEnterLink);
        item.removeEventListener("mouseleave", onMouseLeaveLink);
        item.addEventListener("mouseenter", onMouseEnterLink);
        item.addEventListener("mouseleave", onMouseLeaveLink);
      });

      // Bento cards & project cards
      const cards = document.querySelectorAll(".bento-card, .project-card-scroll");
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", onMouseEnterCard);
        card.removeEventListener("mouseleave", onMouseLeaveCard);
        card.addEventListener("mouseenter", onMouseEnterCard);
        card.addEventListener("mouseleave", onMouseLeaveCard);
      });

      // Profile photo
      const photos = document.querySelectorAll(".profile-photo, .group img, #home img");
      photos.forEach((photo) => {
        photo.removeEventListener("mouseenter", onMouseEnterPhoto);
        photo.removeEventListener("mouseleave", onMouseLeavePhoto);
        photo.addEventListener("mouseenter", onMouseEnterPhoto);
        photo.addEventListener("mouseleave", onMouseLeavePhoto);
      });
    };

    addHoverListeners();

    // Re-bind listeners on DOM changes (e.g. navigation or dynamic content)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // Click triggers
    const handleMouseDown = () => {
      gsap.to([dot, ring], { scale: 0.6, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsap.to([dot, ring], { scale: 1, duration: 0.45, ease: "elastic.out(1.2, 0.45)" });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  let ringStyle = {};
  let dotStyle = {};
  let ringContent = null;

  if (hoverState === "link") {
    ringStyle = {
      width: "60px",
      height: "60px",
      backgroundColor: "rgba(99, 102, 241, 0.2)",
      borderColor: "transparent",
      transition: "width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s",
    };
    dotStyle = {
      transform: "translate(-50%, -50%) scale(0)",
      transition: "transform 0.2s",
    };
  } else if (hoverState === "card") {
    ringStyle = {
      width: "80px",
      height: "36px",
      borderRadius: "12px",
      backgroundColor: "#4f46e5",
      borderColor: "#4f46e5",
      transition: "width 0.2s, height 0.2s, border-radius 0.2s, background-color 0.2s, border-color 0.2s",
    };
    dotStyle = {
      transform: "translate(-50%, -50%) scale(0)",
      transition: "transform 0.2s",
    };
    ringContent = (
      <span className="text-white text-xs font-semibold select-none leading-none">
        View
      </span>
    );
  } else if (hoverState === "photo") {
    ringStyle = {
      width: "48px",
      height: "48px",
      borderColor: "#4f46e5",
      borderStyle: "dashed",
      transition: "width 0.2s, height 0.2s, border-style 0.2s, border-color 0.2s",
    };
    ringContent = (
      <span className="absolute -right-6 -bottom-6 text-xl animate-bounce">
        👋
      </span>
    );
  } else {
    // Default style
    ringStyle = {
      width: "40px",
      height: "40px",
      borderColor: "rgba(99, 102, 241, 0.4)",
      backgroundColor: "transparent",
      borderRadius: "50%",
      transition: "width 0.2s, height 0.2s, border-radius 0.2s, background-color 0.2s, border-color 0.2s",
    };
    dotStyle = {
      transform: "translate(-50%, -50%) scale(1)",
      transition: "transform 0.2s",
    };
  }

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor bg-indigo-500 dark:bg-indigo-400 mix-blend-difference hidden md:block opacity-100"
        style={{ pointerEvents: "none", ...dotStyle }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring mix-blend-difference hidden md:block opacity-100"
        style={{ pointerEvents: "none", ...ringStyle }}
      >
        {ringContent}
      </div>
    </>
  );
}
