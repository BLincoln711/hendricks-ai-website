import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../../components/navigation";
import { Footer } from "../../components/Footer";
import StickyMobileCTA from "../../components/sticky-mobile-cta";

export const metadata: Metadata = {
  title: "Gemini AI Visibility Metrics: The Complete Guide for B2B Companies | Hendricks.AI",
  description:
    "A complete guide to measuring AI visibility in Google Gemini for B2B companies. Learn the new metrics framework for Gemini Answer Presence, Entity Accuracy, and Competitive Share of Answer using Search Intelligence Engineering.",
  keywords: [
    "AI visibility metrics Gemini",
    "Gemini AI visibility",
    "AI search visibility",
    "Search Intelligence Engineering",
    "B2B AI visibility",
    "Gemini answer presence",
    "entity accuracy score",
    "competitive share of answer",
    "AI search measurement",
    "Gemini visibility measurement",
    "AI Overviews visibility",
    "ChatGPT visibility",
    "Perplexity visibility",
    "AI search metrics",
    "B2B search visibility"
  ],
  authors: [{ name: "Brandon Lincoln Hendricks", url: "https://hendricks.ai/about" }],
  openGraph: {
    title: "Gemini AI Visibility Metrics: The Complete Guide for B2B Companies",
    description: "A complete guide to measuring AI visibility in Google Gemini for B2B companies. Learn the new metrics framework using Search Intelligence Engineering.",
    url: "https://hendricks.ai/insights/ai-visibility-metrics-gemini",
    siteName: "Hendricks.AI",
    images: [
      {
        url: "https://hendricks.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gemini AI Visibility Metrics Guide for B2B Companies",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2025-11-24",
    modifiedTime: "2025-11-24",
    authors: ["Brandon Lincoln Hendricks"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gemini AI Visibility Metrics: The Complete Guide for B2B Companies",
    description: "A complete guide to measuring AI visibility in Google Gemini for B2B companies using Search Intelligence Engineering.",
    images: ["https://hendricks.ai/og-image.jpg"],
    creator: "@brandonhendricks",
  },
  alternates: {
    canonical: "https://hendricks.ai/insights/ai-visibility-metrics-gemini",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "@id": "https://hendricks.ai/insights/ai-visibility-metrics-gemini#article",
  headline: "Gemini AI Visibility Metrics: The Complete Guide for B2B Companies",
  alternativeHeadline: "How to Measure AI Search Visibility in Google Gemini for B2B",
  description:
    "A complete guide to AI Visibility Metrics in Gemini AI Mode for B2B companies. Learn Gemini Answer Presence Rate, Entity Accuracy Score, Competitive Share of Answer, and how to measure visibility using Search Intelligence Engineering.",
  image: "https://hendricks.ai/og-image.jpg",
  author: {
    "@type": "Person",
    "@id": "https://hendricks.ai/#brandon-hendricks",
    name: "Brandon Lincoln Hendricks",
    url: "https://hendricks.ai/about",
    jobTitle: "Founder, Search Intelligence Engineer",
    description: "Former Global Lead of Total Search at SolarWinds. Founder of Hendricks.AI specializing in AI Search Visibility measurement and attribution.",
    sameAs: [
      "https://www.linkedin.com/in/brandonlhendricks/",
      "https://twitter.com/brandonhendricks"
    ],
    worksFor: {
      "@type": "Organization",
      name: "Hendricks.AI",
      url: "https://hendricks.ai"
    }
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://hendricks.ai/#organization",
    name: "Hendricks.AI",
    url: "https://hendricks.ai",
    logo: {
      "@type": "ImageObject",
      url: "https://hendricks.ai/hendricks-ai-logo.png"
    }
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hendricks.ai/insights/ai-visibility-metrics-gemini"
  },
  url: "https://hendricks.ai/insights/ai-visibility-metrics-gemini",
  datePublished: "2025-11-24",
  dateModified: "2025-11-24",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  keywords: "AI visibility metrics, Gemini AI visibility, AI search visibility, Search Intelligence Engineering, B2B AI visibility measurement",
  articleSection: "AI Search Visibility",
  wordCount: 2200,
  about: [
    {
      "@type": "Thing",
      name: "AI Search Visibility",
      description: "The degree to which a brand is discoverable, correctly understood, and selected by AI powered search engines"
    },
    {
      "@type": "Thing",
      name: "Google Gemini",
      description: "Google's multimodal AI model that powers AI search experiences"
    },
    {
      "@type": "Thing",
      name: "Search Intelligence Engineering",
      description: "A framework for measuring and optimizing visibility across AI and traditional search engines"
    }
  ],
  mentions: [
    {
      "@type": "SoftwareApplication",
      name: "Google Gemini",
      applicationCategory: "AI Search Engine"
    },
    {
      "@type": "SoftwareApplication",
      name: "ChatGPT",
      applicationCategory: "AI Search Engine"
    },
    {
      "@type": "SoftwareApplication",
      name: "Perplexity",
      applicationCategory: "AI Search Engine"
    },
    {
      "@type": "SoftwareApplication",
      name: "Google AI Overviews",
      applicationCategory: "AI Search Feature"
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://hendricks.ai/insights/ai-visibility-metrics-gemini#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://hendricks.ai/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Insights",
      item: "https://hendricks.ai/insights",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Gemini AI Visibility Metrics: The Complete Guide for B2B Companies",
      item: "https://hendricks.ai/insights/ai-visibility-metrics-gemini",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://hendricks.ai/insights/ai-visibility-metrics-gemini#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Gemini different from AI Overviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemini provides synthesized reasoning, custom layouts, and multimodal interpretation that goes beyond traditional search summarization. While AI Overviews summarize existing content, Gemini AI Mode uses advanced reasoning to build dynamic answers with tables, comparisons, and interactive elements."
      }
    },
    {
      "@type": "Question",
      name: "Can rankings influence Gemini visibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not directly. Gemini optimizes for trust, clarity, and entity alignment, not keyword ranking. Your visibility in Gemini depends on entity comprehension, schema clarity, authoritative signals, context relevance, source trust, and reasoning patterns rather than traditional ranking factors."
      }
    },
    {
      "@type": "Question",
      name: "Does structured data matter for Gemini?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Structured data shapes entity understanding and influences answer selection. Gemini relies heavily on Organization schema, Product schema, FAQ schema, HowTo schema, entity attributes, and clean data hierarchies to understand and select content for inclusion in answers."
      }
    },
    {
      "@type": "Question",
      name: "Does Gemini include competitors automatically?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Only when their signals are stronger or better aligned with the question intent. Gemini evaluates entity comprehension, schema clarity, and source trust to determine which brands to include in answers. Competitive Share of Answer measures how often you appear versus competitors."
      }
    },
    {
      "@type": "Question",
      name: "What is Gemini Answer Presence Rate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemini Answer Presence Rate measures how often your brand appears inside Gemini answers for your target questions. This is the AI era's version of share of SERP. You measure it by running your buyer question library in Gemini and tracking presence across all responses."
      }
    },
    {
      "@type": "Question",
      name: "What is Entity Accuracy Score in AI visibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Entity Accuracy Score evaluates whether Gemini describes your brand correctly based on your offering, category, features, integrations, and use cases. Incorrect entity representation leads to lost deals before the buyer even reaches your site, making this a critical AI visibility metric."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://hendricks.ai/insights/ai-visibility-metrics-gemini#howto",
  name: "How to Measure Gemini AI Visibility",
  description: "A Search Intelligence Engineering approach to measuring AI visibility in Google Gemini for B2B companies",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Build a buyer question library",
      text: "Create 100 to 150 questions across awareness, evaluation, and decision intent stages that your B2B buyers ask."
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run questions through Gemini AI Mode monthly",
      text: "Document presence, position, structured inclusion, and entity accuracy for each question in Gemini."
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Score visibility using the metrics framework",
      text: "Apply Gemini Answer Presence Rate, Entity Accuracy Score, Competitive Share of Answer, and other metrics to quantify visibility."
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Compare results against other AI engines",
      text: "Compare Gemini results against ChatGPT, Perplexity, Google AI Overviews, and Bing Copilot for a complete AI visibility picture."
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Integrate data with GA4 and BigQuery",
      text: "Build unified measurement dashboards connecting AI visibility data with analytics to track impact on pipeline."
    }
  ]
};

export default function GeminiAIVisibilityMetricsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navigation />

      {/* Background gradient */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.20),_transparent_60%)] opacity-80" />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema, faqSchema, howToSchema]),
        }}
      />

      <main className="relative max-w-4xl mx-auto px-4 pt-20 pb-24">
        {/* Hero Section */}
        <section className="mb-10">
          <p className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
            Insights • AI Search Visibility
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold leading-tight text-slate-50">
            Gemini AI Visibility Metrics: The Complete Guide for B2B Companies
          </h1>
          <p className="mt-3 text-xs md:text-sm text-slate-300 max-w-xl">
            A complete guide to measuring and optimizing your brand&apos;s visibility in Google Gemini using the Search Intelligence Engineering framework.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>By <Link href="/about" className="text-sky-400 hover:text-sky-300">Brandon Lincoln Hendricks</Link></span>
            <span>•</span>
            <span>Founder, Search Intelligence Engineer at Hendricks.AI</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>November 24, 2025</span>
            <span>•</span>
            <span>12 min read</span>
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-4 text-xs text-slate-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1">
              <li><Link href="/" className="hover:text-sky-300">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/insights" className="hover:text-sky-300">Insights</Link></li>
              <li><span className="mx-1">/</span></li>
              <li className="text-slate-300">Gemini AI Visibility Metrics</li>
            </ol>
          </nav>
        </section>

        {/* Table of Contents */}
        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-sm font-semibold text-slate-50 mb-3">Table of Contents</h2>
          <ol className="ml-4 space-y-1 text-[13px] text-slate-300">
            <li>1. <a href="#executive-summary" className="hover:text-sky-300">Executive Summary</a></li>
            <li>2. <a href="#why-gemini-matters" className="hover:text-sky-300">Why Gemini Matters for B2B Search Visibility</a></li>
            <li>3. <a href="#how-gemini-generates" className="hover:text-sky-300">How Gemini Generates Answers</a></li>
            <li>4. <a href="#metrics-framework" className="hover:text-sky-300">The New AI Visibility Metrics Framework</a></li>
            <li>5. <a href="#gemini-metrics" className="hover:text-sky-300">Gemini AI Visibility Metrics</a></li>
            <li>6. <a href="#how-to-measure" className="hover:text-sky-300">How to Measure Gemini AI Visibility</a></li>
            <li>7. <a href="#hendricks-approach" className="hover:text-sky-300">How Hendricks.AI Measures Gemini Visibility</a></li>
            <li>8. <a href="#faq" className="hover:text-sky-300">Frequently Asked Questions</a></li>
          </ol>
        </section>

        <article className="space-y-8 text-xs md:text-sm text-slate-200">
          {/* Executive Summary */}
          <section id="executive-summary">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Executive Summary
            </h2>
            <p className="mt-4">
              Gemini is changing how B2B buyers discover and validate vendors. Instead of returning a list of ranked links, Gemini synthesizes answers using reasoning, multimodal understanding, and a deeper interpretation of entities, signals, and relationships. This shift requires a new way to measure visibility.
            </p>
            <p className="mt-3">
              <strong className="text-slate-50"><Link href="/glossary/ai-search-visibility" className="text-sky-400 hover:text-sky-300">AI Search Visibility</Link></strong> in Gemini is no longer about rankings. It is about whether the model understands your brand, trusts your signals, and selects your content for inclusion in generated answers.
            </p>
            <p className="mt-3">
              This guide defines the new Gemini AI Visibility Metrics for B2B companies, why they matter, and how to measure them using <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link>.
            </p>
          </section>

          {/* Why Gemini Matters */}
          <section id="why-gemini-matters">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Why Gemini Matters for B2B Search Visibility
            </h2>
            <p className="mt-4">
              B2B buyers now ask Gemini complex, multi step questions such as:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>&quot;Best workflow automation platforms for regulated industries&quot;</li>
              <li>&quot;Compare SIEM tools for enterprise security teams&quot;</li>
              <li>&quot;Which cloud observability platforms integrate with Snowflake&quot;</li>
            </ul>
            <p className="mt-3">
              Gemini does not respond with rankings. It responds with synthesized statements, structured comparisons, and multimodal reasoning.
            </p>
            <p className="mt-3 font-semibold text-slate-100">
              Your brand is either included or excluded.
            </p>
            <p className="mt-3">
              <Link href="/glossary/ai-search-visibility" className="text-sky-400 hover:text-sky-300">AI visibility</Link> in Gemini influences:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Shortlisting</li>
              <li>Vendor comparisons</li>
              <li>Trust and credibility signals</li>
              <li>Consideration and intent</li>
              <li>Early stage pipeline creation</li>
            </ul>
            <p className="mt-3">
              If you are not visible in Gemini, you are effectively invisible to the fastest growing discovery surface in B2B search.
            </p>
          </section>

          {/* How Gemini Generates Answers */}
          <section id="how-gemini-generates">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              How Gemini Generates Answers
            </h2>
            <p className="mt-4">
              Gemini uses three core mechanisms:
            </p>

            <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
              1. Query Fan Out
            </h3>
            <p className="mt-2">
              Gemini runs multiple internal searches and gathers web signals, citations, and <Link href="/glossary/entity-relationship-mapping" className="text-sky-400 hover:text-sky-300">entity relationships</Link> before forming a response.
            </p>

            <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
              2. Reasoning and Synthesis
            </h3>
            <p className="mt-2">
              Instead of ranking pages, Gemini builds a structured answer that blends sources, insights, and entity level understanding.
            </p>

            <h3 className="mt-4 text-sm md:text-base font-semibold text-slate-50">
              3. AI Mode and Multimodal Grounding
            </h3>
            <p className="mt-2">
              Gemini 3 can interpret text, images, charts, and structured data, allowing it to validate information beyond traditional crawling.
            </p>
            <p className="mt-3">
              This requires a new visibility measurement framework.
            </p>
          </section>

          {/* The New AI Visibility Metrics Framework */}
          <section id="metrics-framework">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              The New AI Visibility Metrics Framework
            </h2>
            <p className="mt-4">
              Traditional SEO metrics (rankings, clicks, impressions) do not apply inside Gemini. AI engines evaluate:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li><Link href="/glossary/entity-comprehension" className="text-sky-400 hover:text-sky-300">Entity comprehension</Link></li>
              <li>Schema clarity</li>
              <li><Link href="/glossary/entity-authority-signals" className="text-sky-400 hover:text-sky-300">Authoritative signals</Link></li>
              <li><Link href="/glossary/context-relevance-score" className="text-sky-400 hover:text-sky-300">Context relevance</Link></li>
              <li>Source trust</li>
              <li>Reasoning patterns</li>
            </ul>
            <p className="mt-3">
              <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> introduces a new visibility measurement system.
            </p>
            <p className="mt-3">
              Below are the core metrics.
            </p>
          </section>

          {/* Gemini AI Visibility Metrics */}
          <section id="gemini-metrics">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Gemini AI Visibility Metrics
            </h2>
            <p className="mt-4">
              These are the primary metrics that show how your brand appears inside Gemini responses.
            </p>

            {/* Metric 1 */}
            <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                1. Gemini Answer Presence Rate
              </h3>
              <p className="mt-2">
                Measures how often your brand appears inside Gemini answers for your target questions.
              </p>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> This is the AI era&apos;s version of <Link href="/glossary/visibility-share-of-voice" className="text-sky-400 hover:text-sky-300">&quot;share of SERP&quot;</Link>.
              </p>
              <p className="mt-2">
                <strong className="text-slate-100">How to measure:</strong> Run your buyer question library in Gemini and track presence across all responses.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                2. Gemini Answer Positioning
              </h3>
              <p className="mt-2">
                Evaluates where the brand appears in the answer:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>First sentence</li>
                <li>Fact statement</li>
                <li>Named comparison</li>
                <li>Secondary mention</li>
                <li>Reference or citation</li>
              </ul>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> Higher placement increases perceived authority. See <Link href="/glossary/answer-slot-positioning" className="text-sky-400 hover:text-sky-300">Answer Slot Positioning</Link>.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                3. Structured Answer Inclusion
              </h3>
              <p className="mt-2">
                Tracks when Gemini includes your brand in:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>Lists</li>
                <li>Tables</li>
                <li>Feature comparisons</li>
                <li>Pros and cons</li>
                <li>Recommendations</li>
              </ul>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> Structured answer visibility drives high intent discovery.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                4. Entity Accuracy Score
              </h3>
              <p className="mt-2">
                Evaluates whether Gemini describes your brand correctly based on:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>Offering</li>
                <li>Category</li>
                <li>Features</li>
                <li>Integrations</li>
                <li>Use cases</li>
              </ul>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> Incorrect <Link href="/glossary/entity-accuracy" className="text-sky-400 hover:text-sky-300">entity representation</Link> leads to lost deals before the buyer even reaches your site.
              </p>
            </div>

            {/* Metric 5 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                5. Context Alignment
              </h3>
              <p className="mt-2">
                Measures whether Gemini places your brand in the correct business context.
              </p>
              <p className="mt-2">
                <strong className="text-slate-100">Example:</strong> If you are an observability vendor but Gemini positions you as IT ticketing, visibility becomes meaningless.
              </p>
            </div>

            {/* Metric 6 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                6. Competitive Share of Answer
              </h3>
              <p className="mt-2">
                The percentage of Gemini answers that include you versus your top competitors.
              </p>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> This reveals who AI models prefer for your category. See <Link href="/glossary/competitor-citation-delta" className="text-sky-400 hover:text-sky-300">Competitor Citation Delta</Link>.
              </p>
            </div>

            {/* Metric 7 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                7. Gemini Reasoning Signal Weight
              </h3>
              <p className="mt-2">
                Tracks how often Gemini draws from your sources (site content, structured data, citations) within its reasoning patterns.
              </p>
              <p className="mt-2">
                <strong className="text-slate-100">Why it matters:</strong> Your signals must be strong enough to influence Gemini&apos;s answer formation.
              </p>
            </div>

            {/* Metric 8 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                8. Fan Out Source Influence
              </h3>
              <p className="mt-2">
                Gemini may not cite your site directly, but may pull from:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>Case studies</li>
                <li>Third party directories</li>
                <li>Thought leadership</li>
                <li>Reviews</li>
                <li>Data partners</li>
              </ul>
              <p className="mt-2">
                Monitoring signal influence matters as much as direct citation. See <Link href="/glossary/co-citation-networks" className="text-sky-400 hover:text-sky-300">Co-Citation Networks</Link>.
              </p>
            </div>

            {/* Metric 9 */}
            <div className="mt-4 rounded-xl border border-slate-700 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                9. Schema and Structured Data Compatibility
              </h3>
              <p className="mt-2">
                Gemini relies heavily on:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>Organization schema</li>
                <li>Product schema</li>
                <li>FAQ schema</li>
                <li>HowTo schema</li>
                <li>Entity attributes</li>
                <li>Clean data hierarchies</li>
              </ul>
              <p className="mt-2">
                These increase the probability of selection during synthesis. See <Link href="/glossary/schema-hierarchy-optimization" className="text-sky-400 hover:text-sky-300">Schema Hierarchy Optimization</Link>.
              </p>
            </div>
          </section>

          {/* How to Measure Gemini AI Visibility */}
          <section id="how-to-measure">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              How to Measure Gemini AI Visibility
            </h2>
            <p className="mt-4">
              A <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> approach includes:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Step 1: Build a Buyer Question Library
                </h3>
                <p className="mt-2">
                  100 to 150 questions across awareness, evaluation, and decision intent.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Step 2: Run Questions Through Gemini AI Mode Monthly
                </h3>
                <p className="mt-2">Document:</p>
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>Presence</li>
                  <li>Position</li>
                  <li>Structured inclusion</li>
                  <li>Entity accuracy</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Step 3: Score Visibility Using the Metrics Above
                </h3>
                <p className="mt-2">
                  Apply the Gemini AI Visibility Metrics framework to quantify your visibility.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Step 4: Compare Results Against Other AI Engines
                </h3>
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>ChatGPT</li>
                  <li>Perplexity</li>
                  <li>Google AI Overviews</li>
                  <li>Bing Copilot</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Step 5: Integrate Data with GA4 and BigQuery
                </h3>
                <p className="mt-2">
                  This is where Hendricks.AI excels — building unified measurement across AI engines and traditional search.
                </p>
              </div>
            </div>
          </section>

          {/* How Hendricks.AI Measures Gemini Visibility */}
          <section id="hendricks-approach">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              How Hendricks.AI Measures Gemini Visibility
            </h2>
            <p className="mt-4">
              As part of the <Link href="/solutions/foundation" className="text-sky-400 hover:text-sky-300">Foundation</Link> and <Link href="/solutions/system" className="text-sky-400 hover:text-sky-300">System</Link> tiers, Hendricks.AI provides:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>AI visibility indexing across Gemini, ChatGPT, Perplexity, AI Overviews</li>
              <li>Entity and schema engineering</li>
              <li>Monthly AI visibility scorecards</li>
              <li>Unified measurement dashboards</li>
              <li>Search Intelligence metrics tied directly to pipeline</li>
            </ul>
            <p className="mt-3">
              We help B2B companies understand how Gemini sees their brand and how to improve visibility across the AI search ecosystem.
            </p>

            {/* CTA Box */}
            <div className="mt-6 rounded-2xl border border-sky-500/40 bg-slate-900/90 p-5">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                Ready to Measure Your Gemini AI Visibility?
              </h3>
              <p className="mt-2">
                Hendricks.AI helps B2B companies measure, optimize, and attribute revenue across AI search engines including Gemini, ChatGPT, and Perplexity.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/solutions"
                  className="inline-flex items-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 transition-colors"
                >
                  View Subscription Tiers
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Book Visibility Consultation
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Frequently Asked Questions
            </h2>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  How is Gemini different from AI Overviews?
                </h3>
                <p className="mt-2">
                  Gemini provides synthesized reasoning, custom layouts, and multimodal interpretation that goes beyond traditional search summarization.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Can rankings influence Gemini visibility?
                </h3>
                <p className="mt-2">
                  Not directly. Gemini optimizes for trust, clarity, and <Link href="/glossary/entity-coherence" className="text-sky-400 hover:text-sky-300">entity alignment</Link>, not keyword ranking.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Does structured data matter for Gemini?
                </h3>
                <p className="mt-2">
                  Yes. Structured data shapes entity understanding and influences answer selection.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Does Gemini include competitors automatically?
                </h3>
                <p className="mt-2">
                  Only when their signals are stronger or better aligned with the question intent.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  What is Gemini Answer Presence Rate?
                </h3>
                <p className="mt-2">
                  Gemini Answer Presence Rate measures how often your brand appears inside Gemini answers for your target questions. This is the AI era&apos;s version of &quot;share of SERP.&quot;
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  What is Entity Accuracy Score in AI visibility?
                </h3>
                <p className="mt-2">
                  Entity Accuracy Score evaluates whether Gemini describes your brand correctly based on your offering, category, features, integrations, and use cases.
                </p>
              </div>
            </div>
          </section>

          {/* Related Insights */}
          <section className="mt-10 pt-8 border-t border-slate-800">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 mb-4">
              Related Insights
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/insights/how-gemini-3-ai-mode-changes-ai-search-visibility"
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:border-sky-500/40 transition-colors"
              >
                <h3 className="text-sm font-semibold text-slate-50">How Gemini 3 AI Mode Changes AI Search Visibility</h3>
                <p className="mt-1 text-xs text-slate-400">What B2B leaders need to understand about Google&apos;s most intelligent search experience yet.</p>
              </Link>
              <Link
                href="/insights/ai-search-visibility-guide"
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:border-sky-500/40 transition-colors"
              >
                <h3 className="text-sm font-semibold text-slate-50">The Complete Guide to AI Search Visibility</h3>
                <p className="mt-1 text-xs text-slate-400">Everything you need to know about measuring visibility across AI search engines.</p>
              </Link>
            </div>
          </section>

          {/* Glossary Reference */}
          <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-slate-50">
              New to AI Search Visibility?
            </h3>
            <p className="mt-2 text-xs text-slate-300">
              Explore our comprehensive <Link href="/glossary" className="text-sky-400 hover:text-sky-300">AI Search Visibility Glossary</Link> with 126+ terms covering visibility metrics, AI engine behaviors, content structures, and optimization frameworks.
            </p>
          </section>
        </article>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
