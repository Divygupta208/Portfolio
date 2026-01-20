import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Briefcase, Code } from "lucide-react";
import TextAnimation from "../ui/TextAnimation";

// Journey Data
const journeyData = [
    {
        type: "education",
        year: "2020 - 2024",
        title: "Bachelor of Technology",
        institution: "Computer Science & Engineering",
        description: "Focused on Algorithms, Data Structures, and Web Technologies. Built strong foundation in software engineering principles.",
        icon: GraduationCap,
    },
    {
        type: "experience",
        year: "2023 - Present",
        title: "Freelance Full Stack Developer",
        institution: "Self-Employed",
        description: "Delivering custom web solutions for diverse clients. Specializing in React, Node.js, and 3D web experiences.",
        icon: Code,
    },
    {
        type: "experience",
        year: "2022 - 2023",
        title: "Frontend Developer Intern",
        institution: "Tech Startup",
        description: "Collaborated on building responsive UI components and optimizing frontend performance using React and Tailwind CSS.",
        icon: Briefcase,
    },
    {
        type: "education",
        year: "2018 - 2020",
        title: "Higher Secondary Education",
        institution: "Science Stream",
        description: "Completed foundation in Physics, Chemistry, and Mathematics.",
        icon: GraduationCap,
    },
];

const MyJourney: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative text-black overflow-hidden">

            <div className="flex justify-center gap-2 md:gap-4 mb-5">
                <TextAnimation
                    variant="wordUp"
                    duration={0.6}
                    delay={0.4}
                    text="My"
                    className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter"
                />
                <TextAnimation
                    variant="wordUp"
                    duration={0.6}
                    delay={0.7}
                    text="Journey"
                    className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter "
                />
            </div>
            <div className="flex justify-center px-4 text-center">
                <TextAnimation
                    variant="allUp"
                    duration={0.6}
                    delay={0.9}
                    text="Paving the path through education and experience."
                    className="text-lg md:text-xl lg:text-2xl mb-10 font-medium  text-zinc-950 tracking-tighter"
                />
            </div>


            <div className="max-w-7xl mx-auto px-6 relative bg-white rounded-4xl p-10">



                <div className="relative">

                    {/* ROAD SVG - Weaving Background */}
                    <div className="absolute left-0 right-0 top-[-40px] bottom-0 mx-auto w-full max-w-4xl opacity-100 h-[105%]">
                        <svg width="100%" height="100%" viewBox="0 0 800 1600" preserveAspectRatio="none" className="w-full h-full">
                            <defs>
                                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#000000ff" stopOpacity="0" />
                                    <stop offset="10%" stopColor="#000000ff" stopOpacity="1" />
                                    <stop offset="90%" stopColor="#000000ff" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#000000ff" stopOpacity="0" />
                                </linearGradient>
                                <mask id="dashed-line-mask">
                                    <motion.path
                                        d="M 400 0 
                                   C 400 100, 200 100, 200 300 
                                   C 200 500, 600 500, 600 700 
                                   C 600 900, 200 900, 200 1100 
                                   C 200 1300, 400 1300, 400 1600"
                                        stroke="white"
                                        strokeWidth="6"
                                        fill="none"
                                        style={{ pathLength }}
                                    />
                                </mask>
                            </defs>

                            {/* Weaving Path - Fits behind alternating cards */}
                            {/* Assumes 4 items. Weave Left -> Right -> Left -> Right */}
                            {/* Coordinates: Center is 400. Cards at approx y=150, 500, 850, 1200 */}
                            {/* Left curve peak at x=200, Right peak at x=600 */}
                            <motion.path
                                d="M 400 0 
                                   C 400 100, 200 100, 200 300 
                                   C 200 500, 600 500, 600 700 
                                   C 600 900, 200 900, 200 1100 
                                   C 200 1300, 400 1300, 400 1600"
                                stroke="url(#roadGradient)"
                                strokeWidth="80"
                                fill="none"
                            />



                            {/* Dashed Center Line - Animated */}
                            {/* Dashed Center Line - Masked Reveal */}
                            <path
                                d="M 400 0 
                                   C 400 100, 200 100, 200 300 
                                   C 200 500, 600 500, 600 700 
                                   C 600 900, 200 900, 200 1100 
                                   C 200 1300, 400 1300, 400 1600"
                                stroke="#ffffffff"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="20 20"
                                mask="url(#dashed-line-mask)"
                            />
                        </svg>
                    </div>



                    {/* CONTENT ITEMS */}
                    <div className="space-y-32 relative z-10">
                        {journeyData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={`flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}>

                                    {/* Card Side */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-20%" }}
                                        transition={{ duration: 0.6 }}
                                        className={`w-full md:w-1/2 px-12 md:px-16 ${isEven ? 'md:text-right' : 'md:text-left'}`}
                                    >
                                        <div className={`relative group inline-block w-full`}>
                                            <div className="bg-white shadow-lg p-8 rounded-2xl transition-all duration-300">
                                                <div className={`flex items-center gap-4 mb-6 ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                                    <div className="p-3 bg-neutral-100 text-black rounded-lg">
                                                        <item.icon size={24} />
                                                    </div>
                                                    <span className="text-sm font-bold tracking-widest text-neutral-500 uppercase">
                                                        {item.type}
                                                    </span>
                                                </div>

                                                <div className="text-2xl font-bold text-black/80 mb-2">
                                                    {item.year}
                                                </div>
                                                <h3 className="text-3xl font-bold mb-2 text-black">{item.title}</h3>
                                                <div className="text-lg text-neutral-600 mb-4 font-medium">{item.institution}</div>
                                                <p className="text-neutral-500 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Empty Side for layout balance (or styling element) */}
                                    <div className="hidden md:block w-1/2" />


                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyJourney;
