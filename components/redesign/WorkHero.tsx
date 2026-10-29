import content from "@/lib/redesign/data/workPage.data";
import Eyebrow from "./Eyebrow";
import HeroReel from "./HeroReel";

function Marks() {
  return (
    <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
      <span>+</span>
      <span>+</span>
    </div>
  );
}

export default function WorkHero({ stills }: { stills: readonly { src: string }[] }) {
  const { title, label, intro, reel } = content.hero;
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end gap-20 overflow-clip bg-black px-7 pt-47 pb-20 font-body font-normal text-white md:gap-30">
      <HeroReel stills={stills} label={reel} />
      <div className="relative flex flex-col gap-4.5">
        <Marks />
        <h1 data-hero-title="" className="overflow-x-clip font-display text-work-hero text-studio-orange uppercase">
          <span className="block">{title[0]}</span>
          <span className="block pl-work-indent">{title[1]}</span>
        </h1>
        <Marks />
      </div>
      <div className="relative flex flex-col-reverse gap-10 md:flex-row md:items-end md:justify-between">
        <Eyebrow index="01">{label}</Eyebrow>
        <p data-motion="rise" className="max-w-130 text-work-lede font-light tracking-tight">
          {intro}
        </p>
      </div>
    </section>
  );
}
