import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type HeroStat = { label: string; value: ReactNode; tone?: "red" | "gold" | "mono" };
type Tab = { idx: string; label: string; en: string; on?: boolean };
type Pill = { label: string; dot?: string; on?: boolean };
type Pod = { rank: "1ST" | "2ND" | "3RD"; cls: "p1" | "p2" | "p3"; oc: string; org: string; nm: string; sub: string; face: string; metrics: Array<{ l: string; v: string; plus?: boolean }> };
type Delta = "up" | "dn" | "eq";
type Row = {
  rank: number;
  delta: Delta;
  deltaVal: string;
  faceVar: string;
  face: string;
  name: string;
  href?: string;
  orgBar: string;
  sub: string;
  top?: boolean;
  cells: Array<{ v: ReactNode; tone?: "plus" | "gold" }>;
};
type TableDef = {
  cols: string;
  heads: Array<{ label: string; arrow?: boolean }>;
  rows: Row[];
};
type OrgLead = { oc: string; name: string; sub: string; v: string };
type Mover = { dir: "up" | "dn"; dlt: string; name: string; sub: string; rank: string };
type Mini = { n: number; name: string; sub: string; v: string; top?: boolean };

const HERO_STATS: HeroStat[] = [
  { label: "Tracked Pros", value: <>1,405<span className="hs-suf">名</span></> },
  { label: "Organizations", value: <>5<span className="hs-suf">団体 + Mリーグ</span></> },
  { label: "Tracked Titles", value: "47", tone: "red" },
  { label: "Current Season", value: "2025-26", tone: "gold" },
  { label: "Period", value: "10.01 — 04.21", tone: "mono" },
];

const TABS: Tab[] = [
  { idx: "01", label: "獲得ポイント", en: "Points", on: true },
  { idx: "02", label: "勝率", en: "Win Rate" },
  { idx: "03", label: "和了率", en: "Agari" },
  { idx: "04", label: "タイトル数", en: "Titles" },
  { idx: "05", label: "Mリーグ個人", en: "M·League" },
  { idx: "06", label: "対局数", en: "Matches" },
];

const ORG_PILLS: Pill[] = [
  { label: "すべて", on: true },
  { label: "連盟", dot: "#c8282a" },
  { label: "協会", dot: "#1d4ed8" },
  { label: "最高位戦", dot: "#0b0b09" },
  { label: "RMU", dot: "#a07e28" },
  { label: "μ", dot: "#4b2a7a" },
];

const PERIOD_PILLS: Pill[] = [
  { label: "通算" },
  { label: "2025-26 今季", on: true },
  { label: "過去1年" },
  { label: "過去3ヶ月" },
];

const GENDER_PILLS: Pill[] = [
  { label: "All", on: true },
  { label: "男性" },
  { label: "女流" },
];

const PODIUM: Pod[] = [
  {
    rank: "2ND",
    cls: "p2",
    oc: "#1d4ed8",
    org: "NPM · 協会",
    nm: "金子 正輝",
    sub: "雀王戦A · サクラナイツ",
    face: "金",
    metrics: [
      { l: "Season Pts", v: "+2,431.8", plus: true },
      { l: "Titles", v: "4" },
    ],
  },
  {
    rank: "1ST",
    cls: "p1",
    oc: "#c8282a",
    org: "JPML · 連盟",
    nm: "瀬戸熊 直樹",
    sub: "鳳凰位戦A1 · KONAMI麻雀格闘倶楽部",
    face: "瀬",
    metrics: [
      { l: "Season Pts", v: "+2,847.3", plus: true },
      { l: "Titles", v: "11" },
      { l: "Win %", v: "42.8%" },
    ],
  },
  {
    rank: "3RD",
    cls: "p3",
    oc: "#0b0b09",
    org: "最高位戦",
    nm: "村上 淳",
    sub: "最高位A · 風林火山",
    face: "村",
    metrics: [
      { l: "Season Pts", v: "+2,218.4", plus: true },
      { l: "Titles", v: "6" },
    ],
  },
];

