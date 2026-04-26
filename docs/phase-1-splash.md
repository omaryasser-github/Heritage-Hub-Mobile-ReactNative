# Phase 1: Splash

## Folder Structure
The following files and folders will be added during this phase:
```text
src/
└── features/
    └── splash/
        ├── components/
        │   └── SplashAnimation.tsx
        ├── screens/
        │   └── SplashScreen.tsx
        └── hooks/
            └── useAppBootstrap.ts
```

## Flow
1. User opens the application.
2. The Sphinx background and Heritage Hub logo animations play.
3. The app pre-loads necessary fonts, localizations, and checks the user's authentication token.
4. The "Get Started" button appears.
5. User taps "Get Started" and is navigated to either the Auth flow (if not logged in) or the Home flow (if logged in).

## States
* **Loading:** Initial state while animations play and `useAppBootstrap` fetches local data.
* **Error:** Fails to load critical assets or token validation fails (fails silently and routes to Auth).
* **Empty:** N/A for Splash.
* **Success:** App is ready, assets are cached, and the user can proceed.

## Logic
* **Bootstrap Hook:** `useAppBootstrap` uses `expo-splash-screen` to keep the native splash screen visible until custom fonts and caching are complete.
* **Navigation routing:** Once the "Get Started" button is clicked, check the Zustand `authStore`. If `token` exists, navigate to `MainTabNavigator`, else navigate to `AuthStack`.

## Components
* **Atoms:** 
  * `PrimaryButton` (Get Started)
  * `Typography` (Title Text)
* **Molecules:** 
  * `SplashAnimation` (The Sphinx and Logo sequence)
* **Organisms:** 
  * N/A

## API
* **Endpoints:** None required for this phase. Local cache and secure store check only.

## Testing
* **Automated Tests:**
  * `useAppBootstrap.test.ts`: Ensure fonts and auth state resolve correctly.
* **Manual Checklist:**
  * [ ] Native splash screen transitions smoothly to the React Native splash screen.
  * [ ] Animation plays without stuttering.
  * [ ] "Get Started" button is safely positioned within `SafeArea`.
  * [ ] Tapping "Get Started" routes correctly based on auth state.
