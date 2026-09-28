import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "User Registration — AgriVision XR" },
      {
        name: "description",
        content: "Create a new AgriVision XR account for AI crop suitability and farm management.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <iframe
      src="/agrivision.html#register"
      title="AgriVision XR — User Registration"
      allow="camera *; microphone *; fullscreen *"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
