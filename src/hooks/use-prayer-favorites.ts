import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "marian-prayer-favorites";
const EVENT = "marian-prayer-favorites-change";

function readFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function usePrayerFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
    const sync = () => setFavorites(readFavorites());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    const prev = readFavorites();
    const next = prev.includes(slug)
      ? prev.filter((s) => s !== slug)
      : [...prev, slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setFavorites(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}
