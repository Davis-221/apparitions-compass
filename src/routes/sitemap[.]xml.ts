import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { APPARITIONS } from "@/data/apparitions";
import { PRAYERS } from "@/data/prayers";

const BASE_URL = "https://apparitions-compass.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/map", changefreq: "monthly", priority: "0.8" },
          { path: "/prayers", changefreq: "monthly", priority: "0.8" },
          { path: "/saved", changefreq: "monthly", priority: "0.3" },
          {
            path: "/vatican-approved-marian-apparitions",
            changefreq: "monthly",
            priority: "0.9",
          },
          ...APPARITIONS.map((a) => ({
            path: `/apparition/${a.slug}`,
            changefreq: "yearly" as const,
            priority: "0.7",
          })),
          ...PRAYERS.map((p) => ({
            path: `/prayers/${p.slug}`,
            changefreq: "yearly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
