import type { ReactNode } from "react";
import Image from "next/image";
import { fullBleedStyle, type FullBleed } from "@/lib/full-bleed";

export default function ProjectImage({
  src,
  alt,
  caption,
  fullBleed,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  fullBleed?: FullBleed;
}) {
  return (
    <figure className="my-6" style={fullBleedStyle(fullBleed)}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        sizes="100vw"
        className="h-auto w-full object-contain"
      />
      {caption ? (
        <figcaption
          className={`mt-2 text-center text-sm text-foreground/60 ${fullBleed ? "px-6" : ""}`}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
