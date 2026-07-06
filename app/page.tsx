import ProjectCard from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

// TODO: replace placeholder links/bio with real details.
const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
  { label: "GitHub", href: "https://github.com/your-handle" },
  { label: "Email", href: "mailto:you@example.com" },
];

export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Nathan Ansel</h1>
        <p className="max-w-2xl text-foreground/70">
          Data scientist / AI engineer building end-to-end machine learning
          systems — from data pipelines and modeling to the tools that make
          results usable. This is a placeholder bio; replace it with a short
          intro about your background and interests.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium transition-colors hover:border-black/20 hover:bg-black/[.03]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
