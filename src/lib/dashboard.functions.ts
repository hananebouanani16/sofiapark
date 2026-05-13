import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { sessionConfig, type SessionData } from "./auth.server";
import type { DashboardData } from "./dashboard-data";

export const getDashboardData = createServerFn({ method: "GET" }).handler(
  async (): Promise<DashboardData> => {
    const session = await useSession<SessionData>(sessionConfig);
    if (!session.data?.authed) {
      throw redirect({ to: "/login" });
    }
    const data = await import("./dashboard-data.server");
    return {
      salesTrend: data.salesTrend,
      topProducts: data.topProducts,
      margins: data.margins,
      staff: data.staff,
      itEquipment: data.itEquipment,
      kpis: data.kpis,
    };
  },
);