const POINTS_TABLE: TableDef = {
  cols: "60px 70px 1fr 110px 90px 90px 90px 90px 80px",
  heads: [
    { label: "位" },
    { label: "" },
    { label: "選手 · Player" },
    { label: "▼ 獲得pt", arrow: true },
    { label: "対局数" },
    { label: "勝率" },
    { label: "和了率" },
    { label: "放銃率" },
    { label: "" },
  ],
  rows: [
    { rank: 1, delta: "eq", deltaVal: "─", faceVar: "var1", face: "瀬", name: "瀬戸熊 直樹", href: "/players/setokuma", orgBar: "#c8282a", sub: "JPML · 鳳凰位戦A1 · 1973", top: true, cells: [
      { v: <>+2,847.3<small>pt</small></>, tone: "plus" },
      { v: <>184<small>局</small></> },
      { v: <>42.8<small>%</small></>, tone: "gold" },
      { v: <>28.4<small>%</small></> },
      { v: <>10.2<small>%</small></> },
    ] },
    { rank: 2, delta: "up", deltaVal: "▲3", faceVar: "var3", face: "金", name: "金子 正輝", orgBar: "#1d4ed8", sub: "NPM · 雀王戦A · 1984", top: true, cells: [
      { v: <>+2,431.8<small>pt</small></>, tone: "plus" },
      { v: <>192<small>局</small></> },
      { v: <>41.2<small>%</small></>, tone: "gold" },
      { v: <>26.8<small>%</small></> },
      { v: <>9.8<small>%</small></> },
    ] },
    { rank: 3, delta: "up", deltaVal: "▲1", faceVar: "var6", face: "村", name: "村上 淳", orgBar: "#0b0b09", sub: "最高位戦 · 最高位A · 1976", top: true, cells: [
      { v: <>+2,218.4<small>pt</small></>, tone: "plus" },
      { v: <>176<small>局</small></> },
      { v: <>38.9<small>%</small></> },
      { v: <>27.2<small>%</small></> },
      { v: <>11.4<small>%</small></> },
    ] },
    { rank: 4, delta: "dn", deltaVal: "▼2", faceVar: "var2", face: "多", name: "多井 隆晴", orgBar: "#a07e28", sub: "RMU · 令昭位戦A · 1972", cells: [
      { v: <>+2,087.6<small>pt</small></>, tone: "plus" },
      { v: <>198<small>局</small></> },
      { v: <>39.8<small>%</small></> },
      { v: <>28.1<small>%</small></> },
      { v: <>10.8<small>%</small></> },
    ] },
    { rank: 5, delta: "up", deltaVal: "▲2", faceVar: "var1", face: "佐", name: "佐々木 寿人", orgBar: "#c8282a", sub: "JPML · 鳳凰位戦A1 · 1977", cells: [
      { v: <>+1,983.2<small>pt</small></>, tone: "plus" },
      { v: <>168<small>局</small></> },
      { v: <>40.1<small>%</small></> },
      { v: <>29.8<small>%</small></>, tone: "gold" },
      { v: <>11.7<small>%</small></> },
    ] },
    { rank: 6, delta: "eq", deltaVal: "─", faceVar: "var3", face: "矢", name: "矢島 亨", orgBar: "#1d4ed8", sub: "NPM · 雀王戦A · 1988", cells: [
      { v: <>+1,876.4<small>pt</small></>, tone: "plus" },
      { v: <>172<small>局</small></> },
      { v: <>37.8<small>%</small></> },
      { v: <>26.4<small>%</small></> },
      { v: <>9.2<small>%</small></> },
    ] },
    { rank: 7, delta: "dn", deltaVal: "▼1", faceVar: "var1", face: "前", name: "前原 雄大", orgBar: "#c8282a", sub: "JPML · 鳳凰位戦A1 · 1961", cells: [
      { v: <>+1,782.9<small>pt</small></>, tone: "plus" },
      { v: <>156<small>局</small></> },
      { v: <>38.2<small>%</small></> },
      { v: <>25.8<small>%</small></> },
      { v: <>10.1<small>%</small></> },
    ] },
    { rank: 8, delta: "up", deltaVal: "▲4", faceVar: "var6", face: "石", name: "石井 一馬", orgBar: "#0b0b09", sub: "最高位戦 · 最高位A · 1981", cells: [
      { v: <>+1,694.1<small>pt</small></>, tone: "plus" },
      { v: <>164<small>局</small></> },
      { v: <>37.4<small>%</small></> },
      { v: <>27.8<small>%</small></> },
      { v: <>10.9<small>%</small></> },
    ] },
    { rank: 9, delta: "dn", deltaVal: "▼2", faceVar: "var6", face: "渋", name: "渋川 難波", orgBar: "#0b0b09", sub: "最高位戦 · 最高位B1 · 1987", cells: [
      { v: <>+1,587.2<small>pt</small></>, tone: "plus" },
      { v: <>152<small>局</small></> },
      { v: <>36.9<small>%</small></> },
      { v: <>26.1<small>%</small></> },
      { v: <>9.6<small>%</small></> },
    ] },
    { rank: 10, delta: "up", deltaVal: "▲1", faceVar: "var1", face: "滝", name: "滝沢 和典", orgBar: "#c8282a", sub: "JPML · 鳳凰位戦A1 · 1979", cells: [
      { v: <>+1,498.7<small>pt</small></>, tone: "plus" },
      { v: <>148<small>局</small></> },
      { v: <>35.8<small>%</small></> },
      { v: <>25.4<small>%</small></> },
      { v: <>10.4<small>%</small></> },
    ] },
    { rank: 11, delta: "eq", deltaVal: "─", faceVar: "var5", face: "小", name: "小林 剛", orgBar: "#4b2a7a", sub: "μ · μリーグA · 1976", cells: [
      { v: <>+1,412.6<small>pt</small></>, tone: "plus" },
      { v: <>142<small>局</small></> },
      { v: <>36.2<small>%</small></> },
      { v: <>24.9<small>%</small></> },
      { v: <>8.9<small>%</small></> },
    ] },
    { rank: 12, delta: "up", deltaVal: "▲5", faceVar: "var3", face: "浅", name: "浅井 堂岐", orgBar: "#1d4ed8", sub: "NPM · 雀王戦A · 1989", cells: [
      { v: <>+1,348.9<small>pt</small></>, tone: "plus" },
      { v: <>156<small>局</small></> },
      { v: <>35.4<small>%</small></> },
      { v: <>26.8<small>%</small></> },
      { v: <>10.7<small>%</small></> },
    ] },
    { rank: 13, delta: "dn", deltaVal: "▼3", faceVar: "var1", face: "堀", name: "堀 慎吾", orgBar: "#c8282a", sub: "JPML · 鳳凰位戦B1 · 1985", cells: [
      { v: <>+1,287.4<small>pt</small></>, tone: "plus" },
      { v: <>148<small>局</small></> },
      { v: <>36.1<small>%</small></> },
      { v: <>27.2<small>%</small></> },
      { v: <>10.2<small>%</small></> },
    ] },
    { rank: 14, delta: "up", deltaVal: "▲2", faceVar: "var4", face: "阿", name: "阿部 孝則", orgBar: "#a07e28", sub: "RMU · 令昭位戦A · 1975", cells: [
      { v: <>+1,221.3<small>pt</small></>, tone: "plus" },
      { v: <>138<small>局</small></> },
      { v: <>35.8<small>%</small></> },
      { v: <>25.6<small>%</small></> },
      { v: <>9.8<small>%</small></> },
    ] },
    { rank: 15, delta: "eq", deltaVal: "─", faceVar: "var3", face: "仲", name: "仲林 圭", orgBar: "#1d4ed8", sub: "NPM · 雀王戦A · 1988", cells: [
      { v: <>+1,184.7<small>pt</small></>, tone: "plus" },
      { v: <>144<small>局</small></> },
      { v: <>34.9<small>%</small></> },
      { v: <>25.1<small>%</small></> },
      { v: <>9.4<small>%</small></> },
    ] },
  ],
};

