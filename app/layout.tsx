import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { BgLayers } from "@/components/BgLayers";
import { TopStrip } from "@/components/TopStrip";
import { Masthead } from "@/components/Masthead";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomScrollbar } from "@/components/CustomScrollbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://tsumora.com"),
  title: "TSUMORA — The Pro Mahjong Review",
  description:
    "5つのプロ団体とMリーグの対局・成績・選手情報を横断する総合データベース。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg?v=20260501-tile-t" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700;800;900&family=Noto+Sans+JP:wght@400;500;700;900&family=Instrument+Serif:ital@0;1&family=Geist+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BgLayers />
        <CustomScrollbar />
        <TopStrip />
        <Masthead />
        <MainNav />
        <main>{children}</main>
        <SiteFooter />
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          src="https://plausible.io/js/pa-YHnbajbr6mQ8AX5gVKHY5.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`}
        </Script>
      </body>
    </html>
  );
}
