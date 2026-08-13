import { createFileRoute, Link } from "@tanstack/react-router";
import { ParallaxHero, ParallaxLayer } from "@/components/ParallaxHero";
import { ShieldCheck } from "lucide-react";
import { APPARITIONS } from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";
import { apparitionImage } from "@/data/apparition-images";

const SITE = "https://apparitions-compass.lovable.app";
const URL = `${SITE}/vatican-approved-marian-apparitions`;
const DESCRIPTION =
  "A complete list of Vatican-approved Marian apparitions — Guadalupe, Lourdes, Fátima and more — with the Church's criteria for judging authenticity.";

export const Route = createFileRoute("/vatican-approved-marian-apparitions")({
  head: () => ({
    meta: [
      { title: "Vatican Approved Marian Apparitions — Full List" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Vatican Approved Marian Apparitions" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Vatican Approved Marian Apparitions",
          description: DESCRIPTION,
          url: URL,
        }),
      },
    ],
  }),
  component: ApprovedPage,
});

const CRITERIA = [
  {
    title: "Moral certainty of the facts",
    body: "The investigating bishop must reach moral certainty — or at least strong probability — that the reported events cannot be explained by natural causes, deceit, or illness.",
  },
  {
    title: "Character of the seers",
    body: "The visionaries are examined for psychological balance, honesty, sincerity, obedience to Church authority, and ordinary Christian charity before and after the events.",
  },
  {
    title: "Soundness of the message",
    body: "Nothing revealed may contradict Scripture, doctrine, or morals. Genuine messages call to conversion, prayer, and penance rather than novelty or fear.",
  },
  {
    title: "Enduring spiritual fruits",
    body: "Lasting conversions, healings, charity, vocations, and devotion at the site weigh heavily in favour of authenticity.",
  },
  {
    title: "The bishop's judgement",
    body: "The local bishop rules first, with the Dicastery for the Doctrine of the Faith supporting or reserving the case. Approval permits public devotion; it never obliges belief.",
  },
];

function ApprovedPage() {
  const approved = APPARITIONS.filter((a) => a.status === "approved").sort(
    (a, b) => a.year - b.year,
  );

  return (
    <div className="pb-8">
      <ParallaxHero className="safe-area-top relative overflow-hidden px-6 pt-8 pb-8" as="header">
        <ParallaxLayer depth={0.3} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 star-field opacity-40" />
        </ParallaxLayer>
        <ParallaxLayer depth={0.18} className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute right-[-40px] top-[-40px] h-48 w-48 rounded-full bg-[oklch(0.72_0.16_160/0.3)] blur-3xl animate-halo" />
        </ParallaxLayer>
        <ParallaxLayer depth={-0.08} maxOffset={40}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
            <p className="text-[11px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Approved by the Church
            </p>
          </div>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-foreground halo-text">
            Vatican Approved Marian Apparitions
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {approved.length} apparitions in this atlas carry formal Church approval —
            meaning a bishop, with the Holy See's support, declared them worthy of
            belief and permitted public devotion at the site.
          </p>
          <div className="mt-4 gold-hairline w-16" />
        </ParallaxLayer>
      </ParallaxHero>

      <main className="px-5">
        <section>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            The verified accounts
          </p>
          <div className="mb-3 mt-1 flex items-center gap-3">
            <h2 className="font-serif text-2xl text-foreground">Approved apparitions</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
          </div>
          <ul className="space-y-3">
            {approved.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/apparition/$slug"
                  params={{ slug: a.slug }}
                  className="glass-card flex items-start gap-3 rounded-2xl p-3 active:scale-[0.99] transition-transform"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[oklch(0.22_0.08_265)]">
                    {apparitionImage(a.slug) && (
                      <img
                        src={apparitionImage(a.slug)}
                        alt={a.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                        width={768}
                        height={960}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <StatusBadge status={a.status} />
                    <h3 className="mt-1.5 font-serif text-lg leading-snug text-foreground">
                      {a.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {a.location} · {a.country} · {a.year}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-sm text-foreground/80">
                      {a.summary}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            How the Church decides
          </p>
          <div className="mb-3 mt-1 flex items-center gap-3">
            <h2 className="font-serif text-2xl text-foreground">Criteria for authenticity</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-gold)]/60 to-transparent" />
          </div>
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            Since the 1978 norms of the Congregation for the Doctrine of the Faith —
            revised in the 2024 norms on alleged supernatural phenomena — the Church
            weighs each reported apparition against positive and negative criteria.
          </p>
          <div className="space-y-3">
            {CRITERIA.map((c) => (
              <article key={c.title} className="glass-card rounded-2xl p-4">
                <h3 className="font-serif text-lg text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="glass-card rounded-2xl p-5 text-center">
            <h2 className="font-serif text-xl text-foreground">
              Explore every apparition
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Approved, worthy of belief, under investigation, and not approved —
              all mapped in one atlas.
            </p>
            <Link
              to="/"
              className="btn-glow mt-4 inline-flex rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--gold)] px-6 py-2.5 text-sm font-medium text-[var(--primary-foreground)]"
            >
              Browse the atlas
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
