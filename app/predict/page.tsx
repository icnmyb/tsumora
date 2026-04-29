import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mリーグ予想ゲーム（Coming Soon）— TSUMORA",
  description:
    "TSUMORA の Mリーグ予想ゲームは、2026-27 シーズン開幕（2026年9月）に合わせて公開予定。",
  openGraph: {
    title: "Mリーグ予想ゲーム（Coming Soon）— TSUMORA",
    description:
      "TSUMORA の予想ゲーム、Mリーグ 2026-27 開幕に合わせて公開。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function PredictComingSoonPage() {
  return (
    <div className="wrap">
      <section className="news-index-hd">
        <div className="news-index-kicker">
          <span>●</span> COMING SOON
        </div>
        <h1 className="news-index-title">
          Mリーグ予想ゲーム<span className="comma">、</span>
          <span className="em">準備中。</span>
        </h1>
        <p className="news-index-en">
          Pro Mahjong Prediction — Launching with M.LEAGUE 2026-27 (Sep 2026).
        </p>
      </section>

      <article
        style={{
          maxWidth: "720px",
          margin: "var(--space-section, 6rem) auto",
          lineHeight: 1.9,
          color: "var(--ink)",
        }}
      >
        <p>
          TSUMORA の Mリーグ予想ゲームは、Mリーグ 2026-27
          シーズン開幕（2026年9月予定）に合わせて公開します。
        </p>

        <h2>準備中の機能</h2>
        <ul>
          <li>1着予想（全80試合・所要時間 5秒）</li>
          <li>少数派ボーナス・連続的中ボーナス</li>
          <li>X 連携で2倍ポイント</li>
          <li>シーズンランキング</li>
          <li>推し雀士フォロー</li>
        </ul>

        <p>
          編集メディア TSUMORA との一貫した世界観で設計します。利用は完全無料の予定。
        </p>

        <p style={{ marginTop: "3em" }}>
          → <Link href="/">トップページへ戻る</Link>
        </p>
      </article>
    </div>
  );
}
