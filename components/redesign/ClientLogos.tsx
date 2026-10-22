import Image from "next/image";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import SectionLabel from "./SectionLabel";

export default function ClientLogos({ projects }: { projects: typeof previews }) {
  const track = [...projects, ...projects, ...projects];
  const logo = (project: (typeof projects)[number], hidden: boolean, key: string) => (
    <a
      key={key}
      href={project.website}
      target="_blank"
      rel="noreferrer"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className="flex min-h-24 w-56 shrink-0 items-center justify-center"
      aria-label={hidden ? undefined : `Visit ${project.title}`}
    >
      <Image src={project.logo} alt={hidden ? "" : project.title} width={160} height={64} className="h-16 w-auto max-w-40 object-contain" />
    </a>
  );
  return (
    <section className="px-gutter pb-section">
      <div className="mx-auto max-w-studio space-y-10 border-t border-studio-line pt-8">
        <SectionLabel>Brands we’ve worked with</SectionLabel>
        <div data-motion="fade" className="relative overflow-hidden">
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {track.map((project, index) => logo(project, index >= projects.length, `a-${index}`))}
            {track.map((project, index) => logo(project, true, `b-${index}`))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-studio-bg to-transparent" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-studio-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
