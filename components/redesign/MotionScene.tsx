"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import useSiteMotion from "@/lib/redesign/useSiteMotion";
import { isSiteReady } from "@/lib/redesign/siteReady";
import animation from "@/lib/redesign/data/motion.data";

export default function MotionScene({ children }: { children: ReactNode }) {
  const root = useSiteMotion();
  // Only client-side navigations animate in; the first load is revealed by the preloader instead.
  const [entering] = useState(() => typeof document !== "undefined" && isSiteReady());
  return (
    <motion.div
      ref={root}
      initial={entering ? { opacity: 0, y: 28 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: animation.ease }}
    >
      <div data-scroll-progress="" aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-studio-orange" />
      {children}
    </motion.div>
  );
}
