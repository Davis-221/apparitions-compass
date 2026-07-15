## Marian Apparitions — Mobile Web App (PWA)

A mobile-optimized, installable web app cataloging Marian apparitions across the world, from Church-approved to those under investigation. Note: this will be a mobile PWA (not native iOS/Android), styled and laid out like a native mobile app and installable to the home screen.

### Design direction

- Reverent, editorial feel: cream/parchment backgrounds, deep Marian blue primary, muted gold accents, soft rose highlight.
- Serif display font (e.g. Cormorant Garamond) for titles paired with a clean sans (Inter) for body.
- Mobile-first: fixed bottom tab bar (Browse · Map · Prayers · Saved), sticky top header with search.

### Core features

1. **Browse & filter**
   - Vertical card list of all apparitions with thumbnail, title, location, year, and status badge.
   - Filter chips: All · Approved · Worthy of Belief · Under Investigation · Not Approved.
   - Search by name, place, or seer.
2. **Detail pages** (`/apparition/$slug`)
   - Hero image, title (Our Lady of …), location + dates, seers, Church status with explanation.
   - Sections: Historical account, key messages, apparition dates, pilgrimage site info, further reading.
   - Actions: Save to favorites, view on map, share.
3. **World map view**
   - Interactive map with pins for every apparition, colored by status.
   - Tap pin → mini card → open detail. Uses Google Maps Platform (managed connector — 1-click, no key setup).
4. **Favorites & prayers**
   - Save apparitions locally (localStorage) — no login required.
   - Prayers library: Hail Mary, Memorare, Angelus, Rosary (5 mysteries), Salve Regina, Prayer to Our Lady of Guadalupe, Fatima Prayer, plus prayers tied to individual apparitions.
5. **PWA installability**
   - Manifest, icons, theme color, `display: standalone` so users can add to home screen and launch like a native app.

### Content — curated list of apparitions

Compiled from standard Catholic sources (USCCB, Miravalle's Meet Your Mother, Vatican records). Includes Church status per current Vatican/local-ordinary rulings.

Approved / Worthy of belief:
- Guadalupe (Mexico, 1531), Laus (France, 1664), Paris — Rue du Bac / Miraculous Medal (1830), La Salette (1846), Lourdes (1858), Filippsdorf (1866), Pontmain (1871), Gietrzwałd (1877), Knock (Ireland, 1879), Fatima (Portugal, 1917), Beauraing (Belgium, 1932), Banneux (Belgium, 1933), Amsterdam — Lady of All Nations (1945), L'Île-Bouchard (1947), Syracuse — weeping Madonna (1953), Akita (Japan, 1973), Betania (Venezuela, 1976), Kibeho (Rwanda, 1981), San Nicolás (Argentina, 1983), Cuapa (Nicaragua, 1980), Zeitoun (Egypt, 1968).

Under investigation / not yet approved:
- Medjugorje (Bosnia, 1981 – recent nihil obstat 2024), Garabandal (Spain, 1961), Naju (Korea), Anguera (Brazil), Litmanová (Slovakia).

Not approved / condemned (included with clear labeling for completeness):
- Bayside (NY), Necedah (WI).

### Technical details

- **Stack**: TanStack Start (existing), Tailwind + shadcn, Google Maps Platform managed connector for the map.
- **Routes**:
  - `/` — Browse/list (home)
  - `/map` — World map
  - `/prayers` — Prayer library (+ `/prayers/$slug`)
  - `/saved` — Favorites
  - `/apparition/$slug` — Detail page
- **Data**: Static TypeScript module `src/data/apparitions.ts` with typed records (name, slug, location, coords, dates, seers, status, summary, messages, image). No backend needed.
- **Images**: Generate atmospheric hero images (statues, sanctuaries, sky/light motifs) per apparition via imagegen; store via Lovable Assets.
- **Favorites**: `localStorage` with a small `useFavorites` hook.
- **PWA**: `public/manifest.webmanifest`, apple-touch-icon, theme-color meta in `__root.tsx`. Manifest-only (no offline SW) per PWA skill guidance — user asked for app feel, not offline.
- **SEO/head**: Distinct `head()` per route; detail routes derive title/description/og:image from the apparition record.

### Out of scope

- Native iOS/Android builds (would require Capacitor + separate tooling).
- Accounts, sync, comments, or community features.
- Full multilingual content (English only for v1).
