export const EXTRACT_FIELDS = [
  "title",
  "h1",
  "entity",
  "schema",
  "evidence",
  "date",
] as const;

export type ExtractField = (typeof EXTRACT_FIELDS)[number];
export type ExtractStatus = "pass" | "weak" | "missing";

export type SurfaceId =
  | "classic_google"
  | "ai_overviews"
  | "ai_mode"
  | "chatgpt"
  | "perplexity"
  | "gemini";

export type SurfaceState = "retrieved" | "cited" | "invisible" | "unmeasured";

export type SurfaceRow = {
  id: SurfaceId;
  label: string;
  state: SurfaceState;
};

export type Extractability = Record<ExtractField, ExtractStatus>;

export type ProbeResult = {
  url: string;
  host: string;
  query: string | null;
  extractability: Extractability;
  asks: string[];
  surfaces: SurfaceRow[];
  chosen: "unmeasured";
  paid: "unmeasured";
};

export const SURFACE_BOARD: ReadonlyArray<{ id: SurfaceId; label: string }> = [
  { id: "classic_google", label: "Classic Google" },
  { id: "ai_overviews", label: "AI Overviews" },
  { id: "ai_mode", label: "AI Mode" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
];

export function emptyExtractability(): Extractability {
  return {
    title: "missing",
    h1: "missing",
    entity: "missing",
    schema: "missing",
    evidence: "missing",
    date: "missing",
  };
}

export function emptyBoard(): SurfaceRow[] {
  return SURFACE_BOARD.map((row) => ({
    id: row.id,
    label: row.label,
    state: "unmeasured",
  }));
}

export function emptyProbe(url: string, host = ""): ProbeResult {
  return {
    url,
    host,
    query: null,
    extractability: emptyExtractability(),
    asks: [],
    surfaces: emptyBoard(),
    chosen: "unmeasured",
    paid: "unmeasured",
  };
}
