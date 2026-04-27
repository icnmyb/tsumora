import Link from "next/link";
import type { Metadata } from "next";
import "./predict.css";
import { getPlayer } from "@/app/players/data";
import { getTeamBySlug } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "Hora.mg — Mリーグ予想ゲーム",
  description:
    "Mリーグ全80試合の1着を予想して、シーズンランキング上位を目指せ。所要時間5秒、利用は完全無料。",
};

type CardState = "upcoming" | "predicted" | "live" | "done-hit" | "done-miss";

interface MatchPlayer {
  playerId: string;
  teamSlug: string;
  monogram: string;
  // optional in-progress / final score
  pt?: string;
  rk?: number;
  lead?: boolean;
}

interface Match {
  no: number;
  section: string;
  startsAt: string;
  startLabel: string;
  channel: string;
  state: CardState;
  countdown?: string;
  liveInfo?: { east: string; honba: string; remaining: string; elapsed: string };
  players: MatchPlayer[];
  predictedPlayerId?: string;
  predictedTile?: string;
  resultPick?: string;
  actualWinner?: string;
  reward?: string;
  rewardNote?: string;
}

const TODAY_MATCHES: Match[] = [
  {
    no: 112,
    section: "第3節 · 第1試合",
    startsAt: "19:00 JST",
    startLabel: "19:00開始",
    channel: "配信 · ABEMA",
    state: "upcoming",
    countdown: "00h26m38s",
    players: [
      { playerId: "taii", teamSlug: "abemas", monogram: "多" },
      { playerId: "suzuki-y", teamSlug: "pirates", monogram: "鈴" },
      { playerId: "kayamori", teamSlug: "phoenix", monogram: "茅" },
      { playerId: "uchikawa", teamSlug: "furinkazan", monogram: "内" },
    ],
  },
  {
    no: 113,
    section: "第3節 · 第2試合",
    startsAt: "21:00 JST",
    startLabel: "21:00開始",
    channel: "配信 · ABEMA",
    state: "predicted",
    countdown: "02h26m38s",
    predictedPlayerId: "setokuma",
    predictedTile: "中",
    players: [
      { playerId: "sasaki", teamSlug: "konami", monogram: "佐" },
      { playerId: "setokuma", teamSlug: "raiden", monogram: "瀬" },
      { playerId: "sonoda", teamSlug: "drivens", monogram: "園" },
      { playerId: "okada", teamSlug: "sakura-knights", monogram: "岡" },
    ],
  },
];

const DEMO_LIVE_AND_DONE: Match[] = [
  {
    no: 112,
    section: "東4局 · 親 多井",
    startsAt: "",
    startLabel: "",
    channel: "ABEMA",
    state: "live",
    liveInfo: { east: "東 4 局", honba: "本場 1", remaining: "残2局", elapsed: "経過 1:24:18 / 配信中" },
    predictedPlayerId: "taii",
    predictedTile: "中",
    players: [
      { playerId: "taii", teamSlug: "abemas", monogram: "多", rk: 1, pt: "+38,200", lead: true },
      { playerId: "suzuki-y", teamSlug: "pirates", monogram: "鈴", rk: 2, pt: "+12,400" },
      { playerId: "kayamori", teamSlug: "phoenix", monogram: "茅", rk: 3, pt: "−14,800" },
      { playerId: "uchikawa", teamSlug: "furinkazan", monogram: "内", rk: 4, pt: "−35,800" },
    ],
  },
  {
    no: 111,
    section: "第2節 · 4/24 19:00",
    startsAt: "",
    startLabel: "",
    channel: "",
    state: "done-hit",
    resultPick: "多井",
    actualWinner: "多井 1着",
    reward: "+150pt",
    rewardNote: "的中 · 少数派+50",
    players: [
      { playerId: "taii", teamSlug: "abemas", monogram: "多", rk: 1, pt: "+58.2" },
      { playerId: "sonoda", teamSlug: "drivens", monogram: "園", rk: 2, pt: "+12.4" },
      { playerId: "setokuma", teamSlug: "raiden", monogram: "瀬", rk: 3, pt: "−18.8" },
      { playerId: "katsumata", teamSlug: "furinkazan", monogram: "勝", rk: 4, pt: "−51.8" },
    ],
  },
];

