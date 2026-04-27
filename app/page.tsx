import Link from "next/link";
import { ALL_PLAYERS, ROSTER_PLAYERS } from "@/app/players/data";

type Tile = { glyph: string; variant?: "red" | "green"; left: string; duration: string; delay: string; rotate: string };

// Compute org-by-org count from real data (Featured + Roster combined)
const _ORG_COUNTS: Record<string, number> = {};
for (const p of [...ALL_PLAYERS, ...ROSTER_PLAYERS]) {
  _ORG_COUNTS[p.org] = (_ORG_COUNTS[p.org] ?? 0) + 1;
}
const ORG_COUNTS = _ORG_COUNTS;
const TOTAL_PROS = Object.values(ORG_COUNTS).reduce((a, b) => a + b, 0);

const HERO_TILES: Tile[] = [
  { glyph: "一", left: "8%", duration: "9s", delay: "0s", rotate: "-8deg" },
  { glyph: "中", variant: "red", left: "18%", duration: "12s", delay: "-3s", rotate: "4deg" },
  { glyph: "東", left: "28%", duration: "10s", delay: "-6s", rotate: "-2deg" },
  { glyph: "發", variant: "green", left: "42%", duration: "11s", delay: "-1s", rotate: "6deg" },
  { glyph: "九", left: "55%", duration: "13s", delay: "-7s", rotate: "-5deg" },
  { glyph: "南", left: "68%", duration: "10s", delay: "-4s", rotate: "3deg" },
  { glyph: "中", variant: "red", left: "80%", duration: "14s", delay: "-2s", rotate: "-4deg" },
  { glyph: "白", left: "90%", duration: "9s", delay: "-8s", rotate: "7deg" },
];

const TODAY_ITEMS = [
  { time: "19:30〜", tag: "● LIVE", live: true, title: ["鳳凰位戦A1", "第5節B卓"], sub: "JPML · 連盟チャンネル" },
  { time: "20:15〜", tag: "● LIVE", live: true, title: ["Mリーグ第112戦", "フェニックス vs ドリブンズ"], sub: "ABEMA麻雀" },
  { time: "21:00〜", tag: "開始前", live: false, title: ["雀王戦A", "第9節 2卓"], sub: "NPM · OPENREC" },
  { time: "22:00〜", tag: "決勝", live: false, title: ["最高位戦Classic", "決勝戦 第1戦"], sub: "最高位戦 · YouTube" },
  { time: "22:00〜", tag: "開始前", live: false, title: ["女流桜花A", "第4節"], sub: "JPML · 連盟チャンネル" },
];

const SCHED_DAYS = [
  { n: "19", w: "SUN", cls: "sun", events: [{ c: "#c8282a", label: "十段位戦 予選" }, { c: "#0b0b09", label: "新輝戦 3回戦" }] },
  { n: "20", w: "MON", cls: "", events: [{ c: "#4b2a7a", label: "μリーグ 第4節" }] },
  { n: "21", w: "TUE · 今日", cls: "today", events: [
    { c: "#c8282a", label: "鳳凰位A1 第5節" },
    { c: "#a07e28", label: "Mリーグ 第112戦" },
    { c: "#1d4ed8", label: "雀王A 第9節" },
    { c: "#ebe4d2", color: "#0b0b09", label: "Classic決勝" },
  ] },
  { n: "22", w: "WED", cls: "", events: [
    { c: "#a07e28", label: "Mリーグ 第113戦" },
    { c: "#c8a030", color: "#0b0b09", label: "令昭位A1" },
  ] },
  { n: "23", w: "THU", cls: "", events: [{ c: "#a07e28", label: "Mリーグ 第114戦" }] },
  { n: "24", w: "FRI", cls: "", events: [
    { c: "#c8282a", label: "女流桜花A" },
    { c: "#1d4ed8", label: "雀竜位 準決勝" },
  ] },
  { n: "25", w: "SAT", cls: "sat", events: [
    { c: "#c8282a", label: "麻雀マスターズ" },
    { c: "#c8a030", color: "#0b0b09", label: "闘魂杯本戦" },
    { c: "#4b2a7a", label: "BIG1カップ" },
  ] },
];

