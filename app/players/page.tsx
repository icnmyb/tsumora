"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ALL_PLAYERS, ORG_META, type AllPlayer, type OrgCode, type Gender } from "./data";

type OrgFilter = "ALL" | OrgCode;
type GenderFilter = "ALL" | Gender;

type OrgTab = {
  key: OrgFilter;
  label: string;
  en: string;
  color: string;
};

const ORG_TABS: OrgTab[] = [
  { key: "ALL", label: "ALL", en: "全団体", color: "var(--ink)" },
  { key: "JPML", label: "JPML", en: "連盟", color: ORG_META.JPML.color },
  { key: "NPM", label: "NPM", en: "協会", color: ORG_META.NPM.color },
  { key: "最高位戦", label: "最高位戦", en: "Saikōisen", color: ORG_META["最高位戦"].color },
  { key: "RMU", label: "RMU", en: "Real Mahjong Unit", color: ORG_META.RMU.color },
  { key: "μ", label: "μ", en: "麻将連合", color: ORG_META["μ"].color },
];

type GenderTab = {
  key: GenderFilter;
  label: string;
  en: string;
};

const GENDER_TABS: GenderTab[] = [
  { key: "ALL", label: "ALL", en: "全選手" },
  { key: "male", label: "男性", en: "Male" },
  { key: "female", label: "女性", en: "Female" },
];

const CURRENT_YEAR = 2026;

export default function PlayersIndexPage() {
  const [orgFilter, setOrgFilter] = useState<OrgFilter>("ALL");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("ALL");

  const featured = useMemo(() => {
    const base = ALL_PLAYERS.slice(0, 10);
    if (orgFilter === "ALL") return base;
    return ALL_PLAYERS.filter((p) => p.org === orgFilter).slice(0, 10);
  }, [orgFilter]);

  const filtered = useMemo(() => {
    return ALL_PLAYERS.filter((p) => {
      const orgOk = orgFilter === "ALL" || p.org === orgFilter;
      const genderOk = genderFilter === "ALL" || p.gender === genderFilter;
      return orgOk && genderOk;
    });
  }, [orgFilter, genderFilter]);

  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Players</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">
              PLAYERS · {ALL_PLAYERS.length} PROS · ACROSS 5 BODIES
            </div>
            <h1>
              選手一覧
              <span className="en">Featured Professional Players</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 注目プロ 10名</span>
              <span>5団体横断</span>
              <span>Mリーガー多数</span>
              <span>現役タイトルホルダー含む</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">雀</div>
          </div>
        </div>
      </section>

      {/* FEATURED PLAYERS GRID */}
      {/* FEATURED FILTER TABS */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "24px 0 12px" }}>
        {(["ALL", "JPML", "NPM", "最高位戦", "RMU", "μ"] as OrgFilter[]).map((key) => {
          const active = orgFilter === key;
          const color = key === "ALL" ? "var(--ink)" : ORG_META[key as OrgCode]?.color ?? "var(--ink)";
          return (
            <button
              key={key}
              onClick={() => setOrgFilter(key)}
              style={{
                padding: "5px 14px",
                border: `2px solid ${active ? color : "var(--ink-4)"}`,
                background: active ? color : "transparent",
                color: active ? "var(--paper)" : "var(--ink-3)",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                cursor: "pointer",
                fontWeight: active ? 700 : 400,
                transition: "all 100ms ease",
              }}
            >
              {key}
            </button>
          );
        })}
      </div>

      <h2 className="sh">
        <span>注目プロ</span>
        <span className="num">Featured Players · Select one</span>
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
        {featured.map((p, idx) => {
          const meta = ORG_META[p.org];
          const glyph = p.name.charAt(0);
          const code = `${String(idx + 1).padStart(2, "0")} · ${p.nameEn.toUpperCase()}`;
          return (
            <Link
              key={p.id}
              href={p.href}
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
                  background: meta.color,
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
                  color: meta.color,
                  opacity: 0.12,
                  letterSpacing: "-0.05em",
                  pointerEvents: "none",
                }}
              >
                {glyph}
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
                {code}
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
                {p.name}
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
                {p.nameEn}
              </div>

              <div
                style={{
                  display: "inline-block",
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 9px",
                  border: `1.5px solid ${meta.color}`,
                  background: "var(--paper-2)",
                  color: meta.color,
                  marginBottom: 14,
                }}
              >
                {meta.label}
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
                  Signature Title
                </div>
                <div
                  style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "var(--ink)",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: 12,
                    color: "var(--ink-2)",
                    marginTop: 4,
                  }}
                >
                  {p.league}
                  {p.period ? ` · ${p.period}` : ""}
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
                {p.tags.map((t) => (
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
                  color: meta.color,
                  fontWeight: 600,
                  borderTop: "1.5px solid var(--ink)",
                  paddingTop: 12,
                }}
              >
                <span>View Profile</span>
                <span style={{ fontSize: 14 }}>→</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ALL PLAYERS LIST */}
      <h2 className="sh">
        <span>ALL PLAYERS — 選手一覧</span>
        <span className="num">All Registered Players</span>
        <span className="rule"></span>
        <span
          className="more"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "var(--ink)",
            color: "var(--paper)",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.1em",
            fontWeight: 700,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 900 }}>{ALL_PLAYERS.length}</span>
          <span style={{ fontSize: 9.5, opacity: 0.75 }}>PROS</span>
        </span>
      </h2>

      {/* ORG FILTER TABS */}
      <nav
        aria-label="Filter all players by organization"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          margin: "14px 0 10px",
        }}
      >
        {ORG_TABS.map((f) => {
          const active = orgFilter === f.key;
          const count =
            f.key === "ALL"
              ? ALL_PLAYERS.length
              : ALL_PLAYERS.filter((p) => p.org === f.key).length;
          return (
            <button
              key={`org-${f.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => setOrgFilter(f.key)}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 8,
                padding: "6px 12px",
                background: active ? f.color : "var(--paper)",
                color: active ? "var(--paper)" : "var(--ink)",
                border: `1.5px solid ${active ? f.color : "var(--ink)"}`,
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                {f.label}
              </span>
              <span
                style={{
                  fontSize: 10,
                  padding: "1px 6px",
                  background: active ? "rgba(235,228,210,0.22)" : "var(--paper-2)",
                  color: active ? "var(--paper)" : "var(--ink-3)",
                  border: active
                    ? "1px solid rgba(235,228,210,0.35)"
                    : "1px solid var(--ink-4)",
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* GENDER FILTER TABS */}
      <nav
        aria-label="Filter all players by gender"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          margin: "0 0 18px",
        }}
      >
        {GENDER_TABS.map((g) => {
          const active = genderFilter === g.key;
          const count =
            g.key === "ALL"
              ? ALL_PLAYERS.length
              : ALL_PLAYERS.filter((p) => p.gender === g.key).length;
          return (
            <button
              key={`gender-${g.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => setGenderFilter(g.key)}
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: 8,
                padding: "5px 11px",
                background: active ? "var(--ink)" : "var(--paper)",
                color: active ? "var(--paper)" : "var(--ink)",
                border: "1.5px solid var(--ink)",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              <span
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 12,
                  fontWeight: 900,
                }}
              >
                {g.label}
              </span>
              <span
                style={{
                  fontSize: 9.5,
                  padding: "1px 6px",
                  background: active ? "rgba(235,228,210,0.22)" : "var(--paper-2)",
                  color: active ? "var(--paper)" : "var(--ink-3)",
                  border: active
                    ? "1px solid rgba(235,228,210,0.35)"
                    : "1px solid var(--ink-4)",
                  fontWeight: 700,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* RESULT COUNT */}
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10.5,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          marginBottom: 8,
        }}
      >
        Showing {filtered.length} / {ALL_PLAYERS.length} players
      </div>

      {/* LIST */}
      {filtered.length === 0 ? (
        <div
          style={{
            padding: "40px 20px",
            textAlign: "center",
            background: "var(--paper)",
            border: "var(--border)",
            fontFamily: "'Shippori Mincho', serif",
            fontSize: 16,
            color: "var(--ink-3)",
            marginBottom: 48,
          }}
        >
          該当する選手がいません
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            margin: "0 0 48px",
            padding: 0,
            background: "var(--paper)",
            border: "var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          {filtered.map((p, idx) => (
            <PlayerRow
              key={p.id}
              player={p}
              index={idx}
              isLast={idx === filtered.length - 1}
            />
          ))}
        </ul>
      )}

      <style>{`
        .all-player-row:hover {
          background: var(--paper-2);
        }
        .all-player-row:hover .all-player-bar {
          width: 8px;
        }
        .all-player-row:hover .all-player-arrow {
          transform: translateX(4px);
          color: var(--ink);
        }
      `}</style>
    </div>
  );
}

