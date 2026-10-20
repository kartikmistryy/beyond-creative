import type { DOMKeyframesDefinition, AnimationOptions } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const motion = {
  ease,
  reveal: { duration: 1.05, ease } satisfies AnimationOptions,
  hover: { duration: 0.55, ease } satisfies AnimationOptions,
  presets: {
    heading: {
      from: { opacity: 0, y: 64, clipPath: "inset(0% 0% 100% 0%)" },
      to: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
    },
    image: {
      from: { opacity: 0, y: 32, clipPath: "inset(0% 0% 100% 0%)" },
      to: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" },
    },
    rise: { from: { opacity: 0, y: 36 }, to: { opacity: 1, y: 0 } },
    row: { from: { opacity: 0, x: -32 }, to: { opacity: 1, x: 0 } },
    fade: { from: { opacity: 0 }, to: { opacity: 1 } },
  } satisfies Record<string, { from: DOMKeyframesDefinition; to: DOMKeyframesDefinition }>,
};
export default motion;
