import Link from "next/link";

type OrgCode = "JPML" | "NPM" | "SAIKOUISEN" | "RMU";

type TitleCard = {
  slug: string;
  href: string;
  code: string;
  name: string;
  en: string;
  glyph: string;
  color: string;
  org: OrgCode;
  orgLabel: string;
  orgHref: string;
  holder: string | null;
  holderHref?: string;
  season: string;
  tags: string[];
};

const TITLES: TitleCard[] = [
  {
    slug: "houou-isen",
    href: "/titles/houou-isen",
    code: "01 · HŌŌI",
    name: "鳳凰位戦",
    en: "The Hōōi Championship",
    glyph: "鳳",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: "瀬戸熊 直樹",
    holderHref: "/players/setokuma",
    season: "10月 — 翌年7月 · 全10節",
    tags: ["JPML最高峰", "リーグ戦", "5部制"],
  },
  {
    slug: "judan-isen",
    href: "/titles/judan-isen",
    code: "02 · JŪDAN",
    name: "十段位戦",
    en: "The Jūdan Championship",
    glyph: "十",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: null,
    season: "4月 — 翌年3月 · トーナメント",
    tags: ["JPML", "トーナメント", "五段以上"],
  },
  {
    slug: "oui-isen",
    href: "/titles/oui-isen",
    code: "03 · ŌI",
    name: "王位戦",
    en: "The Ōi Championship",
    glyph: "王",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: null,
    season: "5月 — 11月 · 予選オープン",
    tags: ["JPML", "オープン参加", "全国大会"],
  },
  {
    slug: "jakuou-isen",
    href: "/titles/jakuou-isen",
    code: "04 · JAKU-Ō",
    name: "雀王戦",
    en: "The Jaku-Ō Championship",
    glyph: "雀",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    holder: "石橋 伸洋",
    holderHref: "/players/ishibashi",
    season: "5月 — 翌年2月 · A〜D制",
    tags: ["NPM最高峰", "リーグ戦", "4部制"],
  },
  {
    slug: "reishouisen",
    href: "/titles/reishouisen",
    code: "05 · REISHŌ",
    name: "令昭位戦",
    en: "The Reishō Championship",
    glyph: "令",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    holder: null,
    season: "秋 — 冬 · トーナメント",
    tags: ["NPM", "トーナメント", "オープン"],
  },
  {
    slug: "saikouisen",
    href: "/titles/saikouisen",
    code: "06 · SAIKŌI",
    name: "最高位戦",
    en: "The Saikōi Championship",
    glyph: "最",
    color: "#7c3aed",
    org: "SAIKOUISEN",
    orgLabel: "最高位戦日本プロ麻雀協会",
    orgHref: "/organizations/saikouisen",
    holder: null,
    season: "4月 — 翌年3月 · A〜D制",
    tags: ["最高位戦最高峰", "リーグ戦", "最古タイトル"],
  },
  {
    slug: "rmu-classic",
    href: "/titles/rmu-classic",
    code: "07 · RMU CLASSIC",
    name: "RMUクラシック",
    en: "RMU Classic",
    glyph: "令",
    color: "var(--gold)",
    org: "RMU",
    orgLabel: "Real Mahjong Unit",
    orgHref: "/organizations/rmu",
    holder: null,
    season: "年間開催 · オープン参加",
    tags: ["RMU", "クラシックルール", "一発・裏なし"],
  },
];

type FilterTab = {
  key: "ALL" | OrgCode;
  label: string;
  en: string;
  color: string;
};

const FILTERS: FilterTab[] = [
  { key: "ALL", label: "ALL", en: "全タイトル", color: "var(--ink)" },
  { key: "JPML", label: "JPML", en: "連盟", color: "var(--vermilion)" },
  { key: "NPM", label: "NPM", en: "協会", color: "#2563eb" },
  { key: "SAIKOUISEN", label: "最高位戦", en: "Saikōisen", color: "#7c3aed" },
  { key: "RMU", label: "RMU", en: "Real Mahjong Unit", color: "var(--gold)" },
];

