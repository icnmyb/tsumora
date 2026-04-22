import Link from "next/link";

const SAIKOUISEN_ACCENT = "#7c3aed";

type OrgInfoRow = { dt: string; dd: React.ReactNode };
const ORG_INFO: OrgInfoRow[] = [
  {
    dt: "正式名称",
    dd: (
      <>
        <b>最高位戦日本プロ麻雀協会</b>
        <br />
        <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
          Saikouisen Japan Pro Mahjong Association
        </span>
      </>
    ),
  },
  { dt: "略称", dd: "最高位戦" },
  {
    dt: "設立",
    dd: (
      <>
        1976年
        <br />
        <span style={{ color: "var(--ink-3)", fontSize: 11 }}>日本最古のプロ麻雀団体</span>
      </>
    ),
  },
  { dt: "所属プロ", dd: "215名" },
  { dt: "主要タイトル", dd: "最高位決定戦 · Classic · 發王戦" },
  { dt: "公式", dd: <a>saikouisen.com</a> },
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
    kanji: "最",
    rk: "01 · 最高峰タイトル",
    title: "最高位決定戦",
    en: "The Saikoui",
    since: "Since 1976 · 団体最高峰 · A〜Dの4部制",
    leaderName: "現最高位：村上 淳",
    leaderPt: "防衛戦 進行中",
  },
  {
    pill: "進行中",
    kanji: "古",
    rk: "02 · 伝統タイトル",
    title: "Classic",
    en: "The Classic",
    since: "古典ルール採用 · 一発裏ドラなし",
    leaderName: "現Classic王者：小林 剛",
    leaderPt: "+52.4 首位",
  },
  {
    pill: "予選中",
    kanji: "發",
    rk: "03 · オープンタイトル",
    title: "發王戦",
    en: "The Hatsu-ō",
    since: "Since 1985 · オープン参加型",
    leaderName: "前發王：鈴木 たろう",
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
    avatar: "茅",
    avatarClass: "vermilion",
    name: "茅森 早香",
    en: "Sayaka Kayamori",
    sub: "1979生 · 最高位戦所属 · 女流の実力派 · Mリーグでも活躍",
    tag: "女流の顔",
  },
  {
    avatar: "内",
    name: "内川 幸太郎",
    en: "Kotaro Uchikawa",
    sub: "1981生 · 最高位戦所属 · Mリーグ渋谷ABEMAS · 攻撃型の名手",
    tag: "Mリーガー",
  },
  {
    avatar: "黒",
    avatarClass: "gold",
    name: "黒沢 咲",
    en: "Saki Kurosawa",
    sub: "1979生 · 最高位戦所属 · 高打点の「お嬢」 · Mリーグ麻雀格闘倶楽部",
    tag: "高打点",
  },
];

export default function SaikouisenPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="/organizations">Organizations</Link>
          <span className="sep">›</span>
          <span>最高位戦日本プロ麻雀協会</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code" style={{ color: SAIKOUISEN_ACCENT }}>
              SAIKOUISEN · JAPAN PRO MAHJONG ASSOCIATION · EST. 1976
            </div>
            <h1>
              最高位戦日本プロ麻雀協会
              <span className="en">Saikouisen Japan Pro Mahjong Association</span>
            </h1>
            <div className="tags">
              <span className="highlight" style={{ color: SAIKOUISEN_ACCENT }}>● 日本最古</span>
              <span>創設 1976年</span>
              <span>所属プロ 215名</span>
              <span>タイトル戦 3</span>
              <span>50年の伝統</span>
            </div>
          </div>
          <div className="kite" style={{ color: SAIKOUISEN_ACCENT }}>
            <div className="k-main">最</div>
          </div>
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent" style={{ color: SAIKOUISEN_ACCENT }}>1976</div>
            <div className="sub">
              昭和51年
              <br />
              日本最古のプロ団体
            </div>
          </div>
          <div className="m">
            <div className="l">Active Pros</div>
            <div className="v">
              215
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">精鋭揃い</div>
          </div>
          <div className="m">
            <div className="l">Titles</div>
            <div className="v">
              03
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>戦</span>
            </div>
            <div className="sub">最高位 · Classic · 發王</div>
          </div>
          <div className="m">
            <div className="l">Heritage</div>
            <div className="v" style={{ color: SAIKOUISEN_ACCENT }}>
              50
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>年</span>
            </div>
            <div className="sub">競技麻雀の礎</div>
          </div>
          <div className="m">
            <div className="l">Style</div>
            <div className="v" style={{ fontFamily: "'Noto Sans JP'", fontSize: 22 }}>競技</div>
            <div className="sub">競技性重視</div>
          </div>
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">About Saikouisen</span>
          </h2>
          <div className="lead">
            <p>
              最高位戦日本プロ麻雀協会は、1976年に創設された
              <b>日本最古のプロ麻雀団体</b>
              である。所属プロは約215名。半世紀にわたり、競技麻雀の礎を築いてきた歴史ある団体として、プロ麻雀界における存在感は揺るぎない。
            </p>
            <p>
              団体の象徴である最高位決定戦は、第1期から続く日本プロ麻雀史上最古のタイトル戦である。A〜Dの4部制リーグを採用し、所属プロが年間を通じて昇降級を懸けて戦う。現最高位は村上淳。
            </p>
            <p>
              最高位決定戦に加え、一発・裏ドラを排した古典ルールで行う
              <b>Classic</b>
              、オープン参加型の
              <b>發王戦</b>
              を擁し、競技性の高さで広く知られる。茅森早香・内川幸太郎・黒沢咲らMリーガーを多数輩出。
            </p>
          </div>
          <div className="pullquote">
            「競技麻雀の礎を築いた、日本最古のプロ団体。」
            <br />
            50年の伝統と競技性で、プロ麻雀の基準を示し続ける。
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
        <span className="num">Major Titles · 3 Events</span>
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
        <span className="more">全215名 →</span>
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
