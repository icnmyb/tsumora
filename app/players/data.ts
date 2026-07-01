// app/players/data.ts
import { ROSTER_PLAYERS } from "./roster";

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

export type AnnualPointNote = "final" | "semifinal" | "regular";

export interface AnnualPoint {
  season: string;          // "2018-19" 〜 "2025-26"
  points: number;          // Mリーグ レギュラーシーズン通算スコア
  team?: MLeagueTeam;      // 移籍選手など、その年の所属が現所属と異なる場合のみ指定
  // 互換用の一時メモ。表示ではチームの seasons[] を優先する。
  note?: AnnualPointNote;
}

export interface CurrentSeasonStats {
  season: string;       // "2025-26"
  topRate?: number;     // 1着率 % (0-100)
  avoid4th?: number;    // 4着回避率 % (0-100)
  bestScore?: number;   // 最高素点 (例: 80200)
}

export interface TitleEntry {
  year: string;
  name: string;
  sub?: string;
}

export type PlayerVideoType = "highlight" | "match" | "interview" | "tactics";

export interface PlayerVideo {
  id: string;              // YouTube video ID (the part after watch?v= or youtu.be/)
  title: string;           // video title (Japanese OK)
  channel: string;         // YouTube channel name
  type: PlayerVideoType;   // category for badge label
  isOfficial?: boolean;    // 公式 (Mリーグ / 各団体ch / MONDO TV 等) flag
  date?: string;           // "2024-03" 形式 (任意)
  durationLabel?: string;  // "12:34" 形式 (任意)
}

export interface RosterPlayer {
  id: string;
  name: string;
  org: OrgCode;
  league: string;

  nameEn?: string;
  furigana?: string;
  title?: string;
  tags?: string[];
  period?: string;
  joinYear?: number;
  proSinceYear?: number;
  careerNote?: string;
  birthday?: string;
  gender?: Gender;
  href?: string;
  officialUrl?: string;
  mleagueTeam?: string;
  birthplace?: string;
  bloodType?: string;
  hobby?: string;
  nickname?: string;
  rank?: string;
  license?: string;
  titles?: TitleEntry[];
  bio?: string[];
  annualPoints?: AnnualPoint[];
  currentSeason?: CurrentSeasonStats;
  videos?: PlayerVideo[];
}

export interface FeaturedPlayer extends RosterPlayer {
  nameEn: string;
  title: string;
  tags: string[];
  period: string;
  joinYear: number;
  birthday: string;
  gender: Gender;
  href: string;
}

export type AllPlayer = FeaturedPlayer;

export const ORG_META: Record<OrgCode, { color: string; label: string }> = {
  JPML: { color: "#c8282a", label: "日本プロ麻雀連盟" },
  NPM: { color: "#2563eb", label: "日本プロ麻雀協会" },
  最高位戦: { color: "#7c3aed", label: "最高位戦" },
  RMU: { color: "#a07e28", label: "RMU" },
  μ: { color: "#2f5c3f", label: "麻将連合" },
};

