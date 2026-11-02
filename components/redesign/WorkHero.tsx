import content from "@/lib/redesign/data/workPage.data";
import type projectPreviews from "@/lib/redesign/data/projectPreviews.data";
import getHeroStills from "@/lib/redesign/getHeroStills";
import WorkHeroReel from "./WorkHeroReel";

/** Work hero (Paper W3): the headline bottom-left over a full-bleed reel of project stills. */
export default function WorkHero({ projects }: { projects: typeof projectPreviews }) {
  const { title, nowShowing } = content.hero;
  const stills = getHeroStills(projects);
  const reel = projects.map((project, index) => ({ title: project.title, services: project.services, src: stills[index].src }));
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-end gap-12 overflow-clip bg-black px-7 pt-36 pb-7 font-body font-normal text-white lg:flex-row lg:items-end lg:justify-between">
      {/* Each direct child slides in from a screen edge once the preloader clears (createHeroMotion). */}
      <h1 data-hero-title="" className="font-display text-work-hero uppercase">
        <span className="block">{title[0]}</span>
        <span className="block">{title[1]}</span>
      </h1>
      <WorkHeroReel label={nowShowing} projects={reel} />
    </section>
  );
}
