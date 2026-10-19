import type previews from "@/lib/redesign/data/projectPreviews.data";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({
  projects,
  editorial = false,
}: {
  projects: readonly (typeof previews)[number][];
  editorial?: boolean;
}) {
  if (!editorial)
    return (
      <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} eager={index === 0} />
        ))}
      </div>
    );
  return (
    <div className="grid gap-x-12 gap-y-16 md:grid-cols-12">
      {projects.map((project, index) => (
        <div
          key={project.slug}
          className={
            index % 4 === 0
              ? "md:col-span-7"
              : index % 4 === 1
                ? "md:col-span-5 md:pt-28"
                : index % 4 === 2
                  ? "md:col-span-5"
                  : "md:col-span-7 md:pt-28"
          }
        >
          <ProjectCard project={project} editorial tall={index % 4 === 1 || index % 4 === 2} />
        </div>
      ))}
    </div>
  );
}
