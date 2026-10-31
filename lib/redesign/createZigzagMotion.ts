import { animate, inView } from "framer-motion";
import motion from "./data/motion.data";
import { isSiteReady, onSiteReady } from "./siteReady";

/** Zigzag list items slide in one by one from the side they sit on, echoing the hero title. */
export default function createZigzagMotion(root: HTMLElement) {
  const cleanups: (() => void)[] = [];
  root.querySelectorAll<HTMLElement>('[data-motion="zigzag"]').forEach((list) => {
    const items = Array.from(list.children) as HTMLElement[];
    const active: ReturnType<typeof animate>[] = [];
    items.forEach((item, index) => animate(item, { opacity: 0, x: index % 2 ? 96 : -96 }, { duration: 0 }));
    const reveal = () => {
      if (!isSiteReady()) return void cleanups.push(onSiteReady(reveal));
      items.forEach((item, index) =>
        active.push(animate(item, { opacity: 1, x: 0 }, { ...motion.reveal, duration: 0.9, delay: index * 0.16 })),
      );
    };
    cleanups.push(inView(list, reveal, { amount: 0.15 }), () => {
      active.forEach((animation) => animation.cancel());
      items.forEach((item) => item.removeAttribute("style"));
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
