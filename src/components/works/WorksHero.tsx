import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Play } from 'lucide-react';
import TextAnimation from '../ui/TextAnimation';

interface Project {
    id: number;
    category: string;
    year: string;
    title: string;
    description: string;
    longDescription?: string;
    image: string;
    techStack?: string[];
}

const projects: Project[] = [
    {
        id: 1,
        category: "WEB DESIGN",
        year: "2023",
        title: "Zenith magazine website",
        description: "Online magazine providing global trends.",
        longDescription: "Zenith is a comprehensive digital publishing platform built to handle high-traffic editorial content. It features a custom CMS, real-time analytics, and a fully responsive design tailored for a premium reading experience.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
        techStack: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
        id: 2,
        category: "WEB DESIGN",
        year: "2022",
        title: "Arunika landing page",
        description: "A cutting-edge digital platform for tech interaction.",
        longDescription: "Arunika focuses on minimalist aesthetics combined with powerful interactive elements. The landing page uses advanced WebGL transitions and a fluid layout system to engage users from the first second.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        techStack: ["TypeScript", "Three.js", "GSAP", "PostCSS"]
    }
];

export default function WorkHero() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const id = useId(); // Unique ID for Framer Motion layout transitions

    return (
        <section className="min-h-screen w-full">
            {/* Header */}
            <div className="max-w-6xl bg-white py-20 rounded-4xl  mb-12 text-center flex flex-col justify-center items-center">
                <TextAnimation
                    text="The work I do"
                    variant="allUp"
                    delay={0.5}
                    trigger={true}
                    className="mb-2 md:mb-4 text-xl md:text-3xl lg:text-8xl text-black"
                />
                <TextAnimation
                    text="Transforming complex problems into elegant digital experiences."
                    variant="allUp"
                    delay={0.7}
                    trigger={true}
                    className="text-gray-500 text-xl max-w-xl mx-auto"
                />
            </div>

            {/* List-Style Grid Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <motion.div
                        layoutId={`card-${project.id}-${id}`}
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className="bg-black/90 rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-white/5 cursor-pointer hover:bg-black transition-colors group"
                    >
                        {/* Tiny Album Art Style Image */}
                        <motion.div
                            layoutId={`image-${project.id}-${id}`}
                            className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-zinc-800"
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Title and Description */}
                        <div className="flex flex-col flex-grow min-w-0">
                            <motion.h3
                                layoutId={`title-${project.id}-${id}`}
                                className="text-base font-bold text-white truncate"
                            >
                                {project.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${project.id}-${id}`}
                                className="text-zinc-400 text-sm truncate"
                            >
                                {project.description}
                            </motion.p>
                        </div>

                        {/* View Button */}
                        <div className="shrink-0">
                            <button className="bg-white text-black text-xs font-bold px-5 py-2 rounded-full hover:scale-105 transition-transform flex items-center gap-2">
                                <Play size={12} fill="currentColor" /> View
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Expanded Card Overlay */}
            <AnimatePresence>
                {activeProject && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveProject(null)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[90]"
                        />

                        <div className="fixed inset-0 grid place-items-center z-[100] pointer-events-none p-4">
                            <motion.div
                                layoutId={`card-${activeProject.id}-${id}`}
                                className="w-full max-w-[600px] h-fit max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl pointer-events-auto"
                            >
                                <div className='relative'>
                                    <motion.div
                                        layoutId={`image-${activeProject.id}-${id}`}
                                        className='w-full aspect-video'
                                    >
                                        <img
                                            src={activeProject.image}
                                            alt={activeProject.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                    <button
                                        onClick={() => setActiveProject(null)}
                                        className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>

                                <div className="p-8 flex flex-col overflow-y-auto">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <motion.h3
                                                layoutId={`title-${activeProject.id}-${id}`}
                                                className="text-3xl font-bold text-neutral-800 dark:text-neutral-200"
                                            >
                                                {activeProject.title}
                                            </motion.h3>
                                            <div className="flex gap-2 mt-2">
                                                <span className="text-[10px] font-bold text-gray-400 tracking-widest bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md uppercase">
                                                    {activeProject.category}
                                                </span>
                                                <span className="text-[10px] font-bold text-gray-400 tracking-widest bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded-md">
                                                    {activeProject.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        layoutId={`description-${activeProject.id}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6"
                                    >
                                        {activeProject.longDescription || activeProject.description}
                                    </motion.div>

                                    {activeProject.techStack && (
                                        <div className="pt-6 border-t border-gray-100 dark:border-zinc-800">
                                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeProject.techStack.map((tech) => (
                                                    <span key={tech} className="text-xs font-medium text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-3 py-1 rounded-full">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-8">
                                        <button
                                            className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                            onClick={() => window.open('#', '_blank')}
                                        >
                                            View Project <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}