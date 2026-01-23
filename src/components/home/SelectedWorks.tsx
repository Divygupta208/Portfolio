import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useTransform,
    useSpring,
} from "framer-motion";
import RollingButton from "../ui/RollButton";
import TextAnimation from "../ui/TextAnimation";

const sections = [
    {
        id: 1,
        title: "go-Mail",
        description:
            "Mailbox Management: Compose, send, receive, and organize emails efficiently. REST API & Firebase Backend: Real-time data synchronization and secure storage.",
        image: "/projects/go-mail.png",
        tags: ["React", "JS", "Firebase", "Framer"],
        link: "https://go-mail.netlify.app/",
    },
    {
        id: 2,
        title: "Daily-Cents",
        description:
            "Expense Management: Add, edit, and delete expenses. Categorize and visualize spending with Pie/Bar charts using Recharts. Premium subscription model.",
        image: "/projects/daily-cents.png",
        tags: ["AWS", "React", "Node", "JS", "SQL"],
        link: "https://daily-cents.vercel.app/",
    },
    {
        id: 3,
        title: "YAPP -Chat",
        description:
            "Real-Time Messaging: Bidirectional communication using WebSockets. Supports one-on-one and group chats with seamless media sharing.",
        image: "/projects/yapp-chat.png",
        tags: ["AWS", "React", "Node", "JS", "Sockets"],
        link: "",
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
    const clampedProgress = useTransform(parallaxProgress, (v) => Math.min(v, 1));

    /** CONTAINER PARALLAX (stops when sticky) */
    const containerY = useTransform(clampedProgress, [0, 1], ["40%", "0%"]);

    /** IMAGE MICRO PARALLAX (also stops) */
    const imageY = useTransform(clampedProgress, [0, 1], ["-50%", "0%"]);

    return (
        <>
            <div
                ref={containerRef}
                className="relative"
                style={{ minHeight: "auto" }} // Let height be natural, overridden by inner responsiveness
            >
                {/* Desktop Spacer for scrolling - only applies on large screens via CSS class if needed, or we rely on content */}

                <div className="flex justify-center gap-4 mb-5">
                    <TextAnimation
                        variant="wordUp"
                        duration={0.6}
                        delay={0.4}
                        text="Selected"
                        className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter"
                    />
                    <TextAnimation
                        variant="wordUp"
                        duration={0.6}
                        delay={0.7}
                        text="Works"
                        className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter "
                    />
                </div>
                <div className="flex justify-center px-4 text-center">
                    <TextAnimation
                        variant="allUp"
                        duration={0.6}
                        delay={0.9}
                        text="Here are some of my selected works."
                        className="text-lg md:text-xl lg:text-2xl font-medium text-zinc-950 tracking-tighter"
                    />
                </div>

                <div className="flex flex-col md:flex-row bg-transparent rounded-4xl items-start max-w-7xl mx-auto">
                    {/* LEFT SIDE: TEXT CONTENT */}
                    <div className="w-full md:w-1/2 relative px-4 md:px-0">
                        {sections.map((section, index) => (
                            <ContentSection
                                key={section.id}
                                index={index}
                                section={section}
                                onInView={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>

                    {/* RIGHT SIDE: STICKY AREA (Desktop Only) */}
                    <div className="hidden md:flex w-1/2 h-screen sticky top-0 items-center justify-center p-6 overflow-hidden">
                        {/* THE PARALLAX CONTAINER */}
                        <motion.div
                            style={{ y: containerY }}
                            className="relative w-full h-[80vh] overflow-hidden rounded-[40px] bg-zinc-100 border border-zinc-200/50 shadow-2xl will-change-transform"
                        >
                            <AnimatePresence mode="popLayout">
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

                <div className="flex justify-center">
                    <RollingButton
                        mainText="View More"
                        subText="My Projects"
                        mainIcon=""
                        subIcon=""
                        direction="up"
                        mainBgColor=""
                        subBgColor=""
                        className=" font-medium px-14 py-3 border border-black"
                        mainTextColor="text-black"
                        subTextColor="text-black"
                    />
                </div>
            </div>

        </>
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
    const imgRef = useRef<HTMLDivElement | null>(null);

    // Desktop Intersection Observer
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

    // Mobile Parallax Logic
    const { scrollYProgress } = useScroll({
        target: imgRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

    return (
        <section
            ref={sectionRef}
            className="h-auto md:h-[90vh] flex flex-col justify-center py-10 md:py-0 md:px-20"
        >
            {/* MOBILE IMAGE CARD (Separate Parallax Card) */}
            <div
                ref={imgRef}
                className="block md:hidden w-full h-[400px] mb-8 rounded-[2.5rem] overflow-hidden relative shadow-lg"
            >
                <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 w-full h-full">
                    <img
                        src={section.image}
                        alt={section.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                {/* Optional Glass Overlay for premium feel */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none rounded-[2.5rem]" />
            </div>

            {/* TEXT CONTENT (Styled as Card only on Mobile) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-gray-100 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-5 md:rounded-4xl h-auto"
            >
                <span className="text-zinc-500 md:text-zinc-400 font-mono text-sm mb-4 block uppercase tracking-widest">
                    0{index + 1}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-secondary mb-6 md:mb-6 dark:text-zinc-100 tracking-tighter">
                    {section.title}
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                    {section.tags.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="px-3 py-1 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-400 font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-lg md:text-xl text-zinc-600 md:text-zinc-500 max-w-md leading-relaxed mb-8">
                    {section.description}
                </p>

                {section.link && (
                    <a
                        href={section.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-zinc-900 dark:text-white font-medium hover:underline text-lg group"
                    >
                        View Project
                        <svg
                            className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                )}
            </motion.div>
        </section>
    );
};

export default SelectedWorks;
