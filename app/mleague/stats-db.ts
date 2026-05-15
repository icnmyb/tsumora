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
  points?: number;
  bestScore?: number;
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
  asOf: "2026-04-30",
};

const SEMIFINAL_POINTS_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE応援まとめサイト 2025-26セミファイナル 個人スコア推移グラフ",
  url: "https://m-league.aja0.com/chart/2025/semifinal_personal_scores.html",
  asOf: "2026-04-30",
};

const SEMIFINAL_FINAL_STANDINGS_SOURCE: MLeagueSourceRef = {
  label: "クランクイン！ Mリーグ25-26 セミファイナル最終順位",
  url: "https://www.crank-in.net/news/184607/1",
  asOf: "2026-04-30",
};

const FINAL_GAMES_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE 試合日程 2025-26",
  url: "https://m-league.jp/games/",
  asOf: "2026-05-14",
};

const FINAL_TOP_SOURCE: MLeagueSourceRef = {
  label: "M.LEAGUE公式サイト 2025-26ファイナル順位（進行中）",
  url: "https://m-league.jp/",
  asOf: "2026-05-14",
};

// Final開幕後は、確認済みソースを MLeagueSourceRef として追加し、
// phase: "final" の TeamPhaseStats / PlayerPhaseStats を追記する。
// 最高素点や率が未確認の場合は、該当フィールドを空のままにする。

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

  // Semifinal final. This is phase-only, not regular-season inclusive.
  { season: "2025-26", phase: "semifinal", teamSlug: "furinkazan", games: 20, firsts: 7, points: 97.9, bestScore: 73900, source: SEMIFINAL_FINAL_STANDINGS_SOURCE },
  { season: "2025-26", phase: "semifinal", teamSlug: "beast-x", games: 20, firsts: 6, points: 31.8, bestScore: 61200, source: SEMIFINAL_FINAL_STANDINGS_SOURCE },
  { season: "2025-26", phase: "semifinal", teamSlug: "konami", games: 20, firsts: 4, points: -105.0, bestScore: 52900, source: SEMIFINAL_FINAL_STANDINGS_SOURCE },
  { season: "2025-26", phase: "semifinal", teamSlug: "raiden", games: 20, firsts: 6, points: 259.2, bestScore: 66200, source: SEMIFINAL_FINAL_STANDINGS_SOURCE },
  { season: "2025-26", phase: "semifinal", teamSlug: "phoenix", games: 20, firsts: 5, points: -40.8, bestScore: 72800, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", teamSlug: "drivens", games: 20, firsts: 2, points: -243.1, bestScore: 70300, source: SEMIFINAL_FINAL_STANDINGS_SOURCE },

  // Final in-progress (as of 2026-05-14). points = ファイナル獲得pt（持越ptは含めない）
  { season: "2025-26", phase: "final", teamSlug: "furinkazan", games: 14, firsts: 2, points: 112.0, source: FINAL_TOP_SOURCE },
  { season: "2025-26", phase: "final", teamSlug: "beast-x", games: 14, firsts: 5, points: -22.8, source: FINAL_TOP_SOURCE },
  { season: "2025-26", phase: "final", teamSlug: "konami", games: 14, firsts: 3, points: -12.1, source: FINAL_TOP_SOURCE },
  { season: "2025-26", phase: "final", teamSlug: "raiden", games: 14, firsts: 4, points: -77.1, source: FINAL_TOP_SOURCE },
];

