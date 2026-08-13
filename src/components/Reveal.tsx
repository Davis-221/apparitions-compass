import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in ms. */
  delay?: number;
  className?: string;
}

/**
 * Reveals its children with a soft rise + blur when scrolled into view.
 * Uses IntersectionObserver + GPU-only transforms. Respects reduced motion
 * via CSS (.card-reveal animation is disabled there).
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    // Safety net: never leave content hidden (odd scroll containers, no scroll)
    const t = window.setTimeout(() => setShown(true), 1400);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);


  return (
    <div
      ref={ref}
      className={cn(shown ? "card-reveal" : "opacity-0", className)}
      style={shown ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
