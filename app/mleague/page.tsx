import Link from "next/link";

type Standing = {
  rank: string;
  top3?: boolean;
  mark: string;
  markColor: string;
  team: string;
  members: string;
  line: "f" | "s" | "p";
  lineLabel: string;
  pts: string;
  ptsSign: "p" | "m";
  fillWidth: number;
  fillSign: "p" | "m";
  games: string;
  topRate: string;
  topRateClass?: "p";
  avg: string;
  wins: string;
};

const STANDINGS: Standing[] = [
  { rank: "一", top3: true, mark: "格", markColor: "#d4b94e", team: "KONAMI麻雀格闘倶楽部", members: "佐々木寿人 / 高宮まり / 滝沢和典 / 勝又健志", line: "f", lineLabel: "F確定", pts: "+587.4", ptsSign: "p", fillWidth: 58, fillSign: "p", games: "98", topRate: "32.6%", topRateClass: "p", avg: "2.21", wins: "32" },
  { rank: "二", top3: true, mark: "渋", markColor: "#2bb673", team: "渋谷ABEMAS", members: "多井隆晴 / 松本吉弘 / 白鳥翔 / 日向藍子", line: "f", lineLabel: "F圏内", pts: "+412.8", ptsSign: "p", fillWidth: 41, fillSign: "p", games: "102", topRate: "29.4%", topRateClass: "p", avg: "2.32", wins: "30" },
  { rank: "三", top3: true, mark: "鳳", markColor: "#ff6b9d", team: "セガサミーフェニックス", members: "魚谷侑未 / 近藤誠一 / 東城りお / 醍醐大", line: "f", lineLabel: "F圏内", pts: "+298.1", ptsSign: "p", fillWidth: 30, fillSign: "p", games: "105", topRate: "27.6%", topRateClass: "p", avg: "2.37", wins: "29" },
  { rank: "四", mark: "桜", markColor: "#7a2040", team: "KADOKAWAサクラナイツ", members: "内川幸太郎 / 岡田紗佳 / 堀慎吾 / 渋川難波", line: "f", lineLabel: "F圏内", pts: "+156.3", ptsSign: "p", fillWidth: 16, fillSign: "p", games: "104", topRate: "26.0%", topRateClass: "p", avg: "2.42", wins: "27" },
  { rank: "五", mark: "海", markColor: "#000", team: "U-NEXT Pirates", members: "小林剛 / 瑞原明奈 / 石橋伸洋 / 鈴木優", line: "s", lineLabel: "S争い", pts: "+42.7", ptsSign: "p", fillWidth: 4, fillSign: "p", games: "108", topRate: "25.0%", avg: "2.49", wins: "27" },
  { rank: "六", mark: "ド", markColor: "#e63027", team: "赤坂ドリブンズ", members: "園田賢 / 浅井堂岐 / 丸山奏子 / 鈴木たろう", line: "s", lineLabel: "S争い", pts: "−87.2", ptsSign: "m", fillWidth: 9, fillSign: "m", games: "112", topRate: "24.1%", avg: "2.53", wins: "25" },
  { rank: "七", mark: "風", markColor: "#8b5a2b", team: "EX風林火山", members: "二階堂亜樹 / 勝又健志 / 滝沢和典 / 松ヶ瀬隆弥", line: "p", lineLabel: "圏外", pts: "−142.5", ptsSign: "m", fillWidth: 14, fillSign: "m", games: "110", topRate: "23.6%", avg: "2.56", wins: "24" },
  { rank: "八", mark: "雷", markColor: "#4d3fb8", team: "TEAM 雷電", members: "萩原聖人 / 黒沢咲 / 瀬戸熊直樹 / 本田朋広", line: "p", lineLabel: "圏外", pts: "−218.9", ptsSign: "m", fillWidth: 22, fillSign: "m", games: "106", topRate: "22.6%", avg: "2.59", wins: "22" },
  { rank: "九", mark: "獣", markColor: "#b8272e", team: "BEAST X", members: "中田花奈 / 猿川真寿 / 醍醐大 / 菅原千瑛", line: "p", lineLabel: "圏外", pts: "−387.2", ptsSign: "m", fillWidth: 38, fillSign: "m", games: "109", topRate: "21.1%", avg: "2.64", wins: "19" },
  { rank: "十", mark: "地", markColor: "#2d7a3e", team: "EARTH JETS", members: "和久津晶 / 醍醐大 / 猿川真寿 / 青山めぐ", line: "p", lineLabel: "圏外", pts: "−661.5", ptsSign: "m", fillWidth: 66, fillSign: "m", games: "114", topRate: "19.3%", avg: "2.71", wins: "16" },
];

