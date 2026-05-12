import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Administration</h1>
      <p className="text-muted-foreground">Paramètres et accès système.</p>
      <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
        Module bientôt disponible.
      </div>
    </div>
  ),
});
