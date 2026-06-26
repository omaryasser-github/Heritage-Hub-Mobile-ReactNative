# Phase 11: Core Infrastructure

This phase establishes the foundational global configurations and shared utilities for the Heritage Hub application, including a 3-language i18n setup (English, Arabic, and French), dynamic RTL layout handling, preferences store, font loading, app bootstrap sequence, global providers, and an API client wrapper.

## Folder Structure
The following files and directories will be added to the project during this phase:

```text
src/
├── app/
│   └── providers.tsx          # Wrapper for global query clients and localization providers
├── core/
│   ├── api/
│   │   └── apiClient.ts       # Axios instance for authenticated HTTP requests
│   └── i18n/
│       ├── index.ts           # i18next initialization and setup
│       ├── languages.ts       # Supported languages, RTL helper, and validation utils
│       └── locales/
│           ├── en.json        # English localization strings
│           ├── ar.json        # Arabic localization strings (RTL-ready)
│           └── fr.json        # French localization strings
└── shared/
    └── hooks/
        └── useLanguage.ts     # Language switching hook with conditional app reload
```

---

## Flow
1. **App Bootstrap Sequence**:
   - `useAppBootstrap` reads the stored language code from persistent storage.
   - The retrieved code is validated against the supported list. If invalid or missing, it defaults to English.
   - If the active language is Arabic, RTL is enabled natively via `I18nManager.forceRTL(true)`.
   - `expo-font` loads custom serif (**Libre Caslon Text**) and sans-serif (**Work Sans**) fonts.
   - Once resources are fully loaded and initialized, the splash screen is dismissed.
2. **App Launch**:
   - `App.tsx` renders `AppProviders` to configure state management and localization contexts globally.
   - The app navigates to the appropriate screen according to the user's session state.
3. **HTTP Communication**:
   - Dynamic API requests use `apiClient.ts`.
   - A request interceptor reads the authentication JWT token from `useAuthStore` and appends it to headers.
   - If a response returns a `401 Unauthorized` status, the interceptor clears the token from `useAuthStore` to trigger an automatic logout.

---

## States
* **Bootstrap Loading**: Holds the splash screen visibility state until fonts are loaded and the initial i18n direction is synchronized.
* **Unauthorized State**: Triggers a global redirect to the authentication stack if any protected endpoint responds with a `401` status.

---

## Logic

### 1. Language Support Utilities (`src/core/i18n/languages.ts`)
Defines supported locales, metadata, and validation checks:
```typescript
export const SUPPORTED_LANGUAGES = {
  en: { label: 'English', nativeLabel: 'English', direction: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', direction: 'rtl' },
  fr: { label: 'French', nativeLabel: 'Français', direction: 'ltr' },
} as const;

export type AppLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export function isSupportedLanguage(value: unknown): value is AppLanguage {
  return typeof value === 'string' && value in SUPPORTED_LANGUAGES;
}

export function isRTL(language: AppLanguage): boolean {
  return SUPPORTED_LANGUAGES[language].direction === 'rtl';
}
```

### 2. Localization Configuration (`src/core/i18n/index.ts`)
Configures `i18next` with the fallback language and locale translations:
```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { isRTL } from './languages';
import en from './locales/en.json';
import ar from './locales/ar.json';
import fr from './locales/fr.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
};

export const initI18n = (language: string) => {
  const shouldBeRTL = isRTL(language as any);
  
  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.forceRTL(shouldBeRTL);
  }

  return i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: language,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export default i18n;
```

### 3. Preferences Store (`src/core/store/preferencesStore.ts`)
Manages UI configuration states (like selected language) independently from user authentication:
```typescript
import { create } from 'zustand';
import { AppLanguage, DEFAULT_LANGUAGE } from '../i18n/languages';

interface PreferencesState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
  language: DEFAULT_LANGUAGE,
  setLanguage: (language) => set({ language }),
}));
```

### 4. Custom Hook: `useLanguage` (`src/shared/hooks/useLanguage.ts`)
Coordinates switching language, writes changes to local storage, and forces app restarts only when direction changes:
```typescript
import { useTranslation } from 'react-i18next';
import { I18nManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import { usePreferencesStore } from '../../core/store/preferencesStore';
import { AppLanguage, SUPPORTED_LANGUAGES, isRTL, isSupportedLanguage } from '../../core/i18n/languages';

const LANGUAGE_KEY = 'user-language';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = usePreferencesStore();

  const changeLanguage = async (newLang: AppLanguage) => {
    if (i18n.language === newLang) return;
    if (!isSupportedLanguage(newLang)) return;

    // Save language code
    // Note: SecureStore is used because it already exists in the project; language data itself is not sensitive.
    await SecureStore.setItemAsync(LANGUAGE_KEY, newLang);
    setLanguage(newLang);

    const shouldBeRTL = isRTL(newLang);
    const directionChanged = I18nManager.isRTL !== shouldBeRTL;

    if (directionChanged) {
      I18nManager.forceRTL(shouldBeRTL);
      // Native direction changes require a reload to redraw native layouts
      await Updates.reloadAsync();
    } else {
      await i18n.changeLanguage(newLang);
    }
  };

  return {
    currentLanguage: i18n.language as AppLanguage,
    changeLanguage,
    isRTL: isRTL(i18n.language as AppLanguage),
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};
```

### 5. API Client Singleton (`src/core/api/apiClient.ts`)
Handles core HTTP requests and injects the authorization token:
```typescript
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'https://heritage-hub.api.example.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token to log out the user
      useAuthStore.getState().setToken(null);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## Components
* **Global Provider Wrapper (`src/app/providers.tsx`)**:
  Wraps the React Navigation tree with `QueryClientProvider` and `I18nextProvider`.
  ```typescript
  import React from 'react';
  import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
  import { I18nextProvider } from 'react-i18next';
  import i18n from '../core/i18n';
  import { SafeAreaProvider } from 'react-native-safe-area-context';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            {children}
          </SafeAreaProvider>
        </I18nextProvider>
      </QueryClientProvider>
    );
  };
  ```

---

## API
* **No immediate endpoints integrated.** Outgoing server logic is pre-routed through the `apiClient` wrapper for all future network calls.

---

## Testing
* **Bootstrap Hook Tests**: Verify that `useAppBootstrap` loads correct preferences, defaults, and assets on launch.

---

## Impact on Existing Files

### 1. `package.json`
- Add compatibility versions of the following packages:
  - `"axios": "^1.7.9"`
  - `"expo-font": "~13.0.3"`
  - `"expo-updates": "~0.26.16"`

### 2. `App.tsx`
- Import and wrap components within `AppProviders` directly.
- Clean up any raw provider initialization calls.

### 3. `src/features/splash/hooks/useAppBootstrap.ts`
- Implement font pre-loading using `Font.loadAsync()` for `Libre Caslon Text` and `Work Sans`.
- Retrieve saved language from storage and initialize the translation engine via `initI18n(savedLang)` before completing bootstrapping.

### 4. `src/core/store/authStore.ts`
- Keep this store strictly responsible for authentication variables (`token`, `persona`, `setToken`, `setPersona`). Ensure language states are kept out of this store.

---

## Manual Verification Checklist
* [ ] The app launches and falls back to English when no language code is present in storage.
* [ ] Tapping Arabic triggers a direction shift (RTL) and correctly invokes `Updates.reloadAsync()`.
* [ ] English <-> French language transitions execute instantly without causing full screen resets.
* [ ] Pre-loaded custom typography loads before the UI is rendered.
* [ ] 401 status error responses reset authentication tokens, logging the user out.
