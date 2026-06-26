import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { GuestGateScreen, GuestGateVariant } from '../shared/components/GuestGateScreen';
import { useAuthStore } from '../core/store/authStore';

export function createGuestGatedScreen<P extends object>(
  Screen: React.ComponentType<P>,
  variant: GuestGateVariant
) {
  const GuestGatedScreen = (props: P) => {
    const isGuest = useAuthStore((state) => state.isGuest);
    const navigation = useNavigation<any>();

    if (isGuest) {
      return (
        <GuestGateScreen
          variant={variant}
          onContinueBrowsing={() => navigation.navigate('Home')}
        />
      );
    }

    return <Screen {...props} />;
  };

  GuestGatedScreen.displayName = `GuestGated(${Screen.displayName ?? Screen.name ?? 'Screen'})`;

  return GuestGatedScreen;
}
