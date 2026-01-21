import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface RollingButtonProps {
  mainText: string | React.ReactNode;
  subText: string | React.ReactNode;
  mainIcon?: React.ReactNode;
  subIcon?: React.ReactNode;
  direction?: "up" | "down";
  mainBgColor?: string;
  subBgColor?: string;
  mainTextColor?: string;
  subTextColor?: string;
  className?: string;
  onClick?: (e: any) => void;
  showInitialAnimation?: boolean;
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
  showInitialAnimation = false,
}) => {
  const isUp = direction === "up";
  const [isHovered, setIsHovered] = React.useState(false);
  const [isRolling, setIsRolling] = React.useState(false);
  const isTouch = React.useRef(false);

  const handleTouchStart = () => {
    isTouch.current = true;
  };

  const handleMouseEnter = () => {
    if (!isTouch.current) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch.current) {
      setIsHovered(false);
    }
  };

  const handleClick = (e: any) => {
    // If it's a touch interaction, we want to play the animation FIRST, then click.
    if (isTouch.current) {
      setIsHovered(false);
      setIsRolling(true);

      // Delay the actual click action to let the animation play
      setTimeout(() => {
        setIsRolling(false);
        onClick?.(e);
      }, 450);
    } else {
      // Desktop/Mouse: If not hovered (rare), trigger roll, but click immediately
      if (!isHovered) {
        setIsHovered(false);
        setIsRolling(true);
        setTimeout(() => setIsRolling(false), 500);
      }
      onClick?.(e);
    }
  };


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

  // Main Text exits toward the direction
  const mainTextVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: isUp ? "-100%" : "100%", opacity: 0 },
  };

  // Sub Text enters from the opposite side
  const subTextVariants = {
    initial: { y: isUp ? "100%" : "-100%", opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };

  // ICONS roll OPPOSITE to text
  // Main Icon exits OPPOSITE to text direction
  const mainIconVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { y: isUp ? "100%" : "-100%", opacity: 0 }, // Moves Down if Text moves Up
  };

  // Sub Icon enters from OPPOSITE side of text entry
  // If Text comes from Bottom (isUp=true), Icon comes from Top
  const subIconVariants = {
    initial: { y: isUp ? "-100%" : "100%", opacity: 0 }, // Starts Top if Text Starts Bottom
    hover: { y: 0, opacity: 1 },
  };

  // --- Initial Animation Variants (for showInitialAnimation) ---
  const initialTextVariants: Variants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
    },
  };

  const initialIconVariants: Variants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut", delay: 0.3 },
    },
  };

  return (
    <motion.button
      initial="initial"
      animate={isHovered || isRolling ? "hover" : "initial"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
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
      <div className="relative z-10 flex items-center justify-center gap-1 overflow-hidden">

        {/* ICON COLUMN - Only rendered if at least one icon exists */}
        {(mainIcon || subIcon) && (
          <div className="relative flex items-center justify-center w-5 h-5">
            {mainIcon && (
              <motion.span
                variants={mainIconVariants}
                transition={springTransition}
                className="absolute inset-0 flex items-center justify-center"
              >
                {showInitialAnimation ? (
                  <motion.span
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={initialIconVariants}
                  >
                    {mainIcon}
                  </motion.span>
                ) : (
                  mainIcon
                )}
              </motion.span>
            )}
            {subIcon && (
              <motion.span
                variants={subIconVariants}
                transition={springTransition}
                className={cn("absolute inset-0 flex items-center justify-center", subTextColor)}
              >
                {subIcon}
              </motion.span>
            )}
          </div>
        )}

        {/* TEXT COLUMN - Uses Grid to ensure width accommodates widest text */}
        <div className="relative grid items-center justify-items-center">
          {/* Main Text */}
          <motion.div
            variants={mainTextVariants}
            transition={springTransition}
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {showInitialAnimation && typeof mainText === "string" ? (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-x-[0.25em]"
                transition={{ staggerChildren: 0.04 }}
              >
                {mainText.split(" ").map((word, i) => (
                  <span key={i} className="inline-block overflow-hidden">
                    <motion.span variants={initialTextVariants} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.div>
            ) : (
              mainText
            )}
          </motion.div>

          {/* Sub Text */}
          <motion.div
            variants={subTextVariants}
            transition={springTransition}
            className={cn("col-start-1 row-start-1 whitespace-nowrap", subTextColor)}
          >
            {subText}
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default RollingButton;