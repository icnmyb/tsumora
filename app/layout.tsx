import type { Metadata } from "next";
import "./globals.css";
import { BgLayers } from "@/components/BgLayers";
import { TopStrip } from "@/components/TopStrip";
import { Masthead } from "@/components/Masthead";
import { MainNav } from "@/components/MainNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CustomScrollbar } from "@/components/CustomScrollbar";

export const metadata: Metadata = {
  title: "Hora.mg — The Pro Mahjong Review",
  description:
    "5つのプロ団体とMリーグの対局・成績・選手情報を横断する総合データベース。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
      </body>
    </html>
  );
}
