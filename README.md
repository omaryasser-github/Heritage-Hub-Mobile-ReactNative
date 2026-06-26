# Heritage Hub — Project Overview

## What is Heritage Hub?

**Heritage Hub** is a mobile-first, bilingual (Arabic/English) cultural tourism platform dedicated to Egyptian heritage sites. It combines immersive exploration, AI-powered learning, and gamification into a single, unified experience — accessible to all age groups on both iOS and Android.

The platform bridges the gap between tourism and education, enabling users to discover, explore, and learn about Egypt's rich historical landscape in an engaging and interactive way.

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

### 🔍 City & Monument Discovery
- Search Egyptian cities by name with real-time auto-suggestions (FR-8, FR-9)
- Browse and filter monuments by category: history, tombs, statues, wars, culture (FR-10)

### 🌐 360° Panoramic Exploration
- Immersive 360° viewer with rotate, zoom, and navigation capabilities (FR-11, FR-12)
- Hotspot overlays displaying additional content and images on-screen (FR-13)
- Multilingual narration (Arabic & English) triggered on panorama entry (FR-14)
- Adaptive quality tiers (Low / Medium / High) based on detected connection speed

### 📚 Interactive Content
- HD photos, infographics, and maps (FR-15)
- Interactive historical timelines (FR-16)
- Educational videos per monument and city (FR-17)

### 🤖 AI-Powered Features
| Agent | What It Does |
|---|---|
| **Chatbot Agent** | Answers heritage and navigation queries in Arabic/English, grounded via RAG |
| **Quiz Agent** | Generates adaptive-difficulty quizzes per site, pre-generated and cached |
| **Recommendation Agent** | Suggests cities, monuments, and personalized learning paths |
| **Personality Agent** | Classifies users (Explorer, Historian, Strategist, Culture Lover) and generates personal challenges |
| **Awareness Agent** | Delivers cultural, historical, weather, safety, and price awareness per city |
| **Video Agent** | Semantically retrieves and presents relevant educational videos |

### 🏆 Gamification Engine
- XP points, coins, and badges awarded for quiz performance and exploration (FR-44, FR-46)
- Personality-based and awareness-based achievements (FR-47, FR-48)
- Weekly, monthly, and all-time leaderboards (FR-49, FR-50)
- All XP calculations performed **server-side** to prevent manipulation

### 🔐 Security & Reliability
- OAuth 2.0 authentication with social login (Google, Facebook, Apple) and guest access
- AES-256 encryption at rest, HTTPS/TLS for all API communication
- 99.5% uptime SLA with daily data backups
- API rate limiting and abuse prevention at the Gateway level

---

## Development Phases (Summary)

| Phase | Focus |
|---|---|
| **Phase 1 — Foundation** | Auth, profiles, city/monument CRUD, search, database seeds, security baseline |
| **Phase 2 — Immersive Experience** | 360° viewer, hotspots, narration, timelines, videos, adaptive quality |
| **Phase 3 — Gamification Engine** | Quizzes, XP/coins/badges, leaderboards, feedback system |
| **Phase 4 — AI Agent Layer** | All six AI agents, LLM abstraction, response caching |
| **Phase 5 — Polish & Scale** | CDN optimization, push notifications, performance audits, security hardening |

---

> **Platform:** iOS 13+ · Android 9+ · Bilingual AR/EN  
> **Architecture:** Microservices + AI Agent Layer  
> **Security:** OAuth 2.0 · AES-256 · HTTPS/TLS  
> **Uptime Target:** 99.5% SLA · Daily Backups
