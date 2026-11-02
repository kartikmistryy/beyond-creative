const panel = "absolute bg-studio-orange";

/** Four orange bands framing a window onto the showreel; each slides off its own edge as the hero opens. */
export default function HomeHeroFrame() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-10 motion-reduce:hidden">
      <div data-home-panel="top" className={`${panel} inset-x-0 top-0 h-32 md:h-1/6`} />
      <div data-home-panel="bottom" className={`${panel} inset-x-0 bottom-0 h-24 md:h-1/6`} />
      <div data-home-panel="left" className={`${panel} inset-y-0 left-0 w-4 md:w-1/4`} />
      <div data-home-panel="right" className={`${panel} inset-y-0 right-0 w-4 md:w-1/4`} />
    </div>
  );
}
