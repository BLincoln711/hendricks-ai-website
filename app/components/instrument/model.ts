export const STATES = ["retrieved", "cited", "chosen"] as const;
export type StateId = (typeof STATES)[number];

export const SURFACES = [
  { id: "classic_google", label: "Classic Google" },
  { id: "ai_overviews", label: "AI Overviews" },
  { id: "ai_mode", label: "AI Mode" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
] as const;

export type SurfaceId = (typeof SURFACES)[number]["id"];

export const DOGFOOD_QUERY = "what does Hendricks do";

export const CITED_SURFACES: SurfaceId[] = [
  "ai_overviews",
  "chatgpt",
  "perplexity",
  "gemini",
];

export const RETRIEVED_SURFACES: SurfaceId[] = ["classic_google"];

export function surfacesLiftedBy(state: StateId): SurfaceId[] {
  if (state === "cited") return CITED_SURFACES;
  if (state === "retrieved") return RETRIEVED_SURFACES;
  return [];
}
