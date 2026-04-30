import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { ALL_PLAYERS as FEATURED_PLAYERS, ROSTER_PLAYERS, type FeaturedPlayer } from "@/app/players/data";
import { TEAMS, type TeamData } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "ランキング — TSUMORA",
  description:
    "5団体・Mリーグ横断のプロ雀士ランキング。タイトル獲得数・Mリーグ 2025-26 個人pt・トップ率など、検証可能な実データから集計。",
};

const CURRENT_SEASON = "2025-26";

// ── computed rankings ──

interface TitleCountEntry {
  player: FeaturedPlayer;
  count: number;
  notable: string; // 代表タイトル例
}

function computeTitleCounts(): TitleCountEntry[] {
  const out: TitleCountEntry[] = [];
  for (const p of FEATURED_PLAYERS) {
    const titles = p.titles ?? [];
    if (titles.length === 0) continue;
    const notable = titles[0]?.name ?? "";
    out.push({ player: p, count: titles.length, notable });
  }
  return out.sort((a, b) => b.count - a.count);
}

interface SeasonPtEntry {
  player: FeaturedPlayer;
  pts: number;
  team?: TeamData;
}

function computeSeasonPts(): SeasonPtEntry[] {
  const out: SeasonPtEntry[] = [];
  for (const p of FEATURED_PLAYERS) {
    const ap = p.annualPoints?.find((a) => a.season === CURRENT_SEASON);
    if (ap?.points === undefined) continue;
    const team = TEAMS.find((t) => t.name === p.mleagueTeam);
    out.push({ player: p, pts: ap.points, team });
  }
  return out.sort((a, b) => b.pts - a.pts);
}

interface TopRateEntry {
  player: FeaturedPlayer;
  topRate: number;
  team?: TeamData;
}

function computeTopRates(): TopRateEntry[] {
  const out: TopRateEntry[] = [];
  for (const p of FEATURED_PLAYERS) {
    const rate = p.currentSeason?.topRate;
    if (typeof rate !== "number" || rate <= 0) continue;
    const team = TEAMS.find((t) => t.name === p.mleagueTeam);
    out.push({ player: p, topRate: rate, team });
  }
  return out.sort((a, b) => b.topRate - a.topRate);
}

interface BestScoreEntry {
  player: FeaturedPlayer;
  bestScore: number;
  team?: TeamData;
}

function computeBestScores(): BestScoreEntry[] {
  const out: BestScoreEntry[] = [];
  for (const p of FEATURED_PLAYERS) {
    const score = p.currentSeason?.bestScore;
    if (typeof score !== "number" || score <= 0) continue;
    const team = TEAMS.find((t) => t.name === p.mleagueTeam);
    out.push({ player: p, bestScore: score, team });
  }
  return out.sort((a, b) => b.bestScore - a.bestScore);
}

function computeWomensRanking(): SeasonPtEntry[] {
  return computeSeasonPts().filter((e: SeasonPtEntry) => e.player.gender === "female");
}

interface OrgLeaderEntry {
  org: string;
  player: FeaturedPlayer;
  pts: number;
  team?: TeamData;
}

function computeOrgLeaders(): OrgLeaderEntry[] {
  const orgGroups = new Map<string, SeasonPtEntry[]>();
  for (const e of computeSeasonPts()) {
    const arr = orgGroups.get(e.player.org) ?? [];
    arr.push(e);
    orgGroups.set(e.player.org, arr);
  }
  const out: OrgLeaderEntry[] = [];
  for (const [org, entries] of orgGroups.entries()) {
    const top = entries[0];
    if (top) out.push({ org, player: top.player, pts: top.pts, team: top.team });
  }
  return out.sort((a, b) => b.pts - a.pts);
}

const ORG_COLOR: Record<string, string> = {
  JPML: "#c8282a",
  NPM: "#1d4ed8",
  最高位戦: "#0b0b09",
  RMU: "#a07e28",
  μ: "#4b2a7a",
};

function fmtPts(pts: number): string {
  const sign = pts >= 0 ? "+" : "-";
  return `${sign}${Math.abs(pts).toFixed(1)}`;
}

