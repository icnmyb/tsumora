import Link from "next/link";
import type { Metadata } from "next";
import { TrackedExternalLink } from "@/components/TrackedExternalLink";
import {
  MLEAGUE_FINAL_EVENTS,
  MLEAGUE_REGULAR_EVENTS,
  URL_ABEMA_MAHJONG,
  type ScheduledEvent,
} from "./data";

export const metadata: Metadata = {
  title: "放送対局スケジュール — TSUMORA",
  description:
    "Mリーグ・各団体タイトル戦の放送対局スケジュール。確定情報のみ表示、毎日の更新で常に最新の今週分を反映。",
  openGraph: {
    title: "放送対局スケジュール — TSUMORA",
    description: "Mリーグ・タイトル戦の放送対局スケジュール。",
    siteName: "TSUMORA",
    type: "website",
  },
};

// ============================================================
// 確定対局イベントデータ
// 出典: m-league.jp/games / kinmaweb.jp / m-league.jp/news202604131200/ / m-league.jp/news202605011200/
// JPML / NPM / 最高位戦 / RMU / μ の個別対局日時は公式公開が限定的なため
// 段階的に追加していく（ scrape pipeline は別プロジェクトで進行中）
// ============================================================

// 放送先（チャンネル）URL — クリック時に直接放送ページへ遷移
const URL_NPM_YOUTUBE = "https://www.youtube.com/channel/UCEPKIiiunLb64uYqDnN4pmA";
const URL_JPML_YOUTUBE = "https://www.youtube.com/channel/UCqHDeUer8bgaqswSuFP7FxQ";
const URL_SAIKOUISEN_YOUTUBE = "https://www.youtube.com/channel/UCaq8_fXw680ljFOPgzGJuOw";

