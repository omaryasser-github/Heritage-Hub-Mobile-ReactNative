import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Platform } from 'react-native';
import { Typography } from '../../../shared/components/Typography';

import { useResponsive } from '../../../shared/utils/responsive';


// Using the provided assets from assets/splash
// (Fallback to local if dynamic loading is needed, but we will require them here)
const SPHINX_BG = require('../../../../assets/splash/splashBackground.png');
const LOGO = require('../../../../assets/splash/splash logo.png');

export const SplashAnimation: React.FC = () => {
  const { sWidth, sFont, screenHeight } = useResponsive();
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(1.1)).current;

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.sequence([
      // 1. Background appears immediately (short fade for smoothness)
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // 2. 1 second delay
      Animated.delay(1000),
      // 3. Logo fades in
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        // useNativeDriver: true,
        useNativeDriver: Platform.OS !== 'web', // ✅ false on web, true on native
      }),
      // 4. Text fades in
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // 5. Logo and text move upward together
      Animated.timing(contentTranslateY, {
        toValue: -screenHeight * 0.3,
        duration: 1000,
        useNativeDriver: true,
      }),

    ]).start();
  }, [bgOpacity, logoOpacity, textOpacity, contentTranslateY]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={SPHINX_BG}
        style={[
          styles.background,
          {
            opacity: bgOpacity,
            transform: [{ scale: bgScale }]
          }
        ]}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.contentContainer,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <Animated.Image
            source={LOGO}
            style={[
              styles.logo,
              {
                opacity: logoOpacity,
                width: sWidth(150),
                height: sWidth(150)
              }
            ]}
            resizeMode="contain"
          />

          <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
            <Typography
              variant="h2"
              color="white"
              align="center"
              style={[styles.mainTitle, { fontSize: sFont(28) }]}
            >
              Discover Heritage Wonders
            </Typography>
            <Typography
              variant="body"
              color="#FFFFFF"
              align="center"
              style={[styles.subTitle, { fontSize: sFont(14) }]}
            >
              Explore famous heritage sites, ancient monuments, cultural landmarks.
            </Typography>
          </Animated.View>

        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    pointerEvents: "none"
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay to make logo pop
  },
  logo: {
    width: 150, // This will be scaled inline
    height: 150,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontWeight: '600',
  },
  subTitle: {
    lineHeight: 22,
    opacity: 0.75,
    fontWeight: '400',
  },
});
