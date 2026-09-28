import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriVision XR — Smart Farming Decisions" },
      {
        name: "description",
        content: "AI crop suitability, leaf camera scans, AR field HUD and VR training.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "AgriVision XR — Smart Farming Decisions" },
      {
        property: "og:description",
        content: "AI crop suitability, leaf camera scans, AR field HUD and VR training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/agrivision.html"
      title="AgriVision XR"
      allow="camera *; microphone *; fullscreen *"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
