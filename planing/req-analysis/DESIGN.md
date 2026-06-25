---
name: Heritage Hub
version: '2.0 — aligned to implemented UI (Jun 2026)'
colors:
  # ── Primary Gold Scale ──────────────────────────────────────────────
  primary: '#D9A941'                        # Main gold — buttons, links, progress fill, Likert selected
  primary-soft: '#E0C385'                   # Soft gold — tab bar active, avatar rings, play buttons
  primary-deep: '#8B6914'                   # Deep gold — icons, rank labels, user chat bubbles, active accents
  primary-muted: '#C5A55A'                  # Muted gold — chevrons, secondary nav hints
  primary-container: '#FFF0D6'              # Pale gold surface — menu icon wrappers
  primary-button: 'rgba(217, 169, 65, 0.7)' # PrimaryButton default fill (semi-transparent gold)
  primary-solid: '#D4AF37'                  # Solid gold — modal confirm, save buttons
  primary-send: '#CCB27B'                   # Chatbot send button

  # ── Warm Surfaces (Backgrounds) ───────────────────────────────────
  background-home: '#F2E8DD'                # Home screen base + header (warm sand)
  background-app: '#FDF6EC'                 # Profile, settings, gaming hub, chat bot bubbles
  background-tab: '#F4E8DA'                 # Bottom tab bar
  background-suggestion: '#F4E8DA'          # Chatbot suggestion pills
  background-placeholder: '#FAFAFA'         # Empty / placeholder screens
  background-neutral: '#F0F0F0'             # Disabled states, carousel placeholders
  background-search: '#F2F2F7'              # Search bar fill (iOS-style neutral)

  # ── Card & Panel Surfaces ─────────────────────────────────────────
  surface: '#FFFFFF'                          # Cards, inputs, modals, list rows
  surface-menu: '#FDF6EC'                   # HeaderMenu / ChatSidebar drawer panel
  surface-rating: '#FFF4E5'                   # Monument card rating badge background

  # ── Borders & Dividers ────────────────────────────────────────────
  border-divider: '#E8D5B5'                   # Drawer section dividers
  border-divider-light: '#F0E2C8'             # Drawer item dividers
  border-glass: 'rgba(255, 255, 255, 0.3)'    # Auth input glass border
  border-glass-subtle: 'rgba(255, 255, 255, 0.2)' # Auth social buttons, quiz back button

  # ── Text ──────────────────────────────────────────────────────────
  text-primary: '#4A3728'                   # Headings, labels, body on light surfaces (burnt umber)
  text-secondary: '#333333'                   # Secondary body, chat input text
  text-title: '#1A1A1A'                      # Monument card titles
  text-muted: '#666666'                       # Modal descriptions, game card subtitles
  text-subtle: '#8E8E93'                      # Inactive tabs, section labels, empty states
  text-disabled: '#B8A080'                    # Inactive language label, muted menu text
  text-quiz-muted: '#AAAAAA'                  # Personality quiz secondary text
  text-on-dark: '#FFFFFF'                     # Text on dark/image overlays
  text-on-dark-muted: '#E0E0E0'               # Auth subtitles, OR divider label
  text-on-dark-accent: '#D4C09A'             # Chat avatar subtitle on dark header
  text-link: '#D9A941'                        # Forgot password, sign-up links on auth screens

  # ── Semantic ──────────────────────────────────────────────────────
  error: '#FF6B6B'                            # Auth form validation errors
  error-strong: '#FF3B30'                     # Home feed error text
  error-destructive: '#D32F2F'                # Logout / delete confirm buttons
  rating: '#FF9500'                           # Monument star rating text

  # ── Overlays & Backdrops ──────────────────────────────────────────
  overlay-auth: 'rgba(0, 0, 0, 0.5)'          # Login / sign-up screen dim
  overlay-quiz: 'rgba(0, 0, 0, 0.6)'          # Personality quiz background dim
  overlay-splash: 'rgba(0, 0, 0, 0.4)'        # Splash logo overlay
  overlay-drawer: 'rgba(30, 18, 8, 0.45)'     # HeaderMenu / sidebar warm backdrop
  overlay-modal: 'rgba(0, 0, 0, 0.5)'         # ActionModal backdrop
  overlay-glass: 'rgba(255, 255, 255, 0.15)'  # Auth input glassmorphism fill
  overlay-glass-button: 'rgba(255, 255, 255, 0.1)' # Social login button fill
  overlay-progress-track: 'rgba(255, 255, 255, 0.2)' # Quiz progress bar track

  # ── Dark Surfaces ─────────────────────────────────────────────────
  surface-dark: '#000000'                     # Splash screen base

  # ── Tab Navigation ────────────────────────────────────────────────
  tab-active: '#E0C385'
  tab-inactive: '#8E8E93'
  tab-bar-background: '#F4E8DA'

  # ── Chat ──────────────────────────────────────────────────────────
  chat-user-bubble: '#8B6914'
  chat-bot-bubble: '#FDF6EC'
  chat-bot-text: '#4A3728'
  chat-user-text: '#FFFFFF'
  chat-input-background: '#F2F2F2'
  chat-avatar-header: '#E0C385'

  # ── Third-Party / Platform (keep as-is) ───────────────────────────
  social-google: '#DB4437'
  social-facebook: '#4267B2'
  switch-track-off: '#E0E0E0'

  # ── Outliers (used in 1–2 places — consider aligning during token migration) ──
  category-pill-bg: '#E6F2FF'               # CategoryPill default background (iOS blue tint)
  category-pill-text: '#007AFF'             # CategoryPill selected text (iOS blue)
  category-pill-label: '#333333'            # CategoryPill default label
  monument-location: 'blue'                 # MonumentCard location icon — hardcoded, should become primary-deep

