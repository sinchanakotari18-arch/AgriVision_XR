import { createFileRoute } from "@tanstack/react-router";
import { getDbStatus, seedMongoDb } from "../../../lib/mongodb";

export const Route = createFileRoute("/api/db/status")({
  loader: async () => {
    return await getDbStatus();
  }
});
