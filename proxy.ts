import { NextResponse, type NextRequest } from "next/server";
import { COOKIE, verifyToken } from "@/lib/auth";

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/login") return;
  if (!verifyToken(req.cookies.get(COOKIE)?.value))
    return NextResponse.redirect(new URL("/admin/login", req.url));
}

export const config = { matcher: ["/admin/:path*"] };
