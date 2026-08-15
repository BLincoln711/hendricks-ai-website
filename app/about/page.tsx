import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { POSITIONING, REFUSAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: POSITIONING,
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <article className="product">
        <PageIntro eyebrow="About" title="About" deck={POSITIONING} />
        <section className="product-section panel">
          <p>
            Hendricks is the practice of Brandon Lincoln Hendricks. He named the category
            on Medium on 6 December 2025, in “What is a Search Intelligence Engineer?”
          </p>
          <p>
            He has been on both sides of the retrieval problem: Search and Innovation Lead
            at SolarWinds, and Global Paid Search Director at Merkle. Dentsu is the holding
            company, not a second job.
          </p>
          <p>{REFUSAL}</p>
        </section>
        <p className="page-ctas">
          <Link href="/insights/what-is-search-intelligence-engineer">
            What is a Search Intelligence Engineer?
          </Link>
          <Link href="/briefing">Book a briefing</Link>
        </p>
      </article>
    </SiteChrome>
  );
}
