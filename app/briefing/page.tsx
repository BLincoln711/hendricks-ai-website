import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Briefing",
};

export default function BriefingPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro kicker="Briefing" title="Briefing" compact />
        <p className="proof-line">
          A briefing is how install and operate are scoped. The Retrieval Graph
          Diagnostic can be commissioned on its own.
        </p>
        <PageActions
          primary={{ href: BOOKING_URL, label: "Book a briefing", external: true }}
          secondary={{ href: "/diagnostic", label: "Retrieval Graph Diagnostic" }}
        />
      </article>
    </SiteChrome>
  );
}
