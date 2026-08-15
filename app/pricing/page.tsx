import type { Metadata } from "next";
import Link from "next/link";
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
      <article className="product">
        <PageIntro eyebrow="Pricing" title="Pricing" />
        <section className="product-section panel">
          <p className="mono-label">{DIAGNOSTIC.name}</p>
          <p className="price-figure">
            {DIAGNOSTIC.price}{" "}
            <span style={{ color: "var(--muted)", fontSize: "0.45em" }}>/ {DIAGNOSTIC.duration}</span>
          </p>
          <p>{DIAGNOSTIC.lede}</p>
        </section>
        <p>Install and operate are scoped on the briefing.</p>
        <p className="page-ctas">
          <Link href="/briefing">Book a briefing</Link>
          <Link href="/diagnostic">Retrieval Graph Diagnostic</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
