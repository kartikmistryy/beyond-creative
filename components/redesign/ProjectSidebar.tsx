import type previews from "@/lib/redesign/data/projectPreviews.data";
import content from "@/lib/redesign/data/workPage.data";
import Eyebrow from "./Eyebrow";

export default function ProjectSidebar({ project }: { project: (typeof previews)[number] }) {
  const copy = content.project;
  return (
    <aside aria-label={copy.details} className="flex shrink-0 flex-col gap-10 self-start lg:sticky lg:top-7 lg:w-110">
      <div className="flex flex-col gap-3 border-b border-rule pb-7">
        <Eyebrow index="02">{copy.details}</Eyebrow>
        <h2 className="pt-4 text-project-title font-light tracking-tight">{project.title}</h2>
        <p className="text-lg leading-6.5 text-ash">{project.summary}</p>
      </div>
      <dl className="flex flex-col gap-6 border-b border-rule pb-7">
        <div className="flex flex-col gap-2.5">
          <dt className="text-label leading-4 text-ash uppercase">{copy.services}</dt>
          <dd className="text-base leading-6">{project.services.join(" · ")}</dd>
        </div>
        <div className="flex flex-col gap-2.5">
          <dt className="text-label leading-4 text-ash uppercase">{copy.website}</dt>
          <dd className="text-base leading-6">
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 hover:text-studio-orange focus-visible:outline-2 focus-visible:outline-studio-orange"
            >
              {new URL(project.website).hostname}
              <span aria-hidden="true" className="text-studio-orange">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </dd>
        </div>
      </dl>
      <div className="flex flex-col gap-3.5 border-b border-rule pb-7">
        <Eyebrow index="03">{copy.story}</Eyebrow>
        <p data-motion="rise" className="text-lg leading-6.5">{project.description}</p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Eyebrow index="04">{copy.approach}</Eyebrow>
        <p data-motion="rise" className="text-lg leading-6.5 text-ash">{project.approach}</p>
      </div>
    </aside>
  );
}
