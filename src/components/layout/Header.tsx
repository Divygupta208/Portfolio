import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom"; // Use NavLink for inbuilt viewTransition
import { Menu, X } from "lucide-react";
import RollingButton from "../ui/RollButton";
import { cn } from "../../utils/cn";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Works", href: "/works" },
    { name: "About me", href: "/about" },
    { name: "Insight", href: "/insight" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Main Pill Container */}
      <nav className="relative w-full max-w-5xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 h-20 rounded-full flex items-center justify-between px-4 shadow-2xl transition-all duration-500">
        {/* Left: Menu Toggle using Rolling Effect */}
        <RollingButton
          mainText="MENU"
          subText={isOpen ? "CLOSE" : "OPEN"}
          mainIcon={isOpen ? <X size={18} /> : <Menu size={18} />}
          subIcon={
            isOpen ? (
              <X size={18} className="text-white" />
            ) : (
              <Menu size={18} className="text-white" />
            )
          }
          direction="down"
          mainBgColor="bg-transparent"
          subBgColor="bg-slate-800"
          mainTextColor="text-slate-900 dark:text-white"
          subTextColor="text-white"
          onClick={() => setIsOpen(!isOpen)}
          className="border-none hover:bg-slate-100 dark:hover:bg-slate-800"
        />

        {/* Center: Brand Name */}
        <div className="hidden md:flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-900 rounded-full dark:bg-slate-100" />
          <span className="font-bold tracking-tighter text-slate-900 dark:text-white uppercase">
            Divy.Design
          </span>
        </div>

        {/* Right: Contact Link with Inbuilt Transition */}
        {/* We wrap the rolling button or use its onClick to navigate */}
        <NavLink to="/contact" viewTransition>
          <RollingButton
            mainText="CONTACT ME"
            subText="SAY HELLO"
            direction="up"
            mainBgColor="bg-transparent"
            subBgColor="bg-slate-800"
            mainTextColor="text-slate-900 dark:text-white"
            subTextColor="text-white"
            className="border border-slate-900 dark:border-slate-700"
          />
        </NavLink>

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
                    <NavLink
                      to={link.href}
                      // This activates the global Wave animation in index.css
                      viewTransition
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "text-4xl font-bold transition-colors block",
                          isActive
                            ? "text-primary"
                            : "text-white hover:text-slate-400"
                        )
                      }
                    >
                      {link.name}
                    </NavLink>
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
