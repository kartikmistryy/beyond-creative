import type home from "@/lib/redesign/data/home.data";

const cornerMarks = (
  <div aria-hidden="true" className="flex justify-between text-xl leading-5 text-studio-orange">
    <span>+</span>
    <span>+</span>
  </div>
);

/** The hero headline over the showreel, revealed once the orange box has opened and faded away. */
export default function HomeHeroTitle({ content }: { content: typeof home.hero }) {
  return (
    <div data-home-title="" className="absolute inset-x-0 bottom-0 flex flex-col gap-4.5 p-7 text-white opacity-0 motion-reduce:opacity-100">
      {cornerMarks}
      <h1 className="overflow-x-clip font-display text-home-hero text-studio-orange uppercase">
        <span className="block">{content.title[0]}</span>{" "}
        <span className="block md:pl-home-hero-indent">{content.title[1]}</span>
      </h1>
      {cornerMarks}
      <p className="pt-2 text-center text-label leading-4 tracking-wide whitespace-pre-wrap">{content.label}</p>
    </div>
  );
}
