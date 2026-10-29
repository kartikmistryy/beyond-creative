import { animate, stagger } from "framer-motion";
import motion from "./data/motion.data";
import { onSiteReady } from "./siteReady";

/** Page hero title lines slide in from opposite edges once the preloader has cleared. */
export default function createHeroMotion(root: HTMLElement) {
  const lines = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-title] > span"));
  if (!lines.length) return () => {};
  let active: ReturnType<typeof animate> | undefined;
  // Each line is full width, so shifting by its own width parks it just past the screen edge.
  lines.forEach((line, index) => animate(line, { x: index % 2 ? "110%" : "-110%" }, { duration: 0 }));
  const stop = onSiteReady(() => {
    active = animate(lines, { x: "0%" }, { ...motion.reveal, duration: 1.1, delay: stagger(0.15) });
  });
  return () => {
    stop();
    active?.cancel();
    lines.forEach((line) => line.removeAttribute("style"));
  };
}
