export const SITE_URL = "https://hendricks.ai";

export const POSITIONING =
  "Hendricks designs, instruments, and operates the systems that decide whether a company is retrieved, cited, and chosen when a person or a model looks for an answer.";

export const BOOKING_URL = "https://calendar.app.google/DHopiSfnLiH5xwKo9";

export const NAV_ITEMS = [
  { href: "/practice", label: "Practice" },
  { href: "/method", label: "Method" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/briefing", label: "Briefing" },
] as const;

export const GATE_SKIP_PATHS = [
  "/practice",
  "/method",
  "/about",
  "/diagnostic",
  "/briefing",
  "/insights",
  "/pricing",
] as const;

export const ENTERED_COOKIE = "hendricks_entered";

export const DIAGNOSTIC = {
  name: "Retrieval Graph Diagnostic",
  price: "$15,000",
  duration: "3 weeks",
  lede:
    "A three-week instrument of how the firm is retrieved, cited, and chosen across Google, ChatGPT, Perplexity, and AI Overviews. You own the graph. Then you decide whether we install the system.",
  weeks: ["demand graph", "state", "architecture"] as const,
};

export const PRACTICE_MODULES = [
  {
    name: "Demand and Query System",
    body: "The living map of what people and models ask, clustered by job-to-be-done.",
  },
  {
    name: "Source Architecture",
    body: "The pages, entities, schema, and feeds that make the company extractable and citable.",
  },
  {
    name: "Multi-surface Measurement Harness",
    body: "One client-owned scoreboard for retrieved, cited, and chosen.",
  },
] as const;

export const REFUSAL =
  "We do not build chat lines, CRM agents, or ops automation. We do not sell SEO/PPC retainers.";

export const METHOD_STEPS = [
  "Diagnose",
  "Architect",
  "Install",
  "Operate",
] as const;

export const METHOD_OBJECT = "one search intelligence system";

export const TWO_BUYS =
  "Two buys. A Retrieval Graph Diagnostic, or one system we install and operate.";

export const SURFACES = [
  "Classic Google",
  "AI Overviews",
  "AI Mode",
  "ChatGPT",
  "Perplexity",
  "Gemini",
] as const;

export const CONTACT_EMAIL = "hello@hendricks.ai";
export const CONTACT_PLACE = "Houston, TX";
