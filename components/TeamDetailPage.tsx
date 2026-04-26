import Link from "next/link";
import type { CSSProperties } from "react";
import { getAllPlayers, type RosterPlayer } from "@/app/players/data";
import { TEAM_NAME_TO_SLUG, TEAMS, type TeamData } from "@/app/teams/data";
import { BgLayers } from "@/components/BgLayers";
import { CustomScrollbar } from "@/components/CustomScrollbar";

interface TeamDetailPageProps {
  team: TeamData;
}

interface RosterCardData {
  id: string;
  name: string;
  nameEn?: string;
  org?: string;
  league?: string;
  title?: string;
  href: string;
  role?: string;
  birthplace?: string;
  joinYear?: number;
}

function buildRosterCards(team: TeamData): RosterCardData[] {
  const all = getAllPlayers();
  const byId = new Map<string, RosterPlayer>(all.map((p) => [p.id, p]));
  return team.currentRoster.map((rp) => {
    const p = byId.get(rp.id);
    if (!p) {
      return {
        id: rp.id,
        name: rp.id,
        href: `/players/${rp.id}`,
        role: rp.role,
      };
    }
    return {
      id: p.id,
      name: p.name,
      nameEn: p.nameEn,
      org: p.org,
      league: p.league,
      title: p.title,
      href: p.href ?? `/players/${p.id}`,
      role: rp.role,
      birthplace: p.birthplace,
      joinYear: p.joinYear,
    };
  });
}

function getOtherTeams(team: TeamData) {
  return TEAMS.filter((t) => t.slug !== team.slug).slice(0, 4);
}

function formatPoints(points?: number): string {
  if (points === undefined) return "—";
  const sign = points >= 0 ? "+" : "−";
  return `${sign}${Math.abs(points).toFixed(1)}`;
}