interface PlayerRowProps {
  player: AllPlayer;
  index: number;
  isLast: boolean;
}

function PlayerRow({ player, index, isLast }: PlayerRowProps) {
  const meta = ORG_META[player.org];
  const years = CURRENT_YEAR - player.joinYear;
  const number = String(index + 1).padStart(3, "0");

  return (
    <li>
      <Link
        href={player.href}
        className="all-player-row"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "56px 1fr auto auto auto",
          alignItems: "center",
          gap: 16,
          padding: "12px 16px 12px 0",
          textDecoration: "none",
          color: "var(--ink)",
          borderBottom: isLast ? "none" : "1px solid var(--ink-5, rgba(0,0,0,0.08))",
          overflow: "hidden",
        }}
      >
        <span
          aria-hidden
          className="all-player-bar"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 4,
            background: meta.color,
            transition: "width 160ms ease",
          }}
        />
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: "var(--ink-3)",
            textAlign: "center",
            paddingLeft: 14,
            fontWeight: 600,
          }}
        >
          {number}
        </span>

        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Shippori Mincho', serif",
                fontWeight: 800,
                fontSize: 17,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
              }}
            >
              {player.name}
            </span>
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 12,
                color: "var(--ink-3)",
              }}
            >
              {player.nameEn}
            </span>
          </div>
          <div
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 11.5,
              color: "var(--ink-2)",
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {player.title}
            <span style={{ color: "var(--ink-3)" }}> · {player.league}</span>
          </div>
        </div>

        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--ink-3)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--ink-2)" }}>{years}</span>
          <span style={{ marginLeft: 3 }}>年目</span>
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            border: `1.5px solid ${meta.color}`,
            background: "var(--paper-2)",
            color: meta.color,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              background: meta.color,
              borderRadius: "50%",
            }}
          />
          {player.org}
        </span>

        <span
          aria-hidden
          className="all-player-arrow"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 16,
            color: "var(--ink-3)",
            paddingRight: 4,
            transition: "transform 160ms ease, color 160ms ease",
          }}
        >
          →
        </span>
      </Link>
    </li>
  );
}
