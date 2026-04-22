import Link from "next/link";

const MU_ACCENT = "#2f5c3f";

type OrgInfoRow = { dt: string; dd: React.ReactNode };
const ORG_INFO: OrgInfoRow[] = [
  {
    dt: "正式名称",
    dd: (
      <>
        <b>麻将連合-μ-</b>
        <br />
        <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
          Mahjong Union μ
        </span>
      </>
    ),
  },
  { dt: "略称", dd: "μ（ミュー）" },
  {
    dt: "設立",
    dd: (
      <>
        1999年
        <br />
        <span style={{ color: "var(--ink-3)", fontSize: 11 }}>井出洋介を中心に設立</span>
      </>
    ),
  },
  { dt: "所属プロ", dd: "約180名" },
  { dt: "主要タイトル", dd: "μカップ · 王将位戦" },
  { dt: "特色", dd: "競技麻雀 · 一発裏ドラなし" },
  { dt: "公式", dd: <a>ms-mu.net</a> },
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
    kanji: "μ",
    rk: "01 · 頂点タイトル",
    title: "μカップ",
    en: "The Mu Cup",
    since: "μ最高峰 · 年間王者決定戦",
    leaderName: "現王者：忍田 幸夫",
    leaderPt: "決勝 進行中",
  },
  {
    pill: "進行中",
    kanji: "王",
    rk: "02 · 伝統タイトル",
    title: "王将位戦",
    en: "The Osho-i",
    since: "古典ルール · μの看板戦",
    leaderName: "現王将：須田 良規",
    leaderPt: "+38.2 首位",
  },
  {
    pill: "予選中",
    kanji: "麗",
    rk: "03 · 女流タイトル",
    title: "麗神戦",
    en: "The Reishin",
    since: "女流限定 · 年間王者決定戦",
    leaderName: "麗神首位：宮内 こずえ",
    leaderPt: "予選 →",
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
    avatar: "井",
    avatarClass: "gold",
    name: "井出 洋介",
    en: "Yosuke Ide",
    sub: "1956生 · μ創設者 · 東京大学卒 · 「健康麻将」提唱者",
    tag: "創設者",
  },
  {
    avatar: "須",
    name: "須田 良規",
    en: "Yoshiki Suda",
    sub: "1971生 · μ所属 · 早稲田大学卒 · 現王将位 · 理論派",
    tag: "王将位",
  },
  {
    avatar: "宮",
    avatarClass: "vermilion",
    name: "宮内 こずえ",
    en: "Kozue Miyauchi",
    sub: "1979生 · μ所属 · Mリーグ KONAMI麻雀格闘倶楽部 · 女流エース",
    tag: "Mリーガー",
  },
];

export default function MuPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/organizations">Organizations</Link>
          <span className="sep">›</span>
          <span>μ</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code" style={{ color: MU_ACCENT }}>
              μ · MAHJONG UNION · EST. 1999
            </div>
            <h1>
              麻将連合-μ-
              <span className="en">Mahjong Union μ</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: MU_ACCENT }}>● 競技麻雀</span>
              <span>創設 1999年</span>
              <span>創設 井出洋介</span>
              <span>所属プロ 約180名</span>
              <span>健康麻将</span>
            </div>
          </div>
          <div className="kite" style={{ color: MU_ACCENT }}>
            <div className="k-main">μ</div>
          </div>
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent" style={{ color: MU_ACCENT }}>1999</div>
            <div className="sub">
              平成11年
              <br />
              井出洋介が中心に設立
            </div>
          </div>
          <div className="m">
            <div className="l">Active Pros</div>
            <div className="v">
              180
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">中規模団体</div>
          </div>
          <div className="m">
            <div className="l">Titles</div>
            <div className="v">
              02
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>戦</span>
            </div>
            <div className="sub">μカップ · 王将位戦</div>
          </div>
          <div className="m">
            <div className="l">Founder</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22, color: MU_ACCENT }}>
              井出
            </div>
            <div className="sub">
              創設・井出洋介
              <br />
              「健康麻将」提唱
            </div>
          </div>
          <div className="m">
            <div className="l">Style</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22 }}>競技</div>
            <div className="sub">一発裏ドラなし</div>
          </div>
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">About Mu</span>
          </h2>
          <div className="lead">
            <p>
              麻将連合-μ-（Mahjong Union μ）は、
              <b>1999年に井出洋介を中心に設立された</b>
              プロ麻雀団体である。所属プロは約180名。「競技麻雀」を標榜し、一発・裏ドラなしの古典ルールによる真剣勝負を伝統としている。
            </p>
            <p>
              創設者の井出洋介は東京大学出身の理論派プロで、「健康麻将」の概念を広く提唱したことで知られる。ギャンブル性を排し、知的ゲームとしての麻雀の地位向上に長年尽力してきた人物である。
            </p>
            <p>
              主要タイトルは、団体最高峰の
              <b>μカップ</b>
              と、古典ルールによる看板戦
              <b>王将位戦</b>
              。女流タイトルの麗神戦も擁し、理論派・実戦派の双方を輩出する。須田良規・宮内こずえら、competitiveな実力者を多く抱える団体である。
            </p>
          </div>
          <div className="pullquote">
            「競技麻雀を、知的ゲームとして。」
            <br />
            井出洋介が提唱する、健康麻将の総本山。
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
        <span className="num">Major Titles · 2 Events</span>
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
        <span className="more">全180名 →</span>
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
