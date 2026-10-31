import Image from "next/image";
import type loadPreviewProject from "@/lib/redesign/loadPreviewProject";
import content from "@/lib/redesign/data/workPage.data";
import ProjectHero from "./ProjectHero";
import ProjectSidebar from "./ProjectSidebar";
import NextProject from "./NextProject";

export default function PreviewProject({
  content: { project, next },
}: {
  content: NonNullable<ReturnType<typeof loadPreviewProject>>;
}) {
  const [hero, wide, tall] = project.gallery;
  return (
    <article>
      <ProjectHero title={project.title} summary={project.summary}>
        <Image src={hero.src} alt={hero.alt} fill loading="eager" fetchPriority="high" sizes="100vw" className="object-cover" />
      </ProjectHero>
      <div className="flex flex-col gap-10 bg-black px-7 pt-20 pb-40 font-body font-normal text-white lg:flex-row">
        <ProjectSidebar project={project} />
        <div className="flex min-w-0 grow flex-col gap-3">
          <div data-motion="image" className="relative aspect-4/3 overflow-hidden md:aspect-auto md:h-127.5">
            <Image src={wide.src} alt={wide.alt} fill sizes="(max-width: 1023px) 100vw, 65vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-3 md:h-160 md:flex-row">
            <div data-motion="image" className="relative aspect-3/4 overflow-hidden md:aspect-auto md:flex-1">
              <Image src={tall.src} alt={tall.alt} fill sizes="(max-width: 767px) 100vw, 32vw" className="object-cover" />
            </div>
            <div className="flex aspect-3/4 flex-col justify-between bg-studio-bg p-6 md:aspect-auto md:flex-1">
              <span aria-hidden="true" className="text-xl leading-5 text-studio-orange">+</span>
              <div className="relative size-45 self-center">
                <Image src={project.logo} alt={`${project.title} logo`} fill sizes="180px" className="object-contain" />
              </div>
              <p className="flex justify-between gap-4 text-label leading-4 text-ash uppercase">
                <span>{project.title}</span>
                <span>{content.project.mark}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <NextProject index="05" slug={next.slug} title={next.title} services={next.services} />
    </article>
  );
}
