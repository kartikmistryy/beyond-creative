"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import useVoiceAgent from "@/lib/redesign/useVoiceAgent";
import useBotLook from "@/lib/redesign/useBotLook";

export default function BotOrb() {
  const { status, isOpen, open } = useVoiceAgent();
  const still = useReducedMotion() ?? false;
  const live = status === "ready" && !still;
  const body = useRef<HTMLDivElement>(null);
  const shine = useRef<HTMLSpanElement>(null);
  useBotLook(body, shine, !still);
  return (
    <div className="relative size-55 shrink-0 perspective-distant">
      {live &&
        [0, 1, 2].map((ring) => (
          <motion.span
            key={`${ring}-${isOpen}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-studio-orange"
            initial={{ scale: 1, opacity: 0.45 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: isOpen ? 1.4 : 3.2, delay: ring * (isOpen ? 0.45 : 1.05), repeat: Infinity, ease: "easeOut" }}
          />
        ))}
      <div ref={body} className="relative size-full">
        <motion.button
          type="button"
          onClick={open}
          disabled={status !== "ready"}
          aria-label={status === "error" ? "Voice demo unavailable" : "Talk to the AI receptionist"}
          className="relative size-full overflow-hidden rounded-full bg-studio-orange transition-opacity focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-white disabled:cursor-wait disabled:opacity-40"
          animate={live ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: isOpen ? 1.6 : 4, repeat: live ? Infinity : 0, ease: "easeInOut" }}
          whileHover={live ? { scale: 1.05 } : undefined}
          whileTap={live ? { scale: 0.96 } : undefined}
        >
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-linear-to-br from-transparent via-transparent to-black/60" />
          <span ref={shine} aria-hidden="true" className="absolute top-6 left-8 size-24 rounded-full bg-white/40 blur-2xl" />
        </motion.button>
      </div>
    </div>
  );
}
