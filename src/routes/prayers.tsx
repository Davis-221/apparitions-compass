import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Sparkles, Download, Heart } from "lucide-react";
import { PRAYERS, CATEGORY_LABEL, type PrayerCategory } from "@/data/prayers";
import { APPARITIONS } from "@/data/apparitions";
import { ExportPrayersDialog } from "@/components/ExportPrayersDialog";
import { usePrayerFavorites } from "@/hooks/use-prayer-favorites";
import { WordByWord } from "@/components/WordByWord";
import { ParallaxHero, ParallaxLayer } from "@/components/ParallaxHero";
import { GlowingParticles } from "@/components/GlowingParticles";
import { FloatingObjects } from "@/components/FloatingObjects";
import { Reveal } from "@/components/Reveal";




const SITE = "https://apparitions-compass.lovable.app";

export const Route = createFileRoute("/prayers")({
  head: () => ({
    meta: [
      { title: "Marian Prayers — Rosary, Litanies & Apparition Prayers" },
      {
        name: "description",
        content:
          "A complete library of authentic Marian prayers: Hail Mary, Memorare, Angelus, Salve Regina, the four sets of Rosary mysteries, the Litany of Loreto, acts of consecration, and the prayers given at Fátima, Lourdes and Guadalupe.",
      },
      { property: "og:title", content: "Marian Prayers — Rosary, Litanies & Apparition Prayers" },
      {
        property: "og:description",
        content:
          "Pray with the Church: traditional Marian prayers, the full Rosary, litanies, consecrations, and the words Our Lady gave at the apparitions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/prayers` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/prayers` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Marian Prayers",
          url: `${SITE}/prayers`,
          hasPart: PRAYERS.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: `${SITE}/prayers/${p.slug}`,
          })),
        }),
      },
    ],
  }),
  component: PrayersPage,
});

const SECTIONS: { key: PrayerCategory; eyebrow: string; blurb: string }[] = [
  {
    key: "marian",
    eyebrow: "Timeless devotion",
    blurb: "The words the Church has whispered to her Mother since the catacombs.",
  },
  {
    key: "rosary",
    eyebrow: "The chain of roses",
    blurb: "The whole Gospel, told bead by bead, in her company.",
  },
  {
    key: "litany",
    eyebrow: "Her many names",
    blurb: "Title after title, until the heart recognises its own Mother.",
  },
  {
    key: "consecration",
    eyebrow: "Wholly thine",
    blurb: "To give her everything, so she may give it all to her Son.",
  },
  {
    key: "apparition",
    eyebrow: "Given from Heaven",
    blurb: "Words she spoke herself, to shepherds, children and the poor.",
  },
];

