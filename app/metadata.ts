import { Metadata } from "next";
import { POSITIONING, SITE_URL } from "@/lib/site";

export const siteConfig = {
  name: "Hendricks",
  description: POSITIONING,
  url: SITE_URL,
  ogImage: "https://hendricks.ai/hendricks-ai-social-share.png",
  links: {
    twitter: "https://twitter.com/hendricksai",
    linkedin: "https://linkedin.com/company/hendricks-ai",
  },
};

export const defaultMetadata: Metadata = {
  title: {
    default: "Hendricks · Search intelligence engineering",
    template: "%s · Hendricks",
  },
  description: siteConfig.description,
  keywords: [
    "search intelligence engineering",
    "search intelligence engineer",
    "retrieved cited chosen",
    "AI Overviews",
    "ChatGPT citations",
    "retrieval graph",
    "Brandon Lincoln Hendricks",
    "Hendricks",
  ],
  authors: [{ name: "Hendricks" }],
  creator: "Hendricks",
  publisher: "Hendricks",
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hendricks · Search intelligence engineering",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1600,
        height: 900,
        alt: "Hendricks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hendricks · Search intelligence engineering",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@hendricksai",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "E7JSaK23DaXqx3yMqAiM1WHNx6zrcWrg9zJ5yvfZN4I",
  },
};
