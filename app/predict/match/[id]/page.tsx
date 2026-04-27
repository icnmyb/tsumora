import Link from "next/link";
import type { Metadata } from "next";
import "../../predict.css";
import { getPlayer } from "@/app/players/data";
import { getTeamBySlug } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "予想投稿 — Hora.mg",
  description: "1試合の1着予想を投稿。ファンの予想分布をリアルタイムで確認しながら投票できる。",
};

interface PickerPlayer {
  playerId: string;
  teamSlug: string;
  monogram: string;
  pinLetter: string;
  pct: number;
  count: string;
  countLabel: string;
  formTags: { label: string; variant?: "hot" | "cold" }[];
  selected?: boolean;
}

const MATCH_PLAYERS: PickerPlayer[] = [
  {
    playerId: "taii",
    teamSlug: "abemas",
    monogram: "多",
    pinLetter: "A",
    pct: 52.4,
    count: "2,016",
    countLabel: "多数派",
    formTags: [
      { label: "HOT 連3勝", variant: "hot" },
      { label: "直近1着率 47%" },
    ],
    selected: true,
  },
  {
    playerId: "suzuki-y",
    teamSlug: "pirates",
    monogram: "鈴",
    pinLetter: "P",
    pct: 11.0,
    count: "423",
    countLabel: "大穴",
    formTags: [
      { label: "直近1着率 28%" },
      { label: "不調", variant: "cold" },
    ],
  },
  {
    playerId: "kayamori",
    teamSlug: "phoenix",
    monogram: "茅",
    pinLetter: "F",
    pct: 22.1,
    count: "850",
    countLabel: "中穴",
    formTags: [
      { label: "直近1着率 32%" },
      { label: "2連勝" },
    ],
  },
  {
    playerId: "uchikawa",
    teamSlug: "furinkazan",
    monogram: "内",
    pinLetter: "風",
    pct: 14.5,
    count: "558",
    countLabel: "中穴",
    formTags: [
      { label: "直近1着率 35%" },
      { label: "復帰戦" },
    ],
  },
];

function teamColorFromSlug(slug: string): string {
  return getTeamBySlug(slug)?.color ?? "#0b0b09";
}
function teamShortLabel(slug: string): string {
  switch (slug) {
    case "abemas": return "ABEMAS · 金";
    case "pirates": return "PIRATES · 青";
    case "phoenix": return "PHOENIX · 橙";
    case "furinkazan": return "風林火山 · 赤";
    default: return slug;
  }
}

