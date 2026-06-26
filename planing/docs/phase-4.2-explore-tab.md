# Phase 4.2: Explore Tab (Bottom Navigation)

## Naming & scope

This phase owns the **Explore** item in the **bottom tab bar** — replaces the current placeholder screen with a **map-based heritage discovery** experience.

| Term | Meaning |
|------|---------|
| **Explore tab** (this phase) | Stylized Egypt map + governorate pins + search + preview card |
| **Card details** | Tap **View Details** → `MonumentDetail` → [phase-4.1-card-details.md](./phase-4.1-card-details.md) |
| **Home** | Curated feed + category pills + grid → [phase-4-home.md](./phase-4-home.md) |

**Prerequisite:** Phase 4 — Home feed + `landmarksRepository` (shared data).

**Status:** **Ready to implement** — product flow agreed; UI reference: `assets/Home/explore/explore-search.png`.

---

## Overview

Explore shows a **stylized map of Egypt** as the background. Instead of plotting every landmark (71 pins), the map displays **location icons for main governorates** where heritage sites exist in the dataset.

The primary interaction is **search by name**: the user types a heritage site, picks a match from a compact results list, the relevant **governorate pin highlights** on the map, and a **compact preview card** appears with the site name and a **View Details** button.

**Product positioning (vs Home):**

| | **Home** | **Explore** |
|---|----------|-------------|
| Purpose | Curated discovery | Geographic search |
| Layout | 2-column card grid | Map + search + preview |
| Categories | Editorial pills (Recommended, Popular…) | Governorate map markers |
| User mindset | “What’s featured?” | “Where is this site in Egypt?” |

**Why not a real map SDK (v1):** Bundled illustrated map (`egypt-map.jpg`) + calibrated pin positions — offline-friendly, on-brand, faster than Google Maps / Mapbox integration.

---

## Design assets

| Asset | Path | Use |
|-------|------|-----|
| **UI mockup** | `assets/Home/explore/explore-search.png` | Layout reference — search bar, map pins, bottom preview card |
| **Map background** | `assets/Home/explore/egypt-map.jpg` | Full-screen stylized Egypt map (portrait-oriented artwork) |

