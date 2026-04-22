// app/players/data.ts
export type OrgCode = "JPML" | "NPM" | "最高位戦" | "RMU" | "μ";

export const MLEAGUE_TEAMS = [
  "BEAST X",
  "EX風林火山",
  "TEAM RAIDEN / 雷電",
  "KONAMI麻雀格闘倶楽部",
  "セガサミーフェニックス",
  "赤坂ドリブンズ",
  "U-NEXT Pirates",
  "渋谷ABEMAS",
  "EARTH JETS",
  "KADOKAWAサクラナイツ",
] as const;

export type MLeagueTeam = typeof MLEAGUE_TEAMS[number];
export type Gender = "male" | "female";

export interface AllPlayer {
  id: string;
  name: string;
  nameEn: string;
  org: OrgCode;
  title: string;
  tags: string[];
  league: string;
  period: string;
  joinYear: number;
  birthday: string;
  gender: Gender;
  href: string;
  mleagueTeam?: string;
}

export const ORG_META: Record<OrgCode, { color: string; label: string }> = {
  JPML:    { color: "#c8282a", label: "日本プロ麻雀連盟" },
  NPM:     { color: "#2563eb", label: "日本プロ麻雀協会" },
  最高位戦: { color: "#7c3aed", label: "最高位戦" },
  RMU:     { color: "#a07e28", label: "RMU" },
  μ:       { color: "#2f5c3f", label: "麻将連合μ" },
};

