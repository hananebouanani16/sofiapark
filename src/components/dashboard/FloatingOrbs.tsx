import { motion } from "framer-motion";

const orbs = [
  { size: 220, color: "oklch(0.72 0.18 165)", x: "5%", y: "10%", dur: 14, depth: 1 },
  { size: 160, color: "oklch(0.55 0.22 265)", x: "75%", y: "8%", dur: 18, depth: 0.7 },
  { size: 140, color: "oklch(0.78 0.15 200)", x: "20%", y: "65%", dur: 22, depth: 0.6 },
  { size: 120, color: "oklch(0.65 0.20 320)", x: "82%", y: "70%", dur: 16, depth: 0.5 },
  { size: 90, color: "oklch(0.80 0.16 90)", x: "50%", y: "40%", dur: 20, depth: 0.4 },
  { size: 70, color: "oklch(0.70 0.20 30)", x: "35%", y: "20%", dur: 12, depth: 0.3 },
  { size: 60, color: "oklch(0.75 0.18 140)", x: "65%", y: "50%", dur: 15, depth: 0.35 },
  { size: 50, color: "oklch(0.68 0.22 280)", x: "10%", y: "85%", dur: 17, depth: 0.25 },
];

export function FloatingOrbs() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
    >
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            transformStyle: "preserve-3d",
            background: `radial-gradient(circle at 30% 25%, color-mix(in oklab, ${o.color} 90%, white), ${o.color} 45%, color-mix(in oklab, ${o.color} 50%, black) 100%)`,
            boxShadow: `inset -10px -15px 40px color-mix(in oklab, ${o.color} 40%, black), 0 20px 60px color-mix(in oklab, ${o.color} 35%, transparent), 0 0 80px color-mix(in oklab, ${o.color} 25%, transparent)`,
            opacity: 0.55 + o.depth * 0.35,
          }}
          animate={{
            x: [0, 60 * o.depth, -40 * o.depth, 30 * o.depth, 0],
            y: [0, -70 * o.depth, 40 * o.depth, -20 * o.depth, 0],
            z: [0, 80, -60, 40, 0],
            rotateX: [0, 25, -15, 10, 0],
            rotateY: [0, -30, 20, -10, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{
            duration: o.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              top: "12%",
              left: "20%",
              width: "30%",
              height: "25%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.6), transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
