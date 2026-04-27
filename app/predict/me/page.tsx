import Link from "next/link";
import type { Metadata } from "next";
import "../predict.css";
import { getPlayer } from "@/app/players/data";
import { getTeamBySlug } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "マイページ — Hora.mg",
  description: "予想履歴・累計成績・推し雀士のフォロー一覧。",
};

interface HistoryRow {
  date: string;
  dayLabel: string;
  matchNo: string;
  matchSection: string;
  pickedId: string;
  teamSlug: string;
  monogram: string;
  pickedNote: string;
  status: "live" | "pending" | "hit" | "miss";
  actualNote?: string;
  pts: string;
  ptsClass: "up" | "zero" | "live";
  rowClass?: string;
}

const HISTORY: HistoryRow[] = [
  {
    date: "04/27", dayLabel: "MON 19:00",
    matchNo: "第112戦", matchSection: "第3節 1試合",
    pickedId: "taii", teamSlug: "abemas", monogram: "多",
    pickedNote: "● ABEMAS · 1着率 47%",
    status: "live", pts: "+300予", ptsClass: "live", rowClass: "live",
  },
  {
    date: "04/27", dayLabel: "MON 21:00",
    matchNo: "第113戦", matchSection: "第3節 2試合",
    pickedId: "setokuma", teamSlug: "raiden", monogram: "瀬",
    pickedNote: "● 雷電 · 鳳凰位",
    status: "pending", pts: "−", ptsClass: "zero",
  },
  {
    date: "04/24", dayLabel: "FRI 19:00",
    matchNo: "第111戦", matchSection: "第2節 4試合",
    pickedId: "taii", teamSlug: "abemas", monogram: "多",
    pickedNote: "● ABEMAS · X連携2倍",
    status: "hit", actualNote: "多井 1着", pts: "300", ptsClass: "up",
  },
  {
    date: "04/24", dayLabel: "FRI 21:00",
    matchNo: "第110戦", matchSection: "第2節 3試合",
    pickedId: "sonoda", teamSlug: "drivens", monogram: "園",
    pickedNote: "● DRIVENS",
    status: "hit", actualNote: "園田 1着", pts: "100", ptsClass: "up",
  },
  {
    date: "04/23", dayLabel: "THU 19:00",
    matchNo: "第109戦", matchSection: "第2節 2試合",
    pickedId: "suzuki-y", teamSlug: "pirates", monogram: "鈴",
    pickedNote: "● PIRATES",
    status: "hit", actualNote: "鈴木 1着", pts: "100", ptsClass: "up",
  },
  {
    date: "04/23", dayLabel: "THU 21:00",
    matchNo: "第108戦", matchSection: "第2節 1試合",
    pickedId: "okada", teamSlug: "sakura-knights", monogram: "岡",
    pickedNote: "● サクラナイツ",
    status: "miss", actualNote: "瀬戸熊 1着", pts: "0", ptsClass: "zero",
  },
  {
    date: "04/21", dayLabel: "TUE 19:00",
    matchNo: "第107戦", matchSection: "第1節 4試合",
    pickedId: "taii", teamSlug: "abemas", monogram: "多",
    pickedNote: "● ABEMAS",
    status: "miss", actualNote: "茅森 1着", pts: "0", ptsClass: "zero",
  },
  {
    date: "04/21", dayLabel: "TUE 21:00",
    matchNo: "第106戦", matchSection: "第1節 3試合",
    pickedId: "katsumata", teamSlug: "furinkazan", monogram: "勝",
    pickedNote: "● 風林火山",
    status: "hit", actualNote: "勝又 1着", pts: "100", ptsClass: "up",
  },
];

