import { NextResponse } from "next/server";
import { runProbe } from "@/lib/probe/run";
import { emptyProbe } from "@/lib/probe/types";
import { normalizeInputUrl } from "@/lib/probe/url";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url." }, { status: 400 });
  }

  const raw = typeof body === "object" && body && "url" in body ? String((body as { url: unknown }).url) : "";
  const url = normalizeInputUrl(raw);
  if (!url) {
    return NextResponse.json({ error: "Type a website." }, { status: 400 });
  }

  try {
    const result = await runProbe(url);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(emptyProbe(url));
  }
}
