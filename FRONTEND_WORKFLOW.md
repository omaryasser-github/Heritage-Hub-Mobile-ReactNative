# Heritage Hub — Frontend Development Workflow

> **Platform:** React Native + Expo  
> **Language:** TypeScript  
> **Supports:** iOS 13+ · Android 9+ · Bilingual (Arabic / English) · RTL

---

## 1. Frontend Overview

The Heritage Hub frontend is a **cross-platform mobile application** built with React Native and Expo. It serves as the primary interface through which users discover Egyptian heritage sites, explore 360° panoramas, interact with AI agents, and engage with the gamification engine.

The frontend is responsible for:
- Rendering all UI screens and user interactions
- Consuming backend REST APIs for data and AI-generated content
- Managing local state (user session, offline cache, UI state)
- Enforcing bilingual (Arabic/English) support with RTL layout switching

The app communicates exclusively with the backend via the **API Gateway** — it never accesses any microservice directly.

---

## 2. Architecture Approach

The frontend follows a **Feature-Sliced / Domain-Driven Architecture** utilizing a **3-tier component structure**. This approach promotes scalability and groups logic by feature rather than type.

### 3-Tier Component Structure
1. **Core UI (Atoms & Molecules):** Dumb, highly reusable generic components (e.g., `Button`, `Typography`). Located in `src/shared/components/`.
2. **Feature Components (Organisms):** Smart or complex components specific to a domain (e.g., `QuizQuestionCard`, `AIChatBubble`). Located in `src/features/[featureName]/components/`.
3. **Screens (Pages):** Full-screen layouts composing Feature Components and Core UI. Located in `src/features/[featureName]/screens/`.

---

## 3. Folder Structure (High-Level)

```
src/
├── app/                  # App initialization, global providers (QueryClient, SafeArea, Theme)
├── navigation/           # Root navigators, auth helpers, guest-gated screens
│   ├── RootNavigator.tsx
│   ├── BottomTabNavigator.tsx
│   ├── authNavigation.ts
│   └── guestGatedScreen.tsx
├── core/                 # App-wide singletons (api client setup, i18n, zustand store)
│   ├── data/             # Local seed data (landmarks JSON, panorama + card image maps)
│   ├── i18n/
│   └── store/
├── shared/               # Highly reusable, domain-agnostic modules
│   ├── components/       # Core UI (Button, Typography, FormInput, GuestGateScreen)
│   ├── constants/        # Colors, spacing, typography tokens
│   └── utils/            # Responsive scaling (useResponsive)
│
└── features/             # Feature modules (Domain-driven)
    ├── auth/             # Login, SignUp, guest access
    ├── splash/
    ├── personality-quiz/
    ├── explore/          # Home feed, Explore map tab, monument details, panorama
    │   ├── api/          # exploreService, monumentService, panoramaService
    │   ├── components/   # MonumentCard, SearchBar, ExploreMap, PanoramaViewer, …
    │   ├── data/         # exploreMapPins (governorate calibration)
    │   └── screens/      # HomeScreen, ExploreTabScreen, MonumentDetailScreen, PanoramaScreen
    ├── chatbot/
    ├── gamification/
    └── profile/
```

**Local data (MVP):** Monument, city, and category content is seeded from `src/core/data/egypt-tourism-landmarks.json` via `landmarksRepository`. Card images use bundled panorama assets where available plus curated Wikimedia URLs (`monumentCardImages.ts`). Panorama textures are bundled under `assets/Home/panorama/`.

By keeping separation of concerns localized, debugging and scaling features (like adding a new AI Agent) can happen entirely within one feature folder without touching the rest of the app.

---

## 3.1 Implemented Frontend Phases (Current)

