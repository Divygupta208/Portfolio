import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 1. Mouse Position (Raw)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Spring Physics (High stiffness, low mass to reduce lag/jump)
  const springConfig = { damping: 28, stiffness: 400, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // We set the coordinates EXACTLY to the mouse position.
      // We will handle centering via CSS 'translate(-50%, -50%)'
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, [data-cursor='hover']")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-[100000] mix-blend-difference">
      {/* MAIN WRAPPER: This stays centered on the mouse.
          We use -50% translation so the anchor point is the dead center of the cursor.
      */}
      <motion.div
        style={{ 
          x: cursorX, 
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%" 
        }}
        className="relative flex items-center justify-center w-0 h-0"
      >
        <AnimatePresence>
          {!isHovered ? (
            // --- DEFAULT DOT ---
            <motion.div
              key="dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute w-5 h-5 shadow-2xl shadow-slate-600 bg-white rounded-full"
            />
          ) : (
            // --- HOVER SVG ---
            <motion.div
              key="hover-state"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute flex items-center justify-center"
            >
             

              

              {/* Text */}
              <span className="absolute text-[13px] font-bold text-white uppercase tracking-widest">
                View
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CustomCursor;