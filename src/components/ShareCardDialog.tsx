import { useEffect, useRef, useState } from "react";
import { X, Download, Copy, Share2, Check, Loader2 } from "lucide-react";
import type { Apparition } from "@/data/apparitions";
import { renderShareCard, apparitionUrl } from "@/lib/share-card";

interface Props {
  apparition: Apparition;
  open: boolean;
  onClose: () => void;
}

export function ShareCardDialog({ apparition, open, onClose }: Props) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = apparitionUrl(apparition.slug);
  const generated = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (generated.current === apparition.slug && blob) return;
    setLoading(true);
    renderShareCard(apparition, url)
      .then((b) => {
        generated.current = apparition.slug;
        setBlob(b);
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(b);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [open, apparition, url, blob]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const download = () => {
    if (!blob) return;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${apparition.slug}-marian-apparition.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const share = async () => {
    if (!blob) return;
    const file = new File([blob], `${apparition.slug}.png`, { type: "image/png" });
    const data: ShareData = {
      title: apparition.title,
      text: `${apparition.title} — ${apparition.location}, ${apparition.year}`,
      url,
    };
    if (typeof navigator !== "undefined" && (navigator as any).canShare?.({ files: [file] })) {
      try {
        await (navigator as any).share({ ...data, files: [file] });
        return;
      } catch {}
    }
    if ((navigator as any).share) {
      try {
        await (navigator as any).share(data);
        return;
      } catch {}
    }
    copyLink();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-t-3xl border border-border bg-popover p-5 pb-8 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Share
            </p>
            <h3 className="mt-1 font-serif text-xl text-foreground">Send a card</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted/50 text-muted-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-muted/40">
          <div className="aspect-[4/5] w-full">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={`${apparition.title} share card preview`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            {loading && previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="h-6 w-6 animate-spin text-foreground" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2.5">
          <span className="truncate text-xs text-muted-foreground">{url}</span>
          <button
            onClick={copyLink}
            className="ml-auto flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-[11px] font-medium text-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={download}
            disabled={!blob}
            className="flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-foreground disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Save image
          </button>
          <button
            onClick={share}
            disabled={!blob}
            className="btn-glow flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--gold)] px-4 py-3 text-sm font-semibold text-[var(--primary-foreground)] disabled:opacity-50"
          >
            <Share2 className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
