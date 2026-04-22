import Link from "next/link";

const RMU_ACCENT = "#a07e28";

type OrgInfoRow = { dt: string; dd: React.ReactNode };
const ORG_INFO: OrgInfoRow[] = [
  {
    dt: "正式名称",
    dd: (
      <>
        <b>RMU</b>
        <br />
        <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
          Real Mahjong Unit
        </span>
      </>
    ),
  },
  { dt: "略称", dd: "RMU" },
  {
    dt: "設立",
    dd: (
      <>
        2007年
        <br />
        <span style={{ color: "var(--ink-3)", fontSize: 11 }}>多井隆晴が設立</span>
      </>
    ),
  },
  { dt: "代表", dd: "多井 隆晴" },
  { dt: "所属プロ", dd: "約120名" },
  { dt: "主要タイトル", dd: "RMUクラシック · BEAST" },
  { dt: "公式", dd: <a>rmu-mahjong.jp</a> },
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
    kanji: "典",
    rk: "01 · 伝統タイトル",
    title: "RMUクラシック",
    en: "The RMU Classic",
    since: "古典ルール · 一発裏ドラなし · 実力派の真剣勝負",
    leaderName: "現王者：多井 隆晴",
    leaderPt: "決勝 進行中",
  },
  {
    pill: "進行中",
    kanji: "獣",
    rk: "02 · 頂点タイトル",
    title: "BEAST",
    en: "The Beast",
    since: "RMU最高峰 · 年間王者決定戦",
    leaderName: "現BEAST：河野 高志",
    leaderPt: "+41.8 首位",
  },
  {
    pill: "予選中",
    kanji: "王",
    rk: "03 · リーグ戦",
    title: "Aリーグ",
    en: "The A-League",
    since: "昇降級制 · 年間リーグ戦",
    leaderName: "Aリーグ首位：多井 隆晴",
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
    avatar: "多",
    avatarClass: "gold",
    name: "多井 隆晴",
    en: "Takaharu Oi",
    sub: "1972生 · RMU代表 · Mリーグ渋谷ABEMAS · 「最速最強」",
    tag: "団体代表",
  },
  {
    avatar: "醍",
    name: "醍醐 大",
    en: "Dai Daigo",
    sub: "1974生 · RMU所属 · 実力派ベテラン · タイトル複数獲得",
    tag: "ベテラン",
  },
  {
    avatar: "松",
    avatarClass: "vermilion",
    name: "松本 吉弘",
    en: "Yoshihiro Matsumoto",
    sub: "1984生 · RMU所属 · Mリーグ TEAM RAIDEN/雷電 · 攻撃型",
    tag: "Mリーガー",
  },
];

export default function RmuPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/organizations">Organizations</Link>
          <span className="sep">›</span>
          <span>RMU</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code" style={{ color: RMU_ACCENT }}>
              RMU · REAL MAHJONG UNIT · EST. 2007
            </div>
            <h1>
              RMU
              <span className="en">Real Mahjong Unit</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: RMU_ACCENT }}>● 実力主義</span>
              <span>創設 2007年</span>
              <span>代表 多井隆晴</span>
              <span>所属プロ 約120名</span>
              <span>少数精鋭</span>
            </div>
          </div>
          <div className="kite" style={{ color: RMU_ACCENT }}>
            <div className="k-main">雀</div>
          </div>
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent" style={{ color: RMU_ACCENT }}>2007</div>
            <div className="sub">
              平成19年
              <br />
              多井隆晴が設立
            </div>
          </div>
          <div className="m">
            <div className="l">Active Pros</div>
            <div className="v">
              120
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">少数精鋭</div>
          </div>
          <div className="m">
            <div className="l">Titles</div>
            <div className="v">
              02
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>戦</span>
            </div>
            <div className="sub">RMUクラシック · BEAST</div>
          </div>
          <div className="m">
            <div className="l">Leader</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22, color: RMU_ACCENT }}>
              多井
            </div>
            <div className="sub">
              代表・多井隆晴
              <br />
              「最速最強」
            </div>
          </div>
          <div className="m">
            <div className="l">Style</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22 }}>実力</div>
            <div className="sub">実力主義</div>
          </div>
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">About RMU</span>
          </h2>
          <div className="lead">
            <p>
              RMU（Real Mahjong Unit）は、
              <b>2007年に多井隆晴が設立した</b>
              プロ麻雀団体である。所属プロは約120名。「Real」の名が示す通り、実力主義・少数精鋭を標榜し、競技麻雀における真剣勝負の場を追求してきた。
            </p>
            <p>
              代表の多井隆晴は「最速最強」の異名で知られるトッププロで、MリーグではEX風林火山を経て渋谷ABEMASに所属。団体の顔として、そしてMリーガーとして、競技麻雀シーンを牽引し続けている。
            </p>
            <p>
              主要タイトルは、古典ルールで行う
              <b>RMUクラシック</b>
              と、年間王者を決定する最高峰タイトル
              <b>BEAST</b>
              。少数精鋭ならではの濃密な勝負が展開される。醍醐大・松本吉弘ら実力派を擁し、人数は少ないが存在感は大きい。
            </p>
          </div>
          <div className="pullquote">
            「Realな麻雀を、少数精鋭で。」
            <br />
            多井隆晴が率いる、実力主義のプロ集団。
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
        <span className="more">全120名 →</span>
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
