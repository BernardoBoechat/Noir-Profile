import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { profileData } from "@/data/profile";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { IconButton } from "@/components/ui/IconButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ShareModal = lazy(async () => {
  const module = await import("@/components/modals/ShareModal");
  return { default: module.ShareModal };
});

export default function App(): React.JSX.Element {
  const [entered, setEntered] = useState<boolean>(false);
  const [exiting, setExiting] = useState<boolean>(false);
  const [sharing, setSharing] = useState<boolean>(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      const timer = window.setTimeout(() => setEntered(true), 300);
      return () => window.clearTimeout(timer);
    }
    const exitTimer = window.setTimeout(() => setExiting(true), 2100);
    const enterTimer = window.setTimeout(() => setEntered(true), 2600);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(enterTimer);
    };
  }, [reduced]);

  const closeShare = useCallback((): void => setSharing(false), []);
  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-black text-white [overflow-wrap:anywhere]">
      <div className="fixed inset-0 z-0" aria-hidden="true">
        <img
          src="/images/wallpaper.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          className="wallpaper-image size-full object-cover"
        />
        <div className="wallpaper-shade absolute inset-0 bg-gradient-to-b from-black/35 via-black/45 to-black/75" />
      </div>
      {!entered && (
        <div
          className={`loading-screen fixed inset-0 z-40 grid place-items-center overflow-hidden bg-black/55 px-5 py-6 ${exiting ? "is-exiting" : ""}`}
          role="status"
          aria-live="polite"
          aria-labelledby="gate-title"
        >
          <div className="w-full max-w-[280px] text-center sm:max-w-xs">
            <div className="loader-avatar-shell mx-auto mb-5 size-24 rounded-full border border-white/20 p-1.5 sm:mb-7 sm:size-28">
              <div className="loader-avatar size-full overflow-hidden rounded-full">
                <img
                  src={profileData.avatar}
                  alt="Avatar de Bernardo"
                  width={112}
                  height={112}
                  className="size-full object-cover"
                />
              </div>
            </div>
            <h1
              id="gate-title"
              className="text-3xl font-semibold tracking-[-.06em] sm:text-5xl"
            >
              {profileData.name}
            </h1>
            <p className="mt-3 text-[10px] uppercase tracking-[.34em] text-white/45">
              Carregando perfil
            </p>
            <div
              className="mt-7 h-px w-full overflow-hidden bg-white/15"
              aria-hidden="true"
            >
              <div className="loader-progress h-full bg-white" />
            </div>
          </div>
        </div>
      )}
      <div
        aria-hidden={!entered}
        className={`relative z-10 ${!entered ? "pointer-events-none invisible" : ""}`}
      >
        <ProfileCard
          profile={profileData}
          entered={entered}
          actions={
            <IconButton
              label="Compartilhar perfil"
              onClick={() => setSharing(true)}
            >
              <Share2 size={17} />
            </IconButton>
          }
        />
      </div>
      {sharing && (
        <Suspense fallback={null}>
          <ShareModal
            open={sharing}
            profile={profileData}
            onClose={closeShare}
          />
        </Suspense>
      )}
    </div>
  );
}
