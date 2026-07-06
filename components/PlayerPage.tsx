import Link from "next/link";
import { type AllPlayer, type AnnualPoint, ALL_PLAYERS, ORG_META } from "@/app/players/data";
import { TEAM_NAME_TO_SLUG, TEAMS, type SeasonResult } from "@/app/teams/data";
import { PlayerVideoSection } from "@/components/PlayerVideoSection";
import { calcYearsSinceProStart, getProStartYear, periodToYear, type SupportedOrg } from "@/lib/period";

function formatBirthYear(bd: string): string {
  const parts = bd.split("/");
  if (parts.length >= 1 && parts[0].length === 4) return parts[0];
  return "";
}

function formatBirthdayFull(bd: string): string {
  const parts = bd.split("/");
  if (parts.length === 3) return `${parts[0]}年 ${parts[1]}.${parts[2].padStart(2, "0")}`;
  if (parts.length === 2) return `${parts[0]}月${parts[1]}日`;
  return bd;
}

function formatGenderLabel(gender?: AllPlayer["gender"]): string {
  if (gender === "male") return "男性";
  if (gender === "female") return "女性";
  return "";
}

function isCreatorPlayer(player: Pick<AllPlayer, "id">): boolean {
  return player.id === "toshiya_takami" || player.id === "takamitoshiya";
}

type CareerBar = { h: number; v: string; cls: string; isNegative: boolean };

function seasonResultToAnnualNote(result: SeasonResult | undefined): "final" | "semifinal" | "regular" {
  if (result === "champion" || result === "final") return "final";
  if (result === "semifinal") return "semifinal";
  return "regular";
}

function getAnnualPointNote(mleagueTeam: string | undefined, point: AnnualPoint): "final" | "semifinal" | "regular" {
  const teamName = point.team ?? mleagueTeam;
  const teamSlug = teamName ? TEAM_NAME_TO_SLUG[teamName] : undefined;
  const result = TEAMS.find((team) => team.slug === teamSlug)?.seasons.find((season) => season.season === point.season)?.result;
  return seasonResultToAnnualNote(result ?? point.note);
}

function buildCareerChart(
  annualPoints: AnnualPoint[] | undefined,
  mleagueTeam: string | undefined,
): { bars: CareerBar[]; labels: string[] } {
  if (!annualPoints || annualPoints.length === 0) return { bars: [], labels: [] };

  const sorted = [...annualPoints].sort((a, b) => a.season.localeCompare(b.season));
  const absMax = Math.max(...sorted.map((p) => Math.abs(p.points)), 1);

  const bars: CareerBar[] = sorted.map((p) => {
    const magnitude = Math.abs(p.points);
    const h = magnitude === 0 ? 0 : Math.max(16, Math.round(Math.sqrt(magnitude / absMax) * 86));
    const sign = p.points >= 0 ? "+" : "−";
    const v = `${sign}${Math.abs(Math.round(p.points))}`;
    const note = getAnnualPointNote(mleagueTeam, p);
    const cls = note === "final" ? "champ" : note === "semifinal" ? "fin" : "";
    const isNegative = p.points < 0;
    return { h, v, cls, isNegative };
  });

  const labels = sorted.map((p, i) => (i === 0 ? p.season.slice(0, 4) : `'${p.season.slice(2, 4)}`));
  return { bars, labels };
}

function formatRate(n?: number): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return n.toFixed(1);
}

function formatBestScore(n?: number): string {
  if (n === undefined || n === null || Number.isNaN(n)) return "—";
  return n.toLocaleString();
}

function getDisplayTitle(title?: string): string {
  if (!title || title === "—" || title === "-") return "";
  return title;
}

function getTitleCount(player: AllPlayer): number {
  if (player.titles && player.titles.length > 0) return player.titles.length;
  const title = getDisplayTitle(player.title);
  if (!title) return 0;
  const m = title.match(/×(\d+)/);
  return m ? parseInt(m[1]) : 1;
}

