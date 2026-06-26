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
