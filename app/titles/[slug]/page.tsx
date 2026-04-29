import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TITLES, getTitleBySlug } from "@/app/titles/data";
import { TitleDetailPage } from "@/components/TitleDetailPage";

export function generateStaticParams() {
  return TITLES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) return {};
  return {
    title: `${title.name} — ${title.orgLabel} | TSUMORA`,
    description: title.about[0] ?? `${title.name}の概要・歴代優勝者・ルール`,
  };
}

export default async function TitlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getTitleBySlug(slug);
  if (!title) notFound();
  return <TitleDetailPage title={title} />;
}
