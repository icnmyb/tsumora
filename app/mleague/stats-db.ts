// app/mleague/stats-db.ts
// Mリーグ成績の元データ層。将来DBへ移す前提で、表示用データとは分けて保持する。
// 画面表示ではここから計算した値を sf-data.ts / page.tsx 側へ焼き込む運用にする。

export type MLeaguePhaseKey = "regular" | "semifinal" | "final";

export interface MLeagueSourceRef {
  label: string;
  url: string;
  asOf: string;
}

export interface TeamPhaseStats {
  season: string;
  phase: MLeaguePhaseKey;
  teamSlug: string;
  games: number;
  firsts: number;
  bestScore: number;
  source: MLeagueSourceRef;
  note?: string;
}

export interface PlayerPhaseStats {
  season: string;
  phase: MLeaguePhaseKey;
  playerId: string;
  teamSlug: string;
  games?: number;
  firsts?: number;
  seconds?: number;
  thirds?: number;
  fourths?: number;
  points: number;
  topRate?: number;
  avoidFourthRate?: number;
  bestScore?: number;
  source: MLeagueSourceRef;
  note?: string;
}

const OFFICIAL_REGULAR_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE Stats 2025-26 チーム成績表",
  url: "https://m-league.jp/stats/",
  asOf: "2026-03-27",
};

const OFFICIAL_SEMIFINAL_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE Stats 2025-26 セミファイナル チーム成績表",
  url: "https://m-league.jp/stats/?season=L001_S023",
  asOf: "2026-04-27",
};

const SEMIFINAL_POINTS_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE応援まとめサイト 2025-26セミファイナル チームポイント推移グラフ",
  url: "https://m-league.aja0.com/chart/2025/semifinal_team_scores.html",
  asOf: "2026-04-30",
};

export const TEAM_PHASE_STATS_2025_26: TeamPhaseStats[] = [
  // Regular season final. team top rate = firsts / 120.
  { season: "2025-26", phase: "regular", teamSlug: "earth-jets", games: 120, firsts: 22, bestScore: 80200, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "drivens", games: 120, firsts: 30, bestScore: 68300, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "furinkazan", games: 120, firsts: 36, bestScore: 104700, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "sakura-knights", games: 120, firsts: 23, bestScore: 97300, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "konami", games: 120, firsts: 37, bestScore: 74400, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "abemas", games: 120, firsts: 26, bestScore: 69600, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "phoenix", games: 120, firsts: 32, bestScore: 79600, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "raiden", games: 120, firsts: 32, bestScore: 59700, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "beast-x", games: 120, firsts: 36, bestScore: 65100, source: OFFICIAL_REGULAR_SOURCE },
  { season: "2025-26", phase: "regular", teamSlug: "pirates", games: 120, firsts: 26, bestScore: 91500, source: OFFICIAL_REGULAR_SOURCE },

  // Semifinal phase snapshot. This is phase-only, not regular-season inclusive.
  { season: "2025-26", phase: "semifinal", teamSlug: "drivens", games: 18, firsts: 2, bestScore: 70300, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
  { season: "2025-26", phase: "semifinal", teamSlug: "furinkazan", games: 18, firsts: 7, bestScore: 73900, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
  { season: "2025-26", phase: "semifinal", teamSlug: "konami", games: 18, firsts: 2, bestScore: 52900, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
  { season: "2025-26", phase: "semifinal", teamSlug: "phoenix", games: 20, firsts: 5, bestScore: 72800, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
  { season: "2025-26", phase: "semifinal", teamSlug: "raiden", games: 20, firsts: 6, bestScore: 66200, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
  { season: "2025-26", phase: "semifinal", teamSlug: "beast-x", games: 18, firsts: 6, bestScore: 61200, source: OFFICIAL_SEMIFINAL_SOURCE, note: "official stats snapshot before the final match day" },
];

export const PLAYER_PHASE_STATS_2025_26: PlayerPhaseStats[] = [
  { season: "2025-26", phase: "semifinal", playerId: "suzuki-d", teamSlug: "beast-x", points: 139.7, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "tojo", teamSlug: "beast-x", points: -7.6, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nakata", teamSlug: "beast-x", points: -23.2, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "shimoishi", teamSlug: "beast-x", points: -47.9, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nikaido-a", teamSlug: "furinkazan", points: 52.4, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nagai", teamSlug: "furinkazan", points: 3.4, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "katsumata", teamSlug: "furinkazan", points: -14.1, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "uchikawa", teamSlug: "furinkazan", points: -48.8, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "kurosawa", teamSlug: "raiden", points: 126.6, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "setokuma", teamSlug: "raiden", points: 106.0, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "honda", teamSlug: "raiden", points: 47.4, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "hagiwara", teamSlug: "raiden", points: 37.2, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "sasaki", teamSlug: "konami", points: 41.8, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takamiya", teamSlug: "konami", points: -41.1, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takizawa", teamSlug: "konami", points: -73.9, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "date", teamSlug: "konami", points: -177.4, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "daigo", teamSlug: "phoenix", points: 71.9, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "kayamori", teamSlug: "phoenix", points: 21.6, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takeuchi", teamSlug: "phoenix", points: 1.8, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "asai", teamSlug: "phoenix", points: -72.3, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "watanabe", teamSlug: "drivens", points: 54.0, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "asami", teamSlug: "drivens", points: -29.2, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "sonoda", teamSlug: "drivens", points: -48.3, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "suzuki-t", teamSlug: "drivens", points: -120.0, source: SEMIFINAL_POINTS_SOURCE },
];

export function getTeamPhaseStats(phase: MLeaguePhaseKey, teamSlug: string): TeamPhaseStats | undefined {
  return TEAM_PHASE_STATS_2025_26.find((s) => s.phase === phase && s.teamSlug === teamSlug);
}

export function getPlayerPhaseStats(
  phase: MLeaguePhaseKey,
  playerId: string,
): PlayerPhaseStats | undefined {
  return PLAYER_PHASE_STATS_2025_26.find((s) => s.phase === phase && s.playerId === playerId);
}
