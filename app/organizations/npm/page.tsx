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
  highlightTag: "第二団体",
  extraTags: ["創設 2001年", "所属プロ 298名", "タイトル戦 4", "25年の歴史"],
  meta: [
    { label: "Founded", value: "2001", accent: true, sub: <>平成13年<br />創設25周年</> },
    { label: "Active Pros", value: "298", unit: "名", sub: "第二規模" },
    { label: "Titles", value: "04", unit: "戦", sub: "雀王 · 雀竜位 · 新人王 · 日本オープン" },
    { label: "League", value: "09", unit: "部", accent: true, sub: "A1 〜 D3 の9部制" },
    {
      label: "Chairman",
      value: "森岡",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "森岡 貞臣 会長",
    },
  ],
  about: {
    en: "About NPM",
    leadParagraphs: [
      "日本プロ麻雀協会（NPM）は、2001年に発足した麻雀プロ団体である。現会長は森岡貞臣、所属プロは約298名。競技性とエンターテインメント性の両立を掲げる第二団体として、プロ麻雀界で独自のポジションを築いてきた。",
      <>
        協会の象徴である雀王戦は、2002年の第1期開始から続く最高峰タイトルである。A1・A2・B1・B2・C1・C2・D1・D2・D3の<b>9部制リーグ</b>を採用し、所属プロ全員が年間を通じて昇降級を懸けて戦う。現雀王は石橋伸洋。
      </>,
      "雀王戦に加え、雀竜位戦・新人王戦・日本オープンを協会の主要タイトル戦として擁する。いずれも配信・解説の整った大会として知られ、オープン参加の大会も多い。",
      "Mリーグには現在、U-NEXT Pirates・セガサミーフェニックス・KADOKAWAサクラナイツに所属プロが在籍。仲林圭・浅井堂岐・松本吉弘らが看板として活躍する。",
    ],
    pullQuote: (
      <>
        「競技とエンタメを両立させる、新世代のプロ団体。」
        <br />
        雀王戦9部制リーグを軸に、タイトル戦の層の厚さと配信文化で麻雀界を牽引する。
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
          2001年
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>25年の歴史</span>
        </>
      ),
    },
    { dt: "現会長", dd: "森岡 貞臣" },
    { dt: "所属プロ", dd: "298名" },
    { dt: "リーグ", dd: "A1〜D3 · 9部制" },
    { dt: "本部", dd: "東京都中央区" },
    { dt: "支部", dd: "本部 / 関西 / 東海 / 東北 / 九州 · 全5地域" },
    { dt: "公式", dd: <span>npm2001.com</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Major Titles · 4 Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "雀",
        rk: "01 · 最高峰タイトル",
        title: "雀王戦",
        en: "The Jan-ō",
        since: "Since 2002 · 第25期 · 9部制リーグ",
        leaderName: "現雀王：仲林 圭",
        leaderPt: "防衛戦 進行中",
      },
      {
        pill: "進行中",
        kanji: "新",
        rk: "02 · 若手限定",
        title: "新人王戦",
        en: "Rookie of the Year",
        since: "Since 2008 · 入会5年以内",
        leaderName: "前新人王：鈴木 ケンタ",
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
    ],
  },
  schedule: {
    title: "今週の対局",
    en: "This Week at NPM · 6 Matches",
    cards: [
      {
        badge: "● LIVE 本日",
        live: true,
        dt: "04/21 · 19:00",
        t: "雀王戦A1 第6節",
        sub: <>仲林 / 石橋 / 鈴木ケンタ / 千貫<br />NPM ch (YouTube)</>,
      },
      {
        badge: "明日",
        dt: "04/22 · 20:00",
        t: "新人王戦 一次予選",
        sub: <>4卓16名<br />FRESH LIVE</>,
      },
      {
        badge: "金",
        dt: "04/24 · 19:00",
        t: "女流雀王戦A 第3節",
        sub: <>逢川 / 朝倉 / 山脇 / 高宮<br />FRESH LIVE</>,
      },
      {
        badge: "土",
        dt: "04/25 · 13:00",
        t: "雀竜位戦 一次予選",
        sub: <>16卓64名<br />会員配信</>,
      },
    ],
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
    { year: "2001", kind: "設立", title: "日本プロ麻雀協会、創設", desc: "森岡貞臣ら現役プロが集結し、競技とエンタメの両立を掲げる第二団体として発足。" },
    { year: "2002", kind: "タイトル", title: "雀王戦 開始", desc: "協会最高峰タイトルとして第1期が開催。9部制リーグの原型ができる。" },
    { year: "2003", kind: "新タイトル", title: "雀竜位戦 開始", desc: "全協会員参加の大規模タイトル戦としてスタート。" },
    { year: "2005", kind: "女流", title: "女流雀王戦 開始", desc: "女流最高峰タイトルとして第1期が開催。" },
    { year: "2013", kind: "国際", title: "日本オープン 開始", desc: "オープン参加形式の国際大会としてスタート。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "小林剛・園田賢・鈴木たろうらが各チームに選抜（後に協会所属プロ多数が参戦）。" },
    { year: "2008", kind: "新タイトル", title: "新人王戦 開始", desc: "若手育成を目的とした新人王戦が第1期開催。入会5年以内の選手が対象。" },
    { year: "2026", kind: "現在", title: "第25期雀王戦 進行中", desc: "現雀王の仲林圭が防衛戦を迎える。" },
  ],
  champions: {
    title: "歴代雀王",
    en: "Past Jan-ō",
    rows: [
      { ep: "24", name: "仲林 圭", note: "現雀王 · 連覇", yr: "2025" },
      { ep: "23", name: "仲林 圭", note: "初戴冠", yr: "2024" },
      { ep: "22", name: "石橋 伸洋", note: "2連覇", yr: "2023" },
      { ep: "21", name: "石橋 伸洋", note: "初", yr: "2022" },
      { ep: "20", name: "千貫 陽祐", yr: "2021" },
      { ep: "19", name: "松本 吉弘", yr: "2020" },
      { ep: "18", name: "下石 戟", yr: "2019" },
      { ep: "17", name: "矢島 亨", yr: "2018" },
      { ep: "16", name: "鈴木 たろう", note: "Mリーガー", yr: "2017" },
      { ep: "15", name: "金 太賢", yr: "2016" },
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
        desc: "雀王戦・雀竜位戦・新人王戦の配信を中心に、ハイライト・解説動画を無料公開。Mリーグ経由のファンが多く流入。",
        meta: [
          { label: "登録", value: "62,400名" },
          { label: "月間", value: "16本" },
        ],
      },
      {
        iconClass: "nico",
        iconLabel: "F",
        title: "FRESH LIVE",
        desc: "雀王戦・女流雀王戦のリアルタイム配信プラットフォーム。参加プロのコメントも充実。",
        meta: [
          { label: "視聴", value: "週24,000UU" },
          { label: "月間", value: "12配信" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送にて、協会所属プロをレギュラーシーズン中に毎週放映。",
        meta: [
          { label: "週", value: "2対局" },
          { label: "レギュラー", value: "10月〜5月" },
        ],
      },
    ],
  },
};

export default function NpmPage() {
  return <OrgDetailPage data={NPM} />;
}
