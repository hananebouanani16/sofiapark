const rawSecret = process.env.SESSION_SECRET || "dev-only-fallback-secret-change-me";
// h3 requires >= 32 chars; pad deterministically if too short.
const sessionPassword = rawSecret.length >= 32 ? rawSecret : rawSecret.padEnd(32, "0");

export const sessionConfig = {
  password: sessionPassword,
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
