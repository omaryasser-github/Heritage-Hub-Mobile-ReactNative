import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';

// Guideline sizes are based on standard ~5" screen mobile device (e.g., iPhone 11 Pro / iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Static scaling functions for one-off calculations outside of components.
 */
export const scaleWidth = (size: number) => {
  const { width } = Dimensions.get('window');
  return PixelRatio.roundToNearestPixel((width / guidelineBaseWidth) * size);
};

export const scaleHeight = (size: number) => {
  const { height } = Dimensions.get('window');
  return PixelRatio.roundToNearestPixel((height / guidelineBaseHeight) * size);
};

/**
 * Moderate scale for fonts to prevent them from becoming too large on Pro Max devices.
 * factor = 0.5 means it grows at half the rate of the screen width.
 */
export const scaleFont = (size: number, factor = 0.5) =>
  size + (scaleWidth(size) - size) * factor;

/**
 * Hook version of responsive utilities that updates when screen dimensions change.
 * Recommended for use within Functional Components.
 */
export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const sWidth = (size: number) =>
    PixelRatio.roundToNearestPixel((width / guidelineBaseWidth) * size);

  const sHeight = (size: number) =>
    PixelRatio.roundToNearestPixel((height / guidelineBaseHeight) * size);

  const sFont = (size: number, factor = 0.5) =>
    size + (sWidth(size) - size) * factor;

  return {
    sWidth,
    sHeight,
    sFont,
    screenWidth: width,
    screenHeight: height,
    isSmallDevice: width < 375,
  };
};
