import { createMiddleware } from "@tanstack/react-start";

export const attachMongoDbAuth = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    let token = "";
    try {
      const savedUser = localStorage.getItem("agrivision_active_user");
      if (savedUser) {
        const u = JSON.parse(savedUser);
        token = u.email || "agrivision_user";
      }
    } catch (e) {}

    return next({
      headers: token ? { "X-MongoDB-User": token } : {},
    });
  }
);
