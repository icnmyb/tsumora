import Link from "next/link";
import type { Metadata } from "next";
import { NEWS, getCategoryLabel } from "./data";

export const metadata: Metadata = {
  title: "ニュース — TSUMORA",
  description:
    "麻雀プロ団体のタイトル戦結果・Mリーグ進行など、TSUMORA 編集部が選んだ注目記事の一覧。",
};

export default function NewsIndexPage() {
  const articles = [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const top = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="wrap">
      <section className="news-index-hd">
        <div className="news-index-kicker">
          <span>●</span> NEWS · 注目記事
        </div>
        <h1 className="news-index-title">ニュース</h1>
        <p className="news-index-en">
          Editor&apos;s picks from across the major Japanese mahjong leagues.
        </p>
      </section>

      {top && (
        <Link href={`/news/${top.slug}`} className="news-top">
          <div className="news-top-meta">
            <span className="news-top-cat">{getCategoryLabel(top.category)}</span>
            <span className="news-top-date">{top.date}</span>
          </div>
          <h2 className="news-top-headline">{top.headline}</h2>
          <p className="news-top-lead">{top.lead}</p>
          <span className="news-top-cta">全文を読む →</span>
        </Link>
      )}

      <section className="news-list">
        {rest.map((n) => (
          <Link key={n.slug} href={`/news/${n.slug}`} className="news-item">
            <div className="news-item-meta">
              <span className={`news-item-cat news-cat-${n.category}`}>
                {getCategoryLabel(n.category)}
              </span>
              <span className="news-item-date">{n.date}</span>
            </div>
            <h3 className="news-item-headline">{n.headline}</h3>
            <p className="news-item-lead">{n.lead}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
