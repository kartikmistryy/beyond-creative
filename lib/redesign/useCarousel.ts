"use client";

import { useRef } from "react";

export default function useCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }
  return { ref, scroll };
}
