"use client";

import { useEffect, useState } from "react";

/** Steps through `count` items on a timer. Holds on the first one under reduced motion. */
export default function useCycle(count: number, interval: number) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (count < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setActive((index) => (index + 1) % count), interval);
    return () => clearInterval(timer);
  }, [count, interval]);
  return active;
}
