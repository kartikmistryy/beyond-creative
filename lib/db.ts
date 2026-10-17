import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

// ponytail: single-file SQLite + local uploads (./data). Fine on a VPS / single server.
// Serverless hosts (Vercel) have an ephemeral disk -> swap this file for Postgres + blob storage.
export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

export type MediaType = "image" | "video";
export type Media = { url: string; type: MediaType; alt?: string };

export const LAYOUTS = {
  full: "Full bleed — 1 media",
  inset: "Inset — 1 media with margins",
  "two-up": "Half bleed — 2 media",
  "media-text": "Half bleed — 1 media + 1 text",
  text: "Text only",
} as const;
export type Layout = keyof typeof LAYOUTS;

export type Block = {
  id: string;
  layout: Layout;
  media: Media[];
  text?: string;
  heading?: string;
  mediaRight?: boolean; // media-text: put the media on the right
};

export type Credit = { role: string; name: string };

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  client: string;
  year: string;
  roles: string[];
  team: string[];
  tags: string[];
  cover: Media | null;
  hero: Media | null;
  blocks: Block[];
  credits: Credit[];
  featured: boolean;
  published: boolean;
  sort: number;
};

export const LEAD_STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;
export type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  status: (typeof LEAD_STATUSES)[number];
  notes: string;
  created_at: string;
};

const g = globalThis as unknown as { __db?: DatabaseSync };
const db = (g.__db ??= open());

function open() {
  // timeout: parallel build workers / processes wait for the lock instead of failing
  const d = new DatabaseSync(path.join(DATA_DIR, "cms.sqlite"), { timeout: 10_000 });
  d.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      summary TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      client TEXT NOT NULL DEFAULT '',
      year TEXT NOT NULL DEFAULT '',
      roles TEXT NOT NULL DEFAULT '[]',
      team TEXT NOT NULL DEFAULT '[]',
      tags TEXT NOT NULL DEFAULT '[]',
      cover TEXT,
      hero TEXT,
      blocks TEXT NOT NULL DEFAULT '[]',
      credits TEXT NOT NULL DEFAULT '[]',
      featured INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1,
      sort INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      service TEXT NOT NULL DEFAULT '',
      budget TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  // BEGIN IMMEDIATE takes the write lock, so only one process seeds
  d.exec("BEGIN IMMEDIATE");
  try {
    if (!(d.prepare("SELECT count(*) n FROM projects").get() as { n: number }).n) seed(d);
    d.exec("COMMIT");
  } catch (e) {
    d.exec("ROLLBACK");
    throw e;
  }
  return d;
}

const JSON_COLS = ["roles", "team", "tags", "cover", "hero", "blocks", "credits"] as const;

function toProject(r: Record<string, unknown>): Project {
  const p = { ...r } as Record<string, unknown>;
  for (const c of JSON_COLS) p[c] = p[c] == null ? null : JSON.parse(p[c] as string);
  p.featured = !!p.featured;
  p.published = !!p.published;
  delete p.updated_at;
  return p as Project;
}

export function listProjects({ all = false } = {}) {
  const rows = db
    .prepare(`SELECT * FROM projects ${all ? "" : "WHERE published = 1"} ORDER BY sort, id DESC`)
    .all();
  return rows.map(toProject);
}

export function getProject(by: { slug: string } | { id: number }, { all = false } = {}) {
  const [col, val] = "slug" in by ? ["slug", by.slug] : ["id", by.id];
  const r = db
    .prepare(`SELECT * FROM projects WHERE ${col} = ? ${all ? "" : "AND published = 1"}`)
    .get(val);
  return r ? toProject(r) : null;
}

export function saveProject(p: Omit<Project, "id"> & { id?: number }) {
  const vals = {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    description: p.description,
    client: p.client,
    year: p.year,
    roles: JSON.stringify(p.roles),
    team: JSON.stringify(p.team),
    tags: JSON.stringify(p.tags),
    cover: p.cover ? JSON.stringify(p.cover) : null,
    hero: p.hero ? JSON.stringify(p.hero) : null,
    blocks: JSON.stringify(p.blocks),
    credits: JSON.stringify(p.credits),
    featured: p.featured ? 1 : 0,
    published: p.published ? 1 : 0,
    sort: p.sort,
  };
  const cols = Object.keys(vals);
  if (p.id) {
    db.prepare(
      `UPDATE projects SET ${cols.map((c) => `${c} = :${c}`).join(", ")}, updated_at = datetime('now') WHERE id = :id`,
    ).run({ ...vals, id: p.id });
    return p.id;
  }
  const r = db
    .prepare(`INSERT INTO projects (${cols.join(", ")}) VALUES (${cols.map((c) => `:${c}`).join(", ")})`)
    .run(vals);
  return Number(r.lastInsertRowid);
}

