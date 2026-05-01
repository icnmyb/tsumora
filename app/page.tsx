import Link from "next/link";
import type { Metadata } from "next";
import { ALL_PLAYERS, ROSTER_PLAYERS } from "@/app/players/data";
import { TEAMS, getTeamBySlug } from "@/app/teams/data";
import { TITLES } from "@/app/titles/data";
import { NEWS, getCategoryLabel } from "@/app/news/data";
import {
  FINAL_2025_26,
  type FinalState,
  type FinalTeamStanding,
} from "@/app/mleague/sf-data";
import type { TeamData } from "@/app/teams/data";
import {
  computeTitleRanking,
  fmtPts,
  getCurrentTitlists,
} from "@/lib/computed";

type Tile = { glyph: string; variant?: "red" | "green"; left: string; duration: string; delay: string; rotate: string };

// 全 5団体・Featured + Roster 合算
const _ORG_COUNTS: Record<string, number> = {};
for (const p of [...ALL_PLAYERS, ...ROSTER_PLAYERS]) {
  _ORG_COUNTS[p.org] = (_ORG_COUNTS[p.org] ?? 0) + 1;
}
const ORG_COUNTS = _ORG_COUNTS;
const TOTAL_PROS = Object.values(ORG_COUNTS).reduce((a, b) => a + b, 0);

const HERO_TILES: Tile[] = [
  { glyph: "一", left: "8%", duration: "9s", delay: "0s", rotate: "-8deg" },
  { glyph: "中", variant: "red", left: "18%", duration: "12s", delay: "-3s", rotate: "4deg" },
  { glyph: "東", left: "28%", duration: "10s", delay: "-6s", rotate: "-2deg" },
  { glyph: "發", variant: "green", left: "42%", duration: "11s", delay: "-1s", rotate: "6deg" },
  { glyph: "九", left: "55%", duration: "13s", delay: "-7s", rotate: "-5deg" },
  { glyph: "南", left: "68%", duration: "10s", delay: "-4s", rotate: "3deg" },
  { glyph: "中", variant: "red", left: "80%", duration: "14s", delay: "-2s", rotate: "-4deg" },
  { glyph: "白", left: "90%", duration: "9s", delay: "-8s", rotate: "7deg" },
];

const MLEAGUE_LOGO_COLORS: Record<string, string> = {
  konami: "#e63946",
  abemas: "#E4BD7A",
  phoenix: "#F27100",
  "sakura-knights": "#ffccf5",
  pirates: "#3DDFFF",
  drivens: "#6fc83a",
  furinkazan: "#ff4040",
  raiden: "#ffd91a",
  "beast-x": "#002953",
  "earth-jets": "#1E9627",
};

const KANJI_RANK = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

// 各主要団体から最高峰タイトルを1つずつ厳選 (5団体 → 5タイトル)
const ORG_PRIORITY = ["JPML", "NPM", "SAIKOUISEN", "RMU", "MU"] as const;

const DOW_JA = ["日", "月", "火", "水", "木", "金", "土"];
function dayLabel(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  if (!y || !m || !d) return "—";
  const dt = new Date(Date.UTC(y, m - 1, d));
  return DOW_JA[dt.getUTCDay()] ?? "—";
}

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const URL_ABEMA_MAHJONG = "https://abema.tv/now-on-air/mahjong";

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

function monthDayLabel(dateIso: string): string {
  const [, m, d] = dateIso.split("-");
  return `${Number(m)}月${Number(d)}日`;
}

type EnrichedFinalStanding = FinalTeamStanding & { team: TeamData };

