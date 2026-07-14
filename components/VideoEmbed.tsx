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

function toEmbedUrl(src: string, autoPlay: boolean): string {
  const youtubeWatch = src.match(/youtube\.com\/watch\?v=([\w-]+)/);
  const youtubeShort = src.match(/youtu\.be\/([\w-]+)/);
  const youtubeId = youtubeWatch?.[1] ?? youtubeShort?.[1];
  if (youtubeId) {
    const params = autoPlay ? "?autoplay=1&mute=1&loop=1&playlist=" + youtubeId : "";
    return `https://www.youtube.com/embed/${youtubeId}${params}`;
  }

  const vimeo = src.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    const params = autoPlay ? "?autoplay=1&muted=1&loop=1" : "";
    return `https://player.vimeo.com/video/${vimeo[1]}${params}`;
  }

  return src;
}

export default function VideoEmbed({
  src,
  hoverPlay = false,
  autoPlay = false,
  className,
}: {
  src: string;
  hoverPlay?: boolean;
  // Plays muted and looping as soon as the video is on the page — no
  // hover/click needed. Intended for side-by-side comparisons (e.g. in a
  // VideoGrid) where the viewer needs to see multiple clips running at
  // once. Takes precedence over hoverPlay if both are set. For embed URLs
  // (YouTube/Vimeo), relies on the platform's own autoplay+mute query
  // params rather than the self-hosted <video> element.
  autoPlay?: boolean;
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
          src={toEmbedUrl(src, autoPlay)}
          title="Embedded video"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const useHoverPlay = !autoPlay && hoverPlay && supportsHover;

  return (
    <video
      ref={videoRef}
      controls={!useHoverPlay}
      muted={useHoverPlay || autoPlay}
      loop={useHoverPlay || autoPlay}
      autoPlay={autoPlay}
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
