import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface UseParallaxOptions {
    offset?: any; // Framer Motion offset type (e.g. ["start end", "end start"])
    distance?: number; // How far the element moves in pixels
    direction?: "up" | "down"; // Direction of movement relative to scroll
    stiffness?: number; // Spring stiffness
    damping?: number; // Spring damping
}

/**
 * A hook to easily add parallax effects to elements.
 * 
 * @param distance The distance in pixels the element should move during scroll
 * @param direction "up" moves against scroll (standard parallax), "down" moves with scroll
 * @returns { ref, y } - Attach `ref` to the container/element and `style={{ y }}` to the motion element
 */
export function useParallax({
    offset = ["start end", "end start"],
    distance = 100,
    direction = "up",
    stiffness = 150,
    damping = 30
}: UseParallaxOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: offset
    });

    // Calculate movement range
    // If direction is "up" (standard parallax), element moves from +distance to -distance as we scroll down
    // causing it to appear to move slower than the page.
    const start = direction === "up" ? distance : -distance;
    const end = direction === "up" ? -distance : distance;

    const rawY = useTransform(scrollYProgress, [0, 1], [start, end]);

    // Add spring physics for smoother movement
    const y = useSpring(rawY, {
        stiffness,
        damping,
        mass: 0.1
    });

    return { ref, y };
}
