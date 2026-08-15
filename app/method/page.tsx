import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { METHOD_OBJECT, METHOD_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Method",
  description: `Diagnose → Architect → Install → Operate. Object = ${METHOD_OBJECT}.`,
};

export default function MethodPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro
          kicker="Method"
          title="Diagnose → Architect → Install → Operate"
          spec
          wide
          deck={`Object = ${METHOD_OBJECT}.`}
        />
        <div className="method-track method-track-page">
          {METHOD_STEPS.map((step) => (
            <div key={step} className="method-node">
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{ href: "/practice", label: "Practice" }}
        />
      </article>
    </SiteChrome>
  );
}
