import { createFileRoute } from "@tanstack/react-router";
import { getCollectionData } from "../../lib/mongodb";

export const Route = createFileRoute("/api/assessments")({
  loader: async () => {
    return await getCollectionData("assessments");
  }
});
