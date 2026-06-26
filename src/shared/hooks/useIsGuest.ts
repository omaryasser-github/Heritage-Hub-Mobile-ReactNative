import { useAuthStore } from '../../core/store/authStore';

export const useIsGuest = (): boolean => useAuthStore((state) => state.isGuest);
