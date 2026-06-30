"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { PastChampion } from "@/app/titles/data";
import { PAST_CHAMPIONS_PER_PAGE } from "@/components/pastChampionsConfig";

interface Props {
  champions: PastChampion[];
  orgColor: string;
}

export function PaginatedPastChampions({ champions, orgColor }: Props) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(champions.length / PAST_CHAMPIONS_PER_PAGE));
  const visibleChampions = useMemo(() => {
    const start = (page - 1) * PAST_CHAMPIONS_PER_PAGE;
    return champions.slice(start, start + PAST_CHAMPIONS_PER_PAGE);
  }, [champions, page]);

  const goToPage = (nextPage: number) => {
    setPage(Math.min(pageCount, Math.max(1, nextPage)));
  };

  return (
    <>
      <div style={{ overflowX: "auto", border: "var(--border)", boxShadow: "var(--shadow)", marginBottom: 14 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: 620,
            background: "var(--paper)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--ink)", color: "var(--paper)" }}>
              <th
                style={{
                  textAlign: "left",
                  padding: "13px 16px",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                Episode
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "13px 16px",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                Winner
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "13px 16px",
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                }}
              >
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleChampions.map((c, i) => {
              const absoluteIndex = (page - 1) * PAST_CHAMPIONS_PER_PAGE + i;
              return (
                <tr
                  key={`${c.ep}-${c.name}-${absoluteIndex}`}
                  style={{
                    background: c.current ? `${orgColor}20` : absoluteIndex % 2 === 0 ? "var(--paper)" : "var(--paper-2)",
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
              );
            })}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontFamily: "Geist Mono, ui-monospace, monospace",
              fontSize: 11,
              color: "var(--ink-3)",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {page} / {pageCount} · {PAST_CHAMPIONS_PER_PAGE} per page
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              style={{
                border: "var(--border)",
                background: page === 1 ? "var(--paper-2)" : "var(--paper)",
                color: page === 1 ? "var(--ink-3)" : "var(--ink)",
                padding: "8px 13px",
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 800,
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => goToPage(page + 1)}
              disabled={page === pageCount}
              style={{
                border: "var(--border)",
                background: page === pageCount ? "var(--paper-2)" : "var(--paper)",
                color: page === pageCount ? "var(--ink-3)" : "var(--ink)",
                padding: "8px 13px",
                fontFamily: "Geist Mono, ui-monospace, monospace",
                fontSize: 11,
                fontWeight: 800,
                cursor: page === pageCount ? "not-allowed" : "pointer",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
