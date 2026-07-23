export type SocialPlatform =
  | "discord"
  | "github"
  | "instagram"
  | "x"
  | "youtube"
  | "twitch"
  | "tiktok"
  | "linkedin"
  | "website";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  url: string;
  username?: string;
}
