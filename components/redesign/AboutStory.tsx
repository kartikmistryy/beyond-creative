import type about from "@/lib/redesign/data/about.data";
import SectionLabel from "./SectionLabel";
import Words from "./Words";

export default function AboutStory({ content }: { content: typeof about.story }) {
  return (
    <section id="studio" className="scroll-mt-12 px-gutter py-section">
      <div className="mx-auto max-w-studio space-y-12">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="max-w-6xl text-heading tracking-heading">{content.title}</h2>
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-18">
          <p data-motion="words" className="text-2xl leading-8 tracking-tight">
            <Words text={content.paragraphs[0]} />
          </p>
          <p data-motion="rise" className="max-w-reading text-xl leading-8 text-studio-muted lg:col-span-2 lg:text-copy">
            {content.paragraphs[1]}
          </p>
        </div>
      </div>
    </section>
  );
}
