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
  coachLabel?: string;
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
    // 公式バナー準拠の mid-green（前は #c6ff4d で lime に寄りすぎ）
    // 旧 lime は colorOnDark に残してアクセントで使う
    name: "赤坂ドリブンズ",
    shortName: "ドリブンズ",
    nameEn: "Akasaka Drivens",
    kanji: "犀",
    color: "#6fc83a",
    colorOnDark: "#c6ff4d",
    background: "#0f330f",
    parentCompany: "株式会社博報堂",
    parentCompanyEn: "Hakuhodo",
    parentCompanyHref: "https://www.hakuhodo.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "越山 剛",
    homeOrg: "最高位戦",
    tagline: "最高位戦4名で戦う、Mリーグ初代王者",
    about: [
      "赤坂ドリブンズは、株式会社博報堂がオーナー企業のMリーグ初年度参入チーム。2018-19シーズンに優勝し、Mリーグ初代王者となった。",
      "チームマスコットは、Drivensのロゴを変形させたサイ。",
      "創設メンバーは園田賢、村上淳、鈴木たろうの3名。2019年に丸山奏子が加入し、2023年に村上淳・丸山奏子が契約満了となった。",
      "2023年ドラフトで浅見真紀と渡辺太を指名。以降は園田賢、鈴木たろう、浅見真紀、渡辺太の最高位戦日本プロ麻雀協会所属4名で戦っている。",
      "2023-24シーズンは準優勝、2024-25シーズンはレギュラーシーズン1位からファイナル3位。2025-26シーズンはレギュラーシーズン4位でセミファイナルへ進み、最終6位で敗退した。",
      "監督は越山剛。2018年のチーム発足時から監督を務めている。",
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
      { season: "2025-26", rank: 6, result: "semifinal", note: "セミファイナル6位" },
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
    parentCompany: "株式会社テレビ朝日",
    parentCompanyEn: "TV Asahi",
    parentCompanyHref: "https://www.tv-asahi.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "二階堂 亜樹",
    coachIsPlayer: true,
    tagline: "疾如風、徐如林、侵掠如火、不動如山",
    about: [
      "EX風林火山は、株式会社テレビ朝日が運営するMリーグのチーム。Mリーグ初年度の2018-19シーズンから参戦している。",
      "チーム名は、武田信玄の軍旗として知られる「風林火山」に由来する。「疾如風、徐如林、侵掠如火、不動如山」を掲げる。",
      "2025-26シーズンの所属選手は、二階堂亜樹、勝又健志、永井孝典、内川幸太郎の4名。二階堂亜樹は監督も務める。",
      "Mリーグ2020-21シーズンに初優勝し、2025-26シーズンに2度目の優勝を果たした。",
    ],
    currentRoster: [
      { id: "katsumata" },
      { id: "nikaido-a", role: "選手兼監督" },
      { id: "nagai" },
      { id: "uchikawa" },
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
      { season: "2021-22", rank: 5, result: "semifinal" },
      { season: "2022-23", rank: 4, result: "final" },
      { season: "2023-24", rank: 4, result: "final" },
      { season: "2024-25", rank: 8, result: "regular" },
      { season: "2025-26", rank: 1, points: 268.8, result: "champion", note: "2回目の優勝" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "二階堂亜樹・滝沢和典・勝又健志の3名で発足、初代監督は藤沢晴信。" },
      { year: "2019", kind: "準優勝", title: "Mリーグ2018-19 ファイナル2位", desc: "初年度からファイナルへ進出し2位でシーズンを終えた。" },
      { year: "2021", kind: "優勝", title: "Mリーグ2020-21 優勝", desc: "ファイナルを1位で終え、チーム初優勝。" },
      { year: "2021", kind: "退団・加入", title: "滝沢和典退団 / 松ヶ瀬・瑠美加入", desc: "滝沢和典が退団 (KONAMIへ移籍)、松ヶ瀬隆弥 (RMU) と二階堂瑠美 (JPML) が加入。" },
      { year: "2025", kind: "退団", title: "松ヶ瀬・瑠美 契約満了", desc: "2024-25シーズン後、松ヶ瀬隆弥と二階堂瑠美が契約満了で離脱。" },
      { year: "2025", kind: "新加入・監督交代", title: "永井孝典・内川幸太郎 加入、二階堂亜樹が選手兼監督に", desc: "2025年ドラフトで永井孝典 (最高位戦)・内川幸太郎 (JPML) を指名。同年から二階堂亜樹が選手兼監督として就任。" },
    ],
    championships: 2,
    finalAppearances: 5,
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
    tagline: "麻雀格闘倶楽部の名を冠するKONAMIチーム",
    about: [
      "KONAMI麻雀格闘倶楽部は、コナミアミューズメントが運営するMリーグチーム。チーム名はアーケード麻雀ゲーム「麻雀格闘倶楽部」シリーズに由来する。",
      "創設メンバーは佐々木寿人、高宮まり、前原雄大の3名。2019年ドラフトで藤崎智を指名し、4人体制となった。",
      "2020-21シーズン後に前原雄大と藤崎智が自由契約となり、2021年ドラフトで滝沢和典と伊達朱里紗を指名。滝沢はEX風林火山からの移籍で加入した。",
      "2022-23シーズンはレギュラーシーズンを1058.5ptで首位通過し、ファイナル2位。2025-26シーズンから滝沢和典が選手兼監督を務めている。",
    ],
    currentRoster: [
      { id: "sasaki", role: "創設メンバー" },
      { id: "takamiya", role: "創設メンバー" },
      { id: "date", },
      { id: "takizawa", role: "選手兼監督" },
    ],
    pastMembers: [
      { name: "前原 雄大", years: "2018-2021", note: "創設メンバー、2020-21シーズン後に自由契約" },
      { name: "藤崎 智", years: "2019-2020", note: "2019年加入、2020-21シーズン後に自由契約" },
    ],
    seasons: [
      { season: "2018-19", rank: 4, result: "final" },
      { season: "2019-20", rank: 5, result: "semifinal" },
      { season: "2020-21", rank: 5, result: "semifinal" },
      { season: "2021-22", rank: 4, result: "final" },
      { season: "2022-23", rank: 2, points: 1058.5, result: "final", note: "準優勝、レギュラー最多pt" },
      { season: "2023-24", rank: 6, result: "semifinal" },
      { season: "2024-25", rank: 5, result: "semifinal" },
      { season: "2025-26", rank: 2, points: 124.7, result: "final", note: "準優勝" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "2018年8月のドラフトで佐々木寿人・高宮まり・前原雄大を指名し発足、初代監督は石田進矢。" },
      { year: "2019", kind: "ドラフト", title: "藤崎智 加入", desc: "2019年ドラフトで4人目として藤崎智 (連盟、十段位) を指名。" },
      { year: "2021", kind: "退団", title: "前原雄大・藤崎智 自由契約", desc: "2020-21シーズン後、前原雄大と藤崎智が自由契約となった。" },
      { year: "2021", kind: "新加入", title: "滝沢和典・伊達朱里紗 加入", desc: "EX風林火山から滝沢和典が Mリーグ初のチーム間移籍で加入、伊達朱里紗 (連盟) も新規加入。" },
      { year: "2023", kind: "準優勝", title: "Mリーグ2022-23 準優勝", desc: "ファイナル2位、レギュラーシーズン首位通過 (1058.5pt の最多記録) からの惜敗。" },
      { year: "2025", kind: "監督交代", title: "滝沢和典が選手兼監督に", desc: "植松斎永から交代、2025-26シーズンより滝沢が監督職を兼任。" },
      { year: "2026", kind: "準優勝", title: "Mリーグ2025-26 準優勝", desc: "ファイナル2位でシーズンを終えた。" },
    ],
    championships: 0,
    finalAppearances: 4,
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
    parentCompany: "株式会社サイバーエージェント",
    parentCompanyEn: "CyberAgent",
    parentCompanyHref: "https://www.cyberagent.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "塚本 泰隆",
    tagline: "Mリーグ唯一、四団体混成チーム",
    about: [
      "渋谷ABEMASは、株式会社サイバーエージェントが運営するMリーグ初年度参入チーム。自社キャラクターのアベマくんと、創業以来の拠点である渋谷をモチーフに命名された。",
      "チームロゴは、渋谷の「渋」の字を稲妻と王冠で表し、白いスクエアの雀卓でフェアプレーの姿勢を示している。",
      "創設メンバーは多井隆晴、白鳥翔、松本吉弘の3名。2019年に日向藍子が加入して以降、選手の入れ替えなく4人体制を続けている。",
      "2022-23シーズンにチーム初優勝を達成。2018-19から2022-23まで5年連続でファイナルに進出し、2023-24と2024-25はセミファイナル、2025-26はレギュラーシーズン7位で敗退した。",
      "多井隆晴は2018-19シーズンのレギュラーシーズンMVP。多井 (RMU)、白鳥翔 (日本プロ麻雀連盟)、松本吉弘 (日本プロ麻雀協会)、日向藍子 (最高位戦日本プロ麻雀協会) と所属団体が4人とも異なる構成になっている。",
      "監督は2023-24シーズンから塚本泰隆。初年度から2022-23シーズンまでは藤田晋が監督を務めていた。",
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
      { season: "2025-26", rank: 7, result: "regular" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで多井隆晴・白鳥翔・松本吉弘の3名を指名し発足。" },
      { year: "2019", kind: "新加入", title: "日向藍子加入", desc: "男女混合義務化に伴い、4人目として日向藍子 (最高位戦) を指名。" },
      { year: "2023", kind: "進出", title: "5年連続ファイナル進出", desc: "2018-19から2022-23まで5シーズン連続でファイナルへ進出。" },
      { year: "2023", kind: "優勝", title: "Mリーグ2022-23 優勝", desc: "5年目でチーム初優勝を達成。" },
      { year: "2026", kind: "敗退", title: "Mリーグ2025-26 レギュラーシーズン7位", desc: "レギュラーシーズンを7位で終え、初めてセミファイナル進出を逃した。" },
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
    parentCompany: "セガサミーグループ",
    parentCompanyEn: "Sega Sammy Group",
    parentCompanyHref: "https://www.segasammy.co.jp/",
    founded: 2018,
    joinedSeason: "2018-19",
    coach: "茅森 早香",
    coachIsPlayer: true,
    homeOrg: "最高位戦",
    tagline: "不撓不屈で戦うセガサミーグループのチーム",
    about: [
      "セガサミーフェニックスは、セガサミーグループによるMリーグ初年度参入チーム。チーム名は不死鳥をモチーフとし、チームカラーはオレンジ。",
      "創設メンバーは魚谷侑未、近藤誠一、茅森早香の3名。2019年ドラフトで和久津晶を指名し、4人体制となった。",
      "2023-24シーズンから近藤誠一が監督に就任し、醍醐大が加入。2024-25シーズンは魚谷侑未・東城りおの契約満了後に、竹内元太と浅井堂岐を指名した。",
      "2024-25シーズンはレギュラー3位、セミファイナル3位でファイナルへ進出し、チーム初優勝。醍醐大は同シーズンのレギュラーシーズン個人スコア1位となった。",
      "2025-26シーズン後に浅井堂岐が退団。2026年ドラフトでは佐野ひなこを指名した。",
    ],
    currentRoster: [
      { id: "kayamori", role: "創設メンバー · 選手兼監督" },
      { id: "daigo", },
      { id: "takeuchi", },
      { id: "sano_hinako", },
    ],
    pastMembers: [
      { name: "魚谷 侑未", years: "2018-2024", note: "創設メンバー、2023-24シーズン後に契約満了" },
      { name: "近藤 誠一", years: "2018-2025", note: "創設メンバー、2022-23まで選手・2023-25は監督として在籍、2024-25シーズン優勝後に退任" },
      { name: "和久津 晶", years: "2019-2021", note: "2019年加入、2020-21シーズン後に契約満了" },
      { name: "東城 りお", years: "2021-2024", note: "2021年加入、2023-24シーズン後に契約満了" },
      { name: "浅井 堂岐", years: "2024-2026", note: "日本プロ麻雀協会、2024年加入、2025-26シーズン後に退団" },
    ],
    seasons: [
      { season: "2018-19", rank: 6, result: "regular" },
      { season: "2019-20", rank: 2, result: "final", note: "準優勝" },
      { season: "2020-21", rank: 8, result: "regular" },
      { season: "2021-22", rank: 2, result: "final", note: "準優勝" },
      { season: "2022-23", rank: 8, result: "regular" },
      { season: "2023-24", rank: 9, result: "regular" },
      { season: "2024-25", rank: 1, result: "champion", note: "悲願の初優勝" },
      { season: "2025-26", rank: 5, result: "semifinal" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで魚谷侑未・近藤誠一・茅森早香の3名を指名し発足、初代監督は高畑大輔。" },
      { year: "2019", kind: "新加入", title: "和久津晶加入", desc: "男女混合4人体制への変更に伴い、4人目として和久津晶 (連盟) を指名。" },
      { year: "2020", kind: "準優勝", title: "Mリーグ2019-20 準優勝", desc: "ファイナル2位、初年度の悔しさを晴らす形でファイナル進出。" },
      { year: "2022", kind: "準優勝", title: "Mリーグ2021-22 準優勝", desc: "2度目のファイナル進出も、サクラナイツに惜敗。" },
      { year: "2023", kind: "監督交代", title: "近藤誠一が監督就任", desc: "2018年から選手として在籍した近藤誠一が引退し、2023-24シーズンから監督に就任。後任の選手として醍醐大が加入。" },
      { year: "2024", kind: "新加入", title: "竹内元太・浅井堂岐 加入", desc: "2024年6月のドラフトで竹内元太 (最高位戦) と浅井堂岐 (協会) を指名。" },
      { year: "2025", kind: "優勝", title: "Mリーグ2024-25 優勝", desc: "レギュラー3位、セミファイナル3位からファイナルへ進み、チーム初優勝。醍醐大がレギュラーシーズンMVPを獲得。" },
      { year: "2025", kind: "監督交代", title: "茅森早香が選手兼監督に", desc: "2025-26シーズンから創設以来の最古参・茅森が選手兼監督として指揮。" },
      { year: "2026", kind: "退団・新加入", title: "浅井堂岐退団 / 佐野ひなこ加入", desc: "浅井堂岐が退団し、2026年ドラフトで佐野ひなこ (最高位戦) を指名。" },
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
    tagline: "雷電の麻雀は面白いんです！",
    about: [
      "TEAM RAIDEN / 雷電は、電通が運営するMリーグ初年度参入チーム。チーム名には、雷と電光を思わせる「雷電」の名が使われている。所属選手はいずれも日本プロ麻雀連盟のプロで構成されている。",
      "創設メンバーは萩原聖人、瀬戸熊直樹、黒沢咲の3名。2018年ドラフトでは萩原聖人を1巡目、瀬戸熊直樹を2巡目、黒沢咲を3巡目で指名した。",
      "2021年ドラフトで本田朋広を指名し、4人体制となった。以降は萩原聖人、瀬戸熊直樹、黒沢咲、本田朋広の4名で継続している。",
      "ファイナル進出は2022-23、2024-25、2025-26の3回。",
    ],
    currentRoster: [
      { id: "hagiwara", role: "創設メンバー · 俳優プロ" },
      { id: "setokuma", role: "創設メンバー · 鳳凰位3期" },
      { id: "kurosawa", role: "創設メンバー" },
      { id: "honda", },
    ],
    pastMembers: [],
    seasons: [
      { season: "2018-19", rank: 7, result: "regular", note: "初年度最下位" },
      { season: "2019-20", rank: 6, result: "semifinal" },
      { season: "2020-21", rank: 6, result: "semifinal" },
      { season: "2021-22", rank: 8, result: "regular" },
      { season: "2022-23", rank: 3, result: "final", note: "初のファイナル進出" },
      { season: "2023-24", rank: 8, result: "regular" },
      { season: "2024-25", rank: 4, result: "final" },
      { season: "2025-26", rank: 3, points: 122.1, result: "final" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで萩原聖人 (1位)・瀬戸熊直樹・黒沢咲の3名を指名し発足。" },
      { year: "2021", kind: "新加入", title: "本田朋広加入", desc: "4人体制化に伴い、2021年ドラフトで日本プロ麻雀連盟の本田朋広を指名。" },
      { year: "2023", kind: "進出", title: "Mリーグ2022-23 初のファイナル進出", desc: "参戦5年目で初のファイナル進出。ファイナル3位でシーズンを終えた。" },
      { year: "2025", kind: "進出", title: "Mリーグ2024-25 ファイナル進出", desc: "2度目のファイナル進出。ファイナル4位でシーズンを終えた。" },
      { year: "2026", kind: "進出", title: "Mリーグ2025-26 ファイナル進出", desc: "3度目のファイナル進出。ファイナル3位でシーズンを終えた。" },
    ],
    championships: 0,
    finalAppearances: 3,
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
    tagline: "海賊団 — 未開の大海原へ漕ぎ出す挑戦者集団",
    about: [
      "U-NEXT Piratesは、株式会社U-NEXTが運営するMリーグ初年度参入チーム。チーム名は、麻雀のプロスポーツ化という未開の大海原へ漕ぎ出す想いと、帆に風を受けてスピードに乗る選手たちのイメージから名付けられた。",
      "小林剛・朝倉康心・石橋伸洋の3名で発足し、2019年に瑞原明奈が加入。2019-20シーズンに初優勝し、2023-24シーズンに2度目の優勝を果たした。",
      "2021-22シーズンに瑞原明奈がMリーグMVPを獲得、2023-24シーズンには鈴木優がMVPを獲得した。2022年のドラフトで鈴木優・仲林圭が加入し、瑞原明奈・小林剛との4人体制で2023-24シーズンを制した。",
      "2025-26シーズン後に小林剛が契約満了となり、2026年ドラフトで創設メンバーの朝倉康心を再指名した。",
      "チームカラーは紺と青。海賊船と稲妻を組み合わせたロゴを掲げる。",
    ],
    currentRoster: [
      { id: "asakura_koshin", role: "創設メンバー · 再加入" },
      { id: "mizuhara", role: "元MVP" },
      { id: "suzuki-y", role: "元MVP" },
      { id: "nakabayashi", },
    ],
    pastMembers: [
      { name: "朝倉 康心", years: "2018-2022", note: "創設メンバー、2021-22シーズン後に契約満了" },
      { name: "石橋 伸洋", years: "2018-2022", note: "創設メンバー、2021-22シーズン後に契約満了" },
      { name: "小林 剛", years: "2018-2026", note: "創設メンバー、2025-26シーズン後に契約満了" },
    ],
    seasons: [
      { season: "2018-19", rank: 5, result: "regular" },
      { season: "2019-20", rank: 1, result: "champion", note: "初優勝" },
      { season: "2020-21", rank: 7, result: "regular" },
      { season: "2021-22", rank: 6, result: "semifinal", note: "瑞原明奈MVP" },
      { season: "2022-23", rank: 5, result: "semifinal" },
      { season: "2023-24", rank: 1, result: "champion", note: "2回目の優勝、鈴木優MVP" },
      { season: "2024-25", rank: 2, result: "final", note: "準優勝" },
      { season: "2025-26", rank: 8, result: "regular" },
    ],
    milestones: [
      { year: "2018", kind: "設立", title: "Mリーグ初年度参戦", desc: "ドラフトで小林剛 (μ)・朝倉康心 (最高位戦)・石橋伸洋 (最高位戦) の3名を指名し発足。" },
      { year: "2019", kind: "新加入", title: "瑞原明奈加入", desc: "男女混合4人体制への変更に伴い、2019年ドラフトで瑞原明奈 (最高位戦) を指名。" },
      { year: "2020", kind: "優勝", title: "Mリーグ2019-20 初優勝", desc: "参入2年目でファイナル制覇、初優勝。" },
      { year: "2022", kind: "MVP", title: "瑞原明奈 Mリーグ MVP", desc: "Mリーグ2021-22で女性初のMVPを獲得。" },
      { year: "2022", kind: "退団", title: "朝倉康心・石橋伸洋 退団", desc: "創設メンバーの朝倉康心と石橋伸洋が2021-22シーズン後に契約満了で退団。" },
      { year: "2022", kind: "新加入", title: "鈴木優・仲林圭 加入", desc: "2022年のドラフトで鈴木優 (最高位戦) と仲林圭 (協会) を同時指名。Mリーグ2022-23シーズンから「シン・パイレーツ」として参戦。" },
      { year: "2024", kind: "優勝", title: "Mリーグ2023-24 2度目の優勝", desc: "鈴木優がMVPを獲得。レギュラーシーズン首位通過からファイナルを制覇。" },
      { year: "2026", kind: "退団・新加入", title: "小林剛退団 / 朝倉康心再加入", desc: "小林剛が契約満了。2026年ドラフトで創設メンバーの朝倉康心を再指名。" },
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
    colorOnDark: "#ffdff8",
    parentCompany: "株式会社KADOKAWA",
    parentCompanyEn: "KADOKAWA",
    parentCompanyHref: "https://group.kadokawa.co.jp/",
    founded: 2019,
    joinedSeason: "2019-20",
    coach: "森井 巧",
    tagline: "桜のように咲き、騎士のように戦う",
    about: [
      "KADOKAWAサクラナイツは、KADOKAWAがオーナー企業のMリーグチーム。2019-20シーズンを前に、Mリーグ8番目のチームとして設立された。",
      "チーム名は、ところざわサクラタウンに由来する。桜のように美しく咲き、騎士のように心技を備えて戦うチーム像を掲げている。",
      "創設メンバーは内川幸太郎、岡田紗佳、沢崎誠の3名。2020年に堀慎吾を指名し、4人体制となった。",
      "2021-22シーズンに初優勝。沢崎誠は同シーズン後に契約満了となり、2022年ドラフトで渋川難波を指名した。",
      "2024-25シーズン後に内川幸太郎が契約満了となり、2025年ドラフトで阿久津翔太を指名。2025-26シーズン後に渋川難波が退団し、2026年ドラフトで尻無濱航を指名した。",
      "2026-27シーズンの所属選手は、岡田紗佳、堀慎吾、阿久津翔太、尻無濱航の4名。",
    ],
    currentRoster: [
      { id: "okada", role: "モデル兼業" },
      { id: "hori", role: "元雀王" },
      { id: "akutsu", },
      { id: "shirinashihama_wataru", },
    ],
    pastMembers: [
      { name: "内川 幸太郎", years: "2019-2025", note: "創設メンバー、2024-25シーズン後に契約満了。現EX風林火山" },
      { name: "沢崎 誠", years: "2019-2022", note: "創設メンバー、2021-22シーズン後に契約満了" },
      { name: "渋川 難波", years: "2022-2026", note: "2022年加入、2025-26シーズン後に契約解除" },
    ],
    seasons: [
      { season: "2019-20", rank: 4, result: "final" },
      { season: "2020-21", rank: 2, result: "final", note: "準優勝" },
      { season: "2021-22", rank: 1, result: "champion", note: "初優勝" },
      { season: "2022-23", rank: 6, result: "semifinal" },
      { season: "2023-24", rank: 3, result: "final" },
      { season: "2024-25", rank: 7, result: "regular", note: "創設以来初のセミファイナル逃し" },
      { season: "2025-26", rank: 9, result: "regular" },
    ],
    milestones: [
      { year: "2019", kind: "設立", title: "Mリーグ8番目のチームとして参入", desc: "ドラフトで内川幸太郎・沢崎誠・岡田紗佳の3名を指名し発足、初代監督は森井巧 (現職)。" },
      { year: "2020", kind: "新加入", title: "堀慎吾加入", desc: "4人体制への変更に伴い、4人目として堀慎吾 (協会) を指名。" },
      { year: "2022", kind: "優勝", title: "Mリーグ2021-22 初優勝", desc: "参入3年目のシーズンでチーム初優勝。" },
      { year: "2022", kind: "退団・新加入", title: "沢崎誠退団 / 渋川難波加入", desc: "創設メンバーの沢崎誠が契約満了、後任として渋川難波 (協会) が加入。" },
      { year: "2025", kind: "退団", title: "内川幸太郎退団", desc: "創設メンバーの内川が契約満了、その後EX風林火山へ移籍。" },
      { year: "2025", kind: "新加入", title: "阿久津翔太加入", desc: "2025年ドラフトで阿久津翔太 (JPML) を指名。" },
      { year: "2026", kind: "移籍", title: "堀慎吾が連盟へ団体移籍", desc: "2026年1月、堀慎吾が日本プロ麻雀協会から日本プロ麻雀連盟へ移籍。" },
      { year: "2026", kind: "退団・新加入", title: "渋川難波退団 / 尻無濱航加入", desc: "渋川難波が退団し、2026年ドラフトで尻無濱航 (協会) を指名。" },
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
    color: "#002953",
    background: "#2d3f23",
    colorOnDark: "#d4a72c",
    parentCompany: "BS10",
    parentCompanyEn: "BS10 (旧BS Japanext)",
    parentCompanyHref: "https://www.bs10.jp/",
    founded: 2023,
    joinedSeason: "2023-24",
    coach: "佐藤 崇充",
    coachLabel: "チーム担当",
    tagline: "BS10が運営するMリーグ9番目のチーム",
    about: [
      "BEAST X (旧 BEAST Japanext) は、衛星放送局BS10 (旧BS Japanext) が運営するMリーグ9番目の参入チーム。2023-24シーズンに開幕。",
      "創設メンバーは鈴木大介、中田花奈、猿川真寿、菅原千瑛の4名。鈴木大介は日本プロ麻雀連盟所属で将棋棋士としても活動し、中田花奈は乃木坂46卒業後に日本プロ麻雀連盟へ入会した。",
      "2024-25シーズン後に猿川真寿と菅原千瑛が契約満了で退団。2025年ドラフトで下石戟と東城りおを指名した。",
      "2025年にチーム名をBEAST JapanextからBEAST Xへ変更。2025-26シーズンに初めてファイナルへ進出した。",
    ],
    currentRoster: [
      { id: "suzuki-d", role: "創設メンバー · 将棋棋士兼業" },
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
      { season: "2025-26", rank: 4, points: 92.7, result: "final", note: "初のファイナル進出" },
    ],
    milestones: [
      { year: "2023", kind: "設立", title: "Mリーグ9番目のチームとして参入", desc: "鈴木大介・中田花奈・猿川真寿・菅原千瑛の4名で発足、BEAST Japanextとして開幕。" },
      { year: "2025", kind: "名称変更", title: "BEAST Xに改称", desc: "親会社BS Japanextが BS10 に再編されるのに伴い「BEAST X」へ。" },
      { year: "2025", kind: "退団", title: "猿川真寿・菅原千瑛 退団", desc: "2024-25シーズン後、創設メンバーの猿川と菅原が契約満了で退団。" },
      { year: "2025", kind: "新加入", title: "下石戟・東城りお 加入", desc: "2025年ドラフトで下石戟 (協会) と東城りお (最高位戦) を指名。" },
      { year: "2026", kind: "進出", title: "Mリーグ2025-26 初のファイナル進出", desc: "チーム初のファイナル進出。ファイナル4位でシーズンを終えた。" },
    ],
    championships: 0,
    finalAppearances: 1,
    social: [
      { label: "公式X", href: "https://x.com/BEAST_Japanext", handle: "@BEAST_Japanext" },
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
    tagline: "アース製薬が運営するMリーグ10番目のチーム",
    about: [
      "EARTH JETSは、アース製薬が運営するMリーグ10番目の参入チーム。2025-26シーズンから参加した。",
      "創設メンバーは石井一馬、三浦智博、逢川恵夢、HIRO柴田の4名。石井一馬は最高位、三浦智博は十段位、逢川恵夢は永世女流雀王、HIRO柴田は鳳凰位の獲得経験を持つ。",
      "チームカラーは緑色。ロゴにはカメレオンと虫取り網を組み合わせたモチーフが使われている。",
      "初年度の2025-26シーズンはレギュラーシーズン10位で敗退した。",
    ],
    currentRoster: [
      { id: "ishii", role: "創設メンバー · 第49期最高位" },
      { id: "miura", role: "創設メンバー · 十段位×2" },
      { id: "aikawa", role: "創設メンバー · 永世女流雀王" },
      { id: "hiro-shibata", role: "創設メンバー · 鳳凰位経験者" },
    ],
    pastMembers: [],
    seasons: [
      { season: "2025-26", rank: 10, result: "regular", note: "新規参入初年度" },
    ],
    milestones: [
      { year: "2025", kind: "設立", title: "Mリーグ10番目のチームとして参入", desc: "石井一馬・三浦智博・逢川恵夢・HIRO柴田の4名で発足、Mリーグを10チーム体制に。" },
      { year: "2026", kind: "成績", title: "Mリーグ2025-26 レギュラー10位", desc: "参入初年度はレギュラーシーズン10位で敗退。" },
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
