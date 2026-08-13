import { useEffect, useRef, useState } from "react";
import { Check, Palette, Sun, Moon } from "lucide-react";
import { useTheme, type ThemeId, type ThemeOption } from "@/hooks/use-theme";

const AUTO_OPTION = {
  id: "auto" as ThemeId,
  name: "Auto",
  tagline: "Matches your device",
  swatch: [
    "oklch(0.22 0.08 265)",
    "oklch(0.975 0.012 240)",
    "oklch(0.55 0.14 250)",
  ],
};

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const dark = themes.filter((t) => t.mode === "dark");
  const light = themes.filter((t) => t.mode === "light");

  const isAuto = theme === "auto";

  return (
    <div ref={ref} className="fixed bottom-24 right-4 z-50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change colour theme"
        aria-expanded={open}
        className="glass-card flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-transform active:scale-95"
      >
        <Palette className="h-5 w-5 text-gold" />
      </button>

      {open && (
        <div className="glass-card absolute bottom-14 right-0 w-72 rounded-3xl p-4">
          <p className="font-serif text-lg leading-none">Choose a theme</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Light & dark devotional palettes
          </p>
          <div className="gold-hairline my-3" />

          <div className="mb-2">
            <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              System
            </p>
            <button
              type="button"
              onClick={() => {
                setTheme("auto");
                setOpen(false);
              }}
              aria-pressed={isAuto}
              className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left transition-colors ${
                isAuto
                  ? "border-gold/60 bg-secondary"
                  : "border-transparent hover:bg-secondary/60"
              }`}
            >
              <span className="flex shrink-0 -space-x-1.5">
                {AUTO_OPTION.swatch.map((c, i) => (
                  <span
                    key={i}
                    className="h-5 w-5 rounded-full border border-border"
                    style={{ background: c }}
                  />
                ))}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">{AUTO_OPTION.name}</span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {AUTO_OPTION.tagline}
                </span>
              </span>
              {isAuto && <Check className="h-4 w-4 shrink-0 text-gold" />}
            </button>
          </div>

          {[
            { label: "Twilight", icon: Moon, items: dark },
            { label: "Daylight", icon: Sun, items: light },
          ].map((group) => (
            <div key={group.label} className="mb-2 last:mb-0">
              <p className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <group.icon className="h-3 w-3" />
                {group.label}
              </p>
              <div className="space-y-1.5">
                {group.items.map((t) => (
                  <ThemeRow
                    key={t.id}
                    t={t}
                    active={theme === t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeRow({ t, active, onClick }: { t: ThemeOption; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left transition-colors ${
        active
          ? "border-gold/60 bg-secondary"
          : "border-transparent hover:bg-secondary/60"
      }`}
    >
      <span className="flex shrink-0 -space-x-1.5">
        {t.swatch.map((c, i) => (
          <span
            key={i}
            className="h-5 w-5 rounded-full border border-border"
            style={{ background: c }}
          />
        ))}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{t.name}</span>
        <span className="block truncate text-[11px] text-muted-foreground">
          {t.tagline}
        </span>
      </span>
      {active && <Check className="h-4 w-4 shrink-0 text-gold" />}
    </button>
  );
}
