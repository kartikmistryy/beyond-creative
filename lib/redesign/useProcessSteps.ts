"use client";

import { scroll } from "framer-motion";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type Mode = "pin" | "observe" | "click";

const queries = ["(min-width: 64rem)", "(prefers-reduced-motion: reduce)"];
// Matches the section's `lg:top-0` sticky offset.
const pinTop = 0;
// Scroll the last step stays open before the sticky panels release.
const endHold = 100;

function readMode(): Mode {
  const [desktop, reduced] = queries.map((query) => matchMedia(query).matches);
  if (reduced) return "click";
  return desktop ? "pin" : "observe";
}

function subscribe(onChange: () => void) {
  const lists = queries.map((query) => matchMedia(query));
  lists.forEach((list) => list.addEventListener("change", onChange));
  return () => lists.forEach((list) => list.removeEventListener("change", onChange));
}

/** Pinned scroll distance and the band each step before the last one gets; the last gets `endHold`. */
function bands(track: HTMLElement, count: number) {
  const sticky = track.firstElementChild as HTMLElement;
  const distance = track.offsetHeight - sticky.offsetHeight;
  return { distance, step: (distance - endHold) / (count - 1) };
}

/**
 * Picks the open "How we work" step. Desktop pins the panels and maps scroll progress to a step,
 * mobile opens the step crossing the middle of the viewport, reduced motion opens on click only.
 */
export default function useProcessSteps(count: number) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // A clicked step stays open while the page smooth-scrolls past the steps in between.
  const target = useRef<number | null>(null);
  const mode = useSyncExternalStore(subscribe, readMode, (): Mode => "click");

  useEffect(() => {
    const element = track.current;
    if (!element || mode === "click") return;
    if (mode === "pin") {
      let last = -1;
      const { distance, step } = bands(element, count);
      // Only commit state when the step changes, not on every scroll frame.
      const pick = (progress: number) => {
        const index = Math.min(count - 1, Math.floor((progress * distance) / step));
        if (target.current !== null) {
          if (index !== target.current) return;
          target.current = null;
        }
        if (index !== last) setActive((last = index));
      };
      // ponytail: bands are measured once per mode change; remeasure on resize if panel height drifts.
      const release = pinTop - distance;
      return scroll(pick, { target: element, offset: [`start ${pinTop}px`, `start ${release}px`] });
    }
    const items = [...element.querySelectorAll("li")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLLIElement));
        }),
      { rootMargin: "-50% 0px -50% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [mode, count]);

  // While pinned, a click scrolls to the middle of that step's scroll band so scroll and panel agree.
  const select = (index: number) => {
    const element = track.current;
    if (mode !== "pin" || !element) return setActive(index);
    const start = scrollY + element.getBoundingClientRect().top - pinTop;
    const { distance, step } = bands(element, count);
    target.current = index;
    setActive(index);
    setTimeout(() => (target.current = null), 1500);
    const offset = index < count - 1 ? (index + 0.5) * step : distance - endHold / 2;
    scrollTo({ top: start + offset, behavior: "smooth" });
  };

  return { track, active, pinned: mode === "pin", select };
}
