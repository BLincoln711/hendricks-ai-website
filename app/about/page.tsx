import type { Metadata } from "next";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";
import { REFUSAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro
          kicker="About"
          title="Hendricks is the practice of Brandon Lincoln Hendricks."
          spec
        />
        <p className="cite-line">
          He named the category on Medium on 6 December 2025, in “What is a Search
          Intelligence Engineer?”
        </p>
        <div className="proof-rail">
          <div className="panel proof-plate">
            <p className="mono-label">SolarWinds</p>
            <p>Search and Innovation Lead</p>
          </div>
          <div className="panel proof-plate">
            <p className="mono-label">Merkle</p>
            <p>Global Paid Search Director</p>
          </div>
        </div>
        <p className="proof-line">
          Dentsu is the holding company, not a second job.
        </p>
        <p className="refusal-line">{REFUSAL}</p>
        <PageActions
          primary={{ href: "/briefing", label: "Book a briefing" }}
          secondary={{
            href: "/insights/what-is-search-intelligence-engineer",
            label: "What is a Search Intelligence Engineer?",
          }}
        />
      </article>
    </SiteChrome>
  );
}
