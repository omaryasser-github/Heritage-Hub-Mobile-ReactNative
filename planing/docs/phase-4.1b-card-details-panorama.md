# Phase 4.1b: Card Details — Panorama

## Naming & scope

Sub-phase of **[Phase 4.1 — Card Details](./phase-4.1-card-details.md)**. Adds **360° panorama** and hotspots to the monument detail experience.

| Term | Meaning |
|------|---------|
| **Card details** | Parent phase — detail screen from Home card |
| **Card details: Panorama** (this phase) | 360° entry from card details → **fullscreen** viewer, hotspots, media sheet |
| **Explore tab** | Bottom nav — **not this phase** → [phase-4.2-explore-tab.md](./phase-4.2-explore-tab.md) |

**Prerequisite:** Phase 4.1 card details (MVP) complete.

**Status:** **Ready to implement** — start with bundled spike asset (see [Panorama assets & licensing](#panorama-assets--licensing)).

---

## Overview

Adds a third entry on the card-details tab bar (**360° Panorama**). Tapping it **navigates to a dedicated fullscreen screen** — it does **not** mount a `GLView` inline inside the scrolling `MonumentDetailScreen`.

History & Culture tabs remain as defined in 4.1.

**Why fullscreen (not inline tab content):**

* `GLView` + touch panning must own the gesture surface — no conflict with card-details `ScrollView`, tab bar, or iOS back swipe.
* WebGL context and texture memory are isolated — dispose on screen unmount when user goes back.
* Immersive UX matches the mockup intent (user “enters” the location).

---

## Tech stack (decided)

| Layer | Choice | Notes |
|-------|--------|-------|
| **3D** | `expo-gl` + `expo-three` + `three` | No WebView. No `@react-three/fiber` / `@react-three/drei`. |
| **Textures** | `expo-asset` (bundled) + remote URL later | Local assets avoid CORS / cache issues for seed monuments. |
| **Hotspots** | Manual **raycasting** on touch | No DOM `onClick`; no `CSS2DRenderer` / `CSS3DRenderer`. |
| **Hotspot UI** | RN overlays | `<View>`, `<Text>`, bottom sheet / modal on `selectedHotspot` state. |
| **Camera** | Touch pan (required) + gyro (optional v1.1) | Touch-first; gyro needs permissions and dev-build testing. |

---

## Panorama assets & licensing

### What production needs (target)

| Property | Requirement |
|----------|-------------|
| **Type** | Full **spherical** 360° panorama |
| **Projection** | **Equirectangular** |
| **Aspect ratio** | **2:1** (e.g. 2048×1024, 1536×768) |
| **MVP size** | **≤2K** width — do not bundle 4K/8K on mobile |
| **Use** | Map onto inner sphere (`BackSide`); camera at center |

A **normal wide JPG** (3:2, ~90–120° FOV) is **not** sufficient for production — it will warp, seam badly, and leave empty areas on the sphere. Keep normal photos for card hero / article thumbnails only.

**Reference (correct format, paid license):** [360Cities — Bibliotheca Alexandrina](https://www.360cities.net/image/bibliotheca-alexandrina-egypt) — spherical, 10000×5000 equirectangular. Free **embed** on non-commercial sites only; **app bundling / commercial use requires a license** from 360Cities or the photographer. Do not scrape or download without rights.

### MVP implementation strategy (agreed)

| Phase | Asset | Purpose |
|-------|-------|---------|
| **4.1b spike (now)** | `assets/Home/panorama/bobelatic-alex.png` | Wire `PanoramaScreen`, GL pipeline, touch, raycast, hotspots for **`bibliotheca`** slug |
| **4.1b demo** | Free CC equirectangular (e.g. [Giza 360 on Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Giza_pyramid_complex_-_360.jpg)) | Optional second monument with **legal** full-sphere texture |
| **Production** | Licensed 360Cities pano, official Bibliotheca media, or **shoot your own** ≤2K | Replace spike asset; per-monument rollout |

### Spike asset caveat — `bobelatic-alex.png`

Bundled starter file: **`assets/Home/panorama/bobelatic-alex.png`**

* **Subject:** Bibliotheca Alexandrina interior (on-brand for `bibliotheca` slug).
* **Format today:** Wide-angle **flat photo**, **not** true 2:1 equirectangular — acceptable **only** to validate engineering (viewer mount, navigation, dispose, hotspot plumbing).
* **Known limitations:** Visible warp at poles, no seamless 360° loop, immersion below production bar — **replace before user-facing / store release**.
* **License:** Team-uploaded; confirm rights before public distribution. Treat as **internal dev** until replaced.

### Licensing workarounds (production)

1. **License** from [360Cities](https://www.360cities.net/image/bibliotheca-alexandrina-egypt) (download + app use in writing).
2. **Shoot / commission** 360° capture in Alexandria; export ≤2K equirectangular.
3. **Official outreach** — Bibliotheca Alexandrina / tourism media kit.
4. **Wikimedia Commons** — free CC panoramas for **other** monuments (verify license + attribution); Bibliotheca interior equirectangular is scarce on Commons.
5. **Do not use** — scraping 360Cities tiles, Google Street View tiles, or unlicensed downloads.

### Asset checklist (before bundling any panorama)

- [ ] License allows app bundling / commercial use (if applicable)
- [ ] Equirectangular **2:1** (production assets only)
- [ ] Resized to **≤2048×1024** (or smaller) for mobile bundle
- [ ] Attribution / credit in app if license requires (CC BY, etc.)
- [ ] Seam check at left/right edge in viewer

---

## Folder structure

```text
assets/Home/panorama/                      # bundled panorama textures (≤2K for MVP)
├── bobelatic-alex.png                     # spike — bibliotheca (replace with true equirect later)
└── …                                      # future: giza-2k.jpg, bibliotheca-2k-equirect.jpg

src/features/explore/
├── api/
│   └── panoramaService.ts                 # loads panorama + hotspots via repository / API
├── components/
│   ├── panorama/
│   │   ├── PanoramaViewer.tsx             # GLView + render loop + touch → raycast
│   │   ├── PanoramaScene.ts               # sphere, camera, lights, dispose helpers
│   │   ├── HotspotMeshes.ts               # invisible colliders + optional visual markers
│   │   └── panoramaMath.ts                # pitch/yaw ↔ 3D position, raycast helpers
│   └── MediaBottomSheet.tsx               # RN overlay for hotspot content
└── screens/
    └── PanoramaScreen.tsx                 # fullscreen stack screen (required)
```

**Navigation:** `RootStack` → `Panorama: { slug: string }`. Card-details Panorama tab → `navigation.navigate('Panorama', { slug })`.

**Do not create:** inline panorama tab panel inside `MonumentDetailScreen` scroll content.

---

## Flow

1. User opens **card details** (Phase 4.1) for a monument.
2. User taps **360° Panorama** on the tab bar (visual third tab; may be disabled/hidden if no panorama data).
3. App **pushes `PanoramaScreen`** (fullscreen, native stack).
4. `panoramaService.getBySlug(slug)` loads texture ref + hotspots.
5. **First implementation:** `slug === 'bibliotheca'` uses bundled `assets/Home/panorama/bobelatic-alex.png`.
6. `PanoramaViewer` mounts `GLView`, renders texture on **inner sphere** (`BackSide`), touch pans camera.
7. User taps hotspot (raycast hit) → `setSelectedHotspot` → `MediaBottomSheet`.
8. *(Optional, authenticated)* User taps **Ask the AI Guide** in sheet → pending `HotspotChatContext` stored → navigate to `AI_Guide` → contextual mock bot opener + suggestions.
9. User taps back → pop stack → dispose GL resources → return to card details (previous tab preserved).

---

## States

| State | Behavior |
|-------|----------|
| **Loading** | Spinner while texture decodes; optional low-res placeholder |
| **Error** | WebGL init fail / OOM / missing asset → static fallback image + `cardDetails.panoramaUnavailable` |
| **Success** | Smooth pan; RN hotspot UI overlays correctly |
| **No panorama** | Hide or disable Panorama tab on card details when monument has no panorama record |

---

## 3D logic

### Geometry

* **Equirectangular** source image (2:1 aspect ratio).
* Map onto `SphereGeometry` with **`material.side = BackSide`** (preferred over `scale.x = -1` to avoid raycast winding issues).
* **Segments (adaptive):** start **32×32** MVP; allow **48×48** on capable devices — avoid fixed 64×64 on all phones.

### Camera

* Camera at sphere center; rotation via **yaw / pitch** (spherical coords).
* **Touch pan:** map `PanResponder` / `GLView` touch drag → camera rotation (primary input).
* **Gyro (deferred v1.1):** `DeviceOrientationControls` or equivalent — optional toggle; not required for MVP.

### Textures & memory

* **MVP default: ≤2K** equirectangular (e.g. 2048×1024 or 1536×768). Author/upload 2K or lower — do not bundle 4K/8K for seed data.
* Remote API may expose `low` / `high` later; client picks safe tier — **never default to 8K on mobile**.
* On unmount: cancel `requestAnimationFrame`, dispose `geometry`, `material`, `texture`, remove orientation listeners.

### Hotspots

* Authoring: **pitch + yaw** (degrees) per hotspot — see API schema below.
* At load: convert pitch/yaw → position on sphere → place small **invisible collider mesh** (larger than visual marker).
* **Raycast on `touchEnd`** (not every `touchMove`).
* Normalize touch to clip space **using `onLayout` width/height**, not `drawingBufferWidth/Height` — see [Stack Overflow: raycast touch coords in expo-gl](https://stackoverflow.com/questions/79472319/detect-when-object-is-touched-inside-pure-three-js-scene).
* On hit: update React state; render **RN** bottom sheet — never render text inside WebGL.

#### Hotspot → AI Guide (contextual chat)

Bridge from panorama exploration to the existing **AI Guide** tab (`ChatbotScreen`). User reads a hotspot in `MediaBottomSheet`, then can ask for deeper details without re-explaining where they are.

**Placement:** Secondary CTA **below hotspot body text** in `MediaBottomSheet` — not inside the chat input, not on the panorama chip bar alone.

**Suggested UI:**

* Outline / gold-accent pill or row: **“Ask the AI Guide”** + existing AI tab icon.
* Optional subtext: *“Get more details about [hotspot title]”*
* Visually secondary to sheet content; clearly tappable; accessible label e.g. *“Ask AI Guide about Reading Hall”*.

**Auth (gate at tap, not only at tab):**

| User | Behavior |
|------|----------|
| **Guest** (`useAuthStore.isGuest`) | Do **not** navigate blindly to `AI_Guide` (user would hit `GuestGateScreen` and lose hotspot context). Show sign-in prompt / reuse guest gate: *“Sign in to ask the guide about this spot.”* |
| **Authenticated** | Close sheet → navigate to AI Guide with hotspot context |

**Navigation:** `PanoramaScreen` is on **root stack**; chatbot is **`MainTabNavigator` → `AI_Guide`**. Use nested navigation, e.g. `navigation.navigate('MainTabNavigator', { screen: 'AI_Guide' })`.

**Context passing (recommended):** Store pending context in **`useChatbotStore`** (or a small dedicated store) before navigating — do not rely on route params alone through `GuestGatedScreen` wrappers.

```ts
interface HotspotChatContext {
  hotspotId: string;
  hotspotTitle: string;
  monumentSlug: string;
  monumentName: string;
  summary: string;   // sheet content (localized)
  locale: string;
}
```

`ChatbotScreen` reads and **clears** pending context on mount / focus.

**Chatbot behavior on arrival (v1 mock — no real LLM yet):**

1. Close `MediaBottomSheet`.
2. Switch to `AI_Guide` tab.
3. Auto-append a **bot opener**, e.g. *“You’re viewing **[Reading Hall]** at Bibliotheca Alexandrina. Here’s more…”*
4. Append extended mock copy (`summary` + optional seed `extendedContent` per hotspot later).
5. Replace generic suggestion pills with hotspot-specific ones, e.g. *“Who built this?”*, *“What should I look for here?”*, *“How does this connect to the monument?”*
6. User can then type any follow-up; `chatService` continues mock replies until backend exists.

**Chat history policy (v1):** Append contextual messages to existing thread; do **not** wipe chat on every hotspot unless user taps reset.

**`chatService` contract (future-ready):** Extend `ChatRequestPayload` with optional `hotspotContext` / `monumentSlug` / `hotspotId`. MVP: return mock text keyed off context when present.

**i18n (add with feature):**

```text
cardDetails.askAiGuide
cardDetails.askAiGuideSubtitle        # optional — “Get more details about {{title}}”
cardDetails.askAiGuideGuestPrompt     # sign-in required
chatbot.hotspotOpener                 # “You’re viewing {{hotspot}} at {{monument}}…”
chatbot.hotspotFollowUp1 …            # contextual suggestion pills
```

**Out of scope for this sub-feature:** real LLM integration, return-to-exact panorama yaw, inline chat inside panorama fullscreen.

**Touch points (implementation checklist):**

* `MediaBottomSheet` — CTA + guest vs authenticated branch
* `authNavigation` — helper e.g. `navigateToAiGuideTab(navigation)`
* `useChatbotStore` — `pendingHotspotContext` + set/clear
* `ChatbotScreen` — consume context on focus; seed opener + suggestions
* `chatService` — mock reply when `hotspotContext` present
* EN + AR locale strings

### Gestures & navigation

* Fullscreen `PanoramaScreen` owns all pan gestures.
* Stack back button / swipe-back returns to card details — no `OrbitControls` conflict with parent scroll.
* Consider `gestureEnabled: true` on stack with explicit close control in panorama UI.

---

## Components

| Level | Component |
|-------|-----------|
| **Atoms** | Hotspot collider mesh helpers |
| **Molecules** | `MediaBottomSheet` (+ Ask AI Guide CTA), panorama loading / error fallback |
| **Organisms** | `PanoramaViewer`, `PanoramaScreen` |

---

## Data

### Repository / service

* `panoramaService.getBySlug(slug)` — same pattern as `monumentService`; no direct JSON import in components.
* Seed panoramas in landmarks JSON or dedicated panorama manifest (TBD at implementation).
* **First seed:** `slug: bibliotheca` → local asset `assets/Home/panorama/bobelatic-alex.png` (spike texture ref in repository).

### API (target)

* `GET /api/monuments/:slug/panorama?lang=`

```json
{
  "panoramaId": "uuid",
  "textures": {
    "low": "url_2k.jpg",
    "high": "url_4k.jpg"
  },
  "hotspots": [
    {
      "id": "h1",
      "pitch": 14.2,
      "yaw": -45.1,
      "title_en": "…",
      "title_ar": "…",
      "content_en": "…",
      "content_ar": "…"
    }
  ]
}
```

### Coordinate contract (document before implementation)

| Field | Convention (proposed) |
|-------|------------------------|
| **yaw** | Horizontal angle, degrees; 0 = forward/default view center; positive = right |
| **pitch** | Vertical angle, degrees; positive = up |
| **Range** | pitch ∈ [-90, 90]; yaw unbounded or normalized to [-180, 180] |

Content authors and backend must use the same convention as `panoramaMath.ts`.

---

## Card details UI change (4.1b)

* Add third tab label **360° Panorama** to `DetailTabBar` (or equivalent entry control).
* Tab tap → **navigate** to `PanoramaScreen`, not swap inline content.
* Tab may appear visually in mockup with Panorama icon; behavior is **navigation**, not in-place panel.
* i18n: `cardDetails.tabPanorama`.

---

## i18n keys (add when implementing)

```text
cardDetails.tabPanorama
cardDetails.panoramaUnavailable
cardDetails.panoramaLoading
cardDetails.hotspotTitle
cardDetails.panoramaBack
cardDetails.askAiGuide
cardDetails.askAiGuideSubtitle
cardDetails.askAiGuideGuestPrompt
chatbot.hotspotOpener
chatbot.hotspotFollowUp1
chatbot.hotspotFollowUp2
chatbot.hotspotFollowUp3
```

---

## Testing

### Automated

* `panoramaService` response parsing
* `panoramaMath` pitch/yaw → position conversion
* Hotspot selection state reducer / hook

### Manual

* [ ] `bibliotheca` loads `bobelatic-alex.png` spike texture
* [ ] Panorama tab → fullscreen push → back returns to card details
* [ ] OOM / low-memory test on low-end Android (2K texture)
* [ ] Hotspot collider larger than visual marker
* [ ] Raycast accurate after rotation (layout-based normalization)
* [ ] GL dispose on unmount (no memory leak after 5+ open/close cycles)
* [ ] WebGL unavailable → fallback UI
* [ ] RTL tab label + hotspot sheet text
* [ ] Monument without panorama → tab hidden or disabled
* [ ] Hotspot sheet → **Ask AI Guide** (authenticated) → AI tab opens with contextual mock opener
* [ ] Hotspot sheet → **Ask AI Guide** (guest) → sign-in prompt; no lost context after login (optional v1.1)
* [ ] RTL + AR strings for Ask AI Guide CTA and hotspot opener

---

## MVP vs v1.1

| Feature | MVP (4.1b) | v1.1 |
|---------|------------|------|
| Texture | `bobelatic-alex.png` spike → replace with licensed **≤2K equirectangular** | Remote + cache, adaptive tier |
| Monument | `bibliotheca` first | More monuments per licensed / shot assets |
| Input | Touch pan | + gyro toggle |
| Hotspots | Raycast + bottom sheet + **Ask AI Guide** (mock contextual chat) | + nearest-hotspot assist; real LLM with `hotspotContext` |
| Screen | Fullscreen `PanoramaScreen` | Same |
| Engine | expo-gl + expo-three | Same |
| Licensing | Dev spike OK | Production assets licensed or CC with attribution |

---

## Out of scope

* WebView panorama viewer
* `@react-three/fiber` / `@react-three/drei`
* CSS2D / CSS3D renderers
* Inline `GLView` inside card-details scroll
* Explore bottom tab (Phase 4.2)
* Map-based discovery
* Live 360° video streaming
* 8K textures as default on mobile
* Using 360Cities / third-party panoramas without a license
* Shipping `bobelatic-alex.png` as final production texture (spike only)
