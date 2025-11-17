// app/about/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Hendricks.AI Search Intelligence Engineering",
  description:
    "Learn about Hendricks.AI, a Search Intelligence Engineering Firm founded by Brandon Lincoln Hendricks, specializing in AI Search Visibility and Measurement for B2B companies.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(139,92,246,0.20),_transparent_60%)] opacity-80" />

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-14">
        <p className="inline-flex items-center rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-sky-300">
          Search Intelligence Engineering Firm
        </p>

        <h1 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
          We Do Not Run Campaigns. <br />
          <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
            We Engineer Intelligence.
          </span>
        </h1>

        <p className="mt-4 max-w-3xl text-xs md:text-sm text-slate-200">
          Hendricks.AI builds the systems that unify AI Search Visibility, technical signals,
          and measurement across every AI powered search environment.
        </p>

        <p className="mt-3 text-[11px] text-slate-400">
          Built on Google Cloud • Powered by Vertex AI
        </p>

        {/* quick answer */}
        <div className="mt-8 max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/80 p-5 text-xs md:text-sm text-slate-200">
          <p className="font-semibold text-slate-50 mb-2">Quick answer.</p>
          <p>
            Hendricks.AI is a Search Intelligence Engineering Firm for B2B growth, founded by
            Brandon Lincoln Hendricks. We engineer the visibility, schema, entities, and
            measurement systems that show how your brand appears across Google AI Overviews,
            Gemini, ChatGPT, Perplexity, and Bing Copilot and how that visibility translates
            into pipeline and revenue.
          </p>
        </div>
      </section>

      {/* FROM AGENCY TO INTELLIGENCE FIRM */}
      <section className="relative max-w-6xl mx-auto px-4 pb-12">
        <div className="max-w-3xl space-y-4 text-xs md:text-sm text-slate-300">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
            From Agency to Intelligence Firm
          </h2>
          <p>
            Hendricks.AI began as Hendricks PPC, a performance marketing practice focused on
            paid search and demand generation. The work produced results, but one problem kept
            surfacing across every account. Everyone was measuring search in pieces.
          </p>
          <p>
            SEO and paid search were reported separately. Google and Bing were treated like
            different worlds. New AI surfaces such as ChatGPT and Gemini were completely
            invisible in analytics. The result was always the same. No one could see the full
            picture of where their brand showed up or how AI search was influencing pipeline.
          </p>
          <p>
            The breakthrough came when we stopped thinking like a media agency and started
            thinking like an engineering firm. We realized that search is no longer one engine
            it is an ecosystem of engines and AI assistants. B2B buyers do not care which
            platform answers their question. Visibility, signals, and measurement need to be
            engineered as one system.
          </p>
          <p>
            Today, Hendricks.AI operates as a Search Intelligence Engineering Firm. We do not
            manage campaigns. We design and maintain the visibility, signal, and measurement
            layer that your campaigns, content, and AI experiences depend on.
          </p>
        </div>
      </section>

      {/* FOUNDER PROFILE */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
          {/* Portrait */}
          <div className="flex flex-col items-center md:items-start">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
              <Image
                src="/brandon-lincoln-hendricks.jpg"
                alt="Brandon Lincoln Hendricks"
                width={360}
                height={440}
                className="object-cover"
              />
            </div>
            <div className="mt-4 text-center md:text-left">
              <p className="text-sm font-semibold text-slate-50">
                Brandon Lincoln Hendricks
              </p>
              <p className="text-xs text-slate-400">
                Founder, Hendricks.AI • Search Intelligence Engineer
              </p>
            </div>
          </div>

          {/* Bio content */}
          <div className="space-y-6 text-xs md:text-sm text-slate-300">
            <h2 className="text-lg md:text-xl font-semibold text-slate-50">
              Building Search Intelligence Systems for Modern B2B
            </h2>
            <p>
              Brandon is a Google Machine Learning certified engineer and search leader who
              has spent more than fifteen years building search and measurement systems for
              B2B brands.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Director of Search – SolarWinds
                </h3>
                <p className="mt-2">
                  At SolarWinds, Brandon led global search strategy across paid and organic
                  channels, designing systems that measured search performance with enterprise
                  precision across more than one hundred fifty markets. His work focused on
                  unifying data from search platforms and internal systems, developing one
                  Total Search model for global teams, and connecting search data into
                  Salesforce and executive reporting.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Former Global Search Director – Merkle &amp; Dentsu
                </h3>
                <p className="mt-2">
                  Earlier in his career, Brandon served as Global Search Director at Merkle
                  and Dentsu. He developed unified SERP and search strategies for large
                  brands, working at the intersection of paid and organic search for
                  multi region programs. He helped build frameworks for unified reporting and
                  SERP ownership and collaborated with cross functional teams responsible for
                  significant media investments.
                </p>
              </div>
              <div>
                <p>
                  These experiences formed the basis of his Search Intelligence Engineering
                  perspective. Search is not just a channel to optimize. It is a data and
                  signal system that must be engineered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS SEARCH INTELLIGENCE ENGINEERING */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            What is Search Intelligence Engineering
          </h2>
          <p className="mt-3 text-xs md:text-sm text-slate-300">
            Search Intelligence Engineering is the discipline of designing and maintaining
            the visibility, signal, and measurement systems that govern how brands appear and
            are evaluated across AI powered and traditional search engines.
          </p>
          <p className="mt-3 text-xs md:text-sm text-slate-300">
            Instead of focusing on single keywords or isolated campaigns, Search Intelligence
            Engineering focuses on three layers.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3 text-xs md:text-sm text-slate-200">
            <div>
              <p className="text-sm font-semibold text-sky-300">
                AI Search Visibility
              </p>
              <p className="mt-2 text-slate-300">
                Where and how your brand appears across Google AI Overviews, Gemini, ChatGPT,
                Perplexity, and Bing Copilot, as well as traditional search surfaces.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-300">
                Signals and Structure
              </p>
              <p className="mt-2 text-slate-300">
                Schema, entities, technical health, and content structures that AI systems
                use to understand, trust, and surface your brand.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-sky-300">
                Measurement and Attribution
              </p>
              <p className="mt-2 text-slate-300">
                GA4, BigQuery, and analytics models that tie AI search and traditional search
                activity to pipeline and revenue.
              </p>
            </div>
          </div>

          <p className="mt-6 text-[11px] md:text-xs text-slate-400">
            Traditional SEO and paid search optimization are inputs into this system.
            Search Intelligence Engineering is the architecture that keeps all of it
            coherent, measurable, and aligned to business outcomes.
          </p>
        </div>
      </section>

      {/* WHY B2B GROWTH */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="max-w-3xl space-y-4 text-xs md:text-sm text-slate-300">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Why We Focus on B2B Growth
          </h2>
          <p>
            B2B companies face visibility and measurement challenges that are very different
            from direct to consumer brands. Long sales cycles make last click attribution
            almost meaningless. Buying committees research across multiple devices accounts
            and AI tools. Pipeline visibility requirements from leadership and boards are
            high. CFOs expect search investments to stand up to the same scrutiny as any
            other strategic expense.
          </p>
          <p>
            Search Intelligence Engineering is built for this reality. We focus exclusively
            on B2B because AI search visibility, signal integrity, and measurement are all
            magnified in long and complex buying journeys.
          </p>
        </div>
      </section>

      {/* WHY HENDRICKS.AI */}
      <section className="relative max-w-6xl mx-auto px-4 pb-16">
        <div className="space-y-6">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
            Why Hendricks.AI
          </h2>

          <div className="grid gap-5 md:grid-cols-3 text-xs md:text-sm">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm font-semibold text-slate-50">
                We are not an agency
              </p>
              <p className="mt-3 text-slate-300">
                Agencies manage campaigns. We architect systems. Our work defines how AI
                search engines understand your brand and how your teams measure and interpret
                that visibility.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm font-semibold text-slate-50">
                We measure what others ignore
              </p>
              <p className="mt-3 text-slate-300">
                Most reporting still stops at Google organic and paid. We include AI
                Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot as first class
                surfaces inside one visibility and measurement layer.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <p className="text-sm font-semibold text-slate-50">
                We connect visibility to revenue
              </p>
              <p className="mt-3 text-slate-300">
                Search Intelligence Engineering ties AI search activity back to pipeline and
                revenue using GA4, BigQuery, and CRM integration. We care about metrics that
                line up with executive and board conversations not vanity statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CREATING A NEW CATEGORY */}
      <section className="relative max-w-6xl mx-auto px-4 pb-20">
        <div className="max-w-4xl space-y-4 text-xs md:text-sm text-slate-300">
          <h2 className="text-lg md:text-xl font-semibold text-slate-50">
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
      <section className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-50">
            Ready to build your Search Intelligence foundation
          </h2>
          <p className="mt-3 max-w-3xl text-xs md:text-sm text-slate-300">
            Start with the Foundation tier for AI visibility and measurement clarity or move
            directly into the System or Partnership programs to build a continuous Search
            Intelligence function for your organization.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 px-6 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-blue-400 hover:to-violet-400 transition"
            >
              View Subscription Tiers
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-2.5 text-xs font-semibold text-slate-200 hover:border-sky-400 hover:text-sky-300 transition"
            >
              Book Visibility Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
