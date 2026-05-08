"use client";

import { useState } from "react";
import type { PlayerVideo, PlayerVideoType } from "@/app/players/data";
import { trackEvent } from "@/lib/analytics";

interface Props {
  videos: PlayerVideo[];
  playerName: string;
}

const TYPE_LABEL: Record<PlayerVideoType, string> = {
  highlight: "HIGHLIGHT",
  match: "MATCH",
  interview: "INTERVIEW",
  tactics: "TACTICS",
};

const TYPE_LABEL_JP: Record<PlayerVideoType, string> = {
  highlight: "神業",
  match: "対局",
  interview: "ロングインタビュー",
  tactics: "戦術解説",
};

interface VideoCardProps {
  video: PlayerVideo;
  variant: "main" | "sub";
  isPlaying: boolean;
  onPlay: () => void;
  playerName: string;
}

function VideoCard({ video, variant, isPlaying, onPlay, playerName }: VideoCardProps) {
  const thumbUrl = `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`;
  const fallbackThumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const isMain = variant === "main";

  return (
    <article className={`video-card ${variant}`}>
      <div className="video-frame">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            className="thumb-btn"
            onClick={() => {
              trackEvent("Video Play", {
                player: playerName,
                videoId: video.id,
                type: video.type,
                official: Boolean(video.isOfficial),
              });
              onPlay();
            }}
            aria-label={`動画を再生: ${video.title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={`${playerName} - ${video.title} サムネイル`}
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src !== fallbackThumb) target.src = fallbackThumb;
              }}
            />
            <span className="play-overlay" aria-hidden>
              <span className="play-arrow">▶</span>
            </span>
            <span className="type-tag">{TYPE_LABEL[video.type]}</span>
            {video.isOfficial && <span className="official-tag">公式</span>}
          </button>
        )}
      </div>
      <div className="video-meta">
        <h3 className="v-title">{video.title}</h3>
        <div className="v-sub">
          <span className="v-channel">{video.channel}</span>
          {video.durationLabel && <span className="v-dot">·</span>}
          {video.durationLabel && <span className="v-duration">{video.durationLabel}</span>}
          {video.date && <span className="v-dot">·</span>}
          {video.date && <span className="v-date">{video.date}</span>}
          <span className="v-dot">·</span>
          <span className="v-kind">{TYPE_LABEL_JP[video.type]}</span>
        </div>
        {!isMain && (
          <div style={{ height: 0 }} />
        )}
      </div>
    </article>
  );
}

export function PlayerVideoSection({ videos, playerName }: Props) {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  if (!videos || videos.length === 0) return null;

  const main = videos[0];
  const subs = videos.slice(1, 3);

  return (
    <section className="player-videos">
      <div className="pv-grid">
        <div className="pv-main">
          <VideoCard
            video={main}
            variant="main"
            isPlaying={playingIdx === 0}
            onPlay={() => setPlayingIdx(0)}
            playerName={playerName}
          />
        </div>
        {subs.length > 0 && (
          <div className="pv-subs">
            {subs.map((v, i) => (
              <VideoCard
                key={v.id}
                video={v}
                variant="sub"
                isPlaying={playingIdx === i + 1}
                onPlay={() => setPlayingIdx(i + 1)}
                playerName={playerName}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
