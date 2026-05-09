import type { Metadata } from "next";
import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

export const metadata: Metadata = {
  title: "麻将連合 — TSUMORA",
  description:
    "1997年設立、麻将連合の概要・主要タイトル戦（μリーグ / BIG1カップ / 将妃戦 ほか）・所属プロ。",
  openGraph: {
    title: "麻将連合 — TSUMORA",
    description: "μ の概要・主要タイトル戦・所属プロ。",
    siteName: "TSUMORA",
    type: "website",
  },
};

const MU_ACCENT = "#2f5c3f";

const MU: OrgDetailPageData = {
  crumbLabel: "麻将連合",
  accent: MU_ACCENT,
  code: "μ · MAHJONG UNION · EST. 1997",
  nameJa: "麻将連合",
  nameEn: "Mahjong Union μ",
  kite: "μ",
  highlightTag: "競技としての麻将",
  extraTags: ["設立 1997年", "掲載プロ 88名", "将王戦", "BIG1カップ"],
  meta: [
    { label: "Founded", value: "1997", accent: true, sub: <>平成9年<br />設立</> },
    { label: "Pros", value: "88", unit: "名", sub: "TSUMORA掲載数" },
    { label: "Events", value: "主要", sub: "将王 · BIG1 · μ-M1 · μカップ" },
    { label: "Representative", value: "忍田", valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 }, sub: "忍田 幸夫 代表" },
    { label: "Concept", value: "麻将", accent: true, valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 }, sub: "金銭を賭けない競技" },
    {
      label: "Format",
      value: "μ",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "公式戦・オープン戦",
    },
  ],
  about: {
    en: "About μ",
    leadParagraphs: [
      "麻将連合（通称ミュー）は、金銭を賭けないマージャンを「麻将」と表記し、競技・文化として広めることを掲げる団体である。公式の麻将連合憲章では、マージャンをギャンブルではなく室内ゲーム、競技、文化として愛する立場を明記している。",
      "公式戦には、選手・プロが参加するμリーグ（将王）、プロランキング戦、ツアー選手ランキング戦（将星）、女流ランキング戦（将妃）などがある。オープン参加の公式戦として、BIG1カップ、μ-M1カップ、ツアーGP、μカップ、インビテーションカップ、μレディースオープンなども案内されている。",
      "プロを目指す人向けにはミュー育成会やツアー試験が用意され、認定プロによる指導、記録・牌譜整理、ルール・マナー、戦術・戦略などの学習機会が案内されている。",
      "認定プロ、ツアー選手、女流ツアー選手がそれぞれの公式戦に参加し、成績を重ねながら上位の舞台を目指す。小林剛をはじめ、Mリーグや各種タイトル戦で知られる選手も輩出している。",
    ],
    pullQuote: (
      <>
        「金銭を賭けない競技としての麻将を掲げる団体。」
        <br />
        μリーグ（将王）をはじめ、ツアー戦、将妃戦、オープン参加大会を通じて競技者を育成している。
      </>
    ),
  },
  info: [
    {
      dt: "正式名称",
      dd: (
        <>
          <b>麻将連合</b>
          <br />
          <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
            Mahjong Union μ
          </span>
        </>
      ),
    },
    { dt: "略称", dd: "μ（ミュー）" },
    {
      dt: "設立",
      dd: (
        <>
          1997年
          <br />
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>競技麻将団体</span>
        </>
      ),
    },
    { dt: "代表", dd: "忍田 幸夫" },
    { dt: "掲載プロ", dd: "88名 (TSUMORA掲載数)" },
    { dt: "本部", dd: "東京都" },
    { dt: "理念", dd: "金銭を賭けない競技としての麻将" },
    { dt: "主要公式戦", dd: "μリーグ（将王）· プロランキング戦 · 将星 · 将妃 · BIG1カップ" },
    { dt: "公式", dd: <span>mu-mahjong.jp</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Selected Major Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "将",
        rk: "01 · 最高峰タイトル",
        title: "将王戦",
        en: "The Shōō",
        since: "Since 2003 · 第23期 · μリーグ",
        leaderName: "現将王：石原 真人",
        leaderPt: "第23期",
        leaderPtDone: true,
      },
      {
        pill: "進行中",
        kanji: "B",
        rk: "02 · オープン",
        title: "BIG1カップ",
        en: "The BIG-1 Cup",
        since: "Since 1998 · 第29回 · オープン参加",
        leaderName: "現覇者：鹿 健太郎",
        leaderPt: "第29回",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "M",
        rk: "03",
        title: "μ-M1カップ",
        en: "The μ-M1 Cup",
        since: "Since 2003 · 第23期 · トーナメント制",
        leaderName: "現覇者：中西 龍",
        leaderPt: "第23期",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "招",
        rk: "04",
        title: "関東インビテーションカップ",
        en: "Kanto Invitation Cup",
        since: "認定プロ・有資格者招待制",
        leaderName: "前覇者：忍田 幸夫",
        leaderPt: "予選 →",
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
    totalCount: 90,
    showingTitle: "認定プロ上位",
    showingEn: "Top by Tour Points",
    primaryTitleClass: "t-jpml",
    filters: [
      { label: "ALL", active: true },
      { label: "認定プロ" },
      { label: "ツアー選手" },
      { label: "女流ツアー" },
      { label: "Mリーグ" },
    ],
    rows: [
      { rk: "一", top3: true, avatar: "小", avatarClass: "vermilion", name: "小林 剛", href: "/players/kobayashi", sub: "1976生 · 認定プロ · 麻雀サイボーグ · U-NEXT Pirates", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "primary", label: "将王×4" }, { kind: "plain", label: "BIG1×3" }, { kind: "plain", label: "Mリーグ MVP" }] },
      { rk: "二", top3: true, avatar: "忍", avatarClass: "gold", name: "忍田 幸夫", sub: "1962生 · 認定プロ · μ代表（2007年〜）", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "primary", label: "将王×6" }] },
      { rk: "三", top3: true, avatar: "明", name: "明村 諭", href: "/players/akemurasatoshi", sub: "1975生 · 認定プロ · 2003年度入会", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }] },
      { rk: "四", avatar: "古", name: "古久根 英孝", sub: "1962生 · 認定プロ · μ古参のベテラン", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "BIG1" }] },
      { rk: "五", avatar: "草", avatarClass: "vermilion", name: "草場 とも子", href: "/players/kusabatomoko", sub: "1980生 · 認定プロ · 2005年度入会 · 女流の代表格", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }] },
      { rk: "六", avatar: "井", avatarClass: "moss", name: "井出 洋介", sub: "1956生 · 創設者 · 東大卒 · 健康麻将提唱", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "創設者" }] },
      { rk: "七", avatar: "須", name: "須藤 浩", sub: "1968生 · 認定プロ · μ古参 · ツアー第1期生", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }] },
      { rk: "八", avatar: "ち", name: "ちっぴー", sub: "1985生 · ツアー選手 · 配信常連", league: "ツアー", leagueClass: "a2", titles: [{ kind: "plain", label: "ツアー優勝" }] },
      { rk: "九", avatar: "高", name: "高見沢 治幸", sub: "1971生 · 認定プロ · ツアー出場記録上位", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }] },
      { rk: "十", avatar: "大", avatarClass: "moss", name: "大居 大介", sub: "1985生 · 認定プロ · 中堅実力派", league: "認定プロ", leagueClass: "a2", titles: [{ kind: "plain", label: "ツアー優勝" }] },
    ],
  },
  milestones: [
    { year: "1997", kind: "設立", title: "麻将連合、創設", desc: "金銭を賭けないマージャンを「麻将」と表記し、競技・文化として広める理念を掲げて設立。" },
    { year: "1998", kind: "オープン", title: "BIG1カップ 開始", desc: "オープン参加のμ最古参タイトル戦として第1回開催。" },
    { year: "2003", kind: "タイトル", title: "将王戦・μ-M1カップ 開始", desc: "認定プロ上位10名による将王戦（μリーグ）と、短期トーナメント制のμ-M1カップが同年スタート。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "小林剛がU-NEXT Piratesのドラフト1巡目指名でMリーグ初年度から参戦。" },
    { year: "2021", kind: "個人", title: "小林剛 第19期将王獲得", desc: "Mリーガーとして、また理論派の代表として将王のタイトルを獲得。" },
    { year: "2025", kind: "タイトル", title: "第23期将王、石原真人が戴冠", desc: "第23期将王決定戦で石原真人が将王位を獲得し、現将王として掲載。" },
  ],
  champions: {
    title: "歴代将王",
    en: "Past Shōō",
    rows: [
      { ep: "23", name: "石原 真人", note: "現将王", yr: "2025" },
      { ep: "22", name: "忍田 幸夫", yr: "2024" },
      { ep: "21", name: "むく 大樹", yr: "2023" },
      { ep: "20", name: "忍田 幸夫", yr: "2022" },
      { ep: "19", name: "小林 剛", yr: "2021" },
      { ep: "18", name: "木村 和幸", yr: "2020" },
      { ep: "17", name: "原 浩明", yr: "2019" },
      { ep: "16", name: "武則 輝海", yr: "2018" },
      { ep: "15", name: "井出 洋介", yr: "2017" },
      { ep: "14", name: "忍田 幸夫", yr: "2016" },
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
        desc: "将王戦・BIG1カップ・μ-M1カップなど、麻将連合公式戦の中継・関連動画を扱う配信媒体。",
        meta: [
          { label: "媒体", value: "配信" },
          { label: "対象", value: "公式戦" },
        ],
      },
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "μ公式 YouTube",
        desc: "公式戦の動画や麻将連合の関連コンテンツを公開する公式YouTubeチャンネル。",
        meta: [
          { label: "媒体", value: "YouTube" },
          { label: "種別", value: "公式動画" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送で、麻将連合所属・出身プロの対局を視聴できる。",
        meta: [
          { label: "媒体", value: "ABEMA" },
          { label: "種別", value: "Mリーグ" },
        ],
      },
    ],
  },
};

export default function MuPage() {
  return <OrgDetailPage data={MU} />;
}
