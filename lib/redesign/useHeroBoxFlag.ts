"use client";

import { useInView } from "framer-motion";
import { useEffect, type RefObject } from "react";

/** Flags the page while the home hero box is on screen, so the site header can hand its logo and menu to the box. */
export default function useHeroBoxFlag(box: RefObject<HTMLElement | null>) {
  const visible = useInView(box);
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.dataset.heroBoxVisible = "true";
    else delete root.dataset.heroBoxVisible;
    return () => {
      delete root.dataset.heroBoxVisible;
    };
  }, [visible]);
}
