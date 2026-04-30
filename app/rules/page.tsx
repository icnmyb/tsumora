"use client";

import { useState } from "react";
import Link from "next/link";
import { ORG_RULE_GROUPS, RULE_ITEMS, type OrgRuleGroup } from "./data";

/* ============================================================
 * Tabs
 * ============================================================ */
const ORG_TABS = ["ALL", "JPML", "NPM", "最高位戦", "RMU", "μ"] as const;
type OrgTab = (typeof ORG_TABS)[number];

const ORG_EN: Record<OrgTab, string> = {
  ALL: "All Bodies",
  JPML: "連盟",
  NPM: "協会",
  最高位戦: "Saikōisen",
  RMU: "Real Mahjong Unit",
  μ: "麻将連合",
};

/* ============================================================
 * Rule cell
 * ============================================================ */
function RuleCell({
  value,
  color,
  size = "sm",
  isDetail = false,
}: {
  value: string;
  color: string;
  size?: "sm" | "md";
  isDetail?: boolean;
}) {
  const displayValue = isDetail && value === "JPMLタブを参照" ? "↓詳細を参照" : value;
  const isAri = displayValue === "あり";
  const isNashi = displayValue === "なし";
  return (
    <td
      style={{
        padding: size === "md" ? "12px 16px" : "10px 14px",
        fontFamily:
          isAri || isNashi
            ? "'Geist Mono', monospace"
            : "'Noto Sans JP', sans-serif",
        fontSize: size === "md" ? 13 : 12,
        fontWeight: isAri ? 700 : 400,
        background: isAri ? `${color}1a` : isNashi ? "var(--paper-2)" : "transparent",
        color: isAri ? color : isNashi ? "var(--ink-3)" : "var(--ink)",
        textAlign: "center",
        borderBottom: "1px solid var(--ink)",
        borderRight: "1px solid var(--ink)",
        whiteSpace: "nowrap",
      }}
    >
      {displayValue}
    </td>
  );
}

/* ============================================================
 * Rule-item label cell (left column)
 * ============================================================ */
function RuleItemCell({ label, desc }: { label: string; desc?: string }) {
  return (
    <td
      style={{
        padding: "10px 16px",
        fontFamily: "'Noto Sans JP', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        background: "var(--paper-2)",
        borderBottom: "1px solid var(--ink)",
        borderRight: "2px solid var(--ink)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      {desc && (
        <span
          style={{
            display: "block",
            fontWeight: 400,
            fontSize: 10,
            color: "var(--ink-3)",
            marginTop: 2,
          }}
        >
          {desc}
        </span>
      )}
    </td>
  );
}

/* ============================================================
 * ALL view — comparison table
 * ============================================================ */
