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
    <section aria-label="Música no Spotify" className="w-full max-w-full">
      {isPlaylist && (
        <h2 className="mb-3 text-sm font-medium text-white/70">
          Minha playlist no Spotify
        </h2>
      )}
      <div
        className={
          isPlaylist
            ? "h-[300px] w-full max-w-full overflow-hidden rounded-xl bg-[#121212] sm:h-[352px]"
            : "h-[152px] w-full max-w-full overflow-hidden rounded-xl bg-[#121212]"
        }
      >
        <iframe
          title="Player de música do Spotify"
          src={embedUrl}
          width="100%"
          height="100%"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="block size-full max-w-full border-0 bg-[#121212]"
          style={{ colorScheme: "dark" }}
        />
      </div>
    </section>
  );
}
