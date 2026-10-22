"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { onSiteReady } from "./siteReady";

/** Inertial scrolling for the whole site. Held still until the preloader curtain lifts. */
export default function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -40 }, respectReducedMotion: true });
    lenis.stop();
    const release = onSiteReady(() => lenis.start());
    return () => {
      release();
      lenis.destroy();
    };
  }, []);
}