function CompareTable() {
  return (
    <div
      style={{
        overflowX: "auto",
        margin: "0 0 48px",
        border: "1.5px solid var(--ink)",
        boxShadow: "var(--shadow)",
        background: "var(--paper)",
      }}
    >
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: 760,
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "14px 16px",
                background: "var(--paper-2)",
                color: "var(--ink)",
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textAlign: "left",
                borderBottom: "2px solid var(--ink)",
                borderRight: "2px solid var(--ink)",
                minWidth: 180,
              }}
            >
              ルール項目
            </th>
            {ORG_RULE_GROUPS.map((g) => (
              <th
                key={g.org}
                style={{
                  padding: "14px 14px 12px",
                  background: "var(--paper)",
                  color: g.color,
                  textAlign: "center",
                  borderBottom: "2px solid var(--ink)",
                  borderRight: "1px solid var(--ink)",
                  whiteSpace: "nowrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Shippori Mincho', serif",
                      fontSize: 15,
                      fontWeight: 900,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {g.org}
                  </span>
                  {g.rules.length > 1 && (
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 6px",
                        background: "var(--paper-2)",
                        border: `1px solid ${g.color}`,
                        color: g.color,
                        letterSpacing: "0.06em",
                      }}
                    >
                      ×{g.rules.length}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 9,
                    fontWeight: 400,
                    color: "var(--ink-3)",
                    marginTop: 4,
                    letterSpacing: "0.04em",
                  }}
                >
                  {g.rules[0].name}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RULE_ITEMS.map((item) => (
            <tr key={item.key}>
              <RuleItemCell label={item.label} desc={item.desc} />
              {ORG_RULE_GROUPS.map((g) => (
                <RuleCell
                  key={g.org}
                  value={String(g.rules[0].values[item.key] ?? "—")}
                  color={g.color}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================================================
 * Rank Points Visual — JPML 公式ルール順位点
 * ============================================================ */
const RANK_PTS_DATA = [
  {
    label: "1人浮き",
    sub: "30000超 × 1人",
    pts: [
      { rank: "1着", value: 12 },
      { rank: "2着", value: -1 },
      { rank: "3着", value: -3 },
      { rank: "4着", value: -8 },
    ],
  },
  {
    label: "2人浮き",
    sub: "30000超 × 2人",
    pts: [
      { rank: "1着", value: 8 },
      { rank: "2着", value: 4 },
      { rank: "3着", value: -4 },
      { rank: "4着", value: -8 },
    ],
  },
  {
    label: "3人浮き",
    sub: "30000超 × 3人",
    pts: [
      { rank: "1着", value: 8 },
      { rank: "2着", value: 3 },
      { rank: "3着", value: 1 },
      { rank: "4着", value: -12 },
    ],
  },
] as const;

const MAX_ABS = 12;
const VERMILION = "#c8282a";

function RankPtsVisual() {
  return (
    <div style={{ padding: "28px 20px 20px" }}>
      {/* Section title */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9.5,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: VERMILION,
            fontWeight: 700,
          }}
        >
          Rank Pts
        </span>
        <span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
          }}
        >
          順位点 — 浮き人数別
        </span>
        <span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 11,
            color: "var(--ink-3)",
          }}
        >
          ※「浮き」= 30000点以上。浮き人数で変動
        </span>
      </div>

      {/* ── Bar chart cards ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {RANK_PTS_DATA.map((scenario) => (
          <div
            key={scenario.label}
            style={{
              background: "var(--paper)",
              border: "1.5px solid var(--ink)",
              boxShadow: "3px 3px 0 var(--ink)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1.5px solid var(--ink)",
                background: "var(--paper-2)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 15,
                  fontWeight: 900,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {scenario.label}
              </span>
              <span
                style={{
                  marginLeft: 8,
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 9.5,
                  color: "var(--ink-3)",
                  letterSpacing: "0.06em",
                }}
              >
                {scenario.sub}
              </span>
            </div>
            {/* Bars */}
            <div style={{ padding: "12px 14px 14px" }}>
              {scenario.pts.map((p) => {
                const isPlus = p.value >= 0;
                const pct = (Math.abs(p.value) / MAX_ABS) * 100;
                return (
                  <div
                    key={p.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "var(--ink-2)",
                        width: 28,
                        flexShrink: 0,
                        textAlign: "right",
                      }}
                    >
                      {p.rank}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 18,
                        background: "var(--paper-2)",
                        border: "1px solid var(--ink-4)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          height: "100%",
                          width: `${pct}%`,
                          background: isPlus ? VERMILION : "var(--ink-3)",
                          opacity: isPlus ? 1 : 0.45,
                          transition: "width 300ms ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 13,
                        fontWeight: 800,
                        color: isPlus ? VERMILION : "var(--ink-3)",
                        width: 38,
                        flexShrink: 0,
                        textAlign: "right",
                      }}
                    >
                      {isPlus ? "+" : ""}
                      {p.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Matrix comparison table ── */}
      <div
        style={{
          overflowX: "auto",
          border: "1.5px solid var(--ink)",
          boxShadow: "3px 3px 0 var(--ink)",
          background: "var(--paper)",
        }}
      >
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px 14px",
                  background: "var(--paper-2)",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  textAlign: "left",
                  borderBottom: "2px solid var(--ink)",
                  borderRight: "2px solid var(--ink)",
                  fontWeight: 700,
                }}
              >
                順位
              </th>
              {RANK_PTS_DATA.map((s) => (
                <th
                  key={s.label}
                  style={{
                    padding: "10px 14px",
                    background: "var(--paper)",
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: 13,
                    fontWeight: 900,
                    color: "var(--ink)",
                    textAlign: "center",
                    borderBottom: `3px solid ${VERMILION}`,
                    borderRight: "1px solid var(--ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {s.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {["1着", "2着", "3着", "4着"].map((rank, ri) => (
              <tr key={rank}>
                <td
                  style={{
                    padding: "10px 14px",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11,
                    fontWeight: 700,
                    background: "var(--paper-2)",
                    borderBottom: "1px solid var(--ink)",
                    borderRight: "2px solid var(--ink)",
                    color: "var(--ink-2)",
                  }}
                >
                  {rank}
                </td>
                {RANK_PTS_DATA.map((s) => {
                  const v = s.pts[ri].value;
                  const isPlus = v >= 0;
                  const intensity = Math.abs(v) / MAX_ABS;
                  return (
                    <td
                      key={s.label}
                      style={{
                        padding: "10px 14px",
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 14,
                        fontWeight: 800,
                        textAlign: "center",
                        borderBottom: "1px solid var(--ink)",
                        borderRight: "1px solid var(--ink)",
                        color: isPlus ? VERMILION : "var(--ink-3)",
                        background: isPlus
                          ? `rgba(200, 40, 42, ${0.06 + intensity * 0.12})`
                          : `rgba(0, 0, 0, ${0.02 + intensity * 0.06})`,
                      }}
                    >
                      {isPlus ? "+" : ""}
                      {v}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p
        style={{
          marginTop: 12,
          fontFamily: "'Noto Sans JP', sans-serif",
          fontSize: 11,
          color: "var(--ink-3)",
          lineHeight: 1.7,
        }}
      >
        ※ 同点の場合は順位点を分ける。
      </p>
    </div>
  );
}

/* ============================================================
 * Per-org detail view
 * ============================================================ */
function OrgDetail({ group }: { group: OrgRuleGroup }) {
  const [subId, setSubId] = useState<string>(group.rules[0].id);
  const rule = group.rules.find((r) => r.id === subId) ?? group.rules[0];

  return (
    <div
      style={{
        margin: "0 0 48px",
        background: "var(--paper)",
        border: "1.5px solid var(--ink)",
        boxShadow: "var(--shadow)",
      }}
    >
      {group.rules.length > 1 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            borderBottom: "1.5px solid var(--ink)",
            background: "var(--paper)",
          }}
        >
          <span
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
            Rule ⁄ ルール種別
          </span>
          {group.rules.map((r) => {
            const active = r.id === subId;
            return (
              <button
                key={r.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSubId(r.id)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 8,
                  padding: "12px 18px",
                  background: active ? "var(--paper-2)" : "transparent",
                  color: active ? group.color : "var(--ink-3)",
                  border: "none",
                  borderRight: "1px solid var(--ink-5, rgba(0,0,0,0.12))",
                  cursor: "pointer",
                  transition: "background 140ms ease, color 140ms ease",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Shippori Mincho', serif",
                    fontSize: 14,
                    fontWeight: active ? 900 : 700,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {r.name}
                </span>
                {active && (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: -1.5,
                      height: 3,
                      background: group.color,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {rule.description && (
        <div
          style={{
            padding: "14px 20px",
            background: "var(--paper-2)",
            borderBottom: "1px solid var(--ink)",
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 13,
            lineHeight: 1.7,
            color: "var(--ink-2)",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Geist Mono', monospace",
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: group.color,
              marginRight: 10,
              fontWeight: 700,
            }}
          >
            About
          </span>
          {rule.description}
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", border: "2px solid var(--ink)" }}>
          <thead>
            <tr>
              <th
                style={{
                  padding: "12px 16px",
                  background: "var(--paper-2)",
                  color: "var(--ink)",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textAlign: "left",
                  borderBottom: "2px solid var(--ink)",
                  borderRight: "2px solid var(--ink)",
                  width: "40%",
                }}
              >
                ルール項目
              </th>
              <th
                style={{
                  padding: "12px 16px",
                  background: "var(--paper)",
                  color: group.color,
                  fontFamily: "'Shippori Mincho', serif",
                  fontSize: 15,
                  fontWeight: 900,
                  textAlign: "center",
                  letterSpacing: "-0.01em",
                  borderBottom: "2px solid var(--ink)",
                }}
              >
                {rule.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {RULE_ITEMS.map((item) => (
              <tr key={item.key}>
                <RuleItemCell label={item.label} desc={item.desc} />
                <RuleCell
                  value={String(rule.values[item.key] ?? "—")}
                  color={group.color}
                  size="md"
                  isDetail={true}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rule.id === "jpml-official" && (
        <div style={{ borderTop: "1.5px solid var(--ink-4)" }}>
          <RankPtsVisual />
        </div>
      )}
    </div>
  );
}

/* ============================================================
 * Filter bar
 * ============================================================ */
function OrgFilterBar({
  current,
  onChange,
}: {
  current: OrgTab;
  onChange: (tab: OrgTab) => void;
}) {
  return (
    <nav
      aria-label="団体で絞り込む"
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        margin: "0 0 28px",
        borderTop: "1.5px solid var(--ink)",
        borderBottom: "1.5px solid var(--ink)",
        background: "var(--paper)",
      }}
    >
      <span
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
        Filter ⁄ 団体
      </span>
      {ORG_TABS.map((tab, i) => {
        const group = ORG_RULE_GROUPS.find((g) => g.org === tab);
        const color = group?.color ?? "var(--ink)";
        const active = current === tab;
        const en = ORG_EN[tab];
        return (
          <button
            key={tab}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(tab)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "baseline",
              gap: 8,
              padding: "12px 18px",
              background: active ? "var(--paper-2)" : "transparent",
              color: active ? color : "var(--ink)",
              border: "none",
              borderRight:
                i === ORG_TABS.length - 1
                  ? "none"
                  : "1px solid var(--ink-5, rgba(0,0,0,0.12))",
              fontFamily: "'Geist Mono', monospace",
              cursor: "pointer",
              transition: "background 140ms ease, color 140ms ease",
              whiteSpace: "nowrap",
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
                background: active ? color : "transparent",
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
              {tab}
            </span>
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: 11,
                color: active ? color : "var(--ink-3)",
                opacity: 0.85,
              }}
            >
              {en}
            </span>
            {group && group.rules.length > 1 && (
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: "0.08em",
                  color: active ? color : "var(--ink-3)",
                  fontWeight: 700,
                  padding: "1px 6px",
                  border: `1px solid ${active ? color : "var(--ink-4)"}`,
                  background: active ? "var(--paper)" : "var(--paper-2)",
                  marginLeft: 2,
                }}
              >
                ×{group.rules.length}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ============================================================
 * Legend
 * ============================================================ */
function Legend() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        background: "var(--paper-2)",
        border: "1.5px solid var(--ink)",
        marginBottom: 24,
      }}
    >
      <span
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 9.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--ink-3)",
          fontWeight: 700,
        }}
      >
        Legend
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 14,
            background: "var(--ink)",
            border: "1px solid var(--ink)",
          }}
        />
        <span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 11,
            color: "var(--ink-2)",
          }}
        >
          あり（団体色）
        </span>
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            display: "inline-block",
            width: 18,
            height: 14,
            background: "var(--paper-2)",
            border: "1px solid var(--ink-4)",
          }}
        />
        <span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 11,
            color: "var(--ink-2)",
          }}
        >
          なし
        </span>
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 11,
            color: "var(--ink-2)",
          }}
        >
          —
        </span>
        <span
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 11,
            color: "var(--ink-2)",
          }}
        >
          未確認 / 非該当
        </span>
      </span>
    </div>
  );
}

/* ============================================================
 * Page
 * ============================================================ */
export default function RulesPage() {
  const [orgTab, setOrgTab] = useState<OrgTab>("ALL");

  const currentGroup =
    orgTab === "ALL" ? null : ORG_RULE_GROUPS.find((g) => g.org === orgTab);

  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Rules</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">RULES · 5 BODIES · CROSS-REFERENCE</div>
            <h1>
              競技ルール比較
              <span className="en">Rules · 5 Bodies Cross-Reference</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 5団体横断</span>
              <span>主要項目を一覧比較</span>
              <span>複数ルール対応</span>
              <span>公式資料準拠</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">則</div>
          </div>
        </div>
      </section>

      <div style={{ padding: "40px 24px 80px" }}>
        <OrgFilterBar current={orgTab} onChange={setOrgTab} />

        {orgTab === "ALL" && (
          <>
            <h2 className="sh">
              <span>全団体比較表</span>
              <span className="num">
                Compare · 代表ルールで比較（複数種ある場合は第1ルール）
              </span>
              <span className="rule"></span>
            </h2>
            <CompareTable />
          </>
        )}

        {currentGroup && (
          <>
            <h2 className="sh">
              <span style={{ color: currentGroup.color }}>
                {currentGroup.org}
              </span>
              <span className="num">
                {currentGroup.label} · {currentGroup.rules.length}種のルール
              </span>
              <span className="rule"></span>
              <span
                className="more"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 10px",
                  background: currentGroup.color,
                  color: "#fff",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 900 }}>
                  {currentGroup.rules.length}
                </span>
                <span style={{ fontSize: 9.5, opacity: 0.85 }}>RULES</span>
              </span>
            </h2>
            <OrgDetail group={currentGroup} />
          </>
        )}

        <Legend />

        <div
          style={{
            marginTop: 16,
            paddingTop: 24,
            borderTop: "1.5px solid var(--ink-4)",
          }}
        >
          <p
            style={{
              fontFamily: "'Noto Sans JP', sans-serif",
              fontSize: 12,
              color: "var(--ink-3)",
              lineHeight: 1.8,
            }}
          >
            ※ 本ページのルール情報は各団体の公式資料をもとに作成しています。正式な競技には各団体の最新ルールブックをご参照ください。
          </p>
        </div>
      </div>
    </div>
  );
}
