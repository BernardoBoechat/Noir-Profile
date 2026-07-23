import type { MusicTrack } from "@/types/music";

interface SpotifyPlayerProps {
  track: MusicTrack;
}

function getSpotifyEmbedUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.hostname !== "open.spotify.com") return null;
    const parts = parsedUrl.pathname.split("/").filter(Boolean);
    const contentType = (["track", "playlist", "album"] as const).find((type) =>
      parts.includes(type),
    );
    const contentIndex = contentType ? parts.indexOf(contentType) : -1;
    const contentId = contentIndex >= 0 ? parts[contentIndex + 1] : undefined;
    return contentType && contentId
      ? `https://open.spotify.com/embed/${contentType}/${encodeURIComponent(contentId)}?utm_source=generator&theme=0`
      : null;
  } catch {
    return null;
  }
}

export function SpotifyPlayer({
  track,
}: SpotifyPlayerProps): React.JSX.Element {
  const embedUrl = track.spotifyUrl
    ? getSpotifyEmbedUrl(track.spotifyUrl)
    : null;
  const isPlaylist = track.spotifyUrl?.includes("/playlist/") ?? false;
  if (!embedUrl)
    return (
      <p className="rounded-2xl border border-white/10 p-4 text-sm text-white/50">
        Link do Spotify indisponível.
      </p>
    );

  return (
    <section aria-label="Música no Spotify" className="min-w-0 max-w-full">
      {isPlaylist && (
        <div className="mb-2.5 flex items-center justify-between gap-3 px-0.5">
          <h2 className="truncate text-xs font-medium uppercase tracking-[.1em] text-white/55 min-[380px]:text-sm min-[380px]:normal-case min-[380px]:tracking-normal min-[380px]:text-white/70">
            Minha playlist no Spotify
          </h2>
          <span className="shrink-0 text-[9px] uppercase tracking-widest text-white/25 min-[480px]:hidden">
            Player compacto
          </span>
        </div>
      )}
      <div
        className={
          isPlaylist
            ? "h-[152px] w-full min-w-0 max-w-full overflow-hidden rounded-xl bg-[#121212] min-[480px]:h-[352px]"
            : "h-[152px] w-full min-w-0 max-w-full overflow-hidden rounded-xl bg-[#121212]"
        }
      >
        <iframe
          title="Player de música do Spotify"
          src={embedUrl}
          width="100%"
          height={isPlaylist ? 352 : 152}
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block size-full min-w-0 max-w-full border-0 bg-[#121212]"
          style={{ colorScheme: "dark" }}
        />
      </div>
    </section>
  );
}
