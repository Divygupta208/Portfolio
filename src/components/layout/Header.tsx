import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Mail } from "lucide-react";
import RollingButton from "../ui/RollButton";
import Hamburger from "../ui/Hamburger";
import { useWaveTransition } from "../../hooks/useViewTransition";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startWave } = useWaveTransition();
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const headerRef = useRef<HTMLElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const rotatingWords = ["Design", "Dev", "Works", "Create"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150 && !isOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Works", href: "/works" },
    { name: "About me", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    startWave(href);
  };

  return (
    <motion.header
      ref={headerRef}
      variants={{
        visible: { y: 0 },
        hidden: { y: -150 },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center max-w-6xl mx-auto px-4 md:px-6 lg:px-0"
      style={{ viewTransitionName: "site-header" } as React.CSSProperties}
    >
      <nav className="relative w-full bg-white dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 h-20 rounded-full flex items-center justify-between px-4 transition-all duration-500">
        {/* Left: Menu Toggle */}
        <div
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Hamburger
            isOpen={isOpen}
            className="text-slate-900 dark:text-white scale-75"
          />
          <span className="font-medium text-sm tracking-widest text-slate-900 dark:text-white uppercase hidden sm:block">
            {isOpen ? "Close" : "Menu"}
          </span>
        </div>

        {/* Center: Brand Name */}
        <div
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer ml-5"
          onClick={(e) => handleNavClick(e as any, "/")}
        >
          <span className="font-bold text-slate-900 dark:text-white uppercase flex items-center gap-1">
            Divy.
            <span className="relative w-[5.5em] h-[1.2em] overflow-hidden inline-flex items-center perspective-[400px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[currentWordIndex]}
                  initial={{ opacity: 0, rotateX: -90, y: 10 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0 }}
                  exit={{ opacity: 0, rotateX: 90, y: -10 }}
                  transition={{ duration: 0.55, ease: "backOut" }}
                  className="absolute left-0 origin-center text-slate-900 dark:text-white"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </span>
        </div>

        {/* Right: Contact Button */}
        <RollingButton
          mainText="CONTACT ME"
          subText="SAY HELLO"
          direction="up"
          mainBgColor="bg-transparent"
          subBgColor="bg-slate-800"
          mainTextColor="text-slate-900 dark:text-white"
          subTextColor="text-white"
          className="hidden sm:block border border-slate-900 dark:border-slate-700"
          onClick={(e: any) => handleNavClick(e as any, "/contact")}
        />

        {/* Mobile Contact Icon */}
        <button
          className="sm:hidden w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          onClick={(e) => handleNavClick(e, "/contact")}
        >
          <Mail size={20} />
        </button>

        {/* --- EXPANDABLE MENU --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute top-24 left-0 w-72 bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl flex flex-col gap-8"
            >
              <span className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
                Navigation
              </span>
              <ul className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      onClick={(e) => handleNavClick(e as any, link.href)}
                      className="text-4xl font-bold text-white hover:text-slate-400 transition-colors block text-left"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
