import React from "react";
import { Outlet, useBlocker } from "react-router-dom";
import { flushSync } from "react-dom";
import { useAppSelector } from "../store/hooks";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CustomCursor from "../components/ui/CustomCursor";

const Layout: React.FC = () => {
  const mode = useAppSelector((state) => state.theme.mode);

  // Blocker for handling browser back/forward (POP) navigations
  const blocker = useBlocker(
    ({ historyAction }: { historyAction: any }) => historyAction === "POP"
  );

  React.useEffect(() => {
    if (blocker.state === "blocked") {
      // For POP, wrap the navigation in a view transition
      if (!document.startViewTransition) {
        blocker.proceed();
        return;
      }

      const transition = document.startViewTransition(() => {
        flushSync(() => {
          blocker.proceed(); // Proceed with the navigation inside the transition
        });
      });

      transition.ready.then(() => {
        // Same wave direction as forward: Start from left side
        const x = 0;
        const y = window.innerHeight / 2;
        const endRadius = Math.hypot(window.innerWidth, window.innerHeight) * 1.2;

        // 1. Animate the Wave (Clip Path)
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 1200,
            easing: "cubic-bezier(0.76, 0, 0.24, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );

        // 2. Animate the Fade-In of the new content
        document.documentElement.animate(
          {
            opacity: [0, 1],
            filter: ["blur(10px)", "blur(0px)"],
          },
          {
            duration: 800,
            delay: 200,
            easing: "ease-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    }
  }, [blocker]);

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
        <main className="grow pt-32 pb-20 max-w-7xl mx-auto min-h-screen">
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