const FOLLOWING: { id: string; teamSlug: string; mono: string; meta: string; pts: string; status: "live" | "upcoming"; statusLabel: string }[] = [
  { id: "taii", teamSlug: "abemas", mono: "多", meta: "RMU · ABEMAS · 鳳凰位", pts: "+540pt", status: "live", statusLabel: "19:00出場" },
  { id: "setokuma", teamSlug: "raiden", mono: "瀬", meta: "連盟 · 雷電", pts: "+180pt", status: "upcoming", statusLabel: "21:00出場" },
  { id: "okada", teamSlug: "sakura-knights", mono: "岡", meta: "協会 · サクラナイツ", pts: "+100pt", status: "upcoming", statusLabel: "21:00出場" },
];

const BADGES = [
  { icon: "和", lbl: "初的中", state: "unlocked red" as const },
  { icon: "三", lbl: "3連続", state: "unlocked gold" as const },
  { icon: "十", lbl: "10戦達成", state: "unlocked" as const },
  { icon: "百", lbl: "100pt", state: "unlocked" as const },
  { icon: "推", lbl: "推し的中", state: "unlocked" as const },
  { icon: "穴", lbl: "大穴的中", state: "unlocked" as const },
  { icon: "𝕏", lbl: "X連携", state: "unlocked" as const },
  { icon: "五", lbl: "5連続", state: "locked" as const },
  { icon: "千", lbl: "1000pt", state: "locked" as const },
  { icon: "百", lbl: "100戦", state: "locked" as const },
  { icon: "王", lbl: "月間王", state: "locked" as const },
  { icon: "?", lbl: "隠し", state: "locked" as const },
];

const NOTIFICATIONS = [
  { ts: "▲ 18:33 · 25分前", html: <><b style={{ fontFamily: "Shippori Mincho, serif", fontWeight: 900 }}>多井 隆晴</b> が 19:00 試合に出場</>, accent: true },
  { ts: "▲ 09:00 · 9時間前", html: <>本日の予想締切は <b>18:55</b> までです</>, accent: true },
  { ts: "04/24 · 3日前", html: <>第111戦的中 <b style={{ color: "var(--vermilion)" }}>+280pt</b> 獲得</>, accent: false },
];

const STREAK_RECENT: { kind: "hit" | "miss" | "now"; label: string }[] = [
  { kind: "miss", label: "−" }, { kind: "hit", label: "中" }, { kind: "miss", label: "−" },
  { kind: "miss", label: "−" }, { kind: "hit", label: "中" }, { kind: "hit", label: "中" },
  { kind: "miss", label: "−" }, { kind: "hit", label: "中" }, { kind: "hit", label: "中" },
  { kind: "hit", label: "中" }, { kind: "now", label: "本" },
];

function teamColorFromSlug(slug: string): string {
  return getTeamBySlug(slug)?.color ?? "#0b0b09";
}

function PredictionRow({ r }: { r: HistoryRow }) {
  const player = getPlayer(r.pickedId);
  const tc = teamColorFromSlug(r.teamSlug);
  return (
    <tr className={r.rowClass}>
      <td><div className="date">{r.date}<small>{r.dayLabel}</small></div></td>
      <td><div className="gm-cell">{r.matchNo}<small>{r.matchSection}</small></div></td>
      <td>
        <div className="pick-cell">
          <div className="face-mini" style={{ ["--tc" as never]: tc }}>{r.monogram}</div>
          <div className="nm">
            {player?.name ?? r.pickedId}
            <small>{r.pickedNote}</small>
          </div>
        </div>
      </td>
      <td>
        {r.status === "live" && <span className="res live">予想中</span>}
        {r.status === "pending" && <span className="res pending">待機中</span>}
        {r.status === "hit" && (
          <>
            <span className="res hit">的中</span>
            {r.actualNote && <small style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, color: "var(--ink-3)", marginLeft: 4 }}>{r.actualNote}</small>}
          </>
        )}
        {r.status === "miss" && (
          <>
            <span className="res miss">不的中</span>
            {r.actualNote && <small style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, color: "var(--ink-3)", marginLeft: 4 }}>{r.actualNote}</small>}
          </>
        )}
      </td>
      <td><div className={`pts ${r.ptsClass}`}>{r.pts}</div></td>
    </tr>
  );
}