typography:
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  margin-mobile: 1.25rem
  margin-desktop: 2.5rem
  gutter: 1rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is built upon a **Modern-Tactile** aesthetic that bridges ancient history and contemporary travel technology. It targets curious explorers, history enthusiasts, and luxury travelers seeking an immersive, curated experience of Egypt.

The personality is authoritative yet welcoming — evoking a premium guided tour through a desert oasis at sunset. Visually, the palette uses warm sand and cream surfaces accented by a layered gold scale, avoiding cold tech-app greys on primary screens.

> **Source of truth:** Color values in this document were extracted from the implemented React Native codebase (`src/`) as of June 2026. Use these tokens when building `src/shared/constants/colors.ts` in Phase 11.1.

---

## Colors

The app uses a **layered warm palette** — not a single gold, but a family of golds that create depth without gradients.

### Primary Gold Scale

| Token | Hex | Used for |
|---|---|---|
| **Primary** | `#D9A941` | Primary actions, auth links, progress fill, Likert selected state |
| **Primary Soft** | `#E0C385` | Tab bar active tint, avatar rings, play buttons, chat header |
| **Primary Deep** | `#8B6914` | Icons, rank badges, user chat bubbles, active language label |
| **Primary Muted** | `#C5A55A` | Chevrons, secondary navigation hints |
| **Primary Container** | `#FFF0D6` | Menu icon wrapper backgrounds |
| **Primary Button** | `rgba(217, 169, 65, 0.7)` | `PrimaryButton` default fill |
| **Primary Solid** | `#D4AF37` | Modal confirm, save profile button |

### Backgrounds & Surfaces

| Token | Hex | Used for |
|---|---|---|
| **Background Home** | `#F2E8DD` | Home screen base and header area (warm sand) |
| **Background App** | `#FDF6EC` | Profile, settings, gaming hub, bot chat bubbles |
| **Background Tab** | `#F4E8DA` | Bottom tab bar |
| **Surface** | `#FFFFFF` | Cards, inputs, modals, settings rows |
| **Surface Menu** | `#FDF6EC` | HeaderMenu and ChatSidebar drawer panels |

### Text

| Token | Hex | Used for |
|---|---|---|
| **Text Primary** | `#4A3728` | Headings, labels, body on light surfaces |
| **Text Title** | `#1A1A1A` | Monument card titles |
| **Text Secondary** | `#333333` | Secondary body, chat input |
| **Text Subtle** | `#8E8E93` | Inactive tabs, section labels, empty states |
| **Text Muted** | `#666666` | Modal descriptions |
| **Text on Dark** | `#FFFFFF` | Text on image overlays and dark backgrounds |
| **Text Link** | `#D9A941` | Forgot password, sign-up links |

### Semantic

