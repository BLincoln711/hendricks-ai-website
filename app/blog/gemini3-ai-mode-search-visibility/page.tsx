import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

const TITLE = "How Gemini 3 AI Mode Changes AI Search Visibility";
const DESCRIPTION =
  "Gemini 3 inside AI Mode reshapes how brands win visibility in Google Search, shifting value toward structured entities, task friendly content, and AI native paid strategies.";

export const metadata: Metadata = {
  title: `${TITLE} | Hendricks.AI`,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    url: "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility",
    siteName: "Hendricks.AI",
    images: [
      {
        url: "https://hendricks.ai/gemini3-blog-og.png",
        width: 1200,
        height: 1200,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://hendricks.ai/gemini3-blog-og.png"],
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility#article",
  headline: TITLE,
  description: DESCRIPTION,
  author: {
    "@type": "Person",
    "@id": "https://hendricks.ai/#brandon-hendricks",
    name: "Brandon Lincoln Hendricks",
    url: "https://hendricks.ai/about",
    jobTitle: "Founder, Search Intelligence Engineer",
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
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility",
  },
  datePublished: "2025-11-19",
  dateModified: "2025-11-19",
  articleSection: "AI Search Visibility",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility#breadcrumb",
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
      name: "Gemini 3 AI Mode Changes AI Search Visibility",
      item: "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://hendricks.ai/blog/gemini3-ai-mode-search-visibility#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What changed with Gemini 3 in AI Mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gemini 3 now powers the reasoning layer behind AI answers in Google Search. AI Mode behaves like a full experience with its own ranking logic, featuring richer interactive answers, fewer cited sources chosen based on entity clarity and structure, and heavier reliance on automation suites like AI Max and Performance Max."
      }
    },
    {
      "@type": "Question",
      name: "How does Gemini 3 AI Mode affect AI search visibility?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Visibility is no longer only about ranking at position one. It is about becoming the reference context that AI Mode trusts enough to quote, summarize, and reuse. AI Mode rewards entity clarity, structured content, and alignment between paid and organic messaging."
      }
    },
    {
      "@type": "Question",
      name: "What should brands do to prepare for Gemini 3 AI Mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Brands should upgrade pages with entity-first content and schema markup, add FAQ and structured data blocks, align campaign themes with landing page entities, and adjust GA4 reporting windows to match actual buying cycles."
      }
    }
  ]
};

