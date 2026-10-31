"use client";

import { useInView } from "framer-motion";
import { useEffect, type RefObject } from "react";

/** Flags the page while the demo stage is on screen so the floating voice button can step aside. */
export default function useHideFloatingOrb(stage: RefObject<HTMLElement | null>) {
  const visible = useInView(stage, { amount: 0.25 });
  useEffect(() => {
    const root = document.documentElement;
    if (visible) root.dataset.demoVisible = "true";
    else delete root.dataset.demoVisible;
    return () => {
      delete root.dataset.demoVisible;
    };
  }, [visible]);
}
