import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RollingButton from "../ui/RollButton";
import Hamburger from "../ui/Hamburger";
import { useWaveTransition } from "../../hooks/useViewTransition";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startWave } = useWaveTransition();

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
    <header
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
          className="hidden md:flex items-center gap-2 cursor-pointer"
          onClick={(e) => handleNavClick(e as any, "/")}
        >
          <div className="w-8 h-8 bg-slate-900 rounded-full dark:bg-slate-100" />
          <span className="font-bold tracking-tighter text-slate-900 dark:text-white uppercase">
            Divy.Design
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
          className="border border-slate-900 dark:border-slate-700"
          onClick={(e: any) => handleNavClick(e as any, "/contact")}
        />

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
    </header>
  );
};

export default Header;
