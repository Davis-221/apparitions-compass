import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

const ParallaxContext = createContext<MotionValue<number> | null>(null);

interface ParallaxHeroProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "article";
}

export function ParallaxHero({
  children,
  className,
  as: Tag = "div",
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <Tag ref={ref as any} className={cn("relative overflow-hidden", className)}>
      <ParallaxContext.Provider value={scrollYProgress}>
        {children}
      </ParallaxContext.Provider>
    </Tag>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /**
   * Parallax depth. 0 = moves with the scroll. Positive = deeper/slower
   * (lags behind, so it drifts downward relative to the hero as it scrolls
   * out). Negative = foreground/faster.
   */
  depth?: number;
  /** Optional scale range linked to scroll progress. */
  scale?: [number, number];
  /** Maximum vertical offset in pixels at full depth. */
  maxOffset?: number;
}

export function ParallaxLayer({
  children,
  className,
  depth = 0,
  scale,
  maxOffset = 60,
}: ParallaxLayerProps) {
  const progress = useContext(ParallaxContext);
  const reduceMotion = useReducedMotion();

  if (!progress) {
    throw new Error("ParallaxLayer must be used inside a ParallaxHero");
  }

  const y = useTransform(progress, [0, 1], [0, depth * maxOffset]);
  const scaleValue = scale ? useTransform(progress, [0, 1], scale) : undefined;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      data-parallax-layer={depth}
      style={{
        y,
        scale: scaleValue,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      // Keep transform-only for GPU compositing
      initial={false}
    >
      {children}
    </motion.div>
  );

}
