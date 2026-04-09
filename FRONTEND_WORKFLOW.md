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

The frontend follows a **component-based architecture** with a strict separation of concerns:

| Layer | Responsibility |
|---|---|
| **UI Layer** | Presentational components — renders what the user sees |
| **Logic Layer** | Custom hooks — handles business logic and data transformation |
| **Service Layer** | API service modules — manages all HTTP calls to the backend |
| **State Layer** | Global and local state management — persists user and app state |

This separation ensures that UI components remain clean and reusable, while logic and data concerns stay isolated from rendering code.

---

## 3. Folder Structure (High-Level)

```
src/
├── assets/             # Images, icons, fonts, audio files
├── components/         # Reusable UI components (buttons, cards, modals)
├── screens/            # Full-page screen components (one per route)
├── navigation/         # Navigation stacks, tab bars, and route config
├── hooks/              # Custom React hooks (useAuth, useQuiz, usePanorama…)
├── services/           # API service modules (authService, contentService…)
├── store/              # Global state (Zustand stores or Context providers)
├── constants/          # App-wide constants (colors, spacing, config)
├── i18n/               # Localization files (en.json, ar.json) + RTL config
├── utils/              # Shared helper functions and formatters
└── types/              # Global TypeScript type definitions and interfaces
```

Each `screen` is composed of components. Each component pulls data via a `hook`. Each hook calls a `service`. This one-way dependency flow keeps the codebase predictable and testable.

---

## 4. Development Workflow

Development progresses in the following stages:

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
- **Responsiveness:** Layouts adapt to both mobile and tablet screen sizes (NFR-15). Use `Dimensions` API and flexible units — avoid hardcoded pixel values.
- **Performance:** UI interactions must respond within **100ms** (NFR-3). Avoid heavy synchronous operations on the main thread.
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

**Structure:**

```
Root Navigator
├── Auth Stack         → Login, Register, Guest Access, Onboarding
└── Main Tab Navigator
    ├── Home Stack     → Home Feed, City Detail, Monument Detail
    ├── Explore Stack  → 360° Panorama Viewer, Hotspot Viewer
    ├── Quiz Stack     → Quiz Home, Active Quiz, Results, Leaderboard
    ├── AI Stack       → Chatbot, Recommendations, Awareness Feed
    └── Profile Stack  → User Profile, Achievements, Favorites, Settings
```

**Key rules:**
- Each tab maintains its own independent navigation stack — navigating between tabs does not reset the stack of the previous tab.
- Deep linking is supported to allow push notifications to open a specific screen directly (e.g., a new challenge notification opening the Quiz screen).
- All navigation labels and header titles are localized and RTL-aware.

---

## 8. Best Practices

### Clean Code
- All components are written in **TypeScript** with explicit prop types
- No inline styles — all styling uses `StyleSheet.create()` or shared style tokens
- Components are small and focused — one responsibility per component

### Reusability
- Generic UI elements (buttons, inputs, cards, loaders) live in `components/` and are never duplicated across screens
- Custom hooks encapsulate repeated logic (e.g., `useFavorites`, `useLanguage`, `useAdaptiveQuality`)

### Scalability
- Screens and features are organized by domain, not by type, making it easy to add new cities, monuments, or AI agents without restructuring the codebase
- API service modules are abstracted — changing a base URL or adding auth headers is a single-point change in `services/`

### Performance
- Use `React.memo` and `useCallback` on components that receive stable props but re-render unnecessarily
- Virtualized lists (`FlatList`, `FlashList`) for all scrollable data — never `ScrollView` over long dynamic lists
- Lazy-load heavy screens (e.g., 360° panorama viewer) using `React.lazy` equivalents in React Navigation (`lazy: true`)
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
- ❌ The 360° Panorama WebView (untestable via code — use manual QA)
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
