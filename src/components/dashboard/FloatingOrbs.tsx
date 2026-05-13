import { motion } from "framer-motion";

type Shape = "round" | "star" | "heart";

const balloons: { shape: Shape; size: number; color: string; x: string; y: string; dur: number; depth: number }[] = [
  { shape: "round", size: 110, color: "#A7D8F5", x: "6%", y: "12%", dur: 14, depth: 1 },
  { shape: "heart", size: 95, color: "#F7B6C2", x: "78%", y: "10%", dur: 18, depth: 0.8 },
  { shape: "star", size: 100, color: "#FFE38A", x: "22%", y: "62%", dur: 20, depth: 0.7 },
  { shape: "round", size: 85, color: "#B8E6C1", x: "82%", y: "68%", dur: 16, depth: 0.6 },
  { shape: "round", size: 70, color: "#D9C2F0", x: "48%", y: "38%", dur: 22, depth: 0.5 },
  { shape: "heart", size: 60, color: "#FFCBA4", x: "36%", y: "18%", dur: 13, depth: 0.45 },
  { shape: "star", size: 65, color: "#A7D8F5", x: "66%", y: "48%", dur: 17, depth: 0.5 },
  { shape: "round", size: 50, color: "#FFE38A", x: "12%", y: "85%", dur: 15, depth: 0.35 },
];

const stars = [
  { top: "18%", left: "10%", delay: 0, dur: 6, color: "#FFE38A" },
  { top: "38%", left: "70%", delay: 2, dur: 7, color: "#A7D8F5" },
  { top: "70%", left: "30%", delay: 4, dur: 8, color: "#F7B6C2" },
  { top: "55%", left: "85%", delay: 1, dur: 9, color: "#D9C2F0" },
];

function BalloonShape({ shape, color }: { shape: Shape; color: string }) {
  if (shape === "round") {
    return (
      <div
        className="w-full h-full rounded-full relative"
        style={{
          background: `radial-gradient(circle at 30% 25%, color-mix(in oklab, ${color} 95%, white), ${color} 55%, color-mix(in oklab, ${color} 60%, black) 100%)`,
          boxShadow: `inset -8px -12px 30px color-mix(in oklab, ${color} 40%, black), 0 25px 50px color-mix(in oklab, ${color} 35%, transparent), 0 0 60px color-mix(in oklab, ${color} 30%, transparent)`,
        }}
      >
        <div className="absolute top-[12%] left-[22%] w-[28%] h-[22%] rounded-full" style={{ background: "radial-gradient(ellipse, rgba(255,255,255,0.7), transparent 70%)", filter: "blur(3px)" }} />
        {/* string */}
        <div className="absolute left-1/2 -bottom-8 w-px h-8" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)" }} />
      </div>
    );
  }
  if (shape === "heart") {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: `drop-shadow(0 20px 40px ${color}66)` }}>
        <defs>
          <radialGradient id={`h-${color}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="40%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <path d="M50 88 C20 65, 5 45, 20 25 C32 10, 48 18, 50 32 C52 18, 68 10, 80 25 C95 45, 80 65, 50 88 Z" fill={`url(#h-${color})`} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: `drop-shadow(0 20px 40px ${color}66)` }}>
      <defs>
        <radialGradient id={`s-${color}`} cx="35%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.9" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor={color} stopOpacity="0.7" />
        </radialGradient>
      </defs>
      <polygon points="50,5 61,38 96,38 68,59 79,92 50,72 21,92 32,59 4,38 39,38" fill={`url(#s-${color})`} />
    </svg>
  );
}

export function FloatingOrbs() {
  return (
    <>
      {/* Sky / cloud background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 800px at 20% 10%, #cfe9ff 0%, transparent 60%), radial-gradient(900px 700px at 85% 30%, #ffe4ec 0%, transparent 55%), radial-gradient(1000px 800px at 50% 100%, #e6f5ea 0%, transparent 60%), linear-gradient(180deg, #eaf4ff 0%, #f5ecff 100%)",
        }}
      />
      {/* Soft clouds */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        {[
          { top: "8%", left: "5%", w: 280 },
          { top: "30%", left: "60%", w: 220 },
          { top: "60%", left: "10%", w: 320 },
          { top: "75%", left: "70%", w: 260 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: c.top,
              left: c.left,
              width: c.w,
              height: c.w * 0.55,
              background: "radial-gradient(ellipse, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%)",
              filter: "blur(8px)",
            }}
            animate={{ x: [0, 30, 0], y: [0, -10, 0] }}
            transition={{ duration: 18 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* 3D Balloons + stars layer */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
      >
        {balloons.map((b, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: b.size,
              height: b.size,
              left: b.x,
              top: b.y,
              transformStyle: "preserve-3d",
              opacity: 0.7 + b.depth * 0.25,
            }}
            animate={{
              x: [0, 40 * b.depth, -25 * b.depth, 20 * b.depth, 0],
              y: [0, -55 * b.depth, 25 * b.depth, -15 * b.depth, 0],
              rotateX: [0, 15, -10, 8, 0],
              rotateY: [0, -20, 15, -8, 0],
              scale: [1, 1.06, 0.95, 1.03, 1],
            }}
            transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
          >
            <BalloonShape shape={b.shape} color={b.color} />
          </motion.div>
        ))}

        {/* Shooting stars with light trails */}
        {stars.map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{ top: s.top, left: s.left }}
            initial={{ x: -50, y: -50, opacity: 0 }}
            animate={{ x: [-50, 300], y: [-50, 200], opacity: [0, 1, 0] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeOut", repeatDelay: 3 }}
          >
            <div
              className="h-0.5 w-32 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${s.color} 70%, white)`,
                boxShadow: `0 0 12px ${s.color}, 0 0 24px ${s.color}80`,
                transform: "rotate(35deg)",
                transformOrigin: "right center",
              }}
            />
          </motion.div>
        ))}

        {/* Floating park equipment - simple 3D doodles */}
        <motion.div
          className="absolute"
          style={{ top: "75%", left: "45%", width: 90, opacity: 0.55 }}
          animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 80" className="w-full">
            {/* slide */}
            <path d="M10 70 Q 30 20 80 25 L 85 70 Z" fill="#F7B6C2" stroke="#d48a99" strokeWidth="1.5" />
            <line x1="80" y1="25" x2="90" y2="20" stroke="#d48a99" strokeWidth="2" />
            <line x1="85" y1="70" x2="95" y2="70" stroke="#d48a99" strokeWidth="2" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute"
          style={{ top: "25%", left: "55%", width: 80, opacity: 0.5 }}
          animate={{ y: [0, -12, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* carousel horse simplified */}
          <svg viewBox="0 0 100 100" className="w-full">
            <circle cx="50" cy="20" r="10" fill="#FFE38A" />
            <rect x="30" y="35" width="45" height="22" rx="6" fill="#A7D8F5" />
            <rect x="35" y="55" width="6" height="20" fill="#d9c2f0" />
            <rect x="60" y="55" width="6" height="20" fill="#d9c2f0" />
            <line x1="50" y1="0" x2="50" y2="80" stroke="#caa86b" strokeWidth="2" />
          </svg>
        </motion.div>
      </div>
    </>
  );
}
