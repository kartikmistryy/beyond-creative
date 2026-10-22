import Image from "next/image";
import type about from "@/lib/redesign/data/about.data";
import Lines from "./Lines";
import SectionLabel from "./SectionLabel";

export default function AboutFounder({ content }: { content: typeof about.founder }) {
  return (
    <section className="px-gutter pb-section">
      <div className="mx-auto max-w-studio space-y-12">
        <SectionLabel>{content.label}</SectionLabel>
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-18">
          <figure data-motion="image" className="lg:w-2/5 lg:shrink-0">
            <div className="mx-auto max-w-founder space-y-4">
              <Image
                src={content.image}
                alt="Temporary halftone avatar; Rishabh’s portrait will replace it"
                width={416}
                height={520}
                className="h-auto w-full"
              />
              <figcaption>
                <p className="text-3xl tracking-tight">{content.name}</p>
                <p className="mt-1 text-xl text-studio-muted">{content.role}</p>
              </figcaption>
            </div>
          </figure>
          <div className="flex-1 space-y-8">
            <h2 className="text-heading tracking-heading">
            <Lines text={content.title} />
          </h2>
            <p data-motion="rise" className="max-w-2xl whitespace-pre-line text-lg leading-8 text-studio-muted md:text-copy">
              {content.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
