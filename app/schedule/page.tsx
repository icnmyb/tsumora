import Link from "next/link";

type CalEvent = {
  top: number;
  height: number;
  left?: number;
  right?: number;
  live?: boolean;
  time: string;
  title: string;
  sub?: string;
  tagColor: string;
  tagTextColor?: string;
  tag: string;
};

type DayCol = { today?: boolean; events: CalEvent[] };

const DAY_COLS: DayCol[] = [
  // Mon 20
  {
    events: [
      { top: 144, height: 138, time: "19:00 – 21:20", title: "Mリーグ第111戦", sub: "雷電 vs BEAST X vs EARTH JETS vs Pirates", tagColor: "#a07e28", tag: "M·League" },
      { top: 360, height: 95, time: "22:00", title: "μリーグ A 3卓", sub: "忍田幸夫・古久根英孝 他", tagColor: "#4b2a7a", tag: "μ" },
    ],
  },
  // Tue 21 TODAY
  {
    today: true,
    events: [
      { top: 180, height: 150, live: true, time: "19:30 – ▶ LIVE", title: "鳳凰位戦A1 第5節B卓", sub: "瀬戸熊・前原・滝沢・佐々木", tagColor: "#f0c86d", tagTextColor: "#0b0b09", tag: "JPML" },
      { top: 234, height: 155, left: 50, right: 4, live: true, time: "20:15 – ▶ LIVE", title: "Mリーグ第112戦", sub: "フェニックス・ドリブンズ", tagColor: "#f0c86d", tagTextColor: "#0b0b09", tag: "M·L" },
      { top: 288, height: 72, left: 4, right: 50, time: "21:00", title: "雀王A 2卓", sub: "金子・矢島", tagColor: "#1d4ed8", tag: "NPM" },
      { top: 360, height: 95, time: "22:00 決勝", title: "Classic決勝", sub: "村上淳・石井一馬・渋川難波・多井隆晴", tagColor: "#0b0b09", tag: "SAIKOU" },
      { top: 360, height: 72, left: 50, right: 4, time: "22:00", title: "女流桜花A", sub: "宮内・手塚 他", tagColor: "#c8282a", tag: "JPML" },
      { top: 432, height: 60, left: 4, right: 50, time: "22:30", title: "闘魂杯予選", tagColor: "#a07e28", tag: "RMU" },
    ],
  },
  // Wed 22
  {
    events: [
      { top: 144, height: 138, time: "19:00 – 21:20", title: "Mリーグ第113戦", sub: "格闘倶楽部・Pirates・サクラナイツ・雷電", tagColor: "#a07e28", tag: "M·L" },
      { top: 180, height: 95, left: 50, right: 4, time: "19:30", title: "十段位戦本戦", sub: "1回戦", tagColor: "#c8282a", tag: "JPML" },
      { top: 360, height: 110, time: "22:00", title: "雀竜位戦予選", sub: "Cリーグ 3卓", tagColor: "#1d4ed8", tag: "NPM" },
    ],
  },
  // Thu 23
  {
    events: [
      { top: 144, height: 138, time: "19:00", title: "Mリーグ第114戦", sub: "BEAST X・EARTH JETS・ABEMAS・フェニックス", tagColor: "#a07e28", tag: "M·L" },
      { top: 198, height: 95, left: 50, right: 4, time: "19:45", title: "最高位戦B1", sub: "第4節", tagColor: "#0b0b09", tag: "SAIKOU" },
      { top: 360, height: 72, time: "22:00", title: "BIG1カップ予選", tagColor: "#4b2a7a", tag: "μ" },
    ],
  },
  // Fri 24
  {
    events: [
      { top: 144, height: 138, time: "19:00", title: "Mリーグ第115戦", sub: "格闘倶楽部・ドリブンズ・風林火山・サクラナイツ", tagColor: "#a07e28", tag: "M·L" },
      { top: 180, height: 110, left: 50, right: 4, time: "19:30 決勝", title: "王位戦決勝", sub: "魚谷・和久津・松本", tagColor: "#c8282a", tag: "JPML" },
      { top: 360, height: 72, time: "22:00", title: "令昭位戦A", sub: "第5節", tagColor: "#a07e28", tag: "RMU" },
    ],
  },
  // Sat 25
  {
    events: [
      { top: 72, height: 72, time: "18:00", title: "雀王戦A 最終節", tagColor: "#1d4ed8", tag: "NPM" },
      { top: 144, height: 215, time: "19:00 – 22:30 決勝", title: "闘魂杯 本戦", sub: "雀魂使用オンライン · トーナメント", tagColor: "#a07e28", tag: "RMU" },
      { top: 360, height: 95, time: "22:00", title: "將妃戦本戦", tagColor: "#4b2a7a", tag: "μ" },
    ],
  },
  // Sun 26
  {
    events: [
      { top: 72, height: 155, time: "18:00 – 20:30", title: "新人王戦決勝", sub: "連盟若手8名による", tagColor: "#c8282a", tag: "JPML" },
      { top: 252, height: 120, time: "21:00 決勝", title: "日本オープン決勝", sub: "協会選抜", tagColor: "#1d4ed8", tag: "NPM" },
    ],
  },
];