const TRENDING = [
  { rk: 1, playerId: "taii", note: "ABEMAS · 第112戦", pct: "52.4%", hot: true },
  { rk: 2, playerId: "setokuma", note: "雷電 · 第113戦", pct: "38.7%" },
  { rk: 3, playerId: "kayamori", note: "PHOENIX · 第112戦", pct: "22.1%" },
  { rk: 4, playerId: "sonoda", note: "DRIVENS · 第113戦", pct: "18.5%" },
  { rk: 5, playerId: "okada", note: "サクラナイツ · 第113戦", pct: "14.2%" },
  { rk: 6, playerId: "suzuki-y", note: "PIRATES · 第112戦", pct: "11.0%" },
  { rk: 7, playerId: "sasaki", note: "格闘倶楽部 · 第113戦", pct: "9.4%" },
];

const FOLLOWING = [
  { playerId: "taii", note: "今日 19:00 出場", state: "LIVE" as const },
  { playerId: "setokuma", note: "今日 21:00 出場", state: "2h" as const },
  { playerId: "okada", note: "今日 21:00 出場", state: "2h" as const },
];

function teamColorFromSlug(slug: string): string {
  return getTeamBySlug(slug)?.color ?? "#0b0b09";
}

function teamCodeFromSlug(slug: string): string {
  switch (slug) {
    case "abemas": return "A";
    case "pirates": return "P";
    case "phoenix": return "F";
    case "furinkazan": return "風";
    case "konami": return "格";
    case "raiden": return "雷";
    case "drivens": return "D";
    case "sakura-knights": return "桜";
    case "beast-x": return "X";
    case "earth-jets": return "E";
    default: return "—";
  }
}

function teamShortLabelFromSlug(slug: string): string {
  switch (slug) {
    case "abemas": return "ABEMAS";
    case "pirates": return "PIRATES";
    case "phoenix": return "PHOENIX";
    case "furinkazan": return "風林火山";
    case "konami": return "格闘倶楽部";
    case "raiden": return "雷電";
    case "drivens": return "DRIVENS";
    case "sakura-knights": return "サクラナイツ";
    case "beast-x": return "BEAST X";
    case "earth-jets": return "EARTH JETS";
    default: return slug;
  }
}

function ClockDisplay({ value }: { value: string }) {
  // value: "00h26m38s" → render "00 h 26 m 38 s" with .unit spans
  const m = value.match(/^(\d+)h(\d+)m(\d+)s$/);
  if (!m) return <div className="clock">{value}</div>;
  return (
    <div className="clock">
      {m[1]}<span className="unit">h</span>
      {m[2]}<span className="unit">m</span>
      {m[3]}<span className="unit">s</span>
    </div>
  );
}

function PlayerCell({ p }: { p: MatchPlayer }) {
  const player = getPlayer(p.playerId);
  const name = player?.name ?? p.playerId;
  const org = player?.org ?? "";
  const tc = teamColorFromSlug(p.teamSlug);
  const teamCode = teamCodeFromSlug(p.teamSlug);
  const teamLabel = teamShortLabelFromSlug(p.teamSlug);
  const isLead = !!p.lead;
  const cls = ["pl"];
  if (p.rk === 1) cls.push("r1");
  return (
    <div className={cls.join(" ")} style={{ ["--tc" as never]: tc }}>
      <div className="team-bar" />
      {p.rk !== undefined && <div className="rk">{p.rk}</div>}
      <div className="face">
        {p.monogram}
        <div className="team-pin">{teamCode}</div>
      </div>
      <div className="nm">{name}</div>
      <div className="team">{teamLabel}</div>
      {!p.pt && <div className="org">{org}</div>}
      {p.pt && <div className={isLead ? "pt lead" : "pt"}>{p.pt}</div>}
    </div>
  );
}

