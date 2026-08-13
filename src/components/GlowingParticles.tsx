import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingParticlesProps {
  count?: number;
  color?: string;
  className?: string;
}

interface Particle {
  id: number;
  size: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  drift: number;
}

/**
 * CSS-only glowing particles. Rendered client-side only to avoid SSR
 * hydration mismatches with random values. Motion is disabled when the
 * user prefers reduced motion.
 */
export function GlowingParticles({
  count = 24,
  color = "var(--glow)",
  className,
}: GlowingParticlesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 1.2, // 1.2–3.7px
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * -20,
      duration: Math.random() * 10 + 16, // 16–26s
      drift: Math.random() * 60 - 30,
    }));
  }, [count]);

  if (!mounted) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => {
        const glow = p.size * 3;
        return (
          <span
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: color,
              boxShadow: `0 0 ${glow}px ${p.size}px ${color}`,
              opacity: 0.7,
              animationName: "particle-rise, particle-twinkle",
              animationDuration: `${p.duration}s, ${p.duration * 0.5}s`,
              animationDelay: `${p.delay}s, ${p.delay * 1.3}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear, ease-in-out",
              animationFillMode: "both",
              // Each particle drifts horizontally while rising
              ["--drift" as string]: `${p.drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}