export const PLAYER_PHASE_STATS_2025_26: PlayerPhaseStats[] = [
  // Final in-progress (as of 2026-05-14), phase-only points.
  { season: "2025-26", phase: "final", playerId: "takizawa", teamSlug: "konami", games: 4, firsts: 2, seconds: 0, thirds: 1, fourths: 1, points: 66.1, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "nikaido-a", teamSlug: "furinkazan", games: 3, firsts: 1, seconds: 1, thirds: 1, fourths: 0, points: 42.0, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "uchikawa", teamSlug: "furinkazan", games: 5, firsts: 1, seconds: 2, thirds: 1, fourths: 1, points: -18.6, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "sasaki", teamSlug: "konami", games: 4, firsts: 0, seconds: 3, thirds: 0, fourths: 1, points: -5.7, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "setokuma", teamSlug: "raiden", games: 3, firsts: 0, seconds: 1, thirds: 1, fourths: 1, points: -64.1, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "hagiwara", teamSlug: "raiden", games: 4, firsts: 0, seconds: 1, thirds: 1, fourths: 2, points: -81.8, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "suzuki-d", teamSlug: "beast-x", games: 3, firsts: 1, seconds: 0, thirds: 0, fourths: 2, points: -33.5, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "shimoishi", teamSlug: "beast-x", games: 3, firsts: 1, seconds: 0, thirds: 0, fourths: 2, points: -103.7, source: FINAL_GAMES_SOURCE },

  { season: "2025-26", phase: "final", playerId: "kurosawa", teamSlug: "raiden", games: 3, firsts: 1, seconds: 1, thirds: 1, fourths: 0, points: 31.2, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "nakata", teamSlug: "beast-x", games: 4, firsts: 2, seconds: 1, thirds: 0, fourths: 1, points: 75.4, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "takamiya", teamSlug: "konami", games: 3, firsts: 0, seconds: 0, thirds: 3, fourths: 0, points: -89.6, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "nagai", teamSlug: "furinkazan", games: 2, firsts: 0, seconds: 0, thirds: 0, fourths: 2, points: -109.1, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "date", teamSlug: "konami", games: 3, firsts: 1, seconds: 1, thirds: 0, fourths: 1, points: 17.1, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "tojo", teamSlug: "beast-x", games: 4, firsts: 1, seconds: 1, thirds: 1, fourths: 1, points: 39.0, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "honda", teamSlug: "raiden", games: 4, firsts: 1, seconds: 0, thirds: 3, fourths: 0, points: 37.6, source: FINAL_GAMES_SOURCE },
  { season: "2025-26", phase: "final", playerId: "katsumata", teamSlug: "raiden", games: 4, firsts: 2, seconds: 2, thirds: 0, fourths: 0, points: 197.7, source: FINAL_GAMES_SOURCE },

  { season: "2025-26", phase: "semifinal", playerId: "suzuki-d", teamSlug: "beast-x", games: 5, firsts: 3, seconds: 1, thirds: 1, fourths: 0, points: 176.5, topRate: 60.0, avoidFourthRate: 100.0, bestScore: 55400, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "kurosawa", teamSlug: "raiden", games: 5, firsts: 2, seconds: 1, thirds: 2, fourths: 0, points: 101.9, topRate: 40.0, avoidFourthRate: 100.0, bestScore: 66200, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "watanabe", teamSlug: "drivens", games: 6, firsts: 2, seconds: 1, thirds: 3, fourths: 0, points: 91.6, topRate: 33.3, avoidFourthRate: 100.0, bestScore: 70300, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "katsumata", teamSlug: "furinkazan", games: 6, firsts: 3, seconds: 0, thirds: 1, fourths: 2, points: 87.8, topRate: 50.0, avoidFourthRate: 66.7, bestScore: 73900, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "sasaki", teamSlug: "konami", games: 7, firsts: 2, seconds: 3, thirds: 1, fourths: 1, points: 68.3, topRate: 28.6, avoidFourthRate: 85.7, bestScore: 52900, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "honda", teamSlug: "raiden", games: 6, firsts: 2, seconds: 2, thirds: 1, fourths: 1, points: 61.1, topRate: 33.3, avoidFourthRate: 83.3, bestScore: 52000, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "hagiwara", teamSlug: "raiden", games: 4, firsts: 1, seconds: 2, thirds: 0, fourths: 1, points: 52.1, topRate: 25.0, avoidFourthRate: 75.0, bestScore: 54100, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "setokuma", teamSlug: "raiden", games: 5, firsts: 1, seconds: 3, thirds: 0, fourths: 1, points: 44.1, topRate: 20.0, avoidFourthRate: 80.0, bestScore: 48800, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nikaido-a", teamSlug: "furinkazan", games: 4, firsts: 1, seconds: 1, thirds: 2, fourths: 0, points: 34.8, topRate: 25.0, avoidFourthRate: 100.0, bestScore: 40200, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nagai", teamSlug: "furinkazan", games: 5, firsts: 2, seconds: 0, thirds: 2, fourths: 1, points: 30.9, topRate: 40.0, avoidFourthRate: 80.0, bestScore: 40900, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "kayamori", teamSlug: "phoenix", games: 5, firsts: 1, seconds: 3, thirds: 0, fourths: 1, points: 24.9, topRate: 20.0, avoidFourthRate: 80.0, bestScore: 33300, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "asai", teamSlug: "phoenix", games: 4, firsts: 1, seconds: 1, thirds: 1, fourths: 1, points: 20.5, topRate: 25.0, avoidFourthRate: 75.0, bestScore: 72800, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "nakata", teamSlug: "beast-x", games: 5, firsts: 2, seconds: 0, thirds: 1, fourths: 2, points: 5.1, topRate: 40.0, avoidFourthRate: 60.0, bestScore: 61200, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takamiya", teamSlug: "konami", games: 5, firsts: 0, seconds: 3, thirds: 2, fourths: 0, points: 0.8, topRate: 0.0, avoidFourthRate: 100.0, bestScore: 50000, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "asami", teamSlug: "drivens", games: 3, firsts: 0, seconds: 2, thirds: 0, fourths: 1, points: -16.6, topRate: 0.0, avoidFourthRate: 66.7, bestScore: 38300, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takeuchi", teamSlug: "phoenix", games: 6, firsts: 2, seconds: 1, thirds: 0, fourths: 3, points: -24.3, topRate: 33.3, avoidFourthRate: 50.0, bestScore: 54000, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "shimoishi", teamSlug: "beast-x", games: 5, firsts: 1, seconds: 1, thirds: 2, fourths: 1, points: -25.6, topRate: 20.0, avoidFourthRate: 80.0, bestScore: 52200, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "uchikawa", teamSlug: "furinkazan", games: 5, firsts: 1, seconds: 1, thirds: 2, fourths: 1, points: -55.6, topRate: 20.0, avoidFourthRate: 80.0, bestScore: 42600, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "takizawa", teamSlug: "konami", games: 4, firsts: 1, seconds: 0, thirds: 1, fourths: 2, points: -56.8, topRate: 25.0, avoidFourthRate: 50.0, bestScore: 51900, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "daigo", teamSlug: "phoenix", games: 5, firsts: 1, seconds: 1, thirds: 1, fourths: 2, points: -61.9, topRate: 20.0, avoidFourthRate: 60.0, bestScore: 42100, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "date", teamSlug: "konami", games: 4, firsts: 1, seconds: 0, thirds: 0, fourths: 3, points: -117.3, topRate: 25.0, avoidFourthRate: 25.0, bestScore: 40100, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "tojo", teamSlug: "beast-x", games: 5, firsts: 0, seconds: 2, thirds: 1, fourths: 2, points: -124.2, topRate: 0.0, avoidFourthRate: 60.0, bestScore: 34000, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "sonoda", teamSlug: "drivens", games: 7, firsts: 0, seconds: 1, thirds: 5, fourths: 1, points: -149.4, topRate: 0.0, avoidFourthRate: 85.7, bestScore: 30300, source: SEMIFINAL_POINTS_SOURCE },
  { season: "2025-26", phase: "semifinal", playerId: "suzuki-t", teamSlug: "drivens", games: 4, firsts: 0, seconds: 0, thirds: 1, fourths: 3, points: -168.7, topRate: 0.0, avoidFourthRate: 25.0, bestScore: 16000, source: SEMIFINAL_POINTS_SOURCE },
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
