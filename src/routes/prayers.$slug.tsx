import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPrayer } from "@/data/prayers";

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
    const description = `${p.title} — pray the full text of this traditional Marian prayer.`;
    return {
      meta: [
        { title: p.title },
        { name: "description", content: description },
        { property: "og:title", content: p.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
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

  return (
    <div className="min-h-screen pb-8">
      <header className="safe-area-top sticky top-0 z-40 flex items-center gap-2 border-b border-white/10 bg-[oklch(0.22_0.08_265/0.7)] px-3 py-3 backdrop-blur-2xl">
        <Link
          to="/prayers"
          aria-label="Back to prayers"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground"
        >

          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg text-foreground">
          {prayer.title}
        </h1>
      </header>

      <main className="relative px-6 py-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 star-field opacity-30" />
        <div className="pointer-events-none absolute right-[-40px] top-8 -z-10 h-56 w-56 rounded-full bg-[oklch(0.87_0.10_90/0.25)] blur-3xl animate-halo" />
        <div className="mx-auto max-w-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="gold-hairline w-12" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-gold)]">Pray</span>
            <div className="gold-hairline w-12" />
          </div>
          <p className="whitespace-pre-line text-center font-serif text-xl leading-[1.7] text-foreground italic">
            {prayer.text}
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <div className="gold-hairline w-12" />
            <span className="text-[var(--color-gold)]">✦</span>
            <div className="gold-hairline w-12" />
          </div>
        </div>
      </main>
    </div>
  );
}
