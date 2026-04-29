import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../predict.css";
import { getTeamBySlug } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "シーズンランキング — TSUMORA",
  description: "Mリーグ予想ゲーム シーズン2025-26 ランキング。TOP100 + 自分の順位。",
};

interface RankRow {
  rank: number;
  trend: { kind: "up" | "down" | "same"; value?: number };
  ava: { mono: string; tone?: "r2" | "r3" | "you" };
  name: string;
  handle: string;
  fav: { teamSlug: string; label: string };
  pct: number;
  hot?: boolean;
  streak: { label: string; cold?: boolean };
  pts: string;
  pts_gold?: boolean;
  isYou?: boolean;
}

const ROWS: RankRow[] = [
  { rank: 2, trend: { kind: "same" }, ava: { mono: "蒼", tone: "r2" }, name: "蒼天", handle: "@aozora_pai · 認証済み", fav: { teamSlug: "pirates", label: "PIRATES" }, pct: 68.4, hot: true, streak: { label: "8連続" }, pts: "7,680", pts_gold: true },
  { rank: 3, trend: { kind: "up", value: 2 }, ava: { mono: "飛", tone: "r3" }, name: "飛龍", handle: "@hiryu_mleague", fav: { teamSlug: "abemas", label: "ABEMAS" }, pct: 62.1, streak: { label: "5連続" }, pts: "6,840", pts_gold: true },
  { rank: 4, trend: { kind: "down", value: 1 }, ava: { mono: "月" }, name: "月見草", handle: "@tsukimi_so", fav: { teamSlug: "sakura-knights", label: "サクラナイツ" }, pct: 58.2, streak: { label: "−", cold: true }, pts: "6,210" },
  { rank: 5, trend: { kind: "up", value: 3 }, ava: { mono: "雷" }, name: "雷光", handle: "@raikou1992", fav: { teamSlug: "raiden", label: "雷電" }, pct: 55.8, streak: { label: "3連続" }, pts: "5,920" },
  { rank: 6, trend: { kind: "same" }, ava: { mono: "麻" }, name: "麻雀大好き太郎", handle: "@majan_taro", fav: { teamSlug: "furinkazan", label: "風林火山" }, pct: 52.4, streak: { label: "−", cold: true }, pts: "5,640" },
  { rank: 7, trend: { kind: "up", value: 2 }, ava: { mono: "朝" }, name: "朝霧", handle: "@asagiri_pro", fav: { teamSlug: "phoenix", label: "PHOENIX" }, pct: 51.2, streak: { label: "4連続" }, pts: "5,420" },
  { rank: 8, trend: { kind: "down", value: 1 }, ava: { mono: "煌" }, name: "煌めき", handle: "@kirameki_jong", fav: { teamSlug: "drivens", label: "DRIVENS" }, pct: 49.8, streak: { label: "−", cold: true }, pts: "5,280" },
  { rank: 9, trend: { kind: "up", value: 5 }, ava: { mono: "夜" }, name: "夜半の月", handle: "@yowanotsuki", fav: { teamSlug: "abemas", label: "ABEMAS" }, pct: 48.5, streak: { label: "2連続" }, pts: "5,140" },
  { rank: 10, trend: { kind: "same" }, ava: { mono: "雪" }, name: "雪見桜", handle: "@yukimi_sakura", fav: { teamSlug: "sakura-knights", label: "サクラナイツ" }, pct: 47.2, streak: { label: "3連続" }, pts: "4,980" },
];

const ROWS_NEAR_YOU: RankRow[] = [
  { rank: 1232, trend: { kind: "same" }, ava: { mono: "沢" }, name: "沢田", handle: "@sawada_jong", fav: { teamSlug: "drivens", label: "DRIVENS" }, pct: 38.5, streak: { label: "−", cold: true }, pts: "2,855" },
  { rank: 1233, trend: { kind: "up", value: 2 }, ava: { mono: "寿" }, name: "寿司", handle: "@sushi_jong", fav: { teamSlug: "pirates", label: "PIRATES" }, pct: 38.4, streak: { label: "2連続" }, pts: "2,851" },
  { rank: 1234, trend: { kind: "up", value: 8 }, ava: { mono: "高", tone: "you" }, name: "高宮 まり", handle: "@takamiya_fan", fav: { teamSlug: "abemas", label: "ABEMAS" }, pct: 38.2, streak: { label: "3連続" }, pts: "2,847", isYou: true },
  { rank: 1235, trend: { kind: "down", value: 3 }, ava: { mono: "珈" }, name: "珈琲党", handle: "@coffee_jong", fav: { teamSlug: "furinkazan", label: "風林火山" }, pct: 38.0, streak: { label: "−", cold: true }, pts: "2,840" },
  { rank: 1236, trend: { kind: "same" }, ava: { mono: "凪" }, name: "凪", handle: "@nagi_jong", fav: { teamSlug: "phoenix", label: "PHOENIX" }, pct: 37.9, streak: { label: "−", cold: true }, pts: "2,832" },
];

