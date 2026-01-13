import React from "react";
import Hero from "../components/home/HeroSection";
import SelectedWorks from "../components/home/SelectedWorks";

const HomePage = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <SelectedWorks />
    </div>
  );
};

export default HomePage;
