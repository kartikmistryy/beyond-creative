import { animate, scroll } from "framer-motion";
import { onSiteReady } from "./siteReady";

const linear = (times: number[]) => ({ ease: "linear" as const, times });
// Scroll progress through the hero track: open the box, fade the orange to the showreel, then land the headline.
const OPEN = linear([0, 0.45, 1]);
const REVEAL = linear([0, 0.5, 0.7, 1]);

/**
 * Home hero: the orange box opens to full screen as the page scrolls through its track, then its orange fades
 * to show the showreel with the hero headline. Box insets are read once from the layout, so crossing a
 * breakpoint mid-visit keeps the old starting size until the next page load.
 */
export default function createHomeHeroMotion(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>("[data-home-hero]");
  const find = (name: string) => hero?.querySelector<HTMLElement>(`[data-home-${name}]`);
  const [box, fill, shade, logo, tagline, cue, title] = ["box", "fill", "shade", "logo", "tagline", "cue", "title"].map(find);
  if (!hero || !box || !fill || !shade || !logo || !tagline || !cue || !title) return () => {};

  const elements = [box, fill, shade, logo, tagline, cue, title];
  const originals = elements.map((element) => element.style.cssText);
  const { top, right, bottom, left } = getComputedStyle(box);

  let animations: ReturnType<typeof animate>[] = [];
  let stops: (() => void)[] = [];
  // Scrolling is locked behind the preloader; a scroll timeline created then resolves to its end state
  // (orange already gone), so link only once the page can scroll. CSS holds the opening state until then.
  const release = onSiteReady(() => {
    animations = [
      animate(box, { top: [top, "0px", "0px"], right: [right, "0px", "0px"], bottom: [bottom, "0px", "0px"], left: [left, "0px", "0px"] }, OPEN),
      animate(box, { color: ["#000", "#000", "#fff", "#fff"] }, REVEAL),
      animate(fill, { opacity: [1, 1, 0, 0] }, REVEAL),
      animate(shade, { opacity: [0, 0, 1, 1] }, REVEAL),
      animate(logo, { filter: ["brightness(0)", "brightness(0)", "brightness(1)", "brightness(1)"] }, REVEAL),
      animate(tagline, { opacity: [1, 1, 0, 0], y: [0, 0, -48, -48] }, linear([0, 0.2, 0.38, 1])),
      animate(cue, { opacity: [1, 0, 0] }, linear([0, 0.12, 1])),
      animate(title, { opacity: [0, 0, 1, 1], y: [48, 48, 0, 0] }, linear([0, 0.62, 0.85, 1])),
    ];
    stops = animations.map((animation) => scroll(animation, { target: hero, offset: ["start start", "end end"] }));
  });
  return () => {
    release();
    stops.forEach((stop) => stop());
    animations.forEach((animation) => animation.cancel());
    elements.forEach((element, index) => {
      element.style.cssText = originals[index];
    });
  };
}
