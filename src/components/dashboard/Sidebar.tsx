import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, TrendingUp, Boxes, Users, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/sales", label: "Sales", icon: TrendingUp },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/hr", label: "HR", icon: Users },
  { to: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/50 bg-sidebar/40 backdrop-blur-xl px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <p className="font-bold leading-none">Sofia Park</p>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Dashboard</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map((it) => {
          const active = path === it.to;
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-primary/15 text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                  : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto glass rounded-xl p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Période</p>
        <p>22 → 30 Avril 2026</p>
      </div>
    </aside>
  );
}
