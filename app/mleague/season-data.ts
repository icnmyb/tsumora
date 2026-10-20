// Mリーグ2026-27 レギュラーシーズンの確定済みデータ。
// 出典: https://m-league.jp/ および https://m-league.jp/games/

import {
  MLEAGUE_REGULAR_2026_27_TABLES,
  type MLeagueTeamId,
} from "@/app/schedule/mleague-2026-27";

export interface RegularSeasonStanding {
  rank: number;
  teamSlug: string;
  points: number;
  gamesPlayed: number;
  gamesTotal: number;
  firsts: number;
  bestScore?: number;
}

export interface RegularSeasonPlayerStats {
  playerId: string;
  teamSlug: string;
  games: number;
  firsts: number;
  seconds: number;
  thirds: number;
  fourths: number;
  points: number;
  bestScore: number;
}

export interface RegularSeasonMatchResult {
  game: number;
  winnerId: string;
  winnerTeamSlug: string;
  points: number;
}

export interface RegularSeasonMatch {
  date: string;
  startTimeJst: string;
  teamSlugs: string[];
}

const SCHEDULE_TEAM_SLUGS: Record<MLeagueTeamId, string> = {
  jets: "earth-jets",
  drivens: "drivens",
  furinkazan: "furinkazan",
  sakura: "sakura-knights",
  konami: "konami",
  abemas: "abemas",
  phoenix: "phoenix",
  raiden: "raiden",
  beast: "beast-x",
  pirates: "pirates",
};

const COMPLETED_THROUGH = "2026-10-19";

const upcomingMatches: RegularSeasonMatch[] = MLEAGUE_REGULAR_2026_27_TABLES
  .filter(([date]) => date > COMPLETED_THROUGH)
  .map(([date, ...teamIds]) => ({
    date,
    startTimeJst: "19:00",
    teamSlugs: teamIds.map((teamId) => SCHEDULE_TEAM_SLUGS[teamId]),
  }));