type Player = { av: string; name: string; note: string; pt: string; sign: "p" | "m"; href?: string };
type Team = {
  color: string;
  mark: string;
  markStyle?: React.CSSProperties;
  name: string;
  sponsor: string;
  rank: string;
  rankPt: string;
  rankPtSign: "p" | "m";
  roster: Player[];
};

const TEAMS: Team[] = [
  {
    color: "#d4b94e",
    mark: "格",
    name: "KONAMI麻雀格闘倶楽部",
    sponsor: "コナミアミューズメント · 初代王者 · JPML中心",
    rank: "1位",
    rankPt: "+587.4",
    rankPtSign: "p",
    roster: [
      { av: "佐", name: "佐々木 寿人", note: "JPML · 2018-", pt: "+198", sign: "p" },
      { av: "高", name: "高宮 まり", note: "JPML · 2019-", pt: "+142", sign: "p" },
      { av: "滝", name: "滝沢 和典", note: "JPML · 2018-", pt: "+127", sign: "p" },
      { av: "勝", name: "勝又 健志", note: "JPML · 2020-", pt: "+120", sign: "p" },
    ],
  },
  {
    color: "#2bb673",
    mark: "渋",
    name: "渋谷ABEMAS",
    sponsor: "サイバーエージェント · 2連覇実績 · 最多観客動員",
    rank: "2位",
    rankPt: "+412.8",
    rankPtSign: "p",
    roster: [
      { av: "多", name: "多井 隆晴", note: "RMU · 2018-", pt: "+168", sign: "p" },
      { av: "松", name: "松本 吉弘", note: "連盟 · 2018-", pt: "+102", sign: "p" },
      { av: "白", name: "白鳥 翔", note: "連盟 · 2020-", pt: "+88", sign: "p" },
      { av: "日", name: "日向 藍子", note: "協会 · 2019-", pt: "+54", sign: "p" },
    ],
  },
  {
    color: "#ff6b9d",
    mark: "鳳",
    name: "セガサミーフェニックス",
    sponsor: "セガサミーHD · 創設メンバー",
    rank: "3位",
    rankPt: "+298.1",
    rankPtSign: "p",
    roster: [
      { av: "魚", name: "魚谷 侑未", note: "連盟 · 2018-", pt: "+124", sign: "p" },
      { av: "近", name: "近藤 誠一", note: "連盟 · 2018-", pt: "+88", sign: "p" },
      { av: "東", name: "東城 りお", note: "最高位 · 2019-", pt: "+52", sign: "p" },
      { av: "醍", name: "醍醐 大", note: "連盟 · 2021-", pt: "+34", sign: "p" },
    ],
  },
  {
    color: "#7a2040",
    mark: "桜",
    name: "KADOKAWAサクラナイツ",
    sponsor: "KADOKAWA · 2021シーズン王者",
    rank: "4位",
    rankPt: "+156.3",
    rankPtSign: "p",
    roster: [
      { av: "内", name: "内川 幸太郎", note: "連盟 · 2019-", pt: "+84", sign: "p" },
      { av: "岡", name: "岡田 紗佳", note: "連盟 · 2019-", pt: "+48", sign: "p" },
      { av: "堀", name: "堀 慎吾", note: "協会→連盟 · 2020-", pt: "+22", sign: "p" },
      { av: "渋", name: "渋川 難波", note: "最高位 · 2022-", pt: "+2", sign: "p" },
    ],
  },
  {
    color: "#000",
    mark: "海",
    markStyle: { background: "#000", color: "#f0c86d" },
    name: "U-NEXT Pirates",
    sponsor: "USEN-NEXT HD · 2019シーズン王者",
    rank: "5位",
    rankPt: "+42.7",
    rankPtSign: "p",
    roster: [
      { av: "小", name: "小林 剛", note: "麻将連合 · 2018-", pt: "+72", sign: "p" },
      { av: "瑞", name: "瑞原 明奈", note: "最高位 · 2020-", pt: "+12", sign: "p" },
      { av: "石", name: "石橋 伸洋", note: "最高位 · 2018-", pt: "−18", sign: "m" },
      { av: "鈴", name: "鈴木 優", note: "連盟 · 2022-", pt: "−23", sign: "m" },
    ],
  },
  {
    color: "#e63027",
    mark: "ド",
    name: "赤坂ドリブンズ",
    sponsor: "博報堂DYMP · 2018シーズン王者",
    rank: "6位",
    rankPt: "−87.2",
    rankPtSign: "m",
    roster: [
      { av: "園", name: "園田 賢", note: "最高位 · 2018-", pt: "−12", sign: "m" },
      { av: "浅", name: "浅井 堂岐", note: "協会 · 2020-", pt: "−18", sign: "m" },
      { av: "丸", name: "丸山 奏子", note: "連盟 · 2021-", pt: "−22", sign: "m" },
      { av: "鈴", name: "鈴木 たろう", note: "最高位 · 2018-", pt: "−35", sign: "m" },
    ],
  },
  {
    color: "#8b5a2b",
    mark: "風",
    name: "EX風林火山",
    sponsor: "テレビ朝日 · 創設メンバー",
    rank: "7位",
    rankPt: "−142.5",
    rankPtSign: "m",
    roster: [
      { av: "二", name: "二階堂 亜樹", note: "連盟 · 2018-", pt: "−22", sign: "m" },
      { av: "松", name: "松ヶ瀬 隆弥", note: "連盟 · 2021-", pt: "−28", sign: "m" },
      { av: "勝", name: "勝又 健志", note: "連盟 · 2019-", pt: "−42", sign: "m" },
      { av: "滝", name: "滝沢 和典", note: "連盟 · 2018-", pt: "−50", sign: "m" },
    ],
  },
  {
    color: "#4d3fb8",
    mark: "雷",
    name: "TEAM 雷電",
    sponsor: "チーム雷電合同会社 · 瀬戸熊擁す",
    rank: "8位",
    rankPt: "−218.9",
    rankPtSign: "m",
    roster: [
      { av: "萩", name: "萩原 聖人", note: "連盟 · 2018-", pt: "−42", sign: "m" },
      { av: "黒", name: "黒沢 咲", note: "連盟 · 2018-", pt: "−52", sign: "m" },
      { av: "瀬", name: "瀬戸熊 直樹", note: "連盟 · 2019-", pt: "−58", sign: "m", href: "/players/setokuma" },
      { av: "本", name: "本田 朋広", note: "連盟 · 2022-", pt: "−67", sign: "m" },
    ],
  },
  {
    color: "#b8272e",
    mark: "獣",
    name: "BEAST X",
    sponsor: "テレビ東京HD · 最新加入（2023-）",
    rank: "9位",
    rankPt: "−387.2",
    rankPtSign: "m",
    roster: [
      { av: "中", name: "中田 花奈", note: "協会 · 2023-", pt: "−88", sign: "m" },
      { av: "猿", name: "猿川 真寿", note: "最高位 · 2023-", pt: "−92", sign: "m" },
      { av: "醍", name: "醍醐 大", note: "連盟 · 2023-", pt: "−100", sign: "m" },
      { av: "菅", name: "菅原 千瑛", note: "連盟 · 2023-", pt: "−107", sign: "m" },
    ],
  },
  {
    color: "#2d7a3e",
    mark: "地",
    name: "EARTH JETS",
    sponsor: "フォーバル · 2025シーズン新加入",
    rank: "10位",
    rankPt: "−661.5",
    rankPtSign: "m",
    roster: [
      { av: "和", name: "和久津 晶", note: "連盟 · 2025-", pt: "−148", sign: "m" },
      { av: "醍", name: "醍醐 大", note: "連盟 · 2025-", pt: "−162", sign: "m" },
      { av: "猿", name: "猿川 真寿", note: "最高位 · 2025-", pt: "−172", sign: "m" },
      { av: "青", name: "青山 めぐ", note: "協会 · 2025-", pt: "−180", sign: "m" },
    ],
  },
];

