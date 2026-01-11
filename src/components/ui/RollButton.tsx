import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

interface RollingButtonProps {
  mainText: string;
  subText: string;
  mainIcon?: React.ReactNode;
  subIcon?: React.ReactNode;
  direction?: "up" | "down";
  mainBgColor?: string;
  subBgColor?: string;
  mainTextColor?: string;
  subTextColor?: string;
  className?: string;
  onClick?: () => void;
}

const RollingButton: React.FC<RollingButtonProps> = ({
  mainText,
  subText,
  mainIcon,
  subIcon,
  direction = "up",
  mainBgColor = "bg-white",
  subBgColor = "bg-black",
  mainTextColor = "text-black",
  subTextColor = "text-white",
  className,
  onClick,
}) => {
  const isUp = direction === "up";

  // --- 1. Transition Definitions ---

  // Bouncy spring transition for TEXT and ICONS only
  const textTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.8,
  };

  // Smooth tween transition for BACKGROUND (removes the "breaking" corners)
  const bgTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.2,
  } as any;

  // --- 2. Animation Variants ---

  const bgVariants = {
    initial: { y: isUp ? "100%" : "-100%" },
    hover: { y: 0 },
  };

  const mainTextVariants = {
    initial: { y: 0 },
    hover: { y: isUp ? "-100%" : "100%" },
  };

  const subTextVariants = {
    initial: { y: isUp ? "100%" : "-100%" },
    hover: { y: 0 },
  };

  const mainIconVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: isUp ? "100%" : "-100%", opacity: 0 },
  };

  const subIconVariants = {
    initial: { y: isUp ? "-100%" : "100%", opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      className={cn(
        // Parent button defines the overall shape and clip area
        "group relative overflow-hidden px-8 py-3 rounded-full font-bold flex items-center justify-center gap-3 border border-transparent",
        mainBgColor,
        mainTextColor,
        className
      )}
    >
      {/* 1. Sub-Background (The "Second Button" effect) */}
      <motion.div
        variants={bgVariants}
        transition={bgTransition}
        className={cn(
          "absolute inset-0 w-full h-full z-0 rounded-full", // Rounded-full ensures it looks like a clean button roll
          subBgColor
        )}
      />

      {/* 2. Icon Container */}
      {(mainIcon || subIcon) && (
        <div className="relative z-10 h-5 w-5 flex items-center justify-center overflow-hidden">
          {mainIcon && (
            <motion.div
              variants={mainIconVariants}
              transition={textTransition} // Stays bouncy
              className="absolute"
            >
              {mainIcon}
            </motion.div>
          )}
          {subIcon && (
            <motion.div
              variants={subIconVariants}
              transition={textTransition} // Stays bouncy
              className="absolute"
            >
              {subIcon}
            </motion.div>
          )}
        </div>
      )}

      {/* 3. Text Container */}
      <div className="relative z-10 overflow-hidden h-6 flex flex-col justify-center">
        <motion.span
          variants={mainTextVariants}
          transition={textTransition} // Stays bouncy
          className="block whitespace-nowrap"
        >
          {mainText}
        </motion.span>

        <motion.span
          variants={subTextVariants}
          transition={textTransition} // Stays bouncy
          className={cn("absolute block whitespace-nowrap", subTextColor)}
        >
          {subText}
        </motion.span>
      </div>
    </motion.button>
  );
};

export default RollingButton;
