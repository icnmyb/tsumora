import Link from "next/link";

type Standing = {
  rank: string;
  rankClass?: string;
  rowClass?: string;
  avatar: string;
  name: string;
  href?: string;
  sub: string;
  total: { v: string; sign: "p" | "m" };
  rounds: Array<{ v: string; sign: "p" | "m" }>;
  status: "safe" | "danger";
  statusLabel: string;
  dangerRank?: boolean;
};

const STANDINGS: Standing[] = [
  {
    rank: "一",
    rankClass: "r1",
    rowClass: "lead",
    avatar: "瀬",
    name: "瀬戸熊 直樹",
    href: "/players/setokuma",
    sub: "連盟 · 第39・40・41期鳳凰位（3連覇中）",
    total: { v: "+124.5", sign: "p" },
    rounds: [
      { v: "+28.3", sign: "p" },
      { v: "+15.8", sign: "p" },
      { v: "+42.1", sign: "p" },
      { v: "−9.9", sign: "m" },
      { v: "+48.2", sign: "p" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "二",
    rankClass: "r2",
    avatar: "前",
    name: "前原 雄大",
    sub: "連盟 · 第33・36期鳳凰位",
    total: { v: "+87.3", sign: "p" },
    rounds: [
      { v: "+22.4", sign: "p" },
      { v: "+18.1", sign: "p" },
      { v: "−5.2", sign: "m" },
      { v: "+34.3", sign: "p" },
      { v: "+17.7", sign: "p" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "三",
    rankClass: "r3",
    avatar: "佐",
    name: "佐々木 寿人",
    sub: "連盟 · 十段位×3 · 攻撃型の代名詞",
    total: { v: "+41.8", sign: "p" },
    rounds: [
      { v: "+12.5", sign: "p" },
      { v: "−14.2", sign: "m" },
      { v: "+28.7", sign: "p" },
      { v: "+19.4", sign: "p" },
      { v: "−4.6", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "四",
    avatar: "滝",
    name: "滝沢 和典",
    sub: "連盟 · 第38期鳳凰位",
    total: { v: "−22.4", sign: "m" },
    rounds: [
      { v: "−8.1", sign: "m" },
      { v: "+5.3", sign: "p" },
      { v: "−12.8", sign: "m" },
      { v: "−14.6", sign: "m" },
      { v: "+7.8", sign: "p" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "五",
    avatar: "HI",
    name: "HIRO柴田",
    sub: "連盟 · 第34期鳳凰位",
    total: { v: "−67.1", sign: "m" },
    rounds: [
      { v: "−15.3", sign: "m" },
      { v: "−8.9", sign: "m" },
      { v: "−22.4", sign: "m" },
      { v: "−11.2", sign: "m" },
      { v: "−9.3", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "六",
    avatar: "山",
    name: "山井 弘",
    sub: "連盟 · 第35期鳳凰位",
    total: { v: "−74.8", sign: "m" },
    rounds: [
      { v: "−12.4", sign: "m" },
      { v: "−5.8", sign: "m" },
      { v: "−18.9", sign: "m" },
      { v: "−22.1", sign: "m" },
      { v: "−15.6", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "七",
    avatar: "古",
    name: "古久根 英孝",
    sub: "連盟",
    total: { v: "−82.3", sign: "m" },
    rounds: [
      { v: "−18.1", sign: "m" },
      { v: "−14.2", sign: "m" },
      { v: "−9.8", sign: "m" },
      { v: "−28.4", sign: "m" },
      { v: "−11.8", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "八",
    avatar: "吉",
    name: "吉田 直",
    sub: "連盟",
    total: { v: "−95.4", sign: "m" },
    rounds: [
      { v: "−22.3", sign: "m" },
      { v: "−18.7", sign: "m" },
      { v: "−14.1", sign: "m" },
      { v: "−24.2", sign: "m" },
      { v: "−16.1", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "九",
    avatar: "黒",
    name: "黒沢 咲",
    sub: "連盟 · 女流初のA1昇格",
    total: { v: "−108.2", sign: "m" },
    rounds: [
      { v: "−25.8", sign: "m" },
      { v: "−12.4", sign: "m" },
      { v: "−28.3", sign: "m" },
      { v: "−18.9", sign: "m" },
      { v: "−22.8", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "十",
    avatar: "柴",
    name: "柴田 吉和",
    sub: "連盟",
    total: { v: "−115.7", sign: "m" },
    rounds: [
      { v: "−28.4", sign: "m" },
      { v: "−18.3", sign: "m" },
      { v: "−22.1", sign: "m" },
      { v: "−29.2", sign: "m" },
      { v: "−17.7", sign: "m" },
    ],
    status: "safe",
    statusLabel: "SAFE",
  },
  {
    rank: "十一",
    rowClass: "danger",
    dangerRank: true,
    avatar: "近",
    name: "近藤 久春",
    sub: "連盟",
    total: { v: "−132.4", sign: "m" },
    rounds: [
      { v: "−32.1", sign: "m" },
      { v: "−18.4", sign: "m" },
      { v: "−28.6", sign: "m" },
      { v: "−33.2", sign: "m" },
      { v: "−20.1", sign: "m" },
    ],
    status: "danger",
    statusLabel: "危険",
  },
  {
    rank: "十二",
    rowClass: "danger",
    dangerRank: true,
    avatar: "望",
    name: "望月 雅継",
    sub: "連盟",
    total: { v: "−148.9", sign: "m" },
    rounds: [
      { v: "−38.4", sign: "m" },
      { v: "−22.8", sign: "m" },
      { v: "−28.1", sign: "m" },
      { v: "−34.6", sign: "m" },
      { v: "−25.0", sign: "m" },
    ],
    status: "danger",
    statusLabel: "危険",
  },
  {
    rank: "十三",
    rowClass: "danger",
    dangerRank: true,
    avatar: "藤",
    name: "藤崎 智",
    sub: "連盟 · 第32期鳳凰位",
    total: { v: "−165.2", sign: "m" },
    rounds: [
      { v: "−42.1", sign: "m" },
      { v: "−28.4", sign: "m" },
      { v: "−32.8", sign: "m" },
      { v: "−38.2", sign: "m" },
      { v: "−23.7", sign: "m" },
    ],
    status: "danger",
    statusLabel: "降級圏",
  },
  {
    rank: "十四",
    rowClass: "danger",
    dangerRank: true,
    avatar: "伊",
    name: "伊藤 大輔",
    sub: "連盟",
    total: { v: "−184.3", sign: "m" },
    rounds: [
      { v: "−48.2", sign: "m" },
      { v: "−32.1", sign: "m" },
      { v: "−38.4", sign: "m" },
      { v: "−42.8", sign: "m" },
      { v: "−22.8", sign: "m" },
    ],
    status: "danger",
    statusLabel: "降級圏",
  },
];

type ScheduleItem = {
  date: string;
  year: string;
  status: "done" | "live" | "plan";
  statusLabel: string;
  title: string;
  sub?: string;
  players: string;
};

const SCHEDULE: ScheduleItem[] = [
  { date: "11/18", year: "2025", status: "done", statusLabel: "終了", title: "第1節 A卓·B卓·C卓", sub: "首位：瀬戸熊 +28.3 · 最下位：伊藤 −48.2", players: "14名出場" },
  { date: "12/16", year: "2025", status: "done", statusLabel: "終了", title: "第2節 A卓·B卓·C卓", sub: "首位：瀬戸熊 +44.1 · 変動小", players: "14名出場" },
  { date: "01/20", year: "2026", status: "done", statusLabel: "終了", title: "第3節 A卓·B卓·C卓", sub: "佐々木トップ獲得 +28.7", players: "14名出場" },
  { date: "03/17", year: "2026", status: "done", statusLabel: "終了", title: "第4節 A卓·B卓·C卓", sub: "前原が2位に浮上", players: "14名出場" },
  { date: "04/21", year: "今日", status: "live", statusLabel: "● LIVE", title: "第5節 B卓 · 第3回戦", sub: "瀬戸熊 / 前原 / 滝沢 / 佐々木 · 麻雀連盟チャンネル 19:30〜", players: "4名 · 4回戦" },
  { date: "05/19", year: "2026", status: "plan", statusLabel: "予定", title: "第6節 A卓·B卓·C卓", sub: "折り返し地点", players: "14名出場" },
  { date: "06/16", year: "2026", status: "plan", statusLabel: "予定", title: "第7節 A卓·B卓·C卓", players: "14名出場" },
  { date: "07/14", year: "2026", status: "plan", statusLabel: "予定", title: "第8節 A卓·B卓·C卓", players: "14名出場" },
  { date: "08/18", year: "2026", status: "plan", statusLabel: "予定", title: "第9節 A卓·B卓·C卓", players: "14名出場" },
  { date: "09/15", year: "2026", status: "plan", statusLabel: "予定", title: "第10節 最終 A卓·B卓·C卓", sub: "鳳凰位決定戦進出者4名確定", players: "14名 · 最終節" },
  { date: "10/27", year: "2026", status: "plan", statusLabel: "決勝", title: "鳳凰位決定戦 第1日", sub: "全4日制 · A1上位4名", players: "4名" },
];

const RULE_ROWS: Array<{ l: string; v: string }> = [
  { l: "持ち点", v: "30,000" },
  { l: "配給原点", v: "30,000" },
  { l: "オカ", v: "あり" },
  { l: "ウマ", v: "10-20" },
  { l: "赤牌", v: "なし" },
  { l: "喰いタン", v: "あり" },
  { l: "後付け", v: "あり" },
  { l: "流局時", v: "ノーテン罰符" },
  { l: "順位計算", v: "1位±" },
  { l: "一節", v: "4回戦" },
];

type LeagueTier = { code: string; title: string; desc: string; highlight?: boolean };
const LEAGUE_TIERS: LeagueTier[] = [
  { code: "A1", title: "最高峰 · 14名", desc: "上位4名→鳳凰位決定戦 / 下位4名→A2降級", highlight: true },
  { code: "A2", title: "28名", desc: "上位4名→A1昇格 / 下位6名→B降級" },
  { code: "B", title: "56名", desc: "上位6名昇格 / 下位10名降級" },
  { code: "C", title: "100名超", desc: "上位10名昇格" },
  { code: "D", title: "約300名", desc: "連盟所属プロの登竜門" },
];

type HistoryItem = { ep: string; champ: string; href?: string; yr: string; cnt: string; cntLabel: string; current?: boolean };
const HISTORY: HistoryItem[] = [
  { ep: "42", champ: "瀬戸熊 直樹（首位進行中）", href: "/players/setokuma", yr: "2025-26 · 4連覇なるか", cnt: "+124.5", cntLabel: "現在", current: true },
  { ep: "41", champ: "瀬戸熊 直樹", yr: "2024-25 · 3連覇達成", cnt: "+248", cntLabel: "総pt" },
  { ep: "40", champ: "瀬戸熊 直樹", yr: "2023-24 · 2連覇", cnt: "+186", cntLabel: "総pt" },
  { ep: "39", champ: "瀬戸熊 直樹", yr: "2022-23 · 初戴冠", cnt: "+142", cntLabel: "総pt" },
  { ep: "38", champ: "滝沢 和典", yr: "2021-22", cnt: "+98", cntLabel: "総pt" },
  { ep: "37", champ: "佐々木 寿人", yr: "2020-21", cnt: "+124", cntLabel: "総pt" },
  { ep: "36", champ: "前原 雄大", yr: "2019-20 · 2度目", cnt: "+88", cntLabel: "総pt" },
  { ep: "35", champ: "山井 弘", yr: "2018-19", cnt: "+72", cntLabel: "総pt" },
  { ep: "34", champ: "HIRO柴田", yr: "2017-18", cnt: "+64", cntLabel: "総pt" },
  { ep: "33", champ: "前原 雄大", yr: "2016-17 · 初戴冠", cnt: "+92", cntLabel: "総pt" },
];

type Crown = { rk: string; rkClass?: string; avatar: string; name: string; sub: string; cnt: string };
const CROWNS: Crown[] = [
  { rk: "一", rkClass: "r1", avatar: "瀬", name: "瀬戸熊 直樹", sub: "第39·40·41期 · 3連覇中", cnt: "3" },
  { rk: "二", rkClass: "r2", avatar: "前", name: "前原 雄大", sub: "第33·36期", cnt: "2" },
  { rk: "三", rkClass: "r3", avatar: "藤", name: "藤崎 智", sub: "第30·32期", cnt: "2" },
  { rk: "四", avatar: "滝", name: "滝沢 和典", sub: "第38期", cnt: "1" },
  { rk: "五", avatar: "佐", name: "佐々木 寿人", sub: "第37期", cnt: "1" },
];

export default function HouoiPage() {
  return (
    <div className="wrap">
      <section className="title-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <Link href="#">Titles</Link>
          <span className="sep">›</span>
          <Link href="/organizations/jpml">JPML</Link>
          <span className="sep">›</span>
          <span>鳳凰位戦</span>
        </div>
        <span className="org-badge-big">● JPML · 日本プロ麻雀連盟 · 最高峰タイトル</span>
        <h1>
          鳳凰位戦
          <span className="en">The Hōōi Championship · Est. 1984</span>
        </h1>
        <div className="meta-row">
          <div className="m">
            <div className="l">Current Edition</div>
            <div className="v">
              第<span style={{ color: "#f0c86d" }}>42</span>期
            </div>
            <div className="sub">2025.10 — 2026.07</div>
          </div>
          <div className="m">
            <div className="l">Status · Round</div>
            <div className="v live">● 第5節</div>
            <div className="sub">全10節中 / A1リーグ</div>
          </div>
          <div className="m">
            <div className="l">Prize</div>
            <div className="v prize">¥5,000,000</div>
            <div className="sub">優勝賞金 · 鳳凰位</div>
          </div>
          <div className="m">
            <div className="l">Format</div>
            <div className="v">リーグ戦</div>
            <div className="sub">A1-A2-B-C-D 5部制</div>
          </div>
          <div className="m">
            <div className="l">Broadcast</div>
            <div className="v" style={{ fontSize: 18, lineHeight: 1.2 }}>
              麻雀連盟
              <br />
              チャンネル
            </div>
            <div className="sub">ニコニコ / YouTube</div>
          </div>
        </div>
      </section>

      <div className="stats-row">
        <div className="stat-card vermilion">
          <div className="lb">
            All-Time Champions <span className="en">歴代</span>
          </div>
          <div className="v">
            41<span className="u">人</span>
          </div>
          <div className="sub">過去41期 · 連覇記録 3期（瀬戸熊）</div>
        </div>
        <div className="stat-card">
          <div className="lb">
            Current Leader <span className="en">首位</span>
          </div>
          <div className="v" style={{ fontSize: 28 }}>
            瀬戸熊 直樹
          </div>
          <div
            className="sub"
            style={{ fontFamily: "'Geist Mono'", color: "var(--vermilion)", fontWeight: 700 }}
          >
            +124.5pt · 独走
          </div>
        </div>
        <div className="stat-card">
          <div className="lb">
            Remaining Rounds <span className="en">残り</span>
          </div>
          <div className="v">
            05<span className="u">節</span>
          </div>
          <div className="sub">最終節：2026.07.15</div>
        </div>
        <div className="stat-card dark">
          <div className="lb">
            Demotion Line <span className="en">降級圏</span>
          </div>
          <div className="v" style={{ color: "#ff8a72" }}>
            04
            <span className="u" style={{ color: "rgba(255,138,114,.7)" }}>
              人
            </span>
          </div>
          <div className="sub">A1→A2降級 / 現在11-14位</div>
        </div>
      </div>

      <h2 className="sh">
        <span>A1リーグ順位表</span>
        <span className="num">Current Standings</span>
        <span className="rule"></span>
        <span className="more">第5節終了時点</span>
      </h2>
      <section className="full-standings" style={{ marginBottom: 14 }}>
        <div className="fs-hd">
          <span className="ttl">
            第42期 A1リーグ <span className="en">A1 League — Round 5 / 10</span>
          </span>
          <span className="nd">全14名 · 上位2名昇格なし / 下位4名降級</span>
        </div>
        <table className="fs-table">
          <thead>
            <tr>
              <th style={{ width: 42 }}>順</th>
              <th>選手</th>
              <th className="n">総合pt</th>
              <th className="n">1節</th>
              <th className="n">2節</th>
              <th className="n">3節</th>
              <th className="n">4節</th>
              <th className="n">5節</th>
              <th style={{ width: 80 }}>状態</th>
            </tr>
          </thead>
          <tbody>
            {STANDINGS.map((s) => (
              <tr key={s.rank} className={s.rowClass}>
                <td
                  className={`rk ${s.rankClass ?? ""}`.trim()}
                  style={s.dangerRank ? { color: "var(--vermilion)" } : undefined}
                >
                  {s.rank}
                </td>
                <td>
                  <div className="player">
                    <span className="avatar">{s.avatar}</span>
                    <div>
                      <div className="name">
                        {s.href ? <Link href={s.href}>{s.name}</Link> : s.name}
                      </div>
                      <span className="sub">{s.sub}</span>
                    </div>
                  </div>
                </td>
                <td className={`n ${s.total.sign}`}>{s.total.v}</td>
                {s.rounds.map((r, i) => (
                  <td key={i} className={`n ${r.sign}`}>
                    {r.v}
                  </td>
                ))}
                <td>
                  <span className={`tag-pill ${s.status}`}>{s.statusLabel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="two-col" style={{ marginBottom: 14 }}>
        <div>
          <h2 className="sh">
            <span>対局スケジュール</span>
            <span className="num">Match Schedule</span>
            <span className="rule"></span>
            <span className="more">全節表示 →</span>
          </h2>
          <section className="sched-list">
            <div className="shd">
              <span>
                第42期 全節日程 <span className="en">Full Schedule</span>
              </span>
              <span
                style={{
                  fontFamily: "'Geist Mono'",
                  fontSize: 11,
                  color: "#f0c86d",
                  letterSpacing: "0.12em",
                }}
              >
                節5/10 進行中
              </span>
            </div>
            <ul>
              {SCHEDULE.map((item, i) => (
                <li key={i} className={item.status === "done" ? "done" : item.status === "live" ? "live" : ""}>
                  <span className="dt">
                    <b>{item.date}</b>
                    {item.year}
                  </span>
                  <span className={`status ${item.status === "done" ? "done" : item.status === "live" ? "live" : ""}`}>
                    {item.statusLabel}
                  </span>
                  <span className="title">
                    {item.title}
                    {item.sub && <span className="sub">{item.sub}</span>}
                  </span>
                  <span className="players">{item.players}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div>
          <h2 className="sh">
            <span>ルール</span>
            <span className="num">Ruleset</span>
            <span className="rule"></span>
          </h2>
          <section className="rule-box" style={{ marginBottom: 14 }}>
            <h3>
              競技ルール<span className="en">Competition Rules</span>
            </h3>
            <div className="rule-grid">
              {RULE_ROWS.map((r) => (
                <div key={r.l} className="rr">
                  <span className="l">{r.l}</span>
                  <span className="v">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="note">
              一発・裏ドラなし。Aリーグ〜Dリーグまで5部制。
              A1上位4名が鳳凰位決定戦へ進出し、4日間16回戦で鳳凰位を争う。
            </div>
          </section>

          <h2 className="sh" style={{ marginTop: 24 }}>
            <span>昇降級</span>
            <span className="num">Promotion</span>
            <span className="rule"></span>
          </h2>
          <section className="rule-box">
            <h3>
              リーグ構成<span className="en">League Structure</span>
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {LEAGUE_TIERS.map((t) => (
                <div
                  key={t.code}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    background: t.highlight ? "rgba(200,40,42,.08)" : "var(--paper-2)",
                    borderLeft: t.highlight ? "4px solid var(--vermilion)" : undefined,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Shippori Mincho'",
                      fontWeight: 900,
                      fontSize: 18,
                      width: 34,
                    }}
                  >
                    {t.code}
                  </div>
                  <div style={{ flex: 1, fontSize: 12 }}>
                    <b style={{ fontFamily: "'Shippori Mincho'", fontWeight: 700 }}>{t.title}</b>
                    <div style={{ color: "var(--ink-3)", marginTop: 2 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <h2 className="sh">
        <span>歴代鳳凰位</span>
        <span className="num">Hall of Champions · Since 1984</span>
        <span className="rule"></span>
        <span className="more">ALL 41 EDITIONS →</span>
      </h2>
      <div className="two-col" style={{ marginBottom: 24 }}>
        <section className="history-box">
          <div className="hhd">
            <span className="ttl">
              直近10期 <span className="en">Recent 10 Editions</span>
            </span>
            <span className="cnt">41 TITLES · EST.1984</span>
          </div>
          <ul className="history-list">
            {HISTORY.map((h) => (
              <li key={h.ep} className={h.current ? "current" : undefined}>
                <span className="ep">{h.ep}</span>
                <span className="champ">
                  {h.href ? <Link href={h.href}>{h.champ}</Link> : h.champ}
                  <span className="yr">{h.yr}</span>
                </span>
                <span className="cnt">
                  <b>{h.cnt}</b>
                  {h.cntLabel}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="box">
          <div className="box-hd">
            <span className="t">多冠者ランキング</span>
            <span className="more">TOP PLAYERS</span>
          </div>
          <table className="ranks-table">
            <tbody>
              {CROWNS.map((c) => (
                <tr key={c.rk}>
                  <td className={`rk ${c.rkClass ?? ""}`.trim()}>{c.rk}</td>
                  <td>
                    <div className="player">
                      <span className="avatar">{c.avatar}</span>
                      <div>
                        <div className="name">
                          {c.name}
                          <span className="org" style={{ background: "#c8282a", color: "#fff" }}>
                            連盟
                          </span>
                        </div>
                        <span className="sub">{c.sub}</span>
                      </div>
                    </div>
                  </td>
                  <td className="cnt">
                    {c.cnt}
                    <span className="u">冠</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
