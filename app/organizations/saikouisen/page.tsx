import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "最高位戦日本プロ麻雀協会 — TSUMORA",
  description:
    "1976年創設のタイトル戦を源流とする、最高位戦日本プロ麻雀協会の概要・主要タイトル戦（最高位戦 / Classic / 發王戦 ほか）・所属プロ。",
  openGraph: {
    title: "最高位戦日本プロ麻雀協会 — TSUMORA",
    description: "最高位戦の概要・主要タイトル戦・所属プロ。",
    siteName: "TSUMORA",
    type: "website",
  },
};

const SAIKOUISEN_ACCENT = "#7c3aed";

const SAIKOUISEN: OrgDetailPageData = {
  crumbLabel: "最高位戦日本プロ麻雀協会",
  accent: SAIKOUISEN_ACCENT,
  code: "SAIKOUISEN · JAPAN PRO MAHJONG · EST. 1976",
  nameJa: "最高位戦日本プロ麻雀協会",
  nameEn: "Saikouisen Japan Pro Mahjong Association",
  kite: "高",
  highlightTag: "1976年創設の最高位戦が源流",
  extraTags: ["掲載プロ 1,024名", "最高位戦", "飯田正人杯・最高位戦Classic", "發王戦"],
  meta: [
    { label: "Origin", value: "1976", accent: true, sub: <>昭和51年<br />最高位戦創設</> },
    { label: "Active Pros", value: "1,024", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Events", value: "主要", sub: "最高位 · Classic · 發王 · 女流 ほか" },
    { label: "League", value: "10", unit: "部", accent: true, sub: "A1 〜 D3" },
    {
      label: "Representative",
      value: "新津",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "新津 潔 代表者",
    },
  ],
  about: {
    en: "About Saikouisen",
    leadParagraphs: [
      "最高位戦日本プロ麻雀協会は、1976年に創設されたタイトル戦「最高位戦」を源流とする競技麻雀団体である。公式の団体概要では、1985年にタイトル戦参加選手の集合体にとどまらず、一つの団体組織として活動を開始したと説明されている。",
      "最高位戦は、その日限りの強者ではなく、1年にわたる長期リーグを通して真の強者を決定し、「最高位」の称号を与えることを特徴としている。現在の最高位戦リーグはA1からD3までの10リーグ編成で運営されている。",
      "主要タイトルには最高位戦、發王戦、飯田正人杯・最高位戦Classic、女流最高位戦、新人王戦、新輝戦、蒼翼戦などがある。2025年にはUSA本部・CHINA本部の発足も公式沿革に記載されている。",
      "Mリーグには赤坂ドリブンズ、U-NEXT Pirates、渋谷ABEMAS、セガサミーフェニックスなどで最高位戦所属・出身プロが出場している。長期リーグで培われる安定感と、Classicや發王戦に見られるルールの多様さが団体の個性になっている。",
    ],
    pullQuote: (
      <>
        「長期リーグで最高位を決める、1976年創設タイトルを源流とする団体。」
        <br />
        最高位戦を中心に、Classic、發王戦、女流・若手・海外リーグまで大会体系を広げている。
      </>
    ),
  },
  info: [
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
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>1985年に団体組織として活動開始</span>
        </>
      ),
    },
    { dt: "代表者", dd: "新津 潔" },
    { dt: "掲載プロ", dd: "1,024名 (TSUMORA掲載数)" },
    { dt: "所在地", dd: "東京都千代田区神田小川町" },
    { dt: "支部・本部", dd: "関西 / 北海道 / 東海 / 九州 / 東北 / USA / CHINA ほか" },
    { dt: "主要タイトル", dd: "最高位戦 · 飯田正人杯・最高位戦Classic · 發王戦" },
    { dt: "公式", dd: <span>saikouisen.com</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Selected Major Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "最",
        rk: "01 · 最高峰タイトル",
        title: "最高位戦",
        en: "The Saikoui",
        since: "Since 1976 · 第51期 · 団体最高峰",
        leaderName: "現最高位：牧野 伸彦",
        leaderPt: "第50期",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "古",
        rk: "02 · 伝統タイトル",
        title: "飯田正人杯・最高位戦Classic",
        en: "The Classic",
        since: "Since 2006 · Classicルール採用",
        leaderName: "現Classic王者：小池 諒",
        leaderPt: "第19期",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "發",
        rk: "03 · オープンタイトル",
        title: "發王戦",
        en: "The Hatsu-ō",
        since: "Since 1992 · オープン参加型",
        leaderName: "現發王：宮﨑 和樹",
        leaderPt: "第33期",
        leaderPtDone: true,
      },
      {
        pill: "決勝前",
        kanji: "女",
        rk: "04 · 女流最高峰",
        title: "女流最高位戦",
        en: "The Joryū Saikoui",
        since: "Since 2001 · 女流リーグ",
        leaderName: "現女流最高位：浅見 真紀",
        leaderPt: "防衛戦 →",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "蒼",
        rk: "05 · 若手限定",
        title: "蒼翼戦",
        en: "The Sōyoku",
        since: "Since 2024 · 選抜タイトル",
        leaderName: "現蒼翼位：石井 一馬",
        leaderPt: "第2期",
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
    totalCount: 480,
    showingTitle: "レーティング上位",
    showingEn: "Top 10 by Saikouisen Rating",
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
      { rk: "一", top3: true, avatar: "石", avatarClass: "vermilion", name: "石井 一馬", href: "/players/ishii", sub: "1986生 · 第28期入会 · 第49期最高位 · EARTH JETS", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最高位" }, { kind: "plain", label: "Classic×2" }, { kind: "plain", label: "蒼翼戦×2" }, { kind: "plain", label: "王位" }], rate: "2168", games: "3,421", top: "29.8%", avg: "2.38" },
      { rk: "二", top3: true, avatar: "鈴", name: "鈴木 優", href: "/players/suzuki-y", sub: "1981生 · 第36期入会 · 第46期最高位 · U-NEXT Pirates", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最高位" }, { kind: "plain", label: "麻雀日本シリーズ×2" }], rate: "2114", games: "2,891", top: "28.4%", avg: "2.41" },
      { rk: "三", top3: true, avatar: "園", avatarClass: "gold", name: "園田 賢", href: "/players/sonoda", sub: "1981生 · 第27期入会 · 赤坂ドリブンズ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最強位" }, { kind: "plain", label: "RTDリーグ" }], rate: "2074", games: "3,156", top: "27.2%", avg: "2.43" },
      { rk: "四", avatar: "村", name: "村上 淳", sub: "1976生 · 第19期入会 · 第3期最高位 · 連覇記録保持者", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最高位" }], rate: "2042", games: "5,128", top: "25.8%", avg: "2.46" },
      { rk: "五", avatar: "た", avatarClass: "moss", name: "鈴木 たろう", href: "/players/suzuki-t", sub: "1972生 · 第19期入会 · 赤坂ドリブンズ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最高位×2" }, { kind: "plain", label: "發王×2" }], rate: "2018", games: "4,892", top: "26.1%", avg: "2.45" },
      { rk: "六", avatar: "竹", name: "竹内 元太", href: "/players/takeuchi", sub: "1986生 · 第31期入会 · KADOKAWAサクラナイツ", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "最高位" }], rate: "1998", games: "2,418", top: "26.4%", avg: "2.44" },
      { rk: "七", avatar: "日", avatarClass: "vermilion", name: "日向 藍子", href: "/players/hinata", sub: "1985生 · 第33期入会 · 渋谷ABEMAS · 女流の実力派", league: "A1", leagueClass: "a1", titles: [{ kind: "primary", label: "Classic" }, { kind: "plain", label: "女流最高位" }], rate: "1982", games: "2,142", top: "25.7%", avg: "2.46" },
      { rk: "八", avatar: "醍", avatarClass: "moss", name: "醍醐 大", href: "/players/daigo", sub: "1989生 · 第36期入会 · セガサミーフェニックス", league: "A2", leagueClass: "a2", titles: [{ kind: "primary", label: "Classic" }], rate: "1958", games: "1,842", top: "24.9%", avg: "2.49" },
      { rk: "九", avatar: "渡", name: "渡辺 太", href: "/players/watanabe", sub: "1988生 · 第33期入会 · 第48期最高位", league: "A2", leagueClass: "a2", titles: [{ kind: "primary", label: "最高位" }], rate: "1942", games: "2,318", top: "24.4%", avg: "2.50" },
      { rk: "十", avatar: "渋", name: "渋川 難波", href: "/players/shibukawa", sub: "1985生 · 2026年協会から移籍 · KADOKAWAサクラナイツ", league: "A2", leagueClass: "a2", titles: [{ kind: "primary", label: "雀竜位×2" }, { kind: "plain", label: "雀王戦Aリーグ通算" }], rate: "1928", games: "2,684", top: "24.1%", avg: "2.51" },
    ],
  },
  milestones: [
    { year: "1976", kind: "創設", title: "最高位戦、開始", desc: "麻雀専門誌「近代麻雀」によって、年間リーグで最高位を決めるタイトル戦として開始。" },
    { year: "1976", kind: "タイトル", title: "最高位戦 第1期", desc: "団体最高峰タイトルが同年に開始。初代最高位：藤田 和久。" },
    { year: "1992", kind: "オープン", title: "發王戦 開始", desc: "一発・裏ドラ・ノーテン罰符ありのルールによるタイトル戦として創設。" },
    { year: "2001", kind: "女流", title: "女流最高位戦 開始", desc: "女流タイトルとして第1期が開催。" },
    { year: "2006", kind: "古典", title: "最高位戦Classic 開始", desc: "一発・裏ドラ・ノーテン罰符なしのClassicルール採用タイトルとしてスタート。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "園田賢・近藤誠一・茅森早香らが各チームに選抜。" },
    { year: "2024", kind: "新タイトル", title: "蒼翼戦 創設", desc: "タイトルホルダーやリーグ優勝者などが出場する選抜タイトルとして創設。" },
    { year: "2026", kind: "現在", title: "創設50周年に向けて", desc: "国際支部 (USA・CHINA) を中心に新規加入が続き、所属プロは480名を突破。" },
  ],
  champions: {
    title: "歴代最高位",
    en: "Past Saikoui",
    rows: [
      { ep: "50", name: "牧野 伸彦", note: "現最高位", yr: "2025" },
      { ep: "49", name: "石井 一馬", yr: "2024" },
      { ep: "48", name: "竹内 元太", yr: "2023" },
      { ep: "47", name: "竹内 元太", yr: "2022" },
      { ep: "46", name: "鈴木 優", yr: "2021" },
      { ep: "45", name: "醍醐 大", yr: "2020" },
      { ep: "44", name: "坂本 大志", yr: "2019" },
      { ep: "43", name: "近藤 誠一", yr: "2018" },
      { ep: "42", name: "村上 淳", yr: "2017" },
      { ep: "41", name: "近藤 誠一", yr: "2016" },
    ],
  },
  media: {
    title: "配信・メディア",
    en: "Channels",
    cards: [
      {
        iconClass: "nico",
        iconLabel: "F",
        title: "FRESH LIVE",
        desc: "最高位戦・飯田正人杯・最高位戦Classic・女流最高位戦などの公式戦中継を扱う配信媒体。",
        meta: [
          { label: "媒体", value: "FRESH" },
          { label: "対象", value: "公式戦" },
        ],
      },
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "最高位戦 YouTube",
        desc: "対局映像、ハイライト、公式企画などを公開する最高位戦の公式YouTubeチャンネル。",
        meta: [
          { label: "媒体", value: "YouTube" },
          { label: "種別", value: "公式動画" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送で、最高位戦所属・出身プロの対局を視聴できる。",
        meta: [
          { label: "媒体", value: "ABEMA" },
          { label: "種別", value: "Mリーグ" },
        ],
      },
    ],
  },
};

export default function SaikouisenPage() {
  return <OrgDetailPage data={SAIKOUISEN} />;
}
