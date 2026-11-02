import type about from "@/lib/redesign/data/about.data";
import HeroWords from "./HeroWords";

/** About hero (Paper A1): "Great [word]" rolling, the approved line and intro beside it. */
export default function AboutHero({ content }: { content: typeof about.hero }) {
  return (
    <section className="flex min-h-svh flex-col justify-center overflow-clip bg-black px-7 pt-36 pb-20 font-body font-normal text-white">
      {/* The faded words spill one line above and below the h1 (two from xl, beside the intro), so leave room before the stacked intro. */}
      <div className="flex flex-col gap-hero-spill xl:flex-row xl:items-center xl:justify-between xl:gap-12">
        {/* Each direct child slides in from a screen edge once the preloader clears (createHeroMotion). */}
        <h1
          data-hero-title=""
          className="flex items-center gap-2.5 font-display text-hero-slot whitespace-nowrap uppercase md:gap-9"
        >
          <span>
            <span className="sr-only">{content.title} </span>
            {content.lead}
            <span className="sr-only"> {content.words[0]}</span>
          </span>
          <HeroWords words={content.words} />
        </h1>
        <div className="flex shrink-0 flex-col gap-5 xl:items-end xl:text-right">
          <p aria-hidden="true" className="font-display text-4xl leading-none uppercase">
            {content.title}
          </p>
          <p data-motion="fade" className="text-xl leading-7 font-light md:w-80">
            {content.intro}
          </p>
        </div>
      </div>
    </section>
  );
}
