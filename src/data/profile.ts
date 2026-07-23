import type { ProfileData } from "@/types/profile";

// Short synthesized WAV note, embedded so the demo player works without a third-party service.
const demoAudio =
  "data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAAAgI+Wq7fE4e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7Q==";

export const profileData: ProfileData = {
  name: "Bernardo",
  username: "bernardo.dev",
  bio: "Software Engineer construindo experiências digitais na fronteira entre código, design e criatividade.",
  avatar: "/images/avatar-256.webp",
  background: "/images/grid.svg",
  location: "Brasil",
  verified: true,
  status: "online",
  views: 12840,
  joinedAt: "2026-01-10",
  socials: [
    {
      id: "github",
      platform: "github",
      label: "GitHub",
      url: "https://github.com/BernardoBoechat",
    },
    {
      id: "youtube",
      platform: "youtube",
      label: "YouTube",
      url: "https://www.youtube.com/@Bensec-dev",
    },
    {
      id: "linkedin",
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/be-boechat-dev/",
    },
    {
      id: "website",
      platform: "website",
      label: "Portfólio",
      url: "https://bernardo-site.bensec.workers.dev/",
    },
  ],
  links: [
    {
      id: "portfolio",
      title: "Portfólio",
      description: "Conheça meus projetos e trabalhos.",
      url: "https://bernardo-site.bensec.workers.dev/",
      icon: "code",
      badge: "NOVO",
    },
    {
      id: "lab",
      title: "Meu GitHub",
      description: "Repositórios, projetos e contribuições.",
      url: "https://github.com/BernardoBoechat",
      icon: "rocket",
    },
    {
      id: "contact",
      title: "Vamos criar algo?",
      description: "Disponível para projetos e colaborações especiais.",
      url: "mailto:hello@example.com",
      icon: "mail",
    },
  ],
  music: {
    title: "Midnight Protocol",
    artist: "Neon System",
    cover: "/images/cover.svg",
    audioUrl: demoAudio,
    spotifyUrl:
      "https://open.spotify.com/playlist/5oJ6M9uraSI9lWjvNAOH3Y?si=245f4f14e3a34750",
  },
};
