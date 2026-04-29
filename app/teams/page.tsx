import Link from "next/link";
import type { Metadata } from "next";
import { TEAMS } from "@/app/teams/data";
import { BgLayers } from "@/components/BgLayers";
import { CustomScrollbar } from "@/components/CustomScrollbar";

export const metadata: Metadata = {
  title: "Mリーグ チーム一覧 — TSUMORA",
  description: "Mリーグ 10チームの紹介。各チームの設立年、運営会社、所属選手、過去成績、歴代マイルストーンを掲載。",
};

export default function TeamsIndexPage() {
  const totalChampionships = TEAMS.reduce((sum, t) => sum + t.championships, 0);
  const sortedTeams = [...TEAMS].sort((a, b) => {
    if (b.championships !== a.championships) return b.championships - a.championships;
    if (b.finalAppearances !== a.finalAppearances) return b.finalAppearances - a.finalAppearances;
    return a.founded - b.founded;
  });
  return (
    <div className="wrap">
      <BgLayers />
      <CustomScrollbar />
      <section
        className="org-hero"
        style={{
          ["--hero-watermark" as string]: `"M"`,
          ["--hero-watermark-color" as string]: "rgba(235,228,210,0.08)",
        }}
      >
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Teams</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">
              MLEAGUE TEAMS · 10 CLUBS · ACROSS {TEAMS.length} ORGS
            </div>
            <h1>
              Mリーグ チーム一覧
              <span className="en">M.LEAGUE Teams</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 10チーム体制</span>
              <span>2018-19シーズン開幕</span>
              <span>累計優勝 {totalChampionships}回</span>
              <span>2025-26 EARTH JETS新規参入</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">M</div>
          </div>
        </div>
      </section>

      <h2 className="sh">
        <span>全10チーム</span>
        <span className="num">All Teams · Sorted by Championships</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 18,
          margin: "16px 0 48px",
        }}
      >
        {sortedTeams.map((t, idx) => (
          <Link
            key={t.slug}
            href={`/teams/${t.slug}`}
            className="org-index-card"
            style={{
              position: "relative",
              display: "block",
              background: t.background ?? "var(--paper)",
              color: t.colorOnDark ?? t.color,
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              padding: "22px 22px 20px",
              textDecoration: "none",
              overflow: "hidden",
              minHeight: 220,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: t.color,
              }}
            />
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 10,
                right: -10,
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: 160,
                lineHeight: 1,
                color: t.color,
                opacity: 0.18,
                letterSpacing: "-0.05em",
                pointerEvents: "none",
              }}
            >
              {t.kanji}
            </span>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: t.colorOnDark ?? t.color,
                opacity: 0.85,
                marginTop: 6,
              }}
            >
              {String(idx + 1).padStart(2, "0")} · {t.nameEn.toUpperCase()}
            </div>
            <h3
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: 26,
                letterSpacing: "-0.02em",
                margin: "10px 0 4px",
                lineHeight: 1.2,
                color: t.colorOnDark ?? t.color,
              }}
            >
              {t.name}
            </h3>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 13,
                color: t.colorOnDark ?? t.color,
                opacity: 0.7,
                marginBottom: 14,
              }}
            >
              {t.parentCompany} · {t.joinedSeason}〜
            </div>
            <div
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 12.5,
                color: t.colorOnDark ?? t.color,
                opacity: 0.85,
                marginBottom: 16,
              }}
            >
              {t.tagline}
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                borderTop: `1px solid ${t.color}`,
                paddingTop: 12,
                color: t.colorOnDark ?? t.color,
              }}
            >
              <div>
                <div style={{ opacity: 0.6, fontSize: 9, letterSpacing: "0.12em" }}>優勝</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{t.championships}</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, fontSize: 9, letterSpacing: "0.12em" }}>F進出</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{t.finalAppearances}</div>
              </div>
              <div>
                <div style={{ opacity: 0.6, fontSize: 9, letterSpacing: "0.12em" }}>選手</div>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{t.currentRoster.length}</div>
              </div>
              <div style={{ marginLeft: "auto", alignSelf: "flex-end", color: t.color, fontWeight: 700, fontSize: 18 }}>
                →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/mleague"
        className="related-card"
        style={{
          background: "var(--ink)",
          color: "var(--paper)",
          boxShadow: "5px 5px 0 var(--ink-3)",
          display: "block",
          marginBottom: 48,
        }}
      >
        <div className="meta" style={{ color: "rgba(255,255,255,0.6)" }}>M.LEAGUE</div>
        <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>Mリーグ順位表 / スケジュール</div>
        <div className="meta" style={{ color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          現在のシーズン状況・最新ニュース
        </div>
        <span className="tag" style={{ background: "var(--paper)", color: "var(--ink)", marginTop: 14 }}>
          リーグページへ →
        </span>
      </Link>
    </div>
  );
}