export const REGULAR_2026_27 = {
  season: "2026-27",
  startDate: "2026-09-14",
  asOf: COMPLETED_THROUGH,
  gamesPlayed: 76,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は10月19日終了時点で76試合を消化。滝沢和典、伊達朱里紗、HIRO柴田、勝又健志が同日のトップを獲得し、KONAMI麻雀格闘倶楽部が304.6ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "konami", points: 304.6, gamesPlayed: 30, gamesTotal: 120, firsts: 11, bestScore: 62200 },
    { rank: 2, teamSlug: "sakura-knights", points: 277.4, gamesPlayed: 30, gamesTotal: 120, firsts: 12, bestScore: 62700 },
    { rank: 3, teamSlug: "beast-x", points: 31.0, gamesPlayed: 30, gamesTotal: 120, firsts: 7, bestScore: 82700 },
    { rank: 4, teamSlug: "raiden", points: 22.2, gamesPlayed: 30, gamesTotal: 120, firsts: 9, bestScore: 81900 },
    { rank: 5, teamSlug: "drivens", points: -24.1, gamesPlayed: 30, gamesTotal: 120, firsts: 9, bestScore: 62300 },
    { rank: 6, teamSlug: "furinkazan", points: -36.4, gamesPlayed: 30, gamesTotal: 120, firsts: 6, bestScore: 46300 },
    { rank: 7, teamSlug: "abemas", points: -41.2, gamesPlayed: 32, gamesTotal: 120, firsts: 8, bestScore: 81600 },
    { rank: 8, teamSlug: "pirates", points: -58.5, gamesPlayed: 32, gamesTotal: 120, firsts: 5, bestScore: 54200 },
    { rank: 9, teamSlug: "phoenix", points: -72.8, gamesPlayed: 30, gamesTotal: 120, firsts: 5, bestScore: 53500 },
    { rank: 10, teamSlug: "earth-jets", points: -402.2, gamesPlayed: 30, gamesTotal: 120, firsts: 4, bestScore: 38000 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 7, firsts: 5, seconds: 1, thirds: 1, fourths: 0, points: 350.7, bestScore: 81900 },
    { playerId: "watanabe", teamSlug: "drivens", games: 9, firsts: 6, seconds: 1, thirds: 0, fourths: 2, points: 289.4, bestScore: 47700 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 9, firsts: 4, seconds: 3, thirds: 1, fourths: 1, points: 238.9, bestScore: 59100 },
    { playerId: "taii", teamSlug: "abemas", games: 8, firsts: 4, seconds: 1, thirds: 2, fourths: 1, points: 204.1, bestScore: 81600 },
    { playerId: "sasaki", teamSlug: "konami", games: 10, firsts: 5, seconds: 1, thirds: 1, fourths: 3, points: 197.2, bestScore: 62200 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 6, firsts: 4, seconds: 0, thirds: 0, fourths: 2, points: 121.5, bestScore: 50400 },
    { playerId: "honda", teamSlug: "raiden", games: 10, firsts: 3, seconds: 2, thirds: 5, fourths: 0, points: 99.4, bestScore: 49500 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 8, firsts: 2, seconds: 4, thirds: 1, fourths: 1, points: 75.8, bestScore: 45300 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 8, firsts: 2, seconds: 4, thirds: 0, fourths: 2, points: 74.3, bestScore: 46300 },
    { playerId: "takizawa", teamSlug: "konami", games: 8, firsts: 3, seconds: 2, thirds: 1, fourths: 2, points: 67.7, bestScore: 59500 },
    { playerId: "nakata", teamSlug: "beast-x", games: 8, firsts: 3, seconds: 1, thirds: 2, fourths: 2, points: 66.0, bestScore: 69300 },
    { playerId: "takamiya", teamSlug: "konami", games: 5, firsts: 1, seconds: 2, thirds: 2, fourths: 0, points: 44.3, bestScore: 39100 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 8, firsts: 2, seconds: 3, thirds: 2, fourths: 1, points: 40.3, bestScore: 54000 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 9, firsts: 2, seconds: 4, thirds: 0, fourths: 3, points: 17.6, bestScore: 54200 },
    { playerId: "tojo", teamSlug: "beast-x", games: 7, firsts: 2, seconds: 0, thirds: 3, fourths: 2, points: 17.0, bestScore: 82700 },
    { playerId: "daigo", teamSlug: "phoenix", games: 7, firsts: 1, seconds: 4, thirds: 1, fourths: 1, points: 15.3, bestScore: 45400 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 6, firsts: 2, seconds: 1, thirds: 1, fourths: 2, points: 14.3, bestScore: 52500 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 8, firsts: 2, seconds: 1, thirds: 3, fourths: 2, points: 11.3, bestScore: 64700 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 9, firsts: 2, seconds: 4, thirds: 1, fourths: 2, points: 5.0, bestScore: 58200 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 7, firsts: 1, seconds: 3, thirds: 3, fourths: 0, points: -2.2, bestScore: 38000 },
    { playerId: "date", teamSlug: "konami", games: 7, firsts: 2, seconds: 2, thirds: 0, fourths: 3, points: -4.6, bestScore: 46200 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 7, firsts: 2, seconds: 1, thirds: 2, fourths: 2, points: -11.8, bestScore: 49700 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 8, firsts: 1, seconds: 4, thirds: 2, fourths: 1, points: -18.3, bestScore: 35400 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 8, firsts: 2, seconds: 2, thirds: 2, fourths: 2, points: -33.4, bestScore: 33500 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 8, firsts: 3, seconds: 0, thirds: 2, fourths: 3, points: -33.8, bestScore: 40900 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 7, firsts: 1, seconds: 2, thirds: 2, fourths: 2, points: -49.2, bestScore: 62700 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 6, firsts: 1, seconds: 2, thirds: 1, fourths: 2, points: -51.0, bestScore: 42500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 6, firsts: 1, seconds: 1, thirds: 3, fourths: 1, points: -59.2, bestScore: 41900 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 7, firsts: 0, seconds: 4, thirds: 2, fourths: 1, points: -63.3, bestScore: 28600 },
    { playerId: "shiratori", teamSlug: "abemas", games: 7, firsts: 1, seconds: 2, thirds: 2, fourths: 2, points: -82.9, bestScore: 39300 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 7, firsts: 1, seconds: 1, thirds: 2, fourths: 3, points: -89.8, bestScore: 62300 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 10, firsts: 0, seconds: 4, thirds: 5, fourths: 1, points: -90.6, bestScore: 53500 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 7, firsts: 0, seconds: 2, thirds: 4, fourths: 1, points: -98.1, bestScore: 37400 },
    { playerId: "asami", teamSlug: "drivens", games: 6, firsts: 1, seconds: 1, thirds: 2, fourths: 2, points: -105.5, bestScore: 44700 },
    { playerId: "sonoda", teamSlug: "drivens", games: 8, firsts: 1, seconds: 1, thirds: 3, fourths: 3, points: -118.2, bestScore: 58300 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 8, firsts: 1, seconds: 2, thirds: 2, fourths: 3, points: -127.3, bestScore: 34500 },
    { playerId: "hinata", teamSlug: "abemas", games: 8, firsts: 1, seconds: 0, thirds: 5, fourths: 2, points: -167.4, bestScore: 43600 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 8, firsts: 1, seconds: 2, thirds: 1, fourths: 4, points: -170.7, bestScore: 35600 },
    { playerId: "miura", teamSlug: "earth-jets", games: 7, firsts: 0, seconds: 2, thirds: 2, fourths: 3, points: -195.9, bestScore: 31200 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 7, firsts: 0, seconds: 0, thirds: 1, fourths: 6, points: -376.9, bestScore: 14900 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "takizawa", winnerTeamSlug: "konami", points: 55.9 },
    { game: 2, winnerId: "date", winnerTeamSlug: "konami", points: 57.5 },
    { game: 3, winnerId: "hiro-shibata", winnerTeamSlug: "earth-jets", points: 53.5 },
    { game: 4, winnerId: "katsumata", winnerTeamSlug: "furinkazan", points: 55.9 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