function getMonogram(name: string): string {
  return name.replace(/\s/g, "").charAt(0);
}

// ── components ──

function RankRow({
  rank,
  player,
  team,
  cells,
  highlight,
}: {
  rank: number;
  player: FeaturedPlayer;
  team?: TeamData;
  cells: { label: string; value: ReactNode; tone?: "plus" | "gold" }[];
  highlight?: boolean;
}) {
  const orgColor = ORG_COLOR[player.org] ?? "#0b0b09";
  return (
    <tr style={{ background: highlight ? "rgba(200,40,42,.06)" : undefined }}>
      <td
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid rgba(11,11,9,.1)",
          fontFamily: "Shippori Mincho, serif",
          fontWeight: 900,
          fontSize: rank <= 3 ? 26 : 18,
          color: rank === 1 ? "var(--vermilion)" : rank <= 3 ? "var(--gold)" : "var(--ink-3)",
          textAlign: "center",
          width: 50,
          letterSpacing: "-0.02em",
        }}
      >
        {rank}
      </td>
      <td
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid rgba(11,11,9,.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              width: 36,
              height: 36,
              background: team?.color ?? "var(--paper-2)",
              color: team?.colorOnDark ?? "var(--ink)",
              border: "2px solid var(--ink)",
              fontFamily: "Shippori Mincho, serif",
              fontWeight: 900,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {getMonogram(player.name)}
          </span>
          <div>
            <Link
              href={player.href}
              style={{
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 700,
                fontSize: 15,
                color: "var(--ink)",
                textDecoration: "none",
                borderBottom: `2px dotted ${orgColor}`,
              }}
            >
              {player.name}
            </Link>
            <div
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 10.5,
                color: "var(--ink-3)",
                marginTop: 2,
                fontWeight: 600,
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: orgColor }}>● {player.org}</span>
              {player.mleagueTeam && ` · ${team?.shortName ?? player.mleagueTeam}`}
              {player.title && ` · ${player.title}`}
            </div>
          </div>
        </div>
      </td>
      {cells.map((c, i) => (
        <td
          key={i}
          style={{
            padding: "12px 14px",
            borderBottom: "1px solid rgba(11,11,9,.1)",
            textAlign: "right",
            fontFamily: "Shippori Mincho, serif",
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: "-0.02em",
            color:
              c.tone === "plus"
                ? "var(--vermilion)"
                : c.tone === "gold"
                  ? "var(--gold)"
                  : "var(--ink)",
          }}
        >
          {c.value}
        </td>
      ))}
    </tr>
  );
}

