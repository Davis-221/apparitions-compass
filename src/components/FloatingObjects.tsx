import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Shape = "halo" | "orb" | "star" | "cross" | "petal";

interface FloatingObjectsProps {
  count?: number;
  color?: string;
  className?: string;
  /** Base size in px; each object varies around it. */
  size?: number;
  shapes?: Shape[];
}

interface Floater {
  id: number;
  shape: Shape;
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  spin: number;
  drift: number;
  opacity: number;
}

const DEFAULT_SHAPES: Shape[] = ["halo", "orb", "star", "cross", "petal"];

function Glyph({ shape, color }: { shape: Shape; color: string }) {
  const common = { fill: "none", stroke: color, strokeWidth: 1.2 } as const;
  switch (shape) {
    case "halo":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <circle cx="12" cy="12" r="9" {...common} />
          <circle cx="12" cy="12" r="4.5" {...common} strokeOpacity={0.5} />
        </svg>
      );
    case "orb":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <circle cx="12" cy="12" r="7" fill={color} fillOpacity={0.25} stroke={color} strokeWidth={1} />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path
            d="M12 2.5 13.9 9.4 20.8 11.3 13.9 13.2 12 20.1 10.1 13.2 3.2 11.3 10.1 9.4Z"
            fill={color}
            fillOpacity={0.35}
            stroke={color}
            strokeWidth={0.9}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path d="M12 3v18M6.5 9h11" {...common} strokeLinecap="round" strokeWidth={1.4} />
        </svg>
      );
    case "petal":
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <path
            d="M12 3c4 4.5 4 12 0 18-4-6-4-13.5 0-18Z"
            fill={color}
            fillOpacity={0.2}
            stroke={color}
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <path d="M12 6v13" stroke={color} strokeWidth={0.7} strokeOpacity={0.6} />
        </svg>
      );
  }
}

/**
 * Slow-drifting devotional motifs (halos, orbs, stars, crosses, lilies) that
 * float behind hero content. GPU-only transforms; client-only to avoid SSR
 * hydration mismatch. Disabled under prefers-reduced-motion.
 */
export function FloatingObjects({
  count = 7,
  color = "var(--gold)",
  className,
  size = 34,
  shapes = DEFAULT_SHAPES,
}: FloatingObjectsProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const floaters = useMemo<Floater[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        shape: shapes[Math.floor(Math.random() * shapes.length)]!,
        size: size * (0.6 + Math.random() * 0.9),
        left: Math.random() * 92 + 2,
        top: Math.random() * 84 + 4,
        delay: Math.random() * -18,
        duration: 14 + Math.random() * 12,
        spin: 26 + Math.random() * 26,
        drift: Math.random() * 40 - 20,
        opacity: 0.16 + Math.random() * 0.22,
      })),
    [count, size, shapes],
  );

  if (!mounted) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {floaters.map((f) => (
        <span
          key={f.id}
          className="floater"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: `${f.drift}px`,
          }}
        >
          <span
            className="floater-spin block h-full w-full"
            style={{
              animationDuration: `${f.spin}s`,
              animationDirection: f.id % 2 === 0 ? "normal" : "reverse",
              filter: `drop-shadow(0 0 ${Math.round(f.size / 4)}px ${color})`,
            }}
          >
            <Glyph shape={f.shape} color={color} />
          </span>
        </span>
      ))}
    </div>
  );
}
