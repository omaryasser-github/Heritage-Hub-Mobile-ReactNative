import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { loadAppFonts } from '../../../core/fonts/loadFonts';
import { initI18n } from '../../../core/i18n';
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
} from '../../../core/i18n/languages';
import { useAuthStore } from '../../../core/store/authStore';
import { usePreferencesStore } from '../../../core/store/preferencesStore';
import { STORAGE_KEYS } from '../../../core/storage/keys';

SplashScreen.preventAutoHideAsync();

export const useAppBootstrap = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        const savedLanguage = await SecureStore.getItemAsync(STORAGE_KEYS.LANGUAGE);
        const language = isSupportedLanguage(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;

        await Promise.all([
          loadAppFonts(),
          initI18n(language),
          useAuthStore.getState().hydrateFromStorage(),
        ]);

        usePreferencesStore.getState().setLanguage(language);
      } catch (e) {
        console.warn(e);
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return { isReady, error };
};
