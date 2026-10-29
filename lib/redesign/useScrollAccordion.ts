"use client";

import { useEffect, useRef, useState } from "react";

// The row whose band this line (a share of the viewport height) has reached is the open one.
const anchor = 0.3;

/**
 * Band starts in page pixels. Each band is its row's closed height, so opening a row never moves
 * the bands after it: the newly opened row always lands on the anchor line and nothing cascades.
 */
function bandStarts(list: HTMLElement, closed: number[], count: number) {
  const known = closed.filter(Boolean);
  // Until the first row has been seen closed, assume it matches the shortest closed row.
  const fallback = known.length ? Math.min(...known) : 0;
  let edge = scrollY + list.getBoundingClientRect().top;
  return Array.from({ length: count }, (_, index) => {
    const start = edge;
    edge += closed[index] || fallback;
    return start;
  });
}

/** Opens one accordion row at a time as the page scrolls; selecting a row scrolls to its band. */
export default function useScrollAccordion(count: number) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const closed = useRef<number[]>([]);

  // Closed heights are re-read after every render; the open row keeps its last closed height.
  useEffect(() => {
    Array.from(list.current?.children ?? []).forEach((row, index) => {
      if (index !== active) closed.current[index] = (row as HTMLElement).offsetHeight;
    });
  });

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const update = () => {
      const line = scrollY + innerHeight * anchor;
      const starts = bandStarts(element, closed.current, count);
      setActive(starts.reduce((open, start, index) => (line >= start ? index : open), 0));
    };
    // Links such as /services#branding-design open that row instead of whatever the jump lands on.
    const linked = Array.from(element.children).findIndex((row) => `#${row.id}` === location.hash);
    if (linked > 0) scrollTo({ top: bandStarts(element, closed.current, count)[linked] - innerHeight * anchor + 1 });
    update();
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", update);
    return () => {
      removeEventListener("scroll", update);
      removeEventListener("resize", update);
    };
  }, [count]);

  const select = (index: number) => {
    if (!list.current) return;
    const start = bandStarts(list.current, closed.current, count)[index];
    scrollTo({ top: start - innerHeight * anchor + 1, behavior: "smooth" });
  };

  return { list, active, select };
}