export default function TitlesIndexPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Titles</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">TITLES · 7 MAJOR CHAMPIONSHIPS · ACROSS 4 BODIES</div>
            <h1>
              タイトル戦一覧
              <span className="en">Major Mahjong Championships</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 主要タイトル 7冠</span>
              <span>4団体横断</span>
              <span>リーグ戦・トーナメント</span>
              <span>現保持者情報</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">冠</div>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <h2 className="sh">
        <span>団体で絞り込み</span>
        <span className="num">Filter by Organization</span>
        <span className="rule"></span>
        <span className="more">DUMMY UI</span>
      </h2>
      <nav
        aria-label="Filter by organization"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          margin: "14px 0 28px",
          padding: "12px 14px",
          background: "var(--paper-2)",
          border: "var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {FILTERS.map((f, i) => {
          const active = i === 0;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={active}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 8,
                padding: "8px 14px",
                background: active ? f.color : "var(--paper)",
                color: active ? "var(--paper)" : "var(--ink)",
                border: "2px solid var(--ink)",
                boxShadow: active ? "3px 3px 0 var(--ink)" : "2px 2px 0 var(--ink)",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                transition: "transform 120ms ease, box-shadow 120ms ease",
              }}
            >
              <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 14, fontWeight: 900 }}>
                {f.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: active ? "rgba(235,228,210,0.8)" : "var(--ink-3)",
                }}
              >
                {f.en}
              </span>
            </button>
          );
        })}
      </nav>

      {/* TITLES GRID */}
      <h2 className="sh">
        <span>主要タイトル戦</span>
        <span className="num">Major Championships · Select one</span>
        <span className="rule"></span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          margin: "16px 0 48px",
        }}
      >
        {TITLES.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="org-index-card"
            style={{
              position: "relative",
              display: "block",
              background: "var(--paper)",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              padding: "22px 22px 20px",
              textDecoration: "none",
              color: "var(--ink)",
              transition: "transform 120ms ease, box-shadow 120ms ease",
              overflow: "hidden",
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
                right: -6,
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: 128,
                lineHeight: 1,
                color: t.color,
                opacity: 0.12,
                letterSpacing: "-0.05em",
                pointerEvents: "none",
              }}
            >
              {t.glyph}
            </span>

            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--ink-3)",
                marginTop: 8,
              }}
            >
              {t.code}
            </div>

            <h3
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: 28,
                letterSpacing: "-0.02em",
                margin: "10px 0 2px",
                lineHeight: 1.15,
                position: "relative",
              }}
            >
              {t.name}
            </h3>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 14,
                color: "var(--ink-3)",
                marginBottom: 10,
              }}
            >
              {t.en}
            </div>

            <div
              style={{
                display: "inline-block",
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 9px",
                border: `1.5px solid ${t.color}`,
                background: "var(--paper-2)",
                color: t.color,
                marginBottom: 14,
              }}
            >
              {t.orgLabel}
            </div>

            <div
              style={{
                borderTop: "1.5px solid var(--ink)",
                paddingTop: 12,
                marginBottom: 14,
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  marginBottom: 4,
                }}
              >
                Current Holder
              </div>
              <div
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: t.holder ? "var(--ink)" : "var(--ink-3)",
                  lineHeight: 1.3,
                }}
              >
                {t.holder ? (
                  t.holderHref ? (
                    <span>{t.holder}</span>
                  ) : (
                    t.holder
                  )
                ) : (
                  "— 情報準備中 —"
                )}
              </div>
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  margin: "10px 0 4px",
                }}
              >
                Season
              </div>
              <div
                style={{
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 12,
                  color: "var(--ink-2)",
                }}
              >
                {t.season}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 16,
              }}
            >
              {t.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: 10.5,
                    fontWeight: 500,
                    padding: "3px 8px",
                    border: "1.5px solid var(--ink)",
                    background: "var(--paper-2)",
                    color: "var(--ink)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.color,
                fontWeight: 600,
                borderTop: "1.5px solid var(--ink)",
                paddingTop: 12,
              }}
            >
              <span>View Title</span>
              <span style={{ fontSize: 14 }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