export const ALL_PLAYERS: AllPlayer[] = [
  { id: "setokuma",   name: "瀬戸熊直樹", nameEn: "Naoki Setokuma",   org: "JPML", title: "鳳凰位×3",   tags: ["守備型","A1"], league: "A1", period: "第13期", joinYear: 1997, birthday: "1970/08/12", gender: "male",   href: "/players/setokuma", mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "maehara",    name: "前原雄大",   nameEn: "Yudai Maehara",    org: "JPML", title: "鳳凰位×5",   tags: ["攻撃型","A1"], league: "A1", period: "第3期",  joinYear: 1987, birthday: "1963/05/28", gender: "male",   href: "/players/maehara", mleagueTeam: "TEAM RAIDEN / 雷電" },
  { id: "takizawa",   name: "滝沢和典",   nameEn: "Kazunori Takizawa", org: "JPML", title: "王位×2",    tags: ["攻撃型","A1"], league: "A1", period: "第12期", joinYear: 1996, birthday: "1971/03/15", gender: "male",   href: "/players/takizawa", mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "sasaki",     name: "佐々木寿人", nameEn: "Toshihito Sasaki",  org: "JPML", title: "十段位",     tags: ["攻撃型","A1"], league: "A1", period: "第19期", joinYear: 2003, birthday: "1979/08/01", gender: "male",   href: "/players/sasaki", mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "kurosawa",   name: "黒沢咲",    nameEn: "Saki Kurosawa",    org: "JPML", title: "女流桜花×2", tags: ["女流","A1"],  league: "A1", period: "第22期", joinYear: 2006, birthday: "11/19", gender: "female", href: "/players/kurosawa", mleagueTeam: "TEAM RAIDEN / 雷電" },
  { id: "nikaido-a",  name: "二階堂亜樹", nameEn: "Aki Nikaido",      org: "JPML", title: "女流桜花×3", tags: ["女流","A1"],  league: "A1", period: "第18期", joinYear: 2002, birthday: "1980/04/09", gender: "female", href: "/players/nikaido-a", mleagueTeam: "EX風林火山" },
  { id: "nikaido-r",  name: "二階堂瑠美", nameEn: "Rumi Nikaido",     org: "JPML", title: "女流桜花",   tags: ["女流","A2"],  league: "A2", period: "第18期", joinYear: 2002, birthday: "1982/07/18", gender: "female", href: "/players/nikaido-r" },
  { id: "shiratori",  name: "白鳥翔",    nameEn: "Sho Shiratori",    org: "JPML", title: "十段位",     tags: ["技巧派","A1"], league: "A1", period: "第22期", joinYear: 2006, birthday: "1983/10/04", gender: "male",   href: "/players/shiratori", mleagueTeam: "U-NEXT Pirates" },
  { id: "shibata",    name: "柴田吉和",  nameEn: "Yoshikazu Shibata", org: "JPML", title: "A1リーグ",   tags: ["ベテラン","A1"], league: "A1", period: "第7期", joinYear: 1991, birthday: "1966/01/26", gender: "male",   href: "/players/shibata" },
  { id: "katsumata",  name: "勝又健志",  nameEn: "Kenji Katsumata",  org: "JPML", title: "鳳凰位",     tags: ["論理派","A1"], league: "A1", period: "第17期", joinYear: 2001, birthday: "1977/12/11", gender: "male",   href: "/players/katsumata", mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "nakamura",   name: "中村慎吾",  nameEn: "Shingo Nakamura",  org: "JPML", title: "A2リーグ",   tags: ["A2"],        league: "A2", period: "第24期", joinYear: 2008, birthday: "1985/02/14", gender: "male",   href: "/players/nakamura" },
  { id: "yamada",     name: "山田浩之",  nameEn: "Hiroyuki Yamada",  org: "JPML", title: "B1リーグ",   tags: ["B1"],        league: "B1", period: "第20期", joinYear: 2004, birthday: "1980/06/03", gender: "male",   href: "/players/yamada" },
  { id: "ishibashi",  name: "石橋伸洋",  nameEn: "Nobuhiro Ishibashi", org: "NPM", title: "雀王×3",    tags: ["現雀王","A1"], league: "A1", period: "第1期",  joinYear: 2002, birthday: "1980/09/18", gender: "male",   href: "/players/ishibashi" },
  { id: "uotani",     name: "魚谷侑未",  nameEn: "Yumi Uotani",      org: "NPM",  title: "雀王",       tags: ["女流","A1"],  league: "A1", period: "第5期",  joinYear: 2006, birthday: "1985/07/07", gender: "female", href: "/players/uotani", mleagueTeam: "U-NEXT Pirates" },
  { id: "dou",        name: "童瞳",      nameEn: "Tong Tong",        org: "NPM",  title: "令昭位",     tags: ["女流","A1"],  league: "A1", period: "第3期",  joinYear: 2004, birthday: "1983/01/01", gender: "female", href: "/players/dou" },
  { id: "nakabayashi",name: "仲林圭",    nameEn: "Kei Nakabayashi",  org: "NPM",  title: "雀竜位",     tags: ["A1"],        league: "A1", period: "第8期",  joinYear: 2009, birthday: "1987/04/22", gender: "male",   href: "/players/nakabayashi", mleagueTeam: "赤坂ドリブンズ" },
  { id: "suzuki-y",   name: "鈴木優",    nameEn: "Yu Suzuki",        org: "NPM",  title: "B1リーグ",   tags: ["B1"],        league: "B1", period: "第10期", joinYear: 2011, birthday: "1990/03/05", gender: "male",   href: "/players/suzuki-y" },
  { id: "kayamori",   name: "茅森早香",  nameEn: "Sayaka Kayamori",  org: "最高位戦", title: "最高位",  tags: ["女流","A"],   league: "Aリーグ", period: "", joinYear: 2006, birthday: "1985/04/01", gender: "female", href: "/players/kayamori", mleagueTeam: "BEAST X" },
  { id: "uchikawa",   name: "内川幸太郎", nameEn: "Kotaro Uchikawa",  org: "最高位戦", title: "最高位×2", tags: ["A"],       league: "Aリーグ", period: "", joinYear: 2005, birthday: "1981/07/15", gender: "male",   href: "/players/uchikawa", mleagueTeam: "赤坂ドリブンズ" },
  { id: "kondo",      name: "近藤誠一",  nameEn: "Seiichi Kondo",    org: "最高位戦", title: "最高位×7", tags: ["レジェンド"], league: "Aリーグ", period: "", joinYear: 1990, birthday: "1966/08/22", gender: "male",   href: "/players/kondo" },
  { id: "iida",       name: "飯田正人",  nameEn: "Masato Iida",      org: "最高位戦", title: "最高位×9", tags: ["レジェンド"], league: "Aリーグ", period: "", joinYear: 1985, birthday: "1960/05/10", gender: "male",   href: "/players/iida" },
  { id: "taii",       name: "多井隆晴",  nameEn: "Takaharu Taii",    org: "RMU",  title: "代表",       tags: ["攻撃型","A"], league: "Aリーグ", period: "", joinYear: 2007, birthday: "1978/09/22", gender: "male",   href: "/players/taii", mleagueTeam: "渋谷ABEMAS" },
  { id: "daigo",      name: "醍醐大",    nameEn: "Dai Daigo",        org: "RMU",  title: "RMUクラシック", tags: ["A"],    league: "Aリーグ", period: "", joinYear: 2010, birthday: "1988/06/14", gender: "male",   href: "/players/daigo", mleagueTeam: "BEAST X" },
  { id: "matsumoto",  name: "松本吉弘",  nameEn: "Yoshihiro Matsumoto", org: "RMU", title: "Mリーガー", tags: ["A"],       league: "Aリーグ", period: "", joinYear: 2012, birthday: "1991/03/28", gender: "male",   href: "/players/matsumoto", mleagueTeam: "渋谷ABEMAS" },
  { id: "ide",        name: "井出洋介",  nameEn: "Yosuke Ide",       org: "μ",    title: "創設者",     tags: ["レジェンド"], league: "Aリーグ", period: "", joinYear: 1999, birthday: "1953/10/12", gender: "male",   href: "/players/ide" },
  { id: "suda",       name: "須田良規",  nameEn: "Yoshinori Suda",   org: "μ",    title: "王将位",     tags: ["理論派","A"], league: "Aリーグ", period: "", joinYear: 2003, birthday: "1981/04/17", gender: "male",   href: "/players/suda" },
  { id: "miyauchi",   name: "宮内こずえ", nameEn: "Kozue Miyauchi",   org: "μ",    title: "Mリーガー",  tags: ["女流","A"],  league: "Aリーグ", period: "", joinYear: 2005, birthday: "1984/12/25", gender: "female", href: "/players/miyauchi", mleagueTeam: "KONAMI麻雀格闘倶楽部" },
];
