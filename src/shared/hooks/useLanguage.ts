import { useTranslation } from 'react-i18next';
import { DevSettings, I18nManager } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';
import { usePreferencesStore } from '../../core/store/preferencesStore';
import { STORAGE_KEYS } from '../../core/storage/keys';
import {
  AppLanguage,
  SUPPORTED_LANGUAGES,
  isRTL,
  isSupportedLanguage,
} from '../../core/i18n/languages';

async function reloadApp(): Promise<void> {
  try {
    if (Updates.isEnabled) {
      await Updates.reloadAsync();
      return;
    }
  } catch {
    // Fall through to DevSettings reload in development.
  }

  if (__DEV__) {
    DevSettings.reload();
  }
}

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const { setLanguage } = usePreferencesStore();

  const currentLanguage = (isSupportedLanguage(i18n.language)
    ? i18n.language
    : i18n.language.split('-')[0]) as AppLanguage;

  const changeLanguage = async (newLang: AppLanguage) => {
    if (!isSupportedLanguage(newLang)) return;
    if (currentLanguage === newLang) return;

    await SecureStore.setItemAsync(STORAGE_KEYS.LANGUAGE, newLang);
    setLanguage(newLang);

    const shouldBeRTL = isRTL(newLang);
    const directionChanged = I18nManager.isRTL !== shouldBeRTL;

    if (directionChanged) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      await reloadApp();
      return;
    }

    await i18n.changeLanguage(newLang);
  };

  return {
    currentLanguage: isSupportedLanguage(currentLanguage) ? currentLanguage : 'en',
    changeLanguage,
    isRTL: isRTL(isSupportedLanguage(currentLanguage) ? currentLanguage : 'en'),
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};
