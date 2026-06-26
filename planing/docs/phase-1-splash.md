# Phase 1: Splash

## Overview

The splash screen introduces the app with the Sphinx and Heritage Hub logo animation, completes bootstrap (fonts, i18n, auth token restore), and offers **two entry paths**:

| Control | Position | User intent |
|---------|----------|-------------|
| **Skip** | Top row, aligned with the Sphinx hero | Browse as a **guest** — go straight to Home |
| **Get Started** | Bottom safe area | Join or return — Auth flow (or Main if already signed in) |

Both controls appear only after bootstrap is ready and the main animation sequence has finished (~4s).

---

## Layout & Alignment

The splash uses a **single horizontal header row** so Skip feels part of the scene, not a floating overlay.

```
┌─────────────────────────────────────┐
│  [Sphinx / hero visual]    Skip →   │  ← same baseline row (top safe area)
│                                     │
│         Logo + title animation      │
│         (moves up after reveal)     │
│                                     │
│                                     │
│         [ Get Started ]             │  ← PrimaryButton, bottom safe area
└─────────────────────────────────────┘
```

### Alignment rules

* **Header row:** `flexDirection: 'row'`, `justifyContent: 'space-between'`, `alignItems: 'center'`, inside top safe area padding.
* **Start (LTR):** Sphinx / background hero anchor on the left; **Skip + chevron** on the end (right).
* **End (RTL):** Mirror the row — Skip on the visual start side, Sphinx on the end. Use `start` / `end`, not hardcoded `left` / `right`.
* **Skip styling:** Subtle — `Colors.textOnDark` or `Colors.textOnDarkAccent`, small label + forward chevron. Not a second gold `PrimaryButton` (avoids competing with Get Started).
* **Chevron:** Forward in reading direction (`chevron-forward` mirrored in RTL via `I18nManager.isRTL`).
* **Get Started:** Unchanged — full-width `PrimaryButton` at bottom with safe-area inset.

### Timing

1. Native splash held until `useAppBootstrap` completes.
2. Sphinx background + logo animation plays (~4s sequence).
3. **Then** both **Skip** (header row) and **Get Started** (bottom) fade/slide in together.

---

## Folder Structure

```text
src/
├── features/
│   └── splash/
│       ├── components/
│       │   ├── SplashAnimation.tsx
│       │   └── SplashSkipButton.tsx      # Skip label + chevron (header row)
│       ├── screens/
│       │   └── SplashScreen.tsx
│       └── hooks/
│           └── useAppBootstrap.ts
├── navigation/
│   └── BottomTabNavigator.tsx            # Guest tab gating (listeners / wrappers)
└── shared/
    └── components/
        ├── GuestGateScreen.tsx           # Reusable gate UI for locked tabs
        └── ActionModal.tsx               # Branded confirm — not native Alert
```

---

## Flow

### Splash entry

1. User opens the application.
2. Sphinx background and Heritage Hub logo animations play.
3. App pre-loads fonts, i18n, and restores auth token from SecureStore (`useAppBootstrap`).
4. After animation + bootstrap: **Skip** (header row) and **Get Started** (bottom) appear.

### Path A — Skip (guest)

1. User taps **Skip**.
2. Navigate to `MainTabNavigator` with **no token** (guest mode).
3. **Open tabs:** Home, Explore (placeholder), Game hub (browse only).
4. **Locked tabs:** AI Guide, Profile.
5. Guest taps a locked tab → show **GuestGateScreen** (or `ActionModal`) — never mount Chatbot / Profile content underneath.
6. Gate offers **Create account** (→ `AuthStack` / SignUp), **Log in** (→ `AuthStack` / Login), and **Continue browsing** (dismiss).
7. After successful auth: existing flow — **PersonaQuiz** (if no persona) → `MainTabNavigator` with full access. Prefer returning user to the tab they attempted to open.

### Path B — Get Started (auth / returning user)

1. User taps **Get Started**.
2. Check `authStore.token`:
   * **Token exists** → `MainTabNavigator` (full access). Label may show **Continue** instead of Get Started when token is present.
   * **No token** → `AuthStack` (Login / SignUp → PersonaQuiz → Main).

### Returning signed-in user

* If `token` exists after bootstrap, **Skip is hidden or redundant** — primary CTA becomes **Continue** → `MainTabNavigator`.
* Guest mode is derived from **`!token`**, not from which splash button was pressed.

