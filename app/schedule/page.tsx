import Link from "next/link";
import type { Metadata } from "next";
import {
  MLEAGUE_FINAL_EVENTS,
  URL_ABEMA_MAHJONG,
  type ScheduledEvent,
} from "./data";

export const metadata: Metadata = {
  title: "放送対局スケジュール — TSUMORA",
  description:
    "Mリーグ・各団体タイトル戦の放送対局スケジュール。確定情報のみ表示、毎日の更新で常に最新の今週分を反映。",
  openGraph: {
    title: "放送対局スケジュール — TSUMORA",
    description: "Mリーグ・タイトル戦の放送対局スケジュール。",
    siteName: "TSUMORA",
    type: "website",
  },
};

// ============================================================
// 確定対局イベントデータ
// 出典: m-league.jp/games / kinmaweb.jp / m-league.jp/news202604131200/ / m-league.jp/news202605011200/
// JPML / NPM / 最高位戦 / RMU / μ の個別対局日時は公式公開が限定的なため
// 段階的に追加していく（ scrape pipeline は別プロジェクトで進行中）
// ============================================================

// 放送先（チャンネル）URL — クリック時に直接放送ページへ遷移
const URL_JPML_YOUTUBE = "https://www.youtube.com/channel/UCqHDeUer8bgaqswSuFP7FxQ";
const URL_NPM_YOUTUBE = "https://www.youtube.com/channel/UCEPKIiiunLb64uYqDnN4pmA";
const URL_SAIKOUISEN_YOUTUBE = "https://www.youtube.com/channel/UCaq8_fXw680ljFOPgzGJuOw";

