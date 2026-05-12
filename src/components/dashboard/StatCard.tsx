import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StatCard({
  icon,
  label,
  value,
  hint,
  delay = 0,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, rotateX: 4, rotateY: -4 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className="glass rounded-2xl p-5 relative overflow-hidden group"
    >
      <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors" />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-gradient">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className="rounded-xl bg-primary/15 p-2.5 text-primary">{icon}</div>
      </div>
    </motion.div>
  );
}
