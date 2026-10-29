import type about from "@/lib/redesign/data/about.data";
import Eyebrow from "./Eyebrow";
import HeroReel from "./HeroReel";

const cornerMarks = (
  <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
    <span>+</span>
    <span>+</span>
  </div>
);

export default function AboutHero({ content, stills }: { content: typeof about.hero; stills: readonly { src: string }[] }) {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end gap-16 overflow-clip bg-black px-7 pt-36 pb-20 font-body font-normal text-white lg:gap-30 lg:pt-47">
      <HeroReel stills={stills} label={content.reel} />
      <div className="relative flex flex-col gap-4.5">
        {cornerMarks}
        <h1 data-hero-title="" className="overflow-x-clip font-display text-about-hero text-studio-orange uppercase">
          <span className="block">{content.title[0]}</span>
          <span className="block md:pl-about-indent">{content.title[1]}</span>
        </h1>
        {cornerMarks}
      </div>
      <div className="relative flex flex-col-reverse gap-10 md:flex-row md:items-end md:justify-between">
        <Eyebrow index="01">{content.label}</Eyebrow>
        <p data-motion="fade" className="text-about-lede font-light tracking-tight md:w-130 md:shrink-0">
          {content.intro}
        </p>
      </div>
    </section>
  );
}
