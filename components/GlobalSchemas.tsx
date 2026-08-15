import Script from "next/script";
import { DIAGNOSTIC, POSITIONING, SITE_URL } from "@/lib/site";

export default function GlobalSchemas() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Hendricks",
    alternateName: "Hendricks.AI",
    description: POSITIONING,
    url: SITE_URL,
    logo: `${SITE_URL}/hendricks_logo.png`,
    sameAs: [
      "https://linkedin.com/company/hendricks-ai",
      "https://twitter.com/hendricksai",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Houston",
      addressRegion: "TX",
      addressCountry: "US",
    },
    founder: {
      "@type": "Person",
      name: "Brandon Lincoln Hendricks",
      jobTitle: "Search Intelligence Engineer",
      url: `${SITE_URL}/about`,
      sameAs: [
        "https://www.linkedin.com/in/brandonlincolnhendricks/",
        "https://twitter.com/hendricksai",
      ],
      alumniOf: [
        {
          "@type": "Organization",
          name: "SolarWinds",
          description: "Search and Innovation Lead",
        },
        {
          "@type": "Organization",
          name: "Merkle",
          description: "Global Paid Search Director",
        },
      ],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Hendricks",
      itemListElement: [
        {
          "@type": "Offer",
          name: DIAGNOSTIC.name,
          description: DIAGNOSTIC.lede,
          price: "15000",
          priceCurrency: "USD",
          url: `${SITE_URL}/diagnostic`,
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_URL,
    name: "Hendricks",
    description: POSITIONING,
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