export function TeamDetailPage({ team }: TeamDetailPageProps) {
  const cards = buildRosterCards(team);
  const others = getOtherTeams(team);
  const accentStyle: CSSProperties = { color: team.color };
  const isDarkBg = team.background && team.background.toLowerCase() !== "#ffffff";
  const heroBgStyle: CSSProperties = {
    ...(team.background ? { background: team.background, color: team.colorOnDark ?? team.color } : {}),
    // 背景の透かし漢字をチームカンジに置き換え
    ["--hero-watermark" as string]: `"${team.kanji}"`,
    ["--hero-watermark-color" as string]: `${team.color}1f`,
  };

  return (
    <div className="wrap">
      <BgLayers />
      <CustomScrollbar />

      {/* ── HERO ─────────────────────────────── */}
      <section className="org-hero" style={heroBgStyle}>
        {team.slug === "sakura-knights" && <SakuraPetals />}
        {team.slug === "raiden" && <RaidenStorm />}
        {team.slug === "phoenix" && <PhoenixEmbers />}
        {team.slug === "drivens" && <DrivensRadar />}
        {team.slug === "furinkazan" && <FurinkazanMagma />}
        {team.slug === "konami" && <KonamiCRT />}
        {team.slug === "abemas" && <AbemasStars />}
        {team.slug === "pirates" && <PiratesSea />}
        {team.slug === "beast-x" && <BeastEyes />}
        {team.slug === "earth-jets" && <EarthLeaves />}
        <div className="crumb" style={{ color: isDarkBg ? "rgba(255,255,255,0.7)" : undefined }}>
          <Link href="/" style={{ color: "inherit" }}>Home</Link>
          <span className="sep">›</span>
          <Link href="/teams" style={{ color: "inherit" }}>Teams</Link>
          <span className="sep">›</span>
          <span>{team.shortName}</span>
        </div>
        <div className="top-grid">
          <div>
            <div
              className="org-code"
              style={{ color: team.color }}
            >
              MLEAGUE TEAM · {team.nameEn.toUpperCase()} · EST. {team.founded}
            </div>
            <h1 style={isDarkBg ? { color: team.colorOnDark ?? team.color } : undefined}>
              {team.name}
              <span
                className="en"
                style={isDarkBg ? { color: "rgba(255,255,255,0.6)" } : undefined}
              >
                {team.nameEn}
              </span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: team.color }}>● {team.tagline}</span>
              <span style={isDarkBg ? { background: "rgba(255,255,255,0.1)", color: team.colorOnDark ?? team.color, borderColor: "rgba(255,255,255,0.2)" } : undefined}>
                {team.parentCompany}
              </span>
              <span style={isDarkBg ? { background: "rgba(255,255,255,0.1)", color: team.colorOnDark ?? team.color, borderColor: "rgba(255,255,255,0.2)" } : undefined}>
                {team.joinedSeason} 参入
              </span>
              {team.championships > 0 && (
                <span style={{ background: team.color, color: team.background ?? "var(--ink)", borderColor: team.color }}>
                  優勝 {team.championships}回
                </span>
              )}
            </div>
          </div>
          <SeasonHistory team={team} />
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent" style={accentStyle}>{team.founded}</div>
            <div className="sub">{team.joinedSeason}シーズン参入</div>
          </div>
          <div className="m">
            <div className="l">Championships</div>
            <div className="v" style={team.championships > 0 ? accentStyle : undefined}>
              {team.championships}
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>回</span>
            </div>
            <div className="sub">{team.championships === 0 ? "未獲得" : `Mリーグ通算${team.championships}度の優勝`}</div>
          </div>
          <div className="m">
            <div className="l">Final Appearances</div>
            <div className="v">
              {team.finalAppearances}
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>回</span>
            </div>
            <div className="sub">ファイナル進出回数</div>
          </div>
          <div className="m">
            <div className="l">Players</div>
            <div className="v">
              {team.currentRoster.length}
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">現役Mリーガー</div>
          </div>
          <div className="m">
            <div className="l">Coach</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22 }}>{team.coach.replace(/\s+/g, "").slice(0, 4)}</div>
            <div className="sub">{team.coachIsPlayer ? "選手兼任" : "監督"} {team.coach}</div>
          </div>
        </div>
      </section>

      {/* ── ABOUT + 基本情報 ─────────────────────────────── */}
      <div className="intro-block">
        <div className="intro-main">
          <h2>
            チーム紹介<span className="en">About {team.shortName}</span>
          </h2>
          <div className="lead">
            {team.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pullquote">{team.tagline}</div>
        </div>
        <div className="intro-side">
          <h3>
            チーム情報<span className="en">At a Glance</span>
          </h3>
          <dl>
            <dt>チーム名</dt>
            <dd>
              <b>{team.name}</b>
              <br />
              <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
                {team.nameEn}
              </span>
            </dd>
            <dt>運営会社</dt>
            <dd>
              {team.parentCompanyHref ? (
                <a href={team.parentCompanyHref} target="_blank" rel="noopener noreferrer">
                  {team.parentCompany}
                </a>
              ) : (
                team.parentCompany
              )}
              {team.parentCompanyEn && (
                <>
                  <br />
                  <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
                    {team.parentCompanyEn}
                  </span>
                </>
              )}
            </dd>
            <dt>Mリーグ参入</dt>
            <dd>
              {team.joinedSeason}シーズン
              <br />
              <span style={{ color: "var(--ink-3)", fontSize: 11 }}>
                参入{new Date().getFullYear() - team.founded + 1}年目
              </span>
            </dd>
            <dt>監督</dt>
            <dd>
              {team.coach}
              {team.coachIsPlayer && <small style={{ display: "block", color: "var(--ink-3)" }}>選手兼任</small>}
            </dd>
            <dt>通算成績</dt>
            <dd>
              優勝 <b>{team.championships}</b>回 / ファイナル <b>{team.finalAppearances}</b>回
            </dd>
            {team.social && team.social.length > 0 && (
              <>
                <dt>SNS</dt>
                <dd>
                  {team.social.map((s, i) => (
                    <span key={i}>
                      {i > 0 && " / "}
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.handle ?? s.label}
                      </a>
                    </span>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </div>
      </div>

      {/* ── 現役選手 ─────────────────────────────── */}
      <h2 className="sh">
        <span>現役選手</span>
        <span className="num">Active Players · {cards.length} Pros</span>
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
        {cards.map((c, idx) => {
          const glyph = c.name.charAt(0);
          const code = `${String(idx + 1).padStart(2, "0")} · ${c.nameEn?.toUpperCase() ?? c.name}`;
          return (
            <Link
              key={c.id}
              href={c.href}
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
                  background: team.color,
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
                  color: team.color,
                  opacity: 0.18,
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
                }}
              >
                {c.name}
              </h3>
              {c.nameEn && (
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: "italic",
                    fontSize: 14,
                    color: "var(--ink-3)",
                    marginBottom: 10,
                  }}
                >
                  {c.nameEn}
                </div>
              )}
              {c.role && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'Noto Sans JP', sans-serif",
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "var(--ink-2)",
                    marginBottom: 12,
                    letterSpacing: "0.02em",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: team.color,
                      flexShrink: 0,
                    }}
                  />
                  {c.role}
                </div>
              )}
              <div
                style={{
                  borderTop: "1.5px solid var(--ink)",
                  paddingTop: 12,
                  marginBottom: 12,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: 12.5,
                  color: "var(--ink-2)",
                }}
              >
                {c.title && (
                  <div style={{ fontWeight: 700, marginBottom: 3 }}>{c.title}</div>
                )}
                {c.org && (
                  <div style={{ color: "var(--ink-3)" }}>
                    {c.org}{c.league ? ` · ${c.league}` : ""}
                    {c.joinYear ? ` · ${c.joinYear}年入会` : ""}
                  </div>
                )}
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
                  color: team.color,
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

      {/* ── シーズン成績 ─────────────────────────────── */}
      <h2 className="sh">
        <span>シーズン成績</span>
        <span className="num">Season-by-Season · {team.seasons.length} Seasons</span>
        <span className="rule"></span>
      </h2>
      <section
        style={{
          margin: "0 0 48px",
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          padding: 0,
        }}
      >
        <table className="roster-table">
          <thead>
            <tr>
              <th>シーズン</th>
              <th>結果</th>
              <th>順位</th>
              <th className="n">通算ポイント</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {team.seasons.map((s) => {
              const isChamp = s.result === "champion";
              const isFinal = s.result === "final";
              const isOngoing = s.result === "ongoing";
              return (
                <tr key={s.season} className={isChamp ? "top3" : undefined}>
                  <td className={`rk ${isChamp ? "top3" : ""}`.trim()} style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 700 }}>
                    {s.season}
                  </td>
                  <td>
                    {isChamp && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 12px",
                          background: "var(--ink)",
                          color: "var(--paper)",
                          fontFamily: "'Shippori Mincho', serif",
                          fontWeight: 800,
                          fontSize: 12,
                          letterSpacing: "0.04em",
                        }}
                      >
                        <span style={{ color: team.color, fontSize: 13 }}>★</span>
                        優勝
                      </span>
                    )}
                    {isFinal && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: "4px 12px",
                          border: "1.5px solid var(--ink-2)",
                          color: "var(--ink)",
                          fontFamily: "'Geist Mono', monospace",
                          fontWeight: 700,
                          fontSize: 10.5,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: team.color,
                          }}
                        />
                        Final
                      </span>
                    )}
                    {s.result === "semifinal" && (
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 11px",
                          border: "1px solid var(--ink-4)",
                          color: "var(--ink-3)",
                          fontFamily: "'Geist Mono', monospace",
                          fontSize: 10.5,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Semi
                      </span>
                    )}
                    {s.result === "regular" && (
                      <span
                        style={{
                          color: "var(--ink-3)",
                          fontSize: 11,
                          fontFamily: "'Geist Mono', monospace",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Regular
                      </span>
                    )}
                    {isOngoing && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 11px",
                          background: "var(--ink)",
                          color: "var(--paper)",
                          fontFamily: "'Geist Mono', monospace",
                          fontWeight: 700,
                          fontSize: 10.5,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: team.color,
                            boxShadow: `0 0 6px ${team.color}`,
                            animation: "blink 1.4s ease-in-out infinite",
                          }}
                        />
                        Now
                      </span>
                    )}
                  </td>
                  <td>
                    {s.rank ? (
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 700 }}>
                        {s.rank}位
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink-3)" }}>—</span>
                    )}
                  </td>
                  <td className="n">
                    {s.points !== undefined ? (
                      <span style={{ color: s.points >= 0 ? "var(--ink)" : "var(--vermilion)" }}>
                        {formatPoints(s.points)}
                      </span>
                    ) : (
                      <span style={{ color: "var(--ink-3)" }}>—</span>
                    )}
                  </td>
                  <td style={{ color: "var(--ink-3)", fontSize: 12 }}>{s.note ?? ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ── マイルストーン + 過去の選手 ─────────────────────────────── */}
      <div className="two-col">
        <section className="timeline">
          <h3>
            チームの歩み<span className="en">Milestones</span>
          </h3>
          {team.milestones.map((m) => (
            <div key={m.year + m.title} className="tl-item">
              <div className="yr">
                {m.year}
                <small>{m.kind}</small>
              </div>
              <div className="ev">
                {m.title}
                <small>{m.desc}</small>
              </div>
            </div>
          ))}
        </section>

        <section className="champions">
          <h3>
            元在籍選手<span className="en">Past Members</span>
          </h3>
          {team.pastMembers.length > 0 ? (
            team.pastMembers.map((p) => (
              <div key={p.name + p.years} className="champ-row">
                <span className="ep" style={{ fontFamily: "'Geist Mono'", fontSize: 11 }}>
                  {p.years.split("-")[0]}
                  <small>〜</small>
                </span>
                <span className="ch-name">
                  {p.name}
                  {p.note && <small>{p.note}</small>}
                </span>
                <span className="ch-yr">{p.years.split("-")[1] ?? "現在"}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: 24, color: "var(--ink-3)", fontSize: 13 }}>
              退団者なし — 創設メンバーが現役在籍中
            </div>
          )}
        </section>
      </div>

      {/* ── 他チーム ─────────────────────────────── */}
      <h2 className="sh" style={{ marginTop: 28 }}>
        <span>他チームを見る</span>
        <span className="num">Other Teams</span>
        <span className="rule"></span>
        <Link href="/teams" className="more" style={{ textDecoration: "none" }}>
          全10チーム →
        </Link>
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 48,
        }}
      >
        {others.map((t) => (
          <Link
            key={t.slug}
            href={`/teams/${t.slug}`}
            className="related-card"
            style={{
              background: t.background ?? "var(--paper)",
              color: t.colorOnDark ?? t.color,
              boxShadow: "5px 5px 0 var(--ink)",
              border: "var(--border)",
              display: "block",
            }}
          >
            <div className="meta" style={{ color: t.color, fontFamily: "'Geist Mono'", fontSize: 10 }}>
              MLEAGUE · EST. {t.founded}
            </div>
            <div className="nm" style={{ fontSize: 18, marginTop: 6, fontWeight: 800 }}>
              {t.shortName}
            </div>
            <div className="meta" style={{ color: t.colorOnDark ?? t.color, opacity: 0.7, marginTop: 4, fontSize: 11 }}>
              {t.parentCompany}
            </div>
            <span
              className="tag"
              style={{ background: t.color, color: t.background ?? "var(--ink)", marginTop: 10 }}
            >
              {t.championships > 0 ? `優勝 ${t.championships}回` : "挑戦中"}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Mリーグ全体カード ─────────────────────────────── */}
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
        <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>Mリーグ全体ページへ</div>
        <div className="meta" style={{ color: "rgba(255,255,255,0.6)", marginTop: 6 }}>
          全10チームの順位・スケジュール・最新ニュース
        </div>
        <span className="tag" style={{ background: "var(--paper)", color: "var(--ink)", marginTop: 14 }}>
          リーグページへ →
        </span>
      </Link>
    </div>
  );
}

