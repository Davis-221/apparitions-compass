import { useState } from "react";
import { X, FileText, Images, Loader2, Check } from "lucide-react";
import { PRAYERS } from "@/data/prayers";
import { printAllPrayers, exportPrayerCardsZip } from "@/lib/prayer-card";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ExportPrayersDialog({ open, onClose }: Props) {
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [finished, setFinished] = useState(false);

  if (!open) return null;

  const busy = progress !== null;

  const exportPdf = () => {
    printAllPrayers(PRAYERS);
  };

  const exportZip = async () => {
    if (busy) return;
    setFinished(false);
    setProgress({ done: 0, total: PRAYERS.length });
    try {
      const zip = await exportPrayerCardsZip(PRAYERS, (done, total) =>
        setProgress({ done, total }),
      );
      const a = document.createElement("a");
      a.href = URL.createObjectURL(zip);
      a.download = "marian-prayer-cards.zip";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      setFinished(true);
    } catch (e) {
      console.error(e);
    } finally {
      setProgress(null);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-md sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-t-3xl border border-white/10 bg-[oklch(0.16_0.06_265)] p-5 pb-28 shadow-2xl sm:pb-8 sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
              The whole library
            </p>
            <h3 className="mt-1 font-serif text-xl text-foreground">Export all prayers</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80"
            aria-label="Close export dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          All {PRAYERS.length} prayers — cover, contents and one A5 devotional sheet each.
        </p>

        <button
          onClick={exportPdf}
          disabled={busy}
          className="btn-glow mt-5 flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-[oklch(0.83_0.12_220)] to-[oklch(0.87_0.10_90)] px-4 py-4 text-left text-[oklch(0.20_0.08_265)] disabled:opacity-50"
        >
          <FileText className="h-5 w-5 shrink-0" />
          <span>
            <span className="block text-sm font-semibold">One PDF booklet</span>
            <span className="block text-[11px] opacity-80">
              Opens the print dialog — choose “Save as PDF”
            </span>
          </span>
        </button>

        <button
          onClick={exportZip}
          disabled={busy}
          className="mt-3 flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-left text-white disabled:opacity-60"
        >
          {busy ? (
            <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
          ) : finished ? (
            <Check className="h-5 w-5 shrink-0 text-[var(--color-gold)]" />
          ) : (
            <Images className="h-5 w-5 shrink-0" />
          )}
          <span>
            <span className="block text-sm font-semibold">
              {busy ? "Rendering cards…" : "ZIP of prayer cards"}
            </span>
            <span className="block text-[11px] text-white/60">
              {busy
                ? `${progress?.done} of ${progress?.total} rendered`
                : finished
                  ? "Saved to your downloads"
                  : `${PRAYERS.length} shareable 1080×1350 images`}
            </span>
          </span>
        </button>

        {busy && (
          <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-[var(--color-gold)] transition-[width] duration-200"
              style={{ width: `${((progress!.done / progress!.total) * 100).toFixed(1)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