type WeekMatch = { dt: string; badge: string; live?: boolean; match: string; teams: string[] };
const WEEK_MATCHES: WeekMatch[] = [
  { dt: "04/21 · 19:00", badge: "● LIVE", live: true, match: "第112戦 · 本日", teams: ["フェニックス", "ドリブンズ", "ABEMAS", "風林火山"] },
  { dt: "04/22 · 19:00", badge: "明日", match: "第113戦", teams: ["格闘倶楽部", "Pirates", "サクラナイツ", "雷電"] },
  { dt: "04/23 · 19:00", badge: "木", match: "第114戦", teams: ["BEAST X", "EARTH JETS", "ABEMAS", "フェニックス"] },
  { dt: "04/24 · 19:00", badge: "金", match: "第115戦", teams: ["格闘倶楽部", "ドリブンズ", "風林火山", "サクラナイツ"] },
  { dt: "04/28 · 19:00", badge: "火", match: "第116戦", teams: ["Pirates", "雷電", "BEAST X", "EARTH JETS"] },
  { dt: "04/30 · 19:00", badge: "木", match: "第117戦", teams: ["ABEMAS", "格闘倶楽部", "サクラナイツ", "フェニックス"] },
];

type Leader = { rk: string; top?: boolean; avBg: string; av: string; name: string; note: string; pt: string };
const LEADERS: Leader[] = [
  { rk: "1", top: true, avBg: "#d4b94e", av: "佐", name: "佐々木 寿人", note: "格闘倶楽部 · JPML · 62試合", pt: "+198.4" },
  { rk: "2", top: true, avBg: "#2bb673", av: "多", name: "多井 隆晴", note: "ABEMAS · RMU · 64試合", pt: "+168.2" },
  { rk: "3", top: true, avBg: "#d4b94e", av: "高", name: "高宮 まり", note: "格闘倶楽部 · JPML · 58試合", pt: "+142.7" },
  { rk: "4", avBg: "#ff6b9d", av: "魚", name: "魚谷 侑未", note: "フェニックス · JPML · 60試合", pt: "+124.3" },
  { rk: "5", avBg: "#d4b94e", av: "滝", name: "滝沢 和典", note: "格闘倶楽部 · JPML · 61試合", pt: "+127.1" },
  { rk: "6", avBg: "#d4b94e", av: "勝", name: "勝又 健志", note: "格闘倶楽部 · JPML · 57試合", pt: "+119.8" },
  { rk: "7", avBg: "#2bb673", av: "松", name: "松本 吉弘", note: "ABEMAS · JPML · 63試合", pt: "+102.4" },
  { rk: "8", avBg: "#2bb673", av: "白", name: "白鳥 翔", note: "ABEMAS · JPML · 59試合", pt: "+88.1" },
  { rk: "9", avBg: "#ff6b9d", av: "近", name: "近藤 誠一", note: "フェニックス · JPML · 60試合", pt: "+87.6" },
  { rk: "10", avBg: "#7a2040", av: "内", name: "内川 幸太郎", note: "サクラナイツ · JPML · 62試合", pt: "+83.9" },
];

