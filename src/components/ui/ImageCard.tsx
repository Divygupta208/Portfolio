import React from 'react';
import { motion } from 'framer-motion';

interface ImageCardProps {
    image?: string;
    caption?: string;
    className?: string;
    style?: React.CSSProperties;
}

const ImageCard: React.FC<ImageCardProps> = ({
    image,
    caption = "Lake View '89",
    className,
    style
}) => {
    return (
        <div className={`flex items-center justify-center w-full h-full ${className}`} style={style}>
            <motion.div
                initial={{ rotate: -2, y: 0 }}
                whileHover={{ rotate: 0, y: -10, scale: 1.02 }}
                className="relative w-[300px] md:w-[400px] mt-20 lg:mt-0 bg-white p-[10px_10px_20px_10px] shadow-[0_1px_1px_rgba(0,0,0,0.12),0_2px_2px_rgba(0,0,0,0.12),0_4px_4px_rgba(0,0,0,0.12),0_8px_8px_rgba(0,0,0,0.12)] transition-all duration-300 "
            >
                <div className="relative w-full h-[400px] md:h-[480px] bg-[#87ceeb] overflow-hidden group">
                    {image ? (
                        <img src={image} alt={caption} className="w-full h-full object-cover" />
                    ) : (
                        <div className="relative w-full h-full">
                            {/* Sun */}
                            <div className="absolute top-5 right-[30px] w-10 h-10 bg-[#ffe987] rounded-full shadow-[0_0_40px_#ffe987]" />

                            {/* Clouds */}
                            <motion.div
                                animate={{ x: [-60, 240] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute top-[30px] w-[60px] h-5 bg-white/80 rounded-[50px]"
                            />
                            <motion.div
                                animate={{ x: [-40, 240] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 10 }}
                                className="absolute top-[50px] w-10 h-[15px] bg-white/80 rounded-[50px]"
                            />

                            {/* Mountains */}
                            <div className="absolute bottom-20 w-full h-[100px]">
                                <div
                                    className="absolute bottom-0 -left-[20%] w-[70%] h-full bg-gradient-to-tr from-[#4a6363] via-[#4a6363] to-[#6a8d8d]"
                                    style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                                />
                                <div
                                    className="absolute bottom-0 -right-[20%] w-[70%] h-4/5 bg-gradient-to-tr from-[#3d5252] via-[#3d5252] to-[#5c7f7f]"
                                    style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                                />
                            </div>

                            {/* Lake */}
                            <div className="absolute bottom-0 w-full h-20 bg-gradient-to-b from-cadetblue/90 to-[#4a7f80]/95 overflow-hidden">
                                {/* Reflection */}
                                <div className="absolute inset-0 opacity-50 scale-y-[-1] bg-gradient-to-b from-[#4a6363]/40 to-[#6a8d8d]/20" />

                                {/* Water Surface Flow */}
                                <motion.div
                                    animate={{ x: [0, -220] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                />

                                {/* Ripples */}
                                <motion.div
                                    animate={{ x: [0, -220] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 w-[200%]"
                                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.03) 40%)' }}
                                />

                                {/* Sparkles */}
                                <motion.div
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    className="absolute inset-0"
                                    style={{
                                        background: `
                      radial-gradient(1px 1px at 20% 30%, white 0%, transparent 100%),
                      radial-gradient(1px 1px at 40% 70%, white 0%, transparent 100%),
                      radial-gradient(1px 1px at 60% 40%, white 0%, transparent 100%)
                    `
                                    }}
                                />
                            </div>

                            {/* Trees */}
                            <div className="absolute bottom-20 w-full h-[60px] flex justify-between px-4">
                                {[30, 40, 35, 45, 35].map((height, i) => (
                                    <div
                                        key={i}
                                        className="w-5 bg-gradient-to-t from-[#1a472a] to-[#2d5a3f]"
                                        style={{ height: `${height}px`, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Overlays (Scratches) */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none z-[3]"
                        style={{
                            backgroundImage: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.1) 46%, transparent 47%)',
                            backgroundSize: '200px 200px'
                        }}
                    />
                </div>

                <div className="mt-3 text-center font-serif text-sm text-gray-700 opacity-80">
                    {caption}
                </div>
            </motion.div>
        </div>
    );
};

export default ImageCard;