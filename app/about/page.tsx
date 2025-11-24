// app/about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ArrowRight, Check, Globe, Database, BarChart3, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Hendricks.AI Search Intelligence Engineering",
  description:
    "Learn about Hendricks.AI, a Search Intelligence Engineering Firm founded by Brandon Lincoln Hendricks, specializing in AI Search Visibility and Measurement for B2B companies.",
  openGraph: {
    title: "About | Hendricks.AI Search Intelligence Engineering",
    description:
      "Learn about Hendricks.AI, a Search Intelligence Engineering Firm founded by Brandon Lincoln Hendricks, specializing in AI Search Visibility and Measurement for B2B companies.",
    url: "https://hendricks.ai/about",
    siteName: "Hendricks.AI",
    images: [
      {
        url: "https://hendricks.ai/brandon-lincoln-hendricks.jpg",
        width: 1200,
        height: 1200,
        alt: "Brandon Lincoln Hendricks - Founder, Search Intelligence Engineer at Hendricks.AI",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Hendricks.AI Search Intelligence Engineering",
    description:
      "Learn about Hendricks.AI, a Search Intelligence Engineering Firm founded by Brandon Lincoln Hendricks, specializing in AI Search Visibility and Measurement for B2B companies.",
    images: ["https://hendricks.ai/brandon-lincoln-hendricks.jpg"],
    creator: "@hendricksai",
  },
};

export default function AboutPage() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://hendricks.ai/about#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://hendricks.ai"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://hendricks.ai/about"
          }
        ]
      },
      {
        "@type": "AboutPage",
        "@id": "https://hendricks.ai/about#webpage",
        "url": "https://hendricks.ai/about",
        "name": "About Hendricks.AI",
        "description": "Learn about Hendricks.AI, a Search Intelligence Engineering Firm founded by Brandon Lincoln Hendricks, specializing in AI Search Visibility and Measurement for B2B companies.",
        "isPartOf": {
          "@id": "https://hendricks.ai/#website"
        },
        "breadcrumb": {
          "@id": "https://hendricks.ai/about#breadcrumb"
        },
        "mainEntity": {
          "@id": "https://hendricks.ai/#brandon-hendricks"
        }
      },
      {
        "@type": "Person",
        "@id": "https://hendricks.ai/#brandon-hendricks",
        "name": "Brandon Lincoln Hendricks",
        "givenName": "Brandon Lincoln",
        "familyName": "Hendricks",
        "jobTitle": "Founder, Search Intelligence Engineer",
        "description":
          "Brandon Lincoln Hendricks is the founder of Hendricks.AI and the creator of Search Intelligence Engineering. He is a Google Machine Learning certified engineer and former Director of Search at SolarWinds and former Global Search Director at Merkle & Dentsu.",
        "url": "https://hendricks.ai/about",
        "image": "https://hendricks.ai/brandon-lincoln-hendricks.jpg",
        "knowsAbout": [
          {
            "@type": "Thing",
            "name": "Search Intelligence Engineering",
            "sameAs": "https://hendricks.ai/search-intelligence-engineering"
          },
          "AI Search Visibility",
          "B2B Marketing",
          "Search Engine Optimization"
        ],
        "worksFor": {
          "@type": "Organization",
          "@id": "https://hendricks.ai/#organization",
          "name": "Hendricks.AI",
          "url": "https://hendricks.ai"
        },
        "alumniOf": [
          {
            "@type": "Organization",
            "name": "SolarWinds"
          },
          {
            "@type": "Organization",
            "name": "Merkle"
          },
          {
            "@type": "Organization",
            "name": "Dentsu"
          }
        ],
        "hasOccupation": [
          {
            "@type": "Occupation",
            "name": "Director of Search",
            "description":
              "Former Director of Search at SolarWinds, leading global search strategy and measurement."
          },
          {
            "@type": "Occupation",
            "name": "Global Search Director",
            "description":
              "Former Global Search Director at Merkle & Dentsu, developing unified SERP and search strategies for enterprise brands."
          },
          {
            "@type": "Occupation",
            "name": "Search Intelligence Engineer",
            "description":
              "Founder of Hendricks.AI and creator of Search Intelligence Engineering, an approach to AI Search Visibility and Measurement."
          }
        ],
        "sameAs": [
          "https://www.linkedin.com/in/brandonhendricks",
          "https://hendricks.ai"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://hendricks.ai/#organization",
        "name": "Hendricks.AI",
        "url": "https://hendricks.ai",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hendricks.ai/logo/hendricks-logo.png"
        },
        "founder": {
          "@id": "https://hendricks.ai/#brandon-hendricks"
        },
        "description": "Hendricks.AI is a Search Intelligence Engineering Firm specializing in AI Search Visibility and Measurement for B2B companies.",
        "knowsAbout": [
          "Search Intelligence Engineering",
          "AI Search Visibility",
          "B2B Marketing Measurement",
          "Schema and Entity Engineering"
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-sky-500/30">
        <Header />

        {/* background glow */}
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.20),_transparent_60%)] opacity-80" />

        {/* HERO */}
        <section className="relative max-w-6xl mx-auto px-4 pt-32 pb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-300 mb-8">
            <Briefcase size={14} />
            <span>Search Intelligence Engineering Firm</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            We Do Not Run Campaigns. <br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
              We Engineer Intelligence.
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed">
            Hendricks.AI builds the systems that unify{" "}
            <span className="text-white font-medium">AI Search Visibility</span>,{" "}
            <span className="text-white font-medium">technical signals</span>, and{" "}
            <span className="text-white font-medium">measurement</span> across every AI powered
            search environment.
          </p>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-sky-500" /> Built on Google Cloud
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-sky-500" /> Powered by Vertex AI
            </span>
          </div>

          {/* quick answer */}
          <div className="mt-12 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 md:p-8 backdrop-blur-sm">
            <p className="font-semibold text-sky-400 mb-3 text-sm uppercase tracking-wider">
              Quick Answer
            </p>
            <p className="text-lg text-slate-200 leading-relaxed">
              <strong>Hendricks.AI is a Search Intelligence Engineering Firm for B2B companies.</strong>{" "}
              We design and maintain the visibility, schema, entities, and measurement systems
              that govern how your brand appears and is evaluated across Google AI Overviews,
              Gemini, ChatGPT, Perplexity, Bing Copilot, and traditional search engines.
            </p>
          </div>
        </section>

        {/* FROM AGENCY TO INTELLIGENCE FIRM */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="grid md:grid-cols-[1fr_2fr] gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50 md:sticky md:top-32">
                From Agency to <br />
                Intelligence Firm
              </h2>
            </div>
            <div className="space-y-8 text-lg text-slate-300 leading-relaxed">
              <p>
                Hendricks.AI began as Hendricks PPC, a performance marketing practice focused on
                paid search and demand generation. The work produced results. But one problem kept
                surfacing across every account:{" "}
                <span className="text-white font-medium">
                  everyone was measuring search in pieces.
                </span>
              </p>
              <p>
                SEO and paid search were reported separately. Google and Bing were treated like
                different worlds. New AI surfaces such as ChatGPT and Gemini were completely
                invisible in analytics. The result was always the same. No one could see the full
                picture of where their brand showed up or how AI search was influencing pipeline.
              </p>
              <p>
                The breakthrough came when we stopped thinking like a media agency and started
                thinking like an engineering firm. Search is no longer a single engine. It is an
                ecosystem of engines and AI assistants. B2B buyers do not care which platform
                answers their question. Visibility, signals, and measurement need to be engineered
                as one system.
              </p>
              <div className="pl-6 border-l-2 border-sky-500 text-slate-300 italic">
                We do not manage campaigns. We design and maintain the visibility, signal, and
                measurement layer that your campaigns, content, and AI experiences depend on.
              </div>
            </div>
          </div>
        </section>

        {/* FOUNDER PROFILE */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
            {/* Portrait */}
            <div className="flex flex-col items-center md:items-start md:sticky md:top-32">
              <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-2xl shadow-black/50">
                <Image
                  src="/brandon-lincoln-hendricks.jpg"
                  alt="Brandon Lincoln Hendricks"
                  width={360}
                  height={440}
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-6 text-center md:text-left w-full">
                <p className="text-xl font-bold text-slate-50">Brandon Lincoln Hendricks</p>
                <p className="text-sm text-sky-400 font-medium mt-1">
                  Founder • Search Intelligence Engineer
                </p>
                <div className="mt-4 flex gap-3 justify-center md:justify-start">
                  <Link
                    href="https://linkedin.com/in/brandonhendricks"
                    className="p-2 rounded-full bg-slate-900 hover:bg-sky-500/20 hover:text-sky-400 transition-colors"
                    aria-label="View Brandon on LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bio content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-50 mb-4">
                  Building Search Intelligence Systems for Modern B2B
                </h2>
                <p className="text-lg text-slate-300 leading-relaxed">
                  Brandon is a Google Machine Learning certified engineer and search leader who
                  has spent more than fifteen years building search and measurement systems for
                  B2B brands.
                </p>
              </div>

              <div className="space-y-6 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                    <Briefcase size={14} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Director of Search – SolarWinds
                  </h3>
                  <p className="mt-2 text-slate-400 leading-relaxed">
                    Led global search strategy across paid and organic channels, designing
                    systems that measured search performance with enterprise precision across
                    more than one hundred fifty markets. Unified data from search platforms and
                    internal systems to create one Total Search model.
                  </p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-500">
                    <Briefcase size={14} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Global Search Director – Merkle &amp; Dentsu
                  </h3>
                  <p className="mt-2 text-slate-400 leading-relaxed">
                    Developed unified SERP and search strategies for large enterprise brands.
                    Built frameworks for unified reporting and SERP ownership, collaborating
                    with cross functional teams managing significant media investments.
                  </p>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/50 flex items-center justify-center text-sky-400">
                    <Check size={14} />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Founder – Hendricks.AI
                  </h3>
                  <p className="mt-2 text-slate-400 leading-relaxed">
                    These experiences formed the basis of the{" "}
                    <Link
                      href="/search-intelligence-engineering"
                      className="text-sky-400 hover:underline"
                    >
                      Search Intelligence Engineering
                    </Link>{" "}
                    perspective. Search is not just a channel to optimize. It is a data and
                    signal system that must be engineered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT IS SEARCH INTELLIGENCE ENGINEERING */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
                What is Search Intelligence Engineering?
              </h2>
              <Link
                href="/search-intelligence-engineering"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              >
                Read the full definition <ArrowRight size={16} />
              </Link>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-4xl">
              Search Intelligence Engineering is the discipline of designing and maintaining
              the visibility, signal, and measurement systems that govern how brands appear and
              are evaluated across AI powered and traditional search engines.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="group p-6 rounded-2xl bg-black border border-slate-800 hover:border-sky-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                  <Globe size={20} />
                </div>
                <p className="text-lg font-bold text-white mb-2">AI Search Visibility</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Where and how your brand appears across Google AI Overviews, Gemini, ChatGPT,
                  Perplexity, and Bing Copilot.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-black border border-slate-800 hover:border-purple-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  <Database size={20} />
                </div>
                <p className="text-lg font-bold text-white mb-2">Signals and Structure</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Schema, entities, technical health, and content structures that AI systems
                  use to understand and trust your brand.
                </p>
              </div>

              <div className="group p-6 rounded-2xl bg-black border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 size={20} />
                </div>
                <p className="text-lg font-bold text-white mb-2">Unified Measurement</p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  GA4, BigQuery, and analytics models that tie AI search and traditional search
                  activity to pipeline and revenue.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY B2B GROWTH */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="max-w-3xl space-y-6 text-lg text-slate-300 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              Why We Focus on B2B Growth
            </h2>
            <p>
              B2B companies face visibility and measurement challenges that are very different
              from direct to consumer brands. Long sales cycles make last click attribution
              almost meaningless. Buying committees research across multiple devices, accounts,
              and AI tools. Pipeline visibility requirements from leadership and boards are
              high.
            </p>
            <p>
              Search Intelligence Engineering is built for this reality. We focus exclusively
              on B2B because AI search visibility, signal integrity, and measurement are all
              magnified in long and complex buying journeys.
            </p>
          </div>
        </section>

        {/* WHY HENDRICKS.AI */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="space-y-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              Why Hendricks.AI
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-900 transition-colors">
                <p className="text-lg font-bold text-white mb-3">We are not an agency</p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Agencies manage campaigns. We architect systems. Our work defines how AI
                  search engines understand your brand and how your teams measure and interpret
                  that visibility.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-900 transition-colors">
                <p className="text-lg font-bold text-white mb-3">
                  We measure what others ignore
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Most reporting still stops at Google organic and paid. We include AI
                  Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot as first class
                  surfaces inside one visibility and measurement layer.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:bg-slate-900 transition-colors">
                <p className="text-lg font-bold text-white mb-3">
                  We connect visibility to revenue
                </p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Search Intelligence Engineering ties AI search activity back to pipeline and
                  revenue using GA4, BigQuery, and CRM integration. We care about metrics that
                  line up with executive and board conversations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CREATING A NEW CATEGORY */}
        <section className="relative max-w-6xl mx-auto px-4 py-20 border-t border-slate-900">
          <div className="max-w-4xl space-y-6 text-lg text-slate-300 leading-relaxed">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50">
              Creating a New Category
            </h2>
            <p>
              AI Search Visibility and Measurement is not just a service we provide. It is a
              new category of marketing and analytics infrastructure.
            </p>
            <p>
              As search behavior expands beyond a single engine, brands will need unified
              visibility across all AI and search surfaces, engineered signal integrity so AI
              systems can understand and trust their data, and measurement that reflects how
              buyers actually research and decide.
            </p>
            <p>
              Hendricks.AI exists to build that infrastructure. We are not optimizing for
              today&apos;s clicks. We are designing the Search Intelligence layer that B2B
              companies will rely on for the next decade.
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative max-w-6xl mx-auto px-4 pb-32 border-t border-slate-900">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-black p-10 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to build your Search Intelligence foundation?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-10">
              Start with the Foundation tier for AI visibility and measurement clarity or
              move directly into the System or Partnership programs to build a continuous
              Search Intelligence function for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-black hover:bg-slate-200 transition-colors"
              >
                View Subscription Tiers
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 py-4 text-base font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Book Visibility Consultation
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
