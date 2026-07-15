import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { APPARITIONS, type ApparitionStatus, type Apparition } from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";
import { useFavorites } from "@/hooks/use-favorites";
import { ShareCardDialog } from "@/components/ShareCardDialog";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Apparitions" },
      { name: "description", content: "Your saved Marian apparitions." },
    ],
  }),
  component: SavedPage,
});

function statusHue(status: ApparitionStatus) {
  switch (status) {
    case "approved": return "oklch(0.72 0.16 160)";
    case "worthy": return "oklch(0.75 0.14 220)";
    case "investigation": return "oklch(0.80 0.14 75)";
    case "not_approved": return "oklch(0.68 0.18 25)";
  }
}

function SavedPage() {
  const { favorites } = useFavorites();
  const saved = APPARITIONS.filter((a) => favorites.includes(a.slug));
  const [shareTarget, setShareTarget] = useState<Apparition | null>(null);

  return (
    <div className="pb-8">
      <header className="safe-area-top relative overflow-hidden px-6 pt-8 pb-8">
        <div className="absolute inset-0 -z-10 star-field opacity-40" />
        <div className="absolute right-[-40px] top-[-40px] -z-10 h-48 w-48 rounded-full bg-[oklch(0.78_0.15_25/0.3)] blur-3xl animate-halo" />
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-[var(--color-rose-soft)]" />
          <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Kept close
          </p>
        </div>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-foreground text-glow">
          Saved
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Apparitions you've kept for prayer and reflection.
        </p>
        <div className="mt-4 gold-hairline w-16" />
      </header>

      <main className="px-5">
        {saved.length === 0 ? (
          <div className="mt-8 flex flex-col items-center px-6 text-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full glass-card">
              <span className="absolute inset-0 rounded-full bg-[oklch(0.78_0.15_25/0.35)] blur-2xl animate-halo" />
              <Heart className="h-8 w-8 text-[var(--color-rose-soft)]" />
            </div>
            <h2 className="mt-5 font-serif text-2xl text-foreground">
              Nothing kept yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any apparition to keep it here.
            </p>
            <Link
              to="/"
              className="btn-glow mt-6 rounded-full bg-gradient-to-r from-[oklch(0.83_0.12_220)] to-[oklch(0.87_0.10_90)] px-6 py-2.5 text-sm font-medium text-[oklch(0.20_0.08_265)]"
            >
              Browse apparitions
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {saved.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/apparition/$slug"
                  params={{ slug: a.slug }}
                  className="glass-card flex items-start gap-3 rounded-2xl p-3 active:scale-[0.99] transition-transform"
                >
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                    style={{
                      background: `radial-gradient(120% 100% at 30% 20%, ${statusHue(a.status)}, oklch(0.22 0.08 265))`,
                    }}
                  >
                    <div className="absolute inset-0 star-field opacity-50" />
                    <div className="absolute right-[-8px] top-[-8px] h-10 w-10 rounded-full bg-[oklch(0.87_0.10_90/0.35)] blur-xl" />
                    <div className="absolute inset-x-0 bottom-0 p-1 text-center font-serif text-xs italic text-white/80">
                      {a.year}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <StatusBadge status={a.status} />
                    <h2 className="mt-1.5 font-serif text-lg leading-snug text-foreground">
                      {a.title}
                    </h2>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {a.location} · {a.year}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
