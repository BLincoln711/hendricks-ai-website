import type { Metadata } from "next";

const TITLE = "Contact Hendricks.AI - Book Your AI Search Strategy Session";
const DESCRIPTION =
  "Book a strategy session with Hendricks.AI, the Search Intelligence Engineering firm. Get visibility snapshots across Google, Bing, ChatGPT, Gemini, and Perplexity plus attribution frameworks for B2B pipeline.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "https://hendricks.ai/contact",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://hendricks.ai/contact",
    siteName: "Hendricks.AI",
    images: [
      {
        url: "https://hendricks.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hendricks.AI - AI Search Visibility Measurement",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://hendricks.ai/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
