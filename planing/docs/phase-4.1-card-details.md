# Phase 4.1: Card Details (Monument Detail)

## Naming & scope

This phase is **card details** — the screen opened when a user taps a `MonumentCard` on the **Home** feed.

| Term | Meaning |
|------|---------|
| **Card details** (this phase) | Single-monument detail: header, tabs, articles |
| **Explore tab** | Bottom navigation tab — **separate phase** → [phase-4.2-explore-tab.md](./phase-4.2-explore-tab.md) |
| **Panorama** | 360° on card details — **sub-phase** → [phase-4.1b-card-details-panorama.md](./phase-4.1b-card-details-panorama.md) |

**Related phases:** [Phase 4 — Home](./phase-4-home.md) (feed + cards) · [Phase 4.2 — Explore tab](./phase-4.2-explore-tab.md) (placeholder today)

---

## Overview

| Stage | Doc | Scope | Status |
|-------|-----|--------|--------|
| **4.1 — Card details (MVP)** | This file | `MonumentDetailScreen`, 2 tabs (History & Architecture, Culture), articles, assets | **Implement now** |
| **4.1b — Card details: Panorama** | [phase-4.1b-card-details-panorama.md](./phase-4.1b-card-details-panorama.md) | 360°, hotspots, R3F | **Deferred** |

**Out of scope for 4.1:** pagination, panorama/3D, **Explore bottom tab** (Phase 4.2).

---

## Data: Single Source of Truth

All landmark content flows from one dataset aligned with backend Prisma seeding.

### File layout

```text
planing/req-analysis/Egypt-Tourism-landmarks.json   # authoring copy (v2.1+; keep in sync)
src/core/data/
├── egypt-tourism-landmarks.json                    # app bundle (same schema as backend seed)
├── types.ts                                        # Category, City, Monument, MonumentArticle, …
├── landmarksRepository.ts                          # only module that reads/parses JSON
└── index.ts                                        # public exports

src/features/explore/api/                           # feature folder name may stay; routes ≠ Explore tab
├── exploreService.ts                               # Home feed, search, filters → uses repository
└── monumentService.ts                              # Card detail by slug → uses repository
```

**Rules**

* Components and screens **never** import JSON directly.
* `landmarksRepository` exposes: `getCategories()`, `getCities()`, `getMonuments()`, `getMonumentBySlug(slug)`, `getFeed({ category?, search? })`.
* When the API is ready, swap repository implementation; keep the same TypeScript interfaces.
* **No pagination** in 4.1 — full filtered list (~71 monuments). Pagination added later.

### Schema (v2.1) — articles per monument

Monuments keep `description_en` / `description_ar` as short summary for cards. **Tab content** comes from `articles.history[]` and `articles.culture[]`.

Sample monuments with articles: `abu-simbel`, `bibliotheca`, `giza-pyramids`.

**Empty state:** If a monument has no articles for a tab, show i18n empty message (do not silently duplicate `description_*`).

---

## Assets

> Folder `assets/Home/explore/` holds **card-detail** visuals (legacy path; not the Explore tab).

```text
assets/Home/explore/
├── exploreBackground.png      # Full-screen card-detail background (ImageBackground + scrim)
├── exploreHistory&Arch.png    # Tab hero — History & Architecture
└── exploreCulture.png         # Tab hero — Culture
```

* Feed thumbnails: `thumbnail_url` in data or category placeholder.
* **Recommendation:** Rename `exploreHistory&Arch.png` → `exploreHistoryArch.png` before implementation.

---

## Folder Structure

```text
src/
├── core/data/                    # see above
└── features/explore/
    ├── api/
    │   ├── exploreService.ts
    │   └── monumentService.ts
    ├── components/
    │   ├── MonumentHeader.tsx
    │   ├── ArticleCard.tsx
    │   ├── DetailTabBar.tsx
    │   └── CategoryIcon.tsx
    └── screens/
        └── MonumentDetailScreen.tsx
```

**Navigation:** `RootStack` → `MonumentDetail: { slug: string }`. Home `MonumentCard` `onPress` → navigate with `slug`.

