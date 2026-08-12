import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

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

  return (
    <div ref={ref} className="fixed right-4 top-4 z-50 safe-area-top">
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
        <div className="glass-card absolute right-0 mt-3 w-72 rounded-3xl p-4">
          <p className="font-serif text-lg leading-none">Choose a theme</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Light & dark devotional palettes
          </p>
          <div className="gold-hairline my-3" />

          {[
            { label: "Twilight", items: dark },
            { label: "Daylight", items: light },
          ].map((group) => (
            <div key={group.label} className="mb-2 last:mb-0">
              <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {group.label}
              </p>
              <div className="space-y-1.5">
                {group.items.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setTheme(t.id);
                      setOpen(false);
                    }}
                    aria-pressed={theme === t.id}
                    className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2 text-left transition-colors ${
                      theme === t.id
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
                    {theme === t.id && <Check className="h-4 w-4 shrink-0 text-gold" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
