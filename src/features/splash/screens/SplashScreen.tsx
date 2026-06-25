import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SplashAnimation } from '../components/SplashAnimation';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { useAppBootstrap } from '../hooks/useAppBootstrap';
import { Typography } from '../../../shared/components/Typography';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useResponsive } from '../../../shared/utils/responsive';
import { Colors } from '../../../shared/constants/colors';

export const SplashScreen = () => {
  const navigation = useNavigation();
  const { isReady, error } = useAppBootstrap();
  const insets = useSafeAreaInsets();
  const { sWidth } = useResponsive();
  const { t } = useTranslation();

  // Animation for the Get Started button appearing
  // Animation for the Get Started button and arrow appearing
  const bottomOpacity = useRef(new Animated.Value(0)).current;
  const bottomTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (isReady) {
      // Trigger the bottom section animation after the main splash sequence (~4s)
      Animated.parallel([
        Animated.timing(bottomOpacity, {
          toValue: 1,
          duration: 800,
          delay: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(bottomTranslateY, {
          toValue: 0,
          duration: 1000,
          delay: 4000,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isReady, bottomOpacity, bottomTranslateY]);

  const handleGetStarted = () => {
    // Navigation logic based on auth store (to be handled in RootNavigator or here)
    // For now, we will let RootNavigator handle the auth switch, or we can explicitly route
    // According to docs: "check the Zustand authStore. If token exists, navigate to MainTabNavigator, else navigate to AuthStack."

    // We can explicitly navigate to a 'Gate' route, or just push Auth/Main manually.
    // For MVP setup, let's navigate to AuthStack directly as we default to null token
    navigation.reset({
      index: 0,
      routes: [{ name: 'AuthStack' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Background and Logo Animation */}
      <SplashAnimation />

      {/* Bottom section: Arrow + Content */}
      <Animated.View
        style={[
          styles.bottomContainer,
          {
            opacity: bottomOpacity,
            transform: [{ translateY: bottomTranslateY }],
            paddingBottom: Math.max(insets.bottom, 24)
          }
        ]}
      >

        <View style={[styles.buttonWrapper, { paddingHorizontal: sWidth(54) }]}>
          {error ? (
            <Typography variant="body" color={Colors.errorStrong} align="center" style={styles.errorText}>
              {t('splash.bootstrapError')}
            </Typography>
          ) : null}
          <PrimaryButton title={t('splash.getStarted')} onPress={handleGetStarted} />
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
  }
});
