import OpenAI from "openai";
import { hasOpenAiKey } from "./auth";

const TIMEOUT_MS = 18_000;

export type ChatGptProbe = {
  probed: boolean;
  sourceListPresent: boolean | null;
  sourceUrls: string[] | null;
};

export function emptyChatGptProbe(): ChatGptProbe {
  return {
    probed: false,
    sourceListPresent: null,
    sourceUrls: null,
  };
}

function urlsFromUnknown(value: unknown, into: string[] = []): string[] {
  if (!value || typeof value !== "object") return into;
  if (Array.isArray(value)) {
    for (const item of value) urlsFromUnknown(item, into);
    return into;
  }
  const record = value as Record<string, unknown>;
  if (record.type === "url_citation" && typeof record.url === "string") {
    into.push(record.url);
  }
  if (Array.isArray(record.annotations)) urlsFromUnknown(record.annotations, into);
  if (Array.isArray(record.sources)) {
    for (const source of record.sources) {
      if (source && typeof source === "object" && typeof (source as { url?: string }).url === "string") {
        into.push((source as { url: string }).url);
      }
    }
  }
  if (Array.isArray(record.content)) urlsFromUnknown(record.content, into);
  if (Array.isArray(record.output)) urlsFromUnknown(record.output, into);
  if (record.action && typeof record.action === "object") urlsFromUnknown(record.action, into);
  return into;
}

function hasExplicitSourceList(payload: unknown): boolean {
  const visit = (value: unknown): boolean => {
    if (!value || typeof value !== "object") return false;
    if (Array.isArray(value)) return value.some(visit);
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.sources)) return true;
    if (Array.isArray(record.annotations) && record.annotations.some((item) => {
      return Boolean(item && typeof item === "object" && (item as { type?: string }).type === "url_citation");
    })) {
      return true;
    }
    return Object.values(record).some(visit);
  };
  return visit(payload);
}

function hadSearchCall(payload: unknown): boolean {
  const output = (payload as { output?: Array<{ type?: string }> })?.output;
  if (!Array.isArray(output)) return false;
  return output.some((item) => String(item?.type ?? "").includes("web_search"));
}

export function parseChatGptResponse(payload: unknown): Omit<ChatGptProbe, "probed"> {
  const urls = [...new Set(urlsFromUnknown(payload))];
  const sourceListPresent = hasExplicitSourceList(payload) || urls.length > 0;

  // A search-enabled call that still produced no source list is unmeasured.
  if (!sourceListPresent) {
    return { sourceListPresent: false, sourceUrls: null };
  }

  return {
    sourceListPresent: true,
    sourceUrls: urls,
  };
}

export async function probeChatGpt(query: string): Promise<ChatGptProbe> {
  if (!hasOpenAiKey() || !query) return emptyChatGptProbe();

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: TIMEOUT_MS,
    });

    const model = process.env.OPENAI_PROBE_MODEL?.trim() || "gpt-4o";
    const request: Record<string, unknown> = {
      model,
      tools: [{ type: "web_search" }],
      tool_choice: "required",
      input: query,
      include: ["web_search_call.action.sources"],
    };

    const response = await client.responses.create(
      request as Parameters<OpenAI["responses"]["create"]>[0],
      { signal: controller.signal }
    );

    void hadSearchCall(response);
    return { probed: true, ...parseChatGptResponse(response) };
  } catch {
    return emptyChatGptProbe();
  } finally {
    clearTimeout(timer);
  }
}
