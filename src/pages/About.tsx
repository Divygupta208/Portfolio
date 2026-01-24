import AboutHero from "../components/about/AboutHero";
import MyJourney from "../components/about/MyJourney";
import MySkills from "../components/about/MySkills";

const About = () => {
  return (
    <>
      <div className="space-y-10 md:space-y-20">
        <AboutHero />
        <MyJourney />
        <MySkills />
      </div>
    </>
  );
};

export default About;