type DayHeader = { dow: string; label: string; today?: boolean; sat?: boolean; sun?: boolean };
const DAY_HEADERS: DayHeader[] = [
  { dow: "Mon · 月", label: "20" },
  { dow: "Tue · 火 · TODAY", label: "21", today: true },
  { dow: "Wed · 水", label: "22" },
  { dow: "Thu · 木", label: "23" },
  { dow: "Fri · 金", label: "24" },
  { dow: "Sat · 土", label: "25", sat: true },
  { dow: "Sun · 日", label: "26", sun: true },
];

type MatchRow = {
  oc: string;
  time: string;
  dur?: string;
  statusKind: "live" | "upcoming";
  statusLabel: string;
  titleText: string;
  titleHref?: string;
  sub: string;
  players: Array<{ name: string; lead?: boolean }>;
  org: string;
  action: string;
  actionWatch?: boolean;
  ch: string;
};

type DaySection = {
  big: string;
  dow: string;
  meta: string;
  today?: boolean;
  matches: MatchRow[];
};

const DAY_SECTIONS: DaySection[] = [
  {
    big: "04.21",
    dow: "TUE · 火 · TODAY",
    meta: "LIVE NOW · 19:32 JST",
    today: true,
    matches: [
      {
        oc: "#f0c86d",
        time: "19:30",
        dur: "〜 22:00",
        statusKind: "live",
        statusLabel: "LIVE",
        titleText: "鳳凰位戦A1 第5節B卓",
        sub: "第42期 · 第3回戦 東4局 · 連盟チャンネル",
        players: [{ name: "瀬戸熊", lead: true }, { name: "前原" }, { name: "滝沢" }, { name: "佐々木" }],
        org: "JPML · 鳳凰位",
        action: "▶ 視聴",
        actionWatch: true,
        ch: "連盟チャンネル",
      },
      {
        oc: "#d4b94e",
        time: "20:15",
        dur: "〜 22:45",
        statusKind: "live",
        statusLabel: "LIVE",
        titleText: "Mリーグ第112戦",
        sub: "第8シーズン · レギュラー · ABEMA",
        players: [{ name: "魚谷" }, { name: "園田" }, { name: "日向" }, { name: "二階堂" }],
        org: "M·LEAGUE",
        action: "▶ 視聴",
        actionWatch: true,
        ch: "ABEMA",
      },
      {
        oc: "#1d4ed8",
        time: "21:00",
        dur: "〜 23:00",
        statusKind: "upcoming",
        statusLabel: "予定",
        titleText: "雀王戦A 2卓",
        sub: "第25期 · 第9節 · 協会チャンネル",
        players: [{ name: "金子" }, { name: "矢島" }, { name: "浅井" }, { name: "水巻" }],
        org: "NPM · 雀王",
        action: "通知",
        ch: "28分後",
      },
      {
        oc: "#0b0b09",
        time: "22:00",
        dur: "決勝",
        statusKind: "upcoming",
        statusLabel: "決勝",
        titleText: "最高位戦Classic 決勝",
        titleHref: "/titles/houou-isen",
        sub: "第23回 · 4名による最終卓 · 最高位戦ch",
        players: [{ name: "村上" }, { name: "石井" }, { name: "渋川" }, { name: "多井" }],
        org: "SAIKOUISEN",
        action: "通知",
        ch: "1時間28分後",
      },
      {
        oc: "#c8282a",
        time: "22:00",
        dur: "〜 0:30",
        statusKind: "upcoming",
        statusLabel: "予定",
        titleText: "女流桜花A 第6節",
        sub: "連盟 · 女流最高峰タイトル",
        players: [{ name: "宮内" }, { name: "手塚" }, { name: "清水" }, { name: "優月" }],
        org: "JPML · 桜花",
        action: "通知",
        ch: "連盟ch",
      },
      {
        oc: "#a07e28",
        time: "22:30",
        dur: "予選",
        statusKind: "upcoming",
        statusLabel: "予定",
        titleText: "闘魂杯 予選オンライン",
        sub: "雀魂使用 · 本戦進出4名決定",
        players: [{ name: "多井" }, { name: "阿部" }, { name: "河野" }, { name: "他" }],
        org: "RMU · 闘魂杯",
        action: "通知",
        ch: "雀魂観戦",
      },
      {
        oc: "#4b2a7a",
        time: "23:00",
        dur: "道場対抗",
        statusKind: "upcoming",
        statusLabel: "予定",
        titleText: "μ 道場対抗戦 第3戦",
        sub: "新宿道場 vs 横浜道場",
        players: [{ name: "小林" }, { name: "忍田" }, { name: "古久根" }, { name: "他" }],
        org: "MUJIN · μ",
        action: "通知",
        ch: "μ-TV",
      },
    ],
  },
  {
    big: "04.22",
    dow: "WED · 水 · 明日",
    meta: "4 MATCHES",
    matches: [
      {
        oc: "#d4b94e", time: "19:00", dur: "〜 21:30", statusKind: "upcoming", statusLabel: "予定",
        titleText: "Mリーグ第113戦", sub: "第8シーズン · ABEMA",
        players: [{ name: "佐々木" }, { name: "鈴木優" }, { name: "内川" }, { name: "黒沢" }],
        org: "M·LEAGUE", action: "通知", ch: "ABEMA",
      },
      {
        oc: "#c8282a", time: "19:30", dur: "本戦", statusKind: "upcoming", statusLabel: "予定",
        titleText: "十段位戦本戦 1回戦", sub: "第63期 · 前原・森山など8名",
        players: [{ name: "前原" }, { name: "森山" }, { name: "藤崎" }, { name: "他" }],
        org: "JPML · 十段", action: "通知", ch: "連盟ch",
      },
      {
        oc: "#1d4ed8", time: "22:00", dur: "予選", statusKind: "upcoming", statusLabel: "予定",
        titleText: "雀竜位戦C 3卓", sub: "第25期 · 第7節",
        players: [{ name: "仲林" }, { name: "浅井" }, { name: "鈴木" }, { name: "他" }],
        org: "NPM", action: "通知", ch: "協会ch",
      },
      {
        oc: "#4b2a7a", time: "23:00", dur: "道場対抗", statusKind: "upcoming", statusLabel: "予定",
        titleText: "μ 道場対抗戦 第4戦", sub: "大阪道場 vs 仙台道場",
        players: [{ name: "忍田" }, { name: "古久根" }, { name: "他" }],
        org: "MUJIN · μ", action: "通知", ch: "μ-TV",
      },
    ],
  },
  {
    big: "04.23", dow: "THU · 木", meta: "3 MATCHES",
    matches: [
      {
        oc: "#d4b94e", time: "19:00", dur: "〜 21:30", statusKind: "upcoming", statusLabel: "予定",
        titleText: "Mリーグ第114戦", sub: "第8シーズン · ABEMA",
        players: [{ name: "中田" }, { name: "和久津" }, { name: "松本" }, { name: "醍醐" }],
        org: "M·LEAGUE", action: "通知", ch: "ABEMA",
      },
      {
        oc: "#0b0b09", time: "19:45", dur: "B1", statusKind: "upcoming", statusLabel: "予定",
        titleText: "最高位戦B1 第4節", sub: "第50期 · 村上淳 他",
        players: [{ name: "村上" }, { name: "石井" }, { name: "近藤" }, { name: "他" }],
        org: "SAIKOUISEN", action: "通知", ch: "最高位戦ch",
      },
      {
        oc: "#4b2a7a", time: "22:00", dur: "予選", statusKind: "upcoming", statusLabel: "予定",
        titleText: "BIG1カップ予選", sub: "第36回 · μ選抜",
        players: [{ name: "小林" }, { name: "忍田" }, { name: "他" }],
        org: "MUJIN · μ", action: "通知", ch: "μ-TV",
      },
    ],
  },
  {
    big: "04.24", dow: "FRI · 金", meta: "3 MATCHES · 1 決勝",
    matches: [
      {
        oc: "#d4b94e", time: "19:00", dur: "〜 21:30", statusKind: "upcoming", statusLabel: "予定",
        titleText: "Mリーグ第115戦", sub: "第8シーズン · ABEMA",
        players: [{ name: "佐々木" }, { name: "園田" }, { name: "二階堂" }, { name: "内川" }],
        org: "M·LEAGUE", action: "通知", ch: "ABEMA",
      },
      {
        oc: "#c8282a", time: "19:30", dur: "決勝", statusKind: "upcoming", statusLabel: "決勝",
        titleText: "王位戦決勝", sub: "第48期 · 連盟女流3番勝負 第2戦",
        players: [{ name: "魚谷" }, { name: "和久津" }, { name: "松本" }],
        org: "JPML · 王位", action: "通知", ch: "連盟ch",
      },
      {
        oc: "#a07e28", time: "22:00", dur: "第5節", statusKind: "upcoming", statusLabel: "予定",
        titleText: "令昭位戦A 第5節", sub: "第18期 · RMUチャンネル",
        players: [{ name: "多井" }, { name: "阿部" }, { name: "河野" }, { name: "他" }],
        org: "RMU · 令昭", action: "通知", ch: "RMUch",
      },
    ],
  },
  {
    big: "04.25", dow: "SAT · 土", meta: "3 MATCHES · 1 本戦",
    matches: [
      {
        oc: "#1d4ed8", time: "18:00", dur: "最終節", statusKind: "upcoming", statusLabel: "予定",
        titleText: "雀王戦A 最終節", sub: "第25期 · 昇降級決定 · 協会ch",
        players: [{ name: "金子", lead: true }, { name: "矢島" }, { name: "浅井" }, { name: "水巻" }],
        org: "NPM · 雀王", action: "通知", ch: "協会ch",
      },
      {
        oc: "#a07e28", time: "19:00", dur: "〜 22:30 本戦", statusKind: "upcoming", statusLabel: "本戦",
        titleText: "RMU 闘魂杯 本戦", sub: "雀魂オンライン · トーナメント · 優勝者決定戦",
        players: [{ name: "多井" }, { name: "阿部" }, { name: "河野" }, { name: "他" }],
        org: "RMU · 闘魂杯", action: "通知", ch: "雀魂観戦",
      },
      {
        oc: "#4b2a7a", time: "22:00", dur: "本戦", statusKind: "upcoming", statusLabel: "本戦",
        titleText: "將妃戦本戦", sub: "第22回 · μ女流タイトル",
        players: [{ name: "櫻田" }, { name: "松本" }, { name: "他" }],
        org: "MUJIN · 將妃", action: "通知", ch: "μ-TV",
      },
    ],
  },
  {
    big: "04.26", dow: "SUN · 日", meta: "2 MATCHES · 2 決勝",
    matches: [
      {
        oc: "#c8282a", time: "18:00", dur: "決勝", statusKind: "upcoming", statusLabel: "決勝",
        titleText: "新人王戦決勝", sub: "連盟若手若手最強決定戦 · 8名トーナメント",
        players: [{ name: "本田" }, { name: "優月" }, { name: "黒田" }, { name: "他" }],
        org: "JPML · 新人王", action: "通知", ch: "連盟ch",
      },
      {
        oc: "#1d4ed8", time: "21:00", dur: "決勝", statusKind: "upcoming", statusLabel: "決勝",
        titleText: "日本オープン決勝", sub: "第32回 · 協会選抜 4名",
        players: [{ name: "矢島" }, { name: "浅井" }, { name: "水巻" }, { name: "仲林" }],
        org: "NPM · 日本オープン", action: "通知", ch: "協会ch",
      },
    ],
  },
];

