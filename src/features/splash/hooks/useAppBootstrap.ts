import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '../../../core/store/authStore';

// Keep the native splash screen visible until we're done bootstrapping
SplashScreen.preventAutoHideAsync();

export const useAppBootstrap = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // We can use the auth store token to simulate checking auth state during splash
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate pre-loading fonts, localizations, and checking auth token
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // At this point, we could set the token if we fetched it from SecureStore
        // useAuthStore.getState().setToken(fetchedToken);

      } catch (e) {
        console.warn(e);
        setError(e instanceof Error ? e : new Error(String(e)));
      } finally {
        setIsReady(true);
        // Hide the native splash screen after the JS is ready to take over
        // We might want to hide it immediately if we have our own JS animation,
        // or wait. According to requirements: "Native splash screen transitions 
        // smoothly to the React Native splash screen."
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return { isReady, error };
};
