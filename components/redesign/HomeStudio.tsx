import type home from "@/lib/redesign/data/home.data";
import Eyebrow from "./Eyebrow";
import PillLink from "./PillLink";

export default function HomeStudio({ content }: { content: typeof home.studio }) {
  return (
    <section aria-label={content.label} className="flex flex-col gap-16 bg-black px-7 pt-35 pb-40 font-body font-normal text-white">
      <Eyebrow index="01">{content.label}</Eyebrow>
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end lg:gap-20">
        <p data-motion="rise" className="max-w-240 text-home-lead font-light tracking-tight">
          {content.statement}
        </p>
        <div className="flex shrink-0 flex-col gap-6 lg:w-80">
          <p className="text-lg leading-6.5 text-ash">{content.body}</p>
          <PillLink href="/about" variant="outline">
            {content.action}
          </PillLink>
        </div>
      </div>
    </section>
  );
}
