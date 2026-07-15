import { Link, useRouterState } from "@tanstack/react-router";
import { MapPin, BookOpen, Heart, List } from "lucide-react";

const tabs = [
  { to: "/", label: "Browse", icon: List },
  { to: "/map", label: "Map", icon: MapPin },
  { to: "/prayers", label: "Prayers", icon: BookOpen },
  { to: "/saved", label: "Saved", icon: Heart },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex h-16 items-center justify-around">
        {tabs.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs transition-colors ${
                active
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
