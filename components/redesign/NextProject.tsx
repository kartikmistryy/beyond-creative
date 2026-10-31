import Link from "next/link";
import content from "@/lib/redesign/data/workPage.data";
import Eyebrow from "./Eyebrow";

export default function NextProject({
  index,
  slug,
  title,
  services,
}: {
  index: string;
  slug: string;
  title: string;
  services: readonly string[];
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule bg-black px-7 pt-7 pb-30 font-body font-normal text-white">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between">
        <Eyebrow index={index}>{content.project.next}</Eyebrow>
        {services.length > 0 && (
          <p className="text-label leading-4 text-ash uppercase">{services.join(" · ")}</p>
        )}
      </div>
      <Link
        data-motion-hover="action"
        href={`/projects/${slug}`}
        className="group flex items-center justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-studio-orange"
      >
        <h2 className="min-w-0 font-display text-project-next wrap-break-word uppercase group-hover:text-studio-orange">
          {title}
        </h2>
        <span className="grid size-16 shrink-0 place-items-center rounded-full bg-studio-orange text-black md:size-30">
          <span aria-hidden="true" data-motion-arrow="right" className="text-3xl leading-none md:text-5xl">
            ⟶
          </span>
        </span>
      </Link>
    </section>
  );
}
