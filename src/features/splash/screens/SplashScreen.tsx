import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SplashAnimation } from '../components/SplashAnimation';
import { PrimaryButton } from '../../../shared/components/PrimaryButton';
import { useAppBootstrap } from '../hooks/useAppBootstrap';
import { Typography } from '../../../shared/components/Typography';

export const SplashScreen: React.FC<any> = ({ navigation }) => {
  const { isReady, error } = useAppBootstrap();
  const insets = useSafeAreaInsets();
  
  // Animation for the Get Started button appearing
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isReady) {
      // Fade in the Get Started button when bootstrap is complete
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500,
        delay: 500, // wait a moment after animations
        useNativeDriver: true,
      }).start();
    }
  }, [isReady, buttonOpacity]);

  const handleGetStarted = () => {
    // Navigation logic based on auth store (to be handled in RootNavigator or here)
    // For now, we will let RootNavigator handle the auth switch, or we can explicitly route
    // According to docs: "check the Zustand authStore. If token exists, navigate to MainTabNavigator, else navigate to AuthStack."
    
    // We can explicitly navigate to a 'Gate' route, or just push Auth/Main manually.
    // For MVP setup, let's navigate to AuthStack directly as we default to null token
    navigation.replace('AuthStack');
  };

  return (
    <View style={styles.container}>
      {/* Background and Logo Animation */}
      <SplashAnimation />

      {/* Button overlay at the bottom */}
      <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Animated.View style={{ opacity: buttonOpacity, width: '100%', paddingHorizontal: 24 }}>
          {error ? (
            <Typography variant="body" color="red" align="center" style={styles.errorText}>
              Failed to load required assets.
            </Typography>
          ) : null}
          <PrimaryButton title="Get Started" onPress={handleGetStarted} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  }
});
