import type { ReactNode } from "react";
import Image from "next/image";

export default function ProjectImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
}) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        sizes="100vw"
        className="h-auto w-full object-contain"
      />
      {caption ? (
        <figcaption className="mt-2 text-center text-sm text-foreground/60">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
