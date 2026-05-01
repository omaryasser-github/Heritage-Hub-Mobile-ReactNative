import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Typography } from '../../../shared/components/Typography';
import { Platform } from 'react-native';


const { width, height } = Dimensions.get('window');

// Using the provided assets from assets/splash
// (Fallback to local if dynamic loading is needed, but we will require them here)
const SPHINX_BG = require('../../../../assets/splash/splashBackground.png');
const LOGO = require('../../../../assets/splash/splash logo.png');

export const SplashAnimation: React.FC = () => {
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
        toValue: -height * 0.3,
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
              { opacity: logoOpacity }
            ]}
            resizeMode="contain"
          />

          <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
            <Typography variant="h2" color="white" align="center" style={styles.mainTitle}>
              Discover Heritage Wonders
            </Typography>
            <Typography variant="body" color="#FFFFFF" align="center" style={styles.subTitle}>
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
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay to make logo pop
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
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
    // marginBottom: 10,
    fontSize: 28,
    fontWeight: 'semibold',
  },
  subTitle: {
    lineHeight: 22,
    opacity: 0.75,
    fontSize: 14,
    fontWeight: 'regular',

  },
});
