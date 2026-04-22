import Link from "next/link";

const NPM_ACCENT = "#2563eb";

type OrgInfoRow = { dt: string; dd: React.ReactNode };
const ORG_INFO: OrgInfoRow[] = [
  {
    dt: "正式名称",
    dd: (
      <>
        <b>日本プロ麻雀協会</b>
        <br />
        <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
          Nippon Professional Mahjong
        </span>
      </>
    ),
  },
  { dt: "略称", dd: "NPM / 協会" },
  {
    dt: "設立",
    dd: (
      <>
        2001年
        <br />
        <span style={{ color: "var(--ink-3)", fontSize: 11 }}>25年の歴史</span>
      </>
    ),
  },
  { dt: "現会長", dd: "森岡 貞臣" },
  { dt: "所属プロ", dd: "298名" },
  { dt: "リーグ", dd: "A1〜D3 · 9部制" },
  { dt: "公式", dd: <a>npm2001.com</a> },
];

type TitleCard = {
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
};

const TITLES: TitleCard[] = [
  {
    pill: "● LIVE",
    pillLive: true,
    kanji: "雀",
    rk: "01 · 最高峰タイトル",
    title: "雀王戦",
    en: "The Jan-ō",
    since: "Since 2002 · A1〜D3の9部制 · 協会最高位",
    leaderName: "現雀王：石橋 伸洋",
    leaderPt: "防衛戦 進行中",
  },
  {
    pill: "進行中",
    kanji: "令",
    rk: "02 · 二大タイトル",
    title: "令昭位戦",
    en: "The Reishōi",
    since: "Since 2020 · トーナメント制",
    leaderName: "現令昭位：矢島 亨",
    leaderPt: "+68.2 首位",
  },
  {
    pill: "予選中",
    kanji: "竜",
    rk: "03 · 協会三大タイトル",
    title: "雀竜位戦",
    en: "The Janryū-i",
    since: "Since 2003 · 全協会員参加",
    leaderName: "前雀竜位：浅井 堂岐",
    leaderPt: "予選 →",
    leaderPtDone: true,
  },
  {
    pill: "7月開始",
    kanji: "日",
    rk: "04 · 国際大会",
    title: "日本オープン",
    en: "Japan Open",
    since: "Since 2013 · オープン参加",
    leaderName: "前年覇者：吉田 直",
    leaderPt: "エントリー中",
    leaderPtDone: true,
  },
];

type PlayerCard = {
  avatar: string;
  avatarClass?: string;
  name: string;
  en: string;
  sub: string;
  tag: string;
};

const FEATURED_PLAYERS: PlayerCard[] = [
  {
    avatar: "石",
    name: "石橋 伸洋",
    en: "Nobuhiro Ishibashi",
    sub: "1978生 · 2002年入会 · 現雀王 · 防御型の名手",
    tag: "現雀王",
  },
  {
    avatar: "魚",
    avatarClass: "vermilion",
    name: "魚谷 侑未",
    en: "Yumi Uotani",
    sub: "1988生 · 2010年入会 · 女流タイトル複数 · 解説者としても活躍",
    tag: "女流の顔",
  },
  {
    avatar: "勝",
    avatarClass: "gold",
    name: "勝又 健志",
    en: "Kenji Katsumata",
    sub: "1982生 · 2004年入会 · 論理派プロ · 解説・執筆でも著名",
    tag: "論理派",
  },
];

