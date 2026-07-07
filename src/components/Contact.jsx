import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Mail, Phone, Send } from "lucide-react";
import Magnetic from "./Magnetic";
import CinematicHeading from "./CinematicHeading";

gsap.registerPlugin(ScrollTrigger);

const SPRING_TRANSITION = {
  type: "spring",
  stiffness: 120,
  damping: 14,
  mass: 1,
};

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [buttonState, setButtonState] = useState("idle"); // "idle" | "loading" | "success"
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonState("loading");

    // Simulate API request submission
    setTimeout(() => {
      setButtonState("success");
      console.log("Form Submitted:", formState);

      setTimeout(() => {
        setButtonState("idle");
        setFormState({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
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
            Connection
          </motion.p>
          <CinematicHeading text="Get In Touch" className="text-3xl md:text-4xl" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.25 } : SPRING_TRANSITION}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                Let's discuss a project or internship
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                I'm open to discussing opportunities for AI/ML roles, software engineering internships, research collaborations, or full-stack software development projects.
              </p>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                Active & Available for Work
              </span>
            </div>

            {/* Contact list */}
            <div className="flex flex-col gap-4 mt-2">
              <a
                href="mailto:shriashwanth.a2024aiml@sece.ac.in"
                className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover-target group"
              >
                <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group-hover:border-indigo-500/50">
                  <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Email Me
                  </h4>
                  <p className="font-semibold text-sm break-all">
                    shriashwanth.a2024aiml@sece.ac.in
                  </p>
                </div>
              </a>

              <a
                href="tel:+918825469695"
                className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hover-target group"
              >
                <div className="p-3.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group-hover:border-indigo-500/50">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Call Me
                  </h4>
                  <p className="font-semibold text-sm">
                    +91 8825469695
                  </p>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-4">
              <Magnetic>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  transition={SPRING_TRANSITION}
                  href="https://github.com/Shriashwanth"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub Profile"
                  className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors hover-target relative group"
                >
                  <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 text-[10px] font-semibold tracking-wider bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                    GitHub
                  </span>
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { y: -6 }}
                  transition={SPRING_TRANSITION}
                  href="https://www.linkedin.com/in/shri-ashwanth-a-393a6b333/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors hover-target relative group"
                >
                  <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 transition-all duration-300 text-[10px] font-semibold tracking-wider bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                    LinkedIn
                  </span>
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0.25 } : SPRING_TRANSITION}
            className="lg:col-span-7 w-full p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name */}
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent py-3 border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none text-zinc-900 dark:text-white transition-colors duration-300 placeholder-transparent text-sm hover-target focus:shadow-[0_4px_12px_-4px_rgba(99,102,241,0.15)]"
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-3 text-sm text-zinc-400 dark:text-zinc-500 origin-left pointer-events-none transition-all duration-300 group-focus-within:-translate-y-6 group-focus-within:scale-85 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400"
                  style={{
                    transform: formState.name ? "translateY(-1.5rem) scale(0.85)" : "",
                  }}
                >
                  Your Name
                </label>
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent py-3 border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none text-zinc-900 dark:text-white transition-colors duration-300 placeholder-transparent text-sm hover-target focus:shadow-[0_4px_12px_-4px_rgba(99,102,241,0.15)]"
                />
                <label
                  htmlFor="email"
                  className="absolute left-0 top-3 text-sm text-zinc-400 dark:text-zinc-500 origin-left pointer-events-none transition-all duration-300 group-focus-within:-translate-y-6 group-focus-within:scale-85 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400"
                  style={{
                    transform: formState.email ? "translateY(-1.5rem) scale(0.85)" : "",
                  }}
                >
                  Your Email
                </label>
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  placeholder=" "
                  className="w-full bg-transparent py-3 border-b-2 border-zinc-200 dark:border-zinc-800 focus:border-indigo-600 dark:focus:border-indigo-400 outline-none text-zinc-900 dark:text-white transition-colors duration-300 placeholder-transparent text-sm resize-none hover-target focus:shadow-[0_4px_12px_-4px_rgba(99,102,241,0.15)]"
                />
                <label
                  htmlFor="message"
                  className="absolute left-0 top-3 text-sm text-zinc-400 dark:text-zinc-500 origin-left pointer-events-none transition-all duration-300 group-focus-within:-translate-y-6 group-focus-within:scale-85 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400"
                  style={{
                    transform: formState.message ? "translateY(-1.5rem) scale(0.85)" : "",
                  }}
                >
                  Your Message
                </label>
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <Magnetic>
                  <motion.button
                    type="submit"
                    disabled={buttonState !== "idle"}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.94 }}
                    transition={SPRING_TRANSITION}
                    className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/10 hover-target duration-300 min-w-[170px]"
                  >
                    <AnimatePresence mode="wait">
                      {buttonState === "idle" && (
                        <motion.div
                          key="idle"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          Send Message
                          <Send className="w-4 h-4" />
                        </motion.div>
                      )}
                      {buttonState === "loading" && (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </motion.div>
                      )}
                      {buttonState === "success" && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2 text-emerald-300"
                        >
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          Sent!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Magnetic>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
