import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { METHOD_OBJECT, METHOD_STEPS, POSITIONING } from "@/lib/site";

export const metadata: Metadata = {
  title: "Method",
  description: `Diagnose → Architect → Install → Operate. Object = ${METHOD_OBJECT}.`,
};

const STEP_COPY: Record<(typeof METHOD_STEPS)[number], string> = {
  Diagnose:
    "Read how the firm is retrieved, cited, and chosen on the surfaces that matter. The public probe is not this step. The Retrieval Graph Diagnostic is.",
  Architect:
    "Design one search intelligence system: the demand and query map, the source architecture, and the measurement harness.",
  Install:
    "Put the system in the firm's own stack. Pages, entities, schema, feeds, and the scoreboard are installed, not rented as a dashboard.",
  Operate:
    "Keep the system current as queries, sources, and surfaces move. We operate the system. The firm owns it.",
};

export default function MethodPage() {
  return (
    <SiteChrome>
      <article className="page-article">
        <PageIntro
          title="Method"
          deck={`${METHOD_STEPS.join(" → ")}. Object = ${METHOD_OBJECT}.`}
        />
        <p>{POSITIONING}</p>
        <ol className="module-list">
          {METHOD_STEPS.map((step) => (
            <li key={step}>
              <h2>{step}</h2>
              <p>{STEP_COPY[step]}</p>
            </li>
          ))}
        </ol>
        <p className="page-ctas">
          <Link href="/practice">Practice</Link>
          <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
