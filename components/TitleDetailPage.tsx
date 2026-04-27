import Link from "next/link";
import { TITLES, type TitleData } from "@/app/titles/data";

interface Props {
  title: TitleData;
}

export function TitleDetailPage({ title: t }: Props) {
  const orgColor = t.color;
  const champCount = new Map<string, number>();
  for (const c of t.pastChampions) {
    champCount.set(c.name, (champCount.get(c.name) ?? 0) + 1);
  }
  const topCrowns = [...champCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const topCrownPlayers = topCrowns.map(([name]) => {
    const champ = t.pastChampions.find((c) => c.name === name);
    return {
      name,
      href: champ?.href,
      count: champCount.get(name) ?? 0,
    };
  });

  return (
    <div className="wrap">
      {/* HERO */}
      <section
        className="org-hero"
        style={{
          ["--hero-watermark" as string]: `"${t.glyph}"`,
          ["--hero-watermark-color" as string]: "rgba(11,11,9,0.05)",
        }}
      >
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/titles">タイトル戦</Link>
          <span className="sep">›</span>
          <span>{t.name}</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">{t.code}</div>
            <h1>
              {t.name}
              <span className="en">{t.en}</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: orgColor }}>
                ● {t.orgLabel}
              </span>
              {t.founded && <span>{t.founded}年創設</span>}
              <span>{t.season}</span>
              {t.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="kite">
            <div className="k-main" style={{ color: orgColor }}>
              {t.glyph}
            </div>
          </div>
        </div>
        {t.holder && (
          <div
            style={{
              marginTop: 28,
              paddingTop: 18,
              borderTop: "var(--border)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 18,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  fontWeight: 700,
                }}
              >
                CURRENT HOLDER · 現{t.shortName ?? t.name}
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 36,
                  letterSpacing: "-0.03em",
                  marginTop: 6,
                }}
              >
                {t.holder.href ? (
                  <Link href={t.holder.href} style={{ color: "var(--ink)", borderBottom: `2px solid ${orgColor}` }}>
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
                    fontSize: 12,
                    color: "var(--ink-3)",
                    marginTop: 4,
                    fontWeight: 600,
                  }}
                >
                  {t.holder.note}
                </div>
              )}
            </div>
            <div
              style={{
                fontFamily: "Instrument Serif, serif",
                fontStyle: "italic",
                fontSize: 60,
                color: orgColor,
                lineHeight: 1,
              }}
            >
              戴
            </div>
          </div>
        )}
      </section>

      {/* ABOUT */}
      <h2 className="sh">
        <span>タイトル概要</span>
        <span className="num">About · {t.formatLabel}</span>
        <span className="rule"></span>
      </h2>
      <section
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          padding: "26px 30px",
          marginBottom: 36,
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: 14.5,
          lineHeight: 1.85,
          color: "var(--ink-2)",
        }}
      >
        {t.about.map((p, i) => (
          <p
            key={i}
            style={{
              margin: i === 0 ? "0 0 14px" : "14px 0 0",
              fontFamily: i === 0 ? "Shippori Mincho, serif" : undefined,
              fontWeight: i === 0 ? 700 : 500,
              fontSize: i === 0 ? 16 : 14.5,
              color: i === 0 ? "var(--ink)" : "var(--ink-2)",
            }}
          >
            {p}
          </p>
        ))}
      </section>

      {/* LEAGUE TIERS (if applicable) */}
      {t.leagueTiers && t.leagueTiers.length > 0 && (
        <>
          <h2 className="sh">
            <span>リーグ構造</span>
            <span className="num">League Structure</span>
            <span className="rule"></span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${t.leagueTiers.length}, 1fr)`,
              gap: 12,
              marginBottom: 36,
            }}
          >
            {t.leagueTiers.map((tier) => (
              <div
                key={tier.code}
                style={{
                  background: tier.highlight ? "var(--ink)" : "var(--paper)",
                  color: tier.highlight ? "var(--paper)" : "var(--ink)",
                  border: "var(--border)",
                  boxShadow: tier.highlight ? `5px 5px 0 ${orgColor}` : "var(--shadow-sm)",
                  padding: "18px 16px 16px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 900,
                    fontSize: 32,
                    letterSpacing: "-0.04em",
                    color: tier.highlight ? orgColor : "var(--ink)",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {tier.code}
                </div>
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 700,
                    fontSize: 14,
                    marginBottom: 6,
                  }}
                >
                  {tier.title}
                </div>
                <div
                  style={{
                    fontFamily: "Noto Sans JP, sans-serif",
                    fontSize: 11.5,
                    lineHeight: 1.55,
                    color: tier.highlight ? "rgba(235,228,210,.7)" : "var(--ink-3)",
                  }}
                >
                  {tier.desc}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* PAST CHAMPIONS */}
      <h2 className="sh">
        <span>歴代優勝者</span>
        <span className="num">Past Champions · {t.pastChampions.length}件掲載</span>
        <span className="rule"></span>
      </h2>
      <div
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow)",
          marginBottom: 36,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5 }}>
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
                  padding: "10px 16px",
                  borderBottom: "var(--border)",
                  width: 100,
                }}
              >
                期 / 年
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
                  padding: "10px 16px",
                  borderBottom: "var(--border)",
                }}
              >
                優勝者
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
                  padding: "10px 16px",
                  borderBottom: "var(--border)",
                }}
              >
                備考
              </th>
            </tr>
          </thead>
          <tbody>
            {t.pastChampions.map((c, i) => (
              <tr
                key={`${c.ep}-${c.name}-${i}`}
                style={{
                  background: c.current ? `${orgColor}20` : i % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(11,11,9,.1)",
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 900,
                  }}
                >
                  <span
                    style={{
                      fontSize: 22,
                      color: c.current ? orgColor : "var(--ink)",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    第{c.ep}期
                  </span>
                  <small
                    style={{
                      display: "block",
                      fontFamily: "Geist Mono, ui-monospace, monospace",
                      fontSize: 11,
                      color: "var(--ink-3)",
                      marginTop: 2,
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.year}年
                  </small>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(11,11,9,.1)",
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 700,
                    fontSize: 16,
                  }}
                >
                  {c.href ? (
                    <Link href={c.href} style={{ color: "var(--ink)", borderBottom: `2px dotted ${orgColor}` }}>
                      {c.name}
                    </Link>
                  ) : (
                    c.name
                  )}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(11,11,9,.1)",
                    fontFamily: "Noto Sans JP, sans-serif",
                    fontSize: 12.5,
                    color: c.current ? orgColor : "var(--ink-3)",
                    fontWeight: c.current ? 700 : 500,
                  }}
                >
                  {c.note ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TOP CROWNS */}
      {topCrownPlayers.length > 0 && topCrownPlayers[0].count > 1 && (
        <>
          <h2 className="sh">
            <span>戴冠数ランキング</span>
            <span className="num">Most Crowns</span>
            <span className="rule"></span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(topCrownPlayers.length, 5)}, 1fr)`,
              gap: 12,
              marginBottom: 36,
            }}
          >
            {topCrownPlayers.map((p, i) => (
              <div
                key={p.name}
                style={{
                  background: i === 0 ? "var(--ink)" : "var(--paper)",
                  color: i === 0 ? "var(--paper)" : "var(--ink)",
                  border: "var(--border)",
                  boxShadow: i === 0 ? `5px 5px 0 ${orgColor}` : "var(--shadow-sm)",
                  padding: "18px 16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Instrument Serif, serif",
                    fontStyle: "italic",
                    fontSize: 22,
                    color: i === 0 ? orgColor : "var(--ink-3)",
                    marginBottom: 4,
                  }}
                >
                  #{i + 1}
                </div>
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 900,
                    fontSize: 18,
                    lineHeight: 1.2,
                    marginBottom: 8,
                  }}
                >
                  {p.href ? (
                    <Link href={p.href} style={{ color: i === 0 ? "var(--paper)" : "var(--ink)" }}>
                      {p.name}
                    </Link>
                  ) : (
                    p.name
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 900,
                    fontSize: 32,
                    color: i === 0 ? orgColor : "var(--ink)",
                    lineHeight: 1,
                  }}
                >
                  {p.count}
                  <span
                    style={{
                      fontFamily: "Noto Sans JP, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: i === 0 ? "rgba(235,228,210,.6)" : "var(--ink-3)",
                      marginLeft: 3,
                    }}
                  >
                    回
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* RULES */}
      {t.rules && t.rules.length > 0 && (
        <>
          <h2 className="sh">
            <span>ルール / フォーマット</span>
            <span className="num">Rules</span>
            <span className="rule"></span>
          </h2>
          <div
            style={{
              background: "var(--paper)",
              border: "var(--border)",
              boxShadow: "var(--shadow)",
              padding: 0,
              marginBottom: 36,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            {t.rules.map((r, i) => (
              <div
                key={r.label}
                style={{
                  padding: "16px 18px",
                  borderRight: i % 4 !== 3 ? "1px solid rgba(11,11,9,.12)" : "none",
                  borderBottom: "1px solid rgba(11,11,9,.12)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Geist Mono, ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 6,
                  }}
                >
                  {r.label}
                </div>
                <div
                  style={{
                    fontFamily: "Shippori Mincho, serif",
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {r.value}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* RELATED */}
      {t.relatedTitles && t.relatedTitles.length > 0 && (
        <>
          <h2 className="sh">
            <span>関連タイトル</span>
            <span className="num">Related</span>
            <span className="rule"></span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${t.relatedTitles.length}, 1fr)`,
              gap: 14,
              marginBottom: 60,
            }}
          >
            {t.relatedTitles.map((rel) => {
              const target = TITLES.find((tt) => tt.slug === rel.slug);
              if (!target) return null;
              return (
                <Link
                  key={rel.slug}
                  href={`/titles/${rel.slug}`}
                  className="related-card"
                  style={{
                    background: "var(--paper)",
                    color: "var(--ink)",
                    border: "var(--border)",
                    boxShadow: `5px 5px 0 ${target.color}`,
                    display: "block",
                    padding: 22,
                    textDecoration: "none",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: -10,
                      right: -8,
                      fontFamily: "Shippori Mincho, serif",
                      fontWeight: 900,
                      fontSize: 120,
                      lineHeight: 1,
                      color: target.color,
                      opacity: 0.08,
                      pointerEvents: "none",
                    }}
                  >
                    {target.glyph}
                  </span>
                  <div
                    style={{
                      fontFamily: "Geist Mono, ui-monospace, monospace",
                      fontSize: 10.5,
                      letterSpacing: "0.14em",
                      color: target.color,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    {target.code}
                  </div>
                  <div
                    style={{
                      fontFamily: "Shippori Mincho, serif",
                      fontWeight: 900,
                      fontSize: 24,
                      letterSpacing: "-0.02em",
                      marginTop: 8,
                    }}
                  >
                    {target.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Instrument Serif, serif",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "var(--ink-3)",
                      marginTop: 4,
                    }}
                  >
                    {target.en}
                  </div>
                  <div
                    style={{
                      fontFamily: "Noto Sans JP, sans-serif",
                      fontSize: 12,
                      color: "var(--ink-3)",
                      marginTop: 14,
                    }}
                  >
                    {target.orgLabel} · {target.season}
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
