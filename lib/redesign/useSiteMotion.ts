"use client";

import { useLayoutEffect, useRef } from "react";
import createRevealMotion from "./createRevealMotion";
import createHoverMotion from "./createHoverMotion";
import createHeroMotion from "./createHeroMotion";
import createZigzagMotion from "./createZigzagMotion";
import createScrollProgress from "./createScrollProgress";
import createParallaxMotion from "./createParallaxMotion";
import createStackMotion from "./createStackMotion";
import createGrowMotion from "./createGrowMotion";

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
        : [createRevealMotion(element), createHoverMotion(element), createHeroMotion(element), createZigzagMotion(element), createScrollProgress(element), createParallaxMotion(element), createStackMotion(element), createGrowMotion(element)];
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
