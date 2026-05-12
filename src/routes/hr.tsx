import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hr")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Ressources humaines</h1>
      <p className="text-muted-foreground">Équipe, plannings et performance.</p>
      <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
        Module bientôt disponible.
      </div>
    </div>
  ),
});
