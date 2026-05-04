// app/titles/data.ts
// 主要タイトル戦データ。2026-05-04時点で各団体公式ページを確認し、未確認の細部は断定しない。

export type OrgCode = "JPML" | "NPM" | "SAIKOUISEN" | "RMU" | "MU";

export interface PastChampion {
  ep: string;
  year: string;
  name: string;
  href?: string;
  note?: string;
  current?: boolean;
  pts?: string;
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
  slug: string;
  href: string;
  code: string;
  name: string;
  shortName?: string;
  en: string;
  glyph: string;
  color: string;
  org: OrgCode;
  orgLabel: string;
  orgHref: string;
  holder?: { name: string; href?: string; note?: string };
  season: string;
  tags: string[];
  founded?: number;
  formatLabel: string;
  about: string[];
  rules?: RuleRow[];
  leagueTiers?: LeagueTier[];
  pastChampions: PastChampion[];
  relatedTitles?: { slug: string; name: string }[];
}

const JPML_OFFICIAL_RULES: RuleRow[] = [
  { label: "採用ルール", value: "日本プロ麻雀連盟公式ルール" },
  { label: "一発・裏ドラ", value: "なし" },
  { label: "カンドラ", value: "なし" },
  { label: "喰いタン・後付け", value: "あり" },
  { label: "途中流局", value: "なし" },
  { label: "同時ロン", value: "上家優先" },
];

const NPM_RULES: RuleRow[] = [
  { label: "採用ルール", value: "日本プロ麻雀協会公式ルール" },
  { label: "持ち点", value: "25,000点持ち30,000点返し" },
  { label: "順位点", value: "+50 / +10 / △10 / △30" },
  { label: "一発・裏ドラ", value: "あり" },
  { label: "カンドラ", value: "あり" },
  { label: "喰いタン・先付け", value: "あり" },
  { label: "親の連荘", value: "アガリ・テンパイ連荘" },
  { label: "途中流局", value: "なし" },
];

const SAIKOUISEN_RULES: RuleRow[] = [
  { label: "採用ルール", value: "最高位戦ルール" },
  { label: "持ち点", value: "30,000点持ち30,000点返し" },
  { label: "オカ", value: "なし" },
  { label: "ウマ", value: "10-30" },
  { label: "一発・裏ドラ", value: "あり" },
  { label: "カンドラ・カン裏", value: "あり" },
  { label: "喰いタン・先付け", value: "あり" },
  { label: "途中流局", value: "なし" },
];

const SAIKOUISEN_CLASSIC_RULES: RuleRow[] = [
  { label: "採用ルール", value: "最高位戦Classicルール" },
  { label: "順位点", value: "+12 / +4 / △4 / △12" },
  { label: "ドラ", value: "最初の一種類のみ" },
  { label: "一発・裏ドラ", value: "なし" },
  { label: "ノーテン罰符", value: "なし" },
  { label: "連荘", value: "親のアガリのみ" },
  { label: "喰い替え", value: "現物喰い替えあり" },
  { label: "リーチ後暗槓", value: "不可" },
];

const RMU_A_RULES: RuleRow[] = [
  { label: "採用ルール", value: "RMU公式Aルール" },
  { label: "持ち点", value: "30,000点持ち30,000点返し" },
  { label: "順位点", value: "+15 / +5 / △5 / △15" },
  { label: "一発・裏ドラ", value: "あり" },
  { label: "カンドラ・カン裏", value: "あり" },
  { label: "喰いタン・先付け", value: "あり" },
  { label: "親の連荘", value: "アガリ・テンパイ連荘" },
  { label: "途中流局", value: "なし" },
];

const RMU_B_RULES: RuleRow[] = [
  { label: "採用ルール", value: "RMU公式Bルール" },
  { label: "基準", value: "Aルールから一発・裏ドラ・カンドラを除く" },
  { label: "順位点", value: "+15 / +5 / △5 / △15" },
  { label: "持ち点", value: "30,000点持ち30,000点返し" },
  { label: "喰いタン・先付け", value: "あり" },
  { label: "途中流局", value: "なし" },
];

