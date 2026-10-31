import Eyebrow from "./Eyebrow";
import HeroReel from "./HeroReel";
import type contact from "@/lib/redesign/data/contact.data";

function Marks() {
  return (
    <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
      <span>+</span>
      <span>+</span>
    </div>
  );
}

export default function ContactHero({ content, stills }: { content: typeof contact.hero; stills: readonly { src: string }[] }) {
  const [first, second] = content.titleLines;
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end gap-20 overflow-clip bg-black px-7 pt-36 pb-20 font-body font-normal text-white lg:gap-30 lg:pt-47">
      <HeroReel stills={stills} label={content.reel} />
      <div className="relative flex flex-col gap-4.5">
        <Marks />
        <h1 data-hero-title="" className="overflow-x-clip font-display text-contact-display text-studio-orange uppercase">
          <span className="block">{first}</span>
          <span className="block md:pl-contact-indent">{second}</span>
        </h1>
        <Marks />
      </div>
      <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Eyebrow index="01">{content.eyebrow}</Eyebrow>
        <p data-motion="rise" className="max-w-130 text-2xl leading-8 font-light tracking-tight md:text-3xl md:leading-9.5">
          {content.intro}
        </p>
      </div>
    </section>
  );
}
