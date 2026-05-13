import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";
import { sessionConfig, type SessionData } from "./auth.server";

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<SessionData>(sessionConfig);
  return { authed: Boolean(session.data?.authed) };
});

export const login = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ password: z.string().min(1).max(200) }).parse(input),
  )
  .handler(async ({ data }) => {
    const expected = process.env.DASHBOARD_PASSWORD;
    if (!expected) {
      return { ok: false, error: "Configuration serveur manquante." };
    }
    // simple constant-time-ish compare
    const a = Buffer.from(data.password);
    const b = Buffer.from(expected);
    const match =
      a.length === b.length &&
      a.reduce((acc, v, i) => acc | (v ^ b[i]!), 0) === 0;
    if (!match) {
      return { ok: false, error: "Mot de passe incorrect." };
    }
    const session = await useSession<SessionData>(sessionConfig);
    await session.update({ authed: true, ts: Date.now() });
    return { ok: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<SessionData>(sessionConfig);
  await session.clear();
  return { ok: true };
});
