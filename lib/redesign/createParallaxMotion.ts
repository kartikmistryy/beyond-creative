import { animate, scroll } from "framer-motion";

/** Drifts the image inside each [data-motion-parallax] wrapper as it travels through the viewport. */
export default function createParallaxMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>("[data-motion-parallax]").forEach((wrapper) => {
    const image = wrapper.querySelector<HTMLElement>("img, video");
    if (!image) return;
    const original = image.getAttribute("style");
    const animation = animate(image, { y: ["-10%", "10%"] }, { ease: "linear" });
    const stop = scroll(animation, { target: wrapper, offset: ["start end", "end start"] });
    cleanups.push(() => {
      stop();
      animation.cancel();
      if (original === null) image.removeAttribute("style");
      else image.setAttribute("style", original);
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
