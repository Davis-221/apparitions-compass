import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { APPARITIONS, STATUS_LABEL, type Apparition } from "@/data/apparitions";
import { StatusBadge } from "@/components/StatusBadge";

const SITE = "https://apparitions-compass.lovable.app";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map of Marian Apparitions" },
      {
        name: "description",
        content:
          "An interactive world map of Marian apparition sites, from Guadalupe to Fátima and beyond.",
      },
      { property: "og:title", content: "World Map of Marian Apparitions" },
      {
        property: "og:description",
        content:
          "Explore every Marian apparition site on an interactive world map, colour-coded by Church status.",
      },
      { property: "og:url", content: `${SITE}/map` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/map` }],
  }),
  component: MapPage,
});


declare global {
  interface Window {
    google: any;
    __initMarianMap?: () => void;
  }
}

const STATUS_COLOR: Record<Apparition["status"], string> = {
  approved: "#34d399",
  worthy: "#7dd3fc",
  investigation: "#fbbf24",
  not_approved: "#fb7185",
};

function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Apparition | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const key = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;
    const channel = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID;
    if (!key) {
      setError("Map key not configured.");
      return;
    }

    const init = () => {
      if (!mapRef.current || !window.google) return;
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 20, lng: 10 },
        zoom: 2,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1a2749" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#8fa5c8" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0f1b3d" }] },
          { featureType: "water", stylers: [{ color: "#0a1428" }] },
          { featureType: "landscape", stylers: [{ color: "#243761" }] },
          { featureType: "road", stylers: [{ visibility: "off" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#3a4f7a" }] },
          { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#c9b98f" }] },
        ],
      });

      APPARITIONS.forEach((a) => {
        const marker = new window.google.maps.Marker({
          position: { lat: a.coords[0], lng: a.coords[1] },
          map,
          title: a.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: STATUS_COLOR[a.status],
            fillOpacity: 1,
            strokeColor: "#fff",
            strokeWeight: 2,
            scale: 7,
          },
        });
        marker.addListener("click", () => setSelected(a));
      });
    };

    if (window.google?.maps) {
      init();
      return;
    }

    window.__initMarianMap = init;
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-marian-maps="1"]'
    );
    if (!existing) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&callback=__initMarianMap${
        channel ? `&channel=${channel}` : ""
      }`;
      script.async = true;
      script.defer = true;
      script.dataset.marianMaps = "1";
      script.onerror = () => setError("Could not load the map.");
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="relative h-screen w-full">
      <div ref={mapRef} className="absolute inset-0" />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-background p-6 text-center text-sm text-muted-foreground">
          {error}
        </div>
      )}

      <div className="safe-area-top pointer-events-none absolute inset-x-0 top-0 z-10 px-4 pt-4">
        <div className="pointer-events-auto glass-card rounded-2xl px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Pilgrim's Map
          </p>
          <h1 className="mt-0.5 font-serif text-xl text-foreground">
            Apparitions worldwide
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-foreground/80">
            {(Object.keys(STATUS_COLOR) as Apparition["status"][]).map((s) => (
              <span key={s} className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[s], boxShadow: `0 0 8px ${STATUS_COLOR[s]}` }} />
                {STATUS_LABEL[s]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div className="absolute inset-x-0 bottom-24 z-20 px-4 animate-[fade-in_0.25s_ease-out]">
          <div className="glass-card rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <StatusBadge status={selected.status} />
                <h2 className="mt-1.5 font-serif text-xl text-foreground">
                  {selected.title}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {selected.location} · {selected.year}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-muted-foreground"
              >
                Close
              </button>
            </div>
            <p className="mt-2 line-clamp-2 text-sm text-foreground/80">
              {selected.summary}
            </p>
            <Link
              to="/apparition/$slug"
              params={{ slug: selected.slug }}
              className="btn-glow mt-3 inline-flex rounded-full bg-gradient-to-r from-[oklch(0.83_0.12_220)] to-[oklch(0.87_0.10_90)] px-4 py-2 text-xs font-medium text-[oklch(0.20_0.08_265)]"
            >
              Read the story of {selected.title} →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