function PickerCard({ p }: { p: PickerPlayer }) {
  const player = getPlayer(p.playerId);
  const tc = teamColorFromSlug(p.teamSlug);
  const cls = ["ppl"];
  if (p.selected) cls.push("selected");
  return (
    <div className={cls.join(" ")} style={{ ["--tc" as never]: tc }}>
      <div className="team-strip" />
      <div className="face-wrap">
        <div className="face">
          {p.monogram}
          <div className="team-pin">{p.pinLetter}</div>
        </div>
        <div className="nm">{player?.name ?? p.playerId}</div>
        <div className="team">{teamShortLabel(p.teamSlug)}</div>
        <div className="org">{player?.org ?? ""}所属</div>
      </div>
      <div className="form-info">
        {p.formTags.map((t) => (
          <span
            key={t.label}
            className={`form-tag${t.variant ? ` ${t.variant}` : ""}`}
          >
            {t.label}
          </span>
        ))}
      </div>
      <div className="pred-bar">
        <div className="row">
          <span>FANS</span>
          <span className="pct">
            {p.pct.toFixed(1)}
            <span style={{ fontSize: 13, fontWeight: 700, fontFamily: "Geist Mono, ui-monospace, monospace", marginLeft: 1 }}>%</span>
          </span>
        </div>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${p.pct}%` }} />
        </div>
        <div className="count">
          {p.count}人が予想 · {p.countLabel}
        </div>
      </div>
    </div>
  );
}

export default async function PredictMatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const matchNo = id.replace(/[^0-9]/g, "") || "112";
  return (
    <div className="wrap predict-page">
      <div style={{ padding: "20px 0 8px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <h1 style={{ margin: 0, fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 30, letterSpacing: "-0.025em" }}>
            予想投稿
            <span style={{ fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontWeight: 400, fontSize: 16, color: "var(--ink-3)", marginLeft: 10 }}>
              Step 02 · Submit Prediction
            </span>
          </h1>
        </div>
      </div>

      <article className="predict-frame">
        <div className="ph-head">
          <span className="crumb">
            予想ゲーム<span style={{ margin: "0 8px", opacity: 0.4 }}>›</span>
            <b>第{matchNo}戦 1着予想</b>
          </span>
          <span className="live-tag">予想受付中</span>
          <span className="timer">締切まで <b>00:26:38</b></span>
        </div>

        <div className="match-info">
          <div className="gm-no">
            第<span className="em">{matchNo}</span>戦
            <small>第3節 · 第1試合</small>
          </div>
          <div className="meta">
            <h2>ABEMAS × Pirates × Phoenix × 風林火山</h2>
            <p>2026.04.27 MON 19:00 JST · ABEMA配信 · 半荘1回戦 · 持ち点25,000</p>
          </div>
          <div className="stats">
            <div className="s">
              <div className="l">予想者</div>
              <div className="v">3,847<span style={{ fontSize: 11, color: "var(--ink-3)", fontFamily: "Noto Sans JP, sans-serif", fontWeight: 500 }}>人</span></div>
            </div>
            <div className="s">
              <div className="l">配当</div>
              <div className="v red">+100pt</div>
            </div>
          </div>
        </div>

        <div className="step-title">
          <span className="num">A</span>
          <h3>1着になる選手を選ぶ<span className="en">Pick the winner</span></h3>
          <span className="right">分布はリアルタイム · 30秒ごと更新</span>
        </div>

        <div className="picker">
          {MATCH_PLAYERS.map((p) => <PickerCard key={p.playerId} p={p} />)}
        </div>

        <div className="reward-block">
          <div className="col">
            <div className="l">基本配当</div>
            <div className="v">+100pt</div>
            <div className="breakdown" style={{ marginTop: 4 }}>1着的中で獲得</div>
          </div>
          <div className="arrow">⇢</div>
          <div className="col right">
            <div className="l">的中時 想定獲得</div>
            <div className="v big gold">
              +300<span style={{ fontSize: 14, fontFamily: "Noto Sans JP, sans-serif", fontWeight: 500, color: "rgba(235,228,210,.65)" }}>pt</span>
            </div>
            <div className="breakdown" style={{ textAlign: "left", minWidth: 240 }}>
              <div className="row"><span>基本配当</span><span>+100</span></div>
              <div className="row"><span>3連続ボーナス</span><span>+50</span></div>
              <div className="row bonus"><span>X連携 ×2</span><span>×2</span></div>
              <div className="row total"><span>合計 (100+50)×2</span><span>+300pt</span></div>
            </div>
          </div>
        </div>

        <div className="share-row">
          <div className="x-icon">𝕏</div>
          <div className="text">
            <h4>Xに自動投稿する</h4>
            <p>
              「多井隆晴 を1着予想しました <span className="preview">#ホラMG</span> #Mリーグ #第{matchNo}戦」を試合開始時に投稿。的中時の獲得ptが2倍に。
            </p>
          </div>
          <button className="toggle" aria-label="x-share-toggle" />
        </div>

        <div className="submit-bar">
          <Link href="/predict" className="ghost">キャンセル</Link>
          <span className="info">
            選択中 · <b>多井 隆晴</b> · 締切まで <b>26:38</b>
          </span>
          <button className="submit">
            <span className="arrow">▸</span>この予想を確定<span className="en">SUBMIT</span>
          </button>
        </div>
      </article>

      <div style={{ marginTop: 24, marginBottom: 40, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "var(--paper)", border: "var(--border)", boxShadow: "var(--shadow)" }}>
        <Link href="/predict" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>01 / ホーム</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>今日の対局</h4>
        </Link>
        <Link href="/predict/me" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>03 / マイページ</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>あなたの履歴</h4>
        </Link>
        <Link href="/predict/ranking" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>04 / ランキング</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>シーズン順位</h4>
        </Link>
        <Link href={`/predict/result/${matchNo}`} style={{ padding: "16px 18px", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>05 / 結果</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>結果ページ</h4>
        </Link>
      </div>
    </div>
  );
}
