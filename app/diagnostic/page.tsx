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
        <PageIntro kicker="Diagnostic" title={DIAGNOSTIC.name} compact />
        <section className="band">
          <p className="price-figure price-figure-type">{DIAGNOSTIC.price}</p>
          <p className="measure">{DIAGNOSTIC.lede}</p>
        </section>
        <section className="band" aria-label="Weeks">
          <ol className="week-rail">
            {DIAGNOSTIC.weeks.map((week) => (
              <li key={week}>{week}</li>
            ))}
          </ol>
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
