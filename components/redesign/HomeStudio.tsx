import type home from "@/lib/redesign/data/home.data";
import SectionLabel from "./SectionLabel";
import Words from "./Words";

export default function HomeStudio({ content }: { content: typeof home.studio }) {
  return (
    <section className="px-gutter pb-24 pt-section lg:pt-home-studio">
      <div className="mx-auto max-w-studio space-y-10">
        <SectionLabel>{content.label}</SectionLabel>
        <h2 className="text-section-title tracking-heading">
          <span className="block">{content.title[0]}</span>{" "}
          <span className="block text-studio-orange">{content.title[1]}</span>
        </h2>
        <div className="grid gap-8 pt-4 lg:grid-cols-3 lg:gap-18">
          <p data-motion="rise" className="whitespace-pre-line font-studio-mono text-label text-studio-muted">
            {content.signature}
          </p>
          <p data-motion="words" className="max-w-reading text-xl leading-8 text-studio-muted lg:col-span-2 lg:text-2xl">
            <Words text={content.body} />
          </p>
        </div>
      </div>
    </section>
  );
}
