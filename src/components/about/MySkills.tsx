import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import {
    FaReact,
    FaNodeJs,
    FaAws,
    FaHtml5,
    FaCss3,
    FaGitAlt,
} from "react-icons/fa";
import {
    SiTypescript,
    SiJavascript,
    SiNextdotjs,
    SiPostgresql,
    SiExpress,
    SiRedux,
    SiFramer,
    SiGreensock,
} from "react-icons/si";


// Skill Data
// We remove 'y' from here and calculate it dynamically to ensure even spread
const skillsData = [
    { name: "React", icon: FaReact, color: "#61DAFB", size: 90, x: -20, z: 50 },
    { name: "Three", icon: SiTypescript, color: "#3178C6", size: 80, x: 25, z: 0 },
    { name: "Logic", icon: SiJavascript, color: "#F7DF1E", size: 85, x: -30, z: 20 },
    { name: "Server", icon: FaNodeJs, color: "#339933", size: 95, x: 30, z: -30 },
    { name: "Web", icon: SiNextdotjs, color: "#000000", size: 90, x: -10, z: 60 },
    { name: "Data", icon: SiPostgresql, color: "#336791", size: 80, x: 35, z: -20 },
    { name: "Cloud", icon: FaAws, color: "#FF9900", size: 100, x: -35, z: 10 },
    { name: "API", icon: SiExpress, color: "#000000", size: 75, x: 15, z: 40 },
    { name: "Struct", icon: FaHtml5, color: "#E34F26", size: 85, x: -25, z: -10 },
    { name: "Style", icon: FaCss3, color: "#1572B6", size: 85, x: 35, z: 30 },
    { name: "Version", icon: FaGitAlt, color: "#F05032", size: 70, x: 5, z: 0 },
    { name: "State", icon: SiRedux, color: "#764ABC", size: 80, x: -30, z: 50 },
    { name: "Motion", icon: SiFramer, color: "#0055FF", size: 95, x: 30, z: -40 },
    { name: "Anim", icon: SiGreensock, color: "#88CE02", size: 90, x: 0, z: 20 },
];

const MySkills: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });


    return (
        // Height determines how long the scroll section is. 400vh gives enough room for 14 items to spread out.
        <div ref={containerRef} className="relative h-[400vh] bg-main-bg">
            {/* Sticky Background Heading */}
            {/* 
         'sticky top-0' works until the parent container scrolls out of view.
         We use overflow-hidden to clip the cards as they pass by.
      */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                <motion.h2
                    className="text-[12vw] font-bold text-black/60 uppercase tracking-tighter select-none pointer-events-none"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
                        scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
                    }}
                >
                    My Skills
                </motion.h2>

                {/* Floating 2D Cards Container Layered ABOVE the text but inside the sticky frame relative to viewport */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {skillsData.map((skill, index) => (
                        <SkillCard
                            key={index}
                            skill={skill}
                            progress={scrollYProgress}
                            index={index}
                            total={skillsData.length}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2D Card Component
interface SkillCardProps {
    skill: typeof skillsData[0];
    progress: MotionValue<number>;
    index: number;
    total: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, progress, index, total }) => {

    const stagger = 1 / total;
    const start = index * stagger;
    const end = start + 0.3;

    const y = useTransform(
        progress,
        [0, 1],
        [
            800 + index * 300,  // Start position: progressively lower
            -800 - (total - index) * 300 // End position: progressively higher (so they maintain relative order)
        ]
    );

    const opacity = useTransform(
        progress,
        // Fade in/out at edges of the screen to avoid popping
        [0, 0.1, 0.9, 1],
        [0, 1, 1, 0]
    );

    // For snake pattern, alternate x position left/right based on index
    const cardX = (index % 2 === 0 ? -20 : 20); // Alternating -20vw and 20vw for zig-zag appearance


    // Parallax Fix:
    // The default useParallax hook uses useScroll which tracks layout position.
    // Since these cards are inside a sticky container and moved via transforms (y), 
    // their layout position doesn't change relative to the viewport.
    // We must drive the parallax effect using the card's visual 'y' position.

    // Map the card's Y position (from off-screen bottom to off-screen top) to a parallax offset.
    // We use a range of [-800, 800] to cover the viewport height with some buffer.
    const parallaxValue = useTransform(y, [800, -800], [70, -70]);

    // Add spring physics for smooth movement, matching the original hook's feel
    const yx = useSpring(parallaxValue, {
        stiffness: 100,
        damping: 30
    });

    const cardSize = skill.size * 2;

    return (
        <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-grab active:cursor-grabbing group"
            style={{
                x: `${cardX}vw`,
                y,
                // opacity, // Optional: Keep them visible or fade them? Let's keep them visible for "flying by" effect
            }}
        >
            <motion.div
                className="relative rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(0,0,0,0.1)] overflow-hidden"
                style={{
                    y: yx,
                    width: cardSize,
                    height: cardSize,
                    backgroundColor: "#000000",
                }}
                variants={{
                    rest: { scale: 1 },
                    hover: { scale: 1.1 }
                }}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    variants={{
                        rest: { y: 0 },
                        hover: { y: -20 }
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <skill.icon
                        className="drop-shadow-[0_0_4px_rgba(0,0,0,0.3)]"
                        style={{ color: "white", fontSize: cardSize * 0.5 }}
                    />
                </motion.div>
                <motion.p
                    className="absolute bottom-2 left-0 right-0 text-white text-center text-sm"
                    variants={{
                        rest: { opacity: 0, y: 10 },
                        hover: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.2 }}
                >
                    {skill.name}
                </motion.p>
            </motion.div>
        </motion.div>
    );
};

export default MySkills;