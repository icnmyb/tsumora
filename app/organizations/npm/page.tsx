import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "日本プロ麻雀協会（NPM）— TSUMORA",
  description:
    "2001年設立、日本プロ麻雀協会（NPM）の概要・主要タイトル戦（雀王戦 / 雀竜位戦 ほか）・所属プロ。",
  openGraph: {
    title: "日本プロ麻雀協会（NPM）— TSUMORA",
    description: "NPM の概要・主要タイトル戦・所属プロ。",
    siteName: "TSUMORA",
    type: "website",
  },
};

const NPM_ACCENT = "#2563eb";

const NPM: OrgDetailPageData = {
  crumbLabel: "日本プロ麻雀協会",
  accent: NPM_ACCENT,
  code: "NPM · NIPPON PROFESSIONAL MAHJONG · EST. 2001",
  nameJa: "日本プロ麻雀協会",
  nameEn: "Nippon Professional Mahjong",
  kite: "協",
  highlightTag: "2001年活動開始",
  extraTags: ["法人設立 2010年", "掲載プロ 748名", "雀王戦", "雀竜位戦"],
  meta: [
    { label: "Founded", value: "2001", accent: true, sub: <>平成13年<br />活動開始</> },
    { label: "Active Pros", value: "748", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Events", value: "主要", sub: "雀王 · 雀竜位 · 新人王 · 日本オープン" },
    { label: "League", value: "A1〜F1", accent: true, valueStyle: { fontFamily: "'Geist Mono'", fontSize: 22 }, sub: "雀王戦リーグ" },
    {
      label: "Representative",
      value: "鍛冶田",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "鍛冶田 良一 代表理事",
    },
  ],
  about: {
    en: "About NPM",
    leadParagraphs: [
      "日本プロ麻雀協会（NPM）は、2001年に活動を開始した競技麻雀のプロ団体である。現在の法人名は一般社団法人 日本プロ麻雀協会で、公式の団体概要では2010年4月21日を法人設立日としている。",
      <>
        公式サイトでは、麻雀の普及と発展、麻雀文化の向上発展を目的に、プロ育成、競技会・講習会の開催、麻雀教室、人材派遣、書籍・映像資料の作成などを事業として掲げている。
      </>,
      "主要タイトルには雀王戦、女流雀王戦、雀竜位戦、新人王戦、日本オープン、オータムチャンピオンシップなどがある。雀王戦はA1を頂点とするリーグ制、雀竜位戦は短期で上位を目指せる昇級制を特徴としている。",
      "MリーグにはU-NEXT Pirates、KADOKAWAサクラナイツ、セガサミーフェニックス、BEAST Xなどで協会所属・出身プロが出場している。配信文化やオープン参加型大会との相性も強く、競技と発信の両面で存在感を持つ。",
    ],
    pullQuote: (
      <>
        「普及、育成、競技会運営を通じて麻雀文化の発展を目指す団体。」
        <br />
        雀王戦を中心に、多数の公式戦・地域大会・普及事業を展開している。
      </>
    ),
  },
  info: [
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
          2001年活動開始
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>法人設立 2010年4月21日</span>
        </>
      ),
    },
    { dt: "代表理事", dd: "鍛冶田 良一" },
    { dt: "掲載プロ", dd: "748名 (TSUMORA掲載数)" },
    { dt: "リーグ", dd: "雀王戦 A1〜F1" },
    { dt: "主たる事務所", dd: "東京都千代田区飯田橋" },
    { dt: "事務局", dd: "本部 / 関西 / 宮崎 ほか" },
    { dt: "公式", dd: <span>npm2001.com</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Selected Major Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "雀",
        rk: "01 · 最高峰タイトル",
        title: "雀王戦",
        en: "The Jan-ō",
        since: "Since 2002 · 第25期 · A1〜F1",
        leaderName: "現雀王：西村 雄一郎",
        leaderPt: "第24期",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "新",
        rk: "02 · 若手限定",
        title: "新人王戦",
        en: "Rookie of the Year",
        since: "Since 2008 · 入会5年以内",
        leaderName: "現新人王：貞徳 祐伸",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "竜",
        rk: "03 · 協会三大タイトル",
        title: "雀竜位戦",
        en: "The Janryū-i",
        since: "Since 2003 · 全協会員参加",
        leaderName: "現雀竜位：大川 冬馬",
        leaderPt: "第24期",
        leaderPtDone: true,
      },
      {
        pill: "7月開始",
        kanji: "日",
        rk: "04",
        title: "日本オープン",
        en: "Japan Open",
        since: "第22回 · プロアマ混合",
        leaderName: "現日本オープン：岩崎啓悟",
        leaderPt: "第22回",
        leaderPtDone: true,
      },
    ],
  },
  schedule: {
    title: "公式戦予定",
    en: "Schedule",
    cards: [],
  },
  roster: {
    totalCount: 298,
    showingTitle: "レーティング上位",
    showingEn: "Top 10 by NPM Rating",
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
      { rk: "一", top3: true, avatar: "仲", avatarClass: "vermilion", name: "仲林 圭", href: "/players/nakabayashi", sub: "1985生 · 第7期入会 · 第23期雀王 · U-NEXT Pirates", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀王×2" }, { kind: "plain", label: "發王位×2" }, { kind: "plain", label: "雀竜位" }], rate: "2156", games: "3,128", top: "29.4%", avg: "2.39" },
      { rk: "二", top3: true, avatar: "浅", name: "浅井 堂岐", href: "/players/asai", sub: "1985生 · 第6期入会 · 第10期雀竜位 · セガサミーフェニックス", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀竜位" }], rate: "2098", games: "2,847", top: "27.8%", avg: "2.42" },
      { rk: "三", top3: true, avatar: "松", avatarClass: "gold", name: "松本 吉弘", href: "/players/matsumoto", sub: "1980生 · 第3期入会 · KADOKAWAサクラナイツ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀王" }], rate: "2074", games: "3,621", top: "26.2%", avg: "2.45" },
      { rk: "四", avatar: "下", name: "下石 戟", href: "/players/shimoishi", sub: "1989生 · 第13期入会 · BEAST X", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀王" }], rate: "2042", games: "2,108", top: "26.7%", avg: "2.46" },
      { rk: "五", avatar: "茨", name: "茨城 啓太", sub: "1990生 · 第14期入会 · A1リーグ常連", league: "A1", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }], rate: "2018", games: "2,984", top: "25.4%", avg: "2.48" },
      { rk: "六", avatar: "石", name: "石橋 伸洋", sub: "1978生 · 第3期入会 · 防御型の名手", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀王×2" }], rate: "1992", games: "4,128", top: "24.1%", avg: "2.51" },
      { rk: "七", avatar: "千", avatarClass: "moss", name: "千貫 陽祐", sub: "1986生 · 第10期入会 · 第19期雀王", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "雀王" }], rate: "1976", games: "2,498", top: "24.7%", avg: "2.50" },
      { rk: "八", avatar: "矢", name: "矢島 亨", sub: "1981生 · 第5期入会 · A1リーグ常連 · 現役", league: "A1", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }], rate: "1958", games: "3,012", top: "24.0%", avg: "2.52" },
      { rk: "九", avatar: "逢", avatarClass: "vermilion", name: "逢川 恵夢", href: "/players/aikawa", sub: "1987生 · 第10期入会 · 永世女流雀王 · EARTH JETS", league: "B2", leagueClass: "b", titles: [{ kind: "primary", label: "永世女流雀王" }, { kind: "plain", label: "女流名人" }], rate: "1942", games: "2,184", top: "26.3%", avg: "2.49" },
      { rk: "十", avatar: "鈴", avatarClass: "gold", name: "鈴木 ケンタ", sub: "1986生 · 第10期入会 · A1リーグ常連", league: "A1", leagueClass: "a1", titles: [{ kind: "plain", label: "新人王" }], rate: "1918", games: "2,742", top: "23.4%", avg: "2.54" },
    ],
  },
  milestones: [
    { year: "2001", kind: "発足", title: "日本プロ麻雀協会、活動開始", desc: "日本プロ麻雀協会として活動を開始。2010年4月21日に一般社団法人として法人設立。" },
    { year: "2002", kind: "タイトル", title: "雀王戦 開始", desc: "協会最高峰タイトルとして第1期が開催。リーグ制の原型ができる。" },
    { year: "2003", kind: "新タイトル", title: "雀竜位戦 開始", desc: "全協会員参加の大規模タイトル戦としてスタート。" },
    { year: "2005", kind: "女流", title: "女流雀王戦 開始", desc: "女流最高峰タイトルとして第1期が開催。" },
    { year: "2003", kind: "大会", title: "日本オープン 開始", desc: "プロアマ混合のオープンタイトル戦として開催。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "小林剛・園田賢・鈴木たろうらが各チームに選抜（後に協会所属プロ多数が参戦）。" },
    { year: "2008", kind: "新タイトル", title: "新人王戦 開始", desc: "若手育成を目的とした新人王戦が第1期開催。入会5年以内の選手が対象。" },
    { year: "2025", kind: "タイトル", title: "第24期雀王、西村雄一郎が初戴冠", desc: "第24期雀王決定戦で西村雄一郎が雀王位を獲得。" },
  ],
  champions: {
    title: "歴代雀王",
    en: "Past Jan-ō",
    rows: [
      { ep: "24", name: "西村 雄一郎", note: "現雀王", yr: "2025" },
      { ep: "23", name: "仲林 圭", yr: "2024" },
      { ep: "22", name: "仲林 圭", yr: "2023" },
      { ep: "21", name: "浅井 堂岐", yr: "2022" },
      { ep: "20", name: "渋川 難波", yr: "2021" },
      { ep: "19", name: "矢島 亨", yr: "2020" },
      { ep: "18", name: "堀 慎吾", yr: "2019" },
      { ep: "17", name: "金 太賢", yr: "2018" },
      { ep: "16", name: "金 太賢", yr: "2017" },
      { ep: "15", name: "角谷 ヨウスケ", yr: "2016" },
    ],
  },
  media: {
    title: "配信・メディア",
    en: "Channels",
    cards: [
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "NPM YouTube",
        desc: "雀王戦・雀竜位戦・新人王戦など、協会公式戦の動画・配信情報を扱う公式チャンネル。",
        meta: [
          { label: "媒体", value: "YouTube" },
          { label: "対象", value: "公式戦" },
        ],
      },
      {
        iconClass: "nico",
        iconLabel: "F",
        title: "FRESH LIVE",
        desc: "雀王戦・女流雀王戦など、公式戦の中継で利用されてきた配信プラットフォーム。",
        meta: [
          { label: "媒体", value: "FRESH" },
          { label: "対象", value: "公式戦" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送で、協会所属・出身プロの対局を視聴できる。",
        meta: [
          { label: "媒体", value: "ABEMA" },
          { label: "種別", value: "Mリーグ" },
        ],
      },
    ],
  },
};

export default function NpmPage() {
  return <OrgDetailPage data={NPM} />;
}
