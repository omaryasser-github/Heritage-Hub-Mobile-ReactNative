# Phase 7: Gaming

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── gamification/
        ├── api/
        │   └── gameService.ts
        ├── components/
        │   ├── LeaderboardRow.tsx
        │   └── GameLaunchCard.tsx
        └── screens/
            ├── GameHubScreen.tsx
            └── LeaderboardScreen.tsx
```

## Flow
1. User navigates to the Gaming tab.
2. User sees an immersive `GameLaunchCard` containing the "Heritage Hub: Bridging History and Technology" graphic and a "Play" button.
3. User taps "Play" and is navigated to an active Quiz or Game challenge.
4. User completes the challenge, earns XP, and returns to view the `LeaderboardScreen`.
5. User checks their rank against other players in the leaderboard.

## States
* **Loading:** Fetching leaderboard rankings via TanStack Query.
* **Error:** Unable to load game configurations or leaderboard (show retry button).
* **Empty:** Leaderboard is empty (e.g., new weekly reset).
* **Success:** Ranks display correctly, and the current user's row is highlighted.

## Logic
* **Memoization:** Calculating XP totals and sorting the leaderboard array must be wrapped in `useMemo` to prevent heavy UI thread blocking.
* **Navigation Delay:** Launching the heavy Game or Quiz screen should happen inside `InteractionManager.runAfterInteractions` to prevent choppy ripple/press animations.
* **Highlighting User:** Pass the `userId` to the `LeaderboardList`. If `item.id === userId`, apply a distinct background color (e.g., light gold) to that row.

## Components
* **Atoms:** 
  * `RankNumber`
  * `GameButton` (Call to action)
* **Molecules:** 
  * `LeaderboardRow` (Rank + Avatar + Name + Score)
* **Organisms:** 
  * `GameLaunchCard` (Large visual card containing the logo and button)
  * `LeaderboardList`

## API
* **Endpoints:** 
  * `GET /api/gamification/leaderboard`
  * `POST /api/gamification/game/start`
* **Request/Response Structure:**
  * Response (Leaderboard): `[{ userId, rank, name, xp, avatarUrl }]`

## Testing
* **Automated Tests:**
  * `LeaderboardScreen.test.tsx`: Test that the sorting utility correctly orders players by XP descending.
* **Manual Checklist:**
  * [ ] The "Play" button inside the `GameLaunchCard` uses the primary gold color to stand out, avoiding a "gray placeholder" look.
  * [ ] The user's specific row in the leaderboard is distinctly highlighted.
  * [ ] Scrolling through the leaderboard (using `FlashList`) maintains 60fps even with 100+ rows.
