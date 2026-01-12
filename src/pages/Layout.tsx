import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/ui/CustomCursor";

const Layout: React.FC = () => {
  const mode = useAppSelector((state) => state.theme.mode);

 
  return (
    <>
      <CustomCursor />
      
      {/* The "Reveal" Wrapper 
        We use relative positioning and a high z-index here to cover the footer.
      */}
      <div className="relative flex flex-col items-center justify-center z-10 bg-main-bg mb-[600px] shadow-2xl rounded-b-[40px]">
        {/* Header (Fixed) */}
        <Header />

        {/* Main Content Area */}
        <main className="grow pt-28 pb-20 px-4 max-w-7xl mx-auto min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* The Stationary Footer 
        It sits at z-0, fixed to the bottom, waiting for the content above to move.
      */}
      <Footer />
    </>
  );
};

export default Layout;