const MU_LEAGUE_RULES: RuleRow[] = [
  { label: "採用ルール", value: "μリーグルール" },
  { label: "テンパイ料", value: "なし" },
  { label: "順位点", value: "+12 / +4 / △4 / △12" },
  { label: "形式", value: "1節5回戦・全10節" },
  { label: "対象", value: "期首順位上位10名のプロ" },
  { label: "決定戦", value: "上位3名が現将王への挑戦権" },
];

const MU_CUP_RULES: RuleRow[] = [
  { label: "採用ルール", value: "μカップルール準拠" },
  { label: "順位点", value: "+12 / +4 / △4 / △12" },
  { label: "一発・裏ドラ", value: "なし" },
  { label: "形式", value: "大会規定による半荘戦" },
  { label: "対象", value: "会員・一般参加を含むオープン枠あり" },
];

export const TITLES: TitleData[] = [
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
    holder: { name: "白鳥 翔", href: "/players/shiratori", note: "第42期 (2026)" },
    season: "A1・A2は年間、B以下は半期制",
    tags: ["JPML最高峰", "リーグ戦", "公式ルール"],
    founded: 1972,
    formatLabel: "A〜Eリーグ + 鳳凰位決定戦",
    about: [
      "鳳凰位戦は日本プロ麻雀連盟の最高峰リーグ戦。A〜Eの各リーグで昇降級を行い、A1上位者と現鳳凰位が決定戦で鳳凰位を争う。",
      "連盟公式の開催概要では、A1は12名で、その年の上位3名と前年度鳳凰位が4日間・半荘16回を戦う形式とされている。",
      "採用ルールは日本プロ麻雀連盟公式ルール。一発・裏ドラなしの重厚な競技ルールで争われる。",
    ],
    rules: [...JPML_OFFICIAL_RULES, { label: "決定戦", value: "4日間・半荘16回" }],
    leagueTiers: [
      { code: "A1", title: "最高峰", desc: "上位者が鳳凰位決定戦へ", highlight: true },
      { code: "A2", title: "上位リーグ", desc: "A1昇級を争う年間リーグ" },
      { code: "B", title: "中位リーグ", desc: "半期ごとの昇降級" },
      { code: "C", title: "育成層", desc: "半期ごとの昇降級" },
      { code: "D/E", title: "登竜門", desc: "連盟所属プロの入口" },
    ],
    pastChampions: [
      { ep: "42", year: "2026", name: "白鳥 翔", href: "/players/shiratori", current: true },
      { ep: "41", year: "2025", name: "白鳥 翔", href: "/players/shiratori" },
      { ep: "40", year: "2024", name: "佐々木 寿人", href: "/players/sasaki" },
    ],
    relatedTitles: [
      { slug: "judan-isen", name: "十段位戦" },
      { slug: "oui-isen", name: "王位戦" },
    ],
  },
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
    holder: { name: "浜野 太陽", note: "第42期 (2025)" },
    season: "段位別トーナメント",
    tags: ["JPML", "トーナメント", "連盟プロ限定"],
    founded: 1984,
    formatLabel: "段位別トーナメント + 現十段位を交えた決定戦",
    about: [
      "十段位戦は、連盟の段位制に基づいて行われるトーナメント形式のタイトル戦。",
      "初段戦から段位別に勝ち上がり、最終的に勝ち残った4名と現十段位の5名で決定戦を行う。",
      "ルールは日本プロ麻雀連盟公式ルール。連盟所属プロだけが挑む、段位制度と強く結びついたタイトル戦。",
    ],
    rules: [...JPML_OFFICIAL_RULES, { label: "決定戦", value: "勝ち上がり4名 + 現十段位" }],
    pastChampions: [
      { ep: "42", year: "2025", name: "浜野 太陽", current: true },
      { ep: "41", year: "2024", name: "三浦 智博", href: "/players/miura" },
      { ep: "40", year: "2023", name: "三浦 智博", href: "/players/miura" },
    ],
    relatedTitles: [
      { slug: "houou-isen", name: "鳳凰位戦" },
      { slug: "oui-isen", name: "王位戦" },
    ],
  },
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
    holder: { name: "石川 正明", note: "現王位" },
    season: "秋〜冬 · プロアマ混合オープン",
    tags: ["JPML", "オープン", "公式ルール"],
    founded: 1973,
    formatLabel: "プロ・アマ混合予選 → 本戦 → 決勝",
    about: [
      "王位戦は1973年に創設されたプロ・アマ混合の歴史あるオープンタイトル戦。1989年から日本プロ麻雀連盟主催で行われている。",
      "一般予選・プロ予選から本戦へ進み、上位者が決勝へ進出する。第50期の案内でも、プロ・アマ混合で実力日本一を競うタイトルとして募集されている。",
      "採用ルールは日本プロ麻雀連盟公式ルール。公式案内では一発・裏ドラなしと明記されている。",
    ],
    rules: [...JPML_OFFICIAL_RULES, { label: "参加", value: "プロ・アマ混合" }],
    pastChampions: [
      { ep: "48", year: "2023", name: "三浦 智博", href: "/players/miura" },
    ],
    relatedTitles: [
      { slug: "houou-isen", name: "鳳凰位戦" },
      { slug: "judan-isen", name: "十段位戦" },
    ],
  },
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
    holder: { name: "西村 雄一郎", note: "現雀王" },
    season: "年間リーグ戦",
    tags: ["NPM最高峰", "リーグ戦", "協会公式ルール"],
    founded: 2001,
    formatLabel: "協会リーグ戦 + 雀王決定戦",
    about: [
      "雀王戦は日本プロ麻雀協会の最高峰タイトル。リーグ戦に参加する協会員の目標となる年間タイトル戦。",
      "上位リーグほど昇級・残留が難しく、長い期間をかけて挑戦権を得る構造になっている。",
      "採用ルールは日本プロ麻雀協会公式ルール。一発・裏ドラ・カンドラあり、順位点は50-10方式。",
    ],
    rules: NPM_RULES,
    leagueTiers: [
      { code: "A1", title: "最高峰", desc: "雀王決定戦への挑戦権を争う", highlight: true },
      { code: "A2", title: "上位リーグ", desc: "A1昇級を争う" },
      { code: "B/C", title: "中位リーグ", desc: "昇降級で上位を目指す" },
      { code: "D/E/F", title: "下位リーグ", desc: "協会員の登竜門" },
    ],
    pastChampions: [
      { ep: "24", year: "2025", name: "西村 雄一郎", current: true },
      { ep: "23", year: "2024", name: "仲林 圭", href: "/players/nakabayashi" },
      { ep: "22", year: "2023", name: "仲林 圭", href: "/players/nakabayashi" },
    ],
    relatedTitles: [
      { slug: "jaryuui-sen", name: "雀竜位戦" },
      { slug: "female-jakuou-isen", name: "女流雀王戦" },
    ],
  },
  {
    slug: "jaryuui-sen",
    href: "/titles/jaryuui-sen",
    code: "05 · JARYŪ-I",
    name: "雀竜位戦",
    shortName: "雀竜位",
    en: "The Jaryū-i Championship",
    glyph: "竜",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    holder: { name: "大川 冬馬", note: "現雀竜位" },
    season: "短期リーグ戦",
    tags: ["NPM", "短期昇級", "協会公式ルール"],
    formatLabel: "短期リーグ戦・原則雀王戦に準ずる",
    about: [
      "雀竜位戦は日本プロ麻雀協会を代表するタイトルの一つ。雀王戦と異なり、1年で最下級から決定戦まで勝ち上がれる可能性がある。",
      "公式概要では、原則として雀王戦に準じる形式で、規定半荘数の総合ポイントを競う短期リーグ戦とされている。",
      "新人プロでも短期間で大きなタイトルに挑める、夢のあるタイトル戦として位置付けられている。",
    ],
    rules: [...NPM_RULES, { label: "形式", value: "原則雀王戦に準ずる短期リーグ" }],
    pastChampions: [
      { ep: "24", year: "2025", name: "大川 冬馬", current: true },
      { ep: "10", year: "2012", name: "仲林 圭", href: "/players/nakabayashi" },
    ],
    relatedTitles: [
      { slug: "jakuou-isen", name: "雀王戦" },
      { slug: "female-jakuou-isen", name: "女流雀王戦" },
    ],
  },
  {
    slug: "female-jakuou-isen",
    href: "/titles/female-jakuou-isen",
    code: "06 · QUEEN",
    name: "女流雀王戦",
    shortName: "女流雀王",
    en: "The Women's Jaku-Ō Championship",
    glyph: "女",
    color: "#2563eb",
    org: "NPM",
    orgLabel: "日本プロ麻雀協会",
    orgHref: "/organizations/npm",
    holder: { name: "奥村 知美", note: "現女流雀王" },
    season: "年間8節リーグ戦",
    tags: ["NPM", "女流", "協会公式ルール"],
    formatLabel: "A・B・Cリーグ + 女流雀王決定戦",
    about: [
      "女流雀王戦は日本プロ麻雀協会所属の女流プロだけで行われるリーグ戦。総勢100名前後がリーグ登録している。",
      "A・B・Cリーグ間で昇降級を行い、Aリーグ終了時の上位4名が前年度女流雀王を交えた決定戦へ進出する。",
      "採用ルールは協会公式ルール。長期リーグとして安定感と総合力が問われる。",
    ],
    rules: [...NPM_RULES, { label: "決定戦", value: "Aリーグ上位4名 + 前年度女流雀王" }],
    leagueTiers: [
      { code: "A", title: "最高峰", desc: "上位4名が決定戦へ", highlight: true },
      { code: "B", title: "昇級争い", desc: "Aリーグ昇級を目指す" },
      { code: "C", title: "登竜門", desc: "女流雀王戦リーグの入口" },
    ],
    pastChampions: [
      { ep: "24", year: "2025", name: "奥村 知美", current: true },
    ],
    relatedTitles: [
      { slug: "jakuou-isen", name: "雀王戦" },
      { slug: "jaryuui-sen", name: "雀竜位戦" },
    ],
  },
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
    season: "年間リーグ戦",
    tags: ["最高位戦最高峰", "リーグ戦", "最高位戦ルール"],
    founded: 1976,
    formatLabel: "A1を頂点とするリーグ戦 + 最高位決定戦",
    about: [
      "最高位戦は最高位戦日本プロ麻雀協会の最高峰タイトル。団体創設以来続く、プロ麻雀を代表する長期リーグ戦。",
      "最高位戦ルールは30,000点持ち30,000点返し・オカなし・ウマ10-30。一発、裏ドラ、槓ドラ、槓裏がある。",
      "リーグ戦を勝ち抜いた上位者が最高位決定戦で年間王者を争う。",
    ],
    rules: SAIKOUISEN_RULES,
    leagueTiers: [
      { code: "A1", title: "最高峰", desc: "最高位決定戦を争う", highlight: true },
      { code: "A2", title: "上位リーグ", desc: "A1昇級を目指す" },
      { code: "B/C/D", title: "昇降級リーグ", desc: "段階的に上位を目指す" },
    ],
    pastChampions: [
      { ep: "49", year: "2025", name: "石井 一馬", href: "/players/ishii", current: true },
      { ep: "48", year: "2023", name: "竹内 元太", href: "/players/takeuchi" },
      { ep: "47", year: "2022", name: "竹内 元太", href: "/players/takeuchi" },
    ],
    relatedTitles: [
      { slug: "saikouisen-classic", name: "最高位戦Classic" },
      { slug: "ryuou-sen", name: "發王戦" },
    ],
  },
  {
    slug: "saikouisen-classic",
    href: "/titles/saikouisen-classic",
    code: "08 · CLASSIC",
    name: "飯田正人杯 最高位戦Classic",
    shortName: "Classic",
    en: "The Saikōisen Classic",
    glyph: "典",
    color: "#7c3aed",
    org: "SAIKOUISEN",
    orgLabel: "最高位戦日本プロ麻雀協会",
    orgHref: "/organizations/saikouisen",
    holder: { name: "小池 諒", note: "現Classic" },
    season: "Classicルール採用タイトル",
    tags: ["最高位戦", "Classic", "一発なし"],
    formatLabel: "最高位戦Classicルールによるタイトル戦",
    about: [
      "最高位戦Classicは、現行の最高位戦ルールとは異なるClassicルールで行われるタイトル戦。",
      "Classicルールでは、一発・裏ドラがなく、順位点は12-4方式。ノーテン罰符なし、連荘は親のアガリのみなど、現行ルールと大きく異なる。",
      "『飯田正人杯』として、最高位戦内でもルール思想の違いがはっきり出るタイトル戦になっている。",
    ],
    rules: SAIKOUISEN_CLASSIC_RULES,
    pastChampions: [],
    relatedTitles: [
      { slug: "saikouisen", name: "最高位戦" },
      { slug: "ryuou-sen", name: "發王戦" },
    ],
  },
  {
    slug: "ryuou-sen",
    href: "/titles/ryuou-sen",
    code: "09 · RYŪŌ",
    name: "發王戦",
    shortName: "發王",
    en: "The Ryūō Championship",
    glyph: "發",
    color: "#7c3aed",
    org: "SAIKOUISEN",
    orgLabel: "最高位戦日本プロ麻雀協会",
    orgHref: "/organizations/saikouisen",
    holder: { name: "宮﨑 和樹", note: "現發王" },
    season: "オープントーナメント",
    tags: ["最高位戦", "オープン", "トーナメント"],
    founded: 1992,
    formatLabel: "最高位戦ルール・トーナメント方式",
    about: [
      "發王戦は最高位戦日本プロ麻雀協会主催のタイトル戦。1992年創設で、一般参加も可能なオープン戦。",
      "本戦以降は、同じ面子で半荘2〜3回を打ち、上位2名が勝ち上がるトーナメント方式を採用する。",
      "採用ルールは最高位戦ルール。条件戦の醍醐味が強く出るタイトル戦として位置付けられている。",
    ],
    rules: [...SAIKOUISEN_RULES, { label: "形式", value: "同卓者内の上位2名勝ち上がり" }],
    pastChampions: [
      { ep: "33", year: "2025", name: "宮﨑 和樹", current: true },
      { ep: "32", year: "2024", name: "寿（とし）" },
      { ep: "31", year: "2023", name: "有賀 一宏" },
      { ep: "30", year: "2022", name: "仲林 圭", href: "/players/nakabayashi" },
      { ep: "29", year: "2021", name: "仲林 圭", href: "/players/nakabayashi" },
    ],
    relatedTitles: [
      { slug: "saikouisen", name: "最高位戦" },
      { slug: "saikouisen-classic", name: "最高位戦Classic" },
    ],
  },
  {
    slug: "reishouisen",
    href: "/titles/reishouisen",
    code: "10 · REISHŌ",
    name: "令昭位戦",
    shortName: "令昭位",
    en: "The Reishōi Championship",
    glyph: "令",
    color: "var(--gold)",
    org: "RMU",
    orgLabel: "Real Mahjong Unit",
    orgHref: "/organizations/rmu",
    holder: { name: "小川 光", note: "第17期 (2026)" },
    season: "A1・A2・B1は年間、B2以下は半期制",
    tags: ["RMU最高峰", "リーグ戦", "Aルール"],
    founded: 2009,
    formatLabel: "アスリートコース所属選手による階層リーグ",
    about: [
      "令昭位戦はRMUのアスリートコース所属選手のみで行われる最高峰リーグ戦。A1優勝者を令昭位と称する。",
      "公式概要では、A1・A2・B1は年間1期、B2以下は1期5節・半荘20回戦で年2期開催とされている。",
      "RMU公式Aルールを基準に、年間リーグと決定戦で総合力を競う。",
    ],
    rules: RMU_A_RULES,
    leagueTiers: [
      { code: "A1", title: "最高峰", desc: "優勝者を令昭位と称する", highlight: true },
      { code: "A2/B1", title: "年間リーグ", desc: "A1昇級・残留を争う" },
      { code: "B2以下", title: "半期リーグ", desc: "5節20回戦で昇降級" },
    ],
    pastChampions: [
      { ep: "17", year: "2026", name: "小川 光", current: true },
      { ep: "16", year: "2025", name: "河野 高志" },
      { ep: "15", year: "2023", name: "谷井 茂文" },
    ],
    relatedTitles: [
      { slug: "rmu-crown", name: "RMUクラウン" },
      { slug: "tiara-league", name: "ティアラリーグ" },
    ],
  },
  {
    slug: "rmu-crown",
    href: "/titles/rmu-crown",
    code: "11 · CROWN",
    name: "RMUクラウン",
    shortName: "クラウン",
    en: "The RMU Crown",
    glyph: "冠",
    color: "var(--gold)",
    org: "RMU",
    orgLabel: "Real Mahjong Unit",
    orgHref: "/organizations/rmu",
    holder: { name: "福原 慎平", note: "第17期" },
    season: "年1回 · オープンタイトル",
    tags: ["RMU", "G1", "オープン"],
    formatLabel: "会員・一般参加可能なG1オープンタイトル",
    about: [
      "RMUクラウンは、RMUにおいて最も価値のあるG1タイトルとして位置付けられるオープンタイトル戦。",
      "年1回開催され、RMU会員・一般を問わず参加可能。本戦にはRMUライセンスプロや友好団体所属選手がシードされる。",
      "予選・本戦を勝ち抜き、準決勝・決勝でクラウンを争う。",
    ],
    rules: [...RMU_A_RULES, { label: "参加", value: "会員・一般参加可能" }],
    pastChampions: [
      { ep: "17", year: "2025", name: "福原 慎平", current: true },
      { ep: "16", year: "2024", name: "河野 高志" },
      { ep: "15", year: "2023", name: "下石 戟", href: "/players/shimoishi" },
    ],
    relatedTitles: [
      { slug: "reishouisen", name: "令昭位戦" },
      { slug: "tiara-league", name: "ティアラリーグ" },
    ],
  },
  {
    slug: "tiara-league",
    href: "/titles/tiara-league",
    code: "12 · TIARA",
    name: "ティアラリーグ",
    shortName: "ティアラ",
    en: "The Tiara League",
    glyph: "姫",
    color: "var(--gold)",
    org: "RMU",
    orgLabel: "Real Mahjong Unit",
    orgHref: "/organizations/rmu",
    holder: { name: "角 葉子", note: "現ティアラ" },
    season: "女流アスリートリーグ",
    tags: ["RMU", "女流", "リーグ戦"],
    founded: 2015,
    formatLabel: "女流アスリート選手による5節リーグ",
    about: [
      "ティアラリーグはRMUの女流アスリート選手によるリーグ戦。2015年に新設された。",
      "5節のリーグ戦で、女流令昭位決定戦出場選手、昇級者、降級者を決める。",
      "RMU公式ルール体系のもと、女流選手の年間成績を競うタイトル戦として運営される。",
    ],
    rules: RMU_B_RULES,
    leagueTiers: [
      { code: "A", title: "上位リーグ", desc: "女流令昭位決定戦を目指す", highlight: true },
      { code: "B以下", title: "昇降級", desc: "5節で昇級・降級を争う" },
    ],
    pastChampions: [],
    relatedTitles: [
      { slug: "reishouisen", name: "令昭位戦" },
      { slug: "rmu-crown", name: "RMUクラウン" },
    ],
  },
  {
    slug: "shouou-isen",
    href: "/titles/shouou-isen",
    code: "13 · SHŌŌ",
    name: "将王戦",
    shortName: "将王",
    en: "The Shōō Championship",
    glyph: "将",
    color: "#2f5c3f",
    org: "MU",
    orgLabel: "麻将連合-μ-",
    orgHref: "/organizations/mu",
    holder: { name: "石原 真人", note: "第23期" },
    season: "μリーグ + 将王決定戦",
    tags: ["μ最高峰", "リーグ戦", "μリーグルール"],
    formatLabel: "期首順位上位10名のμリーグ + 将王決定戦",
    about: [
      "将王は麻将連合-μ-の最高峰タイトル。公式ページでは『将王』をμ最高峰タイトルの称号としている。",
      "将王を除いた期首順位上位10名のプロが10節40半荘を行い、上位3名が将王決定戦で現将王への挑戦権を得る。",
      "μリーグルールではテンパイ料なし。順位点は12-4方式で、素点と順位点の合計を競う。",
    ],
    rules: MU_LEAGUE_RULES,
    pastChampions: [
      { ep: "23", year: "2025", name: "石原 真人", current: true },
      { ep: "22", year: "2024", name: "忍田 幸夫" },
      { ep: "19", year: "2021", name: "小林 剛", href: "/players/kobayashi" },
    ],
    relatedTitles: [
      { slug: "big1-cup", name: "BIG1カップ" },
      { slug: "mu-m1-cup", name: "μ-M1カップ" },
    ],
  },
  {
    slug: "big1-cup",
    href: "/titles/big1-cup",
    code: "14 · BIG1",
    name: "BIG1カップ",
    shortName: "BIG1",
    en: "The BIG1 Cup",
    glyph: "一",
    color: "#2f5c3f",
    org: "MU",
    orgLabel: "麻将連合-μ-",
    orgHref: "/organizations/mu",
    holder: { name: "鹿 健太郎", note: "第29回" },
    season: "年1回 · オープン予選あり",
    tags: ["μ", "オープン", "μカップルール"],
    formatLabel: "固定卓トーナメント + プロアマ予選",
    about: [
      "BIG1カップは、麻将連合の中で最も長い歴史を持つタイトル戦。",
      "固定メンツの同卓者で3回戦を行い、上位2名が勝ち抜けるトーナメント戦を主に採用している。",
      "プロアマ予選はμカップルールでの半荘5回戦。4回戦終了時にマイナスの選手は敗退し、上位20％が全国大会参加資格を得る。",
    ],
    rules: [...MU_CUP_RULES, { label: "予選", value: "半荘5回戦・4回戦終了時マイナス敗退" }],
    pastChampions: [
      { ep: "29", year: "2025", name: "鹿 健太郎", current: true },
      { ep: "28", year: "2024", name: "地野 彰信" },
      { ep: "27", year: "2023", name: "地主 琢磨" },
    ],
    relatedTitles: [
      { slug: "shouou-isen", name: "将王戦" },
      { slug: "mu-m1-cup", name: "μ-M1カップ" },
    ],
  },
  {
    slug: "mu-m1-cup",
    href: "/titles/mu-m1-cup",
    code: "15 · μ-M1",
    name: "μ-M1カップ",
    shortName: "μ-M1",
    en: "The μ-M1 Cup",
    glyph: "μ",
    color: "#2f5c3f",
    org: "MU",
    orgLabel: "麻将連合-μ-",
    orgHref: "/organizations/mu",
    holder: { name: "中西 龍", note: "第23回" },
    season: "7月〜翌5月 月例予選 · 6月本戦",
    tags: ["μ", "月例予選", "μカップルール"],
    formatLabel: "月例予選 → 1次・2次戦 → 決勝大会",
    about: [
      "μ-M1カップは年間にわたって予選を開催する麻将連合のタイトル戦。",
      "毎年7月から翌年5月まで毎月第3日曜に月例予選を行い、6月に1次・2次戦と決勝大会を行う。",
      "月例予選は半荘4回＋1回戦。上位20％に本戦参加権利が与えられる。",
    ],
    rules: [...MU_CUP_RULES, { label: "月例予選", value: "半荘4回 + 1回戦" }],
    pastChampions: [
      { ep: "23", year: "2025", name: "中西 龍", current: true },
      { ep: "22", year: "2024", name: "明村 諭" },
    ],
    relatedTitles: [
      { slug: "shouou-isen", name: "将王戦" },
      { slug: "big1-cup", name: "BIG1カップ" },
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
  { key: "MU", label: "μ", en: "麻将連合-μ-", color: "#2f5c3f" },
];

export function getTitleBySlug(slug: string): TitleData | undefined {
  return TITLES.find((t) => t.slug === slug);
}
