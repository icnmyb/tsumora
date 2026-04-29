import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロ団体 — TSUMORA",
  description:
    "日本のプロ麻雀5団体（JPML / 最高位戦 / NPM / RMU / μ）の概要・主要タイトル戦・所属プロ。",
  openGraph: {
    title: "プロ団体 — TSUMORA",
    description: "日本のプロ麻雀5団体一覧。",
    siteName: "TSUMORA",
    type: "website",
  },
};

type OrgCard = {
  slug: string;
  href: string;
  code: string;
  abbr: string;
  name: string;
  en: string;
  glyph: string;
  color: string;
  founded: string;
  pros: string;
  titles: string;
  tags: string[];
  desc: string;
};

const ORGS: OrgCard[] = [
  {
    slug: "jpml",
    href: "/organizations/jpml",
    code: "01 · JPML",
    abbr: "JPML / 連盟",
    name: "日本プロ麻雀連盟",
    en: "Japan Professional Mahjong League",
    glyph: "連",
    color: "var(--vermilion)",
    founded: "1981",
    pros: "612",
    titles: "14",
    tags: ["● 最大手", "創設1981", "鳳凰位戦"],
    desc: "小島武夫・灘麻太郎らが1981年に創設。鳳凰位戦・十段位戦を擁する国内最大のプロ団体。",
  },
  {
    slug: "npm",
    href: "/organizations/npm",
    code: "02 · NPM",
    abbr: "協会",
    name: "日本プロ麻雀協会",
    en: "Nihon Pro Mahjong Kyōkai",
    glyph: "協",
    color: "#2563eb",
    founded: "2001",
    pros: "384",
    titles: "09",
    tags: ["雀王戦", "独立系", "赤あり"],
    desc: "2001年に連盟から分派して発足。最高峰タイトル雀王戦、一発裏ドラ赤牌ありの現代寄りルール。",
  },
  {
    slug: "saikouisen",
    href: "/organizations/saikouisen",
    code: "03 · SAIKŌISEN",
    abbr: "最高位戦",
    name: "最高位戦日本プロ麻雀協会",
    en: "Saikōisen Nihon Pro Mahjong Kyōkai",
    glyph: "最",
    color: "#7c3aed",
    founded: "1976",
    pros: "298",
    titles: "07",
    tags: ["最古", "最高位戦", "理論派"],
    desc: "1976年発足、国内最古のプロ団体。最高位戦を中心に理論派プロを多く輩出する老舗。",
  },
  {
    slug: "rmu",
    href: "/organizations/rmu",
    code: "04 · RMU",
    abbr: "RMU",
    name: "RMU",
    en: "Real Mahjong Unit",
    glyph: "R",
    color: "var(--gold)",
    founded: "2007",
    pros: "142",
    titles: "05",
    tags: ["クリスタルカップ", "少数精鋭", "競技重視"],
    desc: "2007年設立。クリスタルカップ・RMUリーグを擁する少数精鋭の競技志向団体。",
  },
  {
    slug: "mu",
    href: "/organizations/mu",
    code: "05 · μ",
    abbr: "μ / 麻将連合",
    name: "麻将連合",
    en: "Mū · Mahjong League",
    glyph: "μ",
    color: "var(--moss)",
    founded: "1997",
    pros: "176",
    titles: "06",
    tags: ["μカップ", "競技麻将", "井出洋介"],
    desc: "1997年に井出洋介らが設立。「競技麻将」の名を掲げ、μカップをはじめとする厳格なルールで知られる。",
  },
];

export default function OrganizationsIndexPage() {
  return (
    <div className="wrap">
      <section
        className="org-hero"
        style={{
          ["--hero-watermark" as string]: `"団"`,
          ["--hero-watermark-color" as string]: "rgba(235,228,210,0.08)",
        }}
      >
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Organizations</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">ORGANIZATIONS · 5 PRO BODIES · EST. 1976–2007</div>
            <h1>
              プロ団体一覧
              <span className="en">The Five Professional Mahjong Bodies</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 全5団体</span>
              <span>所属プロ 1,612名</span>
              <span>公式タイトル戦 41</span>
              <span>最古 1976 / 最新 2007</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">団</div>
          </div>
        </div>
      </section>

      <h2 className="sh">
        <span>5団体</span>
        <span className="num">The Five Bodies · Select one</span>
        <span className="rule"></span>
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
          margin: "16px 0 48px",
        }}
      >
        {ORGS.map((o) => (
          <Link
            key={o.slug}
            href={o.href}
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
            className="org-index-card"
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 6,
                background: o.color,
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
                color: o.color,
                opacity: 0.12,
                letterSpacing: "-0.05em",
                pointerEvents: "none",
              }}
            >
              {o.glyph}
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
              {o.code}
            </div>

            <h3
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 900,
                fontSize: 26,
                letterSpacing: "-0.02em",
                margin: "10px 0 2px",
                lineHeight: 1.15,
                position: "relative",
              }}
            >
              {o.name}
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
              {o.en}
            </div>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                color: "var(--ink-2)",
                marginBottom: 14,
              }}
            >
              {o.abbr}
            </div>

            <p
              style={{
                fontFamily: "'Noto Sans JP', sans-serif",
                fontSize: 12.5,
                lineHeight: 1.75,
                color: "var(--ink-2)",
                margin: "0 0 16px",
                position: "relative",
              }}
            >
              {o.desc}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                borderTop: "1.5px solid var(--ink)",
                paddingTop: 12,
                marginBottom: 14,
              }}
            >
              {[
                { l: "Founded", v: o.founded },
                { l: "Pros", v: o.pros },
                { l: "Titles", v: o.titles },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 9.5,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}
                  >
                    {s.l}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontWeight: 800,
                      fontSize: 20,
                      color: o.color,
                      lineHeight: 1.2,
                    }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 16,
              }}
            >
              {o.tags.map((t) => (
                <span
                  key={t}
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
                  {t}
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
                color: o.color,
                fontWeight: 600,
                borderTop: "1.5px solid var(--ink)",
                paddingTop: 12,
              }}
            >
              <span>View Profile</span>
              <span style={{ fontSize: 14 }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