| Phase | Doc | Status | Summary |
|-------|-----|--------|---------|
| **1 — Splash** | `planing/docs/phase-1-splash.md` | ✅ | Splash, guest vs auth entry |
| **2 — Auth** | `planing/docs/phase-2-auth.md` | ✅ | Login, SignUp, guest gate, `authNavigation` helpers |
| **3 — Personality Quiz** | `planing/docs/phase-3-personality-quiz.md` | ✅ | Onboarding persona quiz |
| **4 — Home** | `planing/docs/phase-4-home.md` | ✅ | Curated feed, category pills, search, 2-column `FlashList`, favorites (guest-gated) |
| **4.1 — Card details** | `planing/docs/phase-4.1-card-details.md` | ✅ | `MonumentDetailScreen`: hero, History & Culture articles, tab bar |
| **4.1b — Panorama** | `planing/docs/phase-4.1b-card-details-panorama.md` | ✅ | Fullscreen `PanoramaScreen`, hotspots, Ask AI Guide bridge |
| **4.2 — Explore tab** | `planing/docs/phase-4.2-explore-tab.md` | ✅ | Map + governorate pins + search + preview card |
| **5+ — Profile, Chatbot, Game, …** | `planing/docs/` | 🔶 Partial | Screens exist; full API integration TBD |

Detailed specs, flows, and checklists live under **`planing/docs/`** (not root `docs/`).

---

## 3.2 Key Product & Technical Decisions

### Home vs Explore (intentional split)

| | **Home tab** | **Explore tab** |
|---|--------------|-----------------|
| Purpose | Curated discovery | Geographic search |
| Layout | 2-column monument grid | Stylized Egypt map + search |
| Filters | Editorial categories (Recommended, Popular, Museums, …) | Live text search across all 71 monuments |
| Map | None | 13 **governorate** pins (not 71 monument pins) |

### Card details & panorama

- **Card details** opens from root stack: `MonumentDetail` with `{ slug }`.
- **360° Panorama** is a **separate fullscreen** root screen (`Panorama`), not inline in the detail scroll view — avoids gesture conflicts and WebGL lifecycle issues.
- **Panorama engine:** `expo-gl` + `expo-three` + `three` — **no WebView**, no React Three Fiber.
- **Geometry:** Inner sphere (`BackSide`); touch pan for camera; raycast hotspots on `touchEnd`.
- **Spike textures:** Wide flat photos are dev-only; production target is ≤2K **equirectangular** 2:1 assets (see phase 4.1b licensing notes).
- **Seed panoramas (bundled):** `bibliotheca`, `abu-simbel`, `giza-pyramids`, `karnak`, `gem` — each with localized hotspots.
- **Hotspot → AI Guide:** From `MediaBottomSheet`, authenticated users can open the AI tab with `HotspotChatContext` stored in `useChatbotStore`; guests see sign-in prompt at tap time.

### Explore map (no Map SDK in v1)

- Background: `assets/Home/explore/egypt-map.jpg` (illustrated art map).
- Pin positions: **calibrated %** in `exploreMapPins.ts` — not raw lat/lng on artwork.
- Flow: search → results list → select monument → highlight governorate pin → bottom preview card → View Details.

### Navigation & auth

```
RootStack
├── Splash
├── AuthStack (Login, SignUp, PersonaQuiz)
├── MainTabNavigator
│   ├── Home
│   ├── Explore
│   ├── AI_Guide (guest-gated)
│   ├── Game
│   └── Profile (guest-gated)
├── Settings, EditProfile
├── MonumentDetail { slug }
└── Panorama { slug }
```

- `authNavigation.ts`: `resetToAuthScreen`, `navigateToHomeTab`, `navigateToAiGuideTab`, etc.
- `createGuestGatedScreen` wraps AI Guide and Profile tabs.
- Favorites and some actions show `GuestGateScreen` modal without breaking root stack.

### Card images

- Monuments with bundled panorama PNGs reuse the same asset for **feed card + panorama**.
- Other monuments use curated Wikimedia Commons `thumbnail_url` in seed JSON + `monumentCardImages.ts`.
- `landmarksRepository.resolveImage()` priority: bundled → curated URL → JSON `thumbnail_url` → category placeholder.

