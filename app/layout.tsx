import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import HubSpotTracking from "./components/HubSpotTracking";
import GoogleTagManager from "./components/GoogleTagManager";
import GTMNoScript from "./components/GTMNoScript";
import GlobalSchemas from "../components/GlobalSchemas";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="E7JSaK23DaXqx3yMqAiM1WHNx6zrcWrg9zJ5yvfZN4I"
        />
        <GoogleTagManager />
      </head>
      <body className={`${newsreader.variable} ${sourceSans.variable} font-sans`}>
        <GTMNoScript />
        <HubSpotTracking />
        <GlobalSchemas />
        {children}
      </body>
    </html>
  );
}
