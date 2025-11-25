import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "../../components/navigation";
import { Footer } from "../../components/Footer";
import StickyMobileCTA from "../../components/sticky-mobile-cta";

export const metadata: Metadata = {
  title: "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact? | Hendricks.AI",
  description:
    "A complete guide on how to connect AI search visibility with measurable pipeline and revenue impact using Search Intelligence Engineering, AI visibility measurement, and unified analytics in GA4 and BigQuery.",
  keywords: [
    "AI search visibility revenue",
    "AI visibility pipeline impact",
    "Search Intelligence Engineering",
    "AI visibility measurement",
    "AI attribution model",
    "AI search ROI",
    "B2B AI visibility analytics",
    "Gemini visibility revenue",
    "ChatGPT visibility pipeline",
    "Perplexity visibility measurement",
    "AI search analytics",
    "unified search attribution",
    "AI visibility BigQuery",
    "AI search GA4",
    "B2B pipeline attribution"
  ],
  authors: [{ name: "Brandon Lincoln Hendricks", url: "https://hendricks.ai/about" }],
  openGraph: {
    title: "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?",
    description: "A complete guide on connecting AI search visibility with pipeline and revenue using Search Intelligence Engineering and unified analytics.",
    url: "https://hendricks.ai/insights/ai-search-visibility-revenue-impact",
    siteName: "Hendricks.AI",
    images: [
      {
        url: "https://hendricks.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Connect AI Search Visibility to Pipeline and Revenue Impact",
      },
    ],
    locale: "en_US",
    type: "article",
    publishedTime: "2025-11-25",
    modifiedTime: "2025-11-25",
    authors: ["Brandon Lincoln Hendricks"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?",
    description: "A complete guide on connecting AI search visibility with pipeline and revenue using Search Intelligence Engineering.",
    images: ["https://hendricks.ai/og-image.jpg"],
    creator: "@brandonhendricks",
  },
  alternates: {
    canonical: "https://hendricks.ai/insights/ai-search-visibility-revenue-impact",
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
  "@id": "https://hendricks.ai/insights/ai-search-visibility-revenue-impact#article",
  headline: "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?",
  alternativeHeadline: "Connecting AI Search Visibility to B2B Pipeline and Revenue Using Search Intelligence Engineering",
  description:
    "Learn how to connect AI search visibility with pipeline and revenue using Search Intelligence Engineering, multi engine visibility, question mapping, and unified attribution in GA4 and BigQuery.",
  image: "https://hendricks.ai/og-image.jpg",
  author: {
    "@type": "Person",
    "@id": "https://hendricks.ai/#brandon-hendricks",
    name: "Brandon Lincoln Hendricks",
    url: "https://hendricks.ai/about",
    jobTitle: "Founder, Search Intelligence Engineer",
    description: "Former Global Lead of Total Search at SolarWinds. Former Global Search Director at Merkle and Dentsu. Founder of Hendricks.AI specializing in AI Search Visibility measurement and attribution.",
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
    "@id": "https://hendricks.ai/insights/ai-search-visibility-revenue-impact"
  },
  url: "https://hendricks.ai/insights/ai-search-visibility-revenue-impact",
  datePublished: "2025-11-25",
  dateModified: "2025-11-25",
  inLanguage: "en-US",
  isAccessibleForFree: true,
  keywords: "AI search visibility revenue, AI visibility pipeline, Search Intelligence Engineering, AI attribution, unified analytics, BigQuery, GA4",
  articleSection: "AI Search Visibility",
  wordCount: 3200,
  about: [
    {
      "@type": "Thing",
      name: "AI Search Visibility",
      description: "The degree to which a brand is discoverable and correctly represented in AI powered search engines"
    },
    {
      "@type": "Thing",
      name: "Pipeline Attribution",
      description: "The process of connecting marketing activities to measurable pipeline and revenue outcomes"
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
      name: "Google Analytics 4",
      applicationCategory: "Analytics Platform"
    },
    {
      "@type": "SoftwareApplication",
      name: "BigQuery",
      applicationCategory: "Data Warehouse"
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://hendricks.ai/insights/ai-search-visibility-revenue-impact#breadcrumb",
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
      name: "How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?",
      item: "https://hendricks.ai/insights/ai-search-visibility-revenue-impact",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://hendricks.ai/insights/ai-search-visibility-revenue-impact#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I connect AI search visibility with pipeline and revenue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Connect AI search visibility to pipeline and revenue by building a buyer question library, measuring visibility across AI engines (Gemini, ChatGPT, Perplexity), mapping visibility to funnel stages, integrating AI visibility signals into GA4 and BigQuery, and building an AI visibility attribution model that connects to CRM data."
      }
    },
    {
      "@type": "Question",
      name: "Why does AI search visibility need to connect to pipeline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Buyers now begin research with AI assistants that synthesize information rather than showing ranked links. AI visibility influences which vendors are introduced early, which solutions are recommended, and how categories are framed. Without connecting AI visibility to pipeline, organizations cannot identify discovery paths, visibility gaps, or revenue leakage."
      }
    },
    {
      "@type": "Question",
      name: "What is Search Intelligence Engineering?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Search Intelligence Engineering is a discipline that combines search marketing expertise with AI and ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI powered search engines. It provides a structured approach to connect AI search visibility with measurable pipeline and revenue outcomes."
      }
    },
    {
      "@type": "Question",
      name: "What metrics should I track for AI visibility attribution?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Track AI visibility score movement, competitive share of answer, entity accuracy improvements, presence and position across AI engines, opportunities influenced by AI visibility, and revenue influenced by AI driven evaluation. These metrics should be integrated into unified analytics using GA4 and BigQuery."
      }
    },
    {
      "@type": "Question",
      name: "Why can't most companies measure AI visibility impact today?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most organizations lack buyer question libraries, multi engine visibility indexing, unified analytics environments, entity engineering capabilities, and AI friendly measurement systems. Traditional SEO and channel reporting do not reveal how AI engines influence discovery and pipeline. A dedicated Search Intelligence Engineering system is required."
      }
    },
    {
      "@type": "Question",
      name: "How does Hendricks.AI connect AI visibility to revenue?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hendricks.AI provides AI visibility indexing across all major AI engines, entity and schema engineering, unified analytics in GA4 and BigQuery, AI attribution models, and Search Intelligence scorecards. This system reveals how AI engines influence discovery, evaluation, qualification, and revenue creation."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://hendricks.ai/insights/ai-search-visibility-revenue-impact#howto",
  name: "How to Connect AI Search Visibility With Pipeline and Revenue Impact",
  description: "A six step framework for connecting AI search visibility with measurable pipeline and revenue outcomes using Search Intelligence Engineering",
  totalTime: "P30D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Build a Buyer Question Library",
      text: "Create a library of 100 to 150 questions across awareness, evaluation, and decision intent that your buyers ask AI engines about options, comparisons, integrations, pricing, and use cases."
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Measure Visibility Across AI Engines",
      text: "Evaluate whether your brand appears inside AI generated responses. Track presence, position, entity accuracy, competitive share, and structured inclusion across Gemini, ChatGPT, Perplexity, Bing Copilot, and AI Overviews."
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Connect AI Visibility to Pipeline Intent",
      text: "Map which AI engines influence different moments of the buyer journey. Identify which buyer questions correlate with funnel stages and visibility gaps that cause pipeline drop offs."
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Integrate AI Visibility Signals Into GA4 and BigQuery",
      text: "Create a BigQuery AI visibility table. Map question level visibility to landing pages, brand searches, assisted conversions, and opportunity creation. Build an AI influence score using presence, accuracy, and answer position."
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Build an AI Visibility Attribution Model",
      text: "Create AI assist, AI discovery, AI evaluation influence, and entity accuracy impact models. Connect these to CRM data to understand opportunity volume, velocity, and influenced revenue."
    },
    {
      "@type": "HowToStep",
      position: 6,
      name: "Show Revenue Teams the Connection",
      text: "Share AI visibility metrics with marketing, revenue, and product teams including visibility score movement, competitive share of answer, entity accuracy improvements, and revenue influenced by AI driven evaluation."
    }
  ]
};

