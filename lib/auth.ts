import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

// ponytail: one shared admin password (ADMIN_PASSWORD). Add per-user accounts when there's more than one editor.
export const COOKIE = "bc_admin";
const MAX_AGE = 60 * 60 * 24 * 7;

const secret = () => {
  const s = process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("Set ADMIN_PASSWORD (and ideally AUTH_SECRET) in .env.local");
  return s;
};
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");

const safeEq = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function verifyToken(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  return !!exp && !!sig && Number(exp) > Date.now() && safeEq(sig, sign(exp));
}

export const checkPassword = (pw: string) => !!process.env.ADMIN_PASSWORD && safeEq(pw, process.env.ADMIN_PASSWORD);

export async function login() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export const logout = async () => (await cookies()).delete(COOKIE);

/** Call at the top of every admin Server Action / route handler — the proxy redirect alone is not a security boundary. */
export async function requireAdmin() {
  if (!verifyToken((await cookies()).get(COOKIE)?.value)) throw new Error("Unauthorized");
}
