import Link from "next/link";
import { type AllPlayer, type AnnualPoint, ALL_PLAYERS, ORG_META } from "@/app/players/data";
import { BgLayers } from "@/components/BgLayers";
import { CustomScrollbar } from "@/components/CustomScrollbar";

function calcProYears(joinYear: number): number {
  return new Date().getFullYear() - joinYear;
}

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

function randomStyleBars(): { lab: string; en: string; width: number; cls: string }[] {
  const base = [
    { lab: "攻撃力", en: "Offense", cls: "v" },
    { lab: "守備力", en: "Defense", cls: "" },
    { lab: "読み", en: "Reading", cls: "" },
    { lab: "押し引き", en: "Push-Fold", cls: "" },
    { lab: "速度", en: "Speed", cls: "g" },
    { lab: "打点", en: "Power", cls: "g" },
    { lab: "精神力", en: "Mental", cls: "m" },
  ];
  return base.map((b) => ({
    ...b,
    width: Math.floor(Math.random() * 40) + 55,
  }));
}

type CareerBar = { h: number; v: string; cls: string };

function buildCareerChart(annualPoints: AnnualPoint[] | undefined): { bars: CareerBar[]; labels: string[] } {
  if (!annualPoints || annualPoints.length === 0) return { bars: [], labels: [] };

  const sorted = [...annualPoints].sort((a, b) => a.season.localeCompare(b.season));
  const absMax = Math.max(...sorted.map((p) => Math.abs(p.points)), 1);

  const bars: CareerBar[] = sorted.map((p) => {
    const h = Math.max(8, Math.round((Math.abs(p.points) / absMax) * 92));
    const sign = p.points >= 0 ? "+" : "−";
    const v = `${sign}${Math.abs(Math.round(p.points))}`;
    const base = p.note === "final" ? "champ" : p.note === "semifinal" ? "fin" : "";
    const cls = p.points < 0 ? `${base} neg`.trim() : base;
    return { h, v, cls };
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

function getTitleCount(player: AllPlayer): number {
  if (player.titles && player.titles.length > 0) return player.titles.length;
  if (!player.title) return 0;
  const m = player.title.match(/×(\d+)/);
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
        meta: `${ORG_META[p.org].label} · ${p.title}`,
        tag: sameTeam ? "同チーム" : "同団体",
        href: p.href,
      });
    }
  }
  return related;
}

