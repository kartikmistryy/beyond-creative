"use client";

import { animate, type AnimationPlaybackControls } from "framer-motion";
import { useEffect, useState } from "react";
import preloader from "./data/preloader.data";
import { markSiteReady } from "./siteReady";
import waitForMedia from "./waitForMedia";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function usePreloader() {
  const [percent, setPercent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const started = performance.now();
    let shown = 0;
    let finished = false;
    let active: AnimationPlaybackControls | undefined;
    const tween = (to: number, duration: number, onComplete?: () => void) => {
      active?.stop();
      active = animate(shown, to, {
        duration,
        ease: "easeOut",
        onUpdate: (value) => {
          shown = value;
          setPercent(Math.round(value));
        },
        onComplete,
      });
    };
    const ramp = () =>
      tween(preloader.rampTo, Math.max(0.4, (preloader.minDuration - (performance.now() - started)) / 1000));
    ramp();
    const media = waitForMedia(document, (loaded, total) => {
      const real = Math.min(preloader.rampTo, Math.round((loaded / total) * 100));
      if (!finished && real > shown) tween(real, 0.4, ramp);
    });
    Promise.all([Promise.race([media, wait(preloader.timeout)]), wait(preloader.minDuration)]).then(() => {
      if (finished) return;
      finished = true;
      tween(100, 0.5, () => setDone(true));
    });
    return () => {
      finished = true;
      active?.stop();
    };
  }, []);

  // Reveals wait for the curtain to fully clear, so the hero headline animates in view.
  const finish = () => {
    document.body.classList.remove("overflow-hidden");
    markSiteReady();
  };
  return { percent, done, finish };
}
