// lib/computed.ts
// ホーム/各ページから共通利用する集計ヘルパー

import { ALL_PLAYERS, type FeaturedPlayer } from "@/app/players/data";
import { TEAMS, type TeamData } from "@/app/teams/data";
import { TITLES } from "@/app/titles/data";

const CURRENT_SEASON = "2025-26";

export interface MleagueStanding {
  team: TeamData;
  totalPts: number;
  rosterPlayers: FeaturedPlayer[];
}

export function computeMleagueStandings(): MleagueStanding[] {
  const out: MleagueStanding[] = [];
  for (const team of TEAMS) {
    const rosterPlayers: FeaturedPlayer[] = [];
    let totalPts = 0;
    for (const slot of team.currentRoster) {
      const p = ALL_PLAYERS.find((x) => x.id === slot.id);
      if (!p) continue;
      rosterPlayers.push(p);
      const seasonEntry = p.annualPoints?.find((ap) => ap.season === CURRENT_SEASON);
      if (seasonEntry?.points !== undefined) totalPts += seasonEntry.points;
    }
    out.push({ team, totalPts, rosterPlayers });
  }
  return out.sort((a, b) => b.totalPts - a.totalPts);
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
