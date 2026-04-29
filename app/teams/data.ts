// app/teams/data.ts
// Mリーグ 10チーム のデータ。
// データソース: Wikipedia (各チーム記事), Mリーグ公式サイト
// 備考: 2018-19シーズンに7チームで開幕、2020-21にKADOKAWAサクラナイツ、
// 2023-24にBEAST X (旧BEAST Japanext)、2025-26にEARTH JETSが加わり計10チーム体制。

export type SeasonResult = "champion" | "final" | "semifinal" | "regular" | "ongoing";

export interface TeamPlayer {
  id: string;        // Player#id (data.ts / roster の id と一致)
  role?: string;     // "選手", "選手兼監督", "現役Mリーガー" 等
}

export interface PastPlayer {
  name: string;
  years: string;
  note?: string;
}

export interface TeamSeason {
  season: string;
  rank?: number;
  points?: number;
  result?: SeasonResult;
  note?: string;
}

export interface TeamMilestone {
  year: string;
  kind: string;
  title: string;
  desc: string;
}

export interface TeamData {
  slug: string;
  name: string;
  shortName: string;
  nameEn: string;
  kanji: string;          // 1〜2文字、Hero でビッグ表示
  color: string;          // primary accent HEX (#付き)
  colorOnDark?: string;   // 文字色 (背景がダーク時)
  background?: string;    // 背景色 (HEX)
  parentCompany: string;
  parentCompanyEn?: string;
  parentCompanyHref?: string;
  founded: number;
  joinedSeason: string;   // "2018-19"
  coach: string;
  coachIsPlayer?: boolean;
  homeOrg?: string;       // "JPML", "最高位戦" 等 (在籍プロが特定団体に偏ってる場合)
  tagline: string;
  about: string[];
  currentRoster: TeamPlayer[];
  pastMembers: PastPlayer[];
  seasons: TeamSeason[];
  milestones: TeamMilestone[];
  championships: number;
  finalAppearances: number;
  social?: {
    label: string;
    href: string;
    handle?: string;
  }[];
}