type MiniDay = { label: string; kind?: "other" | "has" | "selected has" | "today has" };
const MINI_DAYS: MiniDay[] = [
  { label: "31", kind: "other" }, { label: "1", kind: "has" }, { label: "2", kind: "has" }, { label: "3" }, { label: "4", kind: "has" }, { label: "5", kind: "has" }, { label: "6", kind: "has" },
  { label: "7", kind: "has" }, { label: "8", kind: "has" }, { label: "9", kind: "has" }, { label: "10", kind: "has" }, { label: "11", kind: "has" }, { label: "12", kind: "has" }, { label: "13", kind: "has" },
  { label: "14", kind: "has" }, { label: "15", kind: "has" }, { label: "16", kind: "has" }, { label: "17", kind: "has" }, { label: "18", kind: "has" }, { label: "19", kind: "has" }, { label: "20", kind: "has" },
  { label: "21", kind: "selected has" }, { label: "22", kind: "has" }, { label: "23", kind: "has" }, { label: "24", kind: "has" }, { label: "25", kind: "has" }, { label: "26", kind: "has" }, { label: "27", kind: "has" },
  { label: "28", kind: "today has" }, { label: "29", kind: "has" }, { label: "30", kind: "has" }, { label: "1", kind: "other" }, { label: "2", kind: "other" }, { label: "3", kind: "other" }, { label: "4", kind: "other" },
];

