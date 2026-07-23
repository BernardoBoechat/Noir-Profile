"use client";
import {
  ArrowUpRight,
  Code2,
  Mail,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { CustomLink } from "@/types/profile";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  mail: Mail,
  rocket: Rocket,
};
interface CustomLinksProps {
  links: CustomLink[];
}
export function CustomLinks({ links }: CustomLinksProps): React.JSX.Element {
  return (
    <section aria-label="Links em destaque" className="space-y-2.5">
      {links.map((link) => {
        const Icon = link.icon
          ? (icons[link.icon] ?? ArrowUpRight)
          : ArrowUpRight;
        const external = link.url.startsWith("http");
        return (
          <a
            key={link.id}
            href={link.url}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="link-card interactive group relative flex min-h-[72px] items-center gap-2.5 overflow-hidden rounded-xl border border-white/10 bg-black/15 p-2.5 transition-colors hover:border-white/30 hover:bg-white/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white min-[380px]:min-h-20 min-[380px]:gap-3 min-[380px]:rounded-2xl min-[380px]:p-3"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white min-[380px]:size-11">
              <Icon size={19} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-1.5 text-sm font-medium min-[380px]:gap-2 min-[380px]:text-base">
                {link.title}
                {link.badge && (
                  <span className="rounded-full border border-white/15 px-2 py-0.5 text-[9px] tracking-widest text-white/60">
                    {link.badge}
                  </span>
                )}
              </span>
              {link.description && (
                <span className="mt-0.5 line-clamp-2 block text-[11px] leading-4 text-white/40 min-[380px]:text-xs min-[380px]:leading-5">
                  {link.description}
                </span>
              )}
            </span>
            <ArrowUpRight
              size={17}
              className="text-white/25 transition-colors group-hover:text-white"
            />
          </a>
        );
      })}
    </section>
  );
}
