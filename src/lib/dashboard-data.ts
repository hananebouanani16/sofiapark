export const fmtDA = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }).replace(/,/g, " ")} DA`;

export const salesTrend = [
  { date: "22 Avr", sales: 13450 },
  { date: "23 Avr", sales: 41230 },
  { date: "24 Avr", sales: 58900 },
  { date: "25 Avr", sales: 72100 },
  { date: "26 Avr", sales: 81560 },
  { date: "27 Avr", sales: 64320 },
  { date: "28 Avr", sales: 75890 },
  { date: "29 Avr", sales: 97695 },
  { date: "30 Avr", sales: 92320 },
];

export const topProducts = [
  { name: "Jeton", units: 667 },
  { name: "Soft play 1 enfant 30min", units: 333 },
  { name: "Soft play 2 enfants 30min", units: 196 },
  { name: "Sucette SHWINXI", units: 150 },
  { name: "Café", units: 141 },
];

export const margins = [
  { product: "Sucette SHWINXI", cost: 35, price: 80, margin: 127 },
  { product: "Café", cost: 60, price: 120, margin: 100 },
  { product: "Jeton", cost: 25, price: 50, margin: 100 },
  { product: "Soft play 30min", cost: 150, price: 300, margin: 100 },
];

export const staff = [
  { name: "Bouanani Hanane", role: "Responsable Caisse" },
  { name: "Labiad Selwa", role: "Animatrice Soft Play" },
  { name: "Maddehe Nourhen", role: "Hôtesse d'accueil" },
  { name: "Bachir Bay Fairouz", role: "Cafétéria" },
];

export const itEquipment = [
  { item: "All in One", available: 100 },
  { item: "Imprimante", available: 100 },
  { item: "Scanners", available: 100 },
  { item: "Réseau", available: 95 },
  { item: "Caisse", available: 100 },
];

export const kpis = {
  revenue: 597465,
  transactions: 2662,
  totalPurchase: 17465,
  avgBasket: 224.44,
  peakDate: "30 Avril",
  peakValue: 92320,
  staff: 4,
};
