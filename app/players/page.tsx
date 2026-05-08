"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { ALL_PLAYERS, ORG_META, getAllPlayers, type RosterPlayer, type OrgCode, type Gender } from "./data";
import { trackEvent } from "@/lib/analytics";

type OrgFilter = "ALL" | OrgCode;
type GenderFilter = "ALL" | Gender;
type PlayerView = "mleague" | "all";

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

type MLeagueTeamFilter = "ALL" | string;

type MLeagueTeamTab = {
  key: MLeagueTeamFilter;
  label: string;
  en: string;
  color: string;
};

const MLEAGUE_TEAM_TABS: MLeagueTeamTab[] = [
  { key: "ALL",                   label: "ALL",                   en: "全チーム",            color: "var(--ink)" },
  { key: "BEAST X",               label: "BEAST X",               en: "BEAST X",             color: "#0B2A5B" },
  { key: "EX風林火山",             label: "EX風林火山",             en: "EX Furinkazan",       color: "#910000" },
  { key: "TEAM RAIDEN / 雷電",    label: "TEAM雷電",               en: "Team Raiden",         color: "#c8b800" },
  { key: "KONAMI麻雀格闘倶楽部",  label: "KONAMI麻雀格闘倶楽部",  en: "KONAMI",              color: "#F14141" },
  { key: "セガサミーフェニックス", label: "セガサミーフェニックス", en: "Sega Sammy Phoenix",  color: "#F2A01F" },
  { key: "赤坂ドリブンズ",        label: "赤坂ドリブンズ",        en: "Akasaka Drivens",     color: "#6aaa2a" },
  { key: "U-NEXT Pirates",        label: "U-NEXT Pirates",        en: "U-NEXT Pirates",      color: "#2FAAE6" },
  { key: "渋谷ABEMAS",            label: "渋谷ABEMAS",            en: "Shibuya ABEMAS",      color: "#B29D41" },
  { key: "EARTH JETS",            label: "EARTH JETS",            en: "Earth Jets",          color: "#1E9627" },
  { key: "KADOKAWAサクラナイツ",  label: "KADOKAWAサクラナイツ",  en: "Sakura Knights",      color: "#e8538f" },
];

const MLEAGUE_TEAM_COLOR: Record<string, string> = Object.fromEntries(
  MLEAGUE_TEAM_TABS.filter((t) => t.key !== "ALL").map((t) => [t.key, t.color]),
);

const CURRENT_YEAR = 2026;
const PER_PAGE = 50;

/** "YYYY/MM/DD" → そのまま表示。"MM/DD" → 月日のみ表示 */
function formatBirthday(b?: string): string {
  if (!b) return "—";
  const parts = b.split("/");
  if (parts.length === 2) return `${parts[0]}/${parts[1]}`; // MM/DD
  return b; // YYYY/MM/DD
}

export default function PlayersIndexPage() {
  return (
    <Suspense fallback={null}>
      <PlayersIndexInner />
    </Suspense>
  );
}

function PlayersIndexInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(pageParam) && pageParam >= 1 ? pageParam : 1;

  const [orgFilter, setOrgFilter] = useState<OrgFilter>("ALL");
  const [genderFilter, setGenderFilter] = useState<GenderFilter>("ALL");
  const [mleagueTeamFilter, setMleagueTeamFilter] = useState<MLeagueTeamFilter>("ALL");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<PlayerView>("all");
  const allListRef = useRef<HTMLHeadingElement | null>(null);

  const allPlayers = useMemo(() => getAllPlayers(), []);

  const featured = useMemo(() => {
    return ALL_PLAYERS.filter((p) => {
      if (!p.mleagueTeam) return false;
      const orgOk = orgFilter === "ALL" || p.org === orgFilter;
      const teamOk = mleagueTeamFilter === "ALL" || p.mleagueTeam === mleagueTeamFilter;
      return orgOk && teamOk;
    });
  }, [orgFilter, mleagueTeamFilter]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const arr = allPlayers.filter((p) => {
      const orgOk = orgFilter === "ALL" || p.org === orgFilter;
      const genderOk = genderFilter === "ALL" || p.gender === genderFilter;
      if (!orgOk || !genderOk) return false;
      if (!q) return true;
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.nameEn && p.nameEn.toLowerCase().includes(q)) return true;
      return false;
    });
    // 五十音順 (player ID は yomi のローマ字表記なので、IDアルファベット順 ≒ 五十音順)
    arr.sort((a, b) => a.id.localeCompare(b.id));
    return arr;
  }, [allPlayers, orgFilter, genderFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * PER_PAGE;
  const visible = filtered.slice(pageStart, pageStart + PER_PAGE);

  // フィルタ・検索が変わったら page=1 に戻す (URLから page を落とす)
  useEffect(() => {
    if (page > 1) {
      router.replace("/players");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgFilter, genderFilter, search]);

  // ページネーション後にスクロール (再レンダー後にレイアウトが確定してから実行)
  const paginatingRef = useRef(false);
  useEffect(() => {
    if (!paginatingRef.current) return;
    paginatingRef.current = false;
    setView("all");
    allListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const goToPage = (n: number) => {
    paginatingRef.current = true;
    const url = n <= 1 ? "/players" : `/players?page=${n}`;
    trackEvent("Players Pagination", { page: n, totalPages });
    router.push(url, { scroll: false });
  };

  const switchView = (nextView: PlayerView) => {
    trackEvent("Players View Switch", { view: nextView });
    setView(nextView);
    if (nextView === "mleague" && page > 1) {
      router.replace("/players", { scroll: false });
    }
  };

  return (
    <div className="wrap">
      <section
        className="org-hero"
        style={{
          ["--hero-watermark" as string]: `"雀"`,
          ["--hero-watermark-color" as string]: "rgba(235,228,210,0.08)",
        }}
      >
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Players</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">
              PLAYERS · {allPlayers.length.toLocaleString()} PROS · ACROSS 5 BODIES
            </div>
            <h1>
              選手一覧
              <span className="en">Featured Professional Players</span>
            </h1>
            <div className="tags">
              <span className="highlight">● Mリーガー</span>
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

      <div className="players-view-tabs" aria-label="選手一覧の表示切り替え">
        <button
          type="button"
          aria-pressed={view === "all"}
          onClick={() => switchView("all")}
        >
          <span>全選手</span>
          <small>{filtered.length.toLocaleString()}</small>
        </button>
        <button
          type="button"
          aria-pressed={view === "mleague"}
          onClick={() => switchView("mleague")}
        >
          <span>Mリーガー</span>
          <small>{featured.length.toLocaleString()}</small>
        </button>
      </div>

      {/* FEATURED PLAYERS GRID — page 1 のみ表示 */}
      {currentPage === 1 && view === "mleague" && (
      <>
      <h2 className="sh">
        <span>Mリーガー</span>
        <span className="num">M.LEAGUE Players · Select one</span>
        <span className="rule"></span>
      </h2>

      {/* FEATURED FILTER TABS — editorial underline style */}
      <nav
        className="player-filter-strip player-filter-strip--org"
        aria-label="Filter featured players by organization"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          gap: 0,
          margin: "18px 0 20px",
          borderTop: "1.5px solid var(--ink)",
          borderBottom: "1.5px solid var(--ink)",
          background: "var(--paper)",
        }}
      >
        <span
          className="player-filter-label"
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 14px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            borderRight: "1px solid var(--ink-5, rgba(0,0,0,0.12))",
            fontWeight: 700,
          }}
        >
          Filter ⁄ 団体
        </span>
        {ORG_TABS.map((f, i) => {
          const active = orgFilter === f.key;
          const count =
            f.key === "ALL"
              ? ALL_PLAYERS.length
              : ALL_PLAYERS.filter((p) => p.org === f.key).length;
          return (
            <button
              key={`feat-${f.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => {
                trackEvent("Player Filter", { area: "mleague_org", filter: String(f.key) });
                setOrgFilter(f.key);
              }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "baseline",
                gap: 8,
                padding: "12px 18px",
                background: active ? "var(--paper-2)" : "transparent",
                color: active ? f.color : "var(--ink)",
                border: "none",
                borderRight:
                  i === ORG_TABS.length - 1
                    ? "none"
                    : "1px solid var(--ink-5, rgba(0,0,0,0.12))",
                fontFamily: "'Geist Mono', monospace",
                cursor: "pointer",
                transition:
                  "background 140ms ease, color 140ms ease",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: -1.5,
                  height: 3,
                  background: active ? f.color : "transparent",
                  transition: "background 140ms ease",
                }}
              />
              <span
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 15,
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                }}
              >
                {f.label}
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: 11,
                  color: active ? f.color : "var(--ink-3)",
                  opacity: 0.85,
                }}
              >
                {f.en}
              </span>
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.1em",
                  color: active ? f.color : "var(--ink-3)",
                  fontWeight: 700,
                  marginLeft: 2,
                }}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </nav>

      {/* MLEAGUE TEAM FILTER TABS */}
      <nav
        className="player-filter-strip player-filter-strip--team"
        aria-label="Filter by M.League team"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          gap: 0,
          margin: "0 0 20px",
          borderTop: "1px solid var(--ink-4)",
          borderBottom: "1.5px solid var(--ink)",
          background: "var(--paper)",
        }}
      >
        <span
          className="player-filter-label"
          aria-hidden
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 14px",
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            borderRight: "1px solid var(--ink-5, rgba(0,0,0,0.12))",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          Filter ⁄ チーム
        </span>
        {MLEAGUE_TEAM_TABS.map((t) => {
          const active = mleagueTeamFilter === t.key;
          return (
            <button
              key={`team-${t.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => {
                trackEvent("Player Filter", { area: "mleague_team", filter: String(t.key) });
                setMleagueTeamFilter(t.key);
              }}
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "baseline",
                gap: 6,
                padding: "12px 14px",
                background: active ? "var(--paper-2)" : "transparent",
                color: active ? "var(--ink)" : "var(--ink-3)",
                border: "none",
                borderRight: "1px solid var(--ink-5, rgba(0,0,0,0.08))",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.06em",
                fontWeight: active ? 700 : 400,
                cursor: "pointer",
                transition: "background 120ms ease, color 120ms ease",
              }}
            >
              <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: 12, fontWeight: 900 }}>
                {t.label}
              </span>
              {active && (
                <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: t.color }} />
              )}
            </button>
          );
        })}
      </nav>

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
          const teamColor = p.mleagueTeam ? MLEAGUE_TEAM_COLOR[p.mleagueTeam] ?? meta.color : meta.color;
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
                  background: teamColor,
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
                    color: p.title ? "var(--ink)" : "var(--ink-2)",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title || (p.league && p.league !== "—" ? p.league : "現役")}
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

              {/* 入会年 / プロ歴 / 誕生日 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                  marginBottom: 14,
                  padding: "10px 0",
                  borderTop: "1px solid var(--ink-4)",
                  borderBottom: "1px solid var(--ink-4)",
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 3 }}>入会年</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{p.joinYear}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 3 }}>プロ歴</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{CURRENT_YEAR - p.joinYear + 1}年目</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: 3 }}>誕生日</div>
                  <div style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 11, fontWeight: 600, color: "var(--ink)" }}>{formatBirthday(p.birthday)}</div>
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
      </>
      )}

      {/* ALL PLAYERS LIST */}
      {view === "all" && (
      <>
      <h2 className="sh" ref={allListRef}>
        <span>全選手</span>
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
          <span style={{ fontSize: 14, fontWeight: 900 }}>{allPlayers.length.toLocaleString()}</span>
          <span style={{ fontSize: 9.5, opacity: 0.75 }}>PROS</span>
        </span>
      </h2>

      {/* SEARCH BOX */}
      <div style={{ margin: "14px 0 12px" }}>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onBlur={() => {
            const length = search.trim().length;
            if (length > 0) trackEvent("Player Search", { lengthBucket: length < 3 ? "1-2" : length < 8 ? "3-7" : "8+" });
          }}
          placeholder="名前で検索 / Search by name (kanji or English)"
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "1.5px solid var(--ink)",
            background: "var(--paper)",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 14,
            color: "var(--ink)",
            outline: "none",
          }}
        />
      </div>

      {/* ORG FILTER TABS */}
      <nav
        className="player-filter-strip player-filter-strip--all-org"
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
              ? allPlayers.length
              : allPlayers.filter((p) => p.org === f.key).length;
          return (
            <button
              key={`org-${f.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => {
                trackEvent("Player Filter", { area: "all_org", filter: String(f.key) });
                setOrgFilter(f.key);
              }}
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
        className="player-filter-strip player-filter-strip--gender"
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
              ? allPlayers.length
              : allPlayers.filter((p) => p.gender === g.key).length;
          return (
            <button
              key={`gender-${g.key}`}
              type="button"
              aria-pressed={active}
              onClick={() => {
                trackEvent("Player Filter", { area: "gender", filter: String(g.key) });
                setGenderFilter(g.key);
              }}
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
        Showing {filtered.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + PER_PAGE, filtered.length)} of {filtered.length.toLocaleString()} (total {allPlayers.length.toLocaleString()})
      </div>

      {filtered.length > PER_PAGE && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={goToPage}
        />
      )}

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
            margin: "0 0 16px",
            padding: 0,
            background: "var(--paper)",
            border: "var(--border)",
            boxShadow: "var(--shadow)",
          }}
        >
          {visible.map((p, idx) => (
            <PlayerRow
              key={p.id}
              player={p}
              index={pageStart + idx}
              isLast={idx === visible.length - 1}
            />
          ))}
        </ul>
      )}

      {filtered.length > PER_PAGE && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onChange={goToPage}
        />
      )}

      <style>{`
        .all-player-row--clickable:hover {
          background: var(--paper-2);
        }
        .all-player-row--clickable:hover .all-player-bar {
          width: 8px;
        }
        .all-player-row--clickable:hover .all-player-arrow {
          transform: translateX(4px);
          color: var(--ink);
        }
        @media (max-width: 720px) {
          .all-player-row {
            grid-template-columns: 44px minmax(0, 1fr) auto !important;
            gap: 10px !important;
            padding: 13px 12px 13px 0 !important;
            align-items: center !important;
          }

          .all-player-index {
            padding-left: 10px !important;
            font-size: 9.5px !important;
          }

          .all-player-main {
            min-width: 0 !important;
          }

          .all-player-name-line {
            display: grid !important;
            grid-template-columns: minmax(0, max-content) minmax(0, 1fr) !important;
            gap: 8px !important;
            align-items: baseline !important;
            max-width: 100% !important;
          }

          .all-player-name {
            max-width: min(11em, 52vw) !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            font-size: 16px !important;
            line-height: 1.2 !important;
          }

          .all-player-name-en {
            min-width: 0 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            font-size: 11px !important;
          }

          .all-player-sub {
            max-width: 100% !important;
            font-size: 11px !important;
          }

          .all-player-meta {
            display: none !important;
          }

          .all-player-org {
            padding: 4px 8px !important;
            font-size: 10px !important;
          }

          .all-player-arrow {
            display: none !important;
          }
        }
      `}</style>
      </>
      )}
    </div>
  );
}

interface PlayerRowProps {
  player: RosterPlayer;
  index: number;
  isLast: boolean;
}

function PlayerRow({ player, index, isLast }: PlayerRowProps) {
  const meta = ORG_META[player.org];
  const years = player.joinYear ? CURRENT_YEAR - player.joinYear : null;
  const number = String(index + 1).padStart(4, "0");
  const isMleaguer = !!player.mleagueTeam;
  const href = player.href ?? `/players/${player.id}`;

  const rowStyle: React.CSSProperties = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "56px 1fr auto auto auto auto auto auto",
    alignItems: "center",
    gap: 16,
    padding: "12px 16px 12px 0",
    textDecoration: "none",
    color: "var(--ink)",
    borderBottom: isLast ? "none" : "1px solid var(--ink-5, rgba(0,0,0,0.08))",
    overflow: "hidden",
    cursor: isMleaguer ? "url('/cursor_hai.svg') 13 5, pointer" : "pointer",
  };

  const inner = (
    <>
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
          className="all-player-index"
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

        <div className="all-player-main" style={{ minWidth: 0 }}>
          <div
            className="all-player-name-line"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              className="all-player-name"
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
            {player.nameEn && (
              <span
                className="all-player-name-en"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: 12,
                  color: "var(--ink-3)",
                }}
              >
                {player.nameEn}
              </span>
            )}
          </div>
          <div
            className="all-player-sub"
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
            <span style={{ color: "var(--ink-2)" }}>
              {player.title || (player.league && player.league !== "—" ? player.league : "現役")}
            </span>
            {player.title && player.league && player.league !== "—" && (
              <span style={{ color: "var(--ink-3)" }}> · {player.league}</span>
            )}
          </div>
        </div>

        <span
          className="all-player-meta"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--ink-3)",
            whiteSpace: "nowrap",
          }}
        >
          {player.joinYear ? `${player.joinYear}年入会` : "—"}
        </span>

        <span
          className="all-player-meta"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--ink-3)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {years !== null ? (
            <>
              <span style={{ fontWeight: 700, color: "var(--ink-2)" }}>{years}</span>
              <span style={{ marginLeft: 3 }}>年目</span>
            </>
          ) : (
            "—"
          )}
        </span>

        <span
          className="all-player-meta"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--ink-3)",
            whiteSpace: "nowrap",
          }}
        >
          {player.period || "—"}
        </span>

        <span
          className="all-player-meta"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: "var(--ink-3)",
            whiteSpace: "nowrap",
          }}
        >
          {formatBirthday(player.birthday)}
        </span>

        <span
          className="all-player-org"
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
            color: isMleaguer ? "var(--ink-3)" : "var(--ink-4)",
            paddingRight: 4,
            transition: "transform 160ms ease, color 160ms ease",
          }}
        >
          →
        </span>
    </>
  );

  return (
    <li>
      <Link href={href} className="all-player-row all-player-row--clickable" style={rowStyle}>
        {inner}
      </Link>
    </li>
  );
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (n: number) => void;
}

function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = pageNumbers(page, totalPages);
  const buttonStyle = (active: boolean): React.CSSProperties => ({
    minWidth: 36,
    padding: "6px 10px",
    border: `1.5px solid ${active ? "var(--ink)" : "var(--ink-4)"}`,
    background: active ? "var(--ink)" : "var(--paper)",
    color: active ? "var(--paper)" : "var(--ink)",
    fontFamily: "'Geist Mono', monospace",
    fontSize: 11,
    fontWeight: active ? 700 : 500,
    cursor: "pointer",
  });

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        margin: "0 0 48px",
        alignItems: "center",
      }}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        style={{ ...buttonStyle(false), opacity: page <= 1 ? 0.4 : 1 }}
      >
        ←
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`gap-${i}`}
            style={{
              padding: "6px 4px",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              color: "var(--ink-3)",
            }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            style={buttonStyle(p === page)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        style={{ ...buttonStyle(false), opacity: page >= totalPages ? 0.4 : 1 }}
      >
        →
      </button>
      <span
        style={{
          marginLeft: "auto",
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10.5,
          color: "var(--ink-3)",
        }}
      >
        Page {page} / {totalPages}
      </span>
    </nav>
  );
}

function pageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const result: (number | "...")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) result.push("...");
  for (let i = start; i <= end; i++) result.push(i);
  if (end < total - 1) result.push("...");
  result.push(total);
  return result;
}