export { TEAM_NAME_TO_SLUG };

// セガサミーフェニックス: 上昇する火の粉
function PhoenixEmbers() {
  const embers = Array.from({ length: 32 }, (_, i) => i);
  const tones = ["", "bright", "deep"];
  return (
    <div className="phoenix-embers" aria-hidden="true">
      {embers.map((i) => {
        const x = (i * 13.7 + (i % 4) * 3) % 100;
        const baseSize = 3 + (i % 5) * 1.2;
        const dur = 9 + ((i * 1.7) % 9);
        const delay = -((i * 0.9) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (12 + ((i * 7) % 24));
        const peak = i % 4 === 0 ? 0.55 : 0.9;
        const isFar = i % 5 === 0;
        const tone = tones[i % tones.length];
        return (
          <span
            key={i}
            className={["ember", tone, isFar ? "depth-far" : ""].filter(Boolean).join(" ")}
            style={{
              left: `${x.toFixed(1)}%`,
              width: `${baseSize.toFixed(1)}px`,
              height: `${baseSize.toFixed(1)}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              ["--peak" as string]: `${peak}`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// 赤坂ドリブンズ: 斜めの探照光が連続的にスイープ
function DrivensRadar() {
  // 5本のビームが異なる角度・幅・速度・位相で sweep
  const beams = [
    { angle: 22, width: 280, dur: 11.5, delay: 0,    thin: false },
    { angle: 18, width: 160, dur: 8.5,  delay: -2.3, thin: true },
    { angle: 28, width: 380, dur: 14.0, delay: -5.7, thin: false },
    { angle: 16, width: 120, dur: 7.0,  delay: -1.1, thin: true },
    { angle: 24, width: 240, dur: 10.0, delay: -7.2, thin: false },
  ];
  return (
    <div className="drivens-scan" aria-hidden="true">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      {beams.map((b, i) => (
        <span
          key={i}
          className={`beam${b.thin ? " thin" : ""}`}
          style={{
            ["--angle" as string]: `${b.angle}deg`,
            ["--w" as string]: `${b.width}px`,
            ["--dur" as string]: `${b.dur}s`,
            ["--delay" as string]: `${b.delay}s`,
            width: `${b.width}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// 稲妻SVG (枝分かれ込み、ジグザグ路径)
function LightningBolt({ variant = 0 }: { variant?: number }) {
  const paths = [
    // パターン1: 中央寄りジグザグ + 右枝
    "M40 0 L30 50 L52 58 L26 110 L48 118 L18 200 M44 70 L62 78",
    // パターン2: 大きく左右に振れる + 下枝
    "M50 0 L66 40 L40 56 L70 96 L42 120 L62 200 M48 130 L34 158",
    // パターン3: 急角度の鋭い形 + 二股
    "M45 0 L34 38 L56 50 L30 88 L54 102 L36 200 M52 110 L72 132 M46 60 L28 78",
  ];
  const i = variant % paths.length;
  return (
    <svg
      viewBox="0 0 90 200"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <path d={paths[i]} />
    </svg>
  );
}

function RaidenStorm() {
  // 3組の (フラッシュ + 稲妻) を異なる周期で配置。各組が独立したリズムで光る。
  const events = [
    { cx: "25%", cy: "20%", left: "18%", scale: 1.0, dur: 8.5, delay: 0, variant: 0, fine: false },
    { cx: "70%", cy: "35%", left: "62%", scale: 0.85, dur: 11.2, delay: 3.6, variant: 1, fine: false },
    { cx: "48%", cy: "12%", left: "44%", scale: 1.15, dur: 13.7, delay: 7.4, variant: 2, fine: true },
  ];
  return (
    <div className="raiden-storm" aria-hidden="true">
      {events.map((e, i) => (
        <span key={`flash-${i}`}
          className="flash"
          style={{
            ["--cx" as string]: e.cx,
            ["--cy" as string]: e.cy,
            ["--dur" as string]: `${e.dur}s`,
            ["--delay" as string]: `${e.delay}s`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
      {events.map((e, i) => (
        <span
          key={`bolt-${i}`}
          className={`bolt${e.fine ? " fine" : ""}`}
          style={{
            left: e.left,
            ["--w" as string]: `${90 * e.scale}px`,
            ["--h" as string]: `${230 * e.scale}px`,
            width: `${90 * e.scale}px`,
            height: `${230 * e.scale}px`,
            ["--dur" as string]: `${e.dur}s`,
            ["--delay" as string]: `${e.delay}s`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        >
          <LightningBolt variant={e.variant} />
        </span>
      ))}
    </div>
  );
}

// シーズン履歴ミニチャート (旧kite位置に配置)
function SeasonHistory({ team }: { team: TeamData }) {
  const seasons = team.seasons;
  const maxRank = 10;
  return (
    <div
      className="season-chart"
      style={{ ["--team-color" as string]: team.color }}
    >
      <div className="head">
        <span>SEASON HISTORY</span>
        <span>{team.championships > 0 ? `★ ${team.championships}` : "—"}</span>
      </div>
      {seasons.map((s) => {
        const rank = s.rank ?? 0;
        const fillPct = rank ? Math.max(8, ((maxRank + 1 - rank) / maxRank) * 100) : 50;
        const isOngoing = s.result === "ongoing";
        const yearShort = `'${s.season.slice(2, 4)}-${s.season.slice(7, 9) || s.season.slice(5)}`;
        const cls = ["cell", s.result || "regular"].join(" ");
        return (
          <div key={s.season} className={cls}>
            <span className="yr">{yearShort}</span>
            <div className="bar-wrap">
              <span
                className="bar"
                style={{ width: isOngoing ? "60%" : `${fillPct}%` }}
              />
            </div>
            <span className="rk">
              {isOngoing ? "●" : rank ? rank : "—"}
              {s.result === "champion" && <span className="star">★</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// EX風林火山: マグマ湧出 (底部発光 + 上昇する溶岩塊 + 火の粉)
function FurinkazanMagma() {
  // 大きめの溶岩塊
  const blobs = Array.from({ length: 7 }, (_, i) => i);
  // 細かい火の粉
  const sparks = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="furinkazan-magma" aria-hidden="true">
      {blobs.map((i) => {
        const x = (i * 17 + (i % 3) * 6) % 100;
        const size = 80 + (i % 4) * 35;
        const dur = 13 + ((i * 1.7) % 10);
        const delay = -((i * 2.3) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (18 + ((i * 7) % 24));
        const peak = i % 3 === 0 ? 0.9 : 0.7;
        return (
          <span
            key={`b-${i}`}
            className="blob"
            style={{
              left: `${x.toFixed(1)}%`,
              width: `${size}px`,
              height: `${size}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              ["--peak" as string]: `${peak}`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
      {sparks.map((i) => {
        const x = (i * 13.7 + (i % 4) * 3) % 100;
        const size = 2 + (i % 4);
        const dur = 4 + ((i * 0.9) % 5);
        const delay = -((i * 0.6) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (8 + ((i * 5) % 16));
        return (
          <span
            key={`s-${i}`}
            className="spark"
            style={{
              left: `${x.toFixed(1)}%`,
              width: `${size}px`,
              height: `${size}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

// KONAMI: CRT スキャンライン + 縦グリッチ閃光
function KonamiCRT() {
  const glitches = [
    { x: 18, dur: 7.0, delay: 0 },
    { x: 42, dur: 9.5, delay: -3 },
    { x: 67, dur: 8.0, delay: -5.5 },
    { x: 84, dur: 11.0, delay: -1.2 },
  ];
  const vlines = [
    { x: 12, delay: 0 },
    { x: 31, delay: -1.4 },
    { x: 56, delay: -2.6 },
    { x: 78, delay: -3.8 },
    { x: 92, delay: -0.7 },
  ];
  return (
    <div className="konami-crt" aria-hidden="true">
      {glitches.map((g, i) => (
        <span
          key={`g-${i}`}
          className="glitch"
          style={{
            left: `${g.x}%`,
            ["--dur" as string]: `${g.dur}s`,
            ["--delay" as string]: `${g.delay}s`,
            animationDuration: `${g.dur}s`,
            animationDelay: `${g.delay}s`,
            ["--w" as string]: `${4 + (i % 3) * 3}px`,
            width: `${4 + (i % 3) * 3}px`,
          }}
        />
      ))}
      {vlines.map((v, i) => (
        <span
          key={`v-${i}`}
          className="vline"
          style={{
            left: `${v.x}%`,
            ["--delay" as string]: `${v.delay}s`,
            animationDelay: `${v.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// 渋谷ABEMAS: 星屑のきらめき + 金色の稲妻
function AbemasStars() {
  const stars = Array.from({ length: 38 }, (_, i) => i);
  const bolts = [
    { x: 18, y: 12, h: 140, angle: 18, dur: 6.5, delay: 0 },
    { x: 38, y: 22, h: 110, angle: -16, dur: 7.5, delay: -1.4 },
    { x: 58, y: 8,  h: 160, angle: 14, dur: 8.5, delay: -3.0 },
    { x: 76, y: 26, h: 120, angle: -22, dur: 9.0, delay: -4.6 },
    { x: 90, y: 14, h: 100, angle: 20, dur: 7.0, delay: -5.8 },
    { x: 8,  y: 32, h: 130, angle: -14, dur: 10.0, delay: -2.4 },
    { x: 48, y: 36, h: 90,  angle: 22, dur: 6.0, delay: -3.7 },
  ];
  return (
    <div className="abemas-stars" aria-hidden="true">
      {stars.map((i) => {
        const x = (i * 17.3 + (i % 4) * 3) % 100;
        const y = (i * 11.7 + (i % 3) * 5) % 95;
        const size = 1.5 + (i % 5) * 0.7;
        const dur = 3 + ((i * 0.9) % 4);
        const delay = -(i * 0.3) % dur;
        const isBig = i % 7 === 0;
        return (
          <span
            key={i}
            className={`star${isBig ? " big" : ""}`}
            style={{
              left: `${x.toFixed(1)}%`,
              top: `${y.toFixed(1)}%`,
              ["--s" as string]: `${size.toFixed(1)}px`,
              width: `${size.toFixed(1)}px`,
              height: `${size.toFixed(1)}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
      {bolts.map((b, i) => (
        <span
          key={`bolt-${i}`}
          className="gold-bolt"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            ["--h" as string]: `${b.h}px`,
            height: `${b.h}px`,
            ["--angle" as string]: `${b.angle}deg`,
            ["--dur" as string]: `${b.dur}s`,
            ["--delay" as string]: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// U-NEXT Pirates: 海のうねり + 上昇する泡
function PiratesSea() {
  const wavePath = "M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z";
  const bubbles = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="pirates-sea" aria-hidden="true">
      {bubbles.map((i) => {
        const x = (i * 13.7 + (i % 3) * 4) % 100;
        const size = 4 + (i % 5) * 1.5;
        const dur = 8 + ((i * 1.3) % 7);
        const delay = -((i * 0.9) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (8 + ((i * 5) % 16));
        return (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${x.toFixed(1)}%`,
              ["--s" as string]: `${size.toFixed(1)}px`,
              width: `${size.toFixed(1)}px`,
              height: `${size.toFixed(1)}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
      <div
        className="wave"
        style={{
          ["--bot" as string]: "-30px",
          ["--h" as string]: "100px",
          ["--op" as string]: "0.3",
          ["--dur" as string]: "22s",
          height: "100px",
          opacity: 0.3,
          animationDuration: "22s",
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d={wavePath} fill="rgba(61, 223, 255, 0.4)" />
          <path
            d={wavePath}
            fill="none"
            stroke="rgba(61, 223, 255, 0.85)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div
        className="wave"
        style={{
          ["--bot" as string]: "-50px",
          ["--h" as string]: "120px",
          ["--op" as string]: "0.45",
          ["--dur" as string]: "16s",
          height: "120px",
          opacity: 0.45,
          animationDuration: "16s",
        }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d={wavePath} fill="rgba(0, 156, 235, 0.55)" />
        </svg>
      </div>
    </div>
  );
}

// BEAST X: 暗闇に光る獣眼 (ペアの黄金色ドット) + 横切る薄影
function BeastEyes() {
  const eyes = [
    { x: "12%", y: "28%", size: 5, gap: 9, dur: 7, delay: 0 },
    { x: "78%", y: "18%", size: 4, gap: 8, dur: 9, delay: -2.5 },
    { x: "32%", y: "70%", size: 6, gap: 11, dur: 11, delay: -5.2 },
    { x: "62%", y: "62%", size: 5, gap: 9, dur: 8, delay: -1.7 },
    { x: "88%", y: "78%", size: 4, gap: 7, dur: 10, delay: -6.8 },
    { x: "5%", y: "55%", size: 4, gap: 7, dur: 12, delay: -3.4 },
    { x: "46%", y: "12%", size: 5, gap: 9, dur: 9, delay: -8 },
  ];
  return (
    <div className="beast-eyes" aria-hidden="true">
      <span className="shadow" style={{ animationDelay: "0s" }} />
      <span className="shadow" style={{ animationDelay: "-9s", opacity: 0.7 }} />
      {eyes.map((e, i) => (
        <span
          key={i}
          className="eyes"
          style={{
            left: e.x,
            top: e.y,
            ["--gap" as string]: `${e.gap}px`,
            ["--s" as string]: `${e.size}px`,
            ["--dur" as string]: `${e.dur}s`,
            ["--delay" as string]: `${e.delay}s`,
            gap: `${e.gap}px`,
            animationDuration: `${e.dur}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// EARTH JETS: 緑葉が舞い、ヒューシフトでカメレオン的な色変化
function EarthLeaves() {
  const leaves = Array.from({ length: 22 }, (_, i) => i);
  return (
    <div className="earth-leaves" aria-hidden="true">
      {leaves.map((i) => {
        const x = (i * 17 + (i % 3) * 4) % 100;
        const w = 7 + (i % 5) * 1.5;
        const h = w + 3 + (i % 3);
        const dur = 11 + ((i * 1.7) % 9);
        const delay = -((i * 1.1) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (28 + ((i * 11) % 60));
        const r0 = ((i * 31) % 360) - 180;
        const r1 = r0 + (i % 2 === 0 ? 540 : -540);
        const peak = i % 4 === 0 ? 0.6 : 0.9;
        const isBright = i % 3 === 0;
        const hueDur = 6 + ((i * 0.7) % 5);
        const hueDelay = -((i * 0.4) % hueDur);
        return (
          <span
            key={i}
            className={`leaf${isBright ? " bright" : ""}`}
            style={{
              left: `${x.toFixed(1)}%`,
              width: `${w.toFixed(1)}px`,
              height: `${h.toFixed(1)}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              ["--r0" as string]: `${r0}deg`,
              ["--r1" as string]: `${r1}deg`,
              ["--peak" as string]: `${peak}`,
              ["--hue-dur" as string]: `${hueDur.toFixed(2)}s`,
              ["--hue-delay" as string]: `${hueDelay.toFixed(2)}s`,
              animationDuration: `${dur.toFixed(2)}s, ${hueDur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s, ${hueDelay.toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function SakuraPetals() {
  // 36枚を3形状 × 3色調 × 2深度でブレンドして自然な散らばりに
  const petals = Array.from({ length: 36 }, (_, i) => i);
  const shapes = ["", "shape-b", "shape-c"];
  const tones = ["", "tone-pale", "tone-deep"];
  return (
    <div className="sakura-fall" aria-hidden="true">
      {petals.map((i) => {
        const x = (i * 17 + (i % 3) * 4) % 100;
        const baseSize = 5 + (i % 5) * 1.5;
        const w = baseSize + (i % 2);
        const h = baseSize * (1 + ((i % 3) * 0.15));
        const dur = 12 + ((i * 1.7) % 10);
        const delay = -((i * 1.3) % dur);
        const sway = (i % 2 === 0 ? 1 : -1) * (24 + ((i * 9) % 36));
        const r0 = ((i * 31) % 360) - 180;
        const r1 = r0 + (i % 2 === 0 ? 360 : -360);
        const peak = i % 4 === 0 ? 0.55 : 0.85;
        const isFar = i % 4 === 0;
        const shape = shapes[i % shapes.length];
        const tone = tones[(i + 1) % tones.length];
        return (
          <span
            key={i}
            className={["petal", shape, tone, isFar ? "depth-far" : ""]
              .filter(Boolean)
              .join(" ")}
            style={{
              left: `${x}%`,
              width: `${w.toFixed(1)}px`,
              height: `${h.toFixed(1)}px`,
              ["--dur" as string]: `${dur.toFixed(2)}s`,
              ["--delay" as string]: `${delay.toFixed(2)}s`,
              ["--sway" as string]: `${sway}px`,
              ["--r0" as string]: `${r0}deg`,
              ["--r1" as string]: `${r1}deg`,
              ["--peak" as string]: `${peak}`,
              animationDuration: `${dur.toFixed(2)}s`,
              animationDelay: `${delay.toFixed(2)}s`,
            }}
          />
        );
      })}
    </div>
  );
}
