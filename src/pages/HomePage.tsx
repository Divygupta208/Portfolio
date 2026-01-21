import React from "react";
import Hero from "../components/home/HeroSection";
import SelectedWorks from "../components/home/SelectedWorks";
import AboutSection from "../components/home/AboutMe";
import ServiceCards from "../components/home/ExpertiseAndSkills";
import MySkills from "../components/about/MySkills";

const HomePage = () => {
  return (
    <div className="space-y-10 md:space-y-20">
      <Hero />
      <AboutSection />
      <SelectedWorks />
      <MySkills />
      <ServiceCards />
    </div>
  );
};

export default HomePage;
