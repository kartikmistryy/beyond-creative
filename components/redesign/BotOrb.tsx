"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";
import useBotLook from "@/lib/redesign/useBotLook";

const eye = "h-14 w-3 rounded-full bg-neutral-100 md:h-18 md:w-3.5";

/** Large twin of the floating voice button: a flat orange disc whose eyes follow the pointer and blink. */
export default function BotOrb() {
  const { status, isOpen, open } = useVoiceAgent();
  const still = useReducedMotion() ?? false;
  const live = status === "ready" && !still;
  const frame = useRef<HTMLDivElement>(null);
  const eyes = useRef<HTMLSpanElement>(null);
  useBotLook(frame, eyes, !still);
  return (
    <div ref={frame} className="relative size-56 shrink-0 md:size-72">
      {live && (
        <motion.span
          key={String(isOpen)}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-studio-orange/50"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 1.35, opacity: 0 }}
          transition={{ duration: isOpen ? 1.6 : 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <motion.button
        type="button"
        onClick={open}
        disabled={status !== "ready"}
        aria-label={status === "error" ? "Voice demo unavailable" : "Talk to the AI receptionist"}
        className="relative flex size-full items-center justify-center rounded-full bg-studio-orange shadow-2xl shadow-studio-orange/30 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black disabled:cursor-wait disabled:opacity-40"
        whileHover={live ? { scale: 1.04 } : undefined}
        whileTap={live ? { scale: 0.96 } : undefined}
      >
        <span ref={eyes} aria-hidden="true" className="flex gap-10 md:gap-11">
          <span className={eye} />
          <span className={eye} />
        </span>
      </motion.button>
    </div>
  );
}
