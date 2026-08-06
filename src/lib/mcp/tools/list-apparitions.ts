import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { APPARITIONS, STATUS_LABEL } from "@/data/apparitions";

export default defineTool({
  name: "list_apparitions",
  title: "List apparitions",
  description:
    "List Marian apparitions in the catalogue, optionally filtered by Church status, country, or a free-text query over name, place, and seers.",
  inputSchema: {
    status: z
      .enum(["approved", "worthy", "investigation", "not_approved"])
      .nullable()
      .describe("Filter by Church status. Null for all statuses."),
    country: z.string().nullable().describe("Filter by country name. Null for all countries."),
    query: z
      .string()
      .nullable()
      .describe("Free-text search over title, location, country and seers. Null for no search."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ status, country, query }) => {
    const q = query?.trim().toLowerCase();
    const c = country?.trim().toLowerCase();
    const rows = APPARITIONS.filter((a) => {
      if (status && a.status !== status) return false;
      if (c && a.country.toLowerCase() !== c) return false;
      if (q) {
        const hay = [a.title, a.location, a.country, ...a.seers].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).map((a) => ({
      slug: a.slug,
      title: a.title,
      location: a.location,
      country: a.country,
      year: a.year,
      status: a.status,
      statusLabel: STATUS_LABEL[a.status],
      summary: a.summary,
      url: `https://apparitions-compass.lovable.app/apparition/${a.slug}`,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: rows.length, apparitions: rows }, null, 2) }],
      structuredContent: { count: rows.length, apparitions: rows },
    };
  },
});