const WINRATE_TABLE: TableDef = {
  cols: "60px 70px 1fr 90px 90px 90px 90px 80px",
  heads: [
    { label: "位" },
    { label: "" },
    { label: "選手 · Player" },
    { label: "▼ 勝率", arrow: true },
    { label: "対局数" },
    { label: "平均順位" },
    { label: "連対率" },
    { label: "" },
  ],
  rows: [
    { rank: 1, delta: "up", deltaVal: "▲2", faceVar: "var1", face: "瀬", name: "瀬戸熊 直樹", href: "/players/setokuma", orgBar: "#c8282a", sub: "JPML", top: true, cells: [
      { v: <>42.8<small>%</small></>, tone: "gold" },
      { v: <>184<small>局</small></> },
      { v: "2.18" },
      { v: <>62.5<small>%</small></> },
    ] },
    { rank: 2, delta: "eq", deltaVal: "─", faceVar: "var3", face: "金", name: "金子 正輝", orgBar: "#1d4ed8", sub: "NPM", top: true, cells: [
      { v: <>41.2<small>%</small></>, tone: "gold" },
      { v: <>192<small>局</small></> },
      { v: "2.24" },
      { v: <>60.8<small>%</small></> },
    ] },
    { rank: 3, delta: "up", deltaVal: "▲4", faceVar: "var1", face: "佐", name: "佐々木 寿人", orgBar: "#c8282a", sub: "JPML", top: true, cells: [
      { v: <>40.1<small>%</small></>, tone: "gold" },
      { v: <>168<small>局</small></> },
      { v: "2.31" },
      { v: <>58.9<small>%</small></> },
    ] },
    { rank: 4, delta: "dn", deltaVal: "▼1", faceVar: "var2", face: "多", name: "多井 隆晴", orgBar: "#a07e28", sub: "RMU", cells: [
      { v: <>39.8<small>%</small></> },
      { v: <>198<small>局</small></> },
      { v: "2.29" },
      { v: <>59.1<small>%</small></> },
    ] },
    { rank: 5, delta: "up", deltaVal: "▲3", faceVar: "var6", face: "村", name: "村上 淳", orgBar: "#0b0b09", sub: "最高位戦", cells: [
      { v: <>38.9<small>%</small></> },
      { v: <>176<small>局</small></> },
      { v: "2.34" },
      { v: <>58.0<small>%</small></> },
    ] },
    { rank: 6, delta: "eq", deltaVal: "─", faceVar: "var1", face: "前", name: "前原 雄大", orgBar: "#c8282a", sub: "JPML", cells: [
      { v: <>38.2<small>%</small></> },
      { v: <>156<small>局</small></> },
      { v: "2.38" },
      { v: <>57.1<small>%</small></> },
    ] },
    { rank: 7, delta: "up", deltaVal: "▲6", faceVar: "var3", face: "矢", name: "矢島 亨", orgBar: "#1d4ed8", sub: "NPM", cells: [
      { v: <>37.8<small>%</small></> },
      { v: <>172<small>局</small></> },
      { v: "2.41" },
      { v: <>56.4<small>%</small></> },
    ] },
    { rank: 8, delta: "dn", deltaVal: "▼2", faceVar: "var6", face: "石", name: "石井 一馬", orgBar: "#0b0b09", sub: "最高位戦", cells: [
      { v: <>37.4<small>%</small></> },
      { v: <>164<small>局</small></> },
      { v: "2.44" },
      { v: <>55.8<small>%</small></> },
    ] },
    { rank: 9, delta: "eq", deltaVal: "─", faceVar: "var6", face: "渋", name: "渋川 難波", orgBar: "#0b0b09", sub: "最高位戦", cells: [
      { v: <>36.9<small>%</small></> },
      { v: <>152<small>局</small></> },
      { v: "2.46" },
      { v: <>54.9<small>%</small></> },
    ] },
    { rank: 10, delta: "up", deltaVal: "▲2", faceVar: "var5", face: "小", name: "小林 剛", orgBar: "#4b2a7a", sub: "μ", cells: [
      { v: <>36.2<small>%</small></> },
      { v: <>142<small>局</small></> },
      { v: "2.51" },
      { v: <>54.2<small>%</small></> },
    ] },
  ],
};

