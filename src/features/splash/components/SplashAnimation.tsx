import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Using the provided assets from assets/splash
// (Fallback to local if dynamic loading is needed, but we will require them here)
const SPHINX_BG = require('../../../../assets/splash/splashBackground.png');
const LOGO = require('../../../../assets/splash/splash3.png'); // Assuming splash3 is the logo, or we can use fullSplash

export const SplashAnimation: React.FC = () => {
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const bgScale = useRef(new Animated.Value(1.1)).current;
  
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Fade in and slightly scale down the background
      Animated.parallel([
        Animated.timing(bgOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bgScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        })
      ]),
      // 2. Fade in and slide up the logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, [bgOpacity, bgScale, logoOpacity, logoTranslateY]);

  return (
    <View style={styles.container} pointerEvents="none">
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
        <Animated.Image
          source={LOGO}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [{ translateY: logoTranslateY }]
            }
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
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
    width: width * 0.7,
    height: width * 0.7,
  },
});
