import { METHOD_STEPS, PRACTICE_MODULES, REFUSAL, TWO_BUYS } from "@/lib/site";
import { HomeInstrument } from "../instrument/HomeInstrument";
import { PageActions } from "./PageActions";
import { SiteChrome } from "./SiteChrome";

export function HomePage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <header className="home-masthead">
          <p className="mono-label">Search intelligence engineering</p>
          <HomeInstrument />
          <p className="mono-fact">{TWO_BUYS}</p>
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
