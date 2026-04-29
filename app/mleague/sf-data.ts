// app/mleague/sf-data.ts
// Mリーグ 2025-26 セミファイナルシリーズの実データ
// 出典: Wikipedia / キンマweb (2026-04-27 更新)

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
  gamesPlayed: 24,
  finalLine: 4,
  asOf: "2026-04-27",
  standings: [
    {
      teamSlug: "furinkazan",
      carryover: 348.7,
      sfPoints: 87.6,
      total: 436.3,
      gamesPlayed: 16,
      gamesTotal: 20,
    },
    {
      teamSlug: "beast-x",
      carryover: 344.9,
      sfPoints: 77.7,
      total: 422.6,
      gamesPlayed: 18,
      gamesTotal: 20,
    },
    {
      teamSlug: "raiden",
      carryover: -106.8,
      sfPoints: 306.3,
      total: 199.5,
      gamesPlayed: 18,
      gamesTotal: 20,
    },
    {
      teamSlug: "phoenix",
      carryover: 62.1,
      sfPoints: 32.3,
      total: 94.4,
      gamesPlayed: 18,
      gamesTotal: 20,
    },
    {
      teamSlug: "konami",
      carryover: 345.7,
      sfPoints: -303.5,
      total: 42.2,
      gamesPlayed: 16,
      gamesTotal: 20,
    },
    {
      teamSlug: "drivens",
      carryover: 123.3,
      sfPoints: -200.4,
      total: -77.1,
      gamesPlayed: 18,
      gamesTotal: 20,
    },
  ],
  upcoming: [
    {
      date: "2026-04-28",
      startTimeJst: "19:00",
      teamSlugs: ["furinkazan", "konami", "phoenix", "raiden"],
      status: "upcoming",
    },
    {
      date: "2026-04-30",
      startTimeJst: "19:00",
      teamSlugs: [],
      status: "upcoming",
    },
  ],
};
