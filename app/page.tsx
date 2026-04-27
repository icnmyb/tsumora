import Link from "next/link";
import { ALL_PLAYERS, ROSTER_PLAYERS } from "@/app/players/data";
import { TEAMS } from "@/app/teams/data";
import { TITLES } from "@/app/titles/data";
import {
  computeMleagueStandings,
  computeTitleRanking,
  fmtPts,
  getCurrentTitlists,
} from "@/lib/computed";

type Tile = { glyph: string; variant?: "red" | "green"; left: string; duration: string; delay: string; rotate: string };

// 全 5団体・Featured + Roster 合算
const _ORG_COUNTS: Record<string, number> = {};
for (const p of [...ALL_PLAYERS, ...ROSTER_PLAYERS]) {
  _ORG_COUNTS[p.org] = (_ORG_COUNTS[p.org] ?? 0) + 1;
}
const ORG_COUNTS = _ORG_COUNTS;
const TOTAL_PROS = Object.values(ORG_COUNTS).reduce((a, b) => a + b, 0);

const HERO_TILES: Tile[] = [
  { glyph: "一", left: "8%", duration: "9s", delay: "0s", rotate: "-8deg" },
  { glyph: "中", variant: "red", left: "18%", duration: "12s", delay: "-3s", rotate: "4deg" },
  { glyph: "東", left: "28%", duration: "10s", delay: "-6s", rotate: "-2deg" },
  { glyph: "發", variant: "green", left: "42%", duration: "11s", delay: "-1s", rotate: "6deg" },
  { glyph: "九", left: "55%", duration: "13s", delay: "-7s", rotate: "-5deg" },
  { glyph: "南", left: "68%", duration: "10s", delay: "-4s", rotate: "3deg" },
  { glyph: "中", variant: "red", left: "80%", duration: "14s", delay: "-2s", rotate: "-4deg" },
  { glyph: "白", left: "90%", duration: "9s", delay: "-8s", rotate: "7deg" },
];

const MLEAGUE_LOGO_COLORS: Record<string, string> = {
  konami: "#e63946",
  abemas: "#E4BD7A",
  phoenix: "#F27100",
  "sakura-knights": "#ffccf5",
  pirates: "#3DDFFF",
  drivens: "#c6ff4d",
  furinkazan: "#ff4040",
  raiden: "#ffd91a",
  "beast-x": "#d4a72c",
  "earth-jets": "#1E9627",
};

const KANJI_RANK = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

