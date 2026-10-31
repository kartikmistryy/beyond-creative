import type home from "@/lib/redesign/data/home.data";
import HeroVideo from "./HeroVideo";
import HomeHeroBox from "./HomeHeroBox";

/** A tall scroll track that pins the showreel while the orange box over it opens to full screen. */
export default function HomeHero({ content }: { content: typeof home.hero }) {
  return (
    <section data-home-hero="" className="relative h-home-hero-track bg-black font-body font-normal motion-reduce:h-svh">
      <div className="sticky top-0 h-svh min-h-120 overflow-hidden text-white">
        <HeroVideo src={content.video} poster={content.image} />
        <HomeHeroBox content={content} />
      </div>
    </section>
  );
}
