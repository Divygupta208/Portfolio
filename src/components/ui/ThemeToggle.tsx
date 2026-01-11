import React from "react";
import { flushSync } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/themeSlice";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const handleToggle = () => {
    // 1. Fallback for non-supporting browsers
    if (!document.startViewTransition) {
      dispatch(toggleTheme());
      return;
    }

    // 2. Geometry: Anchor far left to create a shallow, sweeping arc
    const x = -window.innerWidth * 0.5;
    const y = window.innerHeight * 0.5;
    const endRadius = window.innerWidth * 2.5;

    // 3. Start the transition
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        dispatch(toggleTheme());
      });
    });

    // 4. Run the animation when the transition is ready
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 900,
          // This specific bezier is the "secret sauce" for smoothness
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="px-10 py-4 rounded-2xl font-bold bg-primary text-white shadow-xl active:scale-95 transition-transform"
    >
      {mode === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
