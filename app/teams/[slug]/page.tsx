import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTeamBySlug, TEAMS } from "@/app/teams/data";
import { TeamDetailPage } from "@/components/TeamDetailPage";

export function generateStaticParams() {
  return TEAMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) return {};
  return {
    title: `${team.name} — Mリーグ — TSUMORA`,
    description: `${team.name} (${team.nameEn}) — ${team.parentCompany} 運営。${team.joinedSeason}シーズン参入、優勝${team.championships}回。${team.tagline}`,
  };
}

export default async function TeamSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const team = getTeamBySlug(slug);
  if (!team) notFound();
  return <TeamDetailPage team={team} />;
}
