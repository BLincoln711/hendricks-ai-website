import {
  METHOD_STEPS,
  POSITIONING,
  PRACTICE_MODULES,
  REFUSAL,
  SURFACES,
  TWO_BUYS,
} from "@/lib/site";
import { FlowDiagram } from "./FlowDiagram";
import { LeadParallax } from "./LeadParallax";
import { PageActions } from "./PageActions";
import { SiteChrome } from "./SiteChrome";

export function HomePage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <header className="home-masthead">
          <div className="home-masthead-copy">
            <p className="mono-label">Search intelligence engineering</p>
            <h1 className="lead-spec">
              <LeadParallax>{POSITIONING}</LeadParallax>
            </h1>
            <p className="mono-fact">{TWO_BUYS}</p>
          </div>
          <FlowDiagram variant="home" />
        </header>

        <section className="band" aria-label="Proof">
          <p className="measure">
            He has been on both sides of the retrieval problem: Search and Innovation
            Lead at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the
            holding company, not a second job.
          </p>
        </section>

        <section className="band" aria-label="Method">
          <div className="verb-rail">
            {METHOD_STEPS.map((step) => (
              <strong key={step}>{step}</strong>
            ))}
          </div>
        </section>

        <section className="band" aria-label="System">
          <ul className="system-labels">
            {PRACTICE_MODULES.map((module) => (
              <li key={module.name}>{module.name}</li>
            ))}
          </ul>
        </section>

        <section className="band" aria-label="Surfaces">
          <ul className="surface-chips">
            {SURFACES.map((surface) => (
              <li key={surface}>{surface}</li>
            ))}
          </ul>
        </section>

        <section className="band" aria-label="Refusal">
          <p className="measure refusal-line">{REFUSAL}</p>
        </section>

        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
