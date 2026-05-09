import { notFound } from "next/navigation";
import { getAllPlayers, getPlayer, isFeaturedPlayer } from "@/app/players/data";
import { PlayerPage } from "@/components/PlayerPage";
import { RosterPlayerPage } from "@/components/RosterPlayerPage";
import type { Metadata } from "next";

const ORG_LABEL: Record<string, string> = {
  JPML: "日本プロ麻雀連盟",
  NPM: "日本プロ麻雀協会",
  最高位戦: "最高位戦日本プロ麻雀協会",
  RMU: "Real Mahjong Unit (RMU)",
  μ: "麻将連合",
};

export function generateStaticParams() {
  return getAllPlayers().map((p) => ({ id: p.id }));
}

function buildDescription(player: ReturnType<typeof getPlayer>): string {
  if (!player) return "";
  const orgLabel = ORG_LABEL[player.org] ?? player.org;
  const parts: string[] = [];

  // Lead
  if (player.nickname) {
    parts.push(`「${player.nickname}」${player.name}`);
  } else {
    parts.push(player.name);
  }

  // Org + league + period
  const orgInfo: string[] = [orgLabel];
  if (player.league && player.league !== "—") {
    orgInfo.push(`${player.league}リーグ`);
  }
  if (player.period) orgInfo.push(`${player.period}生`);
  parts.push(orgInfo.join(" · "));

  // Career hint
  if (player.joinYear) {
    parts.push(`${player.joinYear}年プロ入り`);
  }

  // Mリーグ
  if (player.mleagueTeam) {
    parts.push(`Mリーグ ${player.mleagueTeam} 所属`);
  }

  // Title
  if (player.title) parts.push(player.title);

  // Birthplace
  if (player.birthplace) parts.push(`${player.birthplace}出身`);

  // Featured player gets extra detail from bio
  if (isFeaturedPlayer(player) && player.bio?.[0]) {
    const firstSentence = player.bio[0].split("。")[0];
    if (firstSentence && firstSentence.length < 80) {
      parts.push(firstSentence);
    }
  }

  return parts.join(" / ").slice(0, 200);
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
  const title = `${player.name}${nameEn} — TSUMORA`;
  const description = buildDescription(player);
  const url = `https://tsumora.com${player.href}`;

  // Build dynamic OG image URL using Vercel OG handler
  const orgLabel = ORG_LABEL[player.org] ?? player.org;
  const ogParams = new URLSearchParams({
    name: player.name,
    nameEn: player.nameEn ?? "",
    org: orgLabel,
    league: player.league !== "—" ? player.league : "",
    title: player.title ?? "",
    team: player.mleagueTeam ?? "",
  });
  const ogImage = `/api/og/player?${ogParams.toString()}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "TSUMORA",
      type: "profile",
      locale: "ja_JP",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${player.name} プロフィール - TSUMORA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    keywords: [
      player.name,
      player.nameEn,
      player.org,
      orgLabel,
      "プロ雀士",
      "麻雀",
      ...(player.mleagueTeam ? ["Mリーグ", player.mleagueTeam] : []),
      ...(player.title ? [player.title] : []),
    ].filter((s): s is string => Boolean(s)),
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