### State management (as implemented)

| Concern | Tool |
|---------|------|
| Auth session / guest | Zustand `authStore` + SecureStore |
| Chat messages + hotspot context | Zustand `useChatbotStore` |
| Feed / monuments / panorama | Local `landmarksRepository` + feature services (TanStack Query planned for API phase) |
| Screen UI | React `useState` / `useMemo` |

---

## 4. Development Workflow

Development progresses in the following stages:

### Stage 0 — Living Documentation Setup
- Phase specs live in **`planing/docs/`** (e.g. `phase-4-home.md`, `phase-4.1b-card-details-panorama.md`, `phase-4.2-explore-tab.md`).
- UI mockups and map assets live under **`assets/`** (e.g. `assets/Home/explore/explore-search.png`, `egypt-map.jpg`).

### Stage 1 — Project Setup
- Initialize the project with Expo (managed workflow)
- Configure TypeScript, ESLint, and Prettier
- Set up folder structure and path aliases
- Integrate i18n library and configure RTL (using `I18nManager`)
- Define the design system: color tokens, typography scale, spacing constants

### Stage 2 — Building UI Components
- Build the **component library first** (buttons, inputs, cards, badges, modals)
- Implement the design system via a shared `constants/` and `components/` layer
- Build and verify every component in **both Arabic and English** modes from day one
- Validate RTL layout on every component before moving to screens

### Stage 3 — Screen Assembly
- Compose screens by assembling components
- Use **static/mock data** initially to validate layouts before APIs are ready
- Implement navigation structure in parallel with screen development

### Stage 4 — Connecting APIs
- Replace mock data with real API calls via `services/` modules
- Handle loading, error, and empty states for every data-fetching screen
- Use TanStack Query (React Query) for server state: caching, refetching, and background sync
- **Current:** Explore, Home, monument details, and panorama use **local seed JSON** (`egypt-tourism-landmarks.json`) through `landmarksRepository` / `exploreService` / `panoramaService` — same contracts intended for future REST APIs

### Stage 5 — State Management
- Wire global state (auth session, user profile, language preference) into the store
- Connect local/screen-level state using `useState` and `useReducer`
- Validate offline behavior: what the user sees when API calls fail

### Stage 6 — Testing & QA
- Write unit tests for custom hooks and utility functions
- Perform manual UI testing on both iOS and Android (physical devices where possible)
- Run full RTL regression after every major UI change
- Test on mid-range Android hardware (the primary target market in Egypt)

---

## 5. UI/UX Focus

The UI is not a secondary concern — it is a **core feature** of Heritage Hub.

**Key principles:**

- **Consistency:** All screens use the same component library, typography scale, and color palette. No one-off inline styles.
- **Accessibility:** Minimum touch target size of 44×44pt. Font sizes respect OS-level dynamic type. Sufficient color contrast (WCAG 2.1 AA).
- **Responsiveness & Safe Areas:** Strictly use `react-native-safe-area-context` to pad headers/tabs dynamically. Use a scaling utility (like `react-native-size-matters`) instead of hardcoded pixels. For tablets (NFR-15), use `useWindowDimensions()` to dynamically adjust grid layouts (e.g., 1 column to 2 columns).
- **Performance:** UI interactions must respond within **100ms** (NFR-3). Avoid heavy synchronous operations on the main thread and defer heavy renders using `InteractionManager`.
- **Bilingual:** The app must look and feel native in *both* Arabic and English. RTL is not an afterthought — it ships with the first screen.
- **Onboarding:** The full onboarding flow must complete in under **60 seconds** (NFR-7).

**Design System:**
A shared design system is defined in `constants/` and includes:
- Color palette (primary, secondary, neutral, semantic tokens)
- Typography scale (heading, body, caption — per locale)
- Spacing and layout grid
- Icon set and reusable component variants