const TITLES_TABLE: TableDef = {
  cols: "60px 70px 1fr 90px 90px 90px 130px 80px",
  heads: [
    { label: "位" },
    { label: "" },
    { label: "選手 · Player" },
    { label: "▼ 通算", arrow: true },
    { label: "主要" },
    { label: "女流" },
    { label: "初獲得" },
    { label: "" },
  ],
  rows: [
    { rank: 1, delta: "eq", deltaVal: "─", faceVar: "var6", face: "森", name: "森山 茂和", orgBar: "#c8282a", sub: "JPML · 名誉会長 · 1953", top: true, cells: [
      { v: <>24<small>冠</small></>, tone: "gold" },
      { v: "18" },
      { v: "─" },
      { v: <>1988<small>十段位</small></> },
    ] },
    { rank: 2, delta: "eq", deltaVal: "─", faceVar: "var1", face: "瀬", name: "瀬戸熊 直樹", href: "/players/setokuma", orgBar: "#c8282a", sub: "JPML · 1973", top: true, cells: [
      { v: <>11<small>冠</small></>, tone: "gold" },
      { v: "9" },
      { v: "─" },
      { v: <>2004<small>鳳凰位</small></> },
    ] },
    { rank: 3, delta: "up", deltaVal: "▲1", faceVar: "var2", face: "多", name: "多井 隆晴", orgBar: "#a07e28", sub: "RMU · 1972", top: true, cells: [
      { v: <>9<small>冠</small></>, tone: "gold" },
      { v: "9" },
      { v: "─" },
      { v: <>2008<small>最強位</small></> },
    ] },
    { rank: 4, delta: "eq", deltaVal: "─", faceVar: "var6", face: "村", name: "村上 淳", orgBar: "#0b0b09", sub: "最高位戦 · 1976", cells: [
      { v: <>6<small>冠</small></> },
      { v: "6" },
      { v: "─" },
      { v: <>2005<small>最高位</small></> },
    ] },
    { rank: 5, delta: "up", deltaVal: "▲2", faceVar: "var3", face: "金", name: "金子 正輝", orgBar: "#1d4ed8", sub: "NPM · 1984", cells: [
      { v: <>4<small>冠</small></> },
      { v: "4" },
      { v: "─" },
      { v: <>2019<small>雀王</small></> },
    ] },
    { rank: 6, delta: "eq", deltaVal: "─", faceVar: "var1", face: "魚", name: "魚谷 侑未", orgBar: "#c8282a", sub: "JPML · 女流 · 1989", cells: [
      { v: <>4<small>冠</small></> },
      { v: "1" },
      { v: "3", tone: "gold" },
      { v: <>2013<small>桜花</small></> },
    ] },
    { rank: 7, delta: "up", deltaVal: "▲1", faceVar: "var1", face: "宮", name: "宮内 こずえ", orgBar: "#c8282a", sub: "JPML · 女流 · 1980", cells: [
      { v: <>3<small>冠</small></> },
      { v: "─" },
      { v: "3", tone: "gold" },
      { v: <>2010<small>桜花</small></> },
    ] },
    { rank: 8, delta: "eq", deltaVal: "─", faceVar: "var5", face: "小", name: "小林 剛", orgBar: "#4b2a7a", sub: "μ · 1976", cells: [
      { v: <>3<small>冠</small></> },
      { v: "3" },
      { v: "─" },
      { v: <>2012<small>μリーグ</small></> },
    ] },
  ],
};

