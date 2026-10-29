import type home from "@/lib/redesign/data/home.data";
import HeroVideo from "./HeroVideo";

const cornerMarks = (
  <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
    <span>+</span>
    <span>+</span>
  </div>
);

export default function HomeHero({ content }: { content: typeof home.hero }) {
  return (
    <section className="relative bg-black font-body font-normal text-white">
      <div className="flex h-svh min-h-120 flex-col justify-end overflow-hidden p-7">
        <HeroVideo src={content.video} poster={content.image} />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 via-40% to-black/70" />
        <div className="relative flex flex-col gap-4.5">
          {cornerMarks}
          <h1 data-hero-title="" className="overflow-x-clip font-display text-home-hero text-studio-orange uppercase">
            <span className="block">{content.title[0]}</span>{" "}
            <span className="block md:pl-home-hero-indent">{content.title[1]}</span>
          </h1>
          {cornerMarks}
          <p data-motion="fade" className="pt-2 text-center text-label leading-4 tracking-wide whitespace-pre-wrap">
            {content.label}
          </p>
        </div>
      </div>
    </section>
  );
}
