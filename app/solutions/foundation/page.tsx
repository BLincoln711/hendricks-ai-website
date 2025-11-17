// app/solutions/foundation/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Foundation | AI Visibility and Measurement | Hendricks.AI",
  description:
    "The Foundation tier from Hendricks.AI provides ongoing AI visibility monitoring and measurement health for B2B companies.",
};

export default function FoundationPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Header />
      <section className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-emerald-400">
          Solution Tier One
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">
          Foundation
        </h1>
        <p className="mt-2 text-lg text-slate-200">
          AI Visibility and Measurement
        </p>
        <p className="mt-4 text-sm text-slate-300 max-w-2xl">
          The Foundation tier gives B2B teams ongoing clarity into AI search visibility and
          measurement health without requiring a full Search Intelligence operation.
        </p>

        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-sm font-semibold text-slate-100">
            Pricing
          </p>
          <p className="mt-1 text-sm text-slate-200">
            Starting at 5,000 dollars per month. Minimum three month commitment.
          </p>
        </div>

        <section className="mt-10 space-y-6 text-sm text-slate-300">
          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Who Foundation is for
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                B2B teams that want AI search visibility clarity without dedicating a full Search Intelligence function.
              </li>
              <li>
                CMOs and Heads of Demand who want ongoing intelligence on how their brand appears across AI search surfaces.
              </li>
              <li>
                Companies evaluating the value of a full AI Search Intelligence System before expanding.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Monthly deliverables
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>
                AI visibility monitoring across Google AI Overviews, Gemini, ChatGPT, Perplexity, and Bing Copilot for a defined set of priority topics.
              </li>
              <li>
                AI visibility and signal integrity scorecard that summarizes presence, absence, and meaningful shifts.
              </li>
              <li>
                Monthly GA4 measurement health audit focused on search and AI influenced traffic and conversions.
              </li>
              <li>
                Schema and entity integrity snapshot for core pages and properties to detect issues early.
              </li>
              <li>
                Monthly insight report for CMOs and growth leaders with clear narrative and next step recommendations.
              </li>
              <li>
                Priority recommendations for engineering, content, SEO, and paid teams to execute during the next month.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Why Foundation matters
            </h2>
            <p className="mt-3">
              AI powered search engines change weekly. If your visibility, schema, or measurement breaks,
              you disappear from the very surfaces your buyers trust most. Foundation ensures that someone
              is watching your AI visibility and measurement health continuously and translating those signals
              into actions for your team.
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-50">
              Expected outcomes
            </h2>
            <ul className="mt-3 space-y-1 list-disc list-inside">
              <li>Clear understanding of where your brand appears across major AI search platforms.</li>
              <li>Early detection of broken or missing schema, entities, and measurement events.</li>
              <li>Trusted monthly view of search and AI influenced performance.</li>
              <li>Confidence for leadership that AI search is being monitored by a specialist.</li>
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition"
          >
            Start Foundation
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
