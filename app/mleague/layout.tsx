import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mリーグ 2025-26 — TSUMORA",
  description:
    "Mリーグ 2025-26シーズンの順位表・10チーム一覧・個人成績ランキング。データは選手の年間獲得pt実績から計算。",
};

export default function MleagueLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
