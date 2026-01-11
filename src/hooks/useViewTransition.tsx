import { flushSync } from "react-dom";

export const useWaveTransition = () => {
  const startWave = (callback: () => void) => {
    // 1. Fallback for non-supporting browsers
    if (!document.startViewTransition) {
      callback();
      return;
    }

    // 2. Geometry: Consistent left-to-right arc
    const x = -window.innerWidth * 0.5;
    const y = window.innerHeight * 0.5;
    const endRadius = window.innerWidth * 2.5;

    // 3. Start the transition
    const transition = document.startViewTransition(() => {
      // We use flushSync to ensure the DOM updates
      // before the browser takes the 'New' snapshot
      flushSync(() => {
        callback();
      });
    });

    // 4. Animate the clipPath
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
          easing: "cubic-bezier(0.65, 0, 0.35, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return { startWave };
};
