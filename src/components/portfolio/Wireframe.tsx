import { motion } from "framer-motion";

/**
 * Premium rotating CAD-wireframe visual.
 * Pure SVG + CSS 3D — no WebGL dependency, ships clean on SSR.
 */
export function Wireframe() {
  return (
    <div className="relative aspect-square w-full max-w-[560px] mx-auto select-none">
      {/* radial halo */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--primary)_30%,transparent),transparent_65%)] blur-2xl" />

      {/* concentric rings */}
      <div
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateX: [55, 55], rotateZ: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Ring size={100} dash="2 6" opacity={0.35} />
          <Ring size={82} dash="4 4" opacity={0.45} />
          <Ring size={64} dash="1 8" opacity={0.55} />
          <Ring size={46} dash="6 2" opacity={0.7} />
        </motion.div>

        {/* counter-rotating wireframe sphere */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <Sphere />
        </motion.div>

        {/* crosshair + ticks */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="line" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.66 0.22 255)" stopOpacity="0.0" />
              <stop offset="50%" stopColor="oklch(0.78 0.16 215)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.66 0.22 255)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* crosshair */}
          <line x1="200" y1="20" x2="200" y2="380" stroke="url(#line)" strokeWidth="0.8" />
          <line x1="20" y1="200" x2="380" y2="200" stroke="url(#line)" strokeWidth="0.8" />
          {/* corner brackets */}
          {[
            [20, 20, 1],
            [380, 20, 1],
            [20, 380, 1],
            [380, 380, 1],
          ].map(([x, y], i) => (
            <g key={i} stroke="oklch(0.78 0.16 215)" strokeWidth="1" fill="none" opacity="0.55">
              <path
                d={`M ${x} ${(y as number) + (y === 20 ? 18 : -18)} L ${x} ${y} L ${
                  (x as number) + (x === 20 ? 18 : -18)
                } ${y}`}
              />
            </g>
          ))}
          {/* dimension labels */}
          <text
            x="200"
            y="14"
            textAnchor="middle"
            fill="oklch(0.78 0.16 215)"
            fontSize="8"
            fontFamily="ui-monospace,monospace"
            opacity="0.7"
          >
            Ø 360.00
          </text>
          <text
            x="6"
            y="204"
            fill="oklch(0.78 0.16 215)"
            fontSize="8"
            fontFamily="ui-monospace,monospace"
            opacity="0.7"
          >
            A
          </text>
          <text
            x="388"
            y="204"
            fill="oklch(0.78 0.16 215)"
            fontSize="8"
            fontFamily="ui-monospace,monospace"
            opacity="0.7"
          >
            A'
          </text>
        </svg>

        {/* center node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-accent animate-pulse-glow shadow-[0_0_24px_4px_color-mix(in_oklab,var(--accent)_60%,transparent)]" />
          </div>
        </div>
      </div>

      {/* part number */}
      <div className="absolute bottom-2 left-2 font-mono text-[10px] tracking-widest text-muted-foreground">
        PART-001 · REV.A
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[10px] tracking-widest text-muted-foreground">
        SCALE 1:1
      </div>
    </div>
  );
}

function Ring({ size, dash, opacity }: { size: number; dash: string; opacity: number }) {
  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ opacity }}>
      <circle
        cx="50"
        cy="50"
        r={size / 2}
        fill="none"
        stroke="oklch(0.78 0.16 215)"
        strokeWidth="0.4"
        strokeDasharray={dash}
      />
    </svg>
  );
}

function Sphere() {
  // wireframe sphere via stacked ellipses
  const lats = 7;
  const longs = 12;
  return (
    <svg viewBox="-100 -100 200 200" className="absolute inset-0 w-full h-full">
      <g fill="none" stroke="oklch(0.66 0.22 255)" strokeWidth="0.4" opacity="0.55">
        {Array.from({ length: lats }).map((_, i) => {
          const t = (i + 1) / (lats + 1);
          const ry = Math.sin(Math.PI * t) * 70;
          const cy = -70 + t * 140;
          return <ellipse key={`lat-${i}`} cx="0" cy={cy} rx={ry} ry={ry * 0.18} />;
        })}
        {Array.from({ length: longs }).map((_, i) => {
          const angle = (i / longs) * 180;
          return (
            <ellipse
              key={`lon-${i}`}
              cx="0"
              cy="0"
              rx="70"
              ry="18"
              transform={`rotate(${angle})`}
            />
          );
        })}
        <circle cx="0" cy="0" r="70" stroke="oklch(0.78 0.16 215)" strokeWidth="0.6" />
      </g>
    </svg>
  );
}