function getRelatedPlayers(player: AllPlayer): { av: string; nm: string; meta: string; tag: string; href: string }[] {
  const related: { av: string; nm: string; meta: string; tag: string; href: string }[] = [];
  for (const p of ALL_PLAYERS) {
    if (p.id === player.id) continue;
    if (related.length >= 4) break;
    const sameTeam = player.mleagueTeam && p.mleagueTeam === player.mleagueTeam;
    const sameOrg = p.org === player.org;
    if (sameTeam || sameOrg) {
      related.push({
        av: p.name.charAt(0),
        nm: p.name,
        meta: `${ORG_META[p.org].label} · ${getDisplayTitle(p.title) || p.league}`,
        tag: sameTeam ? "同チーム" : "同団体",
        href: p.href,
      });
    }
  }
  return related;
}

export function PlayerPage({ player }: { player: AllPlayer }) {
  const org = ORG_META[player.org];
  // 期 → 年マッピングが効く団体（最高位戦）は期から計算、それ以外は joinYear をフォールバック
  const proYears = calcYearsSinceProStart(player.org as SupportedOrg, player.period, player.joinYear, player.proSinceYear) ?? 0;
  const derivedJoinYear = periodToYear(player.org as SupportedOrg, player.period) ?? player.joinYear;
  const derivedProStartYear = getProStartYear(player.org as SupportedOrg, player.period, player.joinYear, player.proSinceYear);
  const hasTransferHistory =
    typeof derivedProStartYear === "number" &&
    typeof derivedJoinYear === "number" &&
    derivedProStartYear !== derivedJoinYear;
  const timelineSinceYear = derivedProStartYear ?? derivedJoinYear;
  const firstChar = player.name.charAt(0);
  const birthYear = formatBirthYear(player.birthday);
  const isDeveloper = isCreatorPlayer(player);
  const { bars: careerBars, labels: careerLabels } = buildCareerChart(player.annualPoints, player.mleagueTeam);
  const hasCareerData = careerBars.length > 0;
  const titleCount = getTitleCount(player);
  const titles = player.titles ?? [];
  const timelineItems = [
    ...titles.map((title) => ({ ...title, type: "title" as const })),
    ...(player.careerTimeline ?? []).map((event) => ({ ...event, type: "career" as const })),
    ...(hasTransferHistory && derivedJoinYear
      ? [{
          year: String(derivedJoinYear),
          name: `${org.label}へ移籍`,
          sub: player.period ? `${player.period}生` : `${derivedJoinYear}年入会`,
          type: "debut" as const,
        }]
      : []),
    ...(timelineSinceYear
      ? [{
          year: String(timelineSinceYear),
          name: `${player.debutOrgLabel ?? org.label}入会`,
          sub: hasTransferHistory ? "プロデビュー" : `${player.period ? `${player.period}生` : ""} · プロデビュー`,
          type: "debut" as const,
        }]
      : []),
  ].sort((a, b) => Number(b.year) - Number(a.year));
  const mainTitle = getDisplayTitle(player.title);
  const related = getRelatedPlayers(player);
  const cs = player.currentSeason;
  const leagueLabel = player.league && player.league !== "—" ? player.league : null;
  const csSeason = cs?.season ?? "";
  const csPoints = cs?.season
    ? player.annualPoints?.find((p) => p.season === cs.season)?.points
    : undefined;
  const genderLabel = formatGenderLabel(player.gender);

  return (
    <div className="wrap">
      {/* ── 1. PLAYER HERO ── */}
      <section className="p-hero">
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
            ● {[org.label, leagueLabel, player.license ? `${player.license}ライセンス` : null, player.period ? `${player.period}生` : `${derivedJoinYear}年入会`].filter(Boolean).join(" · ")}
          </span>
          <h1>
            {player.name}
            <span className="en">
              {player.nameEn}
              {birthYear ? ` · b. ${birthYear}` : ""}
            </span>
          </h1>
          {player.nickname && (
            <div className="nickname">
              {player.nickname}
            </div>
          )}
          <div className="tags-row">
            {isDeveloper && <span className="tag-chip dev">製作者</span>}
            {mainTitle && <span className="tag-chip v">● {mainTitle}</span>}
            {player.mleagueTeam && <span className="tag-chip g">Mリーグ {player.mleagueTeam}</span>}
            <span className="tag-chip" style={{ background: org.color, color: "#fff" }}>
              {org.label}
            </span>
            {player.license && <span className="tag-chip">{player.license}ライセンス</span>}
            {player.tags.map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="side">
          <div className="kv">
            <div className="l">Title Count 獲得タイトル数</div>
            <div className="v">
              <b>{titleCount || "—"}</b> {titleCount > 0 ? "冠" : ""}
            </div>
          </div>
          <div className="kv">
            <div className="l">Current League リーグ</div>
            <div className="v">
              <b>{player.league === "—" ? "未登録" : player.league}</b>
            </div>
          </div>
          {player.license && (
            <div className="kv">
              <div className="l">License ライセンス</div>
              <div className="v">
                <b>{player.license}</b>
              </div>
            </div>
          )}
          <div className="kv">
            <div className="l">Pro Since プロ歴</div>
            <div className="v">
              <b>{proYears}</b> 年目{" "}
              <span style={{ fontFamily: "'Geist Mono'", fontSize: 11, color: "rgba(235,228,210,.6)" }}>
                SINCE {derivedProStartYear}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS 4 ── */}
      <div className="stats4">
        <div className="stat-b v">
          <div className="lb">
            Title Count <span className="en">獲得タイトル数</span>
          </div>
          <div className="v-num">
            {titleCount || "—"}<span className="u">{titleCount > 0 ? "冠" : ""}</span>
          </div>
          <div className="sub">{mainTitle || "タイトル情報なし"}</div>
        </div>
        <div className="stat-b dark">
          <div className="lb">
            Top Rate <span className="en">{csSeason ? `${csSeason} Mリーグ 1着率` : "今期Mリーグ 1着率"}</span>
          </div>
          <div className="v-num">
            {formatRate(cs?.topRate)}<span className="u">%</span>
          </div>
          <div className="sub">
            {cs?.topRate !== undefined
              ? `${csSeason} レギュラーシーズン`
              : "データ準備中"}
          </div>
        </div>
        <div className="stat-b">
          <div className="lb">
            4th Avoidance <span className="en">{csSeason ? `${csSeason} Mリーグ 4着回避率` : "今期Mリーグ 4着回避率"}</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            {formatRate(cs?.avoid4th)}<span className="u">%</span>
          </div>
          <div className="sub">
            {cs?.avoid4th !== undefined
              ? `${csSeason} レギュラーシーズン`
              : "データ準備中"}
          </div>
        </div>
        <div className="stat-b">
          <div className="lb">
            Best Score <span className="en">{csSeason ? `${csSeason} Mリーグ 最高スコア` : "今期Mリーグ 最高スコア"}</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            {formatBestScore(cs?.bestScore)}<span className="u">点</span>
          </div>
          <div className="sub">
            {cs?.bestScore !== undefined
              ? csPoints !== undefined
                ? `${csSeason} 通算 ${csPoints >= 0 ? "+" : ""}${csPoints.toFixed(1)}pt`
                : `${csSeason} レギュラーシーズン`
              : "データ準備中"}
          </div>
        </div>
      </div>

      {/* ── 3. TWO COL: bio + facts ── */}
      <div className="two-col">
        <div>
          <h2 className="sh">
            <span>プロフィール</span>
            <span className="num">Profile</span>
            <span className="rule"></span>
          </h2>
          <section className="bio-box">
            <h3>
              {player.name}という雀士<span className="en">About {player.nameEn}</span>
            </h3>
            {player.bio ? (
              player.bio.map((text, i) => <p key={i}>{text}</p>)
            ) : (
              <p>
                {player.nickname ? `「${player.nickname}」の異名を持つ` : ""}
                {org.label}所属、{player.period ? `${player.period}生` : `${derivedJoinYear}年入会`}。
                {player.league}リーグで活躍中。
                {mainTitle ? `主要タイトルに${mainTitle}がある。` : ""}
                {player.mleagueTeam ? `Mリーグでは${player.mleagueTeam}に所属。` : ""}
                プロ歴{proYears}年のキャリアを持つ。
              </p>
            )}
          </section>

        </div>

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
                <span className="l">Born 生年月日</span>
                <span className="v">
                  {formatBirthdayFull(player.birthday)}
                </span>
              </li>
              {genderLabel && (
                <li>
                  <span className="l">Gender 性別</span>
                  <span className="v">{genderLabel}</span>
                </li>
              )}
              {player.birthplace && (
                <li>
                  <span className="l">From 出身地</span>
                  <span className="v">{player.birthplace}</span>
                </li>
              )}
              {player.branch && (
                <li>
                  <span className="l">Branch 所属本部・支部</span>
                  <span className="v">{player.branch}</span>
                </li>
              )}
              {player.bloodType && (
                <li>
                  <span className="l">Blood 血液型</span>
                  <span className="v">{player.bloodType}</span>
                </li>
              )}
              {player.license && (
                <li>
                  <span className="l">License ライセンス</span>
                  <span className="v">{player.license}</span>
                </li>
              )}
              <li>
                <span className="l">Debut プロ入り</span>
                <span className="v">
                  {timelineSinceYear}年
                  {hasTransferHistory
                    ? ` · ${player.debutOrgLabel ?? "プロデビュー"}${derivedJoinYear ? `（${derivedJoinYear}年${org.label}へ移籍）` : ""}`
                    : player.period ? ` · ${player.period}` : ""}
                </span>
              </li>
              <li>
                <span className="l">Career プロ歴</span>
                <span className="v">
                  <span className="h">{proYears}</span> 年目
                </span>
              </li>
              {player.careerNote && (
                <li>
                  <span className="l">Transfer 移籍歴</span>
                  <span className="v">{player.careerNote}</span>
                </li>
              )}
              {player.hobby && (
                <li>
                  <span className="l">Hobby 趣味</span>
                  <span className="v">{player.hobby}</span>
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
                  <span style={{ color: org.color, fontWeight: 700 }}>●</span>{" "}
                  {org.label}
                </span>
              </li>
              {player.officialUrl && (
                <li>
                  <span className="l">Official 公式プロフィール</span>
                  <span className="v">
                    <a href={player.officialUrl} target="_blank" rel="noopener noreferrer">
                      団体HPの選手ページ
                    </a>
                  </span>
                </li>
              )}
              {mainTitle && (
                <li>
                  <span className="l">Title 主要タイトル</span>
                  <span className="v">{mainTitle}</span>
                </li>
              )}
            </ul>
          </section>

          <h2 className="sh" style={{ marginTop: 24 }}>
            <span>関連プロ</span>
            <span className="num">Related</span>
            <span className="rule"></span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {related.length > 0 ? (
              related.map((r, i) => (
                <Link key={i} className="related-card" href={r.href}>
                  <div className="avatar">{r.av}</div>
                  <div className="nm">{r.nm}</div>
                  <div className="meta">{r.meta}</div>
                  <span className="tag">{r.tag}</span>
                </Link>
              ))
            ) : (
              <span className="related-card" aria-disabled="true">
                <div className="avatar">—</div>
                <div className="nm">関連選手データ</div>
                <div className="meta">準備中</div>
                <span className="tag">COMING SOON</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 3.5 VIDEOS (only Featured players that have videos) ── */}
      {player.videos && player.videos.length > 0 && (
        <>
          <h2 className="sh">
            <span>ハイライト動画</span>
            <span className="num">Highlights</span>
            <span className="rule"></span>
            <span className="more">YouTube埋め込み</span>
          </h2>
          <PlayerVideoSection videos={player.videos} playerName={player.name} />
        </>
      )}

      {/* ── 4. CAREER CHART ── */}
      <h2 className="sh">
        <span>キャリアハイライト</span>
        <span className="num">Career by Year</span>
        <span className="rule"></span>
        <span className="more">
          {hasCareerData ? `${careerBars.length} SEASONS · Mリーグ REGULAR` : "DATA COMING SOON"}
        </span>
      </h2>
      <section className="career-chart">
        <h3>
          年間獲得ポイント推移
          <span className="en">
            {hasCareerData
              ? `Mリーグ Annual Point Trajectory · ${careerLabels[0]}–${(player.annualPoints ?? []).slice(-1)[0]?.season ?? ""}`
              : "Mリーグ Annual Point Trajectory"}
          </span>
        </h3>
        {hasCareerData ? (
          <>
            <div className="cc-grid" style={{ gridTemplateColumns: `repeat(${careerBars.length}, 1fr)` }}>
              {careerBars.map((b, i) => (
                <div key={i} className={`cc-cell ${b.isNegative ? "is-neg" : "is-pos"}`}>
                  <div className={`cc-bar ${b.cls}`.trim()} style={{ height: `${b.h}%` }}></div>
                  <span className="cc-value">{b.v}</span>
                </div>
              ))}
            </div>
            <div className="cc-labels" style={{ gridTemplateColumns: `repeat(${careerLabels.length}, 1fr)` }}>
              {careerLabels.map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </div>
          </>
        ) : (
          <div style={{ padding: "48px 0", textAlign: "center", color: "var(--ink-3)" }}>
            Mリーグ個人ポイントデータ準備中
          </div>
        )}
        <div className="cc-legend">
          <span>
            <span className="k" style={{ background: "var(--vermilion)" }}></span>ファイナル進出年
          </span>
          <span>
            <span className="k" style={{ background: "#a07e28" }}></span>セミファイナル進出年
          </span>
          <span>
            <span className="k" style={{ background: "var(--ink)" }}></span>レギュラー敗退年
          </span>
        </div>
      </section>

      {/* ── 5. TITLES TIMELINE + RECENT MATCHES ── */}
      <div className="two-col player-titles-grid">
        <section className="timeline">
          <div className="hd">
            <span className="t">
              主な獲得タイトル <span className="en">Major Titles Won</span>
            </span>
            <span className="n">
              {titles.length > 0 ? `${titles.length} TITLES · ` : ""}SINCE {timelineSinceYear}
            </span>
          </div>
          <ul className="timeline-list">
            {timelineItems.map((item, i) => (
              <li key={`${item.type}-${item.year}-${i}`} className={item.type === "title" ? "champ" : undefined}>
                <span className="yr">{item.year}</span>
                <span className="dot"></span>
                <span className="what">
                  {item.name}
                  {item.sub && <span className="sub">{item.sub}</span>}
                </span>
                {item.type === "title" && <span className="tag win">優勝</span>}
              </li>
            ))}
          </ul>
        </section>

        <div>
          <h2 className="sh" style={{ marginTop: 0 }}>
            <span>最近の対局</span>
            <span className="num">Recent Matches</span>
            <span className="rule"></span>
          </h2>
          <section className="recent-matches">
            <div className="rhd">
              <span className="t">
                直近対局 <span className="en">Recent Matches</span>
              </span>
            </div>
            <table className="rm-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>対局</th>
                  <th style={{ width: 40 }}>順位</th>
                  <th className="n">素点</th>
                  <th className="n">得点</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="dt" colSpan={5} style={{ textAlign: "center", color: "var(--ink-3)", padding: "32px 0" }}>
                    データ準備中
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {/* ── 6. RELATED: org + mleague ── */}
      <h2 className="sh" style={{ marginTop: 28 }}>
        <span>所属団体·参加タイトル戦</span>
        <span className="num">Organization &amp; Titles</span>
        <span className="rule"></span>
      </h2>
      <div className="related-grid" style={{ gridTemplateColumns: player.mleagueTeam ? "1fr 1fr" : "1fr" }}>
        <Link
          className="related-card"
          href={`/organizations/${player.org.toLowerCase()}`}
          style={{ background: org.color, color: "var(--paper)", boxShadow: "5px 5px 0 var(--ink)" }}
        >
          <div className="meta" style={{ color: "rgba(255,255,255,.75)" }}>
            {player.org}
          </div>
          <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>
            {org.label}
          </div>
          <div className="meta" style={{ color: "rgba(255,255,255,.75)", marginTop: 6 }}>
            {hasTransferHistory && derivedJoinYear
              ? `${derivedJoinYear}年移籍 · プロ歴${proYears}年目`
              : player.period ? `${player.period}生として在籍${proYears}年目` : `${derivedJoinYear}年入会 · 在籍${proYears}年目`}
          </div>
          <span className="tag" style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 14 }}>
            団体ページへ →
          </span>
        </Link>
        {player.mleagueTeam && (
          <Link
            className="related-card"
            href={
              TEAM_NAME_TO_SLUG[player.mleagueTeam]
                ? `/teams/${TEAM_NAME_TO_SLUG[player.mleagueTeam]}`
                : "/teams"
            }
            style={{ boxShadow: "5px 5px 0 var(--ink)" }}
          >
            <div className="meta">Mリーグ</div>
            <div className="nm" style={{ fontSize: 22 }}>
              {player.mleagueTeam}
            </div>
            <div className="meta">チーム紹介</div>
            <span className="tag">Mリーグ</span>
          </Link>
        )}
      </div>
    </div>
  );
}
