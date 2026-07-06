// Deterministic pastel color assignment so the same tag always renders with
// the same hue across cards and project pages, without needing a manual
// category mapping per tag.
const PALETTE = [
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-lime-100 text-lime-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-sky-100 text-sky-700",
  "bg-indigo-100 text-indigo-700",
  "bg-violet-100 text-violet-700",
  "bg-fuchsia-100 text-fuchsia-700",
] as const;

export function tagColorClasses(tag: string): string {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