export default function NpmPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/organizations">Organizations</Link>
          <span className="sep">›</span>
          <span>日本プロ麻雀協会</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code" style={{ color: NPM_ACCENT }}>
              NPM · NIPPON PROFESSIONAL MAHJONG · EST. 2001
            </div>
            <h1>
              日本プロ麻雀協会
              <span className="en">Nippon Professional Mahjong</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: NPM_ACCENT }}>● 第二団体</span>
              <span>創設 2001年</span>
              <span>所属プロ 298名</span>
              <span>タイトル戦 4</span>
              <span>25年の歴史</span>
            </div>
          </div>
          <div className="kite" style={{ color: NPM_ACCENT }}>
            <div className="k-main">協</div>
          </div>
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent" style={{ color: NPM_ACCENT }}>2001</div>
            <div className="sub">
              平成13年
              <br />
              創設25周年
            </div>
          </div>
          <div className="m">
            <div className="l">Active Pros</div>
            <div className="v">
              298
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">第二規模</div>
          </div>
          <div className="m">
            <div className="l">Titles</div>
            <div className="v">
              04
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>戦</span>
            </div>
            <div className="sub">雀王 · 令昭位 · 雀竜位 · 日本オープン</div>
          </div>
          <div className="m">
            <div className="l">League</div>
            <div className="v" style={{ color: NPM_ACCENT }}>
              09
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>部</span>
            </div>
            <div className="sub">A1 〜 D3 の9部制</div>
          </div>
          <div className="m">
            <div className="l">Chairman</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22 }}>森岡</div>
            <div className="sub">森岡 貞臣 会長</div>
          </div>
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">About NPM</span>
          </h2>
          <div className="lead">
            <p>
              日本プロ麻雀協会（NPM）は、2001年に発足した麻雀プロ団体である。現会長は森岡貞臣、所属プロは約298名。競技性とエンターテインメント性の両立を掲げる第二団体として、プロ麻雀界で独自のポジションを築いてきた。
            </p>
            <p>
              協会の象徴である雀王戦は、2002年の第1期開始から続く最高峰タイトルである。A1・A2・B1・B2・C1・C2・D1・D2・D3の
              <b>9部制リーグ</b>
              を採用し、所属プロ全員が年間を通じて昇降級を懸けて戦う。現雀王は石橋伸洋。
            </p>
            <p>
              雀王戦に加え、令昭位戦・雀竜位戦・日本オープンを協会の主要タイトル戦として擁する。いずれも配信・解説の整った大会として知られ、オープン参加の大会も多い。
            </p>
          </div>
          <div className="pullquote">
            「競技とエンタメを両立させる、新世代のプロ団体。」
            <br />
            雀王戦9部制リーグを軸に、タイトル戦の層の厚さと配信文化で麻雀界を牽引する。
          </div>
        </div>
        <div className="intro-side">
          <h3>
            団体情報<span className="en">At a Glance</span>
          </h3>
          <dl>
            {ORG_INFO.map((row, i) => (
              <span key={i} style={{ display: "contents" }}>
                <dt>{row.dt}</dt>
                <dd>{row.dd}</dd>
              </span>
            ))}
          </dl>
        </div>
      </div>

      <h2 className="sh">
        <span>主要タイトル戦</span>
        <span className="num">Major Titles · 4 Events</span>
        <span className="rule"></span>
        <span className="more">すべて見る →</span>
      </h2>
      <div className="title-grid">
        {TITLES.map((t) => {
          const inner = (
            <>
              <span className={`pill ${t.pillLive ? "live" : ""}`.trim()}>{t.pill}</span>
              <span className="big-kanji">{t.kanji}</span>
              <div className="rk">{t.rk}</div>
              <h3>{t.title}</h3>
              <div className="en">{t.en}</div>
              <div className="since">{t.since}</div>
              <div className="leader">
                <span className="name">{t.leaderName}</span>
                <span className={`pt ${t.leaderPtDone ? "done" : ""}`.trim()}>{t.leaderPt}</span>
              </div>
            </>
          );
          return t.href ? (
            <Link key={t.title} href={t.href} className="t-card">
              {inner}
            </Link>
          ) : (
            <a key={t.title} className="t-card">
              {inner}
            </a>
          );
        })}
      </div>

      <h2 className="sh">
        <span>注目選手</span>
        <span className="num">Featured Players · 3</span>
        <span className="rule"></span>
        <span className="more">全298名 →</span>
      </h2>
      <div className="title-grid">
        {FEATURED_PLAYERS.map((p) => (
          <a key={p.name} className="t-card">
            <span className="pill">{p.tag}</span>
            <span className={`big-kanji ${p.avatarClass ?? ""}`.trim()}>{p.avatar}</span>
            <div className="rk">Featured</div>
            <h3>{p.name}</h3>
            <div className="en">{p.en}</div>
            <div className="since">{p.sub}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
