import { notFound } from "next/navigation";
import { getAllPlayers, getPlayer, isFeaturedPlayer } from "@/app/players/data";
import { PlayerPage } from "@/components/PlayerPage";
import { RosterPlayerPage } from "@/components/RosterPlayerPage";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPlayers().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const player = getPlayer(id);
  if (!player) return {};
  const nameEn = player.nameEn ? `（${player.nameEn}）` : "";
  return {
    title: `${player.name}${nameEn} — Hora.mg`,
    description: `${player.name}のプロフィール。${player.org} ${player.league}所属。`,
  };
}

export default async function PlayerDynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = getPlayer(id);
  if (!player) notFound();
  return isFeaturedPlayer(player)
    ? <PlayerPage player={player} />
    : <RosterPlayerPage player={player} />;
}
