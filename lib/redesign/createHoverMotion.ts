import { animate, hover } from "framer-motion";
import motion from "./data/motion.data";

const nudge = (direction: string | undefined, active: boolean) => {
  const offsets: Record<string, number[]> = { down: [0, 4], "down-right": [4, 4], right: [5, 0] };
  const [x, y] = offsets[direction ?? ""] ?? [5, -5];
  return active ? { x, y } : { x: 0, y: 0 };
};

export default function createHoverMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>("[data-motion-hover]").forEach((element) => {
    const image = element.querySelector<HTMLElement>("[data-motion-zoom]");
    const arrow = element.querySelector<HTMLElement | SVGElement>("[data-motion-arrow]");
    const targets = [image, arrow].filter((item): item is HTMLElement | SVGElement => Boolean(item));
    const originals = targets.map((target) => target.getAttribute("style"));
    const animations = new Map<HTMLElement | SVGElement, ReturnType<typeof animate>>();
    const run = (target: HTMLElement | SVGElement, active: boolean, isImage: boolean) => {
      animations.get(target)?.stop();
      animations.set(target, animate(target,
        isImage ? { scale: active ? 1.07 : 1 } : nudge(target.dataset.motionArrow, active),
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