export default function Page() {
  return (
    <>
      <Script
        id="gemini3-ai-mode-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([articleSchema, breadcrumbSchema, faqSchema]) }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Header />

        {/* background */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.20),_transparent_60%)] opacity-80" />

        <main className="relative mx-auto max-w-3xl px-4 py-12 lg:px-0">
          <header className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wide text-sky-400">
              AI Search Visibility
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl">
              {TITLE}
            </h1>
            <p className="mt-4 text-base text-slate-300">
              Google just placed Gemini 3 at the center of AI Mode in Search. That
              move reshapes how brands appear in AI answers and how paid and
              organic work together. Here is what changed and how Hendricks AI is
              adjusting the playbook.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span>By <a href="/about" className="text-sky-400 hover:text-sky-300">Brandon Lincoln Hendricks</a></span>
              <span>•</span>
              <span>November 19, 2025</span>
            </div>

            {/* Breadcrumbs */}
            <nav className="mt-4 text-xs text-slate-400" aria-label="Breadcrumb">
              <ol className="flex items-center gap-1">
                <li><a href="/" className="hover:text-sky-300">Home</a></li>
                <li><span className="mx-1">/</span></li>
                <li><a href="/insights" className="hover:text-sky-300">Insights</a></li>
                <li><span className="mx-1">/</span></li>
                <li className="text-slate-300">Gemini 3 AI Mode Changes AI Search Visibility</li>
              </ol>
            </nav>
          </header>

          <section className="prose prose-invert prose-slate max-w-none prose-headings:text-slate-50 prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-slate-100">
            <h2>What actually changed with Gemini 3 inside AI Mode</h2>
            <p>
              Gemini 3 now powers the reasoning layer behind AI answers in Google
              Search. Instead of a simple overlay on top of classic Search, AI
              Mode behaves more like a full experience with its own ranking and
              selection logic.
            </p>
            <p>At a practical level this means:</p>
            <ul>
              <li>
                AI answers feel richer and more interactive with tools, steps, and
                decision paths surfaced directly in the interface.
              </li>
              <li>
                Classic blue links lose screen share on many intents because the
                AI block becomes the primary experience.
              </li>
              <li>
                Fewer sources are cited, and those sources are chosen based on how
                clearly they express entities, structure information, and support
                user tasks.
              </li>
              <li>
                Paid placements lean harder into automation suites such as AI Max
                and Performance Max, where Gemini helps interpret intent and map
                to the right query and asset mix.
              </li>
            </ul>

            <h2>Why this matters for AI search visibility</h2>
            <p>
              With Gemini 3 in control, visibility is no longer only about
              ranking a page at position one. It is about becoming the reference
              context that AI Mode trusts enough to quote, summarize, and reuse.
            </p>

            <p>Three shifts stand out for brands that care about demand capture.</p>

            <h3>One AI Mode rewards entity clarity</h3>
            <p>
              Gemini works best when it recognizes the entities on a page
              products, features, use cases, locations, and people. Pages that
              define those entities early and clearly are more likely to be cited
              inside answers.
            </p>
            <p>
              That means vague copy and clever slogans lose value. Direct, well
              structured explanations of what something is, who it is for, and
              where it fits inside a decision are now critical.
            </p>

            <h3>Two structure beats decoration</h3>
            <p>
              AI Mode prefers content it can parse. Schema, tables, step by step
              instructions, and question and answer blocks all make it easier for
              Gemini to extract exactly what it needs for a given task.
            </p>
            <p>
              Design still matters for people, but for AI visibility, structure is
              now a ranking factor in its own right.
            </p>

            <h3>Three paid and organic must speak the same language</h3>
            <p>
              On the paid side, Google is steering advertisers toward AI Max and
              Performance Max as the default way to reach queries inside AI Mode.
              These systems rely heavily on signals from your site, your
              conversions, and your audience definitions.
            </p>
            <p>
              If your landing pages, product names, and value props do not match
              the language in your search campaigns, you create friction for the
              model. When they are aligned, you give Gemini a clean feedback loop:
              the same entities appear in your ads, your pages, and your
              conversion events.
            </p>

            <h2>What Hendricks AI is doing about it</h2>
            <p>
              At Hendricks AI we treat Gemini 3 inside AI Mode as a new surface
              that must be engineered, not guessed at. Here is the practical
              playbook we are rolling out for clients.
            </p>

            <h3>One entity first page upgrades</h3>
            <ul>
              <li>
                Add or refresh schema for FAQ, HowTo, Product, Organization, and
                LocalBusiness where relevant.
              </li>
              <li>
                Declare canonical entities at the top of the page short, explicit
                definitions of the product or offer, the ideal user, and the core
                use cases.
              </li>
              <li>
                Make author and organization signals explicit with bios, roles,
                and proof of experience.
              </li>
            </ul>

            <h3>Two conversational clarity for AI answers</h3>
            <ul>
              <li>
                Add question and answer sections that mirror how people search,
                similar to People also ask questions.
              </li>
              <li>
                Lead with concise answers, then expand into details, steps, and
                comparisons so Gemini can lift the right slice for the right
                intent.
              </li>
              <li>
                Use tables for pricing, plan comparisons, and feature sets so AI
                Mode can pull structured facts instead of free form text.
              </li>
            </ul>

            <h3>Three AI ready landing pages for paid campaigns</h3>
            <ul>
              <li>
                Align campaign themes and assets in AI Max and Performance Max
                with the same entities and phrases that live on your landing
                pages.
              </li>
              <li>
                Feed conversions into GA4 and your ad accounts in a way that
                respects real buying cycles, especially for B2B where attribution
                lag can reach thirty to sixty days.
              </li>
              <li>
                Build a small set of search and social landing pages dedicated to
                priority intents instead of many thin, fragmented pages.
              </li>
            </ul>

            <h3>Four measurement that understands AI Mode</h3>
            <p>
              Classic position reports do not tell the whole story anymore. For AI
              Mode we care about three things.
            </p>
            <ul>
              <li>
                How often your domain appears as a cited source inside AI answers.
              </li>
              <li>
                Which pages are most frequently referenced for each product or
                topic.
              </li>
              <li>
                How those appearances correlate with branded and non branded
                demand in your paid and organic data.
              </li>
            </ul>
            <p>
              In parallel, GA4 reporting windows must match reality. If your
              conversion lag curve shows that most opportunity creation appears
              after day fourteen, you should not judge AI Max or Performance Max
              on seven day windows.
            </p>

            <h2>A simple action plan for the next thirty days</h2>
            <p>Here is a compact checklist you can execute without a full rebuild.</p>
            <ol>
              <li>
                Pick three priority products or services and upgrade their core
                pages with entity first intros, FAQ blocks, and schema.
              </li>
              <li>
                Align your top campaigns in Google Ads with those same entities
                and landing pages.
              </li>
              <li>
                Pull your GA4 conversion lag report and reset your reporting
                windows to match how people actually buy.
              </li>
              <li>
                Run a structured test where you compare your current search setup
                against AI Max on a subset of budget with clear success metrics.
              </li>
            </ol>

            <p>
              Gemini 3 in AI Mode is not a minor interface change. It is a shift
              in how Google understands and presents your brand to people who are
              ready to learn and ready to buy. If you engineer your content,
              signals, and campaigns for this new layer, you can earn outsized
              visibility while others are still trying to chase old ranking
              tricks.
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
