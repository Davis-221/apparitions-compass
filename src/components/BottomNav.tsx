import { Link, useRouterState } from "@tanstack/react-router";
import { MapPin, BookOpen, Heart, Compass } from "lucide-react";

const tabs = [
  { to: "/", label: "Browse", icon: Compass },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/prayers", label: "Prayers", icon: BookOpen },
  { to: "/saved", label: "Saved", icon: Heart },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 safe-area-bottom pointer-events-none">
      <div className="pointer-events-auto mx-auto mb-3 flex max-w-md items-center justify-between gap-1 rounded-full border border-[var(--glass-border)] bg-[color-mix(in_oklab,var(--background)_80%,transparent)] px-2 py-2 backdrop-blur-2xl shadow-[0_20px_60px_-20px_oklch(0_0_0/0.6)]"
           style={{ marginLeft: "0.75rem", marginRight: "0.75rem" }}>
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`group relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-2 py-2 text-[10px] font-medium tracking-wide transition-all ${
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <span
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary), var(--gold))",
                    boxShadow:
                      "0 8px 24px -8px color-mix(in oklab, var(--glow) 70%, transparent), 0 0 0 1px oklch(1 0 0 / 0.15) inset",
                  }}
                />
              )}
              <Icon className={`h-[18px] w-[18px] transition-transform ${active ? "scale-110" : ""}`} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
