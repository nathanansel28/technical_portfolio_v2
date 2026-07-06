function isEmbedUrl(src: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(src);
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

export default function VideoEmbed({ src }: { src: string }) {
  if (isEmbedUrl(src)) {
    return (
      <div className="relative my-6 aspect-video w-full overflow-hidden rounded-lg border border-black/10">
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

  return (
    <video
      controls
      className="my-6 w-full rounded-lg border border-black/10"
      src={src}
    />
  );
}
