import Link from "next/link";
import type { Metadata } from "next";
import { TITLES } from "@/app/titles/data";
import { TEAMS } from "@/app/teams/data";

export const metadata: Metadata = {
  title: "対局スケジュール — Hora.mg",
  description:
    "Mリーグおよび5団体の主要タイトル戦の年間スケジュール一覧。日次の対局データは公式API非提供のため未実装。",
};

// ── annual Mリーグ schedule (verified pattern) ──
const MLEAGUE_PHASES: { label: string; window: string; status: "active" | "upcoming" | "done"; desc: string }[] = [
  {
    label: "プレシーズン",
    window: "9月",
    status: "done",
    desc: "ドラフト会議、開幕戦に向けた準備期間。10月の正式開幕を待つ。",
  },
  {
    label: "レギュラーシーズン",
    window: "10月 — 翌年5月初旬",
    status: "active",
    desc: "全10チーム × 各約100試合。月〜金の19:00開始 (1日2試合)、ABEMA で全戦無料生配信。",
  },
  {
    label: "セミファイナルシリーズ",
    window: "5月中旬",
    status: "upcoming",
    desc: "レギュラーシーズン上位6チームによる短期決戦。スコアは半分にリセットして開始。",
  },
  {
    label: "ファイナルシリーズ",
    window: "5月下旬",
    status: "upcoming",
    desc: "セミファイナル上位4チームで雌雄を決する。優勝賞金 5,000万円。",
  },
  {
    label: "オフシーズン",
    window: "6月 — 9月",
    status: "upcoming",
    desc: "公式戦休止。エキシビションマッチ、各団体タイトル戦への参加期間。",
  },
];

// ── recurring weekly cadence ──
const WEEKLY_CADENCE: { day: string; en: string; main: string; events: string[] }[] = [
  { day: "月", en: "MON", main: "Mリーグ", events: ["Mリーグ 第◯戦 19:00〜", "(週1〜2回) 連盟タイトル戦予選"] },
  { day: "火", en: "TUE", main: "Mリーグ", events: ["Mリーグ 第◯戦 19:00〜", "(隔週) 雀王戦A 21:00〜"] },
  { day: "水", en: "WED", main: "Mリーグ", events: ["Mリーグ 第◯戦 19:00〜", "(月1) 鳳凰位戦A1 19:30〜"] },
  { day: "木", en: "THU", main: "Mリーグ", events: ["Mリーグ 第◯戦 19:00〜"] },
  { day: "金", en: "FRI", main: "Mリーグ", events: ["Mリーグ 第◯戦 19:00〜", "(月1) 最高位戦A 22:00〜"] },
  { day: "土", en: "SAT", main: "タイトル戦", events: ["RMU闘魂杯予選 (オンライン)", "μリーグ各支部"] },
  { day: "日", en: "SUN", main: "タイトル戦", events: ["連盟タイトル戦本戦 / 決勝", "新人王戦・女流戦"] },
];

const ORG_COLORS: Record<string, string> = {
  JPML: "#c8282a",
  NPM: "#1d4ed8",
  SAIKOUISEN: "#7c3aed",
  RMU: "#a07e28",
};

