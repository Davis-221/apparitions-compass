import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { APPARITIONS } from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved Apparitions" },
      { name: "description", content: "Your saved Marian apparitions." },
    ],
  }),
  component: SavedPage,
});

function SavedPage() {
  const { favorites } = useFavorites();
  const saved = APPARITIONS.filter((a) => favorites.includes(a.slug));

  return (
    <div>
      <header className="safe-area-top border-b border-border bg-background px-5 pt-5 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Kept close
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-primary">
          Saved
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Apparitions you've kept for prayer and reflection.
        </p>
      </header>

      <main className="px-4 py-5">
        {saved.length === 0 ? (
          <div className="mt-16 flex flex-col items-center px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-7 w-7 text-[var(--color-rose-soft)]" />
            </div>
            <h2 className="mt-4 font-serif text-xl font-semibold text-primary">
              Nothing saved yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tap the heart on any apparition to keep it here.
            </p>
            <Link
              to="/"
              className="mt-5 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
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
                  className="flex items-start gap-3 rounded-2xl border border-border bg-card p-3 shadow-sm"
                >
                  <div
                    className="h-16 w-16 shrink-0 rounded-xl"
                    style={{
                      background:
                        "radial-gradient(120% 100% at 30% 20%, oklch(0.55 0.13 258), oklch(0.25 0.08 258))",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <StatusBadge status={a.status} />
                    <h2 className="mt-1 font-serif text-base font-semibold leading-snug text-primary">
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
