import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ENTERED_COOKIE, GATE_SKIP_PATHS } from "./lib/site";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const skip = GATE_SKIP_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
  if (!skip) return NextResponse.next();

  const response = NextResponse.next();
  if (request.cookies.get(ENTERED_COOKIE)?.value !== "1") {
    response.cookies.set({
      name: ENTERED_COOKIE,
      value: "1",
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}

export const config = {
  matcher: [
    "/practice",
    "/practice/:path*",
    "/method",
    "/method/:path*",
    "/about",
    "/about/:path*",
    "/diagnostic",
    "/diagnostic/:path*",
    "/briefing",
    "/briefing/:path*",
    "/insights",
    "/insights/:path*",
    "/pricing",
    "/pricing/:path*",
  ],
};
