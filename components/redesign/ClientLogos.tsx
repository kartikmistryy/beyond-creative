import Image from "next/image";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import SectionLabel from "./SectionLabel";

export default function ClientLogos({ projects }: { projects: typeof previews }) {
  return (
    <section className="px-gutter pb-section">
      <div className="mx-auto max-w-studio space-y-10 border-t border-studio-line pt-8">
        <SectionLabel>Brands we’ve worked with</SectionLabel>
        <div data-motion="stagger" className="grid grid-cols-2 items-center gap-10 md:grid-cols-4">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-24 items-center justify-center"
              aria-label={`Visit ${project.title}`}
            >
              <Image
                src={project.logo}
                alt={project.title}
                width={160}
                height={64}
                className="h-16 w-auto max-w-40 object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
