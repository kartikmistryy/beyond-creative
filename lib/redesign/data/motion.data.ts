import type { DOMKeyframesDefinition, AnimationOptions } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const motion = {
  ease,
  reveal: { duration: 1.05, ease } satisfies AnimationOptions,
  hover: { duration: 0.55, ease } satisfies AnimationOptions,
  presets: {
    // Display lines sit on line-heights under 1, so the open mask overhangs the line box
    // to keep descenders and tight-tracked edges from being clipped.
    heading: {
      from: { opacity: 0, y: 120, clipPath: "inset(-10% -5% 110% -5%)" },
      to: { opacity: 1, y: 0, clipPath: "inset(-10% -5% -25% -5%)" },
    },
    image: {
      from: { opacity: 0, y: 64, scale: 1.15, clipPath: "inset(0% 0% 100% 0%)" },
      to: { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0%)" },
    },
    rise: { from: { opacity: 0, y: 80 }, to: { opacity: 1, y: 0 } },
    row: { from: { opacity: 0, x: -96 }, to: { opacity: 1, x: 0 } },
    fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  } satisfies Record<string, { from: DOMKeyframesDefinition; to: DOMKeyframesDefinition }>,
};
export default motion;
