import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Sparkles, ArrowUpRight, MapPin, Share2 } from "lucide-react";
import { ShareCardDialog } from "@/components/ShareCardDialog";
import { WordByWord } from "@/components/WordByWord";
import { ParallaxHero, ParallaxLayer } from "@/components/ParallaxHero";
import { GlowingParticles } from "@/components/GlowingParticles";
import { FloatingObjects } from "@/components/FloatingObjects";
import { Reveal } from "@/components/Reveal";


import {
  APPARITIONS,
  STATUS_LABEL,
  type Apparition,
  type ApparitionStatus,
} from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";
import { apparitionImage } from "@/data/apparition-images";


const SITE = "https://apparitions-compass.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marian Apparitions — A Celestial Atlas" },
      {
        name: "description",
        content:
          "An interactive atlas of Marian apparitions worldwide — from Guadalupe to Fátima, Lourdes to Medjugorje.",
      },
      { property: "og:title", content: "Marian Apparitions — A Celestial Atlas" },
      {
        property: "og:description",
        content:
          "Browse Marian apparitions worldwide by Church status, read their stories and messages, and pray with them.",
      },
      { property: "og:url", content: `${SITE}/` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: "Marian Atlas",
              url: `${SITE}/`,
              description:
                "An interactive atlas of Marian apparitions worldwide — from Guadalupe to Fátima, Lourdes to Medjugorje.",
            },
            {
              "@type": "Organization",
              name: "Marian Atlas",
              url: `${SITE}/`,
              description:
                "A devotional atlas documenting Marian apparitions and their Church status.",
            },
          ],
        }),
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

// Curated feature rotation from the most iconic approved apparitions
const FEATURED_SLUGS = ["guadalupe", "fatima", "lourdes", "rue-du-bac", "knock"];

function useRotatingFeatured() {
  const featured = useMemo(
    () =>
      FEATURED_SLUGS.map((s) => APPARITIONS.find((a) => a.slug === s)).filter(
        Boolean,
      ) as Apparition[],
    [],
  );
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % featured.length), 6000);
    return () => clearInterval(id);
  }, [featured.length]);
  return { current: featured[i], index: i, count: featured.length, setIndex: setI };
}

function BrowsePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [shareTarget, setShareTarget] = useState<Apparition | null>(null);
  const { current, index, count, setIndex } = useRotatingFeatured();

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

  const stats = useMemo(() => {
    const total = APPARITIONS.length;
    const approved = APPARITIONS.filter((a) => a.status === "approved").length;
    const countries = new Set(APPARITIONS.map((a) => a.country)).size;
    return { total, approved, countries };
  }, []);

  return (
    <div className="pb-8">
      {/* Sticky glass header */}
      <header className="safe-area-top sticky top-0 z-40">
        <div className="relative px-5 pt-5 pb-3">
          <div className="absolute inset-0 -z-10 bg-[color-mix(in_oklab,var(--background)_80%,transparent)] backdrop-blur-2xl border-b border-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--gold)]">
                <Sparkles className="h-4 w-4 text-[var(--primary-foreground)]" />
                <span className="absolute inset-0 -z-10 rounded-full bg-[color-mix(in_oklab,var(--glow)_50%,transparent)] blur-lg animate-halo" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  Ave Maria
                </p>
                <h1 className="font-serif text-base leading-none text-foreground">
                  Marian Atlas
                  <span className="sr-only">
                    {" "}— Marian apparitions worldwide
                  </span>
                </h1>
              </div>
            </div>
            <Link
              to="/map"
              className="flex items-center gap-1 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-[11px] text-foreground/80"
            >
              <MapPin className="h-3 w-3" /> World
            </Link>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search apparitions by place, seer, or year"
              placeholder="Search sacred places, seers, years…"
              className="w-full rounded-full border border-[color-mix(in_oklab,var(--primary)_35%,transparent)] bg-gradient-to-r from-[color-mix(in_oklab,var(--primary)_28%,var(--card))] via-[color-mix(in_oklab,var(--accent)_18%,var(--card))] to-[color-mix(in_oklab,var(--primary)_28%,var(--card))] pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring shadow-[0_0_30px_-8px_color-mix(in_oklab,var(--glow)_50%,transparent)]"
            />
          </div>

        </div>
      </header>

      {/* Hero — rotating featured apparition */}
      <section className="px-5 pt-4">
        <ParallaxHero
          key={current.slug}
          className="h-[380px] overflow-hidden rounded-3xl border border-[var(--glass-border)] animate-[fade-in_0.6s_ease-out]"
          as="div"
        >
          <Link
            to="/apparition/$slug"
            params={{ slug: current.slug }}
            className="group relative block h-full"
          >
            {/* Celestial layered background */}
            <ParallaxLayer depth={0.05} className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 20% 10%, oklch(0.55 0.20 260) 0%, oklch(0.28 0.10 265) 55%, oklch(0.18 0.06 265) 100%)",
                }}
              />
            </ParallaxLayer>
            {apparitionImage(current.slug) && (
              <ParallaxLayer depth={0.32} scale={[1.02, 1.1]} maxOffset={55} className="absolute inset-0">
                <img
                  src={apparitionImage(current.slug)}
                  alt={current.title}
                  className="ken-burns absolute inset-0 h-full w-full object-cover object-top opacity-90"
                  width={768}
                  height={960}
                />
              </ParallaxLayer>
            )}
            <ParallaxLayer depth={0.12} className="absolute inset-0">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 75% 30%, oklch(0.90 0.10 220 / 0.35), transparent 55%), radial-gradient(circle at 30% 75%, oklch(0.87 0.14 90 / 0.25), transparent 55%)",
                }}
              />
            </ParallaxLayer>
            <ParallaxLayer depth={0.25} className="absolute inset-0">
              <div className="star-drift absolute inset-0 star-field opacity-30 mix-blend-screen" />
            </ParallaxLayer>
            <ParallaxLayer depth={0.28} className="absolute inset-0 pointer-events-none">
              <GlowingParticles count={30} color="var(--gold)" />
            </ParallaxLayer>
            <ParallaxLayer depth={0.36} className="absolute inset-0 pointer-events-none">
              <FloatingObjects count={7} size={40} color="var(--gold)" />
            </ParallaxLayer>


            {/* Aureole */}
            <ParallaxLayer depth={0.18} className="absolute inset-0 pointer-events-none">
              <div className="absolute right-[-40px] top-[-40px] h-56 w-56 rounded-full bg-[color-mix(in_oklab,var(--gold)_35%,transparent)] blur-3xl animate-halo" />
            </ParallaxLayer>
            <ParallaxLayer depth={0.22} className="absolute inset-0 pointer-events-none">
              <div className="glow-breathe absolute bottom-[-30px] left-[-30px] h-48 w-48 rounded-full bg-[color-mix(in_oklab,var(--glow)_35%,transparent)] blur-3xl" />
            </ParallaxLayer>
            <div className="hero-sheen mix-blend-screen" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />



          {/* Top row */}
          <div className="relative flex items-start justify-between p-5">
            <span className="rounded-full border border-[var(--on-media-border)] bg-[oklch(1_0_0/0.14)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--on-media)]/90 backdrop-blur-md">
              Featured
            </span>
            <StatusBadge status={current.status} />
          </div>

          {/* Year - massive */}
          <div className="hero-rise pointer-events-none absolute right-5 top-16 font-serif text-[92px] italic leading-none text-[var(--on-media)]/10">
            {current.year}
          </div>

          {/* Content */}
          <div className="media-ink absolute inset-x-0 bottom-0 p-5">
            <p className="hero-rise hero-delay-1 text-[11px] uppercase tracking-[0.25em] text-[var(--gold-on-media)]">
              {current.country} · {current.dates}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-[var(--on-media)] halo-text">
              <WordByWord
                text={current.title}
                delay={0.3}
                stagger={0.07}
                duration={0.55}
              />
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-[var(--on-media)]/85">
              <WordByWord
                text={current.summary}
                delay={0.6}
                stagger={0.04}
                duration={0.45}
              />
            </p>
            <div className="hero-rise hero-delay-4 mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--on-media)] group-active:translate-x-0.5 transition-transform">
                Enter the story <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
              <div className="flex gap-1.5">
                {Array.from({ length: count }).map((_, k) => (
                  <button
                    key={k}
                    onClick={(e) => {
                      e.preventDefault();
                      setIndex(k);
                    }}
                    aria-label={`Show featured ${k + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      k === index ? "w-6 bg-[var(--on-media)]" : "w-1.5 bg-[var(--on-media)]/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
        </ParallaxHero>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Apparitions" value={stats.total} />
          <Stat label="Approved" value={stats.approved} />
          <Stat label="Countries" value={stats.countries} />
        </div>
      </section>

      {/* Filter chips */}
      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-[var(--color-gold)]" />
            <h3 className="font-serif text-lg text-foreground">The Chronicle</h3>
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} total</span>
        </div>

        <div className="mt-3 -mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-2 pb-1">
            {FILTERS.map(({ key, label }) => {
              const active = filter === key;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "border-transparent bg-gradient-to-r from-[var(--primary)] to-[var(--gold)] text-[var(--primary-foreground)] shadow-[0_8px_20px_-8px_color-mix(in_oklab,var(--glow)_60%,transparent)]"
                      : "border-border bg-secondary/50 text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial grid — magazine style: alternating hero + pair */}
      <main className="mt-4 space-y-5 px-5">
        {chunkMagazine(filtered).map((group, gi) => (
          <div key={gi} className="space-y-3">
            {group.hero && (
              <Reveal delay={gi * 60}>
                <HeroCard a={group.hero} priority={gi === 0} onShare={setShareTarget} />
              </Reveal>
            )}
            {group.pair.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {group.pair.map((a, pi) => (
                  <Reveal key={a.slug} delay={gi * 60 + pi * 80 + 60}>
                    <SmallCard a={a} onShare={setShareTarget} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center">
            <p className="font-serif text-lg text-foreground">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another status or search term.
            </p>
          </div>
        )}
      </main>

      {shareTarget && (
        <ShareCardDialog
          apparition={shareTarget}
          open={!!shareTarget}
          onClose={() => setShareTarget(null)}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="glass-card rounded-2xl px-3 py-3 text-center">
      <div className="font-serif text-2xl leading-none text-foreground halo-text">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function statusHue(status: ApparitionStatus) {
  switch (status) {
    case "approved":
      return "oklch(0.72 0.16 160)";
    case "worthy":
      return "oklch(0.75 0.14 220)";
    case "investigation":
      return "oklch(0.80 0.14 75)";
    case "not_approved":
      return "oklch(0.68 0.18 25)";
  }
}

type ShareHandler = (a: Apparition) => void;

function ShareButton({ a, onShare, small }: { a: Apparition; onShare: ShareHandler; small?: boolean }) {
  return (
    <button
      type="button"
      aria-label={`Share ${a.title}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onShare(a);
      }}
      className={`absolute z-10 grid place-items-center rounded-full border border-[var(--on-media-border)] bg-[oklch(0_0_0/0.35)] text-[var(--on-media)] backdrop-blur-md transition-transform hover:scale-110 active:scale-95 ${
        small ? "bottom-2 right-2 h-8 w-8" : "bottom-3 right-3 h-10 w-10"
      }`}
    >
      <Share2 className={small ? "h-3.5 w-3.5" : "h-4 w-4"} />
    </button>
  );
}

