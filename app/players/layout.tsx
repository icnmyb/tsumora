import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロ選手 — TSUMORA",
  description:
    "JPML / 最高位戦 / NPM / RMU / μ + Mリーグ、約2,900名の現役プロ雀士データベース。検索・絞り込み・五十音順ソート対応。",
  openGraph: {
    title: "プロ選手 — TSUMORA",
    description: "5団体・約2,900名のプロ雀士データベース。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function PlayersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
