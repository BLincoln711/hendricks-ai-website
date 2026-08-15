import type { Extractability, ExtractStatus } from "./types";
import { emptyExtractability } from "./types";
import { normalizeHost } from "./host";

const GENERIC_TITLES = new Set([
  "home",
  "homepage",
  "untitled",
  "welcome",
  "index",
  "website",
  "new page",
]);

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function firstMatch(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  return match?.[1] ? decodeEntities(match[1].replace(/\s+/g, " ").trim()) : null;
}

function allMatches(html: string, pattern: RegExp): string[] {
  return [...html.matchAll(pattern)]
    .map((match) => (match[1] ? stripTags(match[1]) : ""))
    .filter(Boolean);
}

function parseJsonLd(html: string): unknown[] {
  const blocks = [
    ...html.matchAll(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
    ),
  ];
  const docs: unknown[] = [];
  for (const block of blocks) {
    const raw = block[1]?.trim();
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) docs.push(...parsed);
      else docs.push(parsed);
    } catch {
      // Invalid JSON-LD is not a schema we can use.
    }
  }
  return docs;
}

function flattenGraph(docs: unknown[]): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const visit = (value: unknown) => {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }
    const record = value as Record<string, unknown>;
    out.push(record);
    if (record["@graph"]) visit(record["@graph"]);
  };
  docs.forEach(visit);
  return out;
}

function typeList(value: unknown): string[] {
  if (typeof value === "string") return [value.replace(/^https?:\/\/schema\.org\//, "")];
  if (Array.isArray(value)) return value.flatMap(typeList);
  return [];
}

function metaContent(html: string, names: string[]): string | null {
  for (const name of names) {
    const property = firstMatch(
      html,
      new RegExp(
        `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
        "i"
      )
    );
    if (property) return property;
    const reversed = firstMatch(
      html,
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${name}["']`,
        "i"
      )
    );
    if (reversed) return reversed;
  }
  return null;
}

function classifyTitle(title: string | null, host: string): ExtractStatus {
  if (!title) return "missing";
  const compact = title.replace(/\s+/g, " ").trim();
  if (!compact) return "missing";
  if (GENERIC_TITLES.has(compact.toLowerCase())) return "weak";
  if (compact.length < 12) return "weak";
  if (normalizeHost(compact) === normalizeHost(host)) return "weak";
  return "pass";
}

function classifyH1(h1s: string[]): ExtractStatus {
  const usable = h1s.map((h) => h.trim()).filter(Boolean);
  if (usable.length === 0) return "missing";
  if (usable.length > 2) return "weak";
  if (usable[0].length < 8 || GENERIC_TITLES.has(usable[0].toLowerCase())) return "weak";
  return "pass";
}

const ENTITY_TYPES = new Set([
  "Organization",
  "Corporation",
  "LocalBusiness",
  "ProfessionalService",
  "Person",
  "Brand",
  "NewsMediaOrganization",
]);

const MEANINGFUL_SCHEMA = new Set([
  ...ENTITY_TYPES,
  "Article",
  "NewsArticle",
  "BlogPosting",
  "FAQPage",
  "Product",
  "Service",
  "WebPage",
  "WebSite",
  "BreadcrumbList",
  "HowTo",
  "TechArticle",
]);

function classifyEntity(
  nodes: Record<string, unknown>[],
  title: string | null,
  siteName: string | null
): ExtractStatus {
  const hasStructuredEntity = nodes.some((node) =>
    typeList(node["@type"]).some((type) => ENTITY_TYPES.has(type) && Boolean(node.name))
  );
  if (hasStructuredEntity) return "pass";
  if (siteName && siteName.length > 1) return "weak";
  if (title && /[A-Z][A-Za-z0-9&'.-]+/.test(title)) return "weak";
  return "missing";
}

function classifySchema(nodes: Record<string, unknown>[], hasMicrodata: boolean): ExtractStatus {
  const types = new Set(nodes.flatMap((node) => typeList(node["@type"])));
  if (types.size === 0 && !hasMicrodata) return "missing";
  const meaningful = [...types].filter((type) => MEANINGFUL_SCHEMA.has(type));
  if (meaningful.some((type) => type !== "WebSite" && type !== "WebPage")) return "pass";
  if (hasMicrodata || meaningful.length > 0) return "weak";
  return "missing";
}

function classifyEvidence(html: string, nodes: Record<string, unknown>[]): ExtractStatus {
  const author =
    metaContent(html, ["author", "article:author", "citation_author"]) ||
    nodes.some((node) => node.author);
  const hasCite = /<cite\b/i.test(html) || /<blockquote[^>]+cite=/i.test(html);
  const hasReferences = /id=["'](references|sources|citations|footnotes)["']/i.test(html);
  const hasByline = /rel=["']author["']/i.test(html);

  if ((author || hasByline) && (hasCite || hasReferences)) return "pass";
  if (author || hasByline || hasCite || hasReferences) return "weak";
  return "missing";
}

function classifyDate(html: string, nodes: Record<string, unknown>[]): ExtractStatus {
  const metaDate = metaContent(html, [
    "article:published_time",
    "article:modified_time",
    "og:updated_time",
    "date",
    "pubdate",
    "DC.date",
  ]);
  const timeAttr = firstMatch(html, /<time[^>]+datetime=["']([^"']+)["']/i);
  const schemaDate = nodes
    .map((node) => node.datePublished || node.dateModified || node.dateCreated)
    .find((value) => typeof value === "string") as string | undefined;

  const raw = metaDate || timeAttr || schemaDate || null;
  if (!raw) return "missing";
  if (/^\d{4}$/.test(raw.trim())) return "weak";
  if (/\d{4}/.test(raw)) return "pass";
  return "weak";
}

export type PageSignals = {
  title: string | null;
  h1s: string[];
  headings: string[];
  siteName: string | null;
  description: string | null;
  faqQuestions: string[];
};

export function readPageSignals(html: string): PageSignals {
  const nodes = flattenGraph(parseJsonLd(html));
  const faqQuestions = nodes
    .filter((node) => typeList(node["@type"]).includes("Question"))
    .map((node) => (typeof node.name === "string" ? node.name.trim() : ""))
    .filter(Boolean);

  const mainEntity = nodes.find((node) => typeList(node["@type"]).includes("FAQPage"))
    ?.mainEntity;
  if (Array.isArray(mainEntity)) {
    for (const item of mainEntity) {
      if (item && typeof item === "object" && typeof (item as { name?: string }).name === "string") {
        faqQuestions.push((item as { name: string }).name.trim());
      }
    }
  }

  return {
    title: firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    h1s: allMatches(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi),
    headings: allMatches(html, /<h[1-3]\b[^>]*>([\s\S]*?)<\/h[1-3]>/gi),
    siteName: metaContent(html, ["og:site_name", "application-name"]),
    description: metaContent(html, ["description", "og:description"]),
    faqQuestions: [...new Set(faqQuestions)],
  };
}

export function extractabilityFromHtml(html: string, host: string): Extractability {
  if (!html.trim()) return emptyExtractability();

  const nodes = flattenGraph(parseJsonLd(html));
  const signals = readPageSignals(html);
  const hasMicrodata = /itemtype=["'][^"']*schema\.org/i.test(html);

  return {
    title: classifyTitle(signals.title, host),
    h1: classifyH1(signals.h1s),
    entity: classifyEntity(nodes, signals.title, signals.siteName),
    schema: classifySchema(nodes, hasMicrodata),
    evidence: classifyEvidence(html, nodes),
    date: classifyDate(html, nodes),
  };
}