---

## Guest Mode & Tab Gating

| Tab | Guest access | Notes |
|-----|--------------|-------|
| Home | ✅ Open | Full feed browse |
| Explore | ✅ Open | Placeholder until [Phase 4.2 — Explore tab](./phase-4.2-explore-tab.md) |
| Game | ✅ Open (hub) | **Play** action gated inside screen (signup prompt) |
| AI Guide | 🔒 Locked | Guest gate on tab focus |
| Profile | 🔒 Locked | Guest gate on tab focus — do not show mock user data |

### Gate UX (not native `Alert`)

Use **`GuestGateScreen`** or **`ActionModal`** styled with design tokens (`Colors`, `Typography`, `PrimaryButton`):

* Title: e.g. “Sign in to use AI Guide” / “Sign in to view your profile”
* Short benefit copy (personalized guide, badges, favorites)
* **Primary:** Create account → SignUp
* **Secondary:** Log in → Login
* **Tertiary:** Continue browsing → dismiss, stay on current tab

All gate copy must use i18n keys in `en.json` / `ar.json`.

---

## States

* **Loading:** Native + in-app splash; animations playing; bootstrap in progress. No Skip / Get Started visible.
* **Ready:** Bootstrap complete; animation sequence done; Skip + Get Started visible.
* **Error:** Bootstrap failed — show `splash.bootstrapError`; Get Started still available; Skip may be disabled or still allow guest browse (product decision: prefer allowing Skip if only non-critical assets failed).
* **Authenticated (restored):** Token present — prefer **Continue** → Main; hide or de-emphasize Skip.

---

## Logic

* **Bootstrap hook:** `useAppBootstrap` uses `expo-splash-screen` until fonts, `initI18n`, and `authStore.hydrateFromStorage()` complete.
* **Guest detection:** `const isGuest = !useAuthStore.token` — single source of truth.
* **Splash routing:**
  * `handleSkip` → `navigation.reset({ routes: [{ name: 'MainTabNavigator' }] })`
  * `handleGetStarted` → token ? Main : AuthStack
* **Tab gating:** Implement via tab `listeners` (`tabPress` preventDefault) or wrapper components that render `GuestGateScreen` when `isGuest`.
* **RTL:** Header row and chevron respect `I18nManager.isRTL`; splash strings via `react-i18next`.

---

## Components

* **Atoms**
  * `PrimaryButton` — Get Started / Continue
  * `Typography` — splash title, Skip label, gate copy
* **Molecules**
  * `SplashAnimation` — Sphinx background + logo sequence
  * `SplashSkipButton` — Skip text + chevron for header row
* **Organisms**
  * `SplashScreen` — orchestrates header row, animation, bottom CTA
  * `GuestGateScreen` — full-screen or in-tab gate for locked features

---

## i18n Keys (add to locales)

```text
splash.skip
splash.getStarted
splash.continue          # when token exists
guest.gateTitleAi
guest.gateTitleProfile
guest.gateMessageAi
guest.gateMessageProfile
guest.createAccount
guest.logIn
guest.continueBrowsing
```

---

## API

* **Endpoints:** None. Local bootstrap only (fonts, SecureStore token, language preference).

---

## Testing

### Automated

* `useAppBootstrap.test.ts` — fonts, i18n, and auth hydrate resolve correctly.

### Manual checklist

* [ ] Native splash transitions smoothly to React Native splash.
* [ ] Animation plays without stutter.
* [ ] Skip and Sphinx sit on the **same header row** with correct alignment (LTR + RTL).
* [ ] Skip chevron points forward in reading direction.
* [ ] Skip + Get Started appear only after bootstrap + animation complete.
* [ ] Skip → MainTabNavigator as guest (Home works).
* [ ] Get Started without token → AuthStack.
* [ ] Get Started with token → MainTabNavigator.
* [ ] AI Guide + Profile show gate for guests — no flash of chat/profile content.
* [ ] Gate → SignUp / Login navigates correctly; post-auth flow includes PersonaQuiz when needed.
* [ ] Game hub visible to guests; Play shows gate or signup prompt.
* [ ] All new strings render in Arabic with RTL layout.

---

## Out of Scope (this phase)

* Forgot / Reset password screens
* Backend token validation
* Push notifications or deep links from splash
