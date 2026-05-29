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
├── navigation/           # Root navigators and route typings
├── core/                 # App-wide singletons (api client setup, i18n config, zustand store)
├── shared/               # Highly reusable, domain-agnostic modules
│   ├── components/       # Core UI (Button, Typography, FormInput)
│   ├── hooks/            # Global hooks (useTheme, useLanguage)
│   └── utils/            # Formatters, scale helpers
│
└── features/             # Feature modules (Domain-driven)
    ├── auth/             # Login, Register
    │   ├── api/          # auth-specific API calls
    │   ├── components/   # SocialLoginButton, PasswordStrengthMeter
    │   └── screens/      # LoginScreen, RegisterScreen
    ├── explore/          # Cities, Monuments, 360 Panorama
    ├── gamification/     # Quizzes, Leaderboard, Achievements
    ├── ai-agents/        # Chatbot, Recommendations, Awareness
    ├── profile/          # User Settings, Avatar
    └── feedback/         # User feedback and bug reporting
```

By keeping separation of concerns localized, debugging and scaling features (like adding a new AI Agent) can happen entirely within one feature folder without touching the rest of the app.

---

## 4. Development Workflow

Development progresses in the following stages:

### Stage 0 — Living Documentation Setup
- Establish a `docs/` folder at the root of the project, organized by feature-phases (e.g., `phase-1-auth`, `phase-2-explore`).
- Each phase folder includes an actionable `.md` file (requirements, API endpoints, checklists) and an `assets/` folder for local UI mockups and Figma exports.

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
- Lazy-load and aggressively unmount heavy screens (e.g., 360° panorama viewer, Video Agent) when the screen loses focus using React Navigation's `useIsFocused` or `unmountOnBlur: true`.
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