---

## 6. State Management Strategy

State is divided into two categories:

| Category | Tool | Examples |
|---|---|---|
| **Server State** | TanStack Query (React Query) | API data, quiz questions, leaderboard, recommendations |
| **Client / Global State** | Zustand | Auth session, user profile, language preference, gamification counters |
| **Local / Screen State** | React `useState` / `useReducer` | Form inputs, modal visibility, active tab |

**Why this split?**
- TanStack Query handles caching, background refetching, and error retries for all API data — removing the need to write that logic manually.
- Zustand is lightweight, requires no boilerplate, and integrates seamlessly with React Native for global app-level state.
- `useState` is used for ephemeral, screen-scoped state only.

---

## 7. Routing & Navigation Strategy

Navigation is implemented using **React Navigation** (the standard for React Native).

**Structure (as implemented):**

```
Root Navigator (native stack)
├── Splash
├── AuthStack          → Login, SignUp, PersonaQuiz
├── MainTabNavigator
│   ├── Home           → Curated monument feed (Phase 4)
│   ├── Explore        → Map + search + governorate pins (Phase 4.2)
│   ├── AI_Guide       → Chatbot (guest-gated)
│   ├── Game           → Game hub
│   └── Profile        → Profile (guest-gated)
├── Settings, EditProfile
├── MonumentDetail     → Card details by slug (Phase 4.1) — from Home or Explore
└── Panorama           → Fullscreen 360° viewer (Phase 4.1b)
```

**Key rules:**
- **Monument detail and Panorama** sit on the **root stack**, not inside tab stacks — opened via `navigation.navigate('MonumentDetail', { slug })` or `Panorama` from any tab.
- Each tab maintains its own state when switching tabs; root screens overlay the tab navigator.
- **Explore tab ≠ panorama viewer** — Explore is geographic search; panorama is entered from card details (or future entry points).
- Deep linking is supported to allow push notifications to open a specific screen directly (e.g., a new challenge notification opening the Quiz screen).
- All navigation labels and header titles are localized and RTL-aware.

---

## 8. Best Practices

### Clean Code
- All components are written in **TypeScript** with explicit prop types
- No inline styles — all styling uses `StyleSheet.create()` or shared style tokens
- Components are small and focused — one responsibility per component

### Reusability & Scalability
- Generic UI elements (buttons, inputs, cards, loaders) live in `src/shared/components/` and accept a `variant` prop (e.g., `<Button variant="primary" />`) instead of arbitrary style overrides.
- Use a lightweight styling engine (like **Restyle** or a custom Context Theme Provider) to natively handle RTL spacing (using `marginStart`/`marginEnd`) and design tokens.
- Custom hooks encapsulate repeated logic (e.g., `useFavorites`, `useLanguage`, `useAdaptiveQuality`)

### Scalability
- Screens and features are organized by domain, not by type, making it easy to add new cities, monuments, or AI agents without restructuring the codebase
- API service modules are abstracted — changing a base URL or adding auth headers is a single-point change in `services/`

### Performance (100ms UI Requirement)
- Use **`React.memo`** for complex list items, **`useCallback`** for functions passed to memoized components, and **`useMemo`** for expensive client-side calculations (e.g., XP sorting). Avoid memoizing primitive components.
- Use **Shopify's `@shopify/flash-list`** instead of `FlatList` for all scrollable data to natively recycle views and handle large lists.
- Wrap heavy API calls or state updates in `InteractionManager.runAfterInteractions(() => { ... })` during navigation transitions to prevent animation stutter.
- Lazy-load and aggressively unmount heavy screens (e.g., **360° panorama** `PanoramaScreen`) when the user pops the stack — dispose WebGL textures, geometry, and cancel the render loop in `PanoramaScene` (see Phase 4.1b).
- Minimize JS bundle size — audit dependencies regularly with Expo's bundle analyzer