export function PlayerPage({ player }: { player: AllPlayer }) {
  const org = ORG_META[player.org];
  const proYears = calcProYears(player.joinYear);
  const firstChar = player.name.charAt(0);
  const birthYear = formatBirthYear(player.birthday);
  const styleBars = randomStyleBars();
  const { bars: careerBars, labels: careerLabels } = buildCareerChart(player.annualPoints);
  const hasCareerData = careerBars.length > 0;
  const titleCount = getTitleCount(player);
  const related = getRelatedPlayers(player);
  const cs = player.currentSeason;
  const csSeason = cs?.season ?? "";
  const csPoints = cs?.season
    ? player.annualPoints?.find((p) => p.season === cs.season)?.points
    : undefined;

  return (
    <div className="wrap">
      <BgLayers />
      <CustomScrollbar />

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
            ● {org.label} · {player.league} · {player.period ? `${player.period}生` : `${player.joinYear}年入会`}
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
            {player.title && <span className="tag-chip v">● {player.title}</span>}
            {player.mleagueTeam && <span className="tag-chip g">Mリーグ {player.mleagueTeam}</span>}
            <span className="tag-chip" style={{ background: org.color, color: "#fff" }}>
              {org.label}
            </span>
            {player.tags.map((t) => (
              <span key={t} className="tag-chip">{t}</span>
            ))}
          </div>
        </div>
        <div className="side">
          <div className="kv">
            <div className="l">Total Titles 獲得タイトル</div>
            <div className="v">
              <b>{titleCount || "—"}</b> {titleCount > 0 ? "冠" : ""}
            </div>
          </div>
          <div className="kv">
            <div className="l">Current League リーグ</div>
            <div className="v">
              <b>{player.league}</b>
            </div>
          </div>
          <div className="kv">
            <div className="l">Pro Since プロ歴</div>
            <div className="v">
              <b>{proYears}</b> 年{" "}
              <span style={{ fontFamily: "'Geist Mono'", fontSize: 11, color: "rgba(235,228,210,.6)" }}>
                SINCE {player.joinYear}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. STATS 4 ── */}
      <div className="stats4">
        <div className="stat-b v">
          <div className="lb">
            Career Titles <span className="en">通算タイトル</span>
          </div>
          <div className="v-num">
            {titleCount || "—"}<span className="u">{titleCount > 0 ? "冠" : ""}</span>
          </div>
          <div className="sub">{player.title || "タイトル情報なし"}</div>
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
                {org.label}所属、{player.period ? `${player.period}生` : `${player.joinYear}年入会`}。
                {player.league}リーグで活躍中。
                {player.title ? `主要タイトルに${player.title}がある。` : ""}
                {player.mleagueTeam ? `Mリーグでは${player.mleagueTeam}に所属。` : ""}
                プロ歴{proYears}年のキャリアを持つ。
              </p>
            )}
          </section>

          <h2 className="sh">
            <span>スタイル分析</span>
            <span className="num">Playing Style</span>
            <span className="rule"></span>
            <span className="more">ANALYSIS</span>
          </h2>
          <section className="style-chart">
            <h3>
              攻守のバランス<span className="en">Offense × Defense</span>
            </h3>
            <div className="sc-bars">
              {styleBars.map((b, i) => (
                <div key={i} className="sc-bar">
                  <div className="lab">
                    {b.lab}
                    <span className="en">{b.en}</span>
                  </div>
                  <div className="track">
                    <div className={`fill ${b.cls}`.trim()} style={{ width: `${b.width}%` }}></div>
                  </div>
                  <div className="n">{b.width}</div>
                </div>
              ))}
            </div>
            <div className="sc-note">
              <b>評</b> {player.name}のスタイル分析データは現在整備中です。詳細な評価は今後更新予定。
            </div>
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
              <li>
                <span className="l">Debut プロ入り</span>
                <span className="v">
                  {player.joinYear}年{player.period ? ` · ${player.period}` : ""}
                </span>
              </li>
              <li>
                <span className="l">Career プロ歴</span>
                <span className="v">
                  <span className="h">{proYears}</span> 年
                </span>
              </li>
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
              {player.title && (
                <li>
                  <span className="l">Title 主要タイトル</span>
                  <span className="v">{player.title}</span>
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
              <a className="related-card" href="#">
                <div className="avatar">—</div>
                <div className="nm">関連選手データ</div>
                <div className="meta">準備中</div>
                <span className="tag">COMING SOON</span>
              </a>
            )}
          </div>
        </div>
      </div>

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
                <div key={i} className={`cc-bar ${b.cls}`.trim()} style={{ height: `${b.h}%` }}>
                  {b.v}
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
      <div className="two-col" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
        <section className="timeline">
          <div className="hd">
            <span className="t">
              獲得タイトル <span className="en">All Titles Won</span>
            </span>
            <span className="n">
              {player.titles && player.titles.length > 0
                ? `${player.titles.length} TITLES · SINCE ${player.joinYear}`
                : `SINCE ${player.joinYear}`}
            </span>
          </div>
          <ul className="timeline-list">
            {player.titles && player.titles.length > 0 ? (
              player.titles.map((t, i) => (
                <li key={i} className="champ">
                  <span className="yr">{t.year}</span>
                  <span className="dot"></span>
                  <span className="what">
                    {t.name}
                    {t.sub && <span className="sub">{t.sub}</span>}
                  </span>
                  <span className="tag win">優勝</span>
                </li>
              ))
            ) : (
              <li>
                <span className="yr">—</span>
                <span className="dot"></span>
                <span className="what">
                  タイトル歴準備中
                  <span className="sub">今後更新予定</span>
                </span>
              </li>
            )}
            <li>
              <span className="yr">{player.joinYear}</span>
              <span className="dot"></span>
              <span className="what">
                {org.label}入会
                <span className="sub">{player.period ? `${player.period}生` : ""} · プロデビュー</span>
              </span>
            </li>
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
            {player.period ? `${player.period}生として在籍${proYears}年` : `${player.joinYear}年入会 · 在籍${proYears}年`}
          </div>
          <span className="tag" style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 14 }}>
            団体ページへ →
          </span>
        </Link>
        {player.mleagueTeam && (
          <a className="related-card" href="#" style={{ boxShadow: "5px 5px 0 var(--ink)" }}>
            <div className="meta">Mリーグ</div>
            <div className="nm" style={{ fontSize: 22 }}>
              {player.mleagueTeam}
            </div>
            <div className="meta">所属選手</div>
            <span className="tag">Mリーグ</span>
          </a>
        )}
      </div>
    </div>
  );
}
