import type loadCmsProject from "@/lib/redesign/loadCmsProject";
import CmsMedia from "./CmsMedia";
import CmsGalleryBlock from "./CmsGalleryBlock";
import ProjectHero from "./ProjectHero";
import ProjectCmsDetails from "./ProjectCmsDetails";
import NextProject from "./NextProject";

export default function CmsProject({
  content,
}: {
  content: NonNullable<Awaited<ReturnType<typeof loadCmsProject>>>;
}) {
  const { project, next } = content;
  return (
    <article>
      <ProjectHero title={project.title} summary={project.summary}>
        <CmsMedia media={project.hero ?? project.cover} className="size-full object-cover" />
      </ProjectHero>
      <div className="flex flex-col gap-10 bg-black px-7 pt-20 pb-40 font-body font-normal text-white lg:flex-row">
        <ProjectCmsDetails project={project} />
        <div className="flex min-w-0 grow flex-col gap-3">
          {project.blocks.map((block) => (
            <CmsGalleryBlock key={block.id} block={block} />
          ))}
        </div>
      </div>
      {next && <NextProject index="04" slug={next.slug} title={next.title} services={next.roles} />}
    </article>
  );
}