function PhaseCard({ phase }: { phase: typeof MLEAGUE_PHASES[number] }) {
  const isActive = phase.status === "active";
  return (
    <div
      style={{
        background: isActive ? "var(--ink)" : "var(--paper)",
        color: isActive ? "var(--paper)" : "var(--ink)",
        border: "var(--border)",
        boxShadow: isActive ? "5px 5px 0 var(--vermilion)" : "var(--shadow-sm)",
        padding: "18px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isActive && (
        <span
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "var(--vermilion)",
            color: "var(--paper)",
            fontFamily: "Geist Mono, ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            padding: "3px 8px",
            fontWeight: 700,
          }}
        >
          ● ACTIVE
        </span>
      )}
      <div
        style={{
          fontFamily: "Geist Mono, ui-monospace, monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: isActive ? "rgba(235,228,210,.6)" : "var(--ink-3)",
          fontWeight: 700,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {phase.window}
      </div>
      <div
        style={{
          fontFamily: "Shippori Mincho, serif",
          fontWeight: 900,
          fontSize: 22,
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        {phase.label}
      </div>
      <div
        style={{
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: 12.5,
          lineHeight: 1.6,
          color: isActive ? "rgba(235,228,210,.8)" : "var(--ink-3)",
        }}
      >
        {phase.desc}
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>対局スケジュール</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">SCHEDULE · ANNUAL CALENDAR · MLEAGUE + 5 ORGS</div>
            <h1>
              対局スケジュール
              <span className="en">Match Schedule · Annual Overview</span>
            </h1>
            <div className="tags">
              <span className="highlight">● Mリーグ 2025-26 進行中</span>
              <span>10月開幕・5月終了</span>
              <span>主要タイトル戦カレンダー</span>
              <span>日次データ未整備</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">暦</div>
          </div>
        </div>
      </section>

      {/* ANNUAL PHASE OVERVIEW */}
      <h2 className="sh">
        <span>Mリーグ 年間フェーズ</span>
        <span className="num">M.LEAGUE Annual Phases</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 36,
        }}
      >
        {MLEAGUE_PHASES.map((p) => (
          <PhaseCard key={p.label} phase={p} />
        ))}
      </div>

      {/* TITLE TOURNAMENTS BY YEAR */}
      <h2 className="sh">
        <span>主要タイトル戦の年間スケジュール</span>
        <span className="num">Title Tournaments · {TITLES.length} Major</span>
        <span className="rule"></span>
        <Link href="/titles" className="more" style={{ textDecoration: "none", color: "var(--ink-3)" }}>
          一覧 →
        </Link>
      </h2>
      <div
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          marginBottom: 36,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr>
              <th
                style={{
                  background: "var(--paper-2)",
                  textAlign: "left",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  padding: "10px 14px",
                  borderBottom: "var(--border)",
                  width: 100,
                }}
              >
                団体
              </th>
              <th
                style={{
                  background: "var(--paper-2)",
                  textAlign: "left",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  padding: "10px 14px",
                  borderBottom: "var(--border)",
                }}
              >
                タイトル戦
              </th>
              <th
                style={{
                  background: "var(--paper-2)",
                  textAlign: "left",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  padding: "10px 14px",
                  borderBottom: "var(--border)",
                  width: 240,
                }}
              >
                開催期間
              </th>
              <th
                style={{
                  background: "var(--paper-2)",
                  textAlign: "left",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  padding: "10px 14px",
                  borderBottom: "var(--border)",
                  width: 180,
                }}
              >
                現在の保持者
              </th>
            </tr>
          </thead>
          <tbody>
            {TITLES.map((t, i) => {
              const orgColor = ORG_COLORS[t.org] ?? "#0b0b09";
              return (
                <tr key={t.slug} style={{ background: i % 2 === 0 ? "var(--paper)" : "var(--paper-2)" }}>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(11,11,9,.1)" }}>
                    <span
                      style={{
                        fontFamily: "Geist Mono, ui-monospace, monospace",
                        fontSize: 10.5,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: orgColor,
                      }}
                    >
                      ● {t.org}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(11,11,9,.1)" }}>
                    <Link
                      href={`/titles/${t.slug}`}
                      style={{
                        fontFamily: "Shippori Mincho, serif",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "var(--ink)",
                        textDecoration: "none",
                        borderBottom: `2px dotted ${orgColor}`,
                      }}
                    >
                      {t.glyph} {t.name}
                    </Link>
                    <div
                      style={{
                        fontFamily: "Geist Mono, ui-monospace, monospace",
                        fontSize: 10,
                        color: "var(--ink-3)",
                        marginTop: 2,
                        fontWeight: 600,
                      }}
                    >
                      {t.formatLabel}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid rgba(11,11,9,.1)",
                      fontFamily: "Noto Sans JP, sans-serif",
                      fontSize: 12.5,
                      color: "var(--ink-2)",
                    }}
                  >
                    {t.season}
                  </td>
                  <td style={{ padding: "12px 14px", borderBottom: "1px solid rgba(11,11,9,.1)" }}>
                    {t.holder ? (
                      <>
                        <div
                          style={{
                            fontFamily: "Shippori Mincho, serif",
                            fontWeight: 700,
                            fontSize: 13.5,
                          }}
                        >
                          {t.holder.href ? (
                            <Link href={t.holder.href} style={{ color: "var(--ink)" }}>
                              {t.holder.name}
                            </Link>
                          ) : (
                            t.holder.name
                          )}
                        </div>
                        {t.holder.note && (
                          <div
                            style={{
                              fontFamily: "Geist Mono, ui-monospace, monospace",
                              fontSize: 10,
                              color: "var(--ink-3)",
                              marginTop: 2,
                              fontWeight: 600,
                            }}
                          >
                            {t.holder.note}
                          </div>
                        )}
                      </>
                    ) : (
                      <span
                        style={{
                          fontFamily: "Geist Mono, ui-monospace, monospace",
                          fontSize: 11,
                          color: "var(--ink-4)",
                          fontStyle: "italic",
                        }}
                      >
                        — 確認中 —
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* WEEKLY CADENCE */}
      <h2 className="sh">
        <span>週次の試合パターン</span>
        <span className="num">Typical Weekly Cadence (Mリーグ シーズン中)</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          marginBottom: 36,
        }}
      >
        {WEEKLY_CADENCE.map((day, i) => {
          const isWeekend = day.day === "土" || day.day === "日";
          return (
            <div
              key={day.day}
              style={{
                padding: "16px 14px",
                borderRight: i < 6 ? "1px solid rgba(11,11,9,.12)" : "none",
                background: day.day === "土" ? "rgba(29,78,216,.04)" : day.day === "日" ? "rgba(200,40,42,.04)" : undefined,
              }}
            >
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {day.en}
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "-0.04em",
                  color: day.day === "土" ? "var(--indigo)" : day.day === "日" ? "var(--vermilion)" : "var(--ink)",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {day.day}
              </div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  color: isWeekend ? "var(--gold)" : "var(--vermilion)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  marginBottom: 8,
                  borderBottom: "1px dotted var(--ink-4)",
                  paddingBottom: 6,
                }}
              >
                {day.main}
              </div>
              {day.events.map((ev, j) => (
                <div
                  key={j}
                  style={{
                    fontFamily: "Noto Sans JP, sans-serif",
                    fontSize: 11,
                    color: "var(--ink-2)",
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {ev}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* M-LEAGUE TEAMS QUICK NAV */}
      <h2 className="sh">
        <span>Mリーグ 2025-26 参加チーム</span>
        <span className="num">{TEAMS.length} Teams · 各チームの試合履歴は個別ページへ</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 10,
          marginBottom: 36,
        }}
      >
        {TEAMS.map((team) => (
          <Link
            key={team.slug}
            href={`/teams/${team.slug}`}
            style={{
              background: team.color,
              color: team.colorOnDark ?? "#fff",
              padding: "14px 16px",
              border: "var(--border)",
              boxShadow: "var(--shadow-sm)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 28,
                lineHeight: 1,
                color: team.colorOnDark ?? "#fff",
              }}
            >
              {team.kanji}
            </span>
            <div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 700,
                  fontSize: 14,
                  lineHeight: 1.2,
                }}
              >
                {team.shortName}
              </div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.06em",
                  marginTop: 3,
                  opacity: 0.85,
                }}
              >
                {team.parentCompanyEn ?? team.parentCompany}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* HONEST DATA NOTE */}
      <section
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          padding: "20px 24px",
          marginBottom: 60,
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
          日次スケジュールについて
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 12.5,
            lineHeight: 1.7,
            color: "rgba(235,228,210,.85)",
          }}
        >
          Mリーグ公式 (m-league.jp) や各団体公式サイトは公式APIを提供しておらず、
          日次の対局スケジュールデータは現在持っていません。年間フェーズ・タイトル戦の開催期間・
          週次の試合パターンは検証可能な情報のみ表示しています。日次レベルの詳細
          (特定の日の対戦カード等) は、将来的にスクレイピング or 手動入力で整備予定。
          お急ぎの場合は <a href="https://m-league.jp/schedule/" target="_blank" rel="noreferrer noopener" style={{ borderBottom: "1px dotted #f0c86d", color: "#f0c86d" }}>Mリーグ公式</a> をご確認ください。
        </p>
      </section>
    </div>
  );
}
