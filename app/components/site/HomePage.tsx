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
      <article className="page-article">
        <header className="page-intro">
          <h1>Hendricks · Search intelligence engineering</h1>
          <p className="deck">
            One system. We install it. We operate it. Built for the CMO, the managing
            partner, and the head of growth.
          </p>
          <p className="lede">{POSITIONING}</p>
        </header>

        <section>
          <h2>Proof</h2>
          <p>
            He has been on both sides of the retrieval problem: Search and Innovation
            Lead at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the
            holding company, not a second job.
          </p>
        </section>

        <section>
          <h2>Method</h2>
          <p className="method-line">{METHOD_STEPS.join(" → ")}</p>
          <p>Object = {METHOD_OBJECT}.</p>
        </section>

        <section>
          <h2>Practice</h2>
          <ul className="plain-list">
            {PRACTICE_MODULES.map((module) => (
              <li key={module.name}>
                <strong>{module.name}.</strong> {module.body}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Refusal</h2>
          <p>{REFUSAL}</p>
        </section>

        <section>
          <h2>{DIAGNOSTIC.name}</h2>
          <p>
            {DIAGNOSTIC.price} / {DIAGNOSTIC.duration}. Available on its own.
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
