// Mリーグ2026-27 レギュラーシーズンの確定済みデータ。
// 出典: https://m-league.jp/ および https://m-league.jp/games/

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

export const REGULAR_2026_27 = {
  season: "2026-27",
  startDate: "2026-09-14",
  asOf: "2026-09-15",
  gamesPlayed: 4,
  totalGames: 300,
  standings: [
    { rank: 1, teamSlug: "phoenix", points: 82.9, gamesPlayed: 2, gamesTotal: 120, firsts: 1, bestScore: 49700 },
    { rank: 2, teamSlug: "pirates", points: 58.5, gamesPlayed: 2, gamesTotal: 120, firsts: 1, bestScore: 34700 },
    { rank: 3, teamSlug: "earth-jets", points: 9.9, gamesPlayed: 2, gamesTotal: 120, firsts: 1, bestScore: 38000 },
    { rank: 4, teamSlug: "furinkazan", points: 3.4, gamesPlayed: 2, gamesTotal: 120, firsts: 0, bestScore: 46300 },
    { rank: 5, teamSlug: "raiden", points: 0, gamesPlayed: 0, gamesTotal: 120, firsts: 0 },
    { rank: 5, teamSlug: "beast-x", points: 0, gamesPlayed: 0, gamesTotal: 120, firsts: 0 },
    { rank: 7, teamSlug: "abemas", points: -12.1, gamesPlayed: 2, gamesTotal: 120, firsts: 0, bestScore: 27400 },
    { rank: 8, teamSlug: "sakura-knights", points: -16.9, gamesPlayed: 2, gamesTotal: 120, firsts: 1, bestScore: 44900 },
    { rank: 9, teamSlug: "konami", points: -56.3, gamesPlayed: 2, gamesTotal: 120, firsts: 0, bestScore: 26000 },
    { rank: 10, teamSlug: "drivens", points: -69.4, gamesPlayed: 2, gamesTotal: 120, firsts: 0, bestScore: 25800 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "kayamori", teamSlug: "phoenix", games: 1, firsts: 1, seconds: 0, thirds: 0, fourths: 0, points: 69.7, bestScore: 49700 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 1, firsts: 1, seconds: 0, thirds: 0, fourths: 0, points: 64.9, bestScore: 44900 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 1, firsts: 1, seconds: 0, thirds: 0, fourths: 0, points: 58.0, bestScore: 38000 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 1, firsts: 1, seconds: 0, thirds: 0, fourths: 0, points: 54.7, bestScore: 34700 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 1, firsts: 0, seconds: 1, thirds: 0, fourths: 0, points: 26.3, bestScore: 46300 },
    { playerId: "daigo", teamSlug: "phoenix", games: 1, firsts: 0, seconds: 1, thirds: 0, fourths: 0, points: 13.2, bestScore: 33200 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 1, firsts: 0, seconds: 1, thirds: 0, fourths: 0, points: 7.4, bestScore: 27400 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 1, firsts: 0, seconds: 1, thirds: 0, fourths: 0, points: 3.8, bestScore: 23800 },
    { playerId: "sasaki", teamSlug: "konami", games: 1, firsts: 0, seconds: 0, thirds: 1, fourths: 0, points: -14.0, bestScore: 26000 },
    { playerId: "asami", teamSlug: "drivens", games: 1, firsts: 0, seconds: 0, thirds: 1, fourths: 0, points: -14.2, bestScore: 25800 },
    { playerId: "hinata", teamSlug: "abemas", games: 1, firsts: 0, seconds: 0, thirds: 1, fourths: 0, points: -19.5, bestScore: 20500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 1, firsts: 0, seconds: 0, thirds: 1, fourths: 0, points: -22.9, bestScore: 17100 },
    { playerId: "takizawa", teamSlug: "konami", games: 1, firsts: 0, seconds: 0, thirds: 0, fourths: 1, points: -42.3, bestScore: 17700 },
    { playerId: "miura", teamSlug: "earth-jets", games: 1, firsts: 0, seconds: 0, thirds: 0, fourths: 1, points: -48.1, bestScore: 11900 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 1, firsts: 0, seconds: 0, thirds: 0, fourths: 1, points: -55.2, bestScore: 4800 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 1, firsts: 0, seconds: 0, thirds: 0, fourths: 1, points: -81.8, bestScore: -21800 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches: [
    {
      date: "2026-09-17",
      startTimeJst: "19:00",
      teamSlugs: ["earth-jets", "drivens", "raiden", "beast-x"],
    },
    {
      date: "2026-09-18",
      startTimeJst: "19:00",
      teamSlugs: ["sakura-knights", "konami", "raiden", "pirates"],
    },
  ] satisfies RegularSeasonMatch[],
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
