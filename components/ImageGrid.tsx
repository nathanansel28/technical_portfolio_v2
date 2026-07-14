import Image from "next/image";
import { fullBleedStyle, type FullBleed } from "@/lib/full-bleed";

type ImageGridItem = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ImageGrid({
  images,
  columns = 2,
  fullBleed,
  caption,
  captionSpacing = "mt-3",
  aspectRatio = "4/3",
  gap = "gap-4",
}: {
  images: ImageGridItem[];
  columns?: 2 | 3 | 4 | 5;
  fullBleed?: FullBleed;
  caption?: string;
  captionSpacing?: string;
  // CSS aspect-ratio value for each cell, e.g. "4/3", "9/16", "1/1" —
  // set this to match the images' actual proportions so object-contain
  // isn't letterboxing them down inside a mismatched box.
  aspectRatio?: string;
  // Raw Tailwind gap class between cells, e.g. "gap-6", "gap-x-8 gap-y-4".
  gap?: string;
}) {
  const gridColsClass =
    columns === 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : columns === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : columns === 3
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-1 sm:grid-cols-2";

  const sizes =
    columns === 5
      ? "(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
      : columns === 4
        ? "(min-width: 640px) 25vw, 50vw"
        : columns === 3
          ? "(min-width: 640px) 33vw, 50vw"
          : "(min-width: 640px) 50vw, 100vw";

  return (
    <figure className="not-prose my-6" style={fullBleedStyle(fullBleed)}>
      <div className={`grid ${gap} ${gridColsClass}`}>
        {images.map((image, i) => (
          <figure key={i} className="flex flex-col gap-2">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio }}
            >
              {/\.gif$/i.test(image.src) ? (
                // next/image re-encodes GIFs during optimization, which
                // strips animation — use a plain <img> to preserve it.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 h-full w-full object-contain"
                />
              ) : (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={sizes}
                  className="object-contain"
                />
              )}
            </div>
            {image.caption ? (
              <figcaption className="text-center text-sm text-foreground/60">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {caption ? (
        <figcaption className={`${captionSpacing} text-center text-sm text-foreground/60 ${fullBleed ? "px-6" : ""}`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

