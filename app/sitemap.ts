import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hendricks.ai";
  const now = new Date();

  const pages = [
    "",
    "/practice",
    "/method",
    "/about",
    "/diagnostic",
    "/pricing",
    "/briefing",
    "/insights",
    "/terms",
    "/privacy",
  ];

  const insights = [
    "what-is-search-intelligence-engineer",
    "what-is-ai-search-visibility-measurement",
    "how-to-measure-chatgpt-visibility",
    "how-to-appear-in-google-ai-overviews",
    "search-agency-vs-search-intelligence-firm",
    "what-is-visibility-audit",
    "why-measure-visibility-across-ai-search-engines",
    "chatgpt-vs-perplexity-vs-gemini",
    "how-gemini-3-ai-mode-changes-ai-search-visibility",
    "what-third-party-platforms-gemini-cites",
    "press-coverage-ai-visibility",
    "ai-search-visibility-guide",
    "ai-search-visibility-revenue-impact",
    "b2b-ai-visibility-companies",
    "ai-visibility-metrics-gemini",
    "what-is-unified-search-execution",
    "how-to-prove-search-roi-to-cfo",
    "google-ai-revolution-search-marketing",
    "death-of-keywords-ai-max-search",
    "b2b-marketing-funnel-is-dead",
    "google-meridian-mmm-predictive-ai",
    "ai-marketing-beyond-smart-bidding",
  ];

  return [
    ...pages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...insights.map((slug) => ({
      url: `${baseUrl}/insights/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