function teamColorFromSlug(slug: string): string {
  return getTeamBySlug(slug)?.color ?? "#0b0b09";
}

function TrendCell({ trend }: { trend: RankRow["trend"] }) {
  if (trend.kind === "same") return <small className="same">— 維持</small>;
  if (trend.kind === "up") return <small className="up">{trend.value}</small>;
  return <small className="down">{trend.value}</small>;
}

function RankRow({ r }: { r: RankRow }) {
  const tc = teamColorFromSlug(r.fav.teamSlug);
  const trClass = r.isYou ? "you" : undefined;
  return (
    <tr className={trClass}>
      <td>
        <div className="rk-num">
          {r.rank.toLocaleString()}
          <TrendCell trend={r.trend} />
        </div>
      </td>
      <td>
        <div className="user-cell">
          <div className={`ava${r.ava.tone ? ` ${r.ava.tone}` : ""}`}>{r.ava.mono}</div>
          <div>
            <div className="nm">
              {r.name}
              {r.isYou && (
                <span style={{ fontSize: 10, background: "var(--ink)", color: "var(--paper)", padding: "1px 6px", marginLeft: 4, fontFamily: "Geist Mono, ui-monospace, monospace", letterSpacing: "0.08em", fontWeight: 700 }}>YOU</span>
              )}
            </div>
            <div className="x">{r.handle}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="fav-team" style={{ ["--tc" as never]: tc }}>{r.fav.label}</span>
      </td>
      <td>
        <div className={r.hot ? "pct hot" : "pct"}>
          {r.pct.toFixed(1)}%
          <span className="bar-mini" style={{ ["--w" as never]: `${Math.round(r.pct)}%` }} />
        </div>
      </td>
      <td>
        <div className="streak-cell">
          <span className={r.streak.cold ? "badge cold" : "badge"}>{r.streak.label}</span>
        </div>
      </td>
      <td>
        <div className={r.pts_gold ? "pts gold" : "pts"}>{r.pts}</div>
      </td>
    </tr>
  );
}