| Token | Hex | Used for |
|---|---|---|
| **Error** | `#FF6B6B` | Form validation errors |
| **Error Strong** | `#FF3B30` | Feed / data error messages |
| **Error Destructive** | `#D32F2F` | Logout and delete account confirm |
| **Rating** | `#FF9500` | Star rating on monument cards |

### Overlays

| Token | Value | Used for |
|---|---|---|
| **Overlay Auth** | `rgba(0, 0, 0, 0.5)` | Login / sign-up background dim |
| **Overlay Drawer** | `rgba(30, 18, 8, 0.45)` | HeaderMenu warm backdrop |
| **Overlay Glass** | `rgba(255, 255, 255, 0.15)` | Auth input glassmorphism |

### Screen-to-Background Map

Quick reference for which background each major screen uses today:

| Screen | Background token |
|---|---|
| Splash | `#000000` (dark) |
| Auth (Login / SignUp) | Image + `overlay-auth` |
| Home | `#F2E8DD` |
| Profile / Settings / Gaming Hub | `#FDF6EC` |
| Chatbot | Image background + `#FDF6EC` bubbles |
| Personality Quiz | Image + `overlay-quiz` |

### Known Outliers (align during token migration)

These colors appear in only one or two components and break the warm palette. Consider replacing them with existing tokens when refactoring:

- **CategoryPill** uses iOS blue (`#E6F2FF` / `#007AFF`) — candidate for `primary-container` / `primary-deep`
- **SearchBar** uses iOS grey (`#F2F2F7`) — candidate for `surface` with a warm border
- **MonumentCard** location icon uses hardcoded `blue` — should become `primary-deep`

---

## Typography

This design system employs a sophisticated pairing of a classic serif for storytelling and a clean sans-serif for utility.

- **Headlines:** Use **Libre Caslon Text**. Render primarily in **Text Primary** (`#4A3728`) on light surfaces, or **Text on Dark** (`#FFFFFF`) on image overlays.
- **UI & Body:** Use **Work Sans**. Varied weights (400 for body, 600 for labels) establish hierarchy.
- **Styling:** Headings use tight tracking; labels and captions use slight letter-spacing (+0.05em).

---

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid** model. On mobile, content uses a 4-column system with generous 20px (1.25rem) side margins.

Vertical rhythm uses 8px increments. Internal card padding is 16px–24px. Related elements are grouped with 8px gaps; distinct sections are separated by 32px.

Responsive scaling is handled at runtime via `useResponsive()` (`sWidth`, `sHeight`, `sFont`) — baseline device is 375×812.

---

## Elevation & Depth

Hierarchy is established through tonal layers and warm-tinted shadows.

- **Level 0 (Base):** Warm sand or cream background (`#F2E8DD` or `#FDF6EC`).
- **Level 1 (Cards):** White surface (`#FFFFFF`) on cream/sand base. No heavy shadow — separation comes from background contrast.
- **Level 2 (Interactive):** Gold-accented elements (`#E0C385`, `#D9A941`) on cards and tab bar.
- **Overlays:** Warm brown-tinted drawer backdrop (`rgba(30, 18, 8, 0.45)`) or neutral black dim (`rgba(0, 0, 0, 0.5)`) for modals.

---

## Shapes

- **Standard Radius:** 8px (0.5rem) — cards, inputs, standard buttons.
- **Large Radius:** 16px (1rem) — feature containers, game launch card.
- **Pill / Full:** 9999px — primary buttons, suggestion pills, category pills.

---

## Components

- **Buttons:** Primary uses semi-transparent gold (`rgba(217, 169, 65, 0.7)`) with white text. Solid gold (`#D4AF37`) for confirm/save. Play CTAs use `#E0C385`.
- **Cards:** White (`#FFFFFF`) on warm backgrounds. Monument cards use `#FFF4E5` rating badge.
- **Progress Bars:** Track `rgba(255, 255, 255, 0.2)` on dark overlays; fill `#D9A941`.
- **Chips / Badges:** Pale gold container (`#FFF0D6`) with deep gold icon (`#8B6914`).
- **Navigation:** Tab bar background `#F4E8DA`; active tint `#E0C385`; inactive `#8E8E93`.
- **Chat Bubbles:** User `#8B6914` / white text; Bot `#FDF6EC` / `#4A3728` text.
- **Drawers (HeaderMenu):** Panel `#FDF6EC`, dividers `#E8D5B5` / `#F0E2C8`, icon wrappers `#FFF0D6`.
