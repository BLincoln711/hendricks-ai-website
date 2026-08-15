import { anyUrlMatchesHost } from "./host";
import type { SurfaceState } from "./types";

/**
 * Classic Google may resolve only after a real SERP probe.
 * Word is "retrieved", never "found" or "page one".
 */
export function resolveClassicGoogle(
  probed: boolean,
  organicUrls: string[] | null,
  host: string
): SurfaceState {
  if (!probed || organicUrls === null) return "unmeasured";
  return anyUrlMatchesHost(organicUrls, host) ? "retrieved" : "invisible";
}

/**
 * AI Overviews may resolve only when an AIO block is present.
 * No block = unmeasured, not invisible.
 */
export function resolveAiOverviews(
  probed: boolean,
  aioPresent: boolean | null,
  referenceUrls: string[] | null,
  host: string
): SurfaceState {
  if (!probed || aioPresent === null) return "unmeasured";
  if (!aioPresent) return "unmeasured";
  if (referenceUrls === null) return "unmeasured";
  return anyUrlMatchesHost(referenceUrls, host) ? "cited" : "invisible";
}

/**
 * ChatGPT may resolve only after a real search-enabled call.
 * Memory-only answer with no source list = unmeasured, not invisible.
 * cited only if this host is a source URL.
 */
export function resolveChatGpt(
  probed: boolean,
  sourceListPresent: boolean | null,
  sourceUrls: string[] | null,
  host: string
): SurfaceState {
  if (!probed || sourceListPresent === null) return "unmeasured";
  if (!sourceListPresent || sourceUrls === null) return "unmeasured";
  return anyUrlMatchesHost(sourceUrls, host) ? "cited" : "invisible";
}