export default function Home() {
  return (
    <div className="wrap">
      {/* HERO */}
      <section className="hero" style={{ marginBottom: 14 }}>
        <div className="hero-lead">
          <div className="bg-tiles">
            {HERO_TILES.map((t, i) => (
              <div
                key={i}
                className={`tile${t.variant ? ` ${t.variant}` : ""}`}
                data-glyph={t.glyph}
                style={
                  {
                    left: t.left,
                    animationDuration: t.duration,
                    animationDelay: t.delay,
                    ["--r" as string]: t.rotate,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <div className="kicker">Top Story · 本日の焦点</div>
          <h2>
            瀬戸熊、
            <br />
            <span className="em">独走。</span>
            <span className="en">Setokuma dominates Round 5, A1.</span>
          </h2>
          <div className="lead-body">
            鳳凰位戦A1リーグ第5節B卓、瀬戸熊直樹が第3回戦終了時点で+48.2ポイントをマーク。
            総合首位との差を124.5ptまで広げ、第42期鳳凰位に大きく前進した。
            前原・佐々木・滝沢の2〜4位争いが激化する一方で、降級ラインには4名が沈む。
          </div>
          <div className="match-mini">
            <div>
              <div className="name">鳳凰位戦A1 · 第5節B卓 · 第3回戦 東4局</div>
              <div className="title">麻雀連盟チャンネル · 19:30〜</div>
            </div>
            <a className="watchbtn">視聴する</a>
          </div>
        </div>

        <div className="hero-scores">
          <div className="hd">
            <span>SCOREBOARD</span>
            <span className="live">● 第3回戦</span>
          </div>
          <div className="body">
            <div className="sub">JPML · 第42期鳳凰位戦A1</div>
            <h3>第5節 B卓</h3>
            <div className="h-note">全10節中5節 · 東4局 · 親：瀬戸熊</div>

            <div className="score-row lead">
              <span className="rk">一</span>
              <span className="name">瀬戸熊 直樹</span>
              <span className="pt">+48.2</span>
            </div>
            <div className="score-row">
              <span className="rk">二</span>
              <span className="name">前原 雄大</span>
              <span className="pt">+12.7</span>
            </div>
            <div className="score-row">
              <span className="rk">三</span>
              <span className="name">滝沢 和典</span>
              <span className="pt m">−18.3</span>
            </div>
            <div className="score-row">
              <span className="rk">四</span>
              <span className="name">佐々木 寿人</span>
              <span className="pt m">−42.6</span>
            </div>
          </div>
          <div className="score-footer">
            <span>麻雀連盟チャンネル</span>
            <a>▶ 視聴</a>
          </div>
        </div>
      </section>

      {/* TODAY STRIP */}
      <section className="today-strip" style={{ marginBottom: 14 }}>
        <div className="hd">
          <span>
            本日の対局{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif'",
                fontStyle: "italic",
                fontSize: 15,
                opacity: 0.85,
                marginLeft: 6,
              }}
            >
              Today&apos;s Tables
            </span>
          </span>
          <span className="r">{TODAY_ITEMS.length} TABLES · {new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()).replace(/-/g, ".")}</span>
        </div>
        <div className="today-items">
          {TODAY_ITEMS.map((t, i) => (
            <div key={i} className={`it${t.live ? " live" : ""}`}>
              <span className="time">{t.time}</span>
              <span className="tag">{t.tag}</span>
              <span className="t">
                {t.title.map((line, j) => (
                  <span key={j}>
                    {line}
                    {j < t.title.length - 1 && <br />}
                  </span>
                ))}
              </span>
              <span className="sub">{t.sub}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid-2col">
        <div className="col">
          {/* TITLES */}
          <section className="titles-section">
            <h2>
              <span>タイトル戦</span>
              <span className="num italic">Title Races</span>
              <span className="rule"></span>
              <Link href="/titles/houou-isen" className="more">ALL TITLES →</Link>
            </h2>
            <div className="titles-grid">
              <div className="title-card" style={{ ["--c" as string]: "#c8282a" } as React.CSSProperties}>
                <div className="org-tag"><span className="sw"></span>JPML · 連盟</div>
                <div className="big-kanji">鳳</div>
                <h3><Link href="/titles/houou-isen">鳳凰位戦</Link></h3>
                <div className="edition">
                  第<b>42</b>期 A1 · 全<b>10</b>節中 <b>5</b>節終了
                </div>
                <div className="standings">
                  {[
                    { r: "一", n: "瀬戸熊 直樹", pt: "+124.5", lead: true, plus: true },
                    { r: "二", n: "前原 雄大", pt: "+87.3", plus: true },
                    { r: "三", n: "佐々木 寿人", pt: "+41.8", plus: true },
                    { r: "四", n: "滝沢 和典", pt: "−22.4", minus: true },
                    { r: "五", n: "HIRO柴田", pt: "−67.1", minus: true },
                  ].map((row, i) => (
                    <div key={i} className={`sr${row.lead ? " l" : ""}`}>
                      <span className="r">{row.r}</span>
                      <span className="nm">{row.n}</span>
                      <span className={`pt${row.plus ? " plus" : ""}${row.minus ? " minus" : ""}`}>{row.pt}</span>
                    </div>
                  ))}
                </div>
                <div className="prize">
                  <span>PRIZE <b>¥5,000,000</b></span>
                  <span>TITLE <b>鳳凰位</b></span>
                </div>
              </div>

              <div className="title-card" style={{ ["--c" as string]: "#1d4ed8" } as React.CSSProperties}>
                <div className="org-tag"><span className="sw"></span>NPM · 協会</div>
                <div className="big-kanji">雀</div>
                <h3>雀王戦</h3>
                <div className="edition">
                  第<b>25</b>期 A · 最終節まで <b>2</b>節
                </div>
                <div className="standings">
                  {[
                    { r: "一", n: "金子 正輝", pt: "+156.2", lead: true, plus: true },
                    { r: "二", n: "矢島 亨", pt: "+92.7", plus: true },
                    { r: "三", n: "浅井 堂岐", pt: "+48.1", plus: true },
                    { r: "四", n: "水巻 渉", pt: "+12.9", plus: true },
                    { r: "五", n: "鈴木 聡一郎", pt: "−8.3", minus: true },
                  ].map((row, i) => (
                    <div key={i} className={`sr${row.lead ? " l" : ""}`}>
                      <span className="r">{row.r}</span>
                      <span className="nm">{row.n}</span>
                      <span className={`pt${row.plus ? " plus" : ""}${row.minus ? " minus" : ""}`}>{row.pt}</span>
                    </div>
                  ))}
                </div>
                <div className="prize">
                  <span>PRIZE <b>¥2,000,000</b></span>
                  <span>TITLE <b>雀王</b></span>
                </div>
              </div>

              <div className="title-card" style={{ ["--c" as string]: "#0b0b09" } as React.CSSProperties}>
                <div className="org-tag"><span className="sw"></span>最高位戦</div>
                <div className="big-kanji">飯</div>
                <h3>Classic</h3>
                <div className="edition">
                  第<b>23</b>回 · 本日<b>22:00</b>決勝 · 旧ルール
                </div>
                <div className="standings">
                  {["村上 淳", "石井 一馬", "渋川 難波", "多井 隆晴"].map((n, i) => (
                    <div key={i} className="sr l">
                      <span className="r">決</span>
                      <span className="nm">{n}</span>
                      <span className="pt plus">進出</span>
                    </div>
                  ))}
                </div>
                <div className="prize">
                  <span>PRIZE <b>¥1,000,000</b></span>
                  <span>他団体参加可</span>
                </div>
              </div>
            </div>
          </section>

          {/* 7-DAY SCHEDULE */}
          <section className="sched-wrap">
            <div className="hd">
              <span>
                直近7日間の対局
                <span
                  className="en"
                  style={{
                    opacity: 0.6,
                    fontFamily: "'Instrument Serif'",
                    fontStyle: "italic",
                    marginLeft: 8,
                  }}
                >
                  Next 7 Days
                </span>
              </span>
              <Link
                href="/schedule"
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                MONTHLY →
              </Link>
            </div>
            <div className="sched-grid">
              {SCHED_DAYS.map((d, i) => (
                <div key={i} className={`d ${d.cls}`.trim()}>
                  <div className="dh">
                    <span className="dn">{d.n}</span>
                    <span className="dw">{d.w}</span>
                  </div>
                  {d.events.map((ev, j) => (
                    <div
                      key={j}
                      className="ev"
                      style={{ ["--c" as string]: ev.c, color: ev.color } as React.CSSProperties}
                    >
                      {ev.label}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* ORGS */}
          <section className="orgs-section">
            <h2>
              <span>プロ団体</span>
              <span className="num italic">Organizations</span>
              <span className="rule"></span>
              <span className="more">COMPARE →</span>
            </h2>
            <div className="orgs-grid">
              {[
                { c: "#c8282a", idx: "01", code: "JPML · 1981", jp: ["日本プロ麻雀", "連盟"], pros: ORG_COUNTS["JPML"]?.toLocaleString() ?? "—", titles: "14", main: "鳳凰位戦 · 十段位戦 · 王位戦 · 女流桜花", href: "/organizations/jpml" },
                { c: "#1d4ed8", idx: "02", code: "NPM · 2001", jp: ["日本プロ麻雀", "協会"], pros: ORG_COUNTS["NPM"]?.toLocaleString() ?? "—", titles: "9", main: "雀王戦 · 雀竜位戦 · 日本オープン", href: "/organizations/npm" },
                { c: "#0b0b09", idx: "03", code: "SAIKOUISEN · 1976", jp: ["最高位戦", "日本プロ麻雀協会"], pros: ORG_COUNTS["最高位戦"]?.toLocaleString() ?? "—", titles: "7", main: "最高位決定戦 · Classic · 發王戦", href: "/organizations/saikouisen" },
                { c: "#c8a030", idx: "04", code: "RMU · 2007", jp: ["RMU"], pros: ORG_COUNTS["RMU"]?.toLocaleString() ?? "—", titles: "8", main: "令昭位戦 · RMUクラウン · 闘魂杯", href: "/organizations/rmu" },
                { c: "#4b2a7a", idx: "05", code: "μ · 1997", jp: ["麻将連合", "-μ-"], pros: ORG_COUNTS["μ"]?.toLocaleString() ?? "—", titles: "9", main: "μリーグ · BIG1カップ · 将妃戦", href: "/organizations/mu" },
              ].map((o, i) => {
                const inner = (
                  <>
                    <div className="stripe"></div>
                    <div className="body">
                      <div className="idx">{o.idx}</div>
                      <div className="code">{o.code}</div>
                      <div className="jp">
                        {o.jp.map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < o.jp.length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <div className="stat-row">
                        <div className="s">
                          <div className="l">所属プロ</div>
                          <div className="v">{o.pros}</div>
                        </div>
                        <div className="s">
                          <div className="l">タイトル</div>
                          <div className="v">{o.titles}</div>
                        </div>
                      </div>
                      <div className="titles-list">
                        <span className="lb">MAIN TITLES</span>
                        {o.main}
                      </div>
                    </div>
                  </>
                );
                return o.href ? (
                  <Link
                    key={i}
                    href={o.href}
                    className="org-card"
                    style={{ ["--c" as string]: o.c } as React.CSSProperties}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={i}
                    className="org-card"
                    style={{ ["--c" as string]: o.c } as React.CSSProperties}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </section>

          {/* PLAYERS DIRECTORY CTA */}
          <Link
            href="/players"
            className="related-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "center",
              gap: 18,
              background: "var(--ink)",
              color: "var(--paper)",
              padding: "20px 26px",
              border: "var(--border)",
              boxShadow: "5px 5px 0 var(--vermilion)",
              marginBottom: 28,
              textDecoration: "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Geist Mono, ui-monospace, monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "rgba(235,228,210,.6)",
                  fontWeight: 700,
                }}
              >
                PLAYERS DIRECTORY · {TOTAL_PROS.toLocaleString()} PROS
              </div>
              <div
                style={{
                  fontFamily: "Shippori Mincho, serif",
                  fontWeight: 900,
                  fontSize: 28,
                  letterSpacing: "-0.02em",
                  marginTop: 4,
                }}
              >
                プロ雀士 {TOTAL_PROS.toLocaleString()}名 を全員検索
                <span
                  style={{
                    fontFamily: "Instrument Serif, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 16,
                    color: "#f0c86d",
                    marginLeft: 14,
                  }}
                >
                  Search every Japanese pro
                </span>
              </div>
              <div
                style={{
                  fontFamily: "Noto Sans JP, sans-serif",
                  fontSize: 13,
                  color: "rgba(235,228,210,.7)",
                  marginTop: 6,
                  lineHeight: 1.6,
                }}
              >
                JPML {ORG_COUNTS["JPML"]?.toLocaleString()} · 最高位戦 {ORG_COUNTS["最高位戦"]?.toLocaleString()} · NPM {ORG_COUNTS["NPM"]?.toLocaleString()} · μ {ORG_COUNTS["μ"]} · RMU {ORG_COUNTS["RMU"]}
                {" — "}名前 / リーグ / 段位 / 入会年で絞り込み可能
              </div>
            </div>
            <span
              style={{
                fontFamily: "Shippori Mincho, serif",
                fontWeight: 900,
                fontSize: 32,
                color: "var(--vermilion)",
              }}
            >
              →
            </span>
          </Link>

          {/* RANKINGS */}
          <section className="ranks-box">
            <div className="hd">
              <span>
                ランキング <span className="en">Hall of Fame</span>
              </span>
              <Link
                href="/rankings"
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                }}
              >
                ALL →
              </Link>
            </div>
            <div className="ranks-tabs">
              <span className="on">獲得タイトル数</span>
              <span>今期勝率</span>
              <span>今期素点</span>
              <span>連続トップ</span>
              <span className="end"></span>
            </div>
            <table className="ranks-table">
              <tbody>
                {[
                  { rk: "一", rkCls: "r1", av: "滝", nm: "滝沢 和典", orgCss: { background: "#c8282a", color: "#fff" }, orgLabel: "連盟", sub: "鳳凰位×3 · 王位×2 · 麻雀マスターズ×1", cnt: "18" },
                  { rk: "二", rkCls: "r2", av: "金", nm: "金子 正輝", orgCss: { background: "#1d4ed8", color: "#fff" }, orgLabel: "協会", sub: "雀王×4 · 雀竜位×2 · Mリーグ個人MVP 2024", cnt: "15" },
                  { rk: "三", rkCls: "r3", av: "多", nm: "多井 隆晴", orgCss: { background: "#c8a030", color: "#0b0b09" }, orgLabel: "RMU", sub: "RMUクラウン×5 · 最強位×3 · Mリーグ優勝×2", cnt: "14" },
                  { rk: "四", rkCls: "", av: "佐", nm: "佐々木 寿人", orgCss: { background: "#c8282a", color: "#fff" }, orgLabel: "連盟", sub: "鳳凰位×1 · 十段位×3 · グランプリ×2", cnt: "12" },
                  { rk: "五", rkCls: "", av: "村", nm: "村上 淳", orgCss: { background: "#0b0b09", color: "#fff" }, orgLabel: "最高位戦", sub: "最高位×2 · Classic×2 · 發王戦×1", cnt: "10" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className={`rk ${row.rkCls}`.trim()}>{row.rk}</td>
                    <td>
                      <div className="player">
                        <span className="avatar">{row.av}</span>
                        <div>
                          <div className="name">
                            {row.nm}
                            <span className="org" style={row.orgCss}>{row.orgLabel}</span>
                          </div>
                          <span className="sub">{row.sub}</span>
                        </div>
                      </div>
                    </td>
                    <td className="cnt">
                      {row.cnt}
                      <span className="u">冠</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col">
          {/* LIVE NOW */}
          <section className="box">
            <div className="side-hd">
              <span>
                今すぐ視聴 <span className="en">Watch Now</span>
              </span>
              <span className="tag">● 2 LIVE</span>
            </div>
            <ul className="live-list">
              <li>
                <span className="time"><span className="dot on"></span></span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#c8282a" } as React.CSSProperties}>連盟</span>
                  鳳凰位戦A1 第5節B卓
                  <span className="ch">麻雀連盟チャンネル / 第3回戦東4局</span>
                </span>
                <span className="mono" style={{ fontWeight: 700, fontSize: 12, color: "var(--vermilion)" }}>+48.2</span>
              </li>
              <li>
                <span className="time"><span className="dot on"></span></span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#a07e28" } as React.CSSProperties}>M</span>
                  フェニックス vs ドリブンズ
                  <span className="ch">ABEMA / 東4局 / 1試合目</span>
                </span>
                <span className="mono" style={{ fontWeight: 700, fontSize: 12 }}>34,200</span>
              </li>
              <li>
                <span className="time"><b>21:00</b>開始</span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#1d4ed8" } as React.CSSProperties}>協会</span>
                  雀王戦A 第9節2卓
                  <span className="ch">OPENREC · 金子/浅井/水巻/矢島</span>
                </span>
                <span className="dot"></span>
              </li>
              <li>
                <span className="time"><b>22:00</b>開始</span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#0b0b09" } as React.CSSProperties}>最高位</span>
                  Classic決勝 第1戦
                  <span className="ch">YouTube · 村上/石井/渋川/多井</span>
                </span>
                <span className="dot"></span>
              </li>
              <li>
                <span className="time"><b>明日</b>19:00</span>
                <span className="title">
                  <span className="org-badge" style={{ ["--c" as string]: "#a07e28" } as React.CSSProperties}>M</span>
                  Pirates vs ABEMAS
                  <span className="ch">ABEMA / 第113戦</span>
                </span>
                <span className="dot"></span>
              </li>
            </ul>
          </section>

          {/* M-LEAGUE */}
          <section className="mleague">
            <div className="mhd">
              <h2>
                Mリーグ 番付
                <span className="en">2025-26 Season Standings</span>
              </h2>
              <div className="race">
                <span>第112戦終了</span>
                <b>レギュラー</b>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>順</th>
                  <th>チーム</th>
                  <th style={{ textAlign: "right" }}>合計pt</th>
                  <th style={{ textAlign: "right" }}>前節</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { rk: "一", rkCls: "r1", logo: "#d4b94e", team: "KONAMI麻雀格闘倶楽部", pts: "+587.4", ptsCls: "p", dl: "42.1", dlCls: "up" },
                  { rk: "二", rkCls: "r2", logo: "#2bb673", team: "渋谷ABEMAS", pts: "+412.8", ptsCls: "p", dl: "28.5", dlCls: "dn" },
                  { rk: "三", rkCls: "r3", logo: "#ff6b9d", team: "セガサミーフェニックス", pts: "+298.1", ptsCls: "p", dl: "15.2", dlCls: "up" },
                  { rk: "四", rkCls: "", logo: "#7a2040", team: "KADOKAWAサクラナイツ", pts: "+156.3", ptsCls: "p", dl: "8.7", dlCls: "up" },
                  { rk: "五", rkCls: "", logo: "#fff", team: "U-NEXT Pirates", pts: "+42.7", ptsCls: "p", dl: "12.3", dlCls: "dn" },
                  { rk: "六", rkCls: "", logo: "#e63027", team: "赤坂ドリブンズ", pts: "−87.2", ptsCls: "m", dl: "34.8", dlCls: "dn" },
                  { rk: "七", rkCls: "", logo: "#8b5a2b", team: "EX風林火山", pts: "−142.5", ptsCls: "m", dl: "6.1", dlCls: "up" },
                  { rk: "八", rkCls: "", logo: "#4d3fb8", team: "TEAM 雷電", pts: "−218.9", ptsCls: "m", dl: "9.4", dlCls: "dn" },
                  { rk: "九", rkCls: "", logo: "#b8272e", team: "BEAST X", pts: "−387.2", ptsCls: "m", dl: "18.7", dlCls: "dn" },
                  { rk: "十", rkCls: "", logo: "#2d7a3e", team: "EARTH JETS", pts: "−661.5", ptsCls: "m", dl: "3.2", dlCls: "up" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td className={`rk ${r.rkCls}`.trim()}>{r.rk}</td>
                    <td>
                      <div className="team">
                        <span className="logo" style={{ background: r.logo }}></span>
                        {r.team}
                      </div>
                    </td>
                    <td className={`pts ${r.ptsCls}`}>{r.pts}</td>
                    <td className={`delta ${r.dlCls}`}>{r.dl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* EDITOR'S PICK */}
          <section className="pick-box">
            <div className="hd">Editor&apos;s Pick · 特集</div>
            <div className="body">
              <h3>
                第42期鳳凰位戦、
                <br />
                後半戦の焦点。
              </h3>
              <p>
                瀬戸熊が独走態勢を維持する中、前原・佐々木・滝沢の3番手争いが激化。A1リーグ降級ラインに沈む4名の運命は？
              </p>
              <a className="cta">記事を読む →</a>
              <div className="tags">
                <b>#</b> 2026年度の主要タイトル戦日程
                <br />
                <b>#</b> Mリーグ6年目の展望
                <br />
                <b>#</b> 女流プロ団体横断ランキング
              </div>
            </div>
          </section>

          {/* NEWS */}
          <section className="news-box">
            <div className="side-hd">
              <span>
                最新ニュース <span className="en">Latest</span>
              </span>
              <a
                style={{
                  color: "#f0c86d",
                  fontFamily: "'Geist Mono'",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                }}
              >
                ALL →
              </a>
            </div>
            <ul>
              {[
                { dt: "04.19", cat: "rs", label: "決勝", body: <><b>最高位戦Classic</b> 決勝進出者4名確定 — 村上淳・石井一馬・渋川難波・多井隆晴</> },
                { dt: "04.17", cat: "tf", label: "移籍", body: <><b>高宮まり</b> 協会より連盟へ移籍（2026年度より）</> },
                { dt: "04.14", cat: "rs", label: "結果", body: <>雀竜位戦準決勝 · <b>矢島亨</b>が3戦連続トップで決勝進出</> },
                { dt: "04.10", cat: "ev", label: "開催", body: <>RMU <b>闘魂杯</b> 本戦4/25開催決定 · 雀魂使用</> },
                { dt: "02.14", cat: "tf", label: "移籍", body: <><b>渋川難波</b> 協会→最高位戦へ移籍</> },
                { dt: "01.01", cat: "tf", label: "移籍", body: <><b>堀慎吾</b> 協会→連盟へ移籍 · サクラナイツ継続</> },
              ].map((n, i) => (
                <li key={i}>
                  <span className="dt">{n.dt}</span>
                  <span className={`cat ${n.cat}`}>{n.label}</span>
                  <span className="t">{n.body}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
