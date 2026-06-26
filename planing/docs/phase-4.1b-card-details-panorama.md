# Phase 4.1b: Card Details — Panorama

## Naming & scope

Sub-phase of **[Phase 4.1 — Card Details](./phase-4.1-card-details.md)**. Adds **360° panorama** and hotspots to the monument detail experience.

| Term | Meaning |
|------|---------|
| **Card details** | Parent phase — detail screen from Home card |
| **Card details: Panorama** (this phase) | 360° tab, R3F viewer, hotspots, media sheet |
| **Explore tab** | Bottom nav — **not this phase** → [phase-4.2-explore-tab.md](./phase-4.2-explore-tab.md) |

**Prerequisite:** Phase 4.1 card details (MVP) complete.

**Status:** **Deferred** — do not implement until scheduled.

---

## Overview

Extends `MonumentDetailScreen` with a third tab (**360 Panorama**) and native 3D viewing. History & Culture tabs remain as defined in 4.1.

---

## Folder Structure

```text
src/features/explore/
├── api/
│   └── panoramaService.ts
├── components/
│   ├── 3d/
│   │   ├── PanoramaViewer.tsx
│   │   ├── SphereEnvironment.tsx
│   │   └── HotspotMarker.tsx
│   └── MediaBottomSheet.tsx
└── screens/
    └── PanoramaScreen.tsx          # optional fullscreen; or inline tab content
```

---

## Flow

1. User opens **card details** (Phase 4.1) for a monument.
2. User selects **360 Panorama** tab (added in this sub-phase).
3. App mounts `PanoramaViewer` (React-Three-Fiber).
4. User pans the spherical image; taps `HotspotMarker` → `MediaBottomSheet`.

---

## States

* **Loading:** Texture decompress spinner while panorama loads
* **Error:** WebGL/OOM → fallback static image + `cardDetails.panoramaUnavailable` message
* **Success:** R3F canvas renders smoothly; RN UI overlays correctly

---

## Logic

* **3D Engine:** `@react-three/fiber` + `@react-three/drei`; equirectangular texture on `sphereGeometry` `BackSide`
* **Adaptive quality:** API returns 2K / 4K / 8K; client picks safe size for device
* **Hotspots:** R3F `<mesh>` + `onClick` → bottom sheet state
* **Gestures:** `OrbitControls` must not conflict with native back swipe
* **RTL:** Panorama tab label in i18n (`cardDetails.tabPanorama`); tab bar scrolls horizontally

---

## Components

* **Atoms:** `HotspotMarker` (3D mesh)
* **Molecules:** `MediaBottomSheet`
* **Organisms:** `PanoramaViewer`

---

## API

* `GET /api/monuments/:monumentId/panorama`

```json
{
  "panoramaId": "uuid",
  "textures": {
    "high": "url_8k.jpg",
    "low": "url_2k.jpg"
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

---

## i18n keys (add when implementing)

```text
cardDetails.tabPanorama
cardDetails.panoramaUnavailable
cardDetails.hotspotTitle
```

---

## Testing

### Automated

* Panorama service response parsing
* Hotspot selection state

### Manual

* [ ] OOM test on low-end Android
* [ ] Hotspot hit-box larger than visual icon
* [ ] Gesture conflict with navigation back
* [ ] RTL tab bar with Panorama label

---

## Out of scope

* Explore bottom tab (Phase 4.2)
* Map-based discovery
* Live 360° video streaming
