import { scroll } from "framer-motion";

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/** Pins the whole setup section (heading and staircase) for one viewport and fills each step from the bottom, in order, as you scroll. */
export default function createStackMotion(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>("[data-stair-track]");
  // ponytail: desktop is checked once on load; resizing across the breakpoint keeps the first state until reload.
  if (!track || !matchMedia("(min-width: 64rem)").matches) return () => {};
  const spacer = track.querySelector<HTMLElement>("[data-stair-spacer]");
  const steps = [...track.querySelectorAll<HTMLElement>("[data-stair-step]")].map((step) => ({
    fill: step.querySelector<HTMLElement>("[data-stair-fill]")!,
    edge: step.querySelector<HTMLElement>("[data-stair-edge]")!,
    ink: step.querySelector<HTMLElement>("[data-stair-ink]")!,
    ghost: step.querySelector<HTMLElement>("[data-stair-ghost]")!,
  }));
  spacer?.classList.remove("hidden");
  const stop = scroll(
    (progress: number) =>
      steps.forEach(({ fill, edge, ink, ghost }, index) => {
        const filled = clamp(progress * steps.length - index);
        // The copy sits near the top of each step, so it switches colour once the fill has nearly reached it.
        const passed = clamp((filled - 0.7) / 0.3);
        fill.style.transform = `scaleY(${filled})`;
        edge.style.transform = `translateY(${(1 - filled) * 100}%)`;
        edge.style.opacity = filled > 0 && filled < 1 ? "1" : "0";
        ink.style.opacity = String(passed);
        ghost.style.opacity = String(0.4 * (1 - passed));
      }),
    { target: track, offset: ["start start", "end end"] },
  );
  return () => {
    stop();
    spacer?.classList.add("hidden");
    steps.forEach((step) => Object.values(step).forEach((element) => element.removeAttribute("style")));
  };
}
