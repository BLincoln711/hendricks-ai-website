import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { DIAGNOSTIC } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${DIAGNOSTIC.name}, ${DIAGNOSTIC.price} / ${DIAGNOSTIC.duration}. Install and operate are scoped on the briefing.`,
};

export default function PricingPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro kicker="Pricing" title={DIAGNOSTIC.name} compact />
        <section className="offer-plate panel offer-plate-hero">
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span className="price-term">/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>
        <p className="object-caption">
          Install and operate are scoped on the briefing.
        </p>
        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{ href: "/diagnostic", label: "Retrieval Graph Diagnostic" }}
        />
      </article>
    </SiteChrome>
  );
}
