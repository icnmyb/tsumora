import Link from "next/link";

const STYLE_BARS = [
  { lab: "攻撃力", en: "Offense", width: 92, cls: "v" },
  { lab: "守備力", en: "Defense", width: 78, cls: "" },
  { lab: "読み", en: "Reading", width: 88, cls: "" },
  { lab: "押し引き", en: "Push-Fold", width: 85, cls: "" },
  { lab: "速度", en: "Speed", width: 70, cls: "g" },
  { lab: "打点", en: "Power", width: 90, cls: "g" },
  { lab: "精神力", en: "Mental", width: 95, cls: "m" },
];

const CAREER_BARS = [
  { h: 22, v: "+38", cls: "" },
  { h: 58, v: "+142", cls: "champ" },
  { h: 31, v: "+62", cls: "" },
  { h: 48, v: "+98", cls: "fin" },
  { h: 18, v: "+24", cls: "" },
  { h: 28, v: "+48", cls: "" },
  { h: 52, v: "+112", cls: "fin" },
  { h: 35, v: "+72", cls: "" },
  { h: 42, v: "+84", cls: "" },
  { h: 26, v: "+44", cls: "" },
  { h: 70, v: "+186", cls: "champ" },
  { h: 62, v: "+158", cls: "champ" },
  { h: 88, v: "+248", cls: "champ" },
  { h: 55, v: "+124", cls: "" },
];

const TITLES = [
  { yr: "進行中", what: "第41期鳳凰位戦", sub: "TEAM RAIDEN/雷電として出場", tag: "出場", tagCls: "final" },
  { yr: "2018", what: "Mリーグ発足 TEAM RAIDEN/雷電", sub: "初代メンバーとして参加", tag: "参加", tagCls: "win" },
  { yr: "2013", what: "第30期十段位", sub: "十段位3連覇達成", tag: "優勝", tagCls: "win" },
  { yr: "2012", what: "第29期鳳凰位", sub: "3度目の鳳凰位 · 十段位との二冠", tag: "優勝", tagCls: "win" },
  { yr: "2012", what: "第29期十段位", sub: "十段位連覇", tag: "優勝", tagCls: "win" },
  { yr: "2011", what: "第28期十段位", sub: "初の十段位", tag: "優勝", tagCls: "win" },
  { yr: "2010", what: "第27期鳳凰位", sub: "2年連続鳳凰位", tag: "優勝", tagCls: "win" },
  { yr: "2009", what: "第26期鳳凰位", sub: "初の鳳凰位", tag: "優勝", tagCls: "win" },
  { yr: "1997", what: "日本プロ麻雀連盟入会", sub: "第14期生 · プロデビュー", tag: "", tagCls: "", noChamp: true },
];

const RECENT = [
  { dt: "04.21", live: true, mt: "鳳凰位戦A1 第5節B卓", sub: "前原 / 滝沢 / 佐々木", rk: "一", rkCls: "r1", s: "48,200", p: "+48.2", pCls: "p" },
  { dt: "04.14", mt: "Mリーグ 第109戦", sub: "渋谷ABEMAS戦", rk: "一", rkCls: "r1", s: "42,800", p: "+42.8", pCls: "p" },
  { dt: "04.07", mt: "鳳凰位戦A1 第4節C卓", sub: "最終節直前の重要局", rk: "三", rkCls: "", s: "22,100", p: "−9.9", pCls: "m" },
  { dt: "03.24", mt: "Mリーグ 第104戦", sub: "KADOKAWAサクラナイツ戦", rk: "一", rkCls: "r1", s: "38,900", p: "+38.9", pCls: "p" },
  { dt: "03.17", mt: "鳳凰位戦A1 第4節B卓", sub: "トップ独走", rk: "一", rkCls: "r1", s: "34,300", p: "+34.3", pCls: "p" },
  { dt: "03.10", mt: "Mリーグ 第101戦", sub: "赤坂ドリブンズ戦", rk: "二", rkCls: "", s: "28,400", p: "+8.4", pCls: "p" },
  { dt: "02.24", mt: "Mリーグ 第98戦", sub: "セガサミーフェニックス戦", rk: "二", rkCls: "", s: "32,100", p: "+12.1", pCls: "p" },
  { dt: "02.17", mt: "Mリーグセミファイナル", sub: "激戦 · 最終局トップまくり", rk: "一", rkCls: "r1", s: "45,200", p: "+45.2", pCls: "p" },
  { dt: "01.20", mt: "鳳凰位戦A1 第3節B卓", sub: "", rk: "一", rkCls: "r1", s: "42,100", p: "+42.1", pCls: "p" },
  { dt: "12.16", mt: "鳳凰位戦A1 第2節A卓", sub: "", rk: "二", rkCls: "", s: "31,800", p: "+15.8", pCls: "p" },
];

