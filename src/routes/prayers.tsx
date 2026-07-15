import { createFileRoute, Link } from "@tanstack/react-router";
import { PRAYERS } from "@/data/prayers";
import { APPARITIONS } from "@/data/apparitions";

export const Route = createFileRoute("/prayers")({
  head: () => ({
    meta: [
      { title: "Marian Prayers" },
      {
        name: "description",
        content:
          "Classic Marian prayers — Hail Mary, Memorare, Angelus, Salve Regina — and prayers from Marian apparitions.",
      },
    ],
  }),
  component: PrayersPage,
});

const SECTIONS = [
  { key: "marian" as const, label: "Marian Prayers" },
  { key: "rosary" as const, label: "The Rosary" },
  { key: "apparition" as const, label: "From the Apparitions" },
];

function PrayersPage() {
  return (
    <div>
      <header className="safe-area-top border-b border-border bg-background px-5 pt-5 pb-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)]">
          Ora et labora
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold text-primary">
          Prayers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Traditional Marian prayers and prayers from the apparitions.
        </p>
      </header>

      <main className="px-4 py-5">
        {SECTIONS.map(({ key, label }) => {
          const prayers = PRAYERS.filter((p) => p.category === key);
          if (prayers.length === 0) return null;
          return (
            <section key={key} className="mb-6">
              <h2 className="mb-2 px-1 font-serif text-lg font-semibold text-primary">
                {label}
              </h2>
              <ul className="space-y-2">
                {prayers.map((p) => {
                  const app = p.apparitionSlug
                    ? APPARITIONS.find((a) => a.slug === p.apparitionSlug)
                    : null;
                  return (
                    <li key={p.slug}>
                      <Link
                        to="/prayers/$slug"
                        params={{ slug: p.slug }}
                        className="block rounded-xl border border-border bg-card px-4 py-3 shadow-sm active:scale-[0.99]"
                      >
                        <div className="font-serif text-base font-semibold text-primary">
                          {p.title}
                        </div>
                        {app && (
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {app.title}
                          </div>
                        )}
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
