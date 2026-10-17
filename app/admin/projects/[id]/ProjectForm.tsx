"use client";
import { useActionState, useState } from "react";
import type { Block, Layout, Media, Project } from "@/lib/db";
import { Media as MediaView } from "@/components/Media";
import { deleteProjectAction, saveProjectAction } from "../../actions";

// keep in sync with LAYOUTS in lib/db.ts (can't import runtime values from a node:sqlite module into the client)
const LAYOUTS: Record<Layout, { label: string; slots: number; text: boolean }> = {
  full: { label: "Full bleed", slots: 1, text: false },
  inset: { label: "Inset", slots: 1, text: false },
  "two-up": { label: "Half bleed · 2 media", slots: 2, text: false },
  "media-text": { label: "Half bleed · media + text", slots: 1, text: true },
  text: { label: "Text only", slots: 0, text: true },
};

const field = "w-full rounded-lg border border-line px-3 py-2 outline-none focus:border-blue";
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const csv = (a: string[]) => a.join(", ");
const uncsv = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

export function ProjectForm({ initial }: { initial: Project }) {
  const [p, setP] = useState(initial);
  const [slugTouched, setSlugTouched] = useState(!!initial.id);
  const [state, action, pending] = useActionState(saveProjectAction, {});
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP((x) => ({ ...x, [k]: v }));

  const setBlock = (i: number, b: Partial<Block>) =>
    set("blocks", p.blocks.map((x, k) => (k === i ? { ...x, ...b } : x)));
  const move = (i: number, d: -1 | 1) => {
    const b = [...p.blocks];
    [b[i], b[i + d]] = [b[i + d], b[i]];
    set("blocks", b);
  };
  const addBlock = (layout: Layout) =>
    set("blocks", [...p.blocks, { id: crypto.randomUUID(), layout, media: [], text: "", heading: "" }]);

  return (
    <form action={action} className="space-y-12 pb-32">
      <input type="hidden" name="data" value={JSON.stringify(p)} />

      <Section title="Basics">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title *">
            <input
              className={field}
              value={p.title}
              required
              onChange={(e) => {
                set("title", e.target.value);
                if (!slugTouched) set("slug", slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="URL slug *" hint={`/projects/${p.slug || "…"}`}>
            <input
              className={field}
              value={p.slug}
              required
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
            />
          </Field>
          <Field label="Summary (one line)" wide>
            <input className={field} value={p.summary} onChange={(e) => set("summary", e.target.value)} />
          </Field>
          <Field label="Description" wide>
            <textarea className={field} rows={4} value={p.description} onChange={(e) => set("description", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Details">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Client"><input className={field} value={p.client} onChange={(e) => set("client", e.target.value)} /></Field>
          <Field label="Year"><input className={field} value={p.year} onChange={(e) => set("year", e.target.value)} /></Field>
          <Field label="Sort order" hint="Lower shows first">
            <input type="number" className={field} value={p.sort} onChange={(e) => set("sort", Number(e.target.value))} />
          </Field>
          <CsvField label="Role / what we did" value={p.roles} onChange={(v) => set("roles", v)} />
          <CsvField label="Team" value={p.team} onChange={(v) => set("team", v)} />
          <CsvField label="Tags / disciplines" hint="Used for filters. “AI Automation” shows on the AI page." value={p.tags} onChange={(v) => set("tags", v)} />
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={p.published} onChange={(e) => set("published", e.target.checked)} /> Published
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={p.featured} onChange={(e) => set("featured", e.target.checked)} /> Featured on home
          </label>
        </div>
      </Section>

      <Section title="Cover & hero">
        <div className="grid gap-4 md:grid-cols-2">
          <MediaField label="Cover (cards & listings)" value={p.cover} onChange={(m) => set("cover", m)} />
          <MediaField label="Hero (top of project page — video recommended)" value={p.hero} onChange={(m) => set("hero", m)} />
        </div>
      </Section>

      <Section title={`Content blocks (${p.blocks.length})`}>
        <ol className="space-y-4">
          {p.blocks.map((b, i) => {
            const L = LAYOUTS[b.layout];
            return (
              <li key={b.id} className="rounded-xl border border-line p-4">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="mr-2 text-sm text-muted">#{i + 1}</span>
                  <LayoutPicker value={b.layout} onChange={(layout) => setBlock(i, { layout })} />
                  <div className="ml-auto flex gap-1 text-sm">
                    <IconBtn label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</IconBtn>
                    <IconBtn label="Move down" disabled={i === p.blocks.length - 1} onClick={() => move(i, 1)}>↓</IconBtn>
                    <IconBtn label="Remove block" onClick={() => set("blocks", p.blocks.filter((_, k) => k !== i))}>✕</IconBtn>
                  </div>
                </div>
                <div className={`grid gap-4 ${L.slots + (L.text ? 1 : 0) > 1 ? "md:grid-cols-2" : ""}`}>
                  {Array.from({ length: L.slots }, (_, s) => (
                    <MediaField
                      key={s}
                      label={L.slots > 1 ? (s ? "Right" : "Left") : "Media"}
                      value={b.media[s] ?? null}
                      onChange={(m) => {
                        const media = [...b.media];
                        media[s] = m as Media;
                        setBlock(i, { media: media.filter(Boolean) });
                      }}
                    />
                  ))}
                  {L.text && (
                    <div className={`space-y-2 ${b.layout === "media-text" && b.mediaRight ? "md:order-first" : ""}`}>
                      <input className={field} placeholder="Small heading (optional)" value={b.heading ?? ""} onChange={(e) => setBlock(i, { heading: e.target.value })} />
                      <textarea className={field} rows={5} placeholder="Text" value={b.text ?? ""} onChange={(e) => setBlock(i, { text: e.target.value })} />
                      {b.layout === "media-text" && (
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" checked={!!b.mediaRight} onChange={(e) => setBlock(i, { mediaRight: e.target.checked })} />
                          Media on the right
                        </label>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(LAYOUTS) as Layout[]).map((l) => (
            <button key={l} type="button" onClick={() => addBlock(l)} className="flex items-center gap-2 rounded-lg border border-dashed border-line px-3 py-2 text-sm hover:border-blue hover:text-blue">
              <LayoutIcon layout={l} /> + {LAYOUTS[l].label}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Credits">
        <div className="space-y-2">
          {p.credits.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input className={field} placeholder="Role" value={c.role} onChange={(e) => set("credits", p.credits.map((x, k) => (k === i ? { ...x, role: e.target.value } : x)))} />
              <input className={field} placeholder="Name" value={c.name} onChange={(e) => set("credits", p.credits.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)))} />
              <IconBtn label="Remove credit" onClick={() => set("credits", p.credits.filter((_, k) => k !== i))}>✕</IconBtn>
            </div>
          ))}
          <button type="button" onClick={() => set("credits", [...p.credits, { role: "", name: "" }])} className="text-sm text-blue hover:underline">
            + Add credit
          </button>
        </div>
      </Section>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <button disabled={pending} className="rounded-lg bg-ink px-5 py-2 text-white hover:bg-blue disabled:opacity-50">
            {pending ? "Saving…" : p.id ? "Save changes" : "Create project"}
          </button>
          {state.error && <p role="alert" className="text-sm text-red-600">{state.error}</p>}
          {state.saved && !pending && <p role="status" className="text-sm text-blue">Saved.</p>}
          {!!p.id && p.published && (
            <a href={`/projects/${initial.slug}`} target="_blank" className="link text-sm text-muted">View live ↗</a>
          )}
          {!!p.id && (
            <button
              formAction={deleteProjectAction}
              name="id"
              value={p.id}
              formNoValidate
              onClick={(e) => !confirm(`Delete “${p.title}”? This can't be undone.`) && e.preventDefault()}
              className="ml-auto text-sm text-red-600 hover:underline"
            >
              Delete project
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

function MediaField({ label, value, onChange }: { label: string; value: Media | null; onChange: (m: Media | null) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setErr("");
    const body = new FormData();
    body.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body }).catch(() => null);
    const j = await r?.json().catch(() => null);
    setBusy(false);
    if (!r?.ok) return setErr(j?.error ?? "Upload failed");
    onChange({ url: j.url, type: j.type, alt: value?.alt ?? "" });
  }

  const type = (url: string): Media["type"] => (/\.(mp4|webm|mov)(\?|$)/i.test(url) ? "video" : "image");

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">{label}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-paper">
        {value?.url ? <MediaView media={value} /> : <p className="grid h-full place-items-center text-sm text-muted">No media</p>}
        {busy && <p className="absolute inset-0 grid place-items-center bg-white/80 text-sm">Uploading…</p>}
      </div>
      <div className="flex gap-2">
        <input
          className={field}
          placeholder="Paste image / video URL"
          value={value?.url ?? ""}
          onChange={(e) => onChange(e.target.value ? { url: e.target.value, type: type(e.target.value), alt: value?.alt ?? "" } : null)}
        />
        <label className="shrink-0 cursor-pointer rounded-lg border border-line px-3 py-2 text-sm hover:border-blue focus-within:ring-2 focus-within:ring-blue">
          Upload
          <input type="file" accept="image/*,video/*" className="sr-only" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </label>
      </div>
      {value?.url && (
        <input className={field} placeholder="Alt text (describe the image)" value={value.alt ?? ""} onChange={(e) => onChange({ ...value, alt: e.target.value })} />
      )}
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
    </div>
  );
}

function LayoutPicker({ value, onChange }: { value: Layout; onChange: (l: Layout) => void }) {
  return (
    <div role="radiogroup" aria-label="Block layout" className="flex flex-wrap gap-1">
      {(Object.keys(LAYOUTS) as Layout[]).map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={value === l}
          title={LAYOUTS[l].label}
          onClick={() => onChange(l)}
          className="flex items-center gap-1.5 rounded-lg border border-line px-2 py-1.5 text-xs aria-checked:border-blue aria-checked:bg-blue/10 aria-checked:text-blue"
        >
          <LayoutIcon layout={l} />
          <span className="hidden sm:inline">{LAYOUTS[l].label}</span>
        </button>
      ))}
    </div>
  );
}

/** Tiny wireframe of each layout so editors see the shape, not just a name. */
function LayoutIcon({ layout }: { layout: Layout }) {
  const box = "bg-current opacity-60 rounded-[1px]";
  return (
    <span aria-hidden className="flex h-4 w-6 gap-px rounded-sm border border-current p-px">
      {layout === "full" && <span className={`${box} flex-1`} />}
      {layout === "inset" && <span className={`${box} m-[2px] flex-1`} />}
      {layout === "two-up" && (<><span className={`${box} flex-1`} /><span className={`${box} flex-1`} /></>)}
      {layout === "media-text" && (<><span className={`${box} flex-1`} /><span className="flex flex-1 flex-col justify-center gap-px px-px"><span className={`${box} h-px`} /><span className={`${box} h-px`} /></span></>)}
      {layout === "text" && <span className="flex flex-1 flex-col justify-center gap-px px-1"><span className={`${box} h-px`} /><span className={`${box} h-px`} /><span className={`${box} h-px`} /></span>}
    </span>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-line pb-2 text-lg font-medium">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, hint, wide, children }: { label: string; hint?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <label className={`grid gap-1 text-sm ${wide ? "md:col-span-full" : ""}`}>
      <span className="text-muted">{label}</span>
      {children}
      {hint && <span className="text-xs text-muted">{hint}</span>}
    </label>
  );
}

/** Comma-separated list input; keeps raw text while typing so trailing commas don't vanish. */
function CsvField({ label, hint, value, onChange }: { label: string; hint?: string; value: string[]; onChange: (v: string[]) => void }) {
  const [raw, setRaw] = useState(csv(value));
  return (
    <Field label={label} hint={hint ?? "Comma separated"}>
      <input className={field} value={raw} onChange={(e) => { setRaw(e.target.value); onChange(uncsv(e.target.value)); }} />
    </Field>
  );
}

function IconBtn({ label, children, ...rest }: { label: string; children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button type="button" aria-label={label} title={label} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-ink disabled:opacity-30" {...rest}>
      {children}
    </button>
  );
}
