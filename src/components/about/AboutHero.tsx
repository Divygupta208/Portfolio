import { motion } from "framer-motion";
import RollingButton from "../ui/RollButton";
import TextAnimation from "../ui/TextAnimation";

const AboutHero = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  } as any;

  return (
    <section className="min-h-screen w-full bg-[#E5E7EB] flex flex-col gap-4 px-4 md:px-6 lg:p-0">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 min-h-[400px]"
      >
        {/* Left Card - Main Hero */}
        <div className="bg-white rounded-4xl p-8 md:p-12 flex flex-col justify-between h-full">
          <div>
            <span className="text-xl md:text-2xl font-medium text-black block mb-4">
              About me
            </span>
            <div className="flex flex-col gap-1">
              <TextAnimation
                text="I'm versatile"
                variant="wordUp"
                delay={0.2}
                className="text-3xl md:text-6xl lg:text-8xl font-medium text-black tracking-tighter leading-[0.9]"
              />
              <TextAnimation
                text="designer"
                variant="wordUp"
                delay={0.4}
                className="text-3xl md:text-6xl lg:text-8xl font-medium text-secondary tracking-tighter leading-[0.9]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-12 md:mt-20">
            <RollingButton
              mainText="GET IN TOUCH"
              subText="LET'S TALK"
              mainBgColor="bg-black"
              subBgColor="bg-white"
              mainTextColor="text-white"
              subTextColor="text-black"
              direction="down"
              className="bg-black text-white px-8 py-4 rounded-full font-medium min-w-[160px] justify-center"
            />
            <RollingButton
              mainText="DOWNLOAD MY CV"
              subText="RESUME"
              mainBgColor="bg-white"
              subBgColor="bg-black"
              mainTextColor="text-black"
              subTextColor="text-white"
              direction="down"
              className="bg-white text-black border border-black px-8 py-4 rounded-full font-medium min-w-[160px] justify-center"
            />
          </div>
        </div>

        {/* Right Column - Two Cards */}
        <div className="flex flex-col gap-4 md:gap-6 h-full">
          {/* Top Right Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 flex-1 flex items-center">
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
              A creative and versatile digital designer with over five years of
              experience in designing and developing engaging digital media for
              various platforms and audiences. Skilled in using Adobe Creative
              Suite, HTML, CSS, JavaScript, and WordPress to create responsive
              websites, social media graphics, animations, e-books, and
              interactive campaigns.
            </p>
          </div>

          {/* Bottom Right Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 flex-1 flex items-center">
            <p className="text-lg md:text-xl text-zinc-600 leading-relaxed font-light">
              For each project, I strive to create elegant and meaningful
              solutions for the end user. I can work independently on projects
              as well as with a team if required. By the way, I regularly work
              with the amazing people at Zenite Lab, a digital design studio.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutHero;