type JumpItem = { d: string; dow: string; title: string; sub: string; c: string };
const JUMPS: JumpItem[] = [
  { d: "21", dow: "TUE", title: "最高位戦Classic 決勝", sub: "22:00 · 4名最終卓", c: "今日" },
  { d: "24", dow: "FRI", title: "王位戦 決勝 第2戦", sub: "19:30 · 連盟女流3番勝負", c: "+3日" },
  { d: "25", dow: "SAT", title: "RMU闘魂杯 本戦", sub: "19:00 · 雀魂オンライン", c: "+4日" },
  { d: "26", dow: "SUN", title: "日本オープン 決勝", sub: "21:00 · 第32回", c: "+5日" },
  { d: "28", dow: "TUE", title: "鳳凰位戦A1 第6節", sub: "19:30 · 瀬戸熊 独走中", c: "+7日" },
];

type Channel = { badge: React.ReactNode; name: string; sub: string; status: React.ReactNode };
const CHANNELS: Channel[] = [
  { badge: "ABEMA", name: "Mリーグ", sub: "月〜金 19:00〜 · 無料", status: <div className="live-tag">● LIVE</div> },
  { badge: <>連盟<br />CH</>, name: "麻雀連盟チャンネル", sub: "鳳凰位・十段位・王位・桜花", status: <div className="live-tag">● LIVE</div> },
  { badge: <>協会<br />CH</>, name: "協会チャンネル", sub: "雀王・雀竜位・日本オープン", status: <div style={{ fontFamily: "'Geist Mono'", fontSize: 10, color: "var(--ink-3)", fontWeight: 600 }}>21:00〜</div> },
  { badge: <>最高<br />位戦</>, name: "最高位戦ch", sub: "最高位・Classic・發王", status: <div style={{ fontFamily: "'Geist Mono'", fontSize: 10, color: "var(--ink-3)", fontWeight: 600 }}>22:00〜</div> },
  { badge: <>RMU<br />ch</>, name: "RMUチャンネル", sub: "令昭位・クラウン・闘魂杯", status: <div style={{ fontFamily: "'Geist Mono'", fontSize: 10, color: "var(--ink-3)", fontWeight: 600 }}>22:30〜</div> },
  { badge: <>μ-<br />TV</>, name: "麻将連合TV", sub: "μリーグ・BIG1・將妃", status: <div style={{ fontFamily: "'Geist Mono'", fontSize: 10, color: "var(--ink-3)", fontWeight: 600 }}>23:00〜</div> },
];

