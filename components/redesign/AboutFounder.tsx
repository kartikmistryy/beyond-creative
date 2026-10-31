import Image from "next/image";
import type about from "@/lib/redesign/data/about.data";
import Eyebrow from "./Eyebrow";
import Lines from "./Lines";

export default function AboutFounder({ content }: { content: typeof about.founder }) {
  return (
    <section className="flex flex-col gap-16 bg-black px-7 pb-40 font-body font-normal text-white lg:flex-row lg:gap-3">
      <figure className="flex flex-col lg:w-170 lg:shrink-0 lg:pb-11">
        <div data-motion="image" className="relative aspect-about-portrait overflow-hidden">
          <Image src={content.image} alt={content.alt} fill sizes="(min-width: 64rem) 680px, 100vw" className="object-cover object-top grayscale" />
        </div>
        <figcaption className="relative -mt-10 -ml-1 font-display text-about-name text-studio-orange uppercase lg:-mt-21">
          {content.name}
        </figcaption>
      </figure>
      <div className="flex grow basis-0 flex-col justify-between gap-16 py-1 lg:pl-10">
        <div className="flex justify-between">
          <Eyebrow index="03">{content.label}</Eyebrow>
          <span aria-hidden="true" className="text-xl leading-4 text-studio-orange">
            +
          </span>
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-label leading-4 tracking-wide uppercase">{content.role}</p>
          <h2 className="text-about-founder font-light tracking-tight">
            <Lines text={content.title} />
          </h2>
          <div className="flex flex-col gap-4 lg:w-135">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-6.5 text-ash">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
