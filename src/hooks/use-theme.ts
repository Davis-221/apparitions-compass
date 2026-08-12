import { useCallback, useEffect, useState } from "react";

export type ThemeId = "aurora" | "byzantine" | "emerald" | "dawn" | "linen" | "rosa";

export interface ThemeOption {
  id: ThemeId;
  name: string;
  tagline: string;
  mode: "dark" | "light";
  swatch: [string, string, string];
}

export const THEMES: ThemeOption[] = [
  {
    id: "aurora",
    name: "Marian Aurora",
    tagline: "Night sky blue & starlight",
    mode: "dark",
    swatch: ["oklch(0.22 0.08 265)", "oklch(0.55 0.18 260)", "oklch(0.87 0.10 90)"],
  },
  {
    id: "byzantine",
    name: "Byzantine Gold",
    tagline: "Icon plum & gilded halo",
    mode: "dark",
    swatch: ["oklch(0.19 0.06 320)", "oklch(0.55 0.16 335)", "oklch(0.86 0.13 88)"],
  },
  {
    id: "emerald",
    name: "Tilma Emerald",
    tagline: "Guadalupe green & gold",
    mode: "dark",
    swatch: ["oklch(0.20 0.05 165)", "oklch(0.58 0.14 168)", "oklch(0.86 0.12 88)"],
  },
  {
    id: "dawn",
    name: "Celestial Dawn",
    tagline: "Morning blue & soft gold",
    mode: "light",
    swatch: ["oklch(0.975 0.012 240)", "oklch(0.55 0.14 250)", "oklch(0.72 0.12 85)"],
  },
  {
    id: "linen",
    name: "Lily & Linen",
    tagline: "Parchment, clay & candlelight",
    mode: "light",
    swatch: ["oklch(0.972 0.018 85)", "oklch(0.52 0.10 40)", "oklch(0.66 0.11 60)"],
  },
  {
    id: "rosa",
    name: "Rosa Mystica",
    tagline: "Rose, lavender & pearl",
    mode: "light",
    swatch: ["oklch(0.975 0.012 350)", "oklch(0.58 0.14 340)", "oklch(0.68 0.11 300)"],
  },
];

const STORAGE_KEY = "marian-theme";

export function applyTheme(id: ThemeId) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (id === "aurora") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", id);
  const option = THEMES.find((t) => t.id === id);
  if (option?.mode === "light") {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  } else {
    root.classList.remove("dark");
    root.style.removeProperty("color-scheme");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>("aurora");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (stored && THEMES.some((t) => t.id === stored)) {
      setThemeState(stored);
      applyTheme(stored);
    } else {
      applyTheme("aurora");
    }
  }, []);

  const setTheme = useCallback((id: ThemeId) => {
    setThemeState(id);
    applyTheme(id);
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  return { theme, setTheme, themes: THEMES };
}
