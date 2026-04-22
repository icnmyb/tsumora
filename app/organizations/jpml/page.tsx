import Link from "next/link";

type OrgInfoRow = { dt: string; dd: React.ReactNode };
const ORG_INFO: OrgInfoRow[] = [
  {
    dt: "正式名称",
    dd: (
      <>
        <b>日本プロ麻雀連盟</b>
        <br />
        <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
          Japan Professional Mahjong League
        </span>
      </>
    ),
  },
  { dt: "略称", dd: "JPML / 連盟" },
  {
    dt: "設立",
    dd: (
      <>
        1981年6月
        <br />
        <span style={{ color: "var(--ink-3)", fontSize: 11 }}>45年の歴史</span>
      </>
    ),
  },
  { dt: "創設者", dd: "小島武夫・灘麻太郎・古川凱章" },
  { dt: "現会長", dd: "森山 茂和" },
  { dt: "本部", dd: "東京都新宿区" },
  { dt: "所属", dd: "日本プロスポーツ協会 加盟" },
  {
    dt: "支部",
    dd: (
      <>
        北海道 / 東北 / 関東 / 中部 / 関西 / 中国 / 九州 · <b>全7支部</b>
      </>
    ),
  },
  {
    dt: "配信",
    dd: (
      <>
        麻雀連盟チャンネル
        <br />
        <a>ニコニコ / YouTube</a>
      </>
    ),
  },
  { dt: "公式", dd: <a>jpml.or.jp</a> },
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
    kanji: "鳳",
    rk: "01 · 最高峰タイトル",
    title: "鳳凰位戦",
    en: "The Hōōi",
    since: "Since 1984 · 第42期 · 賞金 ¥5,000,000",
    leaderName: "瀬戸熊 直樹",
    leaderPt: "+124.5 首位",
    href: "/titles/houou-isen",
  },
  {
    pill: "5月開始",
    kanji: "十",
    rk: "02 · 二大タイトル",
    title: "十段位戦",
    en: "The Jūdan",
    since: "Since 1984 · 第42期 · トーナメント制",
    leaderName: "前 十段位：佐々木 寿人",
    leaderPt: "防衛戦 →",
    leaderPtDone: true,
  },
  {
    pill: "進行中",
    kanji: "王",
    rk: "03 · 三大タイトル",
    title: "王位戦",
    en: "The Ōi",
    since: "Since 1977 · 第50期 · 5団体交流",
    leaderName: "前 王位：近藤 誠一",
    leaderPt: "本戦 4/28",
    leaderPtDone: true,
  },
  {
    pill: "決勝前",
    kanji: "桜",
    rk: "04 · 女流最高峰",
    title: "女流桜花",
    en: "The Ōka",
    since: "Since 1997 · 第28期 · 女流限定",
    leaderName: "黒沢 咲",
    leaderPt: "+82.3 首位",
  },
  {
    pill: "10月開始",
    kanji: "俊",
    rk: "05",
    title: "俊英位戦",
    en: "The Shun-ei",
    since: "Since 2002 · 第24期 · 若手限定",
    leaderName: "前 俊英位：醍醐 大",
    leaderPt: "予選 →",
    leaderPtDone: true,
  },
  {
    pill: "準決勝",
    kanji: "マ",
    rk: "06",
    title: "マスターズ",
    en: "Masters",
    since: "Since 2003 · 第24回 · 5団体交流",
    leaderName: "前 覇者：坂本 大志",
    leaderPt: "4/25 準決勝",
    leaderPtDone: true,
  },
  {
    pill: "決勝 5月",
    kanji: "グ",
    rk: "07",
    title: "グランプリMAX",
    en: "Grand Prix Max",
    since: "Since 2015 · 第11期",
    leaderName: "前 覇者：藤崎 智",
    leaderPt: "決勝 5/18",
    leaderPtDone: true,
  },
  {
    pill: "予選中",
    kanji: "新",
    rk: "08",
    title: "新人王戦",
    en: "Rookie of the Year",
    since: "Since 1990 · 第36回 · 入会3年以内",
    leaderName: "前 新人王：水越 京介",
    leaderPt: "決勝 6月",
    leaderPtDone: true,
  },
];

