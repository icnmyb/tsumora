// app/mleague/sf-data.ts
// Mリーグ 2025-26 セミファイナルシリーズの実データ
// 出典:
// - セミファイナル結果/ファイナル進出チーム（公式発表）: https://m-league.jp/news202605011200/
// - ファイナル日程（公式日程）: https://m-league.jp/games/
// - ファイナル進行中の順位（公式TOP）: https://m-league.jp/
// - セミファイナル最終pt/持越（公式データ集計）: https://m-league.aja0.com/chart/2025/semifinal_team_scores.html
// (2026-05-11 更新)

export interface SFTeamStanding {
  teamSlug: string;
  carryover: number; // 持越 (レギュラーポイントの 1/2)
  sfPoints: number; // セミファイナル獲得pt
  total: number; // carryover + sfPoints
  gamesPlayed: number;
  gamesTotal: number;
}

export interface SFMatch {
  date: string; // YYYY-MM-DD
  startTimeJst: string; // "19:00"
  teamSlugs: string[]; // 通常 4 チーム
  status: "done" | "upcoming";
}

export interface SemifinalState {
  season: string;
  startDate: string;
  endDate: string;
  totalGames: number;
  gamesPlayed: number;
  finalLine: number; // 上位 N チームがファイナル進出
  standings: SFTeamStanding[]; // 順位順
  upcoming: SFMatch[]; // 残り試合 (近い順)
  asOf: string; // データ更新日
}

export interface FinalState {
  season: string;
  startDate: string;
  endDate: string;
  totalGames: number;
  gamesPlayed: number;
  finalLine: number;
  standings: FinalTeamStanding[];
  upcoming: SFMatch[];
}

export interface FinalTeamStanding {
  teamSlug: string;
  carryover: number; // セミファイナル最終ptの1/2
  finalPoints: number;
  total: number;
  gamesPlayed: number;
  gamesTotal: number;
}

// レギュラーシーズン (2025-09-15 〜 2026-03-27) 終了時の最終順位
// 出典: Wikipedia
export interface RegularFinalEntry {
  rank: number;
  teamSlug: string;
  points: number;
  advanced: boolean; // 上位6チームが SF 進出
}

export const REGULAR_FINAL_2025_26: {
  season: string;
  endDate: string;
  standings: RegularFinalEntry[];
} = {
  season: "2025-26",
  endDate: "2026-03-27",
  standings: [
    { rank: 1, teamSlug: "furinkazan", points: 697.3, advanced: true },
    { rank: 2, teamSlug: "konami", points: 691.4, advanced: true },
    { rank: 3, teamSlug: "beast-x", points: 689.7, advanced: true },
    { rank: 4, teamSlug: "drivens", points: 246.6, advanced: true },
    { rank: 5, teamSlug: "phoenix", points: 124.2, advanced: true },
    { rank: 6, teamSlug: "raiden", points: -213.7, advanced: true },
    { rank: 7, teamSlug: "abemas", points: -245.9, advanced: false },
    { rank: 8, teamSlug: "pirates", points: -622.4, advanced: false },
    { rank: 9, teamSlug: "sakura-knights", points: -626.7, advanced: false },
    { rank: 10, teamSlug: "earth-jets", points: -740.5, advanced: false },
  ],
};

export const SEMIFINAL_2025_26: SemifinalState = {
  season: "2025-26",
  startDate: "2026-04-06",
  endDate: "2026-04-30",
  totalGames: 30,
  gamesPlayed: 30,
  finalLine: 4,
  asOf: "2026-05-01",
  standings: [
    {
      teamSlug: "furinkazan",
      carryover: 348.7,
      sfPoints: 97.9,
      total: 446.6,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "beast-x",
      carryover: 344.9,
      sfPoints: 31.8,
      total: 376.7,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "konami",
      carryover: 345.7,
      sfPoints: -105.0,
      total: 240.7,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "raiden",
      carryover: -106.8,
      sfPoints: 259.2,
      total: 152.4,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "phoenix",
      carryover: 62.1,
      sfPoints: -40.8,
      total: 21.3,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "drivens",
      carryover: 123.3,
      sfPoints: -243.1,
      total: -119.8,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
  ],
  upcoming: [],
};

export const FINAL_2025_26: FinalState = {
  season: "2025-26",
  startDate: "2026-05-04",
  endDate: "2026-05-15",
  totalGames: 16,
  gamesPlayed: 10,
  finalLine: 1,
  standings: [
    {
      teamSlug: "beast-x",
      carryover: 188.4,
      finalPoints: 59.3,
      total: 247.7,
      gamesPlayed: 10,
      gamesTotal: 16,
    },
    {
      teamSlug: "konami",
      carryover: 120.4,
      finalPoints: 123.8,
      total: 244.2,
      gamesPlayed: 10,
      gamesTotal: 16,
    },
    {
      teamSlug: "furinkazan",
      carryover: 223.3,
      finalPoints: -92.6,
      total: 130.7,
      gamesPlayed: 10,
      gamesTotal: 16,
    },
    {
      teamSlug: "raiden",
      carryover: 76.2,
      finalPoints: -90.5,
      total: -14.3,
      gamesPlayed: 10,
      gamesTotal: 16,
    },
  ],
  upcoming: [
    {
      date: "2026-05-12",
      startTimeJst: "19:00",
      teamSlugs: ["furinkazan", "beast-x", "konami", "raiden"],
      status: "upcoming",
    },
    {
      date: "2026-05-14",
      startTimeJst: "19:00",
      teamSlugs: ["furinkazan", "beast-x", "konami", "raiden"],
      status: "upcoming",
    },
    {
      date: "2026-05-15",
      startTimeJst: "17:00",
      teamSlugs: ["furinkazan", "beast-x", "konami", "raiden"],
      status: "upcoming",
    },
  ],
};