**Note:** The mockup shows ~6 regional pins and a rich preview card. Implementation uses **13 governorate hubs** (see [Governorate pins](#governorate-pins)) and a **compact preview card** for v1 (name, location, optional thumbnail, View Details).

---

## Explore screen flow

1. User opens the **Explore** tab from bottom navigation.
2. Screen shows `egypt-map.jpg` with **governorate location icons** (default: all visible, none highlighted).
3. **Search bar** at top — placeholder e.g. *“Search for a place…”*.
4. User types a heritage site name → **live-filtered results list** appears in a small panel **below the search bar** (max ~3–5 visible rows, scrollable).
5. User **selects a result** from the list:
   * Matching governorate icon on the map **highlights** (pulse / glow / scale — others may dim slightly).
   * **Compact preview card** appears (bottom of screen, above tab bar) with site name, city/governorate, optional thumbnail, **View Details** button.
6. User taps **View Details** → navigates to **`MonumentDetail`** on root stack with `{ slug }` (same route as Home cards).
7. User taps **clear (×)** on search or dismisses selection → results list hides, governorate highlight clears, preview card closes.

### Optional v1.1 — tap governorate pin (browse without search)

* Tap a governorate icon → small sheet or list: *“N heritage sites in [Governorate]”* with monument names; selecting one opens the same preview card flow.
* Not required for MVP if search path is complete.

---

## Governorate pins

Derive pins from `egypt-tourism-landmarks.json`: group monuments by city → `governorate` field. **13 governorates** currently have at least one monument:

| Governorate | Monument count (seed data) |
|-------------|---------------------------|
| Cairo | 17 |
| Luxor | 9 |
| Aswan | 8 |
| Alexandria | 7 |
| Giza | 7 |
| South Sinai | 6 |
| Red Sea | 5 |
| Fayoum | 4 |
| Matrouh | 3 |
| New Valley | 2 |
| Qena | 1 |
| Ismailia | 1 |
| Sohag | 1 |

**Pin rules:**

* **One icon per governorate** on the map (not per monument).
* Selecting different monuments in the same governorate (e.g. Cairo) reuses the same pin — only the preview card content changes.
* Governorates with a single site (Qena, Sohag, Ismailia) still get a pin so those sites have a map anchor when selected via search.
* Pin **label** (tooltip or accessibility): governorate name (localized via `governorate` / `governorate_ar` on city records).

**Pin positioning:** The map is **illustrated**, not GIS-accurate. Do **not** rely on raw lat/lng alone.

* Store calibrated **`x` / `y` as % of map width/height** per governorate in a small config (e.g. `exploreMapPins.ts` or JSON).
* Tune anchor points on device (Alexandria, Cairo, Luxor, Aswan, Siwa/New Valley, South Sinai, Red Sea coast).
* Monument `latitude` / `longitude` remain useful for future real-map phase, not for v1 art-map placement.

---

## Search behavior

* **Live filter** while typing (no submit button required).
* Reuse existing `landmarksRepository.getFeed({ search })` / `matchesSearch` haystack: monument name (EN/AR), slug, city, governorate, tags.
* Results list shows: monument name + city (and optionally category).
* **Empty query:** hide results list; map shows default governorate pins only.
* **No matches:** show `explore.noResults` empty message in the results panel area.
* Optional polish: result count — *“4 places found”*.
* **Keyboard:** use `KeyboardAvoidingView` or equivalent so results are not hidden under the keyboard.
* **RTL:** search field and results list respect Arabic layout; map artwork does not mirror.

---

## Compact preview card

Shown after the user selects a search result (and governorate pin highlights).

**MVP content:**

* Heritage site **name** (localized).
* **Subtitle:** `City, Governorate` (e.g. “Giza, Cairo”).
* **Optional:** small thumbnail (`resolveImage` / monument card image).
* **Primary CTA:** **View Details** → `navigation.navigate('MonumentDetail', { slug })`.

**Defer v1:** full description, tag pills, favorite heart on preview card (favorites remain on detail / Home).

**Optional polish:** small **360° badge** when `panoramaService.hasPanorama(slug)` (ties to [Phase 4.1b](./phase-4.1b-card-details-panorama.md)).

**Layout:** Bottom floating card or sheet above tab bar — must not cover the entire map. Reference: lower card in `explore-search.png`.

---

## States

| State | Behavior |
|-------|----------|
| **Idle** | Map + all governorate pins; search empty; no preview card |
| **Searching** | Results list visible below search bar; map unchanged until selection |
| **Selected** | One governorate pin highlighted; preview card visible |
| **Empty results** | No list items; empty message; no highlight |
| **Loading** | Not required for v1 (local JSON); optional skeleton if remote feed added later |
| **Error** | Not required for v1 (bundled data) |

---

## Auth & guests

* **Explore tab:** open to **guests and authenticated users** (same as current placeholder).
* **Favorites:** not on preview card in v1; if added later, reuse guest gate from Home.

---

## Tech approach (decided)

| Layer | Choice | Notes |
|-------|--------|-------|
| **Map** | Static `Image` + absolute-positioned pin `Pressable`s | No `react-native-maps` in v1 |
| **Data** | `landmarksRepository` + `exploreService` | Same monuments/cities as Home |
| **Search** | Local filter via existing `matchesSearch` | No new API |
| **Navigation** | Tab → `ExploreTabScreen`; details → root `MonumentDetail` | Unchanged stack contract |
| **Pins** | ~13 governorate markers | Calibrated % positions on artwork |

---

## Folder structure (target)

```text
assets/Home/explore/
├── egypt-map.jpg                    # map background
└── explore-search.png               # UI mockup reference

src/features/explore/
├── api/
│   └── exploreService.ts            # extend if needed (e.g. search all monuments)
├── components/
│   ├── SearchBar.tsx                # reuse or ExploreSearchBar variant
│   ├── ExploreMap.tsx               # map image + governorate pins
│   ├── ExploreSearchResults.tsx     # dropdown list under search
│   └── ExplorePreviewCard.tsx       # compact card + View Details
├── data/
│   └── exploreMapPins.ts            # governorate → { x%, y%, slug key }
└── screens/
    └── ExploreTabScreen.tsx         # replaces ExploreTabPlaceholder
```

**Navigation:** `BottomTabNavigator` → `Explore` tab → `ExploreTabScreen`. No change to `MonumentDetail` on `RootStack`.

---

## Components

| Level | Component |
|-------|-----------|
| **Atoms** | Governorate pin marker, highlight ring |
| **Molecules** | `ExploreSearchResults`, `ExplorePreviewCard` |
| **Organisms** | `ExploreMap`, `ExploreTabScreen` |

---

## i18n keys (add when implementing)

```text
explore.title
explore.searchPlaceholder
explore.noResults
explore.resultsCount              # "{{count}} places found"
explore.viewDetails
explore.sitesInGovernorate        # optional v1.1 — "{{count}} sites in {{governorate}}"
```

Existing: `tabs.explore` (tab label).

---

## Testing

### Manual

* [ ] Map background fills screen; pins visible for all 13 governorates
* [ ] Typing filters monuments (EN + AR names)
* [ ] Selecting result highlights correct governorate pin
* [ ] Preview card shows correct name and location
* [ ] **View Details** opens `MonumentDetail` for correct `slug`
* [ ] Clear search resets highlight and card
* [ ] Empty search query shows no false empty state
* [ ] RTL: search + results + card text; tab bar safe area
* [ ] Guest can use full Explore flow without sign-in

### Automated (optional)

* `matchesSearch` / feed filter returns expected monuments for query
* Governorate resolution: monument → correct governorate pin id

---

## MVP vs v1.1

| Feature | MVP (4.2) | v1.1 |
|---------|-----------|------|
| Map | Illustrated `egypt-map.jpg` | Optional pinch/pan on map |
| Pins | 13 governorate hubs | Tap pin → monument list sheet |
| Search | Live list below search bar | Recent searches |
| Preview card | Name, location, View Details | Thumbnail, tags, 360° badge, favorite |
| Filter icon | Defer | Category filter bottom sheet |
| Locate me | Defer | GPS or “center on Cairo” |
| Engine | Static image + RN overlays | Real map SDK (separate phase) |

---

## Out of scope

* Google Maps / Mapbox / live map tiles
* **71 individual monument pins** on the map (governorate level only in v1)
* GPS distance / “near me”
* Deep links from notifications
* New backend search API
* Monument card detail UI changes (Phase 4.1)
* 360° panorama viewer (Phase 4.1b)
* Replacing or removing Home search (Home keeps curated browse)

---

## Dependencies

* Phase 4 — `landmarksRepository`, `exploreService`, `MonumentCard` image resolution
* Phase 4.1 — `MonumentDetail` navigation by `slug`
* Phase 4.1b (optional polish) — panorama badge on preview card
* Phase 8 — responsive layout (`useResponsive`)
* Phase 11 — i18n, RTL

---

## Resolved decisions (formerly open questions)

| Question | Decision |
|----------|----------|
| Map vs list vs hybrid? | **Hybrid:** map + search list + preview card |
| Filter by city, category, distance? | **Search only** in MVP; category filter deferred |
| Guest vs authenticated? | **Guests full access** to Explore |
| Relation to landmarks JSON? | Monuments for search; cities/governorates for pins |
| Deep links? | Out of scope v1 |
