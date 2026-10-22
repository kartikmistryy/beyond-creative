"use client";

import { useLayoutEffect, useRef } from "react";
import createRevealMotion from "./createRevealMotion";
import createHoverMotion from "./createHoverMotion";
import createHeroMotion from "./createHeroMotion";
import createScrollProgress from "./createScrollProgress";
import createParallaxMotion from "./createParallaxMotion";

export default function useSiteMotion() {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let cleanups: (() => void)[] = [];
    const update = () => {
      cleanups.forEach((cleanup) => cleanup());
      cleanups = preference.matches
        ? []
        : [createRevealMotion(element), createHoverMotion(element), createHeroMotion(element), createScrollProgress(element), createParallaxMotion(element)];
      element.dataset.motionEnabled = String(!preference.matches);
    };
    update();
    preference.addEventListener("change", update);
    return () => {
      preference.removeEventListener("change", update);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);
  return root;
}
