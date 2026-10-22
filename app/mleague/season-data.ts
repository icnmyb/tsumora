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

const COMPLETED_THROUGH = "2026-10-22";

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
  gamesPlayed: 84,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は10月22日終了時点で84試合を消化。醍醐大、仲林圭、堀慎吾、岡田紗佳が同日のトップを獲得し、KADOKAWAサクラナイツが377.6ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 377.6, gamesPlayed: 34, gamesTotal: 120, firsts: 14, bestScore: 62700 },
    { rank: 2, teamSlug: "konami", points: 289.2, gamesPlayed: 34, gamesTotal: 120, firsts: 12, bestScore: 62200 },
    { rank: 3, teamSlug: "beast-x", points: 61.5, gamesPlayed: 34, gamesTotal: 120, firsts: 8, bestScore: 82700 },
    { rank: 4, teamSlug: "raiden", points: 57.8, gamesPlayed: 32, gamesTotal: 120, firsts: 10, bestScore: 81900 },
    { rank: 5, teamSlug: "pirates", points: 16.4, gamesPlayed: 34, gamesTotal: 120, firsts: 6, bestScore: 54200 },
    { rank: 6, teamSlug: "phoenix", points: -2.2, gamesPlayed: 34, gamesTotal: 120, firsts: 6, bestScore: 53500 },
    { rank: 7, teamSlug: "drivens", points: -74.8, gamesPlayed: 32, gamesTotal: 120, firsts: 9, bestScore: 62300 },
    { rank: 8, teamSlug: "furinkazan", points: -154.5, gamesPlayed: 34, gamesTotal: 120, firsts: 6, bestScore: 46300 },
    { rank: 9, teamSlug: "abemas", points: -158.8, gamesPlayed: 34, gamesTotal: 120, firsts: 8, bestScore: 81600 },
    { rank: 10, teamSlug: "earth-jets", points: -412.2, gamesPlayed: 34, gamesTotal: 120, firsts: 5, bestScore: 38000 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 8, firsts: 6, seconds: 1, thirds: 1, fourths: 0, points: 429.5, bestScore: 81900 },
    { playerId: "watanabe", teamSlug: "drivens", games: 10, firsts: 6, seconds: 1, thirds: 0, fourths: 3, points: 229.9, bestScore: 47700 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 10, firsts: 4, seconds: 4, thirds: 1, fourths: 1, points: 244.2, bestScore: 59100 },
    { playerId: "taii", teamSlug: "abemas", games: 9, firsts: 4, seconds: 1, thirds: 2, fourths: 2, points: 145.0, bestScore: 81600 },
    { playerId: "sasaki", teamSlug: "konami", games: 11, firsts: 5, seconds: 1, thirds: 1, fourths: 4, points: 151.6, bestScore: 62200 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 7, firsts: 5, seconds: 0, thirds: 0, fourths: 2, points: 174.8, bestScore: 50400 },
    { playerId: "honda", teamSlug: "raiden", games: 10, firsts: 3, seconds: 2, thirds: 5, fourths: 0, points: 99.4, bestScore: 49500 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 9, firsts: 2, seconds: 4, thirds: 1, fourths: 2, points: 24.6, bestScore: 45300 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 10, firsts: 2, seconds: 5, thirds: 0, fourths: 3, points: 26.2, bestScore: 46300 },
    { playerId: "takizawa", teamSlug: "konami", games: 9, firsts: 3, seconds: 2, thirds: 1, fourths: 3, points: 25.6, bestScore: 59500 },
    { playerId: "nakata", teamSlug: "beast-x", games: 9, firsts: 3, seconds: 2, thirds: 2, fourths: 2, points: 73.6, bestScore: 69300 },
    { playerId: "takamiya", teamSlug: "konami", games: 6, firsts: 2, seconds: 2, thirds: 2, fourths: 0, points: 104.4, bestScore: 40100 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 9, firsts: 2, seconds: 4, thirds: 2, fourths: 1, points: 46.5, bestScore: 54000 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 9, firsts: 2, seconds: 4, thirds: 0, fourths: 3, points: 17.6, bestScore: 54200 },
    { playerId: "tojo", teamSlug: "beast-x", games: 8, firsts: 2, seconds: 0, thirds: 4, fourths: 2, points: -3.3, bestScore: 82700 },
    { playerId: "daigo", teamSlug: "phoenix", games: 9, firsts: 2, seconds: 5, thirds: 1, fourths: 1, points: 95.2, bestScore: 53500 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 6, firsts: 2, seconds: 1, thirds: 1, fourths: 2, points: 14.3, bestScore: 52500 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 9, firsts: 2, seconds: 1, thirds: 4, fourths: 2, points: -10.7, bestScore: 64700 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 9, firsts: 2, seconds: 4, thirds: 1, fourths: 2, points: 5.0, bestScore: 58200 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 8, firsts: 1, seconds: 3, thirds: 4, fourths: 0, points: -23.4, bestScore: 38000 },
    { playerId: "date", teamSlug: "konami", games: 8, firsts: 2, seconds: 3, thirds: 0, fourths: 3, points: 7.6, bestScore: 46200 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 8, firsts: 2, seconds: 2, thirds: 2, fourths: 2, points: -0.4, bestScore: 49700 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 9, firsts: 2, seconds: 4, thirds: 2, fourths: 1, points: 50.4, bestScore: 48700 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 9, firsts: 2, seconds: 2, thirds: 3, fourths: 2, points: -58.0, bestScore: 33500 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 9, firsts: 4, seconds: 0, thirds: 2, fourths: 3, points: 25.2, bestScore: 40900 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 8, firsts: 1, seconds: 2, thirds: 3, fourths: 2, points: -66.6, bestScore: 62700 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 7, firsts: 1, seconds: 2, thirds: 1, fourths: 3, points: -94.2, bestScore: 42500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 6, firsts: 1, seconds: 1, thirds: 3, fourths: 1, points: -59.2, bestScore: 41900 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 8, firsts: 1, seconds: 4, thirds: 2, fourths: 1, points: 1.9, bestScore: 45200 },
    { playerId: "shiratori", teamSlug: "abemas", games: 8, firsts: 1, seconds: 2, thirds: 2, fourths: 3, points: -141.4, bestScore: 39300 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 8, firsts: 1, seconds: 2, thirds: 2, fourths: 3, points: -81.0, bestScore: 62300 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 11, firsts: 0, seconds: 4, thirds: 6, fourths: 1, points: -111.3, bestScore: 53500 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 7, firsts: 0, seconds: 2, thirds: 4, fourths: 1, points: -98.1, bestScore: 37400 },
    { playerId: "asami", teamSlug: "drivens", games: 6, firsts: 1, seconds: 1, thirds: 2, fourths: 2, points: -105.5, bestScore: 44700 },
    { playerId: "sonoda", teamSlug: "drivens", games: 8, firsts: 1, seconds: 1, thirds: 3, fourths: 3, points: -118.2, bestScore: 58300 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 9, firsts: 1, seconds: 2, thirds: 3, fourths: 3, points: -146.1, bestScore: 34500 },
    { playerId: "hinata", teamSlug: "abemas", games: 8, firsts: 1, seconds: 0, thirds: 5, fourths: 2, points: -167.4, bestScore: 43600 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 10, firsts: 2, seconds: 2, thirds: 2, fourths: 4, points: -134.9, bestScore: 35600 },
    { playerId: "miura", teamSlug: "earth-jets", games: 7, firsts: 0, seconds: 2, thirds: 2, fourths: 3, points: -195.9, bestScore: 31200 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 7, firsts: 0, seconds: 0, thirds: 1, fourths: 6, points: -376.9, bestScore: 14900 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "daigo", winnerTeamSlug: "phoenix", points: 73.5 },
    { game: 2, winnerId: "nakabayashi", winnerTeamSlug: "pirates", points: 68.7 },
    { game: 3, winnerId: "hori", winnerTeamSlug: "sakura-knights", points: 59.0 },
    { game: 4, winnerId: "okada", winnerTeamSlug: "sakura-knights", points: 53.3 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