export default function Home() {
  const standings = computeMleagueStandings();
  const leader = standings[0];
  const titleRanking = computeTitleRanking().slice(0, 5);
  const currentTitlists = getCurrentTitlists();

  return (
    <div className="wrap">
      {/* HERO: 現タイトル保持者 + Mリーグ今期首位 */}
      <section className="hero" style={{ marginBottom: 14 }}>
        <div className="hero-lead">
          <div className="bg-tiles">
            {HERO_TILES.map((t, i) => (
              <div
                key={i}
                className={`tile${t.variant ? ` ${t.variant}` : ""}`}
                data-glyph={t.glyph}
                style={
                  {
                    left: t.left,
                    animationDuration: t.duration,
                    animationDelay: t.delay,
                    ["--r" as string]: t.rotate,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="kicker">Current Titlists · 現タイトル保持者</div>
          <h2>
            7冠の<span className="em">いま。</span>
            <span className="en">The state of Japan&apos;s major mahjong titles.</span>
          </h2>
          <div className="lead-body">
            主要7タイトル戦の現保持者。連盟・協会・最高位戦・RMU の4団体から、
            Mリーグ参戦選手も多数。各タイトルカードをクリックで歴代優勝者・ルール
            ・主要マイルストーンへ。
          </div>
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 10,
            }}
          >
            {currentTitlists.slice(0, 4).map((t) => (
              <Link
                key={t.title.slug}
                href={`/titles/${t.title.slug}`}
                style={{
                  background: "rgba(235,228,210,.05)",
                  border: "1.5px solid rgba(235,228,210,.2)",
                  padding: "10px 12px",
                  textDecoration: "none",
                  color: "var(--paper)",
                  display: "block",
                }}
              >
                <div
                  style={{
                    fontFamily: "Geist Mono, ui-monospace, monospace",
                    fontSize: 9.5,
                    letterSpacing: "0.14em",
                    color: t.title.color,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  ● {t.title.shortName ?? t.title.name}
                </div>
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 900,
                    fontSize: 18,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.holder.name}
                </div>
                {t.holder.note && (
                  <div
                    style={{
                      fontFamily: "Geist Mono, ui-monospace, monospace",
                      fontSize: 9,
                      color: "rgba(235,228,210,.55)",
                      marginTop: 3,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {t.holder.note}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="hero-scores">
          <div className="hd">
            <span>M.LEAGUE STANDINGS</span>
            <span className="live">● 2025-26 進行中</span>
          </div>
          <div className="body">
            <div className="sub">M.LEAGUE · 2025-26 シーズン</div>
            <h3>{leader.team.name}</h3>
            <div className="h-note">
              現首位 · {leader.rosterPlayers.length}名のptを合算
            </div>

            {standings.slice(0, 4).map((s, idx) => (
              <div key={s.team.slug} className={`score-row${idx === 0 ? " lead" : ""}`}>
                <span className="rk">{KANJI_RANK[idx]}</span>
                <span className="name">{s.team.shortName}</span>
                <span className={`pt${s.totalPts < 0 ? " m" : ""}`}>{fmtPts(s.totalPts)}</span>
              </div>
            ))}
          </div>
          <div className="score-footer">
            <span>順位は選手のannualPointsから算出</span>
            <Link href="/mleague" style={{ color: "var(--vermilion)" }}>▶ 詳細</Link>
          </div>
        </div>
      </section>

      {/* DATA NOTE: 試合データ未整備 */}
      <section
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow-sm)",
          padding: "16px 22px",
          marginBottom: 14,
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: 13,
          color: "var(--ink-2)",
          lineHeight: 1.6,
        }}
      >
        <span
          style={{
            fontFamily: "Geist Mono, ui-monospace, monospace",
            fontSize: 10,
            letterSpacing: "0.16em",
            color: "var(--vermilion)",
            fontWeight: 700,
            marginRight: 10,
          }}
        >
          NOTE
        </span>
        日次の対局スケジュール・試合進行データは現在未整備のため、
        「本日の対局」「今すぐ視聴」セクションは表示していません。スケジュール詳細は{" "}
        <Link href="/schedule" style={{ borderBottom: "1px dotted var(--ink)" }}>
          /schedule
        </Link>
        {" の年間オーバービューをご覧ください。"}
      </section>

      <div className="grid-2col">
        <div className="col">
          {/* TITLES (動的データ) */}
          <section className="titles-section">
            <h2>
              <span>タイトル戦</span>
              <span className="num italic">Title Races</span>
              <span className="rule"></span>
              <Link href="/titles" className="more">ALL TITLES →</Link>
            </h2>
            <div className="titles-grid">
              {TITLES.slice(0, 3).map((t) => {
                const recentChamps = t.pastChampions.slice(0, 4);
                return (
                  <div
                    key={t.slug}
                    className="title-card"
                    style={{ ["--c" as string]: t.color } as React.CSSProperties}
                  >
                    <div className="org-tag"><span className="sw"></span>{t.org} · {t.orgLabel}</div>
                    <div className="big-kanji">{t.glyph}</div>
                    <h3><Link href={`/titles/${t.slug}`}>{t.name}</Link></h3>
                    <div className="edition">
                      {t.formatLabel}
                    </div>
                    <div className="standings">
                      <div className="sr l">
                        <span className="r">現</span>
                        <span className="nm">{t.holder?.name ?? "—"}</span>
                        <span className="pt plus">保持者</span>
                      </div>
                      {recentChamps.slice(0, 4).map((c, i) => (
                        <div key={`${c.ep}-${c.name}-${i}`} className="sr">
                          <span className="r">{c.ep}</span>
                          <span className="nm">{c.name}</span>
                          <span className="pt">{c.year}</span>
                        </div>
                      ))}
                    </div>
                    <div className="prize">
                      <span>FOUNDED <b>{t.founded ?? "—"}</b></span>
                      <span>WINNERS <b>{t.pastChampions.length}件</b></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ORGS */}
          <section className="orgs-section">
            <h2>
              <span>プロ団体</span>
              <span className="num italic">Organizations</span>
              <span className="rule"></span>
              <Link href="/organizations" className="more">COMPARE →</Link>
            </h2>
            <div className="orgs-grid">
              {[
                { c: "#c8282a", idx: "01", code: "JPML · 1981", jp: ["日本プロ麻雀", "連盟"], pros: ORG_COUNTS["JPML"]?.toLocaleString() ?? "—", titles: "鳳凰位戦 / 十段位戦 / 王位戦", main: "鳳凰位戦 · 十段位戦 · 王位戦 · 女流桜花", href: "/organizations/jpml" },
                { c: "#1d4ed8", idx: "02", code: "NPM · 2001", jp: ["日本プロ麻雀", "協会"], pros: ORG_COUNTS["NPM"]?.toLocaleString() ?? "—", titles: "雀王戦 / 雀竜位戦", main: "雀王戦 · 雀竜位戦 · 日本オープン", href: "/organizations/npm" },
                { c: "#0b0b09", idx: "03", code: "SAIKOUISEN · 1976", jp: ["最高位戦", "日本プロ麻雀協会"], pros: ORG_COUNTS["最高位戦"]?.toLocaleString() ?? "—", titles: "最高位戦 / Classic", main: "最高位決定戦 · Classic · 發王戦", href: "/organizations/saikouisen" },
                { c: "#c8a030", idx: "04", code: "RMU · 2007", jp: ["RMU"], pros: ORG_COUNTS["RMU"]?.toLocaleString() ?? "—", titles: "令昭位戦 / RMUクラウン", main: "令昭位戦 · RMUクラウン · 闘魂杯", href: "/organizations/rmu" },
                { c: "#4b2a7a", idx: "05", code: "μ · 1997", jp: ["麻将連合", "-μ-"], pros: ORG_COUNTS["μ"]?.toLocaleString() ?? "—", titles: "μリーグ", main: "μリーグ · BIG1カップ · 将妃戦", href: "/organizations/mu" },
              ].map((o, i) => {
                const inner = (
                  <>
                    <div className="stripe"></div>
                    <div className="body">
                      <div className="idx">{o.idx}</div>
                      <div className="code">{o.code}</div>
                      <div className="jp">
                        {o.jp.map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < o.jp.length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <div className="stat-row">
                        <div className="s">
                          <div className="l">所属プロ</div>
                          <div className="v">{o.pros}</div>
                        </div>
                        <div className="s">
                          <div className="l">主要タイトル</div>
                          <div className="v" style={{ fontSize: 12, lineHeight: 1.4 }}>{o.titles}</div>
                        </div>
                      </div>
                      <div className="titles-list">
                        <span className="lb">MAIN TITLES</span>
                        {o.main}
                      </div>
                    </div>
                  </>
                );
                return (
                  <Link
                    key={i}
                    href={o.href}
                    className="org-card"
                    style={{ ["--c" as string]: o.c } as React.CSSProperties}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* PLAYERS DIRECTORY CTA */}
          <Link
            href="/players"
            className="related-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 18,
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "20px 26px",
              border: "var(--border)",
              boxShadow: "5px 5px 0 var(--vermilion)",
              marginBottom: 28,
              textDecoration: "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(235,228,210,.6)",
                  fontWeight: 700,
                }}
              >
                PLAYERS DIRECTORY · {TOTAL_PROS.toLocaleString()} PROS
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  marginTop: 4,
                }}
              >
                プロ雀士 {TOTAL_PROS.toLocaleString()}名 を全員検索
                <span
                  style={{
                    fontFamily: "Instrument Serif, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 16,
                    color: "#f0c86d",
                    marginLeft: 14,
                  }}
                >
                  Search every Japanese pro
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Noto Sans JP, sans-serif",
                  fontSize: 13,
                  color: "rgba(235,228,210,.7)",
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                JPML {ORG_COUNTS["JPML"]?.toLocaleString()} · 最高位戦 {ORG_COUNTS["最高位戦"]?.toLocaleString()} · NPM {ORG_COUNTS["NPM"]?.toLocaleString()} · μ {ORG_COUNTS["μ"]} · RMU {ORG_COUNTS["RMU"]}
                {" — "}名前 / リーグ / 段位 / 入会年で絞り込み可能
              </div>
            </div>
            <span
              style={{
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 32,
                color: "var(--vermilion)",
              }}
            >
              →
            </span>
          </Link>

          {/* RANKINGS (動的データ) */}
          <section className="ranks-box">
            <div className="hd">
              <span>
                通算タイトル数 ランキング <span className="en">Top Title Holders</span>
              </span>
              <Link
                href="/rankings"
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                ALL →
              </Link>
            </div>
            <div className="ranks-tabs">
              <span className="on">獲得タイトル数</span>
              <span style={{ opacity: 0.5 }}>勝率 (準備中)</span>
              <span style={{ opacity: 0.5 }}>素点 (準備中)</span>
              <span className="end"></span>
            </div>
            <table className="ranks-table">
              <tbody>
                {titleRanking.map((entry, i) => {
                  const team = TEAMS.find((t) => t.name === entry.player.mleagueTeam);
                  const rkCls = i === 0 ? "r1" : i === 1 ? "r2" : i === 2 ? "r3" : "";
                  return (
                    <tr key={entry.player.id}>
                      <td className={`rk ${rkCls}`.trim()}>{KANJI_RANK[i]}</td>
                      <td>
                        <div className="player">
                          <span className="avatar">{entry.player.name.charAt(0)}</span>
                          <div>
                            <div className="name">
                              <Link
                                href={entry.player.href}
                                style={{ color: "inherit", textDecoration: "none" }}
                              >
                                {entry.player.name}
                              </Link>
                              <span
                                className="org"
                                style={{
                                  background: "var(--ink)",
                                  color: "var(--paper)",
                                  marginLeft: 6,
                                }}
                              >
                                {entry.player.org}
                              </span>
                            </div>
                            <span className="sub">
                              {team?.shortName ? `${team.shortName} · ` : ""}
                              {entry.notable}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="cnt">
                        {entry.count}
                        <span className="u">冠</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col">
          {/* M-LEAGUE STANDINGS (動的データ) */}
          <section className="mleague">
            <div className="mhd">
              <h2>
                Mリーグ 番付
                <span className="en">2025-26 Standings</span>
              </h2>
              <div className="race">
                <span>進行中</span>
                <b>レギュラー</b>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>順</th>
                  <th>チーム</th>
                  <th style={{ textAlign: "right" }}>合計pt</th>
                  <th style={{ textAlign: "right" }}>選手</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((s, idx) => {
                  const rkCls = idx === 0 ? "r1" : idx === 1 ? "r2" : idx === 2 ? "r3" : "";
                  return (
                    <tr key={s.team.slug}>
                      <td className={`rk ${rkCls}`.trim()}>{KANJI_RANK[idx]}</td>
                      <td>
                        <div className="team">
                          <span className="logo" style={{ background: MLEAGUE_LOGO_COLORS[s.team.slug] ?? s.team.color }}></span>
                          <Link
                            href={`/teams/${s.team.slug}`}
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {s.team.shortName}
                          </Link>
                        </div>
                      </td>
                      <td className={`pts ${s.totalPts >= 0 ? "p" : "m"}`}>{fmtPts(s.totalPts)}</td>
                      <td className="delta" style={{ color: "var(--ink-3)" }}>
                        {s.rosterPlayers.length}名
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {/* CURRENT TITLE HOLDERS list */}
          <section
            style={{
              background: "var(--paper)",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              marginBottom: 18,
            }}
          >
            <div className="side-hd">
              <span>
                現タイトル保持者 <span className="en">Active Holders</span>
              </span>
              <Link
                href="/titles"
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                }}
              >
                ALL →
              </Link>
            </div>
            <ul className="live-list">
              {currentTitlists.map((t) => (
                <li key={t.title.slug}>
                  <span
                    className="time"
                    style={{
                      fontFamily: "Shippori Mincho, serif",
                      fontWeight: 900,
                      fontSize: 26,
                      color: t.title.color,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                    }}
                  >
                    {t.title.glyph}
                  </span>
                  <span className="title">
                    <Link
                      href={`/titles/${t.title.slug}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {t.title.shortName ?? t.title.name}
                    </Link>
                    <span className="ch" style={{ marginTop: 2 }}>
                      {t.holder.name}
                      {t.holder.note && ` · ${t.holder.note}`}
                    </span>
                  </span>
                  <span
                    className="mono"
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: "var(--ink-3)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.title.org}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* PREDICT GAME CTA */}
          <Link
            href="/predict"
            className="related-card"
            style={{
              display: "block",
              background: "var(--vermilion)",
              color: "var(--paper)",
              padding: "20px 22px",
              border: "var(--border)",
              boxShadow: "5px 5px 0 var(--ink)",
              marginBottom: 18,
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 120,
                color: "rgba(11,11,9,.1)",
                lineHeight: 1,
                pointerEvents: "none",
              }}
            >
              予
            </div>
            <div
              style={{
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Hora.mg · Mリーグ予想ゲーム
            </div>
            <div
              style={{
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              今日も、和了る。
            </div>
            <div
              style={{
                fontFamily: "Noto Sans JP, sans-serif",
                fontSize: 12,
                marginTop: 8,
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              Mリーグ全試合の1着を予想してシーズン上位を目指せ。
              無料・5秒で参加可能。
            </div>
            <div
              style={{
                marginTop: 12,
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                fontWeight: 700,
              }}
            >
              予想する →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
