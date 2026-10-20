import { animate, hover } from "framer-motion";
import motion from "./data/motion.data";

export default function createHoverMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>("[data-motion-hover]").forEach((element) => {
    const image = element.querySelector<HTMLElement>("[data-motion-zoom]");
    const arrow = element.querySelector<HTMLElement>("[data-motion-arrow]");
    const targets = [image, arrow].filter((item): item is HTMLElement => Boolean(item));
    const originals = targets.map((target) => target.getAttribute("style"));
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const run = (target: HTMLElement, active: boolean, isImage: boolean) => {
      animations.get(target)?.stop();
      animations.set(target, animate(target,
        isImage ? { scale: active ? 1.07 : 1 } : { x: active ? 5 : 0, y: active ? -5 : 0 },
        motion.hover,
      ));
    };
    const play = (active: boolean) => {
      if (image) run(image, active, true);
      if (arrow) run(arrow, active, false);
    };
    cleanups.push(hover(element, () => {
      play(true);
      return () => play(false);
    }));
    const onFocus = () => play(true);
    const onBlur = (event: FocusEvent) => {
      if (!(event.relatedTarget instanceof Node) || !element.contains(event.relatedTarget)) play(false);
    };
    element.addEventListener("focusin", onFocus);
    element.addEventListener("focusout", onBlur);
    cleanups.push(() => {
      element.removeEventListener("focusin", onFocus);
      element.removeEventListener("focusout", onBlur);
      animations.forEach((animation) => animation.cancel());
      targets.forEach((target, index) => {
        const original = originals[index];
        if (original === null) target.removeAttribute("style");
        else target.setAttribute("style", original);
      });
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
