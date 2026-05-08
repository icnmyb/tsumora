import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "RMU — TSUMORA",
  description:
    "2007年設立、RMU（Real Mahjong Unit）の概要・主要タイトル戦（令昭位戦 / RMUクラウン / 闘魂杯 ほか）・所属プロ。",
  openGraph: {
    title: "RMU — TSUMORA",
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
  highlightTag: "2007年設立",
  extraTags: ["掲載プロ 46名", "ライセンス制", "令昭位戦", "RMUクラウン"],
  meta: [
    { label: "Founded", value: "2007", accent: true, sub: <>平成19年<br />設立</> },
    { label: "Active Pros", value: "46", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Events", value: "主要", sub: "令昭位 · クラウン · スプリント ほか" },
    { label: "Representative", value: "多井", valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 }, sub: "多井 隆晴 代表" },
    { label: "License", value: "SSS〜A", accent: true, valueStyle: { fontFamily: "'Geist Mono'", fontSize: 22 }, sub: "公式掲載ライセンス区分" },
    {
      label: "System",
      value: "Point",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "選手ポイント制",
    },
  ],
  about: {
    en: "About RMU",
    leadParagraphs: [
      "RMU（Real Mahjong Unit）は、2007年に設立された競技麻雀団体である。公式サイトでは「真の麻雀プロを創出すること」を第一義に掲げ、アスリート会員が公式戦やタイトル戦で実績を積む仕組みを説明している。",
      "プロライセンスは、選手ポイントが規定値に達し、技量・理論・マナー・作法が備わったと審議会の過半数が判断した場合に発行される。選手ポイントランキングは年4回公表される。",
      "令昭位戦はアスリート会員が参加するリーグ戦で、A1リーグが上部に位置する年間リーグ戦として案内されている。主要タイトルには令昭位戦、RMUクラウン、スプリントカップ、ティアラリーグ、オープンリーグなどがある。",
      "代表的な所属選手には、Mリーグ初年度から渋谷ABEMASで活躍する多井隆晴をはじめ、令昭位戦やRMUクラウンで実績を残す選手が並ぶ。ライセンス制と選手ポイントを軸に、競技成績を可視化する色合いの強い団体である。",
    ],
    pullQuote: (
      <>
        「選手ポイントと審議を経てプロライセンスを発行する競技団体。」
        <br />
        令昭位戦を軸に、公式戦の成績管理とライセンス制度で選手育成を進めている。
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
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>競技麻雀団体</span>
        </>
      ),
    },
    { dt: "代表", dd: "多井 隆晴" },
    { dt: "掲載プロ", dd: "46名 (TSUMORA掲載数)" },
    { dt: "本部", dd: "東京都" },
    { dt: "ライセンス", dd: "SSS / SS / S / A" },
    { dt: "主要タイトル", dd: "令昭位戦 · RMUクラウン · スプリントカップ" },
    { dt: "公式", dd: <span>rmu.jp</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Selected Major Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "令",
        rk: "01 · 最高峰タイトル",
        title: "令昭位戦A1",
        en: "The Reishōi A1",
        since: "Since 2009 · 第17期 · 団体最高峰",
        leaderName: "現令昭位：小川 光",
        leaderPt: "第17期",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "ク",
        rk: "02 · オープン",
        title: "RMUクラウン",
        en: "The RMU Crown",
        since: "Since 2010 · 第17回 · オープン参加",
        leaderName: "現覇者：福原 慎平",
        leaderPt: "第17回",
        leaderPtDone: true,
      },
      {
        pill: "8月開始",
        kanji: "ア",
        rk: "03",
        title: "スプリントカップ",
        en: "Sprint Cup",
        since: "カップ戦 · 年間シリーズ",
        leaderName: "スプリントファイナル",
        leaderPt: "カップ戦",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "ネ",
        rk: "04",
        title: "ティアラリーグ",
        en: "Tiara League",
        since: "女流リーグ",
        leaderName: "女流令昭位決定戦",
        leaderPt: "公式戦",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "ペ",
        rk: "05",
        title: "オープンリーグ",
        en: "Open League",
        since: "G2タイトル",
        leaderName: "RMU公式タイトル",
        leaderPt: "公式戦",
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
      { rk: "一", top3: true, avatar: "多", avatarClass: "gold", name: "多井 隆晴", href: "/players/taii", sub: "1972生 · RMU代表 · 麻雀星人 · 渋谷ABEMAS", league: "SSS", leagueClass: "a1", titles: [{ kind: "primary", label: "令昭位" }, { kind: "plain", label: "最強位" }] },
      { rk: "二", top3: true, avatar: "阿", name: "阿部 孝則", sub: "1967生 · RMU理事 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "令昭位" }, { kind: "plain", label: "クラウン" }] },
      { rk: "三", top3: true, avatar: "谷", avatarClass: "vermilion", name: "谷井 茂文", sub: "1978生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "クラウン×2" }] },
      { rk: "四", avatar: "藤", name: "藤中 慎一郎", sub: "1981生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "primary", label: "クラウン" }] },
      { rk: "五", avatar: "津", avatarClass: "moss", name: "津田 挙士", sub: "1980生 · ライセンス SS", league: "SS", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }] },
      { rk: "六", avatar: "河", name: "河野 高志", sub: "1985生 · ライセンス S", league: "S", leagueClass: "a1", titles: [{ kind: "plain", label: "BEAST" }] },
      { rk: "七", avatar: "松", name: "松ヶ瀬 隆弥", sub: "1980生 · ライセンス S", league: "S", leagueClass: "a1", titles: [{ kind: "plain", label: "Aリーグ通算" }] },
      { rk: "八", avatar: "二", name: "二瓶 雄哉", sub: "1990生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "Bリーグ" }] },
      { rk: "九", avatar: "楢", name: "楢原 和人", sub: "1984生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "クラウン" }] },
      { rk: "十", avatar: "仲", name: "仲川 翔", sub: "1988生 · ライセンス A", league: "A", leagueClass: "a2", titles: [{ kind: "plain", label: "若手選抜" }] },
    ],
  },
  milestones: [
    { year: "2007", kind: "設立", title: "RMU、創設", desc: "競技麻雀団体として発足。選手ポイントと審議を経たプロライセンス制度を運用。" },
    { year: "2007", kind: "設立", title: "ライセンス制度を軸に活動開始", desc: "競技成績と審議をもとにしたライセンス制度を運用。" },
    { year: "2009", kind: "最高峰", title: "令昭位戦 開始", desc: "団体最高峰タイトルとして第1期がスタート。" },
    { year: "2010", kind: "オープン", title: "RMUクラウン 開始", desc: "オープン参加型のRMUクラウンが第1回開催。" },
    { year: "2015", kind: "Mリーグ前夜", title: "RTDリーグ 多井優勝", desc: "RTDリーグ Avocadoカップで多井隆晴が優勝、Mリーグ前夜の象徴に。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "多井隆晴が渋谷ABEMASのドラフト1巡目指名でMリーグ初年度から参戦。" },
    { year: "2024", kind: "成績", title: "公式成績ランキングを更新", desc: "公式サイトで生涯成績・年度成績・選手ポイントランキングを継続的に公表。" },
    { year: "2026", kind: "タイトル", title: "第17期令昭位、小川光が戴冠", desc: "第17期令昭位戦で小川光が優勝し、現令昭位として掲載。" },
  ],
  champions: {
    title: "歴代令昭位",
    en: "Past Reishōi",
    rows: [
      { ep: "17", name: "小川 光", note: "現令昭位", yr: "2025" },
      { ep: "16", name: "河野 高志", yr: "2024" },
      { ep: "15", name: "谷井 茂文", yr: "2023" },
      { ep: "14", name: "楢原 和人", yr: "2022" },
      { ep: "13", name: "河野 高志", yr: "2021" },
      { ep: "12", name: "河野 高志", yr: "2020" },
      { ep: "11", name: "多井 隆晴", yr: "2019" },
      { ep: "10", name: "谷井 茂文", yr: "2018" },
      { ep: "09", name: "松ヶ瀬 隆弥", yr: "2017" },
      { ep: "08", name: "多井 隆晴", yr: "2016" },
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
        desc: "令昭位戦・RMUクラウンなど、RMU公式戦の対局映像や関連コンテンツを公開する公式チャンネル。",
        meta: [
          { label: "媒体", value: "YouTube" },
          { label: "対象", value: "公式戦" },
        ],
      },
      {
        iconClass: "nico",
        iconLabel: "F",
        title: "FRESH LIVE",
        desc: "Aリーグ・Bリーグなど、公式リーグ戦の中継で利用されてきた配信媒体。",
        meta: [
          { label: "媒体", value: "FRESH" },
          { label: "対象", value: "リーグ戦" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送で、RMU所属・出身プロの対局を視聴できる。",
        meta: [
          { label: "媒体", value: "ABEMA" },
          { label: "種別", value: "Mリーグ" },
        ],
      },
    ],
  },
};

export default function RmuPage() {
  return <OrgDetailPage data={RMU} />;
}
