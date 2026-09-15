"use client";

import Link from "next/link";
import { Fragment } from "react";
import { TEAMS as ALL_TEAMS, type TeamData } from "@/app/teams/data";
import { getPlayer, isFeaturedPlayer, type FeaturedPlayer } from "@/app/players/data";
import { getRegularPlayerStats, REGULAR_2026_27 } from "@/app/mleague/season-data";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";

const CURRENT_SEASON = REGULAR_2026_27.season;

interface ComputedStanding {
  rank: number;
  team: TeamData;
  phasePoints: number;
  totalPts: number;
  gamesPlayed: number;
  gamesTotal: number;
  topRateAvg: number;
  bestScore: number;
  rosterPlayers: FeaturedPlayer[];
}

function enrichStanding(
  team: TeamData,
  rank: number,
  totalPts: number,
  gamesPlayed: number,
  gamesTotal: number,
  firsts: number,
  bestScore: number,
): ComputedStanding {
  const rosterPlayers = getSeasonRosterPlayers(team);
  return {
    rank,
    team,
    phasePoints: totalPts,
    totalPts,
    gamesPlayed,
    gamesTotal,
    topRateAvg: gamesPlayed > 0 ? (firsts / gamesPlayed) * 100 : 0,
    bestScore,
    rosterPlayers,
  };
}

function getSeasonRosterPlayers(team: TeamData): FeaturedPlayer[] {
  return team.currentRoster
    .map(({ id }) => getPlayer(id))
    .filter((player): player is FeaturedPlayer => !!player && isFeaturedPlayer(player))
    .sort((a, b) => getPlayerPhasePts(b) - getPlayerPhasePts(a));
}

function computeStandings(): ComputedStanding[] {
  const out: ComputedStanding[] = [];
  for (const entry of REGULAR_2026_27.standings) {
    const team = ALL_TEAMS.find((t) => t.slug === entry.teamSlug);
    if (team) {
      out.push({
        ...enrichStanding(
          team,
          entry.rank,
          entry.points,
          entry.gamesPlayed,
          entry.gamesTotal,
          entry.firsts,
          entry.bestScore ?? 0,
        ),
        phasePoints: entry.points,
      });
    }
  }
  return out;
}

const PHASE_COPY = {
  tag: "レギュラー · 9.14終了時点",
  heading: "レギュラーシーズン順位",
  en: "Regular Season Standings",
  deskLabel: `全${ALL_TEAMS.length}チーム`,
  deskEn: `Regular Season · ${ALL_TEAMS.length} Teams`,
  ptsLabel: "レギュラー PTS",
  diffLabel: "首位差",
  lead:
    "大和証券Mリーグ2026-27は9月14日に開幕。初日は逢川恵夢と朝倉康心がトップを獲得し、U-NEXT Piratesが58.5ptで首位に立った。",
} as const;

function getLineInfo(idx: number) {
  return {
    eliminated: false,
    border: idx === 0,
  };
}

interface IndividualLeader {
  player: FeaturedPlayer;
  team: TeamData;
  pts: number;
}

function getPlayerPhasePts(player: FeaturedPlayer): number {
  return getRegularPlayerStats(player.id)?.points ?? 0;
}

function computeIndividualLeaders(standings: ComputedStanding[]): IndividualLeader[] {
  const leaders: IndividualLeader[] = [];
  for (const s of standings) {
    for (const p of s.rosterPlayers) {
      leaders.push({ player: p, team: s.team, pts: getPlayerPhasePts(p) });
    }
  }
  leaders.sort((a, b) => b.pts - a.pts);
  return leaders;
}

const KANJI_RANK = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

function fmtPts(pts: number): string {
  const sign = pts >= 0 ? "+" : "-";
  return `${sign}${Math.abs(pts).toFixed(1)}`;
}

function getMonogram(name: string): string {
  return name.replace(/\s/g, "").charAt(0);
}

function getCompactSideMetric(standing: ComputedStanding) {
  return {
    label: "1位率",
    value: standing.gamesPlayed > 0 ? `${standing.topRateAvg.toFixed(1)}%` : "—",
    tone: "neutral",
  };
}

// 背景色から文字色を自動決定（YIQ で輝度判定）
function getContrastText(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return "#fff";
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#1a1a1a" : "#ffffff";
}