export const TEAMS: TeamData[] = [
  // ── 1. 赤坂ドリブンズ ───────────────────────────────────────
  {
    slug: "drivens",
    name: "赤坂ドリブンズ",
    shortName: "ドリブンズ",
    nameEn: "Akasaka Drivens",
    kanji: "犀",
    color: "#c6ff4d",
    colorOnDark: "#e8ffb8",
    background: "#0f330f",
    parentCompany: "博報堂DYメディアパートナーズ",
    parentCompanyEn: "Hakuhodo DY Media Partners",
    parentCompanyHref: "https://www.hakuhodody-media.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "越山 剛",
    homeOrg: "最高位戦",
    tagline: "守備力の塊、初代王者の名門",
    about: [
      "赤坂ドリブンズは、博報堂DYメディアパートナーズが運営する麻雀プロチーム。Mリーグ初年度（2018-19）にいきなり優勝を果たし、初代王者として刻まれた。",
      "チーム名「ドリブンズ」(Drivens) は「driven=突き動かされる」を意味し、ロゴモチーフはサイ。重厚な守備力と粘り強い手筋が代名詞で、所属プロは最高位戦日本プロ麻雀協会のメンバー中心。",
      "監督の越山剛は元 博報堂アイ・スタジオ社員でMリーグ立ち上げにも関与した人物。創設メンバーである園田賢・鈴木たろう・村上淳らが「最高位戦の防御型集団」としてチームのアイデンティティを確立した。",
      "2024-25シーズンには浅見真紀が女流最高位を獲得するなど、新世代もタイトルを獲り始めている。",
    ],
    currentRoster: [
      { id: "sonoda", role: "創設メンバー" },
      { id: "suzuki-t", role: "創設メンバー" },
      { id: "asami", },
      { id: "watanabe", },
    ],
    pastMembers: [
      { name: "村上 淳", years: "2018-2023", note: "創設メンバー、2023年5月に契約満了" },
      { name: "丸山 奏子", years: "2019-2023", note: "2019年加入、2023年5月に契約満了" },
    ],
    seasons: [
      { season: "2018-19", rank: 1, points: 593.6, result: "champion", note: "初代王者" },
      { season: "2019-20", rank: 7, result: "regular" },
      { season: "2020-21", rank: 4, result: "final" },
      { season: "2021-22", rank: 7, result: "regular" },
      { season: "2022-23", rank: 7, result: "regular" },
      { season: "2023-24", rank: 2, result: "final", note: "準優勝" },
      { season: "2024-25", rank: 3, result: "final" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "2018年8月のドラフトで園田賢・村上淳・鈴木たろうの3名を指名し発足。" },
      { year: "2019", kind: "優勝", title: "Mリーグ2018-19 初代王者", desc: "Mリーグ初年度を制覇、初代王者に。" },
      { year: "2019", kind: "ドラフト", title: "丸山奏子が加入", desc: "2019年7月のドラフトで4人目として丸山奏子を指名、女性選手規定に対応。" },
      { year: "2023", kind: "退団", title: "村上淳・丸山奏子 契約満了", desc: "2023年5月、村上淳と丸山奏子が契約満了で離脱。" },
      { year: "2023", kind: "ドラフト", title: "浅見真紀・渡辺太 加入", desc: "2023年6月のドラフトで浅見真紀・渡辺太 (ともに最高位戦) を指名。" },
      { year: "2024", kind: "準優勝", title: "Mリーグ2023-24 準優勝", desc: "ファイナルで2位、優勝には届かずも復活を印象づけた。" },
    ],
    championships: 1,
    finalAppearances: 4,
    social: [
      { label: "公式X", href: "https://x.com/drivens_mleague", handle: "@drivens_mleague" },
    ],
  },

  // ── 2. EX風林火山 ───────────────────────────────────────
  {
    slug: "furinkazan",
    name: "EX風林火山",
    shortName: "風林火山",
    nameEn: "EX Furinkazan",
    kanji: "風",
    color: "#ff4040",
    background: "#5a0000",
    colorOnDark: "#ffe6e6",
    parentCompany: "テレビ朝日",
    parentCompanyEn: "TV Asahi",
    parentCompanyHref: "https://www.tv-asahi.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "二階堂 亜樹",
    coachIsPlayer: true,
    tagline: "其疾如風、其徐如林、侵掠如火、不動如山",
    about: [
      "EX風林火山は、テレビ朝日が運営するMリーグの初年度参入7チームの一つ。チーム名は武田信玄の軍旗から取られ、4人の選手それぞれが「風」「林」「火」「山」を体現するというコンセプトで構成される。",
      "勝又健志（風: 風のように速く判断する）、二階堂亜樹（林: 林のように静かに構える）、滝沢和典→現在は内川幸太郎・永井孝典（火: 火のように激しく攻める）、松ヶ瀬隆弥→現在は他選手（山: 山のように動かない守備）の役割分担で知られる。",
      "監督は2024年から二階堂亜樹が選手兼任で就任。Mリーグ2020-21シーズンに初優勝し、テレビ朝日系列の番組「Mリーグ中継」とも親和性の高いブランドとなっている。",
      "勝又健志は連盟の論理派エースであり、解説者としても多数の番組に出演。チームの「知性派」として支柱を担う。",
    ],
    currentRoster: [
      { id: "katsumata", role: "風 — 速やかに判断する" },
      { id: "nikaido-a", role: "林 — 選手兼監督" },
      { id: "nagai", role: "火 — 激しく攻める" },
      { id: "uchikawa", role: "山 — 動かぬ守備" },
    ],
    pastMembers: [
      { name: "滝沢 和典", years: "2018-2021", note: "創設メンバー、2021年退団後にKONAMIへ移籍" },
      { name: "松ヶ瀬 隆弥", years: "2021-2025", note: "RMU所属、2021年加入、2024-25シーズン後に契約満了" },
      { name: "二階堂 瑠美", years: "2021-2025", note: "JPML、2021年加入、2024-25シーズン後に契約満了" },
    ],
    seasons: [
      { season: "2018-19", rank: 2, result: "final", note: "ファイナル2位 (準優勝)" },
      { season: "2019-20", rank: 8, result: "regular" },
      { season: "2020-21", rank: 1, points: 489.0, result: "champion", note: "悲願の初優勝" },
      { season: "2021-22", rank: 5, result: "regular" },
      { season: "2022-23", rank: 4, result: "final" },
      { season: "2023-24", rank: 4, result: "final" },
      { season: "2024-25", rank: 8, result: "regular" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "二階堂亜樹・滝沢和典・勝又健志の3名で発足、初代監督は藤沢晴信。" },
      { year: "2019", kind: "準優勝", title: "Mリーグ2018-19 ファイナル2位", desc: "初年度からファイナルへ進出し2位、有力チームとしての存在を示す。" },
      { year: "2021", kind: "優勝", title: "Mリーグ2020-21 優勝", desc: "ファイナル制覇、悲願の初優勝。" },
      { year: "2021", kind: "退団・加入", title: "滝沢和典退団 / 松ヶ瀬・瑠美加入", desc: "滝沢和典が退団 (KONAMIへ移籍)、松ヶ瀬隆弥 (RMU) と二階堂瑠美 (JPML) が加入。" },
      { year: "2025", kind: "退団", title: "松ヶ瀬・瑠美 契約満了", desc: "2024-25シーズン後、松ヶ瀬隆弥と二階堂瑠美が契約満了で離脱。" },
      { year: "2025", kind: "新加入・監督交代", title: "永井孝典・内川幸太郎 加入、二階堂亜樹が選手兼監督に", desc: "2025年ドラフトで永井孝典 (最高位戦)・内川幸太郎 (JPML) を指名。同年から二階堂亜樹が選手兼監督として就任。" },
    ],
    championships: 1,
    finalAppearances: 4,
    social: [
      { label: "公式X", href: "https://x.com/EX_Furinkazan", handle: "@EX_Furinkazan" },
    ],
  },

  // ── 3. KONAMI麻雀格闘倶楽部 ──────────────────────────────
  {
    slug: "konami",
    name: "KONAMI麻雀格闘倶楽部",
    shortName: "格闘倶楽部",
    nameEn: "KONAMI Mahjong Fight Club",
    kanji: "格",
    color: "#e63946",
    background: "#1a1a1a",
    colorOnDark: "#ffffff",
    parentCompany: "コナミアミューズメント",
    parentCompanyEn: "Konami Amusement",
    parentCompanyHref: "https://www.konami.com/amusement/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "滝沢 和典",
    coachIsPlayer: true,
    homeOrg: "JPML",
    tagline: "高得点・攻撃型 — 麻雀格闘倶楽部の名を冠す",
    about: [
      "KONAMI麻雀格闘倶楽部は、コナミアミューズメントが運営するチーム。チーム名はゲームセンター用麻雀ゲーム「麻雀格闘倶楽部」シリーズに由来し、20年以上続く同ブランドのアイコンとなっている。",
      "Mリーグ初年度から参戦する古参チームで、佐々木寿人を看板に据える攻撃型集団。日本プロ麻雀連盟所属プロが中心。レギュラーシーズンの最多獲得ポイント記録 (2022-23 +1058.5) を保持。",
      "2021年にEX風林火山から滝沢和典がMリーグ史上初のチーム間移籍で加入。2025-26シーズンから滝沢が選手兼監督として就任した。",
      "佐々木寿人は「ヒサト」の愛称で親しまれ、JPML十段位×3を誇るタイトルホルダー。高宮まり・伊達朱里紗を擁する女流2名体制も特徴。",
    ],
    currentRoster: [
      { id: "sasaki", role: "創設メンバー" },
      { id: "takamiya", role: "創設メンバー" },
      { id: "date", },
      { id: "takizawa", role: "選手兼監督" },
    ],
    pastMembers: [
      { name: "藤崎 智", years: "2019-2020", note: "2019年加入、2020-21シーズン後に自由契約" },
    ],
    seasons: [
      { season: "2018-19", rank: 4, result: "final" },
      { season: "2019-20", rank: 5, result: "regular" },
      { season: "2020-21", rank: 5, result: "regular" },
      { season: "2021-22", rank: 4, result: "final" },
      { season: "2022-23", rank: 2, points: 1058.5, result: "final", note: "準優勝、レギュラー最多pt" },
      { season: "2023-24", rank: 6, result: "semifinal" },
      { season: "2024-25", rank: 5, result: "semifinal" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "2018年8月のドラフトで佐々木寿人・高宮まりら3名を指名し発足、初代監督は石田進矢。" },
      { year: "2019", kind: "ドラフト", title: "藤崎智 加入", desc: "2019年ドラフトで4人目として藤崎智 (連盟、十段位) を指名。" },
      { year: "2021", kind: "退団", title: "創設メンバー2名 自由契約", desc: "2020-21シーズン後、藤崎智ら2名が自由契約となる。" },
      { year: "2021", kind: "新加入", title: "滝沢和典・伊達朱里紗 加入", desc: "EX風林火山から滝沢和典が Mリーグ初のチーム間移籍で加入、伊達朱里紗 (連盟) も新規加入。" },
      { year: "2023", kind: "準優勝", title: "Mリーグ2022-23 準優勝", desc: "ファイナル2位、レギュラーシーズン首位通過 (1058.5pt の最多記録) からの惜敗。" },
      { year: "2025", kind: "監督交代", title: "滝沢和典が選手兼監督に", desc: "植松斎永から交代、2025-26シーズンより滝沢が監督職を兼任。" },
    ],
    championships: 0,
    finalAppearances: 3,
    social: [
      { label: "公式X", href: "https://x.com/Konami_FC", handle: "@Konami_FC" },
    ],
  },

  // ── 4. 渋谷ABEMAS ────────────────────────────────────
  {
    slug: "abemas",
    name: "渋谷ABEMAS",
    shortName: "ABEMAS",
    nameEn: "Shibuya ABEMAS",
    kanji: "渋",
    color: "#E4BD7A",
    background: "#1A1A1A",
    colorOnDark: "#E4BD7A",
    parentCompany: "サイバーエージェント",
    parentCompanyEn: "CyberAgent",
    parentCompanyHref: "https://www.cyberagent.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "塚本 泰隆",
    tagline: "麻雀星人・多井隆晴を旗手とするスター軍団",
    about: [
      "渋谷ABEMASは、サイバーエージェントが運営する初年度参入チーム。「ABEMA」のロゴと渋谷の「渋」を象った稲妻と王冠のロゴが特徴。",
      "創設メンバーの多井隆晴 (RMU代表) は「麻雀星人」「最速最強」の異名を持つMリーグの顔的存在。Mリーグ全シーズンで個人ポイント1位を記録するなど、リーグを象徴するスーパープレイヤー。",
      "2022-23シーズンに悲願のチーム初優勝を果たした。多井 (RMU) に加え、白鳥翔 (連盟・現鳳凰位)、松本吉弘 (協会)、日向藍子 (最高位戦) と所属団体が4人ともすべて異なる、Mリーグ唯一の構成。",
      "監督の塚本泰隆はサイバーエージェント所属でMリーグ立ち上げ期から関与する。ABEMA TVの公式中継のホームチームでもあり、メディア露出の多さが特徴。",
    ],
    currentRoster: [
      { id: "taii", role: "創設メンバー · 麻雀星人" },
      { id: "shiratori", role: "創設メンバー · 現鳳凰位" },
      { id: "matsumoto", role: "創設メンバー" },
      { id: "hinata", },
    ],
    pastMembers: [],
    seasons: [
      { season: "2018-19", rank: 3, result: "final" },
      { season: "2019-20", rank: 3, result: "final" },
      { season: "2020-21", rank: 3, result: "final" },
      { season: "2021-22", rank: 3, result: "final" },
      { season: "2022-23", rank: 1, result: "champion", note: "悲願の初優勝" },
      { season: "2023-24", rank: 5, result: "semifinal" },
      { season: "2024-25", rank: 6, result: "semifinal" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで多井隆晴・白鳥翔・松本吉弘の3名を指名し発足。" },
      { year: "2019", kind: "新加入", title: "日向藍子加入", desc: "男女混合義務化に伴い、4人目として日向藍子 (最高位戦) を指名。" },
      { year: "2022", kind: "進出", title: "5年連続ファイナル進出", desc: "2018-19から2022-23まで全シーズンファイナル進出を達成。" },
      { year: "2023", kind: "優勝", title: "Mリーグ2022-23 優勝", desc: "5年目で悲願の初優勝。多井隆晴の活躍が光る。" },
      { year: "2025", kind: "タイトル", title: "白鳥翔が第41期鳳凰位獲得", desc: "連盟最高峰タイトルを獲得。翌年の第42期も連覇。" },
    ],
    championships: 1,
    finalAppearances: 5,
    social: [
      { label: "公式X", href: "https://x.com/ABEMAS_M", handle: "@ABEMAS_M" },
    ],
  },

  // ── 5. セガサミーフェニックス ──────────────────────────────
  {
    slug: "phoenix",
    name: "セガサミーフェニックス",
    shortName: "フェニックス",
    nameEn: "Sega Sammy Phoenix",
    kanji: "鳳",
    color: "#F27100",
    background: "#1A1A1A",
    colorOnDark: "#ffb469",
    parentCompany: "セガサミーホールディングス",
    parentCompanyEn: "Sega Sammy Holdings",
    parentCompanyHref: "https://www.segasammy.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "茅森 早香",
    coachIsPlayer: true,
    homeOrg: "最高位戦",
    tagline: "不死鳥のごとく — 7年目の悲願を達成",
    about: [
      "セガサミーフェニックスは、セガサミーホールディングスが運営する初年度参入チーム。チーム名通り「不死鳥」をモチーフとし、チームカラーはオレンジ。",
      "2018年の創設から長らく優勝を逃していたが、Mリーグ2024-25シーズンでついに悲願の初優勝を達成。「不死鳥のごとく蘇る」というチーム理念を体現する形となった。",
      "創設メンバーは魚谷侑未 (最高位戦)・近藤誠一 (最高位戦)・茅森早香 (最高位戦) の3名。2019年に和久津晶を加え4人体制となった。",
      "2024-25シーズンに大規模な世代交代を経て、醍醐大 (連盟・2023年加入)、竹内元太 (最高位戦・2024年加入)、浅井堂岐 (協会・2024年加入) と、創設以来唯一残った茅森早香で構成された新生フェニックスが頂点を獲った。茅森は2025-26シーズンより選手兼監督に就任。",
    ],
    currentRoster: [
      { id: "kayamori", role: "創設メンバー · 選手兼監督" },
      { id: "daigo", },
      { id: "takeuchi", },
      { id: "asai", },
    ],
    pastMembers: [
      { name: "魚谷 侑未", years: "2018-2024", note: "創設メンバー、2023-24シーズン後に契約満了" },
      { name: "近藤 誠一", years: "2018-2025", note: "創設メンバー、2022-23まで選手・2023-25は監督として在籍、2024-25シーズン優勝後に退任" },
      { name: "和久津 晶", years: "2019-2021", note: "2019年加入、2020-21シーズン後に契約満了" },
      { name: "東城 りお", years: "2021-2024", note: "2021年加入、2023-24シーズン後に契約満了" },
    ],
    seasons: [
      { season: "2018-19", rank: 6, result: "regular" },
      { season: "2019-20", rank: 2, result: "final", note: "準優勝" },
      { season: "2020-21", rank: 8, result: "regular" },
      { season: "2021-22", rank: 2, result: "final", note: "準優勝" },
      { season: "2022-23", rank: 8, result: "regular" },
      { season: "2023-24", rank: 9, result: "regular" },
      { season: "2024-25", rank: 1, result: "champion", note: "悲願の初優勝" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで魚谷侑未・近藤誠一・茅森早香の3名を指名し発足、初代監督は高畑大輔。" },
      { year: "2019", kind: "新加入", title: "和久津晶加入", desc: "男女混合4人体制への変更に伴い、4人目として和久津晶 (連盟) を指名。" },
      { year: "2020", kind: "準優勝", title: "Mリーグ2019-20 準優勝", desc: "ファイナル2位、初年度の悔しさを晴らす形でファイナル進出。" },
      { year: "2022", kind: "準優勝", title: "Mリーグ2021-22 準優勝", desc: "2度目のファイナル進出も、サクラナイツに惜敗。" },
      { year: "2023", kind: "監督交代", title: "近藤誠一が監督就任", desc: "2018年から選手として在籍した近藤誠一が引退し、2023-24シーズンから監督に就任。後任の選手として醍醐大が加入。" },
      { year: "2024", kind: "新加入", title: "竹内元太・浅井堂岐 加入", desc: "2024年6月のドラフトで竹内元太 (最高位戦) と浅井堂岐 (協会) を指名。" },
      { year: "2025", kind: "優勝", title: "Mリーグ2024-25 優勝", desc: "7年目にしてついに悲願の初優勝、醍醐大がMVPを獲得。近藤監督は退任。" },
      { year: "2025", kind: "監督交代", title: "茅森早香が選手兼監督に", desc: "2025-26シーズンから創設以来の最古参・茅森が選手兼監督として指揮。" },
    ],
    championships: 1,
    finalAppearances: 3,
    social: [
      { label: "公式X", href: "https://x.com/SS_Phoenix", handle: "@SS_Phoenix" },
    ],
  },

  // ── 6. TEAM RAIDEN / 雷電 ──────────────────────────────
  {
    slug: "raiden",
    name: "TEAM RAIDEN / 雷電",
    shortName: "雷電",
    nameEn: "Team Raiden",
    kanji: "雷",
    color: "#ffd91a",
    background: "#1A1A1A",
    colorOnDark: "#ffd91a",
    parentCompany: "電通",
    parentCompanyEn: "Dentsu",
    parentCompanyHref: "https://www.dentsu.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "高柳 寛哉",
    homeOrg: "JPML",
    tagline: "雷神を掲げる連盟の重鎮チーム",
    about: [
      "TEAM RAIDEN/雷電は、電通が運営するMリーグ初年度参入チーム。日本プロ麻雀連盟所属プロのみで構成される、Mリーグ唯一の単一団体チーム。",
      "創設メンバーは萩原聖人 (俳優プロ)・瀬戸熊直樹・黒沢咲の3名。萩原聖人はドラフト1位指名で加入し、俳優としての知名度とプロ雀士としての実力でMリーグの顔となっている。",
      "瀬戸熊直樹は連盟「卓上の暴君」「クマクマタイム」と称される攻撃型ベテラン (鳳凰位3連覇経験者)、黒沢咲は連盟初の女流A1リーガー、本田朋広 (2021年加入) は若手のホープと、世代バランスのとれた布陣。",
      "Mリーグ通算でファイナル進出は2回 (2022-23・2024-25)、優勝は未経験。攻撃型「全部和了る」スタイルが代名詞で、爆発力と粘り強さの振れ幅が大きいチーム。",
    ],
    currentRoster: [
      { id: "hagiwara", role: "創設メンバー · 俳優プロ" },
      { id: "setokuma", role: "創設メンバー · 鳳凰位3連覇" },
      { id: "kurosawa", role: "創設メンバー" },
      { id: "honda", },
    ],
    pastMembers: [],
    seasons: [
      { season: "2018-19", rank: 7, result: "regular", note: "初年度最下位" },
      { season: "2019-20", rank: 6, result: "regular" },
      { season: "2020-21", rank: 6, result: "regular" },
      { season: "2021-22", rank: 8, result: "regular" },
      { season: "2022-23", rank: 3, result: "final", note: "初のファイナル進出" },
      { season: "2023-24", rank: 8, result: "regular" },
      { season: "2024-25", rank: 4, result: "final" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで萩原聖人 (1位)・瀬戸熊直樹・黒沢咲の3名を指名し発足。" },
      { year: "2021", kind: "新加入", title: "本田朋広加入", desc: "4人体制化に伴い、2021年ドラフトで連盟若手の本田朋広を指名。" },
      { year: "2023", kind: "進出", title: "Mリーグ2022-23 初のファイナル進出", desc: "参戦5年目で初のファイナル進出 (3位)。萩原・瀬戸熊・黒沢・本田の現編成で勢いに乗る。" },
      { year: "2025", kind: "進出", title: "Mリーグ2024-25 ファイナル進出", desc: "2度目のファイナル進出 (4位)。創設以来不変のロスター・ベテランの粘りで結果を出す。" },
    ],
    championships: 0,
    finalAppearances: 2,
    social: [
      { label: "公式X", href: "https://x.com/RaidenTeam", handle: "@RaidenTeam" },
    ],
  },

  // ── 7. U-NEXT Pirates ──────────────────────────────
  {
    slug: "pirates",
    name: "U-NEXT Pirates",
    shortName: "Pirates",
    nameEn: "U-NEXT Pirates",
    kanji: "海",
    color: "#3DDFFF",
    background: "#161666",
    colorOnDark: "#3DDFFF",
    parentCompany: "U-NEXT",
    parentCompanyEn: "U-NEXT",
    parentCompanyHref: "https://unext.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "木下 尚",
    tagline: "海賊団 — 麻雀界に新風を吹き込む論理派集団",
    about: [
      "U-NEXT Piratesは、動画配信サービスU-NEXTが運営するMリーグ初年度参入チーム。チーム名通り「海賊団」をモチーフとし、未開の海を切り開く挑戦者集団というコンセプト。",
      "Mリーグ史上唯一の2回優勝チーム (2019-20, 2023-24)。論理派・データ派の選手が中心で「麻雀サイボーグ」小林剛 (μ)、「論理派の女流」瑞原明奈 (最高位戦)、「最強戦の申し子」鈴木優 (最高位戦)、「海賊の司令塔」仲林圭 (協会) と所属団体が4人ともすべて異なる構成。",
      "2021-22シーズンに瑞原明奈が女性初のMリーグMVPを獲得、2023-24シーズンには鈴木優がMVPに輝きチームを2度目の優勝に導いた。創設メンバーの朝倉康心・石橋伸洋は2021-22シーズン後に退団、2022年のドラフトで鈴木優・仲林圭が加入し「シン・パイレーツ」として再出発した。",
      "監督の木下尚はU-NEXT社員でMリーグ立ち上げから関与する。チームカラーは紺と青で、海賊船と稲妻のロゴ。",
    ],
    currentRoster: [
      { id: "kobayashi", role: "創設メンバー · 麻雀サイボーグ" },
      { id: "mizuhara", role: "元MVP" },
      { id: "suzuki-y", role: "元MVP" },
      { id: "nakabayashi", },
    ],
    pastMembers: [
      { name: "朝倉 康心", years: "2018-2022", note: "創設メンバー (μ)、2021-22シーズン後に契約満了、現Mリーグ解説者" },
      { name: "石橋 伸洋", years: "2018-2022", note: "創設メンバー (最高位戦)、2021-22シーズン後に契約満了、現Mリーグ解説者" },
    ],
    seasons: [
      { season: "2018-19", rank: 5, result: "regular" },
      { season: "2019-20", rank: 1, result: "champion", note: "初優勝" },
      { season: "2020-21", rank: 7, result: "regular" },
      { season: "2021-22", rank: 6, result: "regular", note: "瑞原明奈MVP" },
      { season: "2022-23", rank: 5, result: "regular" },
      { season: "2023-24", rank: 1, result: "champion", note: "2回目の優勝、鈴木優MVP" },
      { season: "2024-25", rank: 2, result: "final", note: "準優勝" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで小林剛 (μ)・朝倉康心 (μ)・石橋伸洋 (最高位戦) の3名を指名し発足。" },
      { year: "2019", kind: "新加入", title: "瑞原明奈加入", desc: "男女混合4人体制への変更に伴い、2019年ドラフトで瑞原明奈 (最高位戦) を指名。" },
      { year: "2020", kind: "優勝", title: "Mリーグ2019-20 初優勝", desc: "参入2年目でファイナル制覇、初優勝。" },
      { year: "2022", kind: "MVP", title: "瑞原明奈 Mリーグ MVP", desc: "Mリーグ2021-22で女性初のMVPを獲得。" },
      { year: "2022", kind: "退団", title: "朝倉康心・石橋伸洋 退団", desc: "創設メンバーの朝倉康心と石橋伸洋が2021-22シーズン後に契約満了で退団。" },
      { year: "2022", kind: "新加入", title: "鈴木優・仲林圭 加入", desc: "2022年のドラフトで鈴木優 (最高位戦) と仲林圭 (協会) を同時指名。Mリーグ2022-23シーズンから「シン・パイレーツ」として参戦。" },
      { year: "2024", kind: "優勝", title: "Mリーグ2023-24 2度目の優勝", desc: "Mリーグ史上初の2回優勝チームに。鈴木優がMVP、レギュラーシーズン首位通過からファイナル制覇。" },
    ],
    championships: 2,
    finalAppearances: 3,
    social: [
      { label: "公式X", href: "https://x.com/U_NEXT_Pirates", handle: "@U_NEXT_Pirates" },
    ],
  },

  // ── 8. KADOKAWAサクラナイツ ─────────────────────────────
  {
    slug: "sakura-knights",
    name: "KADOKAWAサクラナイツ",
    shortName: "サクラナイツ",
    nameEn: "KADOKAWA Sakura Knights",
    kanji: "桜",
    color: "#ffccf5",
    background: "#1A1A1A",
    colorOnDark: "#ffccf5",
    parentCompany: "KADOKAWA",
    parentCompanyEn: "KADOKAWA",
    parentCompanyHref: "https://group.kadokawa.co.jp/",
    founded: 2019,
    joinedSeason: "2019-20",
    coach: "森井 巧",
    tagline: "桜の騎士団 — 連覇の名門",
    about: [
      "KADOKAWAサクラナイツは、KADOKAWAが運営する2019-20シーズンからの参入チーム (8番目)。所沢のサクラタウン・KADOKAWAの城下町をイメージし「桜の騎士団」をコンセプトに発足。",
      "創設メンバーは内川幸太郎 (連盟)・沢崎誠 (連盟)・岡田紗佳 (連盟) の3名で、2020年に堀慎吾 (協会) が加入し4人体制となった。2021-22シーズンに参入3年目で初優勝を達成。",
      "所属プロは多団体に渡り、岡田紗佳 (連盟)、堀慎吾 (協会→2026年連盟移籍)、渋川難波 (協会)、阿久津翔太 (連盟) という構成。岡田紗佳はモデル・タレント・声優としても活動するMリーグ広報の象徴的存在。",
      "2024-25シーズンを最終順位7位で終え、チーム創設以来初めてセミファイナル進出を逃した。オフに内川幸太郎 (現EX風林火山) との契約満了を発表し、2025年ドラフトで阿久津翔太を指名した。",
    ],
    currentRoster: [
      { id: "okada", role: "モデル兼業" },
      { id: "hori", role: "元雀王" },
      { id: "shibukawa", },
      { id: "akutsu", },
    ],
    pastMembers: [
      { name: "内川 幸太郎", years: "2019-2025", note: "JPML、創設メンバー、2024-25シーズン後に契約満了。現EX風林火山" },
      { name: "沢崎 誠", years: "2019-2022", note: "JPML、創設メンバー、2021-22シーズン後に契約満了" },
    ],
    seasons: [
      { season: "2019-20", rank: 4, result: "final" },
      { season: "2020-21", rank: 2, result: "final", note: "準優勝" },
      { season: "2021-22", rank: 1, result: "champion", note: "初優勝" },
      { season: "2022-23", rank: 6, result: "regular" },
      { season: "2023-24", rank: 3, result: "final" },
      { season: "2024-25", rank: 7, result: "regular", note: "創設以来初のセミファイナル逃し" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2019", kind: "設立", title: "Mリーグ8番目のチームとして参入", desc: "ドラフトで内川幸太郎・沢崎誠・岡田紗佳の3名を指名し発足、初代監督は森井巧 (現職)。" },
      { year: "2020", kind: "新加入", title: "堀慎吾加入", desc: "4人体制への変更に伴い、4人目として堀慎吾 (協会) を指名。" },
      { year: "2022", kind: "優勝", title: "Mリーグ2021-22 初優勝", desc: "参入3年目で初優勝、新参チームの旋風。" },
      { year: "2022", kind: "退団・新加入", title: "沢崎誠退団 / 渋川難波加入", desc: "創設メンバーの沢崎誠が契約満了、後任として渋川難波 (協会) が加入。" },
      { year: "2025", kind: "退団", title: "内川幸太郎退団", desc: "創設メンバーの内川が契約満了、その後EX風林火山へ移籍。" },
      { year: "2025", kind: "新加入", title: "阿久津翔太加入", desc: "2025年ドラフトで連盟最年少A1リーガーの阿久津翔太を指名。" },
      { year: "2026", kind: "移籍", title: "堀慎吾が連盟へ団体移籍", desc: "2026年1月、堀慎吾が日本プロ麻雀協会から日本プロ麻雀連盟へ電撃移籍。" },
    ],
    championships: 1,
    finalAppearances: 4,
    social: [
      { label: "公式X", href: "https://x.com/Sakura_Knights", handle: "@Sakura_Knights" },
    ],
  },

  // ── 9. BEAST X ──────────────────────────────
  {
    slug: "beast-x",
    name: "BEAST X",
    shortName: "BEAST X",
    nameEn: "BEAST X",
    kanji: "獣",
    color: "#6b7a3c",
    background: "#2d3f23",
    colorOnDark: "#e0d4a3",
    parentCompany: "BS10",
    parentCompanyEn: "BS10 (旧BS Japanext)",
    parentCompanyHref: "https://www.bs10.jp/",
    founded: 2023,
    joinedSeason: "2023-24",
    coach: "高橋 暁",
    tagline: "9番目のチーム — 異色の精鋭軍団",
    about: [
      "BEAST X (旧 BEAST Japanext) は、衛星放送局BS10 (旧BS Japanext) が運営するMリーグ9番目の参入チーム。2023-24シーズンに開幕。",
      "創設メンバーは鈴木大介 (連盟)・中田花奈 (連盟)・猿川真寿 (協会)・菅原千瑛 (連盟) の4名。鈴木大介はB級1組経験のある元将棋棋士で、連盟入りから僅かな期間でMリーガーに抜擢された異色の存在。中田花奈は乃木坂46を卒業後にプロ入りという経歴で、Mリーグの女流ファン拡大に貢献している。",
      "2024-25シーズン後に猿川真寿・菅原千瑛が契約満了で退団。2025年ドラフトで下石戟 (協会) と東城りお (最高位戦・元フェニックス) を指名し、新生BEAST Xとして再出発。",
      "監督の高橋暁はBS10社員。チームカラーはターコイズと白で、ロゴは野獣 (Beast) と「X」を組み合わせたデザイン。2025年から「BEAST Japanext」改め「BEAST X」に名称変更。",
    ],
    currentRoster: [
      { id: "suzuki-d", role: "創設メンバー · 元将棋棋士" },
      { id: "nakata", role: "創設メンバー · 元乃木坂46" },
      { id: "shimoishi", },
      { id: "tojo", },
    ],
    pastMembers: [
      { name: "猿川 真寿", years: "2023-2025", note: "協会、創設メンバー、2024-25シーズン後に契約満了" },
      { name: "菅原 千瑛", years: "2023-2025", note: "連盟、創設メンバー、2024-25シーズン後に契約満了" },
    ],
    seasons: [
      { season: "2023-24", rank: 7, result: "regular", note: "初年度" },
      { season: "2024-25", rank: 9, result: "regular" },
      { season: "2025-26", result: "ongoing" },
    ],
    milestones: [
      { year: "2023", kind: "設立", title: "Mリーグ9番目のチームとして参入", desc: "鈴木大介・中田花奈・猿川真寿・菅原千瑛の4名で発足、BEAST Japanextとして開幕。" },
      { year: "2025", kind: "名称変更", title: "BEAST Xに改称", desc: "親会社BS Japanextが BS10 に再編されるのに伴い「BEAST X」へ。" },
      { year: "2025", kind: "退団", title: "猿川真寿・菅原千瑛 退団", desc: "2024-25シーズン後、創設メンバーの猿川と菅原が契約満了で退団。" },
      { year: "2025", kind: "新加入", title: "下石戟・東城りお 加入", desc: "2025年ドラフトで下石戟 (協会) と東城りお (最高位戦) を指名。" },
    ],
    championships: 0,
    finalAppearances: 0,
    social: [
      { label: "公式X", href: "https://x.com/BeastX_M", handle: "@BeastX_M" },
    ],
  },

  // ── 10. EARTH JETS ──────────────────────────────
  {
    slug: "earth-jets",
    name: "EARTH JETS",
    shortName: "EARTH JETS",
    nameEn: "Earth Jets",
    kanji: "地",
    color: "#1E9627",
    background: "#058046",
    colorOnDark: "#FFFFFF",
    parentCompany: "アース製薬",
    parentCompanyEn: "Earth Corporation",
    parentCompanyHref: "https://corp.earth.jp/",
    founded: 2025,
    joinedSeason: "2025-26",
    coach: "川村 芳範",
    tagline: "10番目のチーム — 新時代の旗手",
    about: [
      "EARTH JETSは、アース製薬が運営するMリーグ10番目の参入チーム。2025-26シーズンから開幕、Mリーグを8年ぶりに10チーム体制へ拡大した節目の存在。",
      "創設メンバーは最高位戦の若手エース石井一馬 (第49期最高位)、連盟の三浦智博 (十段位×2)、協会の永世女流雀王・逢川恵夢、連盟の鳳凰位経験者HIRO柴田の4名。タイトル経験豊富なベテランと若手のミックス布陣。",
      "チームカラーは緑色で、アース製薬の企業カラーと連動。ロゴはカメレオンと虫取り網を組み合わせたデザインで、虫除け製品メーカーらしいユーモア。",
      "監督の川村芳範はアース製薬の役員。新参チームながら個人タイトルホルダーが揃っており、初年度から優勝候補と目されている。",
    ],
    currentRoster: [
      { id: "ishii", role: "創設メンバー · 第49期最高位" },
      { id: "miura", role: "創設メンバー · 十段位×2" },
      { id: "aikawa", role: "創設メンバー · 永世女流雀王" },
      { id: "hiro-shibata", role: "創設メンバー · 鳳凰位経験者" },
    ],
    pastMembers: [],
    seasons: [
      { season: "2025-26", result: "ongoing", note: "新規参入初年度" },
    ],
    milestones: [
      { year: "2025", kind: "設立", title: "Mリーグ10番目のチームとして参入", desc: "石井一馬・三浦智博・逢川恵夢・HIRO柴田の4名で発足、Mリーグを10チーム体制に。" },
      { year: "2025", kind: "コラボ", title: "アース製薬商品とのコラボ", desc: "アース製薬の製品PRとMリーグ広告が連動。" },
    ],
    championships: 0,
    finalAppearances: 0,
    social: [
      { label: "公式X", href: "https://x.com/EARTH_JETS_M", handle: "@EARTH_JETS_M" },
    ],
  },
];

export function getTeamBySlug(slug: string): TeamData | undefined {
  return TEAMS.find((t) => t.slug === slug);
}

// チーム名 (data.ts の `mleagueTeam` 文字列) からスラッグへ変換
export const TEAM_NAME_TO_SLUG: Record<string, string> = {
  "BEAST X": "beast-x",
  "EX風林火山": "furinkazan",
  "TEAM RAIDEN / 雷電": "raiden",
  "KONAMI麻雀格闘倶楽部": "konami",
  "セガサミーフェニックス": "phoenix",
  "赤坂ドリブンズ": "drivens",
  "U-NEXT Pirates": "pirates",
  "渋谷ABEMAS": "abemas",
  "EARTH JETS": "earth-jets",
  "KADOKAWAサクラナイツ": "sakura-knights",
};
