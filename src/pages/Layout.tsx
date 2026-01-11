import React from "react";
import { Outlet } from "react-router-dom";

import { useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import Header from "../components/layout/Header";

const Layout: React.FC = () => {
  const mode = useAppSelector((state) => state.theme.mode);

  // Sync theme class globally
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col bg-main-bg text-main-text transition-colors duration-500">
      {/* 1. Header (Fixed/Floating) */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Outlet renders the child routes (Home, Works, About, etc.) */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