const ORG_LEADERS: OrgLead[] = [
  { oc: "#c8282a", name: "瀬戸熊 直樹", sub: "JPML · 連盟", v: "+2,847.3" },
  { oc: "#1d4ed8", name: "金子 正輝", sub: "NPM · 協会", v: "+2,431.8" },
  { oc: "#0b0b09", name: "村上 淳", sub: "最高位戦", v: "+2,218.4" },
  { oc: "#a07e28", name: "多井 隆晴", sub: "RMU · 令昭位", v: "+2,087.6" },
  { oc: "#4b2a7a", name: "小林 剛", sub: "μ · 麻将連合", v: "+1,412.6" },
];

const MOVERS_UP: Mover[] = [
  { dir: "up", dlt: "+8", name: "石井 一馬", sub: "最高位戦 · CLASSIC決勝進出", rank: "8" },
  { dir: "up", dlt: "+6", name: "矢島 亨", sub: "NPM · 3戦連続トップ", rank: "6" },
  { dir: "up", dlt: "+5", name: "浅井 堂岐", sub: "NPM · 雀王A 2位浮上", rank: "12" },
  { dir: "up", dlt: "+4", name: "渋川 難波", sub: "最高位戦 · 移籍後好調", rank: "9" },
  { dir: "up", dlt: "+3", name: "金子 正輝", sub: "NPM · 雀王戦 首位キープ", rank: "2" },
];

