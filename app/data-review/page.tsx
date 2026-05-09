import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "情報確認中 — TSUMORA",
  description: "TSUMORAは掲載データの再確認のため、一部ページを一時的に非公開にしています。",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DataReviewPage() {
  return (
    <main className="wrap">
      <section className="review-hero">
        <div className="review-kicker">TSUMORA DATA REVIEW</div>
        <h1>
          掲載情報を確認中です
          <span>Data pages are temporarily unavailable.</span>
        </h1>
        <p>
          選手プロフィール、団体紹介、タイトル戦、ランキングなどのデータベース系ページは、
          正確性の再確認が完了するまで一時的に非公開にしています。
        </p>
        <p>
          公式情報との照合、表記ゆれの整理、更新フローの見直しを行ったうえで再公開します。
        </p>
        <div className="review-actions">
          <Link href="/about">TSUMORAについて</Link>
        </div>
      </section>

      <style>{`
        .wrap {
          min-height: calc(100vh - 160px);
          display: grid;
          place-items: center;
          padding: 64px 20px;
        }

        .review-hero {
          width: min(860px, 100%);
          border: var(--border);
          box-shadow: 8px 8px 0 var(--ink);
          background: var(--paper);
          padding: clamp(32px, 6vw, 64px);
        }

        .review-kicker {
          font-family: "Geist Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 800;
          color: var(--vermilion);
          letter-spacing: 0.12em;
          margin-bottom: 18px;
        }

        h1 {
          font-family: "Shippori Mincho", serif;
          font-size: clamp(34px, 7vw, 72px);
          line-height: 1.05;
          margin: 0 0 24px;
          letter-spacing: 0;
        }

        h1 span {
          display: block;
          font-family: "Instrument Serif", serif;
          font-style: italic;
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 400;
          color: var(--ink-3);
          margin-top: 10px;
        }

        p {
          font-family: "Noto Sans JP", sans-serif;
          font-size: 16px;
          line-height: 1.9;
          margin: 0 0 14px;
          max-width: 720px;
        }

        .review-actions {
          margin-top: 32px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .review-actions a {
          display: inline-flex;
          align-items: center;
          min-height: 44px;
          padding: 0 18px;
          border: var(--border);
          background: var(--ink);
          color: var(--paper);
          text-decoration: none;
          font-family: "Geist Mono", ui-monospace, monospace;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 36px 16px;
            place-items: start center;
          }

          .review-hero {
            box-shadow: 5px 5px 0 var(--ink);
            padding: 28px 22px;
          }
        }
      `}</style>
    </main>
  );
}
