import type { Metadata } from "next";
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
        <section className="instrument-stack" aria-label="Practice modules">
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
        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{ href: "/diagnostic", label: "Retrieval Graph Diagnostic" }}
        />
      </article>
    </SiteChrome>
  );
}