### Testing
- See **Section 9** below for the full practical testing plan.

---

## 9. Testing Strategy (MVP-Level)

> **Philosophy:** Test what matters. Ship fast. Don't over-engineer.  
> The goal is confidence, not coverage percentage.

---

### 🛠️ Minimal Stack — 2 Tools Only

| Tool | Purpose |
|---|---|
| **Jest + React Native Testing Library (RNTL)** | Unit & integration tests — test what the user sees and does |
| **Maestro** *(optional, add later)* | E2E tests for 2–3 critical flows only — add after MVP ships |

That's it. No MSW, no Cypress, no complex setup. Start with Jest + RNTL and move fast.

---

### ✅ What to Test (Critical Only)

**Test these:**
- Auth logic — login success, login failure, token storage
- Form validation — required fields, email format, password rules
- Quiz flow — answer selection, XP update, correct/incorrect state
- API error states — what the screen shows when a call fails
- Language switch — basic RTL layout doesn't break on toggle
- Custom hooks that contain logic (e.g., `useAdaptiveQuality`, `useXP`)
- Pure utility functions (formatters, calculators)

**Do NOT test these (waste of time):**
- ❌ Static UI components with no logic (a `<Button>` that just renders text)
- ❌ Navigation config files
- ❌ Styling and colors
- ❌ The 360° Panorama WebGL pipeline — use **manual QA** on device; unit-test `panoramaMath`, `panoramaRepository`, and hotspot context store logic instead
- ❌ Third-party library internals (TanStack Query, Zustand, etc.)
- ❌ Snapshot tests (they break constantly and add zero value)

---

### 📋 Practical Workflow

**When to write tests:**
- Write tests **after** the feature works, not before
- Exception: utility functions and hooks — write those tests alongside the code

**How many tests per feature:**

| Feature | Target |
|---|---|
| Login screen | 3–4 tests |
| Form with validation | 3–5 tests |
| Quiz flow | 4–6 tests |
| Utility function | 2–3 tests per function |
| Custom hook | 3–4 tests |

**How to keep it fast:**
- Run only affected tests during development: `jest --watch`
- Run full suite only before pushing a PR
- Keep each test file under 100 lines — split if longer

---

### 🎯 Simple Test Strategy

**Happy Path** → Does the feature work when everything goes right?
**One Error Case** → What happens when something fails (API down, empty input)?

That's the formula. Two scenarios per feature minimum. Don't overthink it.

---

### 🔍 Real Examples

#### Example 1 — Login Screen

```typescript
// What to test:
test('shows error message when email is empty')
test('shows error message when password is too short')
test('calls login API with correct credentials on submit')
test('navigates to Home screen on successful login')

// What to ignore:
// - The color of the button
// - The font size of the title
// - Whether the logo renders
```

#### Example 2 — Quiz Answer Selection

```typescript
// What to test:
test('highlights selected answer when user taps it')
test('shows "Correct" feedback when right answer is chosen')
test('shows "Incorrect" feedback with explanation when wrong answer is chosen')
test('XP counter increases after correct answer')

// What to ignore:
// - Animation timing of the feedback card
// - The icon used for the correct/incorrect indicator
```

---

### 📁 Where Tests Live

Co-locate tests next to the file they test:

```
src/
├── hooks/
│   ├── useQuiz.ts
│   └── useQuiz.test.ts       ← right next to the hook
├── utils/
│   ├── formatXP.ts
│   └── formatXP.test.ts      ← right next to the utility
├── screens/
│   ├── LoginScreen.tsx
│   └── LoginScreen.test.tsx  ← right next to the screen
```

No separate `__tests__` folder. Keep it close to the source.

---

> **Rule of thumb:** If a bug in this code would break the app for a real user, test it.  
> If it only affects how something looks, skip it and QA manually.

---

> This document defines the frontend development standards for Heritage Hub.  
> All engineers contributing to the mobile application must follow this workflow.
