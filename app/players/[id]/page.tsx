import { notFound } from "next/navigation";
import { ALL_PLAYERS } from "@/app/players/data";
import { PlayerPage } from "@/components/PlayerPage";
import type { Metadata } from "next";

type Params = { id: string };

export function generateStaticParams(): Params[] {
  return ALL_PLAYERS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const player = ALL_PLAYERS.find((p) => p.id === params.id);
  if (!player) return {};
  return {
    title: `${player.name}（${player.nameEn}） — Hora.mg`,
    description: `${player.name}のプロフィール・成績・タイトル歴。${player.org} ${player.league}所属。`,
  };
}

export default function PlayerDynamicPage({ params }: { params: Params }) {
  const player = ALL_PLAYERS.find((p) => p.id === params.id);
  if (!player) notFound();
  return <PlayerPage player={player} />;
}
