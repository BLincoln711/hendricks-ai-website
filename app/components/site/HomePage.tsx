import {
  DIAGNOSTIC,
  METHOD_OBJECT,
  METHOD_STEPS,
  POSITIONING,
  PRACTICE_MODULES,
  REFUSAL,
} from "@/lib/site";
import { PageActions } from "./PageActions";
import { SiteChrome } from "./SiteChrome";

export function HomePage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <header className="product-hero masthead">
          <p className="mono-label">Hendricks · Search intelligence engineering</p>
          <h1 className="spec">{POSITIONING}</h1>
          <p className="deck">
            One system. We install it. We operate it. Built for the CMO, the managing
            partner, and the head of growth.
          </p>
        </header>

        <section className="console-band" aria-label="Method">
          <div className="method-track">
            {METHOD_STEPS.map((step) => (
              <div key={step} className="method-node">
                <strong>{step}</strong>
              </div>
            ))}
          </div>
          <p className="object-caption">Object = {METHOD_OBJECT}.</p>
        </section>

        <section className="instrument-stack" aria-label="Practice">
          {PRACTICE_MODULES.map((module, index) => (
            <article
              key={module.name}
              className="instrument-row"
              style={{ ["--i" as string]: index }}
            >
              <h2>{module.name}</h2>
              <p>{module.body}</p>
            </article>
          ))}
        </section>

        <p className="proof-line">
          He has been on both sides of the retrieval problem: Search and Innovation
          Lead at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the
          holding company, not a second job.
        </p>
        <p className="refusal-line">{REFUSAL}</p>

        <section className="offer-plate panel">
          <p className="mono-label">{DIAGNOSTIC.name}</p>
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span className="price-term">/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>

        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{ href: "/diagnostic", label: "Retrieval Graph Diagnostic" }}
        />
      </article>
    </SiteChrome>
  );
}
