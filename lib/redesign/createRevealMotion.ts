import { animate, inView, stagger } from "framer-motion";
import motion from "./data/motion.data";

export default function createRevealMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  const compact = matchMedia("(max-width: 767px)").matches;
  const targets = root.querySelectorAll<HTMLElement>("h1, h2, [data-motion]");
  targets.forEach((element) => {
    const kind = element.dataset.motion;
    if (kind === "hero-image") return;
    const heading = element.matches("h1, h2");
    const preset = motion.presets[
      heading ? "heading" : kind === "image" ? "image" : kind === "row" ? "row" : kind === "fade" ? "fade" : "rise"
    ];
    const lines = heading ? Array.from(element.querySelectorAll<HTMLElement>(":scope > span")) : [];
    const items = lines.length ? lines : kind === "stagger" ? Array.from(element.children) : [element];
    if (!items.length) return;
    const originals = items.map((item) => item.getAttribute("style"));
    let active: ReturnType<typeof animate> | undefined;
    let started = false;
    const reveal = () => {
      if (started) return;
      started = true;
      element.dataset.motionState = "visible";
      active = animate(items, preset.to, {
        ...motion.reveal,
        duration: compact ? 0.7 : heading || kind === "image" ? 1.2 : 0.85,
        delay: stagger(heading ? 0.14 : 0.09),
      });
    };
    // Content stays visible in server HTML; only hydrated, observed elements are prepared.
    if (element.getBoundingClientRect().bottom > 0) {
      animate(items, preset.from, { duration: 0 }).complete();
      element.dataset.motionState = "pending";
      cleanups.push(inView(element, reveal, { margin: "0px 0px -5% 0px" }));
    }
    const onFocus = () => {
      reveal();
      active?.complete();
    };
    element.addEventListener("focusin", onFocus);
    cleanups.push(() => {
      element.removeEventListener("focusin", onFocus);
      active?.cancel();
      items.forEach((item, index) => {
        const original = originals[index];
        if (original === null) item.removeAttribute("style");
        else item.setAttribute("style", original);
      });
      delete element.dataset.motionState;
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
