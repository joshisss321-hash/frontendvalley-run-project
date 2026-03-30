import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("adminToken");

  // 🔥 allow login page
  if (req.nextUrl.pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔒 protect admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};