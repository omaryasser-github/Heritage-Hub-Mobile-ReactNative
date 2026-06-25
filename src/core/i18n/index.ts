import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import {
  AppLanguage,
  DEFAULT_LANGUAGE,
  isRTL,
  isSupportedLanguage,
} from './languages';
import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
  });
}

export const initI18n = async (language: string): Promise<void> => {
  const lang: AppLanguage = isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
  const shouldBeRTL = isRTL(lang);

  if (I18nManager.isRTL !== shouldBeRTL) {
    I18nManager.allowRTL(shouldBeRTL);
    I18nManager.forceRTL(shouldBeRTL);
  }

  if (!i18n.isInitialized) {
    await i18n.use(initReactI18next).init({
      resources,
      lng: lang,
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
    });
    return;
  }

  await i18n.changeLanguage(lang);
};

export default i18n;
