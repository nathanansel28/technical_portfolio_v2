"use client";

import { useRef, useSyncExternalStore } from "react";

function isEmbedUrl(src: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
}

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeHoverSupport(callback: () => void) {
  const mql = window.matchMedia(HOVER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getHoverSupport() {
  return window.matchMedia(HOVER_QUERY).matches;
}

function getHoverSupportServerSnapshot() {
  return false;
}

function toEmbedUrl(src: string): string {
  const youtubeWatch = src.match(/youtube\.com\/watch\?v=([\w-]+)/);
  if (youtubeWatch) return `https://www.youtube.com/embed/${youtubeWatch[1]}`;

  const youtubeShort = src.match(/youtu\.be\/([\w-]+)/);
  if (youtubeShort) return `https://www.youtube.com/embed/${youtubeShort[1]}`;

  const vimeo = src.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return src;
}

export default function VideoEmbed({
  src,
  hoverPlay = false,
  className,
}: {
  src: string;
  hoverPlay?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Only devices with real hover (mouse/trackpad) get the hover-play
  // treatment — touch devices have no hover, so they fall back to a
  // normal video with controls.
  const supportsHover = useSyncExternalStore(
    subscribeHoverSupport,
    getHoverSupport,
    getHoverSupportServerSnapshot
  );

  if (isEmbedUrl(src)) {
    return (
      <div
        className={
          className ??
          "relative my-6 aspect-video w-full overflow-hidden rounded-lg border border-black/10"
        }
      >
        <iframe
          src={toEmbedUrl(src)}
          title="Embedded video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const useHoverPlay = hoverPlay && supportsHover;

  return (
    <video
      ref={videoRef}
      controls={!useHoverPlay}
      muted={useHoverPlay}
      loop={useHoverPlay}
      playsInline
      className={className ?? "my-6 w-full rounded-lg border border-black/10"}
      src={src}
      onMouseEnter={useHoverPlay ? () => videoRef.current?.play() : undefined}
      onMouseLeave={
        useHoverPlay
          ? () => {
              const v = videoRef.current;
              if (!v) return;
              v.pause();
              v.currentTime = 0;
            }
          : undefined
      }
    />
  );
}
