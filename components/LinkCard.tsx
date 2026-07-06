export default function LinkCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 block rounded-lg border border-black/10 p-4 transition-colors hover:border-black/20 hover:bg-black/[.02] no-underline"
    >
      <p className="font-medium text-foreground">{title}</p>
      {description ? (
        <p className="mt-1 text-sm text-foreground/60">{description}</p>
      ) : null}
      <p className="mt-2 truncate text-xs text-foreground/40">{href}</p>
    </a>
  );
}