const RULE_ROWS: Array<{ l: string; v: React.ReactNode }> = [
  { l: "Game Type", v: <>4人<b>東南戦</b></> },
  { l: "Starting Score", v: <><b>25,000点</b>持ち · 30,000点返し</> },
  { l: "Uma / Oka", v: <>ウマ <b>+30 / +10 / −10 / −30</b></> },
  { l: "Akadora", v: <><b>あり</b> · 各色1枚</> },
  { l: "Ippatsu", v: <b>あり</b> },
  { l: "Uradora", v: <b>あり</b> },
  { l: "Kuitan", v: <>喰いタン <b>あり</b></> },
  { l: "Time Limit", v: <>打牌 <b>5秒</b> · 長考3回</> },
];

export default function MleaguePage() {
  return (
    <div className="wrap">
      <section className="ml-hero">
        <div className="crumb">
          <Link href="/">Home</Link>
          <span className="sep">›</span>
          <span>Mリーグ 2025-26</span>
        </div>
        <div className="season-tag">● 2025-26 SEASON · レギュラー進行中</div>
        <h1>
          Mリーグ
          <span className="en">M.LEAGUE · Japan&apos;s Premier Pro Team Circuit · Since 2018</span>
        </h1>
        <p className="lead">
          2018年に発足した国内初の本格的プロ麻雀団体対抗リーグ。10チームが10月〜翌5月のレギュラーシーズンを戦い、上位6チームがセミファイナル・ファイナルへ進む。現在の第8シーズン、第112戦まで消化。
        </p>
        <div className="meta-row">
          <div className="m">
            <div className="l">Season</div>
            <div className="v accent">2025-26</div>
            <div className="sub">第8シーズン</div>
          </div>
          <div className="m">
            <div className="l">Teams</div>
            <div className="v">10</div>
            <div className="sub">5団体から選抜</div>
          </div>
          <div className="m">
            <div className="l">Matches</div>
            <div className="v">
              112
              <span style={{ fontFamily: "'Noto Sans JP'", fontSize: 16, fontWeight: 500, marginLeft: 4 }}>/180</span>
            </div>
            <div className="sub">62% 消化</div>
          </div>
          <div className="m">
            <div className="l">Leader</div>
            <div className="v red">+587</div>
            <div className="sub">KONAMI格闘倶楽部</div>
          </div>
          <div className="m">
            <div className="l">Broadcaster</div>
            <div className="v">ABEMA</div>
            <div className="sub">月〜金 19:00〜 無料</div>
          </div>
        </div>
      </section>

      <section className="standings-wrap">
        <div className="st-head">
          <div className="ttl">
            順位表<span className="en">Standings · After Match 112</span>
          </div>
          <div className="as-of">AS OF 2026.04.21 · 19:32 JST</div>
        </div>
        <table className="st-table">
          <thead>
            <tr>
              <th>順位</th>
              <th>チーム</th>
              <th style={{ width: 90 }}>ライン</th>
              <th>ポイント</th>
              <th className="n">試合</th>
              <th className="n">1位率</th>
              <th className="n">平均着順</th>
              <th className="n">勝ち星</th>
            </tr>
          </thead>
          <tbody>
            {STANDINGS.map((s) => (
              <tr key={s.rank}>
                <td className={`rk ${s.top3 ? "top3" : ""}`.trim()}>{s.rank}</td>
                <td>
                  <div className="team-cell">
                    <span className="team-mark" style={{ background: s.markColor }}>
                      {s.mark}
                    </span>
                    <div className="t-name">
                      <a>{s.team}</a>
                      <small>{s.members}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`line-tag ${s.line}`}>{s.lineLabel}</span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className={`n pts ${s.ptsSign}`} style={{ minWidth: 70 }}>
                      {s.pts}
                    </span>
                    <div className="bar" style={{ flex: 1 }}>
                      <div className={`fill ${s.fillSign}`} style={{ width: `${s.fillWidth}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="n">{s.games}</td>
                <td className={`n ${s.topRateClass ?? ""}`.trim()}>{s.topRate}</td>
                <td className="n">{s.avg}</td>
                <td className="n">{s.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <h2 className="sh">
        <span>全10チーム</span>
        <span className="num">Teams · 10 Franchises</span>
        <span className="rule"></span>
        <span className="more">チーム一覧 →</span>
      </h2>
      <div className="team-grid">
        {TEAMS.map((t) => (
          <div
            key={t.name}
            className="team-card"
            style={{ ["--tc" as string]: t.color } as React.CSSProperties}
          >
            <div className="band"></div>
            <div className="head">
              <div className="mark" style={t.markStyle}>
                {t.mark}
              </div>
              <div className="head-text">
                <h3>{t.name}</h3>
                <div className="sponsor">{t.sponsor}</div>
              </div>
              <div className="rk-pt">
                <div className="head-rk">{t.rank}</div>
                <div className={`head-pt ${t.rankPtSign}`}>{t.rankPt}</div>
              </div>
            </div>
            <div className="roster">
              {t.roster.map((p, i) => (
                <div key={i} className="p">
                  <span className="av">{p.av}</span>
                  <div className="nm">
                    {p.href ? <Link href={p.href}>{p.name}</Link> : p.name}
                    <small>{p.note}</small>
                  </div>
                  <span className={`pt ${p.sign}`}>{p.pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <section className="sched-wrap">
        <h3>
          今週の対局<span className="en">This Week · 6 Matches Scheduled</span>
        </h3>
        <div className="grid">
          {WEEK_MATCHES.map((m, i) => (
            <div key={i} className={`sc-item ${m.live ? "live" : ""}`.trim()}>
              <div className="top">
                <span className="dt">{m.dt}</span>
                <span className="badge">{m.badge}</span>
              </div>
              <div className="match">{m.match}</div>
              <div className="teams">
                {m.teams.map((team) => (
                  <span key={team}>{team}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="two-col">
        <section className="leaders-wrap">
          <h3>
            個人成績 Top 10<span className="en">Individual Points Leaders</span>
          </h3>
          {LEADERS.map((l) => (
            <div key={l.rk} className="lead-row">
              <span className={`rk ${l.top ? "top" : ""}`.trim()}>{l.rk}</span>
              <span className="av" style={{ background: l.avBg }}>
                {l.av}
              </span>
              <div className="nm">
                {l.name}
                <small>{l.note}</small>
              </div>
              <span className="pt p">{l.pt}</span>
            </div>
          ))}
        </section>

        <section className="info-card">
          <h3>
            リーグ概要<span className="en">At a Glance</span>
          </h3>
          <dl>
            <dt>名称</dt>
            <dd>
              <b>Mリーグ</b>
              <br />
              <span style={{ fontFamily: "'Instrument Serif'", fontStyle: "italic", color: "var(--ink-3)" }}>
                M.LEAGUE
              </span>
            </dd>
            <dt>発足</dt>
            <dd>
              2018年7月
              <br />
              <span style={{ color: "var(--ink-3)", fontSize: 11 }}>チェアマン：藤田晋</span>
            </dd>
            <dt>参加チーム</dt>
            <dd>
              <b>10チーム</b>
              <br />
              5団体から選抜
            </dd>
            <dt>参加プロ</dt>
            <dd>全40名（各4名）</dd>
            <dt>レギュラー</dt>
            <dd>
              10月〜翌5月
              <br />
              各チーム90戦
            </dd>
            <dt>ファイナル</dt>
            <dd>
              上位6チームがS進出
              <br />
              上位4チームがF進出
            </dd>
            <dt>放送</dt>
            <dd>
              <b>ABEMA</b>にて全試合無料生配信
              <br />
              月〜金 19:00〜
            </dd>
            <dt>優勝賞金</dt>
            <dd>5,000万円</dd>
            <dt>歴代王者</dt>
            <dd>ドリブンズ（&apos;18）/ Pirates（&apos;19）/ ABEMAS（&apos;20・&apos;22）/ サクラナイツ（&apos;21）/ 格闘倶楽部（&apos;23・&apos;24）</dd>
            <dt>公式</dt>
            <dd>
              <a style={{ borderBottom: "1px dotted var(--ink)" }}>m-league.jp</a>
            </dd>
          </dl>
        </section>
      </div>

      <section className="rule-sheet">
        <h3>
          公式ルール<span className="en">Official M.League Rules</span>
        </h3>
        <div className="grid">
          {RULE_ROWS.map((r) => (
            <div key={r.l} className="r">
              <div className="l">{r.l}</div>
              <div className="v">{r.v}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
