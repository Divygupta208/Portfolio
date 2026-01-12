import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

export const useWaveTransition = () => {
  const navigate = useNavigate();

  const startWave = (to: string) => {
    if (!document.startViewTransition) {
      navigate(to);
      return;
    }

    // Geometry: Start from slightly off-screen left for a deeper sweep
    const x = 0;
    const y = window.innerHeight / 2;
    const endRadius = Math.hypot(window.innerWidth, window.innerHeight) * 1.2;

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        navigate(to);
      });
    });

    transition.ready.then(() => {
      // 1. Animate the Wave (Clip Path)
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 1200, // Slower for premium feel
          easing: "cubic-bezier(0.76, 0, 0.24, 1)", // Smooth "Quartic" easing
          pseudoElement: "::view-transition-new(root)",
        }
      );

      // 2. Animate the Fade-In of the new content
      document.documentElement.animate(
        {
          opacity: [0, 1],
          filter: ["blur(10px)", "blur(0px)"], // Optional: slight blur for softness
        },
        {
          duration: 800,
          delay: 200, // Wait slightly for wave to start
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return { startWave };
};
