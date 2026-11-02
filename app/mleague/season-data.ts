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

const COMPLETED_THROUGH = "2026-11-02";

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
  gamesPlayed: 108,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は11月2日終了時点で108試合を消化。HIRO柴田、東城りお、本田朋広、多井隆晴が同日のトップを獲得し、KADOKAWAサクラナイツが337.3ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 337.3, gamesPlayed: 44, gamesTotal: 120, firsts: 16, bestScore: 62700 },
    { rank: 2, teamSlug: "konami", points: 212.2, gamesPlayed: 42, gamesTotal: 120, firsts: 13, bestScore: 62200 },
    { rank: 3, teamSlug: "beast-x", points: 119.2, gamesPlayed: 44, gamesTotal: 120, firsts: 11, bestScore: 82700 },
    { rank: 4, teamSlug: "raiden", points: 47.1, gamesPlayed: 44, gamesTotal: 120, firsts: 14, bestScore: 81900 },
    { rank: 5, teamSlug: "pirates", points: -7.0, gamesPlayed: 44, gamesTotal: 120, firsts: 8, bestScore: 54200 },
    { rank: 6, teamSlug: "drivens", points: -9.1, gamesPlayed: 42, gamesTotal: 120, firsts: 12, bestScore: 66700 },
    { rank: 7, teamSlug: "phoenix", points: -37.8, gamesPlayed: 42, gamesTotal: 120, firsts: 7, bestScore: 53500 },
    { rank: 8, teamSlug: "abemas", points: -145.9, gamesPlayed: 44, gamesTotal: 120, firsts: 10, bestScore: 81600 },
    { rank: 9, teamSlug: "earth-jets", points: -210.3, gamesPlayed: 44, gamesTotal: 120, firsts: 10, bestScore: 61800 },
    { rank: 10, teamSlug: "furinkazan", points: -305.7, gamesPlayed: 42, gamesTotal: 120, firsts: 7, bestScore: 46300 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 10, firsts: 6, seconds: 1, thirds: 3, fourths: 0, points: 379.0, bestScore: 81900 },
    { playerId: "honda", teamSlug: "raiden", games: 14, firsts: 6, seconds: 2, thirds: 6, fourths: 0, points: 254.9, bestScore: 49500 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 9, firsts: 6, seconds: 1, thirds: 0, fourths: 2, points: 241.2, bestScore: 50400 },
    { playerId: "watanabe", teamSlug: "drivens", games: 12, firsts: 6, seconds: 2, thirds: 1, fourths: 3, points: 220.4, bestScore: 47700 },
    { playerId: "sasaki", teamSlug: "konami", games: 12, firsts: 6, seconds: 1, thirds: 1, fourths: 4, points: 207.7, bestScore: 62200 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 13, firsts: 6, seconds: 2, thirds: 3, fourths: 2, points: 203.6, bestScore: 61800 },
    { playerId: "taii", teamSlug: "abemas", games: 12, firsts: 5, seconds: 1, thirds: 3, fourths: 3, points: 139.4, bestScore: 81600 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 13, firsts: 4, seconds: 4, thirds: 2, fourths: 3, points: 138.5, bestScore: 59100 },
    { playerId: "daigo", teamSlug: "phoenix", games: 11, firsts: 3, seconds: 5, thirds: 2, fourths: 1, points: 137.5, bestScore: 53500 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 12, firsts: 4, seconds: 4, thirds: 2, fourths: 2, points: 127.7, bestScore: 48700 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 11, firsts: 3, seconds: 4, thirds: 2, fourths: 2, points: 87.2, bestScore: 51100 },
    { playerId: "takamiya", teamSlug: "konami", games: 8, firsts: 2, seconds: 3, thirds: 2, fourths: 1, points: 69.0, bestScore: 40100 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 15, firsts: 3, seconds: 8, thirds: 2, fourths: 2, points: 69.4, bestScore: 58200 },
    { playerId: "tojo", teamSlug: "beast-x", games: 12, firsts: 3, seconds: 2, thirds: 4, fourths: 3, points: 44.0, bestScore: 82700 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 11, firsts: 3, seconds: 4, thirds: 2, fourths: 2, points: 42.9, bestScore: 45300 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 11, firsts: 5, seconds: 0, thirds: 2, fourths: 4, points: 33.3, bestScore: 40900 },
    { playerId: "nakata", teamSlug: "beast-x", games: 10, firsts: 3, seconds: 2, thirds: 2, fourths: 3, points: 32.7, bestScore: 69300 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 12, firsts: 2, seconds: 6, thirds: 1, fourths: 3, points: 14.2, bestScore: 54200 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 7, firsts: 2, seconds: 1, thirds: 2, fourths: 2, points: 5.6, bestScore: 52500 },
    { playerId: "takizawa", teamSlug: "konami", games: 11, firsts: 3, seconds: 3, thirds: 1, fourths: 4, points: -22.0, bestScore: 59500 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 12, firsts: 2, seconds: 5, thirds: 2, fourths: 3, points: -24.5, bestScore: 46300 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 11, firsts: 2, seconds: 4, thirds: 2, fourths: 3, points: -29.0, bestScore: 49700 },
    { playerId: "date", teamSlug: "konami", games: 11, firsts: 2, seconds: 5, thirds: 0, fourths: 4, points: -42.5, bestScore: 46200 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 11, firsts: 2, seconds: 2, thirds: 4, fourths: 3, points: -44.7, bestScore: 64700 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 11, firsts: 2, seconds: 2, thirds: 4, fourths: 3, points: -54.9, bestScore: 62300 },
    { playerId: "asami", teamSlug: "drivens", games: 8, firsts: 2, seconds: 1, thirds: 3, fourths: 2, points: -60.2, bestScore: 44700 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 11, firsts: 2, seconds: 3, thirds: 5, fourths: 1, points: -63.9, bestScore: 38000 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 11, firsts: 2, seconds: 4, thirds: 2, fourths: 3, points: -65.8, bestScore: 54000 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 11, firsts: 1, seconds: 4, thirds: 4, fourths: 2, points: -75.7, bestScore: 62700 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 9, firsts: 0, seconds: 4, thirds: 4, fourths: 1, points: -83.1, bestScore: 37400 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 11, firsts: 2, seconds: 2, thirds: 4, fourths: 3, points: -94.2, bestScore: 42500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 8, firsts: 1, seconds: 1, thirds: 5, fourths: 1, points: -105.7, bestScore: 41900 },
    { playerId: "sonoda", teamSlug: "drivens", games: 11, firsts: 2, seconds: 1, thirds: 4, fourths: 4, points: -114.4, bestScore: 66700 },
    { playerId: "shiratori", teamSlug: "abemas", games: 8, firsts: 1, seconds: 2, thirds: 2, fourths: 3, points: -141.4, bestScore: 39300 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 13, firsts: 2, seconds: 4, thirds: 2, fourths: 5, points: -154.1, bestScore: 42100 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 13, firsts: 0, seconds: 5, thirds: 6, fourths: 2, points: -151.9, bestScore: 53500 },
    { playerId: "miura", teamSlug: "earth-jets", games: 7, firsts: 0, seconds: 2, thirds: 2, fourths: 3, points: -195.9, bestScore: 31200 },
    { playerId: "hinata", teamSlug: "abemas", games: 9, firsts: 1, seconds: 0, thirds: 5, fourths: 3, points: -213.3, bestScore: 43600 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 11, firsts: 1, seconds: 2, thirds: 4, fourths: 4, points: -218.4, bestScore: 34500 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 9, firsts: 0, seconds: 0, thirds: 1, fourths: 8, points: -492.6, bestScore: 14900 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "hiro-shibata", winnerTeamSlug: "earth-jets", points: 81.8 },
    { game: 2, winnerId: "tojo", winnerTeamSlug: "beast-x", points: 67.5 },
    { game: 3, winnerId: "honda", winnerTeamSlug: "raiden", points: 53.9 },
    { game: 4, winnerId: "taii", winnerTeamSlug: "abemas", points: 64.2 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
