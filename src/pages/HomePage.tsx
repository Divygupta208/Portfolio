import React from "react";
import Hero from "../components/home/HeroSection";
import SelectedWorks from "../components/home/SelectedWorks";
import AboutSection from "../components/home/AboutMe";
import ServiceCards from "../components/home/ExpertiseAndSkills";

const HomePage = () => {
  return (
    <div className="space-y-20">
      <Hero />
      <SelectedWorks />
      <AboutSection />
      <ServiceCards />

    </div>
  );
};

export default HomePage;
