import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const ORG_COLOR: Record<string, string> = {
  JPML: "#c8282a",
  日本プロ麻雀連盟: "#c8282a",
  NPM: "#1d4ed8",
  日本プロ麻雀協会: "#1d4ed8",
  最高位戦: "#7c3aed",
  最高位戦日本プロ麻雀協会: "#7c3aed",
  RMU: "#a07e28",
  "Real Mahjong Unit (RMU)": "#a07e28",
  μ: "#4b2a7a",
  "麻将連合-μ-": "#4b2a7a",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") ?? "プロ雀士";
  const nameEn = searchParams.get("nameEn") ?? "";
  const org = searchParams.get("org") ?? "";
  const league = searchParams.get("league") ?? "";
  const title = searchParams.get("title") ?? "";
  const team = searchParams.get("team") ?? "";
  const orgColor = ORG_COLOR[org] ?? "#0b0b09";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ebe4d2",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Top accent strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 12,
            background: orgColor,
          }}
        />

        {/* Watermark kanji (large bg character) */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -20,
            fontSize: 540,
            fontWeight: 900,
            color: orgColor,
            opacity: 0.08,
            lineHeight: 1,
            display: "flex",
          }}
        >
          {name.charAt(0)}
        </div>

        {/* Branding */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 12,
            marginBottom: 50,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#0b0b09",
            }}
          >
            麻雀
            <span style={{ color: "#c8282a" }}>。</span>
          </span>
          <span
            style={{
              fontSize: 18,
              fontStyle: "italic",
              color: "#5a564d",
            }}
          >
            TSUMORA · The Pro Mahjong Review
          </span>
        </div>

        {/* Name section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: orgColor,
              textTransform: "uppercase",
              marginBottom: 14,
              display: "flex",
            }}
          >
            ● {org}
          </div>
          <div
            style={{
              fontSize: 130,
              fontWeight: 900,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              color: "#0b0b09",
              display: "flex",
            }}
          >
            {name}
          </div>
          {nameEn && (
            <div
              style={{
                fontSize: 36,
                fontStyle: "italic",
                color: "#5a564d",
                marginTop: 10,
                display: "flex",
              }}
            >
              {nameEn}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            gap: 36,
            paddingTop: 30,
            borderTop: `4px solid ${orgColor}`,
            alignItems: "baseline",
          }}
        >
          {league && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#5a564d", fontWeight: 700, marginBottom: 4 }}>
                LEAGUE
              </span>
              <span style={{ fontSize: 28, fontWeight: 900, color: "#0b0b09" }}>{league}</span>
            </div>
          )}
          {title && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#5a564d", fontWeight: 700, marginBottom: 4 }}>
                TITLE
              </span>
              <span style={{ fontSize: 28, fontWeight: 900, color: orgColor }}>{title}</span>
            </div>
          )}
          {team && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#5a564d", fontWeight: 700, marginBottom: 4 }}>
                M·LEAGUE
              </span>
              <span style={{ fontSize: 24, fontWeight: 700, color: "#0b0b09" }}>{team}</span>
            </div>
          )}
          <div
            style={{
              marginLeft: "auto",
              fontSize: 16,
              fontFamily: "monospace",
              color: "#5a564d",
              letterSpacing: "0.1em",
              fontWeight: 600,
              display: "flex",
            }}
          >
            tsumora.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