export default function PlayerSetokuma() {
  return (
    <div className="wrap">
      {/* PLAYER HERO */}
      <section className="p-hero">
        <div className="portrait">
          <div className="badge-floating">● NOW LIVE</div>
          <div className="avatar-big">瀬</div>
        </div>
        <div className="info">
          <div className="crumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span>
            <a href="#">Players</a>
            <span className="sep">›</span>
            <Link href="/organizations/jpml">JPML</Link>
            <span className="sep">›</span>
            <span>瀬戸熊 直樹</span>
          </div>
          <span className="kicker">● 日本プロ麻雀連盟 · A1リーグ · 第14期生</span>
          <h1>
            瀬戸熊 直樹
            <span className="en">Naoki Setokuma · &quot;暴君&quot; · b. 1970</span>
          </h1>
          <div className="nickname">
            クマクマタイム <span className="q">Kuma-Kuma Time</span>
          </div>
          <div className="tags-row">
            <span className="tag-chip v">● 鳳凰位 ×3</span>
            <span className="tag-chip g">★ 十段位 ×3</span>
            <span className="tag-chip">無双位 ×2</span>
            <span className="tag-chip">Mリーグ TEAM RAIDEN/雷電</span>
          </div>
        </div>
        <div className="side">
          <div className="kv">
            <div className="l">Total Titles 獲得タイトル</div>
            <div className="v">
              <b>10</b> 冠
            </div>
          </div>
          <div className="kv">
            <div className="l">Current Rank A1リーグ順位</div>
            <div className="v">
              データ準備中
            </div>
          </div>
          <div className="kv">
            <div className="l">Win Rate トップ率</div>
            <div className="v">
              データ準備中
            </div>
          </div>
          <div className="kv">
            <div className="l">Pro Since プロ歴</div>
            <div className="v">
              <b>29</b> 年{" "}
              <span style={{ fontFamily: "'Geist Mono'", fontSize: 11, color: "rgba(235,228,210,.6)" }}>SINCE 1997</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATS 4 */}
      <div className="stats4">
        <div className="stat-b v">
          <div className="lb">
            Career Titles <span className="en">通算タイトル</span>
          </div>
          <div className="v-num">
            10<span className="u">冠</span>
          </div>
          <div className="sub">鳳凰位3 / 十段位3 / 無双位2 / 他2</div>
        </div>
        <div className="stat-b dark">
          <div className="lb">
            Top Rate <span className="en">1着率</span>
          </div>
          <div className="v-num" style={{ fontSize: 24, marginTop: 14 }}>
            データ準備中
          </div>
          <div className="sub">—</div>
        </div>
        <div className="stat-b">
          <div className="lb">
            4th Avoidance <span className="en">4着回避率</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            —<span className="u">%</span>
          </div>
          <div className="sub">データ準備中</div>
        </div>
        <div className="stat-b">
          <div className="lb">
            Best Score <span className="en">最高スコア</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            —<span className="u">pt</span>
          </div>
          <div className="sub">データ準備中</div>
        </div>
      </div>

      {/* TWO COL: bio + facts */}
      <div className="two-col">
        <div>
          <h2 className="sh">
            <span>プロフィール</span>
            <span className="num">Profile</span>
            <span className="rule"></span>
          </h2>
          <section className="bio-box">
            <h3>
              瀬戸熊 直樹という雀士<span className="en">The Tyrant of Kuma-Kuma Time</span>
            </h3>
            <p>
              「暴君」の異名を持つ攻撃型雀士。1970年千葉県生まれ、東京経済大学出身。1997年に日本プロ麻雀連盟第14期生としてプロ入り。初タイトルは第6期無双位で、以降は鳳凰位を第26・27・29期（2009・2010・2012年）の3度獲得、十段位も第28・29・30期（2011〜2013年）と3連覇を達成するなど、通算10冠を誇る。
            </p>
            <p>
              高い打点力と攻撃的な打ち筋が持ち味で、局面を読み切った上での強烈な押しが「クマクマタイム」と呼ばれ恐れられている。Mリーグでは2018年の発足時からTEAM RAIDEN/雷電に所属。現在は連盟九段・理事を務めている。
            </p>
            <p>
              趣味は海外ドラマ・漫画・アニメ。血液型はO型。鳳凰位戦と十段位戦の両方で複数回の優勝を果たした、連盟を代表するトッププロの一人である。
            </p>
          </section>

          <h2 className="sh">
            <span>スタイル分析</span>
            <span className="num">Playing Style</span>
            <span className="rule"></span>
            <span className="more">ATTACK-TYPE</span>
          </h2>
          <section className="style-chart">
            <h3>
              攻守のバランス<span className="en">Offense × Defense</span>
            </h3>
            <div className="sc-bars">
              {STYLE_BARS.map((b, i) => (
                <div key={i} className="sc-bar">
                  <div className="lab">
                    {b.lab}
                    <span className="en">{b.en}</span>
                  </div>
                  <div className="track">
                    <div className={`fill ${b.cls}`.trim()} style={{ width: `${b.width}%` }}></div>
                  </div>
                  <div className="n">{b.width}</div>
                </div>
              ))}
            </div>
            <div className="sc-note">
              <b>評</b> 「暴君」の異名が示す通り、圧倒的な攻撃力と打点力で卓を支配する攻撃型雀士。局面を読み切った上での強烈な押しは「クマクマタイム」と呼ばれ、対戦相手を恐れさせる。鳳凰位3期・十段位3期という連盟の二大タイトルを制した実力は本物。
            </div>
          </section>
        </div>

        <div>
          <h2 className="sh">
            <span>基本情報</span>
            <span className="num">Facts</span>
            <span className="rule"></span>
          </h2>
          <section className="fact-box">
            <div className="fhd">
              <span className="t">
                BASIC DATA <span className="en">Personal</span>
              </span>
            </div>
            <ul>
              <li>
                <span className="l">Born 生年月日</span>
                <span className="v">
                  1970年<span className="h"> 08.27</span> · 千葉県
                </span>
              </li>
              <li>
                <span className="l">Blood 血液型</span>
                <span className="v">O 型</span>
              </li>
              <li>
                <span className="l">Education 学歴</span>
                <span className="v">東京経済大学</span>
              </li>
              <li>
                <span className="l">Debut プロ入り</span>
                <span className="v">
                  1997年 · <span className="h">連盟第14期生</span>
                </span>
              </li>
              <li>
                <span className="l">Career プロ歴</span>
                <span className="v">
                  <span className="h">29</span> 年
                </span>
              </li>
              <li>
                <span className="l">Rank 段位</span>
                <span className="v">九段（連盟理事）</span>
              </li>
              <li>
                <span className="l">League リーグ</span>
                <span className="v">A1</span>
              </li>
              <li>
                <span className="l">M League Mリーグ</span>
                <span className="v">
                  TEAM RAIDEN / 雷電（2018〜）
                </span>
              </li>
              <li>
                <span className="l">Hobby 趣味</span>
                <span className="v">海外ドラマ · 漫画 · アニメ</span>
              </li>
            </ul>
          </section>

          <h2 className="sh" style={{ marginTop: 24 }}>
            <span>関連プロ</span>
            <span className="num">Rivals</span>
            <span className="rule"></span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { av: "前", nm: "前原 雄大", meta: "連盟 · 鳳凰位5回", tag: "A1ライバル" },
              { av: "佐", nm: "佐々木 寿人", meta: "連盟 · 十段位5回", tag: "A1ライバル" },
              { av: "滝", nm: "滝沢 和典", meta: "連盟 · 王位2回", tag: "A1ライバル" },
              { av: "藤", nm: "藤崎 智", meta: "連盟 · 第32期鳳凰位", tag: "同世代" },
            ].map((r, i) => (
              <a key={i} className="related-card" href="#">
                <div className="avatar">{r.av}</div>
                <div className="nm">{r.nm}</div>
                <div className="meta">{r.meta}</div>
                <span className="tag">{r.tag}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CAREER CHART */}
      <h2 className="sh">
        <span>キャリアハイライト</span>
        <span className="num">Career by Year</span>
        <span className="rule"></span>
        <span className="more">14 YEARS OF DATA</span>
      </h2>
      <section className="career-chart">
        <h3>
          年間獲得ポイント推移<span className="en">Annual Point Trajectory · 2012–2026</span>
        </h3>
        <div className="cc-grid">
          {CAREER_BARS.map((b, i) => (
            <div key={i} className={`cc-bar ${b.cls}`.trim()} style={{ height: `${b.h}%` }}>
              {b.v}
            </div>
          ))}
        </div>
        <div className="cc-labels">
          <span>2012</span>
          <span>&apos;13</span>
          <span>&apos;14</span>
          <span>&apos;15</span>
          <span>&apos;16</span>
          <span>&apos;17</span>
          <span>&apos;18</span>
          <span>&apos;19</span>
          <span>&apos;20</span>
          <span>&apos;21</span>
          <span>&apos;22</span>
          <span>&apos;23</span>
          <span>&apos;24</span>
          <span>&apos;26</span>
        </div>
        <div className="cc-legend">
          <span>
            <span className="k" style={{ background: "var(--vermilion)" }}></span>タイトル獲得年
          </span>
          <span>
            <span className="k" style={{ background: "#a07e28" }}></span>決定戦進出年
          </span>
          <span>
            <span className="k" style={{ background: "var(--ink)" }}></span>通常シーズン
          </span>
        </div>
      </section>

      {/* TITLES TIMELINE + RECENT MATCHES */}
      <div className="two-col" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
        <section className="timeline">
          <div className="hd">
            <span className="t">
              獲得タイトル <span className="en">All Titles Won</span>
            </span>
            <span className="n">10 TITLES · SINCE 1997</span>
          </div>
          <ul className="timeline-list">
            {TITLES.map((t, i) => (
              <li key={i} className={t.noChamp ? "" : "champ"}>
                <span className="yr">{t.yr}</span>
                <span className="dot"></span>
                <span className="what">
                  {t.what}
                  <span className="sub">{t.sub}</span>
                </span>
                {t.tag && <span className={`tag ${t.tagCls}`.trim()}>{t.tag}</span>}
              </li>
            ))}
          </ul>
        </section>

        <div>
          <h2 className="sh" style={{ marginTop: 0 }}>
            <span>最近の対局</span>
            <span className="num">Recent Matches</span>
            <span className="rule"></span>
          </h2>
          <section className="recent-matches">
            <div className="rhd">
              <span className="t">
                直近10対局 <span className="en">Last 10 Matches</span>
              </span>
              <span style={{ fontFamily: "'Geist Mono'", fontSize: 11, color: "#f0c86d", letterSpacing: "0.1em" }}>AVG RANK 1.9</span>
            </div>
            <table className="rm-table">
              <thead>
                <tr>
                  <th>日付</th>
                  <th>対局</th>
                  <th style={{ width: 40 }}>順位</th>
                  <th className="n">素点</th>
                  <th className="n">得点</th>
                </tr>
              </thead>
              <tbody>
                {RECENT.map((r, i) => (
                  <tr key={i}>
                    <td className="dt">
                      {r.dt}
                      {r.live && (
                        <span style={{ display: "block", color: "var(--vermilion)", fontWeight: 700, fontSize: 10 }}>
                          LIVE
                        </span>
                      )}
                    </td>
                    <td className="mt">
                      {r.mt}
                      {r.sub && <span className="sub">{r.sub}</span>}
                    </td>
                    <td className={`rk ${r.rkCls}`.trim()}>{r.rk}</td>
                    <td className="n">{r.s}</td>
                    <td className={`n ${r.pCls}`.trim()}>{r.p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>

      {/* RELATED */}
      <h2 className="sh" style={{ marginTop: 28 }}>
        <span>所属団体·参加タイトル戦</span>
        <span className="num">Organization & Titles</span>
        <span className="rule"></span>
      </h2>
      <div className="related-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        <Link
          className="related-card"
          href="/organizations/jpml"
          style={{ background: "var(--vermilion)", color: "var(--paper)", boxShadow: "5px 5px 0 var(--ink)" }}
        >
          <div className="meta" style={{ color: "rgba(255,255,255,.75)" }}>JPML · 1981</div>
          <div className="nm" style={{ fontSize: 26, marginTop: 4 }}>日本プロ麻雀連盟</div>
          <div className="meta" style={{ color: "rgba(255,255,255,.75)", marginTop: 6 }}>
            所属612名 / 第14期生として在籍29年
          </div>
          <span className="tag" style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 14 }}>
            団体ページへ →
          </span>
        </Link>
        <Link className="related-card" href="/titles/houou-isen">
          <div className="meta">JPML · G1リーグ</div>
          <div className="nm" style={{ fontSize: 24 }}>鳳凰位戦</div>
          <div className="meta">第41期 · 進行中</div>
          <span className="tag">出場中</span>
        </Link>
        <a className="related-card" href="#">
          <div className="meta">Mリーグ · 2018〜</div>
          <div className="nm" style={{ fontSize: 22 }}>TEAM RAIDEN / 雷電</div>
          <div className="meta">2018年Mリーグ発足時より所属</div>
          <span className="tag">所属中</span>
        </a>
      </div>
    </div>
  );
}
