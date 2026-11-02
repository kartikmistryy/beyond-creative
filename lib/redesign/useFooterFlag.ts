"use client";

import { useEffect } from "react";

/** Flags the page once the main content scrolls clear of the menu button, so the orange button can turn black over the orange footer. */
export default function useFooterFlag() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) delete root.dataset.footerVisible;
        else root.dataset.footerVisible = "true";
      },
      { rootMargin: "-90px 0px 0px 0px" },
    );
    observer.observe(main);
    return () => {
      observer.disconnect();
      delete root.dataset.footerVisible;
    };
  }, []);
}
