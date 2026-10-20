import { animate, scroll } from "framer-motion";

export default function createScrollProgress(root: HTMLElement) {
  const line = root.querySelector<HTMLElement>("[data-scroll-progress]");
  if (!line) return () => {};
  const animation = animate(line, { scaleX: [0, 1] }, { ease: "linear" });
  const stop = scroll(animation);
  return () => {
    stop();
    animation.cancel();
    line.removeAttribute("style");
  };
}
