import { deriveAsks, probeQuery } from "./asks";
import { dataForSeoBasicToken, hasOpenAiKey } from "./auth";
import { emptyGoogleProbe, probeGoogleSerp } from "./dataforseo";
import { extractabilityFromHtml, readPageSignals } from "./extractability";
import { fetchPage } from "./fetch-page";
import { hostFromUrl } from "./host";
import { emptyChatGptProbe, probeChatGpt } from "./openai";
import { resolveAiOverviews, resolveChatGpt, resolveClassicGoogle } from "./resolve";
import {
  emptyBoard,
  emptyExtractability,
  emptyProbe,
  type ProbeResult,
  type SurfaceRow,
} from "./types";

function setSurface(
  rows: SurfaceRow[],
  id: SurfaceRow["id"],
  state: SurfaceRow["state"]
): SurfaceRow[] {
  return rows.map((row) => (row.id === id ? { ...row, state } : row));
}

export async function runProbe(url: string): Promise<ProbeResult> {
  const host = hostFromUrl(url) ?? "";
  const page = await fetchPage(url);
  const resolvedHost = page.host || host;
  const html = page.html;

  const extractability = html
    ? extractabilityFromHtml(html, resolvedHost)
    : emptyExtractability();
  const signals = html
    ? readPageSignals(html)
    : {
        title: null,
        h1s: [],
        headings: [],
        siteName: null,
        description: null,
        faqQuestions: [],
      };
  const asks = html ? deriveAsks(signals) : [];
  const query = html ? probeQuery(signals, resolvedHost) : resolvedHost || null;

  const googlePromise = dataForSeoBasicToken() && query
    ? probeGoogleSerp(query)
    : Promise.resolve(emptyGoogleProbe());
  const chatPromise = hasOpenAiKey() && query
    ? probeChatGpt(query)
    : Promise.resolve(emptyChatGptProbe());

  const [google, chat] = await Promise.all([googlePromise, chatPromise]);

  let surfaces = emptyBoard();
  surfaces = setSurface(
    surfaces,
    "classic_google",
    resolveClassicGoogle(google.probed, google.organicUrls, resolvedHost)
  );
  surfaces = setSurface(
    surfaces,
    "ai_overviews",
    resolveAiOverviews(google.probed, google.aioPresent, google.aioUrls, resolvedHost)
  );
  surfaces = setSurface(
    surfaces,
    "chatgpt",
    resolveChatGpt(chat.probed, chat.sourceListPresent, chat.sourceUrls, resolvedHost)
  );
  // AI Mode, Perplexity, Gemini remain unmeasured.

  return {
    url: page.url || url,
    host: resolvedHost,
    query,
    extractability,
    asks,
    surfaces,
    chosen: "unmeasured",
    paid: "unmeasured",
  };
}

export function unmeasuredProbe(url: string): ProbeResult {
  return emptyProbe(url, hostFromUrl(url) ?? "");
}