type ScheduleCard = { badge: string; live?: boolean; dt: string; t: string; sub: React.ReactNode };
const WEEK_SCHEDULE: ScheduleCard[] = [
  {
    badge: "● LIVE 本日",
    live: true,
    dt: "04/21 · 19:30",
    t: "鳳凰位戦A1 第5節B卓",
    sub: (
      <>
        瀬戸熊 / 前原 / 滝沢 / 佐々木
        <br />
        麻雀連盟ch
      </>
    ),
  },
  {
    badge: "明日",
    dt: "04/22 · 20:00",
    t: "十段位戦 二次予選",
    sub: (
      <>
        8卓32名
        <br />
        YouTube / ニコ生
      </>
    ),
  },
  {
    badge: "木",
    dt: "04/23 · 19:00",
    t: "女流桜花A 第4節",
    sub: (
      <>
        黒沢 / 和久津 / 魚谷 / 優月
        <br />
        麻雀連盟ch
      </>
    ),
  },
  {
    badge: "土",
    dt: "04/25 · 14:00",
    t: "マスターズ 準決勝",
    sub: (
      <>
        16名 → 4名
        <br />
        YouTube
      </>
    ),
  },
];

type RosterRow = {
  rk: string;
  top3?: boolean;
  avatar: string;
  avatarClass?: string;
  name: string;
  href?: string;
  sub: string;
  league: string;
  leagueClass: string;
  titles: Array<{ kind: "jpml" | "plain"; label: string }>;
  rate: string;
  games: string;
  top: string;
  avg: string;
};

