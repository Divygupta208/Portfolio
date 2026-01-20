import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Palette, Pen, Code } from "lucide-react";
import TextAnimation from "../ui/TextAnimation";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  isLarge?: boolean;
}

const ServiceCards = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services: ServiceCard[][] = [
    [
      {
        id: 1,
        title: "UI/UX Design",
        description:
          "Innovative interfaces that communicate with your audience and clients.",
        icon: <Layers className="w-8 h-8" />,
        isLarge: true,
      },
      {
        id: 2,
        title: "Branding",
        description:
          "I craft unique and memorable identities that express your brand's vision and values",
        icon: <Palette className="w-8 h-8" />,
      },
    ],
    [
      {
        id: 3,
        title: "Illustration",
        description:
          "I draw captivating illustrations for various media, using diverse styles and techniques",
        icon: <Pen className="w-8 h-8" />,
      },
      {
        id: 4,
        title: "Framer Development",
        description:
          "I use Framer to prototype and code dynamic interfaces that delight users",
        icon: <Code className="w-8 h-8" />,
        isLarge: true,
      },
    ],
  ];

  return (
    <div>
      <div className="flex justify-center gap-2 md:gap-4">
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
          text="Expertise"
          className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter "
        />
      </div>
      <div className="flex justify-center px-4 text-center ">
        <TextAnimation
          variant="allUp"
          duration={0.6}
          delay={0.9}
          text="The best of me to bring products stand-out"
          className="text-lg md:text-xl lg:text-2xl mb-10 mt-2 font-medium  text-zinc-950 tracking-tighter"
        />
      </div>
      <div className=" flex items-center justify-center">
        <div className="w-full max-w-6xl space-y-4 md:space-y-6 px-4 md:px-6 lg:px-0">
          {services.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-col md:flex-row gap-4 md:gap-6"
            >
              {row.map((service) => {
                const isHovered = hoveredCard === service.id;
                const isRowHovered = row.some((s) => hoveredCard === s.id);
                const shouldShrink =
                  !service.isLarge && isRowHovered && !isHovered;
                const shouldGrow = !service.isLarge && isHovered;

                let flexValue = service.isLarge ? 2 : 1;
                if (shouldGrow) flexValue = 2;
                if (shouldShrink) flexValue = 0.8;

                return (
                  <motion.div
                    key={service.id}
                    className={`
                                        bg-white rounded-3xl p-8 shadow-lg
                                        ${!service.isLarge
                        ? "cursor-pointer"
                        : ""
                      }
                                        flex-1 md:flex-initial
                                    `}
                    style={{ flex: window.innerWidth >= 768 ? flexValue : 1 }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      flex: window.innerWidth >= 768 ? flexValue : 1,
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    whileHover={
                      !service.isLarge
                        ? {
                          y: -8,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                        }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    onMouseEnter={() =>
                      !service.isLarge && setHoveredCard(service.id)
                    }
                    onMouseLeave={() =>
                      !service.isLarge && setHoveredCard(null)
                    }
                  >
                    <motion.div
                      className="mb-6 relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <motion.div
                        className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        {service.icon}
                      </motion.div>
                    </motion.div>

                    <motion.h2
                      className="text-2xl md:text-3xl font-medium mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {service.title}
                    </motion.h2>

                    <motion.p
                      className="text-gray-700 text-base md:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                    >
                      {service.description}
                    </motion.p>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
