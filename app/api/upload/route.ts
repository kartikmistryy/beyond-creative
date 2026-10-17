import { writeFile } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";
import { UPLOAD_DIR } from "@/lib/db";

// MIME -> [kind, extension]. Extension comes from here, never from the client filename.
const TYPES: Record<string, ["image" | "video", string]> = {
  "image/jpeg": ["image", ".jpg"], "image/png": ["image", ".png"], "image/webp": ["image", ".webp"],
  "image/avif": ["image", ".avif"], "image/gif": ["image", ".gif"],
  "video/mp4": ["video", ".mp4"], "video/webm": ["video", ".webm"], "video/quicktime": ["video", ".mov"],
};
const MAX = 200 * 1024 * 1024; // 200MB — videos

export async function POST(req: Request) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const file = (await req.formData()).get("file");
  if (!(file instanceof File)) return Response.json({ error: "No file" }, { status: 400 });
  const [type, ext] = TYPES[file.type] ?? [];
  if (!type) return Response.json({ error: `Unsupported type ${file.type}` }, { status: 415 });
  if (file.size > MAX) return Response.json({ error: "File too large (200MB max)" }, { status: 413 });

  const name = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
  await writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return Response.json({ url: `/uploads/${name}`, type });
}
