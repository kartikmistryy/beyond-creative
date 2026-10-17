import Link from "next/link";
import { LEAD_STATUSES, listLeads, listProjects } from "@/lib/db";
import { Media } from "@/components/Media";
import { deleteLeadAction, logoutAction, updateLeadAction } from "./actions";

export const dynamic = "force-dynamic";

export default async function Admin({ searchParams }: PageProps<"/admin">) {
  const tab = (await searchParams).tab === "leads" ? "leads" : "projects";
  const projects = listProjects({ all: true });
  const leads = listLeads();
  const fresh = leads.filter((l) => l.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-medium tracking-tight">
          Beyond<em className="accent">creative</em> <span className="text-muted">CRM</span>
        </h1>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="link" target="_blank">View site ↗</Link>
          <form action={logoutAction}><button className="link text-muted">Log out</button></form>
        </div>
      </header>

      <nav className="mb-6 flex gap-1 border-b border-line text-sm">
        {(["projects", "leads"] as const).map((t) => (
          <Link
            key={t}
            href={`/admin?tab=${t}`}
            aria-current={tab === t ? "page" : undefined}
            className="-mb-px border-b-2 border-transparent px-3 py-2 capitalize aria-[current=page]:border-ink"
          >
            {t} <span className="text-muted">{t === "projects" ? projects.length : fresh ? `${fresh} new` : leads.length}</span>
          </Link>
        ))}
      </nav>

      {tab === "projects" ? (
        <>
          <div className="mb-4 flex justify-end">
            <Link href="/admin/projects/new" className="rounded-lg bg-ink px-4 py-2 text-sm text-white hover:bg-blue">
              + New project
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="text-left text-muted">
              <tr className="border-b border-line">
                <th className="py-2 font-normal" colSpan={2}>Project</th>
                <th className="font-normal">Client</th>
                <th className="font-normal">Year</th>
                <th className="font-normal">Order</th>
                <th className="font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} className="border-b border-line hover:bg-paper/50">
                  <td className="w-20 py-2">
                    <div className="h-12 w-16 overflow-hidden rounded"><Media media={p.cover ?? p.hero} /></div>
                  </td>
                  <td>
                    <Link href={`/admin/projects/${p.id}`} className="font-medium hover:text-blue">{p.title}</Link>
                    <div className="text-muted">/{p.slug}</div>
                  </td>
                  <td>{p.client}</td>
                  <td>{p.year}</td>
                  <td>{p.sort}</td>
                  <td className="space-x-1">
                    <Badge on={p.published}>{p.published ? "Live" : "Draft"}</Badge>
                    {p.featured && <Badge on>Featured</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="space-y-3">
          {!leads.length && <p className="py-10 text-muted">No enquiries yet — they arrive here from the contact form.</p>}
          {leads.map((l) => (
            <details key={l.id} className="rounded-lg border border-line p-4" open={l.status === "new"}>
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <Badge on={l.status === "new"}>{l.status}</Badge>
                <span className="font-medium">{l.name}</span>
                <a href={`mailto:${l.email}`} className="link text-blue">{l.email}</a>
                {l.company && <span className="text-muted">{l.company}</span>}
                <span className="ml-auto text-muted">{new Date(l.created_at + "Z").toLocaleString()}</span>
              </summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted">Service:</span> {l.service || "—"}</p>
                  <p><span className="text-muted">Budget:</span> {l.budget || "—"}</p>
                  <p className="whitespace-pre-line rounded bg-paper/60 p-3">{l.message}</p>
                </div>
                <form action={updateLeadAction} className="grid content-start gap-2 text-sm">
                  <input type="hidden" name="id" value={l.id} />
                  <select name="status" defaultValue={l.status} className="rounded border border-line px-2 py-1.5">
                    {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <textarea name="notes" defaultValue={l.notes} rows={3} placeholder="Internal notes…" className="rounded border border-line px-2 py-1.5" />
                  <div className="flex justify-between">
                    <button className="rounded bg-ink px-3 py-1.5 text-white hover:bg-blue">Save</button>
                    <button formAction={deleteLeadAction} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </form>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}

function Badge({ on, children }: { on?: boolean; children: React.ReactNode }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs capitalize ${on ? "bg-blue/10 text-blue" : "bg-ink/5 text-muted"}`}>
      {children}
    </span>
  );
}
