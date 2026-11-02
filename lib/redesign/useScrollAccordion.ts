"use client";

import { animate } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { onSiteReady } from "./siteReady";

// Scroll a service stays fully open for, then the scroll its handover to the next one takes.
// ServicesAccordion's spacers add up to these: one `h-137.5` (rest + handover) per handover, plus `h-25`.
const rest = 100;
const handover = 450;
const segment = rest + handover;
// From lg up the image sits out of flow, so an open row is held at 28px + 600px image + 40px.
const openRow = 668;
// Space kept between the open row and the edge of the screen.
const margin = 28;

type Row = { row: HTMLElement; parts: Record<string, HTMLElement>; closedTitle: number; openTitle: number; full: number };

const clamp = (value: number) => Math.min(Math.max(value, 0), 1);
const smooth = (t: number) => t * t * (3 - 2 * t);
const pageTop = (element: HTMLElement) => scrollY + element.getBoundingClientRect().top;

/**
 * Sets every scrubbed value for one row; `openness` runs from 0 (closed) to 1 (open).
 * Inline styles here are an agreed exception to the Tailwind-only rule: no class can carry a value
 * that changes with every pixel scrolled.
 */
function paint({ row, parts, closedTitle, openTitle }: Row, openness: number, wide: boolean) {
  parts.titles.style.height = `${closedTitle + (openTitle - closedTitle) * openness}px`;
  // Staggered so the two titles barely overlap: the closed one fades out before the open one fades in.
  parts.closed.style.opacity = `${1 - clamp(openness / 0.45)}`;
  parts.open.style.opacity = `${clamp((openness - 0.35) / 0.45)}`;
  parts.tags.style.opacity = `${1 - clamp(openness / 0.3)}`;
  for (const element of [parts.panel, parts.art]) {
    element.style.gridTemplateRows = `${openness}fr`;
    element.style.opacity = `${openness}`;
  }
  row.style.minHeight = wide ? `${openRow * openness}px` : "";
}

/**
 * Services open one at a time as the page scrolls past a pinned list. Each handover follows the scroll,
 * so it can stop half-way and runs backwards when scrolling up. Selecting a row scrolls to it.
 */
export default function useScrollAccordion() {
  const track = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const trackElement = track.current;
    const listElement = list.current;
    if (!trackElement || !listElement) return;
    const rows: Row[] = Array.from(listElement.children as HTMLCollectionOf<HTMLElement>, (row) => ({
      row,
      parts: Object.fromEntries(
        Array.from(row.querySelectorAll<HTMLElement>("[data-part]"), (part) => [part.dataset.part, part]),
      ),
      closedTitle: 0,
      openTitle: 0,
      full: 0,
    }));
    let wide = false;
    const focus = (row: Row) => Math.max(margin, Math.min(innerHeight * 0.3, innerHeight - row.full - margin));

    const update = () => {
      const travel = Math.min(Math.max(-trackElement.getBoundingClientRect().top, 0), (rows.length - 1) * segment);
      const index = Math.min(Math.floor(travel / segment), rows.length - 2);
      const progress = smooth(clamp((travel - index * segment - rest) / handover));
      rows.forEach((row, k) => paint(row, k === index ? 1 - progress : k === index + 1 ? progress : 0, wide));
      const [from, to] = [rows[index], rows[index + 1]];
      const shift = (row: Row) => focus(row) - row.row.offsetTop;
      listElement.style.transform = `translateY(${shift(from) + (shift(to) - shift(from)) * progress}px)`;
      setActive(progress > 0.5 ? index + 1 : index);
    };
    const measure = () => {
      wide = matchMedia("(min-width: 1024px)").matches;
      rows.forEach((row) => {
        row.closedTitle = row.parts.closed.offsetHeight;
        row.openTitle = row.parts.open.offsetHeight;
        paint(row, 1, wide);
      });
      rows.forEach((row) => (row.full = row.row.offsetHeight));
      update();
    };

    // Links such as /services#branding-design land on that service once the page has loaded
    // and the preloader has lifted, after the browser's own jump to the anchor.
    const linked = rows.findIndex(({ row }) => `#${row.id}` === location.hash);
    const land = () => {
      if (linked > 0 && document.readyState === "complete") scrollTo({ top: pageTop(trackElement) + linked * segment });
    };
    measure();
    document.fonts.ready.then(measure);
    const release = onSiteReady(land);
    addEventListener("load", land, { once: true });
    addEventListener("scroll", update, { passive: true });
    addEventListener("resize", measure);
    return () => {
      release();
      removeEventListener("load", land);
      removeEventListener("scroll", update);
      removeEventListener("resize", measure);
    };
  }, []);

  const select = (index: number) => {
    if (!track.current) return;
    // Driven frame by frame so the smooth scroll (Lenis) can't cut it short.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    animate(scrollY, pageTop(track.current) + index * segment, {
      duration: reduced ? 0 : 1.1,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (top) => scrollTo(0, top),
    });
  };

  return { track, list, active, select };
}
