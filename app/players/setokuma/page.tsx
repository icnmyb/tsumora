import { ALL_PLAYERS } from "@/app/players/data";
import { PlayerPage } from "@/components/PlayerPage";
import { notFound } from "next/navigation";

export default function PlayerSetokuma() {
  const player = ALL_PLAYERS.find(p => p.id === "setokuma");
  if (!player) return notFound();
  return <PlayerPage player={player} />;
}
