import ImageStack from "../ui/ImageStack";
import Counter from "../ui/Counter";
import RollingButton from "../ui/RollButton";
import TextAnimation from "../ui/TextAnimation";
import ScrollRevealText from "../ui/ScrollRevealText";

const AboutSection = () => {
  const stats = [
    { label: "YEARS OF EXPERIENCE", value: 2 },
    { label: "PROJECT COMPLETED", value: 10 },

  ];

  return (
    // Added overflow-x-hidden to prevent the drag from triggering page scroll
    <section className="w-full max-w-6xl mx-auto flex flex-col gap-2 md:gap-6 overflow-x-hidden px-4 md:px-6 lg:px-0">
      <div className="flex justify-center gap-2 md:gap-4">
        <TextAnimation
          variant="wordUp"
          duration={0.6}
          delay={0.4}
          text="About"
          className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter"
        />
        <TextAnimation
          variant="wordUp"
          duration={0.6}
          delay={0.7}
          text="Me"
          className="text-4xl md:text-6xl lg:text-7xl font-medium  text-zinc-950 tracking-tighter "
        />
      </div>
      <div className="flex justify-center px-4 text-center">
        <TextAnimation
          variant="allUp"
          duration={0.6}
          delay={0.9}
          text="a developer based in India."
          className="text-lg md:text-xl lg:text-2xl font-medium -mb-5 md:mb-5  text-zinc-950 tracking-tighter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 h-full min-h-[400px]">
          <ImageStack />
        </div>
        <div className="lg:col-span-7 bg-white rounded-4xl p-8 md:p-12 flex flex-col justify-center">
          <ScrollRevealText
            text="Passionate versatile digital designer and pixel perfect guy"
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-secondary mb-6 leading-tight"
          />
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed mb-10">
            I am a digital creative designer who loves to create stunning and
            flawless products. I have a passion for both design and development.
          </p>

          <div className="flex flex-wrap gap-4">
            <RollingButton
              mainText="RESUME"
              subText="DOWNLOAD"
              mainBgColor="bg-black"
              subBgColor="bg-white"
              mainTextColor="text-white"
              subTextColor="text-black"
              direction="down"
              className="w-full sm:w-1/3"
            />
            <RollingButton
              mainText="ABOUT ME"
              subText="SEE MORE"
              mainBgColor="bg-white"
              subBgColor="bg-black"
              mainTextColor="text-black"
              subTextColor="text-white"
              direction="down"
              className="border border-black w-full sm:w-1/3"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-center"
          >
            <h3 className="text-black font-medium text-sm uppercase mb-4">
              {stat.label}
            </h3>
            <div className="text-5xl md:text-6xl font-semibold text-black flex items-center">
              <Counter value={stat.value} />
              <span>+</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <RollingButton
          mainText="About Me"
          subText="More About Me"
          mainIcon=""
          subIcon=""
          direction="up"
          mainBgColor=""
          subBgColor=""
          className=" font-medium px-14 py-3 mt-5 border border-black"
          mainTextColor="text-black"
          subTextColor="text-black"
        />
      </div>
    </section>
  );
};

export default AboutSection;
