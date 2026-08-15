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
        <header className="product-hero">
          <p className="mono-label">Search intelligence engineering</p>
          <h1>Hendricks · Search intelligence engineering</h1>
          <p className="deck">
            One system. We install it. We operate it. Built for the CMO, the managing
            partner, and the head of growth.
          </p>
          <p className="lede">{POSITIONING}</p>
        </header>

        <section className="product-section">
          <p className="mono-label">Proof</p>
          <p>
            He has been on both sides of the retrieval problem: Search and Innovation
            Lead at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the
            holding company, not a second job.
          </p>
        </section>

        <section className="product-section">
          <p className="mono-label">Method</p>
          <div className="method-rail">
            {METHOD_STEPS.map((step, index) => (
              <div key={step} className="panel method-step">
                <div className="module-index">0{index + 1}</div>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "1rem" }}>Object = {METHOD_OBJECT}.</p>
        </section>

        <section className="product-section">
          <p className="mono-label">Practice</p>
          <div className="module-grid">
            {PRACTICE_MODULES.map((module, index) => (
              <div key={module.name} className="panel module-card">
                <div className="module-index">0{index + 1}</div>
                <h2>{module.name}</h2>
                <p>{module.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="product-section">
          <p className="mono-label">Refusal</p>
          <p>{REFUSAL}</p>
        </section>

        <section className="product-section panel">
          <p className="mono-label">{DIAGNOSTIC.name}</p>
          <p className="price-figure">
            {DIAGNOSTIC.price} <span style={{ color: "var(--muted)", fontSize: "0.45em" }}>/ {DIAGNOSTIC.duration}</span>
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
