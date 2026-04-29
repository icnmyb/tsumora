import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "最高位戦日本プロ麻雀協会 — TSUMORA",
  description:
    "1976年設立、最高位戦日本プロ麻雀協会の概要・主要タイトル戦（最高位戦 / Classic / 發王戦 ほか）・所属プロ。",
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
  highlightTag: "日本最古のプロ麻雀団体",
  extraTags: ["創設 1976年", "所属プロ 480名", "タイトル戦 5", "50年の歴史"],
  meta: [
    { label: "Founded", value: "1976", accent: true, sub: <>昭和51年<br />日本最古のプロ団体</> },
    { label: "Active Pros", value: "480", unit: "名", sub: "国際支部含む第3規模" },
    { label: "Titles", value: "05", unit: "戦", sub: "最高位 · Classic · 發王 · 女流 ほか" },
    { label: "League", value: "07", unit: "部", accent: true, sub: "A1 〜 C3 · 女流A〜B" },
    {
      label: "Founder",
      value: "阿佐田",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "阿佐田 哲也ら",
    },
  ],
  about: {
    en: "About Saikouisen",
    leadParagraphs: [
      "最高位戦日本プロ麻雀協会は、1976年に小説家・阿佐田哲也らによって設立された、日本最古の麻雀プロ団体である。古典派の象徴として「一発・裏ドラなし」「赤牌なし」の正統派ルールを守り、競技麻雀の伝統を受け継ぐ。",
      "団体最高峰の最高位決定戦は1976年から続き、現最高位は村上淳。A1・A2・B1・B2・C1・C2・C3の7部制リーグを採用し、所属プロは年間を通じて昇降級を競う。",
      "Classic（古典ルール採用）と發王戦（オープン参加型）も看板タイトルで、女流最高位戦・USA Aリーグなど国際展開も活発。USA・CHINA各支部に複数名の海外プロが在籍する。",
      "Mリーグには園田賢・鈴木たろう・茅森早香・醍醐大・竹内元太・日向藍子・渋川難波（協会から移籍）・永井孝典・瑞原明奈・鈴木優・石井一馬・近藤誠一らが所属。Mリーグ全選手中最大勢力を誇る。",
    ],
    pullQuote: (
      <>
        「半世紀の伝統と、国際的な開放性を両立する団体。」
        <br />
        Classic ルールに代表される技術重視の競技姿勢と、海外支部による多様性の受容が共存する。
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
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>日本最古のプロ麻雀団体</span>
        </>
      ),
    },
    { dt: "創設者", dd: "阿佐田 哲也ら" },
    { dt: "所属プロ", dd: "480名 (国際支部含む)" },
    { dt: "本部", dd: "東京都" },
    { dt: "支部", dd: "本部 / 関西 / 九州 / 北海道 / USA / CHINA" },
    { dt: "主要タイトル", dd: "最高位決定戦 · Classic · 發王戦" },
    { dt: "公式", dd: <span>saikouisen.com</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Major Titles · 5 Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "最",
        rk: "01 · 最高峰タイトル",
        title: "最高位決定戦",
        en: "The Saikoui",
        since: "Since 1976 · 第51期 · 団体最高峰",
        leaderName: "現最高位：石井 一馬",
        leaderPt: "防衛戦 進行中",
      },
      {
        pill: "進行中",
        kanji: "古",
        rk: "02 · 伝統タイトル",
        title: "Classic",
        en: "The Classic",
        since: "Since 2007 · 古典ルール採用",
        leaderName: "現Classic王者：石井 一馬",
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
      {
        pill: "決勝前",
        kanji: "女",
        rk: "04 · 女流最高峰",
        title: "女流最高位戦",
        en: "The Joryū Saikoui",
        since: "Since 1990 · 第36期 · 女流限定",
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
        since: "Since 2025 · 若手限定",
        leaderName: "前覇者：石井 一馬",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
    ],
  },
  schedule: {
    title: "今週の対局",
    en: "This Week at Saikouisen · 5 Matches",
    cards: [
      {
        badge: "● LIVE 本日",
        live: true,
        dt: "04/21 · 19:30",
        t: "最高位戦A1 第7節",
        sub: <>日向 / 鈴木優 / 園田 / 石井<br />最高位戦ch (FRESH)</>,
      },
      {
        badge: "明日",
        dt: "04/22 · 19:00",
        t: "Classic 準決勝",
        sub: <>4卓16名<br />FRESH LIVE / YouTube</>,
      },
      {
        badge: "金",
        dt: "04/24 · 19:00",
        t: "女流最高位戦 第5節",
        sub: <>浅見 / 瑞原 / 茅森 / 日向<br />FRESH LIVE</>,
      },
      {
        badge: "土",
        dt: "04/25 · 14:00",
        t: "發王戦 一次予選",
        sub: <>16卓64名<br />会員配信</>,
      },
    ],
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
    { year: "1976", kind: "設立", title: "最高位戦、創設", desc: "阿佐田哲也らによって設立。日本初のプロ麻雀団体として発足。" },
    { year: "1976", kind: "タイトル", title: "最高位決定戦 第1期", desc: "団体最高峰タイトルが同年に開始。初代最高位：藤田 和久。" },
    { year: "1985", kind: "オープン", title: "發王戦 開始", desc: "オープン参加型タイトル戦としてスタート。プロ・アマ問わず参加可能。" },
    { year: "1990", kind: "女流", title: "女流最高位戦 開始", desc: "女流最高峰タイトルとして第1期が開催。" },
    { year: "2007", kind: "古典", title: "Classic 開始", desc: "「一発・裏ドラなし」の古典ルール採用タイトルとしてスタート。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "園田賢・近藤誠一・茅森早香らが各チームに選抜。" },
    { year: "2025", kind: "新タイトル", title: "蒼翼戦 開始", desc: "若手限定の新タイトルとして第1期が開催、初代覇者は石井一馬。" },
    { year: "2026", kind: "現在", title: "創設50周年に向けて", desc: "国際支部 (USA・CHINA) を中心に新規加入が続き、所属プロは480名を突破。" },
  ],
  champions: {
    title: "歴代最高位",
    en: "Past Saikoui",
    rows: [
      { ep: "50", name: "石井 一馬", note: "現最高位 · 連覇", yr: "2025" },
      { ep: "49", name: "石井 一馬", note: "初戴冠", yr: "2024" },
      { ep: "48", name: "渡辺 太", yr: "2023" },
      { ep: "47", name: "村上 淳", note: "3度目", yr: "2022" },
      { ep: "46", name: "鈴木 優", note: "Mリーガー", yr: "2021" },
      { ep: "45", name: "醍醐 大", note: "Mリーガー", yr: "2020" },
      { ep: "44", name: "村上 淳", note: "2度目", yr: "2019" },
      { ep: "43", name: "近藤 誠一", note: "Mリーガー", yr: "2018" },
      { ep: "42", name: "新津 潔", yr: "2017" },
      { ep: "41", name: "村上 淳", yr: "2016" },
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
        desc: "最高位決定戦・Classic・女流最高位戦の生中継。配信プラットフォームとしてはFRESH LIVEに比重を置く。",
        meta: [
          { label: "視聴", value: "週36,000UU" },
          { label: "月間", value: "20配信" },
        ],
      },
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "最高位戦 YouTube",
        desc: "ハイライト・解説動画を中心に無料公開。古典ルール解説のシリーズが人気。",
        meta: [
          { label: "登録", value: "84,500名" },
          { label: "月間", value: "12本" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送にて、最高位戦所属プロ12名前後の対局をレギュラーシーズン中放映。最大勢力。",
        meta: [
          { label: "週", value: "5対局" },
          { label: "レギュラー", value: "10月〜5月" },
        ],
      },
    ],
  },
};

export default function SaikouisenPage() {
  return <OrgDetailPage data={SAIKOUISEN} />;
}
