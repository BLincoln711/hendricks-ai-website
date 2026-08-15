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
        <PageIntro title="Pricing" compact legend />
        <section className="band spec-stack">
          <p className="mono-label">{DIAGNOSTIC.name}</p>
          <p className="price-figure price-figure-type">{DIAGNOSTIC.price}</p>
          <p className="measure">
            {DIAGNOSTIC.duration}. {DIAGNOSTIC.lede}
          </p>
        </section>
        <section className="band spec-stack">
          <p className="mono-label">Install and operate</p>
          <p className="measure">Install and operate are scoped on the briefing.</p>
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
