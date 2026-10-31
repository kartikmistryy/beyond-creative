import { animate, scroll } from "framer-motion";

/** Frames marked [data-motion-grow] open from an inset window to full bleed as the page scrolls past them. */
export default function createGrowMotion(root: HTMLElement) {
  const cleanups = Array.from(root.querySelectorAll<HTMLElement>("[data-motion-grow]")).map((frame) => {
    const animation = animate(
      frame,
      { clipPath: ["inset(8% 22% 8% 22% round 24px)", "inset(0% 0% 0% 0% round 0px)"] },
      { ease: "linear" },
    );
    const stop = scroll(animation, { target: frame, offset: ["start start", "center start"] });
    return () => {
      stop();
      animation.cancel();
      frame.style.removeProperty("clip-path");
    };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
