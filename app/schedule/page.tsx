import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "対局スケジュール — TSUMORA",
  description:
    "Mリーグ・各団体タイトル戦の対局スケジュール。確定情報のみ表示、毎日の更新で常に最新の今週分を反映。",
  openGraph: {
    title: "対局スケジュール — TSUMORA",
    description: "Mリーグ・タイトル戦の対局スケジュール。",
    siteName: "TSUMORA",
    type: "website",
  },
};

// ============================================================
// 確定対局イベントデータ
// 出典: m-league.jp/games / kinmaweb.jp / m-league.jp/news202604131200/
// JPML / NPM / 最高位戦 / RMU / μ の個別対局日時は公式公開が限定的なため
// 段階的に追加していく（ scrape pipeline は別プロジェクトで進行中）
// ============================================================

type ScheduledEvent = {
  date: string; // YYYY-MM-DD (JST)
  startTime: string; // "19:00"
  endTime: string; // "21:00"
  org: "M-LEAGUE" | "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU";
  title: string;
  sub: string;
  channel: string;
  tagColor: string;
  tagTextColor?: string;
  link?: string; // 押下で遷移する放送・公式情報ページ
};

// 放送ページ URL（押下で遷移）
const URL_M_LEAGUE = "https://m-league.jp/games/";
const URL_NPM_SCHEDULE = "https://npm2001.com/schedule/";
const URL_JPML_YOUTUBE = "https://www.youtube.com/channel/UCqHDeUer8bgaqswSuFP7FxQ";

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
    link: URL_M_LEAGUE,
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
    link: URL_M_LEAGUE,
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
    link: URL_M_LEAGUE,
  },

  // ── Mリーグ 2025-26 ファイナル（5/4-5/15 月火木金 全8日 16試合）──
  // 進出チームは SF 最終日（4/30）後に発表
  {
    date: "2026-05-04",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 1/8",
    sub: "ファイナル進出4チーム発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-05",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 2/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-07",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 3/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-08",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 4/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-11",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 5/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-12",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 6/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-14",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 7/8",
    sub: "対戦カード発表待ち · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_M_LEAGUE,
  },
  {
    date: "2026-05-15",
    startTime: "17:00",
    endTime: "23:00",
    org: "M-LEAGUE",
    title: "Mリーグ ファイナル 8/8 最終決戦",
    sub: "対戦カード発表待ち · 表彰式併催 · ベルサール東京日本橋でPV",
    channel: "ABEMA + PV",
    tagColor: "#c8282a",
    tagTextColor: "#ebe4d2",
    link: URL_M_LEAGUE,
  },

  // ── NPM（日本プロ麻雀協会）放送対局 ──────────────────────
  // 出典: npm2001.com/schedule/ 配信先「ABEMA」または「協会チャンネル」と記載のある対局のみ
  // 開始/終了時刻は公式公開待ち、暫定的に 12:00–20:00
  {
    date: "2026-04-27",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第1節C卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-04",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第2節A卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-11",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第2節B卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-18",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第2節C卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "協会チャンネル",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-25",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第3節A卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-25",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "雀王戦A1リーグ 第3節B卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "ABEMA",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },
  {
    date: "2026-05-25",
    startTime: "12:00",
    endTime: "20:00",
    org: "NPM",
    title: "女流雀王戦Aリーグ 第1節 配信卓",
    sub: "出場者・詳細時刻 公式公開待ち",
    channel: "協会チャンネル",
    tagColor: "#1d4ed8",
    tagTextColor: "#ebe4d2",
    link: URL_NPM_SCHEDULE,
  },

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
    sub: "出場者・詳細時刻 連盟YouTubeチャンネル参照",
    channel: "連盟YouTube",
    tagColor: "#c8282a",
    tagTextColor: "#ebe4d2",
    link: URL_JPML_YOUTUBE,
  },
  {
    date: "2026-04-29",
    startTime: "12:00",
    endTime: "18:00",
    org: "JPML",
    title: "第43期鳳凰戦 A1リーグ 第2節C卓",
    sub: "出場者・詳細時刻 連盟YouTubeチャンネル参照",
    channel: "連盟YouTube",
    tagColor: "#c8282a",
    tagTextColor: "#ebe4d2",
    link: URL_JPML_YOUTUBE,
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
  const dow = d.getDay();
  const monOffset = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(d);
  monday.setDate(d.getDate() + monOffset);
  return Array.from({ length: 7 }, (_, i) => {
    const wd = new Date(monday);
    wd.setDate(monday.getDate() + i);
    return wd;
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

export default function SchedulePage() {
  const today = nowJst();
  const todayISO = fmtDateISO(today);
  const week = getWeekDatesJst(today);
  const weekISO = week.map(fmtDateISO);

  const weekStartLabel = `${week[0].getMonth() + 1}月${week[0].getDate()}日`;
  const weekEndLabel = `${week[6].getMonth() + 1}月${week[6].getDate()}日`;
  const weekYear = week[0].getFullYear();
  const startOfYear = new Date(weekYear, 0, 1);
  const weekNumber = Math.ceil(((week[0].getTime() - startOfYear.getTime()) / 86400000 + 1) / 7);

  const eventsByDate: ScheduledEvent[][] = weekISO.map((d) =>
    EVENTS.filter((e) => e.date === d).sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  );

  const totalMatches = eventsByDate.reduce((acc, arr) => acc + arr.length, 0);
  const todayIdx = week.findIndex((d) => fmtDateISO(d) === todayISO);
  const todayMatches = todayIdx >= 0 ? (eventsByDate[todayIdx]?.length ?? 0) : 0;
  const todayEvents = todayIdx >= 0 ? (eventsByDate[todayIdx] ?? []) : [];

  return (
    <div className="wrap">
      <section className="sc-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>対局スケジュール</span>
        </div>
        <h1>
          対局スケジュール<span className="en">Match Schedule</span>
        </h1>
        <div className="range">
          <div className="wk">
            {weekStartLabel} ― {weekEndLabel}
            <span className="sub">
              Week {weekNumber} · {weekYear} · {MONTH_EN[week[0].getMonth()]}
            </span>
          </div>
          <div className="counts">
            <div className="c">
              <div className="l">This Week</div>
              <div className="v">
                {String(totalMatches).padStart(2, "0")}
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
        現在 <strong>Mリーグ確定対局のみ</strong>{" "}
        正確な日時で表示しています。JPML（鳳凰位戦・十段位戦・王位戦）、NPM（雀王戦・雀竜位戦）、最高位戦、RMU（令昭位戦）、μ（将王戦）の個別対局日時は、各団体公式の連携準備中です。今後段階的に追加していきます。
      </section>

      <div className="cal-two">
        <div>
          <section className="cal-wrap">
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
                      return ev.link ? (
                        <a
                          key={idx}
                          href={ev.link}
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
          </section>

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
                {todayEvents.map((m, idx) => (
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
                        {m.link ? (
                          <a href={m.link} target="_blank" rel="noopener noreferrer">
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
                ))}
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
