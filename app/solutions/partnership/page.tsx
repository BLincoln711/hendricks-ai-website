// app/solutions/partnership/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Partnership | Search Intelligence Engineering Partnership | Hendricks.AI",
  description:
    "The Partnership tier from Hendricks.AI embeds a Search Intelligence Engineering function inside your B2B organization.",
};

export default function PartnershipPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://hendricks.ai/#partnership-service",
    "name": "Search Intelligence Engineering Partnership",
    "url": "https://hendricks.ai/solutions/partnership",
    "description": "The Partnership tier from Hendricks.AI embeds a Search Intelligence Engineering function inside B2B organizations, owning AI Search Visibility, signal integrity, measurement, and the Search Intelligence roadmap.",
    "provider": {
      "@type": "Organization",
      "name": "Hendricks.AI",
      "url": "https://hendricks.ai"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Global"
    },
    "serviceType": "Search Intelligence Engineering Partnership",
    "audience": {
      "@type": "Audience",
      "audienceType": "Mid-Market and Enterprise B2B Organizations"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://hendricks.ai/solutions/partnership",
      "price": "20000",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "20000",
        "priceCurrency": "USD",
        "billingIncrement": 1,
        "unitCode": "MON"
      },
      "availability": "https://schema.org/InStock",
      "category": "Subscription",
      "description": "Subscription starting at 20,000 USD per month with a six to twelve month minimum commitment."
    }
  };

  return (
    <>
      <Script
        id="partnership-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />

      <div className="min-h-screen bg-slate-950 text-slate-50">
        <Header />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400">
          Solution Tier Three
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
          Search Intelligence Engineering Partnership
        </h1>
        <p className="mt-2 text-lg text-slate-200">
          Your dedicated Search Intelligence function for AI search.
        </p>
        <p className="mt-4 text-sm text-slate-300 max-w-2xl">
          The Partnership tier operates like an embedded Search Intelligence Engineering function.
          Hendricks.AI owns the AI search visibility program, signal integrity, and Search Intelligence
          roadmap alongside your leadership team.
        </p>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold text-slate-100">
            Pricing
          </p>
          <p className="mt-1 text-sm text-slate-200">
            Starting at 20,000 dollars per month. Minimum six to twelve month commitment.
          </p>
        </div>

        <section className="mt-10 space-y-6 text-sm text-slate-300">
          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Who Partnership is for
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                Mid market and enterprise companies where AI search visibility is a strategic growth lever.
              </li>
              <li>
                CMOs and revenue leaders who want a dedicated Search Intelligence Engineering function without
                building the full team internally.
              </li>
              <li>
                Organizations committed to leading their category in AI visibility, signal integrity, and search to revenue clarity.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Monthly deliverables
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Everything included in the System tier.</li>
              <li>
                Full AI visibility program ownership across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot.
              </li>
              <li>
                Deep signal engineering for schema, entities, structured data, and brand graph alignment across web, docs,
                knowledge base, and key off site properties.
              </li>
              <li>
                Content intelligence direction including outlines, structures, FAQ frameworks, and schema specifications
                for AI extraction.
              </li>
              <li>
                Competitive visibility intelligence across your category and core buyer questions.
              </li>
              <li>
                Experimentation cycles for schema variants, answer blocks, entity configurations, and AI search flows,
                with learnings translated into roadmap updates.
              </li>
              <li>
                Monthly leadership reporting tied directly to pipeline and revenue, with a clear Search Intelligence narrative
                for executives and boards.
              </li>
              <li>
                Direct collaboration with product marketing, SEO, paid media, analytics, and engineering teams to coordinate
                Search Intelligence priorities.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Why the Partnership tier exists
            </h2>
            <p className="mt-3">
              The companies that win in AI search are not simply running campaigns. They are engineering their
              visibility, signals, and measurement as a core capability. The Partnership tier makes Search Intelligence
              Engineering a permanent function in your organization, led by Hendricks.AI and deeply integrated with
              your leadership team.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Expected outcomes
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                Category leading AI visibility for the questions and topics that matter most to your buyers.
              </li>
              <li>
                Strong structured data and entity authority across your digital footprint.
              </li>
              <li>
                Clear, repeatable connection between AI search efforts and pipeline and revenue outcomes.
              </li>
              <li>
                A defensible Search Intelligence moat that competitors will struggle to replicate quickly.
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Discuss Partnership
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center rounded-md border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:border-emerald-400 transition"
          >
            Compare all tiers
          </Link>
        </div>
      </section>
      <Footer />
      </div>
    </>
  );
}
