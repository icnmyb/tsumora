import { OrgDetailPage, type OrgDetailPageData } from "@/components/OrgDetailPage";

const MU_ACCENT = "#2f5c3f";

const MU: OrgDetailPageData = {
  crumbLabel: "麻将連合-μ-",
  accent: MU_ACCENT,
  code: "μ · MAHJONG UNION · EST. 1997",
  nameJa: "麻将連合-μ-",
  nameEn: "Mahjong Union μ",
  kite: "μ",
  highlightTag: "競技麻雀の砦",
  extraTags: ["創設 1997年", "認定プロ約30名 + ツアー選手", "タイトル戦 4", "井出洋介創設"],
  meta: [
    { label: "Founded", value: "1997", accent: true, sub: <>平成9年<br />井出洋介らが設立</> },
    { label: "Pros", value: "90", unit: "名", sub: "認定プロ + ツアー選手" },
    { label: "Titles", value: "04", unit: "戦", sub: "将王 · BIG1 · μ-M1 · インビテーション" },
    { label: "Format", value: "純競技", accent: true, valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 }, sub: "一発裏ドラなし" },
    {
      label: "Founder",
      value: "井出",
      valueStyle: { fontFamily: "'Noto Sans JP'", fontSize: 22 },
      sub: "井出 洋介",
    },
  ],
  about: {
    en: "About μ",
    leadParagraphs: [
      "麻将連合-μ- (Mahjong Union μ、通称ミュー) は、1997年に井出洋介を中心に設立された麻雀プロ団体である。「健康麻将」と「純競技ルール（一発・裏ドラ・赤牌なし）」を理念に掲げる。",
      "団体最高峰タイトルは将王戦 (しょうおうせん)。認定プロ上位10名で行われる短期決戦で、年に一度の王者を決める。現将王は忍田幸夫が長らく君臨。",
      "ツアー選手制を採用しており、ツアー戦で得たポイントによって認定プロへの昇格が決まる。1997年度から続くツアーには累計約60名の選手が参加し、現役・OB問わず厚い層を形成している。",
      "Mリーグには小林剛がU-NEXT Piratesに所属。「麻雀サイボーグ」と呼ばれる論理派の代表として、μの理念を最前線で体現する。",
    ],
    pullQuote: (
      <>
        「健康麻将と純競技ルール、井出洋介の理念を継ぐ団体。」
        <br />
        将王戦の短期決戦と、ツアー戦による継続的な実力評価が共存する。
      </>
    ),
  },
  info: [
    {
      dt: "正式名称",
      dd: (
        <>
          <b>麻将連合-μ-</b>
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
          <span style={{ color: "var(--ink-3)", fontSize: 11 }}>井出洋介を中心に設立</span>
        </>
      ),
    },
    { dt: "創設者", dd: "井出 洋介ら" },
    { dt: "所属プロ", dd: "認定プロ約30名 + ツアー選手約60名" },
    { dt: "本部", dd: "東京都" },
    { dt: "競技ルール", dd: "純競技 · 一発裏ドラ赤牌なし" },
    { dt: "主要タイトル", dd: "将王 · BIG1カップ · μ-M1カップ · 関東/関西インビテーション" },
    { dt: "公式", dd: <span>mu-mahjong.jp</span> },
  ],
  titles: {
    title: "主要タイトル戦",
    en: "Major Titles · 4 Events",
    cards: [
      {
        pill: "● LIVE",
        pillLive: true,
        kanji: "将",
        rk: "01 · 最高峰タイトル",
        title: "将王戦",
        en: "The Shōō",
        since: "Since 1999 · 第22期 · 認定プロ上位10名",
        leaderName: "現将王：忍田 幸夫",
        leaderPt: "防衛戦 進行中",
      },
      {
        pill: "進行中",
        kanji: "B",
        rk: "02 · オープン",
        title: "BIG1カップ",
        en: "The BIG-1 Cup",
        since: "Since 1999 · 第19回 · オープン参加",
        leaderName: "前覇者：忍田 幸夫",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "M",
        rk: "03 · 短期戦",
        title: "μ-M1カップ",
        en: "The μ-M1 Cup",
        since: "Since 2002 · 第13回 · トーナメント制",
        leaderName: "前覇者：忍田 幸夫",
        leaderPt: "予選 →",
        leaderPtDone: true,
      },
      {
        pill: "予選中",
        kanji: "招",
        rk: "04 · 招待タイトル",
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
    title: "今週の対局",
    en: "This Week at μ · 4 Matches",
    cards: [
      {
        badge: "● LIVE 本日",
        live: true,
        dt: "04/21 · 19:30",
        t: "将王戦 第6節",
        sub: <>忍田 / 小林剛 / 須田 / 古久根<br />μ公式 (FRESH)</>,
      },
      {
        badge: "明日",
        dt: "04/22 · 20:00",
        t: "BIG1カップ 準決勝",
        sub: <>4卓16名<br />FRESH LIVE</>,
      },
      {
        badge: "金",
        dt: "04/24 · 19:00",
        t: "μ-M1カップ 一次予選",
        sub: <>16卓64名<br />FRESH LIVE</>,
      },
      {
        badge: "土",
        dt: "04/25 · 13:00",
        t: "関東インビテーションカップ 一次予選",
        sub: <>宮内 / 高見沢 / 大居 / 須藤<br />会員配信</>,
      },
    ],
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
      { rk: "一", top3: true, avatar: "小", avatarClass: "vermilion", name: "小林 剛", href: "/players/kobayashi", sub: "1976生 · 認定プロ · 麻雀サイボーグ · U-NEXT Pirates", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "primary", label: "将王×4" }, { kind: "plain", label: "BIG1×3" }, { kind: "plain", label: "Mリーグ MVP" }], rate: "2148", games: "4,287", top: "29.4%", avg: "2.39" },
      { rk: "二", top3: true, avatar: "忍", avatarClass: "gold", name: "忍田 幸夫", sub: "1962生 · 認定プロ · 元祖牌効率打法 · 公式戦25勝", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "primary", label: "将王×5" }, { kind: "plain", label: "BIG1×2" }, { kind: "plain", label: "μ-M1" }], rate: "2114", games: "5,128", top: "28.4%", avg: "2.41" },
      { rk: "三", top3: true, avatar: "明", name: "明村 諭", href: "/players/akemurasatoshi", sub: "1975生 · 認定プロ · 2003年度入会", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "2042", games: "3,621", top: "26.2%", avg: "2.45" },
      { rk: "四", avatar: "古", name: "古久根 英孝", sub: "1962生 · 認定プロ · μ古参のベテラン", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "BIG1" }], rate: "2018", games: "3,156", top: "25.8%", avg: "2.46" },
      { rk: "五", avatar: "草", avatarClass: "vermilion", name: "草場 とも子", href: "/players/kusabatomoko", sub: "1980生 · 認定プロ · 2005年度入会 · 女流の代表格", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "1992", games: "2,742", top: "26.3%", avg: "2.46" },
      { rk: "六", avatar: "井", avatarClass: "moss", name: "井出 洋介", sub: "1956生 · 創設者 · 東大卒 · 健康麻将提唱", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "創設者" }], rate: "1976", games: "5,484", top: "24.7%", avg: "2.50" },
      { rk: "七", avatar: "須", name: "須藤 浩", sub: "1968生 · 認定プロ · μ古参 · ツアー第1期生", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "1958", games: "3,012", top: "24.0%", avg: "2.52" },
      { rk: "八", avatar: "ち", name: "ちっぴー", sub: "1985生 · ツアー選手 · 配信常連", league: "ツアー", leagueClass: "a2", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "1928", games: "1,684", top: "24.3%", avg: "2.51" },
      { rk: "九", avatar: "高", name: "高見沢 治幸", sub: "1971生 · 認定プロ · ツアー出場記録上位", league: "認定プロ", leagueClass: "a1", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "1912", games: "2,184", top: "23.8%", avg: "2.53" },
      { rk: "十", avatar: "大", avatarClass: "moss", name: "大居 大介", sub: "1985生 · 認定プロ · 中堅実力派", league: "認定プロ", leagueClass: "a2", titles: [{ kind: "plain", label: "ツアー優勝" }], rate: "1894", games: "2,742", top: "23.4%", avg: "2.54" },
    ],
  },
  milestones: [
    { year: "1997", kind: "設立", title: "麻将連合-μ-、創設", desc: "井出洋介を中心に設立。健康麻将と純競技ルールを理念に掲げる。" },
    { year: "1997", kind: "ツアー", title: "ツアー戦 開始", desc: "1997年度第1戦から開始されたツアー戦が、現在も継続するμの根幹。" },
    { year: "1999", kind: "タイトル", title: "将王戦・BIG1カップ 開始", desc: "認定プロ上位10名による将王戦と、オープン参加のBIG1カップが同年スタート。" },
    { year: "2002", kind: "新タイトル", title: "μ-M1カップ 開始", desc: "短期トーナメント制のμ-M1カップが第1回開催。" },
    { year: "2008", kind: "招待戦", title: "関東インビテーションカップ 開始", desc: "認定プロ・有資格者を招待して行うトーナメント形式の招待戦が第1回開催。" },
    { year: "2018", kind: "Mリーグ", title: "Mリーグ参戦", desc: "小林剛がU-NEXT Piratesのドラフト1巡目指名でMリーグ初年度から参戦。" },
    { year: "2021", kind: "個人", title: "小林剛 第19期将王獲得", desc: "Mリーガーとして、また理論派の代表として将王のタイトルを獲得。" },
    { year: "2026", kind: "現在", title: "第22期将王戦 進行中", desc: "現将王の忍田幸夫が長期防衛戦に挑む。" },
  ],
  champions: {
    title: "歴代将王",
    en: "Past Shōō",
    rows: [
      { ep: "21", name: "忍田 幸夫", note: "現将王 · 5度目", yr: "2025" },
      { ep: "20", name: "忍田 幸夫", note: "4度目", yr: "2024" },
      { ep: "19", name: "小林 剛", note: "Mリーガー", yr: "2023" },
      { ep: "18", name: "忍田 幸夫", note: "3度目", yr: "2022" },
      { ep: "17", name: "須田 良規", yr: "2021" },
      { ep: "16", name: "忍田 幸夫", note: "2度目", yr: "2020" },
      { ep: "15", name: "小林 剛", note: "Mリーガー", yr: "2019" },
      { ep: "14", name: "忍田 幸夫", note: "初", yr: "2018" },
      { ep: "13", name: "小林 剛", note: "Mリーガー", yr: "2017" },
      { ep: "12", name: "須田 良規", yr: "2016" },
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
        desc: "将王戦・BIG1カップ・μ-M1カップを中心に毎週生中継。健康麻将道場のレッスン動画も配信。",
        meta: [
          { label: "視聴", value: "週8,400UU" },
          { label: "月間", value: "8配信" },
        ],
      },
      {
        iconClass: "ytb",
        iconLabel: "Y",
        title: "μ公式 YouTube",
        desc: "ツアー戦のハイライトと井出洋介の解説動画を中心に展開。古典派ファンに支持される。",
        meta: [
          { label: "登録", value: "32,800名" },
          { label: "月間", value: "8本" },
        ],
      },
      {
        iconClass: "abema",
        iconLabel: "A",
        title: "ABEMA · Mリーグ",
        desc: "Mリーグ公式放送にて、小林剛がU-NEXT Piratesの主軸として毎週放映。",
        meta: [
          { label: "週", value: "1〜2対局" },
          { label: "レギュラー", value: "10月〜5月" },
        ],
      },
    ],
  },
};

export default function MuPage() {
  return <OrgDetailPage data={MU} />;
}
