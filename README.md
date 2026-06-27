# Heritage Hub — Project Overview

## What is Heritage Hub?

**Heritage Hub** is a mobile-first, bilingual (Arabic/English) cultural tourism platform dedicated to Egyptian heritage sites. It combines immersive exploration, AI-powered learning, and gamification into a single, unified experience — accessible to all age groups on both iOS and Android.

The platform bridges the gap between tourism and education, enabling users to discover, explore, and learn about Egypt's rich historical landscape in an engaging and interactive way.

---

## Mobile App (React Native + Expo)

The **Heritage Hub Mobile** client is built with **React Native**, **Expo SDK 54**, and **TypeScript**. It supports **iOS 13+**, **Android 9+**, full **RTL Arabic**, and **English**.

### Implemented features (frontend)

| Area | What ships today |
|------|------------------|
| **Onboarding & auth** | Splash, login, sign-up, guest browsing, personality quiz, guest gates on AI Guide & Profile |
| **Home** | Curated monument feed, category filters (Recommended, Popular, Cities, Museums, Temples), search, favorites |
| **Card details** | Monument detail screen: hero image, History & Culture article tabs, entry fee / hours |
| **360° panorama** | Fullscreen viewer (`expo-gl` + `three`), touch pan, hotspot pins, bottom sheet, hotspot chip picker |
| **Hotspot → AI Guide** | From panorama hotspot sheet: authenticated users jump to chatbot with contextual mock opener |
| **Explore tab** | Stylized Egypt map, 13 governorate pins, live search, preview card, View Details |
| **Card imagery** | Per-monument thumbnails (bundled panorama assets + Wikimedia URLs for 71 landmarks) |
| **Chatbot** | AI Guide tab with mock responses (real LLM API planned) |
| **Gamification / Profile** | Screens present; full backend integration planned |

### Key frontend decisions

- **Home vs Explore:** Home is *curated browse*; Explore is *map + search across all monuments*.
- **Panorama:** Fullscreen root screen — not embedded in card-details scroll (gesture + WebGL isolation).
- **No WebView for 360°:** Native `expo-gl` sphere + raycast hotspots.
- **Explore map:** Illustrated `egypt-map.jpg` + calibrated governorate pins — **no Google Maps / Mapbox in v1**.
- **Local seed data:** `src/core/data/egypt-tourism-landmarks.json` (71 monuments, 25 cities) via `landmarksRepository` until REST APIs land.
- **Panorama seed monuments:** Bibliotheca Alexandrina, Abu Simbel, Giza Pyramids, Karnak, Grand Egyptian Museum (GEM).

### Documentation

| Resource | Purpose |
|----------|---------|
| [`FRONTEND_WORKFLOW.md`](./FRONTEND_WORKFLOW.md) | Architecture, navigation, state, testing standards |
| [`planing/docs/`](./planing/docs/) | Per-phase specs (4, 4.1, 4.1b, 4.2, auth, chatbot, …) |
| [`planing/docs/phase-4.1b-card-details-panorama.md`](./planing/docs/phase-4.1b-card-details-panorama.md) | Panorama tech stack, assets, hotspots, AI bridge |
| [`planing/docs/phase-4.2-explore-tab.md`](./planing/docs/phase-4.2-explore-tab.md) | Explore map flow, governorate pins, search UX |

### Run locally

```bash
npm install
npx expo start
```

---

## System Overview

Heritage Hub is built on a **microservices architecture** with a dedicated **AI Agent Layer**, ensuring each system component — content delivery, AI inference, gamification, and user management — scales independently based on demand.

The system is composed of five architectural layers:

| Layer | Responsibility |
|---|---|
| **Client Layer** | React Native mobile app (iOS 13+ / Android 9+), bilingual, full RTL Arabic support |
| **API Gateway** | Single entry point — handles OAuth 2.0, JWT validation, rate limiting, and routing |
| **Core Services** | User, Content, Panorama, and Gamification — each an independent microservice |
| **AI Agent Layer** | Six specialized AI agents (Chatbot, Quiz, Recommendation, Personality, Awareness, Video) |
| **Data Layer** | PostgreSQL (primary), Redis (cache + leaderboard), and a message queue for async AI tasks |

---

## Target Users

Heritage Hub is designed for **all age groups** — from school-aged students to elderly tourists — with a strong focus on:

- **Egyptian cultural tourists** visiting or planning to visit heritage sites
- **Students and educators** seeking interactive historical learning
- **International visitors** requiring bilingual (Arabic/English) content
- **Heritage enthusiasts** interested in deep cultural and historical knowledge

---

## Core Goals

1. Make Egyptian heritage sites accessible, explorable, and educational through mobile technology
2. Provide an immersive 360° experience that simulates visiting a site without being physically present
3. Deliver AI-powered personalized learning paths, quizzes, and awareness content
4. Engage users through a gamification system (XP, coins, badges, leaderboards)
5. Support Arabic as a first-class language, not an afterthought

---

## Key Features

