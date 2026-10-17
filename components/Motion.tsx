"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Smooth inertial scroll + reveal-on-scroll for every [data-reveal] element. */
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    // Reveal anything whose top has entered the lower 88% of the viewport — including elements
    // already scrolled past (reload mid-page / anchor jumps), which IntersectionObserver would miss.
    let raf = 0;
    const check = () => {
      raf = 0;
      const line = innerHeight * 0.88;
      document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => {
        if (el.getBoundingClientRect().top < line) el.classList.add("in");
      });
    };
    const req = () => (raf ||= requestAnimationFrame(check));
    req();
    addEventListener("scroll", req, { passive: true });
    addEventListener("resize", req);
    return () => (removeEventListener("scroll", req), removeEventListener("resize", req), cancelAnimationFrame(raf));
  }, [path]);

  return null;
}
