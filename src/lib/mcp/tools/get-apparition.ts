import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { APPARITIONS, STATUS_LABEL } from "@/data/apparitions";
import { PRAYERS } from "@/data/prayers";

export default defineTool({
  name: "get_apparition",
  title: "Get apparition details",
  description:
    "Get the full record for one Marian apparition by slug: dates, seers, Church status, historical account, key messages, pilgrimage site, and any prayers tied to it.",
  inputSchema: {
    slug: z.string().min(1).describe("Apparition slug, e.g. 'guadalupe', 'fatima', 'lourdes'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const key = slug.trim().toLowerCase();
    const a = APPARITIONS.find((x) => x.slug === key);
    if (!a) {
      throw new ToolError(
        `No apparition found with slug "${slug}". Use list_apparitions to see available slugs.`,
      );
    }

    const payload = {
      ...a,
      statusLabel: STATUS_LABEL[a.status],
      url: `https://apparitions-compass.lovable.app/apparition/${a.slug}`,
      prayers: PRAYERS.filter((p) => p.apparitionSlug === a.slug).map((p) => ({
        slug: p.slug,
        title: p.title,
        text: p.text,
      })),
    };

    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
