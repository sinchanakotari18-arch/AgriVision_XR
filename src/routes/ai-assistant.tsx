import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-assistant")({
  head: () => ({
    meta: [
      { title: "AI Agronomist Copilot — AgriVision XR" },
      {
        name: "description",
        content: "Neural AI Agronomist Copilot for crop disease diagnosis, precision fertigation, and farm decision support.",
      },
    ],
  }),
  component: AiAssistantPage,
});

function AiAssistantPage() {
  return (
    <iframe
      src="/agrivision.html#ai-assistant"
      title="AgriVision XR — AI Agronomist Copilot"
      allow="camera *; microphone *; fullscreen *"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
