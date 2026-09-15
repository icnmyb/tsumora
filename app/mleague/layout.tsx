import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mリーグ 2026-27 — TSUMORA",
  description:
    "Mリーグ 2026-27シーズンの最新順位表・10チーム一覧・個人成績ランキング。確定した試合結果を順次反映。",
};

export default function MleagueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