export default function AISearchVisibilityRevenueImpactPage() {
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
            How Do I Connect AI Search Visibility With Measurable Pipeline and Revenue Impact?
          </h1>
          <p className="mt-3 text-xs md:text-sm text-slate-300 max-w-xl">
            A complete guide to connecting AI visibility with pipeline and revenue using Search Intelligence Engineering, unified analytics, and AI attribution models.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>By <Link href="/about" className="text-sky-400 hover:text-sky-300">Brandon Lincoln Hendricks</Link></span>
            <span>•</span>
            <span>Founder, Search Intelligence Engineer at Hendricks.AI</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span>November 25, 2025</span>
            <span>•</span>
            <span>15 min read</span>
          </div>

          {/* Breadcrumbs */}
          <nav className="mt-4 text-xs text-slate-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1">
              <li><Link href="/" className="hover:text-sky-300">Home</Link></li>
              <li><span className="mx-1">/</span></li>
              <li><Link href="/insights" className="hover:text-sky-300">Insights</Link></li>
              <li><span className="mx-1">/</span></li>
              <li className="text-slate-300">AI Search Visibility Revenue Impact</li>
            </ol>
          </nav>
        </section>

        {/* Table of Contents */}
        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
          <h2 className="text-sm font-semibold text-slate-50 mb-3">Table of Contents</h2>
          <ol className="ml-4 space-y-1 text-[13px] text-slate-300">
            <li>1. <a href="#executive-summary" className="hover:text-sky-300">Executive Summary</a></li>
            <li>2. <a href="#why-connect-pipeline" className="hover:text-sky-300">Why AI Search Visibility Must Connect to Pipeline</a></li>
            <li>3. <a href="#sie-approach" className="hover:text-sky-300">The Search Intelligence Engineering Approach</a></li>
            <li>4. <a href="#step-1" className="hover:text-sky-300">Step 1: Build a Buyer Question Library</a></li>
            <li>5. <a href="#step-2" className="hover:text-sky-300">Step 2: Measure Visibility Across AI Engines</a></li>
            <li>6. <a href="#step-3" className="hover:text-sky-300">Step 3: Connect AI Visibility to Pipeline Intent</a></li>
            <li>7. <a href="#step-4" className="hover:text-sky-300">Step 4: Integrate AI Visibility Signals Into GA4 and BigQuery</a></li>
            <li>8. <a href="#step-5" className="hover:text-sky-300">Step 5: Build an AI Visibility Attribution Model</a></li>
            <li>9. <a href="#step-6" className="hover:text-sky-300">Step 6: Show Revenue Teams the Connection</a></li>
            <li>10. <a href="#why-most-cannot" className="hover:text-sky-300">Why Most Companies Cannot Measure This Today</a></li>
            <li>11. <a href="#hendricks-approach" className="hover:text-sky-300">How Hendricks.AI Connects AI Visibility to Revenue</a></li>
            <li>12. <a href="#faq" className="hover:text-sky-300">Frequently Asked Questions</a></li>
          </ol>
        </section>

        <article className="space-y-8 text-xs md:text-sm text-slate-200">
          {/* Executive Summary */}
          <section id="executive-summary">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Executive Summary
            </h2>
            <p className="mt-4">
              AI powered search engines such as Gemini, ChatGPT, Perplexity, Bing Copilot, and Google AI Overviews influence B2B discovery long before prospects reach a website. Traditional analytics cannot show how AI engines shape evaluation and decision behavior.
            </p>
            <p className="mt-3">
              A new measurement model is required. <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> provides a structured approach to connect <Link href="/glossary/ai-search-visibility" className="text-sky-400 hover:text-sky-300">AI search visibility</Link> with measurable pipeline and revenue outcomes.
            </p>
            <p className="mt-3">
              This guide presents a six step framework for building that connection using buyer question libraries, multi engine visibility measurement, unified analytics, and AI attribution models.
            </p>
          </section>

          {/* Why AI Search Visibility Must Connect to Pipeline */}
          <section id="why-connect-pipeline">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Why AI Search Visibility Must Connect to Pipeline
            </h2>
            <p className="mt-4">
              Buyers now begin research with AI assistants that synthesize information, not ranked links. This fundamentally changes the discovery and evaluation process.
            </p>
            <p className="mt-3">
              AI visibility influences:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-2">
              <li><strong className="text-slate-100">Which vendors are introduced early</strong> — AI engines shape initial awareness and consideration sets</li>
              <li><strong className="text-slate-100">Which solutions are recommended</strong> — Generated answers position specific products as answers to buyer problems</li>
              <li><strong className="text-slate-100">How categories are framed</strong> — AI engines define category boundaries and competitive relationships</li>
              <li><strong className="text-slate-100">Trust and credibility signals</strong> — How AI describes your brand affects buyer confidence</li>
            </ul>

            <div className="mt-6 rounded-xl border border-yellow-500/30 bg-slate-900/60 p-4">
              <h3 className="text-sm md:text-base font-semibold text-yellow-400">
                The Hidden Revenue Leakage Problem
              </h3>
              <p className="mt-2">
                Without connecting AI visibility to pipeline, organizations cannot identify:
              </p>
              <ul className="mt-2 ml-5 list-disc space-y-1">
                <li>Discovery paths that lead to qualified opportunities</li>
                <li>Visibility gaps causing prospects to choose competitors</li>
                <li>Revenue leakage from incorrect entity representation</li>
                <li>Which AI engines drive the most valuable pipeline</li>
              </ul>
            </div>
          </section>

          {/* The Search Intelligence Engineering Approach */}
          <section id="sie-approach">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              The Search Intelligence Engineering Approach
            </h2>
            <p className="mt-4">
              Connecting AI visibility to pipeline requires a unified system. <Link href="/" className="text-sky-400 hover:text-sky-300">Hendricks.AI</Link> uses a four layer method:
            </p>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-slate-50">1. Multi Engine Visibility Indexing</h3>
                <p className="mt-2 text-slate-400">
                  Systematic measurement of brand presence across Gemini, ChatGPT, Perplexity, Bing Copilot, and AI Overviews
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-slate-50">2. Buyer Question Mapping</h3>
                <p className="mt-2 text-slate-400">
                  Library of buyer questions mapped to funnel stages and purchase intent
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-slate-50">3. Visibility to Intent Modeling</h3>
                <p className="mt-2 text-slate-400">
                  Correlation analysis between AI visibility and downstream engagement signals
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-slate-50">4. Unified Analytics</h3>
                <p className="mt-2 text-slate-400">
                  Integration of AI visibility data with GA4, BigQuery, and CRM systems
                </p>
              </div>
            </div>

            <p className="mt-4">
              This framework creates a measurable link between AI search and revenue that can be tracked, optimized, and attributed.
            </p>
          </section>

          {/* Step 1: Build a Buyer Question Library */}
          <section id="step-1">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 1: Build a Buyer Question Library
            </h2>
            <p className="mt-4">
              Every AI driven pipeline path begins with a question. Buyers ask AI engines about options, comparisons, integrations, pricing, and suitability for specific use cases.
            </p>
            <p className="mt-3">
              Build a library of <strong className="text-slate-100">100 to 150 questions</strong> across three intent categories:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Awareness Intent (40 to 50 questions)
                </h3>
                <p className="mt-2">
                  Questions about category definition, problem identification, and solution types:
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-slate-400">
                  <li>&quot;What is [category]?&quot;</li>
                  <li>&quot;How do companies solve [problem]?&quot;</li>
                  <li>&quot;What are the types of [solution]?&quot;</li>
                  <li>&quot;Why do enterprises need [capability]?&quot;</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Evaluation Intent (40 to 50 questions)
                </h3>
                <p className="mt-2">
                  Questions about comparison, features, and fit:
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-slate-400">
                  <li>&quot;Best [category] platforms for [industry]&quot;</li>
                  <li>&quot;Compare [your product] vs [competitor]&quot;</li>
                  <li>&quot;Which [solution] integrates with [tool]?&quot;</li>
                  <li>&quot;[Category] for enterprise security teams&quot;</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Decision Intent (20 to 30 questions)
                </h3>
                <p className="mt-2">
                  Questions about pricing, implementation, and validation:
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1 text-slate-400">
                  <li>&quot;[Product] pricing and packages&quot;</li>
                  <li>&quot;How long does [product] implementation take?&quot;</li>
                  <li>&quot;[Product] customer reviews and case studies&quot;</li>
                  <li>&quot;Is [product] SOC 2 compliant?&quot;</li>
                </ul>
              </div>
            </div>

            <p className="mt-4">
              These questions form the basis of AI visibility measurement and pipeline attribution.
            </p>
          </section>

          {/* Step 2: Measure Visibility Across AI Engines */}
          <section id="step-2">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 2: Measure Visibility Across AI Engines
            </h2>
            <p className="mt-4">
              Evaluate whether your brand appears inside AI generated responses. For each question in your library, track:
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-50">Metric</th>
                    <th className="text-left py-3 px-4 text-slate-50">What It Measures</th>
                    <th className="text-left py-3 px-4 text-slate-50">Why It Matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Presence</td>
                    <td className="py-3 px-4">Whether your brand appears in the answer</td>
                    <td className="py-3 px-4">Basic visibility threshold</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Position</td>
                    <td className="py-3 px-4">Where you appear (first, comparison, secondary)</td>
                    <td className="py-3 px-4">Higher position = higher authority</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100"><Link href="/glossary/entity-accuracy" className="text-sky-400 hover:text-sky-300">Entity Accuracy</Link></td>
                    <td className="py-3 px-4">Whether AI describes you correctly</td>
                    <td className="py-3 px-4">Incorrect descriptions lose deals</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100"><Link href="/glossary/competitor-citation-delta" className="text-sky-400 hover:text-sky-300">Competitive Share</Link></td>
                    <td className="py-3 px-4">How often you appear vs competitors</td>
                    <td className="py-3 px-4">Share of AI driven consideration</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Structured Inclusion</td>
                    <td className="py-3 px-4">Appearance in lists, tables, comparisons</td>
                    <td className="py-3 px-4">High intent discovery signals</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              Measure across all major AI engines: <strong className="text-slate-100">Gemini, ChatGPT, Perplexity, Bing Copilot, and Google AI Overviews</strong>. Each engine has different retrieval patterns and influences different buyer moments.
            </p>
          </section>

          {/* Step 3: Connect AI Visibility to Pipeline Intent */}
          <section id="step-3">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 3: Connect AI Visibility to Pipeline Intent
            </h2>
            <p className="mt-4">
              Different AI engines influence different moments of the buyer journey:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Gemini — Category Framing and Discovery
                </h3>
                <p className="mt-2">
                  Gemini shapes how categories are defined and which vendors are introduced early. High Gemini visibility influences awareness stage pipeline.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  ChatGPT — Evaluation Assistance
                </h3>
                <p className="mt-2">
                  Buyers use ChatGPT to compare options, understand features, and validate fit. ChatGPT visibility influences evaluation stage pipeline.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Perplexity — Credibility Through Citations
                </h3>
                <p className="mt-2">
                  Perplexity&apos;s citation based answers build trust through source attribution. Perplexity visibility strengthens credibility during late evaluation.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Bing Copilot — Enterprise Microsoft Users
                </h3>
                <p className="mt-2">
                  Bing Copilot reaches enterprise users within the Microsoft ecosystem. Visibility here influences IT and enterprise buyer segments.
                </p>
              </div>
            </div>

            <p className="mt-4">
              Map which buyer questions correlate with funnel stages and identify visibility gaps that cause drop offs in pipeline creation.
            </p>
          </section>

          {/* Step 4: Integrate AI Visibility Signals Into GA4 and BigQuery */}
          <section id="step-4">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 4: Integrate AI Visibility Signals Into GA4 and BigQuery
            </h2>
            <p className="mt-4">
              Connecting AI visibility to revenue requires unified analytics. Build the following infrastructure:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-sky-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-sky-400">
                  1. Create a BigQuery AI Visibility Table
                </h3>
                <p className="mt-2">
                  Store question level visibility data with timestamps, engine source, presence, position, entity accuracy, and competitive context.
                </p>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-sky-400">
                  2. Map Visibility to Engagement Signals
                </h3>
                <p className="mt-2">
                  Connect question level visibility to:
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>Landing page traffic patterns</li>
                  <li>Brand search volume changes</li>
                  <li>Assisted conversions in GA4</li>
                  <li>Form submissions and demo requests</li>
                </ul>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-sky-400">
                  3. Build an AI Influence Score
                </h3>
                <p className="mt-2">
                  Create a composite score using presence rate, entity accuracy, answer position, and competitive share. This score becomes the foundation for attribution modeling.
                </p>
              </div>

              <div className="rounded-xl border border-sky-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-sky-400">
                  4. Connect to CRM Data
                </h3>
                <p className="mt-2">
                  Link AI visibility signals to opportunity data to understand:
                </p>
                <ul className="mt-2 ml-5 list-disc space-y-1">
                  <li>Opportunity volume by visibility score</li>
                  <li>Pipeline velocity for AI influenced deals</li>
                  <li>Win rate correlation with visibility</li>
                  <li>Revenue influenced by AI discovery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Step 5: Build an AI Visibility Attribution Model */}
          <section id="step-5">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 5: Build an AI Visibility Attribution Model
            </h2>
            <p className="mt-4">
              AI search requires a dedicated attribution layer. Hendricks.AI builds four attribution models that operate alongside traditional first touch, last touch, and multi touch attribution:
            </p>

            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  AI Assist Attribution
                </h3>
                <p className="mt-2">
                  Credits AI visibility when it appears in the path to conversion but is not the primary driver. Similar to assisted conversions in traditional attribution.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  AI Discovery Attribution
                </h3>
                <p className="mt-2">
                  Credits AI visibility when awareness intent questions drive initial brand discovery. Measures AI&apos;s role in top of funnel pipeline creation.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  AI Evaluation Influence Attribution
                </h3>
                <p className="mt-2">
                  Credits AI visibility when evaluation intent questions influence deal progression. Measures AI&apos;s role in moving opportunities through the funnel.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Entity Accuracy Impact Attribution
                </h3>
                <p className="mt-2">
                  Measures the revenue impact of entity accuracy improvements. Connects changes in how AI describes your brand to changes in pipeline quality and velocity.
                </p>
              </div>
            </div>
          </section>

          {/* Step 6: Show Revenue Teams the Connection */}
          <section id="step-6">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Step 6: Show Revenue Teams the Connection
            </h2>
            <p className="mt-4">
              To ensure alignment across marketing, revenue, and product teams, share specific AI visibility metrics:
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-50">Metric</th>
                    <th className="text-left py-3 px-4 text-slate-50">Audience</th>
                    <th className="text-left py-3 px-4 text-slate-50">Business Question Answered</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Visibility Score Movement</td>
                    <td className="py-3 px-4">Marketing Leadership</td>
                    <td className="py-3 px-4">Are we becoming more visible in AI search?</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Competitive Share of Answer</td>
                    <td className="py-3 px-4">Product Marketing</td>
                    <td className="py-3 px-4">How often do we appear vs competitors?</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Entity Accuracy Improvements</td>
                    <td className="py-3 px-4">Content and Brand</td>
                    <td className="py-3 px-4">Is AI describing us correctly?</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Opportunities Influenced</td>
                    <td className="py-3 px-4">Revenue Operations</td>
                    <td className="py-3 px-4">How many deals did AI visibility influence?</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-medium text-slate-100">Revenue Influenced</td>
                    <td className="py-3 px-4">Executive Leadership</td>
                    <td className="py-3 px-4">What is the dollar impact of AI visibility?</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-4">
              This reporting supports strategic decision making across the organization and demonstrates the ROI of AI visibility investment.
            </p>
          </section>

          {/* Why Most Companies Cannot Measure This Today */}
          <section id="why-most-cannot">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Why Most Companies Cannot Measure This Today
            </h2>
            <p className="mt-4">
              Most organizations lack the infrastructure required to connect AI visibility to pipeline:
            </p>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-red-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-red-400">No Buyer Question Libraries</h3>
                <p className="mt-1 text-slate-400">Without systematic question mapping, there is no foundation for visibility measurement</p>
              </div>
              <div className="rounded-xl border border-red-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-red-400">No Multi Engine Indexing</h3>
                <p className="mt-1 text-slate-400">Measuring visibility on one engine misses how different platforms influence different buyer moments</p>
              </div>
              <div className="rounded-xl border border-red-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-red-400">No Unified Analytics Environment</h3>
                <p className="mt-1 text-slate-400">AI visibility data is disconnected from GA4, BigQuery, and CRM systems</p>
              </div>
              <div className="rounded-xl border border-red-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-red-400">No Entity Engineering</h3>
                <p className="mt-1 text-slate-400">Without schema and entity optimization, AI engines may misunderstand or exclude the brand</p>
              </div>
              <div className="rounded-xl border border-red-500/30 bg-slate-900/60 p-4">
                <h3 className="text-sm font-semibold text-red-400">No AI Attribution Models</h3>
                <p className="mt-1 text-slate-400">Traditional attribution does not account for AI influence on discovery and evaluation</p>
              </div>
            </div>

            <p className="mt-4">
              Traditional SEO and channel reporting do not reveal how AI engines influence discovery and pipeline. A dedicated <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> system is required.
            </p>
          </section>

          {/* How Hendricks.AI Connects AI Visibility to Revenue */}
          <section id="hendricks-approach">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              How Hendricks.AI Connects AI Visibility to Revenue
            </h2>
            <p className="mt-4">
              <Link href="/" className="text-sky-400 hover:text-sky-300">Hendricks.AI</Link> provides the complete infrastructure to connect AI visibility with pipeline and revenue:
            </p>

            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li><strong className="text-slate-100">AI Visibility Indexing</strong> — Systematic measurement across Gemini, ChatGPT, Perplexity, Bing Copilot, and AI Overviews</li>
              <li><strong className="text-slate-100">Entity and Schema Engineering</strong> — Structured data architecture that improves how AI engines understand your brand</li>
              <li><strong className="text-slate-100">Unified Analytics</strong> — Integration with GA4 and BigQuery for connected measurement</li>
              <li><strong className="text-slate-100">AI Attribution Models</strong> — Dedicated attribution that credits AI influence on pipeline</li>
              <li><strong className="text-slate-100">Search Intelligence Scorecards</strong> — Executive reporting that shows the revenue impact of AI visibility</li>
            </ul>

            <p className="mt-3">
              The Hendricks.AI system reveals how AI engines influence discovery, evaluation, qualification, and revenue. This approach creates a measurable connection between AI search visibility and pipeline creation.
            </p>

            {/* CTA Box */}
            <div className="mt-6 rounded-2xl border border-sky-500/40 bg-slate-900/90 p-5">
              <h3 className="text-sm md:text-base font-semibold text-slate-50">
                Ready to Connect AI Visibility to Pipeline?
              </h3>
              <p className="mt-2">
                Hendricks.AI helps B2B companies measure, optimize, and attribute revenue across AI search engines. Our unified measurement system connects AI visibility directly to pipeline and revenue.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/solutions"
                  className="inline-flex items-center rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 transition-colors"
                >
                  View Solutions
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Book Attribution Consultation
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
                  How do I connect AI search visibility with pipeline and revenue?
                </h3>
                <p className="mt-2">
                  Build a buyer question library, measure visibility across AI engines, map visibility to funnel stages, integrate signals into GA4 and BigQuery, and build an AI visibility attribution model connected to CRM data.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Why does AI search visibility need to connect to pipeline?
                </h3>
                <p className="mt-2">
                  AI engines influence which vendors are discovered, which solutions are recommended, and how categories are framed. Without connecting visibility to pipeline, you cannot identify discovery paths, visibility gaps, or revenue leakage.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  What is Search Intelligence Engineering?
                </h3>
                <p className="mt-2">
                  <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> is a discipline that combines search marketing expertise with AI and ML engineering to build systems that measure, attribute, and optimize visibility across traditional and AI powered search engines.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  What metrics should I track for AI visibility attribution?
                </h3>
                <p className="mt-2">
                  Track visibility score movement, competitive share of answer, entity accuracy improvements, presence and position across AI engines, opportunities influenced by AI visibility, and revenue influenced by AI driven evaluation.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  Why can&apos;t most companies measure AI visibility impact today?
                </h3>
                <p className="mt-2">
                  Most organizations lack buyer question libraries, multi engine indexing, unified analytics environments, entity engineering, and AI attribution models. Traditional SEO tools do not measure AI visibility.
                </p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  How does Hendricks.AI connect AI visibility to revenue?
                </h3>
                <p className="mt-2">
                  Hendricks.AI provides AI visibility indexing, entity and schema engineering, unified analytics in GA4 and BigQuery, AI attribution models, and Search Intelligence scorecards that show revenue impact.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section id="conclusion">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 border-b border-slate-800 pb-2">
              Conclusion
            </h2>
            <p className="mt-4">
              AI search visibility can be directly connected to measurable pipeline and revenue impact. It requires:
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>Multi engine visibility measurement</li>
              <li>Structured buyer question libraries</li>
              <li>Entity engineering</li>
              <li>Unified analytics in GA4 and BigQuery</li>
              <li>Dedicated AI visibility attribution models</li>
            </ul>
            <p className="mt-3">
              <Link href="/glossary/search-intelligence-engineering" className="text-sky-400 hover:text-sky-300">Search Intelligence Engineering</Link> unifies these components into a system that reveals how AI engines influence the entire B2B buyer journey, from initial discovery through closed revenue.
            </p>
            <p className="mt-3">
              Organizations that build this measurement infrastructure now will have a significant competitive advantage as AI search becomes the dominant discovery channel for B2B buyers.
            </p>
          </section>

          {/* Related Insights */}
          <section className="mt-10 pt-8 border-t border-slate-800">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50 mb-4">
              Related Insights
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Link
                href="/insights/ai-visibility-metrics-gemini"
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:border-sky-500/40 transition-colors"
              >
                <h3 className="text-sm font-semibold text-slate-50">Gemini AI Visibility Metrics: The Complete Guide for B2B Companies</h3>
                <p className="mt-1 text-xs text-slate-400">Learn the new metrics framework for measuring AI visibility in Google Gemini.</p>
              </Link>
              <Link
                href="/insights/b2b-ai-visibility-companies"
                className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:border-sky-500/40 transition-colors"
              >
                <h3 className="text-sm font-semibold text-slate-50">Where Can I Find B2B Companies Specializing in AI Visibility?</h3>
                <p className="mt-1 text-xs text-slate-400">A complete guide to finding AI visibility specialists and Search Intelligence Engineering firms.</p>
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