function PrayersPage() {
  const [exportOpen, setExportOpen] = useState(false);
  const { favorites, toggle, isFavorite } = usePrayerFavorites();
  const savedPrayers = PRAYERS.filter((p) => favorites.includes(p.slug));
  return (
    <div className="pb-8">

      <ParallaxHero className="safe-area-top relative overflow-hidden px-6 pt-10 pb-9" as="header">
        <ParallaxLayer depth={0.3} className="absolute inset-0 -z-10">
          <div className="star-drift absolute inset-0 star-field opacity-40" />
        </ParallaxLayer>
        <ParallaxLayer depth={0.34} className="absolute inset-0 -z-10 pointer-events-none">
          <GlowingParticles count={22} color="var(--gold)" />
        </ParallaxLayer>
        <ParallaxLayer depth={0.4} className="absolute inset-0 -z-10 pointer-events-none">
          <FloatingObjects count={6} size={36} color="var(--gold)" />
        </ParallaxLayer>


        <ParallaxLayer depth={0.18} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute right-[-50px] top-[-50px] h-56 w-56 rounded-full bg-[oklch(0.87_0.10_90/0.3)] blur-3xl animate-halo" />
        </ParallaxLayer>
        <ParallaxLayer depth={0.22} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="glow-breathe absolute left-[-60px] bottom-[-60px] h-48 w-48 rounded-full bg-[oklch(0.83_0.12_220/0.22)] blur-3xl" />
        </ParallaxLayer>


        <div className="hero-rise flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-[var(--color-gold)]" />
          <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
            Ora et labora
          </p>
        </div>
        <h1 className="hero-rise hero-delay-1 mt-2 font-serif text-[2.6rem] leading-[1.05] text-foreground halo-text">
          <WordByWord
            text={`Prayers to
Our Mother`}
            preserveLines
            delay={0.2}
            stagger={0.07}
            duration={0.55}
          />
        </h1>
        <p className="hero-rise hero-delay-2 mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          &ldquo;Behold thy Mother.&rdquo; From the Cross He gave her to us — and
          the Church has never stopped answering. Every word here is hers, or
          was given to her, or was given by her.
        </p>
        <div className="hero-rise hero-delay-3 mt-5 flex items-center gap-3">
          <div className="gold-hairline w-14" />
          <span className="text-[var(--color-gold)]">✦</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {PRAYERS.length} prayers
          </span>
        </div>

        <button
          onClick={() => setExportOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 bg-muted/40 px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[var(--color-gold)] transition-transform active:scale-[0.98]"
        >
          <Download className="h-3.5 w-3.5" />
          Export all prayers
        </button>
      </ParallaxHero>


      <main className="px-5">
        {savedPrayers.length > 0 && (
          <section className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
              Kept close
            </p>
            <div className="mb-4 mt-1 flex items-center gap-3">
              <h2 className="font-serif text-2xl text-foreground">Your saved prayers</h2>
              <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
            </div>
            <div className="flex flex-wrap gap-2">
              {savedPrayers.map((p) => (
                <Link
                  key={p.slug}
                  to="/prayers/$slug"
                  params={{ slug: p.slug }}
                  className="glass-card inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs text-foreground active:scale-[0.98]"
                >
                  <Heart className="h-3 w-3 text-[var(--color-rose-soft)]" fill="currentColor" />
                  {p.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {SECTIONS.map(({ key, eyebrow, blurb }) => {
          const prayers = PRAYERS.filter((p) => p.category === key);
          if (prayers.length === 0) return null;
          return (
            <section key={key} className="mb-10">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-gold)]">
                {eyebrow}
              </p>
              <div className="mb-1.5 mt-1 flex items-center gap-3">
                <h2 className="font-serif text-2xl text-foreground">
                  {CATEGORY_LABEL[key]}
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
              </div>
              <p className="mb-4 max-w-sm text-xs italic leading-relaxed text-muted-foreground">
                {blurb}
              </p>

              <ul className="space-y-2.5">
                {prayers.map((p, pi) => {
                  const app = p.apparitionSlug
                    ? APPARITIONS.find((a) => a.slug === p.apparitionSlug)
                    : null;
                  return (
                    <li key={p.slug}>
                      <Reveal delay={Math.min(pi, 6) * 70}>
                      <Link
                        to="/prayers/$slug"
                        params={{ slug: p.slug }}
                        className="glass-card card-anim card-sheen group relative flex items-start gap-3 overflow-hidden rounded-2xl px-4 py-4"
                      >
                        <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/50 to-transparent" />
                        <div className="min-w-0 flex-1">
                          <div className="font-serif text-lg leading-tight text-foreground">
                            {p.title}
                          </div>
                          {p.latinTitle && (
                            <div className="mt-0.5 font-serif text-xs italic text-[var(--color-gold)]/80">
                              {p.latinTitle}
                            </div>
                          )}
                          {p.intro && (
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {p.intro}
                            </p>
                          )}
                          {app && (
                            <div className="mt-1.5 inline-flex items-center rounded-full border border-[var(--color-gold)]/30 px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-[var(--color-gold)]">
                              {app.title}
                            </div>
                          )}
                        </div>
                        <div className="mt-0.5 flex shrink-0 flex-col items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)] transition-transform group-active:scale-95">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggle(p.slug);
                            }}
                            aria-label={
                              isFavorite(p.slug)
                                ? `Remove ${p.title} from saved prayers`
                                : `Save ${p.title} to your prayers`
                            }
                            aria-pressed={isFavorite(p.slug)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary/50 text-[var(--color-rose-soft)] active:scale-95"
                          >
                            <Heart
                              className="h-3.5 w-3.5"
                              fill={isFavorite(p.slug) ? "currentColor" : "none"}
                            />
                          </button>
                        </div>
                      </Link>
                      </Reveal>
                    </li>

                  );
                })}
              </ul>
            </section>
          );
        })}

        <p className="mx-auto max-w-xs pb-4 text-center font-serif text-sm italic leading-relaxed text-muted-foreground">
          &ldquo;Do whatever He tells you.&rdquo;
          <span className="mt-1 block text-[10px] not-italic uppercase tracking-[0.25em] text-[var(--color-gold)]">
            John 2:5
          </span>
        </p>
      </main>

      <ExportPrayersDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>

  );
}
