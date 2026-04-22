import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="main">
      <div className="wrap">
        <div>
          <div className="big-mark">
            Hora<span className="dot">.mg</span>
          </div>
          <div
            style={{
              fontFamily: "'Instrument Serif'",
              fontStyle: "italic",
              fontSize: 18,
              color: "rgba(235,228,210,.6)",
            }}
          >
            The Pro Mahjong Review
          </div>
          <div className="desc">
            5つのプロ団体とMリーグの対局・成績・選手情報を横断する総合データベース。対局スケジュールから歴代タイトルまで、プロ麻雀のすべてを一つの画面で。
          </div>
        </div>
        <div>
          <h4>
            プロ団体<span className="en">Organizations</span>
          </h4>
          <ul>
            <li><Link href="/organizations/jpml">日本プロ麻雀連盟</Link></li>
            <li><Link href="/organizations/npm">日本プロ麻雀協会</Link></li>
            <li><Link href="/organizations/saikouisen">最高位戦日本プロ麻雀協会</Link></li>
            <li><Link href="/organizations/rmu">RMU</Link></li>
            <li><Link href="/organizations/mu">麻将連合-μ-</Link></li>
          </ul>
        </div>
        <div>
          <h4>
            コンテンツ<span className="en">Contents</span>
          </h4>
          <ul>
            <li><Link href="/schedule">対局スケジュール</Link></li>
            <li><Link href="/titles">タイトル戦図鑑</Link></li>
            <li><Link href="/players">プロ選手データベース</Link></li>
            <li><Link href="/rankings">ランキング</Link></li>
            <li><Link href="/rules">競技ルール</Link></li>
            <li><Link href="/mleague">Mリーグ</Link></li>
          </ul>
        </div>
        <div>
          <h4>
            サイト情報<span className="en">About</span>
          </h4>
          <ul>
            <li>このサイトについて</li>
            <li>データ更新について</li>
            <li>お問い合わせ</li>
            <li>運営会社</li>
            <li>利用規約</li>
          </ul>
        </div>
        <div className="cr">
          <span>© 2026 Hora.mg · データは各公式サイトより集約 · 1日1回更新</span>
          <span>VOL.142 · ISSUE 2026-04-21</span>
        </div>
      </div>
    </footer>
  );
}
