import { FINAL_2025_26 } from "@/app/mleague/sf-data";

export type ScheduledEvent = {
  date: string; // YYYY-MM-DD (JST)
  startTime: string; // "19:00"
  endTime: string; // "21:00"
  org: "M-LEAGUE" | "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU";
  title: string;
  sub: string;
  channel: string;
  tagColor: string;
  tagTextColor?: string;
  link?: string;
};

export const URL_ABEMA_MAHJONG = "https://abema.tv/now-on-air/mahjong";

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