const MOVERS_DN: Mover[] = [
  { dir: "dn", dlt: "−5", name: "園田 賢", sub: "Mリーグ · ラス引き3連続", rank: "23" },
  { dir: "dn", dlt: "−3", name: "堀 慎吾", sub: "JPML · 第5節で沈む", rank: "13" },
  { dir: "dn", dlt: "−2", name: "多井 隆晴", sub: "RMU · 闘魂杯予選落ち", rank: "4" },
  { dir: "dn", dlt: "−2", name: "滝沢 和典", sub: "JPML · 鳳凰位A1苦戦", rank: "17" },
];

const MLEAGUE_TOP: Mini[] = [
  { n: 1, name: "多井 隆晴", sub: "格闘倶楽部 · 第112戦終了", v: "+687.2", top: true },
  { n: 2, name: "二階堂 亜樹", sub: "サクラナイツ", v: "+542.8", top: true },
  { n: 3, name: "魚谷 侑未", sub: "フェニックス", v: "+478.3", top: true },
  { n: 4, name: "園田 賢", sub: "ドリブンズ", v: "+412.6" },
  { n: 5, name: "佐々木 寿人", sub: "格闘倶楽部", v: "+387.1" },
  { n: 6, name: "日向 藍子", sub: "ABEMAS", v: "+321.4" },
  { n: 7, name: "内川 幸太郎", sub: "サクラナイツ", v: "+298.7" },
  { n: 8, name: "松本 吉弘", sub: "雷電", v: "+187.9" },
];

const WOMEN_TOP: Mini[] = [
  { n: 1, name: "魚谷 侑未", sub: "JPML · 桜花A", v: "+1,287", top: true },
  { n: 2, name: "二階堂 亜樹", sub: "JPML · 桜花A", v: "+1,098", top: true },
  { n: 3, name: "日向 藍子", sub: "JPML · 桜花A", v: "+987", top: true },
  { n: 4, name: "和久津 晶", sub: "JPML · 王位戦決勝", v: "+842" },
  { n: 5, name: "高宮 まり", sub: "JPML · 移籍後初季", v: "+687" },
];

