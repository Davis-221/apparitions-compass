import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  APPARITIONS,
  STATUS_LABEL,
  type ApparitionStatus,
} from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Browse Marian Apparitions" },
      {
        name: "description",
        content:
          "Browse Marian apparitions worldwide — from Guadalupe to Fátima, Lourdes to Medjugorje.",
      },
    ],
  }),
  component: BrowsePage,
});

type Filter = "all" | ApparitionStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "approved", label: STATUS_LABEL.approved },
  { key: "worthy", label: STATUS_LABEL.worthy },
  { key: "investigation", label: STATUS_LABEL.investigation },
  { key: "not_approved", label: STATUS_LABEL.not_approved },
];

function BrowsePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return APPARITIONS.filter((a) => {
      if (filter !== "all" && a.status !== filter) return false;
      if (!q) return true;
      return (
        a.title.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.seers.some((s) => s.toLowerCase().includes(q))
      );
    }).sort((a, b) => a.year - b.year);
  }, [filter, query]);

  return (
    <div>
      <header className="safe-area-top sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="px-4 pt-4 pb-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
            Ave Maria
          </p>
          <h1 className="mt-1 font-serif text-3xl font-semibold leading-tight text-primary">
            Marian Apparitions
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A pilgrim's guide to Our Lady's visits.
          </p>
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, place, or seer"
              className="w-full rounded-full border border-input bg-card pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="mt-3 -mx-4 overflow-x-auto px-4">
            <div className="flex gap-2 pb-1">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    filter === key
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4">
        <p className="mb-3 text-xs text-muted-foreground">
          {filtered.length} apparition{filtered.length !== 1 ? "s" : ""}
        </p>
        <ul className="space-y-3">
          {filtered.map((a) => (
            <li key={a.slug}>
              <Link
                to="/apparition/$slug"
                params={{ slug: a.slug }}
                className="block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-transform active:scale-[0.99]"
              >
                <div className="relative h-28 w-full overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(120% 100% at 20% 0%, oklch(0.55 0.13 258) 0%, oklch(0.28 0.08 258) 60%, oklch(0.2 0.05 258) 100%)",
                    }}
                  />
                  <div className="absolute inset-0 opacity-40" style={{
                    backgroundImage:
                      "radial-gradient(circle at 75% 40%, oklch(0.85 0.06 82 / 0.5), transparent 55%)",
                  }} />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute left-4 top-3 font-serif text-4xl italic text-white/90">
                    {a.year}
                  </div>
                  <div className="absolute right-3 top-3">
                    <StatusBadge status={a.status} />
                  </div>
                </div>
                <div className="px-4 py-3">
                  <h2 className="font-serif text-lg font-semibold leading-snug text-primary">
                    {a.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {a.location} · {a.country}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No apparitions match your search.
          </p>
        )}
      </main>
    </div>
  );
}
