import Link from "next/link";
import { type AllPlayer, ORG_META } from "@/app/players/data";

function calcProYears(joinYear: number): number {
  return new Date().getFullYear() - joinYear;
}

function formatBirthday(bd: string): string {
  const parts = bd.split("/");
  if (parts.length === 3) return `${parts[0]}年${parts[1]}月${parts[2]}日`;
  if (parts.length === 2) return `${parts[0]}月${parts[1]}日`;
  return bd;
}

export function PlayerPage({ player }: { player: AllPlayer }) {
  const org = ORG_META[player.org];
  const proYears = calcProYears(player.joinYear);
  const firstChar = player.name.charAt(0);

  return (
    <div className="wrap">
      {/* PLAYER HERO */}
      <section className="p-hero">
        <div className="portrait">
          <div className="avatar-big">{firstChar}</div>
        </div>
        <div className="info">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep">&rsaquo;</span>
            <Link href="/players">Players</Link>
            <span className="sep">&rsaquo;</span>
            <Link href={`/organizations/${player.org.toLowerCase()}`}>{player.org}</Link>
            <span className="sep">&rsaquo;</span>
            <span>{player.name}</span>
          </div>
          <span className="kicker">
            &bull; {org.label} &middot; {player.league} &middot;{" "}
            {player.period ? `${player.period}生` : `${player.joinYear}年入会`}
          </span>
          <h1>
            {player.name}
            <span className="en">{player.nameEn}</span>
          </h1>
          <div className="tags-row">
            <span
              className="tag-chip v"
              style={{ background: org.color, color: "#fff" }}
            >
              &bull; {org.label}
            </span>
            {player.title && (
              <span className="tag-chip g">&star; {player.title}</span>
            )}
            {player.mleagueTeam && (
              <span className="tag-chip">M {player.mleagueTeam}</span>
            )}
            {player.tags.map((t) => (
              <span key={t} className="tag-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="side">
          <div className="kv">
            <div className="l">Title 主要タイトル</div>
            <div className="v">
              <b>{player.title || "---"}</b>
            </div>
          </div>
          <div className="kv">
            <div className="l">League リーグ</div>
            <div className="v">
              <b>{player.league}</b>
            </div>
          </div>
          <div className="kv">
            <div className="l">Pro Since プロ歴</div>
            <div className="v">
              <b>{proYears}</b> 年{" "}
              <span
                style={{
                  fontFamily: "'Geist Mono'",
                  fontSize: 11,
                  color: "rgba(235,228,210,.6)",
                }}
              >
                SINCE {player.joinYear}
              </span>
            </div>
          </div>
          {player.mleagueTeam && (
            <div className="kv">
              <div className="l">M-League Mリーグ</div>
              <div className="v" style={{ fontSize: 14 }}>
                <b>{player.mleagueTeam}</b>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TWO COL: facts + placeholder */}
      <div className="two-col">
        <div>
          <h2 className="sh">
            <span>基本情報</span>
            <span className="num">Facts</span>
            <span className="rule"></span>
          </h2>
          <section className="fact-box">
            <div className="fhd">
              <span className="t">
                BASIC DATA <span className="en">Personal</span>
              </span>
            </div>
            <ul>
              <li>
                <span className="l">Name 氏名</span>
                <span className="v">{player.name}</span>
              </li>
              <li>
                <span className="l">English 英語表記</span>
                <span className="v">{player.nameEn}</span>
              </li>
              <li>
                <span className="l">Born 誕生日</span>
                <span className="v">{formatBirthday(player.birthday)}</span>
              </li>
              <li>
                <span className="l">Org 所属団体</span>
                <span className="v">
                  <span style={{ color: org.color, fontWeight: 700 }}>
                    &bull;
                  </span>{" "}
                  {org.label}
                </span>
              </li>
              <li>
                <span className="l">League リーグ</span>
                <span className="v">{player.league}</span>
              </li>
              {player.period && (
                <li>
                  <span className="l">Period 入会期</span>
                  <span className="v">{player.period}</span>
                </li>
              )}
              <li>
                <span className="l">Debut プロ入り</span>
                <span className="v">{player.joinYear}年</span>
              </li>
              <li>
                <span className="l">Career プロ歴</span>
                <span className="v">
                  <span className="h">{proYears}</span> 年
                </span>
              </li>
              {player.mleagueTeam && (
                <li>
                  <span className="l">M League Mリーグ</span>
                  <span className="v">{player.mleagueTeam}</span>
                </li>
              )}
              <li>
                <span className="l">Title 主要タイトル</span>
                <span className="v">{player.title || "---"}</span>
              </li>
            </ul>
          </section>
        </div>

        <div>
          <h2 className="sh">
            <span>成績・戦績</span>
            <span className="num">Stats</span>
            <span className="rule"></span>
          </h2>
          <section
            className="fact-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 260,
              textAlign: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 48,
                color: "var(--ink-3)",
                lineHeight: 1,
              }}
            >
              &mdash;
            </div>
            <div style={{ color: "var(--ink-3)", fontSize: 14 }}>
              <b>成績データは準備中です</b>
              <br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                Stats data is coming soon
              </span>
            </div>
          </section>

          <h2 className="sh" style={{ marginTop: 24 }}>
            <span>タイトル歴</span>
            <span className="num">Titles</span>
            <span className="rule"></span>
          </h2>
          <section
            className="fact-box"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 180,
              textAlign: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 48,
                color: "var(--ink-3)",
                lineHeight: 1,
              }}
            >
              &mdash;
            </div>
            <div style={{ color: "var(--ink-3)", fontSize: 14 }}>
              <b>タイトル歴は準備中です</b>
              <br />
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                Title history is coming soon
              </span>
            </div>
          </section>
        </div>
      </div>

      {/* RELATED: org link */}
      <h2 className="sh" style={{ marginTop: 28 }}>
        <span>所属団体</span>
        <span className="num">Organization</span>
        <span className="rule"></span>
      </h2>
      <div
        className="related-grid"
        style={{ gridTemplateColumns: player.mleagueTeam ? "1fr 1fr" : "1fr" }}
      >
        <Link
          className="related-card"
          href={`/organizations/${player.org.toLowerCase()}`}
          style={{
            background: org.color,
            color: "#fff",
            boxShadow: "5px 5px 0 var(--ink)",
          }}
        >
          <div className="meta" style={{ color: "rgba(255,255,255,.75)" }}>
            {player.org}
          </div>
          <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>
            {org.label}
          </div>
          <span
            className="tag"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              marginTop: 14,
            }}
          >
            団体ページへ &rarr;
          </span>
        </Link>
        {player.mleagueTeam && (
          <div
            className="related-card"
            style={{ boxShadow: "5px 5px 0 var(--ink)" }}
          >
            <div className="meta">Mリーグ</div>
            <div className="nm" style={{ fontSize: 22 }}>
              {player.mleagueTeam}
            </div>
            <span className="tag">Mリーグ所属</span>
          </div>
        )}
      </div>
    </div>
  );
}
