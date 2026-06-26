# Phase 4.2: Explore Tab (Bottom Navigation)

## Naming & scope

This phase owns the **Explore** item in the **bottom tab bar** — currently a placeholder (`MapScreen` / “Explore Screen” text).

| Term | Meaning |
|------|---------|
| **Explore tab** (this phase) | Bottom nav screen for discovery / browse (plan TBD) |
| **Card details** | Tap Home card → monument detail → [phase-4.1-card-details.md](./phase-4.1-card-details.md) |
| **Home** | Feed + search + categories → [phase-4-home.md](./phase-4-home.md) |

**Status:** **Planned** — specification to be provided by product owner. **Not implemented.**

---

## Current state

* `BottomTabNavigator` → tab name `Explore`, route `Explore`, component is a **placeholder**.
* Guests can open this tab (see [Phase 1 — Splash](./phase-1-splash.md) guest matrix).
* i18n: `tabs.explore` (“Explore” / “استكشف”).

---

## What this phase is NOT

* **Not** monument card detail (that is Phase 4.1).
* **Not** 360° panorama (that is [Phase 4.1b](./phase-4.1b-card-details-panorama.md)).
* **Not** the Home feed (Phase 4).

---

## Placeholder until spec is ready

```text
src/features/explore/
└── screens/
    └── ExploreTabScreen.tsx        # replaces MapScreen / PlaceholderScreen
```

**Navigation:** Remains a root tab under `MainTabNavigator`; no change to `MonumentDetail` stack route on `RootStack`.

---

## Open questions (fill when plan is provided)

- [ ] Map view vs list vs hybrid?
- [ ] Filter by city, category, distance?
- [ ] Deep link from notifications?
- [ ] Guest vs authenticated capabilities?
- [ ] Relation to `Egypt-Tourism-landmarks.json` cities/coordinates?

---

## Dependencies

* Phase 4 — Home feed + `landmarksRepository` (shared data)
* Phase 11 — i18n, RTL
* Phase 8 — responsive layout

---

## Out of scope (until defined)

All implementation details deferred until product plan is attached to this document.
