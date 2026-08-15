import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { DIAGNOSTIC } from "@/lib/site";

export const metadata: Metadata = {
  title: DIAGNOSTIC.name,
  description: DIAGNOSTIC.lede,
};

export default function DiagnosticPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro kicker="Diagnostic" title={DIAGNOSTIC.name} />
        <section className="offer-plate panel offer-plate-hero">
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span className="price-term">/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>
        <ol className="week-legend">
          {DIAGNOSTIC.weeks.map((week) => (
            <li key={week}>
              <h2 className="mono-label">{week}</h2>
            </li>
          ))}
        </ol>
        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{ href: "/pricing", label: "Pricing" }}
        />
      </article>
    </SiteChrome>
  );
}
