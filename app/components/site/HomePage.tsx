import Link from "next/link";
import {
  DIAGNOSTIC,
  METHOD_OBJECT,
  METHOD_STEPS,
  POSITIONING,
  PRACTICE_MODULES,
  REFUSAL,
} from "@/lib/site";
import { SiteChrome } from "./SiteChrome";

export function HomePage() {
  return (
    <SiteChrome>
      <article className="product">
        <header className="product-hero masthead">
          <p className="mono-label">Hendricks · Search intelligence engineering</p>
          <h1 className="spec">{POSITIONING}</h1>
          <p className="deck">
            One system. We install it. We operate it. Built for the CMO, the managing
            partner, and the head of growth.
          </p>
        </header>

        <section className="product-section">
          <p>
            He has been on both sides of the retrieval problem: Search and Innovation
            Lead at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the
            holding company, not a second job.
          </p>
        </section>

        <section className="product-section">
          <div className="method-rail">
            {METHOD_STEPS.map((step) => (
              <div key={step} className="panel method-step">
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p>Object = {METHOD_OBJECT}.</p>
        </section>

        <section className="product-section">
          <div className="module-grid">
            {PRACTICE_MODULES.map((module) => (
              <div key={module.name} className="panel module-card">
                <h2 className="mono-label">{module.name}</h2>
                <p>{module.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="product-section">
          <p>{REFUSAL}</p>
        </section>

        <section className="product-section panel">
          <p className="mono-label">{DIAGNOSTIC.name}</p>
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span className="price-term">/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>

        <p className="page-ctas">
          <Link href="/briefing">Book a briefing</Link>
          <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
