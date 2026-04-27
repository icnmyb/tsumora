import Link from "next/link";
import type { Metadata } from "next";
import "../../predict.css";
import { getPlayer } from "@/app/players/data";
import { getTeamBySlug } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "試合結果 — Hora.mg",
  description: "Mリーグ試合の結果ページ。順位表・ファンの予想分布・的中ユーザーリスト。",
};

interface StandingPlayer {
  rank: number;
  rankLabel?: string;
  playerId: string;
  teamSlug: string;
  monogram: string;
  highlight: string;
  highlightDetail: string;
  raw: string;
  uma: string;
  umaUp?: boolean;
  pred: number;
}

const STANDINGS: StandingPlayer[] = [
  { rank: 1, rankLabel: "winner", playerId: "taii", teamSlug: "abemas", monogram: "多",
    highlight: "RMU所属 · ABEMAS · 鳳凰位", highlightDetail: "役満 / 国士無双（東2局）+48,000",
    raw: "+58,200", uma: "78.2pt", umaUp: true, pred: 52.4 },
  { rank: 2, playerId: "sonoda", teamSlug: "drivens", monogram: "園",
    highlight: "最高位戦 · DRIVENS", highlightDetail: "南3局 1,000-2,000 2着確定",
    raw: "+12,400", uma: "22.4pt", umaUp: true, pred: 18.5 },
  { rank: 3, playerId: "setokuma", teamSlug: "raiden", monogram: "瀬",
    highlight: "連盟 · 雷電 · 鳳凰位", highlightDetail: "東2局 国士無双 直撃 −24,000",
    raw: "−18,800", uma: "−8.8pt", pred: 14.5 },
  { rank: 4, playerId: "katsumata", teamSlug: "furinkazan", monogram: "勝",
    highlight: "連盟 · 風林火山", highlightDetail: "南4局 大三元放銃 −32,000",
    raw: "−51,800", uma: "−81.8pt", pred: 14.6 },
];

const HITTERS: { rank: string; mono: string; name: string; sub: string; bonus: { label: string; variant?: "gold" | "x" | "minor" }; pts: string; isYou?: boolean }[] = [
  { rank: "1", mono: "紅", name: "紅雀", sub: "@kurenai_pai · 通算8,920pt", bonus: { label: "12連続的中", variant: "gold" }, pts: "340" },
  { rank: "2", mono: "蒼", name: "蒼天", sub: "@aozora_pai", bonus: { label: "8連続" }, pts: "300" },
  { rank: "…", mono: "高", name: "高宮 まり", sub: "@takamiya_fan · YOU", bonus: { label: "𝕏 連携2倍", variant: "x" }, pts: "280", isYou: true },
  { rank: "…", mono: "飛", name: "飛龍", sub: "@hiryu_mleague · 推し: 多井", bonus: { label: "5連続" }, pts: "200" },
  { rank: "…", mono: "月", name: "月見草", sub: "@tsukimi_so", bonus: { label: "推し的中" }, pts: "150" },
  { rank: "…", mono: "珈", name: "珈琲党", sub: "@coffee_jong", bonus: { label: "基本のみ", variant: "minor" }, pts: "100" },
  { rank: "…", mono: "雷", name: "雷光", sub: "@raikou1992", bonus: { label: "基本のみ", variant: "minor" }, pts: "100" },
];

function teamColorFromSlug(slug: string): string {
  return getTeamBySlug(slug)?.color ?? "#0b0b09";
}

