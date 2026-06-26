export const SUPPORTED_LANGUAGES = {
  en: { label: 'English', nativeLabel: 'English', direction: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', direction: 'rtl' },
} as const;

export type AppLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: AppLanguage = 'en';

export function isSupportedLanguage(value: unknown): value is AppLanguage {
  return typeof value === 'string' && value in SUPPORTED_LANGUAGES;
}

export function isRTL(language: AppLanguage): boolean {
  return SUPPORTED_LANGUAGES[language].direction === 'rtl';
}
