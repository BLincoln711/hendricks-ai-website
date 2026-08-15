import type { Metadata } from "next";
import { PracticeInstrument } from "../components/instrument/PracticeInstrument";
import { PageActions } from "../components/site/PageActions";
import { PageIntro } from "../components/site/PageIntro";
import { SiteChrome } from "../components/site/SiteChrome";

export const metadata: Metadata = {
  title: "Practice",
};

export default function PracticePage() {
  return (
    <SiteChrome>
      <article className="product interior">
        <PageIntro title="Practice" compact legend />
        <section className="band band-flush">
          <PracticeInstrument />
        </section>
        <section className="band band-close">
          <PageActions primary={{ href: "/briefing", label: "Book a briefing" }} />
        </section>
      </article>
    </SiteChrome>
  );
}
