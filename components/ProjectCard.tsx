import Image from "next/image";
import Link from "next/link";
import TagPill from "./TagPill";
import { formatDateRange, type ProjectSummary } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-black/10 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/[.03]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
          {project.draft ? (
            <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              Draft
            </span>
          ) : null}
        </div>
        <p className="text-sm text-foreground/60">
          {formatDateRange(project.dateStart, project.dateEnd)}
        </p>
        <p className="text-sm text-foreground/70">{project.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
