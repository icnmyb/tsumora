import Link from "next/link";
import { ORG_META, getAllPlayers, type RosterPlayer } from "@/app/players/data";
import { BgLayers } from "@/components/BgLayers";
import { CustomScrollbar } from "@/components/CustomScrollbar";

interface RelatedCard {
  av: string;
  nm: string;
  meta: string;
  tag: string;
  href: string;
}

interface RosterPlayerPageProps {
  player: RosterPlayer;
}

function formatBirthYear(bd?: string): string {
  if (!bd) return "";
  const [y] = bd.split("/");
  return y && y.length === 4 ? y : "";
}

function formatBirthdayFull(bd?: string): string {
  if (!bd) return "";
  const parts = bd.split("/");
  if (parts.length === 3) return `${parts[0]}年 ${parts[1]}.${parts[2].padStart(2, "0")}`;
  if (parts.length === 2) return `${parts[0]}月${parts[1]}日`;
  return bd;
}

function calcProYears(joinYear?: number): number | null {
  if (!joinYear) return null;
  return new Date().getFullYear() - joinYear;
}

function getRelatedPlayers(player: RosterPlayer): RelatedCard[] {
  const all = getAllPlayers();
  const related: RelatedCard[] = [];
  for (const p of all) {
    if (p.id === player.id) continue;
    if (related.length >= 6) break;
    const sameLeague = p.org === player.org && p.league === player.league;
    const sameOrg = p.org === player.org;
    if (sameLeague || sameOrg) {
      related.push({
        av: p.name.charAt(0),
        nm: p.name,
        meta: `${ORG_META[p.org].label} · ${p.league}`,
        tag: sameLeague ? "同リーグ" : "同団体",
        href: p.href ?? `/players/${p.id}`,
      });
    }
  }
  return related;
}

export function RosterPlayerPage({ player }: RosterPlayerPageProps) {
  const org = ORG_META[player.org];
  const firstChar = player.name.charAt(0);
  const birthYear = formatBirthYear(player.birthday);
  const proYears = calcProYears(player.joinYear);
  const related = getRelatedPlayers(player);

  return (
    <div className="wrap">
      <BgLayers />
      <CustomScrollbar />

      {/* HERO (slim) */}
      <section className="p-hero p-hero--slim">
        <div className="portrait portrait--dynamic">
          <div aria-hidden="true" className="portrait-bg-char">{firstChar}</div>
          <div className="avatar-big">{firstChar}</div>
        </div>
        <div className="info">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <Link href="/players">Players</Link>
            <span className="sep">›</span>
            <Link href={`/organizations/${player.org.toLowerCase()}`}>{player.org}</Link>
            <span className="sep">›</span>
            <span>{player.name}</span>
          </div>
          <span className="kicker">
            ● {org.label} · {player.league}
            {player.period
              ? ` · ${player.period}生`
              : player.joinYear
                ? ` · ${player.joinYear}年入会`
                : ""}
          </span>
          <h1>
            {player.name}
            {(player.nameEn || birthYear) && (
              <span className="en">
                {player.nameEn ?? ""}
                {birthYear ? ` · b. ${birthYear}` : ""}
              </span>
            )}
          </h1>
          {player.nickname && (
            <div className="nickname">{player.nickname}</div>
          )}
          <div className="tags-row">
            {player.title && <span className="tag-chip v">● {player.title}</span>}
            <span className="tag-chip" style={{ background: org.color, color: "#fff" }}>
              {org.label}
            </span>
            <span className="tag-chip">{player.league}リーグ</span>
            {player.period && <span className="tag-chip">{player.period}</span>}
            {(player.tags ?? []).map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TWO COL: Facts + Related */}
      <div className="two-col">
        <div>
          <h2 className="sh">
            <span>基本情報</span>
            <span className="num">Profile</span>
            <span className="rule"></span>
          </h2>
          <section className="fact-box">
            <div className="fhd">
              <span className="t">
                BASIC DATA <span className="en">Personal</span>
              </span>
            </div>
            <ul>
              {player.birthday && (
                <li>
                  <span className="l">Born 生年月日</span>
                  <span className="v">{formatBirthdayFull(player.birthday)}</span>
                </li>
              )}
              {player.birthplace && (
                <li>
                  <span className="l">From 出身地</span>
                  <span className="v">{player.birthplace}</span>
                </li>
              )}
              {player.bloodType && (
                <li>
                  <span className="l">Blood 血液型</span>
                  <span className="v">{player.bloodType}</span>
                </li>
              )}
              {player.hobby && (
                <li>
                  <span className="l">Hobby 趣味</span>
                  <span className="v">{player.hobby}</span>
                </li>
              )}
              {player.joinYear && (
                <li>
                  <span className="l">Debut プロ入り</span>
                  <span className="v">
                    {player.joinYear}年{player.period ? ` · ${player.period}` : ""}
                  </span>
                </li>
              )}
              {proYears !== null && (
                <li>
                  <span className="l">Career プロ歴</span>
                  <span className="v"><span className="h">{proYears}</span> 年</span>
                </li>
              )}
              {player.mleagueTeam && (
                <li>
                  <span className="l">M League Mリーグ</span>
                  <span className="v">{player.mleagueTeam}</span>
                </li>
              )}
              <li>
                <span className="l">Org 所属団体</span>
                <span className="v">
                  <span style={{ color: org.color, fontWeight: 700 }}>●</span> {org.label}
                </span>
              </li>
              <li>
                <span className="l">League リーグ</span>
                <span className="v">{player.league}</span>
              </li>
              {player.title && (
                <li>
                  <span className="l">Title 主要タイトル</span>
                  <span className="v">{player.title}</span>
                </li>
              )}
            </ul>
          </section>
        </div>

        <div>
          <h2 className="sh">
            <span>関連プロ</span>
            <span className="num">Related</span>
            <span className="rule"></span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {related.length > 0 ? (
              related.map((r) => (
                <Link key={r.href} className="related-card" href={r.href}>
                  <div className="avatar">{r.av}</div>
                  <div className="nm">{r.nm}</div>
                  <div className="meta">{r.meta}</div>
                  <span className="tag">{r.tag}</span>
                </Link>
              ))
            ) : (
              <span className="related-card">
                <div className="avatar">—</div>
                <div className="nm">関連選手データ</div>
                <div className="meta">準備中</div>
                <span className="tag">COMING SOON</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ORG CARD */}
      <h2 className="sh" style={{ marginTop: 28 }}>
        <span>所属団体</span>
        <span className="num">Organization</span>
        <span className="rule"></span>
      </h2>
      <div className="related-grid" style={{ gridTemplateColumns: "1fr" }}>
        <Link
          className="related-card"
          href={`/organizations/${player.org.toLowerCase()}`}
          style={{
            background: org.color,
            color: "var(--paper)",
            boxShadow: "5px 5px 0 var(--ink)",
          }}
        >
          <div className="meta" style={{ color: "rgba(255,255,255,.75)" }}>{player.org}</div>
          <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>{org.label}</div>
          <div className="meta" style={{ color: "rgba(255,255,255,.75)", marginTop: 6 }}>
            {player.period
              ? `${player.period}生${proYears !== null ? ` · 在籍${proYears}年` : ""}`
              : player.joinYear
                ? `${player.joinYear}年入会${proYears !== null ? ` · 在籍${proYears}年` : ""}`
                : "所属選手"}
          </div>
          <span
            className="tag"
            style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 14 }}
          >
            団体ページへ →
          </span>
        </Link>
      </div>
    </div>
  );
}
