import type { ReactNode } from "react";
import content from "@/lib/redesign/data/workPage.data";
import Eyebrow from "./Eyebrow";

export default function ProjectHero({
  title,
  summary,
  children,
}: {
  title: string;
  summary: string;
  children: ReactNode;
}) {
  return (
    <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-black p-7 pt-35 font-body font-normal text-white md:min-h-0 md:h-225">
      <div className="absolute inset-0">{children}</div>
      <div className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent via-35% to-black/80" />
      <div className="relative flex flex-col gap-5">
        <Eyebrow index="01">{content.project.label}</Eyebrow>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h1 className="font-display text-project-hero wrap-break-word text-studio-orange uppercase">{title}</h1>
          {summary && (
            <p data-motion="rise" className="shrink-0 text-work-lede font-light md:pb-3.5">
              {summary}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
