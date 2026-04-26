# Phase 5: Profile

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── profile/
        ├── api/
        │   └── profileService.ts
        ├── components/
        │   ├── ProfileHeader.tsx
        │   ├── HexagonBadge.tsx
        │   └── FavoriteCarousel.tsx
        └── screens/
            └── ProfileScreen.tsx
```

## Flow
1. User navigates to the Profile tab from the bottom navigation.
2. User sees their Name, Rank (e.g., "Gold Explorer"), and total Points.
3. User scrolls horizontally to view their earned achievements in the "My Badges" section.
4. User scrolls vertically to view a list of their "Favorite Places".
5. User can tap the Settings or Logout options at the bottom of the screen.

## States
* **Loading:** Skeleton loaders display for the Badges and Favorite Places while fetching from `TanStack Query`.
* **Error:** Network error banner displayed if profile sync fails.
* **Empty:** If the user has no badges or favorites, display empty state UI with a "Start Exploring" call to action.
* **Success:** All profile data correctly renders and aligns.

## Logic
* **Data Aggregation:** The profile aggregates data from multiple sources (Gamification service for badges/points, Explore service for favorites).
* **Logout:** Clearing the token from SecureStore and resetting the Zustand `authStore`.
* **Points Calculation:** Use `useMemo` to safely render formatted point values and progress towards the next rank.

## Components
* **Atoms:** 
  * `AvatarImage`
  * `HexagonBadge` (Displays SVG badges)
* **Molecules:** 
  * `ProfileHeader` (Avatar + Name + Rank)
  * `SettingsRow`
* **Organisms:** 
  * `FavoriteCarousel`
  * `BadgeHorizontalList`

## API
* **Endpoints:** 
  * `GET /api/users/profile` (Fetches aggregated data)
* **Request/Response Structure:**
  * Response: `{ user: { name, rank, points, avatar }, badges: [...], favorites: [...] }`

## Testing
* **Automated Tests:**
  * `ProfileScreen.test.tsx`: Test that clicking Logout clears the token and triggers navigation state reset.
* **Manual Checklist:**
  * [ ] Badges render correctly without distortion (SVG aspect ratio maintained).
  * [ ] "Favorite Places" cards use the same Organism component as the Home screen for consistency.
  * [ ] Tapping a favorite place navigates directly to that Monument's detail screen.
