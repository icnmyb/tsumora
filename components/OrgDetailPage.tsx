import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export interface OrgInfoRow {
  dt: string;
  dd: ReactNode;
}

export interface OrgMetaStat {
  label: string;
  value: ReactNode;
  unit?: string;
  sub: ReactNode;
  accent?: boolean;
  valueStyle?: CSSProperties;
}

export interface OrgTitleCard {
  pill: string;
  pillLive?: boolean;
  kanji: string;
  rk: string;
  title: string;
  en: string;
  since: string;
  leaderName: string;
  leaderPt: string;
  leaderPtDone?: boolean;
  href?: string;
}

export interface OrgScheduleCard {
  badge: string;
  live?: boolean;
  dt: string;
  t: string;
  sub: ReactNode;
}

export interface OrgRosterRow {
  rk: string;
  top3?: boolean;
  avatar: string;
  avatarClass?: string;
  name: string;
  href?: string;
  sub: string;
  league: string;
  leagueClass: string;
  titles: Array<{ kind: "primary" | "plain"; label: string }>;
  rate?: string;
  games?: string;
  top?: string;
  avg?: string;
}

export interface OrgRosterFilter {
  label: string;
  active?: boolean;
}

export interface OrgRoster {
  totalCount: number;
  showingTitle: string;
  showingEn: string;
  filters: OrgRosterFilter[];
  rows: OrgRosterRow[];
  primaryTitleClass?: string;
}

export interface OrgMilestone {
  year: string;
  kind: string;
  title: string;
  desc: string;
}

export interface OrgChampion {
  ep: string;
  name: string;
  note?: string;
  yr: string;
}

export interface OrgChampionList {
  title: string;
  en: string;
  rows: OrgChampion[];
}

export interface OrgMediaCard {
  iconClass: string;
  iconLabel: string;
  title: string;
  desc: string;
  meta: { label: string; value: string }[];
}

export interface OrgDetailPageData {
  crumbLabel: string;
  accent: string;
  code: string;
  nameJa: string;
  nameEn: string;
  kite: string;
  highlightTag: string;
  extraTags: string[];
  meta: OrgMetaStat[];
  about: {
    en: string;
    leadParagraphs: ReactNode[];
    pullQuote: ReactNode;
  };
  info: OrgInfoRow[];
  titles: {
    title: string;
    en: string;
    moreLabel?: string;
    cards: OrgTitleCard[];
  };
  schedule: {
    title: string;
    en: string;
    cards: OrgScheduleCard[];
  };
  roster: OrgRoster;
  milestones: OrgMilestone[];
  champions: OrgChampionList;
  media: {
    title: string;
    en: string;
    cards: OrgMediaCard[];
  };
}

