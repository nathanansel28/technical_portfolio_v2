export default function PdfEmbed({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-black/10">
      <div className="flex items-center justify-between border-b border-black/10 bg-black/[.03] px-4 py-2">
        <span className="text-sm font-medium">{title}</span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foreground/70 underline hover:text-foreground"
        >
          Download / Open in new tab
        </a>
      </div>
      <object data={src} type="application/pdf" title={title} className="h-[600px] w-full">
        <div className="flex h-[600px] w-full items-center justify-center p-6 text-center text-sm text-foreground/60">
          Your browser can&apos;t display this PDF inline.{" "}
          <a href={src} className="underline" target="_blank" rel="noopener noreferrer">
            Open it directly
          </a>
          .
        </div>
      </object>
    </div>
  );
}
