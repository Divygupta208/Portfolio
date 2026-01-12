import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "../../utils/cn";

interface TextAnimationProps {
  text: string;
  variant?: "wordUp" | "wordRight" | "allUp";
  className?: string;
  delay?: number;
}

const TextAnimation: React.FC<TextAnimationProps> = ({
  text,
  variant = "wordUp",
  className,
  delay = 0,
}) => {
  const words = text.split(" ");

  // 1. Define the Container Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: variant === "allUp" ? 0 : 0.06,
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
        transition: { duration: 0.4, ease: "easeInOut" },
      },
    },
    wordRight: {
      hidden: { x: -20, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
      },
    },
    allUp: {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.9, ease: "easeInOut" },
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
    >
      {variant === "allUp" ? (
        <motion.span variants={animationVariants.allUp}>{text}</motion.span>
      ) : (
        words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden py-1">
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