export const deleteProject = (id: number) => db.prepare("DELETE FROM projects WHERE id = ?").run(id);
export const slugTaken = (slug: string, id?: number) =>
  !!db.prepare("SELECT 1 FROM projects WHERE slug = ? AND id IS NOT ?").get(slug, id ?? null);

export const listLeads = () => db.prepare("SELECT * FROM leads ORDER BY id DESC").all() as Lead[];
export const addLead = (l: Pick<Lead, "name" | "email" | "company" | "service" | "budget" | "message">) =>
  db
    .prepare(
      "INSERT INTO leads (name, email, company, service, budget, message) VALUES (:name, :email, :company, :service, :budget, :message)",
    )
    .run(l);
export const updateLead = (id: number, status: string, notes: string) =>
  db.prepare("UPDATE leads SET status = ?, notes = ? WHERE id = ?").run(status, notes, id);
export const deleteLead = (id: number) => db.prepare("DELETE FROM leads WHERE id = ?").run(id);

// Demo content so the site isn't empty on first boot. Replace from /admin.
function seed(d: DatabaseSync) {
  const img = (s: string, w = 2000, h = 1200): Media => ({
    url: `https://picsum.photos/seed/${s}/${w}/${h}`,
    type: "image",
  });
  const demo: [string, string, string, string, string[]][] = [
    ["Night Shift", "A city that never clocks out", "Northline Transit", "2026", ["Film", "Campaign"]],
    ["Salt & Signal", "Coastal brand world, built from scratch", "Salt & Signal", "2025", ["Brand Identity", "Film"]],
    ["Field Notes", "Documentary series on independent makers", "Atelier Nine", "2025", ["Documentary", "Content"]],
    ["Ops Autopilot", "Lead-to-invoice pipeline, zero manual steps", "Kiln Studio", "2026", ["AI Automation", "Web"]],
    ["Paper Moon", "Launch film for a sleep-tech product", "Lumen Labs", "2024", ["Film", "Motion"]],
    ["Common Ground", "Identity and site for a community fund", "Common Ground", "2024", ["Brand Identity", "Web"]],
  ];
  demo.forEach(([title, summary, client, year, tags], i) => {
    const s = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    insert(d, {
      slug: s,
      title,
      summary,
      description:
        "We started with a single question — what should this feel like? — and worked backwards into story, picture and system. The result is a body of work that holds together across film, social and the screens in between.",
      client,
      year,
      roles: ["Creative Direction", ...tags],
      team: ["Beyond Creative"],
      tags,
      cover: img(s, 1600, 1100),
      hero: img(s + "-hero", 2400, 1300),
      blocks: [
        { id: "a", layout: "full", media: [img(s + "1")] },
        {
          id: "b",
          layout: "media-text",
          media: [img(s + "2", 1200, 1500)],
          heading: "The approach",
          text: "Fewer, stronger frames. Every shot had to earn its place on a phone screen and a cinema screen alike.",
        },
        { id: "c", layout: "two-up", media: [img(s + "3", 1200, 1500), img(s + "4", 1200, 1500)] },
        { id: "d", layout: "inset", media: [img(s + "5")] },
      ],
      credits: [
        { role: "Director", name: "A. Rivera" },
        { role: "Director of Photography", name: "M. Chen" },
        { role: "Editor", name: "S. Okafor" },
      ],
      featured: i < 4,
      published: true,
      sort: i,
    });
  });
}

function insert(d: DatabaseSync, p: Omit<Project, "id">) {
  const vals: Record<string, string | number | null> = {};
  for (const [k, v] of Object.entries(p))
    vals[k] = typeof v === "boolean" ? +v : typeof v === "object" && v !== null ? JSON.stringify(v) : (v as string);
  const cols = Object.keys(vals);
  d.prepare(`INSERT INTO projects (${cols.join(", ")}) VALUES (${cols.map((c) => `:${c}`).join(", ")})`).run(vals);
}
