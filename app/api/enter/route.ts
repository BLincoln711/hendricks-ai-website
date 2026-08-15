import { NextResponse } from "next/server";
import { ENTERED_COOKIE } from "@/lib/site";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ENTERED_COOKIE,
    value: "1",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