**Do not create in 4.1:** panorama folders — see [4.1b](./phase-4.1b-card-details-panorama.md).

---

## Flow

1. User taps a `MonumentCard` on the Home feed (Phase 4).
2. App navigates to `MonumentDetailScreen` with `slug`.
3. `monumentService.getBySlug(slug)` loads monument, city, governorate, `articles`.
4. `exploreBackground.png` + scrim; scrollable content.
5. `MonumentHeader`: name, location, rating/entry fee/hours, favorite.
6. **Two tabs:** History & Architecture | Culture (`cardDetails.tabHistory`, `cardDetails.tabCulture`).
7. Active tab: hero image + `ArticleCard` list from JSON articles.
8. **Ionicons** beside titles and metadata rows.
9. Optional quiz CTA stub (Gamification).
10. Guest favorite → `GuestGateScreen`.

---

## States

| State | Behavior |
|-------|----------|
| **Loading** | Skeleton header + article placeholders |
| **Error** | Not found / load failure + back |
| **Empty tab** | No articles for section |
| **Success** | Header + tabs + articles; RTL tab bar scrolls |

---

## Logic

* **Locale:** `name_*`, `title_*`, `body_*` from JSON by `i18n.language`.
* **Icons:** `@expo/vector-icons` (Ionicons); `CategoryIcon` maps `category_slugs[0]`.
* **RTL:** Horizontal `ScrollView` on `DetailTabBar`.
* **Favorites:** Optimistic toggle; guests gated.
* **Home filters:** Same repository — category mapping below.

### Home category pill → data filter

| Home pill | Filter rule |
|-----------|-------------|
| Popular | `tags` includes `must-visit` or `iconic` |
| Recommended | Editorial tag or curated slug list |
| Cities | Filter/group by `city_slug` |
| Museums | `category_slugs` contains `museum` |
| Temples | `category_slugs` contains `temple` |

---

## Components

* **Atoms:** `LocationBadge`, `CategoryIcon`
* **Molecules:** `ArticleCard`, `DetailTabButton`
* **Organisms:** `MonumentHeader`, `DetailTabBar`, `MonumentDetailScreen`

---

## API (target — mock via repository in 4.1)

* `GET /api/monuments/:slug?lang=` — detail + articles
* `GET /api/explore/feed?category=&q=&lang=` — Home feed (Phase 4)

---

## i18n keys (UI chrome only)

```text
cardDetails.tabHistory
cardDetails.tabCulture
cardDetails.emptyHistory
cardDetails.emptyCulture
cardDetails.notFound
cardDetails.entryFee
cardDetails.openingHours
```

Monument and article text come from JSON. Bottom tab label remains `tabs.explore` (Phase 4.2).

---

## Gaps & checklist

| Item | Current state | Action |
|------|---------------|--------|
| Articles in JSON | v2.1 — 3 sample monuments | Seed more incrementally |
| `thumbnail_url` | Mostly empty | Category placeholders |
| `rating` | Often `null` | Hide when null |
| Home feed | Mock templates | `landmarksRepository` |
| Card navigation | `console.log` | Wire `MonumentDetail` + `slug` |
| Explore tab | Placeholder | **Phase 4.2** — not this phase |
| Panorama | — | **Phase 4.1b** |
| Pagination | — | Deferred |

---

## Testing

### Automated

* `landmarksRepository.test.ts`
* `ArticleCard.test.tsx`
* `MonumentDetailScreen.test.tsx`

### Manual

* [ ] Card tap → correct monument (EN + AR)
* [ ] Background + scrim readable
* [ ] Both tabs show articles; empty tab handled
* [ ] Ionicons + RTL tabs
* [ ] Guest favorite gated
* [ ] Back returns to Home

---

## Out of scope

* **Explore bottom tab** → [Phase 4.2](./phase-4.2-explore-tab.md)
* **Panorama** → [Phase 4.1b](./phase-4.1b-card-details-panorama.md)
* Pagination, backend deployment, article CMS
