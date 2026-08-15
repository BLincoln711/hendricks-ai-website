import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
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
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${newsreader.variable} font-sans`}
      >
        <GTMNoScript />
        <HubSpotTracking />
        <GlobalSchemas />
        {children}
      </body>
    </html>
  );
}