function HeroCard({ a, priority, onShare }: { a: Apparition; priority?: boolean; onShare: ShareHandler }) {
  const hue = statusHue(a.status);
  const img = apparitionImage(a.slug);
  return (
    <Link
      to="/apparition/$slug"
      params={{ slug: a.slug }}
      className="card-anim card-sheen group relative block h-56 overflow-hidden rounded-3xl border border-[var(--glass-border)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 25% 10%, ${hue} 0%, oklch(0.28 0.08 258) 55%, oklch(0.18 0.05 265) 100%)`,
        }}
      />
      {img && (
        <img
          src={img}
          alt={a.title}
          loading={priority ? "eager" : "lazy"}
          className="card-media absolute inset-0 h-full w-full object-cover object-top opacity-90"
          width={768}
          height={960}
        />
      )}
      <div className="absolute inset-0 star-field opacity-25 mix-blend-screen" />
      <div className="absolute right-[-30px] top-[-30px] h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 to-transparent" />


      <div className="relative flex items-start justify-between p-4">
        <span className="rounded-full border border-[var(--on-media-border)] bg-[oklch(1_0_0/0.14)] px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[var(--on-media)]/90 backdrop-blur-md">
          {priority ? "Latest" : "Chronicle"}
        </span>
        <StatusBadge status={a.status} />
      </div>

      <div className="pointer-events-none absolute right-4 top-10 font-serif text-6xl italic leading-none text-[var(--on-media)]/15">
        {a.year}
      </div>

      <div className="media-ink absolute inset-x-0 bottom-0 p-4 pr-16">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold-on-media)]">
          {a.location} · {a.country}
        </p>
        <h3 className="mt-1.5 font-serif text-2xl leading-tight text-[var(--on-media)]">
          {a.title}
        </h3>
      </div>
      <ShareButton a={a} onShare={onShare} />
    </Link>
  );
}

function SmallCard({ a, onShare }: { a: Apparition; onShare: ShareHandler }) {
  const hue = statusHue(a.status);
  const img = apparitionImage(a.slug);
  return (
    <Link
      to="/apparition/$slug"
      params={{ slug: a.slug }}
      className="card-anim card-sheen group relative block h-44 overflow-hidden rounded-2xl border border-[var(--glass-border)]"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 20% 0%, ${hue} 0%, oklch(0.25 0.08 265) 70%)`,
        }}
      />
      {img && (
        <img
          src={img}
          alt={a.title}
          loading="lazy"
          className="card-media absolute inset-0 h-full w-full object-cover object-top opacity-90"
          width={768}
          height={960}
        />
      )}
      <div className="absolute inset-0 star-field opacity-20 mix-blend-screen" />
      <div className="absolute right-[-16px] top-[-16px] h-20 w-20 rounded-full bg-[color-mix(in_oklab,var(--gold)_25%,transparent)] blur-2xl" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 to-transparent" />


      <div className="pointer-events-none absolute right-3 top-2 font-serif text-3xl italic leading-none text-[var(--on-media)]/20">
        {a.year}
      </div>

      <div className="media-ink absolute inset-x-0 bottom-0 p-3">
        <p className="text-[9px] uppercase tracking-[0.2em] text-[var(--gold-on-media)]">
          {a.country}
        </p>
        <h4 className="mt-1 line-clamp-2 font-serif text-base leading-tight text-[var(--on-media)]">
          {a.title}
        </h4>
      </div>
    </Link>
  );
}

function chunkMagazine(items: Apparition[]) {
  const groups: { hero: Apparition | null; pair: Apparition[] }[] = [];
  let i = 0;
  while (i < items.length) {
    const hero = items[i] ?? null;
    const pair = items.slice(i + 1, i + 3);
    groups.push({ hero, pair });
    i += 3;
  }
  return groups;
}
