// app/solutions/system/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "System | AI Search Intelligence System | Hendricks.AI",
  description:
    "The System tier from Hendricks.AI provides a full AI Search Intelligence layer across AI visibility, technical search signals, and measurement.",
};

export default function SystemPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400">
          Solution Tier Two
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
          System
        </h1>
        <p className="mt-2 text-lg text-slate-200">
          AI Search Intelligence System
        </p>
        <p className="mt-4 text-sm text-slate-300 max-w-2xl">
          The System tier is the core Hendricks.AI subscription. It provides a full Search Intelligence
          layer across AI visibility, technical search signals, and measurement for B2B companies.
        </p>

        <div className="mt-6 rounded-xl border border-emerald-500/70 bg-slate-900 p-5 shadow-[0_0_40px_rgba(16,185,129,0.28)]">
          <p className="text-sm font-semibold text-slate-100">
            Pricing
          </p>
          <p className="mt-1 text-sm text-slate-200">
            Starting at 10,000 dollars per month. Minimum three to six month commitment.
          </p>
        </div>

        <section className="mt-10 space-y-6 text-sm text-slate-300">
          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Who System is for
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                Growth stage SaaS and enterprise teams that want a serious AI Search Intelligence system tied to pipeline.
              </li>
              <li>
                CMOs, VPs of Demand, and Heads of Growth who want AI search visibility, structured data, and measurement
                treated as one coherent system rather than disconnected projects.
              </li>
              <li>
                Organizations that are ready to use AI search visibility as an ongoing growth lever, not a one time audit.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Monthly deliverables
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Everything included in the Foundation tier.</li>
              <li>
                AI visibility engineering for priority topics and pages, including guidance for content and technical teams.
              </li>
              <li>
                Schema and entity optimization across a defined set of content and product assets.
              </li>
              <li>
                Monthly AI surfacing opportunity analysis and prioritization in Google AI Overviews, Gemini, ChatGPT,
                Perplexity, and Bing Copilot.
              </li>
              <li>
                GA4 attribution and event model maintenance, ensuring that search and AI influenced journeys are tracked correctly.
              </li>
              <li>
                BigQuery export refinement and data integrity checks for search and AI datasets.
              </li>
              <li>
                Maintenance and evolution of AI visibility dashboards and pipeline correlation views.
              </li>
              <li>
                One monthly executive working session with marketing and revenue leaders to interpret findings and choose next actions.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Why System matters
            </h2>
            <p className="mt-3">
              AI search visibility, schema, entities, and measurement cannot be treated as static projects. They form a living
              system that must be engineered and maintained. The System tier creates that Search Intelligence layer inside your
              organization so that visibility, signals, and measurement move together and support pipeline generation.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Expected outcomes
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Improved AI visibility for priority topics across five major AI search engines.</li>
              <li>Cleaner, more consistent structured data and entities powering that visibility.</li>
              <li>Reliable attribution and measurement for AI and search influenced traffic and pipeline.</li>
              <li>Search Intelligence insights that inform content, paid media, product marketing, and revenue strategy.</li>
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Start System
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
  );
}
