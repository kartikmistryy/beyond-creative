"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, login, logout, requireAdmin } from "@/lib/auth";
import {
  LAYOUTS, LEAD_STATUSES, deleteLead, deleteProject, saveProject, slugTaken, updateLead,
  type Block, type Credit, type Media, type Project,
} from "@/lib/db";

export async function loginAction(_: string | undefined, f: FormData) {
  if (!checkPassword(String(f.get("password") ?? ""))) return "Wrong password.";
  await login();
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---- Projects --------------------------------------------------------------

// Trust boundary: the editor posts JSON. Only allow http(s) or our own /uploads URLs (blocks javascript: etc).
const okUrl = (u: unknown) => typeof u === "string" && /^(https?:\/\/|\/uploads\/)/.test(u);
const media = (m: unknown): Media | null => {
  const x = m as Media | null;
  return x && okUrl(x.url) ? { url: x.url, type: x.type === "video" ? "video" : "image", alt: String(x.alt ?? "") } : null;
};
const str = (v: unknown, max = 300) => String(v ?? "").trim().slice(0, max);
const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => str(x)).filter(Boolean) : []);

export type SaveState = { error?: string; saved?: number };

export async function saveProjectAction(_: SaveState, f: FormData): Promise<SaveState> {
  await requireAdmin();
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(String(f.get("data")));
  } catch {
    return { error: "Couldn't read the form." };
  }

  const id = Number(raw.id) || undefined;
  const title = str(raw.title);
  const slug = str(raw.slug).toLowerCase();
  if (!title) return { error: "Title is required." };
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { error: "Slug must be lowercase letters, numbers and dashes." };
  if (slugTaken(slug, id)) return { error: `Another project already uses “${slug}”.` };

  const blocks: Block[] = (Array.isArray(raw.blocks) ? raw.blocks : [])
    .filter((b: Block) => b && b.layout in LAYOUTS)
    .map((b: Block) => ({
      id: str(b.id, 40) || crypto.randomUUID(),
      layout: b.layout,
      media: (Array.isArray(b.media) ? b.media : []).map(media).filter((m): m is Media => !!m).slice(0, 2),
      heading: str(b.heading),
      text: str(b.text, 5000),
      mediaRight: !!b.mediaRight,
    }));
  const credits: Credit[] = (Array.isArray(raw.credits) ? raw.credits : [])
    .map((c: Credit) => ({ role: str(c?.role), name: str(c?.name) }))
    .filter((c: Credit) => c.role || c.name);

  const p: Omit<Project, "id"> & { id?: number } = {
    id,
    slug,
    title,
    summary: str(raw.summary),
    description: str(raw.description, 10000),
    client: str(raw.client),
    year: str(raw.year, 20),
    roles: list(raw.roles),
    team: list(raw.team),
    tags: list(raw.tags),
    cover: media(raw.cover),
    hero: media(raw.hero),
    blocks,
    credits,
    featured: !!raw.featured,
    published: !!raw.published,
    sort: Number(raw.sort) || 0,
  };
  const saved = saveProject(p);
  revalidatePath("/", "layout");
  if (!id) redirect(`/admin/projects/${saved}?created=1`);
  return { saved: Date.now() };
}

export async function deleteProjectAction(f: FormData) {
  await requireAdmin();
  deleteProject(Number(f.get("id")));
  revalidatePath("/", "layout");
  redirect("/admin");
}

// ---- Leads -----------------------------------------------------------------

export async function updateLeadAction(f: FormData) {
  await requireAdmin();
  const status = String(f.get("status"));
  if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) return;
  updateLead(Number(f.get("id")), status, str(f.get("notes"), 5000));
  revalidatePath("/admin");
}

export async function deleteLeadAction(f: FormData) {
  await requireAdmin();
  deleteLead(Number(f.get("id")));
  revalidatePath("/admin");
}
