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
    <section className="min-h-screen w-full bg-[#E5E7EB] p-4 md:p-6 flex flex-col gap-4">
      {/* Main Hero Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grow max-w-6xl bg-[white] rounded-[40px] flex flex-col items-center justify-center text-center px-6"
      >
        <div className="flex gap-2">
          <TextAnimation
            text="Hello, I'm"
            variant="wordUp"
            delay={0.5}
            className="mb-4 text-lg md:text-3xl lg:text-3xl text-black"
          />
          <TextAnimation
            text="Divy"
            variant="wordUp"
            delay={0.6}
            className="mb-4 text-lg md:text-3xl lg:text-3xl text-black"
          />
        </div>
        <TextAnimation
          text="I'm bringing ideas to life"
          variant="allUp"
          delay={0.9}
          className="mb-6 text-3xl md:text-8xl tracking-tighter font-medium text-black"
        />
        <TextAnimation
          text="with lasting impact"
          variant="allUp"
          delay={1}
          className="mb-6 text-3xl md:text-8xl tracking-tighter font-medium text-black"
        />

        <TextAnimation
          text="I create digital products that focus on the user's 
          needs and fit the product strategy"
          variant="allUp"
          delay={1.2}
          className="mb-10 text-xl md:text-xl font-light text-black"
        />

        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-5">
          <RollingButton
            mainText="CONTACT ME"
            subText="LET'S TALK"
            mainBgColor="bg-black"
            subBgColor="bg-white"
            mainTextColor="text-white"
            subTextColor="text-black"
            direction="down"
          />
          <RollingButton
            mainText="RESUME"
            subText="DOWNLOAD"
            mainBgColor="bg-black"
            subBgColor="bg-white"
            mainTextColor="text-white"
            subTextColor="text-black"
            direction="down"
          />
        </motion.div>

      </motion.div>

      {/* Bottom Social Links Row */}
      <div className="max-w-6xl grid grid-cols-2  lg:grid-cols-4 items-center mx-auto">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.name}

          >
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
              className="rounded-xl px-20 py-6"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
