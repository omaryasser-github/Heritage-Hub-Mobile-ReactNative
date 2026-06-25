import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../storage/keys';

interface AuthState {
  token: string | null;
  persona: string | null;
  setToken: (token: string | null) => void;
  setPersona: (persona: string | null) => void;
  hydrateFromStorage: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  persona: null,
  setToken: (token) => {
    set({ token });
    if (token) {
      SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, token).catch(console.warn);
      return;
    }
    SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN).catch(console.warn);
  },
  setPersona: (persona) => set({ persona }),
  hydrateFromStorage: async () => {
    try {
      const token = await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);
      if (token) {
        set({ token });
      }
    } catch (error) {
      console.warn('Failed to restore auth token:', error);
    }
  },
}));
