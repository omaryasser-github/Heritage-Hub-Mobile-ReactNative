# Phase 4: Home

**Related phases:** [4.1 — Card details](./phase-4.1-card-details.md) (tap card → detail) · [4.2 — Explore tab](./phase-4.2-explore-tab.md) (bottom nav; separate)

## Folder Structure
The following files and folders will be added or modified during this phase:
```text
src/
├── navigation/
│   ├── BottomTabNavigator.tsx     (Handles domain routing)
│   └── MainLayout.tsx             (Global wrapper with Bottom Navbar)
└── features/
    └── explore/
        ├── api/
        │   └── exploreService.ts
        ├── components/
        │   ├── CategoryPill.tsx
        │   ├── MonumentCard.tsx
        │   └── SearchBar.tsx
        └── screens/
            └── HomeScreen.tsx
```

## Flow
1. User lands on the Home screen.
2. The user sees a Search Bar, horizontally scrolling Categories (e.g., Popular, Recommended, Cities, Museums, Templates), and a vertical list of monuments.
3. User taps a Category to filter the list.
4. User types in the Search Bar to find a specific city or monument.
5. User taps the "Heart" icon on a Monument Card to save it to Favorites.
6. User taps a Monument Card to navigate to **card details** ([Phase 4.1](./phase-4.1-card-details.md)).

## States
* **Loading:** Use Skeleton loaders for the Monument Cards while data is being fetched via TanStack Query.
* **Error:** Failed to load feed (show error state with "Pull to refresh").
* **Empty:** Search query returns no results (Show an empty state illustration with "No monuments found").
* **Success:** List of monument cards renders smoothly.

## Logic
* **Caching & Fetching:** Use `useQuery` (TanStack Query) to fetch and cache the home feed.
* **Favorites Toggle:** Optimistic UI update. When the heart is clicked, instantly fill it, then make the API call in the background using `useMutation`.
* **RTL Support:** The Category list and Cards must support `row-reverse` when the app language is Arabic.

## Components
* **Atoms:** 
  * `HeartIcon` (Toggleable)
  * `RatingBadge` (Star icon + number)
* **Molecules:** 
  * `CategoryPill` (Icon + Text)
  * `SearchBar`
* **Organisms:** 
  * `MonumentCard` (Image, Title, Location, Rating, Heart)
  * `HorizontalCategoryList`

## API
* **Endpoints:** 
  * `GET /api/explore/feed`
  * `GET /api/explore/search?q={query}`
  * `POST /api/users/favorites`
* **Request/Response Structure:**
  * Response (Feed): `[{ id, title, location, image_url, rating, isFavorite }]`

## Testing
* **Automated Tests:**
  * `MonumentCard.test.tsx`: Ensure the heart icon changes state when pressed.
  * `HomeScreen.test.tsx`: Validate that typing in the search bar triggers the correct query state.
* **Manual Checklist:**
  * [ ] `@shopify/flash-list` is used instead of `FlatList` for the monument feed to maintain 60fps.
  * [ ] RTL flips the location icon to the right side of the text in Arabic.
  * [ ] Safe area insets applied to the header so the Search Bar isn't hidden under the device notch.