function RankTable({ def }: { def: TableDef }) {
  const gridStyle = { gridTemplateColumns: def.cols } as CSSProperties;
  return (
    <section className="rk-table-wrap">
      <div className="rk-table-head" style={gridStyle}>
        {def.heads.map((h, i) => (
          <span key={i} className={h.arrow ? "arrow" : undefined}>
            {h.label}
          </span>
        ))}
      </div>
      {def.rows.map((r) => (
        <div key={r.rank} className={`rk-row${r.top ? " top" : ""}`} style={gridStyle}>
          <div className="rk">
            {r.rank}
            <small className={r.delta}>{r.deltaVal}</small>
          </div>
          <div className={`face ${r.faceVar}`}>{r.face}</div>
          <div className="nm">
            {r.href ? <Link href={r.href}>{r.name}</Link> : <a>{r.name}</a>}
            <div className="sub">
              <span className="bar" style={{ background: r.orgBar }}></span>
              {r.sub}
            </div>
          </div>
          {r.cells.map((c, i) => (
            <div key={i} className={`val${c.tone ? " " + c.tone : ""}`}>{c.v}</div>
          ))}
          <div className="act">{r.cells.length > 4 ? "詳細 →" : "→"}</div>
        </div>
      ))}
    </section>
  );
}

export default function RankingsPage() {
  return (
    <div className="wrap">
      <section className="rk-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>ランキング</span>
        </div>
        <h1>
          ランキング<span className="en">Pro Mahjong Rankings · 2025-26</span>
        </h1>
        <p className="lead">
          5団体とMリーグのプロ選手、計1,405名を横断して集計。獲得ポイント・勝率・和了率・タイトル獲得数・Mリーグ個人成績など、主要指標を一覧比較。
        </p>
        <div className="hero-stats">
          {HERO_STATS.map((s, i) => (
            <div key={i} className="hs">
              <div className="l">{s.label}</div>
              <div className={`v${s.tone ? " " + s.tone : ""}`} style={s.tone === "mono" ? { fontFamily: "'Geist Mono'", fontSize: 18 } : undefined}>
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="tab-bar">
        {TABS.map((t) => (
          <button key={t.idx} className={t.on ? "on" : undefined}>
            <span className="idx">{t.idx}</span>
            {t.label}
            <span className="en">{t.en}</span>
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <span className="label">Org</span>
        <div className="pills">
          {ORG_PILLS.map((p) => (
            <span key={p.label} className={`pill${p.on ? " on" : ""}`}>
              {p.dot && <span className="dot" style={{ background: p.dot }}></span>}
              {p.label}
            </span>
          ))}
        </div>
        <div className="sep-v"></div>
        <span className="label">Period</span>
        <div className="pills">
          {PERIOD_PILLS.map((p) => (
            <span key={p.label} className={`pill${p.on ? " on" : ""}`}>{p.label}</span>
          ))}
        </div>
        <div className="sep-v"></div>
        <span className="label">Gender</span>
        <div className="pills">
          {GENDER_PILLS.map((p) => (
            <span key={p.label} className={`pill${p.on ? " on" : ""}`}>{p.label}</span>
          ))}
        </div>
        <div className="search-in">選手名で検索…</div>
      </div>

      <section className="podium">
        <h2>
          今季獲得ポイント TOP 3<span className="en">Season Points · Top 3</span>
        </h2>
        <div className="note">
          集計期間 <b>2025.10.01 – 2026.04.21</b> · すべてのタイトル戦・リーグ戦・Mリーグ個人成績を合算
        </div>
        <div className="podium-row">
          {PODIUM.map((p) => {
            const rankPrefix = p.rank.slice(0, -2);
            const rankSuffix = p.rank.slice(-2);
            return (
              <div key={p.cls} className={`pod-card ${p.cls}`} style={{ ["--oc" as string]: p.oc } as CSSProperties}>
                <div className="rk-big">
                  {rankPrefix}
                  <span className="m">{rankSuffix}</span>
                </div>
                <div className="org">
                  <span className="bar"></span>
                  {p.org}
                </div>
                <div className="nm">{p.nm}</div>
                <div className="sub">{p.sub}</div>
                <div className="metric-row">
                  {p.metrics.map((m, i) => (
                    <div key={i} className="m">
                      <div className="ml">{m.l}</div>
                      <div className={`mv${m.plus ? " plus" : ""}`}>{m.v}</div>
                    </div>
                  ))}
                </div>
                <div className="face">{p.face}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="rk-grid">
        <div>
          <RankTable def={POINTS_TABLE} />
          <div className="rk-pagination">
            <div className="info">Showing 1–15 of 1,405 · Season 2025-26</div>
            <div className="pages">
              <button>‹</button>
              <button className="on">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>…</button>
              <button>94</button>
              <button>›</button>
            </div>
          </div>

          <div className="sec-head">
            <h2>勝率ランキング</h2>
            <span className="en">Win Rate · 150局以上</span>
            <span className="num">02 / WINRATE</span>
          </div>
          <RankTable def={WINRATE_TABLE} />

          <div className="sec-head">
            <h2>通算タイトル数</h2>
            <span className="en">Career Titles · All-Time</span>
            <span className="num">03 / TITLES</span>
          </div>
          <RankTable def={TITLES_TABLE} />
        </div>

        <aside>
          <section className="side-card">
            <h3>
              団体別首位<span className="en">By Organization</span>
            </h3>
            <div className="org-lead">
              {ORG_LEADERS.map((o) => (
                <div key={o.name} className="ol" style={{ ["--oc" as string]: o.oc } as CSSProperties}>
                  <span className="rn">1</span>
                  <span className="dot" style={{ width: 8, height: 8, background: o.oc }}></span>
                  <div className="og">
                    {o.name}
                    <small>{o.sub}</small>
                  </div>
                  <span className="vl">{o.v}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="side-card">
            <h3>
              今週の上昇<span className="en">Weekly Movers · Up</span>
            </h3>
            {MOVERS_UP.map((m) => (
              <div key={m.name + m.rank} className="mover up">
                <div className="dlt">{m.dlt}</div>
                <div className="mn">
                  {m.name}
                  <small>{m.sub}</small>
                </div>
                <div className="rnk">
                  {m.rank}
                  <small>位</small>
                </div>
              </div>
            ))}
          </section>

          <section className="side-card">
            <h3>
              今週の降下<span className="en">Weekly Movers · Down</span>
            </h3>
            {MOVERS_DN.map((m) => (
              <div key={m.name + m.rank} className="mover dn">
                <div className="dlt">{m.dlt}</div>
                <div className="mn">
                  {m.name}
                  <small>{m.sub}</small>
                </div>
                <div className="rnk">
                  {m.rank}
                  <small>位</small>
                </div>
              </div>
            ))}
          </section>

          <section className="side-card">
            <h3>
              Mリーグ個人TOP<span className="en">M·League Indiv.</span>
            </h3>
            {MLEAGUE_TOP.map((m) => (
              <div key={m.n} className={`mini-row${m.top ? " top" : ""}`}>
                <span className="n">{m.n}</span>
                <div className="nm">
                  {m.name}
                  <small>{m.sub}</small>
                </div>
                <span className="v plus">{m.v}</span>
              </div>
            ))}
          </section>

          <section className="side-card">
            <h3>
              女流TOP<span className="en">Women&apos;s Division</span>
            </h3>
            {WOMEN_TOP.map((m) => (
              <div key={m.n} className={`mini-row${m.top ? " top" : ""}`}>
                <span className="n">{m.n}</span>
                <div className="nm">
                  {m.name}
                  <small>{m.sub}</small>
                </div>
                <span className="v plus">{m.v}</span>
              </div>
            ))}
          </section>

          <div className="data-note">
            <b>データについて</b>
            <br />
            ポイントは各団体の公式ポイント基準に準拠（順位点・ウマ・オカ込み）。Mリーグは個人ポイント、タイトル戦は本戦以上を対象。集計は毎日19:00 JSTに更新。
          </div>
        </aside>
      </div>
    </div>
  );
}
