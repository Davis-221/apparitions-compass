import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Share2, Printer, Heart } from "lucide-react";
import { getPrayer, CATEGORY_LABEL, type PrayerCategory } from "@/data/prayers";
import { APPARITIONS } from "@/data/apparitions";
import { PrayerCardDialog } from "@/components/PrayerCardDialog";
import { usePrayerFavorites } from "@/hooks/use-prayer-favorites";
import { WordByWord } from "@/components/WordByWord";


const SITE = "https://apparitions-compass.lovable.app";

export const Route = createFileRoute("/prayers/$slug")({
  loader: ({ params }) => {
    const prayer = getPrayer(params.slug);
    if (!prayer) throw notFound();
    return { prayer };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Prayer not found" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.prayer;
    const url = `${SITE}/prayers/${params.slug}`;
    const description =
      p.intro ?? `${p.title} — pray the full text of this traditional Marian prayer.`;
    return {
      meta: [
        { title: `${p.title} — Marian Prayer` },
        { name: "description", content: description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: p.title,
            name: p.title,
            alternateName: p.latinTitle,
            description,
            text: p.text,
            url,
          }),
        },
      ],
    };
  },
  component: PrayerPage,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <Link to="/prayers" className="text-primary underline">Back to prayers</Link>
    </div>
  ),
});

function PrayerPage() {
  const { prayer } = Route.useLoaderData();
  const [shareOpen, setShareOpen] = useState(false);
  const { toggle, isFavorite } = usePrayerFavorites();
  const saved = isFavorite(prayer.slug);
  const apparition = prayer.apparitionSlug
    ? APPARITIONS.find((a) => a.slug === prayer.apparitionSlug)
    : null;

  return (
    <div className="min-h-screen pb-12">
      <header className="safe-area-top sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] px-3 py-3 backdrop-blur-2xl">
        <Link
          to="/prayers"
          aria-label="Back to prayers"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/50 text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="truncate font-serif text-lg text-foreground">{prayer.title}</h1>
        <button
          onClick={() => toggle(prayer.slug)}
          aria-label={saved ? `Remove ${prayer.title} from saved prayers` : `Save ${prayer.title}`}
          aria-pressed={saved}
          className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary/50 text-[var(--color-rose-soft)] active:scale-95"
        >
          <Heart className="h-4.5 w-4.5" fill={saved ? "currentColor" : "none"} />
        </button>
        <button
          onClick={() => setShareOpen(true)}
          aria-label={`Share or print a prayer card for ${prayer.title}`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-gold)]/40 bg-muted/40 text-[var(--color-gold)]"
        >
          <Share2 className="h-4.5 w-4.5" />
        </button>
      </header>

      <PrayerCardDialog prayer={prayer} open={shareOpen} onClose={() => setShareOpen(false)} />


      <main className="relative px-6 py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 star-field opacity-30 animate-twinkle" />
        <div className="pointer-events-none absolute right-[-40px] top-8 -z-10 h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] blur-3xl animate-halo" />
        <div className="pointer-events-none absolute left-[-60px] top-1/2 -z-10 h-52 w-52 rounded-full bg-[oklch(0.83_0.12_220/0.18)] blur-3xl" />

        <div className="mx-auto max-w-xl">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="gold-hairline w-12" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">
              {CATEGORY_LABEL[prayer.category as PrayerCategory]}
            </span>
            <div className="gold-hairline w-12" />
          </div>

          <h2 className="text-center font-serif text-3xl leading-tight text-foreground halo-text">
            <WordByWord
              text={prayer.title}
              delay={0.2}
              stagger={0.07}
              duration={0.55}
            />
          </h2>
          {prayer.latinTitle && (
            <p className="mt-1 text-center font-serif text-sm italic text-[var(--color-gold)]/85">
              <WordByWord
                text={prayer.latinTitle}
                delay={0.6}
                stagger={0.04}
                duration={0.4}
              />
            </p>
          )}
          {prayer.intro && (
            <p className="mx-auto mt-4 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
              <WordByWord
                text={prayer.intro}
                delay={0.8}
                stagger={0.03}
                duration={0.4}
              />
            </p>
          )}

          <div className="glass-card relative mt-8 overflow-hidden rounded-3xl px-6 py-9">
            <span className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/60 to-transparent" />
            <span className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-[var(--color-gold)]/40 to-transparent" />
            <div className="whitespace-pre-line text-center font-serif text-xl leading-[1.75] text-foreground">
              <WordByWord
                text={prayer.text}
                preserveLines
                delay={1.0}
                stagger={0.03}
                duration={0.45}
              />
            </div>
          </div>

          {prayer.howToPray && (
            <div className="mt-5 rounded-2xl border border-[var(--color-gold)]/25 bg-muted/30 px-5 py-4">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
                How to pray it
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {prayer.howToPray}
              </p>
            </div>
          )}

          {prayer.source && (
            <p className="mt-5 text-center text-xs italic text-muted-foreground">
              {prayer.source}
            </p>
          )}

          {apparition && (
            <Link
              to="/apparition/$slug"
              params={{ slug: apparition.slug }}
              className="glass-card mt-6 flex items-center gap-3 rounded-2xl px-4 py-4 transition-transform active:scale-[0.99]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/40 text-[var(--color-gold)]">
                <MapPin className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  Given at
                </p>
                <p className="truncate font-serif text-lg leading-tight text-foreground">
                  {apparition.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {apparition.location}, {apparition.country} · {apparition.year}
                </p>
              </div>
            </Link>
          )}

          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="gold-hairline w-12" />
            <span className="text-[var(--color-gold)]">✦</span>
            <div className="gold-hairline w-12" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShareOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--gold)] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary-foreground)]"
            >
              <Printer className="h-3.5 w-3.5" />
              Prayer card / PDF
            </button>
            <Link
              to="/prayers"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gold)]/40 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-[var(--color-gold)]"
            >
              More prayers
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
