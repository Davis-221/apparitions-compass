import { defineMcp } from "@lovable.dev/mcp-js";
import listApparitions from "./tools/list-apparitions";
import getApparition from "./tools/get-apparition";
import listPrayers from "./tools/list-prayers";

export default defineMcp({
  name: "marian-pilgrim",
  title: "Marian Pilgrim",
  version: "0.1.0",
  instructions:
    "Tools for the Marian Apparitions atlas. Use `list_apparitions` to browse or search apparitions by status, country, or text; `get_apparition` for the full record of one apparition by slug; and `list_prayers` for the Marian prayer library. All data is public catalogue content.",
  tools: [listApparitions, getApparition, listPrayers],
});
