"use client";

import { animate } from "framer-motion";
import { useEffect, type RefObject } from "react";

type Target = RefObject<HTMLElement | null>;
const spring = { type: "spring", stiffness: 120, damping: 18 } as const;
const clamp = (value: number) => Math.max(-1, Math.min(1, value));

/** Floats the orb, tilts it toward the pointer and lets its highlight follow, so it reads as a lit 3D sphere. */
export default function useBotLook(body: Target, shine: Target, enabled: boolean) {
  useEffect(() => {
    const [bodyElement, shineElement] = [body.current, shine.current];
    if (!enabled || !bodyElement || !shineElement) return;
    const float = animate(bodyElement, { y: [0, -12, 0] }, { duration: 5, repeat: Infinity, ease: "easeInOut" });
    const look = (event: PointerEvent) => {
      const box = bodyElement.getBoundingClientRect();
      const x = clamp(((event.clientX - box.left - box.width / 2) / innerWidth) * 2.5);
      const y = clamp(((event.clientY - box.top - box.height / 2) / innerHeight) * 2.5);
      animate(bodyElement, { rotateY: x * 16, rotateX: -y * 16 }, spring);
      animate(shineElement, { x: -x * 22, y: -y * 22 }, spring);
    };
    window.addEventListener("pointermove", look);
    return () => {
      window.removeEventListener("pointermove", look);
      float.stop();
      [bodyElement, shineElement].forEach((element) => element.removeAttribute("style"));
    };
  }, [body, shine, enabled]);
}