function StandingRow({ p }: { p: StandingPlayer }) {
  const player = getPlayer(p.playerId);
  const tc = teamColorFromSlug(p.teamSlug);
  const cls = ["row"];
  if (p.rank === 1) cls.push("r1");
  return (
    <div className={cls.join(" ")}>
      <div className="rk">
        {p.rank}
        {p.rankLabel && <small>{p.rankLabel}</small>}
      </div>
      <div className="face" style={{ ["--tc" as never]: tc }}>{p.monogram}</div>
      <div className="player-info">
        <div className="nm">{player?.name ?? p.playerId}</div>
        <div className="meta">{p.highlight}<br />{p.highlightDetail}</div>
      </div>
      <div className="raw">{p.raw}</div>
      <div className={p.umaUp ? "uma up" : "uma"} style={p.umaUp ? undefined : { color: "var(--ink-3)" }}>{p.uma}</div>
      <div className="pred-pct">
        <div className="l">予想率</div>
        {p.pred.toFixed(1)}%
        <span className="bar" style={{ ["--tc" as never]: tc, ["--w" as never]: `${Math.round(p.pred)}%` }} />
      </div>
    </div>
  );
}

export default async function ResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const matchNo = id.replace(/[^0-9]/g, "") || "111";
  return (
    <div className="wrap predict-page">
      <section className="res-hero">
        <div className="crumb">
          <Link href="/predict">Hora.mg</Link>
          <span className="sep">›</span>
          <span style={{ color: "rgba(235,228,210,.6)" }}>試合結果</span>
          <span className="sep">›</span>
          <span style={{ color: "var(--paper)" }}>第{matchNo}戦</span>
        </div>
        <div className="top">
          <div className="gm-no">
            第<span className="em">{matchNo}</span>戦
            <small>第2節 第4試合 · FINAL</small>
          </div>
          <div className="info">
            <h1>
              多井 隆晴 が圧巻の1着
              <span className="en">Apr 24, 2026 · ABEMAS take game {matchNo}</span>
            </h1>
            <div className="meta-grid">
              <div><div className="l">日時</div><div className="v">04/24 19:00</div></div>
              <div><div className="l">配信</div><div className="v gold">ABEMA</div></div>
              <div>
                <div className="l">予想者</div>
                <div className="v">3,847<span style={{ fontSize: 12, fontFamily: "Noto Sans JP, sans-serif", color: "rgba(235,228,210,.6)", fontWeight: 500, marginLeft: 3 }}>人</span></div>
              </div>
              <div>
                <div className="l">的中者</div>
                <div className="v gold">2,016<span style={{ fontSize: 12, fontFamily: "Noto Sans JP, sans-serif", color: "rgba(235,228,210,.6)", fontWeight: 500, marginLeft: 3 }}>人 (52.4%)</span></div>
              </div>
            </div>
          </div>
          <div className="your-result">
            <div className="l">あなたの結果</div>
            <div className="pick-row">
              <div className="face-mini">多</div>
              <div className="nm">
                多井 隆晴
                <small>● 1着的中 · ABEMAS</small>
              </div>
            </div>
            <div className="reward">
              <div className="verdict hit">的中 ✓</div>
              <div className="pts up">280pt</div>
            </div>
          </div>
        </div>
      </section>

      <div className="standings-card">
        <div className="head">
          <h3>順位表<span className="en">Final Standings</span></h3>
          <div className="info">半荘1回戦 · 持ち点25,000 / 起家マーク 多井 · オカ20pt / ウマ10-30</div>
        </div>
        {STANDINGS.map((s) => <StandingRow key={s.playerId} p={s} />)}
      </div>

      <div className="dual">
        <div className="pie-card">
          <h3>ファンの予想分布<span className="en">Fan Predictions</span></h3>
          <div className="cap">予想者 <b>3,847人</b> · 多数派が的中（多井 1着 = 52.4%）</div>
          <div className="pie-row">
            <svg viewBox="0 0 200 200">
              {/* 多井 52.4% */}
              <path d="M 100 100 L 100 12 A 88 88 0 0 1 187.84 96.94 Z" fill="#d4af37" stroke="#0b0b09" strokeWidth="2.5" />
              <path d="M 100 100 L 187.84 96.94 A 88 88 0 0 1 91.42 187.55 Z" fill="#d4af37" stroke="#0b0b09" strokeWidth="2.5" />
              {/* 園田 18.5% */}
              <path d="M 100 100 L 91.42 187.55 A 88 88 0 0 1 16.78 137.32 Z" fill="#2f5c3f" stroke="#0b0b09" strokeWidth="2.5" />
              {/* 勝又 14.6% */}
              <path d="M 100 100 L 16.78 137.32 A 88 88 0 0 1 26.49 49.27 Z" fill="#c8282a" stroke="#0b0b09" strokeWidth="2.5" />
              {/* 瀬戸熊 14.5% */}
              <path d="M 100 100 L 26.49 49.27 A 88 88 0 0 1 100 12 Z" fill="#a07e28" stroke="#0b0b09" strokeWidth="2.5" />
              <circle cx="100" cy="100" r="38" fill="#ebe4d2" stroke="#0b0b09" strokeWidth="2.5" />
              <text x="100" y="96" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#5a564d" fontWeight="700" letterSpacing="0.1em">YOUR PICK</text>
              <text x="100" y="112" textAnchor="middle" fontFamily="Shippori Mincho" fontSize="16" fill="#c8282a" fontWeight="900">多井</text>
              <text x="100" y="6" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#0b0b09" fontWeight="700">52.4%</text>
            </svg>
            <div className="pie-legend">
              <div className="lg-row">
                <span className="swatch x" style={{ ["--c" as never]: "#d4af37" }} />
                <div className="nm you">多井 隆晴 <small>● ABEMAS · 1着</small></div>
                <div className="pct">52.4%<small>2,016人</small></div>
              </div>
              <div className="lg-row">
                <span className="swatch" style={{ ["--c" as never]: "#2f5c3f" }} />
                <div className="nm">園田 賢 <small>● DRIVENS · 2着</small></div>
                <div className="pct">18.5%<small>712人</small></div>
              </div>
              <div className="lg-row">
                <span className="swatch" style={{ ["--c" as never]: "#c8282a" }} />
                <div className="nm">勝又 健志 <small>● 風林火山 · 4着</small></div>
                <div className="pct">14.6%<small>561人</small></div>
              </div>
              <div className="lg-row">
                <span className="swatch" style={{ ["--c" as never]: "#a07e28" }} />
                <div className="nm">瀬戸熊 直樹 <small>● 雷電 · 3着</small></div>
                <div className="pct">14.5%<small>558人</small></div>
              </div>
            </div>
          </div>
        </div>

        <div className="hitters-card">
          <div className="head">
            <h3>予想を当てた人<span className="en">Hitters</span></h3>
            <div className="ct"><b>2,016</b>人 / 3,847</div>
          </div>
          {HITTERS.map((h, i) => {
            const cls = ["hit-row"];
            if (h.rank === "1") cls.push("r1");
            if (h.isYou) cls.push("you");
            return (
              <div key={i} className={cls.join(" ")}>
                <div className="rk">{h.rank}</div>
                <div className="ava">{h.mono}</div>
                <div className="nm">
                  {h.name}
                  <small>{h.sub}</small>
                </div>
                <span className={`bonus${h.bonus.variant ? ` ${h.bonus.variant}` : ""}`}>{h.bonus.label}</span>
                <div className="pts">{h.pts}</div>
              </div>
            );
          })}
          <div className="footer-cta">
            <span style={{ borderBottom: "1px dotted var(--ink-3)", paddingBottom: 1, color: "var(--ink)", cursor: "pointer" }}>2,016人すべて表示 →</span>
          </div>
        </div>
      </div>

      <div className="h2h">
        <div className="item">
          <div className="l">最大配当</div>
          <h4>+340pt · 紅雀</h4>
          <p>12連続的中ボーナス +200pt + X連携2倍 + 基本100pt</p>
        </div>
        <div className="item">
          <div className="l">少数派的中</div>
          <h4>大穴なし</h4>
          <p>多井1着は <b>多数派予想</b>。少数派ボーナス対象外</p>
        </div>
        <div className="item">
          <div className="l">役満発生</div>
          <h4>国士無双 (多井)</h4>
          <p>東2局 12巡目 瀬戸熊から直撃 +48,000 · 通算3度目</p>
        </div>
        <div className="item">
          <div className="l">あなたの順位推移</div>
          <h4>#1,242 → #1,234</h4>
          <p>+8 ランクアップ。次の試合で <b>+5pt</b> 獲得すれば1位up</p>
        </div>
      </div>

      <div className="share-bar">
        <div className="x-mark">𝕏</div>
        <div className="text">
          <h4>結果をXにシェアしよう</h4>
          <p>多井 隆晴 を1着予想 → 的中 ✓ +280pt 獲得！ #ホラMG #第{matchNo}戦 #Mリーグ</p>
        </div>
        <button className="cta">𝕏 で共有 ▸</button>
      </div>

      <div className="related-strip">
        <div className="head">
          <h3>関連試合<span className="en">Related Matches</span></h3>
          <div style={{ marginLeft: "auto", fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "var(--ink-3)", fontWeight: 600 }}>
            前後の対局 · あなたの予想結果と並べて
          </div>
        </div>
        <div className="related-grid">
          <Link href={`/predict/result/${parseInt(matchNo) - 1}`} className="rel-card">
            <div className="gm-tag prev">◂ 前の試合 · 第{parseInt(matchNo) - 1}戦</div>
            <h4>第3節 第3試合</h4>
            <div className="when">04/24 FRI 21:00 · 終了</div>
            <div className="lineup">
              <div className="pl-mini r1" style={{ ["--tc" as never]: "#2f5c3f" }}>園<small>1着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#c8282a" }}>勝<small>2着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#00b4cc" }}>鈴<small>3着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#ed7e2c" }}>茅<small>4着</small></div>
            </div>
            <div className="your-pred hit">あなたの予想：<b>園田賢 → 的中 +100pt</b></div>
          </Link>
          <Link href={`/predict/result/${matchNo}`} className="rel-card" style={{ background: "var(--paper-2)" }}>
            <div className="gm-tag now">● この試合 · 第{matchNo}戦</div>
            <h4>第2節 第4試合</h4>
            <div className="when">04/24 FRI 19:00 · 終了</div>
            <div className="lineup">
              <div className="pl-mini r1" style={{ ["--tc" as never]: "#d4af37" }}>多<small>1着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#2f5c3f" }}>園<small>2着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#a07e28" }}>瀬<small>3着</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#c8282a" }}>勝<small>4着</small></div>
            </div>
            <div className="your-pred hit">あなたの予想：<b style={{ color: "var(--vermilion)", fontWeight: 900 }}>多井隆晴 → 的中 +280pt</b></div>
          </Link>
          <Link href="/predict/match/112" className="rel-card">
            <div className="gm-tag next">次の試合 · 第112戦 ▸</div>
            <h4>第3節 第1試合</h4>
            <div className="when">04/27 MON 19:00 · 26分後 開始</div>
            <div className="lineup">
              <div className="pl-mini" style={{ ["--tc" as never]: "#d4af37" }}>多<small>?</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#00b4cc" }}>鈴<small>?</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#ed7e2c" }}>茅<small>?</small></div>
              <div className="pl-mini" style={{ ["--tc" as never]: "#c8282a" }}>内<small>?</small></div>
            </div>
            <div className="your-pred">予想する：<b>未投稿</b> · クリックして予想 →</div>
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 8, marginBottom: 40, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "var(--paper)", border: "var(--border)", boxShadow: "var(--shadow)" }}>
        <Link href="/predict" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>01 / ホーム</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>今日の対局へ</h4>
        </Link>
        <Link href="/predict/match/112" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>02 / 予想</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>第112戦の予想</h4>
        </Link>
        <Link href="/predict/me" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>03 / マイページ</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>あなたの履歴</h4>
        </Link>
        <Link href="/predict/ranking" style={{ padding: "16px 18px", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>04 / ランキング</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>シーズン順位</h4>
        </Link>
      </div>
    </div>
  );
}
