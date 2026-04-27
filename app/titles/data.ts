// app/titles/data.ts
// 7タイトル戦のデータ。歴代優勝者は app/players/data.ts の Featured 選手 titles[]
// + Wikipedia / 各団体公式サイトから検証して掲載。確信度の低い項目は省く。

export type OrgCode = "JPML" | "NPM" | "SAIKOUISEN" | "RMU";

export interface PastChampion {
  ep: string;        // "42" / "23" など (期数)
  year: string;      // "2026" / "2024" など (決定戦実施年)
  name: string;      // 優勝者名
  href?: string;     // 選手ページへのリンク
  note?: string;     // "連覇" "初戴冠" など
  current?: boolean; // 現在進行中
  pts?: string;      // 決定戦獲得pt (任意)
}

export interface RuleRow {
  label: string;
  value: string;
}

export interface LeagueTier {
  code: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface TitleData {
  // index card用
  slug: string;
  href: string;
  code: string;          // 表示用 "01 · HŌŌI"
  name: string;          // 鳳凰位戦
  shortName?: string;    // 鳳凰位
  en: string;            // The Hōōi Championship
  glyph: string;         // 鳳
  color: string;         // CSS color
  org: OrgCode;
  orgLabel: string;
  orgHref: string;
  holder?: { name: string; href?: string; note?: string };
  season: string;        // "10月 — 翌年7月"
  tags: string[];

  // 詳細ページ用
  founded?: number;      // 創設年
  formatLabel: string;   // "5部制リーグ + 決定戦"
  about: string[];       // 紹介文 (paragraphs)
  rules?: RuleRow[];
  leagueTiers?: LeagueTier[];
  pastChampions: PastChampion[];
  relatedTitles?: { slug: string; name: string }[];
}

export const TITLES: TitleData[] = [
  // ── 1. 鳳凰位戦 (JPML) ─────────────────────────────────
  {
    slug: "houou-isen",
    href: "/titles/houou-isen",
    code: "01 · HŌŌI",
    name: "鳳凰位戦",
    shortName: "鳳凰位",
    en: "The Hōōi Championship",
    glyph: "鳳",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: { name: "白鳥 翔", href: "/players/shiratori", note: "第42期 (2026) 連覇" },
    season: "10月開幕 · 翌年7月終了 · 決定戦10月",
    tags: ["JPML最高峰", "リーグ戦", "5部制"],
    founded: 1972,
    formatLabel: "鳳凰戦 5部制リーグ + 鳳凰位決定戦 (A1上位4名)",
    about: [
      "鳳凰位戦は日本プロ麻雀連盟 (JPML) が主催する団体最高峰のタイトル戦。1972年創設で、連盟最古のリーグ戦。",
      "5部制 (A1 / A2 / B / C / D) で約700名のプロが年間を通じて戦い、A1リーグ上位4名による「鳳凰位決定戦」(全4日・各3半荘) で最終的に鳳凰位が決まる。",
      "現鳳凰位は白鳥翔 (連盟・第22期生)。第41期 (2025) で初戴冠後、第42期 (2026) で連覇を達成し勢いに乗っている。",
    ],
    rules: [
      { label: "持ち点", value: "30,000" },
      { label: "オカ", value: "あり" },
      { label: "ウマ", value: "10-20" },
      { label: "赤牌", value: "なし" },
      { label: "喰いタン", value: "あり" },
      { label: "後付け", value: "あり" },
      { label: "一節", value: "4回戦" },
      { label: "決定戦", value: "全4日・12半荘" },
    ],
    leagueTiers: [
      { code: "A1", title: "最高峰 · 14名", desc: "上位4名→鳳凰位決定戦 / 下位2名→A2降級", highlight: true },
      { code: "A2", title: "28名", desc: "上位4名→A1昇格 / 下位6名→B降級" },
      { code: "B", title: "約60名", desc: "上位6名昇格 / 下位10名降級" },
      { code: "C", title: "約120名", desc: "上位10名昇格" },
      { code: "D", title: "約400名", desc: "連盟所属プロの登竜門" },
    ],
    pastChampions: [
      { ep: "42", year: "2026", name: "白鳥 翔", href: "/players/shiratori", note: "連覇 (2連覇)", current: false },
      { ep: "41", year: "2025", name: "白鳥 翔", href: "/players/shiratori", note: "初戴冠" },
      { ep: "40", year: "2024", name: "佐々木 寿人", href: "/players/sasaki", note: "3度目の戴冠" },
      { ep: "39", year: "2023", name: "HIRO 柴田", href: "/players/hiro-shibata", note: "2度目の戴冠" },
      { ep: "38", year: "2022", name: "佐々木 寿人", href: "/players/sasaki" },
      { ep: "37", year: "2021", name: "佐々木 寿人", href: "/players/sasaki", note: "初戴冠" },
      { ep: "36", year: "2020", name: "前原 雄大", note: "2度目の戴冠 (2024年逝去)" },
      { ep: "35", year: "2019", name: "山井 弘" },
      { ep: "34", year: "2018", name: "HIRO 柴田", href: "/players/hiro-shibata", note: "初戴冠" },
      { ep: "33", year: "2017", name: "前原 雄大", note: "初戴冠" },
      { ep: "32", year: "2016", name: "勝又 健志", href: "/players/katsumata" },
      { ep: "29", year: "2013", name: "瀬戸熊 直樹", href: "/players/setokuma", note: "3連覇達成 (27/28/29期)" },
      { ep: "27", year: "2011", name: "瀬戸熊 直樹", href: "/players/setokuma", note: "2連覇" },
      { ep: "26", year: "2010", name: "瀬戸熊 直樹", href: "/players/setokuma", note: "初戴冠" },
    ],
    relatedTitles: [
      { slug: "judan-isen", name: "十段位戦" },
      { slug: "oui-isen", name: "王位戦" },
    ],
  },

  // ── 2. 十段位戦 (JPML) ─────────────────────────────────
  {
    slug: "judan-isen",
    href: "/titles/judan-isen",
    code: "02 · JŪDAN",
    name: "十段位戦",
    shortName: "十段位",
    en: "The Jūdan Championship",
    glyph: "十",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: { name: "三浦 智博", href: "/players/miura", note: "第41期 (2024) 連覇" },
    season: "4月 — 翌年3月 · トーナメント方式",
    tags: ["JPML", "トーナメント", "五段以上"],
    founded: 1984,
    formatLabel: "予選 → 本戦 → 決定戦のトーナメント",
    about: [
      "十段位戦は日本プロ麻雀連盟が主催するトーナメント形式のタイトル戦。鳳凰位戦と並ぶ連盟二大タイトルの一つ。",
      "五段以上の連盟プロが参加可能。予選を勝ち上がった選手が本戦・決定戦を経て十段位の称号を獲得する。",
      "現十段位は三浦智博 (連盟)。第40期 (2023) 初戴冠後、第41期 (2024) で連覇を達成。瀬戸熊直樹は第28-30期で3連覇を達成しており、十段位戦史上唯一の偉業。",
    ],
    rules: [
      { label: "形式", value: "予選トーナメント + 決定戦" },
      { label: "対象", value: "連盟五段以上" },
      { label: "決定戦", value: "全6回戦" },
      { label: "持ち点", value: "30,000" },
      { label: "ウマ", value: "10-20" },
      { label: "赤牌", value: "なし" },
    ],
    pastChampions: [
      { ep: "41", year: "2024", name: "三浦 智博", href: "/players/miura", note: "連覇", current: true },
      { ep: "40", year: "2023", name: "三浦 智博", href: "/players/miura", note: "初戴冠" },
      { ep: "36", year: "2019", name: "内川 幸太郎", href: "/players/uchikawa", note: "第35期から連覇" },
      { ep: "35", year: "2018", name: "内川 幸太郎", href: "/players/uchikawa" },
      { ep: "30", year: "2013", name: "瀬戸熊 直樹", href: "/players/setokuma", note: "3連覇達成" },
      { ep: "29", year: "2012", name: "瀬戸熊 直樹", href: "/players/setokuma" },
      { ep: "28", year: "2011", name: "瀬戸熊 直樹", href: "/players/setokuma", note: "初戴冠" },
    ],
    relatedTitles: [
      { slug: "houou-isen", name: "鳳凰位戦" },
      { slug: "oui-isen", name: "王位戦" },
    ],
  },

  // ── 3. 王位戦 (JPML) ──────────────────────────────────
  {
    slug: "oui-isen",
    href: "/titles/oui-isen",
    code: "03 · ŌI",
    name: "王位戦",
    shortName: "王位",
    en: "The Ōi Championship",
    glyph: "王",
    color: "var(--vermilion)",
    org: "JPML",
    orgLabel: "日本プロ麻雀連盟",
    orgHref: "/organizations/jpml",
    holder: { name: "三浦 智博", href: "/players/miura", note: "第48期 (2023)" },
    season: "5月 — 11月 · オープン参加",
    tags: ["JPML", "オープン参加", "全国大会"],
    founded: 1976,
    formatLabel: "予選 (アマも参加可) → 本戦 → 決定戦",
    about: [
      "王位戦は日本プロ麻雀連盟が主催する歴史あるオープンタイトル戦。1976年創設。",
      "プロだけでなくアマチュアも予選から参加できる「開かれた」タイトル戦として知られ、毎年全国の麻雀ファンが挑戦する。",
      "決定戦は半荘戦の積み重ねでチャンピオンを決定。三浦智博 (連盟) が第48期 (2023) 王位、十段位と並んで複数タイトル保持者となった。",
    ],
    rules: [
      { label: "形式", value: "オープン予選 + 決定戦" },
      { label: "対象", value: "プロ・アマ問わず" },
      { label: "持ち点", value: "30,000" },
      { label: "ウマ", value: "10-20" },
      { label: "赤牌", value: "なし" },
      { label: "喰いタン", value: "あり" },
    ],
    pastChampions: [
      { ep: "48", year: "2023", name: "三浦 智博", href: "/players/miura", note: "現王位" },
      { ep: "41", year: "2015", name: "石井 一馬", href: "/players/ishii" },
      { ep: "33", year: "2007", name: "滝沢 和典", href: "/players/takizawa", note: "連覇" },
      { ep: "32", year: "2006", name: "滝沢 和典", href: "/players/takizawa", note: "初戴冠" },
      { ep: "31", year: "2007", name: "多井 隆晴", href: "/players/taii" },
    ],
    relatedTitles: [
      { slug: "houou-isen", name: "鳳凰位戦" },
      { slug: "judan-isen", name: "十段位戦" },
    ],
  },

  // ── 4. 雀王戦 (NPM 協会) ────────────────────────────────
  {
    slug: "jakuou-isen",
    href: "/titles/jakuou-isen",
    code: "04 · JAKU-Ō",
    name: "雀王戦",
    shortName: "雀王",
    en: "The Jaku-Ō Championship",
    glyph: "雀",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    holder: { name: "仲林 圭", href: "/players/nakabayashi", note: "第23期 (2025) 連覇" },
    season: "5月 — 翌年2月 · A〜D制",
    tags: ["NPM最高峰", "リーグ戦", "4部制"],
    founded: 2001,
    formatLabel: "A〜D 4部制リーグ + 雀王決定戦 (A上位4名)",
    about: [
      "雀王戦は日本プロ麻雀協会 (NPM) が主催する団体最高峰のタイトル戦。協会創設の2001年から続く伝統タイトル。",
      "A・B・C・Dの4部制リーグ戦を経て、Aリーグ上位4名で雀王決定戦を実施。",
      "現雀王は仲林圭 (協会)。U-NEXT Pirates所属で、第22期 (2023)・第23期 (2025) と2連覇達成中の絶対王者。園田賢 (現赤坂ドリブンズ) も第11-13期 (2012-2014) で3連覇を達成している。",
    ],
    rules: [
      { label: "持ち点", value: "30,000" },
      { label: "オカ", value: "あり" },
      { label: "ウマ", value: "10-30" },
      { label: "赤牌", value: "なし" },
      { label: "喰いタン", value: "あり" },
      { label: "決定戦", value: "全12回戦" },
    ],
    leagueTiers: [
      { code: "A", title: "最高峰 · 16名", desc: "上位4名→雀王決定戦 / 下位3名→B降級", highlight: true },
      { code: "B", title: "32名", desc: "上位3名→A昇格 / 下位3名→C降級" },
      { code: "C", title: "60名超", desc: "上位3名→B昇格" },
      { code: "D", title: "200名超", desc: "協会所属プロの登竜門" },
    ],
    pastChampions: [
      { ep: "23", year: "2025", name: "仲林 圭", href: "/players/nakabayashi", note: "連覇 · 永世位達成?", current: true },
      { ep: "22", year: "2023", name: "仲林 圭", href: "/players/nakabayashi", note: "初戴冠" },
      { ep: "21", year: "2022", name: "浅井 堂岐", href: "/players/asai" },
      { ep: "20", year: "2021", name: "渋川 難波", href: "/players/shibukawa" },
      { ep: "18", year: "2019", name: "堀 慎吾", href: "/players/hori" },
      { ep: "13", year: "2014", name: "園田 賢", href: "/players/sonoda", note: "3連覇" },
      { ep: "12", year: "2013", name: "園田 賢", href: "/players/sonoda" },
      { ep: "11", year: "2012", name: "園田 賢", href: "/players/sonoda", note: "初戴冠" },
    ],
    relatedTitles: [
      { slug: "jaryuui-sen", name: "雀竜位戦" },
      { slug: "saikouisen", name: "最高位戦" },
    ],
  },

  // ── 5. 雀竜位戦 (NPM 協会) ──────────────────────────────
  {
    slug: "jaryuui-sen",
    href: "/titles/jaryuui-sen",
    code: "05 · JARYU-I",
    name: "雀竜位戦",
    shortName: "雀竜位",
    en: "The Jaryū-i Championship",
    glyph: "竜",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    season: "通年・トーナメント形式",
    tags: ["NPM", "トーナメント", "オープン"],
    formatLabel: "予選 → 本戦 → 決定戦のトーナメント",
    about: [
      "雀竜位戦は日本プロ麻雀協会 (NPM) が主催するトーナメント形式のタイトル戦。雀王戦に次ぐ協会の主要タイトル。",
      "プロ・アマ問わず参加可能で、毎年新しい挑戦者が予選から勝ち上がる開かれたタイトル戦。",
      "歴代優勝者には現Mリーガーの仲林圭 (第10期、2012年) が含まれる。",
    ],
    rules: [
      { label: "形式", value: "オープン予選 + 決定戦" },
      { label: "対象", value: "プロ・アマ問わず" },
      { label: "持ち点", value: "30,000" },
      { label: "ウマ", value: "10-30" },
      { label: "赤牌", value: "なし" },
    ],
    pastChampions: [
      { ep: "10", year: "2012", name: "仲林 圭", href: "/players/nakabayashi", note: "現U-NEXT Pirates" },
    ],
    relatedTitles: [
      { slug: "jakuou-isen", name: "雀王戦" },
    ],
  },

  // ── 6. 令昭位戦 (RMU) ──────────────────────────────────
  {
    slug: "reishouisen",
    href: "/titles/reishouisen",
    code: "06 · REISHŌ",
    name: "令昭位戦",
    shortName: "令昭位",
    en: "The Reishōi Championship",
    glyph: "令",
    color: "var(--gold)",
    org: "RMU",
    orgLabel: "Real Mahjong Unit",
    orgHref: "/organizations/rmu",
    season: "通年 · A1〜B制",
    tags: ["RMU最高峰", "リーグ戦", "Aルール"],
    founded: 2009,
    formatLabel: "A1・A2・B 3部制リーグ + 令昭位決定戦",
    about: [
      "令昭位戦はRMU (Real Mahjong Unit) が主催する団体最高峰のリーグ戦。第10期までは「RMUリーグ」の名称で運営され、第11期から現在の「令昭位戦」へ改称。",
      "RMUのAルール (一発・裏ドラなし) を採用し、技術勝負の色合いが強い。A1リーグ優勝者に「令昭位」の称号が授与される。",
      "歴代優勝者の多くがRMU代表の多井隆晴 (現渋谷ABEMAS)。河野高志、阿部孝則、谷井茂文ら設立メンバーが繰り返し戴冠してきた。",
    ],
    rules: [
      { label: "ルール", value: "RMU Aルール" },
      { label: "持ち点", value: "30,000" },
      { label: "オカ", value: "あり" },
      { label: "ウマ", value: "10-20" },
      { label: "赤牌", value: "なし" },
      { label: "一発・裏ドラ", value: "なし" },
    ],
    leagueTiers: [
      { code: "A1", title: "最高峰", desc: "優勝者に「令昭位」の称号", highlight: true },
      { code: "A2", title: "中堅", desc: "上位がA1昇格" },
      { code: "B", title: "登竜門", desc: "新人・若手中心" },
    ],
    pastChampions: [
      { ep: "16", year: "2024", name: "河野 高志", note: "S級" },
      { ep: "15", year: "2023", name: "谷井 茂文", note: "SS級" },
      { ep: "14", year: "2022", name: "楢原 和人", note: "S級" },
      { ep: "13", year: "2021", name: "河野 高志" },
      { ep: "12", year: "2020", name: "河野 高志", note: "初戴冠" },
      { ep: "11", year: "2019", name: "多井 隆晴", href: "/players/taii", note: "改称後初代令昭位" },
      { ep: "8", year: "2016", name: "多井 隆晴", href: "/players/taii", note: "RMUリーグ時代" },
      { ep: "6", year: "2014", name: "多井 隆晴", href: "/players/taii" },
      { ep: "3", year: "2011", name: "多井 隆晴", href: "/players/taii" },
      { ep: "1", year: "2009", name: "多井 隆晴", href: "/players/taii", note: "初代王者" },
    ],
    relatedTitles: [
      { slug: "houou-isen", name: "鳳凰位戦" },
      { slug: "saikouisen", name: "最高位戦" },
    ],
  },

  // ── 7. 最高位戦 (最高位戦日本プロ麻雀協会) ────────────────
  {
    slug: "saikouisen",
    href: "/titles/saikouisen",
    code: "07 · SAIKŌI",
    name: "最高位戦",
    shortName: "最高位",
    en: "The Saikōi Championship",
    glyph: "最",
    color: "#7c3aed",
    org: "SAIKOUISEN",
    orgLabel: "最高位戦日本プロ麻雀協会",
    orgHref: "/organizations/saikouisen",
    holder: { name: "石井 一馬", href: "/players/ishii", note: "第49期 (2025)" },
    season: "4月 — 翌年3月 · A〜D制",
    tags: ["最高位戦最高峰", "リーグ戦", "国内最古タイトル"],
    founded: 1976,
    formatLabel: "A〜D 4部制リーグ + 最高位決定戦 (A上位4名)",
    about: [
      "最高位戦は最高位戦日本プロ麻雀協会が主催する団体最高峰のタイトル戦。日本最古のプロ麻雀タイトルとして1976年から続く。",
      "A・B1・B2・C・Dの部制リーグを経て、A上位4名による決定戦で最高位を決める。最高位戦Aルール (一発・赤・裏ドラなし) を採用。",
      "現最高位は石井一馬 (現EARTH JETS)。第49期 (2025) で戴冠。竹内元太は第47-48期で連覇、醍醐大は第45期 (2020) で戴冠している。",
    ],
    rules: [
      { label: "ルール", value: "最高位戦Aルール" },
      { label: "持ち点", value: "30,000" },
      { label: "オカ", value: "あり" },
      { label: "ウマ", value: "10-20" },
      { label: "赤牌", value: "なし" },
      { label: "一発・裏ドラ", value: "なし" },
      { label: "決定戦", value: "全8回戦" },
    ],
    leagueTiers: [
      { code: "A", title: "最高峰 · 14名", desc: "上位4名→最高位決定戦", highlight: true },
      { code: "B1", title: "20名", desc: "上位がA昇格" },
      { code: "B2", title: "30名超", desc: "上位がB1昇格" },
      { code: "C", title: "60名超", desc: "上位がB2昇格" },
      { code: "D", title: "登竜門", desc: "最高位戦所属プロの入口" },
    ],
    pastChampions: [
      { ep: "49", year: "2025", name: "石井 一馬", href: "/players/ishii", note: "現EARTH JETS", current: true },
      { ep: "48", year: "2023", name: "竹内 元太", href: "/players/takeuchi", note: "連覇" },
      { ep: "47", year: "2022", name: "竹内 元太", href: "/players/takeuchi", note: "初戴冠" },
      { ep: "46", year: "2021", name: "鈴木 優", href: "/players/suzuki-y", note: "現U-NEXT Pirates" },
      { ep: "45", year: "2020", name: "醍醐 大", href: "/players/daigo", note: "現セガサミーフェニックス" },
    ],
    relatedTitles: [
      { slug: "jakuou-isen", name: "雀王戦" },
      { slug: "houou-isen", name: "鳳凰位戦" },
    ],
  },
];

export type FilterTab = {
  key: "ALL" | OrgCode;
  label: string;
  en: string;
  color: string;
};

export const TITLE_FILTERS: FilterTab[] = [
  { key: "ALL", label: "ALL", en: "全タイトル", color: "var(--ink)" },
  { key: "JPML", label: "JPML", en: "連盟", color: "var(--vermilion)" },
  { key: "NPM", label: "NPM", en: "協会", color: "#2563eb" },
  { key: "SAIKOUISEN", label: "最高位戦", en: "Saikōisen", color: "#7c3aed" },
  { key: "RMU", label: "RMU", en: "Real Mahjong Unit", color: "var(--gold)" },
];

export function getTitleBySlug(slug: string): TitleData | undefined {
  return TITLES.find((t) => t.slug === slug);
}
