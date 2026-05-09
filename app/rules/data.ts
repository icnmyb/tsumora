// app/rules/data.ts

export type RuleItem = { key: string; label: string; desc?: string };
export type RuleValue = "あり" | "なし" | "条件付き" | "-";
export type OrgRule = {
  id: string;
  org: string;
  name: string;
  description?: string;
  values: Record<string, RuleValue | string>;
  notes?: Record<string, string>;  // 項目keyごとの補足説明
};
export type OrgRuleGroup = {
  org: string;
  label: string;
  color: string;
  rules: OrgRule[];
};

export const RULE_ITEMS: RuleItem[] = [
  { key: "kuitan",    label: "喰いタン",     desc: "鳴いてタンヤオ" },
  { key: "ippatsu",   label: "一発",         desc: "リーチ後1巡以内のアガリ" },
  { key: "uradora",   label: "裏ドラ" },
  { key: "kandora",   label: "槓ドラ" },
  { key: "akadora",   label: "赤牌" },
  { key: "kuikae",    label: "喰い替え" },
  { key: "tochuu",    label: "途中流局" },
  { key: "agariyame", label: "アガリやめ" },
  { key: "points",    label: "点数持ち/返し" },
  { key: "rankpts",   label: "順位点" },
  { key: "chombo",    label: "チョンボ" },
];

export const ORG_RULE_GROUPS: OrgRuleGroup[] = [
  {
    org: "JPML", label: "日本プロ麻雀連盟", color: "#c8282a",
    rules: [
      {
        id: "jpml-official", org: "JPML", name: "公式ルール",
        description: "競技麻雀の基本形。一発・裏ドラなし",
        values: { kuitan:"あり", ippatsu:"なし", uradora:"なし", kandora:"なし", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"なし", points:"30000/30000", rankpts:"JPMLタブを参照", chombo:"▲20pt" },
        notes: {
          rankpts: "浮き人数によって変動。\n2人浮き: 1着+8 / 2着+4 / 3着-4 / 4着-8\n1人浮き: 1着+12 / 2着-1 / 3着-3 / 4着-8\n3人浮き: 1着+8 / 2着+3 / 3着+1 / 4着-12\n同点の場合は順位点を分ける"
        },
      },
      {
        id: "jpml-wrc", org: "JPML", name: "WRCルール",
        description: "世界大会標準。一発・裏ドラあり",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"なし", points:"30000/30000", rankpts:"+15/+5/-5/-15", chombo:"▲30pt" },
      },
      {
        id: "jpml-wrcr", org: "JPML", name: "WRC-Rルール",
        description: "WRCに赤牌・高順位点を追加",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"あり（各1枚）", kuikae:"なし", tochuu:"なし", agariyame:"なし", points:"30000/30000", rankpts:"+30/+10/-10/-30", chombo:"▲30pt" },
      },
    ],
  },
  {
    org: "NPM", label: "日本プロ麻雀協会", color: "#2563eb",
    rules: [
      {
        id: "npm-official", org: "NPM", name: "公式ルール",
        description: "喰いタン・先付けあり。一発・裏ドラあり",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"25000/30000", rankpts:"+50/+10/-10/-30", chombo:"-" },
      },
    ],
  },
  {
    org: "最高位戦", label: "最高位戦日本プロ麻雀協会", color: "#7c3aed",
    rules: [
      {
        id: "saikouisen-standard", org: "最高位戦", name: "標準ルール",
        description: "一発・裏ドラあり",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"30000/30000", rankpts:"+50/+10/-10/-30", chombo:"-" },
      },
      {
        id: "saikouisen-classic", org: "最高位戦", name: "Classicルール",
        description: "ドラ1種・一発なし。競技色強め",
        values: { kuitan:"あり", ippatsu:"なし", uradora:"なし", kandora:"なし", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"30000/30000", rankpts:"+12/+4/-4/-12", chombo:"-" },
      },
    ],
  },
  {
    org: "RMU", label: "RMU", color: "#a07e28",
    rules: [
      {
        id: "rmu-a", org: "RMU", name: "Aルール",
        description: "基本ルール。一発・裏ドラあり",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"30000/30000", rankpts:"+15/+5/-5/-15", chombo:"-" },
      },
      {
        id: "rmu-b", org: "RMU", name: "Bルール",
        description: "AルールからドラとノーテンBA排除",
        values: { kuitan:"あり", ippatsu:"なし", uradora:"なし", kandora:"なし", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"30000/30000", rankpts:"+15/+5/-5/-15", chombo:"-" },
      },
      {
        id: "rmu-m", org: "RMU", name: "Mルール",
        description: "Mリーグ採用ルール",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"あり", kuikae:"なし", tochuu:"なし", agariyame:"-", points:"25000/30000", rankpts:"+50/+10/-10/-30", chombo:"-" },
      },
    ],
  },
  {
    org: "μ", label: "麻将連合", color: "#2f5c3f",
    rules: [
      {
        id: "mu-official", org: "μ", name: "公式ルール",
        description: "麻将連合標準ルール",
        values: { kuitan:"あり", ippatsu:"あり", uradora:"あり", kandora:"あり", akadora:"なし", kuikae:"なし", tochuu:"なし", agariyame:"—", points:"30000/30000", rankpts:"+12/+4/-4/-12", chombo:"—" },
      },
    ],
  },
];
