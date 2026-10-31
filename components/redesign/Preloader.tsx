"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import preloader from "@/lib/redesign/data/preloader.data";
import usePreloader from "@/lib/redesign/usePreloader";

const star = "M80 5 C86 62 118 88 245 95 C118 102 86 128 80 185 C74 128 42 102 0 95 C42 88 74 62 80 5 Z";

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
            className="fixed inset-0 z-100 flex items-center justify-center bg-black text-studio-text"
          >
            <span className="sr-only">{preloader.status}</span>
            <motion.div
              aria-hidden="true"
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: preloader.ease }}
              className="relative w-32 md:w-44"
            >
              <svg viewBox="0 0 245 190" className="w-full fill-studio-line">
                <path d={star} />
              </svg>
              <motion.svg
                viewBox="0 0 245 190"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: `inset(${100 - percent}% 0% 0% 0%)` }}
                transition={{ duration: 0.2, ease: "linear" }}
                className="absolute inset-0 w-full fill-studio-orange"
              >
                <path d={star} />
              </motion.svg>
            </motion.div>
            <motion.span
              aria-hidden="true"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-gutter font-studio-mono text-label tabular-nums"
            >
              {String(percent).padStart(3, "0")}%
            </motion.span>
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
