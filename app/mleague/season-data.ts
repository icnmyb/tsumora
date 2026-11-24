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

const COMPLETED_THROUGH = "2026-11-23";

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
  gamesPlayed: 156,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は11月23日終了時点で156試合を消化。HIRO柴田、鈴木たろう、醍醐大、中田花奈が同日のトップを獲得し、KADOKAWAサクラナイツが602.4ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 602.4, gamesPlayed: 62, gamesTotal: 120, firsts: 24, bestScore: 62800 },
    { rank: 2, teamSlug: "phoenix", points: 233.2, gamesPlayed: 62, gamesTotal: 120, firsts: 15, bestScore: 64500 },
    { rank: 3, teamSlug: "drivens", points: 184.1, gamesPlayed: 62, gamesTotal: 120, firsts: 19, bestScore: 66700 },
    { rank: 4, teamSlug: "raiden", points: 167.7, gamesPlayed: 62, gamesTotal: 120, firsts: 19, bestScore: 81900 },
    { rank: 5, teamSlug: "konami", points: 39.5, gamesPlayed: 64, gamesTotal: 120, firsts: 19, bestScore: 62200 },
    { rank: 6, teamSlug: "beast-x", points: -95.9, gamesPlayed: 62, gamesTotal: 120, firsts: 14, bestScore: 86000 },
    { rank: 7, teamSlug: "earth-jets", points: -164.7, gamesPlayed: 62, gamesTotal: 120, firsts: 15, bestScore: 61800 },
    { rank: 8, teamSlug: "pirates", points: -253.9, gamesPlayed: 64, gamesTotal: 120, firsts: 10, bestScore: 54200 },
    { rank: 9, teamSlug: "furinkazan", points: -315.6, gamesPlayed: 62, gamesTotal: 120, firsts: 11, bestScore: 74700 },
    { rank: 10, teamSlug: "abemas", points: -396.8, gamesPlayed: 62, gamesTotal: 120, firsts: 11, bestScore: 81600 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 16, firsts: 8, seconds: 2, thirds: 6, fourths: 0, points: 440.4, bestScore: 81900 },
    { playerId: "honda", teamSlug: "raiden", games: 18, firsts: 9, seconds: 3, thirds: 6, fourths: 0, points: 478.9, bestScore: 62300 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 15, firsts: 9, seconds: 1, thirds: 0, fourths: 5, points: 291.2, bestScore: 62800 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 16, firsts: 5, seconds: 5, thirds: 3, fourths: 3, points: 207.9, bestScore: 59100 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 19, firsts: 8, seconds: 3, thirds: 6, fourths: 2, points: 270.8, bestScore: 61800 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 16, firsts: 8, seconds: 1, thirds: 2, fourths: 5, points: 210.1, bestScore: 59300 },
    { playerId: "watanabe", teamSlug: "drivens", games: 17, firsts: 7, seconds: 3, thirds: 2, fourths: 5, points: 146.8, bestScore: 47700 },
    { playerId: "daigo", teamSlug: "phoenix", games: 17, firsts: 5, seconds: 6, thirds: 4, fourths: 2, points: 179.6, bestScore: 64500 },
    { playerId: "sasaki", teamSlug: "konami", games: 20, firsts: 7, seconds: 2, thirds: 4, fourths: 7, points: 35.0, bestScore: 62200 },
    { playerId: "takizawa", teamSlug: "konami", games: 17, firsts: 6, seconds: 3, thirds: 2, fourths: 6, points: 9.0, bestScore: 59500 },
    { playerId: "tojo", teamSlug: "beast-x", games: 17, firsts: 4, seconds: 4, thirds: 6, fourths: 3, points: 123.4, bestScore: 86000 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 12, firsts: 5, seconds: 2, thirds: 2, fourths: 3, points: 157.1, bestScore: 52500 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 19, firsts: 3, seconds: 10, thirds: 3, fourths: 3, points: 50.4, bestScore: 58200 },
    { playerId: "takamiya", teamSlug: "konami", games: 13, firsts: 3, seconds: 4, thirds: 5, fourths: 1, points: 84.5, bestScore: 40100 },
    { playerId: "taii", teamSlug: "abemas", games: 17, firsts: 5, seconds: 2, thirds: 5, fourths: 5, points: 24.5, bestScore: 81600 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 17, firsts: 5, seconds: 5, thirds: 3, fourths: 4, points: 57.4, bestScore: 48700 },
    { playerId: "asami", teamSlug: "drivens", games: 12, firsts: 4, seconds: 3, thirds: 3, fourths: 2, points: 90.3, bestScore: 50800 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 16, firsts: 5, seconds: 2, thirds: 6, fourths: 3, points: 114.0, bestScore: 66500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 14, firsts: 3, seconds: 2, thirds: 7, fourths: 2, points: -63.9, bestScore: 74700 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 17, firsts: 4, seconds: 7, thirds: 4, fourths: 2, points: 70.0, bestScore: 45300 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 15, firsts: 4, seconds: 4, thirds: 3, fourths: 4, points: 34.9, bestScore: 51100 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 15, firsts: 3, seconds: 5, thirds: 4, fourths: 3, points: 54.2, bestScore: 64700 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 17, firsts: 2, seconds: 10, thirds: 1, fourths: 4, points: -17.5, bestScore: 54200 },
    { playerId: "shiratori", teamSlug: "abemas", games: 15, firsts: 2, seconds: 5, thirds: 3, fourths: 5, points: -181.9, bestScore: 39300 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 14, firsts: 2, seconds: 4, thirds: 7, fourths: 1, points: -89.6, bestScore: 38000 },
    { playerId: "nakata", teamSlug: "beast-x", games: 14, firsts: 4, seconds: 2, thirds: 2, fourths: 6, points: -73.5, bestScore: 69300 },
    { playerId: "date", teamSlug: "konami", games: 14, firsts: 3, seconds: 5, thirds: 0, fourths: 6, points: -89.0, bestScore: 46200 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 16, firsts: 3, seconds: 4, thirds: 5, fourths: 4, points: -133.9, bestScore: 54000 },
    { playerId: "miura", teamSlug: "earth-jets", games: 12, firsts: 2, seconds: 4, thirds: 3, fourths: 3, points: -104.4, bestScore: 46000 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 18, firsts: 1, seconds: 7, thirds: 7, fourths: 3, points: -138.4, bestScore: 53500 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 15, firsts: 2, seconds: 5, thirds: 4, fourths: 4, points: -106.8, bestScore: 62700 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 15, firsts: 2, seconds: 6, thirds: 2, fourths: 5, points: -126.7, bestScore: 46300 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 16, firsts: 2, seconds: 4, thirds: 5, fourths: 5, points: -195.0, bestScore: 54600 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 14, firsts: 0, seconds: 6, thirds: 6, fourths: 2, points: -159.9, bestScore: 37400 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 14, firsts: 2, seconds: 3, thirds: 5, fourths: 4, points: -170.7, bestScore: 42500 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 16, firsts: 3, seconds: 4, thirds: 2, fourths: 7, points: -200.0, bestScore: 51100 },
    { playerId: "sonoda", teamSlug: "drivens", games: 17, firsts: 3, seconds: 2, thirds: 7, fourths: 5, points: -167.0, bestScore: 66700 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 17, firsts: 3, seconds: 4, thirds: 3, fourths: 7, points: -241.5, bestScore: 42100 },
    { playerId: "hinata", teamSlug: "abemas", games: 11, firsts: 1, seconds: 0, thirds: 6, fourths: 4, points: -289.8, bestScore: 43600 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 14, firsts: 0, seconds: 2, thirds: 2, fourths: 10, points: -580.9, bestScore: 31400 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "hiro-shibata", winnerTeamSlug: "earth-jets", points: 57.3 },
    { game: 2, winnerId: "suzuki-t", winnerTeamSlug: "drivens", points: 86.5 },
    { game: 3, winnerId: "daigo", winnerTeamSlug: "phoenix", points: 64.5 },
    { game: 4, winnerId: "nakata", winnerTeamSlug: "beast-x", points: 52.5 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
