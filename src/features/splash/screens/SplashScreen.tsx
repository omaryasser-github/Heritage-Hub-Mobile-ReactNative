import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SplashAnimation } from '../components/SplashAnimation';
import { SplashSkipButton } from '../components/SplashSkipButton';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { useAppBootstrap } from '../hooks/useAppBootstrap';
import { Typography } from '../../../shared/components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';
import { useAuthStore } from '../../../core/store/authStore';

const SPLASH_CTA_DELAY_MS = 4000;

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const { isReady, error } = useAppBootstrap();
  const insets = useSafeAreaInsets();
  const { sWidth, sHeight } = useResponsive();
  const { t } = useTranslation();
  const token = useAuthStore((state) => state.token);
  const enterAsGuest = useAuthStore((state) => state.enterAsGuest);

  const ctaOpacity = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(30)).current;
  const headerTranslateY = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    if (!isReady) return;

    Animated.parallel([
      Animated.timing(ctaOpacity, {
        toValue: 1,
        duration: 800,
        delay: SPLASH_CTA_DELAY_MS,
        useNativeDriver: true,
      }),
      Animated.timing(bottomTranslateY, {
        toValue: 0,
        duration: 1000,
        delay: SPLASH_CTA_DELAY_MS,
        useNativeDriver: true,
      }),
      Animated.timing(headerTranslateY, {
        toValue: 0,
        duration: 1000,
        delay: SPLASH_CTA_DELAY_MS,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isReady, ctaOpacity, bottomTranslateY, headerTranslateY]);

  const navigateToMain = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabNavigator' }],
    });
  };

  const navigateToAuth = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  const handleSkip = () => {
    enterAsGuest();
    navigateToMain();
  };

  const handleGetStarted = () => {
    if (token) {
      navigateToMain();
      return;
    }
    navigateToAuth();
  };

  return (
    <View style={styles.container}>
      <SplashAnimation />

      <Animated.View
        style={[
          styles.headerRow,
          {
            paddingTop: insets.top + sHeight(12),
            paddingHorizontal: sWidth(20),
            opacity: ctaOpacity,
            transform: [{ translateY: headerTranslateY }],
          },
        ]}
      >
        <SplashSkipButton onPress={handleSkip} disabled={!isReady} />
      </Animated.View>

      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: ctaOpacity,
            transform: [{ translateY: bottomTranslateY }],
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
      >
        <View style={[styles.buttonWrapper, { paddingHorizontal: sWidth(54) }]}>
          {error ? (
            <Typography variant="body" color={Colors.errorStrong} align="center" style={styles.errorText}>
              {t('splash.bootstrapError')}
            </Typography>
          ) : null}
          <PrimaryButton title={t('splash.getStarted')} onPress={handleGetStarted} disabled={!isReady} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.surfaceDark,
  },
  headerRow: {
    position: 'absolute',
    top: 0,
    start: 0,
    end: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  errorText: {
    marginBottom: 16,
  },
  buttonWrapper: {
    width: '100%',
  },
});
