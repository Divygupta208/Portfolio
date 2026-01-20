import { motion } from "framer-motion";
import {
  Linkedin,
  Dribbble,
  Twitter,
  Instagram,
  ArrowRight,
} from "lucide-react";
import RollingButton from "../ui/RollButton";
import TextAnimation from "../ui/TextAnimation";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as any;

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },

    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 1.8 },
    },
  } as any;

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      subIcon: <ArrowRight size={18} />,
    },
    {
      name: "Dribbble",
      icon: <Dribbble size={18} />,
      subIcon: <ArrowRight size={18} />,
    },
    {
      name: "Twitter",
      icon: <Twitter size={18} />,
      subIcon: <ArrowRight size={18} />,
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      subIcon: <ArrowRight size={18} />,
    },
  ];

  return (
    <section className="min-h-screen w-full bg-[#E5E7EB] flex flex-col gap-4 px-4 md:px-6 lg:p-0">
      {/* Main Hero Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grow w-full max-w-6xl mx-auto bg-white rounded-4xl flex flex-col items-center justify-center text-center p-8 md:p-12"
      >
        <div className="flex gap-2 flex-wrap justify-center">
          <TextAnimation
            text="Hello, I'm"
            variant="wordUp"
            delay={0.5}
            trigger={true}
            className="mb-2 md:mb-4 text-xl md:text-3xl lg:text-3xl text-black"
          />
          <TextAnimation
            text="Divy"
            variant="wordUp"
            delay={0.6}
            trigger={true}
            className="mb-2 md:mb-4 text-xl md:text-3xl lg:text-3xl text-black"
          />
        </div>
        <div className="flex flex-col items-center">
          <TextAnimation
            text="I'm bringing ideas to life"
            variant="allUp"
            delay={0.9}
            trigger={true}
            className="mb-2 md:mb-6 text-4xl md:text-8xl tracking-tighter font-medium text-black leading-tight"
          />
          <TextAnimation
            text="with lasting impact"
            variant="allUp"
            delay={1}
            trigger={true}
            className="mb-4 md:mb-6 text-4xl md:text-8xl tracking-tighter font-medium text-black leading-tight"
          />
        </div>

        <div className="max-w-xl mx-auto px-4">
          <TextAnimation
            text="I create digital products that focus on the user's needs and fit the product strategy"
            variant="allUp"
            delay={1.2}
            trigger={true}
            className="mb-8 md:mb-10 text-base md:text-xl font-light text-black leading-relaxed"
          />
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 md:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          <RollingButton
            mainText="CONTACT ME"
            subText="LET'S TALK"
            mainBgColor="bg-black"
            subBgColor="bg-white"
            mainTextColor="text-white"
            subTextColor="text-black"
            direction="down"
            className="w-full sm:w-auto justify-center"
          />
          <RollingButton
            mainText="RESUME"
            subText="DOWNLOAD"
            mainBgColor="bg-black"
            subBgColor="bg-white"
            mainTextColor="text-white"
            subTextColor="text-black"
            direction="down"
            className="w-full sm:w-auto justify-center"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Social Links Row */}
      <div className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center mx-auto pb-4 lg:pb-0 px-4 lg:px-0">
        {socialLinks.map((link, index) => (
          <motion.div key={link.name} className="w-full">
            <RollingButton
              mainText={link.name}
              subText="Visit Link"
              mainIcon={link.icon}
              subIcon={link.subIcon}
              direction="up"
              mainBgColor="bg-[white]"
              subBgColor="bg-[white]"
              mainTextColor="text-black"
              subTextColor="text-black"
              showInitialAnimation={true}
              className="rounded-xl w-full justify-between px-6 py-6 md:px-20"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
