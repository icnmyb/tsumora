import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NEWS, getCategoryLabel, getNewsBySlug } from "../data";
import { TITLES } from "@/app/titles/data";
import { ALL_PLAYERS } from "@/app/players/data";
import { getTeamBySlug } from "@/app/teams/data";

export function generateStaticParams() {
  return NEWS.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.seoTitle ?? article.headline} — TSUMORA`,
    description: article.seoDescription ?? article.lead,
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const relatedTitles =
    article.related
      ?.filter((r) => r.type === "title")
      .map((r) => TITLES.find((t) => t.slug === r.id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t)) ?? [];

  const relatedPlayers =
    article.related
      ?.filter((r) => r.type === "player")
      .map((r) => ALL_PLAYERS.find((p) => p.id === r.id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)) ?? [];

  const relatedTeams =
    article.related
      ?.filter((r) => r.type === "team")
      .map((r) => getTeamBySlug(r.id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t)) ?? [];

  return (
    <div className="wrap">
      <article className="news-article">
        <Link href="/news" className="news-back">
          ← ニュース一覧
        </Link>

        <div className="news-article-meta">
          <span className={`news-item-cat news-cat-${article.category}`}>
            {getCategoryLabel(article.category)}
          </span>
          <span className="news-article-date">{article.date}</span>
          {article.publishedAt && (
            <span className="news-article-date">
              公開 {article.publishedAt.slice(0, 10)}
            </span>
          )}
        </div>

        <h1 className="news-article-headline">{article.headline}</h1>
        <p className="news-article-lead">{article.lead}</p>

        <div className="news-article-body">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {article.sources && article.sources.length > 0 && (
          <aside className="news-article-related">
            <div className="news-related-hd">出典</div>
            <div className="news-related-list">
              {article.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news-related-item"
                >
                  <span className="news-related-tag">確認 {source.checkedAt}</span>
                  {source.label}
                </a>
              ))}
            </div>
          </aside>
        )}

        {(relatedTitles.length > 0 || relatedPlayers.length > 0 || relatedTeams.length > 0) && (
          <aside className="news-article-related">
            <div className="news-related-hd">関連</div>
            <div className="news-related-list">
              {relatedTitles.map((t) => (
                <Link key={t.slug} href={`/titles/${t.slug}`} className="news-related-item">
                  <span className="news-related-tag">タイトル</span>
                  {t.name}
                </Link>
              ))}
              {relatedPlayers.map((p) => (
                <Link key={p.id} href={`/players/${p.id}`} className="news-related-item">
                  <span className="news-related-tag">選手</span>
                  {p.name}
                </Link>
              ))}
              {relatedTeams.map((t) => (
                <Link key={t.slug} href={`/teams/${t.slug}`} className="news-related-item">
                  <span className="news-related-tag">チーム</span>
                  {t.name}
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
}
