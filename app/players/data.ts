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
  // ファイナル進出 / セミファイナル進出 / レギュラー敗退
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
  title?: string;
  tags?: string[];
  period?: string;
  joinYear?: number;
  birthday?: string;
  gender?: Gender;
  href?: string;
  mleagueTeam?: string;
  birthplace?: string;
  bloodType?: string;
  hobby?: string;
  nickname?: string;
  rank?: string;
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
  μ: { color: "#2f5c3f", label: "麻将連合μ" },
};

export const ALL_PLAYERS: AllPlayer[] = [
  // ── TEAM RAIDEN / 雷電 ───────────────────────────────────────
  { id: "setokuma", name: "瀬戸熊直樹", nameEn: "Naoki Setokuma", org: "JPML", title: "十段位×3", tags: ["攻撃型", "A1"], league: "B1", period: "第14期", joinYear: 1997, birthday: "1970/08/27", gender: "male", href: "/players/setokuma", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "千葉県", bloodType: "O型", hobby: "海外ドラマ・漫画・アニメ", nickname: "卓上の暴君", titles: [{"year":"2022","name":"第16回モンド名人"},{"year":"2022","name":"第33期最強位"},{"year":"2021","name":"第32期最強位"},{"year":"2013","name":"第30期十段位"},{"year":"2012","name":"第29期十段位"},{"year":"2012","name":"第29期鳳凰位"},{"year":"2011","name":"第28期十段位"},{"year":"2010","name":"第27期鳳凰位"},{"year":"2009","name":"第26期鳳凰位"},{"year":"2006","name":"第14期發王位"}], bio: ["「卓上の暴君」「クマクマタイム」瀬戸熊直樹。千葉県出身、1970年8月27日生まれ。東京経済大学卒業後、1997年に日本プロ麻雀連盟第14期生としてプロ入り。元々は守備型だったが、佐々木寿人など連盟先輩プロの影響で超攻撃型へと転身。傍若無人の激しい攻めから「卓上の暴君」の異名を持つ。親番で連荘し手のつけられない状態になると「クマクマタイム」と呼ばれ、対戦相手を圧倒する。", "2009年に第26期鳳凰位で初の鳳凰位を獲得。2010年に第27期で連覇、2012年には第29期鳳凰位と第29期十段位の二冠を達成。十段位は第28〜30期の3連覇（2011〜2013年）。鳳凰位3期・十段位3期・無双位2期・發王位1期・チャンピオンズリーグ1期の通算10冠を誇る連盟屈指のタイトルホルダー。現在は連盟理事・九段。", "Mリーグには2018年の発足時からTEAM RAIDEN/雷電のメンバーとして参加し、チームの精神的支柱として活躍。趣味は海外ドラマ・漫画・アニメ。麻雀番組での豪快な連荘シーンは多くのファンの記憶に刻まれている。"], annualPoints: [{ season: "2018-19", points: -283.4 }, { season: "2019-20", points: 20.9, note: "semifinal" }, { season: "2020-21", points: 57.0, note: "semifinal" }, { season: "2021-22", points: -405.5 }, { season: "2022-23", points: -34.3, note: "final" }, { season: "2023-24", points: -1.9 }, { season: "2024-25", points: 170.7, note: "semifinal" }, { season: "2025-26", points: -83.8 }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 68, bestScore: 57400 }, videos: [
    { id: "9fYhjDfdNQ0", title: "【麻雀・Mリーグ2019 10/26放送】役満集#2 瀬戸熊直樹のＭリーグ初の四暗刻成就!! ＜雷電vsフェニックスvsドリブンズvs風林火山＞大和証券Mリーグ 毎週月火木金よる7時～アベマTV", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "iRwamKJlRM8", title: "瀬戸熊直樹､オーラス倍満で最強位!!【麻雀最強戦2021】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "aT4d57s5GPo", title: "【麻雀】\"卓上の暴君\"がお小遣い制!?かかあ天下の瀬戸熊家、お金のルールとは？＜21人の軌跡＞『熱闘！Mリーグ#17』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "hagiwara", name: "萩原聖人", nameEn: "Masato Hagiwara", org: "JPML", title: "", tags: ["俳優", "A1"], league: "A1", period: "第17期", joinYear: 2001, birthday: "1971/08/21", gender: "male", href: "/players/hagiwara", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "神奈川県茅ヶ崎市", bloodType: "B型", hobby: "映画鑑賞", nickname: "雪原の求道者", bio: ["「俳優雀士」萩原聖人。神奈川県茅ヶ崎市出身、1971年生まれ。俳優・声優・ナレーターとして第一線で活躍しながら、麻雀番組にも90年代から出演し続けた唯一無二の存在。", "2018年、日本プロ麻雀連盟に第17期生として入会（47歳でのプロデビュー）。同年よりMリーグ・TEAM RAIDEN/雷電のメンバーとして参加。攻撃的で高打点を目指す「魅せる麻雀」が持ち味。", "趣味は映画鑑賞。俳優としての表現力を麻雀にも活かし、対局中の佇まいや仕草にもファンが多い。"], annualPoints: [{ season: "2018-19", points: -61.0 }, { season: "2019-20", points: -251.5, note: "semifinal" }, { season: "2020-21", points: -460.8, note: "semifinal" }, { season: "2021-22", points: -394.0 }, { season: "2022-23", points: -305.8, note: "final" }, { season: "2023-24", points: -84.1 }, { season: "2024-25", points: -95.9, note: "semifinal" }, { season: "2025-26", points: -147.4 }], currentSeason: { season: "2025-26", topRate: 30, avoid4th: 73, bestScore: 48200 }, videos: [
    { id: "pwpgNyu7-WU", title: "【Mリーグ/麻雀】実況/桃、大興奮！！やっぱり持っているモノが違う？！TEAM RAIDEN / 雷電「萩原 聖人」幻の役満、天和チャンス！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "LV1_JsVr8XQ", title: "[麻雀-役満] 萩原聖人の国士無双 - 麻雀バトルロイヤル2017", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "gf0XlFs9TqE", title: "芸能人初のMリーガー俳優 萩原聖人に迫る！50歳目前でプロ雀士になろうと思ったきっかけやMリーグにかける思いとは『熱闘！Mリーグ#2』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "kurosawa", name: "黒沢咲", nameEn: "Saki Kurosawa", org: "JPML", title: "プロクイーン×2", tags: ["女流", "A1"], league: "C1", period: "第22期", joinYear: 2006, birthday: "10/06", gender: "female", href: "/players/kurosawa", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "北海道札幌市", bloodType: "A型", hobby: "料理・お酒", nickname: "強気のヴィーナス", titles: [{"year":"2009","name":"第7期プロクイーン"},{"year":"2008","name":"第6期プロクイーン"}], bio: ["「強気のヴィーナス」黒沢咲。北海道札幌市生まれ、東京都世田谷区出身。生年は非公開（10月6日生まれ）。上智大学理工学部化学科卒業という高学歴の持ち主。", "日本プロ麻雀連盟A1リーグに所属し、女流ながら男性プロと同じリーグで戦う実力者。副露率わずか8%という圧倒的なメンゼン思考で高打点を追求するスタイルが特徴。Mリーグには2018年発足時からTEAM RAIDEN/雷電のメンバー。", "趣味は料理とお酒。「鉄壁の女王」の異名どおり、守りの固い麻雀と攻撃的な打点のバランスが絶妙。"], annualPoints: [{ season: "2018-19", points: 116.9 }, { season: "2019-20", points: 150.5, note: "semifinal" }, { season: "2020-21", points: 193.3, note: "semifinal" }, { season: "2021-22", points: -148.8 }, { season: "2022-23", points: -9.2, note: "final" }, { season: "2023-24", points: -215.0 }, { season: "2024-25", points: 99.4, note: "semifinal" }, { season: "2025-26", points: 109.9 }], currentSeason: { season: "2025-26", topRate: 34, avoid4th: 73, bestScore: 59700 }, videos: [
    { id: "UXbfKTRMMKY", title: "【地上波で話題沸騰】チーム雷電 黒沢咲、大逆転の四暗刻単騎｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "BveFfJnINnI", title: "Mリーグ2022｜黒沢咲 史上最高得点112700点！和了９回 全アガりシーンまとめ！実況解説:日吉辰哉 土田浩翔 #TEAM雷電（対局時 -39.1pt/1.2.4.3.3.3位）11/7(月)", channel: "Mリーグ アーカイブch", type: "tactics" },
    { id: "NFstEMF_N_8", title: "【麻雀】\"セレブMリーガー\"黒沢咲の手料理の腕前もプロ級で美しい...驚愕する大豪邸も初披露！＜21人の軌跡＞『熱闘！Mリーグ#20』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "honda", name: "本田朋広", nameEn: "Tomohiro Honda", org: "JPML", title: "第10,11期麻雀グランプリMAX×2", tags: ["A1"], league: "C2", period: "第22期", joinYear: 2006, birthday: "1983/10/03", gender: "male", href: "/players/honda", mleagueTeam: "TEAM RAIDEN / 雷電", birthplace: "富山県高岡市", bloodType: "A型", hobby: "格闘技観戦・筋トレ", nickname: "北陸の役満プリンス", titles: [{"year":"2024","name":"第32期麻雀マスターズ2024"},{"year":"2020","name":"第10,11期麻雀グランプリMAX2020"},{"year":"2020","name":"第11期麻雀グランプリMAX"},{"year":"2019","name":"第10,11期麻雀グランプリMAX2019"},{"year":"2019","name":"第10期麻雀グランプリMAX"},{"year":"2019","name":"第20期北陸プロアマリーグ2019"},{"year":"2019","name":"第3期北陸プロリーグ2019"}], bio: ["「北陸の役満プリンス」本田朋広。富山県高岡市出身、1983年生まれ。金沢星稜大学卒業後、25歳で地元富山県砺波市に雀荘「麻雀サークルSB」を開業。2006年に日本プロ麻雀連盟第22期生としてプロ入り。", "役満和了を複数回達成していることからその異名がついた。2021年よりTEAM RAIDEN/雷電のメンバーとしてMリーグに参加。現在も富山で雀荘経営と東京でのMリーグ活動を両立している。", "趣味は格闘技観戦と筋トレ。血液型A型、身長180cm。北陸を代表するプロ雀士として地元への貢献にも力を入れている。"], annualPoints: [{ season: "2021-22", points: -307.8 }, { season: "2022-23", points: 306.9, note: "final" }, { season: "2023-24", points: -183.5 }, { season: "2024-25", points: 156.1, note: "semifinal" }, { season: "2025-26", points: -92.4 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 80, bestScore: 58400 }, videos: [
    { id: "F1ZOCxNaJk0", title: "【麻雀】ツモればダブル役満!!本田朋広の大三元・四暗刻!?【役満】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "qaMrdGcQvoo", title: "【奇跡の配牌】\"役満プリンス\"本田朋広の10年に1度の配牌!!ダブル役満なるか!?【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "T3jwFXS62tw", title: "本田朋広､大逆転の優勝チートイツ!!【麻雀最強戦2023 最強ハンサム決戦 名局㉓】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
  ] },

  // ── KONAMI麻雀格闘倶楽部 ────────────────────────────────────
  { id: "sasaki", name: "佐々木寿人", nameEn: "Toshihito Sasaki", org: "JPML", title: "鳳凰位×3", tags: ["攻撃型", "A1"], league: "A1", period: "第19期", joinYear: 2003, birthday: "1979/08/01", gender: "male", href: "/players/sasaki", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "宮城県仙台市", bloodType: "O型", hobby: "桃鉄", nickname: "麻雀攻めダルマ", titles: [{"year":"2025","name":"麻雀オールスターBS10チャンピオンシップ2025"},{"year":"2024","name":"第40期鳳凰位"},{"year":"2022","name":"第38期鳳凰位"},{"year":"2021","name":"第37期鳳凰位"},{"year":"2020","name":"麻雀日本シリーズ2020"},{"year":"2018","name":"麻雀日本シリーズ2018"},{"year":"2017","name":"第7期麻雀グランプリMAX"}], bio: ["「戦闘民族」佐々木寿人。宮城県仙台市出身、1977年生まれ。東北学院大学中退後、2003年に日本プロ麻雀連盟第19期生としてプロ入り。", "どこまでも押し続ける超攻撃型の雀風から「戦闘民族」と称される。十段位を5期以上、麻雀マスターズを複数期獲得するなど連盟トップクラスのタイトルホルダー。Mリーグには2018年発足時からKONAMI麻雀格闘倶楽部のメンバー。", "趣味は桃鉄（桃太郎電鉄）。「放銃を恐れない」スタイルでファンからは愛されており、Mリーグでも常に上位の人気を誇る。"], annualPoints: [{ season: "2018-19", points: 228.3, note: "final" }, { season: "2019-20", points: 80.7, note: "semifinal" }, { season: "2020-21", points: 494.1, note: "semifinal" }, { season: "2021-22", points: -77.3, note: "final" }, { season: "2022-23", points: 213.3, note: "final" }, { season: "2023-24", points: 16.3, note: "semifinal" }, { season: "2024-25", points: 388.0, note: "semifinal" }, { season: "2025-26", points: 11.1 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 73, bestScore: 74400 }, videos: [
    { id: "dKHB110eGp8", title: "【衝撃役満】発生率0.00158％のチーホー出現！Mリーガー仰天集【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "4R7FLjnTck0", title: "【地上波で話題沸騰】#佐々木寿人 天国か地獄か･･･128秒の大長考の末に出した答えは!?｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "8h_cog-RH8k", title: "【ダブル役満】大逆転優勝!! \"魔王\"佐々木寿人の四暗刻単騎!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "takamiya", name: "高宮まり", nameEn: "Mari Takamiya", org: "JPML", title: "女流プロ麻雀日本シリーズ×2", tags: ["女流", "A1"], league: "D1", period: "第27期", joinYear: 2011, birthday: "1988/11/08", gender: "female", href: "/players/takamiya", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "茨城県", bloodType: "O型", hobby: "グラビア・麻雀", nickname: "レディ・ベルセルク", titles: [{"year":"2025","name":"女流プロ麻雀日本シリーズ2025"},{"year":"2016","name":"女流プロ麻雀日本シリーズ2016"}], bio: ["「まりあんぬ」高宮まり。茨城県出身、1988年生まれ。日本プロ麻雀連盟第27期生として2011年にプロ入り。グラビアアイドルとしても活動する、麻雀界屈指のビジュアル系女流雀士。", "KONAMI麻雀格闘倶楽部のMリーガーとして2018年発足時から参加。女流桜花Aリーグにも在籍し、麻雀もグラビアもハイレベルをこなす。得意な局面での攻撃的な仕掛けが持ち味。", "趣味は麻雀とグラビア活動。持ち前の明るいキャラクターでチームの雰囲気メーカー的存在でもある。"], annualPoints: [{ season: "2018-19", points: -273.9, note: "final" }, { season: "2019-20", points: 99.5, note: "semifinal" }, { season: "2020-21", points: -246.0, note: "semifinal" }, { season: "2021-22", points: -237.4, note: "final" }, { season: "2022-23", points: 194.1, note: "final" }, { season: "2023-24", points: -64.7, note: "semifinal" }, { season: "2024-25", points: -243.0, note: "semifinal" }, { season: "2025-26", points: 220.7 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 77, bestScore: 53800 }, videos: [
    { id: "1WfuDR3zzo4", title: "【Mリーグ】高宮まり、四暗刻！またもオーラス劇的な役満＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "OD4f7Aic-Uc", title: "高宮まり、強烈清一色炸裂!!", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "TkxUEwgY8oA", title: "高宮まりプロは打ち方終わってる武田鉄矢と最後まで笑わずに麻雀できるか？", channel: "霜降り明星せいやのイニミニチャンネル", type: "match" },
  ] },
  { id: "date", name: "伊達朱里紗", nameEn: "Arisa Date", org: "JPML", title: "Mリーグ2023-24シーズン4着回避率トップ", tags: ["女流", "A1"], league: "C1", period: "第30期", joinYear: 2014, birthday: "1991/05/10", gender: "female", href: "/players/date", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "兵庫県三田市", bloodType: "B型", hobby: "水彩色鉛筆画・ライブ鑑賞", nickname: "朱きヴァルキュリア", titles: [{"year":"2023","name":"Mリーグ2023-24シーズン4着回避率トップ"},{"year":"2022","name":"Mリーグ2022-23シーズンMVP"},{"year":"2021","name":"Mリーグ2021-22シーズン間最高スコア賞"},{"year":"2021","name":"第1期桜蕾"},{"year":"2021","name":"第1期桜蕾戦"}], bio: ["「夢見るセイレーン」伊達朱里紗。兵庫県三田市出身、1991年生まれ。声優・81プロデュース所属としても活動する二刀流プロ。立命館大学映像学部中退後、2014年に日本プロ麻雀連盟第30期生としてプロ入り。", "2021年に第一期桜蕾戦優勝で初タイトル。2021-22シーズンよりKONAMI麻雀格闘倶楽部のMリーガーとして参加。声優としての感性を活かした表現豊かな麻雀スタイルでファンを魅了する。", "趣味は水彩色鉛筆画とライブ鑑賞。アニメ「咲-Saki-」に影響を受けて麻雀の世界へ踏み込んだという。"], annualPoints: [{ season: "2021-22", points: 269.5, note: "final" }, { season: "2022-23", points: 320.2, note: "final" }, { season: "2023-24", points: 215.3, note: "semifinal" }, { season: "2024-25", points: 98.6, note: "semifinal" }, { season: "2025-26", points: 91.2 }], currentSeason: { season: "2025-26", topRate: 26, avoid4th: 73, bestScore: 60900 }, videos: [
    { id: "kvz7d2cuyJ4", title: "[Mリーグ] Mリーグ史上最高得点‼︎まさかの十万点越えが出た試合の配牌から和了までまとめ。朱きヴァルキリアの進撃が止まらない‼︎[切り抜き/麻雀/伊達朱里紗]", channel: "Mリーグ切り抜き集【切り抜き】", type: "match" },
    { id: "PDl0C8JMHHg", title: "【Mリーグ】伊達朱里紗、開幕初日に役満・四暗刻を和了＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "EppYxvNTjc4", title: "【役満】\"朱きヴァルキュリア\"伊達朱里紗の大逆転四暗刻!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "takizawa", name: "滝沢和典", nameEn: "Kazunori Takizawa", org: "JPML", title: "王位×2", tags: ["攻撃型", "A1"], league: "B1", period: "第12期", joinYear: 1996, birthday: "1971/03/15", gender: "male", href: "/players/takizawa", mleagueTeam: "KONAMI麻雀格闘倶楽部", birthplace: "新潟県長岡市", bloodType: "B型", hobby: "ギター・お酒", nickname: "麻雀バガボンド", titles: [{"year":"2008","name":"第33期王位"},{"year":"2007","name":"第32期王位"}], bio: ["「格闘倶楽部の職人」滝沢和典。新潟県長岡市出身、1979年生まれ。音楽系専門学校中退後、1996年に日本プロ麻雀連盟第12期生としてプロ入り。連盟理事、八段。", "王位を2期連覇（第32・33期）するなど安定した実力を持つ職人型雀士。Mリーグには2018年発足時からKONAMI麻雀格闘倶楽部のメンバー。チームの精神的支柱として機能している。", "趣味はギターとお酒。音楽的なセンスを麻雀のリズム感に活かす独特のスタイルが評価されている。"], annualPoints: [{ season: "2018-19", points: 314.8, note: "final" }, { season: "2019-20", points: -188.2 }, { season: "2020-21", points: 2.0, note: "final" }, { season: "2021-22", points: 294.2, note: "final" }, { season: "2022-23", points: -135.4, note: "final" }, { season: "2023-24", points: -120.0, note: "semifinal" }, { season: "2024-25", points: -35.6, note: "semifinal" }, { season: "2025-26", points: 368.4 }], currentSeason: { season: "2025-26", topRate: 42, avoid4th: 72, bestScore: 67400 }, videos: [
    { id: "W2jraWXAukY", title: "【役満炸裂】大三元！", channel: "M.LEAGUE", type: "highlight", isOfficial: true },
    { id: "sdGhpYzVgfw", title: "イケメン雀士 滝沢和典に迫る！栄光と挫折を経験した先にあったものとは？〈21人の軌跡〉『熱闘！Mリーグ#6』", channel: "M.LEAGUE", type: "interview", isOfficial: true },
    { id: "7sgz_PLFl3k", title: "なつかしい一局 時代を感じる1シーン", channel: "MONDO TV", type: "match", isOfficial: true },
  ] },

  // ── EX風林火山 ──────────────────────────────────────────────
  { id: "nikaido-a", name: "二階堂亜樹", nameEn: "Aki Nikaido", org: "JPML", title: "プロクイーン", tags: ["女流", "A1"], league: "A1", period: "第15期", joinYear: 1999, birthday: "1980/04/09", gender: "female", href: "/players/nikaido-a", mleagueTeam: "EX風林火山", birthplace: "神奈川県鎌倉市", bloodType: "O型", hobby: "ドライブ・漫画", nickname: "卓上の舞姫", titles: [{"year":"2005","name":"第3期プロクイーン"}], bio: ["「卓上の舞姫」二階堂亜樹。神奈川県鎌倉市出身、1981年生まれ。日本プロ麻雀連盟第15期生として1999年にプロ入り。姉・二階堂瑠美とともに活躍する麻雀界のパイオニア的女流雀士。", "女流桜花を複数期獲得、2007・2008年と連覇も果たした。EX風林火山のMリーガーとして2018年発足時から参加。優雅な佇まいと鋭い一打が共存する「舞姫」の名にふさわしい雀士。", "趣味はドライブと漫画。姉妹でともにMリーガーとして活躍した時代を持つ、連盟を代表するレジェンド女流プロ。"], annualPoints: [{ season: "2018-19", points: -49.0, note: "final" }, { season: "2019-20", points: -286.4 }, { season: "2020-21", points: -37.5, note: "final" }, { season: "2021-22", points: 49.4, note: "semifinal" }, { season: "2022-23", points: 27.5, note: "final" }, { season: "2023-24", points: -123.6, note: "final" }, { season: "2024-25", points: 37.9 }, { season: "2025-26", points: 271.5 }], currentSeason: { season: "2025-26", topRate: 34, avoid4th: 76, bestScore: 65200 }, videos: [
    { id: "NnCtLPnDVkA", title: "【Mリーグ】二階堂亜樹、四暗刻単騎！狙いすましたリーチ＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "tcAJ1_Lo5YA", title: "二階堂亜樹､清老頭テンパイ!!【麻雀最強戦2017】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "THRN96VmmQQ", title: "【役満】二階堂亜樹の大三元！！【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },
  { id: "katsumata", name: "勝又健志", nameEn: "Kenji Katsumata", org: "JPML", title: "鳳凰位", tags: ["論理派", "A1"], league: "A1", period: "第17期", joinYear: 2001, birthday: "1981/03/15", gender: "male", href: "/players/katsumata", mleagueTeam: "EX風林火山", birthplace: "東京都墨田区", bloodType: "B型", hobby: "将棋・漫画", nickname: "麻雀軍師", titles: [{ year: "2024", name: "JPML WRC-Rリーグ24前期" }, { year: "2015", name: "第32期鳳凰位" }, { year: "2011", name: "第2期麻雀グランプリMAX" }], bio: ["「天才軍師」「麻雀IQ220」勝又健志。東京都墨田区出身、1981年生まれ。早稲田大学在学中の19歳で日本プロ麻雀連盟第17期生としてプロ入り。", "2016年に第32期鳳凰位を最年少クラスで獲得し一躍注目を集める。2026年には第42期鳳凰位も獲得、Mリーグではチーム最高成績にも貢献。EX風林火山のメンバーとして2018年発足時から参加。", "趣味は将棋と漫画。早大卒の知性と高い情報処理能力から「麻雀IQ220」と称される理論派で、データと感覚を融合させた現代麻雀の体現者。"], annualPoints: [{ season: "2018-19", points: 15.9, note: "final" }, { season: "2019-20", points: 0.5 }, { season: "2020-21", points: -73.3, note: "final" }, { season: "2021-22", points: 197.1, note: "semifinal" }, { season: "2022-23", points: 241.3, note: "final" }, { season: "2023-24", points: 404.2, note: "final" }, { season: "2024-25", points: -242.1 }, { season: "2025-26", points: -398.2 }], currentSeason: { season: "2025-26", topRate: 4, avoid4th: 75, bestScore: 50200 }, videos: [
    { id: "aNaQUBFzweg", title: "【2024-25】まさに天下無双！チームの窮地を救った軍師の国士無双【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "SfsOUI8bSUA", title: "【麻雀・Mリーグ 11/20 ハイライト】勝又衝撃のMリーグ初三倍満！＜風林火山vsABEMASvs雷電vsPirates＞『大和証券 Mリーグ』毎週月火木金よる7時生放送中", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "1XR1ToWerhM", title: "【麻雀】勝つために戦い続けた\"麻雀軍師\"の勝又健志に大きな変化が!?麻雀界の発展に向けファンへの想いとは？＜21人の軌跡＞『熱闘！Mリーグ#24』アベマTV全編公開中", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "nagai", name: "永井孝典", nameEn: "Kosuke Nagai", org: "最高位戦", title: "EX風林火山『IKUSA2024』優勝", tags: ["A"], league: "C3", titles: [{"year":"2024","name":"EX風林火山『IKUSA2024』優勝"}], period: "", joinYear: 2008, birthday: "1986/08/10", gender: "male", href: "/players/nagai", mleagueTeam: "EX風林火山", birthplace: "愛知県田原市", bloodType: "B型", hobby: "競馬・野球観戦", nickname: "三河の猛将", bio: ["「フッ軽雀士」永井孝典。愛知県田原市出身、1986年生まれ。最高位戦日本プロ麻雀協会所属。関西を拠点にしながら全国のタイトル戦予選やプロアマ大会に積極参加する行動力が持ち味。", "Mリーグには2024-25シーズンよりEX風林火山のメンバーとして参加。加入直後からトップを量産し、チームの勝利に大きく貢献した。", "趣味は競馬と野球観戦。隣の豊橋市出身の鈴木優選手と同じ高校の先輩にあたるという縁も。"], annualPoints: [{ season: "2025-26", points: 503.6 }], currentSeason: { season: "2025-26", topRate: 41, avoid4th: 85, bestScore: 67100 }, videos: [
    { id: "yMZJCX7_k9c", title: "【Mリーグ：永井孝典】これはまさに三河の猛将！渋川も認める強すぎる押し！！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "XgKKYqXBDY4", title: "【永井孝典】今季の主役は俺だ！！まさかまさかの劇的逆転劇で１０勝目！！", channel: "Mリーグを100倍楽しく観る方法🀄️", type: "highlight" },
    { id: "_ynUY-DrV4Q", title: "【Mリーグ】時が止まった！？ABEMAS『多井 隆晴』vs 風林火山『永井 孝典』打つ牌がナイ！？新シーズン初戦…まさかの苦しい放銃！！【麻雀/名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },
  { id: "uchikawa", name: "内川幸太郎", nameEn: "Kotaro Uchikawa", org: "JPML", title: "十段位", tags: ["A1"], league: "A1", period: "第21期", joinYear: 2005, birthday: "1981/05/06", gender: "male", href: "/players/uchikawa", mleagueTeam: "EX風林火山", birthplace: "長野県松本市", bloodType: "O型", hobby: "ポーカー", nickname: "手順マエストロ", titles: [{"year":"2018","name":"第35期十段位"}], bio: ["「手順マエストロ」内川幸太郎。長野県松本市出身、1981年生まれ。長野県松本深志高校卒業後、21歳で雀荘経営を決意し経営者として活動。その後2005年に日本プロ麻雀連盟第21期生としてプロ入り。", "十段位を2期連覇（第35・36期）するなどタイトルを複数獲得。正確な手順と読みの深さが特徴で「手順マエストロ」と称される。KADOKAWAサクラナイツに2018年発足時から参加し、2024-25シーズンからEX風林火山に移籍。", "趣味はポーカー。論理的な思考を麻雀に活かし、チームの中核として長年活躍してきた。"], annualPoints: [{ season: "2019-20", points: -33.1, note: "final" }, { season: "2020-21", points: 468.7, note: "final" }, { season: "2021-22", points: -139.7, note: "final" }, { season: "2022-23", points: 151.1, note: "semifinal" }, { season: "2023-24", points: -204.8, note: "final" }, { season: "2024-25", points: -56.6 }, { season: "2025-26", points: 320.4 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 83, bestScore: 104700 }, videos: [
    { id: "l2JHvS9CvFA", title: "伝説の『西』放銃を楽屋の映像とともに振り返る", channel: "サクラナイツマニア【サクラナイツ切り抜き】", type: "highlight", isOfficial: true },
    { id: "gLavgu41_pk", title: "【Mリーグ】#内川幸太郎 神回避からの三倍満", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "E80uw88YfYw", title: "【役満】\"手順マエストロ\"内川幸太郎の高速国士無双!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
  ] },

  // ── BEAST X ─────────────────────────────────────────────────
  { id: "suzuki-d", name: "鈴木大介", nameEn: "Daisuke Suzuki", org: "JPML", title: "最強位", tags: ["棋士", "A1", "五段"], league: "A1", period: "第39期", joinYear: 2023, birthday: "1974/07/11", gender: "male", href: "/players/suzuki-d", mleagueTeam: "BEAST X", birthplace: "東京都町田市", bloodType: "A型", hobby: "競馬・囲碁・ゴルフ", nickname: "二刀流ブルドーザー", rank: "五段", titles: [{ year: "2019", name: "麻雀最強戦2019 最強位" }], bio: ["「二刀流ブルドーザー」鈴木大介。東京都町田市出身、1974年生まれ。将棋棋士（棋士番号213・九段）として長年活躍し、麻雀では2019年に麻雀最強戦を制して最強位を獲得した。", "2023年に日本プロ麻雀連盟第39期生として入会。連盟公式名簿では東京本部所属、五段として掲載されている。同年のMリーグドラフト会議でBEAST Xに指名され、麻雀プロとしてMリーグデビューを果たした。", "将棋では1994年に20歳でプロ棋士となり、2023年に九段へ昇段。趣味は競馬・囲碁・ゴルフ。将棋で培った大局観と高打点志向を併せ持つ、唯一無二の二刀流プロ。"], annualPoints: [{ season: "2023-24", points: -97.2 }, { season: "2024-25", points: 30.0 }, { season: "2025-26", points: -159.3 }], currentSeason: { season: "2025-26", topRate: 18, avoid4th: 66, bestScore: 58600 }, videos: [
    { id: "jNQnHNC3xas", title: "【2024-25】鈴木大介、チーム窮地を救う大三元成就！【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "J617C-Pzwls", title: "【2023-24】二刀流ブルドーザー鈴木大介！インパクト絶大の和了集！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "H6PGjJZ4MWc", title: "鈴木大介､心へし折る!!【麻雀最強戦2019】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "nakata", name: "中田花奈", nameEn: "Kana Nakata", org: "JPML", title: "", tags: ["女流", "アイドル"], league: "E1", period: "第33期", joinYear: 2017, birthday: "1994/08/06", gender: "female", href: "/players/nakata", mleagueTeam: "BEAST X", birthplace: "埼玉県", bloodType: "A型", hobby: "アイドル・ラジオ", nickname: "純卓のインフルエンサー", bio: ["「乃木坂の女流雀士」中田花奈。埼玉県出身、1994年生まれ。17歳で乃木坂46に加入し人気アイドルとして活躍。大学在学中に雀荘のアルバイトをきっかけに麻雀にのめり込み、卒業後の2017年に日本プロ麻雀連盟第33期生としてプロ入り。", "Mリーグには2023-24シーズンよりBEAST Xのメンバーとして参加。アイドル時代のファンと麻雀ファン双方から愛される。東京・千駄木で雀荘カフェ「chun.」を経営するオーナー店長でもある。", "趣味はアイドル鑑賞とラジオ。2024年には初タイトルを目指してリーグ戦でも奮闘中。"], annualPoints: [{ season: "2023-24", points: -261.3 }, { season: "2024-25", points: -575.4 }, { season: "2025-26", points: 228.4 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 81, bestScore: 65100 }, videos: [
    { id: "qyu0IFKd9QA", title: "【中田花奈】ビーストの女神が大暴れ‼️強者３人を、ぶった斬る‼️", channel: "Mリーグを100倍楽しく観る方法🀄️", type: "match" },
    { id: "imo79YSlWDQ", title: "中田花奈､18000!!【麻雀最強戦2023 最強＆インフルエンサー決戦 名局①】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "8OuFFxBkF1w", title: "【2023-24】純卓のインフルエンサー中田花奈！初アガリで華やかな跳満ツモ！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
  ] },
  { id: "shimoishi", name: "下石戟", nameEn: "Geki Shimoishi", org: "NPM", title: "Mリーグ2025-26シーズンMVP", tags: ["攻撃型"], league: "A1", period: "第13期", joinYear: 2014, birthday: "1987/03/20", gender: "male", href: "/players/shimoishi", mleagueTeam: "BEAST X", birthplace: "北海道苫小牧市", bloodType: "B型", hobby: "ビールを飲むこと", nickname: "鬼神", titles: [{"year":"2025","name":"Mリーグ2025-26シーズンMVP"},{"year":"2023","name":"第15期RMUクラウン"},{"year":"2011","name":"2011ウェスタンチャンピオンシップ優勝"}], bio: ["「逆襲の戟」下石戟。北海道苫小牧市出身、1987年生まれ。日本プロ麻雀協会第13期生（旧名：下井重貴）。2025-26シーズンに行われたBEAST Xのメンバー入替オーディションで優勝し、ドラフト指名を勝ち取った。", "Mリーグには2025-26シーズンよりBEAST Xのメンバーとして参加。オーディションでは全国のプロ雀士と競い合い、その実力を証明した。協会の雀王戦にも参加し着実にキャリアを積んでいる。", "趣味はビールを飲むこと。北海道出身らしい豪快さと、緻密な読みを両立させた雀風が持ち味。"], annualPoints: [{ season: "2025-26", points: 614.0 }], currentSeason: { season: "2025-26", topRate: 36, avoid4th: 84, bestScore: 58000 }, videos: [
    { id: "GMZIHTB9Au4", title: "【2025-26】鬼神 #下石戟 の手に舞い降りた三種の神器！開局に閃光の親大三元！【#Mリーグ 公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "H8IHDSvxMcU", title: "【地和】衝撃の下石戟【出現確率0.00158％】", channel: "日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "G3Lvwp-2duE", title: "【天和】世界初！生放送対局にて炸裂！【役満】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },
  { id: "tojo", name: "東城りお", nameEn: "Rio Tojo", org: "JPML", title: "夕刊フジ杯", tags: ["女流", "A1"], league: "D2", period: "第29期", joinYear: 2013, birthday: "1990/09/18", gender: "female", href: "/players/tojo", mleagueTeam: "BEAST X", birthplace: "秋田県潟上市", bloodType: "O型", hobby: "ゲーム・アニメ", nickname: "ミスパーフェクト", titles: [{ year: "2021", name: "第15期夕刊フジ杯麻雀女王" }], bio: ["「全力乙女」東城りお。秋田県潟上市出身、1990年生まれ。日本プロ麻雀連盟第29期生として2013年にプロ入り。Mリーグには2021-22シーズンよりセガサミーフェニックスのメンバーとして参加し2024-25シーズンまで活躍。", "2025-26シーズンよりBEAST Xに移籍。「全力乙女」の愛称どおり、持ち前の明るさと全力プレーでファンを魅了する。元フェニックスとしての経験を新天地で活かす。", "趣味はゲームとアニメ。Mリーグ会場でも常に笑顔を絶やさず、チームの雰囲気を明るくする存在。"], annualPoints: [{ season: "2021-22", points: 55.9, note: "final" }, { season: "2022-23", points: 163.0 }, { season: "2023-24", points: -231.6 }, { season: "2025-26", points: 6.6 }], currentSeason: { season: "2025-26", topRate: 28, avoid4th: 78, bestScore: 48400 }, videos: [
    { id: "yLX4Tj4Z8Dw", title: "【役満】\"ミス・パーフェクト\"東城りお 逆転優勝へ望みをつなぐ四暗刻!!【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "p8DSjT5DcOQ", title: "ミス・パーフェクト東城りお！🀄鳴かずからの6000オールツモ！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "KFQRdTsdrRE", title: "【東城りお】Mリーグ7万点越えの初トップ！親番から炸裂する勝負強さ", channel: "激闘Mリーグ", type: "highlight" },
  ] },

  // ── 赤坂ドリブンズ ───────────────────────────────────────────
  { id: "sonoda", name: "園田賢", nameEn: "Ken Sonoda", org: "最高位戦", title: "TheAllStarLeague2017・2018優勝×2", tags: ["A"], league: "A1", titles: [{"year":"2018","name":"Mリーグ2018優勝"},{"year":"2018","name":"TheAllStarLeague2017・2018優勝"},{"year":"2018","name":"麻雀駅伝2018優勝"},{"year":"2017","name":"TheAllStarLeague2017・2018優勝"}], period: "", joinYear: 2006, birthday: "1980/11/25", gender: "male", href: "/players/sonoda", mleagueTeam: "赤坂ドリブンズ", birthplace: "兵庫県神戸市", bloodType: "A型", hobby: "カラオケ・お酒", nickname: "卓上の魔術師", bio: ["「孤高のデジタリスト」園田賢。兵庫県神戸市出身、1980年生まれ。慶應義塾大学環境情報学部卒業という高学歴の持ち主。2003年に最高位戦日本プロ麻雀協会に入会（第28期後期）。", "2017年にAリーグ昇級・決定戦進出を果たし、Mリーグには2018年発足時から赤坂ドリブンズのメンバーとして参加。データと論理に基づくデジタル系の雀風で、長期的な安定感と爆発力を兼ね備える。", "趣味はカラオケとお酒。ExcelやスプレッドシートでのデータAIシステムを開発するなど、麻雀外でも知的好奇心を発揮している。"], annualPoints: [{ season: "2018-19", points: 123.2, note: "final" }, { season: "2019-20", points: -377.6 }, { season: "2020-21", points: -28.7, note: "final" }, { season: "2021-22", points: -56.7 }, { season: "2022-23", points: 262.1 }, { season: "2023-24", points: 205.1, note: "final" }, { season: "2024-25", points: 398.6, note: "final" }, { season: "2025-26", points: 402.7 }], currentSeason: { season: "2025-26", topRate: 36, avoid4th: 80, bestScore: 57000 }, videos: [
    { id: "1h3vJ_vx_JY", title: "【2024-25】レギュラー最終戦に大波乱を起こす園田賢の国士無双！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "-GxK80NY3o0", title: "【Mリーグ】園田賢、オーラスに国士無双炸裂！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "e4F7Xervd2E", title: "【Mリーグ/麻雀】そんな夢のような手牌、見たことない！！赤坂ドリブンズ「園田 賢」吹き荒れる追い風を背にチャンタ二盃口を和了！！チームを救うのは彼しかいない？！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },
  { id: "suzuki-t", name: "鈴木たろう", nameEn: "Taro Suzuki", org: "最高位戦", title: "雀王戦×4", tags: ["A"], league: "Aリーグ", period: "", joinYear: 1999, birthday: "1973/10/04", gender: "male", href: "/players/suzuki-t", mleagueTeam: "赤坂ドリブンズ", birthplace: "茨城県水海道市", bloodType: "B型", hobby: "ポーカー・将棋", nickname: "ゼウスの選択", titles: [{"year":"2014","name":"第13期雀王戦"},{"year":"2013","name":"第12期雀王戦"},{"year":"2012","name":"第11期雀王戦"},{"year":"2010","name":"第9期雀王戦"}], bio: ["「最高位3冠」鈴木たろう。茨城県水海道市（現常総市）出身、1973年生まれ。高千穂大学卒業後、日本プロ麻雀棋士会・日本プロ麻雀協会を経て2020年11月に最高位戦日本プロ麻雀協会へ移籍。", "最高位を3期獲得（第35・41・44期）したタイトルホルダー。Mリーグには2018年発足時から赤坂ドリブンズのメンバーとして参加。ポーカーや将棋も嗜む多彩な知性派雀士。", "趣味はポーカーと将棋。「入会10年負け続けたが近年圧倒的な速度で勝ちを積み重ねている」と称される、遅咲きの実力者。"], annualPoints: [{ season: "2018-19", points: 30.1, note: "final" }, { season: "2019-20", points: -125.6 }, { season: "2020-21", points: 6.5, note: "final" }, { season: "2021-22", points: 132.0 }, { season: "2022-23", points: -327.3 }, { season: "2023-24", points: 211.2, note: "final" }, { season: "2024-25", points: 262.5, note: "final" }, { season: "2025-26", points: -334.9 }], currentSeason: { season: "2025-26", topRate: 10, avoid4th: 75, bestScore: 50100 }, videos: [
    { id: "9YBP54Nr6wE", title: "役満激突!! 四暗刻vs国士無双【麻雀最強戦2023 骨肉の争い 名局⑲】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
    { id: "2V5DjwGbelc", title: "【役満】鈴木たろうの国士無双【第50期最高位戦A1リーグ第8節】 #鈴木たろう #国士無双", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "iDsBNwIvEIc", title: "鈴木たろう(Mリーグ)最高スコア更新の11万2800点！ 【おかぴーの麻雀教室】", channel: "おかぴーの麻雀教室【KADOKAWAサクラナイツ・切り抜き】", type: "match", isOfficial: true },
  ] },
  { id: "asami", name: "浅見真紀", nameEn: "Maki Asami", org: "最高位戦", title: "女流最高位", tags: ["女流", "A"], league: "C3", period: "第35期", joinYear: 2018, birthday: "1985/08/30", gender: "female", href: "/players/asami", mleagueTeam: "赤坂ドリブンズ", birthplace: "埼玉県所沢市", bloodType: "O型", hobby: "似顔絵を描くこと", nickname: "聡明なるバイプレイヤー", titles: [{"year":"2025","name":"第25期女流最高位"}], bio: ["「聡明なるバイプレイヤー」浅見真紀。埼玉県所沢市出身、1985年生まれ。千葉大学大学院工学研究科デザイン科学専攻卒業という理系高学歴の持ち主。2010年に最高位戦日本プロ麻雀協会第35期前期生としてプロ入り。", "Mリーグには2023-24シーズンより赤坂ドリブンズのメンバーとして参加。大学院で培った分析力を活かした論理的な打牌が特徴。国立大学院卒という知性とお酒好きなキャラクターのギャップも魅力。", "趣味は似顔絵を描くこと。チームの「聡明なバイプレイヤー」として、安定した成績でドリブンズを支えている。"], annualPoints: [{ season: "2023-24", points: -107.2, note: "final" }, { season: "2024-25", points: 255.1, note: "final" }, { season: "2025-26", points: -104.1 }], currentSeason: { season: "2025-26", topRate: 18, avoid4th: 81, bestScore: 60400 }, videos: [
    { id: "vZmYt1lYL6A", title: "【2023-24】ドリブンズ新加入のシンデレラ！浅見真紀、2件立直に覚悟の押し切り！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "_L5KdHMbK58", title: "[麻雀-役満]浅見真紀の国士無双-第9回女流モンド杯", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "mHALR4svenY", title: "【役満】浅見真紀の大三元【第25期最高位戦女流Aリーグ第1節】 #浅見真紀 #大三元", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "watanabe", name: "渡辺太", nameEn: "Futoshi Watanabe", org: "最高位戦", title: "天鳳位×3", tags: ["A"], league: "A2", period: "", joinYear: 2010, birthday: "1988/07/25", gender: "male", href: "/players/watanabe", mleagueTeam: "赤坂ドリブンズ", birthplace: "埼玉県さいたま市", bloodType: "A型", hobby: "カラオケ・将棋観戦", nickname: "麻雀シンギュラリティ", titles: [{ year: "2026", name: "第34期麻雀マスターズ" }, { year: "2025", name: "インターネット麻雀日本選手権2025" }, { year: "2020", name: "第16代4麻天鳳位" }, { year: "2019", name: "第14代3麻天鳳位" }, { year: "2014", name: "第5代4麻天鳳位" }], bio: ["「麻雀シンギュラリティ」渡辺太。埼玉県さいたま市出身、1988年生まれ。現役の医師でもある異色の経歴の持ち主。東京大学理科1類に現役合格・中退後、医学部へ再入学して医師免許取得。天鳳位にも3回到達した天才肌。", "最高位戦日本プロ麻雀協会所属。Mリーグには赤坂ドリブンズのメンバーとして参加。医師・天鳳位・Mリーガーという三つの顔を持つ「麻雀シンギュラリティ」の異名は伊達ではない。", "趣味はカラオケと将棋観戦。知性と実戦の両立を体現する存在として麻雀界でも独自のポジションを確立している。"], annualPoints: [{ season: "2023-24", points: 36.2, note: "final" }, { season: "2024-25", points: 199.3, note: "final" }, { season: "2025-26", points: 282.9 }], currentSeason: { season: "2025-26", topRate: 30, avoid4th: 81, bestScore: 68300 }, videos: [
    { id: "MqanBp0OuGk", title: "【2025-26】48000点は12000オールで追いつく!! #渡辺太 淀みないツモで親トリプルツモ！！【#Mリーグ 公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
    { id: "XuvVWMCw_x0", title: "【渡辺太】役満より珍しい三倍満", channel: "激闘Mリーグ", type: "highlight" },
    { id: "6pewHME5YAg", title: "【Mリーグ/麻雀】解説/仲林「お見事ですね…」これはマジでスゴイ！！赤坂ドリブンズ『渡辺 太』あの手をアガリまで…！！ゲームを決めかねぬ七対子！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
  ] },

  // ── セガサミーフェニックス ────────────────────────────────────
  { id: "kayamori", name: "茅森早香", nameEn: "Sayaka Kayamori", org: "最高位戦", title: "女流最高位", tags: ["女流", "A"], league: "女流B", period: "", joinYear: 2006, birthday: "1985/04/01", gender: "female", href: "/players/kayamori", mleagueTeam: "セガサミーフェニックス", birthplace: "北海道苫小牧市", bloodType: "B型", hobby: "猫を愛でること・ビール", nickname: "天才すぎるオンナ雀士", titles: [{"year":"2011","name":"第11期女流最高位"}], bio: ["「天才すぎるオンナ雀士」茅森早香。北海道苫小牧市出身、1982年生まれ。北海道苫小牧西高校中退後、2001年に最高位戦日本プロ麻雀協会に入会。Mリーグ初年度から参加するセガサミーフェニックスの顔。", "女流最高位第11期・女流モンド第2回など複数タイトルを獲得。2025-26シーズンよりフェニックスの選手兼任監督を務める。手役を主眼に置きつつ状況対応する独自のバランス型雀風が特徴。", "趣味は猫を愛でることとビール。天才と呼ばれながらも庶民的なキャラクターで愛されている。"], annualPoints: [{ season: "2018-19", points: -65.4 }, { season: "2019-20", points: -157.9, note: "final" }, { season: "2020-21", points: 110.2 }, { season: "2021-22", points: 251.6, note: "final" }, { season: "2022-23", points: -186.3 }, { season: "2023-24", points: -165.7 }, { season: "2024-25", points: -223.3, note: "semifinal" }, { season: "2025-26", points: -58.9 }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 76, bestScore: 79600 }, videos: [
    { id: "pM8YHDKDnN8", title: "【役満】\"天才過ぎる女雀士\"茅森早香 一発逆転の字一色！！【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "G745a1HBLMg", title: "[麻雀-役満]茅森早香の四暗刻単騎-第3回女流モンド21杯", channel: "MONDO TV", type: "highlight", isOfficial: true },
    { id: "xJqRC0-VNos", title: "【再up】全員ドン引き・・・　茅森の倍満清一色　「切り抜き」", channel: "頭文字M 「Mリーグ切り抜き」", type: "match" },
  ] },
  { id: "daigo", name: "醍醐大", nameEn: "Dai Daigo", org: "最高位戦", title: "2025Mリーグ2024-25個人MVP×2", tags: ["A"], league: "A2", period: "", joinYear: 2010, birthday: "1988/06/14", gender: "male", href: "/players/daigo", mleagueTeam: "セガサミーフェニックス", birthplace: "千葉県松戸市", bloodType: "O型", hobby: "将棋・人狼・サウナ", nickname: "孤高の探究者", titles: [{"year":"2025","name":"2025Mリーグ2024-25個人MVP"},{"year":"2024","name":"2025Mリーグ2024-25個人MVP"},{"year":"2021","name":"第45期最高位"},{"year":"2020","name":"2020第23回BIG1カップ優勝"},{"year":"2020","name":"2020第45期最高位"}], bio: ["「孤高の探究者」「先切り十段」醍醐大。千葉県松戸市出身、1976年生まれ。慶應義塾大学経済学部退学後、最高位戦日本プロ麻雀協会に入会（第30期前期）。中学から慶應に通った高学歴雀士。", "2020年に第45期最高位を獲得。「先切り十段」の異名が示すように、バランス型でありながら独自の読みで牌を先切りするスタイルが持ち味。Mリーグには2020-21シーズンよりセガサミーフェニックスのメンバーとして参加。", "趣味は将棋・人狼・サウナ。サラリーマン兼Mリーガーという二刀流で、川に落ちて足を骨折したエピソードも伝説。"], annualPoints: [{ season: "2023-24", points: -214.4 }, { season: "2024-25", points: 438.6, note: "semifinal" }, { season: "2025-26", points: 113.0 }], currentSeason: { season: "2025-26", topRate: 29, avoid4th: 75, bestScore: 60500 }, videos: [
    { id: "qZtIajQ8GOo", title: "【Mリーグ】「お前の手で決めろ…」セガサミーフェニックス『醍醐 大』激闘ファイナル最終決戦…！！初優勝を決めた痺れすぎるオーラス！！【麻雀/名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "CKXQMjzAL5w", title: "【醍醐大の鳥肌名シーン】これを止めるのが最高位です【47期最高位決定戦】", channel: "最高位戦日本プロ麻雀協会", type: "match", isOfficial: true },
    { id: "xoZUQ_v8dCY", title: "【役満】醍醐大の四暗刻【第50期最高位戦A2リーグ第3節】 #醍醐大 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "takeuchi", name: "竹内元太", nameEn: "Genta Takeuchi", org: "最高位戦", title: "最高位×2", tags: ["A"], league: "A1", period: "", joinYear: 2012, birthday: "1986/03/12", gender: "male", href: "/players/takeuchi", mleagueTeam: "セガサミーフェニックス", birthplace: "長野県長野市", bloodType: "O型", hobby: "登山・ダジャレ", nickname: "無敵のタイタン", titles: [{"year":"2024","name":"第48期最高位"},{"year":"2023","name":"第47期最高位"},{"year":"2022","name":"2022第24回BIG1カップ優勝"}], bio: ["「無敵のタイタン」竹内元太。長野県長野市出身、1986年生まれ。大学中退後、2012年に最高位戦日本プロ麻雀協会に入会（第38期前期）。プロ入り10年目の2022年に一気に開花した遅咲きの最高位。", "2022年に第47期最高位を獲得、2023年には第48期最高位で連覇を達成。Mリーグには2022-23シーズンよりセガサミーフェニックスのメンバーとして参加。最高位連覇により「無敵のタイタン」の称号を確立した。", "趣味は登山とダジャレ。都内で麻雀教室「元太麻雀ラボ」を主宰し、麻雀普及にも力を入れている。"], annualPoints: [{ season: "2024-25", points: 339.8, note: "semifinal" }, { season: "2025-26", points: 151.8 }], currentSeason: { season: "2025-26", topRate: 27, avoid4th: 81, bestScore: 58200 }, videos: [
    { id: "-LAKBwehl3Y", title: "【Mリーグ：竹内元太】狙い定めた先切りが大成功！戦闘民族の守備を上回る！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "ljSD-wug0JE", title: "【役満】出て倍満・ツモって役満の超大物手、ツモる手がしなる！！【第47期最高位決定戦】#竹内元太", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "j8Pg71xQV4k", title: "【役満】竹内元太の国士無双【第50期最高位戦A1リーグ第9節】 #竹内元太 #国士無双", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "asai", name: "浅井堂岐", nameEn: "Doki Asai", org: "NPM", title: "雀王", tags: ["二刀流"], league: "A1", period: "", joinYear: 2012, birthday: "1985/12/24", gender: "male", href: "/players/asai", mleagueTeam: "セガサミーフェニックス", birthplace: "埼玉県熊谷市", bloodType: "O型", hobby: "ITエンジニアリング", nickname: "逆襲のヘラクレス", titles: [{"year":"2022","name":"第21期雀王2022"},{"year":"2021","name":"初代皓王位2021"}], bio: ["「逆襲のヘラクレス」浅井堂岐。埼玉県熊谷市出身、1985年生まれ。大学卒業後、営業職として働きながら2010年に日本プロ麻雀協会に入会。その後ITエンジニアに転身し、現在はバレットグループでエンジニア兼プロ雀士として活躍する二刀流。", "Mリーグには2022-23シーズンよりセガサミーフェニックスのメンバーとして参加。2022年に天鳳新設タイトル「皓王戦」初代優勝者となり「初代皓王位」の称号も持つ。", "ITエンジニアとしての論理的思考を麻雀に活かすスタイルは「逆襲のヘラクレス」の異名とも相まって独自の存在感を放つ。"], annualPoints: [{ season: "2024-25", points: -215.3, note: "semifinal" }, { season: "2025-26", points: -81.7 }], currentSeason: { season: "2025-26", topRate: 24, avoid4th: 68, bestScore: 55900 }, videos: [
    { id: "Ra31_zOJFfg", title: "【Mリーグ：浅井堂岐】スルっときたーーーー！！！最高打点の役満を見事にモノにする！！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "highlight" },
    { id: "ejh4r8DHFJU", title: "【浅井堂岐】開いた口が塞がらない…Mリーグ史に残る「ドラだらけ」の三倍満", channel: "激闘Mリーグ", type: "match" },
    { id: "FCK5kRNZAy0", title: "【浅井堂岐】裏3の倍満条件満たしてオーラスミラクル大逆転", channel: "激闘Mリーグ", type: "highlight" },
  ] },

  // ── 渋谷ABEMAS ───────────────────────────────────────────────
  { id: "taii", name: "多井隆晴", nameEn: "Takaharu Taii", org: "RMU", title: "令昭位×5", tags: ["攻撃型", "A"], league: "A1", period: "", joinYear: 2007, birthday: "1972/03/17", gender: "male", href: "/players/taii", mleagueTeam: "渋谷ABEMAS", birthplace: "東京都葛飾区", bloodType: "B型", hobby: "映画鑑賞・漫画・アニメ", nickname: "最速最強", titles: [{"year":"2022","name":"Mリーグ2022-23シーズン渋谷ABEMAS優勝"},{"year":"2022","name":"Mリーグ2022チーム優勝"},{"year":"2022","name":"第3期飛翔位戦Presentedby2022"},{"year":"2021","name":"Mリーグ20214着回避率1位"},{"year":"2021","name":"麻雀日本シリーズ2015・2016・2021"},{"year":"2020","name":"最強位2020"},{"year":"2020","name":"第11期令昭位"},{"year":"2018","name":"Mリーグ2018-19シーズンMVP"},{"year":"2018","name":"Mリーグ2018個人スコア1位"},{"year":"2017","name":"第8期令昭位"},{"year":"2016","name":"2016度RMUスプリントカップアースカップ優勝"},{"year":"2016","name":"RTDリーグ2016優勝"},{"year":"2016","name":"麻雀日本シリーズ2015・2016・2021"},{"year":"2015","name":"第6期令昭位"},{"year":"2015","name":"麻雀日本シリーズ2015・2016・2021"},{"year":"2013","name":"2013オープンリーグ優勝"},{"year":"2013","name":"第5期RMUクラウン"},{"year":"2012","name":"第3期令昭位"},{"year":"2011","name":"2011オープンリーグ優勝"},{"year":"2011","name":"第9回日本オープン"},{"year":"2010","name":"第1期令昭位"},{"year":"2006","name":"第31期王位"},{"year":"2003","name":"第1回日本オープン"}], bio: ["「最強雀士」多井隆晴。東京都葛飾区出身、1972年生まれ。高校卒業後、日本プロ麻雀連盟を経てRMUを設立・代表を務める。連盟時代の経緯から独立し、新たな麻雀プロ団体・RMUを立ち上げた異色の経歴の持ち主。", "RMU最高ランクのSSS級。Mリーグには2018年発足時から渋谷ABEMASのメンバーとして参加し、圧倒的な成績で「最強雀士」の異名を確立。メンゼンを主体にした攻撃的雀風と高い読み精度が持ち味。", "趣味は映画鑑賞・漫画・アニメ。YouTuberとしても積極的に情報発信し、麻雀の普及・エンタメ化に大きく貢献している。"], annualPoints: [{ season: "2018-19", points: 476.3, note: "final" }, { season: "2019-20", points: 211.4, note: "final" }, { season: "2020-21", points: 234.4, note: "final" }, { season: "2021-22", points: 242.2, note: "final" }, { season: "2022-23", points: -91.6, note: "final" }, { season: "2023-24", points: 30.6, note: "semifinal" }, { season: "2024-25", points: -262.8, note: "semifinal" }, { season: "2025-26", points: 123.4 }], currentSeason: { season: "2025-26", topRate: 28, avoid4th: 84, bestScore: 58400 }, videos: [
    { id: "r7vBnr0mSCM", title: "【役満】Mリーガー「最速最強」多井隆晴の四暗刻【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "gS9EVU9ReTM", title: "麻雀界のカリスマ多井隆晴に迫る！研究熱が衰えることなく麻雀にかける理由は\"恩返し\"Mリーグにへの思いとは『熱闘！Mリーグ#3』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
    { id: "nkY75lB82Cw", title: "【2023-24】麻雀星人、多井隆晴の見事な押し返し！＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "match", isOfficial: true },
  ] },
  { id: "shiratori", name: "白鳥翔", nameEn: "Sho Shiratori", org: "JPML", title: "鳳凰位×2", tags: ["技巧派", "A1"], league: "A1", period: "第22期", joinYear: 2006, birthday: "1983/10/04", gender: "male", href: "/players/shiratori", mleagueTeam: "渋谷ABEMAS", birthplace: "東京都練馬区", bloodType: "A型", hobby: "e-Sports", nickname: "麻雀ハイブリッド", titles: [{"year":"2025","name":"第42期鳳凰位"},{"year":"2024","name":"第41期鳳凰位"},{"year":"2022","name":"Mリーグ2022-23優勝"},{"year":"2020","name":"第28期發王位"},{"year":"2017","name":"第25期麻雀マスターズ"},{"year":"2016","name":"第24期麻雀マスターズ"}], bio: ["「麻雀ハイブリッド」白鳥翔。東京都練馬区出身、1986年生まれ。慶應義塾大学商学部卒業後、2006年に日本プロ麻雀連盟第22期生としてプロ入り。現在は理事・八段。", "2021年の第34期、2022年の第35期と十段位を連覇。2026年現在は現鳳凰位（第42期）。Mリーグには2018年発足時から渋谷ABEMASのメンバーとして参加。守備寄りのバランス型という「ハイブリッド」の名にふさわしい万能型雀士。", "趣味はe-Sports。論理的な思考と高い守備力を兼ね備え、長年にわたってチームの柱として活躍している。"], annualPoints: [{ season: "2018-19", points: -313.8, note: "final" }, { season: "2019-20", points: 290.2, note: "final" }, { season: "2020-21", points: 109.7, note: "final" }, { season: "2021-22", points: 108.8, note: "final" }, { season: "2022-23", points: -84.7, note: "final" }, { season: "2023-24", points: -83.6, note: "semifinal" }, { season: "2024-25", points: 404.0, note: "semifinal" }, { season: "2025-26", points: 110.2 }], currentSeason: { season: "2025-26", topRate: 20, avoid4th: 85, bestScore: 45400 }, videos: [
    { id: "eZ9bdpIp6hM", title: "【役満集#4】 四暗刻単騎待ち【Mリーグ公式】", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "byEkDzjUx0w", title: "今期2度目の役満！白鳥翔の四暗刻", channel: "おかぴーの麻雀教室【KADOKAWAサクラナイツ・切り抜き】", type: "highlight", isOfficial: true },
    { id: "DJBZ_d0P6lY", title: "【麻雀】”麻雀ハイブリッド白鳥翔がパニック障害を告白！医者に告げられた残酷な言葉とは？＜21人の軌跡＞『熱闘！Mリーグ#26』日曜よる10時～アベマTVで生放送！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "matsumoto", name: "松本吉弘", nameEn: "Yoshihiro Matsumoto", org: "NPM", title: "PachumoCUP2025優勝", tags: ["二刀流"], league: "A1", period: "", joinYear: 2012, birthday: "1991/03/28", gender: "male", href: "/players/matsumoto", mleagueTeam: "渋谷ABEMAS", birthplace: "神奈川県横浜市", bloodType: "O型", hobby: "お酒・カラオケ・ペット", nickname: "卓上のヒットマン", titles: [{"year":"2025","name":"PachumoCUP2025優勝"},{"year":"2025","name":"麻雀最強戦2025美女と野獣優勝"},{"year":"2024","name":"麻雀最強戦2024ザ・リベンジ優勝"},{"year":"2023","name":"神域リーグ2023にて・チームヘラクレス(因幡はねる・空星きらめ・緑仙)として優勝"},{"year":"2022","name":"Mリーグ2022-23優勝"},{"year":"2022","name":"雀魂インビテーショナル2022優勝"}], bio: ["「卓上のヒットマン」松本吉弘。神奈川県横浜市出身、1992年生まれ。身長187cmという高身長で存在感を放つ日本プロ麻雀協会第12期生後期。中学では中国語を専攻、大学では青山学院大学に進学した。", "第25期發王位でタイトル初獲得。Mリーグには2018年発足時から渋谷ABEMASのメンバーとして参加。高身長から繰り出す鋭い打牌と「卓上のヒットマン」の異名が示す正確な攻撃が持ち味。", "趣味はお酒・カラオケ・ペット（猫派）。明るいキャラクターとSNSでの発信力でファン層も幅広い。"], annualPoints: [{ season: "2018-19", points: 22.1, note: "final" }, { season: "2019-20", points: -246.3, note: "final" }, { season: "2020-21", points: 272.5, note: "final" }, { season: "2021-22", points: 145.7, note: "final" }, { season: "2022-23", points: 103.3, note: "final" }, { season: "2023-24", points: 100.0, note: "semifinal" }, { season: "2024-25", points: -426.6, note: "semifinal" }, { season: "2025-26", points: -293.7 }], currentSeason: { season: "2025-26", topRate: 19, avoid4th: 61, bestScore: 49600 }, videos: [
    { id: "8IYr3FHyxZU", title: "【役満】最速で四暗刻和了｜Mリーグ2020", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "wo7yzFSstmg", title: "【2023-24】絶対王者ABEMAS、松本吉弘の開幕大逆転倍満ツモ＜#Mリーグ 公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "5exwccAxLeI", title: "【麻雀】\"卓上のヒットマン\"松本に秘められた父との確執とは!?父へ胸中を告白！＜21人の軌跡＞『熱闘！Mリーグ#9』AbemaTVで毎週日曜よる10時生放送中！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "interview", isOfficial: true },
  ] },
  { id: "hinata", name: "日向藍子", nameEn: "Aiko Hinata", org: "最高位戦", title: "プロクイーン×2", tags: ["女流", "A"], league: "A1", period: "", joinYear: 2009, birthday: "1988/09/24", gender: "female", href: "/players/hinata", mleagueTeam: "渋谷ABEMAS", birthplace: "長野県茅野市", bloodType: "O型", hobby: "御朱印集め・ガンプラ", nickname: "ラブフェニックス", titles: [{"year":"2019","name":"第17期プロクイーン"},{"year":"2018","name":"第16期プロクイーン"}], bio: ["「ラブフェニックス」日向藍子。長野県茅野市出身、1988年生まれ。服飾大学卒業後、2011年に最高位戦日本プロ麻雀協会に入会。19歳で麻雀と出会い、ほどなくプロを志した。", "Mリーグには2019-20シーズンより渋谷ABEMASのメンバーとして参加。「ラブフェニックス」「小さなビッグマム」などの愛称を持ち、結婚・出産を経てもMリーガーとして活躍するママ雀士の先駆け。", "趣味は御朱印集め・ガンプラ・フラワーアレンジメント。多彩な趣味と笑顔のキャラクターで幅広いファンから愛されている。"], annualPoints: [{ season: "2019-20", points: 18.6, note: "final" }, { season: "2020-21", points: 38.1, note: "final" }, { season: "2021-22", points: -168.5, note: "final" }, { season: "2022-23", points: 128.6, note: "final" }, { season: "2023-24", points: -69.1, note: "semifinal" }, { season: "2024-25", points: 79.4, note: "semifinal" }, { season: "2025-26", points: -185.8 }], currentSeason: { season: "2025-26", topRate: 15, avoid4th: 70, bestScore: 69600 }, videos: [
    { id: "oT_JQGv5T2I", title: "【役満】日向藍子の四暗刻【第24期最高位戦女流Bリーグ】 #日向藍子 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "kLMhMX_9P70", title: "【役満】日向藍子の小四喜【第51期最高位戦A1リーグ第3節】 #日向藍子", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "Au5c57HRxsI", title: "【ちゅも】日向 藍子　Mリーグ何回聞いても「ちゅも」集", channel: "Mリーグの名場面集【切り抜き】", type: "match" },
  ] },

  // ── KADOKAWAサクラナイツ ─────────────────────────────────────
  { id: "okada", name: "岡田紗佳", nameEn: "Sayaka Okada", org: "JPML", title: "女流日本シリーズ×2", tags: ["女流", "モデル"], league: "C2", period: "第32期", joinYear: 2016, birthday: "1994/02/19", gender: "female", href: "/players/okada", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "東京都世田谷区", bloodType: "O型", hobby: "モデル・中国語", nickname: "完全武装アフロディーテ", titles: [{ year: "2024", name: "女流プロ麻雀日本シリーズ2024" }, { year: "2022", name: "女流プロ麻雀日本シリーズ2022" }, { year: "2022", name: "麻雀最強戦2022 Mリーグスペシャルマッチ" }, { year: "2020", name: "麻雀最強戦2020 最強の女流プロニュースター決戦" }], bio: ["「完全武装アフロディーテ」岡田紗佳。東京都世田谷区出身、1994年生まれ。日中のハーフで中国語・日本語に堪能。青山学院大学国際経済政治学部卒。6歳から中国の小学校に通った国際派。", "モデル・グラビアアイドルとしても活躍しながら、2016年に日本プロ麻雀連盟第32期生としてプロ入り。2018年発足時からKADOKAWAサクラナイツのメンバーとしてMリーグ参加。長身170cmのモデルが打つ攻撃的な麻雀が話題を呼んだ。", "趣味はモデル活動と中国語。「才色兼備」の代名詞として麻雀界だけでなくメディア露出も多い人気選手。"], annualPoints: [{ season: "2019-20", points: -152.8, note: "final" }, { season: "2020-21", points: 33.6, note: "final" }, { season: "2021-22", points: -261.8, note: "final" }, { season: "2022-23", points: 36.7, note: "semifinal" }, { season: "2023-24", points: 212.0, note: "final" }, { season: "2024-25", points: -506.5 }, { season: "2025-26", points: -160.8 }], currentSeason: { season: "2025-26", topRate: 14, avoid4th: 70, bestScore: 97300 }, videos: [
    { id: "fM8VwdwVLMk", title: "岡田紗佳､国士無双13面待ち!!【麻雀最強戦2022】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "highlight" },
    { id: "LJaIT0vkZEw", title: "【TV初】あがったら死ぬと言われる 九蓮宝燈を成就！【岡田紗佳】", channel: "チャンネルバズ動画", type: "highlight" },
    { id: "jTOyE_GtgqE", title: "【岡田紗佳】松本は痛恨の表情！！松本選手とリーチ対決で3倍満直撃！【サクラナイツ】【Mリーグ】", channel: "サクラナイツMリーグ対局切り抜きCH", type: "match", isOfficial: true },
  ] },
  { id: "hori", name: "堀慎吾", nameEn: "Shingo Hori", org: "JPML", title: "Mトーナメント2025優勝", tags: ["A1"], league: "E3", period: "第23期", joinYear: 2007, birthday: "1984/03/23", gender: "male", href: "/players/hori", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "新潟県新発田市", bloodType: "A型", hobby: "ゲーム・競馬・将棋", nickname: "小さな天才", titles: [{"year":"2025","name":"Mトーナメント2025優勝"},{"year":"2024","name":"[https://www.youtube.com/watch?v=pmX3Wkfbb50麻雀遊戯王CUP2024]優勝"},{"year":"2021","name":"Mリーグ2021-22シーズンKADOKAWAサクラナイツ優勝"},{"year":"2019","name":"第18期雀王"}], bio: ["「小さな天才」堀慎吾。新潟県新発田市出身、1984年生まれ、身長164cm。日本プロ麻雀協会第23期生（2010年入会）後に日本プロ麻雀連盟に移籍。", "雀王を3期獲得（第21・22・23期）したタイトルホルダー。2025年にはMトーナメント2025で優勝。Mリーグには2018年発足時からKADOKAWAサクラナイツのメンバーとして参加。小柄な体格ながら「小さな天才」の異名どおり精度の高い麻雀を展開する。", "趣味はゲーム・競馬・将棋。子供向けの麻雀教室も積極的に開催し、普及活動にも力を入れている。"], annualPoints: [{ season: "2020-21", points: 275.6, note: "final" }, { season: "2021-22", points: 178.8, note: "final" }, { season: "2022-23", points: -124.2, note: "semifinal" }, { season: "2023-24", points: 92.8, note: "final" }, { season: "2024-25", points: 72.5 }, { season: "2025-26", points: -442.6 }], currentSeason: { season: "2025-26", topRate: 15, avoid4th: 65, bestScore: 65500 }, videos: [
    { id: "OFqWQLeTvR4", title: "【役満2021】嶺上開花からの四暗刻┃Mリーグ公式", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "vE_Uy52dCZk", title: "【地上波で話題沸騰】堀慎吾！ファイナルで優勝シャーレを手繰り寄せた逆転ツモ！｜MリーグはABEMAで毎週月/火/木/金/よる7時より無料生中継！", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "FRemNTCGQK4", title: "【Mリーグ初の小四喜】#堀慎吾　プロの思考が交錯してまさかの小四喜成就…！プレミアムナイトに大盛り上がり…！…と思いきや会場では放送されて無かったんかーい！！", channel: "Music×M.LEAGUE【エム・エムリーグ】", type: "match", isOfficial: true },
  ] },
  { id: "shibukawa", name: "渋川難波", nameEn: "Nanba Shibukawa", org: "最高位戦", title: "fuzzカップ", tags: ["二刀流", "A"], league: "A2", period: "", joinYear: 2008, birthday: "1986/05/19", gender: "male", href: "/players/shibukawa", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "広島県廿日市市", bloodType: "A型", hobby: "麻雀研究", nickname: "魔神", titles: [{"year":"2024","name":"第4回fuzzカップ2024"},{"year":"2023","name":"Mトーナメント2023優勝"},{"year":"2021","name":"第20期雀王"},{"year":"2017","name":"第15回日本オープン2017"},{"year":"2012","name":"第11期雀竜位"}], bio: ["「魔神」渋川難波。広島県廿日市市出身、1986年生まれ。日本プロ麻雀協会第10期前期生として入会後、2022-23シーズンより最高位戦日本プロ麻雀協会へ移籍。協会のグランドスラム（雀竜位・日本オープン・雀王の全制覇）を達成した実力者。", "Mリーグには2022-23シーズンよりKADOKAWAサクラナイツのメンバーとして参加。「魔神」の異名が示す圧倒的な攻撃力と読みの深さで、チームに不可欠な存在となっている。", "麻雀研究に打ち込む姿勢から「魔神」と称される。YouTubeでの対局解説も好評で、普及活動にも貢献。"], annualPoints: [{ season: "2022-23", points: -105.1, note: "semifinal" }, { season: "2023-24", points: 147.2, note: "final" }, { season: "2024-25", points: 76.7 }, { season: "2025-26", points: 176.7 }], currentSeason: { season: "2025-26", topRate: 25, avoid4th: 80, bestScore: 77800 }, videos: [
    { id: "JRJzirtzLxY", title: "【#役満】欲張り役満セットが舞い降りた渋川 難波【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "hdCLcQcwEV4", title: "【Mリーグ：渋川難波】何度も見たい名シーン！喰いタン裸単騎ｗ全アシストの仲林！", channel: "【切り抜き】Mリーグ〜熱くなれ〜", type: "match" },
    { id: "tQYb1MNfn2k", title: "【致命の一撃】渋川難波、王へ手をかける地獄待ち【麻雀】", channel: "麻雀スリアロチャンネル", type: "match" },
  ] },
  { id: "akutsu", name: "阿久津翔太", nameEn: "Shota Akutsu", org: "JPML", title: "若獅子", tags: ["A1"], league: "A1", period: "第34期", joinYear: 2018, birthday: "1996/04/23", gender: "male", href: "/players/akutsu", mleagueTeam: "KADOKAWAサクラナイツ", birthplace: "茨城県日立市", hobby: "麻雀研究", nickname: "飢えた若獅子", titles: [{ year: "2024", name: "麻雀最強戦2024 最強の遺伝子" }, { year: "2021", name: "第1期若獅子戦" }], bio: ["「若獅子」阿久津翔太。茨城県日立市出身、1996年生まれ。6歳で麻雀プロになることを目標に設定したという生粋の麻雀エリート。埼玉大学情報工学科進学後、卒業前に雀荘勤務を経て2018年に日本プロ麻雀連盟第34期生としてプロ入り。", "第1期若獅子戦優勝で初タイトル。2024-25シーズンよりKADOKAWAサクラナイツのMリーガーとして参加。2025-26シーズンも継続参加し、チームの若手エースとして期待を集める。", "麻雀研究と実戦を両立させた現代型の雀士。「若獅子」の名にふさわしい勢いと将来性がある。"], annualPoints: [{ season: "2025-26", points: -200.0 }], currentSeason: { season: "2025-26", topRate: 19, avoid4th: 69, bestScore: 57100 }, videos: [
    { id: "BsYhoq2ekDg", title: "阿久津翔太､満貫を決める!!【麻雀最強戦2024 最強の遺伝子 名局⑧】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "XZmiGUShj28", title: "阿久津翔太､2局で10000オール!!【麻雀最強戦2024 最強の遺伝子 名局④】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "vmE54X7nCHM", title: "【サクラナイツ】強気がドラマを！解説も大絶賛の手順で奇跡を起こす！【阿久津翔太】【Mリーグ】", channel: "サクラナイツMリーグ対局切り抜きCH", type: "tactics", isOfficial: true },
  ] },

  // ── U-NEXT Pirates ──────────────────────────────────────────
  { id: "kobayashi", name: "小林剛", nameEn: "Go Kobayashi", org: "μ", title: "将王×4", tags: ["理論派", "A"], league: "μ", period: "", joinYear: 2003, birthday: "1976/02/12", gender: "male", href: "/players/kobayashi", mleagueTeam: "U-NEXT Pirates", birthplace: "東京都八王子市", bloodType: "AB型", hobby: "カラオケ", nickname: "麻雀サイボーグ", titles: [{"year":"2024","name":"Mトーナメント2024優勝"},{"year":"2021","name":"第19期将王"},{"year":"2021","name":"麺麺位2021"},{"year":"2018","name":"RTDリーグ2018優勝"},{"year":"2014","name":"麻雀最強戦2014新鋭代表決定戦"},{"year":"2012","name":"第2期天鳳名人位"},{"year":"2011","name":"第1期天鳳名人位"},{"year":"2011","name":"第9期将王"},{"year":"2009","name":"第7期将王"},{"year":"2005","name":"第3期将王"},{"year":"2003","name":"第3回野口恭一郎賞"}], bio: ["「麻将連合の理論派」小林剛。東京都八王子市出身、1976年生まれ。東京理科大学理学部数学科中退後、麻将連合（μ）の前身組織に入会し現在も麻将連合所属。", "王将位をはじめ複数タイトルを保持。Mリーグには2018年発足時からU-NEXT Piratesのメンバーとして参加。数学的バックグラウンドを活かした論理的な雀風で、リーグ内屈指の安定感を誇る。著書も複数持つ論客。", "趣味はカラオケ。著書「小林剛の麻雀必勝法」など執筆活動も精力的に行い、麻雀の理論・普及にも貢献している。"], annualPoints: [{ season: "2018-19", points: -115.6 }, { season: "2019-20", points: 211.0, note: "final" }, { season: "2020-21", points: 337.5 }, { season: "2021-22", points: 154.1, note: "semifinal" }, { season: "2022-23", points: -129.1, note: "semifinal" }, { season: "2023-24", points: -195.0, note: "final" }, { season: "2024-25", points: -77.1, note: "final" }, { season: "2025-26", points: -445.0 }], currentSeason: { season: "2025-26", topRate: 12, avoid4th: 60, bestScore: 42500 }, videos: [
    { id: "FUPA4qKUCrY", title: "【役満】Mリーガー小林剛、国士無双成就にニッコリ【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "H4MRQJNxJsQ", title: "【Mリーグ/麻雀】解説/土田「見てはいけないモノを見てしまった…」U-NEXT Pirates『小林 剛』当たり牌を止めて聴牌をキープするスーパープレイ！！【名場面】", channel: "Mリーグ 至極の一局 【名場面切り抜き】", type: "highlight" },
    { id: "pE9MfzTonG0", title: "小林剛､似合わないメンゼン三色!!【麻雀最強戦2024 骨肉の乱闘 名局⑥】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "mizuhara", name: "瑞原明奈", nameEn: "Akina Mizuhara", org: "最高位戦", title: "女流最高位", tags: ["女流", "A"], league: "C3", period: "", joinYear: 2009, birthday: "1986/11/19", gender: "female", href: "/players/mizuhara", mleagueTeam: "U-NEXT Pirates", birthplace: "長崎県佐世保市", bloodType: "O型", hobby: "映画鑑賞・人狼", nickname: "気高き女海賊", titles: [{"year":"2024","name":"第24期女流最高位"},{"year":"2021","name":"Mリーグ2021-22MVP"},{"year":"2019","name":"プリンセスリーグ2019優勝"}], bio: ["「早大出身の女流エース」瑞原明奈。長崎県佐世保市出身、1986年生まれ。長崎県立佐世保西高校卒業後、早稲田大学国際教養学部に進学。大学在学中にMONDO TVの麻雀番組を見て競技麻雀の世界へ入った。", "最高位戦日本プロ麻雀協会所属（2017年移籍）。女流最高位も獲得し、2021-22シーズンにはMリーグ個人タイトルも受賞。U-NEXT Piratesのメンバーとして2018年発足時から参加し、女性Mリーガー屈指の実力者として評価されている。", "趣味は映画鑑賞と人狼。結婚・出産を経てもMリーガーとして活躍し続けるロールモデル的存在。"], annualPoints: [{ season: "2019-20", points: -101.8, note: "final" }, { season: "2020-21", points: -117.9 }, { season: "2021-22", points: 440.6, note: "semifinal" }, { season: "2022-23", points: 270.3, note: "semifinal" }, { season: "2023-24", points: 378.4, note: "final" }, { season: "2024-25", points: 120.9, note: "final" }, { season: "2025-26", points: -72.3 }], currentSeason: { season: "2025-26", topRate: 31, avoid4th: 65, bestScore: 69300 }, videos: [
    { id: "8824vEudy14", title: "瑞原明奈､5巡目跳満!!【麻雀最強戦2023 Mリーグスペシャルマッチ 名局②】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "Q4zYrO0XKNo", title: "瑞原明奈､美しい三色!!【麻雀最強戦2023 因縁の決着 名局①】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "OEx4LBEJ2-c", title: "【#瑞原明奈】南家は妾の玉座である！日吉が絶句した100戦目の記念登板！全てもぎ取る【#mリーグ】#切り抜き #多井隆晴 #茅森早香 #菅原千瑛", channel: "Mリーグ女流名鑑", type: "match" },
  ] },
  { id: "suzuki-y", name: "鈴木優", nameEn: "Yu Suzuki", org: "最高位戦", title: "麻雀日本シリーズ2024優勝", tags: ["A"], league: "Aリーグ", period: "第36期", joinYear: 2017, birthday: "1981/09/13", gender: "male", href: "/players/suzuki-y", mleagueTeam: "U-NEXT Pirates", birthplace: "愛知県豊橋市", bloodType: "O型", hobby: "お酒・カラオケ", nickname: "戦闘民族", titles: [{"year":"2024","name":"麻雀日本シリーズ2024優勝"},{"year":"2023","name":"Mリーグ2023-24シーズンMVP"},{"year":"2022","name":"第46期最高位"},{"year":"2022","name":"麻雀日本シリーズ2022優勝"},{"year":"2012","name":"麻雀最強戦2012全日本プロ代表戦優勝"}], bio: ["「最強戦の申し子」鈴木優。愛知県豊橋市出身、1981年生まれ。地元大学中退後、雀荘経営を経て最高位戦日本プロ麻雀協会に入会（第36期前期）。地元に「マナーの良い雀荘を作りたい」という思いから雀荘を立ち上げた実業家でもある。", "麻雀最強戦で特に強さを発揮し「最強戦の申し子」と称される。U-NEXT Piratesのメンバーとして2022-23シーズンより参加 (2022年7月ドラフトで仲林圭と同時契約、「シン・パイレーツ」として再出航)。安定した成績でチームに貢献し続けている。", "趣味はお酒とカラオケ。愛知県豊橋市から全国区の舞台へ飛び出した地方発のMリーガーとして、地元ファンからも熱い支持を受けている。"], annualPoints: [{ season: "2022-23", points: -92.8, note: "semifinal" }, { season: "2023-24", points: 437.7, note: "final" }, { season: "2024-25", points: 180.8, note: "final" }, { season: "2025-26", points: 114.8 }], currentSeason: { season: "2025-26", topRate: 29, avoid4th: 67, bestScore: 91500 }, videos: [
    { id: "Md-SortzWZM", title: "【役満】配牌から想像もつかない四暗刻単騎【第48期最高位戦A1リーグ】#鈴木優", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "7Abzk4kE-ZE", title: "【Mリーグ・24-25ファイナル名場面】鈴木優、連覇に向け特大トップ！25-26開幕戦もチーム連対で全速前進！【麻雀・2025/5/15①】#倍満  #ユーネクストパイレーツ #鈴木優 ", channel: "そーぞーのイーソー", type: "highlight" },
    { id: "EYSbwAFjcQA", title: "【役満】死角からの一撃！　鈴木優の小四喜【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },
  { id: "nakabayashi", name: "仲林圭", nameEn: "Kei Nakabayashi", org: "NPM", title: "雀王×2", tags: ["A1"], league: "A1", period: "第8期", joinYear: 2009, birthday: "1987/04/22", gender: "male", href: "/players/nakabayashi", mleagueTeam: "U-NEXT Pirates", birthplace: "東京都武蔵野市", bloodType: "O型", hobby: "フットサル", nickname: "龍を継ぐもの", titles: [{"year":"2024","name":"第23期雀王"},{"year":"2024","name":"第23期雀王戦"},{"year":"2023","name":"第22期雀王"},{"year":"2023","name":"第22期雀王戦"},{"year":"2022","name":"第30期發王位"},{"year":"2021","name":"第29期發王位"},{"year":"2011","name":"第10期雀竜位"},{"year":"2011","name":"第10期雀竜位戦"}], bio: ["「海賊の司令塔」仲林圭。東京都武蔵野市出身、1985年生まれ（本名：中林啓）。早稲田大学理工学部コンピュータ・ネットワーク工学科中退後、日本プロ麻雀協会第7期前期生としてプロ入り。", "第10期雀竜位をはじめタイトルを複数獲得。麻雀界きってのゲス雀士として独自の個性を発揮しつつ、「海賊の書（共著）」なども出版。U-NEXT Piratesのメンバーとして2022-23シーズンより参加 (2022年7月ドラフトで鈴木優と同時契約)。", "趣味はフットサル。身長176cmの体格から繰り出す大胆な攻めと独特のキャラクターで存在感を放つ、Pirates欠かせない個性派。"], annualPoints: [{ season: "2022-23", points: -109.7, note: "semifinal" }, { season: "2023-24", points: 266.5, note: "final" }, { season: "2024-25", points: 256.6, note: "final" }, { season: "2025-26", points: -219.9 }], currentSeason: { season: "2025-26", topRate: 12, avoid4th: 71, bestScore: 79100 }, videos: [
    { id: "3lwJe8JdbOQ", title: "【Mリーグ】仲林圭、国士無双テンパイがまさかの結末！＜公式＞", channel: "M.LEAGUE [プロ麻雀リーグ]", type: "highlight", isOfficial: true },
    { id: "tsZY0DSHG5U", title: "【役満】王を討て！　仲林圭の国士無双【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
    { id: "UVToG5rGUag", title: "【役満】龍降臨!?　仲林圭の四暗刻【麻雀】", channel: "麻雀スリアロチャンネル", type: "highlight" },
  ] },

  // ── EARTH JETS ──────────────────────────────────────────────
  { id: "ishii", name: "石井一馬", nameEn: "Kazuma Ishii", org: "最高位戦", title: "最高位", tags: ["A"], league: "A1", period: "", joinYear: 2006, birthday: "1986/02/21", gender: "male", href: "/players/ishii", mleagueTeam: "EARTH JETS", birthplace: "東京都", bloodType: "A型", hobby: "ゲーム", nickname: "トリプルクラウン", titles: [{"year":"2025","name":"第49期最高位"},{"year":"2016","name":"第41期王位"},{"year":"2016","name":"第41期王位戦"},{"year":"2013","name":"第21期麻雀マスターズ"}], bio: ["「データ派の刺客」石井一馬。東京都出身、1986年生まれ。2006年、19歳で最高位戦日本プロ麻雀協会に入会。中学生から麻雀データ分析に取り組んできた理論派。", "2024年に第49期最高位を獲得。速く鋭い攻撃を武器に20代から数々のビッグタイトルで上位進出を続け、Mリーグには2025-26シーズンよりEARTH JETSメンバーとして参加。", "趣味はゲーム。データと感覚を融合させた独自の雀風でMリーグでも存在感を発揮している。"], annualPoints: [{ season: "2025-26", points: 160.7 }], currentSeason: { season: "2025-26", topRate: 33, avoid4th: 76, bestScore: 55300 }, videos: [
    { id: "0wmvwogt_rs", title: "【役満】石井一馬の四暗刻【U-30 STAR HUNT ep.2】 #石井一馬 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "EyQn1DkLHRU", title: "【役満】石井一馬の四暗刻【第18期飯田正人杯最高位戦Classic決勝2日目】 #石井一馬 #四暗刻", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
    { id: "d0VrXnMoahA", title: "【名場面】ゼリーイッパツ!! 石井一馬の親倍満炸裂!!【第51期最高位戦A1リーグ第4節】 #石井一馬", channel: "最高位戦日本プロ麻雀協会", type: "highlight", isOfficial: true },
  ] },
  { id: "miura", name: "三浦智博", nameEn: "Tomohiro Miura", org: "JPML", title: "十段位×2", tags: ["A1"], league: "A1", period: "第28期", joinYear: 2012, birthday: "1987/04/26", gender: "male", href: "/players/miura", mleagueTeam: "EARTH JETS", birthplace: "愛知県小牧市", hobby: "麻雀研究", nickname: "変幻自在の感覚派", titles: [{"year":"2025","name":"麻雀日本シリーズ2025"},{"year":"2024","name":"第41期十段位"},{"year":"2023","name":"第40期十段位"},{"year":"2023","name":"第48期王位"},{"year":"2020","name":"麻雀最強戦2020次世代プロ集結麻雀代理戦争優勝"}], bio: ["「実戦5万半荘の感覚派」三浦智博。愛知県小牧市出身、1987年生まれ。名古屋工業大学中退後、2012年に日本プロ麻雀連盟第28期生としてプロ入り。", "プロ入り11年目となる2023年、第40期十段位で初タイトルを獲得。翌2023年に第48期王位、2024年には十段位を連覇（第41期）と、30代後半でついに覚醒。Mリーグには2025-26シーズンよりEARTH JETSメンバーとして参加。", "連盟公式ルールで鍛えられた打点力に自信を持つ攻撃型。5万半荘以上の実戦経験から磨かれた感覚打ちで対戦相手を圧倒する。"], annualPoints: [{ season: "2025-26", points: -381.9 }], currentSeason: { season: "2025-26", topRate: 11, avoid4th: 62, bestScore: 70900 }, videos: [
    { id: "4z6ejL2XnQw", title: "【中田花奈×三浦智博】壮絶な“ホンイツ対決”の結末...1索ポンから一転、「親倍満」の衝撃", channel: "激闘Mリーグ", type: "match" },
    { id: "U3R-aojiWEI", title: "三浦智博､三色一発ツモ!!【麻雀最強戦2020】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "R1vj8rtPIJI", title: "三浦智博､闇テン満貫!!【麻雀最強戦2020】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
  ] },
  { id: "aikawa", name: "逢川恵夢", nameEn: "Megumu Aikawa", org: "NPM", title: "四神降臨女流王座", tags: ["女流", "A1"], league: "B2", period: "第1期", joinYear: 2002, birthday: "1987/08/28", gender: "female", href: "/players/aikawa", mleagueTeam: "EARTH JETS", birthplace: "大阪府", hobby: "麻雀研究", nickname: "黒髪のイシュタル", titles: [{"year":"2019","name":"四神降臨女流王座2019"},{"year":"2006","name":"第5回チャンピオンロード雀王シリーズ"}], bio: ["「永世女流雀王」逢川恵夢。大阪府出身、1987年生まれ。2002年、令和元年生まれを自称（本人談）。2011年に日本プロ麻雀協会に入会、第10期新人王戦を優勝してプロデビュー。", "女流雀王のタイトルを通算10期以上獲得し、永世女流雀王の称号を持つ唯一の雀士。2023年には第18期女流雀王で最後のタイトルを獲得し永世称号を確定させた。Mリーグには2025-26シーズンよりEARTH JETSメンバーとして参加。", "軽快な鳴き麻雀と柔軟な手組みが持ち味。長野市出身で「令和元年生まれ」というキャラクター設定も愛されている。"], annualPoints: [{ season: "2025-26", points: -114.3 }], currentSeason: { season: "2025-26", topRate: 11, avoid4th: 80, bestScore: 60000 }, videos: [
    { id: "Q4q1BBWNyco", title: "【役満】\"元祖ビースト\"逢川恵夢の四暗刻!!(六暗刻)【麻雀】", channel: "日本プロ麻雀連盟", type: "highlight", isOfficial: true },
    { id: "U1KHZNxihEM", title: "逢川恵夢の凄い跳満!!【麻雀最強戦2019】", channel: "麻雀最強戦チャンネルpresented竹書房", type: "match" },
    { id: "Srs0i10B-gA", title: "【逢川恵夢】オーラス女達の三つ巴対決！逢川の倍満でフィニッシュ！", channel: "激闘Mリーグ", type: "match" },
  ] },
  { id: "hiro-shibata", name: "HIRO柴田", nameEn: "Hiro Shibata", org: "JPML", title: "鳳凰位", tags: ["A1"], league: "A1", period: "第16期", joinYear: 2000, birthday: "1976/02/16", gender: "male", href: "/players/hiro-shibata", mleagueTeam: "EARTH JETS", birthplace: "神奈川県川崎市", bloodType: "A型", hobby: "お笑い・ゲーム・漫画", nickname: "紅顔のアサシン", titles: [{"year":"2023","name":"第39期鳳凰位"}], bio: ["「連盟の九段」HIRO柴田。神奈川県川崎市出身、1976年生まれ。大学中退後に雀荘勤務を経て2000年に日本プロ麻雀連盟に入会、2001年に第17期生としてプロデビュー。旧名は柴田弘幸。", "連盟最高段位の九段に到達した実力者で、2022年には団体最高峰タイトルの第39期鳳凰位を獲得。Mリーグには2025-26シーズンよりEARTH JETSの新規メンバーとして参加した。", "趣味はお笑い・ゲーム・漫画と幅広く、YouTubeでも積極的に発信。麻雀教室も主宰し、普及にも力を入れている。"], annualPoints: [{ season: "2025-26", points: -405.0 }], currentSeason: { season: "2025-26", topRate: 10, avoid4th: 64, bestScore: 80200 }, videos: [
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
