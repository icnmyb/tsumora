import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "日本プロ麻雀連盟（JPML）— TSUMORA",
  description:
    "1981年設立、日本プロ麻雀連盟（JPML）の概要・主要タイトル戦（鳳凰位 / 十段位 / 王位 / 女流桜花 ほか）・所属プロ。",
  openGraph: {
    title: "日本プロ麻雀連盟（JPML）— TSUMORA",
    description: "JPML の概要・主要タイトル戦・所属プロ。",
    siteName: "TSUMORA",
    type: "website",
  },
};

const JPML: OrgDetailPageData = {
  crumbLabel: "日本プロ麻雀連盟",
  accent: "#c8282a",
  code: "JPML · NIHON PRO MAHJONG RENMEI · EST. 1981",
  nameJa: "日本プロ麻雀連盟",
  nameEn: "Japan Professional Mahjong League",
  kite: "連",
  highlightTag: "1981年設立",
  extraTags: ["掲載プロ 1,067名", "鳳凰位戦", "十段位戦", "公式競技・段位制"],
  meta: [
    { label: "Founded", value: "1981", accent: true, sub: <>昭和56年<br />3月6日設立</> },
    { label: "Active Pros", value: "1,067", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Events", value: "主要", sub: "鳳凰位 · 十段 · 王位 ほか" },
    { label: "M-League", value: "05", unit: "名", sub: "格闘倶楽部 · 風林火山 他" },
    {
      label: "This Week",
      value: "08",
      unit: "対局",
      valueStyle: { color: "#f0c86d" },
      sub: "A1 B卓 · 十段決定戦 ほか",
    },
  ],
  about: {
    en: "About JPML",
    leadParagraphs: [
      "日本プロ麻雀連盟（JPML）は、1981年3月6日に設立された競技麻雀のプロ団体である。公式競技の開催を主な活動とし、段位審査、免許状の発行、麻雀教室、執筆・メディア活動なども行っている。",
      "公式サイトでは、競技麻雀を通じた職業棋士の育成・社会的地位の向上、健全な麻雀遊戯の普及・発展、伝統文化・大衆文化の発展向上と国際親善への寄与を目的として掲げている。",
      "主要タイトルには鳳凰位戦、十段位戦、王位戦、女流桜花などがある。長期リーグで頂点を決める鳳凰位戦と、トーナメント色の強いタイトル戦が並び、所属プロは年間を通じて複数の舞台で競う。",
      "MリーグにはKONAMI麻雀格闘倶楽部、TEAM RAIDEN/雷電、EX風林火山、BEAST Xなどで連盟所属プロが出場している。攻撃型から守備型、若手からベテランまで幅広い選手層を持つ団体である。",
    ],
    pullQuote: (
      <>
        「公式競技、段位制、普及活動を柱にする競技麻雀団体。」
        <br />
        鳳凰位戦・十段位戦などのタイトル戦と、道場・教室・メディア活動を通じて麻雀文化の普及に取り組む。
      </>
    ),
  },
  info: [
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
          1981年3月6日
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>45年の歴史</span>
        </>
      ),
    },
    { dt: "現会長", dd: "森山 茂和" },
    { dt: "本部道場", dd: "東京都豊島区巣鴨" },
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
          <span>ニコニコ / YouTube</span>
        </>
      ),
    },
    { dt: "公式", dd: <span>jpml.or.jp</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Selected Major Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "鳳",
        rk: "01 · 最高峰タイトル",
        title: "鳳凰位戦",
        en: "The Hōōi",
        since: "Since 1984 · 第42期 · 賞金 ¥5,000,000",
        leaderName: "現鳳凰位：白鳥 翔",
        leaderPt: "第42期",
        leaderPtDone: true,
        href: "/titles/houou-isen",
      },
      {
        pill: "5月開始",
        kanji: "十",
        rk: "02 · 二大タイトル",
        title: "十段位戦",
        en: "The Jūdan",
        since: "Since 1984 · 第42期 · トーナメント制",
        leaderName: "現十段位：浜野 太陽",
        leaderPt: "第42期",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "王",
        rk: "03 · 三大タイトル",
        title: "王位戦",
        en: "The Ōi",
        since: "Since 1977 · 第50期 · 5団体交流",
        leaderName: "現王位：石川 正明",
        leaderPt: "第50期",
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
    ],
  },
  schedule: {
    title: "今週の対局",
    en: "This Week at JPML · 8 Matches",
    cards: [
      {
        badge: "● LIVE 本日",
        live: true,
        dt: "04/21 · 19:30",
        t: "鳳凰位戦A1 第5節B卓",
        sub: <>瀬戸熊 / 前原 / 滝沢 / 佐々木<br />麻雀連盟ch</>,
      },
      {
        badge: "明日",
        dt: "04/22 · 20:00",
        t: "十段位戦 二次予選",
        sub: <>8卓32名<br />YouTube / ニコ生</>,
      },
      {
        badge: "木",
        dt: "04/23 · 19:00",
        t: "女流桜花A 第4節",
        sub: <>黒沢 / 和久津 / 魚谷 / 優月<br />麻雀連盟ch</>,
      },
      {
        badge: "土",
        dt: "04/25 · 14:00",
        t: "マスターズ 準決勝",
        sub: <>16名 → 4名<br />YouTube</>,
      },
    ],
  },
  roster: {
    totalCount: 612,
    showingTitle: "レーティング上位",
    showingEn: "Top 14 by JPML Rating",
    primaryTitleClass: "t-jpml",
    filters: [
      { label: "ALL", active: true },
      { label: "A1" },
      { label: "A2" },
      { label: "B" },
      { label: "女流" },
      { label: "Mリーグ" },
    ],
    rows: [
      { rk: "一", top3: true, avatar: "瀬", avatarClass: "vermilion", name: "瀬戸熊 直樹", href: "/players/setokuma", sub: "1975生 · 1997年入会 · 第39-41期鳳凰位（3連覇）", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "鳳凰位×3" }, { kind: "plain", label: "十段×2" }, { kind: "plain", label: "発王" }], rate: "2184", games: "4,287", top: "28.4%", avg: "2.38" },
      { rk: "二", top3: true, avatar: "佐", name: "佐々木 寿人", href: "/players/sasaki", sub: "1976生 · 2001年入会 · 攻撃型の代名詞 · 格闘倶楽部", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "十段位×3" }, { kind: "plain", label: "王位×2" }], rate: "2147", games: "5,103", top: "31.2%", avg: "2.41" },
      { rk: "三", top3: true, avatar: "鈴", name: "鈴木 大介", href: "/players/suzuki-d", sub: "1974生 · 第39期生 · 五段 · BEAST X", league: "A1", leagueClass: "a1", titles: [{ kind: "plain", label: "最強位" }], rate: "2098", games: "2,841", top: "26.8%", avg: "2.47" },
      { rk: "四", avatar: "滝", name: "滝沢 和典", href: "/players/takizawa", sub: "1979生 · 2002年入会 · 第38期鳳凰位 · 格闘倶楽部", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "鳳凰位" }, { kind: "plain", label: "モンド杯" }], rate: "2072", games: "3,942", top: "25.9%", avg: "2.49" },
      { rk: "五", avatar: "藤", avatarClass: "gold", name: "藤崎 智", sub: "1970生 · 1995年入会 · 第32期鳳凰位 · GPM覇者", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "鳳凰位" }, { kind: "plain", label: "GPM" }], rate: "2041", games: "4,658", top: "25.1%", avg: "2.51" },
      { rk: "六", avatar: "白", name: "白鳥 翔", href: "/players/shiratori", sub: "1988生 · 2010年入会 · サクラナイツ · 新世代の旗手", league: "A2", leagueClass: "a2", titles: [{ kind: "primary", label: "チャンピオンズリーグ" }], rate: "2018", games: "2,847", top: "27.3%", avg: "2.44" },
      { rk: "七", avatar: "山", avatarClass: "moss", name: "山井 弘", sub: "1967生 · 1990年入会 · 第35期鳳凰位", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "鳳凰位" }], rate: "1998", games: "5,821", top: "24.2%", avg: "2.53" },
      { rk: "八", avatar: "HI", name: "HIRO柴田", href: "/players/hiro-shibata", sub: "1974生 · 1998年入会 · 第34期鳳凰位", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "鳳凰位" }], rate: "1982", games: "4,412", top: "24.8%", avg: "2.52" },
      { rk: "九", avatar: "黒", avatarClass: "vermilion", name: "黒沢 咲", href: "/players/kurosawa", sub: "1984生 · 2006年入会 · 女流初A1 · サクラナイツ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "女流桜花×2" }, { kind: "plain", label: "女流モンド" }], rate: "1976", games: "3,562", top: "24.1%", avg: "2.54" },
      { rk: "十", avatar: "和", name: "和久津 晶", sub: "1983生 · 2005年入会 · 第25期女流桜花 · EARTH JETS", league: "A2", leagueClass: "a2", titles: [{ kind: "primary", label: "女流桜花" }], rate: "1948", games: "3,208", top: "23.7%", avg: "2.55" },
      { rk: "十一", avatar: "内", name: "内川 幸太郎", href: "/players/uchikawa", sub: "1981生 · 第26期入会 · KADOKAWAサクラナイツ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "チャンピオンズ" }], rate: "1921", games: "3,128", top: "25.4%", avg: "2.49" },
      { rk: "十二", avatar: "阿", avatarClass: "moss", name: "阿久津 翔太", href: "/players/akutsu", sub: "1991生 · 第32期入会 · BEAST X", league: "A1", leagueClass: "a1", titles: [{ kind: "plain", label: "新人王" }], rate: "1898", games: "1,842", top: "25.4%", avg: "2.48" },
      { rk: "十三", avatar: "勝", avatarClass: "gold", name: "勝又 健志", href: "/players/katsumata", sub: "1982生 · 第26期入会 · 論理派解説者 · 格闘倶楽部", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "チャンピオンズ" }], rate: "1876", games: "3,421", top: "22.8%", avg: "2.58" },
      { rk: "十四", avatar: "三", name: "三浦 智博", href: "/players/miura", sub: "1987生 · 第28期入会 · 十段位×2 · EARTH JETS", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "十段位×2" }, { kind: "plain", label: "王位" }], rate: "1862", games: "2,984", top: "23.1%", avg: "2.57" },
    ],
  },
  milestones: [
    { year: "1981", kind: "設立", title: "日本プロ麻雀連盟、創設", desc: "小島武夫・灘麻太郎・古川凱章らが参画。日本で初めての本格プロ麻雀団体として発足。" },
    { year: "1984", kind: "タイトル", title: "鳳凰位戦・十段位戦が発足", desc: "最高峰タイトル「鳳凰位戦」と「十段位戦」が同年開始。初代鳳凰位：小島武夫。" },
    { year: "1990", kind: "新世代", title: "新人王戦 発足", desc: "若手発掘を目的とした新人王戦がスタート。" },
    { year: "1997", kind: "女流", title: "女流桜花 開始", desc: "女流最高峰タイトルとして第1期が開催。" },
    { year: "2009", kind: "電脳化", title: "ニコニコ生放送で「麻雀連盟チャンネル」開設", desc: "配信時代の幕開け。年間視聴者数が急拡大。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "佐々木寿人・前原雄大・沢崎誠・瀬戸熊直樹らが各チームに選抜。" },
    { year: "2024", kind: "記念", title: "創設45周年", desc: "所属プロ600名を突破。支部も全国7拠点に拡大。" },
    { year: "2025", kind: "タイトル", title: "第42期鳳凰位、白鳥翔が連覇", desc: "第42期鳳凰位決定戦を白鳥翔が制し、第41期に続く連覇を達成。" },
  ],
  champions: {
    title: "歴代鳳凰位",
    en: "Past Champions",
    rows: [
      { ep: "42", name: "白鳥 翔", note: "現鳳凰位", yr: "2025" },
      { ep: "41", name: "白鳥 翔", note: "初戴冠", yr: "2024" },
      { ep: "40", name: "佐々木 寿人", yr: "2023" },
      { ep: "39", name: "HIRO柴田", yr: "2022" },
      { ep: "38", name: "佐々木 寿人", yr: "2021" },
      { ep: "37", name: "佐々木 寿人", yr: "2020" },
      { ep: "36", name: "藤崎 智", yr: "2019" },
      { ep: "35", name: "吉田 直", yr: "2018" },
      { ep: "34", name: "前原 雄大", yr: "2017" },
      { ep: "33", name: "前原 雄大", yr: "2016" },
    ],
  },
  media: {
    title: "配信・メディア",
    en: "Channels",
    cards: [
      {
        iconClass: "nico",
        iconLabel: "N",
        title: "麻雀連盟チャンネル",
        desc: "ニコニコ生放送にて、鳳凰位戦・十段位戦・女流桜花など主要タイトル戦を生中継。会員制で過去アーカイブも視聴可能。",
        meta: [
          { label: "会員", value: "48,200名" },
          { label: "月間", value: "28配信" },
        ],
      },
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "JPML YouTube",
        desc: "ハイライト・インタビュー・新人王戦の一部を無料公開。チャンネル登録者は増加傾向で、Mリーグ経由の新規ファンも多い。",
        meta: [
          { label: "登録", value: "128,000名" },
          { label: "月間", value: "18本" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送にて、連盟所属プロ5名の対局をレギュラーシーズン中毎週放映。無料視聴可能。",
        meta: [
          { label: "週", value: "3対局" },
          { label: "レギュラー", value: "10月〜5月" },
        ],
      },
    ],
  },
};

export default function JpmlPage() {
  return <OrgDetailPage data={JPML} />;
}
