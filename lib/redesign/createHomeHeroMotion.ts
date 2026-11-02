import { animate, scroll, type Easing } from "framer-motion";
import { onSiteReady } from "./siteReady";

const linear = (times: number[]) => ({ ease: "linear" as const, times });
// Opens fast and settles, so the first flick of scroll already shows more of the reel.
const OPEN = { ease: ["easeOut", "linear"] as Easing[], times: [0, 0.55, 1] };
const NAV = linear([0, 0.25, 0.4, 1]);
// Each band slides off its own edge by its own size, so the window grows evenly to full bleed.
const EXITS = { top: { y: "-100%" }, bottom: { y: "100%" }, left: { x: "-100%" }, right: { x: "100%" } } as const;

/**
 * Home hero: the orange frame around the showreel opens to full bleed as the page scrolls through its track,
 * then the hero headline lands. Only transforms, opacity and colour animate, so nothing re-lays out mid-scroll.
 */
export default function createHomeHeroMotion(root: HTMLElement) {
  const hero = root.querySelector<HTMLElement>("[data-home-hero]");
  const find = (name: string) => hero?.querySelector<HTMLElement>(`[data-home-${name}]`);
  const [box, logo, tagline, cue, title] = ["box", "logo", "tagline", "cue", "title"].map(find);
  const panels = [...(hero?.querySelectorAll<HTMLElement>("[data-home-panel]") ?? [])];
  if (!hero || !box || !logo || !tagline || !cue || !title || panels.length !== 4) return () => {};

  const elements = [box, logo, tagline, cue, title, ...panels];
  const originals = elements.map((element) => element.style.cssText);

  let animations: ReturnType<typeof animate>[] = [];
  let stops: (() => void)[] = [];
  // Scrolling is locked behind the preloader; a scroll timeline created then resolves to its end state
  // (frame already open), so link only once the page can scroll. CSS holds the opening state until then.
  const release = onSiteReady(() => {
    animations = [
      ...panels.map((panel) => {
        const [axis, to] = Object.entries(EXITS[panel.dataset.homePanel as keyof typeof EXITS])[0];
        return animate(panel, { [axis]: ["0%", to, to] }, OPEN);
      }),
      animate(box, { color: ["#000", "#000", "#fff", "#fff"] }, NAV),
      animate(logo, { filter: ["brightness(0)", "brightness(0)", "brightness(1)", "brightness(1)"] }, NAV),
      animate(tagline, { opacity: [1, 1, 0, 0], y: [0, 0, -48, -48] }, linear([0, 0.15, 0.35, 1])),
      animate(cue, { opacity: [1, 0, 0] }, linear([0, 0.12, 1])),
      animate(title, { opacity: [0, 0, 1, 1], y: [48, 48, 0, 0] }, linear([0, 0.55, 0.8, 1])),
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
