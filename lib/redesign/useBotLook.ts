"use client";

import { animate } from "framer-motion";
import { useEffect, type RefObject } from "react";

type Target = RefObject<HTMLElement | null>;
const spring = { type: "spring", stiffness: 120, damping: 18 } as const;
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** Floats the orb, keeps its eyes on the pointer and blinks them, like the floating voice button. */
export default function useBotLook(frame: Target, eyes: Target, enabled: boolean) {
  useEffect(() => {
    const [frameElement, eyesElement] = [frame.current, eyes.current];
    if (!enabled || !frameElement || !eyesElement) return;
    const float = animate(frameElement, { y: [0, -12, 0] }, { duration: 5, repeat: Infinity, ease: "easeInOut" });
    const blink = animate(eyesElement, { scaleY: [1, 1, 0.1, 1] }, { duration: 4.6, times: [0, 0.92, 0.96, 1], repeat: Infinity });
    const look = (event: PointerEvent) => {
      const box = frameElement.getBoundingClientRect();
      const x = clamp(((event.clientX - box.left - box.width / 2) / innerWidth) * 2.5);
      const y = clamp(((event.clientY - box.top - box.height / 2) / innerHeight) * 2.5);
      animate(eyesElement, { x: x * 28, y: y * 20 }, spring);
    };
    window.addEventListener("pointermove", look);
    return () => {
      window.removeEventListener("pointermove", look);
      float.stop();
      blink.stop();
      [frameElement, eyesElement].forEach((element) => element.removeAttribute("style"));
    };
  }, [frame, eyes, enabled]);
}
