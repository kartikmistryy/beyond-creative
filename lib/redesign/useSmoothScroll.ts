"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import { onSiteReady } from "./siteReady";

/** Inertial scrolling for the whole site. Held still until the preloader curtain lifts. */
export default function useSmoothScroll(pathname: string) {
  const lenis = useRef<Lenis | null>(null);
  useEffect(() => {
    const instance = new Lenis({ autoRaf: true, lerp: 0.09, anchors: { offset: -40 }, respectReducedMotion: true });
    lenis.current = instance;
    instance.stop();
    const release = onSiteReady(() => instance.start());
    return () => {
      release();
      instance.destroy();
      lenis.current = null;
    };
  }, []);

  // Lenis keeps its own scroll target, so a new page would otherwise inherit the old page's position.
  // Hash links (e.g. /services#branding-design) are left to scroll to their target.
  useEffect(() => {
    if (location.hash) return;
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);
}
