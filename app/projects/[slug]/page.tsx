import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import TagPill from "@/components/TagPill";
import { mdxComponents } from "@/lib/mdx-components";
import { formatDateRange, getAllSlugs, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Nathan Ansel`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-16">
      <Link
        href="/"
        className="text-sm text-foreground/60 transition-colors hover:text-foreground"
      >
        ← Back to projects
      </Link>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-black/10 bg-black/[.02]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="768px"
          className="object-cover"
          priority
        />
      </div>

      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-sm text-foreground/60">
          {formatDateRange(project.dateStart, project.dateEnd)}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
      </header>

      <article className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-foreground">
        <MDXRemote source={project.content} components={mdxComponents} />
      </article>
    </main>
  );
}
