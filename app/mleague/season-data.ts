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

const COMPLETED_THROUGH = "2026-11-13";

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
  gamesPlayed: 136,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は11月13日終了時点で136試合を消化。永井孝典、朝倉康心、佐野ひなこ、茅森早香が同日のトップを獲得し、KADOKAWAサクラナイツが618.2ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 618.2, gamesPlayed: 56, gamesTotal: 120, firsts: 23, bestScore: 62800 },
    { rank: 2, teamSlug: "raiden", points: 180.1, gamesPlayed: 54, gamesTotal: 120, firsts: 17, bestScore: 81900 },
    { rank: 3, teamSlug: "konami", points: 174.2, gamesPlayed: 54, gamesTotal: 120, firsts: 17, bestScore: 62200 },
    { rank: 4, teamSlug: "phoenix", points: 99.3, gamesPlayed: 54, gamesTotal: 120, firsts: 12, bestScore: 71100 },
    { rank: 5, teamSlug: "drivens", points: 74.8, gamesPlayed: 54, gamesTotal: 120, firsts: 15, bestScore: 66700 },
    { rank: 6, teamSlug: "beast-x", points: -110.0, gamesPlayed: 54, gamesTotal: 120, firsts: 11, bestScore: 82700 },
    { rank: 7, teamSlug: "pirates", points: -194.0, gamesPlayed: 56, gamesTotal: 120, firsts: 10, bestScore: 62600 },
    { rank: 8, teamSlug: "abemas", points: -234.7, gamesPlayed: 54, gamesTotal: 120, firsts: 10, bestScore: 81600 },
    { rank: 9, teamSlug: "earth-jets", points: -257.1, gamesPlayed: 54, gamesTotal: 120, firsts: 12, bestScore: 61800 },
    { rank: 10, teamSlug: "furinkazan", points: -350.8, gamesPlayed: 54, gamesTotal: 120, firsts: 9, bestScore: 74600 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 14, firsts: 8, seconds: 2, thirds: 4, fourths: 0, points: 483.8, bestScore: 81900 },
    { playerId: "honda", teamSlug: "raiden", games: 16, firsts: 7, seconds: 3, thirds: 6, fourths: 0, points: 354.4, bestScore: 62300 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 13, firsts: 8, seconds: 1, thirds: 0, fourths: 4, points: 273.9, bestScore: 62800 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 16, firsts: 7, seconds: 3, thirds: 4, fourths: 2, points: 250.6, bestScore: 61800 },
    { playerId: "watanabe", teamSlug: "drivens", games: 15, firsts: 7, seconds: 3, thirds: 1, fourths: 4, points: 231.8, bestScore: 47700 },
    { playerId: "sasaki", teamSlug: "konami", games: 16, firsts: 7, seconds: 1, thirds: 2, fourths: 6, points: 151.2, bestScore: 62200 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 15, firsts: 5, seconds: 5, thirds: 2, fourths: 3, points: 221.0, bestScore: 59100 },
    { playerId: "taii", teamSlug: "abemas", games: 15, firsts: 5, seconds: 2, thirds: 4, fourths: 4, points: 82.5, bestScore: 81600 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 14, firsts: 8, seconds: 0, thirds: 2, fourths: 4, points: 245.6, bestScore: 59300 },
    { playerId: "daigo", teamSlug: "phoenix", games: 15, firsts: 4, seconds: 6, thirds: 3, fourths: 2, points: 133.8, bestScore: 53500 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 18, firsts: 3, seconds: 10, thirds: 3, fourths: 2, points: 90.9, bestScore: 58200 },
    { playerId: "takamiya", teamSlug: "konami", games: 11, firsts: 3, seconds: 3, thirds: 4, fourths: 1, points: 88.5, bestScore: 40100 },
    { playerId: "tojo", teamSlug: "beast-x", games: 15, firsts: 3, seconds: 3, thirds: 6, fourths: 3, points: 4.4, bestScore: 82700 },
    { playerId: "takizawa", teamSlug: "konami", games: 13, firsts: 4, seconds: 3, thirds: 2, fourths: 4, points: 23.5, bestScore: 59500 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 16, firsts: 5, seconds: 4, thirds: 3, fourths: 4, points: 50.3, bestScore: 48700 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 15, firsts: 3, seconds: 6, thirds: 4, fourths: 2, points: 6.5, bestScore: 45300 },
    { playerId: "nakata", teamSlug: "beast-x", games: 11, firsts: 3, seconds: 2, thirds: 2, fourths: 4, points: -25.0, bestScore: 69300 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 10, firsts: 4, seconds: 1, thirds: 2, fourths: 3, points: 89.4, bestScore: 63300 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 14, firsts: 2, seconds: 7, thirds: 1, fourths: 4, points: -30.0, bestScore: 54200 },
    { playerId: "asami", teamSlug: "drivens", games: 11, firsts: 3, seconds: 3, thirds: 3, fourths: 2, points: 34.2, bestScore: 50800 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 13, firsts: 3, seconds: 2, thirds: 5, fourths: 3, points: -20.9, bestScore: 62300 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 14, firsts: 2, seconds: 5, thirds: 4, fourths: 3, points: -9.1, bestScore: 64700 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 11, firsts: 2, seconds: 2, thirds: 6, fourths: 1, points: -68.2, bestScore: 41900 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 13, firsts: 2, seconds: 4, thirds: 6, fourths: 1, points: -73.1, bestScore: 38000 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 14, firsts: 2, seconds: 5, thirds: 2, fourths: 5, points: -134.9, bestScore: 46300 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 14, firsts: 2, seconds: 4, thirds: 4, fourths: 4, points: -122.3, bestScore: 62700 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 13, firsts: 3, seconds: 4, thirds: 2, fourths: 4, points: -7.3, bestScore: 71100 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 14, firsts: 3, seconds: 4, thirds: 2, fourths: 5, points: -80.3, bestScore: 51100 },
    { playerId: "date", teamSlug: "konami", games: 14, firsts: 3, seconds: 5, thirds: 0, fourths: 6, points: -89.0, bestScore: 46200 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 14, firsts: 3, seconds: 4, thirds: 4, fourths: 3, points: -63.4, bestScore: 62600 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 12, firsts: 2, seconds: 2, thirds: 5, fourths: 3, points: -111.0, bestScore: 42500 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 12, firsts: 0, seconds: 5, thirds: 5, fourths: 2, points: -150.9, bestScore: 37400 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 16, firsts: 1, seconds: 6, thirds: 6, fourths: 3, points: -116.6, bestScore: 53500 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 17, firsts: 3, seconds: 4, thirds: 3, fourths: 7, points: -241.5, bestScore: 42100 },
    { playerId: "sonoda", teamSlug: "drivens", games: 15, firsts: 2, seconds: 2, thirds: 7, fourths: 4, points: -170.3, bestScore: 66700 },
    { playerId: "shiratori", teamSlug: "abemas", games: 11, firsts: 1, seconds: 4, thirds: 3, fourths: 3, points: -131.7, bestScore: 39300 },
    { playerId: "miura", teamSlug: "earth-jets", games: 8, firsts: 0, seconds: 3, thirds: 2, fourths: 3, points: -193.1, bestScore: 31200 },
    { playerId: "hinata", teamSlug: "abemas", games: 10, firsts: 1, seconds: 0, thirds: 5, fourths: 4, points: -276.4, bestScore: 43600 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 14, firsts: 2, seconds: 3, thirds: 5, fourths: 4, points: -154.2, bestScore: 74600 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 12, firsts: 0, seconds: 1, thirds: 2, fourths: 9, points: -547.1, bestScore: 26400 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "nagai", winnerTeamSlug: "furinkazan", points: 74.6 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 62.6 },
    { game: 3, winnerId: "sano_hinako", winnerTeamSlug: "phoenix", points: 63.3 },
    { game: 4, winnerId: "kayamori", winnerTeamSlug: "phoenix", points: 71.1 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
