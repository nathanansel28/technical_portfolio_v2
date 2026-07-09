import ProjectCard from "@/components/ProjectCard";
import ProfilePicture from "@/components/ProfilePicture";
import { getAllProjects } from "@/lib/projects";
import { SOCIAL_LINKS } from "@/lib/social-links";

export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-6 py-16">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <ProfilePicture />
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Nathan Ansel</h1>
          <p className="max-w-2xl text-foreground/70">
            Aspiring data scientist and AI engineer with expertise in data analytics, machine learning, and statistical modelling. 
            Proficient in Python and R, with a focus on developing efficient algorithms to acquire a deep understanding and effective utilization of complex data. 
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
