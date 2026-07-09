import Image from "next/image";

type ImageGridItem = {
  src: string;
  alt: string;
  caption?: string;
};

export default function ImageGrid({
  images,
  columns = 2,
}: {
  images: ImageGridItem[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={`not-prose my-6 grid gap-4 ${
        columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {images.map((image, i) => (
        <figure key={i} className="flex flex-col gap-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-black/5 bg-black/[.02]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={
                columns === 3
                  ? "(min-width: 640px) 33vw, 50vw"
                  : "(min-width: 640px) 50vw, 100vw"
              }
              className="object-contain"
            />
          </div>
          {image.caption ? (
            <figcaption className="text-center text-sm text-foreground/60">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
