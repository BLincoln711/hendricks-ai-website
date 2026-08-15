import type { Metadata } from "next";
import { FlowDiagram } from "../components/site/FlowDiagram";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { PRACTICE_MODULES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro title="Practice" compact legend />
        <section className="band band-flush">
          <FlowDiagram variant="practice" />
        </section>
        <section className="band" aria-label="Practice modules">
          <ul className="system-labels">
            {PRACTICE_MODULES.map((module) => (
              <li key={module.name}>{module.name}</li>
            ))}
          </ul>
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
