import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  dateStart: string;
  dateEnd: string;
  coverImage: string;
  tags: string[];
  summary: string;
  draft?: boolean;
};

// Drafts are visible in `next dev` so you can preview them while writing,
// but excluded from the grid and routes in production builds/deploys.
const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

export type ProjectSummary = ProjectFrontmatter;

export type ProjectWithContent = ProjectFrontmatter & {
  content: string;
};

function readProjectFile(filename: string): ProjectWithContent {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  return { ...(data as ProjectFrontmatter), content };
}

function getProjectFilenames(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs.readdirSync(PROJECTS_DIR).filter((file) => file.endsWith(".mdx"));
}

export function getAllProjects(): ProjectSummary[] {
  return getProjectFilenames()
    .map((filename): ProjectSummary => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
      return matter(raw).data as ProjectFrontmatter;
    })
    .filter((project) => SHOW_DRAFTS || !project.draft)
    .sort((a, b) => {
      const aEnd = a.dateEnd && a.dateEnd.toLowerCase() !== "present" ? a.dateEnd : "9999-99";
      const bEnd = b.dateEnd && b.dateEnd.toLowerCase() !== "present" ? b.dateEnd : "9999-99";
      return aEnd > bEnd ? -1 : aEnd < bEnd ? 1 : 0;
    });
}

export function getAllSlugs(): string[] {
  return getProjectFilenames()
    .map((filename) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
      const data = matter(raw).data as ProjectFrontmatter;
      return { filename, data };
    })
    .filter(({ data }) => SHOW_DRAFTS || !data.draft)
    .map(({ filename, data }) => data.slug ?? filename.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): ProjectWithContent | null {
  const match = getProjectFilenames().find((filename) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, filename), "utf8");
    const { data } = matter(raw);
    return (data as ProjectFrontmatter).slug === slug;
  });

  if (!match) return null;

  const project = readProjectFile(match);
  if (project.draft && !SHOW_DRAFTS) return null;
  return project;
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatMonthYear(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-").map(Number);
  const monthName = MONTHS[(month ?? 1) - 1] ?? "";
  return `${monthName} ${String(year).slice(2)}`;
}

export function formatDateRange(dateStart: string, dateEnd: string): string {
  if (!dateEnd || dateEnd.toLowerCase() === "present") {
    return `${formatMonthYear(dateStart)} - Present`;
  }
  return `${formatMonthYear(dateStart)} - ${formatMonthYear(dateEnd)}`;
}
