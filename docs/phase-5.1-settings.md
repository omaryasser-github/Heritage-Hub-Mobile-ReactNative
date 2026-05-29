# Phase 5.1: Settings (Profile Sub-module)

## Folder Structure
The Settings feature acts as a sub-module to the Profile phase. The following files will be added to the existing profile feature and shared components:
```text
src/
├── shared/
│   └── components/
│       ├── SwitchToggle.tsx        # Reusable binary toggle
│       └── ActionModal.tsx         # Reusable modal for destructive actions
└── features/
    └── profile/
        ├── components/
        │   └── SettingsGroup.tsx   # Wrapper for a group of settings rows
        └── screens/
            ├── SettingsScreen.tsx  # Main settings list (Language, Notifications, etc.)
            └── EditProfileScreen.tsx # Screen to update user details like Name
```

## Flow
1. User taps "Account Settings" or the Settings gear icon from the `ProfileScreen`.
2. App navigates to the `SettingsScreen`.
3. User sees categorized settings grouped by logical domains:
   - **Account:** Edit Profile.
   - **Preferences:** Language (Arabic/English), Theme (if applicable).
   - **Notifications:** Push Notification toggles.
   - **Support:** Privacy Policy, Terms of Service, Contact Us.
   - **Danger Zone:** Log Out, Delete Account.
4. Tapping a non-binary row (like Edit Profile) pushes a new screen (`EditProfileScreen`).
5. Tapping a binary row (like Notifications) toggles the switch immediately.
6. Tapping a destructive action opens an `ActionModal` to confirm intent before execution.

## States
* **Optimistic UI:** When a user toggles a switch (e.g., Notifications), the switch flips instantly. If the background API call fails, the switch reverts and a toast/banner error is shown.
* **Loading:** `EditProfileScreen` form disables the "Save" button and shows a spinner while the mutation is in progress.
* **Action Confirmed:** A clear confirmation modal or bottom sheet appears for "Delete Account" or "Log Out".

## Logic
* **Language & RTL (I18nManager & Zustand):** 
  - Changing the language must update the global `Zustand` store for the user's preference.
  - It must also trigger `I18nManager.forceRTL(true/false)`.
  - For changes to take full effect natively, use `Updates.reloadAsync()` to restart the app after the user confirms the language change.
* **Data Mutation (TanStack Query):**
  - Use `useMutation` for editing profile details (`PATCH /api/users/profile`).
  - Upon successful mutation, call `queryClient.invalidateQueries(['profile'])` so that when the user goes back to the `ProfileScreen`, the new data is instantly there.
* **Form Validation:** Use `Zod` and `react-hook-form` in `EditProfileScreen` to validate inputs before submission.

## Components
* **Atoms:**
  - `SwitchToggle` (Custom animated switch or styled native switch)
* **Molecules:**
  - `SettingsRow` (Already built, extend it to optionally accept a `SwitchToggle` as a right-side accessory)
  - `ActionModal` (For confirmation dialogues)
* **Organisms:**
  - `SettingsGroup` (Wrapper for a group of `SettingsRow`s, using basic Text for its header)

## API
* **Endpoints:**
  - `PATCH /api/users/profile` (Updates name, email, avatar, or preferences)
  - `POST /api/auth/logout` (Invalidates session on backend, if applicable)
* **Request/Response Structure:**
  - Request: `{ name: "New Name", notificationsEnabled: false }`
  - Response: `{ success: true, user: { ...updatedUser } }`

## Testing
* **Automated Tests (Jest + RNTL):**
  - `SettingsScreen.test.tsx`: Test that language toggle updates the store.
  - `EditProfileScreen.test.tsx`: Test that form validation blocks submission if the name is empty.
* **Manual Checklist:**
  - [ ] Toggling the language prompts an app restart and correctly flips the RTL layout.
  - [ ] Optimistic update works for the notification toggle (UI updates immediately).
  - [ ] Changing the name in `EditProfileScreen` reflects immediately on the `ProfileScreen` upon going back.
  - [ ] Modals are used to confirm destructive actions.
