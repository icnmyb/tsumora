import Link from "next/link";
import type { Metadata } from "next";
import { TEAMS as ALL_TEAMS, type TeamData } from "@/app/teams/data";
import { getPlayer, type FeaturedPlayer } from "@/app/players/data";

export const metadata: Metadata = {
  title: "Mリーグ 2025-26 — TSUMORA",
  description:
    "Mリーグ 2025-26シーズンの順位表・10チーム一覧・個人成績ランキング。データは選手の年間獲得pt実績から計算。",
};

const CURRENT_SEASON = "2025-26";

// ── Compute 2025-26 team standings from real player annualPoints ──
interface ComputedStanding {
  team: TeamData;
  totalPts: number;
  topRateAvg: number;
  bestScore: number;
  rosterPlayers: FeaturedPlayer[];
}

function computeStandings(): ComputedStanding[] {
  const out: ComputedStanding[] = [];
  for (const team of ALL_TEAMS) {
    const rosterPlayers: FeaturedPlayer[] = [];
    let totalPts = 0;
    let topRateSum = 0;
    let topRateCount = 0;
    let bestScore = 0;
    for (const slot of team.currentRoster) {
      const p = getPlayer(slot.id);
      if (!p) continue;
      // FeaturedPlayer guard via annualPoints presence
      if (!("annualPoints" in p) || !p.annualPoints) continue;
      rosterPlayers.push(p as FeaturedPlayer);
      const seasonEntry = (p as FeaturedPlayer).annualPoints?.find(
        (ap) => ap.season === CURRENT_SEASON
      );
      if (seasonEntry?.points !== undefined) totalPts += seasonEntry.points;
      const cs = (p as FeaturedPlayer).currentSeason;
      if (cs?.season === CURRENT_SEASON) {
        if (typeof cs.topRate === "number") {
          topRateSum += cs.topRate;
          topRateCount++;
        }
        if (typeof cs.bestScore === "number" && cs.bestScore > bestScore) {
          bestScore = cs.bestScore;
        }
      }
    }
    out.push({
      team,
      totalPts,
      topRateAvg: topRateCount > 0 ? topRateSum / topRateCount : 0,
      bestScore,
      rosterPlayers,
    });
  }
  out.sort((a, b) => b.totalPts - a.totalPts);
  return out;
}

interface IndividualLeader {
  player: FeaturedPlayer;
  team: TeamData;
  pts: number;
}

function computeIndividualLeaders(standings: ComputedStanding[]): IndividualLeader[] {
  const leaders: IndividualLeader[] = [];
  for (const s of standings) {
    for (const p of s.rosterPlayers) {
      const ap = p.annualPoints?.find((a) => a.season === CURRENT_SEASON);
      if (ap?.points !== undefined) {
        leaders.push({ player: p, team: s.team, pts: ap.points });
      }
    }
  }
  leaders.sort((a, b) => b.pts - a.pts);
  return leaders;
}

const KANJI_RANK = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

function fmtPts(pts: number): string {
  const sign = pts >= 0 ? "+" : "−";
  return `${sign}${Math.abs(pts).toFixed(1)}`;
}

