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
      <article className="page-article">
        <PageIntro title="Pricing" />
        <section>
          <h2>{DIAGNOSTIC.name}</h2>
          <p>
            {DIAGNOSTIC.price} / {DIAGNOSTIC.duration}.
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
