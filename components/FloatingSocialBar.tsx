import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SOCIAL_LINKS } from "@/lib/social-links";

const ICONS: Record<string, IconType> = {
  LinkedIn: FaLinkedin,
  GitHub: FaGithub,
  Email: FaEnvelope,
};

export default function FloatingSocialBar() {
  return (
    <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2.5 sm:right-6">
      {SOCIAL_LINKS.map((link) => {
        const Icon = ICONS[link.label];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={link.label}
            title={link.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-background/80 text-foreground/60 shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/[.05] hover:text-foreground"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