function getMonogram(name: string): string {
  return name.replace(/\s/g, "").charAt(0);
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
  const standings = computeStandings();
  const leaders = computeIndividualLeaders(standings).slice(0, 10);
  const leader = standings[0];
  const totalPlayers = standings.reduce((acc, s) => acc + s.rosterPlayers.length, 0);
  // バーは max abs で正規化、片側 50% にキャップしてはみ出しを防ぐ
  const maxAbs = Math.max(...standings.map((s) => Math.abs(s.totalPts)), 1);
  // F進出ライン (4位) のポイント — ボーダー差計算に使用
  const borderPts = standings[3]?.totalPts ?? 0;

  return (
    <div className="wrap">
      <section className="ml-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Mリーグ {CURRENT_SEASON}</span>
        </div>
        <div className="season-tag">● {CURRENT_SEASON} SEASON · レギュラー進行中</div>
        <h1>
          Mリーグ
          <span className="en">M.LEAGUE · Japan&apos;s Premier Pro Team Circuit · Since 2018</span>
        </h1>
        <p className="lead">
          2018年に発足した国内初の本格的プロ麻雀団体対抗リーグ。10チームが10月〜翌5月のレギュラーシーズンを戦い、上位6チームがセミファイナル・ファイナルへ進む。EARTH JETSの新規参入により10チーム体制となった{CURRENT_SEASON}シーズン進行中。
        </p>
        <div className="meta-row">
          <div className="m">
            <div className="l">Season</div>
            <div className="v accent">{CURRENT_SEASON}</div>
            <div className="sub">第8シーズン</div>
          </div>
          <div className="m">
            <div className="l">Teams</div>
            <div className="v">{ALL_TEAMS.length}</div>
            <div className="sub">5団体から選抜</div>
          </div>
          <div className="m">
            <div className="l">Players</div>
            <div className="v">{totalPlayers}</div>
            <div className="sub">各チーム4名</div>
          </div>
          <div className="m">
            <div className="l">Leader</div>
            <div className="v red">{fmtPts(leader.totalPts)}</div>
            <div className="sub">{leader.team.shortName}</div>
          </div>
          <div className="m">
            <div className="l">Broadcaster</div>
            <div className="v">ABEMA</div>
            <div className="sub">月〜金 19:00〜 無料</div>
          </div>
        </div>
      </section>

      <section className="standings-wrap">
        <div className="st-head">
          <div className="ttl">
            順位表<span className="en">Standings · {CURRENT_SEASON} (個人pt合算)</span>
          </div>
          <div className="as-of">SOURCE · 各選手の年間獲得pt実績合算</div>
        </div>
        <table className="st-table st-desktop-table">
          <thead>
            <tr>
              <th>順位</th>
              <th>チーム</th>
              <th style={{ width: 88 }}>ライン</th>
              <th className="pts-th">ポイント</th>
              <th className="n">ボーダー差</th>
              <th className="n">平均1位率</th>
              <th className="n">最高素点</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s, idx) => {
              const top4 = idx < 4;
              const top6 = idx < 6;
              const isBorder = idx === 3;
              const isEliminated = idx >= 6;
              const lineLabel = top4 ? "F進出圏" : top6 ? "S進出圏" : "敗退";
              const lineClass = top4 ? "f" : top6 ? "s" : "x";
              const fillPct = (Math.abs(s.totalPts) / maxAbs) * 50;
              const diff = s.totalPts - borderPts;
              const markText = getContrastText(s.team.color);
              return (
                <tr
                  key={s.team.slug}
                  className={`${isBorder ? "is-border" : ""}${isEliminated ? " is-eliminated" : ""}`.trim()}
                >
                  <td className={`rk ${idx < 3 ? "top3" : ""}`.trim()}>
                    {KANJI_RANK[idx] ?? `${idx + 1}`}
                  </td>
                  <td>
                    <div className="team-cell">
                      <span
                        className="team-mark"
                        style={{ background: s.team.color, color: markText }}
                      >
                        {s.team.kanji}
                      </span>
                      <div className="t-name">
                        <Link href={`/teams/${s.team.slug}`}>{s.team.name}</Link>
                        <small>
                          {s.rosterPlayers.map((p) => p.name).join(" / ") || "選手データ準備中"}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`line-tag ${lineClass}`}>{lineLabel}</span>
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
                    {s.topRateAvg > 0 ? `${s.topRateAvg.toFixed(1)}%` : "—"}
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
            const top4 = idx < 4;
            const top6 = idx < 6;
            const isBorder = idx === 3;
            const isEliminated = idx >= 6;
            const lineLabel = top4 ? "F進出圏" : top6 ? "S進出圏" : "敗退";
            const lineClass = top4 ? "f" : top6 ? "s" : "x";
            const fillPct = (Math.abs(s.totalPts) / maxAbs) * 50;
            const diff = s.totalPts - borderPts;
            const markText = getContrastText(s.team.color);
            return (
              <li
                key={s.team.slug}
                className={`st-card${isBorder ? " is-border" : ""}${isEliminated ? " is-eliminated" : ""}`}
              >
                <Link
                  href={`/teams/${s.team.slug}`}
                  className="st-card-link"
                >
                  <div className="st-card-top">
                    <span className={`st-card-rk${idx < 3 ? " top3" : ""}`}>
                      {KANJI_RANK[idx] ?? `${idx + 1}`}
                    </span>
                    <span
                      className="st-card-mark"
                      style={{
                        background: s.team.color,
                        color: markText,
                      }}
                    >
                      {s.team.kanji}
                    </span>
                    <div className="st-card-name">
                      <span className="st-card-team">{s.team.name}</span>
                      <span className="st-card-roster">
                        {s.rosterPlayers.map((p) => p.name).join(" / ") || "—"}
                      </span>
                    </div>
                    <span className={`line-tag ${lineClass}`}>{lineLabel}</span>
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
                      <span className="lbl">ボーダー</span>
                      <span className="val">
                        {isBorder ? "±0.0" : fmtPts(diff)}
                      </span>
                    </span>
                  </div>
                  <div className="st-card-stats">
                    <div className="stat">
                      <span className="lbl">平均1位率</span>
                      <span className="val">
                        {s.topRateAvg > 0 ? `${s.topRateAvg.toFixed(1)}%` : "—"}
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
        <span>全{ALL_TEAMS.length}チーム</span>
        <span className="num">Teams · {ALL_TEAMS.length} Franchises</span>
        <span className="rule"></span>
        <Link href="/teams" className="more" style={{ textDecoration: "none", color: "var(--ink-3)" }}>
          チーム一覧 →
        </Link>
      </h2>
      <div className="team-grid">
        {standings.map((s, idx) => {
          const isEliminated = idx >= 6;
          const markText = getContrastText(s.team.color);
          return (
            <div
              key={s.team.slug}
              className={`team-card${isEliminated ? " is-eliminated" : ""}`}
              style={{ ["--tc" as string]: s.team.color } as React.CSSProperties}
            >
              <div className="band"></div>
              <div className="head">
                <div
                  className="mark"
                  style={{ background: s.team.color, color: markText }}
                >
                  {s.team.kanji}
                </div>
                <div className="head-text">
                  <h3>
                    <Link href={`/teams/${s.team.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {s.team.name}
                    </Link>
                  </h3>
                  <div className="sponsor">{s.team.parentCompany}</div>
                </div>
                <div className="rk-pt">
                  <div className="head-rk">{idx + 1}位</div>
                  <div className={`head-pt ${s.totalPts >= 0 ? "p" : "m"}`}>
                    {fmtPts(s.totalPts)}
                  </div>
                </div>
              </div>
              <ul className="roster">
                {s.rosterPlayers.map((p) => {
                  const ap = p.annualPoints?.find((a) => a.season === CURRENT_SEASON);
                  const pts = ap?.points ?? 0;
                  return (
                    <li key={p.id} className="p">
                      <span
                        className="av"
                        style={{ background: s.team.color, color: markText }}
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
            <dd>全{totalPlayers}名（各4名）</dd>
            <dt>レギュラー</dt>
            <dd>
              10月〜翌5月
              <br />
              各チーム約100戦
            </dd>
            <dt>進出ライン</dt>
            <dd>
              上位6チーム → セミファイナル
              <br />
              上位4チーム → ファイナル
            </dd>
            <dt>放送</dt>
            <dd>
              <b>ABEMA</b>にて全試合無料生配信
              <br />
              月〜金 19:00〜
            </dd>
            <dt>歴代王者</dt>
            <dd style={{ fontSize: 11.5, lineHeight: 1.6 }}>
              ドリブンズ&apos;18-19 / Pirates&apos;19-20 / 風林火山&apos;20-21 /<br/>
              サクラナイツ&apos;21-22 / ABEMAS&apos;22-23 /<br/>
              Pirates&apos;23-24 / フェニックス&apos;24-25
            </dd>
            <dt>公式</dt>
            <dd>
              <a
                href="https://m-league.jp"
                target="_blank"
                rel="noreferrer noopener"
                style={{ borderBottom: "1px dotted var(--ink)" }}
              >
                m-league.jp
              </a>
            </dd>
          </dl>
        </section>
      </div>

      <section className="rule-sheet">
        <h3>
          公式ルール<span className="en">Official M.League Rules</span>
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
  { l: "Uma / Oka", v: <>ウマ <b>+30 / +10 / −10 / −30</b></> },
  { l: "Akadora", v: <><b>あり</b> · 各色1枚</> },
  { l: "Ippatsu", v: <b>あり</b> },
  { l: "Uradora", v: <b>あり</b> },
  { l: "Kuitan", v: <>喰いタン <b>あり</b></> },
];
