import Link from "next/link";
import { ALL_PLAYERS, ROSTER_PLAYERS } from "@/app/players/data";
import { TEAMS } from "@/app/teams/data";
import { LiveClock } from "@/components/LiveClock";

// Hora.mg launch date (基準日。Vol番号はここからの週数で算出)
const LAUNCH_DATE = new Date("2025-09-01T00:00:00+09:00");
// Mリーグ シーズン情報 (TEAMS データの最新シーズンから推定)
const CURRENT_SEASON = TEAMS[0]?.seasons?.find((s) => s.result === "ongoing")?.season ?? "2025-26";

function getJSTDateParts(date: Date) {
  // JST タイムゾーンで年月日を取得
  const ymd = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date); // "2026-04-28"
  const [year, month, day] = ymd.split("-");
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "long",
  })
    .format(date)
    .toUpperCase();
  return { year, month, day, weekday, ymd };
}

function formatJSTTime(date: Date): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function getVolNumber(now: Date): number {
  // 開設からの週数 (1週間 = Vol 1個)
  const diffMs = now.getTime() - LAUNCH_DATE.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(diffDays / 7) + 1);
}

export function Masthead() {
  const now = new Date();
  const { year, month, day, weekday } = getJSTDateParts(now);
  const initialTime = formatJSTTime(now);
  const vol = getVolNumber(now);
  const totalPros = ALL_PLAYERS.length + ROSTER_PLAYERS.length;
  const featuredCount = ALL_PLAYERS.length;

  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <div className="masthead-left">
          <div className="edition">
            <b>Vol.{vol}</b>
            {`${year}.${month}.${day}`}
            <br />
            {weekday}
          </div>
          <h1>
            <Link href="/">
              Hora<span className="dot">.mg</span>
            </Link>
            <span className="en">The Pro Mahjong Review</span>
          </h1>
        </div>
        <div className="masthead-right">
          <div className="kv">
            <span>SEASON</span>
            <b className="mono">{CURRENT_SEASON}</b>
          </div>
          <div className="kv">
            <span>PROS</span>
            <b className="mono">{totalPros.toLocaleString()}</b>
          </div>
          <div className="kv">
            <span>FEATURED</span>
            <b className="mono">{featuredCount}</b>
          </div>
          <div className="big mono">
            <LiveClock initial={initialTime} />
            <span
              style={{
                fontFamily: "'Geist Mono'",
                fontSize: 11,
                color: "var(--ink-3)",
                marginLeft: 4,
                fontWeight: 500,
              }}
            >
              JST
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
