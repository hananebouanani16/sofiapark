import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Area,
  AreaChart,
} from "recharts";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  Trophy,
  Sparkles,
  LogOut,
} from "lucide-react";
import sofiaLogo from "@/assets/sofia-park-logo.png";
import { fmtDA, type DashboardData } from "@/lib/dashboard-data";
import { getDashboardData } from "@/lib/dashboard.functions";
import { checkAuth, logout } from "@/lib/auth.functions";
import { StatCard } from "@/components/dashboard/StatCard";

export const Route = createFileRoute("/")({
  component: Overview,
  beforeLoad: async () => {
    const { authed } = await checkAuth();
    if (!authed) throw redirect({ to: "/login" });
  },
  loader: () => getDashboardData(),
  head: () => ({
    meta: [
      { title: "Sofia Park — Tableau de bord" },
      {
        name: "description",
        content: "Tableau de bord exécutif Sofia Park.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const tooltipStyle = {
  background: "rgba(255,255,255,0.95)",
  border: "1px solid rgba(80,90,160,0.2)",
  borderRadius: 14,
  color: "#1a2547",
  fontSize: 12,
  boxShadow: "0 12px 30px -10px rgba(60,80,160,0.25)",
};

function Overview() {
  const data = Route.useLoaderData() as DashboardData;
  const { kpis, salesTrend, topProducts, margins, staff, itEquipment } = data;
  const router = useRouter();
  const logoutFn = useServerFn(logout);

  const onLogout = async () => {
    await logoutFn();
    await router.invalidate();
    router.navigate({ to: "/login" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <motion.img
            src={sofiaLogo}
            alt="Sofia Park"
            className="h-20 md:h-24 w-auto drop-shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/80 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Executive Dashboard
            </p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Bonjour, <span className="text-gradient">Sofia Park</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Synthèse d'activité — 1 au 31 Mai 2026
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="glass rounded-xl px-4 py-2.5 text-sm">
            <span className="text-muted-foreground">Statut : </span>
            <span className="text-primary font-semibold">● En croissance</span>
          </div>
          <button
            onClick={onLogout}
            className="glass rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-primary transition flex items-center gap-1.5"
            title="Se déconnecter"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Chiffre d'affaires"
          value="1 715 090,00 DA"
          hint="Total Mai 2026"
          delay={0}
        />
        <StatCard
          icon={<ShoppingCart className="h-5 w-5" />}
          label="Total Achat"
          value="198 777,73 DA"
          hint="Pic 113 705,27 DA le 22/05/2026"
          delay={0.05}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Pic d'activité"
          value="121 955,00 DA"
          hint={kpis.peakDate}
          delay={0.1}
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Équipe active"
          value={`${kpis.staff} membres`}
          hint="Turnover 0%"
          delay={0.15}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Évolution des ventes</h2>
              <p className="text-xs text-muted-foreground">DA / jour</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-md bg-primary/15 text-primary">
              Mai 2026
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.72 0.18 165)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.45 0.05 260 / 20%)" />
              <XAxis dataKey="date" stroke="oklch(0.72 0.03 255)" fontSize={11} />
              <YAxis
                stroke="oklch(0.72 0.03 255)"
                fontSize={11}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [fmtDA(v), "Ventes"]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="oklch(0.72 0.18 165)"
                strokeWidth={2.5}
                fill="url(#g1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Disponibilité IT</h2>
            <span className="text-xs text-muted-foreground">%</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={itEquipment}>
              <PolarGrid stroke="oklch(0.45 0.05 260 / 30%)" />
              <PolarAngleAxis dataKey="item" tick={{ fill: "oklch(0.85 0.02 255)", fontSize: 11 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="available"
                stroke="oklch(0.55 0.22 265)"
                fill="oklch(0.55 0.22 265)"
                fillOpacity={0.45}
              />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top products + margins */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Top 10 produits</h2>
              <p className="text-xs text-muted-foreground">Volume de vente (unités)</p>
            </div>
            <Trophy className="h-4 w-4 text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topProducts} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.45 0.05 260 / 20%)" horizontal={false} />
              <XAxis type="number" stroke="oklch(0.72 0.03 255)" fontSize={11} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="oklch(0.72 0.03 255)"
                fontSize={11}
                width={150}
              />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} unités`, "Volume"]} />
              <Bar dataKey="units" fill="oklch(0.72 0.18 165)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass rounded-2xl p-5"
        >
          <h2 className="font-semibold mb-1">Ventes / Marge par famille</h2>
          <p className="text-xs text-muted-foreground mb-4">Total ventes & marge (DA)</p>
          <div className="space-y-3">
            {margins.map((m) => (
              <div
                key={m.product}
                className="rounded-lg bg-secondary/30 px-3 py-2.5 border border-border/40"
              >
                <p className="text-sm font-medium truncate">{m.product}</p>
                <div className="mt-1 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">
                    Vente <span className="text-foreground font-semibold">{fmtDA(m.cost)}</span>
                  </span>
                  <span className="text-primary font-semibold">
                    Marge {fmtDA(m.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Staff */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold">Ressources humaines</h2>
            <p className="text-xs text-muted-foreground">
              4 collaboratrices · 100% féminin · Turnover 0%
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {staff.map((s) => (
            <div
              key={s.name}
              className="rounded-xl border border-border/40 bg-secondary/30 p-4 hover:border-primary/40 transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-sm font-bold text-primary-foreground">
                {s.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <p className="mt-3 font-medium text-sm">{s.name}</p>
              <p className="text-xs text-muted-foreground">{s.role}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