const JPML_YOUTUBE_EVENTS: ScheduledEvent[] = [
  { date: "2026-05-05", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "93・94回戦：三浦智博ｖｓ長村大ｖｓ齋藤豪ｖｓ和田直樹", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-05", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第２節Ａ卓~", sub: "井出康平ｖｓダンプ大橋ｖｓ伊藤鉄也ｖｓ永井卓也", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-06", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "95・96回戦：本田朋広ｖｓ一井慎也ｖｓ矢崎航之介ｖｓLinxuan He", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-06", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第２節Ｄ卓~", sub: "HIRO柴田ｖｓ古川孝次ｖｓ内川幸太郎ｖｓ杉浦勘介", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-09", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期鳳凰戦~Ｂ１リーグSelect前期第２節~", sub: "刀川昌浩ｖｓ藤井崇勝ｖｓ吉野敦志ｖｓ瀬戸熊直樹", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-10", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第１節", sub: "古川孝次ｖｓ森山茂和ｖｓ荒正義ｖｓ内川幸太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-11", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "97・98回戦：鈴木大介ｖｓ猿川真寿ｖｓ白銀紗希ｖｓ岡崎涼太", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-11", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第２節Ｂ卓~", sub: "山脇千文美ｖｓ黒沢咲ｖｓ二階堂亜樹ｖｓ桜川姫子", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-12", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "女流勉強会【無料放送】", sub: "ＭＣ：大和", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-12", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第２節Ｂ卓~", sub: "鮎川卓ｖｓ近藤久春ｖｓ沢崎誠ｖｓ上田直樹", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-13", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "99・100回戦：東城りおｖｓ和泉由希子ｖｓ宮内こずえｖｓ川上レイ", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-13", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第３節Ａ卓~", sub: "藤崎智ｖｓ山田浩之ｖｓHIRO柴田ｖｓ鈴木大介", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-17", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第３節Ｂ卓~", sub: "佐々木寿人ｖｓ古川孝次ｖｓ和久津晶ｖｓ古橋崇志", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-18", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "101・102回戦：本田朋広ｖｓ二階堂亜樹ｖｓ菅原千瑛ｖｓ渡辺史哉", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-18", startTime: "17:00", endTime: "24:00", timeLabel: "17:00開始", org: "JPML", title: "第４期紅龍戦~Ａ卓~", sub: "Ａ卓予選：三浦智博ｖｓ勝又健志ｖｓHIRO柴田ｖｓ堀慎吾／Ａ卓決勝：中田花奈ｖｓ鈴木大介ｖｓ阿久津翔太ｖｓ予選1位", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-19", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "103・104回戦：佐々木寿人ｖｓ中田花奈ｖｓ川原舞子ｖｓ村上玲央", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-19", startTime: "18:00", endTime: "25:00", timeLabel: "18:00開始", org: "JPML", title: "第４期紅龍戦~Ｂ卓~", sub: "滝沢和典ｖｓ東城りおｖｓ瀬戸熊直樹ｖｓ岡田紗佳", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-20", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "105・106回戦：岡田紗佳ｖｓ阿久津翔太ｖｓ福島佑一ｖｓ仲田加南", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-20", startTime: "18:00", endTime: "25:00", timeLabel: "18:00開始", org: "JPML", title: "第４期紅龍戦~Ｃ卓~", sub: "二階堂亜樹ｖｓ白鳥翔ｖｓ伊達朱里紗ｖｓ本田朋広", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-21", startTime: "18:00", endTime: "25:00", timeLabel: "18:00開始", org: "JPML", title: "第４期紅龍戦~Ｄ卓~", sub: "内川幸太郎ｖｓ高宮まりｖｓ黒沢咲ｖｓ佐々木寿人", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-22", startTime: "18:00", endTime: "25:00", timeLabel: "18:00開始", org: "JPML", title: "第４期紅龍戦~決勝~", sub: "阿久津翔太ｖｓ滝沢和典ｖｓ伊達朱里紗ｖｓ佐々木寿人", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-24", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第３節Ｃ卓~", sub: "阿久津翔太ｖｓ勝又健志ｖｓ内川幸太郎ｖｓ藤島健二郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-25", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "107・108回戦：二階堂亜樹ｖｓ黒沢咲ｖｓ沢崎誠ｖｓ浜野太陽", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-25", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第２節Ｃ卓~", sub: "古谷知美ｖｓ魚谷侑未ｖｓ高宮まりｖｓ伊達朱里紗ｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-26", startTime: "12:00", endTime: "15:00", timeLabel: "12:00開始", org: "JPML", title: "Focus M season12", sub: "109・110回戦：中田花奈ｖｓ藤島健二郎ｖｓ古橋崇志ｖｓ朝比奈ゆり", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-26", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第２節Ｃ卓~", sub: "柴田吉和ｖｓ石川正明ｖｓ渡邉浩史郎ｖｓ仲田加南", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-05-27", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第３節Ｄ卓~", sub: "HIRO柴田ｖｓ前田直哉ｖｓ三浦智博ｖｓ紺野真太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-01", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第２節Ｄ卓~", sub: "吾妻さおりｖｓ中川由佳梨ｖｓ宮成さくｖｓ天音まこと", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-02", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第２節Ｄ卓~", sub: "西川淳ｖｓ吉田直ｖｓ二階堂亜樹ｖｓ福島佑一", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-03", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第４節Ａ卓~", sub: "内川幸太郎ｖｓ山田浩之ｖｓ前田直哉ｖｓ和久津晶", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-04", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "第７期JPML WRC-Rリーグ~ベスト16ＡＢ卓~", sub: "Ａ卓：手塚紗掬ｖｓ岡田啓佑ｖｓ山脇千文美ｖｓ浜野太陽", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-06", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期鳳凰戦~Ｂ１リーグSelect前期第３節~", sub: "一井慎也ｖｓ猿川真寿ｖｓ吉野敦志ｖｓ中村慎吾", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-07", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第２節", sub: "灘麻太郎ｖｓ伊藤優孝ｖｓ沢崎誠ｖｓ白鳥翔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-08", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第３節Ａ卓~", sub: "高宮まりｖｓ鴨舞ｖｓ桜川姫子ｖｓ天音まこと", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-09", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第３節Ａ卓~", sub: "井出康平ｖｓ沢崎誠ｖｓ福島佑一ｖｓ仲田加南", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-10", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第４節Ｂ卓~", sub: "勝又健志ｖｓ杉浦勘介ｖｓ古橋崇志ｖｓ三浦智博", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-12", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "第７期JPML WRC-Rリーグ~ベスト16ＣＤ卓~", sub: "Ｃ卓：猿渡輝也ｖｓ伊東宏倫ｖｓ赤星俊樹ｖｓ秋谷恒輔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-15", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第３節Ｂ卓~", sub: "魚谷侑未ｖｓ二階堂亜樹ｖｓ西嶋ゆかりｖｓ宮成さく", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-16", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "女流勉強会【無料放送】", sub: "ＭＣ：大和", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-16", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第３節Ｂ卓~", sub: "鮎川卓ｖｓ吉田直ｖｓ石川正明ｖｓ伊藤鉄也", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-17", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第４節Ｃ卓~", sub: "阿久津翔太ｖｓ古川孝次ｖｓ藤崎智ｖｓ紺野真太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-18", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "第７期JPML WRC-Rリーグ~ベスト８ＡＢ卓~", sub: "Ａ卓：浜野太陽ｖｓ藤本哲也ｖｓ秋谷恒輔ｖｓ白鳥翔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-19", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト16Ａ卓~", sub: "福島佑一ｖｓ鈴木宏明ｖｓ岡本和也ｖｓ魚谷侑未", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-21", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第３節", sub: "灘麻太郎ｖｓ古川孝次ｖｓ伊藤優孝ｖｓ森山茂和", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-22", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第３節Ｃ卓~", sub: "吾妻さおりｖｓ山脇千文美ｖｓ白銀紗希ｖｓ伊達朱里紗ｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-23", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第３節Ｃ卓~", sub: "西川淳ｖｓダンプ大橋ｖｓ渡邉浩史郎ｖｓ上田直樹", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-24", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A１リーグ第４節Ｄ卓~", sub: "HIRO柴田ｖｓ佐々木寿人ｖｓ藤島健二郎ｖｓ鈴木大介", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-26", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト16Ｂ卓~", sub: "前田直哉ｖｓ沢崎誠ｖｓ矢崎航之介ｖｓ重原聡", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-28", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "第５期小島武夫杯帝王戦~ベスト16・決勝~【無料放送】", sub: "Ａ卓：礒川雄介ｖｓ西川淳ｖｓ和久津晶ｖｓ藤島健二郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-29", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第３節Ｄ卓~", sub: "古谷知美ｖｓ黒沢咲ｖｓ仲田加南ｖｓ中川由佳梨", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-06-30", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第43期鳳凰戦~A２リーグ第３節Ｄ卓~", sub: "柴田吉和ｖｓ近藤久春ｖｓ二階堂亜樹ｖｓ永井卓也", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-03", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト16Ｃ卓~", sub: "三浦智博ｖｓ藤崎智ｖｓ古橋崇志ｖｓ藤井崇勝", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-04", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期鳳凰戦~Ｂ１リーグSelect前期第４節~", sub: "猿川真寿ｖｓ瀬戸熊直樹ｖｓ滝沢和典ｖｓ菊原真人", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-05", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第４節", sub: "荒正義ｖｓ沢崎誠ｖｓ内川幸太郎ｖｓ白鳥翔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-06", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第４節Ａ卓~", sub: "高宮まりｖｓ二階堂亜樹ｖｓ白銀紗希ｖｓ中川由佳梨ｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-10", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト16Ｄ卓~", sub: "仁平宣明ｖｓ石立岳大ｖｓ蒼山秀佑ｖｓ佐々木寿人", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-13", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第４節Ｂ卓~", sub: "黒沢咲ｖｓ伊達朱里紗ｖｓ鴨舞ｖｓ宮成さく", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-14", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "女流勉強会【無料放送】", sub: "ＭＣ：羽田龍生", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-16", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト８Ａ卓~", sub: "岡本和也ｖｓ重原聡ｖｓ藤井崇勝ｖｓ佐々木寿人", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-20", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第４節Ｃ卓~", sub: "吾妻さおりｖｓ魚谷侑未ｖｓ仲田加南ｖｓ桜川姫子", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-23", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第43期十段戦~ベスト８Ｂ卓~", sub: "鈴木宏明ｖｓ沢崎誠ｖｓ古橋崇志ｖｓ蒼山秀佑", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-24", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "第19期JPML WRCリーグ~ベスト16~", sub: "Ａ卓：橘来奈ｖｓ福光聖雄ｖｓ天音まことｖｓ紺野真太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-25", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "インターネット麻雀日本選手権2026~決勝戦~【無料放送】", sub: "西乃うるりｖｓたきりょうｖｓ三戸亮祐ｖｓゆるもたん。", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-25", startTime: "17:00", endTime: "24:00", timeLabel: "17:00開始", org: "JPML", title: "第７期JPML WRC-Rリーグ~決勝戦~", sub: "白鳥翔ｖｓ秋谷恒輔ｖｓ赤星俊樹ｖｓ小川尚哉", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-27", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第４節Ｄ卓~", sub: "古谷知美ｖｓ山脇千文美ｖｓ西嶋ゆかりｖｓ天音まこと", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-07-31", startTime: "11:00", endTime: "18:00", timeLabel: "11:00開始", org: "JPML", title: "第19期JPML WRCリーグ~ベスト８Ａ卓~", sub: "紺野真太郎ｖｓ叶璃々ｖｓ渡辺史哉ｖｓ石森隆雄", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-01", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期鳳凰戦~Ｂ１リーグSelect前期第５節~", sub: "吉野敦志ｖｓ滝沢和典ｖｓ中村毅ｖｓ松崎良文", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-03", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第５節Ａ卓~", sub: "古谷知美ｖｓ白銀紗希ｖｓ宮成さくｖｓ桜川姫子", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-06", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第19期JPML WRCリーグ~決勝戦~", sub: "紺野真太郎ｖｓ渡辺史哉ｖｓ菅原千瑛ｖｓ浜野太陽", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-08", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第５節", sub: "灘麻太郎ｖｓ伊藤優孝ｖｓ荒正義ｖｓ白鳥翔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-10", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第５節Ｂ卓~", sub: "仲田加南ｖｓ二階堂亜樹ｖｓ伊達朱里紗ｖｓ天音まこと", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-14", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "女流勉強会【無料放送】", sub: "ＭＣ：羽田龍生", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-17", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第５節Ｃ卓~", sub: "山脇千文美ｖｓ魚谷侑未ｖｓ中川由佳梨ｖｓ鴨舞", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-24", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第５節Ｄ卓~", sub: "吾妻さおりｖｓ黒沢咲ｖｓ高宮まりｖｓ西嶋ゆかりｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-08-31", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第６節Ａ卓~", sub: "魚谷侑未ｖｓ二階堂亜樹ｖｓ鴨舞ｖｓ天音まこと", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-06", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第６節", sub: "古川孝次ｖｓ森山茂和ｖｓ沢崎誠ｖｓ内川幸太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-07", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第６節Ｂ卓~", sub: "山脇千文美ｖｓ仲田加南ｖｓ中川由佳梨ｖｓ桜川姫子ｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-12", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期十段位決定戦~初日~", sub: "浜野太陽ｖｓ佐々木寿人ｖｓ古橋崇志ｖｓ岡本和也ｖｓ蒼山秀佑", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-19", startTime: "13:00", endTime: "20:00", timeLabel: "13:00開始", org: "JPML", title: "第43期十段位決定戦~二日目~", sub: "浜野太陽ｖｓ佐々木寿人ｖｓ古橋崇志ｖｓ岡本和也ｖｓ蒼山秀佑", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-21", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第６節Ｃ卓~", sub: "吾妻さおりｖｓ高宮まりｖｓ伊達朱里紗ｖｓ宮成さく", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-26", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第43期十段位決定戦~最終日~", sub: "浜野太陽ｖｓ佐々木寿人ｖｓ古橋崇志ｖｓ岡本和也ｖｓ蒼山秀佑", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-09-28", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第６節Ｄ卓~", sub: "古谷知美ｖｓ黒沢咲ｖｓ白銀紗希ｖｓ西嶋ゆかり", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-10-04", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第７節", sub: "灘麻太郎ｖｓ伊藤優孝ｖｓ荒正義ｖｓ内川幸太郎", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-10-05", startTime: "15:00", endTime: "22:00", timeLabel: "15:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第７節Ａ卓~", sub: "西嶋ゆかりｖｓ宮成さくｖｓ桜川姫子ｖｓ天音まことｖｓ早川林香", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-10-12", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第７節Ｂ卓~", sub: "白銀紗希ｖｓ伊達朱里紗ｖｓ中川由佳梨ｖｓ鴨舞", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-10-19", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第７節Ｃ卓~", sub: "黒沢咲ｖｓ高宮まりｖｓ仲田加南ｖｓ二階堂亜樹", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-10-26", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~Ａリーグ第７節Ｄ卓~", sub: "古谷知美ｖｓ吾妻さおりｖｓ山脇千文美ｖｓ魚谷侑未", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-11-02", startTime: "12:00", endTime: "19:00", timeLabel: "12:00開始", org: "JPML", title: "第21期女流桜花~入れ替え戦 1st & 2nd stage~", sub: "1st stage：Ｂリーグ６位ｖｓＣ１リーグ３位ｖｓＣ２リーグ２位ｖｓＣ３リーグ優勝", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-11-08", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~第８節", sub: "古川孝次ｖｓ森山茂和ｖｓ沢崎誠ｖｓ白鳥翔", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-11-09", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~入れ替え戦 3rd stage~", sub: "Ａリーグ13位ｖｓＢリーグ４位ｖｓＣ１リーグ優勝ｖｓ2nd stage勝者", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-11-16", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~ＡリーグプレーオフＡ卓~", sub: "２位ｖｓ４位ｖｓ６位ｖｓ８位", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-11-23", startTime: "16:00", endTime: "23:00", timeLabel: "16:00開始", org: "JPML", title: "第21期女流桜花~ＡリーグプレーオフＢ卓~", sub: "１位ｖｓ３位ｖｓ５位ｖｓ７位", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-12-06", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~プレーオフ", sub: "出場者未定（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-12-09", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第21期女流桜花決定戦~初日~", sub: "清水香織＋進出3名（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-12-16", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第21期女流桜花決定戦~二日目~", sub: "清水香織＋進出3名（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-12-19", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~決勝戦初日", sub: "出場者未定（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2026-12-23", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第21期女流桜花決定戦~最終日~", sub: "清水香織＋進出3名（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
  { date: "2027-01-10", startTime: "14:00", endTime: "21:00", timeLabel: "14:00開始", org: "JPML", title: "第４期達人戦~GREAT LEAGUE~決勝戦最終日", sub: "出場者未定（公式発表待ち）", channel: "YouTube", tagColor: "#c8282a", tagTextColor: "#ebe4d2", link: URL_JPML_YOUTUBE },
];

type JpmlALeagueRow = readonly [date: string, stage: string, sub: string];

const createJpmlALeagueEvents = (
  league: "A１" | "A２",
  rows: readonly JpmlALeagueRow[],
): ScheduledEvent[] => rows.map(([date, stage, sub]) => ({
  date,
  startTime: "16:00",
  endTime: "23:00",
  timeLabel: "16:00開始",
  org: "JPML",
  title: "第43期鳳凰戦~" + league + "リーグ" + stage + "~",
  sub,
  channel: "YouTube",
  tagColor: "#c8282a",
  tagTextColor: "#ebe4d2",
  link: URL_JPML_YOUTUBE,
}));

const JPML_HOUOU_A1_ADDITIONS = createJpmlALeagueEvents("A１", [
  ["2026-07-01", "第５節Ａ卓", "古川孝次ｖｓ山田浩之ｖｓ藤島健二郎ｖｓ三浦智博"],
  ["2026-07-08", "第５節Ｂ卓", "内川幸太郎ｖｓ古橋崇志ｖｓ紺野真太郎ｖｓ鈴木大介"],
  ["2026-07-11", "第５節Ｃ卓", "HIRO柴田ｖｓ勝又健志ｖｓ藤崎智ｖｓ和久津晶"],
  ["2026-07-12", "第５節Ｄ卓", "阿久津翔太ｖｓ佐々木寿人ｖｓ前田直哉ｖｓ杉浦勘介"],
  ["2026-07-15", "第６節Ａ卓", "古川孝次ｖｓ勝又健志ｖｓ和久津晶ｖｓ三浦智博"],
  ["2026-07-19", "第６節Ｂ卓", "佐々木寿人ｖｓ内川幸太郎ｖｓ古橋崇志ｖｓ藤島健二郎"],
  ["2026-07-22", "第６節Ｃ卓", "阿久津翔太ｖｓ藤崎智ｖｓ前田直哉ｖｓ鈴木大介"],
  ["2026-07-26", "第６節Ｄ卓", "HIRO柴田ｖｓ山田浩之ｖｓ杉浦勘介ｖｓ紺野真太郎"],
  ["2026-07-29", "第７節Ａ卓", "古川孝次ｖｓ山田浩之ｖｓ古橋崇志ｖｓ鈴木大介"],
  ["2026-08-02", "第７節Ｂ卓", "佐々木寿人ｖｓ藤崎智ｖｓ和久津晶ｖｓ紺野真太郎"],
  ["2026-08-05", "第７節Ｃ卓", "阿久津翔太ｖｓ内川幸太郎ｖｓ杉浦勘介ｖｓ三浦智博"],
  ["2026-08-12", "第７節Ｄ卓", "HIRO柴田ｖｓ勝又健志ｖｓ前田直哉ｖｓ藤島健二郎"],
  ["2026-08-19", "第８節Ａ卓", "古川孝次ｖｓ内川幸太郎ｖｓ前田直哉ｖｓ紺野真太郎"],
  ["2026-08-26", "第８節Ｂ卓", "佐々木寿人ｖｓ勝又健志ｖｓ杉浦勘介ｖｓ鈴木大介"],
  ["2026-09-02", "第８節Ｃ卓", "阿久津翔太ｖｓ山田浩之ｖｓ和久津晶ｖｓ藤島健二郎"],
  ["2026-09-09", "第８節Ｄ卓", "HIRO柴田ｖｓ藤崎智ｖｓ古橋崇志ｖｓ三浦智博"],
  ["2026-09-16", "第９節Ａ卓", "HIRO柴田ｖｓ内川幸太郎ｖｓ和久津晶ｖｓ鈴木大介"],
  ["2026-09-23", "第９節Ｂ卓", "佐々木寿人ｖｓ山田浩之ｖｓ前田直哉ｖｓ三浦智博"],
  ["2026-09-30", "第９節Ｃ卓", "阿久津翔太ｖｓ勝又健志ｖｓ古橋崇志ｖｓ紺野真太郎"],
  ["2026-10-07", "第９節Ｄ卓", "古川孝次ｖｓ藤崎智ｖｓ杉浦勘介ｖｓ藤島健二郎"],
  ["2026-10-14", "第10節Ａ卓", "藤島健二郎ｖｓ三浦智博ｖｓ紺野真太郎ｖｓ鈴木大介"],
  ["2026-10-21", "第10節Ｂ卓", "前田直哉ｖｓ杉浦勘介ｖｓ和久津晶ｖｓ古橋崇志"],
  ["2026-10-28", "第10節Ｃ卓", "勝又健志ｖｓ内川幸太郎ｖｓ藤崎智ｖｓ山田浩之"],
  ["2026-11-04", "第10節Ｄ卓", "HIRO柴田ｖｓ阿久津翔太ｖｓ佐々木寿人ｖｓ古川孝次"],
  ["2026-11-11", "最終節Ａ卓", "第10節終了時の10位ｖｓ12位ｖｓ14位ｖｓ16位"],
  ["2026-11-18", "最終節Ｂ卓", "第10節終了時の9位ｖｓ11位ｖｓ13位ｖｓ15位"],
  ["2026-11-25", "最終節Ｃ卓", "第10節終了時の2位ｖｓ4位ｖｓ6位ｖｓ8位"],
  ["2026-12-02", "最終節Ｄ卓", "第10節終了時の1位ｖｓ3位ｖｓ5位ｖｓ7位"],
]);

const JPML_HOUOU_A2_ADDITIONS = createJpmlALeagueEvents("A２", [
  ["2026-07-07", "第４節Ａ卓", "二階堂亜樹ｖｓ沢崎誠ｖｓダンプ大橋ｖｓ石川正明"],
  ["2026-07-14", "第４節Ｂ卓", "近藤久春ｖｓ福島佑一ｖｓ伊藤鉄也ｖｓ渡邉浩史郎"],
  ["2026-07-21", "第４節Ｃ卓", "柴田吉和ｖｓ吉田直ｖｓ井出康平ｖｓ上田直樹"],
  ["2026-07-28", "第４節Ｄ卓", "西川淳ｖｓ鮎川卓ｖｓ永井卓也ｖｓ仲田加南"],
  ["2026-08-04", "第５節Ａ卓", "二階堂亜樹ｖｓ伊藤鉄也ｖｓ上田直樹ｖｓ仲田加南"],
  ["2026-08-11", "第５節Ｂ卓", "吉田直ｖｓ沢崎誠ｖｓ永井卓也ｖｓ渡邉浩史郎"],
  ["2026-08-18", "第５節Ｃ卓", "柴田吉和ｖｓ鮎川卓ｖｓダンプ大橋ｖｓ福島佑一"],
  ["2026-08-25", "第５節Ｄ卓", "西川淳ｖｓ近藤久春ｖｓ井出康平ｖｓ石川正明"],
  ["2026-09-01", "第６節Ａ卓", "吉田直ｖｓ近藤久春ｖｓ石川正明ｖｓ渡邉浩史郎"],
  ["2026-09-08", "第６節Ｂ卓", "鮎川卓ｖｓ二階堂亜樹ｖｓ伊藤鉄也ｖｓ永井卓也"],
  ["2026-09-15", "第６節Ｃ卓", "柴田吉和ｖｓ井出康平ｖｓダンプ大橋ｖｓ仲田加南"],
  ["2026-09-22", "第６節Ｄ卓", "西川淳ｖｓ沢崎誠ｖｓ福島佑一ｖｓ上田直樹"],
  ["2026-09-29", "第７節Ａ卓", "吉田直ｖｓ沢崎誠ｖｓ伊藤鉄也ｖｓ仲田加南"],
  ["2026-10-06", "第７節Ｂ卓", "鮎川卓ｖｓ井出康平ｖｓ石川正明ｖｓ上田直樹"],
  ["2026-10-13", "第７節Ｃ卓", "柴田吉和ｖｓ二階堂亜樹ｖｓ福島佑一ｖｓ渡邉浩史郎"],
  ["2026-10-20", "第７節Ｄ卓", "西川淳ｖｓ近藤久春ｖｓダンプ大橋ｖｓ永井卓也"],
  ["2026-10-23", "第８節Ａ卓", "吉田直ｖｓ井出康平ｖｓ福島佑一ｖｓ永井卓也"],
  ["2026-10-27", "第８節Ｂ卓", "鮎川卓ｖｓ沢崎誠ｖｓダンプ大橋ｖｓ渡邉浩史郎"],
  ["2026-10-30", "第８節Ｃ卓", "柴田吉和ｖｓ近藤久春ｖｓ伊藤鉄也ｖｓ上田直樹"],
  ["2026-11-03", "第８節Ｄ卓", "西川淳ｖｓ二階堂亜樹ｖｓ石川正明ｖｓ仲田加南"],
  ["2026-11-06", "第９節Ａ卓", "吉田直ｖｓ二階堂亜樹ｖｓダンプ大橋ｖｓ上田直樹"],
  ["2026-11-10", "第９節Ｂ卓", "鮎川卓ｖｓ近藤久春ｖｓ福島佑一ｖｓ仲田加南"],
  ["2026-11-17", "第９節Ｃ卓", "柴田吉和ｖｓ沢崎誠ｖｓ石川正明ｖｓ永井卓也"],
  ["2026-11-24", "第９節Ｄ卓", "西川淳ｖｓ井出康平ｖｓ伊藤鉄也ｖｓ渡邉浩史郎"],
  ["2026-11-30", "第10節Ａ卓", "永井卓也ｖｓ渡邉浩史郎ｖｓ上田直樹ｖｓ仲田加南"],
  ["2026-12-01", "第10節Ｂ卓", "ダンプ大橋ｖｓ福島佑一ｖｓ石川正明ｖｓ伊藤鉄也"],
  ["2026-12-07", "第10節Ｃ卓", "近藤久春ｖｓ二階堂亜樹ｖｓ井出康平ｖｓ沢崎誠"],
  ["2026-12-08", "第10節Ｄ卓", "西川淳ｖｓ柴田吉和ｖｓ鮎川卓ｖｓ吉田直"],
  ["2026-12-14", "最終節Ａ卓", "第10節終了時の10位ｖｓ12位ｖｓ14位ｖｓ16位"],
  ["2026-12-15", "最終節Ｂ卓", "第10節終了時の9位ｖｓ11位ｖｓ13位ｖｓ15位"],
  ["2026-12-21", "最終節Ｃ卓", "第10節終了時の2位ｖｓ4位ｖｓ6位ｖｓ8位"],
  ["2026-12-22", "最終節Ｄ卓", "第10節終了時の1位ｖｓ3位ｖｓ5位ｖｓ7位"],
]);

const JPML_MELLOW_FAN_EVENTS: ScheduledEvent[] = [
  { date: "2026-09-16", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "9・10回戦：黒沢咲ｖｓ福島佑一ｖｓ二階堂亜樹ｖｓ山田祐輝", streamId: "wez9n7j5yrl" },
  { date: "2026-09-20", startTime: "14:00", endTime: "21:00", title: "麻雀日本シリーズ2026第６節", sub: "21回戦：佐々木寿人ｖｓ白鳥翔ｖｓ小川光ｖｓ桑田憲汰", streamId: "2p8vv5myd8y" },
  { date: "2026-09-21", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "11・12回戦：阿久津翔太ｖｓ仲田加南ｖｓ石井良樹ｖｓ和田直樹", streamId: "n9ze6vd9x84" },
  { date: "2026-09-27", startTime: "14:00", endTime: "21:00", title: "麻雀日本シリーズ2026第７節", sub: "25回戦：出場者未定（公式発表待ち）", streamId: "nqz5g2omdrv" },
  { date: "2026-09-28", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "13・14回戦：本田朋広ｖｓ藤島健二郎ｖｓ齋藤豪ｖｓ小車祥", streamId: "o7z4yno3wzl" },
  { date: "2026-09-29", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "15・16回戦：三浦智博ｖｓ近藤久春ｖｓ福島佑一ｖｓ田中祐", streamId: "ykz0pdnj08w" },
  { date: "2026-09-30", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "17・18回戦：瀬戸熊直樹ｖｓ滝沢和典ｖｓ吉野敦志ｖｓ村上玲央", streamId: "ovrdvpl37rj" },
  { date: "2026-10-03", startTime: "13:00", endTime: "20:00", title: "第43期鳳凰戦~Ｂ１リーグSelect前期第２節~", sub: "安秉参ｖｓ瀬戸熊直樹ｖｓ石立岳大ｖｓ菊田政俊", streamId: "n9ze64vm184" },
  { date: "2026-10-05", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "19・20回戦：東城りおｖｓ堀慎吾ｖｓ猿川真寿ｖｓ覚野陽生", streamId: "mlrlek0we8g" },
  { date: "2026-10-06", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "21・22回戦：中田花奈ｖｓ魚谷侑未ｖｓ奈良圭純ｖｓ桑田憲汰", streamId: "2k8m4jwq286" },
  { date: "2026-10-07", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "23・24回戦：佐々木寿人ｖｓ森山茂和ｖｓ一井慎也ｖｓ小川尚哉", streamId: "e2zwvqg4dro" },
  { date: "2026-10-09", startTime: "12:00", endTime: "19:00", title: "女流勉強会【無料放送】", sub: "ＭＣ：大和／講師：藤島健二郎・三浦智博・阿久津翔太", streamId: "p2zjvwlddzw" },
  { date: "2026-10-10", startTime: "14:00", endTime: "21:00", title: "麻雀日本シリーズ2026第８節", sub: "プレーオフ1回戦：出場者未定（公式発表待ち）", streamId: "ov82ygq57zw" },
  { date: "2026-10-12", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "25・26回戦：鈴木大介ｖｓ長村大ｖｓ石立岳大ｖｓ渡辺英悟", streamId: "1o8qm5gn1zk" },
  { date: "2026-10-13", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "27・28回戦：三浦智博ｖｓ沢崎誠ｖｓ仲田加南ｖｓ瀬戸麻衣", streamId: "e5rk9wymozv" },
  { date: "2026-10-14", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "29・30回戦：黒沢咲ｖｓ宮内こずえｖｓ渡邉浩史郎ｖｓ猿渡輝也", streamId: "olryvned0r2" },
  { date: "2026-10-20", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "31・32回戦：東城りおｖｓ和泉由希子ｖｓ浜野太陽ｖｓ小車祥", streamId: "p2zjvly64zw" },
  { date: "2026-10-21", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "33・34回戦：白鳥翔ｖｓ鈴木大介ｖｓ猿川真寿ｖｓ山田祐輝", streamId: "d1rn0xwkkzv" },
  { date: "2026-10-24", startTime: "13:00", endTime: "20:00", title: "第24期プロクイーン決定戦~二日目~", sub: "御崎千結＋挑戦者4名（公式発表待ち）", streamId: "nqz5g22qvrv" },
  { date: "2026-10-25", startTime: "14:00", endTime: "21:00", title: "麻雀日本シリーズ2026第９節", sub: "プレーオフ4回戦：出場者未定（公式発表待ち）", streamId: "lv81xpmjyz9" },
  { date: "2026-10-26", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "35・36回戦：伊達朱里紗ｖｓ菅原千瑛ｖｓ武田雛歩ｖｓ朝比奈ゆり", streamId: "em8xvyx0jr2" },
  { date: "2026-10-27", startTime: "12:00", endTime: "15:00", title: "Focus M season13", sub: "37・38回戦：阿久津翔太ｖｓ古橋崇志ｖｓ齋藤豪ｖｓ早川健太", streamId: "12rod3qyxzn" },
  { date: "2026-10-31", startTime: "14:00", endTime: "21:00", title: "第24期プロクイーン決定戦~最終日~", sub: "御崎千結＋挑戦者4名（公式発表待ち）", streamId: "ov82yggnxzw" },
  { date: "2026-11-06", startTime: "12:00", endTime: "19:00", title: "女流勉強会【無料放送】", sub: "ＭＣ：大和／講師：藤島健二郎・三浦智博・阿久津翔太", streamId: "d1rn0jxg5zv" },
  { date: "2026-11-07", startTime: "13:00", endTime: "20:00", title: "第43期鳳凰戦~Ｂ１リーグSelect後期第３節~", sub: "高橋良介ｖｓ岡本和也ｖｓ滝沢和典ｖｓ菊田政俊", streamId: "o7z4y5nmqzl" },
  { date: "2026-11-28", startTime: "12:00", endTime: "19:00", title: "第51期王位戦~準決勝~", sub: "出場者未定（公式発表待ち）", streamId: "ykz0pdnmo8w" },
  { date: "2026-11-29", startTime: "13:00", endTime: "20:00", title: "第51期王位戦~決勝戦~", sub: "出場者未定（公式発表待ち）", streamId: "ovrdvpldyrj" },
  { date: "2026-12-03", startTime: "11:00", endTime: "18:00", title: "第８期JPML WRC-Rリーグ~ベスト16ＡＢ卓~", sub: "出場者未定（公式発表待ち）", streamId: "mlrlek0mp8g" },
  { date: "2026-12-04", startTime: "11:00", endTime: "18:00", title: "第８期JPML WRC-Rリーグ~ベスト16ＣＤ卓~", sub: "出場者未定（公式発表待ち）", streamId: "2k8m4jwmy86" },
  { date: "2026-12-05", startTime: "13:00", endTime: "20:00", title: "第43期鳳凰戦~Ｂ１リーグSelect後期第４節~", sub: "滝沢和典ｖｓ石渡正志ｖｓ瀬戸熊直樹ｖｓ菊原真人", streamId: "ykz0p3dxo8w" },
  { date: "2026-12-08", startTime: "12:00", endTime: "19:00", title: "女流勉強会【無料放送】", sub: "ＭＣ：大和／講師：藤島健二郎・三浦智博・阿久津翔太", streamId: "em8xv1ynkr2" },
  { date: "2026-12-18", startTime: "11:00", endTime: "18:00", title: "第８期JPML WRC-Rリーグ~ベスト８ＡＢ卓~", sub: "出場者未定（公式発表待ち）", streamId: "e2zwvqg5qro" },
  { date: "2026-12-20", startTime: "14:00", endTime: "21:00", title: "麻雀日本シリーズ2026決勝戦", sub: "出場者未定（公式発表待ち）", streamId: "kdr7n9v7wzj" },
  { date: "2026-12-24", startTime: "14:00", endTime: "21:00", title: "第８期JPML WRC-Rリーグ~決勝戦~", sub: "出場者未定（公式発表待ち）", streamId: "1o8qm5gegzk" },
  { date: "2027-01-09", startTime: "13:00", endTime: "20:00", title: "第43期鳳凰戦~Ｂ１リーグSelect前期最終節~", sub: "放送卓未定（公式発表待ち）", streamId: "ovrdvepnyrj" },
].map(({ streamId, ...event }) => ({
  ...event,
  timeLabel: event.startTime + "開始",
  org: "JPML",
  channel: "mellow-fan",
  tagColor: "#c8282a",
  tagTextColor: "#ebe4d2",
  link: "https://www.openrec.tv/live/" + streamId,
}));

const NPM_BROADCAST_EVENTS: ScheduledEvent[] = [
  { date: "2026-04-04", title: "雀王戦A1リーグ第1節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-04-18", title: "雀王戦A1リーグ第2節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-01", title: "雀王戦A1リーグ第2節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-02", title: "雀王戦A2/B1リーグ第2節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-05-09", title: "雀王戦A2/B1リーグ第3節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-05-10", title: "雀王戦A1リーグ第2節C卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-05-16", title: "雀王戦A1リーグ第3節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-17", title: "新人王戦決勝", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-05-23", title: "雀王戦A1リーグ第3節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-25", title: "雀王戦A1リーグ第3節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-05-29", title: "雀王戦A1リーグ第4節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-01", title: "女流雀王戦Aリーグ第1節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-06-06", title: "雀王戦A1リーグ第4節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-07", title: "女流雀王戦A～C2リーグ第2節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・柳本店・ノーブル・協会対局室" },
  { date: "2026-06-13", title: "雀王戦A1リーグ第4節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-20", title: "雀王戦A1リーグ第5節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-21", title: "雀王戦A1リーグ第5節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-27", title: "雀王戦A1リーグ第5節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-28", title: "雀王戦A1リーグ第6節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-06-29", title: "雀王戦A2リーグ第4節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-07-04", title: "雀王戦A1リーグ第6節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-07-24", title: "女流雀王戦Aリーグ第4節配信卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-07-25", title: "雀王戦A1リーグ第6節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-08", title: "雀王戦A1リーグ第7節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-09", title: "雀王戦A1リーグ第7節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-10", title: "雀王戦A1リーグ第7節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-15", title: "雀王戦A2/B1リーグ第6節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-08-17", title: "雀王戦A1リーグ第8節A卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-22", title: "雀王戦A2/B1リーグ第7節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-08-24", title: "雀王戦A1リーグ第8節B卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-08-31", title: "雀王戦A1リーグ第8節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-09-19", title: "女流雀王戦Aリーグ第6節B卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-09-27", title: "雀王戦A2/B1リーグ第8節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-09-29", title: "女流雀王戦Aリーグ第6節C卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-10-03", title: "雀王戦A1リーグ第9節C卓", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-10-10", title: "女流雀王戦A~C2リーグ第6節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・柳本店・ノーブル・協会対局室" },
  { date: "2026-10-12", title: "女流雀王戦Aリーグ第7節A卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-10-13", title: "女流雀王戦Aリーグ第7節B卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-10-17", title: "雀王戦A1リーグ最終節（全卓配信）", channel: "ABEMA・他", sub: "公式スケジュール掲載: ABEMA・他" },
  { date: "2026-10-18", title: "女流雀王戦Aリーグ第7節C卓", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-10-25", title: "女流雀王戦A~C2リーグ第7節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・柳本店・ノーブル・協会対局室" },
  { date: "2026-10-31", title: "雀王決定戦1日目", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-11-03", title: "雀王戦A2/B1リーグ第9節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-11-07", title: "女流雀王戦A～C2リーグ第8節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・柳本店・ノーブル・協会対局室" },
  { date: "2026-11-14", title: "雀王決定戦2日目", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-12-05", title: "雀王決定戦3日目", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-12-06", title: "雀王戦A2/B1リーグ第10節", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル・協会対局室" },
  { date: "2026-12-19", title: "雀王決定戦4日目", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2026-12-27", title: "女流雀王決定戦1日目", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2026-12-29", title: "雀王決定戦最終日", channel: "ABEMA", sub: "公式スケジュール掲載: ABEMA" },
  { date: "2027-01-03", title: "女流雀王決定戦2日目", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
  { date: "2027-01-09", title: "女流雀王決定戦最終日", channel: "協会チャンネル", sub: "公式スケジュール掲載: 協会チャンネル" },
].map((event) => ({
  ...event,
  startTime: "12:00",
  endTime: "20:00",
  org: "NPM",
  tagColor: "#1d4ed8",
  tagTextColor: "#ebe4d2",
  link: event.channel.includes("ABEMA") ? URL_ABEMA_MAHJONG : URL_NPM_YOUTUBE,
}));

const SAIKOUISEN_BROADCAST_ADDITIONS: ScheduledEvent[] = [
  { date: "2026-09-16", title: "最高位戦A1リーグ 第11節 卓1", sub: "村上 淳・平賀 聡彦・水巻 渉・馬場 翔平", channel: "ABEMA" },
  { date: "2026-09-23", title: "最高位戦A1リーグ 第11節 卓2", sub: "鈴木 たろう・鈴木 聡一郎・近藤 誠一・立花 裕", channel: "ABEMA" },
  { date: "2026-09-30", title: "最高位戦A1リーグ 第11節 卓3", sub: "石井 一馬・太田 安紀・鈴木 優・中嶋 和正", channel: "ABEMA" },
  { date: "2026-10-07", title: "最高位戦A1リーグ 第11節 卓4", sub: "園田 賢・竹内 元太・坂井 秀隆・日向 藍子", channel: "ABEMA" },
  { date: "2026-10-14", title: "最高位戦A1リーグ 第12節 卓1", sub: "中嶋 和正・日向 藍子・馬場 翔平・立花 裕", channel: "ABEMA" },
  { date: "2026-10-21", title: "最高位戦A1リーグ 第12節 卓2", sub: "近藤 誠一・水巻 渉・坂井 秀隆・鈴木 優", channel: "ABEMA" },
  { date: "2026-10-28", title: "最高位戦A1リーグ 第12節 卓3", sub: "竹内 元太・太田 安紀・鈴木 聡一郎・平賀 聡彦", channel: "ABEMA" },
  { date: "2026-11-04", title: "最高位戦A1リーグ 第12節 卓4", sub: "村上 淳・鈴木 たろう・石井 一馬・園田 賢", channel: "ABEMA" },
  { date: "2026-11-11", title: "最高位戦A1リーグ 決定戦プレーオフ", sub: "全12節終了時の2位〜5位が出場", channel: "ABEMA" },
  { date: "2026-11-18", title: "最高位戦A1リーグ 残留プレーオフ", sub: "全12節終了時の12位〜15位が出場", channel: "ABEMA" },
  { date: "2026-09-18", title: "最高位戦A2リーグ 第9節 卓3", sub: "宇野 公介・平島 洋太・塩澤 彰大・酒井 一興", channel: "最高位戦ch" },
  { date: "2026-09-25", title: "最高位戦A2リーグ 第9節 卓4", sub: "井上 祐希・渡辺 太・太野 奈月・中邨 光康・大平 亜季", channel: "最高位戦ch" },
  { date: "2026-09-26", title: "最高位戦A2リーグ 第9節 卓5", sub: "山田 独歩・木村 誠・設楽 遙斗・醍醐 大", channel: "最高位戦ch" },
  { date: "2026-10-02", title: "最高位戦A2リーグ 第10節 卓1", sub: "宇野 公介・新井 啓文・大平 亜季・醍醐 大", channel: "最高位戦ch" },
  { date: "2026-10-03", title: "最高位戦A2リーグ 第10節 卓2", sub: "朝倉 康心・渡辺 太・塩澤 彰大・木村 誠・平島 晶太", channel: "最高位戦ch" },
  { date: "2026-10-09", title: "最高位戦A2リーグ 第10節 卓3", sub: "河野 直也・井上 祐希・佐藤 崇・酒井 一興", channel: "最高位戦ch" },
  { date: "2026-10-10", title: "最高位戦A2リーグ 第10節 卓4", sub: "小平 崇弘・津田 岳宏・設楽 遙斗・太野 奈月・有賀 利樹", channel: "最高位戦ch" },
  { date: "2026-10-16", title: "最高位戦A2リーグ 第10節 卓5", sub: "山田 独歩・平島 洋太・中邨 光康・今村 順平", channel: "最高位戦ch" },
].map((event) => ({
  ...event,
  startTime: "12:00",
  endTime: "20:00",
  org: "SAIKOUISEN",
  tagColor: "#7c3aed",
  tagTextColor: "#ebe4d2",
  link: event.channel === "ABEMA" ? URL_ABEMA_MAHJONG : URL_SAIKOUISEN_YOUTUBE,
}));

const EVENTS: ScheduledEvent[] = [
  // ── Mリーグ 2026-27 レギュラーシーズン（9/14–3/2 全300試合）──
  // 公式の1卓2試合を単位にし、2卓同時開催日はカレンダー上で1イベントに集約。
  ...MLEAGUE_REGULAR_EVENTS,

  // ── Mリーグ 2025-26 セミファイナル（4/6–4/30 月火木金 全15日 30試合）──
  // 1日2試合制（19:00-21:00 + 21:00-22:30）を1イベントとして表示
  {
    date: "2026-04-27",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 13/15",
    sub: "赤坂ドリブンズ vs セガサミーフェニックス vs TEAM雷電 vs BEAST X · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-04-28",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 14/15",
    sub: "EX風林火山 vs KONAMI麻雀格闘倶楽部 vs セガサミーフェニックス vs TEAM雷電 · 2試合",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-04-30",
    startTime: "19:00",
    endTime: "22:30",
    org: "M-LEAGUE",
    title: "Mリーグ セミファイナル 15/15",
    sub: "赤坂ドリブンズ vs EX風林火山 vs KONAMI麻雀格闘倶楽部 vs BEAST X · 2試合 · SF最終日",
    channel: "ABEMA",
    tagColor: "#d4b94e",
    link: URL_ABEMA_MAHJONG,
  },

  ...MLEAGUE_FINAL_EVENTS,

  // ── NPM（日本プロ麻雀協会）放送対局 ──────────────────────
  // 出典: https://npm2001.com/schedule/ （2026-09-16確認）
  // 2027年1月までの関東スケジュールから、既存シリーズかつ配信先に「ABEMA」または「協会チャンネル」と記載のある対局のみ掲載。
  // 開始/終了時刻は公式公開待ちのため、暫定的に 12:00–20:00。
  ...NPM_BROADCAST_EVENTS,

  // ── JPML（日本プロ麻雀連盟）配信予定 ─────────────────
  // 出典: 連盟公式YouTubeと公式mellow-fanチャンネル（2026-09-16確認）。放送予定が公開された日のみ掲載。
  // 終了時刻は未掲載のため、画面では開始時刻のみ表示。
  ...JPML_YOUTUBE_EVENTS,
  ...JPML_HOUOU_A1_ADDITIONS,
  ...JPML_HOUOU_A2_ADDITIONS,
  ...JPML_MELLOW_FAN_EVENTS,

  // ── 最高位戦 第51期 A1リーグ（ABEMA 配信）────────────────
  // 出典: saikouisen.com/results/league/league-a の卓組表
  // ※ 画像の青色マーク = ABEMA 放送卓（公式注: 全卓ABEMAにて放送、青色箇所が放送卓）
  // 開始/終了時刻は公式公開待ち、暫定 12:00–20:00
  {
    date: "2026-04-29",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第4節 卓3",
    sub: "村上 淳・平賀 聡彦・鈴木 優・中嶋 和正",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-06",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第4節 卓4",
    sub: "鈴木 たろう・鈴木 聡一郎・坂井 秀隆・日向 藍子",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-13",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第5節 卓1",
    sub: "石井 一馬・平賀 聡彦・坂井 秀隆・立花 裕",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-27",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A1リーグ 第5節 卓3",
    sub: "園田 賢・鈴木 聡一郎・鈴木 優・馬場 翔平",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },

  // ── 最高位戦 第51期 A2リーグ（最高位戦ch / YouTube 配信）─────
  // 出典: saikouisen.com/results/league/league-a2/ の卓組表
  // 赤色セル = 最高位戦チャンネル (YouTube)、青色セル = ABEMA。放送卓未定の第11・12節は未掲載。
  // 開始/終了時刻は公式公開待ち、暫定 12:00–20:00
  {
    date: "2026-05-01",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓3",
    sub: "山田 独歩・津田 岳宏・設楽 遥斗・中邨 光康",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-02",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓4",
    sub: "小平 崇弘・宇野 公介・井上 祐希・醍醐 大",
    channel: "ABEMA",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_ABEMA_MAHJONG,
  },
  {
    date: "2026-05-08",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第3節 卓5",
    sub: "塩澤 彰大・太野 奈月・渋川 難波・佐藤 崇・大平 亜季",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-09",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓1",
    sub: "朝倉 康心・井上 祐希・新井 啓文・中邨 光康・醍醐 大",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-16",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓2",
    sub: "小平 崇弘・平島 洋太・渋川 難波・平島 晶太",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-22",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓3",
    sub: "宇野 公介・渡辺 太・木村 誠・大平 亜季・中邨 光康",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-23",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓4",
    sub: "山田 独歩・津田 岳宏・井上 祐希・塩澤 彰大・太野 奈月",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-29",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第4節 卓5",
    sub: "河野 直也・設楽 遥斗・佐藤 崇・今村 順平",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },
  {
    date: "2026-05-30",
    startTime: "12:00",
    endTime: "20:00",
    org: "SAIKOUISEN",
    title: "最高位戦A2リーグ 第5節 卓1",
    sub: "宇野 公介・平島 洋太・太野 奈月・有賀 利樹",
    channel: "最高位戦ch",
    tagColor: "#7c3aed",
    tagTextColor: "#ebe4d2",
    link: URL_SAIKOUISEN_YOUTUBE,
  },

  // 2026-09-16時点で公式の放送色または放送予定が確定している今後のA1/A2対局。
  ...SAIKOUISEN_BROADCAST_ADDITIONS,
];

// ============================================================
// 日付ユーティリティ（JSTタイムゾーン）
// ============================================================

const JST_OFFSET_MS = 9 * 60 * 60 * 1000;

function nowJst(): Date {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + JST_OFFSET_MS);
}

function fmtDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getWeekDatesJst(now: Date): Date[] {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const start = new Date(d);
  start.setDate(d.getDate() - 1);
  return Array.from({ length: 7 }, (_, i) => {
    const wd = new Date(start);
    wd.setDate(start.getDate() + i);
    return wd;
  });
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getMonthDatesJst(now: Date): Date[] {
  const first = new Date(now.getFullYear(), now.getMonth(), 1);
  first.setHours(0, 0, 0, 0);
  const start = new Date(first);
  start.setDate(first.getDate() - first.getDay());
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

const DOW_SHORT_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DOW_JA = ["日", "月", "火", "水", "木", "金", "土"];
const MONTH_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// 時刻 "HH:MM" → グリッド top px (11:00 起点、1時間 = 72px)
const GRID_START_HOUR = 11;
const HOUR_PX = 72;

function timeToY(time: string): number {
  const [h, m] = time.split(":").map(Number);
  const hours = (h ?? GRID_START_HOUR) - GRID_START_HOUR;
  const mins = m ?? 0;
  return hours * HOUR_PX + mins * (HOUR_PX / 60);
}

function durationHeight(startTime: string, endTime: string): number {
  return Math.max(60, timeToY(endTime) - timeToY(startTime));
}

const HOURS = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
  "25:00",
];

// ============================================================
// レンダリング
// ============================================================

export default async function SchedulePage({
  searchParams,
}: {
  searchParams?: Promise<{ view?: string; week?: string }>;
}) {
  const params = await searchParams;
  const view = params?.view === "month" ? "month" : "week";
  const weekParam = Number.parseInt(params?.week ?? "0", 10);
  const weekOffset = Number.isFinite(weekParam) ? weekParam : 0;
  const today = nowJst();
  const todayISO = fmtDateISO(today);
  const weekBase = addDays(today, weekOffset * 7);
  const week = getWeekDatesJst(weekBase);
  const month = getMonthDatesJst(today);
  const weekISO = week.map(fmtDateISO);
  const monthISO = month.map(fmtDateISO);

  const weekStartLabel = `${week[0].getMonth() + 1}月${week[0].getDate()}日`;
  const weekEndLabel = `${week[6].getMonth() + 1}月${week[6].getDate()}日`;
  const weekYear = week[0].getFullYear();
  const startOfYear = new Date(weekYear, 0, 1);
  const weekNumber = Math.ceil(((week[0].getTime() - startOfYear.getTime()) / 86400000 + 1) / 7);
  const weekHref = (offset: number) => offset === 0 ? "/schedule" : `/schedule?week=${offset}`;
  const monthLabel = `${today.getFullYear()}年${today.getMonth() + 1}月`;

  const eventsByDate: ScheduledEvent[][] = weekISO.map((d) =>
    EVENTS.filter((e) => e.date === d).sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  );
  const monthEventsByDate: ScheduledEvent[][] = monthISO.map((d) =>
    EVENTS.filter((e) => e.date === d).sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  );

  const totalMatches = eventsByDate.reduce((acc, arr) => acc + arr.length, 0);
  const monthMatches = monthEventsByDate.reduce((acc, arr) => acc + arr.length, 0);
  const todayIdx = week.findIndex((d) => fmtDateISO(d) === todayISO);
  const todayMonthIdx = month.findIndex((d) => fmtDateISO(d) === todayISO);
  const todayMatches = todayMonthIdx >= 0 ? (monthEventsByDate[todayMonthIdx]?.length ?? 0) : 0;
  const todayEvents = todayIdx >= 0
    ? (eventsByDate[todayIdx] ?? [])
    : todayMonthIdx >= 0
      ? (monthEventsByDate[todayMonthIdx] ?? [])
      : [];

  return (
    <div className="wrap">
      <section className="sc-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>放送対局スケジュール</span>
        </div>
        <h1>
          <span className="title-full">放送対局スケジュール</span>
          <span className="title-short">対局</span>
          <span className="en">Match Schedule</span>
        </h1>
        <div className="range">
          <div className="wk">
            {view === "month" ? monthLabel : `${weekStartLabel} ― ${weekEndLabel}`}
            <span className="sub">
              {view === "month"
                ? `${monthMatches} matches · ${MONTH_EN[today.getMonth()]} ${today.getFullYear()}`
                : `Week ${weekNumber} · ${weekYear} · ${MONTH_EN[week[0].getMonth()]} · 昨日から`}
            </span>
          </div>
          <div className="counts">
            <div className="c">
              <div className="l">{view === "month" ? "This Month" : "This Range"}</div>
              <div className="v">
                {String(view === "month" ? monthMatches : totalMatches).padStart(2, "0")}
                <span
                  style={{
                    fontSize: 16,
                    fontFamily: "'Noto Sans JP'",
                    fontWeight: 500,
                    marginLeft: 4,
                  }}
                >
                  試合
                </span>
              </div>
            </div>
            <div className="c">
              <div className="l">Today</div>
              <div className="v gold">{String(todayMatches).padStart(2, "0")}</div>
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          background: "var(--paper)",
          border: "var(--border)",
          boxShadow: "var(--shadow-sm)",
          padding: "16px 22px",
          marginBottom: 18,
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: 13,
          color: "var(--ink-2)",
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: "var(--vermilion)" }}>● データ整備状況</strong> ──
        現在 <strong>Mリーグは確定日時</strong>{" "}
        で表示し、各団体タイトル戦は公式・配信ページで確認できた予定を中心に掲載しています。開始/終了時刻が未公表の対局は暫定枠として扱い、公式連携後に順次精度を上げていきます。
      </section>

      <div className="cal-two">
        <div>
          <div className="schedule-cal-toolbar">
            <div className="schedule-period-row">
              {view === "week" ? (
                <Link className="schedule-period-btn" href={weekHref(weekOffset - 1)} scroll={false}>
                  ← 前週
                </Link>
              ) : (
                <span className="schedule-period-btn is-disabled" aria-hidden="true">← 前週</span>
              )}
              <div className="schedule-cal-title">
                <small>{view === "month" ? "MONTH VIEW" : "WEEK VIEW"}</small>
                <span>{view === "month" ? monthLabel : `${weekStartLabel} ― ${weekEndLabel}`}</span>
              </div>
              {view === "week" ? (
                <Link className="schedule-period-btn" href={weekHref(weekOffset + 1)} scroll={false}>
                  次週 →
                </Link>
              ) : (
                <span className="schedule-period-btn is-disabled" aria-hidden="true">次週 →</span>
              )}
            </div>
            <div className="schedule-mode-row">
              <Link
                href={view === "month" ? "/schedule?view=month" : "/schedule"}
                scroll={false}
                className="schedule-today-chip"
                aria-current={view === "week" && weekOffset === 0 ? "page" : undefined}
              >
                今日
              </Link>
              <div className="schedule-view-tabs" aria-label="カレンダー表示切替">
                <Link href={weekHref(weekOffset)} scroll={false} aria-current={view === "week" ? "page" : undefined}>
                  週表示
                </Link>
                <Link href="/schedule?view=month" scroll={false} aria-current={view === "month" ? "page" : undefined}>
                  月表示
                </Link>
              </div>
            </div>
          </div>
          {view === "week" ? (
            <section className="cal-wrap">
              <div className="cal-scroll">
                <div className="cal-head-row">
                  <div className="corner">JST</div>
                  {week.map((d, i) => {
                    const isToday = fmtDateISO(d) === todayISO;
                    const isSat = d.getDay() === 6;
                    const isSun = d.getDay() === 0;
                    const cls = ["day", isToday ? "today" : "", isSat ? "sat" : "", isSun ? "sun" : ""]
                      .filter(Boolean)
                      .join(" ");
                    return (
                      <div key={i} className={cls}>
                        <div className="dow">
                          {DOW_SHORT_EN[d.getDay()]} · {DOW_JA[d.getDay()]}
                        </div>
                        <div className="dt">
                          {d.getDate()}
                          <span className="n">{MONTH_EN[d.getMonth()]}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cal-body">
                  <div className="hour-col">
                    {HOURS.map((h) => (
                      <div key={h} className="hour">
                        {h}
                      </div>
                    ))}
                  </div>

                  {week.map((d, i) => {
                    const isToday = fmtDateISO(d) === todayISO;
                    const events = eventsByDate[i] ?? [];
                    return (
                      <div key={i} className={`day-col ${isToday ? "today" : ""}`.trim()}>
                        {HOURS.map((_, idx) => (
                          <div key={idx} className="hour"></div>
                        ))}
                        {events.map((ev, idx) => {
                          const top = timeToY(ev.startTime);
                          const height = durationHeight(ev.startTime, ev.endTime);
                          const link = ev.link;
                          const inner = (
                            <>
                              <div className="tm">
                                {ev.timeLabel ?? `${ev.startTime} – ${ev.endTime}`}
                              </div>
                              <div className="tl">{ev.title}</div>
                              {ev.sub && <div className="sub">{ev.sub}</div>}
                              <span
                                className="org-tag"
                                style={{ background: ev.tagColor, color: ev.tagTextColor }}
                              >
                                {ev.channel}
                              </span>
                            </>
                          );
                          return link ? (
                            <TrackedExternalLink
                              key={idx}
                              href={link}
                              className="event"
                              style={{ top, height, textDecoration: "none", color: "inherit" }}
                              eventName="External Link Click"
                              eventProps={{
                                area: "schedule_week_event",
                                org: ev.org,
                                channel: ev.channel,
                                title: ev.title,
                              }}
                            >
                              {inner}
                            </TrackedExternalLink>
                          ) : (
                            <div key={idx} className="event" style={{ top, height }}>
                              {inner}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            <section className="month-wrap">
              <div className="month-head-row">
                {DOW_JA.map((dow, idx) => (
                  <div key={dow} className={idx === 0 ? "sun" : idx === 6 ? "sat" : ""}>
                    {dow}
                  </div>
                ))}
              </div>
              <div className="month-grid">
                {month.map((d, i) => {
                  const iso = fmtDateISO(d);
                  const events = monthEventsByDate[i] ?? [];
                  const currentMonth = d.getMonth() === today.getMonth();
                  const isToday = iso === todayISO;
                  const cls = [
                    "month-cell",
                    currentMonth ? "" : "muted",
                    isToday ? "today" : "",
                  ].filter(Boolean).join(" ");
                  return (
                    <div key={iso} className={cls}>
                      <div className="month-date">
                        <span>{d.getDate()}</span>
                        <small>{MONTH_EN[d.getMonth()]}</small>
                      </div>
                      <div className="month-events">
                        {events.slice(0, 3).map((ev, idx) => {
                          const item = (
                            <>
                              <span className="time">{ev.startTime}</span>
                              <span className="name">{ev.title}</span>
                            </>
                          );
                          return ev.link ? (
                            <TrackedExternalLink
                              key={`${iso}-${idx}`}
                              href={ev.link}
                              className="month-event"
                              style={{ ["--oc" as string]: ev.tagColor } as React.CSSProperties}
                              eventName="External Link Click"
                              eventProps={{
                                area: "schedule_month_event",
                                org: ev.org,
                                channel: ev.channel,
                                title: ev.title,
                              }}
                            >
                              {item}
                            </TrackedExternalLink>
                          ) : (
                            <div
                              key={`${iso}-${idx}`}
                              className="month-event"
                              style={{ ["--oc" as string]: ev.tagColor } as React.CSSProperties}
                            >
                              {item}
                            </div>
                          );
                        })}
                        {events.length > 3 && (
                          <div className="month-more">+{events.length - 3}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="list-wrap">
            <div className="list-head">
              <div className="ttl">
                本日の対局
                <span className="en">
                  Today · {DOW_SHORT_EN[today.getDay()]}, {MONTH_EN[today.getMonth()]}{" "}
                  {today.getDate()}
                </span>
              </div>
              <div className="count">
                {String(todayMatches).padStart(2, "0")} MATCHES
              </div>
            </div>

            {todayMatches === 0 ? (
              <div
                style={{
                  padding: "28px 22px",
                  textAlign: "center",
                  fontFamily: "Noto Sans JP, sans-serif",
                  fontSize: 14,
                  color: "var(--ink-3)",
                  background: "var(--paper)",
                  border: "var(--border)",
                  marginTop: 12,
                }}
              >
                本日の確定対局はありません。
              </div>
            ) : (
              <div className="day-section">
                {todayEvents.map((m, idx) => {
                  const link = m.link;
                  return (
                    <div
                      key={idx}
                      className="match-row"
                      style={{ ["--oc" as string]: m.tagColor } as React.CSSProperties}
                    >
                      <div className="time">
                        {m.startTime}
                        <span className="dur">{m.endTime}</span>
                      </div>
                      <div className="status upcoming">予定</div>
                      <div className="title">
                        <h4>
                          {link ? (
                            <TrackedExternalLink
                              href={link}
                              eventName="External Link Click"
                              eventProps={{
                                area: "schedule_today_event",
                                org: m.org,
                                channel: m.channel,
                                title: m.title,
                              }}
                            >
                              {m.title}
                            </TrackedExternalLink>
                          ) : (
                            <span>{m.title}</span>
                          )}
                        </h4>
                        <div className="sub">{m.sub}</div>
                      </div>
                      <div className="org-tag">
                        <span className="bar"></span>
                        {m.channel}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <aside>
          <section className="side-card">
            <h3>
              今期の主要タイトル戦
              <span className="en">Major Titles in Progress</span>
            </h3>
            <div className="jump-list">
              <div className="jump-item">
                <div className="d">
                  5/4
                  <small>月</small>
                </div>
                <div className="t">
                  Mリーグ Final 開幕
                  <small>5/4 – 5/15 · 月火木金 8日 16試合</small>
                </div>
                <div className="c">M·L</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  5/15
                  <small>金</small>
                </div>
                <div className="t">
                  Mリーグ Final 最終決戦
                  <small>17:00 開始 · 表彰式併催 · ベルサール東京日本橋PV</small>
                </div>
                <div className="c">M·L</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  43期
                  <small>JPML</small>
                </div>
                <div className="t">
                  鳳凰戦
                  <small>A1〜D 5部制リーグ 進行中</small>
                </div>
                <div className="c">JPML</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  23期
                  <small>NPM</small>
                </div>
                <div className="t">
                  雀王戦
                  <small>A〜D 4部制リーグ 進行中</small>
                </div>
                <div className="c">NPM</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  51期
                  <small>最高位戦</small>
                </div>
                <div className="t">
                  最高位戦
                  <small>A〜D 部制リーグ 進行中</small>
                </div>
                <div className="c">SKO</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  18期
                  <small>RMU</small>
                </div>
                <div className="t">
                  令昭位戦
                  <small>A1〜E 多部制リーグ 進行中</small>
                </div>
                <div className="c">RMU</div>
              </div>
              <div className="jump-item">
                <div className="d">
                  22期
                  <small>μ</small>
                </div>
                <div className="t">
                  将王戦
                  <small>認定プロ上位10名 短期決戦 進行中</small>
                </div>
                <div className="c">μ</div>
              </div>
            </div>
          </section>

          <section className="side-card">
            <h3>
              配信チャンネル
              <span className="en">Broadcasters</span>
            </h3>
            <div className="ch-list">
              <div className="ch-item">
                <div className="badge">ABEMA</div>
                <div className="nm">
                  ABEMA 麻雀チャンネル
                  <small>Mリーグ · 各団体タイトル戦</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  通常19:00〜 / 最終日17:00〜
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  連盟
                  <br />
                  CH
                </div>
                <div className="nm">
                  麻雀連盟チャンネル
                  <small>鳳凰位 · 十段位 · 王位 · 桜花</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  最高
                  <br />
                  位戦
                </div>
                <div className="nm">
                  最高位戦チャンネル
                  <small>最高位 · Classic · 發王</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  RMU
                  <br />
                  ch
                </div>
                <div className="nm">
                  RMUチャンネル
                  <small>令昭位 · クラウン · 闘魂杯</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  YouTube
                </div>
              </div>
              <div className="ch-item">
                <div className="badge">
                  μ-
                  <br />
                  TV
                </div>
                <div className="nm">
                  麻将連合TV
                  <small>将王 · BIG1 · μ-M1</small>
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono'",
                    fontSize: 10,
                    color: "var(--ink-3)",
                    fontWeight: 600,
                  }}
                >
                  FRESH
                </div>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
