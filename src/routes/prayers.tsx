import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Sparkles } from "lucide-react";
import { PRAYERS } from "@/data/prayers";
import { APPARITIONS } from "@/data/apparitions";

const SITE = "https://apparitions-compass.lovable.app";

export const Route = createFileRoute("/prayers")({
  head: () => ({
    meta: [
      { title: "Marian Prayers" },
      {
        name: "description",
        content:
          "Classic Marian prayers — Hail Mary, Memorare, Angelus, Salve Regina — and prayers from Marian apparitions.",
      },
      { property: "og:title", content: "Marian Prayers — Hail Mary, Memorare, Angelus" },
      {
        property: "og:description",
        content:
          "A library of traditional Marian prayers and the prayers given at the apparitions.",
      },
      { property: "og:url", content: `${SITE}/prayers` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/prayers` }],
  }),
  component: PrayersPage,
});


const SECTIONS = [
  { key: "marian" as const, label: "Marian Prayers", eyebrow: "Timeless devotion" },
  { key: "rosary" as const, label: "The Rosary", eyebrow: "The chain of roses" },
  { key: "apparition" as const, label: "From the Apparitions", eyebrow: "Given from Heaven" },
];

function PrayersPage() {
  return (
    <div className="pb-8">
      <header className="safe-area-top relative overflow-hidden px-6 pt-8 pb-8">
        <div className="absolute inset-0 -z-10 star-field opacity-40" />
        <div className="absolute right-[-40px] top-[-40px] -z-10 h-48 w-48 rounded-full bg-[oklch(0.87_0.10_90/0.3)] blur-3xl animate-halo" />
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[var(--color-gold)]" />
          <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Ora et labora
          </p>
        </div>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-foreground text-glow">
          Prayers
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Traditional Marian prayers and words given at the apparitions —
          held close, prayed often.
        </p>
        <div className="mt-4 gold-hairline w-16" />
      </header>

      <main className="px-5">
        {SECTIONS.map(({ key, label, eyebrow }) => {
          const prayers = PRAYERS.filter((p) => p.category === key);
          if (prayers.length === 0) return null;
          return (
            <section key={key} className="mb-8">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
                {eyebrow}
              </p>
              <div className="mb-3 mt-1 flex items-center gap-3">
                <h2 className="font-serif text-2xl text-foreground">{label}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
              </div>
              <ul className="space-y-2.5">
                {prayers.map((p) => {
                  const app = p.apparitionSlug
                    ? APPARITIONS.find((a) => a.slug === p.apparitionSlug)
                    : null;
                  return (
                    <li key={p.slug}>
                      <Link
                        to="/prayers/$slug"
                        params={{ slug: p.slug }}
                        className="glass-card group relative flex items-center justify-between overflow-hidden rounded-2xl px-4 py-4 active:scale-[0.99] transition-transform"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-serif text-lg leading-tight text-foreground">
                            {p.title}
                          </div>
                          {app && (
                            <div className="mt-0.5 text-xs text-muted-foreground">
                              {app.title}
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)]">
                          <Sparkles className="h-3.5 w-3.5" />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
}
