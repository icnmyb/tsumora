import { FINAL_2025_26 } from "@/app/mleague/sf-data";
import {
  MLEAGUE_REGULAR_2026_27_TABLES,
  MLEAGUE_TEAM_NAMES,
  type MLeagueTeamId,
} from "./mleague-2026-27";

export type ScheduledEvent = {
  date: string; // YYYY-MM-DD (JST)
  startTime: string; // "19:00"
  endTime: string; // "21:00"
  timeLabel?: string; // 表示用。終了時刻未掲載の配信は「12:00開始」などを出す
  org: "M-LEAGUE" | "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU";
  title: string;
  sub: string;
  channel: string;
  tagColor: string;
  tagTextColor?: string;
  link?: string;
};

export const URL_ABEMA_MAHJONG = "https://abema.tv/now-on-air/mahjong";

const MLEAGUE_REGULAR_TABLES_BY_DATE = new Map<
  string,
  MLeagueTeamId[][]
>();

for (const [date, ...teams] of MLEAGUE_REGULAR_2026_27_TABLES) {
  const tables = MLEAGUE_REGULAR_TABLES_BY_DATE.get(date) ?? [];
  tables.push(teams);
  MLEAGUE_REGULAR_TABLES_BY_DATE.set(date, tables);
}

export const MLEAGUE_REGULAR_EVENTS: ScheduledEvent[] = Array.from(
  MLEAGUE_REGULAR_TABLES_BY_DATE,
  ([date, tables]) => {
    const matchups = tables.map((teams, index) => {
      const teamNames = teams.map((teamId) => MLEAGUE_TEAM_NAMES[teamId]);
      const tableLabel = tables.length > 1 ? `第${index + 1}卓: ` : "";
      return `${tableLabel}${teamNames.join(" vs ")}`;
    });

    return {
      date,
      startTime: "19:00",
      endTime: "23:00",
      timeLabel: "19:00開始",
      org: "M-LEAGUE",
      title: "Mリーグ 2026-27 レギュラーシーズン",
      sub: `${matchups.join(" / ")} · ${tables.length * 2}試合`,
      channel: tables.length > 1 ? "ABEMA · 2卓同時" : "ABEMA",
      tagColor: "#d4b94e",
      link: URL_ABEMA_MAHJONG,
    };
  },
);

export const MLEAGUE_FINAL_MATCHES = FINAL_2025_26.upcoming;

const FINAL_TEAMS =
  "EX風林火山 / BEAST X / KONAMI麻雀格闘倶楽部 / TEAM RAIDEN/雷電";

export const MLEAGUE_FINAL_EVENTS: ScheduledEvent[] = MLEAGUE_FINAL_MATCHES.map(
  (match, idx) => {
    const finalDay = match.date === FINAL_2025_26.endDate;
    return {
      date: match.date,
      startTime: match.startTimeJst,
      endTime: finalDay ? "23:00" : "22:30",
      org: "M-LEAGUE",
      title: `Mリーグ ファイナル ${idx + 1}/${FINAL_2025_26.totalGames / 2}${
        finalDay ? " 最終決戦" : ""
      }`,
      sub: finalDay
        ? `${FINAL_TEAMS} · 表彰式併催 · ベルサール東京日本橋でPV`
        : `${FINAL_TEAMS} · 2試合`,
      channel: finalDay ? "ABEMA + PV" : "ABEMA",
      tagColor: finalDay ? "#c8282a" : "#d4b94e",
      tagTextColor: finalDay ? "#ebe4d2" : undefined,
      link: URL_ABEMA_MAHJONG,
    };
  },
);
