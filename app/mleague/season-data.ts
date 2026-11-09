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

const COMPLETED_THROUGH = "2026-11-09";

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
  gamesPlayed: 124,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は11月9日終了時点で124試合を消化。阿久津翔太、佐野ひなこ、佐々木寿人、高宮まりが同日のトップを獲得し、KADOKAWAサクラナイツが429.5ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 429.5, gamesPlayed: 50, gamesTotal: 120, firsts: 19, bestScore: 62700 },
    { rank: 2, teamSlug: "konami", points: 252.5, gamesPlayed: 50, gamesTotal: 120, firsts: 16, bestScore: 62200 },
    { rank: 3, teamSlug: "raiden", points: 132.2, gamesPlayed: 50, gamesTotal: 120, firsts: 16, bestScore: 81900 },
    { rank: 4, teamSlug: "drivens", points: 49.4, gamesPlayed: 50, gamesTotal: 120, firsts: 15, bestScore: 66700 },
    { rank: 5, teamSlug: "beast-x", points: -26.1, gamesPlayed: 50, gamesTotal: 120, firsts: 11, bestScore: 82700 },
    { rank: 6, teamSlug: "phoenix", points: -69.4, gamesPlayed: 50, gamesTotal: 120, firsts: 9, bestScore: 53500 },
    { rank: 7, teamSlug: "pirates", points: -126.1, gamesPlayed: 50, gamesTotal: 120, firsts: 9, bestScore: 54200 },
    { rank: 8, teamSlug: "abemas", points: -153.3, gamesPlayed: 48, gamesTotal: 120, firsts: 10, bestScore: 81600 },
    { rank: 9, teamSlug: "earth-jets", points: -189.8, gamesPlayed: 48, gamesTotal: 120, firsts: 11, bestScore: 61800 },
    { rank: 10, teamSlug: "furinkazan", points: -298.9, gamesPlayed: 50, gamesTotal: 120, firsts: 8, bestScore: 46300 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 13, firsts: 8, seconds: 2, thirds: 3, fourths: 0, points: 503.8, bestScore: 81900 },
    { playerId: "honda", teamSlug: "raiden", games: 15, firsts: 6, seconds: 3, thirds: 6, fourths: 0, points: 272.1, bestScore: 49500 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 11, firsts: 7, seconds: 1, thirds: 0, fourths: 3, points: 255.1, bestScore: 50400 },
    { playerId: "watanabe", teamSlug: "drivens", games: 14, firsts: 7, seconds: 2, thirds: 1, fourths: 4, points: 218.9, bestScore: 47700 },
    { playerId: "sasaki", teamSlug: "konami", games: 15, firsts: 7, seconds: 1, thirds: 2, fourths: 5, points: 198.3, bestScore: 62200 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 15, firsts: 6, seconds: 3, thirds: 4, fourths: 2, points: 191.3, bestScore: 61800 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 14, firsts: 4, seconds: 5, thirds: 2, fourths: 3, points: 147.6, bestScore: 59100 },
    { playerId: "taii", teamSlug: "abemas", games: 14, firsts: 5, seconds: 2, thirds: 4, fourths: 3, points: 127.4, bestScore: 81600 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 12, firsts: 6, seconds: 0, thirds: 2, fourths: 4, points: 100.5, bestScore: 47200 },
    { playerId: "daigo", teamSlug: "phoenix", games: 13, firsts: 3, seconds: 6, thirds: 2, fourths: 2, points: 99.5, bestScore: 53500 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 16, firsts: 3, seconds: 9, thirds: 2, fourths: 2, points: 91.1, bestScore: 58200 },
    { playerId: "takamiya", teamSlug: "konami", games: 11, firsts: 3, seconds: 3, thirds: 4, fourths: 1, points: 88.5, bestScore: 40100 },
    { playerId: "tojo", teamSlug: "beast-x", games: 13, firsts: 3, seconds: 3, thirds: 4, fourths: 3, points: 51.3, bestScore: 82700 },
    { playerId: "takizawa", teamSlug: "konami", games: 12, firsts: 4, seconds: 3, thirds: 1, fourths: 4, points: 51.3, bestScore: 59500 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 16, firsts: 5, seconds: 4, thirds: 3, fourths: 4, points: 50.3, bestScore: 48700 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 14, firsts: 3, seconds: 6, thirds: 3, fourths: 2, points: 35.3, bestScore: 45300 },
    { playerId: "nakata", teamSlug: "beast-x", games: 10, firsts: 3, seconds: 2, thirds: 2, fourths: 3, points: 32.7, bestScore: 69300 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 9, firsts: 3, seconds: 1, thirds: 2, fourths: 3, points: 26.1, bestScore: 52500 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 12, firsts: 2, seconds: 6, thirds: 1, fourths: 3, points: 14.2, bestScore: 54200 },
    { playerId: "asami", teamSlug: "drivens", games: 10, firsts: 3, seconds: 2, thirds: 3, fourths: 2, points: 3.4, bestScore: 44700 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 13, firsts: 3, seconds: 2, thirds: 5, fourths: 3, points: -20.9, bestScore: 62300 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 13, firsts: 2, seconds: 4, thirds: 4, fourths: 3, points: -29.8, bestScore: 64700 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 10, firsts: 2, seconds: 2, thirds: 5, fourths: 1, points: -33.8, bestScore: 41900 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 11, firsts: 2, seconds: 3, thirds: 5, fourths: 1, points: -63.9, bestScore: 38000 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 13, firsts: 2, seconds: 5, thirds: 2, fourths: 4, points: -71.6, bestScore: 46300 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 13, firsts: 2, seconds: 4, thirds: 4, fourths: 3, points: -73.7, bestScore: 62700 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 12, firsts: 2, seconds: 4, thirds: 2, fourths: 4, points: -78.4, bestScore: 49700 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 14, firsts: 3, seconds: 4, thirds: 2, fourths: 5, points: -80.3, bestScore: 51100 },
    { playerId: "date", teamSlug: "konami", games: 12, firsts: 2, seconds: 5, thirds: 0, fourths: 5, points: -85.6, bestScore: 46200 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 12, firsts: 2, seconds: 4, thirds: 3, fourths: 3, points: -90.7, bestScore: 54000 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 11, firsts: 2, seconds: 2, thirds: 4, fourths: 3, points: -94.2, bestScore: 42500 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 10, firsts: 0, seconds: 4, thirds: 5, fourths: 1, points: -99.9, bestScore: 37400 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 16, firsts: 1, seconds: 6, thirds: 6, fourths: 3, points: -116.6, bestScore: 53500 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 15, firsts: 3, seconds: 4, thirds: 3, fourths: 5, points: -121.3, bestScore: 42100 },
    { playerId: "sonoda", teamSlug: "drivens", games: 13, firsts: 2, seconds: 1, thirds: 6, fourths: 4, points: -152.0, bestScore: 66700 },
    { playerId: "shiratori", teamSlug: "abemas", games: 9, firsts: 1, seconds: 2, thirds: 3, fourths: 3, points: -158.5, bestScore: 39300 },
    { playerId: "miura", teamSlug: "earth-jets", games: 7, firsts: 0, seconds: 2, thirds: 2, fourths: 3, points: -195.9, bestScore: 31200 },
    { playerId: "hinata", teamSlug: "abemas", games: 9, firsts: 1, seconds: 0, thirds: 5, fourths: 3, points: -213.3, bestScore: 43600 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 13, firsts: 1, seconds: 3, thirds: 5, fourths: 4, points: -228.8, bestScore: 34500 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 11, firsts: 0, seconds: 0, thirds: 2, fourths: 9, points: -549.5, bestScore: 26400 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "akutsu", winnerTeamSlug: "sakura-knights", points: 65.8 },
    { game: 2, winnerId: "sano_hinako", winnerTeamSlug: "phoenix", points: 71.7 },
    { game: 3, winnerId: "sasaki", winnerTeamSlug: "konami", points: 65.3 },
    { game: 4, winnerId: "takamiya", winnerTeamSlug: "konami", points: 56.9 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
