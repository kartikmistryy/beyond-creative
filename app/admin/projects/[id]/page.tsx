import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, type Project } from "@/lib/db";
import { ProjectForm } from "./ProjectForm";

export const dynamic = "force-dynamic";

const blank: Project = {
  id: 0, slug: "", title: "", summary: "", description: "", client: "", year: String(new Date().getFullYear()),
  roles: [], team: [], tags: [], cover: null, hero: null, blocks: [], credits: [],
  featured: false, published: false, sort: 0,
};

export default async function EditProject({ params, searchParams }: PageProps<"/admin/projects/[id]">) {
  const { id } = await params;
  const p = id === "new" ? blank : getProject({ id: Number(id) }, { all: true });
  if (!p) notFound();
  const created = (await searchParams).created === "1";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/admin" className="link text-sm text-muted">← All projects</Link>
      <h1 className="mt-3 mb-8 text-3xl font-medium tracking-tight">{p.id ? p.title : "New project"}</h1>
      {created && <p role="status" className="mb-6 rounded-lg bg-blue/10 px-4 py-2 text-sm text-blue">Project created.</p>}
      <ProjectForm initial={p} />
    </div>
  );
}
