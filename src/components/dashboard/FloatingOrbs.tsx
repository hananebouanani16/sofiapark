import { motion } from "framer-motion";

const orbs = [
  { size: 380, color: "oklch(0.72 0.18 165 / 35%)", x: "-8%", y: "-10%", dur: 18 },
  { size: 300, color: "oklch(0.55 0.22 265 / 30%)", x: "70%", y: "5%", dur: 22 },
  { size: 240, color: "oklch(0.78 0.15 200 / 28%)", x: "20%", y: "60%", dur: 26 },
  { size: 200, color: "oklch(0.65 0.20 320 / 25%)", x: "80%", y: "70%", dur: 20 },
  { size: 160, color: "oklch(0.80 0.16 90 / 22%)", x: "45%", y: "35%", dur: 24 },
];

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            background: `radial-gradient(circle at 30% 30%, ${o.color}, transparent 70%)`,
          }}
          animate={{
            x: [0, 40, -30, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