export default function MleaguePage() {
  const phaseCopy = PHASE_COPY;
  const standings = computeStandings();
  const leaders = computeIndividualLeaders(standings).slice(0, 10);
  const leader = standings[0];
  const seasonPlayerTotal = standings.reduce((acc, s) => acc + s.rosterPlayers.length, 0);
  const totalPlayers = standings.reduce((acc, s) => acc + s.rosterPlayers.length, 0);
  // バーは max abs で正規化、片側 50% にキャップしてはみ出しを防ぐ
  const maxAbs = Math.max(...standings.map((s) => Math.abs(s.totalPts)), 1);
  const borderPts = leader?.totalPts ?? 0;
  const compactSideLabel = getCompactSideMetric(standings[0]).label;
  const scrollToTeam = (teamSlug: string) => {
    document.getElementById(`mleague-team-${teamSlug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="wrap">
      <section className="ml-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Mリーグ {CURRENT_SEASON}</span>
        </div>
        <div className="season-tag">● {CURRENT_SEASON} SEASON · {phaseCopy.tag}</div>
        <h1>
          Mリーグ
          <span className="en">M.LEAGUE · Japan&apos;s Premier Pro Team Circuit · Since 2018</span>
        </h1>
        <p className="lead">
          {phaseCopy.lead}
        </p>
        <div className="meta-row">
          <div className="m">
            <div className="l">Season</div>
            <div className="v accent">{CURRENT_SEASON}</div>
            <div className="sub">第9シーズン</div>
          </div>
          <div className="m">
            <div className="l">Teams</div>
            <div className="v">{ALL_TEAMS.length}</div>
            <div className="sub">5団体から選抜</div>
          </div>
          <div className="m">
            <div className="l">Players</div>
            <div className="v">{totalPlayers}</div>
            <div className="sub">表示中フェーズの出場者</div>
          </div>
          <div className="m">
            <div className="l">Leader</div>
            <div className="v red">{leader ? fmtPts(leader.totalPts) : "—"}</div>
            <div className="sub">{leader?.team.shortName ?? "—"}</div>
          </div>
          <div className="m">
            <div className="l">Broadcaster</div>
            <div className="v">ABEMA</div>
            <div className="sub">全試合生放送</div>
          </div>
        </div>
      </section>

      <section className="mobile-standings-compact" aria-label={`${phaseCopy.heading} コンパクト順位表`}>
        <div className="msc-head">
          <span>{phaseCopy.heading}</span>
          <small>合計pts / {compactSideLabel}</small>
        </div>
        <ol className="msc-list">
          {standings.map((s, idx) => {
            const line = getLineInfo(idx);
            const isBorder = line.border;
            const sideMetric = getCompactSideMetric(s);
            return (
              <li
                key={s.team.slug}
                data-team={s.team.slug}
                className={`${line.eliminated ? "is-eliminated" : ""}${isBorder ? " is-border" : ""}`.trim()}
              >
                <button type="button" onClick={() => scrollToTeam(s.team.slug)}>
                  <span className={`msc-rank${s.rank <= 3 ? " top3" : ""}`}>
                    {s.rank}
                  </span>
                  <span className="msc-team">
                    <b>{s.team.shortName}</b>
                  </span>
                  <span className={`msc-pts ${s.totalPts >= 0 ? "p" : "m"}`}>
                    {fmtPts(s.totalPts)}
                  </span>
                  <span className={`msc-side ${sideMetric.tone}`}>
                    <b>{sideMetric.value}</b>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="standings-wrap">
        <div className="st-head">
          <div className="ttl">
            {phaseCopy.heading}<span className="en">{phaseCopy.en} · {CURRENT_SEASON}</span>
          </div>
        </div>
        <table className="st-table st-desktop-table">
          <thead>
            <tr>
              <th>順位</th>
              <th>チーム</th>
              <th className="pts-th">{phaseCopy.ptsLabel}</th>
              <th className="n">{phaseCopy.diffLabel}</th>
              <th className="n">試合数</th>
              <th className="n">1位率</th>
              <th className="n">最高素点</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, idx) => {
              const line = getLineInfo(idx);
              const isBorder = line.border;
              const fillPct = (Math.abs(s.totalPts) / maxAbs) * 50;
              const diff = s.totalPts - borderPts;
              return (
                <tr
                  key={s.team.slug}
                  data-team={s.team.slug}
                  className={`${isBorder ? "is-border" : ""}${line.eliminated ? " is-eliminated" : ""}`.trim()}
                >
                  <td className={`rk ${s.rank <= 3 ? "top3" : ""}`.trim()}>
                    {KANJI_RANK[s.rank - 1] ?? `${s.rank}`}
                  </td>
                  <td>
                    <div className="t-name">
                      <Link href={`/teams/${s.team.slug}`}>{s.team.name}</Link>
                      <small>
                        {s.rosterPlayers.map((p) => p.name).join(" / ") || "選手データ準備中"}
                      </small>
                    </div>
                  </td>
                  <td className="pts-cell">
                    <div className="pts-row">
                      <span className={`n pts ${s.totalPts >= 0 ? "p" : "m"}`}>
                        {fmtPts(s.totalPts)}
                      </span>
                      <div className="bar" aria-hidden="true">
                        <div className="bar-axis"></div>
                        <div
                          className={`fill ${s.totalPts >= 0 ? "p" : "m"}`}
                          style={{ width: `${fillPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`n diff ${
                      isBorder ? "diff-zero" : diff > 0 ? "diff-lead" : "diff-chase"
                    }`}
                  >
                    {isBorder ? "—" : fmtPts(diff)}
                  </td>
                  <td className="n">
                    {(() => {
                      return `${s.gamesPlayed}/${s.gamesTotal}`;
                    })()}
                  </td>
                  <td className="n">
                    {s.gamesPlayed > 0 ? `${s.topRateAvg.toFixed(1)}%` : "—"}
                  </td>
                  <td className="n">
                    {s.bestScore > 0 ? `${s.bestScore.toLocaleString()}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile: card stack（テーブルが入らないので別レンダー）*/}
        <ul className="st-mobile-list">
          {standings.map((s, idx) => {
            const line = getLineInfo(idx);
            const isBorder = line.border;
            const fillPct = (Math.abs(s.totalPts) / maxAbs) * 50;
            const diff = s.totalPts - borderPts;
            return (
              <li
                key={s.team.slug}
                data-team={s.team.slug}
                className={`st-card${isBorder ? " is-border" : ""}${line.eliminated ? " is-eliminated" : ""}`}
              >
                <Link
                  href={`/teams/${s.team.slug}`}
                  className="st-card-link"
                >
                  <div className="st-card-top">
                    <span className={`st-card-rk${s.rank <= 3 ? " top3" : ""}`}>
                      {KANJI_RANK[s.rank - 1] ?? `${s.rank}`}
                    </span>
                    <div className="st-card-name">
                      <span className="st-card-team">{s.team.name}</span>
                      <span className="st-card-roster">
                        {s.rosterPlayers.map((p) => p.name).join(" / ") || "—"}
                      </span>
                    </div>
                  </div>
                  <div className="st-card-bar" aria-hidden="true">
                    <div className="bar-axis"></div>
                    <div
                      className={`fill ${s.totalPts >= 0 ? "p" : "m"}`}
                      style={{ width: `${fillPct}%` }}
                    ></div>
                  </div>
                  <div className="st-card-pts">
                    <span className={`st-card-total ${s.totalPts >= 0 ? "p" : "m"}`}>
                      {fmtPts(s.totalPts)}
                    </span>
                    <span
                      className={`st-card-diff ${
                        isBorder ? "diff-zero" : diff > 0 ? "diff-lead" : "diff-chase"
                      }`}
                    >
                      <span className="lbl">{phaseCopy.diffLabel}</span>
                      <span className="val">
                        {isBorder ? "±0.0" : fmtPts(diff)}
                      </span>
                    </span>
                  </div>
                  <div className="st-card-stats">
                    <div className="stat">
                      <span className="lbl">1位率</span>
                      <span className="val">
                        {s.gamesPlayed > 0 ? `${s.topRateAvg.toFixed(1)}%` : "—"}
                      </span>
                    </div>
                    <div className="stat">
                      <span className="lbl">最高素点</span>
                      <span className="val">
                        {s.bestScore > 0 ? s.bestScore.toLocaleString() : "—"}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <h2 className="sh">
        <span className="sh-desk">{phaseCopy.deskLabel}</span>
        <span className="sh-mob">チーム詳細</span>
        <span className="num sh-desk-num">{phaseCopy.deskEn}</span>
        <span className="num sh-mob-num">Standings · {CURRENT_SEASON}</span>
        <span className="rule"></span>
        <Link href="/teams" className="more" style={{ textDecoration: "none", color: "var(--ink-3)" }}>
          チーム一覧 →
        </Link>
      </h2>
      <div className="team-grid">
        {standings.map((s, idx) => {
          const line = getLineInfo(idx);
          const isBorder = line.border;
          const accent = s.team.colorOnDark ?? s.team.color;
          const avText = getContrastText(s.team.color);
          return (
            <Fragment key={s.team.slug}>
            <div
              id={`mleague-team-${s.team.slug}`}
              data-team={s.team.slug}
              className={`team-card${line.eliminated ? " is-eliminated" : ""}${isBorder ? " is-border" : ""}`}
              style={
                {
                  ["--tc" as string]: s.team.color,
                  ["--tc-text" as string]: accent,
                  background: s.team.background ?? "var(--paper)",
                  color: accent,
                } as React.CSSProperties
              }
            >
              <span className="band" aria-hidden="true" />
              <span className="watermark" aria-hidden="true">
                {s.team.kanji}
              </span>
              <div className="head">
                <div className="head-rank">
                  <span className="rk-num">{s.rank}</span>
                  <span className="rk-unit">位</span>
                </div>
                <div className="head-info">
                  <div className="head-meta">
                    {String(s.rank).padStart(2, "0")} · {s.team.nameEn.toUpperCase()}
                  </div>
                  <h3 className="head-name">
                    <Link href={`/teams/${s.team.slug}`}>{s.team.name}</Link>
                  </h3>
                  <div className="head-sponsor">
                    {s.team.parentCompany} · {s.team.joinedSeason}〜
                  </div>
                </div>
                <div className="head-pts">
                  <span className={`pt-val ${s.totalPts >= 0 ? "p" : "m"}`}>
                    {fmtPts(s.totalPts)}
                  </span>
                  <span className="pt-lbl">{phaseCopy.ptsLabel}</span>
                </div>
              </div>

              <div className="team-stats">
                <div
                  className={`stat ${
                    isBorder
                      ? "diff-zero"
                      : (s.totalPts - borderPts) > 0
                        ? "diff-lead"
                        : "diff-chase"
                  }`}
                >
                  <span className="lbl">{phaseCopy.diffLabel}</span>
                  <span className="val">
                    {isBorder ? "±0.0" : fmtPts(s.totalPts - borderPts)}
                  </span>
                </div>
                <div className="stat">
                  <span className="lbl">試合数</span>
                  <span className="val">
                    {(() => {
                      return `${s.gamesPlayed}/${s.gamesTotal}`;
                    })()}
                  </span>
                </div>
                <div className="stat">
                  <span className="lbl">1位率</span>
                  <span className="val">
                    {s.gamesPlayed > 0 ? `${s.topRateAvg.toFixed(1)}%` : "—"}
                  </span>
                </div>
                <div className="stat">
                  <span className="lbl">最高素点</span>
                  <span className="val">
                    {s.bestScore > 0 ? s.bestScore.toLocaleString() : "—"}
                  </span>
                </div>
              </div>

              <input
                type="checkbox"
                id={`roster-toggle-${s.team.slug}`}
                className="roster-toggle"
                aria-label="各選手成績の表示切替"
              />
              <label
                htmlFor={`roster-toggle-${s.team.slug}`}
                className="roster-touch-target"
                aria-hidden="true"
              />
              <label
                htmlFor={`roster-toggle-${s.team.slug}`}
                className="roster-summary"
              >
                <span className="lbl">各選手成績</span>
                <span className="chev" aria-hidden="true">▾</span>
              </label>
              <ul className="roster">
                {s.rosterPlayers.map((p) => {
                  const pts = getPlayerPhasePts(p);
                  return (
                    <li key={p.id} className="p">
                      <span
                        className="av"
                        style={{ background: s.team.color, color: avText }}
                      >
                        {getMonogram(p.name)}
                      </span>
                      <div className="nm">
                        <Link href={p.href}>{p.name}</Link>
                        <small>{p.org}</small>
                      </div>
                      <span className={`pt ${pts >= 0 ? "p" : "m"}`}>
                        {fmtPts(pts)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            </Fragment>
          );
        })}
      </div>

      <div className="two-col">
        <section className="leaders-wrap">
          <h3>
            個人成績 Top 10<span className="en">Individual Points Leaders · {CURRENT_SEASON}</span>
          </h3>
          {leaders.map((l, i) => (
            <div key={l.player.id} className="lead-row">
              <span className={`rk ${i < 3 ? "top" : ""}`.trim()}>{i + 1}</span>
              <span className="av" style={{ background: l.team.color, color: getContrastText(l.team.color) }}>
                {getMonogram(l.player.name)}
              </span>
              <div className="nm">
                <Link href={l.player.href}>{l.player.name}</Link>
                <small>
                  {l.team.shortName} · {l.player.org}
                </small>
              </div>
              <span className={`pt ${l.pts >= 0 ? "p" : "m"}`}>{fmtPts(l.pts)}</span>
            </div>
          ))}
          {leaders.length === 0 && (
            <div className="lead-row">
              <span className="rk">—</span>
              <span className="av">未</span>
              <div className="nm">
                <span>ファイナル個人成績は開幕後に反映</span>
                <small>未開催フェーズの成績は表示しません</small>
              </div>
              <span className="pt">—</span>
            </div>
          )}
        </section>

        <section className="info-card">
          <h3>
            リーグ概要<span className="en">At a Glance</span>
          </h3>
          <dl>
            <dt>名称</dt>
            <dd>
              <b>Mリーグ</b>
              <br />
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", color: "var(--ink-3)" }}>
                M.LEAGUE
              </span>
            </dd>
            <dt>発足</dt>
            <dd>
              2018年7月
              <br />
              <span style={{ color: "var(--ink-3)", fontSize: 11 }}>チェアマン：藤田晋</span>
            </dd>
            <dt>参加チーム</dt>
            <dd>
              <b>{ALL_TEAMS.length}チーム</b>
              <br />
              5団体から選抜
            </dd>
            <dt>参加プロ</dt>
            <dd>全{seasonPlayerTotal}名（レギュラーシーズン）</dd>
            <dt>レギュラー</dt>
            <dd>
              2026年9月14日〜
              <br />
              各チーム120戦
            </dd>
            <dt>進出ライン</dt>
            <dd>
              上位6チーム → セミファイナル
              <br />
              上位4チーム → ファイナル
            </dd>
            <dt>放送</dt>
            <dd>
              <b>ABEMA</b>にて全試合生放送
              <br />
              通常19:00〜
            </dd>
            <dt>歴代王者</dt>
            <dd style={{ fontSize: 11.5, lineHeight: 1.6 }}>
              ドリブンズ&apos;18-19 / Pirates&apos;19-20 / 風林火山&apos;20-21 /<br/>
              サクラナイツ&apos;21-22 / ABEMAS&apos;22-23 /<br/>
              Pirates&apos;23-24 / フェニックス&apos;24-25 / 風林火山&apos;25-26
            </dd>
            <dt>公式</dt>
            <dd>
              <TrackedExternalLink
                href="https://m-league.jp"
                style={{ borderBottom: "1px dotted var(--ink)" }}
                eventName="External Link Click"
                eventProps={{ area: "mleague_official", destination: "M.LEAGUE", url: "https://m-league.jp" }}
              >
                m-league.jp
              </TrackedExternalLink>
            </dd>
          </dl>
        </section>
      </div>

      <section className="rule-sheet">
        <h3>
          Mリーグルール<span className="en">M.League Rules</span>
        </h3>
        <div className="grid">
          {RULE_ROWS.map((r) => (
            <div key={r.l} className="r">
              <div className="l">{r.l}</div>
              <div className="v">{r.v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const RULE_ROWS: { l: string; v: React.ReactNode }[] = [
  { l: "Game Type", v: <>4人<b>東南戦</b></> },
  { l: "Starting Score", v: <><b>25,000点</b>持ち · 30,000点返し</> },
  { l: "Uma / Oka", v: <>ウマ <b>+30 / +10 / −10 / −30</b> · オカ <b>+20</b></> },
  { l: "Akadora", v: <><b>あり</b> · 各色1枚</> },
  { l: "Ippatsu", v: <b>あり</b> },
  { l: "Uradora", v: <b>あり</b> },
  { l: "Kuitan", v: <>喰いタン <b>あり</b></> },
];
