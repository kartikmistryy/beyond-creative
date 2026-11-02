"use client";

import { useEffect, useState } from "react";

/**
 * Rolls a stack of words up one line on a timer: `sliding` runs the roll and `settle` lands it on the
 * next word once the roll has finished. Holds on the first word under reduced motion.
 */
export default function useWordSlot(count: number, interval: number) {
  const [active, setActive] = useState(0);
  const [sliding, setSliding] = useState(false);
  useEffect(() => {
    if (count < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setSliding(true), interval);
    return () => clearInterval(timer);
  }, [count, interval]);
  const settle = () => {
    setActive((index) => (index + 1) % count);
    setSliding(false);
  };
  return { active, sliding, settle };
}
