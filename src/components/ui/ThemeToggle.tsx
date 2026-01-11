import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleTheme } from "../../store/themeSlice";
import { useWaveTransition } from "../../hooks/useViewTransition";

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);
  const { startWave } = useWaveTransition(); // Use the hook

  const handleToggle = () => {
    // Pass the state change logic into the wave hook
    startWave(() => {
      dispatch(toggleTheme());
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
