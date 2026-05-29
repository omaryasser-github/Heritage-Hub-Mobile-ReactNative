import { create } from 'zustand';

interface AuthState {
  token: string | null;
  persona: string | null;
  setToken: (token: string | null) => void;
  setPersona: (persona: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  persona: null,
  setToken: (token) => set({ token }),
  setPersona: (persona) => set({ persona }),
}));
