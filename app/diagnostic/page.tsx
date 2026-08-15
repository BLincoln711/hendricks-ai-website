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
        <PageIntro title={DIAGNOSTIC.name} />
        <section className="product-section panel">
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span className="price-term">/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>
        <section className="product-section">
          <div className="week-grid">
            {DIAGNOSTIC.weeks.map((week) => (
              <div key={week} className="panel week-cell">
                <h2 className="mono-label">{week}</h2>
              </div>
            ))}
          </div>
        </section>
        <p className="page-ctas">
          <Link href="/briefing">Book a briefing</Link>
          <Link href="/pricing">Pricing</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
