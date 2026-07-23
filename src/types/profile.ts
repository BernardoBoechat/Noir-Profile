import type { MusicTrack } from "./music";
import type { SocialLink } from "./social";

export interface CustomLink {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  image?: string;
  badge?: string;
}
export type ProfileStatus = "online" | "offline" | "idle" | "busy";
export interface ProfileData {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  background: string;
  location?: string;
  verified: boolean;
  status: ProfileStatus;
  views: number;
  joinedAt: string;
  socials: SocialLink[];
  links: CustomLink[];
  music?: MusicTrack;
}
