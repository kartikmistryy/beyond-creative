import type { Project } from "@/lib/db";
import content from "@/lib/redesign/data/workPage.data";
import Eyebrow from "./Eyebrow";

export default function ProjectCmsDetails({ project }: { project: Project }) {
  const copy = content.project;
  const details = [
    { label: copy.client, value: project.client },
    { label: copy.year, value: project.year },
    { label: copy.services, value: project.roles.join(" · ") },
    ...project.credits.map((credit) => ({ label: credit.role, value: credit.name })),
    { label: copy.team, value: project.team.join(" · ") },
  ].filter((detail) => detail.value);
  return (
    <aside aria-label={copy.details} className="flex shrink-0 flex-col gap-10 self-start lg:sticky lg:top-7 lg:w-110">
      <div className="flex flex-col gap-3 border-b border-rule pb-7">
        <Eyebrow index="02">{copy.details}</Eyebrow>
        <h2 className="pt-4 text-project-title font-light tracking-tight">{project.title}</h2>
        {project.summary && <p className="text-lg leading-6.5 text-ash">{project.summary}</p>}
      </div>
      {details.length > 0 && (
        <dl className="flex flex-col gap-6 border-b border-rule pb-7">
          {details.map((detail, index) => (
            <div key={`${detail.label}-${index}`} className="flex flex-col gap-2.5">
              <dt className="text-label leading-4 text-ash uppercase">{detail.label}</dt>
              <dd className="text-base leading-6">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {project.description && (
        <div className="flex flex-col gap-3.5">
          <Eyebrow index="03">{copy.story}</Eyebrow>
          <p data-motion="rise" className="whitespace-pre-line text-lg leading-6.5">{project.description}</p>
        </div>
      )}
    </aside>
  );
}
