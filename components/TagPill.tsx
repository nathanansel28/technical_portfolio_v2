import { tagColorClasses } from "@/lib/tag-colors";

export default function TagPill({ tag }: { tag: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tagColorClasses(
        tag
      )}`}
    >
      {tag}
    </span>
  );
}
