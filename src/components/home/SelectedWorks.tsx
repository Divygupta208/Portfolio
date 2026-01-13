import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";

const sections = [
    {
        id: 1,
        title: "Interface Agents",
        description:
            "Broad agentic control across your editor, terminal, and browser for powerful development workflows.",
        image:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "First Experience",
        description:
            "Multiple agents at the same time, across any project, from one central mission control view.",
        image:
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Built for Developers",
        description:
            "Antigravity is built for user trust, whether you are a professional developer or a hobbyist.",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    },
];

const SelectedWorks = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    /** Track scroll of entire section */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    /** Smooth physics */
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
    });

    /**
     * 🔥 PARALLAX ONLY DURING ENTRY
     * 0 → 1 while section is entering viewport
     * Then frozen
     */
    const parallaxProgress = useTransform(smoothProgress, [0, 0.25], [0, 1]);
    const clampedProgress = useTransform(parallaxProgress, (v) =>
        Math.min(v, 1)
    );

    /** CONTAINER PARALLAX (stops when sticky) */
    const containerY = useTransform(
        clampedProgress,
        [0, 1],
        ["40%", "0%"]
    );

    /** IMAGE MICRO PARALLAX (also stops) */
    const imageY = useTransform(
        clampedProgress,
        [0, 1],
        ["-50%", "0%"]
    );

    return (
        <div
            ref={containerRef}
            className="relative bg-white"
            style={{ minHeight: "300vh" }}
        >
            <div className="flex flex-col md:flex-row bg-white px-4 items-start max-w-7xl mx-auto">

                {/* LEFT SIDE: TEXT CONTENT */}
                <div className="w-full md:w-1/2 relative">
                    {sections.map((section, index) => (
                        <ContentSection
                            key={section.id}
                            index={index}
                            section={section}
                            onInView={() => setActiveIndex(index)}
                        />
                    ))}
                </div>

                {/* RIGHT SIDE: STICKY AREA */}
                <div className="w-full md:w-1/2 h-screen sticky top-0 flex items-center justify-center p-6 overflow-hidden">

                    {/* THE PARALLAX CONTAINER */}
                    <motion.div
                        style={{ y: containerY }}
                        className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden rounded-[40px] bg-zinc-100 border border-zinc-200/50 shadow-2xl will-change-transform"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <motion.img
                                    src={sections[activeIndex].image}
                                    alt=""
                                    style={{
                                        y: imageY,
                                        scale: 1.3, // ensures no edge gaps
                                    }}
                                    className="w-full h-full object-cover will-change-transform"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Glass overlay */}
                        <div className="absolute inset-0 rounded-[40px] ring-1 ring-inset ring-black/10 pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ContentSection = ({
    section,
    onInView,
    index,
}: {
    section: any;
    onInView: () => void;
    index: number;
}) => {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) onInView();
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [onInView]);

    return (
        <section
            ref={sectionRef}
            className="h-screen flex flex-col justify-center px-10 md:px-20"
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <span className="text-zinc-400 font-mono text-sm mb-4 block uppercase tracking-widest">
                    0{index + 1}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold mb-8 text-zinc-950 tracking-tighter">
                    {section.title}
                </h2>
                <p className="text-xl text-zinc-500 max-w-md">
                    {section.description}
                </p>
            </motion.div>
        </section>
    );
};

export default SelectedWorks;
