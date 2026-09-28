import { createFileRoute } from "@tanstack/react-router";
import { getCollectionData, insertDocument } from "../../lib/mongodb";

export const Route = createFileRoute("/api/users")({
  loader: async () => {
    return await getCollectionData("users");
  }
});