### 🖥️ User Interface (UI)
The UI is a **critical feature** of Heritage Hub. The app is designed to be:
- **Intuitive and accessible** for all age groups, with large readable buttons and icons (NFR-6, NFR-8)
- **Fully bilingual**, switching seamlessly between Arabic (RTL) and English (LTR) layouts
- **Responsive**, supporting both mobile and tablet screen sizes (NFR-15)
- **Fast**, with UI interactions responding within 100ms (NFR-3) and onboarding completing within 60 seconds (NFR-7)

The mobile interface serves as the primary touchpoint for every feature in the system — from the 360° panorama viewer to the AI chatbot and gamification dashboard.

---

### 🔍 Discovery (Home + Explore)

**Home tab (curated)**
- Category filters: Recommended, Popular, Cities, Museums, Temples
- Search within the active feed
- 2-column monument cards with images, location, favorites

**Explore tab (geographic)**
- Stylized map of Egypt with governorate-level markers
- Live search across all seeded monuments (name, city, governorate, tags — EN/AR)
- Select a result → governorate pin highlights → preview card → monument details

*Planned:* API-backed city search with auto-suggestions (FR-8, FR-9), category filters on Explore v1.1

---

### 🌐 360° Panoramic Exploration
- **Fullscreen** immersive viewer with touch pan (expo-gl + three.js inner sphere)
- **Hotspot** raycast selection with localized content sheet and bottom chip picker
- **Ask the AI Guide** from hotspot sheet (authenticated; contextual chat seed)
- **Seed sites:** Bibliotheca, Abu Simbel, Giza Pyramids, Karnak, GEM
- *Target production:* true ≤2K equirectangular 2:1 textures; licensing per `phase-4.1b` doc
- *Planned:* multilingual narration on entry (FR-14), adaptive quality tiers, gyro toggle

---

### 📚 Interactive Content (Card Details)
- Monument detail: hero, History & Culture article tabs (bilingual seed content)
- Entry fee and opening hours where available
- Navigation to fullscreen panorama when a site has panorama data

*Planned:* HD galleries, timelines, embedded videos per monument (FR-15–17)

---

### 🤖 AI-Powered Features
| Agent | What It Does | Mobile status |
|---|---|---|
| **Chatbot Agent** | Answers heritage queries in Arabic/English | ✅ UI + mock replies; panorama hotspot context |
| **Quiz Agent** | Adaptive quizzes per site | 🔶 Game hub screen; full agent TBD |
| **Recommendation Agent** | Personalized paths | Planned |
| **Personality Agent** | User personas | ✅ Onboarding quiz |
| **Awareness Agent** | Cultural / safety awareness | Planned |
| **Video Agent** | Educational video retrieval | Planned |

---

### 🏆 Gamification Engine
- XP points, coins, and badges awarded for quiz performance and exploration (FR-44, FR-46)
- Personality-based and awareness-based achievements (FR-47, FR-48)
- Weekly, monthly, and all-time leaderboards (FR-49, FR-50)
- All XP calculations performed **server-side** to prevent manipulation

---

### 🔐 Security & Reliability
- OAuth 2.0 authentication with social login (Google, Facebook, Apple) and guest access
- AES-256 encryption at rest, HTTPS/TLS for all API communication
- 99.5% uptime SLA with daily data backups
- API rate limiting and abuse prevention at the Gateway level

---

## Development Phases (Summary)

### Backend / platform (roadmap)

| Phase | Focus |
|---|---|
| **Phase 1 — Foundation** | Auth, profiles, city/monument CRUD, search, database seeds, security baseline |
| **Phase 2 — Immersive Experience** | 360° viewer APIs, hotspots, narration, timelines, videos, adaptive quality |
| **Phase 3 — Gamification Engine** | Quizzes, XP/coins/badges, leaderboards, feedback system |
| **Phase 4 — AI Agent Layer** | All six AI agents, LLM abstraction, response caching |
| **Phase 5 — Polish & Scale** | CDN optimization, push notifications, performance audits, security hardening |

### Mobile app (current)

| Phase | Doc | Status |
|---|---|---|
| Splash & guest entry | `phase-1-splash.md` | ✅ |
| Auth | `phase-2-auth.md` | ✅ |
| Personality quiz | `phase-3-personality-quiz.md` | ✅ |
| Home feed | `phase-4-home.md` | ✅ |
| Card details | `phase-4.1-card-details.md` | ✅ |
| Panorama + hotspots + AI bridge | `phase-4.1b-card-details-panorama.md` | ✅ |
| Explore map tab | `phase-4.2-explore-tab.md` | ✅ |
| Profile, settings, chatbot API, game API | `phase-5-*`, `phase-6-*`, `phase-7-*` | 🔶 In progress |

---

> **Platform:** iOS 13+ · Android 9+ · Bilingual AR/EN · React Native + Expo  
> **Architecture:** Microservices + AI Agent Layer (backend) · Feature-sliced mobile client  
> **Security:** OAuth 2.0 · AES-256 · HTTPS/TLS  
> **Uptime Target:** 99.5% SLA · Daily Backups
