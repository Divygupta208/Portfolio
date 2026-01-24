import { useRef } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "framer-motion";
import { cn } from "../../utils/cn";

interface ScrollRevealTextProps {
    text: string;
    className?: string;
}

const ScrollRevealText = ({ text, className }: ScrollRevealTextProps) => {
    const containerRef = useRef<HTMLHeadingElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.9", "end 0.5"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 200,
        mass: 0.5,
    });

    const words = text.split(" ");
    // Count total characters to distribute progress evenly
    const totalChars = words.reduce((acc, word) => acc + word.length, 0);

    let charCount = 0;

    return (
        <h2
            ref={containerRef}
            className={cn("flex flex-wrap gap-[0.2em]", className)}
        >
            {words.map((word, i) => {
                const start = charCount / totalChars;
                const end = (charCount + word.length) / totalChars;
                charCount += word.length;

                return (
                    <Word
                        key={i}
                        text={word}
                        progress={smoothProgress}
                        range={[start, end]}
                    />
                );
            })}
        </h2>
    );
};

const Word = ({
    text,
    progress,
    range,
}: {
    text: string;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const chars = text.split("");
    const [start, end] = range;
    const step = (end - start) / chars.length;

    return (
        <span className="inline-block whitespace-nowrap">
            {chars.map((char, i) => {
                const charStart = start + step * i;
                const charEnd = start + step * (i + 1);
                return (
                    <Char
                        key={i}
                        char={char}
                        progress={progress}
                        range={[charStart, charEnd]}
                    />
                );
            })}
        </span>
    );
};

const Char = ({
    char,
    progress,
    range,
}: {
    char: string;
    progress: MotionValue<number>;
    range: [number, number];
}) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <motion.span style={{ opacity }} className="inline-block">
            {char}
        </motion.span>
    );
};

export default ScrollRevealText;