export default function MyPage() {
  return (
    <div className="wrap predict-page">
      <section className="my-hero">
        <div className="top">
          <div className="ava-big">高</div>
          <div className="nameblock">
            <div className="x">
              <span className="verified">𝕏</span>@takamiya_fan
            </div>
            <h1>
              高宮 まり
              <span className="en">Mari Takamiya · Predictor</span>
            </h1>
            <div className="joined">
              登録日 2024.10.04 · 在籍 575日目
              <div className="badges">
                <span className="b gold">SEASON 02 在籍</span>
                <span className="b red">3連続的中</span>
                <span className="b">推しフォロー 3/5</span>
              </div>
            </div>
          </div>
          <button className="bell">
            <span className="icon">♪</span>新着通知
            <span className="dot">3</span>
          </button>
        </div>
        <div className="stat-grid">
          <div className="s">
            <div className="l">通算ポイント</div>
            <div className="v gold">2,847<span className="u">pt</span></div>
            <div className="sub up">+600 今週</div>
          </div>
          <div className="s">
            <div className="l">的中率</div>
            <div className="v">38.2<span className="u">%</span></div>
            <div className="sub">42戦中16中</div>
          </div>
          <div className="s">
            <div className="l">シーズン順位</div>
            <div className="v">#1,234</div>
            <div className="sub">／5,287人中 (TOP 24%)</div>
          </div>
          <div className="s">
            <div className="l">連続的中</div>
            <div className="v red">3<span className="u">戦</span></div>
            <div className="sub">継続中 · 自己最長 5</div>
          </div>
          <div className="s">
            <div className="l">推し雀士の貢献</div>
            <div className="v">+820<span className="u">pt</span></div>
            <div className="sub">うち多井 +540pt</div>
          </div>
        </div>
      </section>

      <div className="notify">
        <div className="ic">!</div>
        <div className="text">
          <h4>推し雀士『多井 隆晴』が本日 19:00 出場</h4>
          <p>ABEMAS × Pirates × Phoenix × 風林火山 / <b>第112戦</b> / 予想締切まで <b>26分38秒</b> · X連携で2倍ptボーナス対象</p>
        </div>
        <Link href="/predict/match/112" className="cta" style={{ textDecoration: "none", display: "inline-block" }}>予想する ▸</Link>
      </div>

      <div className="my-grid">
        <div>
          <div className="sec-head">
            <span className="num">02</span>
            <h2>今週の動き<span className="en">This Week</span></h2>
            <div className="filter-tabs">
              <span className="ft">日次</span>
              <span className="ft on">週次</span>
              <span className="ft">月次</span>
              <span className="ft">通算</span>
            </div>
          </div>

          <div className="chart-card">
            <h3>
              獲得ポイント推移
              <span className="en">Apr 21 → Apr 27 / +600pt 確定 + 予 300</span>
            </h3>
            <div className="cap">4/6戦的中 · 的中率 <b>67%</b> · ピーク 4/24 +400pt (X連携 ×2)</div>
            <svg className="chart-svg" viewBox="0 0 700 180" preserveAspectRatio="none">
              {/* y=20 = +400, y=160 = 0; scale 0.35 px/pt */}
              <line x1="0" y1="55" x2="700" y2="55" stroke="#d4cdb9" strokeWidth="1" strokeDasharray="2,3" />
              <line x1="0" y1="90" x2="700" y2="90" stroke="#d4cdb9" strokeWidth="1" strokeDasharray="2,3" />
              <line x1="0" y1="125" x2="700" y2="125" stroke="#d4cdb9" strokeWidth="1" strokeDasharray="2,3" />
              <line x1="0" y1="160" x2="700" y2="160" stroke="#0b0b09" strokeWidth="2" />
              {/* 4/21 +100 */}
              <g><rect x="20" y="125" width="60" height="35" fill="#c8282a" /><text x="50" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">21</text><text x="50" y="118" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#0b0b09" fontWeight="700">+100</text></g>
              {/* 4/22 no game */}
              <g><rect x="120" y="155" width="60" height="5" fill="#8a8576" /><text x="150" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">22</text><text x="150" y="148" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">休</text></g>
              {/* 4/23 +100 */}
              <g><rect x="220" y="125" width="60" height="35" fill="#c8282a" /><text x="250" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">23</text><text x="250" y="118" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#0b0b09" fontWeight="700">+100</text></g>
              {/* 4/24 +400 (300+100, X連携2倍含む) */}
              <g><rect x="320" y="20" width="60" height="140" fill="#c8282a" /><text x="350" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">24</text><text x="350" y="14" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#0b0b09" fontWeight="700">+400</text></g>
              {/* 4/25 no game */}
              <g><rect x="420" y="155" width="60" height="5" fill="#8a8576" /><text x="450" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">25</text><text x="450" y="148" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">休</text></g>
              {/* 4/26 no game */}
              <g><rect x="520" y="155" width="60" height="5" fill="#8a8576" /><text x="550" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">26</text><text x="550" y="148" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">休</text></g>
              {/* 4/27 予+300 (進行中) */}
              <g><rect x="620" y="55" width="60" height="105" fill="#a07e28" stroke="#0b0b09" strokeWidth="2" strokeDasharray="3,2" /><text x="650" y="174" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#5a564d" fontWeight="700">27</text><text x="650" y="48" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#a07e28" fontWeight="700">予 +300</text></g>
              {/* AVG +200/active day at y = 160 - 200*0.35 = 90 */}
              <line x1="0" y1="90" x2="700" y2="90" stroke="#2f5c3f" strokeWidth="1.5" strokeDasharray="6,4" />
              <text x="690" y="85" textAnchor="end" fontFamily="Geist Mono" fontSize="9" fill="#2f5c3f" fontWeight="700">AVG +200pt/開催日</text>
            </svg>
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1.5px dotted var(--ink-4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700, textTransform: "uppercase" }}>直近10戦</div>
                <div className="streak">
                  {STREAK_RECENT.map((s, i) => (
                    <span key={i} className={`d ${s.kind}`}>{s.label}</span>
                  ))}
                </div>
                <div style={{ marginLeft: "auto", fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 11, color: "var(--ink-3)", fontWeight: 600 }}>
                  的中 6/10 · 連続 <b style={{ color: "var(--vermilion)", fontFamily: "Shippori Mincho, serif", fontSize: 14 }}>3</b>
                </div>
              </div>
            </div>
          </div>

          <div className="sec-head" style={{ marginTop: 22 }}>
            <span className="num">03</span>
            <h2>予想履歴<span className="en">Prediction Log</span></h2>
            <div className="filter-tabs">
              <span className="ft on">全て</span>
              <span className="ft">的中のみ</span>
              <span className="ft">不的中</span>
              <span className="ft">推し雀士</span>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{ width: 90 }}>日付</th>
                  <th style={{ width: 110 }}>対局</th>
                  <th>あなたの予想</th>
                  <th style={{ width: 130 }}>結果 / 1着</th>
                  <th className="right" style={{ width: 90 }}>獲得pt</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((r, i) => <PredictionRow key={i} r={r} />)}
              </tbody>
            </table>
            <div style={{ padding: "14px 18px", textAlign: "center", borderTop: "2px solid var(--ink)", background: "var(--paper-2)" }}>
              <span style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink)", fontWeight: 700, borderBottom: "1px dotted var(--ink)", paddingBottom: 1, cursor: "pointer" }}>
                過去42戦すべて表示 →
              </span>
            </div>
          </div>

          <div className="sec-head" style={{ marginTop: 22 }}>
            <span className="num">04</span>
            <h2>傾向分析<span className="en">Insights</span></h2>
          </div>
          <div className="summary-row">
            <div className="item">
              <div className="l">最も予想する選手</div>
              <h4>多井 隆晴 · 8回</h4>
              <p>的中4回 (50%)。獲得 +540pt。あなたの『最も信頼する雀士』</p>
            </div>
            <div className="item">
              <div className="l">最も的中するチーム</div>
              <h4>ABEMAS · 7/12中</h4>
              <p>的中率 58%。風林火山予想は 1/5 (20%) で苦手</p>
            </div>
            <div className="item">
              <div className="l">時間帯傾向</div>
              <h4>21時試合 · 44%</h4>
              <p>19時試合 (32%) より +12pt 高得点。夜の方が的中率高い</p>
            </div>
            <div className="item">
              <div className="l">少数派的中</div>
              <h4>2回 / +220pt</h4>
              <p>多数派と異なる予想で2回的中。ボーナス +50ptを獲得</p>
            </div>
          </div>
        </div>

        <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="follow-card">
            <div className="head">
              <h3>推し雀士</h3>
              <div className="ct">FOLLOWING <b>3</b>/5</div>
            </div>
            <div>
              {FOLLOWING.map((f) => {
                const player = getPlayer(f.id);
                const tc = teamColorFromSlug(f.teamSlug);
                return (
                  <div key={f.id} className="fl-row">
                    <div className="face" style={{ ["--tc" as never]: tc }}>{f.mono}</div>
                    <div className="info">
                      <div className="nm">{player?.name ?? f.id}</div>
                      <div className="meta">{f.meta}<br />あなたから <b>{f.pts}</b></div>
                    </div>
                    <div className="status">
                      <span className={f.status}>{f.statusLabel}</span>
                    </div>
                  </div>
                );
              })}
              <div className="add-empty">+ あと2人フォローできます</div>
            </div>
          </div>

          <div className="badges-shelf">
            <h3>獲得バッジ<span className="en">7/24 unlocked</span></h3>
            <div className="badge-grid">
              {BADGES.map((b, i) => (
                <div key={i} className={`badge ${b.state}`}>
                  <div className="icon">{b.icon}</div>
                  <div className="lbl">{b.lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10.5, color: "var(--ink-3)", fontWeight: 600, textAlign: "center", letterSpacing: "0.06em" }}>
              次のバッジ：5連続的中 まで残り <b style={{ color: "var(--vermilion)", fontFamily: "Shippori Mincho, serif", fontSize: 14 }}>2戦</b>
            </div>
          </div>

          <div className="follow-card">
            <div className="head">
              <h3>新着通知</h3>
              <div className="ct">3 unread</div>
            </div>
            <div style={{ padding: "14px 18px" }}>
              {NOTIFICATIONS.map((n, i) => (
                <div
                  key={i}
                  style={{
                    paddingTop: i === 0 ? 0 : 12,
                    paddingBottom: i === NOTIFICATIONS.length - 1 ? 0 : 12,
                    borderBottom: i === NOTIFICATIONS.length - 1 ? "none" : "1px dotted var(--ink-4)",
                    fontSize: 12,
                  }}
                >
                  <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 9.5, letterSpacing: "0.1em", color: n.accent ? "var(--vermilion)" : "var(--ink-3)", fontWeight: 700, marginBottom: 4 }}>{n.ts}</div>
                  {n.html}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 24, marginBottom: 40, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: "var(--paper)", border: "var(--border)", boxShadow: "var(--shadow)" }}>
        <Link href="/predict" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>01 / ホーム</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>今日の対局</h4>
        </Link>
        <Link href="/predict/match/112" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>02 / 予想する</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>第112戦の予想</h4>
        </Link>
        <Link href="/predict/ranking" style={{ padding: "16px 18px", borderRight: "1.5px solid var(--ink)", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>04 / ランキング</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>シーズン順位</h4>
        </Link>
        <Link href="/predict/result/111" style={{ padding: "16px 18px", display: "block" }}>
          <div style={{ fontFamily: "Geist Mono, ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink-3)", fontWeight: 700 }}>05 / 結果</div>
          <h4 style={{ margin: "4px 0 0", fontFamily: "Shippori Mincho, serif", fontWeight: 900, fontSize: 16 }}>試合結果ページ</h4>
        </Link>
      </div>
    </div>
  );
}
