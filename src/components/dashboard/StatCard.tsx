import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

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
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 200, damping: 18 });
  const glowX = useTransform(x, [-50, 50], ["20%", "80%"]);
  const glowY = useTransform(y, [-50, 50], ["20%", "80%"]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 90 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
        boxShadow:
          "0 30px 60px -20px rgba(60,80,160,0.35), 0 12px 24px -8px rgba(60,80,160,0.2), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
      className="glass rounded-2xl p-5 relative overflow-hidden group cursor-pointer will-change-transform"
    >
      {/* reactive glow follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(400px circle at ${gx} ${gy}, oklch(0.85 0.15 265 / 0.35), transparent 60%)`,
          ),
        }}
      />
      {/* sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.25) 100%)",
        }}
      />
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl group-hover:bg-primary/30 transition-colors" />

      <div className="flex items-start justify-between relative" style={{ transform: "translateZ(40px)" }}>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold text-gradient drop-shadow-[0_4px_12px_rgba(80,100,200,0.25)]">
            {value}
          </p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <motion.div
          whileHover={{ scale: 1.15, rotate: 8 }}
          className="rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 p-2.5 text-primary shadow-[0_8px_20px_-6px_rgba(80,100,200,0.5),inset_0_1px_0_rgba(255,255,255,0.6)]"
          style={{ transform: "translateZ(60px)" }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}
