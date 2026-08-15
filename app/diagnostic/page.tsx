import type { Metadata } from "next";
import Link from "next/link";
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
      <article className="product">
        <PageIntro
          eyebrow="Diagnostic"
          title={DIAGNOSTIC.name}
          deck={`${DIAGNOSTIC.price} / ${DIAGNOSTIC.duration}.`}
        />
        <section className="product-section panel">
          <p className="price-figure">{DIAGNOSTIC.price}</p>
          <p className="lede">{DIAGNOSTIC.lede}</p>
        </section>
        <section className="product-section">
          <p className="mono-label">Weeks</p>
          <div className="week-grid">
            {DIAGNOSTIC.weeks.map((week, index) => (
              <div key={week} className="panel week-cell">
                <div className="module-index">0{index + 1}</div>
                <h3>{week}</h3>
              </div>
            ))}
          </div>
        </section>
        <p>
          The diagnostic is available on its own. After it, you decide whether we
          install the system.
        </p>
        <p className="page-ctas">
          <Link href="/briefing">Book a briefing</Link>
          <Link href="/pricing">Pricing</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