const ROSTER: RosterRow[] = [
  {
    rk: "一",
    top3: true,
    avatar: "瀬",
    avatarClass: "vermilion",
    name: "瀬戸熊 直樹",
    href: "/players/setokuma",
    sub: "1975生 · 1997年入会 · 第39-41期鳳凰位（3連覇）",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "鳳凰位×3" },
      { kind: "plain", label: "十段×2" },
      { kind: "plain", label: "発王" },
    ],
    rate: "2184",
    games: "4,287",
    top: "28.4%",
    avg: "2.38",
  },
  {
    rk: "二",
    top3: true,
    avatar: "佐",
    name: "佐々木 寿人",
    sub: "1976生 · 2001年入会 · 攻撃型の代名詞 · 格闘倶楽部",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "十段位×3" },
      { kind: "plain", label: "王位×2" },
    ],
    rate: "2147",
    games: "5,103",
    top: "31.2%",
    avg: "2.41",
  },
  {
    rk: "三",
    top3: true,
    avatar: "前",
    name: "前原 雄大",
    sub: "1966生 · 1993年入会 · 第33・36期鳳凰位 · 風林火山",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "鳳凰位×2" },
      { kind: "plain", label: "チャンピオンズ" },
    ],
    rate: "2098",
    games: "6,241",
    top: "26.8%",
    avg: "2.47",
  },
  {
    rk: "四",
    avatar: "滝",
    name: "滝沢 和典",
    sub: "1979生 · 2002年入会 · 第38期鳳凰位 · 格闘倶楽部",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "鳳凰位" },
      { kind: "plain", label: "モンド杯" },
    ],
    rate: "2072",
    games: "3,942",
    top: "25.9%",
    avg: "2.49",
  },
  {
    rk: "五",
    avatar: "藤",
    avatarClass: "gold",
    name: "藤崎 智",
    sub: "1970生 · 1995年入会 · 第32期鳳凰位 · GPM覇者",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "鳳凰位" },
      { kind: "plain", label: "GPM" },
    ],
    rate: "2041",
    games: "4,658",
    top: "25.1%",
    avg: "2.51",
  },
  {
    rk: "六",
    avatar: "白",
    name: "白鳥 翔",
    sub: "1988生 · 2010年入会 · サクラナイツ · 新世代の旗手",
    league: "A2",
    leagueClass: "a2",
    titles: [{ kind: "jpml", label: "チャンピオンズリーグ" }],
    rate: "2018",
    games: "2,847",
    top: "27.3%",
    avg: "2.44",
  },
  {
    rk: "七",
    avatar: "山",
    avatarClass: "moss",
    name: "山井 弘",
    sub: "1967生 · 1990年入会 · 第35期鳳凰位",
    league: "A1",
    leagueClass: "a1",
    titles: [{ kind: "jpml", label: "鳳凰位" }],
    rate: "1998",
    games: "5,821",
    top: "24.2%",
    avg: "2.53",
  },
  {
    rk: "八",
    avatar: "HI",
    name: "HIRO柴田",
    sub: "1974生 · 1998年入会 · 第34期鳳凰位",
    league: "A1",
    leagueClass: "a1",
    titles: [{ kind: "jpml", label: "鳳凰位" }],
    rate: "1982",
    games: "4,412",
    top: "24.8%",
    avg: "2.52",
  },
  {
    rk: "九",
    avatar: "黒",
    avatarClass: "vermilion",
    name: "黒沢 咲",
    sub: "1984生 · 2006年入会 · 女流初A1 · サクラナイツ",
    league: "A1",
    leagueClass: "a1",
    titles: [
      { kind: "jpml", label: "女流桜花×2" },
      { kind: "plain", label: "女流モンド" },
    ],
    rate: "1976",
    games: "3,562",
    top: "24.1%",
    avg: "2.54",
  },
  {
    rk: "十",
    avatar: "和",
    name: "和久津 晶",
    sub: "1983生 · 2005年入会 · 第25期女流桜花 · EARTH JETS",
    league: "A2",
    leagueClass: "a2",
    titles: [{ kind: "jpml", label: "女流桜花" }],
    rate: "1948",
    games: "3,208",
    top: "23.7%",
    avg: "2.55",
  },
  {
    rk: "十一",
    avatar: "近",
    name: "近藤 誠一",
    sub: "1970生 · 1993年入会 · 第48期王位",
    league: "A2",
    leagueClass: "a2",
    titles: [{ kind: "jpml", label: "王位" }],
    rate: "1921",
    games: "4,987",
    top: "23.5%",
    avg: "2.56",
  },
  {
    rk: "十二",
    avatar: "醍",
    avatarClass: "moss",
    name: "醍醐 大",
    sub: "1992生 · 2015年入会 · 第23期俊英位",
    league: "B1",
    leagueClass: "b",
    titles: [{ kind: "jpml", label: "俊英位" }],
    rate: "1898",
    games: "1,842",
    top: "25.4%",
    avg: "2.48",
  },
  {
    rk: "十三",
    avatar: "勝",
    avatarClass: "gold",
    name: "勝又 健志",
    sub: "1982生 · 2004年入会 · 論理派解説者 · 格闘倶楽部",
    league: "A2",
    leagueClass: "a2",
    titles: [{ kind: "jpml", label: "チャンピオンズ" }],
    rate: "1876",
    games: "3,421",
    top: "22.8%",
    avg: "2.58",
  },
  {
    rk: "十四",
    avatar: "魚",
    name: "魚谷 侑未",
    sub: "1988生 · 2010年入会 · 第26・27期女流桜花",
    league: "A2",
    leagueClass: "a2",
    titles: [{ kind: "jpml", label: "女流桜花×2" }],
    rate: "1862",
    games: "2,984",
    top: "23.1%",
    avg: "2.57",
  },
];

type Milestone = { year: string; kind: string; title: string; desc: string };
const MILESTONES: Milestone[] = [
  { year: "1981", kind: "設立", title: "日本プロ麻雀連盟、創設", desc: "小島武夫・灘麻太郎・古川凱章らが参画。日本で初めての本格プロ麻雀団体として発足。" },
  { year: "1984", kind: "タイトル", title: "鳳凰位戦・十段位戦が発足", desc: "最高峰タイトル「鳳凰位戦」と「十段位戦」が同年開始。初代鳳凰位：小島武夫。" },
  { year: "1990", kind: "新世代", title: "新人王戦 発足", desc: "若手発掘を目的とした新人王戦がスタート。" },
  { year: "1997", kind: "女流", title: "女流桜花 開始", desc: "女流最高峰タイトルとして第1期が開催。" },
  { year: "2009", kind: "電脳化", title: "ニコニコ生放送で「麻雀連盟チャンネル」開設", desc: "配信時代の幕開け。年間視聴者数が急拡大。" },
  { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "佐々木寿人・前原雄大・沢崎誠・瀬戸熊直樹らが各チームに選抜。" },
  { year: "2024", kind: "記念", title: "創設45周年", desc: "所属プロ600名を突破。支部も全国7拠点に拡大。" },
  { year: "2026", kind: "現在", title: "第42期鳳凰位戦 進行中", desc: "瀬戸熊直樹が4連覇を狙う。第5節B卓 本日19:30〜。" },
];

