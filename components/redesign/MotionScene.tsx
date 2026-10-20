"use client";

import type { ReactNode } from "react";
import useSiteMotion from "@/lib/redesign/useSiteMotion";

export default function MotionScene({ children }: { children: ReactNode }) {
  const root = useSiteMotion();
  return (
    <div ref={root}>
      <div data-scroll-progress="" aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-studio-orange" />
      {children}
    </div>
  );
}
