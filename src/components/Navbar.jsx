import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [isPast80, setIsPast80] = useState(false);

  // Framer motion scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 14,
    mass: 1,
  });

  useEffect(() => {
    // Scroll detection
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Check if scrolled past 80%
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setIsPast80(window.scrollY > totalHeight * 0.85);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Fade-in avatar after 0.5 seconds
    const avatarTimer = setTimeout(() => {
      setShowAvatar(true);
    }, 550);

    // Intersection Observer for Active Links
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section occupies center
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(avatarTimer);
      observer.disconnect();
    };
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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
    <>
      {/* Cinematic scroll progress depth bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-indigo-600 dark:bg-indigo-400 origin-left z-[100] pointer-events-none"
      />

      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 navbar-header ${
          isPast80
            ? "bg-white dark:bg-zinc-950 py-4 shadow-sm border-b border-zinc-200 dark:border-zinc-900"
            : isScrolled
            ? "frosted-glass py-4 shadow-sm"
            : "bg-transparent py-6 border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Name and Avatar */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "home")}
            className="flex items-center gap-3 select-none text-zinc-900 dark:text-white"
          >
            <AnimatePresence>
              {showAvatar && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
                  className="w-8 h-8 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800"
                >
                  <img
                    src="/assets/profile.jpg"
                    alt="Shri Ashwanth A — portfolio avatar"
                    loading="lazy"
                    className="w-full h-full object-cover profile-photo"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.span 
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
              className="font-semibold text-lg tracking-tight hover-target inline-block"
            >
              Ashwanth A.
            </motion.span>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8 m-0 p-0 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.id} className="relative">
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`text-sm font-medium tracking-wide transition-colors duration-200 hover-target ${
                      activeSection === link.id
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {link.label}
                  </a>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-indigo-600 dark:bg-indigo-400"
                      transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1 }}
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={(e) => toggleTheme(e)}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-200 hover-target flex items-center justify-center"
            >
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
          </nav>

          {/* Mobile Hamburger & Theme Toggle Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={(e) => toggleTheme(e)}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center"
            >
              {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Open mobile menu"
              className="p-2 text-zinc-900 dark:text-white flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-x-0 top-[72px] bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-900 z-30 shadow-lg md:hidden"
            >
              <nav className="py-8 px-6">
                <motion.ul
                  variants={{
                    open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                  }}
                  initial="closed"
                  animate="open"
                  className="flex flex-col gap-5 list-none p-0 m-0 text-center"
                >
                  {NAV_LINKS.map((link) => (
                    <motion.li
                      key={link.id}
                      variants={{
                        open: { y: 0, opacity: 1, transition: { y: { stiffness: 1000, velocity: -100 } } },
                        closed: { y: 50, opacity: 0, transition: { y: { stiffness: 1000 } } },
                      }}
                    >
                      <a
                        href={`#${link.id}`}
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className={`text-xl font-medium block py-2 ${
                          activeSection === link.id
                            ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                            : "text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
