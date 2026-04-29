import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "競技ルール — TSUMORA",
  description:
    "プロ麻雀5団体（JPML / 最高位戦 / NPM / RMU / μ）の競技ルールの違いを比較。アガリ点・ウマ・順位点 ほか。",
  openGraph: {
    title: "競技ルール — TSUMORA",
    description: "プロ麻雀5団体の競技ルール比較。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function RulesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
