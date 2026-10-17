import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProject, listProjects, type Block } from "@/lib/db";
import { Media } from "@/components/Media";
import { WorkGrid } from "@/components/WorkGrid";
import { Arrow } from "@/components/Footer";

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const p = getProject({ slug: (await params).slug });
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const p = getProject({ slug: (await params).slug });
  if (!p) notFound();

  const all = listProjects();
  const i = all.findIndex((x) => x.id === p.id);
  const next = all[(i + 1) % all.length];
  const more = all.filter((x) => x.id !== p.id && x.id !== next.id).slice(0, 3);

  const details: [string, string[]][] = [
    ["Role", p.roles],
    ["Client", [p.client]],
    ["Team", p.team],
    ["Year", [p.year]],
    ["Discipline", p.tags],
  ];

  return (
    <article>
      {/* Hero */}
      <div data-theme="dark" className="relative h-[75svh] overflow-hidden bg-ink md:h-svh">
        <Media media={p.hero ?? p.cover} priority />
      </div>

      {/* Title / summary / description */}
      <section data-theme="light" className="wrap bg-paper pt-[clamp(80px,10vw,140px)] pb-16">
        <div className="grid12 gap-y-8">
          <Link href="/projects" className="t-3 link col-span-12 self-start md:col-span-6">← All work</Link>
          <div className="col-span-12 md:col-span-6">
            <p data-reveal className="t-2 serif mb-3">{p.client}</p>
            <h1 data-reveal className="t-xl uppercase">{p.title}</h1>
            {p.summary && (
              <p data-reveal className="t-1 mt-6">
                <span className="hl">{p.summary}</span>
              </p>
            )}
          </div>
        </div>

        {p.description && (
          <div className="grid12 mt-[clamp(60px,9vw,120px)] gap-y-6">
            <p className="t-3 col-span-12 md:col-span-6">Overview</p>
            <p data-reveal className="t-2 col-span-12 whitespace-pre-line md:col-span-6">{p.description}</p>
          </div>
        )}

        <dl className="mt-[clamp(60px,9vw,120px)] grid grid-cols-2 gap-x-3 gap-y-8 border-t border-line pt-6 md:grid-cols-5">
          {details.map(([k, v]) =>
            v.filter(Boolean).length ? (
              <div key={k} data-reveal>
                <dt className="t-s mb-3 border-b border-line pb-2 uppercase tracking-wider">{k}</dt>
                {v.filter(Boolean).map((x) => <dd key={x} className="t-3">{x}</dd>)}
              </div>
            ) : null,
          )}
        </dl>
      </section>

      {/* Media blocks */}
      {p.blocks.length > 0 && (
        <section data-theme="dark" className="flex flex-col gap-3 bg-ink p-3">
          {p.blocks.map((b) => <BlockView key={b.id} b={b} />)}
        </section>
      )}

      {/* Credits */}
      {p.credits.length > 0 && (
        <section data-theme="dark" className="wrap bg-ink py-[clamp(80px,10vw,140px)] text-white">
          <div className="grid12 gap-y-8">
            <h2 className="t-3 col-span-12 text-blue md:col-span-6">Credits</h2>
            <dl className="col-span-12 md:col-span-6">
              {p.credits.map((c, k) => (
                <div key={k} data-reveal className="t-2 grid grid-cols-2 gap-3 border-b border-white/15 py-3">
                  <dt className="serif text-blue">{c.role}</dt>
                  <dd>{c.name}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Next project */}
      {next && next.id !== p.id && (
        <Link href={`/projects/${next.slug}`} data-theme="dark" className="group relative block h-[80svh] overflow-hidden bg-ink text-white">
          <div className="absolute inset-0 opacity-60 transition-[opacity,transform] duration-[1.2s] ease-[var(--ease)] group-hover:scale-105 group-hover:opacity-80">
            <Media media={next.hero ?? next.cover} />
          </div>
          <div className="wrap relative flex h-full flex-col justify-end pb-10">
            <p className="t-2 serif mb-2"><span className="bg-blue px-1">Next project</span></p>
            <p className="t-xxl flex items-end justify-between gap-6">
              {next.title}
              <span className="transition-transform duration-700 group-hover:translate-x-3"><Arrow /></span>
            </p>
          </div>
        </Link>
      )}

      {more.length > 0 && (
        <section data-theme="dark" className="wrap bg-ink pt-[120px] text-white">
          <h2 className="t-3 mb-10 text-blue">More work</h2>
          <WorkGrid projects={more} />
        </section>
      )}
    </article>
  );
}

function BlockView({ b }: { b: Block }) {
  const [a, c] = b.media;
  switch (b.layout) {
    case "full":
      return <div data-reveal><Media media={a} natural /></div>;
    case "inset":
      return (
        <div data-reveal className="px-[8vw] py-[6vw] md:px-[16vw]">
          <Media media={a} natural />
        </div>
      );
    case "two-up":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          {[a, c].map((m, k) => (
            <div key={k} data-reveal style={{ "--d": `${k * 120}ms` } as React.CSSProperties} className="aspect-[4/5] overflow-hidden">
              <Media media={m} />
            </div>
          ))}
        </div>
      );
    case "media-text":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <div data-reveal className={`aspect-[4/5] overflow-hidden ${b.mediaRight ? "md:order-2" : ""}`}>
            <Media media={a} />
          </div>
          <TextPanel b={b} className="bg-paper text-blue" />
        </div>
      );
    case "text":
      return <TextPanel b={b} className="bg-paper text-blue md:px-[25%]" />;
  }
}

function TextPanel({ b, className = "" }: { b: Block; className?: string }) {
  return (
    <div className={`flex flex-col justify-center gap-5 p-8 md:p-16 ${className}`}>
      <div data-reveal>
        {b.heading && <h3 className="t-2 serif mb-5"><span className="hl">{b.heading}</span></h3>}
        <p className="t-1 whitespace-pre-line">{b.text}</p>
      </div>
    </div>
  );
}
