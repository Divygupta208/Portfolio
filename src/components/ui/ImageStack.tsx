import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ImageCard from "./ImageCard";

// Replace these with your actual images
const stackImages = [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
];

const ImageStack = ({ autoplay = false }: { autoplay?: boolean }) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % stackImages.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + stackImages.length) % stackImages.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    return (
        <div className="relative w-full h-[500px] md:h-full min-h-[500px] flex items-center justify-center p-2 md:p-4">
            <div className="relative w-full h-full flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    {stackImages.map((src, index) => (
                        <motion.div
                            key={src}
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                z: -100,
                                rotate: randomRotateY(),
                            }}
                            animate={{
                                opacity: isActive(index) ? 1 : 0.8,
                                scale: isActive(index) ? 1 : 0.9,
                                z: isActive(index) ? 0 : -100,
                                rotate: isActive(index) ? 0 : randomRotateY(),
                                zIndex: isActive(index)
                                    ? 40
                                    : stackImages.length + 2 - index,
                                y: isActive(index) ? [0, -80, 0] : 0, // Jump animation
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                z: 100,
                                rotate: randomRotateY(),
                            }}
                            transition={{
                                duration: 0.4,
                                ease: "easeInOut",
                            }}
                            className="absolute shrink-0 origin-bottom w-full h-full flex items-center justify-center"
                            style={{
                                perspective: "1000px",
                            }}
                        >
                            <ImageCard
                                image={src}
                                caption={["Adventure", "Memories", "Journey", "Portfolio"][index]}
                                className="w-full h-full max-w-2xl" // Increased max width
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons (Absolute Sideways Overlay) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-8 z-50 pointer-events-none">
                <button
                    onClick={handlePrev}
                    className="pointer-events-auto group/button flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-black/80 transition-all duration-300 shadow-lg"
                >
                    <ArrowLeft className="h-6 w-6 text-white group-hover/button:text-white transition-colors duration-300 group-hover/button:rotate-12" />
                </button>
                <button
                    onClick={handleNext}
                    className="pointer-events-auto group/button flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-black/80 transition-all duration-300 shadow-lg"
                >
                    <ArrowRight className="h-6 w-6 text-white group-hover/button:text-white transition-colors duration-300 group-hover/button:-rotate-12" />
                </button>
            </div>
        </div>
    );
};

export default ImageStack;