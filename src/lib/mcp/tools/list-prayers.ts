import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { PRAYERS } from "@/data/prayers";

export default defineTool({
  name: "list_prayers",
  title: "List prayers",
  description:
    "List Marian prayers in the app's prayer library, optionally filtered by category or by the apparition they belong to. Returns full prayer text.",
  inputSchema: {
    category: z
      .enum(["marian", "rosary", "litany", "consecration", "apparition"])
      .nullable()
      .describe("Filter by prayer category. Null for all categories."),
    apparitionSlug: z
      .string()
      .nullable()
      .describe("Only prayers tied to this apparition slug. Null for no filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, apparitionSlug }) => {
    const slug = apparitionSlug?.trim().toLowerCase();
    const rows = PRAYERS.filter((p) => {
      if (category && p.category !== category) return false;
      if (slug && p.apparitionSlug !== slug) return false;
      return true;
    }).map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      apparitionSlug: p.apparitionSlug ?? null,
      text: p.text,
      url: `https://apparitions-compass.lovable.app/prayers/${p.slug}`,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: rows.length, prayers: rows }, null, 2) }],
      structuredContent: { count: rows.length, prayers: rows },
    };
  },
});
