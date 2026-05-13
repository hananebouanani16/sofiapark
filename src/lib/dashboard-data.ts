// Client-safe formatters and types. Real data lives in dashboard-data.server.ts
// and is fetched via the getDashboardData server function (auth-gated).

export const fmtDA = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(/,/g, " ")} DA`;

export type SalesPoint = { date: string; sales: number };
export type TopProduct = { name: string; units: number };
export type Margin = { product: string; cost: number; price: number; margin: number };
export type Staff = { name: string; role: string };
export type ItEquipment = { item: string; available: number };
export type Kpis = {
  revenue: number;
  transactions: number;
  totalPurchase: number;
  avgBasket: number;
  peakDate: string;
  peakValue: number;
  staff: number;
};

export type DashboardData = {
  salesTrend: SalesPoint[];
  topProducts: TopProduct[];
  margins: Margin[];
  staff: Staff[];
  itEquipment: ItEquipment[];
  kpis: Kpis;
};
