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
  onClick?: (e: any) => void;
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

  // Bouncy spring transition for TEXT and ICONS
  const springTransition = {
    type: "spring" as const,
    stiffness: 150,
    damping: 15,
    mass: 0.8,
  };

  // Smooth tween transition for BACKGROUND
  const bgTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  } as any;

  // --- Animation Variants ---

  // Background rolls in from the direction
  const bgVariants = {
    initial: { y: isUp ? "100%" : "-100%" },
    hover: { y: 0 },
  };

  // Main content (Text + Icon) exits toward the direction
  const mainContentVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: isUp ? "-100%" : "100%", opacity: 0 },
  };

  // Sub content (Text + Icon) enters from the opposite side toward center
  const subContentVariants = {
    initial: { y: isUp ? "100%" : "-100%", opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      onClick={onClick}
      className={cn(
        "group relative box-border overflow-hidden px-8 py-3 rounded-full font-bold flex items-center justify-center gap-3 border border-transparent",
        mainBgColor,
        mainTextColor,
        className
      )}
    >
      {/* 1. Rolling Background */}
      <motion.div
        variants={bgVariants}
        transition={bgTransition}
        className={cn(
          "absolute inset-0 w-full h-full z-0 rounded-full",
          subBgColor
        )}
      />

      {/* 2. Unified Content Container */}
      <div className="relative z-10 flex items-center justify-center gap-2 overflow-hidden h-6">
        {/* Main State (Visible by default) */}
        <motion.div
          variants={mainContentVariants}
          transition={springTransition}
          className="flex items-center gap-2"
        >
          {mainIcon && (
            <span className="flex items-center justify-center w-5 h-5">
              {mainIcon}
            </span>
          )}
          <span className="block whitespace-nowrap">{mainText}</span>
        </motion.div>

        {/* Sub State (Visible on hover) */}
        <motion.div
          variants={subContentVariants}
          transition={springTransition}
          className={cn("absolute flex items-center gap-2", subTextColor)}
        >
          {subIcon && (
            <span className="flex items-center justify-center w-5 h-5">
              {subIcon}
            </span>
          )}
          <span className="block whitespace-nowrap">{subText}</span>
        </motion.div>
      </div>
    </motion.button>
  );
};

export default RollingButton;