export const ALL_PLAYERS: AllPlayer[] = [
  // ── TEAM RAIDEN / 雷電 ───────────────────────────────────────
  { id: "setokuma", name: "瀬戸熊直樹", nameEn: "Naoki Setokuma", furigana: "せとくまなおき", org: "JPML", title: "鳳凰位×3", tags: ["B1"], league: "B1", period: "第14期", joinYear: 1998, birthday: "1970/08/27", gender: "male", href: "/players/setokuma", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "千葉県", bloodType: "O型", hobby: "海外ドラマ・漫画・アニメ", nickname: "卓上の暴君", titles: [{"year":"2022","name":"第16回モンド名人"},{"year":"2022","name":"第33期最強位"},{"year":"2021","name":"第32期最強位"},{"year":"2013","name":"第30期十段位"},{"year":"2012","name":"第29期十段位"},{"year":"2012","name":"第29期鳳凰位"},{"year":"2011","name":"第28期十段位"},{"year":"2010","name":"第27期鳳凰位"},{"year":"2009","name":"第26期鳳凰位"},{"year":"2006","name":"第14期發王位"}], bio: ["「卓上の暴君」「クマクマタイム」瀬戸熊直樹。千葉県出身、1970年8月27日生まれ。東京経済大学卒業後、1998年に日本プロ麻雀連盟第14期生としてプロ入り。攻撃的な雀風と勝負どころの強さで知られ、「卓上の暴君」の異名を持つ。親番で連荘し手のつけられない状態になると「クマクマタイム」と呼ばれ、対戦相手を圧倒する。", "2009年に第26期鳳凰位で初の鳳凰位を獲得。2010年に第27期で連覇、2012年には第29期鳳凰位と第29期十段位の二冠を達成。十段位は第28〜30期の3連覇（2011〜2013年）。鳳凰位3期・十段位3期・最強位2期・モンド名人1期・發王位1期の通算10冠を誇るタイトルホルダー。現在は日本プロ麻雀連盟理事・九段。", "Mリーグには2018年の発足時からTEAM RAIDEN/雷電のメンバーとして参加し、チームの精神的支柱として活躍。趣味は海外ドラマ・漫画・アニメ。麻雀番組での豪快な連荘シーンは多くのファンの記憶に刻まれている。"], annualPoints: [{ season: "2018-19", points: -283.4 }, { season: "2019-20", points: 20.9 }, { season: "2020-21", points: 57.0 }, { season: "2021-22", points: -405.5 }, { season: "2022-23", points: -34.3 }, { season: "2023-24", points: -1.9 }, { season: "2024-25", points: 170.7 }, { season: "2025-26", points: -83.8 }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 68, bestScore: 57400 }, videos: [
    { id: "9fYhjDfdNQ0", title: "【麻雀・Mリーグ2019 10/26放送】役満集#2 瀬戸熊直樹のＭリーグ初の四暗刻成就!! ＜雷電vsフェニックスvsドリブンズvs風林火山＞大和証券Mリーグ 毎週月火木金よる7時～アベマTV", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "iRwamKJlRM8", title: "瀬戸熊直樹､オーラス倍満で最強位!!【麻雀最強戦2021】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "aT4d57s5GPo", title: "【麻雀】\"卓上の暴君\"がお小遣い制!?かかあ天下の瀬戸熊家、お金のルールとは？＜21人の軌跡＞『熱闘！Mリーグ#17』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "hagiwara", name: "萩原聖人", nameEn: "Masato Hagiwara", furigana: "はぎわらまさと", org: "JPML", title: "", tags: ["俳優"], league: "—", period: "第34期", joinYear: 2018, birthday: "1971/08/21", gender: "male", href: "/players/hagiwara", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "神奈川県茅ヶ崎市", bloodType: "B型", hobby: "映画鑑賞", nickname: "雪原の求道者", bio: ["「俳優雀士」萩原聖人。神奈川県茅ヶ崎市出身、1971年8月21日生まれ。俳優・声優として数多くの作品に出演し、麻雀番組でも長く存在感を示してきた。", "2018年7月に日本プロ麻雀連盟入りが正式に承認され、第34期生としてプロ雀士のキャリアをスタート。Mリーグには2018年の開幕からTEAM RAIDEN/雷電の創設メンバーとして参加している。", "趣味は映画鑑賞。俳優としての表現力と真剣勝負への姿勢を併せ持つ存在として、対局中の佇まいや感情表現にもファンが多い。"], annualPoints: [{ season: "2018-19", points: -61.0 }, { season: "2019-20", points: -251.5 }, { season: "2020-21", points: -460.8 }, { season: "2021-22", points: -394.0 }, { season: "2022-23", points: -305.8 }, { season: "2023-24", points: -84.1 }, { season: "2024-25", points: -95.9 }, { season: "2025-26", points: -147.4 }], currentSeason: { season: "2025-26", topRate: 30, avoid4th: 73, bestScore: 48200 }, videos: [
    { id: "pwpgNyu7-WU", title: "【Mリーグ/麻雀】実況/桃、大興奮！！やっぱり持っているモノが違う？！TEAM RAIDEN / 雷電「萩原 聖人」幻の役満、天和チャンス！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "LV1_JsVr8XQ", title: "[麻雀-役満] 萩原聖人の国士無双 - 麻雀バトルロイヤル2017", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "gf0XlFs9TqE", title: "芸能人初のMリーガー俳優 萩原聖人に迫る！50歳目前でプロ雀士になろうと思ったきっかけやMリーグにかける思いとは『熱闘！Mリーグ#2』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "kurosawa", name: "黒沢咲", nameEn: "Saki Kurosawa", furigana: "くろさわさき", org: "JPML", title: "プロクイーン×2", tags: ["女流", "C1"], league: "C1", period: "第21期", joinYear: 2005, birthday: "10/06", gender: "female", href: "/players/kurosawa", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "北海道札幌市生まれ・東京都世田谷区出身", bloodType: "A型", nickname: "強気のヴィーナス", titles: [{"year":"2009","name":"第7期プロクイーン"},{"year":"2008","name":"第6期プロクイーン"}], bio: ["「強気のヴィーナス」黒沢咲。北海道札幌市生まれ、東京都世田谷区出身。生年は非公開で、10月6日生まれ。上智大学理工学部化学科卒業。", "日本プロ麻雀連盟第21期生・七段。現在は鳳凰戦C1リーグに参加し、Mリーグでは2018年からTEAM RAIDEN/雷電のメンバーとして戦っている。", "プロクイーンを第6期・第7期で連覇したタイトルホルダー。門前高打点を志向する打ち筋と、勝負どころで押し切る強さで知られる。"], annualPoints: [{ season: "2018-19", points: 116.9 }, { season: "2019-20", points: 150.5 }, { season: "2020-21", points: 193.3 }, { season: "2021-22", points: -148.8 }, { season: "2022-23", points: -9.2 }, { season: "2023-24", points: -215.0 }, { season: "2024-25", points: 99.4 }, { season: "2025-26", points: 109.9 }], currentSeason: { season: "2025-26", topRate: 34, avoid4th: 73, bestScore: 59700 }, videos: [
    { id: "UXbfKTRMMKY", title: "【地上波で話題沸騰】チーム雷電 黒沢咲、大逆転の四暗刻単騎｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "BveFfJnINnI", title: "Mリーグ2022｜黒沢咲 史上最高得点112700点！和了９回 全アガりシーンまとめ！実況解説:日吉辰哉 土田浩翔 #TEAM雷電（対局時 -39.1pt/1.2.4.3.3.3位）11/7(月)", channel: "Mリーグ アーカイブch", type: "tactics" },
    { id: "NFstEMF_N_8", title: "【麻雀】\"セレブMリーガー\"黒沢咲の手料理の腕前もプロ級で美しい...驚愕する大豪邸も初披露！＜21人の軌跡＞『熱闘！Mリーグ#20』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "honda", name: "本田朋広", nameEn: "Tomohiro Honda", furigana: "ほんだともひろ", org: "JPML", title: "麻雀グランプリMAX×2", tags: ["C2"], league: "C2", period: "第28期", joinYear: 2012, birthday: "1983/10/03", gender: "male", href: "/players/honda", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "富山県高岡市", bloodType: "A型", hobby: "映画鑑賞・格闘技観戦・筋トレ", nickname: "北陸の役満プリンス", rank: "六段", titles: [{"year":"2024","name":"第32期麻雀マスターズ2024"},{"year":"2020","name":"第11期麻雀グランプリMAX"},{"year":"2019","name":"第10期麻雀グランプリMAX"}], bio: ["「北陸の役満プリンス」本田朋広。富山県高岡市出身、1983年10月3日生まれ。高校中退後に大検を取得して大学へ進学し、卒業後は自らオーナーとして麻雀店を開いた。", "2012年に日本プロ麻雀連盟へ入会し、北陸支部を拠点に活動。第10期・第11期麻雀グランプリMAXを連覇し、2024年度には第32期麻雀マスターズも制した。2021年のMリーグドラフトでTEAM RAIDEN/雷電から指名され、Mリーグに参加している。", "血液型はA型。麻雀グランプリMAX予選で大三元を2回和了するなど、役満の印象も強いプロ。北陸から全国へ存在感を広げたタイトルホルダー。"], annualPoints: [{ season: "2021-22", points: -307.8 }, { season: "2022-23", points: 306.9 }, { season: "2023-24", points: -183.5 }, { season: "2024-25", points: 156.1 }, { season: "2025-26", points: -92.4 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 80, bestScore: 58400 }, videos: [
    { id: "F1ZOCxNaJk0", title: "【麻雀】ツモればダブル役満!!本田朋広の大三元・四暗刻!?【役満】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "qaMrdGcQvoo", title: "【奇跡の配牌】\"役満プリンス\"本田朋広の10年に1度の配牌!!ダブル役満なるか!?【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "T3jwFXS62tw", title: "本田朋広､大逆転の優勝チートイツ!!【麻雀最強戦2023 最強ハンサム決戦 名局㉓】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
  ] },

  // ── KONAMI麻雀格闘倶楽部 ────────────────────────────────────
  { id: "sasaki", name: "佐々木寿人", nameEn: "Hisato Sasaki", furigana: "ささきひさと", org: "JPML", title: "鳳凰位×3", tags: ["A1"], league: "A1", period: "第22期", joinYear: 2006, birthday: "1977/01/12", gender: "male", href: "/players/sasaki", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "宮城県仙台市", bloodType: "O型", hobby: "自分の勝った試合を見る", nickname: "麻雀攻めダルマ", rank: "八段", titles: [{"year":"2024","name":"第40期鳳凰位"},{"year":"2022","name":"第38期鳳凰位"},{"year":"2021","name":"第37期鳳凰位"},{"year":"2020","name":"麻雀日本シリーズ2020"},{"year":"2018","name":"麻雀日本シリーズ2018"},{"year":"2017","name":"第7期麻雀グランプリMAX"}], bio: ["「麻雀攻めダルマ」佐々木寿人。宮城県仙台市出身、1977年1月12日生まれ。東北学院大学に進学後、留年を機に中退し、麻雀の世界へ本格的に踏み込んだ。", "2006年に日本プロ麻雀連盟第22期生として入会。超攻撃型の雀風で知られ、第37期・第38期・第40期鳳凰位を獲得した連盟屈指のタイトルホルダー。Mリーグには2018年の発足時からKONAMI麻雀格闘倶楽部のメンバーとして参加している。", "趣味は自分の勝った試合を見ること。2016年の麻雀プロ団体日本一決定戦では放送対局初の地和、2018年のMリーグではMリーグ初の役満となる国士無双を和了するなど、大舞台での強烈な一撃と勝負強さでも知られる。"], annualPoints: [{ season: "2018-19", points: 228.3, note: "final" }, { season: "2019-20", points: 80.7, note: "semifinal" }, { season: "2020-21", points: 494.1, note: "semifinal" }, { season: "2021-22", points: -77.3, note: "final" }, { season: "2022-23", points: 213.3, note: "final" }, { season: "2023-24", points: 16.3, note: "semifinal" }, { season: "2024-25", points: 388.0, note: "semifinal" }, { season: "2025-26", points: 11.1 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 73, bestScore: 74400 }, videos: [
    { id: "dKHB110eGp8", title: "【衝撃役満】発生率0.00158％のチーホー出現！Mリーガー仰天集【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "4R7FLjnTck0", title: "【地上波で話題沸騰】#佐々木寿人 天国か地獄か･･･128秒の大長考の末に出した答えは!?｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "8h_cog-RH8k", title: "【ダブル役満】大逆転優勝!! \"魔王\"佐々木寿人の四暗刻単騎!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "takamiya", name: "高宮まり", nameEn: "Mari Takamiya", furigana: "たかみやまり", org: "JPML", title: "女流プロ麻雀日本シリーズ×2", tags: ["女流", "D1"], league: "D1", period: "第27期", joinYear: 2011, birthday: "1988/11/08", gender: "female", href: "/players/takamiya", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "茨城県", bloodType: "O型", nickname: "レディ・ベルセルク", rank: "五段", titles: [{"year":"2025","name":"女流プロ麻雀日本シリーズ2025"},{"year":"2016","name":"女流プロ麻雀日本シリーズ2016"},{"year":"2016","name":"初代てんパイクイーン"},{"year":"2013","name":"第11回女流モンド杯"}], bio: ["愛称「まりあんぬ」高宮まり。茨城県出身、1988年11月8日生まれ。2011年に日本プロ麻雀連盟第27期生としてプロ入りし、グラビアアイドルとしても活動している。", "2018年のMリーグ発足時にKONAMI麻雀格闘倶楽部からドラフト2巡目で指名され、初年度からMリーガーとして参加。女流プロ麻雀日本シリーズ2回、第11回女流モンド杯、初代てんパイクイーンなどの優勝歴を持つ。", "攻撃型の雀風で知られ、「レディ・ベルセルク」のキャッチフレーズを使用。Mリーグでも大物手を狙う華のある打ち筋で存在感を示している。"], annualPoints: [{ season: "2018-19", points: -273.9, note: "final" }, { season: "2019-20", points: 99.5, note: "semifinal" }, { season: "2020-21", points: -246.0, note: "semifinal" }, { season: "2021-22", points: -237.4, note: "final" }, { season: "2022-23", points: 194.1, note: "final" }, { season: "2023-24", points: -64.7, note: "semifinal" }, { season: "2024-25", points: -243.0, note: "semifinal" }, { season: "2025-26", points: 220.7 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 77, bestScore: 53800 }, videos: [
    { id: "1WfuDR3zzo4", title: "【Mリーグ】高宮まり、四暗刻！またもオーラス劇的な役満＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "OD4f7Aic-Uc", title: "高宮まり、強烈清一色炸裂!!", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "TkxUEwgY8oA", title: "高宮まりプロは打ち方終わってる武田鉄矢と最後まで笑わずに麻雀できるか？", channel: "霜降り明星せいやのイニミニチャンネル", type: "match" },
  ] },
  { id: "date", name: "伊達朱里紗", nameEn: "Arisa Date", furigana: "だてありさ", org: "JPML", title: "第1期桜蕾戦", tags: ["女流", "C1"], league: "C1", period: "第35期", joinYear: 2019, birthday: "1991/05/10", gender: "female", href: "/players/date", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "兵庫県三田市", bloodType: "B型", hobby: "水彩色鉛筆画・ライブ鑑賞", nickname: "朱きヴァルキュリア", rank: "三段", titles: [{"year":"2021","name":"第1期桜蕾戦"}], bio: ["「朱きヴァルキュリア」伊達朱里紗。兵庫県三田市出身、1991年5月10日生まれ。声優として活動しながら、2019年に日本プロ麻雀連盟第35期生としてプロ入りした。", "2021年に第1期桜蕾戦を制し、同年のMリーグドラフトでKONAMI麻雀格闘倶楽部から指名。Mリーグでは2021-22シーズンに最高スコア賞、2022-23シーズンにMVP、2023-24シーズンに4着回避率トップを獲得した。", "趣味は水彩色鉛筆画とライブ鑑賞。Mリーグ参戦後は3シーズン続けて個人表彰に名を連ね、KONAMI麻雀格闘倶楽部の主力の一人として実績を積み上げている。"], annualPoints: [{ season: "2021-22", points: 269.5, note: "final" }, { season: "2022-23", points: 320.2, note: "final" }, { season: "2023-24", points: 215.3, note: "semifinal" }, { season: "2024-25", points: 98.6, note: "semifinal" }, { season: "2025-26", points: 91.2 }], currentSeason: { season: "2025-26", topRate: 26, avoid4th: 73, bestScore: 60900 }, videos: [
    { id: "kvz7d2cuyJ4", title: "[Mリーグ] Mリーグ史上最高得点‼︎まさかの十万点越えが出た試合の配牌から和了までまとめ。朱きヴァルキリアの進撃が止まらない‼︎[切り抜き/麻雀/伊達朱里紗]", channel: "Mリーグ切り抜き集【切り抜き】", type: "match" },
    { id: "PDl0C8JMHHg", title: "【Mリーグ】伊達朱里紗、開幕初日に役満・四暗刻を和了＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "EppYxvNTjc4", title: "【役満】\"朱きヴァルキュリア\"伊達朱里紗の大逆転四暗刻!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "takizawa", name: "滝沢和典", nameEn: "Kazunori Takizawa", furigana: "たきざわかずのり", org: "JPML", title: "王位×2", tags: ["B1"], league: "B1", period: "第16期", joinYear: 2000, birthday: "1979/12/06", gender: "male", href: "/players/takizawa", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "新潟県長岡市", bloodType: "B型", hobby: "音楽鑑賞・ライブ", nickname: "麻雀バガボンド", rank: "八段", titles: [{"year":"2025","name":"第25回モンド杯"},{"year":"2012","name":"第13回モンド杯"},{"year":"2007","name":"第33期王位"},{"year":"2006","name":"第32期王位"}], bio: ["「麻雀バガボンド」滝沢和典。新潟県長岡市出身、1979年12月6日生まれ。2000年に日本プロ麻雀連盟第16期生としてプロ入りした。", "2006年に第32期王位を獲得し、翌2007年には第33期王位も制して連覇を達成。第13回・第25回モンド杯でも優勝している。Mリーグには2018年の開幕からEX風林火山のメンバーとして参戦し、2021年からKONAMI麻雀格闘倶楽部でプレーしている。", "趣味は音楽鑑賞とライブに行くこと。門前重視のバランス型の雀風や、牌捌き・所作の美しさでも知られる。"], annualPoints: [{ season: "2018-19", points: 314.8, team: "EX風林火山", note: "final" }, { season: "2019-20", points: -188.2, team: "EX風林火山" }, { season: "2020-21", points: 2.0, team: "EX風林火山", note: "final" }, { season: "2021-22", points: 294.2, note: "final" }, { season: "2022-23", points: -135.4, note: "final" }, { season: "2023-24", points: -120.0, note: "semifinal" }, { season: "2024-25", points: -35.6, note: "semifinal" }, { season: "2025-26", points: 368.4 }], currentSeason: { season: "2025-26", topRate: 42, avoid4th: 72, bestScore: 67400 }, videos: [
    { id: "W2jraWXAukY", title: "【役満炸裂】大三元！", channel: "M.LEAGUE", type: "highlight", isOfficial: true },
    { id: "sdGhpYzVgfw", title: "イケメン雀士 滝沢和典に迫る！栄光と挫折を経験した先にあったものとは？〈21人の軌跡〉『熱闘！Mリーグ#6』", channel: "M.LEAGUE", type: "interview", isOfficial: true },
    { id: "7sgz_PLFl3k", title: "なつかしい一局 時代を感じる1シーン", channel: "MONDO TV", type: "match", isOfficial: true },
  ] },

  // ── EX風林火山 ──────────────────────────────────────────────
  { id: "nikaido-a", name: "二階堂亜樹", nameEn: "Aki Nikaido", furigana: "にかいどうあき", org: "JPML", title: "女流桜花×2", tags: ["女流", "A2"], league: "A2", period: "第15期", joinYear: 1999, birthday: "1981/11/15", gender: "female", href: "/players/nikaido-a", mleagueTeam: "EX風林火山", birthplace: "神奈川県鎌倉市", bloodType: "O型", hobby: "漫画", nickname: "卓上の舞姫", rank: "七段", titles: [{"year":"2016","name":"第14回女流モンド杯"},{"year":"2008","name":"第3期女流桜花"},{"year":"2007","name":"第2期女流桜花"},{"year":"2005","name":"第3期プロクイーン"}], bio: ["「卓上の舞姫」二階堂亜樹。神奈川県鎌倉市出身、1981年11月15日生まれ。1999年に日本プロ麻雀連盟第15期生としてプロ入りした。", "姉の二階堂瑠美とともに「二階堂姉妹」として知られ、第2期・第3期女流桜花、第3期プロクイーン、第14回女流モンド杯などのタイトルを獲得。Mリーグには2018年の開幕からEX風林火山のメンバーとして参加している。", "趣味は漫画。第43期鳳凰戦ではA2リーグに所属し、テレビ対局やMリーグでも長く活動してきた日本プロ麻雀連盟所属の女流プロ。"], annualPoints: [{ season: "2018-19", points: -49.0, note: "final" }, { season: "2019-20", points: -286.4 }, { season: "2020-21", points: -37.5, note: "final" }, { season: "2021-22", points: 49.4, note: "semifinal" }, { season: "2022-23", points: 27.5, note: "final" }, { season: "2023-24", points: -123.6, note: "final" }, { season: "2024-25", points: 37.9 }, { season: "2025-26", points: 271.5 }], currentSeason: { season: "2025-26", topRate: 34, avoid4th: 76, bestScore: 65200 }, videos: [
    { id: "NnCtLPnDVkA", title: "【Mリーグ】二階堂亜樹、四暗刻単騎！狙いすましたリーチ＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "tcAJ1_Lo5YA", title: "二階堂亜樹､清老頭テンパイ!!【麻雀最強戦2017】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "THRN96VmmQQ", title: "【役満】二階堂亜樹の大三元！！【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "katsumata", name: "勝又健志", nameEn: "Kenji Katsumata", furigana: "かつまたけんじ", org: "JPML", title: "鳳凰位", tags: ["A1"], league: "A1", period: "第17期", joinYear: 2001, birthday: "1981/03/15", gender: "male", href: "/players/katsumata", mleagueTeam: "EX風林火山", birthplace: "東京都墨田区", bloodType: "B型", nickname: "麻雀軍師", titles: [{ year: "2024", name: "JPML WRC-Rリーグ24前期" }, { year: "2016", name: "第32期鳳凰位" }, { year: "2011", name: "第2期麻雀グランプリMAX" }], bio: ["「麻雀IQ220」「麻雀軍師」勝又健志。東京都出身、1981年3月15日生まれ。日本プロ麻雀連盟第17期生で、第31期から第43期まで13期連続で鳳凰戦A1リーグに在籍している。", "第32期鳳凰位、第2期麻雀グランプリMAXなどのタイトルを獲得。Mリーグには2018年の開幕からEX風林火山のメンバーとして参加している。", "日本プロ麻雀連盟公式インタビューでは「麻雀IQ220」がキャッチコピーとして紹介され、実況・解説を通じた洞察力にも触れられている。"], annualPoints: [{ season: "2018-19", points: 15.9, note: "final" }, { season: "2019-20", points: 0.5 }, { season: "2020-21", points: -73.3, note: "final" }, { season: "2021-22", points: 197.1, note: "semifinal" }, { season: "2022-23", points: 241.3, note: "final" }, { season: "2023-24", points: 404.2, note: "final" }, { season: "2024-25", points: -242.1 }, { season: "2025-26", points: -398.2 }], currentSeason: { season: "2025-26", topRate: 4, avoid4th: 75, bestScore: 50200 }, videos: [
    { id: "aNaQUBFzweg", title: "【2024-25】まさに天下無双！チームの窮地を救った軍師の国士無双【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "SfsOUI8bSUA", title: "【麻雀・Mリーグ 11/20 ハイライト】勝又衝撃のMリーグ初三倍満！＜風林火山vsABEMASvs雷電vsPirates＞『大和証券 Mリーグ』毎週月火木金よる7時生放送中", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "1XR1ToWerhM", title: "【麻雀】勝つために戦い続けた\"麻雀軍師\"の勝又健志に大きな変化が!?麻雀界の発展に向けファンへの想いとは？＜21人の軌跡＞『熱闘！Mリーグ#24』アベマTV全編公開中", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "nagai", name: "永井孝典", nameEn: "Kosuke Nagai", furigana: "ながい こうすけ", org: "最高位戦", title: "-", tags: ["C3"], league: "C3", titles: [], period: "第44期", joinYear: 2019, birthday: "1986/08/10", gender: "male", href: "/players/nagai", officialUrl: "https://saikouisen.com/members/nagai-kosuke/", mleagueTeam: "EX風林火山", birthplace: "愛知県田原市", bloodType: "B型", hobby: "競馬・野球観戦", nickname: "三河の猛将", bio: ["「フッ軽雀士」永井孝典。愛知県田原市出身、1986年8月10日生まれ。最高位戦日本プロ麻雀協会所属で、関西本部のC3リーグに所属している。", "EX風林火山のIKUSA-2024-で優勝し、2024-25シーズンは二代目SSPとして活動。Mリーグには2025-26シーズンよりEX風林火山のメンバーとして参加し、503.6pt、4着回避率85.29%を記録した。", "趣味は競馬と野球観戦。鈴木優とは同じ高校の出身で、永井が先輩にあたる。"], annualPoints: [{ season: "2025-26", points: 503.6 }], currentSeason: { season: "2025-26", topRate: 41, avoid4th: 85, bestScore: 67100 }, videos: [
    { id: "yMZJCX7_k9c", title: "【Mリーグ：永井孝典】これはまさに三河の猛将！渋川も認める強すぎる押し！！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "XgKKYqXBDY4", title: "【永井孝典】今季の主役は俺だ！！まさかまさかの劇的逆転劇で１０勝目！！", channel: "Mリーグを100倍楽しく観る方法🀄️", type: "highlight" },
    { id: "_ynUY-DrV4Q", title: "【Mリーグ】時が止まった！？ABEMAS『多井 隆晴』vs 風林火山『永井 孝典』打つ牌がナイ！？新シーズン初戦…まさかの苦しい放銃！！【麻雀/名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },
  { id: "uchikawa", name: "内川幸太郎", nameEn: "Kotaro Uchikawa", furigana: "うちかわこうたろう", org: "JPML", title: "十段位", tags: ["A1"], league: "A1", period: "第22期", joinYear: 2005, birthday: "1981/05/06", gender: "male", href: "/players/uchikawa", mleagueTeam: "EX風林火山", birthplace: "長野県松本市", bloodType: "O型", nickname: "手順マエストロ", titles: [{"year":"2025","name":"第4回リーチ麻雀世界選手権"},{"year":"2018","name":"第35期十段位"}], bio: ["「手順マエストロ」内川幸太郎。長野県松本市出身、1981年5月6日生まれ。長野県松本深志高校卒業後、20歳頃に松本市内の雀荘を共同経営し、2005年に日本プロ麻雀連盟第22期生としてプロ入りした。", "第35期十段位、第4回リーチ麻雀世界選手権などを制したタイトルホルダー。Mリーグには2019-20シーズンからKADOKAWAサクラナイツの創設メンバーとして参加し、2025-26シーズンよりEX風林火山へ移籍した。", "「手順マエストロ」の異名で知られ、積み重ねるような手順を武器にMリーグでも長く戦っている。"], annualPoints: [{ season: "2019-20", points: -33.1, team: "KADOKAWAサクラナイツ", note: "final" }, { season: "2020-21", points: 468.7, team: "KADOKAWAサクラナイツ", note: "final" }, { season: "2021-22", points: -139.7, team: "KADOKAWAサクラナイツ", note: "final" }, { season: "2022-23", points: 151.1, team: "KADOKAWAサクラナイツ", note: "semifinal" }, { season: "2023-24", points: -204.8, team: "KADOKAWAサクラナイツ", note: "final" }, { season: "2024-25", points: -56.6, team: "KADOKAWAサクラナイツ" }, { season: "2025-26", points: 320.4 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 83, bestScore: 104700 }, videos: [
    { id: "l2JHvS9CvFA", title: "伝説の『西』放銃を楽屋の映像とともに振り返る", channel: "サクラナイツマニア【サクラナイツ切り抜き】", type: "highlight", isOfficial: true },
    { id: "IK2mCDy6jbo", title: "【麻雀】\"持ってる男\"内川幸太郎！Mリーグ指名直後に国士無双！【役満】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "E80uw88YfYw", title: "【役満】\"手順マエストロ\"内川幸太郎の高速国士無双!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },

  // ── BEAST X ─────────────────────────────────────────────────
  { id: "suzuki-d", name: "鈴木大介", nameEn: "Daisuke Suzuki", furigana: "すずきだいすけ", org: "JPML", title: "最強位", tags: ["棋士", "A1"], league: "A1", period: "第39期", joinYear: 2023, birthday: "1974/07/11", gender: "male", href: "/players/suzuki-d", mleagueTeam: "BEAST X", birthplace: "東京都町田市", bloodType: "A型", hobby: "競馬・囲碁・ゴルフ", nickname: "二刀流ブルドーザー", rank: "五段", titles: [{ year: "2019", name: "麻雀最強戦2019 最強位" }], bio: ["「二刀流ブルドーザー」鈴木大介。東京都町田市出身、1974年7月11日生まれ。将棋棋士（棋士番号213・九段）として現在も活動しながら、麻雀では2019年に麻雀最強戦を制して最強位を獲得。麻雀最強戦では6年連続でファイナルに進出した。", "2023年5月に日本プロ麻雀連盟第39期生として入会。同年のMリーグドラフト会議でBEAST Japanextから指名され、Mリーグに参加した。2024-25シーズンにはMリーグ最高スコア賞を獲得し、鳳凰戦では連続昇級でA1リーグまで駆け上がって団体内でも存在感を高めている。", "将棋では1994年に20歳でプロ棋士となり、2017年に九段へ昇段。趣味は競馬・囲碁・ゴルフ。将棋で培った大局観と高打点志向を併せ持つ、唯一無二の二刀流プロ。"], annualPoints: [{ season: "2023-24", points: -97.2 }, { season: "2024-25", points: 30.0 }, { season: "2025-26", points: -159.3 }], currentSeason: { season: "2025-26", topRate: 18, avoid4th: 66, bestScore: 58600 }, videos: [
    { id: "jNQnHNC3xas", title: "【2024-25】鈴木大介、チーム窮地を救う大三元成就！【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "J617C-Pzwls", title: "【2023-24】二刀流ブルドーザー鈴木大介！インパクト絶大の和了集！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "H6PGjJZ4MWc", title: "鈴木大介､心へし折る!!【麻雀最強戦2019】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "nakata", name: "中田花奈", nameEn: "Kana Nakata", furigana: "なかだかな", org: "JPML", title: "-", tags: ["女流", "アイドル"], league: "E1", period: "", joinYear: 2021, birthday: "1994/08/06", gender: "female", href: "/players/nakata", mleagueTeam: "BEAST X", birthplace: "埼玉県", bloodType: "A型", hobby: "麻雀・経営", nickname: "純卓のインフルエンサー", titles: [], bio: ["「純卓のインフルエンサー」中田花奈。埼玉県出身、1994年8月6日生まれ。乃木坂46の元メンバーで、2021年に日本プロ麻雀連盟のプロテストに正規合格し、プロ雀士としての活動を始めた。", "2023年のMリーグドラフト会議でBEAST Japanext（現BEAST X）から指名され、2023-24シーズンよりMリーグに参加。麻雀カフェ「chun.」のオーナー店長としても知られる。", "アイドル活動で培った発信力を活かし、プロ雀士・店舗経営者としての活動を並行している。"], annualPoints: [{ season: "2023-24", points: -261.3 }, { season: "2024-25", points: -575.4 }, { season: "2025-26", points: 228.4 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 81, bestScore: 65100 }, videos: [
    { id: "qyu0IFKd9QA", title: "【中田花奈】ビーストの女神が大暴れ‼️強者３人を、ぶった斬る‼️", channel: "Mリーグを100倍楽しく観る方法🀄️", type: "match" },
    { id: "imo79YSlWDQ", title: "中田花奈､18000!!【麻雀最強戦2023 最強＆インフルエンサー決戦 名局①】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "8OuFFxBkF1w", title: "【2023-24】純卓のインフルエンサー中田花奈！初アガリで華やかな跳満ツモ！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
  ] },
  { id: "shimoishi", name: "下石戟", nameEn: "Geki Shimoishi", furigana: "しもいし げき", org: "NPM", title: "RMUクラウン", tags: ["A1"], league: "A1", period: "第8期前期", joinYear: 2009, birthday: "1987/03/20", gender: "male", href: "/players/shimoishi", officialUrl: "https://npm2001.com/player/shimoishi-geki/", mleagueTeam: "BEAST X", birthplace: "滋賀県", bloodType: "B型", nickname: "鬼神", titles: [{"year":"2023","name":"第15期RMUクラウン"}], bio: ["「鬼神」下石戟。滋賀県出身、1987年3月20日生まれ。日本プロ麻雀協会第8期前期入会で、A1リーグに所属している。プロ入り当初は下井重貴の名で活動し、後に現在の下石戟へ改名した。", "2025-26シーズンよりBEAST XのメンバーとしてMリーグに参加。メンバー入替オーディションを経てドラフト指名を受け、同シーズンはMリーグMVPを獲得した。", "第15期RMUクラウンのタイトルを持つ。協会A1リーグや各種タイトル戦で実績を重ねてきた。"], annualPoints: [{ season: "2025-26", points: 614.0 }], currentSeason: { season: "2025-26", topRate: 36, avoid4th: 84, bestScore: 58000 }, videos: [
    { id: "GMZIHTB9Au4", title: "【2025-26】鬼神 #下石戟 の手に舞い降りた三種の神器！開局に閃光の親大三元！【#Mリーグ 公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "H8IHDSvxMcU", title: "【地和】衝撃の下石戟【出現確率0.00158％】", channel: "日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "G3Lvwp-2duE", title: "【天和】世界初！生放送対局にて炸裂！【役満】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },
  { id: "tojo", name: "東城りお", nameEn: "Rio Tojo", furigana: "とうじょうりお", org: "JPML", title: "-", tags: ["女流", "D2"], league: "D2", period: "第29期", joinYear: 2013, birthday: "1990/09/18", gender: "female", href: "/players/tojo", mleagueTeam: "BEAST X", birthplace: "秋田県潟上市", bloodType: "O型", hobby: "ゲーム・アニメ", nickname: "ミスパーフェクト", titles: [], bio: ["「ミスパーフェクト」東城りお。秋田県潟上市出身、1990年9月18日生まれ。日本プロ麻雀連盟第29期生で、鳳凰戦D2リーグに所属している。", "2010年に日本プロ麻雀協会でプロ入りし、伊藤優孝・山田浩之・前原雄大の影響を受けて、2011年に日本プロ麻雀連盟へ移籍した。Mリーグには2021-22シーズンからセガサミーフェニックスで参加し、2025-26シーズンよりBEAST Xに所属している。", "第15期夕刊フジ杯麻雀女王を獲得。趣味はゲームとアニメで、明るいキャラクターでも知られる。"], annualPoints: [{ season: "2021-22", points: 55.9, team: "セガサミーフェニックス", note: "final" }, { season: "2022-23", points: 163.0, team: "セガサミーフェニックス" }, { season: "2023-24", points: -231.6, team: "セガサミーフェニックス" }, { season: "2025-26", points: 6.6 }], currentSeason: { season: "2025-26", topRate: 28, avoid4th: 78, bestScore: 48400 }, videos: [
    { id: "yLX4Tj4Z8Dw", title: "【役満】\"ミス・パーフェクト\"東城りお 逆転優勝へ望みをつなぐ四暗刻!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "p8DSjT5DcOQ", title: "ミス・パーフェクト東城りお！🀄鳴かずからの6000オールツモ！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "KFQRdTsdrRE", title: "【東城りお】Mリーグ7万点越えの初トップ！親番から炸裂する勝負強さ", channel: "激闘Mリーグ", type: "highlight" },
  ] },

  // ── 赤坂ドリブンズ ───────────────────────────────────────────
  { id: "sonoda", name: "園田賢", nameEn: "Ken Sonoda", furigana: "そのだ けん", org: "最高位戦", title: "-", tags: ["A1"], league: "A1", titles: [], period: "第28期後期", joinYear: 2003, birthday: "1980/11/25", gender: "male", href: "/players/sonoda", officialUrl: "https://saikouisen.com/members/sonoda-ken/", mleagueTeam: "赤坂ドリブンズ", birthplace: "兵庫県神戸市", bloodType: "A型", hobby: "カラオケ・お酒", nickname: "卓上の魔術師", bio: ["「卓上の魔術師」園田賢。兵庫県神戸市出身、1980年11月25日生まれ。慶應義塾大学環境情報学部卒業。2003年に最高位戦日本プロ麻雀協会へ入会した第28期後期生で、現在はA1リーグに所属している。", "2016年にB1リーグ1位でAリーグへ昇級し、2017年・2018年・2021年・2022年に最高位決定戦へ進出。Mリーグには2018年の発足時から赤坂ドリブンズのメンバーとして参加し、初年度の優勝に貢献した。", "趣味はカラオケとお酒。表計算ソフトを得意とし、最高位戦の配信向けテロップ出しシステムをExcel VBAとPowerPointで構築するなど、対局外でも発信と工夫を続けている。"], annualPoints: [{ season: "2018-19", points: 123.2, note: "final" }, { season: "2019-20", points: -377.6 }, { season: "2020-21", points: -28.7, note: "final" }, { season: "2021-22", points: -56.7 }, { season: "2022-23", points: 262.1 }, { season: "2023-24", points: 205.1, note: "final" }, { season: "2024-25", points: 398.6, note: "final" }, { season: "2025-26", points: 402.7 }], currentSeason: { season: "2025-26", topRate: 36, avoid4th: 80, bestScore: 57000 }, videos: [
    { id: "1h3vJ_vx_JY", title: "【2024-25】レギュラー最終戦に大波乱を起こす園田賢の国士無双！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "-GxK80NY3o0", title: "【Mリーグ】園田賢、オーラスに国士無双炸裂！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "e4F7Xervd2E", title: "【Mリーグ/麻雀】そんな夢のような手牌、見たことない！！赤坂ドリブンズ「園田 賢」吹き荒れる追い風を背にチャンタ二盃口を和了！！チームを救うのは彼しかいない？！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },
  { id: "suzuki-t", name: "鈴木たろう", nameEn: "Taro Suzuki", furigana: "すずき たろう", org: "最高位戦", title: "雀王×4", tags: ["A1"], league: "A1", period: "第45期後期", joinYear: 2020, birthday: "1973/10/04", gender: "male", href: "/players/suzuki-t", officialUrl: "https://saikouisen.com/members/suzuki-taro/", mleagueTeam: "赤坂ドリブンズ", birthplace: "茨城県", bloodType: "B型", hobby: "ポーカー・将棋", nickname: "ゼウスの選択", titles: [{"year":"2014","name":"第13期雀王"},{"year":"2013","name":"第12期雀王"},{"year":"2012","name":"第11期雀王"},{"year":"2010","name":"第9期雀王"}], bio: ["「ゼウスの選択」鈴木たろう。茨城県水海道市（現常総市）出身、1973年10月4日生まれ。日本プロ麻雀棋士会・日本プロ麻雀協会を経て、2020年11月に最高位戦日本プロ麻雀協会へ移籍した。", "日本プロ麻雀協会時代に第9・11・12・13期雀王を獲得したタイトルホルダー。最高位戦では第45期後期入会で、現在はA1リーグに所属している。Mリーグには2018年の発足時から赤坂ドリブンズのメンバーとして参加している。", "趣味はポーカーと将棋。Mリーグ初年度に赤坂ドリブンズの優勝に貢献し、移籍後も最高位戦A1リーグとMリーグの両方で活動を続けている。"], annualPoints: [{ season: "2018-19", points: 30.1, note: "final" }, { season: "2019-20", points: -125.6 }, { season: "2020-21", points: 6.5, note: "final" }, { season: "2021-22", points: 132.0 }, { season: "2022-23", points: -327.3 }, { season: "2023-24", points: 211.2, note: "final" }, { season: "2024-25", points: 262.5, note: "final" }, { season: "2025-26", points: -334.9 }], currentSeason: { season: "2025-26", topRate: 10, avoid4th: 75, bestScore: 50100 }, videos: [
    { id: "9YBP54Nr6wE", title: "役満激突!! 四暗刻vs国士無双【麻雀最強戦2023 骨肉の争い 名局⑲】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
    { id: "2V5DjwGbelc", title: "【役満】鈴木たろうの国士無双【第50期最高位戦A1リーグ第8節】 #鈴木たろう #国士無双", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "iDsBNwIvEIc", title: "鈴木たろう(Mリーグ)最高スコア更新の11万2800点！ 【おかぴーの麻雀教室】", channel: "おかぴーの麻雀教室【KADOKAWAサクラナイツ・切り抜き】", type: "match", isOfficial: true },
  ] },
  { id: "asami", name: "浅見真紀", nameEn: "Maki Asami", furigana: "あさみ まき", org: "最高位戦", title: "女流最高位", tags: ["女流", "C3"], league: "C3", period: "第35期前期", joinYear: 2010, birthday: "1985/08/30", gender: "female", href: "/players/asami", officialUrl: "https://saikouisen.com/members/asami-maki/", mleagueTeam: "赤坂ドリブンズ", birthplace: "埼玉県所沢市", bloodType: "O型", hobby: "似顔絵を描くこと", nickname: "聡明なるバイプレイヤー", titles: [{"year":"2025","name":"第25期女流最高位"}], bio: ["「聡明なるバイプレイヤー」浅見真紀。埼玉県所沢市出身、1985年8月30日生まれ。千葉大学大学院工学研究科デザイン科学専攻を修了し、2010年に最高位戦日本プロ麻雀協会第35期前期生としてプロ入りした。", "最高位戦ではC3リーグと女流Aリーグに所属。2023年のMリーグドラフトで赤坂ドリブンズから指名され、2023-24シーズンよりMリーグに参加している。", "2025年に第25期女流最高位を獲得。趣味は似顔絵を描くことで、チームの「聡明なるバイプレイヤー」として活動している。"], annualPoints: [{ season: "2023-24", points: -107.2, note: "final" }, { season: "2024-25", points: 255.1, note: "final" }, { season: "2025-26", points: -104.1 }], currentSeason: { season: "2025-26", topRate: 18, avoid4th: 81, bestScore: 60400 }, videos: [
    { id: "vZmYt1lYL6A", title: "【2023-24】ドリブンズ新加入のシンデレラ！浅見真紀、2件立直に覚悟の押し切り！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "_L5KdHMbK58", title: "[麻雀-役満]浅見真紀の国士無双-第9回女流モンド杯", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "mHALR4svenY", title: "【役満】浅見真紀の大三元【第25期最高位戦女流Aリーグ第1節】 #浅見真紀 #大三元", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "watanabe", name: "渡辺太", nameEn: "Futoshi Watanabe", furigana: "わたなべ ふとし", org: "最高位戦", title: "天鳳位×3", tags: ["A2"], league: "A2", period: "第48期前期", joinYear: 2022, birthday: "1988/07/25", gender: "male", href: "/players/watanabe", officialUrl: "https://saikouisen.com/members/watanabe-futoshi/", mleagueTeam: "赤坂ドリブンズ", birthplace: "埼玉県さいたま市", bloodType: "A型", hobby: "カラオケ・将棋観戦", nickname: "麻雀シンギュラリティ", titles: [{ year: "2026", name: "第34期麻雀マスターズ" }, { year: "2025", name: "インターネット麻雀日本選手権2025" }, { year: "2020", name: "第16代4麻天鳳位" }, { year: "2019", name: "第14代3麻天鳳位" }, { year: "2014", name: "第5代4麻天鳳位" }], bio: ["「麻雀シンギュラリティ」渡辺太。埼玉県さいたま市出身、1988年7月25日生まれ。医師として働きながら競技麻雀でも活動し、オンライン麻雀「天鳳」では三度天鳳位に到達した。", "2022年に最高位戦日本プロ麻雀協会へ第48期前期生として入会し、現在はA2リーグに所属。2023年のMリーグドラフトで赤坂ドリブンズから指名され、2023-24シーズンよりMリーグに参加している。", "2025年にインターネット麻雀日本選手権、2026年に第34期麻雀マスターズを獲得。趣味はカラオケと将棋観戦。"], annualPoints: [{ season: "2023-24", points: 36.2, note: "final" }, { season: "2024-25", points: 199.3, note: "final" }, { season: "2025-26", points: 282.9 }], currentSeason: { season: "2025-26", topRate: 30, avoid4th: 81, bestScore: 68300 }, videos: [
    { id: "MqanBp0OuGk", title: "【2025-26】48000点は12000オールで追いつく!! #渡辺太 淀みないツモで親トリプルツモ！！【#Mリーグ 公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "XuvVWMCw_x0", title: "【渡辺太】役満より珍しい三倍満", channel: "激闘Mリーグ", type: "highlight" },
    { id: "6pewHME5YAg", title: "【Mリーグ/麻雀】解説/仲林「お見事ですね…」これはマジでスゴイ！！赤坂ドリブンズ『渡辺 太』あの手をアガリまで…！！ゲームを決めかねぬ七対子！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },

  // ── セガサミーフェニックス ────────────────────────────────────
  { id: "kayamori", name: "茅森早香", nameEn: "Sayaka Kayamori", furigana: "かやもり さやか", org: "最高位戦", title: "女流最高位", tags: ["女流"], league: "女流B", period: "第26期後期", joinYear: 2001, birthday: "1982/05/04", gender: "female", href: "/players/kayamori", officialUrl: "https://saikouisen.com/members/kayamori-sayaka/", mleagueTeam: "セガサミーフェニックス", birthplace: "北海道苫小牧市", bloodType: "B型", hobby: "猫を愛でること、ハイボールを飲むこと、ゴルフ", nickname: "天才すぎるオンナ雀士", titles: [{"year":"2011","name":"第11期女流最高位"},{"year":"2016","name":"第13回女流モンド杯"},{"year":"2004","name":"第2回女流モンド杯"}], bio: ["「天才すぎるオンナ雀士」茅森早香。北海道苫小牧市出身、1982年5月4日生まれ。北海道苫小牧西高校中退後、2001年に最高位戦日本プロ麻雀協会へ入会した第26期後期生。", "第11期女流最高位、第2回・第13回女流モンド杯などのタイトルを獲得。Mリーグには2018年の発足時からセガサミーフェニックスのメンバーとして参加し、2025-26シーズンより選手兼任監督を務めている。", "最高位戦では女流Bリーグに所属。趣味は猫を愛でること、ハイボールを飲むこと、ゴルフ。"], annualPoints: [{ season: "2018-19", points: -65.4 }, { season: "2019-20", points: -157.9, note: "final" }, { season: "2020-21", points: 110.2 }, { season: "2021-22", points: 251.6, note: "final" }, { season: "2022-23", points: -186.3 }, { season: "2023-24", points: -165.7 }, { season: "2024-25", points: -223.3, note: "semifinal" }, { season: "2025-26", points: -58.9 }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 76, bestScore: 79600 }, videos: [
    { id: "pM8YHDKDnN8", title: "【役満】\"天才過ぎる女雀士\"茅森早香 一発逆転の字一色！！【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "G745a1HBLMg", title: "[麻雀-役満]茅森早香の四暗刻単騎-第3回女流モンド21杯", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "xJqRC0-VNos", title: "【再up】全員ドン引き・・・　茅森の倍満清一色　「切り抜き」", channel: "頭文字M 「Mリーグ切り抜き」", type: "match" },
  ] },
  { id: "daigo", name: "醍醐大", nameEn: "Hiroshi Daigo", furigana: "だいご ひろし", org: "最高位戦", title: "最高位", tags: ["A2"], league: "A2", period: "第30期前期", joinYear: 2005, birthday: "1976/04/21", gender: "male", href: "/players/daigo", officialUrl: "https://saikouisen.com/members/daigo-hiroshi/", mleagueTeam: "セガサミーフェニックス", birthplace: "千葉県", bloodType: "O型", hobby: "将棋・人狼・サウナ", nickname: "先切り十段", titles: [{"year":"2021","name":"第45期最高位"},{"year":"2020","name":"第23回BIG1カップ"}], bio: ["「先切り十段」醍醐大。千葉県出身、1976年4月21日生まれ。最高位戦日本プロ麻雀協会第30期前期生で、A2リーグに所属している。", "第45期最高位、第23回BIG1カップなどのタイトルを持つ。Mリーグには2023年のドラフトでセガサミーフェニックスから指名され、2023-24シーズンより参加している。", "趣味は将棋・人狼・サウナ。2024-25シーズンにはMリーグ個人MVPを獲得した。"], annualPoints: [{ season: "2023-24", points: -214.4 }, { season: "2024-25", points: 438.6, note: "semifinal" }, { season: "2025-26", points: 113.0 }], currentSeason: { season: "2025-26", topRate: 29, avoid4th: 75, bestScore: 60500 }, videos: [
    { id: "qZtIajQ8GOo", title: "【Mリーグ】「お前の手で決めろ…」セガサミーフェニックス『醍醐 大』激闘ファイナル最終決戦…！！初優勝を決めた痺れすぎるオーラス！！【麻雀/名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "CKXQMjzAL5w", title: "【醍醐大の鳥肌名シーン】これを止めるのが最高位です【47期最高位決定戦】", channel: "最高位戦日本プロ麻雀協会", type: "match", isOfficial: true },
    { id: "xoZUQ_v8dCY", title: "【役満】醍醐大の四暗刻【第50期最高位戦A2リーグ第3節】 #醍醐大 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "takeuchi", name: "竹内元太", nameEn: "Genta Takeuchi", furigana: "たけうち げんた", org: "最高位戦", title: "最高位×2", tags: ["A1"], league: "A1", period: "第38期前期", joinYear: 2013, birthday: "1986/03/12", gender: "male", href: "/players/takeuchi", officialUrl: "https://saikouisen.com/members/takeuchi-genta/", mleagueTeam: "セガサミーフェニックス", birthplace: "長野県", bloodType: "O型", hobby: "登山・ダジャレ", nickname: "無敵のタイタン", titles: [{"year":"2024","name":"第48期最高位"},{"year":"2023","name":"第47期最高位"},{"year":"2023","name":"第7期新輝戦"},{"year":"2022","name":"第24回BIG1カップ"}], bio: ["「無敵のタイタン」竹内元太。長野県出身、1986年3月12日生まれ。最高位戦日本プロ麻雀協会第38期前期生で、A1リーグに所属している。", "第47期・第48期最高位を連覇し、第24回BIG1カップ、第7期新輝戦も制している。Mリーグには2024年のドラフトでセガサミーフェニックスから指名され、2024-25シーズンより参加している。", "趣味は登山とダジャレ。都内で麻雀教室「元太麻雀ラボ」を主宰している。"], annualPoints: [{ season: "2024-25", points: 339.8, note: "semifinal" }, { season: "2025-26", points: 151.8 }], currentSeason: { season: "2025-26", topRate: 27, avoid4th: 81, bestScore: 58200 }, videos: [
    { id: "-LAKBwehl3Y", title: "【Mリーグ：竹内元太】狙い定めた先切りが大成功！戦闘民族の守備を上回る！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "ljSD-wug0JE", title: "【役満】出て倍満・ツモって役満の超大物手、ツモる手がしなる！！【第47期最高位決定戦】#竹内元太", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "j8Pg71xQV4k", title: "【役満】竹内元太の国士無双【第50期最高位戦A1リーグ第9節】 #竹内元太 #国士無双", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "sano_hinako", name: "佐野ひなこ", nameEn: "Hinako Sano", furigana: "さの ひなこ", org: "最高位戦", title: "-", tags: ["女流", "D2"], league: "D2", period: "第49期前期", joinYear: 2024, birthday: "1994/10/13", gender: "female", href: "/players/sano_hinako", officialUrl: "https://saikouisen.com/members/sano-hinako/", mleagueTeam: "セガサミーフェニックス", birthplace: "東京都杉並区", titles: [], bio: ["佐野ひなこ。東京都杉並区出身、1994年10月13日生まれ。グラビアアイドル・女優として活動し、2024年に最高位戦日本プロ麻雀協会へ入会した。", "最高位戦では第49期前期生で、D2リーグに所属。2026年6月25日のMリーグ2026-27ドラフト会議でセガサミーフェニックスから指名された。", "芸能活動での発信力を持ちながら、プロ雀士としてMリーグの舞台に挑む。"], videos: [
    { id: "IaF4m8jVyUI", title: "Player Interview 佐野 ひなこ", channel: "U-NEXT Pirates", type: "interview", isOfficial: true },
  ] },
  { id: "asai", name: "浅井堂岐", nameEn: "Doki Asai", furigana: "あさい たかき", org: "NPM", title: "雀王", tags: [], league: "A1", period: "", joinYear: 2010, birthday: "1985/12/24", gender: "male", href: "/players/asai", officialUrl: "https://npm2001.com/player/asai-takaki/", birthplace: "埼玉県", bloodType: "O型", hobby: "ITエンジニアリング", nickname: "逆襲のヘラクレス", titles: [{"year":"2022","name":"第21期雀王"},{"year":"2021","name":"初代皓王位"}], bio: ["「逆襲のヘラクレス」浅井堂岐。埼玉県出身、1985年生まれ。日本プロ麻雀協会所属。", "第21期雀王、初代皓王位などのタイトルを持つ。Mリーグには2024-25シーズンから2025-26シーズンまでセガサミーフェニックスで参加した。", "ITエンジニアとしての顔も持つタイトルホルダー。"], annualPoints: [{ season: "2024-25", points: -215.3, team: "セガサミーフェニックス", note: "semifinal" }, { season: "2025-26", points: -81.7, team: "セガサミーフェニックス" }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 68, bestScore: 55900 }, videos: [
    { id: "Ra31_zOJFfg", title: "【Mリーグ：浅井堂岐】スルっときたーーーー！！！最高打点の役満を見事にモノにする！！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "highlight" },
    { id: "ejh4r8DHFJU", title: "【浅井堂岐】開いた口が塞がらない…Mリーグ史に残る「ドラだらけ」の三倍満", channel: "激闘Mリーグ", type: "match" },
    { id: "FCK5kRNZAy0", title: "【浅井堂岐】裏3の倍満条件満たしてオーラスミラクル大逆転", channel: "激闘Mリーグ", type: "highlight" },
  ] },

  // ── 渋谷ABEMAS ───────────────────────────────────────────────
  { id: "taii", name: "多井隆晴", nameEn: "Takaharu Oi", furigana: "おおい たかはる", org: "RMU", title: "令昭位×5", tags: ["A1"], league: "A1", period: "", joinYear: 1995, birthday: "1972/03/17", gender: "male", href: "/players/taii", officialUrl: "https://rmu.jp/player/prof/1001.htm", mleagueTeam: "渋谷ABEMAS", birthplace: "東京都葛飾区", bloodType: "B型", hobby: "映画鑑賞・漫画・アニメ", nickname: "最速最強", license: "SSS", titles: [{"year":"2021","name":"麻雀日本シリーズ2021"},{"year":"2020","name":"最強位2020"},{"year":"2020","name":"第11期令昭位"},{"year":"2017","name":"第8期令昭位"},{"year":"2016","name":"麻雀日本シリーズ2016"},{"year":"2016","name":"RTDリーグ2016"},{"year":"2015","name":"麻雀日本シリーズ2015"},{"year":"2015","name":"第6期令昭位"},{"year":"2013","name":"第5期RMUクラウン"},{"year":"2012","name":"第3期令昭位"},{"year":"2010","name":"第1期令昭位"},{"year":"2006","name":"第31期王位"},{"year":"2003","name":"第1回日本オープン"}], bio: ["「最速最強」多井隆晴。東京都葛飾区出身、1972年3月17日生まれ。RMU所属で、同団体の代表を務めるSSSライセンス保持者。", "令昭位（第1・3・6・8・11期）を獲得し、王位・日本オープン・麻雀日本シリーズ・最強位などの実績を持つ。Mリーグには2018年の開幕から渋谷ABEMASで参加し、2022-23シーズンにはチーム優勝を経験した。", "趣味は映画鑑賞・漫画・アニメ。YouTubeチャンネル「たかちゃんねる」でも発信している。"], annualPoints: [{ season: "2018-19", points: 476.3, note: "final" }, { season: "2019-20", points: 211.4, note: "final" }, { season: "2020-21", points: 234.4, note: "final" }, { season: "2021-22", points: 242.2, note: "final" }, { season: "2022-23", points: -91.6, note: "final" }, { season: "2023-24", points: 30.6, note: "semifinal" }, { season: "2024-25", points: -262.8, note: "semifinal" }, { season: "2025-26", points: 123.4 }], currentSeason: { season: "2025-26", topRate: 28, avoid4th: 84, bestScore: 58400 }, videos: [
    { id: "r7vBnr0mSCM", title: "【役満】Mリーガー「最速最強」多井隆晴の四暗刻【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "gS9EVU9ReTM", title: "麻雀界のカリスマ多井隆晴に迫る！研究熱が衰えることなく麻雀にかける理由は\"恩返し\"Mリーグにへの思いとは『熱闘！Mリーグ#3』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
    { id: "nkY75lB82Cw", title: "【2023-24】麻雀星人、多井隆晴の見事な押し返し！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
  ] },
  { id: "shiratori", name: "白鳥翔", nameEn: "Sho Shiratori", furigana: "しらとりしょう", org: "JPML", title: "鳳凰位×2", tags: ["A1"], league: "A1", period: "第23期", joinYear: 2006, birthday: "1986/08/27", gender: "male", href: "/players/shiratori", mleagueTeam: "渋谷ABEMAS", birthplace: "東京都練馬区", bloodType: "A型", hobby: "e-Sports", nickname: "麻雀ハイブリッド", rank: "八段", titles: [{"year":"2026","name":"第6期鸞和戦"},{"year":"2025","name":"第42期鳳凰位"},{"year":"2024","name":"第41期鳳凰位"},{"year":"2024","name":"第15期麻雀グランプリMAX"},{"year":"2023","name":"第23回モンド杯"},{"year":"2021","name":"第22回モンド杯"},{"year":"2020","name":"第28期發王位"},{"year":"2018","name":"第18回モンド杯"},{"year":"2017","name":"第25期麻雀マスターズ"},{"year":"2016","name":"第24期麻雀マスターズ"}], bio: ["「麻雀ハイブリッド」白鳥翔。東京都練馬区出身、1986年8月27日生まれ。慶應義塾大学商学部卒業後、2006年に日本プロ麻雀連盟第23期生としてプロ入り。現在は同団体理事・八段。", "第41期・第42期鳳凰位を連覇し、2026年には第6期鸞和戦も制した。發王位、麻雀マスターズ、麻雀グランプリMAX、モンド杯などのタイトルも持つ。Mリーグには2018年の開幕から渋谷ABEMASのメンバーとして参加している。", "趣味はe-Sports。自身のYouTubeチャンネルでは麻雀やゲーム実況も発信している。"], annualPoints: [{ season: "2018-19", points: -313.8, note: "final" }, { season: "2019-20", points: 290.2, note: "final" }, { season: "2020-21", points: 109.7, note: "final" }, { season: "2021-22", points: 108.8, note: "final" }, { season: "2022-23", points: -84.7, note: "final" }, { season: "2023-24", points: -83.6, note: "semifinal" }, { season: "2024-25", points: 404.0, note: "semifinal" }, { season: "2025-26", points: 110.2 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 85, bestScore: 45400 }, videos: [
    { id: "eZ9bdpIp6hM", title: "【役満集#4】 四暗刻単騎待ち【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "byEkDzjUx0w", title: "今期2度目の役満！白鳥翔の四暗刻", channel: "おかぴーの麻雀教室【KADOKAWAサクラナイツ・切り抜き】", type: "highlight", isOfficial: true },
    { id: "DJBZ_d0P6lY", title: "【麻雀】”麻雀ハイブリッド白鳥翔がパニック障害を告白！医者に告げられた残酷な言葉とは？＜21人の軌跡＞『熱闘！Mリーグ#26』日曜よる10時～アベマTVで生放送！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "matsumoto", name: "松本吉弘", nameEn: "Yoshihiro Matsumoto", furigana: "まつもと よしひろ", org: "NPM", title: "發王位", tags: ["A1"], league: "A1", period: "第12期後期", joinYear: 2013, birthday: "1992/05/03", gender: "male", href: "/players/matsumoto", officialUrl: "https://npm2001.com/player/matsumoto-yoshihiro/", mleagueTeam: "渋谷ABEMAS", birthplace: "神奈川県横浜市", bloodType: "O型", hobby: "お酒・カラオケ・ペットショップ巡り", nickname: "卓上のヒットマン", titles: [{"year":"2017","name":"第25期發王位"}], bio: ["「卓上のヒットマン」松本吉弘。神奈川県横浜市出身、1992年5月3日生まれ。日本プロ麻雀協会第12期後期生で、雀王戦A1リーグに所属している。", "第25期發王位のタイトルを持つ。Mリーグには2018年の開幕から渋谷ABEMASのメンバーとして参加している。", "身長187cm。趣味はお酒・カラオケ・ペットショップ巡り。"], annualPoints: [{ season: "2018-19", points: 22.1, note: "final" }, { season: "2019-20", points: -246.3, note: "final" }, { season: "2020-21", points: 272.5, note: "final" }, { season: "2021-22", points: 145.7, note: "final" }, { season: "2022-23", points: 103.3, note: "final" }, { season: "2023-24", points: 100.0, note: "semifinal" }, { season: "2024-25", points: -426.6, note: "semifinal" }, { season: "2025-26", points: -293.7 }], currentSeason: { season: "2025-26", topRate: 19, avoid4th: 61, bestScore: 49600 }, videos: [
    { id: "8IYr3FHyxZU", title: "【役満】最速で四暗刻和了｜Mリーグ2020", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "wo7yzFSstmg", title: "【2023-24】絶対王者ABEMAS、松本吉弘の開幕大逆転倍満ツモ＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "5exwccAxLeI", title: "【麻雀】\"卓上のヒットマン\"松本に秘められた父との確執とは!?父へ胸中を告白！＜21人の軌跡＞『熱闘！Mリーグ#9』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "hinata", name: "日向藍子", nameEn: "Aiko Hinata", furigana: "ひなた あいこ", org: "最高位戦", title: "プロクイーン×2", tags: ["女流", "A1"], league: "A1", period: "第36期前期", joinYear: 2011, birthday: "1988/09/24", gender: "female", href: "/players/hinata", officialUrl: "https://saikouisen.com/members/hinata-aiko/", mleagueTeam: "渋谷ABEMAS", birthplace: "長野県茅野市", bloodType: "O型", hobby: "御朱印集め・ガンプラ", nickname: "ラブフェニックス", titles: [{"year":"2019","name":"第17期プロクイーン"},{"year":"2018","name":"第16期プロクイーン"}], bio: ["「ラブフェニックス」日向藍子。長野県茅野市出身、1988年9月24日生まれ。最高位戦日本プロ麻雀協会第36期前期生で、A1リーグと女流Bリーグに所属している。", "第16期・第17期プロクイーンを連覇している。Mリーグには2019-20シーズンより渋谷ABEMASのメンバーとして参加している。", "趣味は御朱印集め・ガンプラ。麻雀ウォッチのYouTubeチャンネルでも活動している。"], annualPoints: [{ season: "2019-20", points: 18.6, note: "final" }, { season: "2020-21", points: 38.1, note: "final" }, { season: "2021-22", points: -168.5, note: "final" }, { season: "2022-23", points: 128.6, note: "final" }, { season: "2023-24", points: -69.1, note: "semifinal" }, { season: "2024-25", points: 79.4, note: "semifinal" }, { season: "2025-26", points: -185.8 }], currentSeason: { season: "2025-26", topRate: 15, avoid4th: 70, bestScore: 69600 }, videos: [
    { id: "oT_JQGv5T2I", title: "【役満】日向藍子の四暗刻【第24期最高位戦女流Bリーグ】 #日向藍子 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "kLMhMX_9P70", title: "【役満】日向藍子の小四喜【第51期最高位戦A1リーグ第3節】 #日向藍子", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "Au5c57HRxsI", title: "【ちゅも】日向 藍子　Mリーグ何回聞いても「ちゅも」集", channel: "Mリーグの名場面集【切り抜き】", type: "match" },
  ] },

  // ── KADOKAWAサクラナイツ ─────────────────────────────────────
  { id: "okada", name: "岡田紗佳", nameEn: "Sayaka Okada", furigana: "おかださやか", org: "JPML", title: "女流プロ麻雀日本シリーズ×2", tags: ["女流", "モデル"], league: "C2", period: "第32期", joinYear: 2017, birthday: "1994/02/19", gender: "female", href: "/players/okada", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "東京都世田谷区", bloodType: "O型", hobby: "ショッピング・メイク", nickname: "完全武装アフロディーテ", titles: [{ year: "2024", name: "女流プロ麻雀日本シリーズ2024" }, { year: "2022", name: "女流プロ麻雀日本シリーズ2022" }, { year: "2019", name: "第5期てんパイクイーン" }, { year: "2018", name: "第4期てんパイクイーン" }, { year: "2018", name: "第3期てんパイクイーン" }], bio: ["「完全武装アフロディーテ」岡田紗佳。東京都世田谷区出身、1994年2月19日生まれ。2017年に日本プロ麻雀連盟でプロ入りし、モデル・タレントとしても活動している。", "女流プロ麻雀日本シリーズ2022・2024、てんパイクイーン第3〜5期などのタイトルを持つ。Mリーグには2019-20シーズンよりKADOKAWAサクラナイツのメンバーとして参加している。", "趣味はショッピング・メイク。特技は上海語・北京語・英語、中国の琴である古筝、クラリネット。"], annualPoints: [{ season: "2019-20", points: -152.8, note: "final" }, { season: "2020-21", points: 33.6, note: "final" }, { season: "2021-22", points: -261.8, note: "final" }, { season: "2022-23", points: 36.7, note: "semifinal" }, { season: "2023-24", points: 212.0, note: "final" }, { season: "2024-25", points: -506.5 }, { season: "2025-26", points: -160.8 }], currentSeason: { season: "2025-26", topRate: 14, avoid4th: 70, bestScore: 97300 }, videos: [
    { id: "fM8VwdwVLMk", title: "岡田紗佳､国士無双13面待ち!!【麻雀最強戦2022】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
    { id: "LJaIT0vkZEw", title: "【TV初】あがったら死ぬと言われる 九蓮宝燈を成就！【岡田紗佳】", channel: "チャンネルバズ動画", type: "highlight" },
    { id: "jTOyE_GtgqE", title: "【岡田紗佳】松本は痛恨の表情！！松本選手とリーチ対決で3倍満直撃！【サクラナイツ】【Mリーグ】", channel: "サクラナイツMリーグ対局切り抜きCH", type: "match", isOfficial: true },
  ] },
  { id: "hori", name: "堀慎吾", nameEn: "Shingo Hori", furigana: "ほりしんご", org: "JPML", title: "雀王", tags: ["E3"], league: "E3", period: "", joinYear: 2010, birthday: "1984/03/23", gender: "male", href: "/players/hori", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "新潟県新発田市", bloodType: "A型", hobby: "ゲーム・競馬・将棋", nickname: "小さな天才", titles: [{"year":"2025","name":"Mトーナメント2025"},{"year":"2019","name":"第18期雀王"},{"year":"2017","name":"第12期最高位戦Classic"}], bio: ["「小さな天才」堀慎吾。新潟県新発田市出身、1984年3月23日生まれ、身長164cm。2010年に日本プロ麻雀協会へ入会し、2026年1月に日本プロ麻雀連盟へ移籍した。", "第18期雀王、第12期最高位戦Classic、Mトーナメント2025などのタイトルを持つ。Mリーグには2020年のドラフトでKADOKAWAサクラナイツから指名され、2020-21シーズンより参加している。", "趣味はゲーム・競馬・将棋。「小さな天才」の異名を持つ。"], annualPoints: [{ season: "2020-21", points: 275.6, note: "final" }, { season: "2021-22", points: 178.8, note: "final" }, { season: "2022-23", points: -124.2, note: "semifinal" }, { season: "2023-24", points: 92.8, note: "final" }, { season: "2024-25", points: 72.5 }, { season: "2025-26", points: -442.6 }], currentSeason: { season: "2025-26", topRate: 15, avoid4th: 65, bestScore: 65500 }, videos: [
    { id: "OFqWQLeTvR4", title: "【役満2021】嶺上開花からの四暗刻┃Mリーグ公式", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "vE_Uy52dCZk", title: "【地上波で話題沸騰】堀慎吾！ファイナルで優勝シャーレを手繰り寄せた逆転ツモ！｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "FRemNTCGQK4", title: "【Mリーグ初の小四喜】#堀慎吾　プロの思考が交錯してまさかの小四喜成就…！プレミアムナイトに大盛り上がり…！…と思いきや会場では放送されて無かったんかーい！！", channel: "Music×M.LEAGUE【エム・エムリーグ】", type: "match", isOfficial: true },
  ] },
  { id: "shirinashihama_wataru", name: "尻無濱航", nameEn: "Wataru Shirinashihama", furigana: "しりなしはま わたる", org: "NPM", title: "-", tags: ["B2"], league: "B2", period: "第10期前期", joinYear: 2011, birthday: "1992/01/26", gender: "male", href: "/players/shirinashihama_wataru", officialUrl: "https://npm2001.com/player/shirinashihama-wataru/", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "神奈川県", bloodType: "A型", hobby: "野球観戦", titles: [], bio: ["2026年ドラフトでKADOKAWAサクラナイツから指名された尻無濱航。神奈川県出身、1992年1月26日生まれ。日本プロ麻雀協会第10期前期生で、雀王戦B2リーグに所属している。", "第2回fuzzカップでチーム優勝を経験し、第24期雀竜位決定戦では2位に入った。", "本業は外資系機械メーカーの営業職で、趣味は野球観戦。"], videos: [
    { id: "BKjmfjIFqEg", title: "尻無濱航､最速すぎる七対子ドラドラ!!【麻雀最強戦2023 最強ハンサム決戦 名局⑤】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "9gEPSrCpeG0", title: "Player Interview 尻無濱 航", channel: "U-NEXT Pirates", type: "interview", isOfficial: true },
  ] },
  { id: "shibukawa", name: "渋川難波", nameEn: "Nanba Shibukawa", furigana: "しぶかわ なんば", org: "最高位戦", title: "fuzzカップ", tags: ["A2"], league: "A2", period: "", joinYear: 2011, birthday: "1986/05/19", gender: "male", href: "/players/shibukawa", officialUrl: "https://saikouisen.com/members/shibukawa-namba/", birthplace: "広島県", bloodType: "A型", hobby: "麻雀研究", nickname: "魔神", titles: [{"year":"2024","name":"第4回fuzzカップ2024"},{"year":"2023","name":"Mトーナメント2023"},{"year":"2021","name":"第20期雀王"},{"year":"2017","name":"第15回日本オープン2017"},{"year":"2012","name":"第11期雀竜位"}], bio: ["「魔神」渋川難波。広島県廿日市市出身、1986年生まれ。日本プロ麻雀協会第10期前期生として入会後、2022-23シーズンより最高位戦日本プロ麻雀協会へ移籍。協会のグランドスラム（雀竜位・日本オープン・雀王の全制覇）を達成したタイトルホルダー。", "Mリーグには2022-23シーズンから2025-26シーズンまでKADOKAWAサクラナイツで参加した。", "麻雀研究に打ち込む姿勢から「魔神」と称される。YouTubeでの対局解説も行っている。"], annualPoints: [{ season: "2022-23", points: -105.1, team: "KADOKAWAサクラナイツ", note: "semifinal" }, { season: "2023-24", points: 147.2, team: "KADOKAWAサクラナイツ", note: "final" }, { season: "2024-25", points: 76.7, team: "KADOKAWAサクラナイツ" }, { season: "2025-26", points: 176.7, team: "KADOKAWAサクラナイツ" }], currentSeason: { season: "2025-26", topRate: 25, avoid4th: 80, bestScore: 77800 }, videos: [
    { id: "JRJzirtzLxY", title: "【#役満】欲張り役満セットが舞い降りた渋川 難波【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "hdCLcQcwEV4", title: "【Mリーグ：渋川難波】何度も見たい名シーン！喰いタン裸単騎ｗ全アシストの仲林！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "tQYb1MNfn2k", title: "【致命の一撃】渋川難波、王へ手をかける地獄待ち【麻雀】", channel: "麻雀スリアロチャンネル", type: "match" },
  ] },
  { id: "akutsu", name: "阿久津翔太", nameEn: "Shota Akutsu", furigana: "あくつしょうた", org: "JPML", title: "若獅子", tags: ["A1"], league: "A1", period: "第34期", joinYear: 2018, birthday: "1996/04/23", gender: "male", href: "/players/akutsu", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "茨城県日立市", hobby: "麻雀研究", nickname: "飢えた若獅子", titles: [{ year: "2021", name: "第1期若獅子戦" }], bio: ["「飢えた若獅子」阿久津翔太。茨城県日立市出身、1996年4月23日生まれ。2018年に日本プロ麻雀連盟第34期生としてプロ入りした。", "2021年に第1期若獅子戦、2024年に麻雀最強戦2024「最強の遺伝子」で優勝。2025年6月30日のMリーグ2025-26ドラフト会議でKADOKAWAサクラナイツから指名され、同シーズンよりMリーグに参加している。", "鳳凰戦では2025年度よりA1リーグに昇級。日本プロ麻雀連盟公式YouTubeなどで実況・解説も務めている。"], annualPoints: [{ season: "2025-26", points: -200.0 }], currentSeason: { season: "2025-26", topRate: 19, avoid4th: 69, bestScore: 57100 }, videos: [
    { id: "BsYhoq2ekDg", title: "阿久津翔太､満貫を決める!!【麻雀最強戦2024 最強の遺伝子 名局⑧】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "XZmiGUShj28", title: "阿久津翔太､2局で10000オール!!【麻雀最強戦2024 最強の遺伝子 名局④】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "vmE54X7nCHM", title: "【サクラナイツ】強気がドラマを！解説も大絶賛の手順で奇跡を起こす！【阿久津翔太】【Mリーグ】", channel: "サクラナイツMリーグ対局切り抜きCH", type: "tactics", isOfficial: true },
  ] },

  // ── U-NEXT Pirates ──────────────────────────────────────────
  { id: "asakura_koshin", name: "朝倉康心", nameEn: "Koshin Asakura", furigana: "あさくら こうしん", org: "最高位戦", title: "天鳳位×2", tags: ["A2"], league: "A2", period: "第43期前期", joinYear: 2018, birthday: "1986/03/04", gender: "male", href: "/players/asakura_koshin", officialUrl: "https://saikouisen.com/members/asakura-koshin/", mleagueTeam: "U-NEXT Pirates", birthplace: "福井県小浜市", bloodType: "A型", nickname: "精密機械", titles: [{ year: "2008", name: "初代天鳳位" }, { year: "2016", name: "第11代天鳳位" }], bio: ["朝倉康心。福井県小浜市出身、1986年3月4日生まれ。最高位戦日本プロ麻雀協会第43期前期生で、A2リーグに所属している。", "オンライン麻雀「天鳳」で初代・11代天鳳位に到達。Mリーグには2018年の開幕からU-NEXT Piratesの創設メンバーとして参加し、2021-22シーズン後に退団した。", "2026年6月25日のMリーグ2026-27ドラフト会議でU-NEXT Piratesから指名され、同チームに復帰する。"], annualPoints: [{ season: "2018-19", points: 178.8, team: "U-NEXT Pirates" }, { season: "2019-20", points: -143.4, team: "U-NEXT Pirates", note: "final" }, { season: "2020-21", points: -294.0, team: "U-NEXT Pirates" }, { season: "2021-22", points: 68.8, team: "U-NEXT Pirates", note: "semifinal" }], videos: [
    { id: "hLC80pstk7o", title: "【初役満】大三元和了！本人コメント付き【Mリーグファイナル3日目】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "duH3hvGd8uE", title: "朝倉康心､大四喜!!【麻雀最強戦2020】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
    { id: "vNYkoSIA4e8", title: "【Mリーグ2021-22 倍満集#7】僅か5巡！朝倉康心90000点への親倍ツモ！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
  ] },
  { id: "kobayashi", name: "小林剛", nameEn: "Go Kobayashi", furigana: "こばやし ごう", org: "μ", title: "将王×4", tags: ["A"], league: "μ", period: "", joinYear: 1995, birthday: "1976/02/12", gender: "male", href: "/players/kobayashi", officialUrl: "https://mu-mahjong.jp/player/profile/?player_id=100138", birthplace: "東京都", bloodType: "AB型", hobby: "カラオケ", nickname: "麻雀サイボーグ", titles: [{"year":"2024","name":"Mトーナメント2024"},{"year":"2021","name":"第19期将王"},{"year":"2018","name":"RTDリーグ2018"},{"year":"2011","name":"第9期将王"},{"year":"2009","name":"第7期将王"},{"year":"2005","name":"第3期将王"}], bio: ["「麻雀サイボーグ」小林剛。東京都出身、1976年生まれ。麻将連合所属。", "将王を複数期獲得しているほか、Mトーナメントなどのタイトルを持つ。Mリーグには2018年の開幕から2025-26シーズンまでU-NEXT Piratesで参加した。", "趣味はカラオケ。麻雀理論の発信も多い。"], annualPoints: [{ season: "2018-19", points: -115.6, team: "U-NEXT Pirates" }, { season: "2019-20", points: 211.0, team: "U-NEXT Pirates", note: "final" }, { season: "2020-21", points: 337.5, team: "U-NEXT Pirates" }, { season: "2021-22", points: 154.1, team: "U-NEXT Pirates", note: "semifinal" }, { season: "2022-23", points: -129.1, team: "U-NEXT Pirates", note: "semifinal" }, { season: "2023-24", points: -195.0, team: "U-NEXT Pirates", note: "final" }, { season: "2024-25", points: -77.1, team: "U-NEXT Pirates", note: "final" }, { season: "2025-26", points: -445.0, team: "U-NEXT Pirates" }], currentSeason: { season: "2025-26", topRate: 12, avoid4th: 60, bestScore: 42500 }, videos: [
    { id: "FUPA4qKUCrY", title: "【役満】Mリーガー小林剛、国士無双成就にニッコリ【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "H4MRQJNxJsQ", title: "【Mリーグ/麻雀】解説/土田「見てはいけないモノを見てしまった…」U-NEXT Pirates『小林 剛』当たり牌を止めて聴牌をキープするスーパープレイ！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "pE9MfzTonG0", title: "小林剛､似合わないメンゼン三色!!【麻雀最強戦2024 骨肉の乱闘 名局⑥】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "mizuhara", name: "瑞原明奈", nameEn: "Akina Mizuhara", furigana: "みずはら あきな", org: "最高位戦", title: "女流最高位", tags: ["女流", "C3"], league: "C3", period: "第42期前期", joinYear: 2014, birthday: "1986/11/19", gender: "female", href: "/players/mizuhara", officialUrl: "https://saikouisen.com/members/mizuhara-akina/", mleagueTeam: "U-NEXT Pirates", birthplace: "長崎県佐世保市", bloodType: "O型", hobby: "映画鑑賞・人狼", nickname: "気高き女海賊", titles: [{"year":"2024","name":"第24期女流最高位"},{"year":"2019","name":"プリンセスリーグ2019"}], bio: ["「気高き女海賊」瑞原明奈。長崎県佐世保市出身、1986年11月19日生まれ。最高位戦日本プロ麻雀協会第42期前期生で、C3リーグに所属している。", "2019年にプリンセスリーグで優勝し、2024年に第24期女流最高位を獲得。Mリーグでは2019-20シーズンよりU-NEXT Piratesのメンバーとして参加し、2021-22シーズンにMVPを獲得した。", "趣味は映画鑑賞と人狼。U-NEXT Piratesでは2019-20シーズンから継続してプレーしている。"], annualPoints: [{ season: "2019-20", points: -101.8, note: "final" }, { season: "2020-21", points: -117.9 }, { season: "2021-22", points: 440.6, note: "semifinal" }, { season: "2022-23", points: 270.3, note: "semifinal" }, { season: "2023-24", points: 378.4, note: "final" }, { season: "2024-25", points: 120.9, note: "final" }, { season: "2025-26", points: -72.3 }], currentSeason: { season: "2025-26", topRate: 31, avoid4th: 65, bestScore: 69300 }, videos: [
    { id: "8824vEudy14", title: "瑞原明奈､5巡目跳満!!【麻雀最強戦2023 Mリーグスペシャルマッチ 名局②】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "Q4zYrO0XKNo", title: "瑞原明奈､美しい三色!!【麻雀最強戦2023 因縁の決着 名局①】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "OEx4LBEJ2-c", title: "【#瑞原明奈】南家は妾の玉座である！日吉が絶句した100戦目の記念登板！全てもぎ取る【#mリーグ】#切り抜き #多井隆晴 #茅森早香 #菅原千瑛", channel: "Mリーグ女流名鑑", type: "match" },
  ] },
  { id: "suzuki-y", name: "鈴木優", nameEn: "Yu Suzuki", furigana: "すずき ゆう", org: "最高位戦", title: "最高位", tags: ["A1"], league: "A1", period: "第36期前期", joinYear: 2011, birthday: "1981/09/13", gender: "male", href: "/players/suzuki-y", officialUrl: "https://saikouisen.com/members/suzuki-yu/", mleagueTeam: "U-NEXT Pirates", birthplace: "愛知県豊橋市", bloodType: "O型", hobby: "お酒・カラオケ", nickname: "戦闘民族", titles: [{"year":"2024","name":"麻雀日本シリーズ2024"},{"year":"2022","name":"第46期最高位"},{"year":"2022","name":"麻雀日本シリーズ2022"}], bio: ["「戦闘民族」鈴木優。愛知県豊橋市出身、1981年9月13日生まれ。最高位戦日本プロ麻雀協会第36期前期生で、A1リーグに所属している。", "第46期最高位、麻雀日本シリーズ2022・2024などのタイトルを持つ。Mリーグには2022-23シーズンよりU-NEXT Piratesのメンバーとして参加し、2023-24シーズンにMVPを獲得した。", "趣味はお酒とカラオケ。最高位戦では第46期・第47期に最高位決定戦へ進出している。"], annualPoints: [{ season: "2022-23", points: -92.8, note: "semifinal" }, { season: "2023-24", points: 437.7, note: "final" }, { season: "2024-25", points: 180.8, note: "final" }, { season: "2025-26", points: 114.8 }], currentSeason: { season: "2025-26", topRate: 29, avoid4th: 67, bestScore: 91500 }, videos: [
    { id: "Md-SortzWZM", title: "【役満】配牌から想像もつかない四暗刻単騎【第48期最高位戦A1リーグ】#鈴木優", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "7Abzk4kE-ZE", title: "【Mリーグ・24-25ファイナル名場面】鈴木優、連覇に向け特大トップ！25-26開幕戦もチーム連対で全速前進！【麻雀・2025/5/15①】#倍満  #ユーネクストパイレーツ #鈴木優 ", channel: "そーぞーのイーソー", type: "highlight" },
    { id: "EYSbwAFjcQA", title: "【役満】死角からの一撃！　鈴木優の小四喜【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },
  { id: "nakabayashi", name: "仲林圭", nameEn: "Kei Nakabayashi", furigana: "なかばやし けい", org: "NPM", title: "雀王×2", tags: ["A1"], league: "A1", period: "第7期前期", joinYear: 2007, birthday: "1985/09/17", gender: "male", href: "/players/nakabayashi", officialUrl: "https://npm2001.com/player/nakabayashi-kei/", mleagueTeam: "U-NEXT Pirates", birthplace: "東京都武蔵野市", bloodType: "O型", hobby: "フットサル", nickname: "龍を継ぐ者", titles: [{"year":"2025","name":"第23期雀王"},{"year":"2023","name":"第22期雀王"},{"year":"2023","name":"第30期發王位"},{"year":"2022","name":"第29期發王位"},{"year":"2012","name":"第10期雀竜位"}], bio: ["「龍を継ぐ者」仲林圭。東京都武蔵野市出身、1985年9月17日生まれ。日本プロ麻雀協会第7期前期生で、雀王戦A1リーグに所属している。", "第22・23期雀王、第29・30期發王位、第10期雀竜位などのタイトルを持つ。Mリーグには2022年のドラフトでU-NEXT Piratesから指名され、2022-23シーズンより参加している。", "趣味はフットサル。YouTubeでは雀魂やゲーム配信も行っている。"], annualPoints: [{ season: "2022-23", points: -109.7, note: "semifinal" }, { season: "2023-24", points: 266.5, note: "final" }, { season: "2024-25", points: 256.6, note: "final" }, { season: "2025-26", points: -219.9 }], currentSeason: { season: "2025-26", topRate: 12, avoid4th: 71, bestScore: 79100 }, videos: [
    { id: "3lwJe8JdbOQ", title: "【Mリーグ】仲林圭、国士無双テンパイがまさかの結末！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "tsZY0DSHG5U", title: "【役満】王を討て！　仲林圭の国士無双【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "UVToG5rGUag", title: "【役満】龍降臨!?　仲林圭の四暗刻【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },

  // ── EARTH JETS ──────────────────────────────────────────────
  { id: "ishii", name: "石井一馬", nameEn: "Kazuma Ishii", furigana: "いしい かづま", org: "最高位戦", title: "最高位", tags: ["A1"], league: "A1", period: "第31期後期", joinYear: 2006, birthday: "1986/02/21", gender: "male", href: "/players/ishii", officialUrl: "https://saikouisen.com/members/ishii-kazuma/", mleagueTeam: "EARTH JETS", birthplace: "東京都", bloodType: "A型", hobby: "ゲーム", nickname: "トリプルクラウン", titles: [{"year":"2025","name":"第49期最高位"},{"year":"2024","name":"第18期最高位戦Classic"},{"year":"2015","name":"第41期王位"},{"year":"2015","name":"第10期最高位戦Classic"},{"year":"2012","name":"第21期麻雀マスターズ"}], bio: ["「トリプルクラウン」石井一馬。東京都出身、1986年2月21日生まれ。2006年に最高位戦日本プロ麻雀協会第31期後期生として入会し、A1リーグに所属している。", "第49期最高位、第41期王位、第21期麻雀マスターズ、第10・18期最高位戦Classicなどのタイトルを持つ。Mリーグには2025-26シーズンよりEARTH JETSのメンバーとして参加している。", "趣味はゲーム。最高位・Classic・麻雀マスターズを制した最高位戦所属のタイトルホルダー。"], annualPoints: [{ season: "2025-26", points: 160.7 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 76, bestScore: 55300 }, videos: [
    { id: "0wmvwogt_rs", title: "【役満】石井一馬の四暗刻【U-30 STAR HUNT ep.2】 #石井一馬 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "EyQn1DkLHRU", title: "【役満】石井一馬の四暗刻【第18期飯田正人杯最高位戦Classic決勝2日目】 #石井一馬 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "d0VrXnMoahA", title: "【名場面】ゼリーイッパツ!! 石井一馬の親倍満炸裂!!【第51期最高位戦A1リーグ第4節】 #石井一馬", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "miura", name: "三浦智博", nameEn: "Tomohiro Miura", furigana: "みうらともひろ", org: "JPML", title: "十段位×2", tags: ["A1"], league: "A1", period: "第28期", joinYear: 2012, birthday: "1987/04/26", gender: "male", href: "/players/miura", mleagueTeam: "EARTH JETS", birthplace: "愛知県小牧市", hobby: "麻雀研究", nickname: "変幻自在の感覚派", titles: [{"year":"2025","name":"麻雀日本シリーズ2025"},{"year":"2024","name":"第41期十段位"},{"year":"2023","name":"第48期王位"},{"year":"2023","name":"第40期十段位"}], bio: ["「変幻自在の感覚派」三浦智博。愛知県小牧市出身、1987年4月26日生まれ。2012年に日本プロ麻雀連盟第28期生としてプロ入りし、A1リーグに所属している。", "第40・41期十段位、第48期王位、麻雀日本シリーズ2025などのタイトルを持つ。Mリーグには2025-26シーズンよりEARTH JETSのメンバーとして参加している。", "日本プロ麻雀連盟のリーグ戦とタイトル戦で実績を重ねてきたタイトルホルダー。"], annualPoints: [{ season: "2025-26", points: -381.9 }], currentSeason: { season: "2025-26", topRate: 11, avoid4th: 62, bestScore: 70900 }, videos: [
    { id: "4z6ejL2XnQw", title: "【中田花奈×三浦智博】壮絶な“ホンイツ対決”の結末...1索ポンから一転、「親倍満」の衝撃", channel: "激闘Mリーグ", type: "match" },
    { id: "U3R-aojiWEI", title: "三浦智博､三色一発ツモ!!【麻雀最強戦2020】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "R1vj8rtPIJI", title: "三浦智博､闇テン満貫!!【麻雀最強戦2020】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "aikawa", name: "逢川恵夢", nameEn: "Megumu Aikawa", furigana: "あいかわ めぐむ", org: "NPM", title: "永世女流雀王", tags: ["女流", "B2"], league: "B2", period: "第10期前期", joinYear: 2011, birthday: "1987/08/28", gender: "female", href: "/players/aikawa", officialUrl: "https://npm2001.com/player/aikawa-megumu/", mleagueTeam: "EARTH JETS", birthplace: "大阪府", bloodType: "A型", hobby: "ポーカー", nickname: "黒髪のイシュタル", titles: [{"year":"2025","name":"第23期女流雀王"},{"year":"2023","name":"第22期女流雀王"},{"year":"2021","name":"第20期女流雀王"},{"year":"2019","name":"第18期女流雀王"},{"year":"2018","name":"第17期女流雀王"},{"year":"2011","name":"第10期新人王"}], bio: ["「黒髪のイシュタル」逢川恵夢。大阪府出身、1987年8月28日生まれ。日本プロ麻雀協会第10期前期生で、雀王戦B2リーグに所属している。", "女流雀王を第17・18・20・22・23期で通算5期獲得し、永世女流雀王の称号を持つ。第10期新人王のタイトルも持つ。", "Mリーグには2025-26シーズンよりEARTH JETSのメンバーとして参加。趣味はポーカー。"], annualPoints: [{ season: "2025-26", points: -114.3 }], currentSeason: { season: "2025-26", topRate: 11, avoid4th: 80, bestScore: 60000 }, videos: [
    { id: "Q4q1BBWNyco", title: "【役満】\"元祖ビースト\"逢川恵夢の四暗刻!!(六暗刻)【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "U1KHZNxihEM", title: "逢川恵夢の凄い跳満!!【麻雀最強戦2019】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "Srs0i10B-gA", title: "【逢川恵夢】オーラス女達の三つ巴対決！逢川の倍満でフィニッシュ！", channel: "激闘Mリーグ", type: "match" },
  ] },
  { id: "hiro-shibata", name: "HIRO柴田", nameEn: "Hiro Shibata", furigana: "ひろしばた", org: "JPML", title: "鳳凰位", tags: ["A1"], league: "A1", period: "第16期", joinYear: 2000, birthday: "1976/02/16", gender: "male", href: "/players/hiro-shibata", mleagueTeam: "EARTH JETS", birthplace: "神奈川県川崎市", bloodType: "A型", hobby: "お笑い・ゲーム・漫画", nickname: "紅顔のアサシン", titles: [{"year":"2025","name":"第5期鸞和戦"},{"year":"2024","name":"第14期麻雀グランプリMAX"},{"year":"2023","name":"第39期鳳凰位"},{"year":"2023","name":"第13期麻雀グランプリMAX"}], bio: ["「紅顔のアサシン」HIRO柴田。神奈川県川崎市出身、1976年2月16日生まれ。2000年に日本プロ麻雀連盟第16期生としてプロ入りした。旧名は柴田弘幸。", "第39期鳳凰位、第5期鸞和戦、第13・14期麻雀グランプリMAXなどのタイトルを持つ。Mリーグには2025-26シーズンよりEARTH JETSのメンバーとして参加している。", "趣味はお笑い・ゲーム・漫画。日本プロ麻雀連盟のA1リーグで活動している。"], annualPoints: [{ season: "2025-26", points: -405.0 }], currentSeason: { season: "2025-26", topRate: 10, avoid4th: 64, bestScore: 80200 }, videos: [
    { id: "-UlfWo_aNG0", title: "【役満】\"紅顔のアサシン\"HIRO柴田 開局いきなり国士無双!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "KJXDbl_a5cw", title: "【役満】\"紅顔のアサシン\"HIRO柴田の心奮える字一色!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "OJvFx6rnNUU", title: "【役満】\"闇夜に潜むアサシン\"HIRO柴田の門前大三元!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
];

export { ROSTER_PLAYERS };

export function isFeaturedPlayer(p: RosterPlayer): p is FeaturedPlayer {
  return Array.isArray(p.bio) && p.bio.length > 0;
}

export function getPlayer(id: string): FeaturedPlayer | RosterPlayer | undefined {
  return ALL_PLAYERS.find((p) => p.id === id) ?? ROSTER_PLAYERS.find((p) => p.id === id);
}

export function getAllPlayers(): RosterPlayer[] {
  const featuredIds = new Set(ALL_PLAYERS.map((p) => p.id));
  const rosterOnly = ROSTER_PLAYERS.filter((p) => !featuredIds.has(p.id));
  return [...ALL_PLAYERS, ...rosterOnly];
}
