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

const COMPLETED_THROUGH = "2026-11-27";

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
  gamesPlayed: 168,
  totalGames: 300,
  summary:
    "大和証券Mリーグ2026-27は11月27日終了時点で168試合を消化。朝倉康心、三浦智博、尻無濱航、堀慎吾が同日のトップを獲得し、KADOKAWAサクラナイツが583.2ptで暫定首位に立った。",
  standings: [
    { rank: 1, teamSlug: "sakura-knights", points: 583.2, gamesPlayed: 68, gamesTotal: 120, firsts: 26, bestScore: 65200 },
    { rank: 2, teamSlug: "phoenix", points: 296.4, gamesPlayed: 66, gamesTotal: 120, firsts: 16, bestScore: 86700 },
    { rank: 3, teamSlug: "drivens", points: 263.5, gamesPlayed: 66, gamesTotal: 120, firsts: 21, bestScore: 66700 },
    { rank: 4, teamSlug: "raiden", points: 116.5, gamesPlayed: 66, gamesTotal: 120, firsts: 19, bestScore: 81900 },
    { rank: 5, teamSlug: "konami", points: 58.5, gamesPlayed: 68, gamesTotal: 120, firsts: 21, bestScore: 62200 },
    { rank: 6, teamSlug: "earth-jets", points: -60.8, gamesPlayed: 68, gamesTotal: 120, firsts: 16, bestScore: 80700 },
    { rank: 7, teamSlug: "beast-x", points: -263.2, gamesPlayed: 68, gamesTotal: 120, firsts: 15, bestScore: 86000 },
    { rank: 8, teamSlug: "pirates", points: -270.0, gamesPlayed: 68, gamesTotal: 120, firsts: 11, bestScore: 54200 },
    { rank: 9, teamSlug: "furinkazan", points: -307.8, gamesPlayed: 66, gamesTotal: 120, firsts: 12, bestScore: 74700 },
    { rank: 10, teamSlug: "abemas", points: -416.3, gamesPlayed: 68, gamesTotal: 120, firsts: 12, bestScore: 81600 },
  ] satisfies RegularSeasonStanding[],
  playerStats: [
    { playerId: "setokuma", teamSlug: "raiden", games: 17, firsts: 8, seconds: 3, thirds: 6, fourths: 0, points: 430.4, bestScore: 81900 },
    { playerId: "honda", teamSlug: "raiden", games: 19, firsts: 9, seconds: 3, thirds: 6, fourths: 1, points: 440.9, bestScore: 62300 },
    { playerId: "okada", teamSlug: "sakura-knights", games: 15, firsts: 9, seconds: 1, thirds: 0, fourths: 5, points: 291.2, bestScore: 62800 },
    { playerId: "shirinashihama_wataru", teamSlug: "sakura-knights", games: 18, firsts: 6, seconds: 5, thirds: 3, fourths: 4, points: 225.2, bestScore: 59100 },
    { playerId: "hiro-shibata", teamSlug: "earth-jets", games: 21, firsts: 8, seconds: 5, thirds: 6, fourths: 2, points: 299.8, bestScore: 61800 },
    { playerId: "hori", teamSlug: "sakura-knights", games: 18, firsts: 9, seconds: 1, thirds: 2, fourths: 6, points: 241.8, bestScore: 65200 },
    { playerId: "watanabe", teamSlug: "drivens", games: 19, firsts: 8, seconds: 4, thirds: 2, fourths: 5, points: 210.3, bestScore: 47700 },
    { playerId: "daigo", teamSlug: "phoenix", games: 18, firsts: 6, seconds: 6, thirds: 4, fourths: 2, points: 286.3, bestScore: 86700 },
    { playerId: "sasaki", teamSlug: "konami", games: 22, firsts: 8, seconds: 2, thirds: 5, fourths: 7, points: 48.4, bestScore: 62200 },
    { playerId: "takizawa", teamSlug: "konami", games: 18, firsts: 6, seconds: 3, thirds: 2, fourths: 7, points: -62.0, bestScore: 59500 },
    { playerId: "tojo", teamSlug: "beast-x", games: 18, firsts: 4, seconds: 4, thirds: 6, fourths: 4, points: 43.1, bestScore: 86000 },
    { playerId: "sano_hinako", teamSlug: "phoenix", games: 12, firsts: 5, seconds: 2, thirds: 2, fourths: 3, points: 157.1, bestScore: 52500 },
    { playerId: "matsumoto", teamSlug: "abemas", games: 21, firsts: 3, seconds: 11, thirds: 3, fourths: 4, points: 11.8, bestScore: 58200 },
    { playerId: "takamiya", teamSlug: "konami", games: 13, firsts: 3, seconds: 4, thirds: 5, fourths: 1, points: 84.5, bestScore: 40100 },
    { playerId: "taii", teamSlug: "abemas", games: 19, firsts: 5, seconds: 2, thirds: 7, fourths: 5, points: -25.5, bestScore: 81600 },
    { playerId: "nakabayashi", teamSlug: "pirates", games: 18, firsts: 5, seconds: 6, thirds: 3, fourths: 4, points: 64.3, bestScore: 48700 },
    { playerId: "asami", teamSlug: "drivens", games: 13, firsts: 4, seconds: 3, thirds: 3, fourths: 3, points: 35.0, bestScore: 50800 },
    { playerId: "suzuki-t", teamSlug: "drivens", games: 16, firsts: 5, seconds: 2, thirds: 6, fourths: 3, points: 114.0, bestScore: 66500 },
    { playerId: "nikaido-a", teamSlug: "furinkazan", games: 15, firsts: 3, seconds: 3, thirds: 7, fourths: 2, points: -55.9, bestScore: 74700 },
    { playerId: "katsumata", teamSlug: "furinkazan", games: 18, firsts: 5, seconds: 7, thirds: 4, fourths: 2, points: 160.3, bestScore: 70300 },
    { playerId: "kayamori", teamSlug: "phoenix", games: 16, firsts: 4, seconds: 4, thirds: 4, fourths: 4, points: 6.7, bestScore: 51100 },
    { playerId: "suzuki-d", teamSlug: "beast-x", games: 17, firsts: 4, seconds: 5, thirds: 5, fourths: 3, points: 94.3, bestScore: 64700 },
    { playerId: "suzuki-y", teamSlug: "pirates", games: 18, firsts: 2, seconds: 11, thirds: 1, fourths: 4, points: -9.7, bestScore: 54200 },
    { playerId: "shiratori", teamSlug: "abemas", games: 15, firsts: 2, seconds: 5, thirds: 3, fourths: 5, points: -181.9, bestScore: 39300 },
    { playerId: "aikawa", teamSlug: "earth-jets", games: 16, firsts: 2, seconds: 5, thirds: 8, fourths: 1, points: -98.3, bestScore: 38000 },
    { playerId: "nakata", teamSlug: "beast-x", games: 15, firsts: 4, seconds: 2, thirds: 2, fourths: 7, points: -133.9, bestScore: 69300 },
    { playerId: "date", teamSlug: "konami", games: 15, firsts: 4, seconds: 5, thirds: 0, fourths: 6, points: -12.4, bestScore: 56600 },
    { playerId: "asakura_koshin", teamSlug: "pirates", games: 18, firsts: 4, seconds: 4, thirds: 5, fourths: 5, points: -164.7, bestScore: 54000 },
    { playerId: "miura", teamSlug: "earth-jets", games: 13, firsts: 3, seconds: 4, thirds: 3, fourths: 3, points: -3.7, bestScore: 80700 },
    { playerId: "takeuchi", teamSlug: "phoenix", games: 20, firsts: 1, seconds: 8, thirds: 8, fourths: 3, points: -153.7, bestScore: 53500 },
    { playerId: "akutsu", teamSlug: "sakura-knights", games: 17, firsts: 2, seconds: 6, thirds: 4, fourths: 5, points: -175.0, bestScore: 62700 },
    { playerId: "uchikawa", teamSlug: "furinkazan", games: 16, firsts: 2, seconds: 6, thirds: 3, fourths: 5, points: -152.5, bestScore: 46300 },
    { playerId: "nagai", teamSlug: "furinkazan", games: 17, firsts: 2, seconds: 4, thirds: 5, fourths: 6, points: -259.7, bestScore: 54600 },
    { playerId: "mizuhara", teamSlug: "pirates", games: 14, firsts: 0, seconds: 6, thirds: 6, fourths: 2, points: -159.9, bestScore: 37400 },
    { playerId: "kurosawa", teamSlug: "raiden", games: 15, firsts: 2, seconds: 3, thirds: 6, fourths: 4, points: -208.1, bestScore: 42500 },
    { playerId: "shimoishi", teamSlug: "beast-x", games: 18, firsts: 3, seconds: 4, thirds: 3, fourths: 8, points: -266.7, bestScore: 51100 },
    { playerId: "sonoda", teamSlug: "drivens", games: 18, firsts: 4, seconds: 2, thirds: 7, fourths: 5, points: -95.8, bestScore: 66700 },
    { playerId: "ishii", teamSlug: "earth-jets", games: 18, firsts: 3, seconds: 4, thirds: 4, fourths: 7, points: -258.6, bestScore: 42100 },
    { playerId: "hinata", teamSlug: "abemas", games: 13, firsts: 2, seconds: 0, thirds: 7, fourths: 4, points: -220.7, bestScore: 66800 },
    { playerId: "hagiwara", teamSlug: "raiden", games: 15, firsts: 0, seconds: 3, thirds: 2, fourths: 10, points: -546.7, bestScore: 31400 },
  ] satisfies RegularSeasonPlayerStats[],
  openingResults: [
    { game: 1, winnerId: "aikawa", winnerTeamSlug: "earth-jets", points: 58.0 },
    { game: 2, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.7 },
  ] satisfies RegularSeasonMatchResult[],
  latestResults: [
    { game: 1, winnerId: "asakura_koshin", winnerTeamSlug: "pirates", points: 54.8 },
    { game: 2, winnerId: "miura", winnerTeamSlug: "earth-jets", points: 100.7 },
    { game: 3, winnerId: "shirinashihama_wataru", winnerTeamSlug: "sakura-knights", points: 67.8 },
    { game: 4, winnerId: "hori", winnerTeamSlug: "sakura-knights", points: 85.2 },
  ] satisfies RegularSeasonMatchResult[],
  upcomingMatches,
} as const;

export function getRegularPlayerStats(playerId: string): RegularSeasonPlayerStats | undefined {
  return REGULAR_2026_27.playerStats.find((stats) => stats.playerId === playerId);
}
