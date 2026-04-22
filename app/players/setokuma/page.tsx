import Link from "next/link";

const STYLE_BARS = [
  { lab: "攻撃力", en: "Offense", width: 68, cls: "v" },
  { lab: "守備力", en: "Defense", width: 92, cls: "" },
  { lab: "読み", en: "Reading", width: 96, cls: "" },
  { lab: "押し引き", en: "Push-Fold", width: 94, cls: "" },
  { lab: "速度", en: "Speed", width: 62, cls: "g" },
  { lab: "打点", en: "Power", width: 72, cls: "g" },
  { lab: "精神力", en: "Mental", width: 98, cls: "m" },
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
  { yr: "進行中", what: "第42期鳳凰位戦", sub: "A1首位 +124.5 · 4連覇なるか", tag: "LEAD", tagCls: "final" },
  { yr: "2024-25", what: "第41期鳳凰位戦", sub: "3連覇達成 · 通算3冠目", tag: "優勝", tagCls: "win" },
  { yr: "2023-24", what: "第40期鳳凰位戦", sub: "2連覇 · 決定戦で佐々木を下す", tag: "優勝", tagCls: "win" },
  { yr: "2022-23", what: "第39期鳳凰位戦", sub: "初の鳳凰位 · 決定戦4日目逆転", tag: "優勝", tagCls: "win" },
  { yr: "2021", what: "第17期プロクイーン", sub: "男子選手初の招待優勝 · 招待制", tag: "優勝", tagCls: "win" },
  { yr: "2019", what: "第44期王位戦", sub: "通算2度目の王位", tag: "優勝", tagCls: "win" },
  { yr: "2018", what: "Mリーグ初年度出場", sub: "KONAMI麻雀格闘倶楽部 · キャプテン", tag: "参加", tagCls: "win" },
  { yr: "2016", what: "第41期王位戦", sub: "初の王位獲得", tag: "優勝", tagCls: "win" },
  { yr: "2013", what: "第30期十段位戦", sub: "プロ入り後16年目の初タイトル", tag: "優勝", tagCls: "win" },
  { yr: "1997", what: "日本プロ麻雀連盟入会", sub: "第13期生 · プロデビュー", tag: "", tagCls: "", noChamp: true },
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
          <span className="kicker">● 日本プロ麻雀連盟 · A1リーグ · 第13期生</span>
          <h1>
            瀬戸熊 直樹
            <span className="en">Naoki Setokuma · &quot;熊&quot; · b. 1971</span>
          </h1>
          <div className="nickname">
            クマクマタイム <span className="q">Kuma-Kuma Time</span>
          </div>
          <div className="tags-row">
            <span className="tag-chip v">● 現鳳凰位</span>
            <span className="tag-chip g">★ 連盟最多タイトル</span>
            <span className="tag-chip">十段位 ×1</span>
            <span className="tag-chip">王位 ×2</span>
            <span className="tag-chip">Mリーグ 格闘倶楽部</span>
          </div>
        </div>
        <div className="side">
          <div className="kv">
            <div className="l">Total Titles 獲得タイトル</div>
            <div className="v">
              <b>14</b> 冠
            </div>
          </div>
          <div className="kv">
            <div className="l">Current Rank A1リーグ順位</div>
            <div className="v">
              <b>1</b> 位 <span className="mono">+124.5</span>
            </div>
          </div>
          <div className="kv">
            <div className="l">Win Rate トップ率</div>
            <div className="v">
              <b>32.4</b>
              <span className="mono">%</span>
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
            14<span className="u">冠</span>
          </div>
          <div className="sub">鳳凰位3 / 十段位1 / 王位2 / 他8</div>
        </div>
        <div className="stat-b dark">
          <div className="lb">
            Top Rate <span className="en">1着率</span>
          </div>
          <div className="v-num">
            32.4<span className="u">%</span>
          </div>
          <div className="sub">通算2,842戦 / 平均順位 2.38</div>
        </div>
        <div className="stat-b">
          <div className="lb">
            Win / Deal-in <span className="en">和了/放銃</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            23.1<span className="u">%</span> / 9.4<span className="u">%</span>
          </div>
          <div className="sub">和了差 +13.7 · 連盟トップクラスの防御力</div>
        </div>
        <div className="stat-b">
          <div className="lb">
            Avg Score <span className="en">平均得点</span>
          </div>
          <div className="v-num" style={{ fontSize: 36, marginTop: 14 }}>
            +8.4<span className="u">pt</span>
          </div>
          <div className="sub">通算平均 · Mリーグ通算 +287.2</div>
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
              瀬戸熊 直樹という雀士<span className="en">The Thinker of Kuma-Kuma Time</span>
            </h3>
            <p>
              「クマクマタイム」と呼ばれる、局面全体を俯瞰して相手の手牌を読み切る独特の思考スタイルで知られる。連盟第13期生、1997年プロ入り。2013年、第30期十段位を獲得して初タイトル。その後、第39・40・41期と鳳凰位を3連覇し、連盟の最高峰リーグA1を代表する存在となった。
            </p>
            <p>
              攻撃型ではなく、徹底した読みと押し引きの精度で卓を制圧するタイプ。「強者ほど守備が堅い」を体現する雀士として、後進に大きな影響を与えている。Mリーグでは2018年の発足時からKONAMI麻雀格闘倶楽部に所属し、チームの精神的支柱として活躍中。
            </p>
            <p>
              座右の銘は「継続は力なり」。趣味はゴルフと読書。Mリーグ会場でも常に冷静沈着な佇まいで知られ、「日本一静かなトッププロ」の異名を持つ。
            </p>
          </section>

          <h2 className="sh">
            <span>スタイル分析</span>
            <span className="num">Playing Style</span>
            <span className="rule"></span>
            <span className="more">READ-TYPE</span>
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
              <b>評</b> 圧倒的な「読み」と「守備」で卓をコントロールする典型的な思考派雀士。ラス回避率は連盟A1リーグトップ（82.1%）。長考の末に放つ一打には「クマクマタイム」と呼ばれる独自の時間軸があり、対戦相手の思考を止める効果がある。
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
                  1971年<span className="h"> 03.07</span> · 千葉県
                </span>
              </li>
              <li>
                <span className="l">Height 身長</span>
                <span className="v">
                  172 <span className="h">cm</span>
                </span>
              </li>
              <li>
                <span className="l">Blood 血液型</span>
                <span className="v">A 型</span>
              </li>
              <li>
                <span className="l">Debut プロ入り</span>
                <span className="v">
                  1997年 · <span className="h">連盟第13期生</span>
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
                <span className="v">八段</span>
              </li>
              <li>
                <span className="l">League リーグ</span>
                <span className="v">
                  A1 · <span className="h">第5節</span>
                </span>
              </li>
              <li>
                <span className="l">M League Mリーグ</span>
                <span className="v">
                  KONAMI麻雀格闘倶楽部
                  <br />
                  <span style={{ fontFamily: "'Geist Mono'", fontSize: 10, color: "#f0c86d" }}>2018〜 · Captain</span>
                </span>
              </li>
              <li>
                <span className="l">Hobby 趣味</span>
                <span className="v">ゴルフ · 読書</span>
              </li>
              <li>
                <span className="l">Motto 座右の銘</span>
                <span className="v">継続は力なり</span>
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
              { av: "前", nm: "前原 雄大", meta: "連盟 · 鳳凰位2回", tag: "A1ライバル" },
              { av: "佐", nm: "佐々木 寿人", meta: "連盟 · 十段位3回", tag: "A1ライバル" },
              { av: "滝", nm: "滝沢 和典", meta: "連盟 · 第38期鳳凰位", tag: "A1ライバル" },
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
            <span className="n">14 TITLES · SINCE 2013</span>
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
            所属612名 / 第13期生として在籍29年
          </div>
          <span className="tag" style={{ background: "var(--ink)", color: "var(--paper)", marginTop: 14 }}>
            団体ページへ →
          </span>
        </Link>
        <Link className="related-card" href="/titles/houou-isen">
          <div className="meta">JPML · G1リーグ</div>
          <div className="nm" style={{ fontSize: 24 }}>鳳凰位戦</div>
          <div className="meta">第42期 A1首位 +124.5 · 進行中</div>
          <span className="tag" style={{ background: "var(--vermilion)", color: "var(--paper)" }}>● 首位 LIVE</span>
        </Link>
        <a className="related-card" href="#">
          <div className="meta">Mリーグ · 2018〜</div>
          <div className="nm" style={{ fontSize: 22 }}>KONAMI麻雀格闘倶楽部</div>
          <div className="meta">キャプテン · 通算 +287.2pt</div>
          <span className="tag">2025-26 首位</span>
        </a>
      </div>
    </div>
  );
}
