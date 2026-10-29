import type about from "@/lib/redesign/data/about.data";
import Eyebrow from "./Eyebrow";

export default function AboutStory({ content }: { content: typeof about.story }) {
  return (
    <section className="flex flex-col justify-between gap-10 border-t border-rule bg-black px-7 py-35 font-body font-normal text-white lg:flex-row lg:gap-20">
      <Eyebrow index="02">{content.label}</Eyebrow>
      <div className="flex flex-col gap-12 lg:w-250 lg:shrink-0">
        <h2 className="text-about-story font-light tracking-tight">{content.title}</h2>
        <div className="flex flex-col gap-6 md:flex-row md:gap-10">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph} data-motion="fade" className="text-lg leading-6.5 text-ash md:flex-1">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
