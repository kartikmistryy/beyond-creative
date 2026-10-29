import type automation from "@/lib/redesign/data/automation.data";
import Eyebrow from "./Eyebrow";
import HeroReel from "./HeroReel";

const cornerMarks = (
  <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
    <span>+</span>
    <span>+</span>
  </div>
);

export default function AutomationHero({ content, stills }: { content: typeof automation.hero; stills: readonly { src: string }[] }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end gap-20 overflow-clip bg-black px-7 pt-47 pb-20 font-body font-normal text-white lg:gap-30">
      <HeroReel stills={stills} label={content.reel} />
      <div className="relative flex flex-col gap-4.5">
        {cornerMarks}
        <h1 data-hero-title="" className="overflow-x-clip font-display text-automation-hero text-studio-orange uppercase">
          <span className="block">{content.title[0]}</span>{" "}
          <span className="block md:pl-15">{content.title[1]}</span>
        </h1>
        {cornerMarks}
      </div>
      <div className="relative flex flex-col-reverse justify-between gap-10 md:flex-row md:items-end">
        <Eyebrow index="01">{content.label}</Eyebrow>
        <p data-motion="rise" className="text-automation-lede font-light tracking-tight md:w-130">
          {content.intro}
        </p>
      </div>
    </section>
  );
}
