import { notFound } from "next/navigation";
import { ALL_PLAYERS } from "@/app/players/data";
import { PlayerPage } from "@/components/PlayerPage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return ALL_PLAYERS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const player = ALL_PLAYERS.find((p) => p.id === id);
  if (!player) return {};
  return {
    title: `${player.name}（${player.nameEn}） — Hora.mg`,
    description: `${player.name}のプロフィール・成績・タイトル歴。${player.org} ${player.league}所属。`,
  };
}

export default async function PlayerDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = ALL_PLAYERS.find((p) => p.id === id);
  if (!player) notFound();
  return <PlayerPage player={player} />;
}
