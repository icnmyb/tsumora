import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "予想ゲーム（Coming Soon）— TSUMORA",
  description:
    "TSUMORA の Mリーグ予想ゲームは、Mリーグ 2026-27 シーズン開幕（2026年9月）に合わせて公開予定。",
  openGraph: {
    title: "予想ゲーム（Coming Soon）— TSUMORA",
    description: "Mリーグ 2026-27 開幕同時公開。",
    siteName: "TSUMORA",
    type: "website",
  },
};

export default function PredictComingSoonPage() {
  return (
    <div className="wrap predict-soon">
      <section className="predict-soon-hero">
        <div className="predict-soon-kicker">
          <span>●</span> COMING SOON
        </div>
        <div className="predict-soon-date">
          <span className="year">2026</span>
          <span className="dot">.</span>
          <span className="month">09</span>
        </div>
        <p className="predict-soon-en">
          Pro Mahjong Prediction — Launching with M.LEAGUE 2026-27.
        </p>
      </section>

      <article className="predict-soon-body">
        <p className="predict-soon-lead">
          <strong>Mリーグ 2026-27 シーズン開幕（2026年9月予定）</strong>
          に合わせて公開予定。
        </p>

        <h2>準備中の機能</h2>
        <ol className="predict-soon-features">
          <li>
            <span className="num">01</span>
            <div className="ft-text">
              <h3>1着予想</h3>
              <p>全80試合、1試合5秒で参加</p>
            </div>
          </li>
          <li>
            <span className="num">02</span>
            <div className="ft-text">
              <h3>少数派ボーナス</h3>
              <p>みんなと違う読みが、報われる</p>
            </div>
          </li>
          <li>
            <span className="num">03</span>
            <div className="ft-text">
              <h3>連続的中ボーナス</h3>
              <p>連勝で得点が乗る</p>
            </div>
          </li>
          <li>
            <span className="num">04</span>
            <div className="ft-text">
              <h3>X 連携で 2倍</h3>
              <p>ポストすればポイント倍増</p>
            </div>
          </li>
          <li>
            <span className="num">05</span>
            <div className="ft-text">
              <h3>シーズンランキング</h3>
              <p>最終局まで、上位を狙う</p>
            </div>
          </li>
        </ol>

        <p className="predict-soon-back">
          → <Link href="/">トップページへ戻る</Link>
        </p>
      </article>
    </div>
  );
}