export function OrgDetailPage({ data }: { data: OrgDetailPageData }) {
  const accentStyle = { color: data.accent };
  const heroBgStyle = {
    ["--hero-watermark" as string]: `"${data.kite}"`,
    ["--hero-watermark-color" as string]: `${data.accent}1f`,
  };
  return (
    <div className="wrap">
      <section className="org-hero" style={heroBgStyle}>
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/organizations">Organizations</Link>
          <span className="sep">›</span>
          <span>{data.crumbLabel}</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code" style={accentStyle}>{data.code}</div>
            <h1>
              {data.nameJa}
              <span className="en">{data.nameEn}</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={accentStyle}>● {data.highlightTag}</span>
              {data.extraTags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="kite" style={accentStyle}>
            <div className="k-main">{data.kite}</div>
          </div>
        </div>
        <div className="meta-row">
          {data.meta.map((m) => (
            <div className="m" key={m.label}>
              <div className="l">{m.label}</div>
              <div className={`v ${m.accent ? "accent" : ""}`.trim()} style={m.valueStyle ?? (m.accent ? accentStyle : undefined)}>
                {m.value}
                {m.unit && (
                  <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>
                    {m.unit}
                  </span>
                )}
              </div>
              <div className="sub">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">{data.about.en}</span>
          </h2>
          <div className="lead">
            {data.about.leadParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pullquote">{data.about.pullQuote}</div>
        </div>
        <div className="intro-side">
          <h3>
            団体情報<span className="en">At a Glance</span>
          </h3>
          <dl>
            {data.info.map((row, i) => (
              <span key={i} style={{ display: "contents" }}>
                <dt>{row.dt}</dt>
                <dd>{row.dd}</dd>
              </span>
            ))}
          </dl>
        </div>
      </div>

      <h2 className="sh">
        <span>{data.titles.title}</span>
        <span className="num">{data.titles.en}</span>
        <span className="rule"></span>
        <span className="more">{data.titles.moreLabel ?? "すべて見る →"}</span>
      </h2>
      <div className="title-grid">
        {data.titles.cards.map((t) => {
          const inner = (
            <>
              <span className="big-kanji">{t.kanji}</span>
              <div className="rk">{t.rk}</div>
              <h3>{t.title}</h3>
              <div className="en">{t.en}</div>
              <div className="since">{t.since}</div>
              <div className="leader">
                <span className="name">{t.leaderName}</span>
              </div>
            </>
          );
          return t.href ? (
            <Link key={t.title} href={t.href} className="t-card">
              {inner}
            </Link>
          ) : (
            <span key={t.title} className="t-card">
              {inner}
            </span>
          );
        })}
      </div>

      {/*
      <h2 className="sh">
        <span>所属プロ名鑑</span>
        <span className="num">Active Roster · Featured {data.roster.rows.length}</span>
        <span className="rule"></span>
        <span className="more">全{data.roster.totalCount}名 →</span>
      </h2>
      <section className="roster-wrap">
        <div className="roster-head">
          <div className="ttl">
            {data.roster.showingTitle}<span className="en">{data.roster.showingEn}</span>
          </div>
          <div className="filters">
            {data.roster.filters.map((f) => (
              <span key={f.label} className={f.active ? "on" : undefined}>{f.label}</span>
            ))}
          </div>
        </div>
        <table className="roster-table">
          <thead>
            <tr>
              <th>順</th>
              <th>選手</th>
              <th style={{ width: 80 }}>リーグ</th>
              <th>主要タイトル</th>
            </tr>
          </thead>
          <tbody>
            {data.roster.rows.map((r) => (
              <tr key={r.rk + r.name}>
                <td className={`rk ${r.top3 ? "top3" : ""}`.trim()}>{r.rk}</td>
                <td>
                  <div className="player-cell">
                    <span className={`avatar ${r.avatarClass ?? ""}`.trim()}>{r.avatar}</span>
                    <div>
                      <div className="pname">
                        {r.href ? <Link href={r.href}>{r.name}</Link> : <span>{r.name}</span>}
                      </div>
                      <div className="psub">{r.sub}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`league ${r.leagueClass}`}>{r.league}</span>
                </td>
                <td>
                  <div className="titles">
                    {r.titles.map((t, i) => (
                      <span key={i} className={t.kind === "primary" ? (data.roster.primaryTitleClass ?? "t-jpml") : undefined}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      */}

      <div className="two-col">
        <section className="timeline">
          <h3>
            団体の歩み<span className="en">Milestones</span>
          </h3>
          {data.milestones.map((m) => (
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
            {data.champions.title}<span className="en">{data.champions.en}</span>
          </h3>
          {data.champions.rows.map((c) => (
            <div key={c.ep + c.name} className="champ-row">
              <span className="ep">
                {c.ep}
                <small>期</small>
              </span>
              <span className="ch-name">
                {c.name}
                {c.note && <small>{c.note}</small>}
              </span>
              <span className="ch-yr">{c.yr}</span>
            </div>
          ))}
        </section>
      </div>

      <h2 className="sh">
        <span>{data.media.title}</span>
        <span className="num">{data.media.en}</span>
        <span className="rule"></span>
      </h2>
      <div className="media-row">
        {data.media.cards.map((m) => (
          <div key={m.title} className="media-card">
            <div className={`icn ${m.iconClass}`.trim()}>{m.iconLabel}</div>
            <h4>{m.title}</h4>
            <div className="desc">{m.desc}</div>
            <div className="meta">
              {m.meta.map((mt) => (
                <span key={mt.label}>
                  {mt.label} <b>{mt.value}</b>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
