import Link from "next/link";
import type previews from "@/lib/redesign/data/projectPreviews.data";
import SectionLabel from "./SectionLabel";

export default function ProjectSidebar({
  project,
  index,
  total,
}: {
  project: (typeof previews)[number];
  index: number;
  total: number;
}) {
  return (
    <aside className="space-y-7 self-start lg:sticky lg:top-8 lg:col-span-3" aria-label="Project information">
      <Link
        href="/projects"
        className="inline-flex min-h-11 items-center font-studio-mono text-label uppercase hover:text-studio-orange"
      >
        ← All work
      </Link>
      <header className="space-y-4">
        <SectionLabel>
          Project {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </SectionLabel>
        <h1 className="text-4xl leading-tight tracking-heading xl:text-5xl">{project.title}</h1>
        <p className="text-copy text-studio-muted">{project.summary}</p>
      </header>
      <div className="space-y-3 border-t border-studio-line pt-6">
        <SectionLabel>Services</SectionLabel>
        <ul className="text-lg leading-7 text-studio-muted">
          {project.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-3">
        <SectionLabel>The project</SectionLabel>
        <p className="text-lg leading-7 text-studio-muted">{project.description}</p>
      </div>
      <div className="space-y-3">
        <SectionLabel>The approach</SectionLabel>
        <p className="text-lg leading-7 text-studio-muted">{project.approach}</p>
      </div>
      <div className="space-y-3 border-t border-studio-line pt-6">
        <SectionLabel>Creative & production</SectionLabel>
        <p className="text-lg">Beyond Creative</p>
      </div>
      <a
        href={project.website}
        target="_blank"
        rel="noreferrer"
        className="inline-flex min-h-11 items-center font-studio-mono text-label uppercase text-studio-orange hover:underline"
      >
        Visit client website ↗
      </a>
    </aside>
  );
}
