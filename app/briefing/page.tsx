import type { Metadata } from "next";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { BOOKING_URL, POSITIONING } from "@/lib/site";

export const metadata: Metadata = {
  title: "Briefing",
  description: POSITIONING,
};

export default function BriefingPage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro eyebrow="Briefing" title="Briefing" deck={POSITIONING} />
        <section className="product-section panel">
          <p>
            A briefing is how install and operate are scoped. The Retrieval Graph
            Diagnostic can be commissioned on its own.
          </p>
        </section>
        <p className="page-ctas">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            Book a briefing
          </a>
        </p>
      </article>
    </SiteChrome>
  );
}
