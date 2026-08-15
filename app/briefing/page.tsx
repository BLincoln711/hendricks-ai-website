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
        <PageIntro title="Briefing" compact legend />
        <section className="band">
          <p className="measure">
            A briefing is how install and operate are scoped. The Retrieval Graph
            Diagnostic can be commissioned on its own.
          </p>
        </section>
        <section className="band band-close">
          <PageActions
            primary={{ href: BOOKING_URL, label: "Book a briefing", external: true }}
          />
        </section>
      </article>
    </SiteChrome>
  );
}
