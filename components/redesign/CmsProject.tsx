import Link from "next/link";
import type loadCmsProject from "@/lib/redesign/loadCmsProject";
import CmsMedia from "./CmsMedia";
import CmsGalleryBlock from "./CmsGalleryBlock";
import SectionLabel from "./SectionLabel";

export default function CmsProject({
  content,
}: {
  content: NonNullable<Awaited<ReturnType<typeof loadCmsProject>>>;
}) {
  const { project, next } = content;
  return (
    <article className="px-gutter pb-section pt-36">
      <div className="mx-auto grid max-w-studio gap-11 lg:grid-cols-12">
        <aside className="space-y-7 self-start lg:sticky lg:top-8 lg:col-span-3">
          <Link href="/projects" className="font-studio-mono text-label uppercase hover:text-studio-orange">
            ← All work
          </Link>
          <h1 className="text-4xl tracking-heading">{project.title}</h1>
          {project.client && <p className="text-xl">{project.client}</p>}
          {project.summary && <p className="text-copy text-studio-muted">{project.summary}</p>}
          {project.year && <SectionLabel>{project.year}</SectionLabel>}
          {project.roles.length > 0 && (
            <div className="space-y-3 border-t border-studio-line pt-6">
              <SectionLabel>Services</SectionLabel>
              <ul className="text-lg leading-7 text-studio-muted">
                {project.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
          )}
          {project.description && (
            <p className="whitespace-pre-line text-lg leading-7 text-studio-muted">{project.description}</p>
          )}
          {project.credits.length > 0 && (
            <dl className="space-y-4 border-t border-studio-line pt-6">
              {project.credits.map((credit, index) => (
                <div key={`${credit.role}-${index}`}>
                  <dt className="font-studio-mono text-label uppercase text-studio-muted">{credit.role}</dt>
                  <dd className="mt-1 text-lg">{credit.name}</dd>
                </div>
              ))}
            </dl>
          )}
          {project.team.length > 0 && (
            <div className="space-y-3">
              <SectionLabel>Team</SectionLabel>
              <ul className="text-lg text-studio-muted">
                {project.team.map((member) => (
                  <li key={member}>{member}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
        <div className="min-w-0 space-y-6 lg:col-span-9">
          <CmsMedia media={project.hero ?? project.cover} />
          {project.blocks.map((block) => (
            <CmsGalleryBlock key={block.id} block={block} />
          ))}
          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="mt-16 block space-y-6 border-t border-studio-line py-12"
            >
              <SectionLabel>Next project</SectionLabel>
              <h2 className="text-heading tracking-heading hover:text-studio-orange">{next.title} ↗</h2>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
