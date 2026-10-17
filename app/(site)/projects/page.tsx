import Link from "next/link";
import type { Metadata } from "next";
import { listProjects } from "@/lib/db";
import { WorkGrid } from "@/components/WorkGrid";

export const metadata: Metadata = { title: "Work" };

export default async function Projects({ searchParams }: PageProps<"/projects">) {
  const { tag } = await searchParams;
  const all = listProjects();
  const tags = [...new Set(all.flatMap((p) => p.tags))].sort();
  const shown = typeof tag === "string" ? all.filter((p) => p.tags.includes(tag)) : all;

  return (
    <>
      <section data-theme="light" className="wrap bg-paper pt-[clamp(140px,16vw,240px)] pb-14">
        <div className="grid12 gap-y-10">
          <h1 data-reveal className="t-xxl col-span-12 md:col-span-7">
            Selected <span className="hl">work</span>
            <sup className="t-3 ml-2 align-top">{all.length}</sup>
          </h1>
          <p data-reveal className="t-1 col-span-12 self-end md:col-span-5">
            Films, brands, websites and automations — made with people who care about the details.
          </p>
        </div>
        <nav aria-label="Filter by discipline" className="t-3 mt-16 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5">
          {[undefined, ...tags].map((t) => (
            <Link
              key={t ?? "all"}
              href={t ? `/projects?tag=${encodeURIComponent(t)}` : "/projects"}
              aria-current={tag === t ? "page" : undefined}
              scroll={false}
              className="link aria-[current=page]:serif"
            >
              {t ?? "All"}
              <span className="ml-1 text-[0.7em] align-top">
                {t ? all.filter((p) => p.tags.includes(t)).length : all.length}
              </span>
            </Link>
          ))}
        </nav>
      </section>

      <section data-theme="dark" className="wrap min-h-[60vh] bg-ink pt-[90px] pb-10 text-white">
        <WorkGrid key={String(tag)} projects={shown} />
        {!shown.length && <p className="t-2 py-20 text-white/50">Nothing here yet.</p>}
      </section>
    </>
  );
}
