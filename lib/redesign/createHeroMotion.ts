import { animate, scroll } from "framer-motion";

export default function createHeroMotion(root: HTMLElement) {
  const image = root.querySelector<HTMLElement>('[data-motion="hero-image"]');
  const section = image?.closest("section");
  if (!image || !section || !matchMedia("(min-width: 768px)").matches) return () => {};
  const original = image.getAttribute("style");
  const animation = animate(image, { scale: [1.04, 1.16], y: [0, 80] }, { ease: "linear" });
  const stop = scroll(animation, { target: section, offset: ["start start", "end start"] });
  return () => {
    stop();
    animation.cancel();
    if (original === null) image.removeAttribute("style");
    else image.setAttribute("style", original);
  };
}
