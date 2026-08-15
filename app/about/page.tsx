import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro
          kicker="About"
          title="Brandon Lincoln Hendricks"
          spec
        />
        <section className="band">
          <p className="measure">
            Hendricks is the practice of Brandon Lincoln Hendricks.
          </p>
        </section>
        <section className="band" aria-label="Career">
          <p className="measure">
            Search and Innovation Lead at SolarWinds. Global Paid Search Director at
            Merkle. Dentsu is the holding company, not a second job.
          </p>
          <p className="cite-line">
            He named the category on Medium on 6 December 2025, in “What is a Search
            Intelligence Engineer?”
          </p>
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
