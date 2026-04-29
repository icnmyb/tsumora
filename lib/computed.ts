// lib/computed.ts
// ホーム/各ページから共通利用する集計ヘルパー

import { ALL_PLAYERS, type FeaturedPlayer } from "@/app/players/data";
import { type TeamData, getTeamBySlug } from "@/app/teams/data";
import { TITLES } from "@/app/titles/data";
import { REGULAR_FINAL_2025_26 } from "@/app/mleague/sf-data";

export interface MleagueStanding {
  team: TeamData;
  totalPts: number;
  rosterPlayers: FeaturedPlayer[];
  rank: number;
  advanced: boolean;
}

// レギュラーシーズン終了時の確定順位を返す。
// 2025-26 は実データ (Wikipedia / Mリーグ公式) を使用。
export function computeMleagueStandings(): MleagueStanding[] {
  const real = REGULAR_FINAL_2025_26.standings;
  const out: MleagueStanding[] = [];
  for (const entry of real) {
    const team = getTeamBySlug(entry.teamSlug);
    if (!team) continue;
    const rosterPlayers = team.currentRoster
      .map((slot) => ALL_PLAYERS.find((p) => p.id === slot.id))
      .filter((p): p is FeaturedPlayer => Boolean(p));
    out.push({
      team,
      totalPts: entry.points,
      rank: entry.rank,
      advanced: entry.advanced,
      rosterPlayers,
    });
  }
  return out;
}

export interface TitleCountEntry {
  player: FeaturedPlayer;
  count: number;
  notable: string;
}

export function computeTitleRanking(): TitleCountEntry[] {
  const out: TitleCountEntry[] = [];
  for (const p of ALL_PLAYERS) {
    const titles = p.titles ?? [];
    if (titles.length === 0) continue;
    const notable = titles[0]?.name ?? "";
    out.push({ player: p, count: titles.length, notable });
  }
  return out.sort((a, b) => b.count - a.count);
}

export function fmtPts(pts: number): string {
  const sign = pts >= 0 ? "+" : "−";
  return `${sign}${Math.abs(pts).toFixed(1)}`;
}

// 現タイトル保持者 (holder が定義されているタイトルのみ)
export function getCurrentTitlists() {
  return TITLES.filter((t) => t.holder).map((t) => ({
    title: t,
    holder: t.holder!,
  }));
}