function MLeagueStandingsCard({
  final,
  finalStandings,
  leaderPts,
}: {
  final: FinalState;
  finalStandings: EnrichedFinalStanding[];
  leaderPts: number;
}) {
  const progressPct = (final.gamesPlayed / final.totalGames) * 100;
  const isBeforeOpen = final.gamesPlayed === 0;
  return (
    <>
      <div className="hmb-head">
        <div className="hmb-head-top">
          <div className="hmb-title-group">
            <h2 className="hmb-title">Mリーグ順位表</h2>
            <span className="hmb-phase-chip">{isBeforeOpen ? "FINAL OPENING" : "FINAL"}</span>
          </div>
          <Link href="/mleague" className="hmb-more">
            詳細 →
          </Link>
        </div>
        <div className="hmb-progress-row">
          <div className="hmb-progress-track">
            <div
              className="hmb-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="hmb-progress-count">
            <b>{final.gamesPlayed}</b>
            <span className="hmb-meta-slash">/</span>
            <span className="hmb-meta-total">{final.totalGames}</span>
            <span className="hmb-meta-unit">試合</span>
          </span>
        </div>
        <div className="hmb-meta-row">
          <span>{isBeforeOpen ? "2025-26 · Final 5/4開幕" : "2025-26 · Final進行中"}</span>
          <span className="hmb-meta-final">
            {isBeforeOpen ? "SF最終ptの半分を持越" : "確認済み結果を反映"}
          </span>
        </div>
      </div>

      <ul className="hmb-list">
        {finalStandings.map((s, idx) => {
          const rank = idx + 1;
          const teamColor = MLEAGUE_LOGO_COLORS[s.team.slug] ?? s.team.color;
          const diff = s.total - leaderPts;
          return (
            <li
              key={s.team.slug}
              className={`hmb-row in-final${rank === 1 ? " is-border" : ""}`}
              style={{ ["--team-c" as string]: teamColor } as React.CSSProperties}
            >
              <Link href={`/teams/${s.team.slug}`} className="hmb-row-link">
                <span className="hmb-strip" aria-hidden="true"></span>
                <span className="hmb-rk">{KANJI_RANK[idx]}</span>
                <span className="hmb-team-name">{s.team.shortName}</span>
                <span className="hmb-pt-stack">
                  <span className={`hmb-pt${s.total >= 0 ? " p" : " m"}`}>
                    {fmtPts(s.total)}
                  </span>
                  {rank === 1 ? (
                    <span className="hmb-bd hmb-bd--zero">
                      <span className="hmb-bd-lbl">{isBeforeOpen ? "開始首位" : "首位"}</span>
                      <span className="hmb-bd-val">—</span>
                    </span>
                  ) : (
                    <span
                      className={`hmb-bd ${
                        diff >= 0 ? "hmb-bd--lead" : "hmb-bd--chase"
                      }`}
                    >
                      <span className="hmb-bd-lbl">首位差</span>
                      <span className="hmb-bd-val">{fmtPts(diff)}</span>
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export const metadata: Metadata = {
  title: "TSUMORA — The Pro Mahjong Review",
  description:
    "5つのプロ団体（JPML / 最高位戦 / NPM / RMU / μ）と Mリーグの選手・タイトル戦・対局を1つの編集視点で扱うポータル。",
  openGraph: {
    title: "TSUMORA — The Pro Mahjong Review",
    description:
      "5つのプロ団体と Mリーグを横断する編集ポータル。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function Home() {
  const final = FINAL_2025_26;
  const finalStandings = final.standings.map((s) => ({
    ...s,
    team: getTeamBySlug(s.teamSlug),
  })).filter((s): s is typeof s & { team: NonNullable<typeof s.team> } => Boolean(s.team));
  const finalLeader = finalStandings[0];
  const nextMatch = final.upcoming.find((m) => m.teamSlugs.length > 0);
  const nextMatchTeams = nextMatch
    ? nextMatch.teamSlugs.map((slug) => getTeamBySlug(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t))
    : [];
  const todayISO = fmtDateISO(nowJst());
  const todayMatches = final.upcoming.filter((m) => m.date === todayISO);
  const visibleTodayMatches = todayMatches.length > 0 ? todayMatches : [];
  const nextBroadcast = todayMatches[0] ?? nextMatch;
  const nextBroadcastTeams = nextBroadcast
    ? nextBroadcast.teamSlugs.map((slug) => getTeamBySlug(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t))
    : [];

  const titleRanking = computeTitleRanking().slice(0, 5);
  const currentTitlists = getCurrentTitlists();

  // 注目記事 (最新が先頭)
  const sortedNews = [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const topStory = sortedNews[0];
  const otherNews = sortedNews.slice(1, 3);

  // 団体ごとに最も代表的なタイトル戦を1つずつ選んで5つに
  const featuredTitles = ORG_PRIORITY.map((org) => TITLES.find((t) => t.org === org)).filter(
    (t): t is NonNullable<typeof t> => Boolean(t),
  );

  // HERO上部 5団体それぞれの現タイトル保持者
  const heroTitlists = ORG_PRIORITY.map((org) => {
    const titlist = currentTitlists.find((t) => t.title.org === org);
    return titlist;
  }).filter((t): t is NonNullable<typeof t> => Boolean(t));


  return (
    <div className="wrap">
      {/* HERO: 編集タイポ + 現タイトル保持者 banzuke */}
      <section className="home-hero" style={{ marginBottom: 22 }}>
        <div className="home-hero-lead">
          <div className="bg-tiles">
            {HERO_TILES.map((t, i) => (
              <div
                key={i}
                className={`tile${t.variant ? ` ${t.variant}` : ""}`}
                data-glyph={t.glyph}
                style={
                  {
                    left: t.left,
                    animationDuration: t.duration,
                    animationDelay: t.delay,
                    ["--r" as string]: t.rotate,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="hh-kicker">
            <span className="hh-k-tag">●</span>
            TOP STORY · 注目記事{" "}
            <span className="hh-k-en">{getCategoryLabel(topStory.category)} · {topStory.date}</span>
          </div>
          <Link href={`/news/${topStory.slug}`} className="hh-news-link">
            <h2 className="hh-title hh-news-headline">{topStory.headline}</h2>
          </Link>
          <p className="hh-news-lead">{topStory.lead}</p>
          <div className="hh-news-actions">
            <Link href={`/news/${topStory.slug}`} className="hh-news-cta">
              全文を読む →
            </Link>
            <Link href="/news" className="hh-news-all">
              ALL NEWS
            </Link>
          </div>
          {otherNews.length > 0 && (
            <ul className="hh-news-list">
              {otherNews.map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`}>
                    <span className="hh-news-list-cat">
                      {getCategoryLabel(n.category)}
                    </span>
                    <span className="hh-news-list-headline">{n.headline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mリーグ semifinal — 次戦 + フェーズ */}
        <aside className="home-hero-mboard">
          <div className="mlb-head">
            <div className="mlb-brand">
              <span className="mlb-mark">M</span>
              <span className="mlb-brand-name">LEAGUE</span>
            </div>
            <div className="mlb-meta">
              <span className="mlb-season">2025-26</span>
              <span className="mlb-phase">FINAL OPENING</span>
            </div>
          </div>

          <div className="mlb-progress">
            <div className="mlb-progress-row">
              <span className="mlb-progress-label">FINAL STARTING POINTS</span>
              <span className="mlb-progress-count">
                <strong>{final.gamesPlayed}</strong>
                <span className="slash">/</span>
                <span className="total">{final.totalGames}</span>
                <span className="unit">試合</span>
              </span>
            </div>
            <div className="mlb-progress-bar">
              <div
                className="mlb-progress-fill"
                style={{ width: `${(final.gamesPlayed / final.totalGames) * 100}%` }}
              />
              <div
                className="mlb-progress-tick"
                style={{ left: "0%" }}
              />
            </div>
            <div className="mlb-progress-meta">
              <span>{final.startDate.slice(5).replace("-", ".")} 開幕</span>
              <span>{final.endDate.slice(5).replace("-", ".")} 最終日</span>
            </div>
          </div>

          {nextMatch && nextMatchTeams.length > 0 && (
            <div className="mlb-next">
              <div className="mlb-next-tag">
                <span className="mlb-next-dot">●</span> NEXT MATCH
              </div>
              <div className="mlb-next-when">
                <span className="mlb-next-date">
                  {nextMatch.date.slice(5).replace("-", ".")}
                </span>
                <span className="mlb-next-day">
                  {dayLabel(nextMatch.date)}
                </span>
                <span className="mlb-next-time">{nextMatch.startTimeJst} JST</span>
              </div>
              <ul className="mlb-next-teams">
                {nextMatchTeams.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/teams/${t.slug}`}>
                      <span
                        className="mlb-next-swatch"
                        style={{ background: t.color }}
                      />
                      <span className="mlb-next-name">{t.shortName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {finalLeader && (
            <div className="mlb-leader-line">
              <Link href={`/teams/${finalLeader.team.slug}`}>
                <span className="mlb-ll-tag">START LEADER</span>
                <span
                  className="mlb-ll-swatch"
                  style={{ background: finalLeader.team.color }}
                />
                <span className="mlb-ll-name">{finalLeader.team.shortName}</span>
                <span className={`mlb-ll-pt${finalLeader.total >= 0 ? "" : " m"}`}>
                  {fmtPts(finalLeader.total)}
                </span>
              </Link>
            </div>
          )}

          <Link href="/mleague" className="mlb-cta">
            Mリーグ詳細 →
          </Link>
        </aside>
      </section>

      {/* M-LEAGUE SF STANDINGS — モバイルのみ Mリーグセクション直下に配置 */}
      <section
        className="home-mleague-block home-mleague-block--mobile"
        style={{ marginBottom: 22 }}
        aria-label="Mリーグ 2025-26 ファイナル開始時順位表"
      >
        <MLeagueStandingsCard
          final={final}
          finalStandings={finalStandings}
          leaderPts={finalLeader?.total ?? 0}
        />
      </section>

      {/* 現タイトル保持者 — 5団体 banzuke */}
      <section className="home-titlists" style={{ marginBottom: 22 }}>
        <header className="ht-head">
          <div className="ht-kicker">
            CURRENT TITLISTS · 現タイトル保持者
            <span className="ht-en">{currentTitlists.length} CROWNS · {ORG_PRIORITY.length} ORGS</span>
          </div>
        </header>
        <div className="home-hero-grid">
          {heroTitlists.slice(0, 5).map((t, idx) => (
            <Link
              key={t.title.slug}
              href={`/titles/${t.title.slug}`}
              className="hh-card"
              style={
                {
                  ["--c" as string]: t.title.color,
                  ["--idx" as string]: idx + 1,
                } as React.CSSProperties
              }
            >
              <div className="hh-card-rank">{String(idx + 1).padStart(2, "0")}</div>
              <div className="hh-card-glyph">{t.title.glyph}</div>
              <div className="hh-card-org">{t.title.org}</div>
              <div className="hh-card-title">{t.title.shortName ?? t.title.name}</div>
              <div className="hh-card-holder">{t.holder.name}</div>
              {t.holder.note && (
                <div className="hh-card-note">{t.holder.note}</div>
              )}
            </Link>
          ))}
        </div>
      </section>

      <section className="home-match-grid" style={{ marginBottom: 18 }}>
        <div className="today-strip">
          <div className="hd">
            <span>本日の対局</span>
            <span className="r">{todayISO.replaceAll("-", ".")} JST</span>
          </div>
          <div className="today-items today-items--home">
            {visibleTodayMatches.length > 0 ? (
              visibleTodayMatches.map((m) => {
                const teams = m.teamSlugs
                  .map((slug) => getTeamBySlug(slug))
                  .filter((t): t is NonNullable<typeof t> => Boolean(t));
                return (
                  <Link key={`${m.date}-${m.startTimeJst}`} href="/schedule" className="it">
                    <span className="time">{m.startTimeJst}</span>
                    <span className="tag">M.LEAGUE</span>
                    <span className="t">Mリーグ ファイナル</span>
                    <span className="sub">
                      {teams.map((t) => t.shortName).join(" / ")}
                    </span>
                  </Link>
                );
              })
            ) : (
              <Link href="/schedule" className="it">
                <span className="time">—</span>
                <span className="tag">NO MATCH</span>
                <span className="t">本日の確定対局はありません</span>
                <span className="sub">次回予定はスケジュールで確認できます</span>
              </Link>
            )}
          </div>
        </div>

        <aside className="box home-watch-box">
          <div className="side-hd">
            <span className="tag">WATCH</span>
            <span>今すぐ視聴</span>
            <span className="en">Live / Next Broadcast</span>
          </div>
          <ul className="live-list">
            {nextBroadcast ? (
              <li>
                <span className="time">
                  {monthDayLabel(nextBroadcast.date)}
                  <b>{nextBroadcast.startTimeJst}</b>
                </span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#d4b94e" } as React.CSSProperties}>
                    M
                  </span>
                  Mリーグ ファイナル
                  <span className="ch">
                    {nextBroadcastTeams.map((t) => t.shortName).join(" / ")}
                  </span>
                </span>
                <a
                  href={URL_ABEMA_MAHJONG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dot on"
                  aria-label="ABEMA 麻雀チャンネルを開く"
                />
              </li>
            ) : (
              <li>
                <span className="time">—<b>—</b></span>
                <span className="title">
                  配信予定を準備中
                  <span className="ch">確定次第、スケジュールに反映します</span>
                </span>
                <span className="dot" aria-hidden="true" />
              </li>
            )}
          </ul>
          {nextBroadcast && (
            <a
              href={URL_ABEMA_MAHJONG}
              target="_blank"
              rel="noopener noreferrer"
              className="watch-cta"
            >
              ABEMAで見る →
            </a>
          )}
          <Link href="/schedule" className="box-link">
            対局スケジュール →
          </Link>
        </aside>
      </section>

      <div className="grid-2col">
        <div className="col">
          {/* TITLES (5団体 bento) */}
          <section className="home-titles-section">
            <h2 className="home-section-h">
              <span className="hsh-num">01</span>
              <span className="hsh-jp">主要タイトル戦</span>
              <span className="hsh-en">Major Championships · 5 Bodies</span>
              <span className="hsh-rule"></span>
              <Link href="/titles" className="hsh-more">ALL 8 TITLES →</Link>
            </h2>
            <div className="home-titles-bento">
              {featuredTitles.map((t) => {
                const recentChamps = t.pastChampions.slice(0, 3);
                return (
                  <div
                    key={t.slug}
                    className="home-title-card"
                    style={{ ["--c" as string]: t.color } as React.CSSProperties}
                  >
                    <div className="htc-glyph">{t.glyph}</div>
                    <div className="htc-org-tag">
                      <span className="htc-org-sw"></span>
                      {t.org} · {t.orgLabel}
                    </div>
                    <h3 className="htc-name">
                      <Link href={`/titles/${t.slug}`}>{t.name}</Link>
                    </h3>
                    <div className="htc-en">{t.en}</div>
                    {t.holder && (
                      <div className="htc-holder">
                        <div className="htc-holder-l">CURRENT</div>
                        <div className="htc-holder-name">
                          {t.holder.href ? (
                            <Link href={t.holder.href}>{t.holder.name}</Link>
                          ) : (
                            t.holder.name
                          )}
                        </div>
                        {t.holder.note && <div className="htc-holder-note">{t.holder.note}</div>}
                      </div>
                    )}
                    <div className="htc-history">
                      {recentChamps.map((c, i) => (
                        <div key={`${c.ep}-${i}`} className="htc-history-row">
                          <span className="htc-h-ep">第{c.ep}期</span>
                          <span className="htc-h-name">{c.name}</span>
                          <span className="htc-h-year">&apos;{c.year.slice(-2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="htc-foot">
                      <span>{t.founded}年創設</span>
                      <span>{t.pastChampions.length}件記録</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ORGS */}
          <section className="orgs-section">
            <h2>
              <span>プロ団体</span>
              <span className="num italic">Organizations</span>
              <span className="rule"></span>
              <Link href="/organizations" className="more">COMPARE →</Link>
            </h2>
            <div className="orgs-grid">
              {[
                { c: "#c8282a", idx: "01", code: "JPML · 1981", jp: ["日本プロ麻雀", "連盟"], pros: ORG_COUNTS["JPML"]?.toLocaleString() ?? "—", titles: "鳳凰位戦 / 十段位戦 / 王位戦", main: "鳳凰位戦 · 十段位戦 · 王位戦 · 女流桜花", href: "/organizations/jpml" },
                { c: "#1d4ed8", idx: "02", code: "NPM · 2001", jp: ["日本プロ麻雀", "協会"], pros: ORG_COUNTS["NPM"]?.toLocaleString() ?? "—", titles: "雀王戦 / 雀竜位戦", main: "雀王戦 · 雀竜位戦 · 日本オープン", href: "/organizations/npm" },
                { c: "#0b0b09", idx: "03", code: "SAIKOUISEN · 1976", jp: ["最高位戦", "日本プロ麻雀協会"], pros: ORG_COUNTS["最高位戦"]?.toLocaleString() ?? "—", titles: "最高位戦 / Classic", main: "最高位決定戦 · Classic · 發王戦", href: "/organizations/saikouisen" },
                { c: "#c8a030", idx: "04", code: "RMU · 2007", jp: ["RMU"], pros: ORG_COUNTS["RMU"]?.toLocaleString() ?? "—", titles: "令昭位戦 / RMUクラウン", main: "令昭位戦 · RMUクラウン · 闘魂杯", href: "/organizations/rmu" },
                { c: "#4b2a7a", idx: "05", code: "μ · 1997", jp: ["麻将連合", "-μ-"], pros: ORG_COUNTS["μ"]?.toLocaleString() ?? "—", titles: "μリーグ", main: "μリーグ · BIG1カップ · 将妃戦", href: "/organizations/mu" },
              ].map((o, i) => {
                const inner = (
                  <>
                    <div className="stripe"></div>
                    <div className="body">
                      <div className="idx">{o.idx}</div>
                      <div className="code">{o.code}</div>
                      <div className="jp">
                        {o.jp.map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < o.jp.length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <div className="stat-row">
                        <div className="s">
                          <div className="l">所属プロ</div>
                          <div className="v">{o.pros}</div>
                        </div>
                        <div className="s">
                          <div className="l">主要タイトル</div>
                          <div className="v" style={{ fontSize: 12, lineHeight: 1.4 }}>{o.titles}</div>
                        </div>
                      </div>
                      <div className="titles-list">
                        <span className="lb">MAIN TITLES</span>
                        {o.main}
                      </div>
                    </div>
                  </>
                );
                return (
                  <Link
                    key={i}
                    href={o.href}
                    className="org-card"
                    style={{ ["--c" as string]: o.c } as React.CSSProperties}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* PLAYERS DIRECTORY CTA */}
          <Link href="/players" className="players-cta">
            <div className="players-cta-body">
              <div className="players-cta-tag">
                PLAYERS DIRECTORY · {TOTAL_PROS.toLocaleString()} PROS
              </div>
              <div className="players-cta-headline">
                プロ雀士 {TOTAL_PROS.toLocaleString()}名 を全員検索
                <span className="players-cta-en">Search every Japanese pro</span>
              </div>
              <div className="players-cta-orgs">
                JPML {ORG_COUNTS["JPML"]?.toLocaleString()} · 最高位戦 {ORG_COUNTS["最高位戦"]?.toLocaleString()} · NPM {ORG_COUNTS["NPM"]?.toLocaleString()} · μ {ORG_COUNTS["μ"]} · RMU {ORG_COUNTS["RMU"]}
                {" — "}名前 / リーグ / 段位 / 入会年で絞り込み可能
              </div>
            </div>
            <span className="players-cta-arrow">→</span>
          </Link>

          {/* RANKINGS — 編集誌型 通算タイトル番付 */}
          <section className="home-ranking-section">
            <h2 className="home-section-h">
              <span className="hsh-num">02</span>
              <span className="hsh-jp">通算タイトル数 番付</span>
              <span className="hsh-en">Career Title Counts · Featured 40</span>
              <span className="hsh-rule"></span>
              <Link href="/rankings" className="hsh-more">FULL RANKING →</Link>
            </h2>
            <ol className="title-rank">
              {titleRanking.slice(0, 5).map((entry, i) => {
                const rank = i + 1;
                const team = TEAMS.find((t) => t.name === entry.player.mleagueTeam);
                const teamLabel = team?.shortName ?? entry.player.org;
                const titles = entry.player.titles ?? [];
                const recentTitles = titles.slice(0, 3);
                const remaining = titles.length - recentTitles.length;
                return (
                  <li
                    key={entry.player.id}
                    className={`tr-row${rank === 1 ? " tr-first" : ""}`}
                    style={{ ["--accent" as string]: team?.color ?? "var(--vermilion)" } as React.CSSProperties}
                  >
                    <Link href={entry.player.href} className="tr-link">
                      <div className="tr-rank">{String(rank).padStart(2, "0")}</div>
                      <div className="tr-count">
                        <span className="tr-count-num">{entry.count}</span>
                        <span className="tr-count-u">冠</span>
                      </div>
                      <div className="tr-body">
                        <div className="tr-head">
                          <span className="tr-name">{entry.player.name}</span>
                          <span className="tr-team">
                            <span className="tr-team-sw" />
                            {teamLabel}
                          </span>
                        </div>
                        <ul className="tr-titles">
                          {recentTitles.map((t, j) => (
                            <li key={`${t.year}-${j}`}>
                              <span className="tr-titles-name">{t.name}</span>
                              <span className="tr-titles-year">&apos;{t.year.slice(-2)}</span>
                            </li>
                          ))}
                          {remaining > 0 && (
                            <li className="tr-titles-more">
                              ほか{remaining}タイトル
                            </li>
                          )}
                        </ul>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col">
          {/* M-LEAGUE SF STANDINGS — デスクトップのみサイドバーに表示 */}
          <section
            className="home-mleague-block home-mleague-block--desktop"
            aria-label="Mリーグ 2025-26 ファイナル開始時順位表"
          >
            <MLeagueStandingsCard
              final={final}
              finalStandings={finalStandings}
              leaderPts={finalLeader?.total ?? 0}
            />
          </section>

          {/* CURRENT TITLE HOLDERS list */}
          <section
            style={{
              background: "var(--paper)",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              marginBottom: 18,
            }}
          >
            <div className="side-hd">
              <span>
                現タイトル保持者 <span className="en">Active Holders</span>
              </span>
              <Link
                href="/titles"
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                }}
              >
                ALL →
              </Link>
            </div>
            <ul className="live-list">
              {currentTitlists.map((t) => (
                <li key={t.title.slug}>
                  <span
                    className="time"
                    style={{
                      fontFamily: "Shippori Mincho, serif",
                      fontWeight: 900,
                      fontSize: 26,
                      color: t.title.color,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {t.title.glyph}
                  </span>
                  <span className="title">
                    <Link
                      href={`/titles/${t.title.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {t.title.shortName ?? t.title.name}
                    </Link>
                    <span className="ch" style={{ marginTop: 2 }}>
                      {t.holder.name}
                      {t.holder.note && ` · ${t.holder.note}`}
                    </span>
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: "var(--ink-3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.title.org}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* PREDICT GAME CTA */}
          <Link
            href="/predict"
            className="related-card"
            style={{
              display: "block",
              background: "var(--vermilion)",
              color: "var(--paper)",
              padding: "20px 22px",
              border: "var(--border)",
              boxShadow: "5px 5px 0 var(--ink)",
              marginBottom: 18,
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 120,
                color: "rgba(11,11,9,.1)",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              予
            </div>
            <div
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Mリーグ予想ゲーム
            </div>
            <div
              style={{
                fontFamily: "Noto Sans JP, sans-serif",
                fontSize: 12,
                marginTop: 8,
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              Mリーグ全試合の1着を予想してシーズン上位を目指す新企画。
              2026-27シーズン開幕に合わせて公開予定。
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              準備状況を見る →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
