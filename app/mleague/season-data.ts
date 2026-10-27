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

const COMPLETED_THROUGH = "2026-10-27";

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
  gamesPlayed: 96,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は10月27日終了時点で96試合を消化。醍醐大、本田朋広、HIRO柴田、逢川恵夢が同日のトップを獲得し、KADOKAWAサクラナイツが429.9ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 429.9, gamesPlayed: 38, gamesTotal: 120, firsts: 15, bestScore: 62700 },
    { rank: 2, teamSlug: "konami", points: 271.2, gamesPlayed: 38, gamesTotal: 120, firsts: 12, bestScore: 62200 },
    { rank: 3, teamSlug: "pirates", points: 69.1, gamesPlayed: 38, gamesTotal: 120, firsts: 7, bestScore: 54200 },
    { rank: 4, teamSlug: "raiden", points: 39.7, gamesPlayed: 38, gamesTotal: 120, firsts: 12, bestScore: 81900 },
    { rank: 5, teamSlug: "drivens", points: 37.1, gamesPlayed: 38, gamesTotal: 120, firsts: 11, bestScore: 66700 },
    { rank: 6, teamSlug: "phoenix", points: -32.9, gamesPlayed: 38, gamesTotal: 120, firsts: 7, bestScore: 53500 },
    { rank: 7, teamSlug: "beast-x", points: -47.2, gamesPlayed: 40, gamesTotal: 120, firsts: 9, bestScore: 82700 },
    { rank: 8, teamSlug: "abemas", points: -243.5, gamesPlayed: 38, gamesTotal: 120, firsts: 8, bestScore: 81600 },
    { rank: 9, teamSlug: "furinkazan", points: -253.2, gamesPlayed: 40, gamesTotal: 120, firsts: 7, bestScore: 46300 },
    { rank: 10, teamSlug: "earth-jets", points: -270.2, gamesPlayed: 38, gamesTotal: 120, firsts: 8, bestScore: 40900 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 9, firsts: 6, seconds: 1, thirds: 2, fourths: 0, points: 396.8, bestScore: 81900 },
    { playerId: "watanabe", teamSlug: "drivens", games: 11, firsts: 6, seconds: 2, thirds: 0, fourths: 3, points: 238.6, bestScore: 47700 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 11, firsts: 4, seconds: 4, thirds: 2, fourths: 1, points: 223.5, bestScore: 59100 },
    { playerId: "taii", teamSlug: "abemas", games: 10, firsts: 4, seconds: 1, thirds: 2, fourths: 3, points: 93.8, bestScore: 81600 },
    { playerId: "sasaki", teamSlug: "konami", games: 11, firsts: 5, seconds: 1, thirds: 1, fourths: 4, points: 151.6, bestScore: 62200 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 8, firsts: 5, seconds: 1, thirds: 0, fourths: 2, points: 179.5, bestScore: 50400 },
    { playerId: "honda", teamSlug: "raiden", games: 12, firsts: 4, seconds: 2, thirds: 6, fourths: 0, points: 137.0, bestScore: 49500 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 10, firsts: 3, seconds: 4, thirds: 1, fourths: 2, points: 77.4, bestScore: 45300 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 11, firsts: 2, seconds: 5, thirds: 1, fourths: 3, points: -6.5, bestScore: 46300 },
    { playerId: "takizawa", teamSlug: "konami", games: 10, firsts: 3, seconds: 3, thirds: 1, fourths: 3, points: 34.7, bestScore: 59500 },
    { playerId: "nakata", teamSlug: "beast-x", games: 10, firsts: 3, seconds: 2, thirds: 2, fourths: 3, points: 32.7, bestScore: 69300 },
    { playerId: "takamiya", teamSlug: "konami", games: 8, firsts: 2, seconds: 3, thirds: 2, fourths: 1, points: 69.0, bestScore: 40100 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 9, firsts: 2, seconds: 4, thirds: 2, fourths: 1, points: 46.5, bestScore: 54000 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 10, firsts: 2, seconds: 4, thirds: 1, fourths: 3, points: -1.4, bestScore: 54200 },
    { playerId: "tojo", teamSlug: "beast-x", games: 10, firsts: 2, seconds: 1, thirds: 4, fourths: 3, points: -42.1, bestScore: 82700 },
    { playerId: "daigo", teamSlug: "phoenix", games: 10, firsts: 3, seconds: 5, thirds: 1, fourths: 1, points: 162.7, bestScore: 53500 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 6, firsts: 2, seconds: 1, thirds: 1, fourths: 2, points: 14.3, bestScore: 52500 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 10, firsts: 2, seconds: 1, thirds: 4, fourths: 3, points: -53.9, bestScore: 64700 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 11, firsts: 2, seconds: 6, thirds: 1, fourths: 2, points: 17.4, bestScore: 58200 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 10, firsts: 2, seconds: 3, thirds: 5, fourths: 0, points: 3.9, bestScore: 38000 },
    { playerId: "date", teamSlug: "konami", games: 9, firsts: 2, seconds: 4, thirds: 0, fourths: 3, points: 15.9, bestScore: 46200 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 10, firsts: 2, seconds: 3, thirds: 2, fourths: 3, points: -40.7, bestScore: 49700 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 10, firsts: 3, seconds: 4, thirds: 2, fourths: 1, points: 107.1, bestScore: 48700 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 11, firsts: 4, seconds: 2, thirds: 3, fourths: 2, points: 56.7, bestScore: 40900 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 10, firsts: 5, seconds: 0, thirds: 2, fourths: 3, points: 83.2, bestScore: 40900 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 9, firsts: 1, seconds: 3, thirds: 3, fourths: 2, points: -56.3, bestScore: 62700 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 9, firsts: 2, seconds: 2, thirds: 2, fourths: 3, points: -61.8, bestScore: 42500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 8, firsts: 1, seconds: 1, thirds: 5, fourths: 1, points: -105.7, bestScore: 41900 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 10, firsts: 2, seconds: 4, thirds: 2, fourths: 2, points: 16.1, bestScore: 45200 },
    { playerId: "shiratori", teamSlug: "abemas", games: 8, firsts: 1, seconds: 2, thirds: 2, fourths: 3, points: -141.4, bestScore: 39300 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 9, firsts: 1, seconds: 2, thirds: 3, fourths: 3, points: -92.7, bestScore: 62300 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 12, firsts: 0, seconds: 4, thirds: 6, fourths: 2, points: -169.2, bestScore: 53500 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 9, firsts: 0, seconds: 4, thirds: 4, fourths: 1, points: -83.1, bestScore: 37400 },
    { playerId: "asami", teamSlug: "drivens", games: 8, firsts: 2, seconds: 1, thirds: 3, fourths: 2, points: -60.2, bestScore: 44700 },
    { playerId: "sonoda", teamSlug: "drivens", games: 10, firsts: 2, seconds: 1, thirds: 4, fourths: 3, points: -48.6, bestScore: 66700 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 11, firsts: 1, seconds: 2, thirds: 4, fourths: 4, points: -218.4, bestScore: 34500 },
    { playerId: "hinata", teamSlug: "abemas", games: 9, firsts: 1, seconds: 0, thirds: 5, fourths: 3, points: -213.3, bestScore: 43600 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 10, firsts: 2, seconds: 2, thirds: 2, fourths: 4, points: -134.9, bestScore: 35600 },
    { playerId: "miura", teamSlug: "earth-jets", games: 7, firsts: 0, seconds: 2, thirds: 2, fourths: 3, points: -195.9, bestScore: 31200 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 8, firsts: 0, seconds: 0, thirds: 1, fourths: 7, points: -432.3, bestScore: 14900 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "daigo", winnerTeamSlug: "phoenix", points: 67.5 },
    { game: 2, winnerId: "honda", winnerTeamSlug: "raiden", points: 54.1 },
    { game: 3, winnerId: "hiro-shibata", winnerTeamSlug: "earth-jets", points: 53.8 },
    { game: 4, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 49.7 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
