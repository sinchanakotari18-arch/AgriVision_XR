import { createFileRoute } from "@tanstack/react-router";
import { getCollectionData } from "../../lib/mongodb";

export const Route = createFileRoute("/api/scans")({
  loader: async () => {
    return await getCollectionData("scans");
  }
});