const HOURS = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

export default function SchedulePage() {
  return (
    <div className="wrap">
      <section className="sc-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>対局スケジュール</span>
        </div>
        <h1>
          対局スケジュール<span className="en">Match Schedule</span>
        </h1>
        <div className="range">
          <button className="navbtn">‹</button>
          <div className="wk">
            4月20日 ― 4月26日<span className="sub">Week 17 · 2026 · April</span>
          </div>
          <button className="navbtn">›</button>
          <div className="counts">
            <div className="c">
              <div className="l">This Week</div>
              <div className="v">
                31
                <span style={{ fontSize: 16, fontFamily: "'Noto Sans JP'", fontWeight: 500, marginLeft: 4 }}>試合</span>
              </div>
            </div>
            <div className="c">
              <div className="l">Live Now</div>
              <div className="v red">02</div>
            </div>
            <div className="c">
              <div className="l">Today</div>
              <div className="v gold">07</div>
            </div>
          </div>
        </div>
      </section>

      <div className="filter-bar">
        <span className="label">Org</span>
        <div className="pills">
          <span className="pill on">すべて</span>
          <span className="pill"><span className="dot" style={{ background: "#c8282a" }}></span>連盟</span>
          <span className="pill"><span className="dot" style={{ background: "#1d4ed8" }}></span>協会</span>
          <span className="pill"><span className="dot" style={{ background: "#0b0b09" }}></span>最高位戦</span>
          <span className="pill"><span className="dot" style={{ background: "#a07e28" }}></span>RMU</span>
          <span className="pill"><span className="dot" style={{ background: "#4b2a7a" }}></span>μ</span>
          <span className="pill"><span className="dot" style={{ background: "#d4b94e" }}></span>Mリーグ</span>
        </div>
        <div className="sep-v"></div>
        <span className="label">Tier</span>
        <div className="pills">
          <span className="pill on">All</span>
          <span className="pill">タイトル戦</span>
          <span className="pill">リーグ</span>
          <span className="pill">予選</span>
        </div>
        <div className="sep-v"></div>
        <span className="label">Status</span>
        <div className="pills">
          <span className="pill on">配信あり</span>
          <span className="pill">観戦券</span>
        </div>
        <div className="view">
          <button className="on">週</button>
          <button>日</button>
          <button>月</button>
          <button>リスト</button>
        </div>
      </div>

      <div className="cal-two">
        <div>
          <section className="cal-wrap">
            <div className="cal-head-row">
              <div className="corner">JST</div>
              {DAY_HEADERS.map((h) => (
                <div
                  key={h.label}
                  className={["day", h.today ? "today" : "", h.sat ? "sat" : "", h.sun ? "sun" : ""].filter(Boolean).join(" ")}
                >
                  <div className="dow">{h.dow}</div>
                  <div className="dt">
                    {h.label}
                    <span className="n">April</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="cal-body">
              <div className="hour-col">
                {HOURS.map((h) => (
                  <div key={h} className="hour">
                    {h}
                  </div>
                ))}
              </div>

              {DAY_COLS.map((col, i) => (
                <div key={i} className={`day-col ${col.today ? "today" : ""}`.trim()}>
                  {HOURS.map((_, idx) => (
                    <div key={idx} className="hour"></div>
                  ))}
                  {col.events.map((ev, idx) => {
                    const style: React.CSSProperties = {
                      top: ev.top,
                      height: ev.height,
                    };
                    if (ev.left !== undefined) style.left = `${ev.left}%`;
                    if (ev.right !== undefined) style.right = `${ev.right}%`;
                    return (
                      <div key={idx} className={`event ${ev.live ? "live" : ""}`.trim()} style={style}>
                        <div className="tm">{ev.time}</div>
                        <div className="tl">{ev.title}</div>
                        {ev.sub && <div className="sub">{ev.sub}</div>}
                        <span
                          className="org-tag"
                          style={{ background: ev.tagColor, color: ev.tagTextColor }}
                        >
                          {ev.tag}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}

              <div className="now-line" style={{ top: 189 }}>
                <span className="now-label">NOW 19:32</span>
              </div>
            </div>
          </section>

          <section className="list-wrap">
            <div className="list-head">
              <div className="ttl">
                本日の対局<span className="en">Today · Tuesday, April 21</span>
              </div>
              <div className="count">7 MATCHES · 2 LIVE</div>
            </div>

            {DAY_SECTIONS.map((ds) => (
              <div key={ds.big} className="day-section">
                <div className={`day-header ${ds.today ? "today" : ""}`.trim()}>
                  <span className="big">{ds.big}</span>
                  <span className="dow">{ds.dow}</span>
                  <span className="meta">{ds.meta}</span>
                </div>
                {ds.matches.map((m, idx) => (
                  <div
                    key={idx}
                    className="match-row"
                    style={{ ["--oc" as string]: m.oc } as React.CSSProperties}
                  >
                    <div className="time">
                      {m.time}
                      {m.dur && <span className="dur">{m.dur}</span>}
                    </div>
                    <div className={`status ${m.statusKind}`}>{m.statusLabel}</div>
                    <div className="title">
                      <h4>
                        {m.titleHref ? (
                          <Link href={m.titleHref}>{m.titleText}</Link>
                        ) : (
                          <a>{m.titleText}</a>
                        )}
                      </h4>
                      <div className="sub">{m.sub}</div>
                    </div>
                    <div className="players">
                      {m.players.map((p, i) => (
                        <span key={i} className={`p ${p.lead ? "lead" : ""}`.trim()}>
                          {p.name}
                        </span>
                      ))}
                    </div>
                    <div className="org-tag">
                      <span className="bar"></span>
                      {m.org}
                    </div>
                    <div className={`action ${m.actionWatch ? "watch" : ""}`.trim()}>
                      {m.action}
                      <span className="ch">{m.ch}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </section>
        </div>

        <aside>
          <section className="side-card">
            <h3>
              月間カレンダー<span className="en">April 2026</span>
            </h3>
            <div className="mini-cal">
              <div className="dow-h">M</div>
              <div className="dow-h">T</div>
              <div className="dow-h">W</div>
              <div className="dow-h">T</div>
              <div className="dow-h">F</div>
              <div className="dow-h sat">S</div>
              <div className="dow-h sun">S</div>
              {MINI_DAYS.map((d, i) => (
                <div key={i} className={`d ${d.kind ?? ""}`.trim()}>
                  {d.label}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px dotted var(--ink-4)",
                display: "flex",
                gap: 14,
                fontSize: 10.5,
                color: "var(--ink-3)",
              }}
            >
              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "var(--vermilion)",
                    marginRight: 5,
                  }}
                ></span>
                対局あり
              </span>
              <span style={{ border: "1.5px solid var(--ink)", padding: "0 3px" }}>今日</span>
              <span style={{ background: "var(--vermilion)", color: "var(--paper)", padding: "0 4px" }}>選択中</span>
            </div>
          </section>

          <section className="side-card">
            <h3>
              今月のハイライト<span className="en">Key Dates</span>
            </h3>
            <div className="jump-list">
              {JUMPS.map((j) => (
                <div key={j.d + j.title} className="jump-item">
                  <div className="d">
                    {j.d}
                    <small>{j.dow}</small>
                  </div>
                  <div className="t">
                    {j.title}
                    <small>{j.sub}</small>
                  </div>
                  <div className="c">{j.c}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="side-card">
            <h3>
              配信チャンネル<span className="en">Broadcasters</span>
            </h3>
            <div className="ch-list">
              {CHANNELS.map((c, i) => (
                <div key={i} className="ch-item">
                  <div className="badge">{c.badge}</div>
                  <div className="nm">
                    {c.name}
                    <small>{c.sub}</small>
                  </div>
                  {c.status}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
