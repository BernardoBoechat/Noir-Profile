import { useEffect, useRef, useState } from "react";
import { Check, Copy, ExternalLink, Send, Share2, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { ProfileData } from "@/types/profile";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface ShareModalProps {
  open: boolean;
  profile: ProfileData;
  onClose: () => void;
}

export function ShareModal({
  open,
  profile,
  onClose,
}: ShareModalProps): React.JSX.Element | null {
  const modal = useRef<HTMLDivElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const [url, setUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!open) return;
    setUrl(window.location.href);
    setCopied(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !modal.current) return;
      const focusable = Array.from(
        modal.current.querySelectorAll<HTMLElement>("button, a[href]"),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`Conheça o perfil de ${profile.name}`);
  const copyUrl = async (): Promise<void> => {
    const success = await copyToClipboard(url);
    setCopied(success);
    if (success) window.setTimeout(() => setCopied(false), 2000);
  };
  const share = async (): Promise<void> => {
    if (!navigator.share) {
      await copyUrl();
      return;
    }
    try {
      await navigator.share({ title: profile.name, text: profile.bio, url });
    } catch {
      /* O visitante cancelou o compartilhamento. */
    }
  };

  const secondaryLinks = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto bg-black/85 p-0 sm:grid sm:place-items-center sm:p-4"
      onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-title"
        aria-describedby="share-description"
        className="modal-safe-area max-h-[calc(100dvh-12px)] w-full max-w-sm overflow-y-auto rounded-t-3xl border border-b-0 border-white/15 bg-black p-4 shadow-[0_24px_80px_rgba(0,0,0,.65)] min-[380px]:p-5 sm:max-h-[calc(100dvh-32px)] sm:rounded-3xl sm:border-b sm:p-6"
      >
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-[.25em] text-white/35">
              Compartilhar
            </p>
            <h2
              id="share-title"
              className="text-lg font-semibold tracking-tight min-[380px]:text-xl"
            >
              Perfil de {profile.name}
            </h2>
            <p
              id="share-description"
              className="mt-1 text-xs text-white/45 min-[380px]:text-sm"
            >
              Envie o link ou escaneie o QR Code.
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            aria-label="Fechar modal"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X size={17} />
          </button>
        </header>

        <div className="my-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3 max-[340px]:flex-col max-[340px]:text-center min-[380px]:my-5 min-[380px]:gap-4">
          <div className="shrink-0 rounded-xl bg-white p-2">
            <QRCodeSVG
              value={url || window.location.href}
              size={84}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/70">Link do perfil</p>
            <p className="mt-1 truncate text-xs text-white/35">{url}</p>
            <button
              type="button"
              onClick={() => void copyUrl()}
              className="mt-3 inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs text-white/70 transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copiado" : "Copiar link"}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => void share()}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-3 text-sm font-semibold text-black transition-colors hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black min-[380px]:text-base"
        >
          <Share2 size={17} />
          Compartilhar perfil
        </button>
        <div className="mt-3 grid grid-cols-1 gap-2 min-[340px]:grid-cols-2">
          {secondaryLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 text-xs text-white/60 transition-colors hover:border-white/30 hover:bg-white/[.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Send size={13} />
              {item.label}
              <ExternalLink size={10} className="text-white/30" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
