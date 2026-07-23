import type { ReactNode } from "react";
import type { ProfileData } from "@/types/profile";
import { ProfileHeader } from "./ProfileHeader";
import { SocialLinks } from "./SocialLinks";
import { CustomLinks } from "./CustomLinks";
import { SpotifyPlayer } from "@/components/music/SpotifyPlayer";

interface ProfileCardProps {
  profile: ProfileData;
  entered: boolean;
  actions: ReactNode;
}
export function ProfileCard({
  profile,
  entered,
  actions,
}: ProfileCardProps): React.JSX.Element {
  return (
    <main className="safe-page mx-auto w-full max-w-[600px] px-2 py-3 min-[380px]:px-3 min-[380px]:py-5 sm:px-5 sm:py-12 lg:py-14">
      <article
        className={`profile-card relative w-full overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-black/75 via-black/85 to-black/95 p-4 shadow-[0_30px_100px_rgba(0,0,0,.45)] min-[380px]:p-5 sm:rounded-3xl sm:p-8 ${entered ? "is-visible" : ""}`}
      >
        <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
          {actions}
        </div>
        <ProfileHeader profile={profile} />
        <div className="my-5 h-px bg-white/10 sm:my-6" />
        <SocialLinks socials={profile.socials} />
        <div className="mt-5 space-y-3 sm:mt-6">
          {profile.music && <SpotifyPlayer track={profile.music} />}
          <CustomLinks links={profile.links} />
        </div>
        <footer className="mt-7 text-center text-[10px] uppercase tracking-[.24em] text-white/20">
          {profile.username}
        </footer>
      </article>
    </main>
  );
}
