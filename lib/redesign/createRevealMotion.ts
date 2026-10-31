import { animate, inView, stagger } from "framer-motion";
import motion from "./data/motion.data";
import { isSiteReady, onSiteReady } from "./siteReady";

export default function createRevealMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  const compact = matchMedia("(max-width: 767px)").matches;
  const targets = root.querySelectorAll<HTMLElement>("h1, h2, [data-motion]");
  targets.forEach((element) => {
    const kind = element.dataset.motion;
    if (kind === "hero-image" || kind === "zigzag" || element.matches("[data-hero-title]")) return;
    // Captions inside project cards would be pushed out of the card's clipped frame by the heading
    // from-state, where the in-view trigger can never see them. The card itself carries the motion.
    if (!kind && element.closest('[data-motion-hover="project"]')) return;
    const heading = element.matches("h1, h2");
    const named = kind && kind in motion.presets ? (kind as keyof typeof motion.presets) : "rise";
    const preset = motion.presets[heading ? "heading" : named];
    const lines = heading ? Array.from(element.querySelectorAll<HTMLElement>(":scope > span")) : [];
    const grouped = kind === "stagger";
    const items = lines.length ? lines : grouped ? Array.from(element.children) : [element];
    if (!items.length) return;
    const originals = items.map((item) => item.getAttribute("style"));
    let active: ReturnType<typeof animate> | undefined;
    let started = false;
    const reveal = () => {
      if (started) return;
      // Hold above-the-fold reveals until the preloader curtain starts lifting.
      if (!isSiteReady()) return void cleanups.push(onSiteReady(reveal));
      started = true;
      element.dataset.motionState = "visible";
      active = animate(items, preset.to, {
        ...motion.reveal,
        duration: compact ? 0.7 : heading || kind === "image" ? 1.2 : 0.85,
        delay: stagger(heading ? 0.18 : 0.14),
      });
    };
    // Content stays visible in server HTML; only hydrated, observed elements are prepared.
    if (element.getBoundingClientRect().bottom > 0) {
      animate(items, preset.from, { duration: 0 });
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
