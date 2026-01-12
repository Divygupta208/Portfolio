import React from "react";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Layout: React.FC = () => {
  const mode = useAppSelector((state) => state.theme.mode);

  // Sync theme class globally
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "light");
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col bg-main-bg text-main-text transition-colors duration-500">
      {/* 1. Header (Fixed/Floating) */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="grow pt-28 pb-20 px-4 max-w-7xl mx-auto">
        {/* Outlet renders the child routes (Home, Works, About, etc.) */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
