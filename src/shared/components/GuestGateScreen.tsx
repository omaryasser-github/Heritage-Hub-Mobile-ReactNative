import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Colors } from '../constants/colors';
import { Spacing } from '../constants/spacing';
import { Typography } from './Typography';
import { PrimaryButton } from './PrimaryButton';
import { useResponsive } from '../utils/responsive';
import { navigateToHomeTab, resetToAuthScreen } from '../../navigation/authNavigation';

export type GuestGateVariant = 'ai' | 'profile' | 'game';

const TITLE_KEYS: Record<GuestGateVariant, string> = {
  ai: 'guest.gateTitleAi',
  profile: 'guest.gateTitleProfile',
  game: 'guest.gateTitleGame',
};

const MESSAGE_KEYS: Record<GuestGateVariant, string> = {
  ai: 'guest.gateMessageAi',
  profile: 'guest.gateMessageProfile',
  game: 'guest.gateMessageGame',
};

interface GuestGateScreenProps {
  variant: GuestGateVariant;
  onContinueBrowsing?: () => void;
}

export const GuestGateScreen = ({ variant, onContinueBrowsing }: GuestGateScreenProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { sWidth, sHeight } = useResponsive();

  const navigateToAuth = (screen: 'Login' | 'SignUp') => {
    onContinueBrowsing?.();
    requestAnimationFrame(() => {
      resetToAuthScreen(navigation, screen);
    });
  };

  const handleContinueBrowsing = () => {
    if (onContinueBrowsing) {
      onContinueBrowsing();
      return;
    }
    navigateToHomeTab(navigation);
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + sHeight(24),
          paddingBottom: Math.max(insets.bottom, sHeight(24)),
          paddingHorizontal: sWidth(Spacing.screenPadding),
        },
      ]}
    >
      <View style={styles.content}>
        <Image
          source={require('../../../assets/splash/splash logo.png')}
          style={{ width: sWidth(100), height: sWidth(100), marginBottom: sHeight(24) }}
          resizeMode="contain"
        />

        <Typography
          variant="headlineSm"
          color={Colors.textPrimary}
          align="center"
          style={{ marginBottom: sHeight(Spacing.stackMd) }}
        >
          {t(TITLE_KEYS[variant])}
        </Typography>

        <Typography
          variant="bodyMd"
          color={Colors.textMuted}
          align="center"
          style={{ marginBottom: sHeight(Spacing.stackLg), lineHeight: sHeight(24) }}
        >
          {t(MESSAGE_KEYS[variant])}
        </Typography>

        <PrimaryButton
          title={t('guest.createAccount')}
          onPress={() => navigateToAuth('SignUp')}
          style={{ width: '100%', marginBottom: sHeight(Spacing.stackMd) }}
        />

        <PrimaryButton
          title={t('guest.logIn')}
          onPress={() => navigateToAuth('Login')}
          textColor={Colors.textTitle}
          style={[styles.secondaryButton, { marginBottom: sHeight(Spacing.stackMd) }]}
        />

        <TouchableOpacity onPress={handleContinueBrowsing} activeOpacity={0.7}>
          <Typography variant="labelLg" color={Colors.primaryDeep} align="center">
            {t('guest.continueBrowsing')}
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundApp,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.borderDivider,
  },
});
