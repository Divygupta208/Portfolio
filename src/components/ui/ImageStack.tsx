import React, { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Hand } from "lucide-react";

// Replace these with your actual images
const stackImages = [
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1887&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
];

const ImageStack = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [exitX, setExitX] = useState<number | string>("100%");

    const nextImage = () => {
        setExitX("-100%");
        setActiveIndex((prev) => (prev + 1) % stackImages.length);
    };

    const prevImage = () => {
        setExitX("100%");
        setActiveIndex((prev) => (prev - 1 + stackImages.length) % stackImages.length);
    };

    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -50) nextImage();
        else if (info.offset.x > 50) prevImage();
    };

    const variants = {
        enter: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, zIndex: 10 },
        center: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, zIndex: 10 },
        exit: (customExitX: string | number) => ({
            x: customExitX,
            opacity: 0,
            scale: 0.9,
            rotate: customExitX === "100%" ? 10 : -10, // Tilt on exit
            zIndex: 5,
            transition: { duration: 0.3 },
        }),
    };

    const nextIndex1 = (activeIndex + 1) % stackImages.length;
    const nextIndex2 = (activeIndex + 2) % stackImages.length;

    return (
        // Increased container padding to accommodate tilted images without clipping
        <div
            className="relative w-full h-[400px] md:h-full min-h-[400px] p-8 flex items-center justify-center overflow-visible cursor-none"
            onClick={nextImage}
            data-cursor="hover"
            data-cursor-text="DRAG"
        >
            {/* Drag Indicator (Mobile Only) */}
            <div className="absolute top-4 right-4 md:hidden flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full z-20 pointer-events-none animate-pulse">
                <Hand className="w-4 h-4 text-white" />
                <span className="text-white text-xs font-medium uppercase tracking-wider">Drag</span>
            </div>

            {/* Background Stack Layers
        - Added 'rotate' for tilt.
        - Added 'translate' for offset positioning.
        - Reduced 'scale' progressively.
      */}

            {/* Card 3 (Bottom) */}
            <div
                className="absolute w-[85%] h-[85%] rounded-[35px] z-1 border-2 border-white/50 bg-cover bg-center brightness-[0.3] grayscale shadow-lg transition-all duration-500"
                style={{
                    backgroundImage: `url(${stackImages[nextIndex2]})`,
                    transform: "rotate(-10deg) translate(-10px, 10px)",
                }}
            ></div>

            {/* Card 2 (Middle) */}
            <div
                className="absolute w-[90%] h-[90%] rounded-[38px] z-2 border-4 border-white/80 bg-cover bg-center brightness-[0.5] grayscale-50  transition-all duration-500"
                style={{
                    backgroundImage: `url(${stackImages[nextIndex1]})`,
                    transform: "rotate(-5deg) translate(-5px, 5px)",
                }}
            ></div>

            {/* The Active Draggable Image (Top) */}
            <AnimatePresence initial={false} custom={exitX}>
                <motion.div
                    key={activeIndex}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    custom={exitX}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        rotate: { duration: 0.2 },
                        opacity: { duration: 0.2 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1} // Smoother feel (was 0.7)
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }} // Snappy yet smooth return
                    whileTap={{ cursor: "grabbing", scale: 0.98 }}
                    onDragEnd={handleDragEnd}
                    // The active card is center, straight, and largest
                    className="absolute w-[95%] h-[95%] rounded-[40px] bg-cover bg-center z-10 grayscale-50  overflow-hidden border-[6px] border-white touch-pan-y" // Added touch-pan-y for better scroll handling
                    style={{ backgroundImage: `url(${stackImages[activeIndex]})` }}
                    onClick={(e) => e.stopPropagation()}
                >
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default ImageStack;