const NPM_BROADCAST_EVENTS: ScheduledEvent[] = [
  { date: "2026-04-04", title: "雀王戦A1リーグ第1節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-04-18", title: "雀王戦A1リーグ第2節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-01", title: "雀王戦A1リーグ第2節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-02", title: "雀王戦A2/B1リーグ第2節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-05-09", title: "雀王戦A2/B1リーグ第3節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-05-10", title: "雀王戦A1リーグ第2節C卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-05-16", title: "雀王戦A1リーグ第3節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-17", title: "新人王戦決勝", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-05-23", title: "雀王戦A1リーグ第3節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-25", title: "雀王戦A1リーグ第3節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-29", title: "雀王戦A1リーグ第4節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-01", title: "女流雀王戦Aリーグ第1節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-06-06", title: "雀王戦A1リーグ第4節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-07", title: "女流雀王戦A～C2リーグ第2節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・柳本店・ノーブル・協会対局室" },
  { date: "2026-06-13", title: "雀王戦A1リーグ第4節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-20", title: "雀王戦A1リーグ第5節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-21", title: "雀王戦A1リーグ第5節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-27", title: "雀王戦A1リーグ第5節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-28", title: "雀王戦A1リーグ第6節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-29", title: "雀王戦A2リーグ第4節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-07-04", title: "雀王戦A1リーグ第6節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-07-24", title: "女流雀王戦Aリーグ第4節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-07-25", title: "雀王戦A1リーグ第6節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-08", title: "雀王戦A1リーグ第7節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-09", title: "雀王戦A1リーグ第7節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-10", title: "雀王戦A1リーグ第7節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-15", title: "雀王戦A2/B1リーグ第6節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-08-17", title: "雀王戦A1リーグ第8節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-22", title: "雀王戦A2/B1リーグ第7節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-08-24", title: "雀王戦A1リーグ第8節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-31", title: "雀王戦A1リーグ第8節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
].map((event) => ({
  ...event,
  startTime: "12:00",
  endTime: "20:00",
  org: "NPM",
  tagColor: "#1d4ed8",
  tagTextColor: "#ebe4d2",
  link: event.channel === "ABEMA" ? URL_ABEMA_MAHJONG : URL_NPM_YOUTUBE,
}));

const EVENTS: ScheduledEvent[] = [
  // ── Mリーグ 2025-26 セミファイナル（4/6–4/30 月火木金 全15日 30試合）──
  // 1日2試合制（19:00-21:00 + 21:00-22:30）を1イベントとして表示
  {
    date: "2026-04-27",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 13/15",
    sub: "赤坂ドリブンズ vs セガサミーフェニックス vs TEAM雷電 vs BEAST X · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-04-28",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 14/15",
    sub: "EX風林火山 vs KONAMI麻雀格闘倶楽部 vs セガサミーフェニックス vs TEAM雷電 · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-04-30",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 15/15",
    sub: "赤坂ドリブンズ vs EX風林火山 vs KONAMI麻雀格闘倶楽部 vs BEAST X · 2試合 · SF最終日",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },

  ...MLEAGUE_FINAL_EVENTS,

  // ── NPM（日本プロ麻雀協会）放送対局 ──────────────────────
  // 出典: https://npm2001.com/schedule/ （2026-05-04確認）
  // 8月までの関東スケジュールから、配信先に「ABEMA」または「協会チャンネル」と記載のある対局のみ掲載。
  // 開始/終了時刻は公式公開待ちのため、暫定的に 12:00–20:00。
  ...NPM_BROADCAST_EVENTS,

  // ── JPML（日本プロ麻雀連盟）放送対局 ──────────────────────
  // 出典: JPML 連盟チャンネル YouTube RSS で確認できた直近放送
  // パターン: A1 毎週水曜・A2 毎週火曜配信。詳細時刻は連盟YouTube要確認
  // 将来分は卓・節の特定が困難なため随時追加予定
  {
    date: "2026-04-28",
    startTime: "12:00",
    endTime: "18:00",
    org: "JPML",
    title: "第43期鳳凰戦 A2リーグ 第1節D卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#c8282a",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-04-29",
    startTime: "12:00",
    endTime: "18:00",
    org: "JPML",
    title: "第43期鳳凰戦 A1リーグ 第2節C卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#c8282a",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },

  // ── 最高位戦 第51期 A1リーグ（ABEMA 配信）────────────────
  // 出典: saikouisen.com/results/league/league-a の卓組表
  // ※ 画像の青色マーク = ABEMA 放送卓（公式注: 全卓ABEMAにて放送、青色箇所が放送卓）
  // 開始/終了時刻は公式公開待ち、暫定 12:00–20:00
  {
    date: "2026-04-29",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第4節 卓3",
    sub: "村上 淳・平賀 聡彦・鈴木 優・中嶋 和正",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-06",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第4節 卓4",
    sub: "鈴木 たろう・鈴木 聡一郎・坂井 秀隆・日向 藍子",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-13",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第5節 卓1",
    sub: "石井 一馬・平賀 聡彦・坂井 秀隆・立花 裕",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-27",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第5節 卓3",
    sub: "園田 賢・鈴木 聡一郎・鈴木 優・馬場 翔平",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },

  // ── 最高位戦 第51期 A2リーグ（最高位戦ch / YouTube 配信）─────
  // 出典: saikouisen.com/results/league/league-a2/ の卓組表
  // 配信先: 最高位戦チャンネル (YouTube) ※ A1 = ABEMA, A2 = YouTube で取り違え注意
  // 開始/終了時刻は公式公開待ち、暫定 12:00–20:00
  {
    date: "2026-05-01",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓3",
    sub: "山田 独歩・津田 岳宏・設楽 遥斗・中邨 光康",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-02",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓4",
    sub: "小平 崇弘・宇野 公介・井上 祐希・醍醐 大",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-08",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓5",
    sub: "塩澤 彰大・太野 奈月・渋川 難波・佐藤 崇・大平 亜季",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-09",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓1",
    sub: "朝倉 康心・井上 祐希・新井 啓文・中邨 光康・醍醐 大",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-16",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓2",
    sub: "小平 崇弘・平島 洋太・渋川 難波・平島 晶太",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-22",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓3",
    sub: "宇野 公介・渡辺 太・木村 誠・大平 亜季・中邨 光康",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-23",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓4",
    sub: "山田 独歩・津田 岳宏・井上 祐希・塩澤 彰大・太野 奈月",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-29",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓5",
    sub: "河野 直也・設楽 遥斗・佐藤 崇・今村 順平",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-30",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第5節 卓1",
    sub: "宇野 公介・平島 洋太・太野 奈月・有賀 利樹",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
];

// ============================================================
// 日付ユーティリティ（JSTタイムゾーン）
// ============================================================

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

function nowJst(): Date {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + JST_OFFSET_MS);
}

function fmtDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDatesJst(now: Date): Date[] {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const monday = new Date(d);
  monday.setDate(d.getDate() - 2);
  return Array.from({ length: 7 }, (_, i) => {
    const wd = new Date(monday);
    wd.setDate(monday.getDate() + i);
    return wd;
  });
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getMonthDatesJst(now: Date): Date[] {
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  first.setHours(0, 0, 0, 0);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const DOW_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_JA = ["日", "月", "火", "水", "木", "金", "土"];
const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 時刻 "HH:MM" → グリッド top px (12:00 起点、1時間 = 72px)
const GRID_START_HOUR = 12;
const HOUR_PX = 72;

function timeToY(time: string): number {
  const [h, m] = time.split(":").map(Number);
  const hours = (h ?? GRID_START_HOUR) - GRID_START_HOUR;
  const mins = m ?? 0;
  return hours * HOUR_PX + mins * (HOUR_PX / 60);
}

function durationHeight(startTime: string, endTime: string): number {
  return Math.max(60, timeToY(endTime) - timeToY(startTime));
}

const HOURS = [
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

// ============================================================
// レンダリング
// ============================================================

export default async function SchedulePage({
  searchParams,
}: {
  searchParams?: Promise<{ view?: string; week?: string }>;
}) {
  const params = await searchParams;
  const view = params?.view === "month" ? "month" : "week";
  const weekParam = Number.parseInt(params?.week ?? "0", 10);
  const weekOffset = Number.isFinite(weekParam) ? weekParam : 0;
  const today = nowJst();
  const todayISO = fmtDateISO(today);
  const weekBase = addDays(today, weekOffset * 7);
  const week = getWeekDatesJst(weekBase);
  const month = getMonthDatesJst(today);
  const weekISO = week.map(fmtDateISO);
  const monthISO = month.map(fmtDateISO);

  const weekStartLabel = `${week[0].getMonth() + 1}月${week[0].getDate()}日`;
  const weekEndLabel = `${week[6].getMonth() + 1}月${week[6].getDate()}日`;
  const weekYear = week[0].getFullYear();
  const startOfYear = new Date(weekYear, 0, 1);
  const weekNumber = Math.ceil(((week[0].getTime() - startOfYear.getTime()) / 86400000 + 1) / 7);
  const weekHref = (offset: number) => offset === 0 ? "/schedule" : `/schedule?week=${offset}`;
  const monthLabel = `${today.getFullYear()}年${today.getMonth() + 1}月`;

  const eventsByDate: ScheduledEvent[][] = weekISO.map((d) =>
    EVENTS.filter((e) => e.date === d).sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  );
  const monthEventsByDate: ScheduledEvent[][] = monthISO.map((d) =>
    EVENTS.filter((e) => e.date === d).sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  );

  const totalMatches = eventsByDate.reduce((acc, arr) => acc + arr.length, 0);
  const monthMatches = monthEventsByDate.reduce((acc, arr) => acc + arr.length, 0);
  const todayIdx = week.findIndex((d) => fmtDateISO(d) === todayISO);
  const todayMonthIdx = month.findIndex((d) => fmtDateISO(d) === todayISO);
  const todayMatches = todayMonthIdx >= 0 ? (monthEventsByDate[todayMonthIdx]?.length ?? 0) : 0;
  const todayEvents = todayIdx >= 0
    ? (eventsByDate[todayIdx] ?? [])
    : todayMonthIdx >= 0
      ? (monthEventsByDate[todayMonthIdx] ?? [])
      : [];

  return (
    <div className="wrap">
      <section className="sc-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>放送対局スケジュール</span>
        </div>
        <h1>
          <span className="title-full">放送対局スケジュール</span>
          <span className="title-short">対局</span>
          <span className="en">Match Schedule</span>
        </h1>
        <div className="range">
          <div className="wk">
            {view === "month" ? monthLabel : `${weekStartLabel} ― ${weekEndLabel}`}
            <span className="sub">
              {view === "month"
                ? `${monthMatches} matches · ${MONTH_EN[today.getMonth()]} ${today.getFullYear()}`
                : `Week ${weekNumber} · ${weekYear} · ${MONTH_EN[week[0].getMonth()]} · 今日の2日前から`}
            </span>
          </div>
          <div className="counts">
            <div className="c">
              <div className="l">{view === "month" ? "This Month" : "This Range"}</div>
              <div className="v">
                {String(view === "month" ? monthMatches : totalMatches).padStart(2, "0")}
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "'Noto Sans JP'",
                    fontWeight: 500,
                    marginLeft: 4,
                  }}
                >
                  試合
                </span>
              </div>
            </div>
            <div className="c">
              <div className="l">Today</div>
              <div className="v gold">{String(todayMatches).padStart(2, "0")}</div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow-sm)",
          padding: "16px 22px",
          marginBottom: 18,
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: 13,
          color: "var(--ink-2)",
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: "var(--vermilion)" }}>● データ整備状況</strong> ──
        現在 <strong>Mリーグは確定日時</strong>{" "}
        で表示し、各団体タイトル戦は公式・配信ページで確認できた予定を中心に掲載しています。開始/終了時刻が未公表の対局は暫定枠として扱い、公式連携後に順次精度を上げていきます。
      </section>

      <div className="cal-two">
        <div>
          <div className="schedule-cal-toolbar">
            <div className="schedule-period-row">
              {view === "week" ? (
                <Link className="schedule-period-btn" href={weekHref(weekOffset - 1)} scroll={false}>
                  ← 前週
                </Link>
              ) : (
                <span className="schedule-period-btn is-disabled" aria-hidden="true">← 前週</span>
              )}
              <div className="schedule-cal-title">
                <small>{view === "month" ? "MONTH VIEW" : "WEEK VIEW"}</small>
                <span>{view === "month" ? monthLabel : `${weekStartLabel} ― ${weekEndLabel}`}</span>
              </div>
              {view === "week" ? (
                <Link className="schedule-period-btn" href={weekHref(weekOffset + 1)} scroll={false}>
                  次週 →
                </Link>
              ) : (
                <span className="schedule-period-btn is-disabled" aria-hidden="true">次週 →</span>
              )}
            </div>
            <div className="schedule-mode-row">
              <Link
                href={view === "month" ? "/schedule?view=month" : "/schedule"}
                scroll={false}
                className="schedule-today-chip"
                aria-current={view === "week" && weekOffset === 0 ? "page" : undefined}
              >
                今日
              </Link>
              <div className="schedule-view-tabs" aria-label="カレンダー表示切替">
                <Link href={weekHref(weekOffset)} scroll={false} aria-current={view === "week" ? "page" : undefined}>
                  週表示
                </Link>
                <Link href="/schedule?view=month" scroll={false} aria-current={view === "month" ? "page" : undefined}>
                  月表示
                </Link>
              </div>
            </div>
          </div>
          {view === "week" ? (
            <section className="cal-wrap">
              <div className="cal-scroll">
                <div className="cal-head-row">
                  <div className="corner">JST</div>
                  {week.map((d, i) => {
                    const isToday = fmtDateISO(d) === todayISO;
                    const isSat = d.getDay() === 6;
                    const isSun = d.getDay() === 0;
                    const cls = ["day", isToday ? "today" : "", isSat ? "sat" : "", isSun ? "sun" : ""]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className={cls}>
                        <div className="dow">
                          {DOW_SHORT_EN[d.getDay()]} · {DOW_JA[d.getDay()]}
                          {isToday ? " · TODAY" : ""}
                        </div>
                        <div className="dt">
                          {d.getDate()}
                          <span className="n">{MONTH_EN[d.getMonth()]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cal-body">
                  <div className="hour-col">
                    {HOURS.map((h) => (
                      <div key={h} className="hour">
                        {h}
                      </div>
                    ))}
                  </div>

                  {week.map((d, i) => {
                    const isToday = fmtDateISO(d) === todayISO;
                    const events = eventsByDate[i] ?? [];
                    return (
                      <div key={i} className={`day-col ${isToday ? "today" : ""}`.trim()}>
                        {HOURS.map((_, idx) => (
                          <div key={idx} className="hour"></div>
                        ))}
                        {events.map((ev, idx) => {
                          const top = timeToY(ev.startTime);
                          const height = durationHeight(ev.startTime, ev.endTime);
                          const link = ev.link;
                          const inner = (
                            <>
                              <div className="tm">
                                {ev.startTime} – {ev.endTime}
                              </div>
                              <div className="tl">{ev.title}</div>
                              {ev.sub && <div className="sub">{ev.sub}</div>}
                              <span
                                className="org-tag"
                                style={{ background: ev.tagColor, color: ev.tagTextColor }}
                              >
                                {ev.channel}
                              </span>
                            </>
                          );
                          return link ? (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="event"
                              style={{ top, height, textDecoration: "none", color: "inherit" }}
                            >
                              {inner}
                            </a>
                          ) : (
                            <div key={idx} className="event" style={{ top, height }}>
                              {inner}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            <section className="month-wrap">
              <div className="month-head-row">
                {DOW_JA.map((dow, idx) => (
                  <div key={dow} className={idx === 0 ? "sun" : idx === 6 ? "sat" : ""}>
                    {dow}
                  </div>
                ))}
              </div>
              <div className="month-grid">
                {month.map((d, i) => {
                  const iso = fmtDateISO(d);
                  const events = monthEventsByDate[i] ?? [];
                  const currentMonth = d.getMonth() === today.getMonth();
                  const isToday = iso === todayISO;
                  const cls = [
                    "month-cell",
                    currentMonth ? "" : "muted",
                    isToday ? "today" : "",
                  ].filter(Boolean).join(" ");
                  return (
                    <div key={iso} className={cls}>
                      <div className="month-date">
                        <span>{d.getDate()}</span>
                        <small>{MONTH_EN[d.getMonth()]}</small>
                      </div>
                      <div className="month-events">
                        {events.slice(0, 3).map((ev, idx) => {
                          const item = (
                            <>
                              <span className="time">{ev.startTime}</span>
                              <span className="name">{ev.title}</span>
                            </>
                          );
                          return ev.link ? (
                            <a
                              key={`${iso}-${idx}`}
                              href={ev.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="month-event"
                              style={{ ["--oc" as string]: ev.tagColor } as React.CSSProperties}
                            >
                              {item}
                            </a>
                          ) : (
                            <div
                              key={`${iso}-${idx}`}
                              className="month-event"
                              style={{ ["--oc" as string]: ev.tagColor } as React.CSSProperties}
                            >
                              {item}
                            </div>
                          );
                        })}
                        {events.length > 3 && (
                          <div className="month-more">+{events.length - 3}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="list-wrap">
            <div className="list-head">
              <div className="ttl">
                本日の対局
                <span className="en">
                  Today · {DOW_SHORT_EN[today.getDay()]}, {MONTH_EN[today.getMonth()]}{" "}
                  {today.getDate()}
                </span>
              </div>
              <div className="count">
                {String(todayMatches).padStart(2, "0")} MATCHES
              </div>
            </div>

            {todayMatches === 0 ? (
              <div
                style={{
                  padding: "28px 22px",
                  textAlign: "center",
                  fontFamily: "Noto Sans JP, sans-serif",
                  fontSize: 14,
                  color: "var(--ink-3)",
                  background: "var(--paper)",
                  border: "var(--border)",
                  marginTop: 12,
                }}
              >
                本日の確定対局はありません。
              </div>
            ) : (
              <div className="day-section">
                {todayEvents.map((m, idx) => {
                  const link = m.link;
                  return (
                    <div
                      key={idx}
                      className="match-row"
                      style={{ ["--oc" as string]: m.tagColor } as React.CSSProperties}
                    >
                      <div className="time">
                        {m.startTime}
                        <span className="dur">{m.endTime}</span>
                      </div>
                      <div className="status upcoming">予定</div>
                      <div className="title">
                        <h4>
                          {link ? (
                            <a href={link} target="_blank" rel="noopener noreferrer">
                              {m.title}
                            </a>
                          ) : (
                            <span>{m.title}</span>
                          )}
                        </h4>
                        <div className="sub">{m.sub}</div>
                      </div>
                      <div className="org-tag">
                        <span className="bar"></span>
                        {m.channel}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside>
          <section className="side-card">
            <h3>
              今期の主要タイトル戦
              <span className="en">Major Titles in Progress</span>
            </h3>
            <div className="jump-list">
              <div className="jump-item">
                <div className="d">
                  5/4
                  <small>月</small>
                </div>
                <div className="t">
                  Mリーグ Final 開幕
                  <small>5/4 – 5/15 · 月火木金 8日 16試合</small>
                </div>
                <div className="c">M·L</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  5/15
                  <small>金</small>
                </div>
                <div className="t">
                  Mリーグ Final 最終決戦
                  <small>17:00 開始 · 表彰式併催 · ベルサール東京日本橋PV</small>
                </div>
                <div className="c">M·L</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  43期
                  <small>JPML</small>
                </div>
                <div className="t">
                  鳳凰戦
                  <small>A1〜D 5部制リーグ 進行中</small>
                </div>
                <div className="c">JPML</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  23期
                  <small>NPM</small>
                </div>
                <div className="t">
                  雀王戦
                  <small>A〜D 4部制リーグ 進行中</small>
                </div>
                <div className="c">NPM</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  51期
                  <small>最高位戦</small>
                </div>
                <div className="t">
                  最高位戦
                  <small>A〜D 部制リーグ 進行中</small>
                </div>
                <div className="c">SKO</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  18期
                  <small>RMU</small>
                </div>
                <div className="t">
                  令昭位戦
                  <small>A1〜E 多部制リーグ 進行中</small>
                </div>
                <div className="c">RMU</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  22期
                  <small>μ</small>
                </div>
                <div className="t">
                  将王戦
                  <small>認定プロ上位10名 短期決戦 進行中</small>
                </div>
                <div className="c">μ</div>
              </div>
            </div>
          </section>

          <section className="side-card">
            <h3>
              配信チャンネル
              <span className="en">Broadcasters</span>
            </h3>
            <div className="ch-list">
              <div className="ch-item">
                <div className="badge">ABEMA</div>
                <div className="nm">
                  ABEMA 麻雀チャンネル
                  <small>Mリーグ · 各団体タイトル戦</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  主に19:00〜
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  連盟
                  <br />
                  CH
                </div>
                <div className="nm">
                  麻雀連盟チャンネル
                  <small>鳳凰位 · 十段位 · 王位 · 桜花</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  OPENREC他
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  最高
                  <br />
                  位戦
                </div>
                <div className="nm">
                  最高位戦チャンネル
                  <small>最高位 · Classic · 發王</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  RMU
                  <br />
                  ch
                </div>
                <div className="nm">
                  RMUチャンネル
                  <small>令昭位 · クラウン · 闘魂杯</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  μ-
                  <br />
                  TV
                </div>
                <div className="nm">
                  麻将連合TV
                  <small>将王 · BIG1 · μ-M1</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  FRESH
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
