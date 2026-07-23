"use client";
import { useState } from "react";
import { BadgeCheck, Check, Copy } from "lucide-react";
import type { ProfileData } from "@/types/profile";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { ProfileStats } from "./ProfileStats";

interface ProfileHeaderProps {
  profile: ProfileData;
}
export function ProfileHeader({
  profile,
}: ProfileHeaderProps): React.JSX.Element {
  const [copied, setCopied] = useState<boolean>(false);
  const copyUsername = async (): Promise<void> => {
    const success = await copyToClipboard(profile.username);
    if (success) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <header className="text-center">
      <div className="avatar relative mx-auto mb-3 size-20 sm:mb-4 sm:size-24">
        <img
          src={profile.avatar}
          alt={`Avatar de ${profile.name}`}
          width={96}
          height={96}
          className="size-20 rounded-full border border-white/20 object-cover sm:size-24"
        />
        <span
          className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-black bg-white"
          aria-label={`Status ${profile.status}`}
        />
      </div>
      <div className="profile-name flex items-center justify-center gap-2">
        <h1 className="max-w-[70vw] truncate text-2xl font-semibold tracking-[-.04em] min-[380px]:text-3xl sm:max-w-none sm:text-4xl">
          {profile.name}
        </h1>
        {profile.verified && (
          <BadgeCheck
            className="text-white"
            size={23}
            aria-label="Perfil verificado"
          />
        )}
      </div>
      <button
        onClick={() => void copyUsername()}
        className="copy-trigger interactive mt-1 inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm text-white/55 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Copiar username"
      >
        @{profile.username}
        {copied ? (
          <Check size={14} className="text-emerald-400" />
        ) : (
          <Copy size={14} />
        )}
        <span className="sr-only" aria-live="polite">
          {copied ? "Username copiado" : ""}
        </span>
      </button>
      <p className="mx-auto mt-2 max-w-md text-[13px] font-light leading-5 text-white/65 min-[380px]:text-sm min-[380px]:leading-6">
        {profile.bio}
      </p>
      <div className="mt-4">
        <ProfileStats
          views={profile.views}
          joinedAt={profile.joinedAt}
          location={profile.location}
        />
      </div>
    </header>
  );
}
