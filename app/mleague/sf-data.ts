// app/mleague/sf-data.ts
// Mリーグ 2025-26 セミファイナルシリーズの実データ
// 出典: Mリーグ公式日程 / M.LEAGUE応援まとめサイト (2026-04-30 更新)

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
  asOf: "2026-04-30",
  standings: [
    {
      teamSlug: "beast-x",
      carryover: 344.9,
      sfPoints: 61.0,
      total: 405.9,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "furinkazan",
      carryover: 348.7,
      sfPoints: -7.1,
      total: 341.6,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "raiden",
      carryover: -106.8,
      sfPoints: 317.2,
      total: 210.4,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "konami",
      carryover: 345.7,
      sfPoints: -250.6,
      total: 95.1,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "phoenix",
      carryover: 62.1,
      sfPoints: 23.0,
      total: 85.1,
      gamesPlayed: 20,
      gamesTotal: 20,
    },
    {
      teamSlug: "drivens",
      carryover: 123.3,
      sfPoints: -143.5,
      total: -20.2,
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
  gamesPlayed: 0,
  finalLine: 1,
  standings: [
    {
      teamSlug: "beast-x",
      carryover: 203.0,
      finalPoints: 0,
      total: 203.0,
      gamesPlayed: 0,
      gamesTotal: 16,
    },
    {
      teamSlug: "furinkazan",
      carryover: 170.8,
      finalPoints: 0,
      total: 170.8,
      gamesPlayed: 0,
      gamesTotal: 16,
    },
    {
      teamSlug: "raiden",
      carryover: 105.2,
      finalPoints: 0,
      total: 105.2,
      gamesPlayed: 0,
      gamesTotal: 16,
    },
    {
      teamSlug: "konami",
      carryover: 47.6,
      finalPoints: 0,
      total: 47.6,
      gamesPlayed: 0,
      gamesTotal: 16,
    },
  ],
  upcoming: [
    {
      date: "2026-05-04",
      startTimeJst: "19:00",
      teamSlugs: ["beast-x", "furinkazan", "raiden", "konami"],
      status: "upcoming",
    },
  ],
};
