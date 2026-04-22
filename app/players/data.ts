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
  // ── TEAM RAIDEN / 雷電 ───────────────────────────────────────
  { id: "setokuma",    name: "瀬戸熊直樹",  nameEn: "Naoki Setokuma",      org: "JPML",  title: "鳳凰位×3",      tags: ["守備型","A1"],    league: "A1",    period: "第13期", joinYear: 1997, birthday: "1970/08/27", gender: "male",   href: "/players/setokuma",    mleagueTeam: "TEAM RAIDEN / 雷電" },
  { id: "hagiwara",   name: "萩原聖人",    nameEn: "Masato Hagiwara",     org: "JPML",  title: "A1リーグ",       tags: ["俳優","A1"],      league: "A1",    period: "第17期", joinYear: 2001, birthday: "1971/08/21", gender: "male",   href: "/players/hagiwara",    mleagueTeam: "TEAM RAIDEN / 雷電" },
  { id: "kurosawa",   name: "黒沢咲",     nameEn: "Saki Kurosawa",       org: "JPML",  title: "女流桜花×2",     tags: ["女流","A1"],      league: "A1",    period: "第22期", joinYear: 2006, birthday: "10/06",     gender: "female", href: "/players/kurosawa",    mleagueTeam: "TEAM RAIDEN / 雷電" },
  { id: "honda",      name: "本田朋広",    nameEn: "Tomohiro Honda",      org: "JPML",  title: "鳳凰位",        tags: ["A1"],            league: "A1",    period: "第22期", joinYear: 2006, birthday: "1983/10/03", gender: "male",   href: "/players/honda",       mleagueTeam: "TEAM RAIDEN / 雷電" },

  // ── KONAMI麻雀格闘倶楽部 ────────────────────────────────────
  { id: "sasaki",     name: "佐々木寿人",  nameEn: "Toshihito Sasaki",    org: "JPML",  title: "十段位",        tags: ["攻撃型","A1"],    league: "A1",    period: "第19期", joinYear: 2003, birthday: "1979/08/01", gender: "male",   href: "/players/sasaki",      mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "takamiya",   name: "高宮まり",    nameEn: "Mari Takamiya",       org: "JPML",  title: "女流桜花",       tags: ["女流","A1"],      league: "A1",    period: "第27期", joinYear: 2011, birthday: "1988/11/08", gender: "female", href: "/players/takamiya",    mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "date",       name: "伊達朱里紗",  nameEn: "Arisa Date",          org: "JPML",  title: "女流桜花",       tags: ["女流","A1"],      league: "A1",    period: "第30期", joinYear: 2014, birthday: "1991/05/10", gender: "female", href: "/players/date",        mleagueTeam: "KONAMI麻雀格闘倶楽部" },
  { id: "takizawa",   name: "滝沢和典",    nameEn: "Kazunori Takizawa",   org: "JPML",  title: "王位×2",        tags: ["攻撃型","A1"],    league: "A1",    period: "第12期", joinYear: 1996, birthday: "1971/03/15", gender: "male",   href: "/players/takizawa",    mleagueTeam: "KONAMI麻雀格闘倶楽部" },

  // ── EX風林火山 ──────────────────────────────────────────────
  { id: "nikaido-a",  name: "二階堂亜樹",  nameEn: "Aki Nikaido",         org: "JPML",  title: "女流桜花×3",     tags: ["女流","A1"],      league: "A1",    period: "第18期", joinYear: 2002, birthday: "1980/04/09", gender: "female", href: "/players/nikaido-a",   mleagueTeam: "EX風林火山" },
  { id: "katsumata",  name: "勝又健志",    nameEn: "Kenji Katsumata",     org: "JPML",  title: "鳳凰位",        tags: ["論理派","A1"],    league: "A1",    period: "第17期", joinYear: 2001, birthday: "1981/03/15", gender: "male",   href: "/players/katsumata",   mleagueTeam: "EX風林火山" },
  { id: "nagai",      name: "永井孝典",    nameEn: "Kosuke Nagai",        org: "最高位戦", title: "最高位",       tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2008, birthday: "1986/08/10", gender: "male",   href: "/players/nagai",       mleagueTeam: "EX風林火山" },
  { id: "uchikawa",   name: "内川幸太郎",  nameEn: "Kotaro Uchikawa",     org: "JPML",  title: "最高位×2",      tags: ["A1"],            league: "A1",    period: "第21期", joinYear: 2005, birthday: "1981/05/06", gender: "male",   href: "/players/uchikawa",    mleagueTeam: "EX風林火山" },

  // ── BEAST X ─────────────────────────────────────────────────
  { id: "suzuki-d",   name: "鈴木大介",    nameEn: "Daisuke Suzuki",      org: "JPML",  title: "十段位",        tags: ["棋士","A1"],      league: "A1",    period: "第10期", joinYear: 1994, birthday: "1974/07/11", gender: "male",   href: "/players/suzuki-d",    mleagueTeam: "BEAST X" },
  { id: "nakata",     name: "中田花奈",    nameEn: "Kana Nakata",         org: "JPML",  title: "女流桜花",       tags: ["女流","アイドル"], league: "A1",    period: "第33期", joinYear: 2017, birthday: "1994/08/06", gender: "female", href: "/players/nakata",      mleagueTeam: "BEAST X" },
  { id: "shimoishi",  name: "下石戟",     nameEn: "Geki Shimoishi",      org: "NPM",   title: "雀王",          tags: ["攻撃型"],         league: "A1",    period: "第13期", joinYear: 2014, birthday: "1987/03/20", gender: "male",   href: "/players/shimoishi",   mleagueTeam: "BEAST X" },
  { id: "tojo",       name: "東城りお",    nameEn: "Rio Tojo",            org: "JPML",  title: "女流桜花",       tags: ["女流","A1"],      league: "A1",    period: "第29期", joinYear: 2013, birthday: "1990/09/18", gender: "female", href: "/players/tojo",        mleagueTeam: "BEAST X" },

  // ── 赤坂ドリブンズ ───────────────────────────────────────────
  { id: "sonoda",     name: "園田賢",     nameEn: "Ken Sonoda",          org: "最高位戦", title: "最高位",       tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2006, birthday: "1980/11/25", gender: "male",   href: "/players/sonoda",      mleagueTeam: "赤坂ドリブンズ" },
  { id: "suzuki-t",   name: "鈴木たろう",  nameEn: "Taro Suzuki",         org: "最高位戦", title: "最高位×3",     tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 1999, birthday: "1973/10/04", gender: "male",   href: "/players/suzuki-t",    mleagueTeam: "赤坂ドリブンズ" },
  { id: "asami",      name: "浅見真紀",    nameEn: "Maki Asami",          org: "最高位戦", title: "最高位",       tags: ["女流","A"],       league: "Aリーグ", period: "第35期", joinYear: 2018, birthday: "1985/08/30", gender: "female", href: "/players/asami",       mleagueTeam: "赤坂ドリブンズ" },
  { id: "watanabe",   name: "渡辺太",     nameEn: "Futoshi Watanabe",    org: "最高位戦", title: "最高位",       tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2010, birthday: "1988/07/25", gender: "male",   href: "/players/watanabe",    mleagueTeam: "赤坂ドリブンズ" },

  // ── セガサミーフェニックス ────────────────────────────────────
  { id: "kayamori",   name: "茅森早香",    nameEn: "Sayaka Kayamori",     org: "最高位戦", title: "最高位",       tags: ["女流","A"],       league: "Aリーグ", period: "",     joinYear: 2006, birthday: "1985/04/01", gender: "female", href: "/players/kayamori",    mleagueTeam: "セガサミーフェニックス" },
  { id: "daigo",      name: "醍醐大",     nameEn: "Dai Daigo",           org: "最高位戦", title: "最高位×2",     tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2010, birthday: "1988/06/14", gender: "male",   href: "/players/daigo",       mleagueTeam: "セガサミーフェニックス" },
  { id: "takeuchi",   name: "竹内元太",    nameEn: "Genta Takeuchi",      org: "最高位戦", title: "最高位×2",     tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2012, birthday: "1986/03/12", gender: "male",   href: "/players/takeuchi",    mleagueTeam: "セガサミーフェニックス" },
  { id: "asai",       name: "浅井堂岐",    nameEn: "Doki Asai",           org: "NPM",   title: "雀竜位",        tags: ["二刀流"],         league: "A1",    period: "",      joinYear: 2012, birthday: "1985/12/24", gender: "male",   href: "/players/asai",        mleagueTeam: "セガサミーフェニックス" },

  // ── 渋谷ABEMAS ───────────────────────────────────────────────
  { id: "taii",       name: "多井隆晴",    nameEn: "Takaharu Taii",       org: "RMU",   title: "代表",          tags: ["攻撃型","A"],     league: "Aリーグ", period: "",     joinYear: 2007, birthday: "1972/03/17", gender: "male",   href: "/players/taii",        mleagueTeam: "渋谷ABEMAS" },
  { id: "shiratori",  name: "白鳥翔",     nameEn: "Sho Shiratori",       org: "JPML",  title: "十段位",        tags: ["技巧派","A1"],    league: "A1",    period: "第22期", joinYear: 2006, birthday: "1983/10/04", gender: "male",   href: "/players/shiratori",   mleagueTeam: "渋谷ABEMAS" },
  { id: "matsumoto",  name: "松本吉弘",    nameEn: "Yoshihiro Matsumoto", org: "NPM",   title: "雀王",          tags: ["二刀流"],         league: "A1",    period: "",      joinYear: 2012, birthday: "1991/03/28", gender: "male",   href: "/players/matsumoto",   mleagueTeam: "渋谷ABEMAS" },
  { id: "hinata",     name: "日向藍子",    nameEn: "Aiko Hinata",         org: "最高位戦", title: "最高位",       tags: ["女流","A"],       league: "Aリーグ", period: "",     joinYear: 2009, birthday: "1988/09/24", gender: "female", href: "/players/hinata",      mleagueTeam: "渋谷ABEMAS" },

  // ── KADOKAWAサクラナイツ ─────────────────────────────────────
  { id: "okada",      name: "岡田紗佳",    nameEn: "Sayaka Okada",        org: "JPML",  title: "女流桜花",       tags: ["女流","モデル"],  league: "A1",    period: "第32期", joinYear: 2016, birthday: "1994/02/19", gender: "female", href: "/players/okada",       mleagueTeam: "KADOKAWAサクラナイツ" },
  { id: "hori",       name: "堀慎吾",     nameEn: "Shingo Hori",         org: "JPML",  title: "雀王×3",        tags: ["A1"],            league: "A1",    period: "第23期", joinYear: 2007, birthday: "1984/03/23", gender: "male",   href: "/players/hori",        mleagueTeam: "KADOKAWAサクラナイツ" },
  { id: "shibukawa",  name: "渋川難波",    nameEn: "Nanba Shibukawa",     org: "最高位戦", title: "最高位",       tags: ["二刀流","A"],     league: "Aリーグ", period: "",     joinYear: 2008, birthday: "1986/05/19", gender: "male",   href: "/players/shibukawa",   mleagueTeam: "KADOKAWAサクラナイツ" },
  { id: "akutsu",     name: "阿久津翔太",  nameEn: "Shota Akutsu",        org: "JPML",  title: "A1リーグ",       tags: ["A1"],            league: "A1",    period: "第34期", joinYear: 2018, birthday: "1996/04/23", gender: "male",   href: "/players/akutsu",      mleagueTeam: "KADOKAWAサクラナイツ" },

  // ── U-NEXT Pirates ──────────────────────────────────────────
  { id: "kobayashi",  name: "小林剛",     nameEn: "Go Kobayashi",        org: "μ",     title: "王将位",        tags: ["理論派","A"],     league: "Aリーグ", period: "",     joinYear: 2003, birthday: "1976/02/12", gender: "male",   href: "/players/kobayashi",   mleagueTeam: "U-NEXT Pirates" },
  { id: "mizuhara",   name: "瑞原明奈",    nameEn: "Akina Mizuhara",      org: "最高位戦", title: "最高位",       tags: ["女流","A"],       league: "Aリーグ", period: "",     joinYear: 2009, birthday: "1986/11/19", gender: "female", href: "/players/mizuhara",    mleagueTeam: "U-NEXT Pirates" },
  { id: "suzuki-y",   name: "鈴木優",     nameEn: "Yu Suzuki",           org: "最高位戦", title: "最高位",       tags: ["A"],             league: "Aリーグ", period: "第36期", joinYear: 2017, birthday: "1981/09/13", gender: "male",   href: "/players/suzuki-y",    mleagueTeam: "U-NEXT Pirates" },
  { id: "nakabayashi",name: "仲林圭",     nameEn: "Kei Nakabayashi",     org: "NPM",   title: "雀竜位",        tags: ["A1"],            league: "A1",    period: "第8期",  joinYear: 2009, birthday: "1987/04/22", gender: "male",   href: "/players/nakabayashi", mleagueTeam: "U-NEXT Pirates" },

  // ── EARTH JETS ──────────────────────────────────────────────
  { id: "ishii",      name: "石井一馬",    nameEn: "Kazuma Ishii",        org: "最高位戦", title: "最高位",       tags: ["A"],             league: "Aリーグ", period: "",     joinYear: 2006, birthday: "1986/02/21", gender: "male",   href: "/players/ishii",       mleagueTeam: "EARTH JETS" },
  { id: "miura",      name: "三浦智博",    nameEn: "Tomohiro Miura",      org: "JPML",  title: "十段位×2",      tags: ["A1"],            league: "A1",    period: "第28期", joinYear: 2012, birthday: "1987/04/26", gender: "male",   href: "/players/miura",       mleagueTeam: "EARTH JETS" },
  { id: "aikawa",     name: "逢川恵夢",    nameEn: "Megumu Aikawa",       org: "NPM",   title: "永世女流雀王",   tags: ["女流","A1"],      league: "A1",    period: "第1期",  joinYear: 2002, birthday: "1987/08/28", gender: "female", href: "/players/aikawa",      mleagueTeam: "EARTH JETS" },
  { id: "hiro-shibata",name: "HIRO柴田",  nameEn: "Hiro Shibata",        org: "JPML",  title: "A1リーグ",       tags: ["A1"],            league: "A1",    period: "第16期", joinYear: 2000, birthday: "1976/02/16", gender: "male",   href: "/players/hiro-shibata",mleagueTeam: "EARTH JETS" },

  // ── Mリーグ外 ────────────────────────────────────────────────
  { id: "maehara",    name: "前原雄大",    nameEn: "Yudai Maehara",       org: "JPML",  title: "鳳凰位×5",      tags: ["攻撃型","A1"],    league: "A1",    period: "第3期",  joinYear: 1987, birthday: "1963/05/28", gender: "male",   href: "/players/maehara" },
  { id: "nikaido-r",  name: "二階堂瑠美",  nameEn: "Rumi Nikaido",        org: "JPML",  title: "女流桜花",       tags: ["女流","A2"],      league: "A2",    period: "第18期", joinYear: 2002, birthday: "1982/07/18", gender: "female", href: "/players/nikaido-r" },
  { id: "uotani",     name: "魚谷侑未",    nameEn: "Yumi Uotani",         org: "NPM",   title: "雀王",          tags: ["女流","A1"],      league: "A1",    period: "第5期",  joinYear: 2006, birthday: "1985/07/07", gender: "female", href: "/players/uotani" },
  { id: "kondo",      name: "近藤誠一",    nameEn: "Seiichi Kondo",       org: "最高位戦", title: "最高位×7",     tags: ["レジェンド"],     league: "Aリーグ", period: "",     joinYear: 1990, birthday: "1966/08/22", gender: "male",   href: "/players/kondo" },
  { id: "iida",       name: "飯田正人",    nameEn: "Masato Iida",         org: "最高位戦", title: "最高位×9",     tags: ["レジェンド"],     league: "Aリーグ", period: "",     joinYear: 1985, birthday: "1960/05/10", gender: "male",   href: "/players/iida" },
  { id: "suda",       name: "須田良規",    nameEn: "Yoshinori Suda",      org: "μ",     title: "王将位",        tags: ["理論派","A"],     league: "Aリーグ", period: "",     joinYear: 2003, birthday: "1981/04/17", gender: "male",   href: "/players/suda" },
  { id: "miyauchi",   name: "宮内こずえ",  nameEn: "Kozue Miyauchi",      org: "μ",     title: "A1リーグ",       tags: ["女流","A"],       league: "Aリーグ", period: "",     joinYear: 2005, birthday: "1984/12/25", gender: "female", href: "/players/miyauchi" },
];
