import { createFileRoute } from "@tanstack/react-router";

function Stub({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{desc}</p>
      <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
        Module bientôt disponible.
      </div>
    </div>
  );
}

export const Route = createFileRoute("/sales")({
  component: () => <Stub title="Ventes" desc="Détail des transactions et performance commerciale." />,
});
