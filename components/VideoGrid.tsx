import VideoEmbed from "./VideoEmbed";
import { fullBleedStyle, type FullBleed } from "@/lib/full-bleed";

type VideoGridItem = {
  src: string;
  title: string;
  description?: string;
};

export default function VideoGrid({
  videos,
  columns = 3,
  hoverPlay = false,
  fullBleed,
}: {
  videos: VideoGridItem[];
  columns?: 2 | 3;
  hoverPlay?: boolean;
  fullBleed?: FullBleed;
}) {
  return (
    <div className="not-prose my-6" style={fullBleedStyle(fullBleed)}>
      <div
        className={`grid gap-x-6 gap-y-8 ${
          columns === 3
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {videos.map((video, i) => (
          <div key={i} className="flex flex-col gap-2">
            <VideoEmbed
              src={video.src}
              hoverPlay={hoverPlay}
              className="w-full rounded-lg border border-black/10"
            />
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {video.title}
              </h4>
              {video.description ? (
                <p className="mt-0.5 text-sm text-foreground/60">
                  {video.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
