import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listApparitions from "./tools/list-apparitions";
import getApparition from "./tools/get-apparition";
import listPrayers from "./tools/list-prayers";

const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "marian-pilgrim",
  title: "Marian Pilgrim",
  version: "0.2.0",
  instructions:
    "Tools for the Marian Apparitions atlas. Use `list_apparitions` to browse or search apparitions by status, country, or text; `get_apparition` for the full record of one apparition by slug; and `list_prayers` for the Marian prayer library. Requires an authorized user.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listApparitions, getApparition, listPrayers],
});

