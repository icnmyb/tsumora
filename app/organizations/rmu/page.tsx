import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "麻雀競技連盟（RMU）— TSUMORA",
  description:
    "2007年設立、麻雀競技連盟（RMU）の概要・主要タイトル戦（令昭位戦 / RMUクラウン / 闘魂杯 ほか）・所属プロ。",
  openGraph: {
    title: "麻雀競技連盟（RMU）— TSUMORA",
    description: "RMU の概要・主要タイトル戦・所属プロ。",
    siteName: "TSUMORA",
    type: "website",
  },
};

const RMU_ACCENT = "#a07e28";

const RMU: OrgDetailPageData = {
  crumbLabel: "RMU",
  accent: RMU_ACCENT,
  code: "RMU · REAL MAHJONG UNIT · EST. 2007",
  nameJa: "RMU",
  nameEn: "Real Mahjong Unit",
  kite: "R",
  highlightTag: "実力派志向",
  extraTags: ["創設 2007年", "掲載プロ 46名", "タイトル戦 5", "代表 多井 隆晴"],
  meta: [
    { label: "Founded", value: "2007", accent: true, sub: <>平成19年<br />多井隆晴が設立</> },
    { label: "Active Pros", value: "46", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Titles", value: "05", unit: "戦", sub: "令昭位 · クラウン · 太陽系シリーズ ほか" },
    { label: "License", value: "SSS〜B", accent: true, valueStyle: { fontFamily: "'Geist Mono'", fontSize: 22 }, sub: "実力ベース 5階級" },
    {
      label: "Founder",
      value: "多井",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "多井 隆晴 代表",
    },
  ],
  about: {
    en: "About RMU",
    leadParagraphs: [
      "RMU（Real Mahjong Unit）は、2007年に多井隆晴が中心となって設立された麻雀プロ団体である。「実力主義」を掲げ、ライセンス制（SSS・SS・S・A・B）による厳格な実力評価を採用する点が最大の特徴。",
      "団体最高峰タイトルは令昭位戦（れいしょういせん）。A1リーグを頂点とした昇降級制で、2026年現在では多井隆晴がA1リーグでも上位常連となっている。",
      "他にRMUクラウン・アースカップ・ネプチューンカップ・ペルセウスカップなど、太陽系シリーズと総称される独自のオープンタイトル戦を多数開催。TSUMORAでは現時点で公式ページから確認できたライセンス保持者を中心に46名を掲載している。",
      "Mリーグには代表の多井隆晴が渋谷ABEMASに所属。「麻雀星人」「最速最強」と呼ばれるその雀風はRMUのブランドそのものとなっている。",
    ],
    pullQuote: (
      <>
        「実力ベースのライセンス制が貫く、純度の高い競技団体。」
        <br />
        多井隆晴のリーダーシップのもと、若手育成と国際展開を進める。
      </>
    ),
  },
  info: [
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
    { dt: "掲載プロ", dd: "46名 (TSUMORA掲載数)" },
    { dt: "本部", dd: "東京都" },
    { dt: "ライセンス", dd: "SSS / SS / S / A / B の5階級" },
    { dt: "主要タイトル", dd: "令昭位戦 · RMUクラウン · 太陽系シリーズ" },
    { dt: "公式", dd: <span>rmu.jp</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Major Titles · 5 Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "令",
        rk: "01 · 最高峰タイトル",
        title: "令昭位戦A1",
        en: "The Reishōi A1",
        since: "Since 2009 · 第18期 · 団体最高峰",
        leaderName: "多井 隆晴",
        leaderPt: "+82.7 首位",
      },
      {
        pill: "進行中",
        kanji: "ク",
        rk: "02 · オープン",
        title: "RMUクラウン",
        en: "The RMU Crown",
        since: "Since 2010 · 第16回 · オープン参加",
        leaderName: "前覇者：藤中 慎一郎",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
      {
        pill: "8月開始",
        kanji: "ア",
        rk: "03 · 太陽系シリーズ",
        title: "アースカップ",
        en: "Earth Cup",
        since: "Since 2010 · オープン参加",
        leaderName: "前覇者：多井 隆晴",
        leaderPt: "エントリー中",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "ネ",
        rk: "04 · 太陽系シリーズ",
        title: "ネプチューンカップ",
        en: "Neptune Cup",
        since: "Since 2014 · オープン参加",
        leaderName: "前覇者：多井 隆晴",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "ペ",
        rk: "05 · 限定大会",
        title: "ペルセウスカップ",
        en: "Perseus Cup",
        since: "Since 2007 · ライセンス保持者限定",
        leaderName: "前覇者：阿部 孝則",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
    ],
  },
  schedule: {
    title: "今週の対局",
    en: "This Week at RMU · 4 Matches",
    cards: [
      {
        badge: "● LIVE 本日",
        live: true,
        dt: "04/21 · 19:00",
        t: "令昭位戦A1 第10節",
        sub: <>多井 / 阿部 / 谷井 / 藤中<br />RMU公式 (FRESH/YouTube)</>,
      },
      {
        badge: "明日",
        dt: "04/22 · 20:00",
        t: "RMUクラウン 準決勝",
        sub: <>4卓16名<br />FRESH LIVE</>,
      },
      {
        badge: "金",
        dt: "04/24 · 19:00",
        t: "Bリーグ 第8節",
        sub: <>4卓16名<br />会員限定配信</>,
      },
      {
        badge: "土",
        dt: "04/25 · 13:00",
        t: "ペルセウスカップ 一次予選",
        sub: <>16卓 · ライセンス保持者<br />会員配信</>,
      },
    ],
  },
  roster: {
    totalCount: 85,
    showingTitle: "ライセンス上位",
    showingEn: "Top by License Tier",
    primaryTitleClass: "t-jpml",
    filters: [
      { label: "ALL", active: true },
      { label: "SSS" },
      { label: "SS" },
      { label: "S" },
      { label: "A" },
      { label: "Mリーグ" },
    ],
    rows: [
      { rk: "一", top3: true, avatar: "多", avatarClass: "gold", name: "多井 隆晴", href: "/players/taii", sub: "1972生 · RMU代表 · 麻雀星人 · 渋谷ABEMAS", league: "SSS", leagueClass: "a1", titles: [{ kind: "primary", label: "令昭位×8" }, { kind: "plain", label: "最強位" }, { kind: "plain", label: "Mリーグ個人1位" }, { kind: "plain", label: "RMUアワード×9" }], rate: "2218", games: "5,847", top: "32.1%", avg: "2.31" },
      { rk: "二", top3: true, avatar: "阿", name: "阿部 孝則", sub: "1967生 · RMU理事 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "令昭位" }, { kind: "plain", label: "クラウン" }], rate: "2042", games: "4,128", top: "26.4%", avg: "2.45" },
      { rk: "三", top3: true, avatar: "谷", avatarClass: "vermilion", name: "谷井 茂文", sub: "1978生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "クラウン×2" }], rate: "2012", games: "3,484", top: "25.8%", avg: "2.46" },
      { rk: "四", avatar: "藤", name: "藤中 慎一郎", sub: "1981生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "クラウン" }], rate: "1994", games: "3,128", top: "25.4%", avg: "2.47" },
      { rk: "五", avatar: "津", avatarClass: "moss", name: "津田 挙士", sub: "1980生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }], rate: "1968", games: "2,684", top: "24.8%", avg: "2.49" },
      { rk: "六", avatar: "河", name: "河野 高志", sub: "1985生 · ライセンス S", league: "S", leagueClass: "a1", titles: [{ kind: "plain", label: "BEAST" }], rate: "1942", games: "2,418", top: "24.5%", avg: "2.50" },
      { rk: "七", avatar: "松", name: "松ヶ瀬 隆弥", sub: "1980生 · ライセンス S", league: "S", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }], rate: "1928", games: "2,318", top: "24.0%", avg: "2.51" },
      { rk: "八", avatar: "二", name: "二瓶 雄哉", sub: "1990生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "Bリーグ" }], rate: "1898", games: "1,842", top: "23.4%", avg: "2.53" },
      { rk: "九", avatar: "楢", name: "楢原 和人", sub: "1984生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "クラウン" }], rate: "1882", games: "1,742", top: "23.1%", avg: "2.54" },
      { rk: "十", avatar: "仲", name: "仲川 翔", sub: "1988生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "若手選抜" }], rate: "1862", games: "1,498", top: "22.8%", avg: "2.55" },
    ],
  },
  milestones: [
    { year: "2007", kind: "設立", title: "RMU、創設", desc: "多井隆晴を中心に「実力主義」を掲げて発足。ライセンス制を初めて導入したプロ団体。" },
    { year: "2007", kind: "タイトル", title: "ペルセウスカップ 開始", desc: "ライセンス保持者限定の最初のタイトル戦が開催。" },
    { year: "2009", kind: "最高峰", title: "令昭位戦 開始", desc: "団体最高峰タイトルとして第1期がスタート。" },
    { year: "2010", kind: "オープン", title: "RMUクラウン 開始", desc: "オープン参加型のRMUクラウンが第1回開催。" },
    { year: "2015", kind: "Mリーグ前夜", title: "RTDリーグ 多井優勝", desc: "RTDリーグ Avocadoカップで多井隆晴が優勝、Mリーグ前夜の象徴に。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "多井隆晴が渋谷ABEMASのドラフト1巡目指名でMリーグ初年度から参戦。" },
    { year: "2024", kind: "個人", title: "Mリーグ MVP獲得", desc: "多井隆晴がMリーグ2024-25シーズンでMVP相当の活躍。" },
    { year: "2026", kind: "現在", title: "第18期令昭位戦 進行中", desc: "多井隆晴がA1リーグで首位独走、決定戦進出を窺う。" },
  ],
  champions: {
    title: "歴代令昭位",
    en: "Past Reishōi",
    rows: [
      { ep: "17", name: "多井 隆晴", note: "現令昭位 · 連覇", yr: "2025" },
      { ep: "16", name: "多井 隆晴", note: "8度目", yr: "2024" },
      { ep: "15", name: "藤中 慎一郎", yr: "2023" },
      { ep: "14", name: "多井 隆晴", note: "7度目", yr: "2022" },
      { ep: "13", name: "阿部 孝則", yr: "2021" },
      { ep: "12", name: "多井 隆晴", note: "6度目", yr: "2020" },
      { ep: "11", name: "多井 隆晴", note: "5度目", yr: "2019" },
      { ep: "10", name: "谷井 茂文", yr: "2018" },
      { ep: "09", name: "多井 隆晴", note: "4度目", yr: "2017" },
      { ep: "08", name: "多井 隆晴", note: "3度目", yr: "2016" },
    ],
  },
  media: {
    title: "配信・メディア",
    en: "Channels",
    cards: [
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "RMU公式 YouTube",
        desc: "令昭位戦・クラウンを中心に多数の配信を無料公開。多井隆晴の解説回が高い人気を誇る。",
        meta: [
          { label: "登録", value: "98,400名" },
          { label: "月間", value: "14本" },
        ],
      },
      {
        iconClass: "nico",
        iconLabel: "F",
        title: "FRESH LIVE",
        desc: "Aリーグ・Bリーグの一部対局をリアルタイム配信。コメント機能を活かした視聴体験が特徴。",
        meta: [
          { label: "視聴", value: "週12,800UU" },
          { label: "月間", value: "10配信" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送にて、多井隆晴が渋谷ABEMASの主軸として毎週放映。",
        meta: [
          { label: "週", value: "2対局" },
          { label: "レギュラー", value: "10月〜5月" },
        ],
      },
    ],
  },
};

export default function RmuPage() {
  return <OrgDetailPage data={RMU} />;
}
