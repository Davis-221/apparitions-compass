import { useEffect, useRef, useState } from "react";
import { X, Download, Copy, Share2, Check, Loader2, Printer } from "lucide-react";
import type { Prayer } from "@/data/prayers";
import { renderPrayerCard, prayerUrl, printPrayer } from "@/lib/prayer-card";

interface Props {
  prayer: Prayer;
  open: boolean;
  onClose: () => void;
}

export function PrayerCardDialog({ prayer, open, onClose }: Props) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = prayerUrl(prayer.slug);
  const generated = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (generated.current === prayer.slug && blob) return;
    setLoading(true);
    renderPrayerCard(prayer, url)
      .then((b) => {
        generated.current = prayer.slug;
        setBlob(b);
        setPreviewUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(b);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [open, prayer, url, blob]);

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
    a.download = `${prayer.slug}-prayer-card.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };

  const share = async () => {
    if (!blob) return;
    const file = new File([blob], `${prayer.slug}.png`, { type: "image/png" });
    const data: ShareData = {
      title: prayer.title,
      text: `${prayer.title} — a Marian prayer`,
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
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-white/10 bg-[oklch(0.16_0.06_265)] p-5 pb-8 shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Share &amp; print
            </p>
            <h3 className="mt-1 font-serif text-xl text-foreground">Prayer card</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
          <div className="aspect-[4/5] w-full">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={`${prayer.title} prayer card preview`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/50">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
            {loading && previewUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
          <span className="truncate text-xs text-white/80">{url}</span>
          <button
            onClick={copyLink}
            className="ml-auto flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={download}
            disabled={!blob}
            className="flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
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

        <button
          onClick={() => printPrayer(prayer, url)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-4 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]"
        >
          <Printer className="h-4 w-4" />
          Print / Save as PDF
        </button>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          A5 devotional sheet — choose “Save as PDF” in the print dialog.
        </p>
      </div>
    </div>
  );
}