function RankTable({
  cols,
  rows,
}: {
  cols: { label: string; width?: number; align?: "right" | "left" }[];
  rows: ReactNode;
}) {
  return (
    <div
      className="rank-table-shell"
      style={{
        background: "var(--paper)",
        border: "var(--border)",
        boxShadow: "var(--shadow)",
        marginBottom: 32,
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th
                key={i}
                style={{
                  background: "var(--paper-2)",
                  textAlign: c.align ?? "left",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  padding: "10px 14px",
                  borderBottom: "var(--border)",
                  width: c.width,
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// ── page ──

export default function RankingsPage() {
  const titleRanking = computeTitleCounts().slice(0, 15);
  const ptsRanking = computeSeasonPts();
  const topRateRanking = computeTopRates().slice(0, 10);
  const bestScoreRanking = computeBestScores().slice(0, 8);
  const orgLeaders = computeOrgLeaders();
  const womenRanking = computeWomensRanking().slice(0, 10);

  const totalFeatured = FEATURED_PLAYERS.length;
  const totalRoster = ROSTER_PLAYERS.length + totalFeatured; // total tracked
  const totalTitles = FEATURED_PLAYERS.reduce(
    (acc: number, p: FeaturedPlayer) => acc + (p.titles?.length ?? 0),
    0,
  );

  return (
    <div className="wrap">
      <section className="rk-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>ランキング</span>
        </div>
        <h1>
          ランキング<span className="en">Pro Mahjong Rankings · {CURRENT_SEASON}</span>
        </h1>
        <p className="lead">
          5団体・Mリーグの選手データから集計したランキング。タイトル獲得数は Featured 40名の `titles[]` を集計、Mリーグ個人ptは各選手の `annualPoints` 実績、トップ率・最高素点は今期 (2025-26) の対局データから。
        </p>
        <div className="hero-stats">
          <div className="hs">
            <div className="l">Tracked Pros</div>
            <div className="v">
              {totalRoster.toLocaleString()}
              <span className="hs-suf">名</span>
            </div>
          </div>
          <div className="hs">
            <div className="l">Featured</div>
            <div className="v">
              {totalFeatured}
              <span className="hs-suf">名</span>
            </div>
          </div>
          <div className="hs">
            <div className="l">Total Titles Tracked</div>
            <div className="v red">{totalTitles}</div>
          </div>
          <div className="hs">
            <div className="l">Current Season</div>
            <div className="v gold">{CURRENT_SEASON}</div>
          </div>
          <div className="hs">
            <div className="l">Source</div>
            <div className="v" style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 16 }}>
              players/data.ts
            </div>
          </div>
        </div>
      </section>

      <div
        className="filter-bar"
        style={{
          background: "var(--paper-2)",
          border: "var(--border)",
          boxShadow: "var(--shadow-sm)",
          padding: "14px 16px",
          margin: "16px 0 28px",
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          alignItems: "center",
          fontSize: 13,
        }}
      >
        <span
          style={{
            fontFamily: "Geist Mono, ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            color: "var(--ink-3)",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          主要カテゴリを下記に分割表示 · 追加指標はデータ整備に合わせて順次公開
        </span>
      </div>

      {/* TITLE COUNT */}
      <h2 className="sh">
        <span>通算タイトル数</span>
        <span className="num">01 / Career Titles · Featured {totalFeatured}名から集計</span>
        <span className="rule"></span>
      </h2>
      <RankTable
        cols={[
          { label: "順位", width: 50, align: "left" },
          { label: "選手 / 所属" },
          { label: "代表タイトル" },
          { label: "タイトル数", align: "right", width: 110 },
        ]}
        rows={titleRanking.map((entry, i) => {
          const team = TEAMS.find((t) => t.name === entry.player.mleagueTeam);
          return (
            <RankRow
              key={entry.player.id}
              rank={i + 1}
              player={entry.player}
              team={team}
              highlight={i === 0}
              cells={[
                { label: "代表", value: entry.notable, tone: undefined },
                { label: "回", value: <>{entry.count}<span style={{ fontFamily: "Noto Sans JP, sans-serif", fontSize: 12, fontWeight: 500, color: "var(--ink-3)", marginLeft: 3 }}>冠</span></>, tone: "plus" },
              ]}
            />
          );
        })}
      />

      {/* SEASON PTS */}
      <h2 className="sh">
        <span>Mリーグ {CURRENT_SEASON} 個人ポイント</span>
        <span className="num">02 / M-League Season Points</span>
        <span className="rule"></span>
      </h2>
      <RankTable
        cols={[
          { label: "順位", width: 50, align: "left" },
          { label: "選手 / チーム" },
          { label: "獲得pt", align: "right", width: 130 },
        ]}
        rows={ptsRanking.slice(0, 15).map((entry, i) => (
          <RankRow
            key={entry.player.id}
            rank={i + 1}
            player={entry.player}
            team={entry.team}
            highlight={i === 0}
            cells={[
              {
                label: "pt",
                value: fmtPts(entry.pts),
                tone: entry.pts >= 0 ? "plus" : undefined,
              },
            ]}
          />
        ))}
      />

      <div className="rk-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 36 }}>
        {/* TOP RATE */}
        <div>
          <h2 className="sh">
            <span>今期トップ率</span>
            <span className="num">03 / Top Rate</span>
            <span className="rule"></span>
          </h2>
          <RankTable
            cols={[
              { label: "#", width: 40, align: "left" },
              { label: "選手" },
              { label: "1着率", align: "right", width: 80 },
            ]}
            rows={topRateRanking.map((entry, i) => (
              <RankRow
                key={entry.player.id}
                rank={i + 1}
                player={entry.player}
                team={entry.team}
                cells={[
                  { label: "rate", value: `${entry.topRate}%`, tone: "plus" },
                ]}
              />
            ))}
          />
        </div>

        {/* BEST SCORE */}
        <div>
          <h2 className="sh">
            <span>今期最高素点</span>
            <span className="num">04 / Best Score</span>
            <span className="rule"></span>
          </h2>
          <RankTable
            cols={[
              { label: "#", width: 40, align: "left" },
              { label: "選手" },
              { label: "最高点", align: "right", width: 90 },
            ]}
            rows={bestScoreRanking.map((entry, i) => (
              <RankRow
                key={entry.player.id}
                rank={i + 1}
                player={entry.player}
                team={entry.team}
                cells={[
                  { label: "best", value: entry.bestScore.toLocaleString(), tone: "gold" },
                ]}
              />
            ))}
          />
        </div>
      </div>

      {/* ORG LEADERS */}
      <h2 className="sh">
        <span>団体別 今期首位</span>
        <span className="num">05 / Top Scorer per Org · {CURRENT_SEASON}</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
          gap: 14,
          marginBottom: 36,
        }}
      >
        {orgLeaders.map((leader) => {
          const orgColor = ORG_COLOR[leader.org] ?? "#0b0b09";
          return (
            <div
              key={leader.org}
              style={{
                background: "var(--paper)",
                border: "var(--border)",
                boxShadow: "var(--shadow-sm)",
                padding: "14px 16px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 5,
                  background: orgColor,
                }}
              />
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: orgColor,
                  fontWeight: 700,
                  marginBottom: 6,
                  paddingLeft: 8,
                }}
              >
                ● {leader.org}
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  paddingLeft: 8,
                  marginBottom: 4,
                }}
              >
                <Link href={leader.player.href} style={{ color: "var(--ink)" }}>
                  {leader.player.name}
                </Link>
              </div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  paddingLeft: 8,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                {leader.team?.shortName ?? leader.player.mleagueTeam ?? ""}
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 26,
                  color: leader.pts >= 0 ? "var(--vermilion)" : "var(--ink-3)",
                  paddingLeft: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                {fmtPts(leader.pts)}
                <span
                  style={{
                    fontFamily: "Noto Sans JP, sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--ink-3)",
                    marginLeft: 4,
                  }}
                >
                  pt
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* WOMEN'S */}
      {womenRanking.length > 0 && (
        <>
          <h2 className="sh">
            <span>女流ランキング</span>
            <span className="num">06 / Women&apos;s Division · {CURRENT_SEASON}</span>
            <span className="rule"></span>
          </h2>
          <RankTable
            cols={[
              { label: "#", width: 50, align: "left" },
              { label: "選手 / チーム" },
              { label: "獲得pt", align: "right", width: 130 },
            ]}
            rows={womenRanking.map((entry, i) => (
              <RankRow
                key={entry.player.id}
                rank={i + 1}
                player={entry.player}
                team={entry.team}
                cells={[
                  { label: "pt", value: fmtPts(entry.pts), tone: entry.pts >= 0 ? "plus" : undefined },
                ]}
              />
            ))}
          />
        </>
      )}

      {/* DATA NOTE */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          padding: "20px 24px",
          marginBottom: 60,
          fontSize: 12.5,
          lineHeight: 1.7,
        }}
      >
        <h3
          style={{
            margin: "0 0 8px",
            fontFamily: "Shippori Mincho, serif",
            fontWeight: 900,
            fontSize: 16,
            color: "#f0c86d",
          }}
        >
          データについて
        </h3>
        <p style={{ margin: 0, color: "rgba(235,228,210,.85)" }}>
          このランキングは <code style={{ background: "rgba(235,228,210,.1)", padding: "1px 5px", fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 12 }}>app/players/data.ts</code> の Featured 40名の実データ (titles[] / annualPoints / currentSeason) から計算しています。Roster側 (約3,000名) のpt集計データはまだ持っていないため、Mリーガー以外のランキングは追って整備予定。勝率・和了率は現在データ未整備のため非表示。
        </p>
      </section>
    </div>
  );
}
