import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { checkAuth, login } from "@/lib/auth.functions";
import { FloatingOrbs } from "@/components/dashboard/FloatingOrbs";
import sofiaLogo from "@/assets/sofia-park-logo.png";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async () => {
    const { authed } = await checkAuth();
    if (authed) throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Sofia Park — Connexion" },
      { name: "description", content: "Accès sécurisé au tableau de bord Sofia Park." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function LoginPage() {
  const router = useRouter();
  const loginFn = useServerFn(login);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await loginFn({ data: { password } });
      if (res.ok) {
        await router.invalidate();
        router.navigate({ to: "/" });
      } else {
        setError(res.error || "Mot de passe incorrect.");
      }
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden grid place-items-center px-4">
      <FloatingOrbs />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass relative z-10 w-full max-w-sm rounded-2xl p-7 space-y-5"
        style={{
          boxShadow:
            "0 30px 60px -20px rgba(60,80,160,0.35), inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <img src={sofiaLogo} alt="Sofia Park" className="h-16 w-auto" />
          <div className="text-center">
            <h1 className="text-xl font-bold">Accès sécurisé</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Tableau de bord Sofia Park
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="pw" className="text-xs font-medium text-muted-foreground">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              id="pw"
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              maxLength={200}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-white/70 backdrop-blur pl-9 pr-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-2.5 text-sm shadow-[0_10px_25px_-8px_rgba(80,100,200,0.6)] hover:opacity-95 disabled:opacity-50 transition"
        >
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </motion.form>
    </div>
  );
}
