import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/inventory")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Inventaire</h1>
      <p className="text-muted-foreground">Stock produits et matériel IT.</p>
      <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
        Module bientôt disponible.
      </div>
    </div>
  ),
});
