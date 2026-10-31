import { type Variants } from "framer-motion";
import motion from "./motion.data";

// Paper "13 · Menu · Notes": wipe down ~500ms, links rise in 60ms apart, close reverses in ~350ms.
const open = { duration: 0.5, ease: motion.ease };
const close = { duration: 0.35, ease: motion.ease };

export const panelMotion: Variants = {
  closed: { scaleY: 0, transition: { ...close, delay: 0.1 } },
  open: { scaleY: 1, transition: open },
};

export const itemMotion: Variants = {
  closed: { opacity: 0, x: 48, transition: { duration: 0.2 } },
  open: (order: number) => ({ opacity: 1, x: 0, transition: { ...open, delay: 0.3 + order * 0.06 } }),
};

// Reduced motion: a plain fade with no wipe or stagger. Transforms are pinned at rest because
// useReducedMotion resolves after the first render, when the wipe/slide "closed" values were applied.
export const fadeMotion: Variants = {
  closed: { opacity: 0, x: 0, scaleY: 1, transition: { duration: 0.2 } },
  open: { opacity: 1, x: 0, scaleY: 1, transition: { duration: 0.2 } },
};
