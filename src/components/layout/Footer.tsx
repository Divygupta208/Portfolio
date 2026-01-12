

import TextAnimation from "../ui/TextAnimation";
import { Linkedin, Dribbble, Twitter, Instagram, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
      className="fixed bottom-0 left-0 right-0 bg-[black] dark:bg-slate-950 p-4 md:p-6 z-0 flex justify-center"
      style={{ height: '600px' }} 
    >
      {/* CONTAINER: This centers the content. 
         w-full and max-w-7xl ensures it matches your Layout's content width.
      */}
      <div className="w-full max-w-6xl h-full flex flex-col gap-4 px-10">
        
        {/* Main Content Card */}
        <div className="flex-grow bg-black rounded-[40px] text-white flex flex-col items-center justify-center relative overflow-hidden px-6">
          <div className="text-center mb-12 flex flex-col items-center">
            <div className="flex flex-row gap-3 justify-center items-center flex-wrap">
            <TextAnimation 
              text="Ready to"
              variant="wordUp"
              delay={0.5}
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 justify-center"
            />
            <TextAnimation 
              text="collaborate?"
              variant="wordUp"
              delay={0.75}
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-4 justify-center"
            />
            </div>
            <p className="text-zinc-400 text-lg md:text-xl font-medium">
              Let's drop your ideas here
            </p>
            <a 
              href="mailto:amrdn.lab@gmail.com" 
              className="text-2xl md:text-4xl font-bold underline underline-offset-8 mt-6 block hover:text-blue-400 transition-colors"
            >
              divygupta208@gmail.com
            </a>
          </div>

          <nav className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20">
            {["Works", "About me", "Insight", "Contact"].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="text-lg font-bold p-5 hover:text-zinc-400 transition-colors uppercase tracking-widest text-sm"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Footer Bottom Info */}
          <div className="absolute bottom-10 w-full px-10 flex justify-between items-center text-zinc-500 text-xs font-bold uppercase tracking-widest">
            <p>©{currentYear} - All rights reserved</p>
            <button 
              onClick={scrollToTop} 
              className="flex items-center gap-2 group hover:text-white transition-colors"
            >
              Back to Top
              <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowUp size={14} />
              </div>
            </button>
          </div>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;