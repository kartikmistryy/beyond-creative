"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import preloader from "@/lib/redesign/data/preloader.data";
import usePreloader from "@/lib/redesign/usePreloader";

export default function Preloader() {
  const { percent, done, finish } = usePreloader();
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence onExitComplete={finish}>
        {!done && (
          <motion.div
            role="status"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: preloader.ease, delay: preloader.exitDelay }}
            className="fixed inset-0 z-100 flex flex-col justify-between bg-studio-bg px-gutter py-6 text-studio-text"
          >
            <span className="sr-only">{preloader.status}</span>
            <div aria-hidden="true" className="flex justify-between font-studio-mono text-xs uppercase">
              <span>{preloader.label}</span>
              <span>{preloader.location}</span>
            </div>
            <div aria-hidden="true" className="flex items-end justify-between overflow-hidden">
              <motion.span
                exit={{ y: "100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: preloader.ease }}
                className="block text-display tracking-display tabular-nums"
              >
                {String(percent).padStart(3, "0")}
              </motion.span>
              <span className="pb-4 font-studio-mono text-xs uppercase text-studio-muted">{preloader.status}</span>
            </div>
            <motion.div
              aria-hidden="true"
              animate={{ scaleX: percent / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-studio-orange"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
