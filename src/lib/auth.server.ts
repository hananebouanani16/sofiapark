export const sessionConfig = {
  password: process.env.SESSION_SECRET || "dev-only-fallback-secret-change-me-32chars",
  name: "sofia_dash_session",
  maxAge: 60 * 60 * 8, // 8 hours
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
};

export type SessionData = { authed?: boolean; ts?: number };
