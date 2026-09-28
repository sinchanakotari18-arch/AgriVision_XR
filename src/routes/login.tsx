import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "User Login — AgriVision XR" },
      {
        name: "description",
        content: "Sign in to your AgriVision XR account for crop intelligence and farm diagnostics.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <iframe
      src="/agrivision.html#login"
      title="AgriVision XR — User Login"
      allow="camera; fullscreen"
      className="fixed inset-0 h-full w-full border-0"
    />
  );
}
