import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Calendar, Users, Share2, Sparkles } from "lucide-react";
import { useState } from "react";
import { getApparition } from "@/data/apparitions";
import { PRAYERS } from "@/data/prayers";
import { StatusBadge } from "@/components/StatusBadge";
import { useFavorites } from "@/hooks/use-favorites";
import { ShareCardDialog } from "@/components/ShareCardDialog";

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
  const [shareOpen, setShareOpen] = useState(false);
  const share = () => setShareOpen(true);

  return (
    <div className="pb-8">
      {/* Cinematic hero */}
      <div className="relative h-[440px] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 100% at 25% 5%, oklch(0.60 0.20 260) 0%, oklch(0.28 0.10 265) 55%, oklch(0.16 0.06 265) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 25%, oklch(0.90 0.12 220 / 0.55), transparent 55%), radial-gradient(circle at 30% 80%, oklch(0.87 0.14 90 / 0.35), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 star-field opacity-70 animate-twinkle" />
        <div className="absolute right-[-60px] top-[-60px] h-72 w-72 rounded-full bg-[oklch(0.87_0.10_90/0.35)] blur-3xl animate-halo" />
        <div className="absolute bottom-[-40px] left-[-40px] h-64 w-64 rounded-full bg-[oklch(0.72_0.16_215/0.35)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="safe-area-top absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3">
          <Link
            to="/"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={share}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => toggle(a.slug)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl"
              aria-pressed={fav}
            >
              {fav && <span className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.78_0.15_25/0.5)] blur-lg animate-halo" />}
              <Heart className={`h-5 w-5 transition-all ${fav ? "fill-rose-300 text-rose-300 scale-110" : ""}`} />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute right-4 top-24 font-serif text-[120px] italic leading-none text-white/10">
          {a.year}
        </div>

        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-white">
          <StatusBadge status={a.status} />
          <h1 className="mt-3 font-serif text-4xl leading-[1.05] text-glow">
            {a.title}
          </h1>
          <p className="mt-2 text-sm text-white/80">
            {a.location} · {a.country}
          </p>
          <div className="mt-4 gold-hairline w-24" />
        </div>
      </div>

      <div className="px-5 py-6">
        {/* Info card - glass */}
        <div className="glass-card grid grid-cols-1 gap-4 rounded-2xl p-5 text-sm">
          <Row icon={<Calendar className="h-4 w-4" />} label="Dates" value={a.dates} />
          <Row icon={<Users className="h-4 w-4" />} label="Seer(s)" value={a.seers.join(", ")} />
          {a.pilgrimage && (
            <Row icon={<MapPin className="h-4 w-4" />} label="Pilgrimage" value={a.pilgrimage} />
          )}
        </div>

        <Section title="Church Status" eyebrow="Ecclesial verdict">
          <p className="text-sm leading-relaxed text-muted-foreground">{a.statusNote}</p>
        </Section>

        <Section title="The Story" eyebrow="Chronicle">
          <p className="text-[15px] leading-relaxed text-foreground/90">{a.account}</p>
        </Section>

        <Section title="Key Messages" eyebrow="Words from Heaven">
          <ul className="space-y-4">
            {a.messages.map((m: string, i: number) => (
              <li
                key={i}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-4 pl-6 font-serif text-lg italic leading-relaxed text-foreground"
              >
                <span className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b from-[var(--color-gold)] to-[oklch(0.83_0.12_220)]" />
                <Sparkles className="absolute right-3 top-3 h-3.5 w-3.5 text-[var(--color-gold)]/70" />
                {m}
              </li>
            ))}
          </ul>
        </Section>

        {relatedPrayers.length > 0 && (
          <Section title="Prayers" eyebrow="Pray with her">
            <div className="space-y-2">
              {relatedPrayers.map((p) => (
                <Link
                  key={p.slug}
                  to="/prayers/$slug"
                  params={{ slug: p.slug }}
                  className="glass-card flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-foreground"
                >
                  <span className="font-serif text-base">{p.title}</span>
                  <span className="text-[var(--color-gold)]">→</span>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </div>
      <ShareCardDialog apparition={a} open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[oklch(0.87_0.10_90/0.15)] text-[var(--color-gold)]">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm text-foreground">{value}</div>
      </div>
    </div>
  );
}

function Section({ title, eyebrow, children }: { title: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      {eyebrow && (
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
          {eyebrow}
        </p>
      )}
      <div className="mb-3 mt-1 flex items-center gap-3">
        <h2 className="font-serif text-2xl text-foreground">{title}</h2>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
      </div>
      {children}
    </section>
  );
}
