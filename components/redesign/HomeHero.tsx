import type home from "@/lib/redesign/data/home.data";
import HeroVideo from "./HeroVideo";
import HomeHeroBox from "./HomeHeroBox";
import HomeHeroFrame from "./HomeHeroFrame";

/** A tall scroll track that pins the showreel while the orange frame around it opens to full bleed. */
export default function HomeHero({ content }: { content: typeof home.hero }) {
  return (
    <section data-home-hero="" className="relative h-home-hero-track bg-black font-body font-normal motion-reduce:h-svh">
      <div className="sticky top-0 h-svh min-h-120 overflow-hidden text-white">
        <HeroVideo src={content.video} poster={content.image} />
        {/* Readability gradient for the taglines, headline and nav once they sit over the showreel. */}
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/10 via-40% to-black/70" />
        <HomeHeroFrame />
        <HomeHeroBox content={content} />
      </div>
    </section>
  );
}