type Champion = { ep: string; name: string; note?: string; yr: string };
const CHAMPIONS: Champion[] = [
  { ep: "41", name: "瀬戸熊 直樹", note: "3連覇 · 現鳳凰位", yr: "2025" },
  { ep: "40", name: "瀬戸熊 直樹", note: "2連覇", yr: "2024" },
  { ep: "39", name: "瀬戸熊 直樹", note: "初戴冠", yr: "2023" },
  { ep: "38", name: "滝沢 和典", note: "初", yr: "2022" },
  { ep: "37", name: "沢崎 誠", note: "最年長記録", yr: "2021" },
  { ep: "36", name: "前原 雄大", note: "2度目", yr: "2020" },
  { ep: "35", name: "山井 弘", yr: "2019" },
  { ep: "34", name: "HIRO柴田", yr: "2018" },
  { ep: "33", name: "前原 雄大", note: "初", yr: "2017" },
  { ep: "32", name: "藤崎 智", yr: "2016" },
];

export default function JpmlPage() {
  return (
    <div className="wrap">
      <section className="org-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="#">Organizations</Link>
          <span className="sep">›</span>
          <span>日本プロ麻雀連盟</span>
        </div>
        <div className="top-grid">
          <div>
            <div className="org-code">JPML · NIHON PRO MAHJONG RENMEI · EST. 1981</div>
            <h1>
              日本プロ麻雀連盟
              <span className="en">Japan Professional Mahjong League</span>
            </h1>
            <div className="tags">
              <span className="highlight">● 最大手団体</span>
              <span>創設1981年</span>
              <span>所属プロ 612名</span>
              <span>タイトル戦 14</span>
              <span>45年の歴史</span>
            </div>
          </div>
          <div className="kite">
            <div className="k-main">連</div>
          </div>
        </div>
        <div className="meta-row">
          <div className="m">
            <div className="l">Founded</div>
            <div className="v accent">1981</div>
            <div className="sub">
              昭和56年 · 小島武夫ら
              <br />
              創設45周年
            </div>
          </div>
          <div className="m">
            <div className="l">Active Pros</div>
            <div className="v">
              612
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">5団体中最大規模</div>
          </div>
          <div className="m">
            <div className="l">Titles</div>
            <div className="v">
              14
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>戦</span>
            </div>
            <div className="sub">鳳凰位 · 十段 · 王位 ほか</div>
          </div>
          <div className="m">
            <div className="l">M-League</div>
            <div className="v">
              05
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>名</span>
            </div>
            <div className="sub">格闘倶楽部 · 風林火山 他</div>
          </div>
          <div className="m">
            <div className="l">This Week</div>
            <div className="v" style={{ color: "#f0c86d" }}>
              08
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>対局</span>
            </div>
            <div className="sub">A1 B卓 · 十段決定戦 ほか</div>
          </div>
        </div>
      </section>

      <div className="intro-block">
        <div className="intro-main">
          <h2>
            団体紹介<span className="en">About JPML</span>
          </h2>
          <div className="lead">
            <p>
              日本プロ麻雀連盟（JPML）は、1981年に小島武夫・灘麻太郎・古川凱章らによって設立された、日本最大の麻雀プロ団体である。所属プロは612名を数え、国内麻雀プロ人口のおよそ40%を占める。
            </p>
            <p>
              連盟の象徴である鳳凰位戦は、最高峰タイトルとして1984年から連綿と続き、第42期を迎えた現在もプロ麻雀界の頂点に位置する。A1〜A2〜B〜C〜Dの5部リーグ制を採用し、毎年厳しい昇降級争いが繰り広げられる。
            </p>
            <p>
              他にも十段位戦・王位戦・女流桜花など、格式ある競技会を14タイトル擁する。競技ルールは「一発・裏ドラなし / 赤牌なし」の正統派で、純然たる技術戦を重視する姿勢が特徴である。
            </p>
            <p>
              Mリーグには現在、KONAMI麻雀格闘倶楽部を中心に5名が所属。佐々木寿人・前原雄大・滝沢和典ら攻撃型の名手が連盟の看板として戦っている。
            </p>
          </div>
          <div className="pullquote">
            「競技麻雀の矜持を守り続ける、日本最大のプロ団体。」
            <br />
            鳳凰位戦・十段位戦の伝統と、Mリーグ時代への適応の両立が現在のテーマである。
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
        <span className="num">Major Titles · 14 Events</span>
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

      <section className="sched-strip">
        <h3>
          今週の対局<span className="en">This Week at JPML · 8 Matches</span>
        </h3>
        <div className="grid">
          {WEEK_SCHEDULE.map((s, i) => (
            <div key={i} className={`si ${s.live ? "live" : ""}`.trim()}>
              <span className="badge">{s.badge}</span>
              <div className="dt">{s.dt}</div>
              <div className="t">{s.t}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <h2 className="sh">
        <span>所属プロ名鑑</span>
        <span className="num">Active Roster · Top 14 by Rating</span>
        <span className="rule"></span>
        <span className="more">全612名 →</span>
      </h2>
      <section className="roster-wrap">
        <div className="roster-head">
          <div className="ttl">
            レーティング上位<span className="en">Top 14 by JPML Rating</span>
          </div>
          <div className="filters">
            <span className="on">ALL</span>
            <span>A1</span>
            <span>A2</span>
            <span>B</span>
            <span>女流</span>
            <span>Mリーグ</span>
          </div>
        </div>
        <table className="roster-table">
          <thead>
            <tr>
              <th>順</th>
              <th>選手</th>
              <th style={{ width: 80 }}>リーグ</th>
              <th>主要タイトル</th>
              <th className="n">レート</th>
              <th className="n">通算戦</th>
              <th className="n">1位率</th>
              <th className="n">平均着順</th>
            </tr>
          </thead>
          <tbody>
            {ROSTER.map((r) => (
              <tr key={r.rk}>
                <td className={`rk ${r.top3 ? "top3" : ""}`.trim()}>{r.rk}</td>
                <td>
                  <div className="player-cell">
                    <span className={`avatar ${r.avatarClass ?? ""}`.trim()}>{r.avatar}</span>
                    <div>
                      <div className="pname">
                        {r.href ? <Link href={r.href}>{r.name}</Link> : <a>{r.name}</a>}
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
                      <span key={i} className={t.kind === "jpml" ? "t-jpml" : undefined}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="n">{r.rate}</td>
                <td className="n">{r.games}</td>
                <td className="n p">{r.top}</td>
                <td className="n">{r.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="two-col">
        <section className="timeline">
          <h3>
            団体の歩み<span className="en">Milestones</span>
          </h3>
          {MILESTONES.map((m) => (
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
            歴代鳳凰位<span className="en">Past Champions</span>
          </h3>
          {CHAMPIONS.map((c) => (
            <div key={c.ep} className="champ-row">
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
        <span>配信・メディア</span>
        <span className="num">Channels</span>
        <span className="rule"></span>
      </h2>
      <div className="media-row">
        <div className="media-card">
          <div className="icn nico">N</div>
          <h4>麻雀連盟チャンネル</h4>
          <div className="desc">
            ニコニコ生放送にて、鳳凰位戦・十段位戦・女流桜花など主要タイトル戦を生中継。会員制で過去アーカイブも視聴可能。
          </div>
          <div className="meta">
            <span>
              会員 <b>48,200名</b>
            </span>
            <span>
              月間 <b>28配信</b>
            </span>
          </div>
        </div>
        <div className="media-card">
          <div className="icn ytb">Y</div>
          <h4>JPML YouTube</h4>
          <div className="desc">
            ハイライト・インタビュー・新人王戦の一部を無料公開。チャンネル登録者は増加傾向で、Mリーグ経由の新規ファンも多い。
          </div>
          <div className="meta">
            <span>
              登録 <b>128,000名</b>
            </span>
            <span>
              月間 <b>18本</b>
            </span>
          </div>
        </div>
        <div className="media-card">
          <div className="icn abema">A</div>
          <h4>ABEMA · Mリーグ</h4>
          <div className="desc">
            Mリーグ公式放送にて、連盟所属プロ5名の対局をレギュラーシーズン中毎週放映。無料視聴可能。
          </div>
          <div className="meta">
            <span>
              週 <b>3対局</b>
            </span>
            <span>
              レギュラー <b>10月〜5月</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
