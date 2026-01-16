import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface TextAnimationProps {
  text: string;
  variant?: "wordUp" | "wordRight" | "allUp";
  className?: string;
  delay?: number;
  trigger?: boolean;
  staggerDuration?: number;
  duration?: number;
  once?: boolean;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  variant = "wordUp",
  className,
  delay = 0,
  trigger,
  staggerDuration,
  duration,
  once = true,
}) => {
  const words = text.split(" ");

  // 1. Define the Container Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration !== undefined ? staggerDuration : (variant === "allUp" ? 0 : 0.06),
        delayChildren: delay,
      },
    },
  };

  // 2. Define the Item Variants separately to satisfy TypeScript
  // We use Record<string, Variants> to allow dynamic key access
  const animationVariants: Record<string, Variants> = {
    wordUp: {
      hidden: { y: "30%", opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: duration ?? 0.4, ease: "easeInOut" },
      },
    },
    wordRight: {
      hidden: { x: -20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: duration ?? 0.6, ease: "easeOut" },
      },
    },
    allUp: {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: duration ?? 0.9, ease: "easeInOut" },
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      // If trigger is provided, use it to control state.
      // If trigger is undefined, fall back to "whileInView" behavior.
      animate={trigger !== undefined ? (trigger ? "visible" : "hidden") : undefined}
      whileInView={trigger === undefined ? "visible" : undefined}
      viewport={{ once }}
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
    >
      {variant === "allUp" ? (
        <motion.span variants={animationVariants.allUp}>{text}</motion.span>
      ) : (
        words.map((word, i) => (
          <span key={i} className="inline-block py-1">
            <motion.span
              variants={animationVariants[variant]}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))
      )}
    </motion.div>
  );
};

export default TextAnimation;
