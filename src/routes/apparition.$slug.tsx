import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Calendar, Users, Share2 } from "lucide-react";
import { getApparition } from "@/data/apparitions";
import { PRAYERS } from "@/data/prayers";
import { StatusBadge } from "@/components/StatusBadge";
import { useFavorites } from "@/hooks/use-favorites";

export const Route = createFileRoute("/apparition/$slug")({
  loader: ({ params }) => {
    const apparition = getApparition(params.slug);
    if (!apparition) throw notFound();
    return { apparition };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Apparition not found" }, { name: "robots", content: "noindex" }] };
    }
    const a = loaderData.apparition;
    return {
      meta: [
        { title: `${a.title} — ${a.year}` },
        { name: "description", content: a.summary },
        { property: "og:title", content: `${a.title} — ${a.location}, ${a.year}` },
        { property: "og:description", content: a.summary },
      ],
    };
  },
  component: ApparitionPage,
  notFoundComponent: () => (
    <div className="p-8 text-center">
      <p className="text-muted-foreground">Apparition not found.</p>
      <Link to="/" className="mt-4 inline-block text-primary underline">Back to browse</Link>
    </div>
  ),
});

function ApparitionPage() {
  const { apparition: a } = Route.useLoaderData();
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(a.slug);
  const relatedPrayers = PRAYERS.filter((p) => p.apparitionSlug === a.slug);

  const share = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: a.title,
          text: a.summary,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        });
      } catch {}
    }
  };

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 100% at 30% 0%, oklch(0.55 0.13 258) 0%, oklch(0.25 0.08 258) 65%, oklch(0.18 0.05 258) 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, oklch(0.85 0.08 82 / 0.55), transparent 55%)",
        }} />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="safe-area-top absolute inset-x-0 top-0 flex items-center justify-between px-3 pt-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={share}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => toggle(a.slug)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur"
            >
              <Heart className={`h-5 w-5 ${fav ? "fill-rose-400 text-rose-400" : ""}`} />
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 px-5 pb-4 text-white">
          <StatusBadge status={a.status} />
          <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight">
            {a.title}
          </h1>
          <p className="mt-1 text-sm text-white/80">
            {a.location} · {a.country}
          </p>
        </div>
      </div>

      <div className="px-5 py-5">
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
          <Row icon={<Calendar className="h-4 w-4" />} label="Dates" value={a.dates} />
          <Row icon={<Users className="h-4 w-4" />} label="Seer(s)" value={a.seers.join(", ")} />
          {a.pilgrimage && (
            <Row icon={<MapPin className="h-4 w-4" />} label="Pilgrimage" value={a.pilgrimage} />
          )}
        </div>

        <Section title="Church Status">
          <p className="text-sm leading-relaxed text-muted-foreground">{a.statusNote}</p>
        </Section>

        <Section title="The Story">
          <p className="text-sm leading-relaxed">{a.account}</p>
        </Section>

        <Section title="Key Messages">
          <ul className="space-y-3">
            {a.messages.map((m, i) => (
              <li
                key={i}
                className="border-l-2 border-[var(--color-gold)] pl-3 font-serif text-base italic leading-relaxed text-primary"
              >
                {m}
              </li>
            ))}
          </ul>
        </Section>

        {relatedPrayers.length > 0 && (
          <Section title="Prayers">
            <div className="space-y-2">
              {relatedPrayers.map((p) => (
                <Link
                  key={p.slug}
                  to="/prayers/$slug"
                  params={{ slug: p.slug }}
                  className="block rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-primary"
                >
                  {p.title} →
                </Link>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--color-gold)]">{icon}</div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 font-serif text-xl font-semibold text-primary">{title}</h2>
      {children}
    </section>
  );
}