function MatchCard({ m }: { m: Match }) {
  const predictedPlayer = m.predictedPlayerId ? getPlayer(m.predictedPlayerId) : undefined;
  const predictedSubtitle =
    m.state === "live"
      ? "● 現在1位 · 的中可能性HIGH"
      : predictedPlayer?.title
        ? `● ${teamShortLabelFromSlug(m.players.find((p) => p.playerId === m.predictedPlayerId)?.teamSlug ?? "")} · ${predictedPlayer.title}`
        : `● ${teamShortLabelFromSlug(m.players.find((p) => p.playerId === m.predictedPlayerId)?.teamSlug ?? "")}`;

  return (
    <article className="match-card">
      <div className="top-bar">
        <span className="gm-no">第<span className="em">{m.no}</span>戦</span>
        <span className="sep">／</span>
        <span className="info">{m.section}</span>
        {m.state === "live" && <span className="stat live">LIVE</span>}
        {m.state === "upcoming" && <span className="stat upcoming">{m.startLabel}</span>}
        {(m.state === "done-hit" || m.state === "done-miss") && <span className="stat done">終了</span>}
        {m.state === "predicted" && <span className="stat upcoming">{m.startLabel}</span>}
      </div>

      {(m.state === "upcoming" || m.state === "predicted") && m.countdown && (
        <div className="countdown">
          <span className="label">予想締切まで</span>
          <ClockDisplay value={m.countdown} />
          <div className="meta">
            <div className="start">{m.startsAt}</div>
            <div className="ch">{m.channel}</div>
          </div>
        </div>
      )}

      {m.state === "live" && m.liveInfo && (
        <div className="live-status">
          <div className="east-info">
            {m.liveInfo.east}<small>{m.liveInfo.honba} · {m.liveInfo.remaining}</small>
          </div>
          <div className="progress-time">{m.liveInfo.elapsed}</div>
          <span className="ch-tag">▶ {m.channel}</span>
        </div>
      )}

      <div className="players-grid">
        {m.players.map((p) => <PlayerCell key={p.playerId} p={p} />)}
      </div>

      <div className="cta-zone">
        {m.state === "upcoming" && (
          <>
            <button className="btn-predict">
              <span className="arrow">▸</span>1着を予想する
              <span className="en">PREDICT</span>
            </button>
            <div className="stake-badge">
              <small>BASIC</small>
              <b>+100pt</b>
            </div>
          </>
        )}
        {m.state === "predicted" && predictedPlayer && (
          <div className="predicted">
            <span className="lbl">あなたの予想</span>
            <div className="pick">
              <div className="tile-pick">{m.predictedTile ?? "予"}</div>
              <div className="nm">
                {predictedPlayer.name}
                <small>{predictedSubtitle}</small>
              </div>
            </div>
            <span className="change">変更</span>
          </div>
        )}
        {m.state === "live" && predictedPlayer && (
          <div className="predicted live">
            <span className="lbl">あなたの予想</span>
            <div className="pick">
              <div className="tile-pick">{m.predictedTile ?? "予"}</div>
              <div className="nm">
                {predictedPlayer.name}
                <small>{predictedSubtitle}</small>
              </div>
            </div>
            <span className="change">▶ 視聴</span>
          </div>
        )}
        {m.state === "done-hit" && m.resultPick && m.actualWinner && (
          <div className="result-badge hit">
            <span className="lbl">予想</span>
            <span className="pick">{m.resultPick}</span>
            <span className="vs-arrow">⇢</span>
            <span className="lbl">結果</span>
            <span className="actual">{m.actualWinner}</span>
            <div className="reward">
              <div className="pts">{m.reward}</div>
              <div className="lbl-r">{m.rewardNote}</div>
            </div>
          </div>
        )}
        {m.state === "done-miss" && m.resultPick && m.actualWinner && (
          <div className="result-badge miss">
            <span className="lbl">予想</span>
            <span className="pick">{m.resultPick}</span>
            <span className="vs-arrow">⇢</span>
            <span className="lbl">結果</span>
            <span className="actual">{m.actualWinner}</span>
            <div className="reward">
              <div className="pts">{m.reward}</div>
              <div className="lbl-r">{m.rewardNote}</div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

function TrendingRow({
  rk,
  playerId,
  note,
  pct,
  hot,
  isFollow,
  state,
}: {
  rk: number | string;
  playerId: string;
  note: string;
  pct?: string;
  hot?: boolean;
  isFollow?: boolean;
  state?: "LIVE" | "2h";
}) {
  const player = getPlayer(playerId);
  const cls = ["tr-row"];
  if (rk === 1 || rk === "★") cls.push("r1");
  return (
    <div className={cls.join(" ")}>
      <div className="rk">{rk}</div>
      <div className="nm">
        {player?.name ?? playerId}
        <small>{note}</small>
      </div>
      {pct && !state && <div className={hot ? "pct hot" : "pct"}>{pct}</div>}
      {state === "LIVE" && <div className="pct hot">LIVE</div>}
      {state === "2h" && <div className="pct gold">2h</div>}
      {isFollow && !pct && !state && <div className="pct">—</div>}
    </div>
  );
}

export default function PredictHomePage() {
  return (
    <div className="wrap predict-page">
      {/* GAME HERO */}
      <section className="game-hero">
        <div className="top-row">
          <div className="brand">
            <div className="logo-row">
              <span className="logo">Hora<span className="dot">.</span>mg</span>
              <span className="tagline">Mリーグ予想ゲーム</span>
            </div>
            <h1>
              今日も、和了る。
              <span className="en">Predict who wins. Earn points.</span>
            </h1>
          </div>
          <div className="my-stats">
            <div className="s">
              <div className="l">Total</div>
              <div className="v gold">2,847<span className="u">pt</span></div>
              <div className="sub">+128 今週</div>
            </div>
            <div className="s">
              <div className="l">的中率</div>
              <div className="v">38.2<span className="u">%</span></div>
              <div className="sub">42戦16中</div>
            </div>
            <div className="s">
              <div className="l">連続的中</div>
              <div className="v red">3<span className="u">戦</span></div>
              <div className="sub">継続中</div>
            </div>
            <div className="s">
              <div className="l">順位</div>
              <div className="v">#1,234</div>
              <div className="sub">／5,287人中</div>
            </div>
          </div>
        </div>
        <div className="you">
          <div className="ava">高</div>
          <div className="name">
            高宮まり
            <small>@takamiya_fan · since 2024</small>
          </div>
          <div className="pts">本日獲得可能 <b>最大 +200pt</b></div>
        </div>
      </section>

      <div className="main-grid">
        <div>
          {/* TODAY MATCHES */}
          <div className="sec-head">
            <span className="num">01</span>
            <h2>本日の対局<span className="en">Today · Mon, Apr 27</span></h2>
            <div className="right">
              <span className="live">予想受付中</span> · 締切まで{" "}
              <b style={{ fontFamily: "Geist Mono, ui-monospace, monospace", color: "var(--ink)" }}>26:38</b>
            </div>
          </div>
          <div className="matches-row">
            {TODAY_MATCHES.map((m) => <MatchCard key={m.no} m={m} />)}
          </div>

          {/* INFO STRIP */}
          <div className="info-strip">
            <div className="ic">
              <div className="label">獲得pt仕組み</div>
              <h3>1着的中で +100pt</h3>
              <p>少数派予想ボーナス +50pt、5戦連続的中で +200pt。配信視聴中の予想は獲得2倍。</p>
              <span className="arrow">仕組みを見る →</span>
            </div>
            <div className="ic">
              <div className="label">推し雀士</div>
              <h3>多井さんが今日登場</h3>
              <p>あなたがフォロー中の選手のうち、本日試合があるのは2名。通知ベルでお知らせ。</p>
              <span className="arrow">フォロー一覧 →</span>
            </div>
            <div className="ic">
              <div className="label">シェア</div>
              <h3>X連携で2倍ptキャンペーン</h3>
              <p>予想と一緒に「#ホラMG」をXに投稿すると、的中時の獲得ptが2倍に。</p>
              <span className="arrow">設定する →</span>
            </div>
          </div>

          {/* DEMO: LIVE / DONE */}
          <div className="sec-head" style={{ marginTop: 32 }}>
            <span className="num">02</span>
            <h2>試合中・終了の表示<span className="en">In-progress / Final</span></h2>
            <div className="right">締切後 · 順位の動きをリアルタイム表示</div>
          </div>
          <div className="matches-row">
            {DEMO_LIVE_AND_DONE.map((m) => <MatchCard key={m.no + "-" + m.state} m={m} />)}
          </div>

          {/* LOGGED OUT */}
          <div className="sec-head" style={{ marginTop: 32 }}>
            <span className="num">03</span>
            <h2>未ログイン状態<span className="en">Guest View</span></h2>
          </div>
          <div className="logged-out-card">
            <div className="lo-icon">遊</div>
            <div className="lo-text">
              <h3>予想ゲームに参加するには Xでログイン</h3>
              <p>Mリーグ全80試合の1着を予想して、シーズンランキング上位を目指せ。<br />所要時間 5秒、利用は完全無料。</p>
            </div>
            <button className="lo-cta">
              <span className="x">𝕏</span>Xでログイン
            </button>
          </div>

          {/* QUICK LINKS */}
          <div className="quick-grid">
            <Link href="/predict#predict"><div className="lbl">02 / 予想する</div><h4>予想モーダル</h4><p>1試合詳細＋分布</p></Link>
            <Link href="/predict#mypage"><div className="lbl">03 / マイページ</div><h4>あなたの履歴</h4><p>成績と推し雀士</p></Link>
            <Link href="/predict#ranking"><div className="lbl">04 / ランキング</div><h4>シーズン順位</h4><p>TOP100 + 自分</p></Link>
            <Link href="/predict#result"><div className="lbl">05 / 試合結果</div><h4>結果詳細</h4><p>分布と的中者</p></Link>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="trending-side">
            <h3>本日の予想トレンド<span className="en">Trending</span></h3>
            {TRENDING.map((r) => (
              <TrendingRow key={r.rk} rk={r.rk} playerId={r.playerId} note={r.note} pct={r.pct} hot={r.hot} />
            ))}
          </div>

          <div className="trending-side">
            <h3>推し雀士<span className="en">Following · 3/5</span></h3>
            {FOLLOWING.map((r) => (
              <TrendingRow key={r.playerId} rk="★" playerId={r.playerId} note={r.note} state={r.state} isFollow />
            ))}
            <div style={{
              textAlign: "center", padding: "14px 0 4px",
              fontFamily: "Geist Mono, ui-monospace, monospace",
              fontSize: 10.5, letterSpacing: "0.1em",
              color: "var(--ink-3)", fontWeight: 600,
            }}>
              <span style={{ borderBottom: "1px dotted var(--ink-3)", cursor: "pointer" }}>+ 推し雀士を追加 (残2)</span>
            </div>
          </div>

          <div className="trending-side">
            <h3>シーズン展望<span className="en">2025-26</span></h3>
            <div className="season-prog">
              残り <b>42試合</b><br />
              ファイナル進出ライン <b className="mono">+340pt</b><br />
              あなたとの差 <b className="mono red">−192pt</b>
            </div>
            <div className="season-bar">
              <div className="fill" style={{ width: "47%" }} />
              <div className="marker" style={{ left: "78%" }} />
            </div>
            <div className="season-axis">
              <span>0</span>
              <span className="you">あなた 47%</span>
              <span>FINAL</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
