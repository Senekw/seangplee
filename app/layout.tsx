import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { site } from "@/content/site";
import SmoothScroll from "@/components/providers/SmoothScroll";
import TopBar from "@/components/layout/TopBar";
import ScrollProgress from "@/components/primitives/ScrollProgress";
import Cursor from "@/components/primitives/Cursor";
import GlitchTexture from "@/components/decor/GlitchTexture";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display-src",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.meta.title,
  description: site.meta.description,
  authors: [{ name: site.fullName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    siteName: site.name,
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <GlitchTexture />
        <ScrollProgress />
        <Cursor />
        <TopBar />
        <div className="grain-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