export default function RankingPage() {
  // /predict が Coming Soon につき本ページも 404 を返す。
  // 来季 2026-09 Mリーグ 2026-27 開幕で predict 本ローンチ時、この notFound() 行を削除して復活。
  notFound();
  return (
    <div className="wrap predict-page">
      <section className="rk-hero">
        <div className="crumb">
          <Link href="/predict">予想</Link>
          <span className="sep">›</span>
          <span style={{ color: "var(--paper)" }}>SEASON RANKING</span>
        </div>
        <div className="top">
          <h1>
            シーズンランキング
            <span className="en">Season 2025–26 · Standings</span>
          </h1>
          <div className="meta">
            <div>
              <div className="l">参加者</div>
              <div className="v">5,287<span style={{ fontSize: 13, fontFamily: "Noto Sans JP, sans-serif", color: "rgba(235,228,210,.6)", fontWeight: 500, marginLeft: 3 }}>人</span></div>
              <div className="sub">+128 今週新規</div>
            </div>
            <div>
              <div className="l">消化試合</div>
              <div className="v">38<span style={{ fontSize: 14, color: "rgba(235,228,210,.6)", marginLeft: 3 }}>/80</span></div>
              <div className="sub">残42試合</div>
            </div>
            <div>
              <div className="l">首位獲得pt</div>
              <div className="v gold">8,920<span style={{ fontSize: 13, color: "rgba(235,228,210,.6)", marginLeft: 3 }}>pt</span></div>
              <div className="sub">的中率 71.8%</div>
            </div>
          </div>
        </div>
      </section>

      <div className="filter-bar">
        <div className="group">
          <span className="l">期間</span>
          <div className="pills">
            <span className="pill">日</span>
            <span className="pill">週</span>
            <span className="pill">月</span>
            <span className="pill on">シーズン通算</span>
          </div>
        </div>
        <div className="vsep" />
        <div className="group">
          <span className="l">対象</span>
          <div className="pills">
            <span className="pill on">全員</span>
            <span className="pill">フォロー中</span>
            <span className="pill">推し雀士共有</span>
          </div>
        </div>
        <div className="vsep" />
        <div className="group">
          <span className="l">並び</span>
          <div className="pills">
            <span className="pill on">PT順</span>
            <span className="pill">的中率順</span>
            <span className="pill">連続的中</span>
          </div>
        </div>
        <div className="search-i">⌕ ユーザー名 / @handle で検索<span className="kbd">⌘F</span></div>
      </div>

      <article className="leader-frame">
        <div className="vert">
          <div className="text-vert">首位</div>
          <div className="small">No.1</div>
        </div>
        <div className="portrait"><div className="face-big">紅</div></div>
        <div className="info">
          <div className="x-handle">
            <span className="v">𝕏</span>@kurenai_pai · 認証済み
          </div>
          <h2>
            紅雀
            <span className="en">Kurenai · Reigning Champion</span>
          </h2>
          <div className="quote">
            「データだけでは勝てない。雀士の<b>気配</b>を見て予想する」<br />
            <span style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10.5, color: "var(--ink-3)", letterSpacing: "0.08em", fontWeight: 600, fontStyle: "normal" }}>— 04/24 第111戦的中時 X投稿より</span>
          </div>
          <div className="badge-row">
            <span className="b dark">7週連続 1位</span>
            <span className="b gold">12連続的中（歴代1位）</span>
            <span className="b">ALL TIME #2</span>
            <span className="b">推し: 多井隆晴</span>
          </div>
        </div>
        <div className="stats-stack">
          <div className="row"><div className="l">通算ポイント</div><div className="v gold">8,920<span className="u">pt</span></div></div>
          <div className="row"><div className="l">的中率</div><div className="v">71.8<span className="u">%</span></div></div>
          <div className="row"><div className="l">38戦</div><div className="v red">27<span className="u">中</span></div></div>
          <div className="row"><div className="l">2位との差</div><div className="v">+1,240<span className="u">pt</span></div></div>
        </div>
      </article>

      <div className="rk-table">
        <div className="head-row">
          <h3>TOP 100<span className="en">2,847pt 以上</span></h3>
          <div className="ct">表示中 <b>1–24</b> / 100 · 4/27 18:33 更新</div>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: 70 }}>順位</th>
              <th>ユーザー</th>
              <th style={{ width: 130 }}>推しチーム</th>
              <th className="right" style={{ width: 130 }}>的中率</th>
              <th className="right" style={{ width: 100 }}>連続</th>
              <th className="right" style={{ width: 110 }}>通算PT</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => <RankRow key={r.rank} r={r} />)}
            <tr className="gap-row">
              <td colSpan={6}>
                <span className="dots">·····</span>11位 〜 1,233位 (全表示)<span className="dots">·····</span>
              </td>
            </tr>
            {ROWS_NEAR_YOU.map((r) => <RankRow key={r.rank} r={r} />)}
            <tr className="gap-row">
              <td colSpan={6}>
                <span className="dots">·····</span>残り 4,051人 (続きを見る →)<span className="dots">·····</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="you-fixed">
        <div className="inner">
          <div className="lbl-strip">
            あなたの順位<b>YOUR STANDING</b>
          </div>
          <div className="me">
            <div className="ava">高</div>
            <div className="nm">
              高宮 まり
              <small>@takamiya_fan · ABEMASファン</small>
            </div>
          </div>
          <div className="stat">
            <div className="l">通算PT</div>
            <div className="v gold">2,847</div>
          </div>
          <div className="stat">
            <div className="l">的中率</div>
            <div className="v">38.2%</div>
          </div>
          <div className="gap-pos">
            <h3>#1,234<small>／5,287人中</small></h3>
          </div>
          <div className="next-rank">
            上位 <b>+1</b> まで<br />
            <b>+5pt</b> で順位up
          </div>
          <Link href="/predict/me" style={{ padding: "12px 18px", background: "var(--vermilion)", color: "var(--paper)", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 14, border: "2px solid var(--paper)", textDecoration: "none" }}>
            マイページ ▸
          </Link>
        </div>
      </div>
    </div>
  );
}
