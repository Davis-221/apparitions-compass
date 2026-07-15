import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { getPrayer } from "@/data/prayers";

export const Route = createFileRoute("/prayers/$slug")({
  loader: ({ params }) => {
    const prayer = getPrayer(params.slug);
    if (!prayer) throw notFound();
    return { prayer };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Prayer not found" }] };
    return {
      meta: [
        { title: loaderData.prayer.title },
        { name: "description", content: loaderData.prayer.text.slice(0, 150) },
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
    <div className="min-h-screen bg-background">
      <header className="safe-area-top flex items-center gap-2 border-b border-border bg-background/95 px-3 py-3 backdrop-blur">
        <Link
          to="/prayers"
          className="flex h-10 w-10 items-center justify-center rounded-full text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="font-serif text-lg font-semibold text-primary">
          {prayer.title}
        </h1>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-xl">
          <div className="mb-4 h-px w-16 bg-[var(--color-gold)]" />
          <p className="whitespace-pre-line font-serif text-lg leading-relaxed text-foreground">
            {prayer.text}
          </p>
          <div className="mt-8 h-px w-16 bg-[var(--color-gold)]" />
        </div>
      </main>
    </div>
  );
}
