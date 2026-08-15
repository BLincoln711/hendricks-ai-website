import { collectUrls } from "./host";
import { dataForSeoBasicToken } from "./auth";

const ENDPOINT = "https://api.dataforseo.com/v3/serp/google/organic/live/advanced";
const TIMEOUT_MS = 18_000;

export type GoogleProbe = {
  probed: boolean;
  organicUrls: string[] | null;
  aioPresent: boolean | null;
  aioUrls: string[] | null;
};

export function emptyGoogleProbe(): GoogleProbe {
  return {
    probed: false,
    organicUrls: null,
    aioPresent: null,
    aioUrls: null,
  };
}

function isAiOverviewItem(item: unknown): boolean {
  if (!item || typeof item !== "object") return false;
  const type = String((item as { type?: string }).type ?? "");
  return type === "ai_overview";
}

export function parseDataForSeoResult(payload: unknown): Omit<GoogleProbe, "probed"> {
  const root = payload as {
    tasks?: Array<{
      status_code?: number;
      result?: Array<{ items?: unknown[] }>;
    }>;
  };

  const task = root?.tasks?.[0];
  if (!task || (typeof task.status_code === "number" && task.status_code >= 40000)) {
    return { organicUrls: null, aioPresent: null, aioUrls: null };
  }

  const items = task.result?.[0]?.items;
  if (!Array.isArray(items)) {
    return { organicUrls: null, aioPresent: null, aioUrls: null };
  }

  const organicUrls = items
    .filter((item) => item && typeof item === "object" && (item as { type?: string }).type === "organic")
    .flatMap((item) => {
      const row = item as { url?: string; domain?: string };
      if (row.url) return [row.url];
      if (row.domain) return [`https://${row.domain}`];
      return [];
    });

  const aio = items.find(isAiOverviewItem);
  if (!aio) {
    return { organicUrls, aioPresent: false, aioUrls: null };
  }

  return {
    organicUrls,
    aioPresent: true,
    aioUrls: collectUrls(aio),
  };
}

export async function probeGoogleSerp(keyword: string): Promise<GoogleProbe> {
  const token = dataForSeoBasicToken();
  if (!token || !keyword) return emptyGoogleProbe();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          keyword,
          location_code: 2840,
          language_code: "en",
          device: "desktop",
          depth: 10,
          load_async_ai_overview: true,
        },
      ]),
    });

    if (!response.ok) return emptyGoogleProbe();

    const payload = await response.json();
    return { probed: true, ...parseDataForSeoResult(payload) };
  } catch {
    return emptyGoogleProbe();
  } finally {
    clearTimeout(timer);
  }
}
