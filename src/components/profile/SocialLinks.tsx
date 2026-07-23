import {
  Github,
  Linkedin,
  Youtube,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import type { SocialLink, SocialPlatform } from "@/types/social";
import { Tooltip } from "@/components/ui/Tooltip";

const icons: Partial<Record<SocialPlatform, LucideIcon>> = {
  github: Github,
  youtube: Youtube,
  linkedin: Linkedin,
  website: Globe2,
};

interface SocialLinksProps {
  socials: SocialLink[];
}

export function SocialLinks({ socials }: SocialLinksProps): React.JSX.Element {
  return (
    <nav
      aria-label="Redes sociais"
      className="flex flex-wrap justify-center gap-2"
    >
      {socials.map((social) => {
        const Icon = icons[social.platform];
        if (!Icon) return null;
        return (
          <Tooltip key={social.id} label={social.label}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir ${social.label}`}
              className="interactive grid size-11 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Icon size={18} />
            </a>
          </Tooltip>
        );
      })}
    </nav>
  );
}
