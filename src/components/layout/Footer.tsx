

import TextAnimation from "../ui/TextAnimation";
import { Linkedin, Dribbble, Twitter, Instagram, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate how far down the user has scrolled
      const scrollPosition = window.scrollY + window.innerHeight;
      // The total height of the document
      const documentHeight = document.documentElement.scrollHeight;
      // Threshold: When the user is within 50px (or slightly more) of the bottom.
      // Since footer is fixed and revealed by body margin, checking against total document height 
      // minus a small buffer works well.
      if (documentHeight - scrollPosition < 100) {
        setIsFooterVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount just in case we start at the bottom
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    { name: "LinkedIn", icon: <Linkedin size={18} /> },
    { name: "Dribbble", icon: <Dribbble size={18} /> },
    { name: "Twitter", icon: <Twitter size={18} /> },
    { name: "Instagram", icon: <Instagram size={18} /> },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-[black] dark:bg-slate-950 px-4 md:px-6 py-6 md:py-10 z-0 flex justify-center h-[500px] md:h-[600px]"
    >
      {/* CONTAINER: This centers the content. 
         w-full and max-w-6xl ensures it matches your Layout's content width.
      */}
      <div className="w-full max-w-6xl h-full flex flex-col justify-between">

        {/* Main Content Card */}
        <div className="flex-grow bg-black rounded-[40px] text-white flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-6 mt-4 md:mt-20">
          <div className="text-center mb-8 md:mb-12 flex flex-col items-center">
            <div className="flex flex-row gap-2 md:gap-3 justify-center items-center flex-wrap">
              <TextAnimation
                text="Ready to"
                variant="wordUp"
                delay={0.3}
                duration={0.6}
                staggerDuration={0.08}
                trigger={isFooterVisible}
                className="text-3xl md:text-5xl lg:text-6xl font-medium mb-2 md:mb-4 justify-center"
              />
              <TextAnimation
                text="collaborate?"
                variant="wordUp"
                delay={0.5}
                duration={0.6}
                trigger={isFooterVisible}
                className="text-3xl md:text-5xl lg:text-6xl font-medium mb-2 md:mb-4 justify-center"
              />
            </div>
            <TextAnimation
              text="Let's drop your ideas here"
              variant="allUp"
              delay={1}
              trigger={isFooterVisible}
              className="text-lg md:text-xl font-medium mb-2 md:mb-4 justify-center"
            />

            <a
              href="mailto:divygupta208@gmail.com"
              className="text-2xl md:text-4xl font-bold underline underline-offset-8 mt-4 md:mt-6 block hover:text-blue-400 transition-colors"
            >
              <TextAnimation
                text="Mail Me"
                variant="allUp"
                delay={1}
                trigger={isFooterVisible}
                className="text-2xl md:text-3xl font-medium mb-4 justify-center"
              />
            </a>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 md:gap-16 mb-20 md:mb-20">
            {["Works", "About me", "Insight", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-base md:text-lg font-bold p-3 md:p-5 hover:text-zinc-400 transition-colors uppercase tracking-widest"
              >
                <TextAnimation
                  text={link}
                  variant="allUp"
                  delay={1}
                  trigger={isFooterVisible}
                  className="text-sm md:text-xl font-medium mb-4 justify-center"
                />
              </a>
            ))}
          </nav>

          {/* Footer Bottom Info */}
          <div className="absolute bottom-6 md:bottom-10 w-full px-6 md:px-10 flex flex-col md:flex-row justify-between items-center text-zinc-500 text-xs font-bold uppercase tracking-widest gap-4 md:gap-0">

            <TextAnimation
              text={`©${currentYear} - All rights reserved`}
              variant="allUp"
              delay={1}
              trigger={isFooterVisible}
              className="text-xs md:text-sm font-medium justify-center"
            />
            <button
              onClick={scrollToTop}
              className="flex items-center justify-center gap-2 group hover:text-white transition-colors"
            >
              <TextAnimation
                text="Back To Top"
                variant="allUp"
                delay={1}
                trigger={isFooterVisible}
                className="text-xs md:text-sm font-medium justify-center"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;