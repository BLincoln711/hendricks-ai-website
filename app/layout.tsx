import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "./metadata";
import HubSpotTracking from "./components/HubSpotTracking";
import GoogleTagManager from "./components/GoogleTagManager";
import GTMNoScript from "./components/GTMNoScript";
import GlobalSchemas from "../components/GlobalSchemas";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
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
      <body className={`${instrument.variable} ${inter.variable} ${plexMono.variable} font-sans`}>
        <GTMNoScript />
        <HubSpotTracking />
        <GlobalSchemas />
        {children}
      </body>
    </html>
  );
}
