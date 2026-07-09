import Image from "next/image";
import { getOgImage } from "@/lib/og-image";

export default async function LinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  const image = await getOgImage(href);
  const hostname = new URL(href).hostname.replace(/^www\./, "");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 flex items-stretch overflow-hidden rounded-lg border border-black/10 no-underline transition-colors hover:border-black/20 hover:bg-black/[.02]"
    >
      <div className="min-w-0 flex-1 px-3.5 py-2.5">
        <p className="line-clamp-1 text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="mt-0.5 line-clamp-1 text-xs text-foreground/60">{description}</p>
        ) : null}
        <p className="mt-1 truncate text-[11px] text-foreground/40">{hostname}</p>
      </div>
      {image ? (
        <div className="relative hidden w-48 shrink-0 sm:block">
          <Image src={image} alt="" fill unoptimized className="object-cover" />
        </div>
      ) : null}
    </a>
  );
}
